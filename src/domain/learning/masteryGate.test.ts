import { describe, expect, it } from "vitest";
import { answersMatch, normalizeAnswer } from "./productionCheck";
import {
  evaluateMasteryGate,
  getPracticeStats,
  MIN_PRACTICE_ANSWERS
} from "./masteryGate";
import type { AppState } from "../../types";
import type { Mission } from "../../schemas/mission";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";

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

function mission(): Mission {
  return {
    id: "m1",
    legacyChapterId: "m1",
    learningFieldId: "lf1",
    learningSituationId: "s1",
    title: "M1",
    description: "d",
    objective: "o",
    competencyIds: ["c1"],
    prerequisiteMissionIds: [],
    difficulty: 2,
    estimatedMinutes: 20,
    examRelevance: "high",
    phases: {
      prepare: { estimatedMinutes: 1, blocks: [] },
      learn: { required: true, estimatedMinutes: 8, blocks: [] },
      practice: { required: true, estimatedMinutes: 6, activities: [] },
      apply: {
        required: true,
        estimatedMinutes: 5,
        activities: [{
          id: "a1",
          type: "open-question",
          title: "Apply",
          instruction: "Faça a tarefa aplicada",
          difficulty: 2,
          estimatedMinutes: 5,
          points: 10,
          competencyIds: ["c1"],
          question: "Apply",
          answer: "Modelo",
          criteria: ["Critério A", "Critério B", "Critério C"],
          modelAnswer: "Modelo"
        }]
      },
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
    rewards: { xp: 10 }
  };
}

describe("productionCheck", () => {
  it("normalizes accents and punctuation", () => {
    expect(normalizeAnswer("  Ausbildúng!! ")).toBe("ausbildung");
  });

  it("matches close production answers", () => {
    expect(answersMatch("Rechte und Pflichten", "rechte und pflichten")).toBe(true);
    expect(answersMatch("Backup", "fazer backup diário")).toBe(true);
    expect(answersMatch("Router", "switch")).toBe(false);
  });
});

describe("masteryGate", () => {
  it("blocks mastery without enough practice answers", () => {
    const state = baseState({
      exerciseChecks: { "m1:0": "correct", "m1:1": "correct" }
    });
    const gate = evaluateMasteryGate(state, "m1", mission());
    expect(gate.allowed).toBe(false);
    expect(gate.practiceAnswered).toBe(2);
    expect(gate.minAnswered).toBe(MIN_PRACTICE_ANSWERS);
  });

  it("blocks mastery when practice score is low", () => {
    const state = baseState({
      exerciseChecks: {
        "m1:0": "wrong",
        "m1:1": "wrong",
        "m1:2": "correct"
      }
    });
    const gate = evaluateMasteryGate(state, "m1", mission());
    expect(gate.allowed).toBe(false);
    expect(gate.practiceScore).toBe(33);
  });

  it("blocks mastery when apply criteria are incomplete", () => {
    const state = baseState({
      exerciseChecks: {
        "m1:0": "correct",
        "m1:1": "correct",
        "m1:2": "correct"
      },
      applyCriteriaChecks: { "m1:0": true }
    });
    const gate = evaluateMasteryGate(state, "m1", mission());
    expect(gate.allowed).toBe(false);
    expect(gate.applyRequired).toBe(true);
    expect(gate.applyDone).toBe(false);
  });

  it("allows mastery when practice and apply are ready", () => {
    const state = baseState({
      exerciseChecks: {
        "m1:0": "correct",
        "m1:1": "correct",
        "m1:2": "correct",
        "m1:3": "correct"
      },
      applyCriteriaChecks: {
        "m1:0": true,
        "m1:1": true,
        "m1:2": true
      }
    });
    const gate = evaluateMasteryGate(state, "m1", mission());
    expect(getPracticeStats(state, "m1").score).toBe(100);
    expect(gate.allowed).toBe(true);
  });
});
