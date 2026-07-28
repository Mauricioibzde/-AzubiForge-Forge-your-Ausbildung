import type { AppContext } from "../../appContext";
import type { DailyPlan } from "../../schemas/userLearningState";
import type {
  AppState,
  Progress,
  StudySession,
  StudySessionActivity,
  StudySessionSummary
} from "../../types";
import { getResumeTab, getVisitedSteps, READER_STEPS } from "../course";

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

    const visited = new Set(getVisitedSteps(ctx.state, task.missionId));
    const steps = task.type === "new-mission"
      ? READER_STEPS
      : READER_STEPS.filter((step) => !visited.has(step.id));

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
      activities.push({
        id: `activity-${task.missionId}-${step.id}`,
        kind: "reader-step",
        missionId: task.missionId,
        title: `${task.title} · ${step.label}`,
        instruction: step.hint,
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

export function completeCurrentActivity(
  session: StudySession,
  state: AppState
): StudySession {
  const current = getCurrentActivity(session);
  if (!current) return session;

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
