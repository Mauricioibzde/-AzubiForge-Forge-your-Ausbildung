import type {
  AppState,
  AzubiForgeData,
  Confidence,
  ExerciseCheck,
  MissionReviewRecord,
  MissionReviewStatus,
  MockExamAttempt,
  MockExamHistoryEntry,
  MockExamLength,
  MockExamQuestion,
  MockExamStatus,
  MasteryTestAttempt,
  MasteryTestHistoryEntry,
  MasteryTestQuestion,
  MasteryTestResponse,
  MasteryTestStatus,
  MasteryQuestionType,
  CheckpointAttempt,
  CheckpointHistoryEntry,
  MissionReviewAttempt,
  MissionReviewHistoryEntry,
  Preferences,
  ReaderTab,
  StudySession,
  StudySessionActivity,
  StudySessionActivityKind,
  StudySessionStatus,
  StudySessionSummary
} from "../types";

const STORAGE_KEY = "azubiforge.progress.v1";
const CONFIDENCE_VALUES = new Set<Confidence>(["ok", "review", "hard", "ready"]);
const READER_TAB_VALUES = new Set<ReaderTab>(["explain", "praxis", "vocab", "practice", "ap1"]);
const SESSION_STATUS_VALUES = new Set<StudySessionStatus>(["active", "paused", "completed"]);
const SESSION_ACTIVITY_KIND_VALUES = new Set<StudySessionActivityKind>(["reader-step", "review", "mastery-test"]);
const MISSION_REVIEW_STATUS_VALUES = new Set<MissionReviewStatus>(["scheduled", "due", "completed"]);
const MASTERY_TEST_STATUS_VALUES = new Set<MasteryTestStatus>(["active", "grading", "finished"]);
const MASTERY_QUESTION_TYPE_VALUES = new Set<MasteryQuestionType>(["scenario-choice", "open-question", "true-false"]);
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
    version: 11,
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
      theme: "dark",
      readingSize: "normal",
      onboardingDone: false,
      dailyGoalSessions: 1,
      studyGoal: "Dominar a AP1 e organizar os fundamentos."
    },
    activeStudySession: null,
    studySessionHistory: [],
    missionReviews: {},
    activeMasteryTest: null,
    masteryTestHistory: [],
    activeMissionReview: null,
    missionReviewHistory: [],
    activeCheckpoint: null,
    checkpointHistory: [],
    vocabAttempts: {},
    practiceAttempts: {},
    practiceRevealed: {},
    applyCriteriaChecks: {}
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
    preferences: sanitizePreferences(imported.preferences, fallback.preferences),
    activeStudySession: sanitizeStudySession(imported.activeStudySession, validChapterIds),
    studySessionHistory: sanitizeStudySessionHistory(imported.studySessionHistory),
    missionReviews: sanitizeMissionReviews(imported.missionReviews, validChapterIds),
    activeMasteryTest: sanitizeMasteryTestAttempt(imported.activeMasteryTest, validChapterIds),
    masteryTestHistory: sanitizeMasteryTestHistory(imported.masteryTestHistory, validChapterIds),
    activeMissionReview: sanitizeMissionReviewAttempt(imported.activeMissionReview, validChapterIds),
    missionReviewHistory: sanitizeMissionReviewHistory(imported.missionReviewHistory, validChapterIds),
    activeCheckpoint: sanitizeCheckpointAttempt(imported.activeCheckpoint, data),
    checkpointHistory: sanitizeCheckpointHistory(imported.checkpointHistory, data),
    vocabAttempts: sanitizeAttemptRecord(imported.vocabAttempts),
    practiceAttempts: sanitizeAttemptRecord(imported.practiceAttempts),
    practiceRevealed: sanitizeBooleanMap(imported.practiceRevealed),
    applyCriteriaChecks: sanitizeBooleanMap(imported.applyCriteriaChecks)
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
    responses,
    learningFieldId: typeof raw.learningFieldId === "string" ? raw.learningFieldId : undefined,
    simulationLabel: typeof raw.simulationLabel === "string" ? raw.simulationLabel.slice(0, 120) : undefined
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

