import type { NormalizedCourse } from "../../schemas/course";
import type { Mission, MissionProgress } from "../../schemas/mission";
import type { AppState, ReaderTab } from "../../types";
import {
  getLearningSituationCheckpoints,
  isCheckpointCompleted,
  isCheckpointUnlocked
} from "../checkpoint/checkpoints";
import { getResumeTab } from "../course";
import { missionProgressFromLegacyState } from "../mission/engine";
import { getDueMissionReviewIds } from "../review/missionReview";
import { hasResumableSession } from "../session/studySession";

/**
 * Single source of truth for "What should I do now?"
 * All primary CTAs (Home, Trilha, planner, continue chip, etc.) must consume this.
 *
 * Priority (documented in docs/NEXT_LEARNING_ACTION.md):
 * 1 resume-session
 * 2 start-review (overdue)
 * 3 retry-mastery / start-mastery
 * 4 start-checkpoint
 * 5 continue-study / start-practice
 * 6 start-next-mission
 * 7 start-exam
 * 8 course-complete
 */

export type LearningActionType =
  | "resume-session"
  | "continue-study"
  | "start-practice"
  | "start-mastery"
  | "retry-mastery"
  | "start-review"
  | "start-checkpoint"
  | "start-next-mission"
  | "start-exam"
  | "course-complete";

export type LearningActionReason =
  | "active-session"
  | "mission-in-progress"
  | "practice-pending"
  | "mastery-pending"
  | "mastery-failed"
  | "review-overdue"
  | "checkpoint-ready"
  | "next-mission"
  | "exam-recommended"
  | "course-complete";

export interface NextLearningAction {
  type: LearningActionType;
  href: string;
  title: string;
  description: string;
  reason: LearningActionReason;
  priority: number;
  estimatedMinutes?: number;
  missionId?: string;
  chapterId?: string;
  learningFieldId?: string;
  checkpointId?: string;
  reviewId?: string;
}

export interface ResolveNextLearningActionInput {
  course: NormalizedCourse;
  state: AppState;
  now?: number;
}

const PRIORITY = {
  resumeSession: 10,
  startReview: 20,
  retryMastery: 30,
  startMastery: 40,
  startCheckpoint: 50,
  startPractice: 60,
  continueStudy: 70,
  startNextMission: 80,
  startExam: 90,
  courseComplete: 100
} as const;

function buildProgressMap(course: NormalizedCourse, state: AppState): Record<string, MissionProgress> {
  const map: Record<string, MissionProgress> = {};
  course.missions.forEach((mission) => {
    const blockCount = mission.phases.learn.blocks.length || 1;
    map[mission.id] = missionProgressFromLegacyState(mission.id, state, blockCount);
  });
  return map;
}

function missionTitle(course: NormalizedCourse, missionId: string): string {
  return course.missionsById[missionId]?.title || missionId;
}

function readerHref(missionId: string, state: AppState, tab?: ReaderTab): string {
  return `#reader/${missionId}/${tab || getResumeTab(state, missionId)}`;
}

function findFirstByStatus(
  course: NormalizedCourse,
  progressById: Record<string, MissionProgress>,
  statuses: MissionProgress["status"][]
): Mission | null {
  const set = new Set(statuses);
  return course.missions.find((mission) => set.has(progressById[mission.id]?.status)) || null;
}

function findUnlockedCheckpoint(course: NormalizedCourse, state: AppState) {
  return getLearningSituationCheckpoints(course).find(
    (checkpoint) =>
      isCheckpointUnlocked(state, checkpoint) && !isCheckpointCompleted(state, checkpoint.situationId)
  ) || null;
}

function allMissionsMasteredLike(progressById: Record<string, MissionProgress>, course: NormalizedCourse): boolean {
  if (!course.missions.length) return false;
  return course.missions.every((mission) => {
    const status = progressById[mission.id]?.status;
    return status === "mastered" || status === "provisionally-mastered" || status === "review-due";
  });
}

