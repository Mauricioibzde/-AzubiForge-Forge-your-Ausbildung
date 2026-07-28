import type { AppContext } from "../../appContext";
import { scoreAssessment } from "../assessment/assessmentFlow";
import type { MissionReviewAttempt } from "../../types";
import { applyMissionReviewScore } from "./missionReview";
import { completeCurrentActivity } from "../session/studySession";

export function applyMissionReviewResult(ctx: AppContext, attempt: MissionReviewAttempt): void {
  const score = scoreAssessment(attempt).percent;

  applyMissionReviewScore(ctx.state, attempt.missionId, score);

  if (score >= attempt.passingScore) {
    const record = ctx.state.missionReviews[attempt.missionId];
    if (record) record.status = "completed";
  } else {
    const record = ctx.state.missionReviews[attempt.missionId];
    if (record) record.status = "due";
  }

  ctx.state.missionReviewHistory = [{
    id: attempt.id,
    missionId: attempt.missionId,
    score,
    passed: score >= attempt.passingScore,
    finishedAt: attempt.finishedAt || new Date().toISOString()
  }, ...ctx.state.missionReviewHistory].slice(0, 100);

  if (attempt.returnToSession && score >= attempt.passingScore && ctx.state.activeStudySession) {
    const current = ctx.state.activeStudySession.activities[ctx.state.activeStudySession.currentIndex];
    if (current?.kind === "review" && current.missionId === attempt.missionId) {
      ctx.state.activeStudySession = completeCurrentActivity(ctx.state.activeStudySession, ctx.state);
    }
  }
}

export function getDirectedReviewHref(missionId: string): string {
  return `#reader/${missionId}/explain`;
}
