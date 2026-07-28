import type { NormalizedCourse } from "../../schemas/course";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";
import type { MissionReviewAttempt } from "../../types";
import { buildMissionQuestionBank, selectMasteryQuestions } from "../mastery/masteryTest";

export function createMissionReview(
  missionId: string,
  course: NormalizedCourse,
  options: { returnToSession?: boolean } = {}
): MissionReviewAttempt | null {
  const mission = course.missionsById[missionId];
  if (!mission) return null;

  const bank = buildMissionQuestionBank(mission);
  const count = Math.min(3, Math.max(1, bank.length));
  const questions = selectMasteryQuestions(bank, count, mission.competencyIds);
  if (!questions.length) return null;

  return {
    id: `review-${missionId}-${Date.now()}`,
    missionId,
    missionTitle: mission.title,
    status: "active",
    passingScore: DEFAULT_COMPLETION_RULES.minimumReviewScore,
    startedAt: new Date().toISOString(),
    currentIndex: 0,
    questions,
    responses: Object.fromEntries(questions.map((question) => [question.id, {}])),
    score: null,
    returnToSession: Boolean(options.returnToSession)
  };
}
