import { describe, expect, it } from "vitest";
import type { Mission } from "../../schemas/mission";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";
import type { AppState } from "../../types";
import { getCourseLearningEvidence, getMissionLearningEvidence } from "./learningEvidence";
import type { NormalizedCourse } from "../../schemas/course";
import { DEFAULT_PLANNER_CONFIG } from "../../schemas/course";

function mission(id: string, xp = 40): Mission {
  return {
    id,
    legacyChapterId: id,
    learningFieldId: "lf1",
    learningSituationId: "lf1-s1",
    title: `Mission ${id}`,
    description: "d",
    objective: "o",
    competencyIds: [`${id}-understand`, `${id}-apply`],
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
    reviewConfig: { intervalsInDays: [1, 3, 7] },
    rewards: { xp }
  };
}

function courseOf(missions: Mission[]): NormalizedCourse {
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
    stepArtifacts: {},
    stepArtifactSubmitted: {},
    ...overrides
  };
}

describe("learningEvidence", () => {
  const m1 = mission("m1", 50);
  const m2 = mission("m2", 30);

  it("does not invent XP before mastery pass", () => {
    const state = baseState({
      sessionSteps: { m1: ["explain", "praxis", "vocab", "practice", "ap1"] },
      exerciseChecks: { "m1:0": "correct", "m1:1": "wrong" }
    });
    const evidence = getMissionLearningEvidence(m1, state);
    expect(evidence.earnedXp).toBe(0);
    expect(evidence.potentialXp).toBe(50);
    expect(evidence.rewardXpLabel).toContain("ao passar no domínio");
    expect(evidence.practiceScore).toBe(50);
    expect(evidence.competencyLabel).toContain("2 competências");
    expect(evidence.tone).toBe("partial");
  });

  it("counts XP only after passed mastery test", () => {
    const state = baseState({
      masteryTestHistory: [
        {
          id: "t1",
          missionId: "m1",
          score: 90,
          passed: true,
          finishedAt: new Date().toISOString(),
          wrongQuestionIds: [],
          competencyIds: ["m1-understand"]
        }
      ]
    });
    const evidence = getMissionLearningEvidence(m1, state);
    expect(evidence.earnedXp).toBe(50);
    expect(evidence.masteryPassed).toBe(true);
    expect(evidence.tone).toBe("strong");
    expect(evidence.rewardXpLabel).toContain("ganhos");
  });

  it("aggregates course XP honestly", () => {
    const state = baseState({
      masteryTestHistory: [
        {
          id: "t1",
          missionId: "m1",
          score: 90,
          passed: true,
          finishedAt: new Date().toISOString(),
          wrongQuestionIds: [],
          competencyIds: []
        },
        {
          id: "t2",
          missionId: "m2",
          score: 40,
          passed: false,
          finishedAt: new Date().toISOString(),
          wrongQuestionIds: ["q"],
          competencyIds: []
        }
      ]
    });
    const courseEvidence = getCourseLearningEvidence(courseOf([m1, m2]), state);
    expect(courseEvidence.earnedXp).toBe(50);
    expect(courseEvidence.potentialXp).toBe(80);
    expect(courseEvidence.summaryLabel).toContain("50 XP");
  });
});