function sanitizeStudySession(value: unknown, validChapterIds: Set<string>): StudySession | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<StudySession>;
  if (!SESSION_STATUS_VALUES.has(raw.status as StudySessionStatus)) return null;
  if (!Array.isArray(raw.activities) || !raw.activities.length) return null;

  const activities = raw.activities
    .map((item) => sanitizeStudySessionActivity(item, validChapterIds))
    .filter((item): item is StudySessionActivity => Boolean(item));
  if (!activities.length) return null;

  const currentIndex = typeof raw.currentIndex === "number" && raw.currentIndex >= 0
    ? Math.min(activities.length - 1, Math.round(raw.currentIndex))
    : 0;

  const completedActivityIds = Array.isArray(raw.completedActivityIds)
    ? raw.completedActivityIds.filter((id): id is string => typeof id === "string")
    : [];

  return {
    id: typeof raw.id === "string" ? raw.id : `session-${Date.now()}`,
    planDate: typeof raw.planDate === "string" ? raw.planDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
    status: raw.status as StudySessionStatus,
    startedAt: typeof raw.startedAt === "string" ? raw.startedAt : new Date().toISOString(),
    pausedAt: typeof raw.pausedAt === "string" ? raw.pausedAt : null,
    endedAt: typeof raw.endedAt === "string" ? raw.endedAt : null,
    activities,
    currentIndex,
    completedActivityIds
  };
}

function sanitizeStudySessionActivity(value: unknown, validChapterIds: Set<string>): StudySessionActivity | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<StudySessionActivity>;
  if (!raw.id || !raw.missionId || !validChapterIds.has(raw.missionId)) return null;
  if (!SESSION_ACTIVITY_KIND_VALUES.has(raw.kind as StudySessionActivityKind)) return null;

  return {
    id: raw.id,
    kind: raw.kind as StudySessionActivityKind,
    missionId: raw.missionId,
    title: typeof raw.title === "string" ? raw.title.slice(0, 200) : "Atividade",
    instruction: typeof raw.instruction === "string" ? raw.instruction.slice(0, 400) : "",
    estimatedMinutes: typeof raw.estimatedMinutes === "number" && raw.estimatedMinutes > 0
      ? Math.min(120, Math.round(raw.estimatedMinutes))
      : 10,
    readerTab: READER_TAB_VALUES.has(raw.readerTab as ReaderTab) ? raw.readerTab as ReaderTab : undefined,
    planTaskId: typeof raw.planTaskId === "string" ? raw.planTaskId : undefined
  };
}

function sanitizeStudySessionHistory(value: unknown): StudySessionSummary[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<StudySessionSummary>;
      if (!raw.id || !raw.startedAt || !raw.endedAt) return null;
      return {
        id: raw.id,
        planDate: typeof raw.planDate === "string" ? raw.planDate.slice(0, 10) : "",
        startedAt: raw.startedAt,
        endedAt: raw.endedAt,
        activitiesCompleted: typeof raw.activitiesCompleted === "number" ? Math.max(0, Math.round(raw.activitiesCompleted)) : 0,
        activitiesTotal: typeof raw.activitiesTotal === "number" ? Math.max(0, Math.round(raw.activitiesTotal)) : 0,
        minutesStudied: typeof raw.minutesStudied === "number" ? Math.max(0, Math.round(raw.minutesStudied)) : 0,
        missionIds: Array.isArray(raw.missionIds) ? raw.missionIds.filter((id): id is string => typeof id === "string") : []
      };
    })
    .filter((item): item is StudySessionSummary => Boolean(item))
    .slice(0, 50);
}

function sanitizeMissionReviews(value: unknown, validChapterIds: Set<string>): Record<string, MissionReviewRecord> {
  const record: Record<string, MissionReviewRecord> = {};
  if (!value || typeof value !== "object") return record;

  Object.entries(value).forEach(([missionId, item]) => {
    if (!validChapterIds.has(missionId) || !item || typeof item !== "object") return;
    const raw = item as Partial<MissionReviewRecord>;
    const reviewLevel = typeof raw.reviewLevel === "number"
      ? Math.max(0, Math.min(5, Math.round(raw.reviewLevel)))
      : 0;

    record[missionId] = {
      reviewLevel,
      lastReviewedAt: typeof raw.lastReviewedAt === "string" ? raw.lastReviewedAt : null,
      nextReviewAt: typeof raw.nextReviewAt === "string" ? raw.nextReviewAt : null,
      lastScore: typeof raw.lastScore === "number" ? Math.max(0, Math.min(100, Math.round(raw.lastScore))) : null,
      status: MISSION_REVIEW_STATUS_VALUES.has(raw.status as MissionReviewStatus)
        ? raw.status as MissionReviewStatus
        : "scheduled"
    };
  });

  return record;
}

