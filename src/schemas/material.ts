/** Study material block types for mission phases (see 05_estrutura_data_js.md). */

export type StudyBlockType =
  | "objective"
  | "explanation"
  | "simple-explanation"
  | "technical-explanation"
  | "definition"
  | "important-term"
  | "example"
  | "counterexample"
  | "analogy"
  | "workplace-scenario"
  | "step-by-step"
  | "comparison"
  | "table"
  | "checklist"
  | "warning"
  | "common-mistake"
  | "exam-tip"
  | "diagram"
  | "timeline"
  | "formula"
  | "calculation-example"
  | "code-example"
  | "summary"
  | "glossary"
  | "source-reference";

export interface StudyBlock {
  id: string;
  type: StudyBlockType;
  title?: string;
  content: string[];
  metadata?: Record<string, string | string[]>;
}

export type ActivityType =
  | "single-choice"
  | "multiple-choice"
  | "true-false"
  | "matching"
  | "ordering"
  | "fill-blank"
  | "self-assessment"
  | "scenario-choice"
  | "open-question";

export interface MissionActivity {
  id: string;
  type: ActivityType;
  title: string;
  instruction: string;
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
  points: number;
  competencyIds: string[];
  question: string;
  answer: string;
  explanation?: string;
  criteria?: string[];
  modelAnswer?: string;
  minimumCriteria?: number;
}
