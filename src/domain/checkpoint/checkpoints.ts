import type { AppState } from "../../types";
import type { NormalizedCourse } from "../../schemas/course";
import type { CheckpointAttempt, MasteryTestQuestion } from "../../types";
import { buildMissionQuestionBank, selectMasteryQuestions } from "../mastery/masteryTest";
import { getLatestMasteryTestForMission } from "../mastery/masteryTest";

export interface CheckpointDefinition {
  id: string;
  situationId: string;
  learningFieldId: string;
  title: string;
  description: string;
  missionIds: string[];
  passingScore: number;
}

export function getLearningSituationCheckpoints(course: NormalizedCourse): CheckpointDefinition[] {
  return course.learningSituations.map((situation) => ({
    id: `checkpoint-${situation.id}`,
    situationId: situation.id,
    learningFieldId: situation.learningFieldId,
    title: `Checkpoint: ${situation.title}`,
    description: `Avaliacao integrada da Lernsituation com perguntas de todas as missoes.`,
    missionIds: situation.missionIds,
    passingScore: 75
  }));
}

export function isCheckpointUnlocked(state: AppState, checkpoint: CheckpointDefinition): boolean {
  if (!checkpoint.missionIds.length) return false;
  return checkpoint.missionIds.every((missionId) => {
    const latest = getLatestMasteryTestForMission(state.masteryTestHistory, missionId);
    return Boolean(latest?.passed);
  });
}

export function isCheckpointCompleted(state: AppState, situationId: string): boolean {
  return state.checkpointHistory.some((entry) => entry.situationId === situationId && entry.passed);
}

export function createCheckpointAttempt(
  situationId: string,
  course: NormalizedCourse
): CheckpointAttempt | null {
  const situation = course.learningSituations.find((item) => item.id === situationId);
  if (!situation) return null;

  const questions: MasteryTestQuestion[] = [];
  situation.missionIds.forEach((missionId) => {
    const mission = course.missionsById[missionId];
    if (!mission) return;
    const bank = buildMissionQuestionBank(mission);
    const picked = selectMasteryQuestions(bank, Math.min(2, bank.length), mission.competencyIds);
    questions.push(...picked);
  });

  const finalQuestions = questions.slice(0, 10);
  if (!finalQuestions.length) return null;

  return {
    id: `checkpoint-${situationId}-${Date.now()}`,
    situationId,
    situationTitle: situation.title,
    learningFieldId: situation.learningFieldId,
    missionIds: situation.missionIds,
    status: "active",
    passingScore: 75,
    startedAt: new Date().toISOString(),
    currentIndex: 0,
    questions: finalQuestions,
    responses: Object.fromEntries(finalQuestions.map((question) => [question.id, {}])),
    score: null
  };
}

export function buildCheckpointHistoryEntry(attempt: CheckpointAttempt, score: number): {
  id: string;
  situationId: string;
  learningFieldId: string;
  situationTitle: string;
  score: number;
  passed: boolean;
  finishedAt: string;
} {
  return {
    id: attempt.id,
    situationId: attempt.situationId,
    learningFieldId: attempt.learningFieldId,
    situationTitle: attempt.situationTitle,
    score,
    passed: score >= attempt.passingScore,
    finishedAt: attempt.finishedAt || new Date().toISOString()
  };
}
