import type { AppContext } from "../../appContext";
import type { DailyPlan } from "../../schemas/userLearningState";
import type { Mission } from "../../schemas/mission";
import type {
  AppState,
  Progress,
  StudySession,
  StudySessionActivity,
  StudySessionSummary
} from "../../types";
import { getResumeTab, READER_STEPS } from "../course";
import { hasStepLearningEvidence, stepEvidenceLabel } from "../learning/didacticTasks";
import { hasMasteryEvidence } from "../learning/masteryGate";

export function buildSessionActivities(plan: DailyPlan, ctx: AppContext): StudySessionActivity[] {
  const activities: StudySessionActivity[] = [];

  plan.tasks.forEach((task) => {
    if (task.type === "review") {
      activities.push({
        id: `activity-${task.id}`,
        kind: "review",
        missionId: task.missionId,
        title: `Revisar: ${task.title}`,
        instruction: task.reason,
        estimatedMinutes: task.estimatedMinutes,
        planTaskId: task.id
      });
      return;
    }

    if (task.type === "test") {
      activities.push({
        id: `activity-${task.id}`,
        kind: "mastery-test",
        missionId: task.missionId,
        title: `Teste de dominio: ${task.title}`,
        instruction: task.reason,
        estimatedMinutes: task.estimatedMinutes,
        readerTab: "ap1",
        planTaskId: task.id
      });
      return;
    }

    const openSteps = READER_STEPS.filter(
      (step) => !hasStepLearningEvidence(ctx.state, task.missionId, step.id, null)
    );
    // Focused chunk: fit the planner block (~8–20 min) instead of dumping all 5 steps.
    const maxSteps = Math.max(1, Math.min(openSteps.length, Math.round(task.estimatedMinutes / 7) || 1));
    const steps = openSteps.slice(0, maxSteps);

    if (!steps.length) {
      activities.push({
        id: `activity-${task.id}`,
        kind: "reader-step",
        missionId: task.missionId,
        title: task.title,
        instruction: task.reason,
        estimatedMinutes: task.estimatedMinutes,
        readerTab: getResumeTab(ctx.state, task.missionId),
        planTaskId: task.id
      });
      return;
    }

    const minutesEach = Math.max(3, Math.round(task.estimatedMinutes / steps.length));
    steps.forEach((step) => {
      const instruction =
        step.id === "explain"
          ? "Leia e depois escreva 2 frases de memória (recuperação ativa)."
          : step.id === "praxis"
            ? "No caso JIKU: registre a decisão que você tomaria e por quê."
            : step.id === "vocab"
              ? "Digite o significado DE→PT antes de ver a resposta."
              : step.id === "practice"
                ? "Escreva a resposta, confira o gabarito e marque Acertei/Errei."
                : "Resolva o desafio aplicado por escrito; só então marque os critérios.";
      activities.push({
        id: `activity-${task.missionId}-${step.id}`,
        kind: "reader-step",
        missionId: task.missionId,
        title: `${task.title} · ${step.label}`,
        instruction,
        estimatedMinutes: minutesEach,
        readerTab: step.id,
        planTaskId: task.id
      });
    });
  });

  return activities;
}

export function createStudySessionFromPlan(plan: DailyPlan, ctx: AppContext): StudySession {
  return {
    id: `session-${Date.now()}`,
    planDate: plan.date,
    status: "active",
    startedAt: new Date().toISOString(),
    pausedAt: null,
    endedAt: null,
    activities: buildSessionActivities(plan, ctx),
    currentIndex: 0,
    completedActivityIds: []
  };
}

export function getCurrentActivity(session: StudySession): StudySessionActivity | null {
  if (session.status === "completed") return null;
  return session.activities[session.currentIndex] || null;
}

export function getSessionActivityProgress(session: StudySession): Progress {
  const total = session.activities.length;
  const completed = session.completedActivityIds.length;
  return {
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0
  };
}

export function pauseStudySession(session: StudySession): StudySession {
  return {
    ...session,
    status: "paused",
    pausedAt: new Date().toISOString()
  };
}

export function resumeStudySession(session: StudySession): StudySession {
  return {
    ...session,
    status: "active",
    pausedAt: null
  };
}

