import type { AppContext } from "../appContext";
import { findChapter, touchStudied } from "../domain/course";
import {
  completeCurrentActivity,
  createStudySessionFromPlan,
  finishStudySession,
  getCurrentActivity,
  getEstimatedSessionMinutes,
  getSessionActivityProgress,
  pauseStudySession,
  resumeStudySession
} from "../domain/session/studySession";
import { escapeAttribute } from "../ui/html";
import { buildTodayPlan } from "./todayPlanView";

export function renderStudySessionView(ctx: AppContext, mode: "active" | "summary"): string {
  const session = ctx.state.activeStudySession;

  if (!session) {
    return `
      <section class="ds-page study-session-page">
        <div class="ds-card">
          <h1 class="ds-section-title">Nenhuma sessao ativa</h1>
          <p class="ds-aux">Inicie uma sessao focada a partir do plano de hoje.</p>
          <a class="button accent" href="#home">Voltar para Hoje</a>
        </div>
      </section>
    `;
  }

  if (mode === "summary" || session.status === "completed") {
    return renderSessionSummary(ctx, session);
  }

  if (session.status === "paused") {
    return renderPausedSession(ctx, session);
  }

  return renderActiveSession(ctx, session);
}

function renderActiveSession(ctx: AppContext, session: NonNullable<AppContext["state"]["activeStudySession"]>): string {
  const current = getCurrentActivity(session);
  const progress = getSessionActivityProgress(session);
  const totalMinutes = getEstimatedSessionMinutes(session);

  if (!current) {
    return renderSessionSummary(ctx, session);
  }

  const activityIndex = session.activities.findIndex((activity) => activity.id === current.id);
  const chapter = findChapter(ctx.data, current.missionId);
  const preview = chapter?.summary || chapter?.description || "";
  const isMasteryTest = current.kind === "mastery-test";
  const masteryHref = `#mastery/${escapeAttribute(current.missionId)}/session`;
  const readerHref = current.readerTab
    ? `#reader/${escapeAttribute(current.missionId)}/${current.readerTab}`
    : current.kind === "review"
      ? "#review"
      : `#reader/${escapeAttribute(current.missionId)}/ap1`;

  return `
    <section class="ds-page study-session-page">
      <header class="study-session-header rise-in">
        <p class="ds-caption">Sessao focada · ${totalMinutes} min estimados</p>
        <h1 class="ds-section-title">Atividade ${activityIndex + 1} de ${session.activities.length}</h1>
        <div class="study-session-progress" aria-label="Progresso da sessao">
          <div class="study-session-progress-bar" style="width:${progress.percent}%"></div>
        </div>
        <p class="ds-aux">${progress.completed}/${progress.total} concluidas (${progress.percent}%)</p>
      </header>

      <article class="ds-card study-session-activity rise-in" style="animation-delay:24ms">
        <span class="today-task-type">${activityKindLabel(current.kind)}</span>
        <h2 class="ds-card-title">${current.title}</h2>
        <p class="ds-lead">${current.instruction}</p>
        ${preview && !isMasteryTest ? `<p class="ds-aux">${preview}</p>` : ""}
        ${isMasteryTest ? `<p class="ds-aux">Teste local com nota minima configuravel. Feedback e analise de erros somente ao final.</p>` : ""}
        <div class="today-task-meta">
          <span class="today-task-time">${current.estimatedMinutes} min estimados</span>
        </div>

        <div class="study-session-actions">
          ${isMasteryTest
            ? `<a class="button accent" href="${masteryHref}">Iniciar teste de dominio</a>`
            : `<a class="button accent" href="${readerHref}" data-session-open-reader>Abrir conteudo</a>`}
          ${isMasteryTest ? "" : `<button class="button" type="button" data-session-complete>Concluir atividade</button>`}
          <button class="button secondary" type="button" data-session-pause>Salvar e sair</button>
        </div>
      </article>

      <details class="ds-details study-session-outline rise-in" style="animation-delay:40ms">
        <summary>Ver todas as atividades (${session.activities.length})</summary>
        <ol class="study-session-outline-list">
          ${session.activities.map((activity, index) => {
            const done = session.completedActivityIds.includes(activity.id);
            const isCurrent = activity.id === current.id;
            return `
              <li class="${done ? "done" : ""} ${isCurrent ? "current" : ""}">
                <span>${index + 1}. ${activity.title}</span>
                <span class="today-task-time">${activity.estimatedMinutes} min</span>
              </li>
            `;
          }).join("")}
        </ol>
      </details>
    </section>
  `;
}