function sanitizeMasteryTestAttempt(value: unknown, validChapterIds: Set<string>): MasteryTestAttempt | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<MasteryTestAttempt>;
  if (!raw.missionId || !validChapterIds.has(raw.missionId)) return null;
  if (!MASTERY_TEST_STATUS_VALUES.has(raw.status as MasteryTestStatus)) return null;
  if (!Array.isArray(raw.questions) || !raw.questions.length) return null;

  const questions = raw.questions
    .map((item) => sanitizeMasteryTestQuestion(item, raw.missionId!))
    .filter((item): item is MasteryTestQuestion => Boolean(item));
  if (!questions.length) return null;

  const responses: MasteryTestAttempt["responses"] = {};
  if (raw.responses && typeof raw.responses === "object") {
    Object.entries(raw.responses).forEach(([key, item]) => {
      if (!item || typeof item !== "object") return;
      const response = item as MasteryTestResponse;
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
    id: typeof raw.id === "string" ? raw.id : `mastery-${Date.now()}`,
    missionId: raw.missionId,
    missionTitle: typeof raw.missionTitle === "string" ? raw.missionTitle.slice(0, 200) : "Missao",
    status: raw.status as MasteryTestStatus,
    passingScore: typeof raw.passingScore === "number" ? Math.max(50, Math.min(100, Math.round(raw.passingScore))) : 80,
    startedAt: typeof raw.startedAt === "string" ? raw.startedAt : new Date().toISOString(),
    finishedAt: typeof raw.finishedAt === "string" ? raw.finishedAt : undefined,
    currentIndex: typeof raw.currentIndex === "number" && raw.currentIndex >= 0
      ? Math.min(questions.length - 1, Math.round(raw.currentIndex))
      : 0,
    questions,
    responses,
    score: typeof raw.score === "number" ? Math.max(0, Math.min(100, Math.round(raw.score))) : null,
    returnToSession: Boolean(raw.returnToSession)
  };
}

function sanitizeMasteryTestQuestion(value: unknown, missionId: string): MasteryTestQuestion | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<MasteryTestQuestion>;
  if (!raw.id || !raw.question || !raw.answer) return null;

  return {
    id: raw.id,
    missionId,
    competencyId: typeof raw.competencyId === "string" ? raw.competencyId : `${missionId}-understand`,
    type: MASTERY_QUESTION_TYPE_VALUES.has(raw.type as MasteryQuestionType)
      ? raw.type as MasteryQuestionType
      : "open-question",
    question: raw.question.slice(0, 2000),
    answer: raw.answer.slice(0, 2000),
    explanation: typeof raw.explanation === "string" ? raw.explanation.slice(0, 2000) : undefined
  };
}

function sanitizeMasteryTestHistory(value: unknown, validChapterIds: Set<string>): MasteryTestHistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<MasteryTestHistoryEntry>;
      if (!raw.id || !raw.missionId || !validChapterIds.has(raw.missionId)) return null;
      return {
        id: raw.id,
        missionId: raw.missionId,
        score: typeof raw.score === "number" ? Math.max(0, Math.min(100, Math.round(raw.score))) : 0,
        passed: Boolean(raw.passed),
        finishedAt: typeof raw.finishedAt === "string" ? raw.finishedAt : new Date().toISOString(),
        wrongQuestionIds: Array.isArray(raw.wrongQuestionIds)
          ? raw.wrongQuestionIds.filter((id): id is string => typeof id === "string")
          : [],
        competencyIds: Array.isArray(raw.competencyIds)
          ? raw.competencyIds.filter((id): id is string => typeof id === "string")
          : []
      };
    })
    .filter((item): item is MasteryTestHistoryEntry => Boolean(item))
    .slice(0, 100);
}

function sanitizeMissionReviewAttempt(value: unknown, validChapterIds: Set<string>): MissionReviewAttempt | null {
  return sanitizeMasteryTestAttempt(value, validChapterIds);
}

