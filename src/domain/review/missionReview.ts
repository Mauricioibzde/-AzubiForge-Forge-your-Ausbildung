import type { AppState, MissionReviewRecord, MissionReviewStatus } from "../../types";

export const MISSION_REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30, 60] as const;

const DAY_MS = 24 * 60 * 60 * 1000;

export function createInitialMissionReview(): MissionReviewRecord {
  return {
    reviewLevel: 0,
    lastReviewedAt: null,
    nextReviewAt: null,
    lastScore: null,
    status: "scheduled"
  };
}

export function applyMissionReviewScore(
  state: AppState,
  missionId: string,
  score: number,
  now = Date.now()
): MissionReviewRecord {
  const current = state.missionReviews[missionId] || createInitialMissionReview();
  let level = current.reviewLevel;

  if (score >= 85) {
    level = Math.min(MISSION_REVIEW_INTERVALS_DAYS.length - 1, level + 1);
  } else if (score < 70) {
    level = Math.max(0, level - 1);
  }

  const days = MISSION_REVIEW_INTERVALS_DAYS[level];
  const nextReviewAt = new Date(now + days * DAY_MS).toISOString();
  const status: MissionReviewStatus = score >= 70 ? "scheduled" : "due";

  const record: MissionReviewRecord = {
    reviewLevel: level,
    lastReviewedAt: new Date(now).toISOString(),
    nextReviewAt,
    lastScore: score,
    status
  };

  state.missionReviews[missionId] = record;
  state.reviewSchedule[missionId] = nextReviewAt;
  return record;
}

export function isMissionReviewDue(
  state: AppState,
  missionId: string,
  now = Date.now()
): boolean {
  const record = state.missionReviews[missionId];
  if (record?.nextReviewAt) {
    const due = Date.parse(record.nextReviewAt);
    return !Number.isNaN(due) && due <= now;
  }

  const legacyDue = state.reviewSchedule[missionId];
  if (!legacyDue) return false;
  const due = Date.parse(legacyDue);
  return !Number.isNaN(due) && due <= now;
}

export function scheduleInitialMissionReview(
  state: AppState,
  missionId: string,
  now = Date.now()
): MissionReviewRecord {
  return applyMissionReviewScore(state, missionId, 85, now);
}

export function getDueMissionReviewIds(state: AppState, now = Date.now()): string[] {
  const ids = new Set<string>([
    ...Object.keys(state.missionReviews),
    ...Object.keys(state.reviewSchedule)
  ]);

  return [...ids].filter((missionId) => isMissionReviewDue(state, missionId, now));
}