function courseFullyDone(progressById: Record<string, MissionProgress>, course: NormalizedCourse): boolean {
  if (!course.missions.length) return false;
  return course.missions.every((mission) => progressById[mission.id]?.status === "mastered");
}

/**
 * Resolves the single next learning action for the current progress state.
 */
export function resolveNextLearningAction(input: ResolveNextLearningActionInput): NextLearningAction {
  const { course, state } = input;
  const now = input.now ?? Date.now();
  const progressById = buildProgressMap(course, state);

  if (hasResumableSession(state)) {
    const session = state.activeStudySession!;
    const current = session.activities[session.currentIndex];
    return {
      type: "resume-session",
      href: "#session",
      title: session.status === "paused" ? "Retomar sessão focada" : "Continuar sessão focada",
      description: current
        ? `Sessão salva · ${current.title}`
        : "Você tem uma sessão focada em andamento.",
      reason: "active-session",
      priority: PRIORITY.resumeSession,
      estimatedMinutes: current?.estimatedMinutes,
      missionId: current?.missionId,
      chapterId: current?.missionId,
      learningFieldId: current ? course.missionsById[current.missionId]?.learningFieldId : undefined
    };
  }

  const dueReviewIds = getDueMissionReviewIds(state, now);
  if (dueReviewIds.length) {
    const missionId = dueReviewIds[0];
    const mission = course.missionsById[missionId];
    return {
      type: "start-review",
      href: `#review-mission/${missionId}`,
      title: `Revisar: ${missionTitle(course, missionId)}`,
      description: "Revisão vencida — confirme retenção antes de avançar.",
      reason: "review-overdue",
      priority: PRIORITY.startReview,
      estimatedMinutes: Math.min(12, mission?.estimatedMinutes || 12),
      missionId,
      chapterId: missionId,
      learningFieldId: mission?.learningFieldId,
      reviewId: missionId
    };
  }

  const failed = findFirstByStatus(course, progressById, ["test-failed"]);
  if (failed) {
    return {
      type: "retry-mastery",
      href: `#mastery/${failed.id}`,
      title: `Refazer teste: ${failed.title}`,
      description: "Teste de domínio não aprovado — nova tentativa recomendada.",
      reason: "mastery-failed",
      priority: PRIORITY.retryMastery,
      estimatedMinutes: failed.phases.test.estimatedMinutes,
      missionId: failed.id,
      chapterId: failed.id,
      learningFieldId: failed.learningFieldId
    };
  }

  const readyForTest = findFirstByStatus(course, progressById, ["ready-for-test"]);
  if (readyForTest) {
    return {
      type: "start-mastery",
      href: `#mastery/${readyForTest.id}`,
      title: `Teste de domínio: ${readyForTest.title}`,
      description: "Estudo e prática suficientes — hora do teste de domínio.",
      reason: "mastery-pending",
      priority: PRIORITY.startMastery,
      estimatedMinutes: readyForTest.phases.test.estimatedMinutes,
      missionId: readyForTest.id,
      chapterId: readyForTest.id,
      learningFieldId: readyForTest.learningFieldId
    };
  }

  const checkpoint = findUnlockedCheckpoint(course, state);
  if (checkpoint) {
    return {
      type: "start-checkpoint",
      href: `#checkpoint/${checkpoint.situationId}`,
      title: checkpoint.title,
      description: "Checkpoint da Lernsituation liberado — avalie o bloco integrado.",
      reason: "checkpoint-ready",
      priority: PRIORITY.startCheckpoint,
      estimatedMinutes: 20,
      learningFieldId: checkpoint.learningFieldId,
      checkpointId: checkpoint.situationId,
      missionId: checkpoint.missionIds[0],
      chapterId: checkpoint.missionIds[0]
    };
  }

  const practicePending = findFirstByStatus(course, progressById, ["practice-required", "study-completed"]);
  if (practicePending) {
    const tab = progressById[practicePending.id]?.currentPhase === "practice" ? "practice" : getResumeTab(state, practicePending.id);
    return {
      type: "start-practice",
      href: readerHref(practicePending.id, state, tab === "explain" ? "practice" : tab),
      title: `Praticar: ${practicePending.title}`,
      description: "Prática pendente — aplique o conceito antes do teste.",
      reason: "practice-pending",
      priority: PRIORITY.startPractice,
      estimatedMinutes: practicePending.phases.practice.estimatedMinutes,
      missionId: practicePending.id,
      chapterId: practicePending.id,
      learningFieldId: practicePending.learningFieldId
    };
  }

  const inProgress = findFirstByStatus(course, progressById, ["in-progress", "needs-review"]);
  if (inProgress) {
    return {
      type: "continue-study",
      href: readerHref(inProgress.id, state),
      title: `Continuar: ${inProgress.title}`,
      description: "Missão em andamento — continue de onde parou.",
      reason: "mission-in-progress",
      priority: PRIORITY.continueStudy,
      estimatedMinutes: inProgress.estimatedMinutes,
      missionId: inProgress.id,
      chapterId: inProgress.id,
      learningFieldId: inProgress.learningFieldId
    };
  }

  const nextMission = course.missions.find((mission) => {
    const status = progressById[mission.id]?.status;
    return status === "available" || status === "locked";
  });
  if (nextMission) {
    return {
      type: "start-next-mission",
      href: `#reader/${nextMission.id}/explain`,
      title: `Começar: ${nextMission.title}`,
      description: "Próxima missão recomendada na sequência da trilha.",
      reason: "next-mission",
      priority: PRIORITY.startNextMission,
      estimatedMinutes: nextMission.estimatedMinutes,
      missionId: nextMission.id,
      chapterId: nextMission.id,
      learningFieldId: nextMission.learningFieldId
    };
  }

  if (courseFullyDone(progressById, course)) {
    return {
      type: "course-complete",
      href: "#course",
      title: "Trilha concluída",
      description: "Todas as missões dominadas. Revise ou treine a AP1 quando quiser.",
      reason: "course-complete",
      priority: PRIORITY.courseComplete
    };
  }

  if (allMissionsMasteredLike(progressById, course)) {
    return {
      type: "start-exam",
      href: "#exam/mock",
      title: "Treinar simulado AP1",
      description: "Trilha avançada — valide prontidão com um simulado.",
      reason: "exam-recommended",
      priority: PRIORITY.startExam,
      estimatedMinutes: 25
    };
  }

  const fallback = course.missions[0];
  if (fallback) {
    return {
      type: "start-next-mission",
      href: `#reader/${fallback.id}/explain`,
      title: `Começar: ${fallback.title}`,
      description: "Próxima missão recomendada na sequência da trilha.",
      reason: "next-mission",
      priority: PRIORITY.startNextMission,
      estimatedMinutes: fallback.estimatedMinutes,
      missionId: fallback.id,
      chapterId: fallback.id,
      learningFieldId: fallback.learningFieldId
    };
  }

  return {
    type: "course-complete",
    href: "#course",
    title: "Sem missões no curso",
    description: "Não há missões disponíveis neste pacote de conteúdo.",
    reason: "course-complete",
    priority: PRIORITY.courseComplete
  };
}

/** CTA label aligned with action type (PT UI). */
export function labelForLearningAction(action: NextLearningAction): string {
  switch (action.type) {
    case "resume-session":
      return action.title.includes("Retomar") ? "Retomar sessão" : "Continuar sessão";
    case "start-review":
      return "Iniciar revisão";
    case "retry-mastery":
      return "Refazer teste";
    case "start-mastery":
      return "Iniciar teste";
    case "start-checkpoint":
      return "Abrir checkpoint";
    case "start-practice":
      return "Praticar agora";
    case "continue-study":
      return "Continuar missão";
    case "start-next-mission":
      return action.title.startsWith("Continuar") ? "Continuar missão" : "Começar missão";
    case "start-exam":
      return "Treinar AP1";
    case "course-complete":
      return "Ver trilha";
    default:
      return "Continuar";
  }
}
