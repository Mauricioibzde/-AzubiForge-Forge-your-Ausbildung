import type { AppContext } from "../appContext";
import {
  getCourseProgress,
  getDailyGoalProgress,
  getDueReviewItemCount,
  getEstimatedStudyMinutes,
  getResumeTab,
  getReviewResolutionStreak,
  getStudyStreak,
  getStudyCalendarDays,
  getTodayChapter,
  getTodayResolvedReviewCount
} from "../domain/course";
import { getJourneyNodes, getJourneyProgress } from "../domain/journey";
import { formatMockExamTimer, getMockExamAnsweredCount, getMockExamRemainingMs } from "../domain/mockExam";
import { donutProgress, escapeAttribute, kpiCard } from "../ui/html";

export function renderHomeView(ctx: AppContext): string {
  const progress = getCourseProgress(ctx.data, ctx.state);
  const journey = getJourneyProgress(ctx.data, ctx.state);
  const nodes = getJourneyNodes(ctx.data, ctx.state);
  const chapter = getTodayChapter(ctx.data, ctx.state);
  const resumeTab = getResumeTab(ctx.state, chapter.id);
  const nextHref = `#reader/${chapter.id}/${resumeTab}`;
  const daily = getDailyGoalProgress(ctx.state);
  const streak = getStudyStreak(ctx.state);
  const calendar = getStudyCalendarDays(ctx.state, 14);
  const studyMinutes = getEstimatedStudyMinutes(ctx.data, ctx.state);
  const dueItems = getDueReviewItemCount(ctx.state);
  const resolvedToday = getTodayResolvedReviewCount(ctx.state);
  const reviewStreak = getReviewResolutionStreak(ctx.state);
  const studyGoal = ctx.state.preferences.studyGoal || "Dominar a AP1 e organizar os fundamentos.";
  const unfinishedMock = ctx.state.mockExam && ctx.state.mockExam.status !== "finished" ? ctx.state.mockExam : null;

  return `
    <section class="ds-page dashboard journey-page">
      ${renderAlerts(ctx, unfinishedMock)}

      <header class="ds-hero-layout rise-in">
        <div class="ds-hero">
          <p class="ds-caption">Jornada guiada AP1</p>
          <h1>Sua linha do tempo de estudo</h1>
          <p class="ds-lead">${studyGoal}</p>
          <p class="ds-aux">Capitulo atual: <strong>${chapter.title}</strong> · ${journey.completed}/${journey.total} concluidos (${journey.percent}%)</p>
          <a class="button accent" href="${nextHref}" data-dashboard-cta>Continuar jornada</a>
        </div>
        <aside class="ds-card ds-progress-rail" id="dashboard-progress" aria-label="Progresso">
          ${donutProgress(progress, "Trilha")}
          <div class="streak-calendar compact" aria-label="Ultimos 14 dias">
            ${calendar.map((day) => `
              <span class="streak-day ${day.studied ? "studied" : ""} ${day.isToday ? "today" : ""}" title="${day.key}">${day.label}</span>
            `).join("")}
          </div>
          <p class="ds-aux">${daily.completed}/${daily.total} sessoes uteis hoje</p>
        </aside>
      </header>

      <section class="ds-kpi-grid rise-in" style="animation-delay:24ms" aria-label="Metricas">
        ${kpiCard("Pendencias", String(dueItems), dueItems > 0 ? "Revisoes vencidas" : "Fila em dia")}
        ${kpiCard("Streak", `${streak} dia(s)`, `Revisao: ${reviewStreak} dia(s)`)}
        ${kpiCard("Progresso", `${progress.percent}%`, `${progress.completed}/${progress.total} capitulos`)}
        ${kpiCard("Tempo", `${studyMinutes} min`, `${resolvedToday} revisoes hoje`)}
      </section>

      <section class="ds-section journey-timeline-section rise-in" style="animation-delay:40ms" aria-label="Linha do tempo completa">
        <div class="ds-section-head">
          <div>
            <h2 class="ds-section-title">Fluxo completo</h2>
            <p class="ds-aux">Siga a linha do tempo: modulo → capitulo → 5 etapas → revisao → AP1.</p>
          </div>
          <a class="text-link" href="#course">Ver trilha detalhada →</a>
        </div>
        <ol class="journey-timeline">
          ${nodes.map((node) => renderJourneyNode(node)).join("")}
        </ol>
      </section>

      <section class="ds-section ds-search-block rise-in" style="animation-delay:56ms" aria-label="Busca">
        <input id="global-search-input" class="search-input premium-search" type="search" placeholder="Buscar capitulo, termo ou glossario..." aria-label="Busca global" data-global-search value="${escapeAttribute(ctx.ui.globalQuery)}">
        ${ctx.ui.globalQuery ? renderGlobalResults(ctx) : ""}
      </section>

      <details class="offline-tools-panel ds-details rise-in" style="animation-delay:72ms">
        <summary>Ferramentas offline e backup</summary>
        <div class="progress-backup">
          <button class="button secondary" type="button" data-export-progress>Exportar progresso</button>
          <label class="button secondary file-button">Importar<input type="file" accept="application/json,.json" data-import-progress></label>
        </div>
      </details>
    </section>
  `;
}

function renderJourneyNode(node: ReturnType<typeof getJourneyNodes>[number]): string {
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
      ${node.kind === "module" ? "" : `<a class="button ${node.status === "current" ? "accent" : "secondary"}" href="${node.href}">${nodeActionLabel(node)}</a>`}
    </li>
  `;
}

function nodeKindLabel(kind: ReturnType<typeof getJourneyNodes>[number]["kind"]): string {
  if (kind === "module") return "Modulo";
  if (kind === "chapter") return "Capitulo";
  if (kind === "session-step") return "Etapa";
  if (kind === "review-gate") return "Revisao";
  return "AP1";
}

function nodeActionLabel(node: ReturnType<typeof getJourneyNodes>[number]): string {
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
      <section class="ds-card ds-alert rise-in" aria-label="Primeiros passos">
        <h2 class="ds-card-title">Como usar a jornada</h2>
        <ol class="onboarding-steps ds-aux">
          <li>Siga a linha do tempo de cima para baixo.</li>
          <li>Cada capitulo tem 5 etapas guiadas no leitor.</li>
          <li>Marque Acertei/Errei para montar sua revisao.</li>
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
      type: "Capitulo",
      title: chapter.title,
      description: chapter.description,
      href: `#reader/${chapter.id}/${getResumeTab(ctx.state, chapter.id)}`
    }));
  const glossary = ctx.data.glossary
    .filter((term) => `${term.word} ${term.translation}`.toLowerCase().includes(query))
    .slice(0, 4)
    .map((term) => ({
      type: "Glossario",
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
