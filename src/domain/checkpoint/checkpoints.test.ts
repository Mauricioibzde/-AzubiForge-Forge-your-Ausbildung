import { describe, expect, it } from "vitest";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";
import type { Mission } from "../../schemas/mission";
import { DEFAULT_PLANNER_CONFIG } from "../../schemas/course";
import type { AppState } from "../../types";
import {
  createCheckpointAttempt,
  getLearningSituationCheckpoints,
  isCheckpointUnlocked
} from "./checkpoints";

const mission = (id: string): Mission => ({
  id,
  legacyChapterId: id,
  title: id,
  learningFieldId: "lf1",
  learningSituationId: "ls1",
  description: "d",
  objective: "o",
  competencyIds: [`${id}-understand`],
  prerequisiteMissionIds: [],
  difficulty: 2,
  estimatedMinutes: 20,
  examRelevance: "medium",
  phases: {
    prepare: { estimatedMinutes: 2, blocks: [] },
    learn: { required: true, estimatedMinutes: 8, blocks: [{ id: "b", type: "explanation", content: ["x"] }] },
    practice: {
      required: true,
      estimatedMinutes: 6,
      activities: [{
        id: `${id}-p-0`,
        type: "open-question",
        title: "Q",
        instruction: "Q",
        difficulty: 1,
        estimatedMinutes: 2,
        points: 5,
        competencyIds: [`${id}-understand`],
        question: "Frage?",
        answer: "Antwort"
      }]
    },
    apply: { required: false, estimatedMinutes: 4, activities: [] },
    test: { required: true, estimatedMinutes: 6, questionPoolIds: [], questionCount: 1, passingScore: 80 }
  },
  completionRules: DEFAULT_COMPLETION_RULES,
  reviewConfig: { intervalsInDays: [1, 3, 7, 14, 30, 60] },
  rewards: { xp: 10 }
});

const course = {
  id: "c",
  title: "C",
  description: "D",
  basis: [],
  learningFields: [],
  learningSituations: [{
    id: "ls1",
    learningFieldId: "lf1",
    title: "Situation A",
    description: "Desc",
    missionIds: ["m1", "m2"]
  }],
  competencies: [],
  missions: [mission("m1"), mission("m2")],
  missionsById: { m1: mission("m1"), m2: mission("m2") },
  plannerConfig: DEFAULT_PLANNER_CONFIG
};

function stateWithPassedTests(): AppState {
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
    masteryTestHistory: [
      { id: "t1", missionId: "m1", score: 85, passed: true, finishedAt: "2026-01-01", wrongQuestionIds: [], competencyIds: [] },
      { id: "t2", missionId: "m2", score: 90, passed: true, finishedAt: "2026-01-01", wrongQuestionIds: [], competencyIds: [] }
    ],
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

describe("checkpoints", () => {
  it("lists checkpoints per learning situation", () => {
    const checkpoints = getLearningSituationCheckpoints(course);
    expect(checkpoints.length).toBe(1);
    expect(checkpoints[0].missionIds).toEqual(["m1", "m2"]);
  });

  it("unlocks when all missions passed mastery tests", () => {
    const checkpoint = getLearningSituationCheckpoints(course)[0];
    expect(isCheckpointUnlocked(stateWithPassedTests(), checkpoint)).toBe(true);
  });

  it("creates integrated checkpoint attempt", () => {
    const attempt = createCheckpointAttempt("ls1", course);
    expect(attempt).toBeTruthy();
    expect(attempt!.questions.length).toBeGreaterThanOrEqual(2);
  });
});