function renderPausedSession(_ctx: AppContext, session: NonNullable<AppContext["state"]["activeStudySession"]>): string {
  const progress = getSessionActivityProgress(session);
  return `
    <section class="ds-page study-session-page">
      <article class="ds-card study-session-paused rise-in">
        <p class="ds-caption">Sessao pausada</p>
        <h1 class="ds-section-title">Retomar estudo focado</h1>
        <p class="ds-aux">${progress.completed}/${progress.total} atividades concluidas · pausada em ${formatTime(session.pausedAt)}</p>
        <div class="study-session-actions">
          <button class="button accent" type="button" data-session-resume>Retomar sessao</button>
          <a class="button secondary" href="#home">Voltar para Hoje</a>
        </div>
      </article>
    </section>
  `;
}

function renderSessionSummary(ctx: AppContext, session: NonNullable<AppContext["state"]["activeStudySession"]>): string {
  const historyEntry = ctx.state.studySessionHistory.find((entry) => entry.id === session.id);
  const completed = historyEntry?.activitiesCompleted ?? session.completedActivityIds.length;
  const total = historyEntry?.activitiesTotal ?? session.activities.length;
  const minutes = historyEntry?.minutesStudied ?? 0;

  return `
    <section class="ds-page study-session-page">
      <article class="ds-card study-session-summary rise-in">
        <p class="ds-caption">Sessao concluida</p>
        <h1 class="ds-section-title">Resumo do estudo</h1>
        <div class="ds-kpi-grid study-session-kpis">
          <div class="ds-card ds-kpi">
            <span class="ds-caption">Atividades</span>
            <strong>${completed}/${total}</strong>
          </div>
          <div class="ds-card ds-kpi">
            <span class="ds-caption">Tempo</span>
            <strong>${minutes} min</strong>
          </div>
          <div class="ds-card ds-kpi">
            <span class="ds-caption">Missoes</span>
            <strong>${historyEntry?.missionIds.length ?? new Set(session.activities.map((a) => a.missionId)).size}</strong>
          </div>
        </div>
        <p class="ds-aux">Progresso salvo localmente. Continue amanha ou retome pela jornada.</p>
        <div class="study-session-actions">
          <a class="button accent" href="#home">Voltar para Hoje</a>
          <button class="button secondary" type="button" data-session-dismiss>Fechar resumo</button>
        </div>
      </article>
    </section>
  `;
}

function activityKindLabel(kind: string): string {
  if (kind === "review") return "Revisao";
  if (kind === "mastery-test") return "Teste de dominio";
  return "Etapa de estudo";
}

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "—";
  }
}

export function startStudySessionFromPlan(ctx: AppContext): void {
  const plan = buildTodayPlan(ctx);
  if (!plan.tasks.length) return;
  ctx.state.activeStudySession = createStudySessionFromPlan(plan, ctx);
  touchStudied(ctx.state, plan.tasks[0].missionId);
}

export function handleSessionComplete(ctx: AppContext): void {
  const session = ctx.state.activeStudySession;
  if (!session || session.status === "completed") return;

  ctx.state.activeStudySession = completeCurrentActivity(session, ctx.state);

  if (ctx.state.activeStudySession?.status === "completed") {
    const { session: finished, summary } = finishStudySession(ctx.state.activeStudySession);
    ctx.state.activeStudySession = finished;
    ctx.state.studySessionHistory = [summary, ...ctx.state.studySessionHistory].slice(0, 50);
  }
}

export function handleSessionPause(ctx: AppContext): void {
  if (!ctx.state.activeStudySession) return;
  ctx.state.activeStudySession = pauseStudySession(ctx.state.activeStudySession);
}

export function handleSessionResume(ctx: AppContext): void {
  if (!ctx.state.activeStudySession) return;
  ctx.state.activeStudySession = resumeStudySession(ctx.state.activeStudySession);
}

export function handleSessionDismiss(ctx: AppContext): void {
  ctx.state.activeStudySession = null;
}
