import type { MasteryTestResponse, SelfCheckAssessment, ExerciseCheck } from "../../types";

export function setAssessmentResponse<T extends SelfCheckAssessment>(
  attempt: T,
  questionId: string,
  patch: Partial<MasteryTestResponse>
): T {
  return {
    ...attempt,
    responses: {
      ...attempt.responses,
      [questionId]: { ...attempt.responses[questionId], ...patch }
    }
  };
}

export function setAssessmentSelfCheck<T extends SelfCheckAssessment>(
  attempt: T,
  questionId: string,
  selfCheck: ExerciseCheck
): T {
  return setAssessmentResponse(attempt, questionId, { selfCheck, answered: true });
}

export function scoreAssessment(attempt: SelfCheckAssessment): {
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

export function getAssessmentAnsweredCount(attempt: SelfCheckAssessment): number {
  return attempt.questions.filter((question) => Boolean(attempt.responses[question.id]?.answered)).length;
}

export function getAssessmentGradedCount(attempt: SelfCheckAssessment): number {
  return attempt.questions.filter((question) => Boolean(attempt.responses[question.id]?.selfCheck)).length;
}

export function getAssessmentWrongQuestions(attempt: SelfCheckAssessment) {
  return attempt.questions.filter((question) => attempt.responses[question.id]?.selfCheck === "wrong");
}
