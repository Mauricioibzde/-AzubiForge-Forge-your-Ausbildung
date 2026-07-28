export {
  resolveNextLearningAction,
  labelForLearningAction
} from "./nextLearningAction";
export type {
  LearningActionType,
  LearningActionReason,
  NextLearningAction,
  ResolveNextLearningActionInput
} from "./nextLearningAction";
export {
  getMissionLearningEvidence,
  getCourseLearningEvidence
} from "./learningEvidence";
export type {
  MissionLearningEvidence,
  CourseLearningEvidence,
  EvidenceTone
} from "./learningEvidence";
export {
  evaluateMasteryGate,
  hasMasteryEvidence,
  getPracticeStats,
  getApplyCriteriaStats,
  countApplyCriteria,
  getApplyMinimumRequired,
  MIN_PRACTICE_ANSWERS
} from "./masteryGate";
export type { MasteryGateResult } from "./masteryGate";
export { normalizeAnswer, answersMatch } from "./productionCheck";
export {
  buildExplainRetrievalTask,
  buildPraxisDecisionTask,
  buildApplyProductionTasks,
  hasStepLearningEvidence,
  countApplyProductions,
  stepEvidenceLabel
} from "./didacticTasks";
export type { DidacticTask, DidacticTaskKind } from "./didacticTasks";
export {
  getCourseDualProgress,
  getModuleDualProgress,
  countStudyProgress,
  countMasteryProgress
} from "./courseProgress";
