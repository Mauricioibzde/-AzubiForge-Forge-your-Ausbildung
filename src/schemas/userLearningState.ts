import type { MissionProgress, MissionStatus } from "./mission";

export type StudyObjective = "ap1" | "school" | "general";

export interface UserProfile {
  objective: StudyObjective;
  examDate: string | null;
  availableDays: number[];
  minutesPerSession: number;
  studiedLearningFieldIds: string[];
  difficultTopicIds: string[];
  followBookOrder: boolean;
}

export interface CompetencyProgress {
  masteryLevel: number;
  evidenceIds: string[];
  lastInteractionAt: string | null;
}

export interface ReviewEntry {
  missionId: string;
  reviewLevel: number;
  lastReviewedAt: string | null;
  nextReviewAt: string | null;
  lastScore: number | null;
  status: "scheduled" | "due" | "completed";
}

export interface DailyPlanTask {
  id: string;
  type: "review" | "continue-mission" | "new-mission" | "test" | "practice";
  missionId: string;
  title: string;
  learningFieldId: string;
  estimatedMinutes: number;
  priority: number;
  reason: string;
  status: MissionStatus | "pending";
}

export interface DailyPlan {
  date: string;
  availableMinutes: number;
  tasks: DailyPlanTask[];
  totalEstimatedMinutes: number;
}

export interface StudySessionRecord {
  id: string;
  startedAt: string;
  endedAt: string | null;
  missionId: string | null;
  tasksCompleted: string[];
  minutesStudied: number;
}

export interface UserLearningState {
  profile: UserProfile;
  missionProgress: Record<string, MissionProgress>;
  competencyProgress: Record<string, CompetencyProgress>;
  reviews: ReviewEntry[];
  dailyPlans: Record<string, DailyPlan>;
  studySessions: StudySessionRecord[];
  questionHistory: Record<string, { attempts: number; lastScore: number | null }>;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  objective: "ap1",
  examDate: null,
  availableDays: [1, 2, 3, 4, 5],
  minutesPerSession: 30,
  studiedLearningFieldIds: [],
  difficultTopicIds: [],
  followBookOrder: true
};

export function createEmptyUserLearningState(): UserLearningState {
  return {
    profile: { ...DEFAULT_USER_PROFILE },
    missionProgress: {},
    competencyProgress: {},
    reviews: [],
    dailyPlans: {},
    studySessions: [],
    questionHistory: {}
  };
}
