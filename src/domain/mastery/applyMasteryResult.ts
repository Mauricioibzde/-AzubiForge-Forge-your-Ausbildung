import type { AppContext } from "../../appContext";
import { getNormalizedCourseData } from "../../data/normalizedCourse";
import { scheduleInitialMissionReview } from "../review/missionReview";
import type { MasteryTestAttempt } from "../../types";
import {
  buildMasteryTestHistoryEntry
} from "./masteryTest";
import { completeCurrentActivity } from "../session/studySession";

export function applyMasteryTestResult(ctx: AppContext, attempt: MasteryTestAttempt): void {
  const entry = buildMasteryTestHistoryEntry(attempt);
  ctx.state.masteryTestHistory = [entry, ...ctx.state.masteryTestHistory].slice(0, 100);

  if (entry.passed) {
    if (getNormalizedCourseData().missionsById[attempt.missionId]?.completionRules.delayedReviewRequired) {
      scheduleInitialMissionReview(ctx.state, attempt.missionId);
    }
  }

  if (attempt.returnToSession && entry.passed && ctx.state.activeStudySession) {
    const current = ctx.state.activeStudySession.activities[ctx.state.activeStudySession.currentIndex];
    if (current?.kind === "mastery-test" && current.missionId === attempt.missionId) {
      ctx.state.activeStudySession = completeCurrentActivity(ctx.state.activeStudySession, ctx.state);
    }
  }
}

export function getDirectedReviewHref(missionId: string): string {
  return `#reader/${missionId}/practice`;
}
