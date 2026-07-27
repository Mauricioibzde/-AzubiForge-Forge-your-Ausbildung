import type { AppState, AzubiForgeData, Confidence, ExerciseCheck, Preferences, ReaderTab } from "../types";

const STORAGE_KEY = "azubiforge.progress.v1";
const CONFIDENCE_VALUES = new Set<Confidence>(["ok", "review", "hard", "ready"]);
const READER_TAB_VALUES = new Set<ReaderTab>(["explain", "praxis", "vocab", "practice", "ap1"]);
const EXERCISE_CHECK_VALUES = new Set<ExerciseCheck>(["correct", "wrong"]);

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
    version: 6,
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
    lastStudiedAt: {},
    studyDates: [],
    preferences: {
      theme: "light",
      readingSize: "normal",
      onboardingDone: false,
      dailyGoalSessions: 1
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
    lastStudiedAt: sanitizeStringRecord(imported.lastStudiedAt, validChapterIds),
    studyDates: sanitizeStudyDates(imported.studyDates),
    preferences: sanitizePreferences(imported.preferences, fallback.preferences)
  };
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
      : fallback.dailyGoalSessions
  };
}
