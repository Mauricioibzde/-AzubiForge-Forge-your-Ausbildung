import type { AppState } from "../types";
import type { NormalizedCourse } from "../schemas/course";
import type { UserLearningState } from "../schemas/userLearningState";
import { createEmptyUserLearningState, DEFAULT_USER_PROFILE } from "../schemas/userLearningState";
import { missionProgressFromLegacyState } from "../domain/mission/engine";

/** Derives session length from legacy preferences (1 session ≈ 30 min). */
export function minutesPerSessionFromPreferences(state: AppState): number {
  const sessions = Math.max(1, state.preferences.dailyGoalSessions || 1);
  return Math.min(120, Math.max(15, sessions * 30));
}

/**
 * Non-destructive bridge: legacy AppState → UserLearningState for planner/insights.
 * When a normalized course is provided, missionProgress and reviews are filled from
 * the legacy bridge so consumers share the same derived progress.
 */
export function userLearningStateFromAppState(
  state: AppState,
  course?: NormalizedCourse
): UserLearningState {
  const userState = createEmptyUserLearningState();
  userState.profile = {
    ...DEFAULT_USER_PROFILE,
    objective: "ap1",
    minutesPerSession: minutesPerSessionFromPreferences(state)
  };

  if (course) {
    course.missions.forEach((mission) => {
      const blockCount = mission.phases.learn.blocks.length || 1;
      userState.missionProgress[mission.id] = missionProgressFromLegacyState(
        mission.id,
        state,
        blockCount
      );
    });

    const reviewIds = new Set([
      ...Object.keys(state.missionReviews),
      ...Object.keys(state.reviewSchedule)
    ]);
    userState.reviews = [...reviewIds].map((missionId) => {
      const record = state.missionReviews[missionId];
      const progress = userState.missionProgress[missionId];
      return {
        missionId,
        reviewLevel: record?.reviewLevel ?? progress?.reviewLevel ?? 0,
        lastReviewedAt: record?.lastReviewedAt ?? null,
        nextReviewAt: record?.nextReviewAt ?? state.reviewSchedule[missionId] ?? progress?.nextReviewAt ?? null,
        lastScore: record?.lastScore ?? null,
        status: record?.status
          || (progress?.status === "review-due" ? "due" : "scheduled")
      };
    });
  }

  return userState;
}
