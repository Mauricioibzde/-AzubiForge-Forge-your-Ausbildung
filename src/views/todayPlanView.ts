import type { AppContext } from "../appContext";
import type { DailyPlan, DailyPlanTask } from "../schemas/userLearningState";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import { generateDailyPlan } from "../domain/planner/generateDailyPlan";
import { getResumeTab } from "../domain/course";
import { userLearningStateFromAppState } from "../state/userLearningBridge";
import { escapeAttribute } from "../ui/html";

export function buildTodayPlan(ctx: AppContext): DailyPlan {
  const course = getNormalizedCourseData();
  const userState = userLearningStateFromAppState(ctx.state);
  return generateDailyPlan({
    course,
    state: ctx.state,
    userState
  });
}

export function renderTodayPlanSection(ctx: AppContext): string {
  const plan = buildTodayPlan(ctx);
  const primary = plan.tasks[0];

  return `
    <section class="ds-section today-plan-section rise-in" aria-label="Plano de hoje">
      <div class="ds-section-head">
        <div>
          <h2 class="ds-section-title">Hoje</h2>
          <p class="ds-aux">${plan.tasks.length ? `${plan.totalEstimatedMinutes} min planejados` : "Sem tarefas no tempo disponivel"} · meta ${plan.availableMinutes} min</p>
        </div>
      </div>

      ${primary ? renderNextActionCard(primary, ctx) : ""}

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

function renderNextActionCard(task: DailyPlanTask, ctx: AppContext): string {
  const href = taskHref(task, ctx);
  return `
    <article class="ds-card today-next-action">
      <p class="ds-caption">Proxima acao recomendada</p>
      <h3 class="ds-card-title">${task.title}</h3>
      <p class="ds-aux">${task.reason}</p>
      <div class="today-task-meta">
        <span class="today-task-type">${taskTypeLabel(task.type)}</span>
        <span class="today-task-time">${task.estimatedMinutes} min</span>
      </div>
      <a class="button accent" href="${href}">Iniciar agora</a>
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

function taskTypeLabel(type: DailyPlanTask["type"]): string {
  if (type === "review") return "Revisao";
  if (type === "test") return "Teste";
  if (type === "continue-mission") return "Continuar";
  if (type === "new-mission") return "Nova missao";
  return "Pratica";
}

function taskHref(task: DailyPlanTask, ctx: AppContext): string {
  const id = escapeAttribute(task.missionId);
  if (task.type === "review") return "#review";
  if (task.type === "test") return `#reader/${id}/ap1`;
  if (task.type === "new-mission") return `#reader/${id}/explain`;
  return `#reader/${id}/${getResumeTab(ctx.state, task.missionId)}`;
}
