import { describe, expect, it } from "vitest";
import type { NormalizedCourse } from "../../schemas/course";
import type { Mission } from "../../schemas/mission";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";
import { DEFAULT_PLANNER_CONFIG } from "../../schemas/course";
import type { AppState } from "../../types";
import { getHomeTodayInsights } from "./homeToday";

function mission(id: string, field: string): Mission {
  return {
    id,
    legacyChapterId: id,
    learningFieldId: field,
    learningSituationId: `${field}-s1`,
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
      learn: { required: true, estimatedMinutes: 8, blocks: [{ id: `${id}-b1`, type: "explanation", content: ["x"] }] },
      practice: { required: true, estimatedMinutes: 6, activities: [] },
      apply: { required: false, estimatedMinutes: 3, activities: [] },
      test: { required: true, estimatedMinutes: 5, questionPoolIds: [], questionCount: 3, passingScore: 80 }
    },
    completionRules: DEFAULT_COMPLETION_RULES,
    reviewConfig: { intervalsInDays: [1, 3, 7, 14, 30, 60] },
    rewards: { xp: 5 }
  };
}

function sampleCourse(): NormalizedCourse {
  const m1 = mission("m1", "lf1");
  const m2 = mission("m2", "lf1");
  const m3 = mission("m3", "lf2");
  return {
    id: "c",
    title: "C",
    description: "D",
    basis: [],
    plannerConfig: DEFAULT_PLANNER_CONFIG,
    competencies: [],
    learningFields: [
      { id: "lf1", title: "LF1", subtitle: "", description: "", situationIds: ["lf1-s1"], missionIds: ["m1", "m2"] },
      { id: "lf2", title: "LF2", subtitle: "", description: "", situationIds: ["lf2-s1"], missionIds: ["m3"] }
    ],
    learningSituations: [
      { id: "lf1-s1", learningFieldId: "lf1", title: "S1", description: "", missionIds: ["m1", "m2"] },
      { id: "lf2-s1", learningFieldId: "lf2", title: "S2", description: "", missionIds: ["m3"] }
    ],
    missions: [m1, m2, m3],
    missionsById: { m1, m2, m3 }
  };
}

function baseState(): AppState {
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
    preferences: { theme: "dark", readingSize: "normal", onboardingDone: true, dailyGoalSessions: 1, studyGoal: "t" },
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

describe("getHomeTodayInsights", () => {
  it("computes due reviews and in-progress mission", () => {
    const state = baseState();
    state.sessionSteps.m2 = ["explain"];
    state.stepArtifactSubmitted["explain:m2"] = true;
    state.reviewSchedule.m1 = new Date(Date.now() - 60_000).toISOString();
    const insights = getHomeTodayInsights(sampleCourse(), state);
    expect(insights.dueMissionReviews).toBe(1);
    expect(insights.inProgressMissionId).toBe("m2");
  });

  it("computes mastery percentage by lernfeld", () => {
    const state = baseState();
    state.masteryTestHistory = [
      { id: "t1", missionId: "m1", score: 90, passed: true, finishedAt: new Date().toISOString(), wrongQuestionIds: [], competencyIds: [] },
      { id: "t2", missionId: "m3", score: 88, passed: true, finishedAt: new Date().toISOString(), wrongQuestionIds: [], competencyIds: [] }
    ];
    const insights = getHomeTodayInsights(sampleCourse(), state);
    const lf2 = insights.learningFieldMastery.find((item) => item.learningFieldId === "lf2");
    expect(lf2?.percent).toBe(100);
  });
});
