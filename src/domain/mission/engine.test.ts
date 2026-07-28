import { describe, expect, it } from "vitest";
import { applyMissionEvent, createInitialMissionProgress, isMissionUnlocked, missionProgressFromLegacyState } from "./engine";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";

describe("mission state engine", () => {
  it("unlocks from locked to available", () => {
    const progress = createInitialMissionProgress("locked");
    const next = applyMissionEvent(progress, { type: "UNLOCK" });
    expect(next.status).toBe("available");
  });

  it("moves through study to practice-required", () => {
    let progress = applyMissionEvent(createInitialMissionProgress("available"), {
      type: "START",
      phase: "learn"
    });
    progress = applyMissionEvent(progress, {
      type: "COMPLETE_STUDY",
      completedBlockIds: ["a", "b"],
      totalBlocks: 2
    });
    expect(progress.status).toBe("practice-required");
    expect(progress.masteryLevel).toBeGreaterThanOrEqual(2);
  });

  it("passes test at 80% to provisionally-mastered", () => {
    let progress = createInitialMissionProgress("ready-for-test");
    progress = applyMissionEvent(progress, { type: "SUBMIT_TEST", score: 85 });
    expect(progress.status).toBe("provisionally-mastered");
    expect(progress.masteryLevel).toBe(5);
  });

  it("fails test below threshold", () => {
    const progress = applyInitialTestPath(72);
    const next = applyMissionEvent(progress, { type: "SUBMIT_TEST", score: 65 });
    expect(next.status).toBe("test-failed");
    expect(next.attempts).toBe(1);
  });

  it("masters after successful review", () => {
    let progress = createInitialMissionProgress("provisionally-mastered");
    progress.masteryTestScore = 85;
    progress = applyMissionEvent(progress, { type: "SUBMIT_REVIEW", score: 75 });
    expect(progress.status).toBe("mastered");
    expect(progress.masteryLevel).toBe(6);
    expect(progress.completedAt).toBeTruthy();
  });

  it("checks prerequisite unlock", () => {
    const m1 = applyMissionEvent(createInitialMissionProgress("available"), { type: "SUBMIT_TEST", score: 90 });
    m1.status = "mastered";
    const map = { m1 };
    expect(isMissionUnlocked(map, ["m1"])).toBe(true);
    expect(isMissionUnlocked(map, ["missing"])).toBe(false);
  });
});

function applyInitialTestPath(practiceScore: number) {
  let progress = applyMissionEvent(createInitialMissionProgress("available"), {
    type: "START",
    phase: "practice"
  });
  progress = applyMissionEvent(progress, { type: "SUBMIT_PRACTICE", score: practiceScore });
  progress.status = "ready-for-test";
  return progress;
}

describe("completion rules defaults", () => {
  it("uses 80% mastery threshold", () => {
    expect(DEFAULT_COMPLETION_RULES.minimumMasteryTestScore).toBe(80);
  });
});

describe("legacy mastery bridge", () => {
  it("reflects failed mastery test in mission progress", () => {
    const state = {
      completed: [],
      lastChapterId: "m1",
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
        theme: "dark" as const,
        readingSize: "normal" as const,
        onboardingDone: true,
        dailyGoalSessions: 1,
        studyGoal: "Test"
      },
      activeStudySession: null,
      studySessionHistory: [],
      missionReviews: {},
      activeMasteryTest: null,
      masteryTestHistory: [{
        id: "t1",
        missionId: "m1",
        score: 55,
        passed: false,
        finishedAt: new Date().toISOString(),
        wrongQuestionIds: ["q1"],
        competencyIds: ["c1"]
      }],
      activeMissionReview: null,
      missionReviewHistory: [],
      activeCheckpoint: null,
      checkpointHistory: []
    };

    const progress = missionProgressFromLegacyState("m1", state, 2);
    expect(progress.status).toBe("test-failed");
    expect(progress.masteryTestScore).toBe(55);
  });
});
