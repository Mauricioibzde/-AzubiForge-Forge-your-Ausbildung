import type { AppContext } from "../appContext";
import type { DailyPlan, DailyPlanTask } from "../schemas/userLearningState";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import { generateDailyPlan } from "../domain/planner/generateDailyPlan";
import { getResumeTab } from "../domain/course";
import { userLearningStateFromAppState } from "../state/userLearningBridge";
import { hasResumableSession } from "../domain/session/studySession";
import {
  labelForLearningAction,
  resolveNextLearningAction,
  type NextLearningAction
} from "../domain/learning/nextLearningAction";
import { escapeAttribute, escapeHtml } from "../ui/html";

export function buildTodayPlan(ctx: AppContext): DailyPlan {
  const course = getNormalizedCourseData();
  const userState = userLearningStateFromAppState(ctx.state);
  return generateDailyPlan({
    course,
    state: ctx.state,
    userState
  });
}

export function resolveTodayNextAction(ctx: AppContext): NextLearningAction {
  return resolveNextLearningAction({
    course: getNormalizedCourseData(),
    state: ctx.state
  });
}

export function renderTodayPlanSection(ctx: AppContext): string {
  const plan = buildTodayPlan(ctx);
  const nextAction = resolveTodayNextAction(ctx);
  const pausedSession = ctx.state.activeStudySession?.status === "paused";

  return `
    <section class="ds-section today-plan-section rise-in" aria-label="Plano de hoje">
      ${pausedSession && nextAction.type !== "resume-session" ? renderPausedSessionAlert() : ""}
      <div class="ds-section-head">
        <div>
          <h2 class="ds-section-title">Hoje</h2>
          <p class="ds-aux">${plan.tasks.length ? `${plan.totalEstimatedMinutes} min planejados` : "Sem tarefas no tempo disponivel"} · meta ${plan.availableMinutes} min</p>
        </div>
      </div>

      ${renderNextActionCard(nextAction, ctx)}

      ${plan.tasks.length ? `
        <ol class="today-plan-list">
          ${plan.tasks.map((task, index) => renderPlanTask(task, ctx, index === 0)).join("")}
        </ol>
      ` : `
        <p class="ds-aux">Aumente a meta diaria nas preferencias ou continue pela jornada abaixo.</p>
      `}
    </section>
  `;
}

function renderNextActionCard(action: NextLearningAction, ctx: AppContext): string {
  const canStartSession = !hasResumableSession(ctx.state) || ctx.state.activeStudySession?.status === "paused";
  const primaryHref = action.href;
  const primaryLabel = labelForLearningAction(action);
  return `
    <article class="ds-card today-next-action">
      <p class="ds-caption">Proxima acao recomendada</p>
      <h3 class="ds-card-title">${escapeHtml(action.title)}</h3>
      <p class="ds-aux">${escapeHtml(action.description)}</p>
      <div class="today-task-meta">
        <span class="today-task-type">${actionTypeLabel(action.type)}</span>
        ${action.estimatedMinutes ? `<span class="today-task-time">${action.estimatedMinutes} min</span>` : ""}
      </div>
      <div class="today-next-actions">
        <a class="button accent" href="${escapeAttribute(primaryHref)}">${escapeHtml(primaryLabel)}</a>
        ${action.type === "resume-session"
          ? ""
          : canStartSession
            ? `<a class="button secondary" href="#session/start">Sessao focada</a>`
            : `<a class="button secondary" href="#session">Retomar sessao</a>`}
      </div>
    </article>
  `;
}

function renderPausedSessionAlert(): string {
  return `
    <article class="ds-card ds-alert today-session-alert" role="status">
      <strong>Sessao pausada</strong>
      <p class="ds-aux">Voce tem uma sessao focada salva. Retome de onde parou.</p>
      <a class="button accent" href="#session">Retomar sessao</a>
    </article>
  `;
}

function renderPlanTask(task: DailyPlanTask, ctx: AppContext, isPrimary: boolean): string {
  const href = taskHref(task, ctx);
  return `
    <li class="today-plan-item ${isPrimary ? "is-primary" : ""}">
      <div class="today-plan-copy">
        <span class="today-task-type">${taskTypeLabel(task.type)}</span>
        <strong>${task.title}</strong>
        <p class="ds-aux">${task.reason}</p>
      </div>
      <div class="today-plan-actions">
        <span class="today-task-time">${task.estimatedMinutes} min</span>
        ${isPrimary ? "" : `<a class="button secondary" href="${href}">Abrir</a>`}
      </div>
    </li>
  `;
}

function actionTypeLabel(type: NextLearningAction["type"]): string {
  if (type === "resume-session") return "Sessao";
  if (type === "start-review") return "Revisao";
  if (type === "start-mastery" || type === "retry-mastery") return "Teste";
  if (type === "start-checkpoint") return "Checkpoint";
  if (type === "start-practice") return "Pratica";
  if (type === "continue-study") return "Continuar";
  if (type === "start-next-mission") return "Nova missao";
  if (type === "start-exam") return "AP1";
  return "Trilha";
}

function taskTypeLabel(type: DailyPlanTask["type"]): string {
  if (type === "review") return "Revisao";
  if (type === "test") return "Teste";
  if (type === "continue-mission") return "Continuar";
  if (type === "new-mission") return "Nova missao";
  return "Pratica";
}

function taskHref(task: DailyPlanTask, ctx: AppContext): string {
  const id = escapeAttribute(task.missionId);
  if (task.type === "review") return `#review-mission/${id}`;
  if (task.type === "test") return `#mastery/${id}`;
  if (task.type === "new-mission") return `#reader/${id}/explain`;
  return `#reader/${id}/${getResumeTab(ctx.state, task.missionId)}`;
}
