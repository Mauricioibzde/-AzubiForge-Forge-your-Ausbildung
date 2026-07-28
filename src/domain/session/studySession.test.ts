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
  resumeStudySession
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
    expect(activities.length).toBe(5);
    expect(activities[0].kind).toBe("reader-step");
    expect(activities[0].readerTab).toBe("explain");
  });

  it("creates and tracks session progress", () => {
    const ctx = mockCtx();
    const session = createStudySessionFromPlan(samplePlan, ctx);
    expect(session.status).toBe("active");
    expect(session.activities.length).toBe(5);

    const progress = getSessionActivityProgress(session);
    expect(progress.completed).toBe(0);
    expect(progress.total).toBe(5);
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

  it("completes activities and marks reader steps", () => {
    const ctx = mockCtx();
    let session = createStudySessionFromPlan(samplePlan, ctx);
    session = completeCurrentActivity(session, ctx.state);
    expect(session.completedActivityIds.length).toBe(1);
    expect(ctx.state.sessionSteps.m1).toContain("explain");
  });

  it("finishes with summary", () => {
    const ctx = mockCtx();
    let session = createStudySessionFromPlan(samplePlan, ctx);
    session.activities.forEach(() => {
      session = completeCurrentActivity(session, ctx.state);
    });
    const { summary } = finishStudySession(session);
    expect(summary.activitiesCompleted).toBe(5);
    expect(summary.missionIds).toEqual(["m1"]);
  });
});
