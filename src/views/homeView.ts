import type { AppContext } from "../appContext";
import {
  countChaptersWithNotes,
  getActiveModule,
  getChapterLearningSituation,
  getChapterModule,
  getChapterReadiness,
  getCourseProgress,
  getCourseReadiness,
  getDailyGoalProgress,
  getDueReviewItemCount,
  getEstimatedSessionMinutes,
  getEstimatedStudyMinutes,
  getModuleContinueChapter,
  getModuleProgress,
  getReviewQueue,
  getResumeTab,
  getSessionProgress,
  getStudyStreak,
  getStudyCalendarDays,
  getReviewResolutionStreak,
  getTodayResolvedReviewCount,
  getTodayChapter,
  isCompleted,
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
  progressBlock,
  readinessBadge
} from "../ui/html";
import { icon } from "../ui/icons";

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
  const review = getReviewQueue(ctx.data, ctx.state).filter((item) => item.id !== chapter.id).slice(0, 5);
  const dueCount = ctx.data.chapters.filter((item) => isReviewDue(ctx.state, item.id)).length;
  const dueItems = getDueReviewItemCount(ctx.state);
  const resolvedToday = getTodayResolvedReviewCount(ctx.state);
  const reviewStreak = getReviewResolutionStreak(ctx.state);
  const continueChapter = getModuleContinueChapter(ctx.data, ctx.state, module);
  const continueResumeTab = getResumeTab(ctx.state, continueChapter.id);
  const moduleProgress = getModuleProgress(ctx.data, ctx.state, module);
  const ctaLabel = session.completed > 0 && session.percent < 100 ? "Continuar sessao" : "Comecar sessao";
  const examSummary = getExamReadinessSummary(ctx.data, ctx.state);
  const weakTopics = getWeakChapters(ctx.data, ctx.state, 3);
  const unfinishedMock = ctx.state.mockExam && ctx.state.mockExam.status !== "finished" ? ctx.state.mockExam : null;
  const studyGoal = ctx.state.preferences.studyGoal || "Dominar a AP1 e organizar os fundamentos.";
  const examMode = examSummary.weakCount ? "weak" : "drill";
  const sessionStatus = session.percent === 100 ? "Concluida" : session.completed > 0 ? "Em andamento" : "Ainda nao iniciada";
  const reviewStatus = dueItems > 0 ? `${dueItems} item(ns) vencidos` : "Sem vencimentos hoje";
  const examStatus = unfinishedMock
    ? "Simulado em andamento"
    : examSummary.weakCount
      ? `${examSummary.weakCount} tema(s) fracos para treinar`
      : "Base estavel para mock curto";

  return `
    <section class="dashboard">
      ${ctx.state.preferences.onboardingDone ? "" : `
        <section class="onboarding-card rise-in" aria-label="Primeiros passos">
          <div>
            <span class="card-label">Bem-vindo</span>
            <h2>Como estudar no AzubiForge</h2>
            <ol class="onboarding-steps">
              <li>Abra a sessao de hoje e siga as 5 etapas.</li>
              <li>No Wortschatz e nas Uebungen, responda antes de revelar.</li>
              <li>Marque Acertei/Errei para montar sua revisao.</li>
              <li>So marque Pronto AP1 quando a evidencia estiver solida.</li>
            </ol>
          </div>
          <button class="button" type="button" data-dismiss-onboarding>Entendi, comecar</button>
        </section>
      `}

      ${unfinishedMock ? `
        <section class="mock-resume-banner rise-in" role="status">
          <div>
            <strong>${unfinishedMock.status === "grading" ? "Correcao em andamento" : "Simulado em andamento"}</strong>
            <p class="small-note">${getMockExamAnsweredCount(unfinishedMock)}/${unfinishedMock.questions.length} · ${formatMockExamTimer(getMockExamRemainingMs(unfinishedMock))} restantes</p>
          </div>
          <a class="button" href="#exam/mock" data-go-exam-mock>Retomar simulado</a>
        </section>
      ` : ""}

      <section class="dashboard-hero rise-in">
        <div class="dashboard-hero-main">
          <p class="eyebrow">Curso offline AP1 FIAE</p>
          <h1>AzubiForge – ${ctx.data.course.title}</h1>
          <p class="lead">Forge your Ausbildung. Sessao curta e guiada: leia, aplique, treine vocabulario e feche com AP1.</p>
          ${progressBlock(progress, "capitulos")}
          <div class="dashboard-search" aria-label="Busca offline">
            <input
              id="global-search-input"
              class="search-input"
              type="search"
              placeholder="Buscar DNS, Firewall, SQL..."
              aria-label="Busca global"
              data-global-search
              value="${escapeAttribute(ctx.ui.globalQuery)}"
            >
            ${ctx.ui.globalQuery ? renderGlobalResults(ctx) : ""}
          </div>
        </div>
        <aside class="dashboard-hero-aside">
          <div class="goal-card panel">
            <span class="goal-icon" aria-hidden="true">${icon("target", "goal-icon", 20)}</span>
            <div>
              <span class="card-label">Seu objetivo</span>
              <p class="goal-text">${escapeAttribute(studyGoal)}</p>
              <button class="text-link" type="button" data-edit-study-goal>Editar objetivo →</button>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <div class="hero-cube hero-cube-a"></div>
            <div class="hero-cube hero-cube-b"></div>
            <div class="hero-cube hero-cube-c"></div>
          </div>
        </aside>
      </section>

      <section class="learning-plan rise-in" style="animation-delay: 20ms" aria-label="Plano de estudo do dia">
        <div class="learning-plan-head">
          <span class="card-label">Fluxo de aprendizado</span>
          <h2>Plano de hoje em 3 blocos</h2>
          <p class="small-note">Siga a ordem para acelerar retenção: sessão guiada → revisão vencida → treino AP1.</p>
        </div>
        <div class="learning-plan-grid">
          <article class="plan-step-card">
            <span class="plan-step-index">1</span>
            <div>
              <strong>Sessao guiada</strong>
              <p class="small-note">${chapter.title}</p>
              <span class="status-pill open">${sessionStatus}</span>
            </div>
            <a class="text-link" href="#reader/${chapter.id}/${resumeTab}">${ctaLabel} →</a>
          </article>
          <article class="plan-step-card">
            <span class="plan-step-index">2</span>
            <div>
              <strong>Revisao ativa</strong>
              <p class="small-note">Corrigir erros antes de esquecer</p>
              <span class="status-pill ${dueItems > 0 ? "due" : "open"}">${reviewStatus}</span>
            </div>
            <a class="text-link" href="#review" data-go-review-due>Revisar agora →</a>
          </article>
          <article class="plan-step-card">
            <span class="plan-step-index">3</span>
            <div>
              <strong>Treino AP1</strong>
              <p class="small-note">${examStatus}</p>
              <span class="status-pill ${unfinishedMock ? "due" : "open"}">${unfinishedMock ? "Retomar mock" : "Treino recomendado"}</span>
            </div>
            <a class="text-link" href="${unfinishedMock ? "#exam/mock" : `#exam/${examMode}`}" ${unfinishedMock ? "data-go-exam-mock" : ""}>Abrir AP1 →</a>
          </article>
        </div>
      </section>

      <section class="dashboard-command rise-in" style="animation-delay: 28ms" aria-label="Comando do dia">
        <div>
          <span class="card-label">Prioridade do dia</span>
          <h2>${dueItems > 8 ? "Alta" : dueItems > 0 ? "Media" : "Estavel"} · foco em fluxo completo</h2>
          <p class="small-note">Meta sugerida: concluir a sessao guiada, zerar vencidos e fechar com treino AP1.</p>
        </div>
        <div class="command-actions">
          <a class="button secondary" href="#reader/${chapter.id}/${resumeTab}">Abrir sessao</a>
          <a class="button secondary" href="#review" data-go-review-due>Revisar vencidos</a>
          <a class="button secondary" href="${unfinishedMock ? "#exam/mock" : "#exam/drill"}" ${unfinishedMock ? "data-go-exam-mock" : ""}>Treinar AP1</a>
        </div>
      </section>

      <section class="dashboard-session session-focus rise-in" style="animation-delay: 40ms">
        <div class="session-focus-copy">
          <span class="card-label">Sessao de hoje</span>
          <h2>${chapter.title}</h2>
          <div class="session-badges">
            <span class="session-badge">${module.subtitle || module.title}</span>
            <span class="session-badge">${minutes} min</span>
            <span class="session-badge">${situation?.title || "Lernsituation"}</span>
            ${confidenceBadge(ctx.state, chapter.id)}
            ${readinessBadge(chapterReadiness)}
          </div>
          <div class="session-stepper session-stepper-dashboard" aria-label="Etapas da sessao">
            ${READER_STEPS.map((step, index) => {
              const done = (ctx.state.sessionSteps[chapter.id] || []).includes(step.id);
              return `
                <a
                  class="session-step ${done ? "done" : ""} ${index === session.completed ? "current" : ""}"
                  href="#reader/${chapter.id}/${step.id}"
                >
                  <span>${index + 1}</span>
                  <strong>${step.label}</strong>
                  <small>${step.hint}</small>
                </a>
              `;
            }).join("")}
          </div>
          <div class="session-progress-line" aria-hidden="true">
            <div style="width: ${session.percent}%"></div>
          </div>
          <p class="small-note">${session.completed} de ${session.total} etapas · ${session.percent}% da sessao</p>
          ${session.completed > 0 && session.percent < 100
            ? `<p class="resume-hint">Continuar em: <strong>${resumeLabel}</strong></p>`
            : ""}
        </div>
        <div class="session-focus-actions dashboard-session-actions">
          <a class="button large" href="#reader/${chapter.id}/${resumeTab}" data-dashboard-cta>${ctaLabel}</a>
          <a class="button secondary" href="#course">Ver trilha do curso</a>
          <a class="button secondary" href="#review">Revisao ativa</a>
        </div>
      </section>

      <section class="dashboard-grid rise-in" style="animation-delay: 80ms">
        <article class="dashboard-card panel soft-panel">
          <div class="panel-head-row">
            <div>
              <span class="card-label">Modulo em andamento</span>
              <h2>${module.subtitle}</h2>
              <p class="small-note">${module.description}</p>
            </div>
            <a class="text-link" href="#course">Abrir</a>
          </div>
          ${inlineProgress(moduleProgress)}
          <ol class="module-trail compact-trail dashboard-trail" aria-label="Trilha do modulo">
            ${module.chapterIds.slice(0, 5).map((id, index) => {
              const item = ctx.data.chapters.find((chapterItem) => chapterItem.id === id);
              if (!item) return "";
              const done = isCompleted(ctx.state, id);
              const current = continueChapter.id === id;
              return `
                <li class="${done ? "done" : ""} ${current ? "current" : ""}">
                  <a href="#reader/${id}/${getResumeTab(ctx.state, id)}">
                    <span>${index + 1}</span>
                    <strong>${item.title}</strong>
                  </a>
                </li>
              `;
            }).join("")}
          </ol>
          <a class="button secondary" href="#reader/${continueChapter.id}/${continueResumeTab}">Continuar em ${continueChapter.title}</a>
        </article>

        <article class="dashboard-card panel soft-panel">
          <span class="card-label">Revisar agora</span>
          <h2>Fila curta</h2>
          <p class="small-note">${dueCount ? `${dueCount} capitulo(s) com revisao ativa · ${dueItems} item(ns) vencidos.` : "Capitulos fracos ou ainda abertos."}</p>
          <div class="review-queue-list">
            ${review.length ? review.map((item) => {
              const due = isReviewDue(ctx.state, item.id);
              return `
                <a class="review-queue-row" href="#reader/${item.id}/${getResumeTab(ctx.state, item.id)}">
                  <div>
                    <strong>${item.title}</strong>
                    <span>${getChapterModule(ctx.data, item.id)?.subtitle || "Curso"}</span>
                  </div>
                  <span class="status-pill ${due ? "due" : "open"}">${due ? "Vence hoje" : "Aberto"}</span>
                </a>
              `;
            }).join("") : `<p class="empty-state">Nada urgente. Avance a sessao de hoje.</p>`}
          </div>
        </article>

        <article class="dashboard-card panel soft-panel" id="dashboard-progress">
          <span class="card-label">Seu progresso</span>
          <div class="progress-panel-body">
            ${donutProgress(progress, "Conclusao geral")}
            <dl class="progress-stats">
              <div><dt>Capitulos concluidos</dt><dd>${progress.completed} / ${progress.total}</dd></div>
              <div><dt>Sessoes uteis hoje</dt><dd>${daily.completed} / ${daily.total}</dd></div>
              <div><dt>Tempo de estudo</dt><dd>${studyMinutes} min</dd></div>
              <div><dt>Sequencia (streak)</dt><dd>${streak} dia(s)</dd></div>
              <div><dt>Revisoes resolvidas hoje</dt><dd>${resolvedToday}</dd></div>
              <div><dt>Streak de revisao</dt><dd>${reviewStreak} dia(s)</dd></div>
              <div><dt>Quase prontos AP1</dt><dd>${readiness.completed}</dd></div>
              <div><dt>Com anotacoes</dt><dd>${notesCount}</dd></div>
            </dl>
          </div>
          <div class="streak-calendar" aria-label="Ultimos 14 dias de estudo">
            ${calendar.map((day) => `
              <span
                class="streak-day ${day.studied ? "studied" : ""} ${day.isToday ? "today" : ""}"
                title="${day.key}${day.studied ? " · estudou" : ""}"
              >${day.label}</span>
            `).join("")}
          </div>
          <div class="daily-goal-controls compact-goal" aria-label="Meta diaria">
            <span class="small-note">Meta diaria (sessoes uteis)</span>
            <div class="segmented-control compact">
              ${[1, 2, 3, 4, 5].map((goal) => `
                <button
                  class="${ctx.state.preferences.dailyGoalSessions === goal ? "active" : ""}"
                  type="button"
                  data-daily-goal="${goal}"
                >${goal}</button>
              `).join("")}
            </div>
          </div>
          <div class="progress-backup">
            <button class="button secondary" type="button" data-export-progress>Exportar progresso</button>
            <label class="button secondary file-button">
              Importar progresso
              <input type="file" accept="application/json,.json" data-import-progress>
            </label>
          </div>
        </article>
      </section>

      <section class="dashboard-coach rise-in" style="animation-delay: 120ms" aria-label="Coach AP1">
        <div class="exam-coach-copy">
          <span class="card-label">Foco na prova</span>
          <h2>Treino AP1</h2>
          <p>${examSummary.weakCount
            ? `${examSummary.weakCount} tema(s) fracos · priorize Signalwoerter e simulado.`
            : "Base solida. Mantenha ritmo com drills e checklist."}</p>
          ${weakTopics.length ? `
            <div class="mini-list exam-coach-list">
              ${weakTopics.slice(0, 3).map((item) => `
                <a href="#reader/${item.chapter.id}/${getResumeTab(ctx.state, item.chapter.id)}">
                  <strong>${item.chapter.title}</strong>
                  <span>${item.moduleTitle}</span>
                </a>
              `).join("")}
            </div>
          ` : ""}
        </div>
        <div class="session-focus-actions">
          <a class="button" href="#exam/${examMode}">Abrir treino AP1</a>
          <a class="button secondary" href="#exam/mock" data-go-exam-mock>Simulado</a>
        </div>
      </section>

      ${progress.percent === 100 ? `
        <section class="completion-card rise-in panel">
          <span class="card-label">Trilha avancada</span>
          <h2>Voce concluiu todos os capitulos registrados.</h2>
          <p>Foco em revisao ativa, drills AP1 e subir prontidao dos temas marcados como revisar.</p>
        </section>
      ` : ""}

      <footer class="offline-bar rise-in" style="animation-delay: 140ms">
        <div class="offline-bar-copy">
          <span class="offline-bar-icon" aria-hidden="true">${icon("cloud-download", "offline-bar-icon", 20)}</span>
          <div>
            <strong>Busca e backup offline</strong>
            <p class="small-note">Pesquise capitulos e exporte progresso para estudar sem internet.</p>
          </div>
        </div>
        <button class="button secondary" type="button" data-toggle-offline-tools>Abrir ferramentas offline</button>
      </footer>

      <details class="offline-tools-panel" data-offline-tools hidden>
        <summary>Ferramentas offline</summary>
        <div class="tools-drawer-body">
          <div class="tool-actions">
            <button class="button secondary" type="button" data-export-progress>Exportar progresso</button>
            <label class="button secondary file-button">
              Importar progresso
              <input type="file" accept="application/json,.json" data-import-progress>
            </label>
          </div>
        </div>
      </details>
    </section>
  `;
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

  if (!results.length) return `<p class="empty-state">Nenhum resultado encontrado.</p>`;

  return `
    <div class="global-results">
      ${results.map((result) => `
        <a class="result-item" href="${result.href}">
          <span>${result.type}</span>
          <strong>${result.title}</strong>
          <p>${result.description}</p>
        </a>
      `).join("")}
    </div>
  `;
}
