import type { AppContext } from "../appContext";
import { buildMissionPanelModel } from "../domain/dashboard/missionPanel";
import { formatMockExamTimer, getMockExamAnsweredCount, getMockExamRemainingMs } from "../domain/mockExam";
import { getHomeTodayInsights } from "../domain/dashboard/homeToday";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import { hasResumableSession } from "../domain/session/studySession";
import {
  renderAfterThisStep,
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
  const sessionHref = hasResumableSession(ctx.state) ? "#session" : "#session/start";
  const sessionLabel = hasResumableSession(ctx.state) ? "Retomar sessão focada" : "Iniciar sessão focada";

  return `
    <section class="ds-page mission-panel" data-mission-panel>
      ${renderAlerts(ctx, unfinishedMock)}

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

          <section class="mission-side-links ds-card" aria-label="Atalhos">
            <a class="mission-side-link" href="${sessionHref}">${sessionLabel}</a>
            <a class="mission-side-link" href="${insights.dueMissionReviews > 0 ? "#review-mission" : "#review"}">
              Revisões${insights.dueMissionReviews > 0 ? ` (${insights.dueMissionReviews})` : ""}
            </a>
            <a class="mission-side-link" href="#exam">Treino AP1</a>
            <a class="mission-side-link" href="#course">Trilha completa</a>
            <a class="mission-side-link" href="#docs-ai">Docs AI</a>
          </section>

          <details class="mission-tools-details ds-card" id="dashboard-progress">
            <summary>Ferramentas e backup</summary>
            <div class="progress-backup">
              <button class="button secondary" type="button" data-export-progress>Exportar progresso</button>
              <label class="button secondary file-button">Importar<input type="file" accept="application/json,.json" data-import-progress></label>
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
      <section class="ds-card ds-alert home-onboarding rise-in" aria-label="Primeiros passos">
        <h2 class="ds-card-title">Como usar a jornada</h2>
        <ol class="onboarding-steps ds-aux">
          <li>Foque na missão atual e na próxima etapa.</li>
          <li>Cada missão tem 5 etapas no leitor.</li>
          <li>Marque Acertei/Errei para montar a revisão.</li>
        </ol>
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
