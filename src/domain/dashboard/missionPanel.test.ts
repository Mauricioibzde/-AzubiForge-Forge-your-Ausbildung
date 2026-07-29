import { describe, expect, it } from "vitest";
import { buildMissionPanelModel } from "./missionPanel";
import type { AppContext } from "../../appContext";
import type { AppState, AzubiForgeData } from "../../types";

const sampleData = {
  course: { id: "ap1", title: "AP1", description: "Curso", basis: [] },
  modules: [{
    id: "lf1",
    title: "Lernfeld 1",
    subtitle: "Start",
    description: "Método AzubiForge",
    chapterIds: ["ch1"]
  }],
  chapters: [{
    id: "ch1",
    title: "Introdução",
    description: "Como funciona o método.",
    text: ["Texto base da missão."],
    ihk: "",
    summary: "Hoje você aprenderá como funciona o método AzubiForge.",
    example: "",
    exercises: [],
    studyTime: "18 Minuten",
    difficulty: "Easy",
    fullContent: {
      studyTime: "18 Minuten",
      difficulty: "Easy",
      importance: { stars: "★★★★★", explanation: ["Base"] },
      objectives: ["Como funciona uma missão", "Como você progride", "Como concluir"],
      introduction: ["Hoje você aprenderá como funciona o método AzubiForge."],
      explanation: [],
      realWorldExamples: [],
      practicalExamples: [],
      diagrams: [],
      mindMap: [],
      related: [],
      ihkFocus: { appears: [], commonMistakes: [], importantDetails: [], confusedConcepts: [], vocabulary: [] },
      commonMistakes: [],
      vocabulary: [],
      exercises: { easy: [], intermediate: [], ap1Style: [] },
      summary: ["Resumo"],
      revisionChecklist: ["Checklist"]
    }
  }],
  glossary: []
} as unknown as AzubiForgeData;

function baseState(overrides: Partial<AppState> = {}): AppState {
  return {
    completed: [],
    lastChapterId: "ch1",
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

describe("buildMissionPanelModel", () => {
  it("surfaces one current mission step and clear next action", () => {
    const ctx = {
      data: sampleData,
      state: baseState({
        stepArtifactSubmitted: { "explain:ch1": true }
      }),
      ui: {} as AppContext["ui"]
    } as AppContext;

    const model = buildMissionPanelModel(ctx);

    expect(model.title).toBe("Introdução");
    expect(model.steps).toHaveLength(5);
    expect(model.steps.filter((step) => step.state === "current")).toHaveLength(1);
    expect(model.steps[0].state).toBe("done");
    expect(model.currentStep.id).toBe("praxis");
    expect(model.continueHref).toBe("#reader/ch1/praxis");
    expect(model.continueLabel).toBe("Continuar missão");
    expect(model.estimatedMinutes).toBeGreaterThan(0);
    expect(model.rewards.potentialXp).toBeGreaterThanOrEqual(0);
    expect(model.rewards.competencyLabel.toLowerCase()).not.toBe("1 competência");
    expect(model.rewards.xpLabel.toLowerCase()).toMatch(/xp|domínio|dominio/);
    expect(model.currentStepIndex).toBe(2);
    expect(model.doneCount).toBe(1);
    expect(model.evidencePercent).toBe(20);
    expect(model.masteryPassed).toBe(false);
    expect(model.hierarchyCrumb).toMatch(/Introdução|Lernfeld/);
    expect(model.celebration.show).toBe(false);
    expect(model.importanceLabel.toLowerCase()).toContain("import");
  });

  it("points next action to mastery when all steps have evidence", () => {
    const ctx = {
      data: sampleData,
      state: baseState({
        stepArtifactSubmitted: {
          "explain:ch1": true,
          "praxis:ch1": true,
          "apply:ch1-apply-fallback": true
        },
        vocabChecks: { "vocab:ch1:0": "correct" },
        exerciseChecks: { "ch1:0": "correct" }
      }),
      ui: {} as AppContext["ui"]
    } as AppContext;

    const model = buildMissionPanelModel(ctx);
    expect(model.doneCount).toBe(5);
    expect(model.masteryPassed).toBe(false);
    expect(model.continueHref).toBe("#mastery/ch1");
    expect(model.continueLabel.toLowerCase()).toMatch(/dom[ií]nio/);
    expect(model.celebration.title).toBe("Percurso com evidência");
  });
});