function sanitizeMissionReviewHistory(value: unknown, validChapterIds: Set<string>): MissionReviewHistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<MissionReviewHistoryEntry>;
      if (!raw.id || !raw.missionId || !validChapterIds.has(raw.missionId)) return null;
      return {
        id: raw.id,
        missionId: raw.missionId,
        score: typeof raw.score === "number" ? Math.max(0, Math.min(100, Math.round(raw.score))) : 0,
        passed: Boolean(raw.passed),
        finishedAt: typeof raw.finishedAt === "string" ? raw.finishedAt : new Date().toISOString()
      };
    })
    .filter((item): item is MissionReviewHistoryEntry => Boolean(item))
    .slice(0, 100);
}

function sanitizeCheckpointAttempt(value: unknown, data: AzubiForgeData): CheckpointAttempt | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<CheckpointAttempt>;
  const validSituationIds = new Set(
    Object.values(data.learningSituations || {}).flat().map((situation) => situation.id)
  );
  if (!raw.situationId || !validSituationIds.has(raw.situationId)) return null;
  if (!MASTERY_TEST_STATUS_VALUES.has(raw.status as MasteryTestStatus)) return null;
  if (!Array.isArray(raw.questions) || !raw.questions.length) return null;

  const questions = raw.questions
    .map((item) => sanitizeMasteryTestQuestion(item, String(raw.missionIds?.[0] || "unknown")))
    .filter((item): item is MasteryTestQuestion => Boolean(item));
  if (!questions.length) return null;

  return {
    id: typeof raw.id === "string" ? raw.id : `checkpoint-${Date.now()}`,
    situationId: raw.situationId,
    situationTitle: typeof raw.situationTitle === "string" ? raw.situationTitle.slice(0, 200) : "Checkpoint",
    learningFieldId: typeof raw.learningFieldId === "string" ? raw.learningFieldId : "",
    missionIds: Array.isArray(raw.missionIds) ? raw.missionIds.filter((id): id is string => typeof id === "string") : [],
    status: raw.status as MasteryTestStatus,
    passingScore: typeof raw.passingScore === "number" ? Math.max(50, Math.min(100, Math.round(raw.passingScore))) : 75,
    startedAt: typeof raw.startedAt === "string" ? raw.startedAt : new Date().toISOString(),
    finishedAt: typeof raw.finishedAt === "string" ? raw.finishedAt : undefined,
    currentIndex: typeof raw.currentIndex === "number" ? Math.max(0, Math.round(raw.currentIndex)) : 0,
    questions,
    responses: typeof raw.responses === "object" && raw.responses ? raw.responses as CheckpointAttempt["responses"] : {},
    score: typeof raw.score === "number" ? Math.max(0, Math.min(100, Math.round(raw.score))) : null
  };
}

function sanitizeCheckpointHistory(value: unknown, data: AzubiForgeData): CheckpointHistoryEntry[] {
  if (!Array.isArray(value)) return [];
  const validSituationIds = new Set(
    Object.values(data.learningSituations || {}).flat().map((situation) => situation.id)
  );
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<CheckpointHistoryEntry>;
      if (!raw.id || !raw.situationId || !validSituationIds.has(raw.situationId)) return null;
      return {
        id: raw.id,
        situationId: raw.situationId,
        learningFieldId: typeof raw.learningFieldId === "string" ? raw.learningFieldId : "",
        situationTitle: typeof raw.situationTitle === "string" ? raw.situationTitle.slice(0, 200) : "Checkpoint",
        score: typeof raw.score === "number" ? Math.max(0, Math.min(100, Math.round(raw.score))) : 0,
        passed: Boolean(raw.passed),
        finishedAt: typeof raw.finishedAt === "string" ? raw.finishedAt : new Date().toISOString()
      };
    })
    .filter((item): item is CheckpointHistoryEntry => Boolean(item))
    .slice(0, 50);
}

function sanitizeAttemptRecord(value: unknown): Record<string, string> {
  const record: Record<string, string> = {};
  if (!value || typeof value !== "object") return record;
  Object.entries(value).forEach(([key, item]) => {
    if (typeof key === "string" && typeof item === "string" && item.trim()) {
      record[key] = item.trim().slice(0, 2000);
    }
  });
  return record;
}

function sanitizeBooleanMap(value: unknown): Record<string, boolean> {
  const record: Record<string, boolean> = {};
  if (!value || typeof value !== "object") return record;
  Object.entries(value).forEach(([key, item]) => {
    if (typeof key === "string") record[key] = Boolean(item);
  });
  return record;
}
