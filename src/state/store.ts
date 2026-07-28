import type {
  AppState,
  AzubiForgeData,
  Confidence,
  ExerciseCheck,
  MockExamAttempt,
  MockExamHistoryEntry,
  MockExamLength,
  MockExamQuestion,
  MockExamStatus,
  Preferences,
  ReaderTab
} from "../types";

const STORAGE_KEY = "azubiforge.progress.v1";
const CONFIDENCE_VALUES = new Set<Confidence>(["ok", "review", "hard", "ready"]);
const READER_TAB_VALUES = new Set<ReaderTab>(["explain", "praxis", "vocab", "practice", "ap1"]);
const EXERCISE_CHECK_VALUES = new Set<ExerciseCheck>(["correct", "wrong"]);
const MOCK_LENGTH_VALUES = new Set<MockExamLength>(["short", "full"]);
const MOCK_STATUS_VALUES = new Set<MockExamStatus>(["active", "grading", "finished"]);

export function loadState(data: AzubiForgeData): AppState {
  const fallback = createFallbackState(data);

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Partial<AppState> | null;
    if (!saved) return fallback;

    return sanitizeState(saved, data, fallback);
  } catch {
    return fallback;
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportState(state: AppState): void {
  const payload = {
    app: "AzubiForge",
    version: 8,
    exportedAt: new Date().toISOString(),
    state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `azubiforge-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function importState(file: File, data: AzubiForgeData, current: AppState): Promise<AppState> {
  const text = await file.text();
  const payload = JSON.parse(text) as unknown;
  const imported = getStatePayload(payload);

  return sanitizeState(imported, data, current);
}

function getStatePayload(payload: unknown): Partial<AppState> {
  if (!payload || typeof payload !== "object") return {};
  if ("state" in payload) {
    const nested = (payload as { state?: unknown }).state;
    return nested && typeof nested === "object" ? nested as Partial<AppState> : {};
  }

  return payload as Partial<AppState>;
}

function createFallbackState(data: AzubiForgeData): AppState {
  return {
    completed: [],
    lastChapterId: data.chapters[0]?.id || "",
    notes: {},
    confidence: {},
    collapsedModules: {},
    sessionSteps: {},
    exerciseChecks: {},
    vocabChecks: {},
    reviewSchedule: {},
    reviewDailyResolved: {},
    reviewResolvedKeyDay: {},
    examChecklist: {},
    mockExam: null,
    mockExamHistory: [],
    lastStudiedAt: {},
    studyDates: [],
    preferences: {
      theme: "light",
      readingSize: "normal",
      onboardingDone: false,
      dailyGoalSessions: 1,
      studyGoal: "Dominar a AP1 e organizar os fundamentos."
    }
  };
}

function sanitizeState(imported: Partial<AppState>, data: AzubiForgeData, fallback: AppState): AppState {
  const validChapterIds = new Set(data.chapters.map((chapter) => chapter.id));
  const validModuleIds = new Set(data.modules.map((module) => module.id));
  const completed = Array.isArray(imported.completed)
    ? imported.completed.filter((id) => validChapterIds.has(id))
    : fallback.completed;
  const lastChapterId = validChapterIds.has(imported.lastChapterId || "")
    ? imported.lastChapterId || fallback.lastChapterId
    : fallback.lastChapterId;

  return {
    completed,
    lastChapterId,
    notes: sanitizeStringRecord(imported.notes, validChapterIds),
    confidence: sanitizeConfidence(imported.confidence, validChapterIds),
    collapsedModules: sanitizeBooleanRecord(imported.collapsedModules, validModuleIds),
    sessionSteps: sanitizeSessionSteps(imported.sessionSteps, validChapterIds),
    exerciseChecks: sanitizeExerciseChecks(imported.exerciseChecks),
    vocabChecks: sanitizeExerciseChecks(imported.vocabChecks),
    reviewSchedule: sanitizeReviewSchedule(imported.reviewSchedule),
    reviewDailyResolved: sanitizeDailyCountRecord(imported.reviewDailyResolved),
    reviewResolvedKeyDay: sanitizeReviewResolvedKeyDay(imported.reviewResolvedKeyDay),
    examChecklist: sanitizeExamChecklist(imported.examChecklist),
    mockExam: sanitizeMockExam(imported.mockExam),
    mockExamHistory: sanitizeMockExamHistory(imported.mockExamHistory),
    lastStudiedAt: sanitizeStringRecord(imported.lastStudiedAt, validChapterIds),
    studyDates: sanitizeStudyDates(imported.studyDates),
    preferences: sanitizePreferences(imported.preferences, fallback.preferences)
  };
}

function sanitizeExamChecklist(value: unknown): Record<string, boolean> {
  const record: Record<string, boolean> = {};
  if (!value || typeof value !== "object") return record;

  Object.entries(value).forEach(([key, item]) => {
    if (/^\d+$/.test(key) && Number(key) < 32) {
      record[key] = Boolean(item);
    }
  });

  return record;
}

function sanitizeMockExam(value: unknown): MockExamAttempt | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<MockExamAttempt>;
  if (!MOCK_LENGTH_VALUES.has(raw.length as MockExamLength)) return null;
  if (!MOCK_STATUS_VALUES.has(raw.status as MockExamStatus)) return null;
  if (!Array.isArray(raw.questions) || !raw.questions.length) return null;

  const questions = raw.questions
    .map((item) => sanitizeMockQuestion(item))
    .filter((item): item is MockExamQuestion => Boolean(item));
  if (!questions.length) return null;

  const responses: MockExamAttempt["responses"] = {};
  if (raw.responses && typeof raw.responses === "object") {
    Object.entries(raw.responses).forEach(([key, item]) => {
      if (!item || typeof item !== "object") return;
      const response = item as { answered?: unknown; notes?: unknown; selfCheck?: unknown };
      responses[key] = {
        answered: Boolean(response.answered),
        notes: typeof response.notes === "string" ? response.notes.slice(0, 4000) : undefined,
        selfCheck: EXERCISE_CHECK_VALUES.has(response.selfCheck as ExerciseCheck)
          ? response.selfCheck as ExerciseCheck
          : undefined
      };
    });
  }

  return {
    id: typeof raw.id === "string" ? raw.id : `mock-${Date.now()}`,
    length: raw.length as MockExamLength,
    status: raw.status as MockExamStatus,
    startedAt: typeof raw.startedAt === "string" ? raw.startedAt : new Date().toISOString(),
    finishedAt: typeof raw.finishedAt === "string" ? raw.finishedAt : undefined,
    durationMinutes: typeof raw.durationMinutes === "number" && raw.durationMinutes > 0
      ? Math.min(180, Math.round(raw.durationMinutes))
      : 25,
    currentIndex: typeof raw.currentIndex === "number" && raw.currentIndex >= 0
      ? Math.min(questions.length - 1, Math.round(raw.currentIndex))
      : 0,
    questions,
    responses
  };
}

function sanitizeMockQuestion(value: unknown): MockExamQuestion | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<MockExamQuestion>;
  if (!raw.id || !raw.chapterId || !raw.question || !raw.answer) return null;
  return {
    id: String(raw.id),
    chapterId: String(raw.chapterId),
    chapterTitle: String(raw.chapterTitle || "Capitulo"),
    moduleTitle: String(raw.moduleTitle || "Curso"),
    question: String(raw.question),
    answer: String(raw.answer),
    explanation: typeof raw.explanation === "string" ? raw.explanation : undefined,
    style: raw.style === "mixed" ? "mixed" : "ap1"
  };
}

function sanitizeMockExamHistory(value: unknown): MockExamHistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<MockExamHistoryEntry>;
      if (!MOCK_LENGTH_VALUES.has(raw.length as MockExamLength)) return null;
      if (typeof raw.finishedAt !== "string") return null;
      return {
        id: typeof raw.id === "string" ? raw.id : `history-${raw.finishedAt}`,
        length: raw.length as MockExamLength,
        finishedAt: raw.finishedAt,
        correct: typeof raw.correct === "number" ? Math.max(0, Math.round(raw.correct)) : 0,
        total: typeof raw.total === "number" ? Math.max(1, Math.round(raw.total)) : 1,
        percent: typeof raw.percent === "number" ? Math.max(0, Math.min(100, Math.round(raw.percent))) : 0,
        elapsedSeconds: typeof raw.elapsedSeconds === "number" ? Math.max(0, Math.round(raw.elapsedSeconds)) : 0
      } satisfies MockExamHistoryEntry;
    })
    .filter((item): item is MockExamHistoryEntry => Boolean(item))
    .slice(0, 20);
}

function sanitizeStudyDates(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && /^\d{4}-\d{2}-\d{2}$/.test(item)).slice(-120);
}

function sanitizeExerciseChecks(value: unknown): Record<string, ExerciseCheck> {
  const record: Record<string, ExerciseCheck> = {};
  if (!value || typeof value !== "object") return record;

  Object.entries(value).forEach(([key, item]) => {
    if (typeof key === "string" && EXERCISE_CHECK_VALUES.has(item as ExerciseCheck)) {
      record[key] = item as ExerciseCheck;
    }
  });

  return record;
}

function sanitizeReviewSchedule(value: unknown): Record<string, string> {
  const record: Record<string, string> = {};
  if (!value || typeof value !== "object") return record;

  Object.entries(value).forEach(([key, item]) => {
    if (typeof key !== "string" || typeof item !== "string") return;
    const ts = Date.parse(item);
    if (!Number.isNaN(ts)) record[key] = new Date(ts).toISOString();
  });

  return record;
}

function sanitizeDailyCountRecord(value: unknown): Record<string, number> {
  const record: Record<string, number> = {};
  if (!value || typeof value !== "object") return record;
  Object.entries(value).forEach(([key, item]) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
    if (typeof item !== "number" || item < 0) return;
    record[key] = Math.min(9999, Math.round(item));
  });
  return record;
}

function sanitizeReviewResolvedKeyDay(value: unknown): Record<string, string> {
  const record: Record<string, string> = {};
  if (!value || typeof value !== "object") return record;
  Object.entries(value).forEach(([key, item]) => {
    if (typeof key !== "string" || typeof item !== "string") return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item)) return;
    record[key] = item;
  });
  return record;
}

function sanitizeSessionSteps(value: unknown, validKeys: Set<string>): Record<string, ReaderTab[]> {
  const record: Record<string, ReaderTab[]> = {};
  if (!value || typeof value !== "object") return record;

  Object.entries(value).forEach(([key, item]) => {
    if (!validKeys.has(key) || !Array.isArray(item)) return;
    record[key] = item.filter((tab): tab is ReaderTab => READER_TAB_VALUES.has(tab as ReaderTab));
  });

  return record;
}

function sanitizeStringRecord(value: unknown, validKeys: Set<string>): Record<string, string> {
  const record: Record<string, string> = {};
  if (!value || typeof value !== "object") return record;

  Object.entries(value).forEach(([key, item]) => {
    if (validKeys.has(key) && typeof item === "string") {
      record[key] = item;
    }
  });

  return record;
}

function sanitizeBooleanRecord(value: unknown, validKeys: Set<string>): Record<string, boolean> {
  const record: Record<string, boolean> = {};
  if (!value || typeof value !== "object") return record;

  Object.entries(value).forEach(([key, item]) => {
    if (validKeys.has(key)) {
      record[key] = Boolean(item);
    }
  });

  return record;
}

function sanitizeConfidence(value: unknown, validKeys: Set<string>): Record<string, Confidence> {
  const record: Record<string, Confidence> = {};
  if (!value || typeof value !== "object") return record;

  Object.entries(value).forEach(([key, item]) => {
    if (validKeys.has(key) && CONFIDENCE_VALUES.has(item as Confidence)) {
      record[key] = item as Confidence;
    }
  });

  return record;
}

function sanitizePreferences(value: unknown, fallback: Preferences): Preferences {
  const preferences = value && typeof value === "object" ? value as Partial<Preferences> : {};

  return {
    theme: preferences.theme === "dark" || preferences.theme === "light" ? preferences.theme : fallback.theme,
    readingSize: preferences.readingSize === "large" || preferences.readingSize === "normal"
      ? preferences.readingSize
      : fallback.readingSize,
    onboardingDone: typeof preferences.onboardingDone === "boolean"
      ? preferences.onboardingDone
      : fallback.onboardingDone,
    dailyGoalSessions: typeof preferences.dailyGoalSessions === "number" && preferences.dailyGoalSessions > 0
      ? Math.min(5, Math.round(preferences.dailyGoalSessions))
      : fallback.dailyGoalSessions,
    studyGoal: typeof preferences.studyGoal === "string" && preferences.studyGoal.trim()
      ? preferences.studyGoal.trim().slice(0, 240)
      : fallback.studyGoal
  };
}
