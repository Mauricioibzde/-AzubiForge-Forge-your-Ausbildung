import type { AppState } from "../../types";
import type { CompletionRules, MissionPhaseId, MissionProgress, MissionStatus, MasteryLevel } from "../../schemas/mission";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";
import { getLatestMasteryTestForMission } from "../mastery/masteryTest";

export type MissionEvent =
  | { type: "UNLOCK" }
  | { type: "START"; phase: MissionPhaseId }
  | { type: "COMPLETE_STUDY"; completedBlockIds: string[]; totalBlocks: number }
  | { type: "SUBMIT_PRACTICE"; score: number }
  | { type: "SUBMIT_APPLY"; score: number }
  | { type: "SUBMIT_TEST"; score: number }
  | { type: "SUBMIT_REVIEW"; score: number }
  | { type: "SCHEDULE_REVIEW"; nextReviewAt: string; reviewLevel: number };

export function createInitialMissionProgress(status: MissionStatus = "available"): MissionProgress {
  return {
    status,
    currentPhase: null,
    completedBlockIds: [],
    practiceScore: null,
    applyScore: null,
    masteryTestScore: null,
    reviewScore: null,
    masteryLevel: 0,
    attempts: 0,
    startedAt: null,
    completedAt: null,
    reviewLevel: 0,
    nextReviewAt: null
  };
}

function masteryFromProgress(progress: MissionProgress, rules: CompletionRules): MasteryLevel {
  if (progress.reviewScore !== null && progress.reviewScore >= rules.minimumReviewScore) return 6;
  if (progress.masteryTestScore !== null && progress.masteryTestScore >= rules.minimumMasteryTestScore) return 5;
  if (progress.applyScore !== null && progress.applyScore >= rules.minimumPracticeScore) return 4;
  if (progress.practiceScore !== null && progress.practiceScore >= rules.minimumPracticeScore) return 3;
  if (progress.status === "study-completed" || progress.completedBlockIds.length > 0) return 2;
  if (progress.status !== "locked" && progress.status !== "available") return 1;
  return 0;
}

export function applyMissionEvent(
  progress: MissionProgress,
  event: MissionEvent,
  rules: CompletionRules = DEFAULT_COMPLETION_RULES
): MissionProgress {
  const next: MissionProgress = { ...progress };

  switch (event.type) {
    case "UNLOCK":
      if (next.status === "locked") next.status = "available";
      break;

    case "START":
      next.status = "in-progress";
      next.currentPhase = event.phase;
      next.startedAt = next.startedAt || new Date().toISOString();
      break;

    case "COMPLETE_STUDY": {
      next.completedBlockIds = event.completedBlockIds;
      const allDone = !rules.requireAllStudyBlocks
        || event.completedBlockIds.length >= event.totalBlocks;
      next.status = allDone ? "practice-required" : "in-progress";
      next.currentPhase = allDone ? "practice" : "learn";
      break;
    }

    case "SUBMIT_PRACTICE":
      next.practiceScore = event.score;
      next.status = event.score >= rules.minimumPracticeScore ? "ready-for-test" : "practice-required";
      next.currentPhase = event.score >= rules.minimumPracticeScore ? "apply" : "practice";
      break;

    case "SUBMIT_APPLY":
      next.applyScore = event.score;
      if (rules.requireAppliedChallenge && event.score < rules.minimumPracticeScore) {
        next.status = "practice-required";
        next.currentPhase = "apply";
      } else {
        next.status = "ready-for-test";
        next.currentPhase = "test";
      }
      break;

    case "SUBMIT_TEST":
      next.attempts += 1;
      next.masteryTestScore = event.score;
      if (event.score >= rules.minimumMasteryTestScore) {
        next.status = rules.delayedReviewRequired ? "provisionally-mastered" : "mastered";
        next.currentPhase = rules.delayedReviewRequired ? null : "test";
        if (!rules.delayedReviewRequired) {
          next.completedAt = new Date().toISOString();
        }
      } else {
        next.status = "test-failed";
        next.currentPhase = "test";
      }
      break;

    case "SUBMIT_REVIEW":
      next.reviewScore = event.score;
      if (event.score >= rules.minimumReviewScore) {
        next.status = "mastered";
        next.completedAt = new Date().toISOString();
      } else {
        next.status = "needs-review";
      }
      break;

    case "SCHEDULE_REVIEW":
      next.reviewLevel = event.reviewLevel;
      next.nextReviewAt = event.nextReviewAt;
      next.status = "review-due";
      break;
  }

  next.masteryLevel = masteryFromProgress(next, rules);
  return next;
}

export function isMissionUnlocked(
  progressById: Record<string, MissionProgress>,
  prerequisiteMissionIds: string[]
): boolean {
  if (!prerequisiteMissionIds.length) return true;
  return prerequisiteMissionIds.every((id) => {
    const progress = progressById[id];
    if (!progress) return false;
    return ["provisionally-mastered", "mastered", "review-due"].includes(progress.status);
  });
}

