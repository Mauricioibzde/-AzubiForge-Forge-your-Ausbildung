import type { MissionActivity } from "../../schemas/material";
import type { Mission } from "../../schemas/mission";
import type { NormalizedCourse } from "../../schemas/course";
import type {
  ExerciseCheck,
  MasteryQuestionType,
  MasteryTestAttempt,
  MasteryTestHistoryEntry,
  MasteryTestQuestion,
  MasteryTestResponse
} from "../../types";

function activityToQuestion(activity: MissionActivity, missionId: string): MasteryTestQuestion {
  const type: MasteryQuestionType = activity.type === "scenario-choice"
    ? "scenario-choice"
    : activity.type === "true-false"
      ? "true-false"
      : "open-question";

  return {
    id: activity.id,
    missionId,
    competencyId: activity.competencyIds[0] || `${missionId}-understand`,
    type,
    question: activity.question,
    answer: activity.answer,
    explanation: activity.explanation
  };
}

/** Local question bank from mission practice, apply, and test pools. */
export function buildMissionQuestionBank(mission: Mission): MasteryTestQuestion[] {
  const poolIds = new Set(mission.phases.test.questionPoolIds);
  const bank: MasteryTestQuestion[] = [];
  const seen = new Set<string>();

  const allActivities = [
    ...mission.phases.practice.activities,
    ...mission.phases.apply.activities
  ];

  allActivities.forEach((activity) => {
    if (seen.has(activity.id)) return;
    seen.add(activity.id);
    bank.push(activityToQuestion(activity, mission.id));
  });

  mission.phases.practice.activities
    .concat(mission.phases.apply.activities)
    .filter((activity) => poolIds.has(activity.id))
    .forEach((activity) => {
      if (seen.has(`test-${activity.id}`)) return;
      seen.add(`test-${activity.id}`);
      bank.push(activityToQuestion(activity, mission.id));
    });

  if (!bank.length && mission.phases.learn.blocks.length) {
    bank.push({
      id: `${mission.id}-fallback-summary`,
      missionId: mission.id,
      competencyId: mission.competencyIds[0] || `${mission.id}-understand`,
      type: "open-question",
      question: `Fasse die Kernidee von „${mission.title}“ in 2–3 Saetzen zusammen.`,
      answer: mission.objective || mission.description,
      explanation: mission.description
    });
  }

  return bank;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

/** Mix types and balance by competency when selecting questions. */
export function selectMasteryQuestions(
  bank: MasteryTestQuestion[],
  count: number,
  competencyIds: string[] = []
): MasteryTestQuestion[] {
  if (bank.length <= count) return shuffle(bank);

  const byCompetency = new Map<string, MasteryTestQuestion[]>();
  bank.forEach((question) => {
    const key = question.competencyId;
    const list = byCompetency.get(key) || [];
    list.push(question);
    byCompetency.set(key, list);
  });

  const orderedCompetencies = competencyIds.length
    ? competencyIds
    : [...byCompetency.keys()];

  const picked: MasteryTestQuestion[] = [];
  const used = new Set<string>();
  let guard = 0;

  while (picked.length < count && guard < count * 30) {
    guard += 1;
    for (const competencyId of orderedCompetencies) {
      if (picked.length >= count) break;
      const bucket = shuffle(byCompetency.get(competencyId) || []);
      const next = bucket.find((item) => !used.has(item.id));
      if (!next) continue;
      used.add(next.id);
      picked.push(next);
    }
    if ([...byCompetency.values()].every((bucket) => bucket.every((item) => used.has(item.id)))) break;
  }

  if (picked.length < count) {
    shuffle(bank)
      .filter((item) => !used.has(item.id))
      .slice(0, count - picked.length)
      .forEach((item) => picked.push(item));
  }

  return shuffle(picked).slice(0, count);
}

export function createMasteryTest(
  missionId: string,
  course: NormalizedCourse,
  options: { returnToSession?: boolean } = {}
): MasteryTestAttempt | null {
  const mission = course.missionsById[missionId];
  if (!mission) return null;

  const bank = buildMissionQuestionBank(mission);
  const count = Math.min(
    mission.phases.test.questionCount || 5,
    Math.max(3, bank.length)
  );
  const questions = selectMasteryQuestions(bank, count, mission.competencyIds);
  if (!questions.length) return null;

  return {
    id: `mastery-${missionId}-${Date.now()}`,
    missionId,
    missionTitle: mission.title,
    status: "active",
    passingScore: mission.phases.test.passingScore,
    startedAt: new Date().toISOString(),
    currentIndex: 0,
    questions,
    responses: Object.fromEntries(questions.map((question) => [question.id, {} satisfies MasteryTestResponse])),
    score: null,
    returnToSession: Boolean(options.returnToSession)
  };
}

export function setMasteryTestResponse(
  attempt: MasteryTestAttempt,
  questionId: string,
  patch: Partial<MasteryTestResponse>
): MasteryTestAttempt {
  return {
    ...attempt,
    responses: {
      ...attempt.responses,
      [questionId]: { ...attempt.responses[questionId], ...patch }
    }
  };
}

export function setMasteryTestSelfCheck(
  attempt: MasteryTestAttempt,
  questionId: string,
  selfCheck: ExerciseCheck
): MasteryTestAttempt {
  return setMasteryTestResponse(attempt, questionId, { selfCheck, answered: true });
}

export function scoreMasteryTest(attempt: MasteryTestAttempt): {
  correct: number;
  wrong: number;
  unanswered: number;
  total: number;
  percent: number;
} {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  attempt.questions.forEach((question) => {
    const check = attempt.responses[question.id]?.selfCheck;
    if (check === "correct") correct += 1;
    else if (check === "wrong") wrong += 1;
    else unanswered += 1;
  });

  const total = attempt.questions.length;
  return {
    correct,
    wrong,
    unanswered,
    total,
    percent: total ? Math.round((correct / total) * 100) : 0
  };
}

export function getMasteryAnsweredCount(attempt: MasteryTestAttempt): number {
  return attempt.questions.filter((question) => Boolean(attempt.responses[question.id]?.answered)).length;
}

export function getMasteryGradedCount(attempt: MasteryTestAttempt): number {
  return attempt.questions.filter((question) => Boolean(attempt.responses[question.id]?.selfCheck)).length;
}

export function getMasteryWrongQuestions(attempt: MasteryTestAttempt): MasteryTestQuestion[] {
  return attempt.questions.filter((question) => attempt.responses[question.id]?.selfCheck === "wrong");
}

export function buildMasteryTestHistoryEntry(attempt: MasteryTestAttempt): MasteryTestHistoryEntry {
  const score = scoreMasteryTest(attempt);
  const wrongQuestions = getMasteryWrongQuestions(attempt);
  const competencyIds = [...new Set(attempt.questions.map((question) => question.competencyId))];

  return {
    id: attempt.id,
    missionId: attempt.missionId,
    score: score.percent,
    passed: score.percent >= attempt.passingScore,
    finishedAt: attempt.finishedAt || new Date().toISOString(),
    wrongQuestionIds: wrongQuestions.map((question) => question.id),
    competencyIds
  };
}

export function getLatestMasteryTestForMission(
  history: MasteryTestHistoryEntry[],
  missionId: string
): MasteryTestHistoryEntry | null {
  return history.find((entry) => entry.missionId === missionId) || null;
}
