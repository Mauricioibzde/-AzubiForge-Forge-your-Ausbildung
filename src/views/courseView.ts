import type { AppContext } from "../appContext";
import {
  findChapter,
  getActiveModule,
  getChapterModule,
  getChapterPathStatus,
  getChapterReadiness,
  getCourseProgress,
  getCourseReadiness,
  getDueReviewItemCount,
  getEstimatedStudyMinutes,
  getModuleContinueChapter,
  getModuleProgress,
  getReviewQueue,
  getReviewResolutionStreak,
  getResumeTab,
  getStudyCalendarDays,
  getStudyStreak,
  getSuggestedChapter,
  getTodayResolvedReviewCount,
  isReviewDue,
  isCompleted
} from "../domain/course";
import type { Chapter, LearningSituation, Module } from "../types";
import { confidenceBadge, donutProgress, escapeAttribute, escapeHtml, inlineProgress, readinessBadge } from "../ui/html";
import { icon } from "../ui/icons";

export function renderCourseView(ctx: AppContext): string {
  const progress = getCourseProgress(ctx.data, ctx.state);
  const readiness = getCourseReadiness(ctx.data, ctx.state);
  const next = getSuggestedChapter(ctx.data, ctx.state);
  const activeModule = getActiveModule(ctx.data, ctx.state);
  const continueChapter = getModuleContinueChapter(ctx.data, ctx.state, activeModule);
  const continueTab = getResumeTab(ctx.state, continueChapter.id);
  const filtered = getFilteredChapters(ctx);
  const queue = getReviewQueue(ctx.data, ctx.state);
  const dueReviewChapter = queue.find((chapter) => isReviewDue(ctx.state, chapter.id));
  const afterChapter = queue.find((chapter) => chapter.id !== continueChapter.id) || next;
  const dueItems = getDueReviewItemCount(ctx.state);
  const reviewStreak = getReviewResolutionStreak(ctx.state);
  const resolvedToday = getTodayResolvedReviewCount(ctx.state);
  const studyStreak = getStudyStreak(ctx.state);
  const studyMinutes = getEstimatedStudyMinutes(ctx.data, ctx.state);
  const calendar = getStudyCalendarDays(ctx.state, 7);

  return `
    <section class="course-shell">
      <div class="course-hero-grid rise-in">
        <div class="course-hero-main">
          <p class="eyebrow">Trilha AP1</p>
          <h1>${ctx.data.course.title}</h1>
          <p class="lead">${ctx.data.course.description}</p>
          ${renderCourseBasis(ctx)}
          <div class="course-hero-actions">
            <a class="button accent" href="#reader/${continueChapter.id}/${continueTab}">Continuar estudo</a>
            <a class="button secondary" href="#review" data-go-review-due>Revisar hoje</a>
          </div>
        </div>
        <aside class="course-stats-rail" aria-label="Painel de progresso">
          <article class="stat-card panel">
            <span class="card-label">Progresso da trilha</span>
            ${donutProgress(progress, "Conclusao")}
            <p class="small-note">${progress.completed} de ${progress.total} capitulos</p>
          </article>
          <article class="stat-card panel">
            <span class="card-label">Sequencia de estudo</span>
            <div class="stat-card-value">${studyStreak} <small>dia(s)</small></div>
            <div class="streak-calendar compact" aria-label="Ultimos 7 dias">
              ${calendar.map((day) => `
                <span class="streak-day ${day.studied ? "studied" : ""} ${day.isToday ? "today" : ""}" title="${day.key}">${day.label}</span>
              `).join("")}
            </div>
          </article>
          <article class="stat-card panel">
            <span class="card-label">Revisoes</span>
            <div class="stat-card-value">${dueItems} <small>pendentes</small></div>
            <p class="small-note">${resolvedToday} resolvida(s) hoje · streak ${reviewStreak} dia(s)</p>
          </article>
          <article class="stat-card panel">
            <span class="card-label">Tempo estudado</span>
            <div class="stat-card-value">${studyMinutes} <small>min</small></div>
            <p class="small-note">${readiness.completed} quase prontos AP1</p>
          </article>
        </aside>
      </div>

      <section class="course-flow-board panel rise-in" style="animation-delay: 24ms" aria-label="Roteiro inteligente">
        <div class="course-flow-head">
          <span class="card-label">Roteiro inteligente</span>
          <h2>Agora · Depois · Reforco</h2>
        </div>
        <div class="course-flow-grid">
          <article class="course-flow-card premium-card">
            <span class="flow-card-icon" aria-hidden="true">${icon("play", "flow-icon", 18)}</span>
            <span class="status-pill open">Agora</span>
            <strong>${continueChapter.title}</strong>
            <p class="small-note">Etapa ativa em ${activeModule.subtitle}. Continue no ponto exato da sessao.</p>
            <a class="button secondary" href="#reader/${continueChapter.id}/${continueTab}">Retomar capitulo</a>
          </article>
          <article class="course-flow-card premium-card">
            <span class="flow-card-icon" aria-hidden="true">${icon("arrow-right", "flow-icon", 18)}</span>
            <span class="status-pill open">Depois</span>
            <strong>${afterChapter.title}</strong>
            <p class="small-note">Proximo passo para manter ritmo sem trocar de contexto.</p>
            <a class="button secondary" href="#reader/${afterChapter.id}/${getResumeTab(ctx.state, afterChapter.id)}">Abrir proximo</a>
          </article>
          <article class="course-flow-card premium-card">
            <span class="flow-card-icon" aria-hidden="true">${icon("refresh-cw", "flow-icon", 18)}</span>
            <span class="status-pill ${dueReviewChapter ? "due" : "open"}">Reforco</span>
            <strong>${dueReviewChapter?.title || "Sem vencidos urgentes"}</strong>
            <p class="small-note">${dueReviewChapter ? "Revisao em atraso com maior retorno pedagogico hoje." : "A fila de revisao esta sob controle; avance na trilha."}</p>
            <a class="button secondary" href="${dueReviewChapter ? "#review" : "#exam/drill"}" ${dueReviewChapter ? "data-go-review-due" : ""}>${dueReviewChapter ? "Revisar agora" : "Treino AP1"}</a>
          </article>
        </div>
      </section>

      <section class="track-kpi-board rise-in" style="animation-delay: 40ms" aria-label="Metricas da trilha">
        <article class="track-kpi-card premium-card">
          <span class="card-label">Pendencias</span>
          <h3>${dueItems}</h3>
          <p class="small-note">${dueReviewChapter ? dueReviewChapter.title : "Sem urgencias abertas"}</p>
        </article>
        <article class="track-kpi-card premium-card">
          <span class="card-label">Streak</span>
          <h3>${studyStreak} dia(s)</h3>
          <p class="small-note">Revisao: ${reviewStreak} dia(s)</p>
        </article>
        <article class="track-kpi-card premium-card">
          <span class="card-label">Progresso</span>
          <h3>${progress.percent}%</h3>
          <p class="small-note">${progress.completed}/${progress.total} capitulos</p>
        </article>
        <article class="track-kpi-card premium-card">
          <span class="card-label">Tempo estudado</span>
          <h3>${studyMinutes} min</h3>
          <p class="small-note">${resolvedToday} revisoes hoje</p>
        </article>
      </section>

      <div class="toolbar premium-toolbar rise-in" style="animation-delay: 56ms" aria-label="Filtros do curso">
        <input
          class="search-input premium-search"
          type="search"
          placeholder="Pesquisar capitulo, modulo ou termo..."
          aria-label="Pesquisar capitulo"
          data-course-search
          value="${escapeAttribute(ctx.ui.courseQuery)}"
        >
        <div class="segmented-control filter-chips" aria-label="Filtrar capitulos">
          ${segment("all", "Todos", ctx.ui.courseFilter)}
          ${segment("open", "Em estudo", ctx.ui.courseFilter)}
          ${segment("done", "Concluidos", ctx.ui.courseFilter)}
          ${segment("hard", "Dificeis", ctx.ui.courseFilter)}
          ${segment("notes", "Notas", ctx.ui.courseFilter)}
        </div>
        <p class="small-note toolbar-meta">${filtered.length} de ${ctx.data.chapters.length} capitulos exibidos</p>
      </div>

      ${renderModules(ctx, filtered, activeModule.id)}
    </section>
  `;
}

