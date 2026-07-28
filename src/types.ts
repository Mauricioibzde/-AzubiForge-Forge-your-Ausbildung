export type RouteName = "home" | "course" | "reader" | "review" | "glossary" | "docs-ai" | "exam" | "session" | "mastery" | "review-mission" | "checkpoint";

export type CourseFilter = "all" | "open" | "done" | "notes" | "hard";
export type GlossaryFilter = "all" | "network" | "security" | "database" | "programming";
export type ReaderTab = "explain" | "praxis" | "vocab" | "practice" | "ap1";
export type Confidence = "ok" | "review" | "hard" | "ready";
export type Theme = "light" | "dark";
export type ReadingSize = "normal" | "large";
export type ExamFocusMode = "weak" | "signals" | "drill" | "checklist" | "mock" | "mistakes" | "lernfeld";
export type StudySessionStatus = "active" | "paused" | "completed";
export type StudySessionActivityKind = "reader-step" | "review" | "mastery-test";
export type MissionReviewStatus = "scheduled" | "due" | "completed";
export type MasteryTestStatus = "active" | "grading" | "finished";
export type MasteryQuestionType = "scenario-choice" | "open-question" | "true-false";
export type MockExamLength = "short" | "full";
export type MockExamStatus = "active" | "grading" | "finished";
export type ExerciseCheck = "correct" | "wrong";

export interface MockExamQuestion {
  id: string;
  chapterId: string;
  chapterTitle: string;
  moduleTitle: string;
  question: string;
  answer: string;
  explanation?: string;
  style: "ap1" | "mixed";
}

export interface MockExamResponse {
  answered?: boolean;
  notes?: string;
  selfCheck?: ExerciseCheck;
}

export interface MockExamAttempt {
  id: string;
  length: MockExamLength;
  status: MockExamStatus;
  startedAt: string;
  finishedAt?: string;
  durationMinutes: number;
  currentIndex: number;
  questions: MockExamQuestion[];
  responses: Record<string, MockExamResponse>;
  learningFieldId?: string;
  simulationLabel?: string;
}

export interface MockExamHistoryEntry {
  id: string;
  length: MockExamLength;
  finishedAt: string;
  correct: number;
  total: number;
  percent: number;
  elapsedSeconds: number;
}

export interface Exercise {
  question: string;
  answer: string;
  explanation?: string;
}

export interface VocabularyRow {
  de: string;
  pt: string;
  explanation: string;
  example: string;
}

export interface ContentBlock {
  title: string;
  paragraphs: string[];
  steps?: string[];
}

export interface Diagram {
  title: string;
  code: string;
}