export function resolveMissionStatuses(
  missionIds: string[],
  progressById: Record<string, MissionProgress>,
  prerequisites: Record<string, string[]>
): Record<string, MissionProgress> {
  const resolved = { ...progressById };

  missionIds.forEach((missionId) => {
    const current = resolved[missionId] || createInitialMissionProgress("locked");
    const prereqs = prerequisites[missionId] || [];

    if (current.status === "locked" && isMissionUnlocked(resolved, prereqs)) {
      resolved[missionId] = applyMissionEvent(current, { type: "UNLOCK" });
    } else if (!resolved[missionId]) {
      resolved[missionId] = createInitialMissionProgress(isMissionUnlocked(resolved, prereqs) ? "available" : "locked");
    }
  });

  return resolved;
}

/** Map legacy chapter-centric AppState to mission progress hints (non-destructive bridge). */
export function missionProgressFromLegacyState(
  missionId: string,
  state: AppState,
  totalStudyBlocks: number
): MissionProgress {
  const progress = createInitialMissionProgress("available");
  const visited = state.sessionSteps[missionId] || [];
  const markedComplete = state.completed.includes(missionId);

  if (visited.length > 0 || markedComplete) {
    progress.status = "in-progress";
    progress.currentPhase = visited.includes("practice") || visited.includes("ap1") ? "practice" : "learn";
    progress.startedAt = state.lastStudiedAt[missionId] || null;
  }

  if (visited.includes("explain")) progress.completedBlockIds.push(`${missionId}-intro-0`);
  if (visited.length >= 3) progress.completedBlockIds = [`${missionId}-partial`];

  const exerciseKeys = Object.keys(state.exerciseChecks).filter((key) => key.startsWith(`${missionId}:`));
  if (exerciseKeys.length) {
    const correct = exerciseKeys.filter((key) => state.exerciseChecks[key] === "correct").length;
    const score = Math.round((correct / exerciseKeys.length) * 100);
    progress.practiceScore = score;
    progress.currentPhase = "practice";
    if (exerciseKeys.length >= 3 && score >= DEFAULT_COMPLETION_RULES.minimumPracticeScore) {
      progress.status = "ready-for-test";
      progress.currentPhase = "test";
    } else {
      progress.status = "practice-required";
    }
  } else if (markedComplete || visited.includes("practice") || visited.includes("ap1")) {
    progress.status = "practice-required";
    progress.currentPhase = "practice";
  }

  const applyKeys = Object.keys(state.applyCriteriaChecks || {}).filter((key) => key.startsWith(`${missionId}:`));
  if (applyKeys.length) {
    const checked = applyKeys.filter((key) => state.applyCriteriaChecks[key]).length;
    progress.applyScore = Math.round((checked / Math.max(applyKeys.length, 1)) * 100);
  }

  const lastMasteryTest = getLatestMasteryTestForMission(state.masteryTestHistory || [], missionId);
  if (lastMasteryTest) {
    progress.masteryTestScore = lastMasteryTest.score;
    progress.attempts = state.masteryTestHistory.filter((entry) => entry.missionId === missionId).length;
    if (lastMasteryTest.passed) {
      progress.status = DEFAULT_COMPLETION_RULES.delayedReviewRequired
        ? "provisionally-mastered"
        : "mastered";
      if (!DEFAULT_COMPLETION_RULES.delayedReviewRequired) {
        progress.completedAt = lastMasteryTest.finishedAt;
      }
    } else {
      progress.status = "test-failed";
      progress.currentPhase = "test";
    }
  }

  if (state.reviewSchedule[missionId]) {
    progress.nextReviewAt = state.reviewSchedule[missionId];
    const reviewDue = new Date(state.reviewSchedule[missionId]) <= new Date();
    if (reviewDue && ["provisionally-mastered", "mastered", "review-due"].includes(progress.status)) {
      progress.status = "review-due";
    }
  }

  const reviewRecord = state.missionReviews[missionId];
  if (
    reviewRecord?.status === "completed"
    && reviewRecord.lastScore !== null
    && reviewRecord.lastScore >= DEFAULT_COMPLETION_RULES.minimumReviewScore
  ) {
    progress.status = "mastered";
    progress.reviewScore = reviewRecord.lastScore;
    progress.completedAt = reviewRecord.lastReviewedAt;
    progress.masteryLevel = 6;
  }

  progress.masteryLevel = masteryFromProgress(progress, DEFAULT_COMPLETION_RULES);
  if (progress.completedBlockIds.length >= totalStudyBlocks && progress.status === "in-progress") {
    progress.status = "study-completed";
  }

  return progress;
}