function renderCourseBasis(ctx: AppContext): string {
  if (!ctx.data.course.basis?.length) return "";

  return `
    <div class="source-list course-checklist">
      <span class="card-label">Base curricular</span>
      <ul>
        ${ctx.data.course.basis.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      ${ctx.data.course.copyrightNote ? `<p class="small-note">${ctx.data.course.copyrightNote}</p>` : ""}
    </div>
  `;
}

function segment(value: string, label: string, current: string): string {
  return `
    <button
      class="${current === value ? "active" : ""}"
      type="button"
      data-filter-group="course"
      data-filter-value="${value}"
    >${label}</button>
  `;
}

function renderModules(ctx: AppContext, filtered: Chapter[], activeModuleId: string): string {
  if (!filtered.length) return `<p class="empty-state">Nenhum capitulo encontrado.</p>`;

  const filteredIds = new Set(filtered.map((chapter) => chapter.id));
  const visibleModules = ctx.data.modules
    .map((module) => ({
      module,
      chapters: module.chapterIds
        .map((id) => findChapter(ctx.data, id))
        .filter((chapter): chapter is Chapter => Boolean(chapter && filteredIds.has(chapter.id)))
    }))
    .filter((item) => item.chapters.length > 0);

  const preferredModule = visibleModules.find((item) => ctx.state.collapsedModules[item.module.id] === false);
  const focused = preferredModule
    || visibleModules.find((item) => item.module.id === activeModuleId)
    || visibleModules[0];
  const others = visibleModules.filter((item) => item.module.id !== focused.module.id);

  return `
    <section class="track-shell rise-in" style="animation-delay: 72ms">
      <div class="track-main">
        ${renderFocusedModule(ctx, focused.module, focused.chapters, focused.module.id === activeModuleId)}
      </div>
      <aside class="track-side panel" aria-label="Catalogo de modulos">
        <div class="track-side-head">
          <span class="card-label">Catalogo</span>
          <h3>Modulos da trilha</h3>
          <p class="small-note">Visao compacta para manter foco no modulo ativo.</p>
        </div>
        <div class="module-summary-grid">
          ${others.map((item) => renderModuleSummary(ctx, item.module, item.chapters.length)).join("")}
        </div>
      </aside>
    </section>
  `;
}

