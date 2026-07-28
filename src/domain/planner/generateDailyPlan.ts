import type { NormalizedCourse } from "../../schemas/course";
import type { DailyPlan, DailyPlanTask, UserLearningState } from "../../schemas/userLearningState";
import type { MissionProgress } from "../../schemas/mission";
import { createInitialMissionProgress, missionProgressFromLegacyState } from "../mission/engine";
import type { AppState } from "../../types";
import { resolveNextLearningAction } from "../learning/nextLearningAction";

export interface DailyPlanInput {
  course: NormalizedCourse;
  state: AppState;
  userState: UserLearningState;
  currentDate?: Date;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function minutesForMission(missionId: string, course: NormalizedCourse): number {
  return course.missionsById[missionId]?.estimatedMinutes || 15;
}

function buildProgressMap(course: NormalizedCourse, state: AppState): Record<string, MissionProgress> {
  const map: Record<string, MissionProgress> = {};

  course.missions.forEach((mission) => {
    const blockCount = mission.phases.learn.blocks.length || 1;
    map[mission.id] = missionProgressFromLegacyState(mission.id, state, blockCount);
  });

  return map;
}

function taskMatchesNextAction(task: DailyPlanTask, nextHref: string, nextMissionId?: string): boolean {
  if (nextMissionId && task.missionId === nextMissionId) return true;
  if (nextHref.includes(task.missionId)) return true;
  return false;
}

/**
 * Deterministic local planner (Phase 3). Priorities align with resolveNextLearningAction:
 * session is handled outside the plan list; within the plan:
 * reviews due → pending tests → in-progress → next in sequence
 * The primary task is reordered to match the global next action when possible.
 */
export function generateDailyPlan(input: DailyPlanInput): DailyPlan {
  const now = input.currentDate || new Date();
  const date = isoDate(now);
  const availableMinutes = input.userState.profile.minutesPerSession
    || input.course.plannerConfig.defaultSessionMinutes;
  const progressMap = buildProgressMap(input.course, input.state);
  const candidates: DailyPlanTask[] = [];
  let priority = 1;

  input.course.missions.forEach((mission) => {
    const progress = progressMap[mission.id] || createInitialMissionProgress();
    const minutes = minutesForMission(mission.id, input.course);

    if (progress.status === "review-due" || (progress.nextReviewAt && progress.nextReviewAt <= date)) {
      candidates.push({
        id: `review-${mission.id}`,
        type: "review",
        missionId: mission.id,
        title: mission.title,
        learningFieldId: mission.learningFieldId,
        estimatedMinutes: Math.min(12, minutes),
        priority: priority++,
        reason: "Revisão vencida — confirmar retenção.",
        status: progress.status
      });
    }

    if (progress.status === "ready-for-test" || progress.status === "test-failed") {
      candidates.push({
        id: `test-${mission.id}`,
        type: "test",
        missionId: mission.id,
        title: mission.title,
        learningFieldId: mission.learningFieldId,
        estimatedMinutes: mission.phases.test.estimatedMinutes,
        priority: priority++,
        reason: progress.status === "test-failed"
          ? "Teste não aprovado — nova tentativa recomendada."
          : "Teste de domínio pendente.",
        status: progress.status
      });
    }

    if (["in-progress", "study-completed", "practice-required"].includes(progress.status)) {
      candidates.push({
        id: `continue-${mission.id}`,
        type: "continue-mission",
        missionId: mission.id,
        title: mission.title,
        learningFieldId: mission.learningFieldId,
        estimatedMinutes: minutes,
        priority: priority++,
        reason: "Missão em andamento — continuar de onde parou.",
        status: progress.status
      });
    }
  });

  const completedIds = new Set(input.state.completed);
  const nextNew = input.course.missions.find((mission) => !completedIds.has(mission.id));
  if (nextNew) {
    candidates.push({
      id: `new-${nextNew.id}`,
      type: "new-mission",
      missionId: nextNew.id,
      title: nextNew.title,
      learningFieldId: nextNew.learningFieldId,
      estimatedMinutes: nextNew.estimatedMinutes,
      priority: priority++,
      reason: "Próxima missão recomendada na sequência.",
      status: "available"
    });
  }

  candidates.sort((a, b) => a.priority - b.priority);

  try {
    const nextAction = resolveNextLearningAction({
      course: input.course,
      state: input.state,
      now: now.getTime()
    });
    if (nextAction.type !== "resume-session" && nextAction.type !== "course-complete" && nextAction.type !== "start-exam") {
      const matchIndex = candidates.findIndex((task) =>
        taskMatchesNextAction(task, nextAction.href, nextAction.missionId)
      );
      if (matchIndex > 0) {
        const [matched] = candidates.splice(matchIndex, 1);
        candidates.unshift(matched);
      }
    }
  } catch {
    // keep candidate order
  }

  const tasks: DailyPlanTask[] = [];
  let usedMinutes = 0;

  for (const task of candidates) {
    const remaining = availableMinutes - usedMinutes;
    if (remaining < 5) break;

    let minutes = task.estimatedMinutes;
    // Whole missions are often 45–50 min; pack a focused chunk that still fits.
    if (task.type === "continue-mission" || task.type === "new-mission") {
      minutes = Math.min(minutes, Math.max(8, Math.min(20, remaining)));
    } else if (task.type === "test") {
      minutes = Math.min(minutes, Math.max(8, remaining));
    } else if (task.type === "review") {
      minutes = Math.min(minutes, Math.max(6, remaining));
    }

    if (minutes > remaining) continue;

    tasks.push({
      ...task,
      estimatedMinutes: minutes,
      reason: minutes < task.estimatedMinutes
        ? `${task.reason} Bloco focado de ${minutes} min (próxima evidência).`
        : task.reason
    });
    usedMinutes += minutes;
  }

  return {
    date,
    availableMinutes,
    tasks,
    totalEstimatedMinutes: usedMinutes
  };
}
