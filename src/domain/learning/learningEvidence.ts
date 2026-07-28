import type { NormalizedCourse } from "../../schemas/course";
import type { Mission, MissionProgress } from "../../schemas/mission";
import type { AppState } from "../../types";
import { getLatestMasteryTestForMission } from "../mastery/masteryTest";
import { missionProgressFromLegacyState } from "../mission/engine";
import { isMissionReviewDue } from "../review/missionReview";
import { getVisitedSteps, READER_STEPS } from "../course";

/**
 * Honest learning evidence derived from AppState (no decorative XP ledger).
 * XP is only counted when a mastery test was passed for that mission.
 */

export type EvidenceTone = "empty" | "partial" | "strong" | "proven";

export interface MissionLearningEvidence {
  missionId: string;
  stepsDone: number;
  stepsTotal: number;
  practiceAttempted: number;
  practiceCorrect: number;
  practiceScore: number | null;
  masteryScore: number | null;
  masteryPassed: boolean;
  masteryAttempts: number;
  reviewDue: boolean;
  reviewScore: number | null;
  status: MissionProgress["status"];
  masteryLevel: MissionProgress["masteryLevel"];
  competencyCount: number;
  potentialXp: number;
  earnedXp: number;
  tone: EvidenceTone;
  summaryLabel: string;
  competencyLabel: string;
  practiceLabel: string;
  masteryLabel: string;
  reviewLabel: string;
  rewardXpLabel: string;
}

export interface CourseLearningEvidence {
  earnedXp: number;
  potentialXp: number;
  masteredCount: number;
  provisionallyMasteredCount: number;
  missionsWithPractice: number;
  missionsTotal: number;
  summaryLabel: string;
}

function practiceStats(state: AppState, missionId: string): {
  attempted: number;
  correct: number;
  score: number | null;
} {
  const keys = Object.keys(state.exerciseChecks).filter((key) => key.startsWith(`${missionId}:`));
  if (!keys.length) return { attempted: 0, correct: 0, score: null };
  const correct = keys.filter((key) => state.exerciseChecks[key] === "correct").length;
  return {
    attempted: keys.length,
    correct,
    score: Math.round((correct / keys.length) * 100)
  };
}

function toneFromEvidence(input: {
  masteryPassed: boolean;
  reviewScore: number | null;
  practiceScore: number | null;
  stepsDone: number;
}): EvidenceTone {
  if (input.reviewScore !== null && input.reviewScore >= 70) return "proven";
  if (input.masteryPassed) return "strong";
  if (input.practiceScore !== null || input.stepsDone > 0) return "partial";
  return "empty";
}

function competencyLabel(count: number): string {
  if (count <= 0) return "Competências do capítulo";
  if (count === 1) return "1 competência do mapa";
  return `${count} competências do mapa`;
}

/**
 * Evidence for one mission — derived, never invented.
 */
export function getMissionLearningEvidence(
  mission: Mission,
  state: AppState
): MissionLearningEvidence {
  const blockCount = mission.phases.learn.blocks.length || 1;
  const progress = missionProgressFromLegacyState(mission.id, state, blockCount);
  const visited = getVisitedSteps(state, mission.id);
  const practice = practiceStats(state, mission.id);
  const latestMastery = getLatestMasteryTestForMission(state.masteryTestHistory || [], mission.id);
  const masteryAttempts = (state.masteryTestHistory || []).filter((entry) => entry.missionId === mission.id).length;
  const reviewRecord = state.missionReviews[mission.id];
  const reviewDue = isMissionReviewDue(state, mission.id);
  const potentialXp = Math.max(0, mission.rewards?.xp || 0);
  const earnedXp = latestMastery?.passed ? potentialXp : 0;
  const competencyCount = mission.competencyIds?.length || 0;
  const tone = toneFromEvidence({
    masteryPassed: Boolean(latestMastery?.passed),
    reviewScore: reviewRecord?.lastScore ?? null,
    practiceScore: practice.score,
    stepsDone: visited.length
  });

  let summaryLabel = "Ainda sem evidência registrada";
  if (tone === "proven") summaryLabel = "Domínio confirmado na revisão";
  else if (tone === "strong") summaryLabel = "Domínio inicial no teste";
  else if (practice.score !== null) summaryLabel = `Prática ${practice.score}% · ${visited.length}/${READER_STEPS.length} etapas`;
  else if (visited.length) summaryLabel = `${visited.length}/${READER_STEPS.length} etapas do leitor`;

  const practiceLabel = practice.score === null
    ? "Sem exercícios marcados"
    : `${practice.correct}/${practice.attempted} acertos (${practice.score}%)`;

  const masteryLabel = latestMastery
    ? `${latestMastery.passed ? "Aprovado" : "Não aprovado"} · ${latestMastery.score}%`
    : "Teste ainda não feito";

  const reviewLabel = reviewDue
    ? "Revisão vencida"
    : reviewRecord?.lastScore != null
      ? `Última revisão ${reviewRecord.lastScore}%`
      : latestMastery?.passed
        ? "Revisão espaçada pendente"
        : "Após o domínio";

  const rewardXpLabel = earnedXp > 0
    ? `${earnedXp} XP ganhos (domínio)`
    : potentialXp > 0
      ? `+${potentialXp} XP ao passar no domínio`
      : "Sem XP configurado";

  return {
    missionId: mission.id,
    stepsDone: visited.length,
    stepsTotal: READER_STEPS.length,
    practiceAttempted: practice.attempted,
    practiceCorrect: practice.correct,
    practiceScore: practice.score,
    masteryScore: latestMastery?.score ?? null,
    masteryPassed: Boolean(latestMastery?.passed),
    masteryAttempts,
    reviewDue,
    reviewScore: reviewRecord?.lastScore ?? null,
    status: progress.status,
    masteryLevel: progress.masteryLevel,
    competencyCount,
    potentialXp,
    earnedXp,
    tone,
    summaryLabel,
    competencyLabel: competencyLabel(competencyCount),
    practiceLabel,
    masteryLabel,
    reviewLabel,
    rewardXpLabel
  };
}

/**
 * Course-level honest totals (XP only from passed mastery).
 */
export function getCourseLearningEvidence(
  course: NormalizedCourse,
  state: AppState
): CourseLearningEvidence {
  let earnedXp = 0;
  let potentialXp = 0;
  let masteredCount = 0;
  let provisionallyMasteredCount = 0;
  let missionsWithPractice = 0;

  course.missions.forEach((mission) => {
    const evidence = getMissionLearningEvidence(mission, state);
    potentialXp += evidence.potentialXp;
    earnedXp += evidence.earnedXp;
    if (evidence.status === "mastered") masteredCount += 1;
    if (evidence.status === "provisionally-mastered" || evidence.status === "review-due") {
      provisionallyMasteredCount += 1;
    }
    if (evidence.practiceAttempted > 0) missionsWithPractice += 1;
  });

  const summaryLabel = earnedXp > 0
    ? `${earnedXp} XP por domínio comprovado · ${masteredCount + provisionallyMasteredCount}/${course.missions.length} missões avançadas`
    : `0 XP ganhos · evidência só conta após teste de domínio`;

  return {
    earnedXp,
    potentialXp,
    masteredCount,
    provisionallyMasteredCount,
    missionsWithPractice,
    missionsTotal: course.missions.length,
    summaryLabel
  };
}
