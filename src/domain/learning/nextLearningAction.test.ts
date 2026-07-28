import { describe, expect, it } from "vitest";
import type { NormalizedCourse } from "../../schemas/course";
import { DEFAULT_PLANNER_CONFIG } from "../../schemas/course";
import type { Mission } from "../../schemas/mission";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";
import type { AppState, StudySession } from "../../types";
import { labelForLearningAction, resolveNextLearningAction } from "./nextLearningAction";

function mission(id: string, field = "lf1", situation = "lf1-s1"): Mission {
  return {
    id,
    legacyChapterId: id,
    learningFieldId: field,
    learningSituationId: situation,
    title: `Mission ${id}`,
    description: "d",
    objective: "o",
    competencyIds: [`${id}-c`],
    prerequisiteMissionIds: [],
    difficulty: 2,
    estimatedMinutes: 20,
    examRelevance: "medium",
    phases: {
      prepare: { estimatedMinutes: 1, blocks: [] },
      learn: {
        required: true,
        estimatedMinutes: 8,
        blocks: [{ id: `${id}-b1`, type: "explanation", content: ["x"] }]
      },
      practice: { required: true, estimatedMinutes: 6, activities: [] },
      apply: { required: false, estimatedMinutes: 3, activities: [] },
      test: {
        required: true,
        estimatedMinutes: 5,
        questionPoolIds: [],
        questionCount: 3,
        passingScore: 80
      }
    },
    completionRules: DEFAULT_COMPLETION_RULES,
    reviewConfig: { intervalsInDays: [1, 3, 7, 14, 30, 60] },
    rewards: { xp: 5 }
  };
}

function sampleCourse(missions = [mission("m1"), mission("m2"), mission("m3")]): NormalizedCourse {
  return {
    id: "c",
    title: "C",
    description: "D",
    basis: [],
    plannerConfig: DEFAULT_PLANNER_CONFIG,
    competencies: [],
    learningFields: [
      {
        id: "lf1",
        title: "LF1",
        subtitle: "",
        description: "",
        situationIds: ["lf1-s1"],
        missionIds: missions.map((item) => item.id)
      }
    ],
    learningSituations: [
      {
        id: "lf1-s1",
        learningFieldId: "lf1",
        title: "S1",
        description: "",
        missionIds: missions.map((item) => item.id)
      }
    ],
    missions,
    missionsById: Object.fromEntries(missions.map((item) => [item.id, item]))
  };
}

function baseState(overrides: Partial<AppState> = {}): AppState {
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
      studyGoal: "t"
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
    ...overrides
  };
}

function activeSession(missionId = "m2"): StudySession {
  return {
    id: "s1",
    planDate: "2026-07-28",
    status: "active",
    startedAt: new Date().toISOString(),
    pausedAt: null,
    endedAt: null,
    activities: [
      {
        id: "a1",
        kind: "reader-step",
        missionId,
        title: `Continue ${missionId}`,
        instruction: "Go",
        estimatedMinutes: 10,
        readerTab: "praxis"
      }
    ],
    currentIndex: 0,
    completedActivityIds: []
  };
}