function renderFocusedModule(
  ctx: AppContext,
  module: Module,
  visibleChapters: Chapter[],
  isActive: boolean
): string {
  const visibleIds = new Set(visibleChapters.map((chapter) => chapter.id));
  const progress = getModuleProgress(ctx.data, ctx.state, module);
  const continueChapter = getModuleContinueChapter(ctx.data, ctx.state, module);
  const continueTab = getResumeTab(ctx.state, continueChapter.id);
  const situations = ctx.data.learningSituations?.[module.id] || [{
    id: `${module.id}-main`,
    title: module.subtitle,
    description: module.description,
    chapterIds: module.chapterIds
  }];
  return `
    <section class="module-section active-module panel" id="course-focused-module">
      <div class="module-head">
        <div>
          <span class="card-label">${module.title}${isActive ? " · Em andamento" : " · Em foco"}</span>
          <h2>${module.subtitle}</h2>
          <p>${module.description}</p>
          ${inlineProgress(progress)}
        </div>
        <div class="module-head-actions">
          <a class="button accent" href="#reader/${continueChapter.id}/${continueTab}">Continuar</a>
          <button class="module-toggle button ghost" type="button" data-focus-module="${module.id}" aria-expanded="true">
            <span class="module-count">${progress.completed} / ${progress.total}</span>
            <span>Modulo em foco</span>
          </button>
        </div>
      </div>
      <div class="module-body">
        <ol class="learning-path timeline-path" aria-label="Trilha de ${module.subtitle}">
          ${visibleChapters.map((chapter) => renderPathNode(ctx, module, chapter)).join("")}
        </ol>
        ${situations.map((situation) => renderSituation(ctx, situation, visibleIds)).join("")}
      </div>
    </section>
  `;
}

