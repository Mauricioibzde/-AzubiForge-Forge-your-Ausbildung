import type { Mission } from "../../schemas/mission";
import { DEFAULT_COMPLETION_RULES } from "../../schemas/mission";
import type { AppState } from "../../types";
import { getLatestMasteryTestForMission } from "../mastery/masteryTest";
import { countApplyProductions } from "./didacticTasks";

export const MIN_PRACTICE_ANSWERS = 3;

export interface MasteryGateResult {
  allowed: boolean;
  reason: string;
  practiceAnswered: number;
  practiceScore: number | null;
  minAnswered: number;
  minScore: number;
  applyRequired: boolean;
  applyDone: boolean;
  masteryPassed: boolean;
}

export function getPracticeStats(state: AppState, missionId: string): {
  answered: number;
  correct: number;
  score: number | null;
} {
  const keys = Object.keys(state.exerciseChecks).filter((key) => key.startsWith(`${missionId}:`));
  if (!keys.length) return { answered: 0, correct: 0, score: null };
  const correct = keys.filter((key) => state.exerciseChecks[key] === "correct").length;
  return {
    answered: keys.length,
    correct,
    score: Math.round((correct / keys.length) * 100)
  };
}

export function getApplyCriteriaStats(
  state: AppState,
  missionId: string,
  criteriaCount: number
): { checked: number; total: number; done: boolean; score: number | null } {
  if (criteriaCount <= 0) {
    return { checked: 0, total: 0, done: true, score: null };
  }
  let checked = 0;
  for (let index = 0; index < criteriaCount; index += 1) {
    if (state.applyCriteriaChecks?.[`${missionId}:${index}`]) checked += 1;
  }
  const score = Math.round((checked / criteriaCount) * 100);
  return {
    checked,
    total: criteriaCount,
    done: checked >= Math.ceil(criteriaCount * 0.7),
    score
  };
}

export function countApplyCriteria(mission: Mission | null | undefined): number {
  if (!mission) return 0;
  return mission.phases.apply.activities.reduce((sum, activity) => {
    return sum + (activity.criteria?.length || 0);
  }, 0);
}

/** Whether the student may start the mastery test for this mission. */
export function evaluateMasteryGate(
  state: AppState,
  missionId: string,
  mission?: Mission | null
): MasteryGateResult {
  const minScore = mission?.completionRules.minimumPracticeScore
    ?? DEFAULT_COMPLETION_RULES.minimumPracticeScore;
  const practice = getPracticeStats(state, missionId);
  const criteriaCount = countApplyCriteria(mission);
  const applyRequired = Boolean(mission?.completionRules.requireAppliedChallenge && criteriaCount > 0);
  const apply = getApplyCriteriaStats(state, missionId, criteriaCount);
  const applyProduction = countApplyProductions(state, mission);
  const latest = getLatestMasteryTestForMission(state.masteryTestHistory || [], missionId);
  const masteryPassed = Boolean(latest?.passed);

  if (masteryPassed) {
    return {
      allowed: true,
      reason: "Domínio já comprovado — você pode refazer o teste se quiser.",
      practiceAnswered: practice.answered,
      practiceScore: practice.score,
      minAnswered: MIN_PRACTICE_ANSWERS,
      minScore,
      applyRequired,
      applyDone: apply.done && applyProduction.done,
      masteryPassed: true
    };
  }

  if (practice.answered < MIN_PRACTICE_ANSWERS) {
    return {
      allowed: false,
      reason: `Marque pelo menos ${MIN_PRACTICE_ANSWERS} exercícios (Acertei/Errei) antes do teste de domínio.`,
      practiceAnswered: practice.answered,
      practiceScore: practice.score,
      minAnswered: MIN_PRACTICE_ANSWERS,
      minScore,
      applyRequired,
      applyDone: apply.done && applyProduction.done,
      masteryPassed: false
    };
  }

  if (practice.score === null || practice.score < minScore) {
    return {
      allowed: false,
      reason: `Sua prática está em ${practice.score ?? 0}%. Precisa de pelo menos ${minScore}% de acertos.`,
      practiceAnswered: practice.answered,
      practiceScore: practice.score,
      minAnswered: MIN_PRACTICE_ANSWERS,
      minScore,
      applyRequired,
      applyDone: apply.done && applyProduction.done,
      masteryPassed: false
    };
  }

  if (applyRequired && !applyProduction.done) {
    return {
      allowed: false,
      reason: `Escreva a resposta do desafio aplicado (${applyProduction.submitted}/${applyProduction.total} produções) antes do teste.`,
      practiceAnswered: practice.answered,
      practiceScore: practice.score,
      minAnswered: MIN_PRACTICE_ANSWERS,
      minScore,
      applyRequired,
      applyDone: false,
      masteryPassed: false
    };
  }

  if (applyRequired && !apply.done) {
    return {
      allowed: false,
      reason: `Conclua a tarefa aplicada (pelo menos ${Math.ceil(criteriaCount * 0.7)} de ${criteriaCount} critérios) na etapa AP1.`,
      practiceAnswered: practice.answered,
      practiceScore: practice.score,
      minAnswered: MIN_PRACTICE_ANSWERS,
      minScore,
      applyRequired,
      applyDone: false,
      masteryPassed: false
    };
  }

  return {
    allowed: true,
    reason: "Prática e aplicação suficientes — você pode iniciar o teste de domínio.",
    practiceAnswered: practice.answered,
    practiceScore: practice.score,
    minAnswered: MIN_PRACTICE_ANSWERS,
    minScore,
    applyRequired,
    applyDone: apply.done && applyProduction.done,
    masteryPassed: false
  };
}

export function hasMasteryEvidence(state: AppState, missionId: string): boolean {
  return Boolean(getLatestMasteryTestForMission(state.masteryTestHistory || [], missionId)?.passed);
}
