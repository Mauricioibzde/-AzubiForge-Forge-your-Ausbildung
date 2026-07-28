import type { NormalizedCourse } from "../../schemas/course";
import type { LearningField } from "../../schemas/course";
import type { MissionProgress } from "../../schemas/mission";
import type { AppState } from "../../types";
import { missionProgressFromLegacyState } from "../mission/engine";
import { getDueMissionReviewIds } from "../review/missionReview";

export interface LearningFieldMastery {
  learningFieldId: string;
  title: string;
  mastered: number;
  total: number;
  percent: number;
}

export interface HomeTodayInsights {
  dueMissionReviews: number;
  dueLegacyReviewItems: number;
  inProgressMissionId: string | null;
  inProgressMissionTitle: string | null;
  learningFieldMastery: LearningFieldMastery[];
}

function isMasteredLike(progress: MissionProgress): boolean {
  return ["mastered", "provisionally-mastered", "review-due"].includes(progress.status);
}

function missionProgressMap(course: NormalizedCourse, state: AppState): Record<string, MissionProgress> {
  const map: Record<string, MissionProgress> = {};
  course.missions.forEach((mission) => {
    const blockCount = mission.phases.learn.blocks.length || 1;
    map[mission.id] = missionProgressFromLegacyState(mission.id, state, blockCount);
  });
  return map;
}

function fieldMastery(
  field: LearningField,
  progressById: Record<string, MissionProgress>
): LearningFieldMastery {
  const total = field.missionIds.length;
  const mastered = field.missionIds.filter((missionId) => isMasteredLike(progressById[missionId])).length;
  const percent = total ? Math.round((mastered / total) * 100) : 0;
  return {
    learningFieldId: field.id,
    title: field.title,
    mastered,
    total,
    percent
  };
}

export function getHomeTodayInsights(course: NormalizedCourse, state: AppState): HomeTodayInsights {
  const progressById = missionProgressMap(course, state);
  const dueMissionReviews = getDueMissionReviewIds(state).length;
  const dueLegacyReviewItems = Object.entries(state.reviewSchedule).filter(([, dueAt]) => {
    const due = Date.parse(dueAt);
    return !Number.isNaN(due) && due <= Date.now();
  }).length;

  const inProgress = course.missions.find((mission) => {
    const progress = progressById[mission.id];
    return ["in-progress", "study-completed", "practice-required", "ready-for-test", "test-failed"].includes(progress.status);
  }) || null;

  const learningFieldMastery = course.learningFields
    .map((field) => fieldMastery(field, progressById))
    .sort((a, b) => b.percent - a.percent);

  return {
    dueMissionReviews,
    dueLegacyReviewItems,
    inProgressMissionId: inProgress?.id || null,
    inProgressMissionTitle: inProgress?.title || null,
    learningFieldMastery
  };
}
