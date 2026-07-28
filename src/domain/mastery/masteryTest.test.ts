import { describe, expect, it } from "vitest";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";
import type { Mission } from "../../schemas/mission";
import {
  buildMissionQuestionBank,
  createMasteryTest,
  scoreMasteryTest,
  selectMasteryQuestions,
  setMasteryTestSelfCheck
} from "./masteryTest";
import { DEFAULT_PLANNER_CONFIG } from "../../schemas/course";
import type { NormalizedCourse } from "../../schemas/course";

const sampleMission: Mission = {
  id: "m1",
  legacyChapterId: "m1",
  title: "Test Mission",
  learningFieldId: "lf1",
  learningSituationId: "lf1-a",
  description: "Desc",
  objective: "Objective",
  competencyIds: ["m1-understand", "m1-apply"],
  prerequisiteMissionIds: [],
  difficulty: 2,
  estimatedMinutes: 30,
  examRelevance: "medium",
  phases: {
    prepare: { estimatedMinutes: 2, blocks: [] },
    learn: { required: true, estimatedMinutes: 12, blocks: [{ id: "b1", type: "explanation", content: ["text"] }] },
    practice: {
      required: true,
      estimatedMinutes: 8,
      activities: [{
        id: "m1-practice-easy-0",
        type: "open-question",
        title: "Q1",
        instruction: "Q1",
        difficulty: 1,
        estimatedMinutes: 2,
        points: 5,
        competencyIds: ["m1-understand"],
        question: "Was ist BBiG?",
        answer: "Bundesgesetz"
      }]
    },
    apply: {
      required: true,
      estimatedMinutes: 6,
      activities: [{
        id: "m1-test-ap1-0",
        type: "scenario-choice",
        title: "AP1",
        instruction: "AP1",
        difficulty: 3,
        estimatedMinutes: 3,
        points: 10,
        competencyIds: ["m1-apply"],
        question: "Azubi muss Nachweis fuehren?",
        answer: "Ja"
      }]
    },
    test: {
      required: true,
      estimatedMinutes: 10,
      questionPoolIds: ["m1-test-ap1-0"],
      questionCount: 2,
      passingScore: 80
    }
  },
  completionRules: DEFAULT_COMPLETION_RULES,
  reviewConfig: { intervalsInDays: [1, 3, 7, 14, 30, 60] },
  rewards: { xp: 10 }
};

const sampleCourse: NormalizedCourse = {
  id: "c",
  title: "C",
  description: "D",
  basis: [],
  learningFields: [],
  learningSituations: [],
  competencies: [],
  missions: [sampleMission],
  missionsById: { m1: sampleMission },
  plannerConfig: DEFAULT_PLANNER_CONFIG
};

describe("masteryTest", () => {
  it("builds question bank from mission activities", () => {
    const bank = buildMissionQuestionBank(sampleMission);
    expect(bank.length).toBeGreaterThanOrEqual(2);
    expect(bank.some((q) => q.competencyId === "m1-understand")).toBe(true);
    expect(bank.some((q) => q.competencyId === "m1-apply")).toBe(true);
  });

  it("selects mixed questions by competency", () => {
    const bank = buildMissionQuestionBank(sampleMission);
    const selected = selectMasteryQuestions(bank, 2, sampleMission.competencyIds);
    expect(selected.length).toBe(2);
    const competencies = new Set(selected.map((q) => q.competencyId));
    expect(competencies.size).toBeGreaterThanOrEqual(1);
  });

  it("creates attempt with passing score from mission", () => {
    const attempt = createMasteryTest("m1", sampleCourse);
    expect(attempt).toBeTruthy();
    expect(attempt?.passingScore).toBe(80);
    expect(attempt?.questions.length).toBeGreaterThanOrEqual(1);
  });

  it("scores self-check responses", () => {
    const attempt = createMasteryTest("m1", sampleCourse);
    if (!attempt) throw new Error("missing attempt");

    let graded = attempt;
    graded = setMasteryTestSelfCheck(graded, graded.questions[0].id, "correct");
    if (graded.questions[1]) {
      graded = setMasteryTestSelfCheck(graded, graded.questions[1].id, "wrong");
    }

    const score = scoreMasteryTest(graded);
    expect(score.percent).toBeGreaterThanOrEqual(0);
    expect(score.percent).toBeLessThanOrEqual(100);
  });

  it("does not pass below minimum score threshold", () => {
    const attempt = createMasteryTest("m1", sampleCourse);
    if (!attempt) throw new Error("missing attempt");

    let graded = attempt;
    graded.questions.forEach((question) => {
      graded = setMasteryTestSelfCheck(graded, question.id, "wrong");
    });

    const score = scoreMasteryTest(graded);
    expect(score.percent).toBeLessThan(attempt.passingScore);
  });
});
