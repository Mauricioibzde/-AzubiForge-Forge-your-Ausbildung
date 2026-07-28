import { describe, expect, it } from "vitest";
import type { AppContext } from "../../appContext";
import { getCourseData } from "../../data/courseData";
import { getNormalizedCourseData, resetNormalizedCourseCache } from "../../data/normalizedCourse";
import { createCheckpointAttempt, getLearningSituationCheckpoints, isCheckpointUnlocked } from "../checkpoint/checkpoints";
import { applyCheckpointResult } from "../checkpoint/applyCheckpointResult";
import { applyMasteryTestResult } from "../mastery/applyMasteryResult";
import { createMasteryTest, setMasteryTestSelfCheck } from "../mastery/masteryTest";
import { missionProgressFromLegacyState } from "../mission/engine";
import { setAssessmentSelfCheck } from "../assessment/assessmentFlow";
import { createMissionReview } from "../review/missionReviewSession";
import { applyMissionReviewResult } from "../review/applyMissionReviewResult";
import type { AppState, UiState } from "../../types";
import type { AzubiForgeData } from "../../types";

const FIXTURE_DATA: AzubiForgeData = {
  course: { id: "c", title: "Course", description: "Desc" },
  modules: [{ id: "lf1", title: "LF1", subtitle: "LF1", description: "LF1", chapterIds: ["m1", "m2"] }],
  chapters: [
    {
      id: "m1",
      title: "Mission 1",
      description: "d",
      text: ["text"],
      ihk: "ihk",
      summary: "sum",
      example: "ex",
      exercises: [{ question: "Q1", answer: "A1" }],
      fullContent: {
        studyTime: "30 Minuten",
        difficulty: "Medium",
        importance: { stars: "★★★★", explanation: ["x"] },
        objectives: ["Obj1"],
        introduction: ["Intro1"],
        explanation: [{ title: "E1", paragraphs: ["P1"] }],
        realWorldExamples: ["R1"],
        practicalExamples: [{ title: "Pr1", paragraphs: ["P1"], steps: ["S1"] }],
        diagrams: [],
        ihkFocus: { appears: [], commonMistakes: [], importantDetails: [], confusedConcepts: [], vocabulary: [] },
        commonMistakes: [],
        vocabulary: [{ de: "d", pt: "p", explanation: "e", example: "x" }],
        summary: ["S"],
        mindMap: { title: "M", code: "A->B" },
        exercises: { easy: [{ question: "EQ1", answer: "EA1" }], intermediate: [{ question: "IQ1", answer: "IA1" }], ap1Style: [{ question: "AP1Q1", answer: "AP1A1" }] },
        related: { previous: "", next: "" },
        revisionChecklist: ["c1"]
      }
    },
    {
      id: "m2",
      title: "Mission 2",
      description: "d",
      text: ["text"],
      ihk: "ihk",
      summary: "sum",
      example: "ex",
      exercises: [{ question: "Q2", answer: "A2" }],
      fullContent: {
        studyTime: "30 Minuten",
        difficulty: "Medium",
        importance: { stars: "★★★", explanation: ["x"] },
        objectives: ["Obj2"],
        introduction: ["Intro2"],
        explanation: [{ title: "E2", paragraphs: ["P2"] }],
        realWorldExamples: ["R2"],
        practicalExamples: [{ title: "Pr2", paragraphs: ["P2"], steps: ["S2"] }],
        diagrams: [],
        ihkFocus: { appears: [], commonMistakes: [], importantDetails: [], confusedConcepts: [], vocabulary: [] },
        commonMistakes: [],
        vocabulary: [{ de: "d2", pt: "p2", explanation: "e2", example: "x2" }],
        summary: ["S2"],
        mindMap: { title: "M2", code: "A->C" },
        exercises: { easy: [{ question: "EQ2", answer: "EA2" }], intermediate: [{ question: "IQ2", answer: "IA2" }], ap1Style: [{ question: "AP1Q2", answer: "AP1A2" }] },
        related: { previous: "", next: "" },
        revisionChecklist: ["c2"]
      }
    }
  ],
  glossary: [],
  learningSituations: {
    lf1: [{ id: "lf1-s1", title: "Situation 1", description: "S", chapterIds: ["m1", "m2"] }]
  }
};

function createState(): AppState {
  return {
    completed: [],
    lastChapterId: "",
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
      studyGoal: "Phase 10"
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
  };
}

function createContext(): AppContext {
  (globalThis as unknown as { window: { AZUBIFORGE_DATA: AzubiForgeData } }).window = { AZUBIFORGE_DATA: FIXTURE_DATA };
  resetNormalizedCourseCache();
  const data = getCourseData();
  const state = createState();
  state.lastChapterId = data.chapters[0]?.id || "";
  return {
    data,
    state,
    ui: {} as UiState
  };
}

