import { describe, expect, it } from "vitest";
import {
  applyMissionReviewScore,
  getDueMissionReviewIds,
  MISSION_REVIEW_INTERVALS_DAYS
} from "./missionReview";
import type { AppState } from "../../types";

function emptyState(): AppState {
  return {
    completed: [],
    lastChapterId: "",
    notes: {},
    confidence: {},
    collapsedModules: {},
    sessionSteps: {},
    exerciseChecks: {},
    vocabChecks: {},
    reviewSchedule: {},
    reviewDailyResolved: {},
    reviewResolvedKeyDay: {},
    examChecklist: {},
    mockExam: null,
    mockExamHistory: [],
    lastStudiedAt: {},
    studyDates: [],
    preferences: {
      theme: "dark",
      readingSize: "normal",
      onboardingDone: true,
      dailyGoalSessions: 1,
      studyGoal: "Test"
    },
    activeStudySession: null,
    studySessionHistory: [],
    missionReviews: {},
    activeMasteryTest: null,
    masteryTestHistory: [],
    activeMissionReview: null,
    missionReviewHistory: [],
    activeCheckpoint: null,
    checkpointHistory: [],
    vocabAttempts: {},
    practiceAttempts: {},
    practiceRevealed: {},
    applyCriteriaChecks: {},
    stepArtifacts: {},
    stepArtifactSubmitted: {},
  };
}

describe("missionReview", () => {
  it("advances level at 85% or more", () => {
    const state = emptyState();
    const record = applyMissionReviewScore(state, "m1", 90, Date.parse("2026-07-28"));
    expect(record.reviewLevel).toBe(1);
    expect(record.nextReviewAt).toBe(new Date(Date.parse("2026-07-28") + MISSION_REVIEW_INTERVALS_DAYS[1] * 86400000).toISOString());
  });

  it("maintains level between 70 and 84", () => {
    const state = emptyState();
    state.missionReviews.m1 = {
      reviewLevel: 2,
      lastReviewedAt: null,
      nextReviewAt: null,
      lastScore: null,
      status: "scheduled"
    };
    const record = applyMissionReviewScore(state, "m1", 75, Date.parse("2026-07-28"));
    expect(record.reviewLevel).toBe(2);
  });

  it("reduces level below 70%", () => {
    const state = emptyState();
    state.missionReviews.m1 = {
      reviewLevel: 3,
      lastReviewedAt: null,
      nextReviewAt: null,
      lastScore: null,
      status: "scheduled"
    };
    const record = applyMissionReviewScore(state, "m1", 55, Date.parse("2026-07-28"));
    expect(record.reviewLevel).toBe(2);
    expect(record.status).toBe("due");
  });

  it("lists due mission reviews", () => {
    const state = emptyState();
    state.reviewSchedule.m1 = "2026-07-27T00:00:00.000Z";
    const due = getDueMissionReviewIds(state, Date.parse("2026-07-28"));
    expect(due).toContain("m1");
  });
});
