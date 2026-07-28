import { describe, expect, it } from "vitest";
import { countMasteryProgress, countStudyProgress, makeProgress } from "./courseProgress";
import type { AppState } from "../../types";

function baseState(overrides: Partial<AppState> = {}): AppState {
  return {
    completed: [],
    lastChapterId: "a",
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
      studyGoal: ""
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
    ...overrides
  };
}

describe("courseProgress", () => {
  it("counts study from evidence without counting as mastery", () => {
    const state = baseState({
      sessionSteps: { a: ["explain"], b: ["explain", "praxis"] },
      stepArtifactSubmitted: { "explain:a": true, "praxis:b": true },
      completed: ["c"]
    });
    // Visits alone on a/b without artifacts would not count; a and b have artifacts; c is marked complete.
    expect(countStudyProgress(state, ["a", "b", "c", "d"])).toEqual(makeProgress(3, 4));
    expect(countMasteryProgress(state, ["a", "b", "c", "d"])).toEqual(makeProgress(0, 4));
  });

  it("does not count mere visits as percurso", () => {
    const state = baseState({
      sessionSteps: { a: ["explain", "praxis", "vocab"] }
    });
    expect(countStudyProgress(state, ["a", "b"])).toEqual(makeProgress(0, 2));
  });

  it("counts mastery only from passed tests", () => {
    const state = baseState({
      masteryTestHistory: [{
        id: "t1",
        missionId: "a",
        score: 90,
        passed: true,
        finishedAt: new Date().toISOString(),
        wrongQuestionIds: [],
        competencyIds: []
      }]
    });
    expect(countMasteryProgress(state, ["a", "b"])).toEqual(makeProgress(1, 2));
  });
});
