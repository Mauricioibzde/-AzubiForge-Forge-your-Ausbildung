import { describe, expect, it } from "vitest";
import type { DailyPlan } from "../../schemas/userLearningState";
import type { AppContext } from "../../appContext";
import {
  buildSessionActivities,
  completeCurrentActivity,
  createStudySessionFromPlan,
  finishStudySession,
  getSessionActivityProgress,
  pauseStudySession,
  resumeStudySession,
  syncSessionFromEvidence
} from "./studySession";

function mockCtx(stateOverrides: Partial<AppContext["state"]> = {}): AppContext {
  return {
    data: {
      course: { id: "c", title: "T", description: "D" },
      modules: [],
      chapters: [{
        id: "m1",
        title: "Chapter 1",
        description: "Desc",
        text: [],
        ihk: "",
        summary: "",
        example: "",
        exercises: []
      }],
      glossary: []
    },
    state: {
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
      ...stateOverrides
    },
    ui: {} as AppContext["ui"]
  };
}

const samplePlan: DailyPlan = {
  date: "2026-07-28",
  availableMinutes: 30,
  totalEstimatedMinutes: 25,
  tasks: [{
    id: "new-m1",
    type: "new-mission",
    missionId: "m1",
    title: "Chapter 1",
    learningFieldId: "lf1",
    estimatedMinutes: 25,
    priority: 1,
    reason: "Proxima missao na sequencia.",
    status: "available"
  }]
};

describe("studySession", () => {
  it("builds reader-step activities for a new mission", () => {
    const activities = buildSessionActivities(samplePlan, mockCtx());
    expect(activities.length).toBeGreaterThanOrEqual(1);
    expect(activities.length).toBeLessThanOrEqual(5);
    expect(activities[0].kind).toBe("reader-step");
    expect(activities[0].readerTab).toBe("explain");
  });

  it("creates and tracks session progress", () => {
    const ctx = mockCtx();
    const session = createStudySessionFromPlan(samplePlan, ctx);
    expect(session.status).toBe("active");
    expect(session.activities.length).toBeGreaterThanOrEqual(1);

    const progress = getSessionActivityProgress(session);
    expect(progress.completed).toBe(0);
    expect(progress.total).toBe(session.activities.length);
  });

  it("pauses and resumes", () => {
    const session = createStudySessionFromPlan(samplePlan, mockCtx());
    const paused = pauseStudySession(session);
    expect(paused.status).toBe("paused");
    expect(paused.pausedAt).toBeTruthy();

    const resumed = resumeStudySession(paused);
    expect(resumed.status).toBe("active");
    expect(resumed.pausedAt).toBeNull();
  });

  it("blocks completion without learning evidence", () => {
    const ctx = mockCtx();
    let session = createStudySessionFromPlan(samplePlan, ctx);
    session = completeCurrentActivity(session, ctx.state);
    expect(session.completedActivityIds.length).toBe(0);
    expect(ctx.state.sessionSteps.m1).toBeUndefined();
  });

  it("completes activities only after evidence and marks reader steps", () => {
    const ctx = mockCtx();
    let session = createStudySessionFromPlan(samplePlan, ctx);
    ctx.state.stepArtifactSubmitted["explain:m1"] = true;
    session = completeCurrentActivity(session, ctx.state);
    expect(session.completedActivityIds.length).toBe(1);
    expect(ctx.state.sessionSteps.m1).toContain("explain");
  });

  it("builds only unevidenced steps in a focused chunk", () => {
    const ctx = mockCtx({
      stepArtifactSubmitted: {
        "explain:m1": true,
        "praxis:m1": true
      }
    });
    const activities = buildSessionActivities(samplePlan, ctx);
    expect(activities.every((activity) => activity.readerTab !== "explain")).toBe(true);
    expect(activities.every((activity) => activity.readerTab !== "praxis")).toBe(true);
    expect(activities.length).toBeGreaterThanOrEqual(1);
    expect(activities.length).toBeLessThanOrEqual(4);
  });

  it("auto-advances when returning with evidence already recorded", () => {
    const ctx = mockCtx();
    let session = createStudySessionFromPlan(samplePlan, ctx);
    expect(session.activities[0]?.readerTab).toBe("explain");
    expect(session.completedActivityIds.length).toBe(0);
    ctx.state.stepArtifactSubmitted["explain:m1"] = true;
    session = syncSessionFromEvidence(session, ctx.state);
    expect(session.completedActivityIds.length).toBe(1);
    expect(session.currentIndex).toBe(1);
  });

  it("finishes with summary when each step has evidence", () => {
    const ctx = mockCtx();
    let session = createStudySessionFromPlan(samplePlan, ctx);
    const total = session.activities.length;
    for (let i = 0; i < total; i += 1) {
      const activity = session.activities[session.currentIndex];
      if (activity?.readerTab === "explain") {
        ctx.state.stepArtifactSubmitted["explain:m1"] = true;
      }
      if (activity?.readerTab === "praxis") {
        ctx.state.stepArtifactSubmitted["praxis:m1"] = true;
      }
      if (activity?.readerTab === "vocab") {
        ctx.state.vocabChecks["vocab:m1:0"] = "correct";
      }
      if (activity?.readerTab === "practice") {
        ctx.state.exerciseChecks["m1:0"] = "correct";
      }
      if (activity?.readerTab === "ap1") {
        ctx.state.stepArtifactSubmitted["apply:m1-apply-fallback"] = true;
      }
      session = completeCurrentActivity(session, ctx.state);
    }
    const { summary } = finishStudySession(session);
    expect(summary.activitiesCompleted).toBe(total);
    expect(summary.missionIds).toEqual(["m1"]);
  });
});