describe("phase 10 integration flow", () => {
  it("runs mastery -> review -> checkpoint -> persistence compatibility", () => {
    const ctx = createContext();
    const course = getNormalizedCourseData();
    const mission = course.missions[0];
    expect(mission).toBeTruthy();

    const mastery = createMasteryTest(mission.id, course);
    expect(mastery).toBeTruthy();
    let masteryAttempt = mastery!;
    masteryAttempt.questions.forEach((question) => {
      masteryAttempt = setMasteryTestSelfCheck(masteryAttempt, question.id, "correct");
    });
    masteryAttempt = { ...masteryAttempt, status: "finished", finishedAt: new Date().toISOString(), score: 100 };
    applyMasteryTestResult(ctx, masteryAttempt);

    expect(ctx.state.masteryTestHistory[0]?.missionId).toBe(mission.id);
    expect(ctx.state.masteryTestHistory[0]?.passed).toBe(true);
    expect(ctx.state.reviewSchedule[mission.id]).toBeTruthy();

    const review = createMissionReview(mission.id, course);
    expect(review).toBeTruthy();
    let reviewAttempt = review!;
    reviewAttempt.questions.forEach((question) => {
      reviewAttempt = setAssessmentSelfCheck(reviewAttempt, question.id, "correct");
    });
    reviewAttempt = { ...reviewAttempt, status: "finished", finishedAt: new Date().toISOString(), score: 100 };
    applyMissionReviewResult(ctx, reviewAttempt);

    expect(ctx.state.missionReviews[mission.id]?.status).toBe("completed");
    const progressAfterReview = missionProgressFromLegacyState(
      mission.id,
      ctx.state,
      mission.phases.learn.blocks.length || 1
    );
    expect(progressAfterReview.status).toBe("mastered");

    const checkpoint = getLearningSituationCheckpoints(course).find((item) => item.situationId === mission.learningSituationId);
    expect(checkpoint).toBeTruthy();

    const situationMissionIds = checkpoint!.missionIds;
    situationMissionIds.forEach((missionId, index) => {
      if (ctx.state.masteryTestHistory.some((entry) => entry.missionId === missionId && entry.passed)) return;
      ctx.state.masteryTestHistory.unshift({
        id: `seed-${missionId}-${index}`,
        missionId,
        score: 85,
        passed: true,
        finishedAt: new Date().toISOString(),
        wrongQuestionIds: [],
        competencyIds: []
      });
    });
    expect(isCheckpointUnlocked(ctx.state, checkpoint!)).toBe(true);

    const checkpointAttempt = createCheckpointAttempt(mission.learningSituationId, course);
    expect(checkpointAttempt).toBeTruthy();
    let cp = checkpointAttempt!;
    cp.questions.forEach((question, index) => {
      cp = setAssessmentSelfCheck(cp, question.id, index % 2 === 0 ? "correct" : "wrong");
    });
    cp = { ...cp, status: "finished", finishedAt: new Date().toISOString() };
    applyCheckpointResult(ctx, cp);

    expect(ctx.state.checkpointHistory.length).toBe(1);
    expect(ctx.state.checkpointHistory[0].situationId).toBe(mission.learningSituationId);

    const persistedState = JSON.parse(JSON.stringify(ctx.state)) as AppState;
    const progressFromPersisted = missionProgressFromLegacyState(
      mission.id,
      persistedState,
      mission.phases.learn.blocks.length || 1
    );
    expect(["mastered", "review-due", "provisionally-mastered"]).toContain(progressFromPersisted.status);
  });

  it("keeps mission failed when mastery score is below threshold", () => {
    const ctx = createContext();
    const course = getNormalizedCourseData();
    const mission = course.missions[0];

    const mastery = createMasteryTest(mission.id, course);
    expect(mastery).toBeTruthy();
    let attempt = mastery!;
    attempt.questions.forEach((question) => {
      attempt = setMasteryTestSelfCheck(attempt, question.id, "wrong");
    });
    attempt = { ...attempt, status: "finished", finishedAt: new Date().toISOString(), score: 0 };
    applyMasteryTestResult(ctx, attempt);

    const progress = missionProgressFromLegacyState(
      mission.id,
      ctx.state,
      mission.phases.learn.blocks.length || 1
    );
    expect(progress.status).toBe("test-failed");
    expect(ctx.state.masteryTestHistory[0]?.passed).toBe(false);

    const checkpoint = getLearningSituationCheckpoints(course).find((item) => item.situationId === mission.learningSituationId);
    expect(checkpoint).toBeTruthy();
    expect(isCheckpointUnlocked(ctx.state, checkpoint!)).toBe(false);
  });

  it("keeps review due when mission review result is below passing score", () => {
    const ctx = createContext();
    const course = getNormalizedCourseData();
    const mission = course.missions[0];

    const mastery = createMasteryTest(mission.id, course);
    expect(mastery).toBeTruthy();
    let masteryAttempt = mastery!;
    masteryAttempt.questions.forEach((question) => {
      masteryAttempt = setMasteryTestSelfCheck(masteryAttempt, question.id, "correct");
    });
    masteryAttempt = { ...masteryAttempt, status: "finished", finishedAt: new Date().toISOString(), score: 100 };
    applyMasteryTestResult(ctx, masteryAttempt);

    const review = createMissionReview(mission.id, course);
    expect(review).toBeTruthy();
    let reviewAttempt = review!;
    reviewAttempt.questions.forEach((question) => {
      reviewAttempt = setAssessmentSelfCheck(reviewAttempt, question.id, "wrong");
    });
    reviewAttempt = { ...reviewAttempt, status: "finished", finishedAt: new Date().toISOString(), score: 0 };
    applyMissionReviewResult(ctx, reviewAttempt);

    expect(ctx.state.missionReviews[mission.id]?.status).toBe("due");
    const progress = missionProgressFromLegacyState(
      mission.id,
      ctx.state,
      mission.phases.learn.blocks.length || 1
    );
    expect(progress.status).not.toBe("mastered");
  });
});
