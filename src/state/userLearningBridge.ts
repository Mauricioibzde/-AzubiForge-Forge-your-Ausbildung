import type { AppState } from "../types";
import type { UserLearningState } from "../schemas/userLearningState";
import { createEmptyUserLearningState, DEFAULT_USER_PROFILE } from "../schemas/userLearningState";

/** Derives session length from legacy preferences (1 session ≈ 30 min). */
export function minutesPerSessionFromPreferences(state: AppState): number {
  const sessions = Math.max(1, state.preferences.dailyGoalSessions || 1);
  return Math.min(120, Math.max(15, sessions * 30));
}

/** Non-destructive bridge: legacy AppState → UserLearningState shell for the planner. */
export function userLearningStateFromAppState(state: AppState): UserLearningState {
  const userState = createEmptyUserLearningState();
  userState.profile = {
    ...DEFAULT_USER_PROFILE,
    objective: "ap1",
    minutesPerSession: minutesPerSessionFromPreferences(state)
  };
  return userState;
}
