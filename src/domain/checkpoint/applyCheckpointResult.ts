import type { AppContext } from "../../appContext";
import { scoreAssessment } from "../assessment/assessmentFlow";
import { buildCheckpointHistoryEntry } from "../checkpoint/checkpoints";
import type { CheckpointAttempt } from "../../types";

export function applyCheckpointResult(ctx: AppContext, attempt: CheckpointAttempt): void {
  const score = scoreAssessment(attempt).percent;
  ctx.state.checkpointHistory = [
    buildCheckpointHistoryEntry(attempt, score),
    ...ctx.state.checkpointHistory
  ].slice(0, 50);
}