describe("resolveNextLearningAction", () => {
  const course = sampleCourse();
  const now = Date.parse("2026-07-28T12:00:00.000Z");

  it("prioritizes resumable session over everything else", () => {
    const state = baseState({
      activeStudySession: activeSession("m2"),
      reviewSchedule: { m1: new Date(now - 60_000).toISOString() },
      sessionSteps: { m3: ["explain"] }
    });
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("resume-session");
    expect(action.href).toBe("#session");
    expect(action.reason).toBe("active-session");
    expect(action.missionId).toBe("m2");
  });

  it("prioritizes overdue review over continue-study", () => {
    const state = baseState({
      sessionSteps: { m2: ["explain", "praxis"] },
      reviewSchedule: { m1: new Date(now - 60_000).toISOString() }
    });
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("start-review");
    expect(action.href).toBe("#review-mission/m1");
    expect(action.reason).toBe("review-overdue");
  });

  it("maps test-failed to retry-mastery", () => {
    const state = baseState({
      masteryTestHistory: [
        {
          id: "t1",
          missionId: "m1",
          score: 40,
          passed: false,
          finishedAt: new Date(now).toISOString(),
          wrongQuestionIds: ["q1"],
          competencyIds: []
        }
      ]
    });
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("retry-mastery");
    expect(action.href).toBe("#mastery/m1");
    expect(action.reason).toBe("mastery-failed");
  });

  it("maps ready-for-test to start-mastery", () => {
    const state = baseState({
      sessionSteps: { m1: ["explain", "praxis", "vocab"] },
      exerciseChecks: {
        "m1:0": "correct",
        "m1:1": "correct",
        "m1:2": "correct"
      }
    });
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("start-mastery");
    expect(action.href).toBe("#mastery/m1");
    expect(action.reason).toBe("mastery-pending");
  });

  it("recommends checkpoint when all situation missions passed mastery", () => {
    const state = baseState({
      masteryTestHistory: [
        {
          id: "t1",
          missionId: "m1",
          score: 90,
          passed: true,
          finishedAt: new Date(now).toISOString(),
          wrongQuestionIds: [],
          competencyIds: []
        },
        {
          id: "t2",
          missionId: "m2",
          score: 88,
          passed: true,
          finishedAt: new Date(now).toISOString(),
          wrongQuestionIds: [],
          competencyIds: []
        },
        {
          id: "t3",
          missionId: "m3",
          score: 91,
          passed: true,
          finishedAt: new Date(now).toISOString(),
          wrongQuestionIds: [],
          competencyIds: []
        }
      ]
    });
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("start-checkpoint");
    expect(action.href).toBe("#checkpoint/lf1-s1");
    expect(action.reason).toBe("checkpoint-ready");
  });

  it("continues in-progress mission study", () => {
    const deep = mission("m2");
    deep.phases.learn.blocks = [
      { id: "m2-b1", type: "explanation", content: ["a"] },
      { id: "m2-b2", type: "explanation", content: ["b"] }
    ];
    const courseWithDepth = sampleCourse([mission("m1"), deep, mission("m3")]);
    const state = baseState({
      sessionSteps: { m2: ["explain"] }
    });
    const action = resolveNextLearningAction({ course: courseWithDepth, state, now });
    expect(action.type).toBe("continue-study");
    expect(action.missionId).toBe("m2");
    expect(action.href).toBe("#reader/m2/praxis");
    expect(action.reason).toBe("mission-in-progress");
  });

  it("maps study-completed to start-practice", () => {
    const state = baseState({
      sessionSteps: { m1: ["explain"] }
    });
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("start-practice");
    expect(action.missionId).toBe("m1");
    expect(action.reason).toBe("practice-pending");
  });

  it("starts next available mission in sequence", () => {
    const state = baseState();
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("start-next-mission");
    expect(action.missionId).toBe("m1");
    expect(action.href).toBe("#reader/m1/explain");
    expect(action.reason).toBe("next-mission");
  });

  it("recommends exam when all missions are provisionally mastered", () => {
    const state = baseState({
      completed: ["m1", "m2", "m3"],
      masteryTestHistory: [
        {
          id: "t1",
          missionId: "m1",
          score: 90,
          passed: true,
          finishedAt: new Date(now).toISOString(),
          wrongQuestionIds: [],
          competencyIds: []
        },
        {
          id: "t2",
          missionId: "m2",
          score: 90,
          passed: true,
          finishedAt: new Date(now).toISOString(),
          wrongQuestionIds: [],
          competencyIds: []
        },
        {
          id: "t3",
          missionId: "m3",
          score: 90,
          passed: true,
          finishedAt: new Date(now).toISOString(),
          wrongQuestionIds: [],
          competencyIds: []
        }
      ],
      checkpointHistory: [
        {
          id: "c1",
          situationId: "lf1-s1",
          learningFieldId: "lf1",
          situationTitle: "S1",
          score: 80,
          passed: true,
          finishedAt: new Date(now).toISOString()
        }
      ]
    });
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("start-exam");
    expect(action.reason).toBe("exam-recommended");
  });

  it("returns course-complete when every mission is mastered via review", () => {
    const state = baseState({
      completed: ["m1", "m2", "m3"],
      masteryTestHistory: ["m1", "m2", "m3"].map((missionId) => ({
        id: `t-${missionId}`,
        missionId,
        score: 90,
        passed: true,
        finishedAt: new Date(now).toISOString(),
        wrongQuestionIds: [],
        competencyIds: []
      })),
      missionReviews: {
        m1: {
          reviewLevel: 1,
          lastReviewedAt: new Date(now).toISOString(),
          nextReviewAt: new Date(now + 86_400_000).toISOString(),
          lastScore: 90,
          status: "completed"
        },
        m2: {
          reviewLevel: 1,
          lastReviewedAt: new Date(now).toISOString(),
          nextReviewAt: new Date(now + 86_400_000).toISOString(),
          lastScore: 90,
          status: "completed"
        },
        m3: {
          reviewLevel: 1,
          lastReviewedAt: new Date(now).toISOString(),
          nextReviewAt: new Date(now + 86_400_000).toISOString(),
          lastScore: 90,
          status: "completed"
        }
      },
      checkpointHistory: [
        {
          id: "c1",
          situationId: "lf1-s1",
          learningFieldId: "lf1",
          situationTitle: "S1",
          score: 80,
          passed: true,
          finishedAt: new Date(now).toISOString()
        }
      ]
    });
    const action = resolveNextLearningAction({ course, state, now });
    expect(action.type).toBe("course-complete");
    expect(action.reason).toBe("course-complete");
  });

  it("is deterministic for the same fixture", () => {
    const state = baseState({ sessionSteps: { m1: ["explain"] } });
    const a = resolveNextLearningAction({ course, state, now });
    const b = resolveNextLearningAction({ course, state, now });
    expect(a).toEqual(b);
  });

  it("exposes a stable CTA label helper", () => {
    const action = resolveNextLearningAction({ course, state: baseState(), now });
    expect(labelForLearningAction(action)).toBe("Começar missão");
  });
});
