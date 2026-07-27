export type RouteName = "home" | "course" | "reader" | "review" | "glossary" | "docs-ai";

export type CourseFilter = "all" | "open" | "done" | "notes" | "hard";
export type GlossaryFilter = "all" | "network" | "security" | "database" | "programming";
export type ReaderTab = "explain" | "praxis" | "vocab" | "practice" | "ap1";
export type Confidence = "ok" | "review" | "hard" | "ready";
export type Theme = "light" | "dark";
export type ReadingSize = "normal" | "large";

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

export interface Preferences {
  theme: Theme;
  readingSize: ReadingSize;
}

export interface AppState {
  completed: string[];
  lastChapterId: string;
  notes: Record<string, string>;
  confidence: Record<string, Confidence>;
  collapsedModules: Record<string, boolean>;
  sessionSteps: Record<string, ReaderTab[]>;
  preferences: Preferences;
}

export interface UiState {
  courseQuery: string;
  courseFilter: CourseFilter;
  glossaryQuery: string;
  glossaryFilter: GlossaryFilter;
  globalQuery: string;
  readerTab: ReaderTab;
  readerChapterId: string;
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
