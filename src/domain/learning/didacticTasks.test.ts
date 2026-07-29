import { describe, expect, it } from "vitest";
import {
  buildExplainRetrievalTask,
  buildPraxisDecisionTask,
  hasStepLearningEvidence,
  explainArtifactKey,
  praxisArtifactKey,
  applyArtifactKey,
  countApplyProductions
} from "./didacticTasks";
import type { AppState, Chapter } from "../../types";
import type { Mission } from "../../schemas/mission";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";

function chapter(): Chapter {
  return {
    id: "cpu",
    title: "CPU",
    description: "Processador do PC",
    text: ["A CPU processa instrucoes."],
    ihk: "Hardware",
    summary: "A CPU executa instrucoes e define o desempenho basico.",
    example: "Task-Manager zeigt hohe CPU-Auslastung bei vielen Tabs.",
    exercises: [],
    studyTime: "40 Minuten",
    difficulty: "Easy",
    fullContent: {
      studyTime: "40 Minuten",
      difficulty: "Easy",
      importance: { stars: "★★★★★", explanation: ["AP1"] },
      objectives: ["Erklären Sie die Aufgabe der CPU."],
      introduction: ["Intro"],
      explanation: [],
      realWorldExamples: ["Viele Browser-Tabs belasten die CPU."],
      practicalExamples: [{
        title: "Stoerfall CPU",
        paragraphs: ["Kunde: PC ist langsam. Task-Manager: CPU 95%."],
        steps: ["Task-Manager oeffnen", "Prozess finden", "Massnahme begruenden"]
      }],
      diagrams: [],
      mindMap: [],
      related: [],
      ihkFocus: { appears: [], commonMistakes: [], importantDetails: [], confusedConcepts: [], vocabulary: [] },
      commonMistakes: [],
      vocabulary: [],
      exercises: { easy: [], intermediate: [], ap1Style: [] },
      summary: ["CPU = Rechenkern"],
      revisionChecklist: []
    }
  } as unknown as Chapter;
}

function baseState(overrides: Partial<AppState> = {}): AppState {
  return {
    completed: [],
    lastChapterId: "cpu",
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

function mission(): Mission {
  return {
    id: "cpu",
    legacyChapterId: "cpu",
    learningFieldId: "lf1",
    learningSituationId: "s1",
    title: "CPU",
    description: "d",
    objective: "o",
    competencyIds: ["c1"],
    prerequisiteMissionIds: [],
    difficulty: 2,
    estimatedMinutes: 40,
    examRelevance: "high",
    phases: {
      prepare: { estimatedMinutes: 1, blocks: [] },
      learn: { required: true, estimatedMinutes: 10, blocks: [] },
      practice: { required: true, estimatedMinutes: 10, activities: [] },
      apply: {
        required: true,
        estimatedMinutes: 10,
        activities: [{
          id: "cpu-apply-1",
          type: "open-question",
          title: "CPU Last",
          instruction: "Was pruefen Sie zuerst?",
          difficulty: 2,
          estimatedMinutes: 5,
          points: 10,
          competencyIds: ["c1"],
          question: "CPU 95%. Naechster Schritt?",
          answer: "Task-Manager",
          criteria: ["A", "B", "C"],
          modelAnswer: "Task-Manager oeffnen"
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
    rewards: { xp: 100 }
  } as Mission;
}

describe("didacticTasks", () => {
  it("builds explain retrieval around the chapter title", () => {
    const task = buildExplainRetrievalTask(chapter());
    expect(task.id).toBe(explainArtifactKey("cpu"));
    expect(task.prompt).toMatch(/CPU/);
    expect(task.successCriteria.length).toBeGreaterThanOrEqual(3);
  });

  it("builds praxis decision from practical example", () => {
    const task = buildPraxisDecisionTask(chapter());
    expect(task.id).toBe(praxisArtifactKey("cpu"));
    expect(task.context).toMatch(/95%/);
    expect(task.modelAnswer).toMatch(/Task-Manager/);
  });

  it("requires artifact submission for explain/praxis evidence", () => {
    const state = baseState();
    expect(hasStepLearningEvidence(state, "cpu", "explain")).toBe(false);
    state.stepArtifactSubmitted[explainArtifactKey("cpu")] = true;
    expect(hasStepLearningEvidence(state, "cpu", "explain")).toBe(true);
  });

  it("counts apply productions by activity", () => {
    const state = baseState({
      stepArtifactSubmitted: { [applyArtifactKey("cpu-apply-1")]: true }
    });
    const stats = countApplyProductions(state, mission());
    expect(stats.submitted).toBe(1);
    expect(stats.done).toBe(true);
  });
});
