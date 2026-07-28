import type { AppState, AzubiForgeData, Module, Progress } from "../../types";
import { getModuleProgress, isCompleted } from "../course";
import { hasMasteryEvidence } from "./masteryGate";

function toPercent(completed: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((completed / total) * 100);
}

export function makeProgress(completed: number, total: number): Progress {
  return {
    completed,
    total,
    percent: toPercent(completed, total)
  };
}

/** Chapters marked complete or with any session step visited. */
export function countStudyProgress(state: AppState, chapterIds: string[]): Progress {
  const completed = chapterIds.filter((id) => {
    if (isCompleted(state, id)) return true;
    return Boolean(state.sessionSteps[id]?.length);
  }).length;
  return makeProgress(completed, chapterIds.length);
}

export function countMasteryProgress(state: AppState, chapterIds: string[]): Progress {
  const completed = chapterIds.filter((id) => hasMasteryEvidence(state, id)).length;
  return makeProgress(completed, chapterIds.length);
}

export function getCourseDualProgress(data: AzubiForgeData, state: AppState): {
  study: Progress;
  mastery: Progress;
} {
  const ids = data.chapters.map((chapter) => chapter.id);
  return {
    study: countStudyProgress(state, ids),
    mastery: countMasteryProgress(state, ids)
  };
}

export function getModuleDualProgress(
  data: AzubiForgeData,
  state: AppState,
  module: Module
): {
  study: Progress;
  mastery: Progress;
  legacy: Progress;
} {
  return {
    study: countStudyProgress(state, module.chapterIds),
    mastery: countMasteryProgress(state, module.chapterIds),
    legacy: getModuleProgress(data, state, module)
  };
}