export interface ChapterFullContent {
  studyTime: string;
  difficulty: string;
  importance: {
    stars: string;
    explanation: string[];
  };
  objectives: string[];
  introduction: string[];
  explanation: ContentBlock[];
  realWorldExamples: string[];
  practicalExamples: ContentBlock[];
  diagrams: Diagram[];
  ihkFocus: {
    appears: string[];
    commonMistakes: string[];
    importantDetails: string[];
    confusedConcepts: string[];
    vocabulary: string[];
  };
  commonMistakes: string[];
  vocabulary: VocabularyRow[];
  summary: string[];
  mindMap: Diagram;
  exercises: {
    easy: Exercise[];
    intermediate: Exercise[];
    ap1Style: Exercise[];
  };
  related: {
    previous: string;
    next: string;
  };
  revisionChecklist: string[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  text: string[];
  ihk: string;
  summary: string;
  example: string;
  exercises: Exercise[];
  studyTime?: string;
  difficulty?: string;
  fullContent?: ChapterFullContent;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  chapterIds: string[];
}

export interface GlossaryTerm {
  word: string;
  translation: string;
  explanation: string;
}

export interface LearningSituation {
  id: string;
  title: string;
  description: string;
  chapterIds: string[];
}

export interface CourseInfo {
  id: string;
  title: string;
  description: string;
  basis?: string[];
  copyrightNote?: string;
}

export interface AzubiForgeData {
  course: CourseInfo;
  modules: Module[];
  chapters: Chapter[];
  glossary: GlossaryTerm[];
  learningSituations?: Record<string, LearningSituation[]>;
}

export type ReviewFocusMode = "flash" | "quiz";
export type ReviewDeckFilter = "all" | "wrong" | "due";
export type ReadinessLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Preferences {
  theme: Theme;
  readingSize: ReadingSize;
  onboardingDone: boolean;
  dailyGoalSessions: number;
  studyGoal: string;
}

export interface StudySessionActivity {
  id: string;
  kind: StudySessionActivityKind;
  missionId: string;
  title: string;
  instruction: string;
  estimatedMinutes: number;
  readerTab?: ReaderTab;
  planTaskId?: string;
}

export interface StudySession {
  id: string;
  planDate: string;
  status: StudySessionStatus;
  startedAt: string;
  pausedAt: string | null;
  endedAt: string | null;
  activities: StudySessionActivity[];
  currentIndex: number;
  completedActivityIds: string[];
}

export interface StudySessionSummary {
  id: string;
  planDate: string;
  startedAt: string;
  endedAt: string;
  activitiesCompleted: number;
  activitiesTotal: number;
  minutesStudied: number;
  missionIds: string[];
}

export interface MissionReviewRecord {
  reviewLevel: number;
  lastReviewedAt: string | null;
  nextReviewAt: string | null;
  lastScore: number | null;
  status: MissionReviewStatus;
}

export interface MasteryTestQuestion {
  id: string;
  missionId: string;
  competencyId: string;
  type: MasteryQuestionType;
  question: string;
  answer: string;
  explanation?: string;
}

export interface MasteryTestResponse {
  answered?: boolean;
  notes?: string;
  selfCheck?: ExerciseCheck;
}

export interface MasteryTestAttempt {
  id: string;
  missionId: string;
  missionTitle: string;
  status: MasteryTestStatus;
  passingScore: number;
  startedAt: string;
  finishedAt?: string;
  currentIndex: number;
  questions: MasteryTestQuestion[];
  responses: Record<string, MasteryTestResponse>;
  score: number | null;
  returnToSession: boolean;
}

export interface MasteryTestHistoryEntry {
  id: string;
  missionId: string;
  score: number;
  passed: boolean;
  finishedAt: string;
  wrongQuestionIds: string[];
  competencyIds: string[];
}

export interface SelfCheckAssessment {
  status: MasteryTestStatus;
  passingScore: number;
  currentIndex: number;
  questions: MasteryTestQuestion[];
  responses: Record<string, MasteryTestResponse>;
  score: number | null;
}

export type MissionReviewAttempt = MasteryTestAttempt;

export interface CheckpointAttempt {
  id: string;
  situationId: string;
  situationTitle: string;
  learningFieldId: string;
  missionIds: string[];
  status: MasteryTestStatus;
  passingScore: number;
  startedAt: string;
  finishedAt?: string;
  currentIndex: number;
  questions: MasteryTestQuestion[];
  responses: Record<string, MasteryTestResponse>;
  score: number | null;
}

export interface CheckpointHistoryEntry {
  id: string;
  situationId: string;
  learningFieldId: string;
  situationTitle: string;
  score: number;
  passed: boolean;
  finishedAt: string;
}

export interface MissionReviewHistoryEntry {
  id: string;
  missionId: string;
  score: number;
  passed: boolean;
  finishedAt: string;
}

export interface AppState {
  completed: string[];
  lastChapterId: string;
  notes: Record<string, string>;
  confidence: Record<string, Confidence>;
  collapsedModules: Record<string, boolean>;
  sessionSteps: Record<string, ReaderTab[]>;
  exerciseChecks: Record<string, ExerciseCheck>;
  vocabChecks: Record<string, ExerciseCheck>;
  reviewSchedule: Record<string, string>;
  reviewDailyResolved: Record<string, number>;
  reviewResolvedKeyDay: Record<string, string>;
  examChecklist: Record<string, boolean>;
  mockExam: MockExamAttempt | null;
  mockExamHistory: MockExamHistoryEntry[];
  lastStudiedAt: Record<string, string>;
  studyDates: string[];
  preferences: Preferences;
  activeStudySession: StudySession | null;
  studySessionHistory: StudySessionSummary[];
  missionReviews: Record<string, MissionReviewRecord>;
  activeMasteryTest: MasteryTestAttempt | null;
  masteryTestHistory: MasteryTestHistoryEntry[];
  activeMissionReview: MissionReviewAttempt | null;
  missionReviewHistory: MissionReviewHistoryEntry[];
  activeCheckpoint: CheckpointAttempt | null;
  checkpointHistory: CheckpointHistoryEntry[];
}

export interface UiState {
  courseQuery: string;
  courseFilter: CourseFilter;
  glossaryQuery: string;
  glossaryFilter: GlossaryFilter;
  glossaryMode: "list" | "flash";
  glossaryFocusIndex: number;
  globalQuery: string;
  readerTab: ReaderTab;
  readerChapterId: string;
  reviewFocusMode: ReviewFocusMode;
  reviewFocusIndex: number;
  practiceFilter: "all" | "wrong";
  glossaryWrongOnly: boolean;
  reviewDeckFilter: ReviewDeckFilter;
  examDrillWrongOnly: boolean;
  readerVocabMode: "grid" | "flash";
  readerVocabIndex: number;
  readerPracticeMode: "list" | "flash";
  readerPracticeIndex: number;
  examFocusMode: ExamFocusMode;
  examFocusIndex: number;
  completeGateChapterId: string;
  confidenceGateChapterId: string;
  confidenceGateMessage: string;
  docsAiFocus: "study-plan" | "chapter-help" | "review";
  docsAiChapterId: string;
}

export interface SessionStep {
  id: ReaderTab;
  label: string;
  hint: string;
}

export interface Progress {
  completed: number;
  total: number;
  percent: number;
}

export interface Readiness {
  level: ReadinessLevel;
  label: string;
  percent: number;
  reasons: string[];
}