function renderModuleSummary(ctx: AppContext, module: Module, visibleCount: number): string {
  const progress = getModuleProgress(ctx.data, ctx.state, module);
  const continueChapter = getModuleContinueChapter(ctx.data, ctx.state, module);
  return `
    <article class="module-summary-card premium-card">
      <div>
        <span class="card-label">${module.title}</span>
        <h4>${module.subtitle}</h4>
        <p class="small-note">${visibleCount} capitulo(s) no filtro</p>
      </div>
      ${inlineProgress(progress)}
      <div class="module-summary-actions">
        <button class="button secondary" type="button" data-focus-module="${module.id}">Focar</button>
        <a class="button ghost" href="#reader/${continueChapter.id}/${getResumeTab(ctx.state, continueChapter.id)}">Retomar</a>
      </div>
    </article>
  `;
}

function renderPathNode(ctx: AppContext, module: Module, chapter: Chapter): string {
  const status = getChapterPathStatus(ctx.data, ctx.state, chapter.id, module);
  const readiness = getChapterReadiness(ctx.data, ctx.state, chapter);
  const labels = { done: "Concluido", current: "Agora", open: "A seguir" };
  const action = status === "done" ? "Revisar" : status === "current" ? "Continuar" : "Abrir";

  return `
    <li class="path-node ${status}">
      <div class="path-marker" aria-hidden="true">${status === "done" ? "✓" : "○"}</div>
      <div class="path-copy">
        <div class="path-topline">
          <span class="path-status">${labels[status]}</span>
          <h3>${chapter.title}</h3>
          ${readinessBadge(readiness)}
        </div>
        <p>${chapter.description}</p>
        ${(() => {
          const note = (ctx.state.notes[chapter.id] || "").trim();
          if (!note) return "";
          const preview = note.length > 140 ? `${note.slice(0, 140).trim()}…` : note;
          return `
            <details class="path-note">
              <summary>Nota salva</summary>
              <p>${escapeHtml(preview)}</p>
            </details>
          `;
        })()}
        <div class="chapter-meta">
          <span>${chapter.studyTime || "Sessao curta"}</span>
          ${confidenceBadge(ctx.state, chapter.id)}
        </div>
      </div>
      <a class="button ${status === "current" ? "accent" : "secondary"}" href="#reader/${chapter.id}/${getResumeTab(ctx.state, chapter.id)}">${action}</a>
    </li>
  `;
}

function renderSituation(ctx: AppContext, situation: LearningSituation, visibleIds: Set<string>): string {
  const chapters = situation.chapterIds
    .map((id) => findChapter(ctx.data, id))
    .filter((chapter): chapter is Chapter => Boolean(chapter && visibleIds.has(chapter.id)));

  if (!chapters.length) return "";

  const completed = chapters.filter((chapter) => isCompleted(ctx.state, chapter.id)).length;

  return `
    <section class="lernsituation">
      <div class="lernsituation-head">
        <div>
          <span class="card-label">Lernsituation</span>
          <h3>${situation.title}</h3>
          <p>${situation.description}</p>
        </div>
        <span class="module-count">${completed} / ${chapters.length}</span>
      </div>
    </section>
  `;
}

function getFilteredChapters(ctx: AppContext): Chapter[] {
  const query = ctx.ui.courseQuery.trim().toLowerCase();

  return ctx.data.chapters.filter((chapter) => {
    const module = getChapterModule(ctx.data, chapter.id);
    const text = `${chapter.title} ${chapter.description} ${module?.title || ""} ${module?.subtitle || ""}`.toLowerCase();
    const hasNote = Boolean((ctx.state.notes[chapter.id] || "").trim());

    if (query && !text.includes(query)) return false;
    if (ctx.ui.courseFilter === "done") return isCompleted(ctx.state, chapter.id);
    if (ctx.ui.courseFilter === "open") return !isCompleted(ctx.state, chapter.id);
    if (ctx.ui.courseFilter === "notes") return hasNote;
    if (ctx.ui.courseFilter === "hard") return ["hard", "review"].includes(ctx.state.confidence[chapter.id]);
    return true;
  });
}
