import { describe, expect, it } from "vitest";
import { generateDailyPlan } from "./generateDailyPlan";
import type { NormalizedCourse } from "../../schemas/course";
import { DEFAULT_PLANNER_CONFIG } from "../../schemas/course";
import type { Mission } from "../../schemas/mission";
import { DEFAULT_COMPLETION_RULES, DEFAULT_REVIEW_CONFIG } from "../../schemas/mission";
import type { AppState } from "../../types";
import { createEmptyUserLearningState } from "../../schemas/userLearningState";

function buildMission(id: string, minutes: number, testMinutes = 10): Mission {
  return {
    id,
    legacyChapterId: id,
    title: `Mission ${id}`,
    learningFieldId: "lf1",
    learningSituationId: "lf1-a",
    description: "Test mission",
    objective: "Test objective",
    estimatedMinutes: minutes,
    prerequisiteMissionIds: [],
    competencyIds: [],
    difficulty: 2,
    examRelevance: "medium",
    phases: {
      prepare: { blocks: [], estimatedMinutes: 2 },
      learn: {
        required: true,
        blocks: [{ id: `${id}-b1`, type: "explanation", title: "Block", content: ["text"] }],
        estimatedMinutes: Math.max(4, minutes - 4)
      },
      practice: { required: true, activities: [], estimatedMinutes: 8 },
      apply: { required: true, activities: [], estimatedMinutes: 6 },
      test: {
        required: true,
        questionCount: 5,
        questionPoolIds: [`${id}-pool`],
        passingScore: 80,
        estimatedMinutes: testMinutes
      }
    },
    completionRules: DEFAULT_COMPLETION_RULES,
    reviewConfig: DEFAULT_REVIEW_CONFIG,
    rewards: { xp: 10 }
  };
}

function buildCourse(missions: Mission[]): NormalizedCourse {
  const missionsById = Object.fromEntries(missions.map((m) => [m.id, m]));
  return {
    id: "test-course",
    title: "Test",
    description: "Test",
    basis: [],
    learningFields: [{ id: "lf1", title: "LF1", subtitle: "", description: "", situationIds: ["lf1-a"], missionIds: missions.map((m) => m.id) }],
    learningSituations: [{ id: "lf1-a", learningFieldId: "lf1", title: "A", description: "", missionIds: missions.map((m) => m.id) }],
    competencies: [],
    missions,
    missionsById,
    plannerConfig: { ...DEFAULT_PLANNER_CONFIG }
  };
}

function emptyState(): AppState {
  return {
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
    checkpointHistory: []
  };
}

function planForMinutes(minutes: number, missions: Mission[], state: AppState) {
  const userState = createEmptyUserLearningState();
  userState.profile.minutesPerSession = minutes;
  return generateDailyPlan({
    course: buildCourse(missions),
    state,
    userState,
    currentDate: new Date("2026-07-28T12:00:00.000Z")
  });
}

describe("generateDailyPlan", () => {
  const missions = [
    buildMission("m1", 12),
    buildMission("m2", 10),
    buildMission("m3", 8)
  ];

  it("respects 15 minute budget", () => {
    const plan = planForMinutes(15, missions, emptyState());
    expect(plan.availableMinutes).toBe(15);
    expect(plan.totalEstimatedMinutes).toBeLessThanOrEqual(15);
    expect(plan.tasks.length).toBeGreaterThanOrEqual(1);
    expect(plan.tasks[0].type).toBe("new-mission");
    expect(plan.tasks[0].reason.toLowerCase()).toContain("sequ");
  });

  it("respects 30 minute budget with multiple tasks", () => {
    const state = emptyState();
    state.sessionSteps = { m1: ["explain", "praxis"] };
    const plan = planForMinutes(30, missions, state);
    expect(plan.availableMinutes).toBe(30);
    expect(plan.totalEstimatedMinutes).toBeLessThanOrEqual(30);
    expect(plan.tasks.length).toBeGreaterThanOrEqual(2);
  });

  it("respects 45 minute budget", () => {
    const state = emptyState();
    state.sessionSteps = { m1: ["explain"] };
    state.reviewSchedule = { m2: "2026-07-27" };
    const plan = planForMinutes(45, missions, state);
    expect(plan.totalEstimatedMinutes).toBeLessThanOrEqual(45);
    expect(plan.tasks.length).toBeGreaterThanOrEqual(2);
  });

  it("respects 60 minute budget", () => {
    const state = emptyState();
    state.sessionSteps = { m1: ["explain", "vocab"] };
    state.reviewSchedule = { m2: "2026-07-27" };
    const plan = planForMinutes(60, missions, state);
    expect(plan.totalEstimatedMinutes).toBeLessThanOrEqual(60);
    expect(plan.tasks.length).toBeGreaterThanOrEqual(2);
  });

  it("prioritizes due reviews over new missions", () => {
    const state = emptyState();
    state.reviewSchedule = { m2: "2026-07-27" };
    const plan = planForMinutes(60, missions, state);
    expect(plan.tasks[0].type).toBe("review");
    expect(plan.tasks[0].missionId).toBe("m2");
  });

  it("includes justification on every task", () => {
    const plan = planForMinutes(30, missions, emptyState());
    plan.tasks.forEach((task) => {
      expect(task.reason.length).toBeGreaterThan(10);
    });
  });
});
