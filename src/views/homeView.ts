import type { AppContext } from "../appContext";
import {
  getActiveModule,
  getCourseProgress,
  getDailyGoalProgress,
  getResumeTab,
  getStudyCalendarDays,
  getTodayChapter
} from "../domain/course";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import { getHomeTodayInsights } from "../domain/dashboard/homeToday";
import type { JourneyNode } from "../domain/journey";
import { getJourneyNodes, getJourneyProgress } from "../domain/journey";
import { formatMockExamTimer, getMockExamAnsweredCount, getMockExamRemainingMs } from "../domain/mockExam";
import { escapeAttribute } from "../ui/html";
import { renderTodayPlanSection } from "./todayPlanView";

export function renderHomeView(ctx: AppContext): string {
  const progress = getCourseProgress(ctx.data, ctx.state);
  const journey = getJourneyProgress(ctx.data, ctx.state);
  const activeModule = getActiveModule(ctx.data, ctx.state);
  const nodes = filterJourneyNodes(getJourneyNodes(ctx.data, ctx.state), activeModule.id);
  const chapter = getTodayChapter(ctx.data, ctx.state);
  const resumeTab = getResumeTab(ctx.state, chapter.id);
  const nextHref = `#reader/${chapter.id}/${resumeTab}`;
  const daily = getDailyGoalProgress(ctx.state);
  const calendar = getStudyCalendarDays(ctx.state, 14);
  const unfinishedMock = ctx.state.mockExam && ctx.state.mockExam.status !== "finished" ? ctx.state.mockExam : null;
  const insights = getHomeTodayInsights(getNormalizedCourseData(), ctx.state);

  return `
    <section class="ds-page dashboard journey-page home-redesign">
      ${renderAlerts(ctx, unfinishedMock)}

      <section class="home-now-strip rise-in" aria-label="Continuar jornada">
        <div class="home-now-copy">
          <p class="ds-caption">Agora · ${activeModule.title}</p>
          <h1 class="home-now-title">${chapter.title}</h1>
          <p class="ds-aux">${journey.completed}/${journey.total} concluídos · ${journey.percent}% da trilha</p>
          <div class="home-now-progress" aria-hidden="true">
            <span style="width:${Math.max(progress.percent, journey.percent)}%"></span>
          </div>
        </div>
        <a class="button accent home-now-cta" href="${nextHref}" data-dashboard-cta>Continuar jornada</a>
      </section>

      ${renderTodayPlanSection(ctx)}

      <section class="home-priority-list rise-in" style="animation-delay:16ms" aria-label="Prioridades">
        <a class="home-priority-row" href="${insights.dueMissionReviews > 0 ? "#review-mission" : "#review"}">
          <span class="ds-caption">Revisões</span>
          <strong>${insights.dueMissionReviews}</strong>
          <span class="home-priority-action">${insights.dueMissionReviews > 0 ? "Revisar" : "Fila"}</span>
        </a>
        <a class="home-priority-row" href="${insights.inProgressMissionId ? `#reader/${insights.inProgressMissionId}/${getResumeTab(ctx.state, insights.inProgressMissionId)}` : "#session/start"}">
          <span class="ds-caption">Missão</span>
          <strong>${insights.inProgressMissionTitle || "Iniciar sessão"}</strong>
          <span class="home-priority-action">${insights.inProgressMissionId ? "Retomar" : "Iniciar"}</span>
        </a>
        <a class="home-priority-row" href="#course">
          <span class="ds-caption">Trilha</span>
          <strong>${activeModule.subtitle}</strong>
          <span class="home-priority-action">Abrir</span>
        </a>
      </section>

      <section class="ds-section journey-timeline-section rise-in" style="animation-delay:28ms" aria-label="Fluxo do módulo">
        <div class="ds-section-head">
          <div>
            <h2 class="ds-section-title">Fluxo do módulo</h2>
            <p class="ds-aux">${activeModule.title} · ${daily.completed}/${daily.total} sessões úteis hoje</p>
          </div>
          <a class="text-link" href="#course">Trilha completa →</a>
        </div>
        <ol class="journey-timeline" id="journey-timeline">
          ${nodes.map((node) => renderJourneyNode(node)).join("")}
        </ol>
      </section>

      <details class="home-more-panel ds-details rise-in" style="animation-delay:40ms" id="dashboard-progress">
        <summary>Progresso e ferramentas</summary>
        <div class="home-more-grid">
          <div class="home-more-stats">
            <p class="ds-aux"><strong>${progress.percent}%</strong> da trilha · ${progress.completed}/${progress.total} capítulos</p>
            <p class="ds-aux"><strong>${daily.completed}/${daily.total}</strong> sessões úteis hoje</p>
            <div class="streak-calendar compact" aria-label="Últimos 14 dias">
              ${calendar.map((day) => `
                <span class="streak-day ${day.studied ? "studied" : ""} ${day.isToday ? "today" : ""}" title="${day.key}">${day.label}</span>
              `).join("")}
            </div>
            <div class="home-lf-list">
              ${insights.learningFieldMastery.slice(0, 5).map((item) => `
                <p class="ds-aux"><strong>${item.title}</strong>: ${item.mastered}/${item.total} (${item.percent}%)</p>
              `).join("")}
            </div>
          </div>
          <div class="home-more-tools">
            <input id="global-search-input" class="search-input premium-search" type="search" placeholder="Buscar capítulo ou termo..." aria-label="Busca global" data-global-search value="${escapeAttribute(ctx.ui.globalQuery)}">
            ${ctx.ui.globalQuery ? renderGlobalResults(ctx) : ""}
            <div class="progress-backup">
              <button class="button secondary" type="button" data-export-progress>Exportar progresso</button>
              <label class="button secondary file-button">Importar<input type="file" accept="application/json,.json" data-import-progress></label>
            </div>
          </div>
        </div>
      </details>
    </section>
  `;
}

function filterJourneyNodes(nodes: JourneyNode[], activeModuleId: string): JourneyNode[] {
  return nodes.filter((node) => {
    if (node.kind === "module") return node.moduleId === activeModuleId || node.status === "current";
    if (node.kind !== "chapter" && node.kind !== "session-step") return true;
    if (node.moduleId === activeModuleId) return true;
    return node.status === "current";
  });
}

function renderJourneyNode(node: JourneyNode): string {
  const kindClass = `journey-node-${node.kind}`;
  const marker = node.kind === "module"
    ? "◆"
    : node.kind === "session-step"
      ? node.status === "done" ? "✓" : "·"
      : node.status === "done" ? "✓" : "○";

  const cta = node.status === "current"
    ? `<span class="journey-cta">Agora</span>`
    : node.status === "done"
      ? `<span class="journey-cta done">Feito</span>`
      : "";

  return `
    <li class="journey-node ${kindClass} ${node.status}">
      <div class="journey-marker" aria-hidden="true">${marker}</div>
      <div class="journey-copy">
        <div class="journey-topline">
          <span class="ds-caption">${nodeKindLabel(node.kind)}</span>
          ${cta}
        </div>
        <strong>${node.title}</strong>
        <p class="ds-aux">${node.subtitle}</p>
      </div>
      ${node.kind === "module" ? "" : `<a class="button ${node.status === "current" ? "accent" : "secondary"} journey-node-cta" href="${node.href}">${nodeActionLabel(node)}</a>`}
    </li>
  `;
}

function nodeKindLabel(kind: JourneyNode["kind"]): string {
  if (kind === "module") return "Módulo";
  if (kind === "chapter") return "Capítulo";
  if (kind === "session-step") return "Etapa";
  if (kind === "review-gate") return "Revisão";
  return "AP1";
}

function nodeActionLabel(node: JourneyNode): string {
  if (node.kind === "session-step") return node.status === "done" ? "Rever" : "Abrir";
  if (node.kind === "review-gate") return "Revisar";
  if (node.kind === "exam-gate") return "Treinar";
  if (node.status === "done") return "Revisar";
  return node.status === "current" ? "Continuar" : "Abrir";
}

function renderAlerts(ctx: AppContext, unfinishedMock: AppContext["state"]["mockExam"]): string {
  const parts: string[] = [];
  if (!ctx.state.preferences.onboardingDone) {
    parts.push(`
      <section class="ds-card ds-alert home-onboarding rise-in" aria-label="Primeiros passos">
        <h2 class="ds-card-title">Como usar a jornada</h2>
        <ol class="onboarding-steps ds-aux">
          <li>Toque em Continuar para a próxima etapa.</li>
          <li>Cada capítulo tem 5 passos no leitor.</li>
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

function renderGlobalResults(ctx: AppContext): string {
  const query = ctx.ui.globalQuery.trim().toLowerCase();
  if (!query) return "";

  const chapters = ctx.data.chapters
    .filter((chapter) => `${chapter.title} ${chapter.description}`.toLowerCase().includes(query))
    .slice(0, 6)
    .map((chapter) => ({
      type: "Capítulo",
      title: chapter.title,
      description: chapter.description,
      href: `#reader/${chapter.id}/${getResumeTab(ctx.state, chapter.id)}`
    }));
  const glossary = ctx.data.glossary
    .filter((term) => `${term.word} ${term.translation}`.toLowerCase().includes(query))
    .slice(0, 4)
    .map((term) => ({
      type: "Glossário",
      title: `${term.word} - ${term.translation}`,
      description: term.explanation,
      href: "#glossary"
    }));

  const results = [...chapters, ...glossary].slice(0, 8);
  if (!results.length) return `<p class="ds-aux">Nenhum resultado.</p>`;

  return `
    <div class="global-results">
      ${results.map((result) => `
        <a class="result-item" href="${result.href}">
          <span class="ds-caption">${result.type}</span>
          <strong>${result.title}</strong>
          <p class="ds-aux">${result.description}</p>
        </a>
      `).join("")}
    </div>
  `;
}