/** Whether the current session activity may be marked complete with real evidence. */
export function canCompleteSessionActivity(
  state: AppState,
  activity: StudySessionActivity,
  mission?: Mission | null
): { allowed: boolean; reason: string } {
  if (activity.kind === "mastery-test") {
    if (hasMasteryEvidence(state, activity.missionId)) {
      return { allowed: true, reason: "Domínio comprovado nesta missão." };
    }
    return { allowed: false, reason: "Conclua o teste de domínio antes de marcar esta atividade." };
  }

  if (activity.kind === "review") {
    const review = state.missionReviews[activity.missionId];
    if (review?.status === "completed") {
      return { allowed: true, reason: "Revisão concluída." };
    }
    return { allowed: false, reason: "Conclua a revisão de retenção antes de marcar esta atividade." };
  }

  const tab = activity.readerTab || "explain";
  if (hasStepLearningEvidence(state, activity.missionId, tab, mission)) {
    return { allowed: true, reason: "Evidência da etapa registrada." };
  }
  return { allowed: false, reason: stepEvidenceLabel(tab) };
}

export function completeCurrentActivity(
  session: StudySession,
  state: AppState,
  mission?: Mission | null
): StudySession {
  const current = getCurrentActivity(session);
  if (!current) return session;

  const gate = canCompleteSessionActivity(state, current, mission);
  if (!gate.allowed) return session;

  const completedIds = session.completedActivityIds.includes(current.id)
    ? session.completedActivityIds
    : [...session.completedActivityIds, current.id];

  if (current.kind === "reader-step" && current.readerTab) {
    const visited = state.sessionSteps[current.missionId] || [];
    if (!visited.includes(current.readerTab)) {
      state.sessionSteps[current.missionId] = [...visited, current.readerTab];
    }
    state.lastStudiedAt[current.missionId] = new Date().toISOString();
  }

  const nextIncompleteIndex = session.activities.findIndex((activity) => !completedIds.includes(activity.id));
  const isDone = nextIncompleteIndex === -1;

  return {
    ...session,
    completedActivityIds: completedIds,
    currentIndex: isDone ? Math.max(0, session.activities.length - 1) : nextIncompleteIndex,
    status: isDone ? "completed" : session.status,
    endedAt: isDone ? new Date().toISOString() : session.endedAt
  };
}

/**
 * Auto-advance session activities that already have evidence
 * (e.g. student returns from reader after producing work).
 */
export function syncSessionFromEvidence(
  session: StudySession,
  state: AppState,
  resolveMission?: (missionId: string) => Mission | null | undefined
): StudySession {
  if (session.status === "completed" || session.status === "paused") return session;

  let current = session;
  for (let guard = 0; guard < session.activities.length + 1; guard += 1) {
    const activity = getCurrentActivity(current);
    if (!activity) break;
    const mission = resolveMission?.(activity.missionId) ?? null;
    const gate = canCompleteSessionActivity(state, activity, mission);
    if (!gate.allowed) break;
    const next = completeCurrentActivity(current, state, mission);
    if (next.completedActivityIds.length === current.completedActivityIds.length) break;
    current = next;
    if (current.status === "completed") break;
  }
  return current;
}

export function finishStudySession(session: StudySession): {
  session: StudySession;
  summary: StudySessionSummary;
} {
  const endedAt = session.endedAt || new Date().toISOString();
  const startedMs = Date.parse(session.startedAt);
  const endedMs = Date.parse(endedAt);
  const minutesStudied = Number.isNaN(startedMs) || Number.isNaN(endedMs)
    ? 0
    : Math.max(1, Math.round((endedMs - startedMs) / 60000));

  const completedSession: StudySession = {
    ...session,
    status: "completed",
    endedAt
  };

  const missionIds = [...new Set(session.activities.map((activity) => activity.missionId))];

  return {
    session: completedSession,
    summary: {
      id: session.id,
      planDate: session.planDate,
      startedAt: session.startedAt,
      endedAt,
      activitiesCompleted: session.completedActivityIds.length,
      activitiesTotal: session.activities.length,
      minutesStudied,
      missionIds
    }
  };
}

export function getEstimatedSessionMinutes(session: StudySession): number {
  return session.activities.reduce((sum, activity) => sum + activity.estimatedMinutes, 0);
}

export function hasResumableSession(state: AppState): boolean {
  return Boolean(state.activeStudySession && state.activeStudySession.status !== "completed");
}
