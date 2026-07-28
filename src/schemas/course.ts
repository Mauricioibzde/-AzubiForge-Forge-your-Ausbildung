import type { CourseInfo } from "../types";
import type { Mission } from "./mission";

export interface Competency {
  id: string;
  learningFieldId: string;
  title: string;
  description: string;
  missionIds: string[];
}

export interface LearningSituationSchema {
  id: string;
  learningFieldId: string;
  title: string;
  description: string;
  missionIds: string[];
}

export interface LearningField {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  situationIds: string[];
  missionIds: string[];
}

export interface PlannerConfig {
  reviewSharePercent: number;
  progressSharePercent: number;
  consolidationSharePercent: number;
  defaultSessionMinutes: number;
}

export interface NormalizedCourse {
  id: string;
  title: string;
  description: string;
  basis: string[];
  copyrightNote?: string;
  learningFields: LearningField[];
  learningSituations: LearningSituationSchema[];
  competencies: Competency[];
  missions: Mission[];
  missionsById: Record<string, Mission>;
  plannerConfig: PlannerConfig;
}

export const DEFAULT_PLANNER_CONFIG: PlannerConfig = {
  reviewSharePercent: 30,
  progressSharePercent: 50,
  consolidationSharePercent: 20,
  defaultSessionMinutes: 30
};

export function courseInfoFromLegacy(course: CourseInfo): Pick<NormalizedCourse, "id" | "title" | "description" | "basis" | "copyrightNote"> {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    basis: course.basis || [],
    copyrightNote: course.copyrightNote
  };
}
