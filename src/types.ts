export type RouteName = "home" | "course" | "reader" | "review" | "glossary" | "docs-ai" | "exam";

export type CourseFilter = "all" | "open" | "done" | "notes" | "hard";
export type GlossaryFilter = "all" | "network" | "security" | "database" | "programming";
export type ReaderTab = "explain" | "praxis" | "vocab" | "practice" | "ap1";
export type Confidence = "ok" | "review" | "hard" | "ready";
export type Theme = "light" | "dark";
export type ReadingSize = "normal" | "large";
export type ExamFocusMode = "weak" | "signals" | "drill" | "checklist" | "mock";
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
export type ReadinessLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Preferences {
  theme: Theme;
  readingSize: ReadingSize;
  onboardingDone: boolean;
  dailyGoalSessions: number;
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
  examChecklist: Record<string, boolean>;
  mockExam: MockExamAttempt | null;
  mockExamHistory: MockExamHistoryEntry[];
  lastStudiedAt: Record<string, string>;
  studyDates: string[];
  preferences: Preferences;
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
  readerVocabMode: "grid" | "flash";
  readerVocabIndex: number;
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
