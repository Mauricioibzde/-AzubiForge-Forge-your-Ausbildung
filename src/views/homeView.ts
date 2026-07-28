import type { AppContext } from "../appContext";
import {
  countChaptersWithNotes,
  getActiveModule,
  getChapterLearningSituation,
  getChapterModule,
  getChapterPathStatus,
  getChapterReadiness,
  getCourseProgress,
  getCourseReadiness,
  getDailyGoalProgress,
  getDueReviewItemCount,
  getEstimatedSessionMinutes,
  getEstimatedStudyMinutes,
  getModuleProgress,
  getReviewQueue,
  getResumeTab,
  getSessionProgress,
  getStudyStreak,
  getStudyCalendarDays,
  getReviewResolutionStreak,
  getTodayResolvedReviewCount,
  getTodayChapter,
  isReviewDue,
  READER_STEPS
} from "../domain/course";
import { getExamReadinessSummary, getWeakChapters } from "../domain/exam";
import { formatMockExamTimer, getMockExamAnsweredCount, getMockExamRemainingMs } from "../domain/mockExam";
import {
  confidenceBadge,
  donutProgress,
  escapeAttribute,
  inlineProgress,
  kpiCard,
  readinessBadge,
  workflowCard
} from "../ui/html";

export function renderHomeView(ctx: AppContext): string {
  const progress = getCourseProgress(ctx.data, ctx.state);
  const readiness = getCourseReadiness(ctx.data, ctx.state);
  const daily = getDailyGoalProgress(ctx.state);
  const streak = getStudyStreak(ctx.state);
  const calendar = getStudyCalendarDays(ctx.state, 14);
  const studyMinutes = getEstimatedStudyMinutes(ctx.data, ctx.state);
  const notesCount = countChaptersWithNotes(ctx.state);
  const chapter = getTodayChapter(ctx.data, ctx.state);
  const chapterReadiness = getChapterReadiness(ctx.data, ctx.state, chapter);
  const module = getChapterModule(ctx.data, chapter.id) || getActiveModule(ctx.data, ctx.state);
  const situation = getChapterLearningSituation(ctx.data, chapter.id);
  const session = getSessionProgress(ctx.state, chapter.id);
  const resumeTab = getResumeTab(ctx.state, chapter.id);
  const resumeLabel = READER_STEPS.find((step) => step.id === resumeTab)?.label || "Erklaeren";
  const minutes = getEstimatedSessionMinutes(chapter);
  const review = getReviewQueue(ctx.data, ctx.state).filter((item) => item.id !== chapter.id).slice(0, 4);
  const dueItems = getDueReviewItemCount(ctx.state);
  const resolvedToday = getTodayResolvedReviewCount(ctx.state);
  const reviewStreak = getReviewResolutionStreak(ctx.state);
  const moduleProgress = getModuleProgress(ctx.data, ctx.state, module);
  const ctaLabel = session.completed > 0 && session.percent < 100 ? "Continuar sessao" : "Comecar sessao";
  const examSummary = getExamReadinessSummary(ctx.data, ctx.state);
  const weakTopics = getWeakChapters(ctx.data, ctx.state, 3);
  const unfinishedMock = ctx.state.mockExam && ctx.state.mockExam.status !== "finished" ? ctx.state.mockExam : null;
  const studyGoal = ctx.state.preferences.studyGoal || "Dominar a AP1 e organizar os fundamentos.";
  const examMode = examSummary.weakCount ? "weak" : "drill";
  const sessionStatus = session.percent === 100 ? "Concluida" : session.completed > 0 ? "Em andamento" : "Nao iniciada";
  const reviewStatus = dueItems > 0 ? `${dueItems} vencidos` : "Em dia";
  const examStatus = unfinishedMock ? "Mock ativo" : examSummary.weakCount ? `${examSummary.weakCount} fracos` : "Estavel";

  return `
    <section class="ds-page dashboard">
      ${renderAlerts(ctx, unfinishedMock)}

      <div class="ds-hero-layout rise-in">
        <header class="ds-hero">
          <p class="ds-caption">Curso offline AP1 FIAE</p>
          <h1>AzubiForge – ${ctx.data.course.title}</h1>
          <p class="ds-lead">${studyGoal}</p>
          <a class="button accent" href="#reader/${chapter.id}/${resumeTab}" data-dashboard-cta>${ctaLabel}</a>
        </header>
        <aside class="ds-card ds-progress-rail" id="dashboard-progress" aria-label="Progresso">
          ${donutProgress(progress, "Trilha")}
          <div class="streak-calendar compact" aria-label="Ultimos 14 dias">
            ${calendar.map((day) => `
              <span class="streak-day ${day.studied ? "studied" : ""} ${day.isToday ? "today" : ""}" title="${day.key}">${day.label}</span>
            `).join("")}
          </div>
          <div class="daily-goal-controls compact-goal" aria-label="Meta diaria">
            <span class="ds-caption">Meta diaria</span>
            <div class="segmented-control compact">
              ${[1, 2, 3, 4, 5].map((goal) => `
                <button class="${ctx.state.preferences.dailyGoalSessions === goal ? "active" : ""}" type="button" data-daily-goal="${goal}">${goal}</button>
              `).join("")}
            </div>
          </div>
          <p class="ds-aux">${daily.completed}/${daily.total} sessoes uteis hoje</p>
        </aside>
      </div>

      <section class="ds-section rise-in" style="animation-delay:24ms" aria-label="Workflow do dia">
        <h2 class="ds-section-title">Workflow</h2>
        <div class="ds-workflow-grid">
          ${workflowCard("1 · Sessao", chapter.title, `${module.subtitle} · ${minutes} min`, "open", sessionStatus, `#reader/${chapter.id}/${resumeTab}`, ctaLabel)}
          ${workflowCard("2 · Revisao", "Corrigir antes de esquecer", `${resolvedToday} resolvidas hoje`, dueItems > 0 ? "due" : "open", reviewStatus, "#review", "Revisar", "data-go-review-due")}
          ${workflowCard("3 · AP1", unfinishedMock ? "Retomar simulado" : "Treino recomendado", examStatus, unfinishedMock ? "due" : "open", unfinishedMock ? "Em andamento" : "Pronto", unfinishedMock ? "#exam/mock" : `#exam/${examMode}`, unfinishedMock ? "Retomar mock" : "Abrir AP1", unfinishedMock ? "data-go-exam-mock" : "")}
        </div>
      </section>

      <section class="ds-section ds-session-block rise-in" style="animation-delay:40ms" aria-label="Sessao de hoje">
        <div class="ds-section-head">
          <div>
            <h2 class="ds-section-title">Sessao de hoje</h2>
            <p class="ds-aux">${situation?.title || "Lernsituation"} · ${session.completed}/${session.total} etapas</p>
          </div>
          <div class="session-badges">
            ${confidenceBadge(ctx.state, chapter.id)}
            ${readinessBadge(chapterReadiness)}
          </div>
        </div>
        <ol class="learning-path timeline-path ds-session-timeline" aria-label="Etapas da sessao">
          ${READER_STEPS.map((step, index) => {
            const done = (ctx.state.sessionSteps[chapter.id] || []).includes(step.id);
            const current = index === session.completed && !done;
            return `
              <li class="path-node ${done ? "done" : current ? "current" : "open"}">
                <div class="path-marker" aria-hidden="true">${done ? "✓" : "○"}</div>
                <div class="path-copy">
                  <div class="path-topline">
                    <span class="path-status">${step.label}</span>
                    <h3>${step.hint}</h3>
                  </div>
                </div>
                <a class="button ${current ? "accent" : "secondary"}" href="#reader/${chapter.id}/${step.id}">${done ? "Rever" : current ? "Continuar" : "Abrir"}</a>
              </li>
            `;
          }).join("")}
        </ol>
        <div class="session-progress-line" aria-hidden="true"><div style="width:${session.percent}%"></div></div>
        ${session.completed > 0 && session.percent < 100 ? `<p class="ds-aux">Retomar em: <strong>${resumeLabel}</strong></p>` : ""}
      </section>

      <section class="ds-kpi-grid rise-in" style="animation-delay:56ms" aria-label="Metricas">
        ${kpiCard("Pendencias", String(dueItems), dueItems > 0 ? "Revisoes vencidas" : "Fila em dia")}
        ${kpiCard("Streak", `${streak} dia(s)`, `Revisao: ${reviewStreak} dia(s)`)}
        ${kpiCard("Progresso", `${progress.percent}%`, `${progress.completed}/${progress.total} capitulos`)}
        ${kpiCard("Tempo", `${studyMinutes} min`, `${readiness.completed} quase prontos · ${notesCount} notas`)}
      </section>

      <section class="ds-section ds-search-block rise-in" style="animation-delay:72ms" aria-label="Busca">
        <input id="global-search-input" class="search-input premium-search" type="search" placeholder="Buscar capitulo, termo ou glossario..." aria-label="Busca global" data-global-search value="${escapeAttribute(ctx.ui.globalQuery)}">
        ${ctx.ui.globalQuery ? renderGlobalResults(ctx) : ""}
      </section>

      <div class="ds-main-layout rise-in" style="animation-delay:88ms">
        <section class="ds-section ds-timeline-block" aria-label="Trilha do modulo">
          <div class="ds-section-head">
            <div>
              <h2 class="ds-section-title">${module.subtitle}</h2>
              <p class="ds-aux">${module.description}</p>
            </div>
            <a class="text-link" href="#course">Trilha completa →</a>
          </div>
          ${inlineProgress(moduleProgress)}
          <ol class="learning-path timeline-path" aria-label="Capitulos do modulo">
            ${module.chapterIds.map((id) => {
              const item = ctx.data.chapters.find((c) => c.id === id);
              if (!item) return "";
              const status = getChapterPathStatus(ctx.data, ctx.state, id, module);
              const action = status === "done" ? "Revisar" : status === "current" ? "Continuar" : "Abrir";
              return `
                <li class="path-node ${status}">
                  <div class="path-marker" aria-hidden="true">${status === "done" ? "✓" : "○"}</div>
                  <div class="path-copy">
                    <div class="path-topline">
                      <span class="path-status">${status === "done" ? "Concluido" : status === "current" ? "Agora" : "A seguir"}</span>
                      <h3>${item.title}</h3>
                    </div>
                    <p class="ds-aux">${item.studyTime || "Sessao curta"}</p>
                  </div>
                  <a class="button ${status === "current" ? "accent" : "secondary"}" href="#reader/${id}/${getResumeTab(ctx.state, id)}">${action}</a>
                </li>
              `;
            }).join("")}
          </ol>
        </section>

        <aside class="ds-card ds-secondary-rail" aria-label="Informacoes secundarias">
          <h3 class="ds-card-title">Revisao rapida</h3>
          <div class="review-queue-list">
            ${review.length ? review.map((item) => {
              const due = isReviewDue(ctx.state, item.id);
              return `
                <a class="review-queue-row" href="#reader/${item.id}/${getResumeTab(ctx.state, item.id)}">
                  <div><strong>${item.title}</strong><span class="ds-aux">${getChapterModule(ctx.data, item.id)?.subtitle || ""}</span></div>
                  <span class="status-pill ${due ? "due" : "open"}">${due ? "Hoje" : "Aberto"}</span>
                </a>
              `;
            }).join("") : `<p class="ds-aux">Sem pendencias urgentes.</p>`}
          </div>
          ${weakTopics.length ? `
            <h3 class="ds-card-title">Temas fracos AP1</h3>
            <div class="mini-list exam-coach-list">
              ${weakTopics.map((item) => `
                <a href="#reader/${item.chapter.id}/${getResumeTab(ctx.state, item.chapter.id)}">
                  <strong>${item.chapter.title}</strong>
                  <span class="ds-aux">${item.moduleTitle}</span>
                </a>
              `).join("")}
            </div>
          ` : ""}
          <details class="offline-tools-panel ds-details">
            <summary>Ferramentas offline</summary>
            <div class="progress-backup">
              <button class="button secondary" type="button" data-export-progress>Exportar</button>
              <label class="button secondary file-button">Importar<input type="file" accept="application/json,.json" data-import-progress></label>
            </div>
          </details>
        </aside>
      </div>

      ${progress.percent === 100 ? `
        <section class="ds-card ds-completion rise-in">
          <h2 class="ds-section-title">Trilha concluida</h2>
          <p class="ds-aux">Foco em revisao ativa e treino AP1.</p>
        </section>
      ` : ""}
    </section>
  `;
}

function renderAlerts(ctx: AppContext, unfinishedMock: AppContext["state"]["mockExam"]): string {
  const parts: string[] = [];
  if (!ctx.state.preferences.onboardingDone) {
    parts.push(`
      <section class="ds-card ds-alert rise-in" aria-label="Primeiros passos">
        <h2 class="ds-card-title">Como estudar</h2>
        <ol class="onboarding-steps ds-aux">
          <li>Siga as 5 etapas da sessao.</li>
          <li>Responda antes de revelar em vocabulario e exercicios.</li>
          <li>Marque Acertei/Errei para montar revisao.</li>
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
        <a class="button secondary" href="#exam/mock" data-go-exam-mock>Retomar</a>
      </section>
    `);
  }
  return parts.join("");
}

function renderGlobalResults(ctx: AppContext): string {
  const query = ctx.ui.globalQuery.trim().toLowerCase();
  if (!query) return "";

  const chapters = ctx.data.chapters
    .filter((chapter) => `${chapter.title} ${chapter.description} ${chapter.ihk} ${chapter.summary}`.toLowerCase().includes(query))
    .slice(0, 5)
    .map((chapter) => ({
      type: "Capitulo",
      title: chapter.title,
      description: chapter.description,
      href: `#reader/${chapter.id}/${getResumeTab(ctx.state, chapter.id)}`
    }));
  const glossary = ctx.data.glossary
    .filter((term) => `${term.word} ${term.translation} ${term.explanation}`.toLowerCase().includes(query))
    .slice(0, 5)
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
