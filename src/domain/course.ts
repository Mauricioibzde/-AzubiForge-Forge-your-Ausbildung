import type {
  AppState,
  AzubiForgeData,
  Chapter,
  Exercise,
  ExerciseCheck,
  GlossaryTerm,
  LearningSituation,
  Module,
  Progress,
  ReaderTab,
  Readiness,
  ReadinessLevel,
  SessionStep,
  VocabularyRow
} from "../types";
import { hasStepLearningEvidence } from "./learning/didacticTasks";

export const READER_STEPS: SessionStep[] = [
  { id: "explain", label: "Erklaeren", hint: "Entenda a ideia principal." },
  { id: "praxis", label: "Praxisfall", hint: "Ligue o tema ao trabalho." },
  { id: "vocab", label: "Wortschatz", hint: "Fixe os termos em alemao." },
  { id: "practice", label: "Uebungen", hint: "Treine com exercicios." },
  { id: "ap1", label: "Anwenden", hint: "Resolva o caso e prove aplicação." }
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function findChapter(data: AzubiForgeData, chapterId: string): Chapter | undefined {
  return data.chapters.find((chapter) => chapter.id === chapterId);
}

export function getChapterIndex(data: AzubiForgeData, chapterId: string): number {
  return data.chapters.findIndex((chapter) => chapter.id === chapterId);
}

export function getChapterModule(data: AzubiForgeData, chapterId: string): Module | undefined {
  return data.modules.find((module) => module.chapterIds.includes(chapterId));
}

export function getChapterLearningSituation(data: AzubiForgeData, chapterId: string): LearningSituation | undefined {
  const module = getChapterModule(data, chapterId);
  if (!module) return undefined;

  return (data.learningSituations?.[module.id] || []).find((situation) => situation.chapterIds.includes(chapterId));
}

export function isCompleted(state: AppState, chapterId: string): boolean {
  return state.completed.includes(chapterId);
}

export function getCourseProgress(data: AzubiForgeData, state: AppState): Progress {
  const validCompleted = state.completed.filter((id) => Boolean(findChapter(data, id)));

  return {
    completed: validCompleted.length,
    total: data.chapters.length,
    percent: percentage(validCompleted.length, data.chapters.length)
  };
}

export function getModuleProgress(data: AzubiForgeData, state: AppState, module: Module): Progress {
  const moduleChapters = module.chapterIds.map((id) => findChapter(data, id)).filter(Boolean) as Chapter[];
  const completed = moduleChapters.filter((chapter) => isCompleted(state, chapter.id)).length;

  return {
    completed,
    total: moduleChapters.length,
    percent: percentage(completed, moduleChapters.length)
  };
}

export function getSuggestedChapter(data: AzubiForgeData, state: AppState): Chapter {
  return data.chapters.find((chapter) => !isCompleted(state, chapter.id)) || data.chapters[data.chapters.length - 1];
}

export function getReviewQueue(data: AzubiForgeData, state: AppState): Chapter[] {
  const priority = { hard: 0, review: 1, ok: 2, ready: 3 };
  const wrongChapterIds = new Set(
    Object.entries(state.exerciseChecks)
      .filter(([, value]) => value === "wrong")
      .map(([key]) => chapterIdFromCheckKey(key))
      .filter(Boolean)
  );
  const weakVocabIds = new Set(
    Object.entries(state.vocabChecks)
      .filter(([, value]) => value === "wrong")
      .map(([key]) => chapterIdFromCheckKey(key))
      .filter(Boolean)
  );
  const scheduledDueIds = new Set(
    Object.entries(state.reviewSchedule)
      .filter(([, dueAt]) => {
        const due = Date.parse(dueAt);
        return !Number.isNaN(due) && due <= Date.now();
      })
      .map(([key]) => chapterIdFromCheckKey(key))
      .filter(Boolean)
  );
  const due = data.chapters
    .filter((chapter) => isReviewDue(state, chapter.id))
    .sort((a, b) => getDaysSinceStudied(state, b.id) - getDaysSinceStudied(state, a.id));
  const fromMistakes = data.chapters.filter(
    (chapter) => scheduledDueIds.has(chapter.id) || wrongChapterIds.has(chapter.id) || weakVocabIds.has(chapter.id)
  );
  const marked = data.chapters
    .filter((chapter) => state.confidence[chapter.id] === "hard" || state.confidence[chapter.id] === "review")
    .sort((a, b) => priority[state.confidence[a.id]] - priority[state.confidence[b.id]]);
  const open = data.chapters.filter((chapter) => !isCompleted(state, chapter.id)).slice(0, 8);
  const recall = data.chapters
    .filter((chapter) => isCompleted(state, chapter.id) && state.confidence[chapter.id] !== "ready")
    .slice(0, 4);

  return uniqueChapters([...fromMistakes, ...due, ...marked, ...open, ...recall]);
}

export function getTodayChapter(data: AzubiForgeData, state: AppState): Chapter {
  return getReviewQueue(data, state)[0] || getSuggestedChapter(data, state);
}

export function getChapterExercises(chapter: Chapter): Exercise[] {
  const exercises = chapter.fullContent?.exercises;
  if (!exercises) return chapter.exercises || [];

  return [...exercises.easy, ...exercises.intermediate, ...exercises.ap1Style];
}

export function getReviewExercises(
  data: AzubiForgeData,
  state: AppState
): Array<Exercise & { chapterId: string; chapterTitle: string; exerciseIndex: number }> {
  const queue = getReviewQueue(data, state);
  const source = queue.length ? queue : data.chapters.slice(0, 6);

  return source.flatMap((chapter) => getChapterExercises(chapter).map((exercise, exerciseIndex) => ({
    ...exercise,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    exerciseIndex
  })));
}

export function getVocabularyPreview(data: AzubiForgeData, state: AppState): GlossaryTerm[] {
  return getReviewVocabularyDeck(data, state).map((item) => ({
    word: item.word,
    translation: item.translation,
    explanation: item.explanation
  }));
}

export interface ReviewVocabItem {
  word: string;
  translation: string;
  explanation: string;
  chapterId: string;
  index: number;
}

export function getReviewVocabularyDeck(data: AzubiForgeData, state: AppState, limit = 18): ReviewVocabItem[] {
  const queue = getReviewQueue(data, state);
  const source = queue.length ? queue : data.chapters.slice(0, 6);
  const items: ReviewVocabItem[] = [];
  const seen = new Set<string>();

  source.forEach((chapter) => {
    getChapterVocabulary(data, chapter).forEach((row, index) => {
      const dedupe = `${chapter.id}:${row.de.toLowerCase()}`;
      if (seen.has(dedupe)) return;
      seen.add(dedupe);
      items.push({
        word: row.de,
        translation: row.pt,
        explanation: row.explanation,
        chapterId: chapter.id,
        index
      });
    });
  });

  if (items.length < limit) {
    data.chapters.forEach((chapter) => {
      if (items.length >= limit) return;
      getChapterVocabulary(data, chapter).forEach((row, index) => {
        if (items.length >= limit) return;
        const dedupe = `${chapter.id}:${row.de.toLowerCase()}`;
        if (seen.has(dedupe)) return;
        seen.add(dedupe);
        items.push({
          word: row.de,
          translation: row.pt,
          explanation: row.explanation,
          chapterId: chapter.id,
          index
        });
      });
    });
  }

  return items.slice(0, limit);
}

export function getChapterVocabulary(data: AzubiForgeData, chapter: Chapter): VocabularyRow[] {
  if (chapter.fullContent?.vocabulary?.length) return chapter.fullContent.vocabulary;

  const searchable = `${chapter.title} ${chapter.description} ${chapter.ihk} ${chapter.summary} ${chapter.example}`.toLowerCase();
  const matched = data.glossary
    .filter((term) => searchable.includes(term.word.toLowerCase()))
    .slice(0, 10)
    .map((term) => ({
      de: term.word,
      pt: term.translation,
      explanation: term.explanation,
      example: chapter.example
    }));

  return matched.length ? matched : [{
    de: chapter.title,
    pt: "tema do capitulo",
    explanation: chapter.description,
    example: chapter.example
  }];
}

export function getReadingMinutes(chapter: Chapter): number {
  const exerciseText = getChapterExercises(chapter).flatMap((exercise) => [exercise.question, exercise.answer]);
  const content = [
    chapter.title,
    chapter.description,
    ...chapter.text,
    chapter.ihk,
    chapter.summary,
    chapter.example,
    ...exerciseText
  ].join(" ");
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
}

export function getNotesCount(state: AppState): number {
  return Object.values(state.notes).filter((note) => note.trim()).length;
}

export function getVisitedSteps(state: AppState, chapterId: string): ReaderTab[] {
  return state.sessionSteps[chapterId] || [];
}

export function markVisitedStep(state: AppState, chapterId: string, tab: ReaderTab): boolean {
  const current = getVisitedSteps(state, chapterId);
  if (current.includes(tab)) return false;

  state.sessionSteps[chapterId] = [...current, tab];
  return true;
}

/** Percurso da missão: etapas com evidência de aprendizagem (não só visitas). */
export function getSessionProgress(state: AppState, chapterId: string): Progress {
  const completed = READER_STEPS.filter((step) =>
    hasStepLearningEvidence(state, chapterId, step.id, null)
  ).length;

  return {
    completed,
    total: READER_STEPS.length,
    percent: percentage(completed, READER_STEPS.length)
  };
}

export function getResumeTab(state: AppState, chapterId: string): ReaderTab {
  const next = READER_STEPS.find((step) => !hasStepLearningEvidence(state, chapterId, step.id, null));
  return next?.id || "ap1";
}

export function getNextSessionTab(state: AppState, chapterId: string, current: ReaderTab): ReaderTab | null {
  const currentIndex = READER_STEPS.findIndex((step) => step.id === current);
  const afterCurrent = currentIndex >= 0 ? READER_STEPS.slice(currentIndex + 1) : READER_STEPS;
  const nextUnevidenced = afterCurrent.find((step) =>
    !hasStepLearningEvidence(state, chapterId, step.id, null)
  );
  if (nextUnevidenced) return nextUnevidenced.id;
  return READER_STEPS.find((step) => !hasStepLearningEvidence(state, chapterId, step.id, null))?.id || null;
}

export function getPrevSessionTab(current: ReaderTab): ReaderTab | null {
  const currentIndex = READER_STEPS.findIndex((step) => step.id === current);
  if (currentIndex > 0) return READER_STEPS[currentIndex - 1].id;
  return null;
}

export function getActiveModule(data: AzubiForgeData, state: AppState): Module {
  const focus = getTodayChapter(data, state);
  return getChapterModule(data, focus.id) || data.modules[0];
}

export function getModuleContinueChapter(data: AzubiForgeData, state: AppState, module: Module): Chapter {
  const chapters = module.chapterIds
    .map((id) => findChapter(data, id))
    .filter((chapter): chapter is Chapter => Boolean(chapter));
  const open = chapters.find((chapter) => !isCompleted(state, chapter.id));
  return open || chapters[chapters.length - 1] || getSuggestedChapter(data, state);
}

export type PathStatus = "done" | "current" | "open";

export function getChapterPathStatus(
  data: AzubiForgeData,
  state: AppState,
  chapterId: string,
  module: Module
): PathStatus {
  if (isCompleted(state, chapterId)) return "done";
  const continueChapter = getModuleContinueChapter(data, state, module);
  if (continueChapter.id === chapterId) return "current";
  return "open";
}

export function getEstimatedStudyMinutes(data: AzubiForgeData, state: AppState): number {
  return state.completed.reduce((sum, chapterId) => {
    const chapter = findChapter(data, chapterId);
    return sum + (chapter ? getReadingMinutes(chapter) : 0);
  }, 0);
}

export function countChaptersWithNotes(state: AppState): number {
  return Object.values(state.notes).filter((note) => note.trim()).length;
}

export function getEstimatedSessionMinutes(chapter: Chapter): number {
  return Math.max(12, Math.min(35, getReadingMinutes(chapter) + 8));
}

export function exerciseCheckKey(chapterId: string, index: number): string {
  return `${chapterId}:${index}`;
}

export function scheduleReviewCheck(
  state: AppState,
  key: string,
  next: ExerciseCheck,
  previous?: ExerciseCheck
): void {
  const now = Date.now();
  const currentDue = Date.parse(state.reviewSchedule[key] || "");
  const validDue = Number.isNaN(currentDue) ? 0 : currentDue;

  let days = 1;
  if (next === "wrong") {
    days = 1;
  } else if (previous === "wrong") {
    days = 2;
  } else {
    const remainingDays = validDue > now ? (validDue - now) / DAY_MS : 0;
    if (remainingDays >= 5) days = 7;
    else if (remainingDays >= 2) days = 4;
    else days = 2;
  }

  state.reviewSchedule[key] = new Date(now + days * DAY_MS).toISOString();
}

export function isReviewKeyDue(state: AppState, key: string): boolean {
  const dueAt = state.reviewSchedule[key];
  if (!dueAt) return false;
  const due = Date.parse(dueAt);
  return !Number.isNaN(due) && due <= Date.now();
}

export function markDueReviewResolved(
  state: AppState,
  key: string,
  next: ExerciseCheck,
  previous?: ExerciseCheck
): void {
  if (next !== "correct" || previous === "correct") return;
  if (!isReviewKeyDue(state, key)) return;

  const today = todayKey();
  if (state.reviewResolvedKeyDay[key] === today) return;
  state.reviewResolvedKeyDay[key] = today;
  state.reviewDailyResolved[today] = (state.reviewDailyResolved[today] || 0) + 1;
}

export function sortByCheckPriority<T>(
  items: T[],
  getCheck: (item: T) => ExerciseCheck | undefined
): T[] {
  const rank = (check?: ExerciseCheck): number => {
    if (check === "wrong") return 0;
    if (!check) return 1;
    return 2;
  };
  return [...items].sort((a, b) => rank(getCheck(a)) - rank(getCheck(b)));
}

export function getChapterExerciseStats(state: AppState, chapterId: string, total: number): {
  correct: number;
  wrong: number;
  answered: number;
  total: number;
} {
  let correct = 0;
  let wrong = 0;

  for (let index = 0; index < total; index += 1) {
    const value = state.exerciseChecks[exerciseCheckKey(chapterId, index)];
    if (value === "correct") correct += 1;
    if (value === "wrong") wrong += 1;
  }

  return {
    correct,
    wrong,
    answered: correct + wrong,
    total
  };
}

export function vocabCheckKey(chapterId: string, index: number): string {
  return `vocab:${chapterId}:${index}`;
}

export function getVocabStats(state: AppState, chapterId: string, total: number): {
  correct: number;
  wrong: number;
  answered: number;
  total: number;
} {
  let correct = 0;
  let wrong = 0;

  for (let index = 0; index < total; index += 1) {
    const value = state.vocabChecks[vocabCheckKey(chapterId, index)];
    if (value === "correct") correct += 1;
    if (value === "wrong") wrong += 1;
  }

  return { correct, wrong, answered: correct + wrong, total };
}

export function touchStudied(state: AppState, chapterId: string): void {
  state.lastStudiedAt[chapterId] = new Date().toISOString();
  const today = todayKey();
  if (!state.studyDates.includes(today)) {
    state.studyDates = [...state.studyDates, today].slice(-120);
  }
}

export function todayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function stampToLocalDayKey(stamp: string): string {
  const date = new Date(stamp);
  if (Number.isNaN(date.getTime())) return "";
  return todayKey(date);
}

export function getTodayStudyCount(state: AppState): number {
  const today = todayKey();
  return Object.values(state.lastStudiedAt).filter((stamp) => stampToLocalDayKey(stamp) === today).length;
}

export function getStudyStreak(state: AppState): number {
  const days = new Set(state.studyDates);
  let streak = 0;
  const cursor = new Date();

  for (let index = 0; index < 120; index += 1) {
    const key = todayKey(cursor);
    if (!days.has(key)) {
      if (index === 0) {
        // allow streak to survive if user has not studied yet today
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export interface StudyCalendarDay {
  key: string;
  label: string;
  studied: boolean;
  isToday: boolean;
}

export function getStudyCalendarDays(state: AppState, days = 14): StudyCalendarDay[] {
  const studied = new Set(state.studyDates);
  const today = todayKey();
  const result: StudyCalendarDay[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - (days - 1));

  for (let index = 0; index < days; index += 1) {
    const key = todayKey(cursor);
    result.push({
      key,
      label: String(cursor.getDate()),
      studied: studied.has(key),
      isToday: key === today
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

export function getDailyGoalProgress(state: AppState): Progress {
  const goal = Math.max(1, state.preferences.dailyGoalSessions || 1);
  const done = Math.min(goal, getTodayQualitySessionCount(state));
  return {
    completed: done,
    total: goal,
    percent: percentage(done, goal)
  };
}

/** Counts chapters studied today with a meaningful session (3+ steps visited). */
export function getTodayQualitySessionCount(state: AppState): number {
  const today = todayKey();
  return Object.entries(state.lastStudiedAt).filter(([chapterId, stamp]) => {
    if (stampToLocalDayKey(stamp) !== today) return false;
    return getVisitedSteps(state, chapterId).length >= 3;
  }).length;
}

export function getDaysSinceStudied(state: AppState, chapterId: string): number {
  const stamp = state.lastStudiedAt[chapterId];
  if (!stamp) return Number.POSITIVE_INFINITY;
  const then = Date.parse(stamp);
  if (Number.isNaN(then)) return Number.POSITIVE_INFINITY;
  return Math.floor((Date.now() - then) / DAY_MS);
}

export function isReviewDue(state: AppState, chapterId: string): boolean {
  if (hasDueReviewCheck(state, chapterId)) return true;
  if (!isCompleted(state, chapterId) && !getVisitedSteps(state, chapterId).length) return false;
  const confidence = state.confidence[chapterId];
  if (confidence === "ready") return getDaysSinceStudied(state, chapterId) >= 7;
  if (confidence === "hard") return getDaysSinceStudied(state, chapterId) >= 1;
  if (confidence === "review") return getDaysSinceStudied(state, chapterId) >= 1;
  if (isCompleted(state, chapterId)) return getDaysSinceStudied(state, chapterId) >= 2;
  return getDaysSinceStudied(state, chapterId) >= 1;
}

export function getDueReviewItemCount(state: AppState): number {
  const now = Date.now();
  return Object.values(state.reviewSchedule).filter((dueAt) => {
    const due = Date.parse(dueAt);
    return !Number.isNaN(due) && due <= now;
  }).length;
}

export function getTodayResolvedReviewCount(state: AppState): number {
  return state.reviewDailyResolved[todayKey()] || 0;
}

export function getReviewResolutionStreak(state: AppState): number {
  const days = new Set(
    Object.entries(state.reviewDailyResolved)
      .filter(([, count]) => count > 0)
      .map(([day]) => day)
  );
  let streak = 0;
  const cursor = new Date();

  for (let index = 0; index < 120; index += 1) {
    const key = todayKey(cursor);
    if (!days.has(key)) {
      if (index === 0) {
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function hasDueReviewCheck(state: AppState, chapterId: string): boolean {
  const now = Date.now();
  return Object.entries(state.reviewSchedule).some(([key, dueAt]) => {
    if (chapterIdFromCheckKey(key) !== chapterId) return false;
    const due = Date.parse(dueAt);
    return !Number.isNaN(due) && due <= now;
  });
}

export function getChapterReadiness(data: AzubiForgeData, state: AppState, chapter: Chapter): Readiness {
  const session = getSessionProgress(state, chapter.id);
  const exercises = getChapterExercises(chapter);
  const exerciseStats = getChapterExerciseStats(state, chapter.id, exercises.length);
  const vocab = getChapterVocabulary(data, chapter);
  const vocabStats = getVocabStats(state, chapter.id, vocab.length);
  const confidence = state.confidence[chapter.id];
  const reasons: string[] = [];

  let score = 0;
  if (session.completed >= 1) score += 1;
  if (session.completed >= 3) score += 1;
  if (session.percent === 100) score += 1;
  if (vocabStats.answered > 0 || exerciseStats.answered > 0) score += 1;
  if (exerciseStats.answered >= Math.min(3, Math.max(1, exercises.length)) && exerciseStats.wrong === 0) score += 1;
  else if (exerciseStats.answered > 0 && exerciseStats.correct > exerciseStats.wrong) score += 0.5;
  if (confidence === "ready") score += 1;
  else if (confidence === "ok") score += 0.5;
  else if (confidence === "hard" || confidence === "review") score -= 0.5;
  if (isCompleted(state, chapter.id)) score += 0.5;

  const level = Math.max(0, Math.min(5, Math.round(score))) as ReadinessLevel;
  const labels: Record<ReadinessLevel, string> = {
    0: "Nao iniciado",
    1: "Visto",
    2: "Em estudo",
    3: "Praticado",
    4: "Quase pronto",
    5: "Pronto AP1"
  };

  if (session.percent < 100) reasons.push(`Sessao ${session.completed}/${session.total}`);
  if (exerciseStats.answered === 0) reasons.push("Falta praticar exercicios");
  else if (exerciseStats.wrong > 0) reasons.push(`${exerciseStats.wrong} erros para revisar`);
  if (vocabStats.answered === 0) reasons.push("Falta recall de vocabulario");
  if (!confidence) reasons.push("Sem marcacao de confianca");
  if (isReviewDue(state, chapter.id)) reasons.push("Revisao em atraso");

  return {
    level,
    label: labels[level],
    percent: Math.round((level / 5) * 100),
    reasons: reasons.slice(0, 3)
  };
}

export function getCourseReadiness(data: AzubiForgeData, state: AppState): Progress {
  const levels = data.chapters.map((chapter) => getChapterReadiness(data, state, chapter).level);
  const ready = levels.filter((level) => level >= 4).length;
  const avg = levels.reduce<number>((sum, level) => sum + level, 0) / Math.max(1, levels.length);

  return {
    completed: ready,
    total: data.chapters.length,
    percent: Math.round((avg / 5) * 100)
  };
}

export function canMarkReady(data: AzubiForgeData, state: AppState, chapterId: string): {
  ok: boolean;
  message: string;
} {
  const chapter = findChapter(data, chapterId);
  if (!chapter) return { ok: false, message: "Capitulo nao encontrado." };

  const session = getSessionProgress(state, chapterId);
  const exercises = getChapterExercises(chapter);
  const stats = getChapterExerciseStats(state, chapterId, exercises.length);

  if (session.percent < 100) {
    return { ok: false, message: `Complete as ${session.total} etapas da sessao antes de marcar Pronto AP1.` };
  }
  if (exercises.length && stats.answered === 0) {
    return { ok: false, message: "Responda ao menos um exercicio e marque Acertei/Errei antes de Pronto AP1." };
  }
  if (stats.wrong > 0) {
    return { ok: false, message: "Ainda ha exercicios marcados como erro. Revise-os antes de Pronto AP1." };
  }
  return { ok: true, message: "" };
}

function chapterIdFromCheckKey(key: string): string {
  const parts = key.split(":");
  if (
    parts[0] === "review"
    || parts[0] === "focus"
    || parts[0] === "vocab"
    || parts[0] === "exam"
    || parts[0] === "mock"
  ) {
    return parts[1] || "";
  }
  return parts[0] || "";
}

function percentage(value: number, total: number): number {
  return total ? Math.round((value / total) * 100) : 0;
}

function uniqueChapters(items: Chapter[]): Chapter[] {
  const seen = new Set<string>();

  return items.filter((chapter) => {
    if (seen.has(chapter.id)) return false;
    seen.add(chapter.id);
    return true;
  });
}
