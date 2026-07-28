import type { MissionActivity, StudyBlock } from "./material";

export type MissionStatus =
  | "locked"
  | "available"
  | "in-progress"
  | "study-completed"
  | "practice-required"
  | "ready-for-test"
  | "test-failed"
  | "needs-review"
  | "provisionally-mastered"
  | "mastered"
  | "review-due";

export type MissionPhaseId = "prepare" | "learn" | "practice" | "apply" | "test";

export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CompletionRules {
  requireAllStudyBlocks: boolean;
  minimumPracticeScore: number;
  requireAppliedChallenge: boolean;
  minimumMasteryTestScore: number;
  delayedReviewRequired: boolean;
  minimumReviewScore: number;
}

export interface ReviewConfig {
  intervalsInDays: number[];
}

export interface MissionPhasePrepare {
  estimatedMinutes: number;
  blocks: StudyBlock[];
}

export interface MissionPhaseLearn {
  estimatedMinutes: number;
  required: boolean;
  blocks: StudyBlock[];
}

export interface MissionPhasePractice {
  estimatedMinutes: number;
  required: boolean;
  activities: MissionActivity[];
}

export interface MissionPhaseApply {
  estimatedMinutes: number;
  required: boolean;
  activities: MissionActivity[];
}

export interface MissionPhaseTest {
  estimatedMinutes: number;
  required: boolean;
  questionPoolIds: string[];
  questionCount: number;
  passingScore: number;
}

export interface MissionPhases {
  prepare: MissionPhasePrepare;
  learn: MissionPhaseLearn;
  practice: MissionPhasePractice;
  apply: MissionPhaseApply;
  test: MissionPhaseTest;
}

export type ExamRelevance = "low" | "medium" | "high";

export interface Mission {
  id: string;
  legacyChapterId: string;
  learningFieldId: string;
  learningSituationId: string;
  title: string;
  description: string;
  objective: string;
  competencyIds: string[];
  prerequisiteMissionIds: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  examRelevance: ExamRelevance;
  phases: MissionPhases;
  completionRules: CompletionRules;
  reviewConfig: ReviewConfig;
  rewards: { xp: number };
}

export interface MissionProgress {
  status: MissionStatus;
  currentPhase: MissionPhaseId | null;
  completedBlockIds: string[];
  practiceScore: number | null;
  applyScore: number | null;
  masteryTestScore: number | null;
  reviewScore: number | null;
  masteryLevel: MasteryLevel;
  attempts: number;
  startedAt: string | null;
  completedAt: string | null;
  reviewLevel: number;
  nextReviewAt: string | null;
}

export const DEFAULT_COMPLETION_RULES: CompletionRules = {
  requireAllStudyBlocks: true,
  minimumPracticeScore: 70,
  requireAppliedChallenge: true,
  minimumMasteryTestScore: 80,
  delayedReviewRequired: true,
  minimumReviewScore: 70
};

export const DEFAULT_REVIEW_CONFIG: ReviewConfig = {
  intervalsInDays: [1, 3, 7, 14, 30, 60]
};

export const MISSION_STATUS_LABELS: Record<MissionStatus, string> = {
  locked: "Bloqueada",
  available: "Disponível",
  "in-progress": "Em andamento",
  "study-completed": "Estudo concluído",
  "practice-required": "Prática pendente",
  "ready-for-test": "Pronta para o teste",
  "test-failed": "Teste não aprovado",
  "needs-review": "Precisa revisar",
  "provisionally-mastered": "Domínio inicial",
  mastered: "Dominada",
  "review-due": "Revisão disponível"
};
