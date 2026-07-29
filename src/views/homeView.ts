import type { AppContext } from "../appContext";
import { buildMissionPanelModel } from "../domain/dashboard/missionPanel";
import { formatMockExamTimer, getMockExamAnsweredCount, getMockExamRemainingMs } from "../domain/mockExam";
import { getHomeTodayInsights } from "../domain/dashboard/homeToday";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import { hasResumableSession } from "../domain/session/studySession";
import {
  renderAfterThisStep,
  renderMissionCelebration,
  renderMissionFocusBar,
  renderMissionHero,
  renderMissionMaterials,
  renderMissionRewards,
  renderMissionStepper,
  renderMissionSummary,
  renderMissionTips,
  renderNextStepCard,
  renderProgressIndicator
} from "./missionPanel/components";

export function renderHomeView(ctx: AppContext): string {
  const model = buildMissionPanelModel(ctx);
  const unfinishedMock = ctx.state.mockExam && ctx.state.mockExam.status !== "finished" ? ctx.state.mockExam : null;
  const insights = getHomeTodayInsights(getNormalizedCourseData(), ctx.state);
  const sessionHref = model.nextAction?.type === "resume-session"
    ? model.nextAction.href
    : hasResumableSession(ctx.state) ? "#session" : "#session/start";
  const sessionLabel = model.nextAction?.type === "resume-session"
    ? "Retomar sessão focada"
    : hasResumableSession(ctx.state) ? "Retomar sessão focada" : "Iniciar sessão focada";
  const reviewHref = model.nextAction?.type === "start-review"
    ? model.nextAction.href
    : insights.dueMissionReviews > 0 ? "#review-mission" : "#review";

  return `
    <section class="ds-page mission-panel" data-mission-panel>
      ${renderAlerts(ctx, unfinishedMock)}
      ${renderMissionCelebration(model)}

      <div class="mission-panel-layout">
        <div class="mission-panel-main">
          ${renderMissionHero(model)}
          ${renderMissionStepper(model)}
          ${renderNextStepCard(model)}
          ${renderAfterThisStep(model)}
          ${renderMissionRewards(model)}
          <div class="mission-materials-mobile">
            ${renderMissionMaterials(model, true)}
          </div>
        </div>

        <aside class="mission-panel-side rise-in" style="animation-delay:24ms" aria-label="Contexto da missão">
          ${renderProgressIndicator(model)}
          ${renderMissionSummary(model)}
          <div class="mission-materials-desktop">
            ${renderMissionMaterials(model, true)}
          </div>
          ${renderMissionTips(model)}

          <details class="mission-more-details ds-card">
            <summary>Mais opções</summary>
            <div class="mission-more-body">
              <a class="mission-side-link" href="${sessionHref}">${sessionLabel}</a>
              <a class="mission-side-link" href="${reviewHref}">
                Revisões${insights.dueMissionReviews > 0 ? ` (${insights.dueMissionReviews})` : ""}
              </a>
              <a class="mission-side-link" href="#exam">Treino AP1</a>
              <a class="mission-side-link" href="#course">Trilha completa</a>
              <a class="mission-side-link" href="#docs-ai">Docs AI</a>
              <div class="progress-backup">
                <button class="button secondary" type="button" data-export-progress>Exportar progresso</button>
                <label class="button secondary file-button">Importar<input type="file" accept="application/json,.json" data-import-progress></label>
              </div>
            </div>
          </details>
        </aside>
      </div>

      ${renderMissionFocusBar(model)}
    </section>
  `;
}

function renderAlerts(ctx: AppContext, unfinishedMock: AppContext["state"]["mockExam"]): string {
  const parts: string[] = [];
  if (!ctx.state.preferences.onboardingDone) {
    parts.push(`
      <section class="mission-onboarding rise-in" aria-label="Primeiros passos">
        <div>
          <p class="ds-caption">Bem-vindo</p>
          <strong>Foque na missão e na próxima evidência.</strong>
          <p class="ds-aux">Produza em cada etapa · Acertei/Errei alimenta a revisão · Domínio no teste.</p>
        </div>
        <button class="button secondary" type="button" data-dismiss-onboarding>Entendi</button>
      </section>
    `);
  }
  if (unfinishedMock) {
    parts.push(`
      <section class="ds-card ds-alert rise-in" role="status">
        <strong>Simulado em andamento</strong>
        <p class="ds-aux">${getMockExamAnsweredCount(unfinishedMock)}/${unfinishedMock.questions.length} · ${formatMockExamTimer(getMockExamRemainingMs(unfinishedMock))}</p>
        <a class="button secondary" href="#exam/mock" data-go-exam-mock>Retomar mock</a>
      </section>
    `);
  }
  return parts.join("");
}
