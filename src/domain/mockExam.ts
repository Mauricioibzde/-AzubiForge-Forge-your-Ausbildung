import { getChapterExercises, getChapterModule } from "./course";
import type {
  AzubiForgeData,
  ExerciseCheck,
  MockExamAttempt,
  MockExamHistoryEntry,
  MockExamLength,
  MockExamQuestion,
  MockExamResponse
} from "../types";

export interface MockExamPreset {
  id: MockExamLength;
  label: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
}

export const MOCK_EXAM_PRESETS: Record<MockExamLength, MockExamPreset> = {
  short: {
    id: "short",
    label: "Simulado curto",
    description: "8 perguntas mistas · 25 minutos. Ideal para treino diario.",
    questionCount: 8,
    durationMinutes: 25
  },
  full: {
    id: "full",
    label: "Simulado completo",
    description: "15 perguntas de varios modulos · 45 minutos. Condicao de prova.",
    questionCount: 15,
    durationMinutes: 45
  }
};

export function getMockExamPool(data: AzubiForgeData): MockExamQuestion[] {
  const pool: MockExamQuestion[] = [];

  data.chapters.forEach((chapter) => {
    const module = getChapterModule(data, chapter.id);
    const moduleTitle = module?.subtitle || module?.title || "Curso";
    const full = chapter.fullContent?.exercises;

    if (full?.ap1Style?.length) {
      full.ap1Style.forEach((exercise, index) => {
        pool.push({
          id: `ap1:${chapter.id}:${index}:${hashText(exercise.question)}`,
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          moduleTitle,
          question: exercise.question,
          answer: exercise.answer,
          explanation: exercise.explanation,
          style: "ap1"
        });
      });
      return;
    }

    getChapterExercises(chapter).slice(0, 2).forEach((exercise, index) => {
      pool.push({
        id: `mixed:${chapter.id}:${index}:${hashText(exercise.question)}`,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        moduleTitle,
        question: exercise.question,
        answer: exercise.answer,
        explanation: exercise.explanation,
        style: "mixed"
      });
    });
  });

  return pool;
}

export function createMockExam(data: AzubiForgeData, length: MockExamLength): MockExamAttempt {
  const preset = MOCK_EXAM_PRESETS[length];
  const questions = pickBalancedQuestions(getMockExamPool(data), preset.questionCount);
  const now = new Date().toISOString();

  return {
    id: `mock-${Date.now()}`,
    length,
    status: "active",
    startedAt: now,
    durationMinutes: preset.durationMinutes,
    currentIndex: 0,
    questions,
    responses: Object.fromEntries(questions.map((question) => [question.id, {} satisfies MockExamResponse]))
  };
}

export function pickBalancedQuestions(pool: MockExamQuestion[], count: number): MockExamQuestion[] {
  if (pool.length <= count) return shuffle(pool);

  const byModule = new Map<string, MockExamQuestion[]>();
  pool.forEach((question) => {
    const list = byModule.get(question.moduleTitle) || [];
    list.push(question);
    byModule.set(question.moduleTitle, list);
  });

  const buckets = [...byModule.values()].map((items) => shuffle(items));
  const picked: MockExamQuestion[] = [];
  const used = new Set<string>();
  let guard = 0;

  while (picked.length < count && guard < count * 20) {
    guard += 1;
    for (const bucket of buckets) {
      if (picked.length >= count) break;
      const next = bucket.find((item) => !used.has(item.id));
      if (!next) continue;
      used.add(next.id);
      picked.push(next);
    }
    if (buckets.every((bucket) => bucket.every((item) => used.has(item.id)))) break;
  }

  if (picked.length < count) {
    shuffle(pool)
      .filter((item) => !used.has(item.id))
      .slice(0, count - picked.length)
      .forEach((item) => picked.push(item));
  }

  return shuffle(picked).slice(0, count);
}

export function getMockExamRemainingMs(attempt: MockExamAttempt, now = Date.now()): number {
  if (attempt.status !== "active") return 0;
  const endsAt = new Date(attempt.startedAt).getTime() + attempt.durationMinutes * 60_000;
  return Math.max(0, endsAt - now);
}

export function formatMockExamTimer(remainingMs: number): string {
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getMockExamAnsweredCount(attempt: MockExamAttempt): number {
  return attempt.questions.filter((question) => Boolean(attempt.responses[question.id]?.answered)).length;
}

export function getMockExamGradedCount(attempt: MockExamAttempt): number {
  return attempt.questions.filter((question) => Boolean(attempt.responses[question.id]?.selfCheck)).length;
}

export function scoreMockExam(attempt: MockExamAttempt): {
  correct: number;
  wrong: number;
  unanswered: number;
  total: number;
  percent: number;
} {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  attempt.questions.forEach((question) => {
    const check = attempt.responses[question.id]?.selfCheck;
    if (check === "correct") correct += 1;
    else if (check === "wrong") wrong += 1;
    else unanswered += 1;
  });

  const total = attempt.questions.length;
  return {
    correct,
    wrong,
    unanswered,
    total,
    percent: total ? Math.round((correct / total) * 100) : 0
  };
}

export function getMockExamElapsedSeconds(attempt: MockExamAttempt): number {
  const end = attempt.finishedAt ? new Date(attempt.finishedAt).getTime() : Date.now();
  return Math.max(0, Math.round((end - new Date(attempt.startedAt).getTime()) / 1000));
}

export function buildMockExamHistoryEntry(attempt: MockExamAttempt): MockExamHistoryEntry {
  const score = scoreMockExam(attempt);
  return {
    id: attempt.id,
    length: attempt.length,
    finishedAt: attempt.finishedAt || new Date().toISOString(),
    correct: score.correct,
    total: score.total,
    percent: score.percent,
    elapsedSeconds: getMockExamElapsedSeconds(attempt)
  };
}

export function getWeakChaptersFromAttempt(attempt: MockExamAttempt): Array<{ chapterId: string; chapterTitle: string; wrongCount: number }> {
  const map = new Map<string, { chapterId: string; chapterTitle: string; wrongCount: number }>();

  attempt.questions.forEach((question) => {
    if (attempt.responses[question.id]?.selfCheck !== "wrong") return;
    const current = map.get(question.chapterId) || {
      chapterId: question.chapterId,
      chapterTitle: question.chapterTitle,
      wrongCount: 0
    };
    current.wrongCount += 1;
    map.set(question.chapterId, current);
  });

  return [...map.values()].sort((a, b) => b.wrongCount - a.wrongCount);
}

export function setMockExamResponse(
  attempt: MockExamAttempt,
  questionId: string,
  patch: Partial<MockExamResponse>
): MockExamAttempt {
  return {
    ...attempt,
    responses: {
      ...attempt.responses,
      [questionId]: {
        ...attempt.responses[questionId],
        ...patch
      }
    }
  };
}

export function setMockExamSelfCheck(
  attempt: MockExamAttempt,
  questionId: string,
  selfCheck: ExerciseCheck
): MockExamAttempt {
  return setMockExamResponse(attempt, questionId, { selfCheck, answered: true });
}

export function getMockExamTrend(history: MockExamHistoryEntry[]): {
  delta: number;
  label: string;
  improving: boolean | null;
} | null {
  if (history.length < 2) return null;
  const newest = history[0];
  const previous = history[1];
  const delta = newest.percent - previous.percent;
  if (delta === 0) return { delta: 0, label: "Estavel vs ultimo", improving: null };
  if (delta > 0) return { delta, label: `+${delta}% vs ultimo`, improving: true };
  return { delta, label: `${delta}% vs ultimo`, improving: false };
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function hashText(value: string): string {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}
