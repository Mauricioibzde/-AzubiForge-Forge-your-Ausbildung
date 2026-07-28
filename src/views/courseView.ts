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
  getStudyStreak,
  getSuggestedChapter,
  getTodayResolvedReviewCount,
  isReviewDue,
  isCompleted
} from "../domain/course";
import type { Chapter, LearningSituation, Module } from "../types";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import {
  getLearningSituationCheckpoints,
  isCheckpointCompleted,
  isCheckpointUnlocked
} from "../domain/checkpoint/checkpoints";
import { confidenceBadge, donutProgress, escapeAttribute, escapeHtml, inlineProgress, kpiCard, readinessBadge } from "../ui/html";
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

  return `
    <section class="ds-page course-shell">
      <div class="ds-hero-layout rise-in">
        <header class="ds-hero">
          <p class="ds-caption">Trilha AP1</p>
          <h1>${ctx.data.course.title}</h1>
          <p class="ds-lead">${ctx.data.course.description}</p>
          ${renderCourseBasis(ctx)}
          <div class="course-hero-actions">
            <a class="button accent" href="#reader/${continueChapter.id}/${continueTab}">Continuar estudo</a>
            <a class="button secondary" href="#home">Ver jornada completa</a>
          </div>
        </header>
        <aside class="ds-card ds-progress-rail" aria-label="Progresso da trilha">
          ${donutProgress(progress, "Conclusao")}
          <p class="ds-aux">${progress.completed} de ${progress.total} capitulos · ${readiness.completed} quase prontos AP1</p>
        </aside>
      </div>

      <section class="ds-section rise-in" style="animation-delay:24ms" aria-label="Proximas acoes">
        <h2 class="ds-section-title">Workflow</h2>
        <div class="ds-workflow-grid">
          <article class="ds-workflow-card ds-card">
            <span class="flow-card-icon" aria-hidden="true">${icon("play", "flow-icon", 18)}</span>
            <span class="ds-caption">Agora</span>
            <h3 class="ds-card-title">${continueChapter.title}</h3>
            <p class="ds-aux">${activeModule.subtitle}</p>
            <a class="button secondary" href="#reader/${continueChapter.id}/${continueTab}">Retomar</a>
          </article>
          <article class="ds-workflow-card ds-card">
            <span class="flow-card-icon" aria-hidden="true">${icon("arrow-right", "flow-icon", 18)}</span>
            <span class="ds-caption">Depois</span>
            <h3 class="ds-card-title">${afterChapter.title}</h3>
            <p class="ds-aux">Proximo passo na sequencia</p>
            <a class="button secondary" href="#reader/${afterChapter.id}/${getResumeTab(ctx.state, afterChapter.id)}">Abrir</a>
          </article>
          <article class="ds-workflow-card ds-card">
            <span class="flow-card-icon" aria-hidden="true">${icon("refresh-cw", "flow-icon", 18)}</span>
            <span class="ds-caption">Reforco</span>
            <h3 class="ds-card-title">${dueReviewChapter?.title || "Sem urgencias"}</h3>
            <p class="ds-aux">${dueReviewChapter ? "Revisao prioritaria" : "Fila sob controle"}</p>
            <a class="button secondary" href="${dueReviewChapter ? "#review" : "#exam/drill"}" ${dueReviewChapter ? "data-go-review-due" : ""}>${dueReviewChapter ? "Revisar" : "Treino AP1"}</a>
          </article>
        </div>
      </section>

      <section class="ds-kpi-grid rise-in" style="animation-delay:40ms" aria-label="Metricas">
        ${kpiCard("Pendencias", String(dueItems), dueReviewChapter?.title || "Em dia")}
        ${kpiCard("Streak", `${studyStreak} dia(s)`, `Revisao: ${reviewStreak} dia(s)`)}
        ${kpiCard("Progresso", `${progress.percent}%`, `${progress.completed}/${progress.total} capitulos`)}
        ${kpiCard("Tempo", `${studyMinutes} min`, `${resolvedToday} revisoes hoje`)}
      </section>

      ${renderCheckpointSection(ctx)}

      <section class="ds-section ds-search-block rise-in" style="animation-delay:56ms" aria-label="Busca e filtros">
        <input class="search-input premium-search" type="search" placeholder="Pesquisar capitulo ou modulo..." aria-label="Pesquisar capitulo" data-course-search value="${escapeAttribute(ctx.ui.courseQuery)}">
        <div class="segmented-control filter-chips" aria-label="Filtrar capitulos">
          ${segment("all", "Todos", ctx.ui.courseFilter)}
          ${segment("open", "Em estudo", ctx.ui.courseFilter)}
          ${segment("done", "Concluidos", ctx.ui.courseFilter)}
          ${segment("hard", "Dificeis", ctx.ui.courseFilter)}
          ${segment("notes", "Notas", ctx.ui.courseFilter)}
        </div>
        <p class="ds-aux">${filtered.length} de ${ctx.data.chapters.length} capitulos</p>
      </section>

      ${renderModules(ctx, filtered, activeModule.id)}
    </section>
  `;
}

function renderCourseBasis(ctx: AppContext): string {
  if (!ctx.data.course.basis?.length) return "";
  return `
    <ul class="course-checklist ds-aux">
      ${ctx.data.course.basis.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function segment(value: string, label: string, current: string): string {
  return `<button class="${current === value ? "active" : ""}" type="button" data-filter-group="course" data-filter-value="${value}">${label}</button>`;
}

function renderModules(ctx: AppContext, filtered: Chapter[], activeModuleId: string): string {
  if (!filtered.length) return `<p class="ds-aux">Nenhum capitulo encontrado.</p>`;

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
    <div class="ds-main-layout rise-in" style="animation-delay:72ms">
      <section class="ds-section ds-timeline-block" id="course-focused-module">
        ${renderFocusedModule(ctx, focused.module, focused.chapters, focused.module.id === activeModuleId)}
      </section>
      <aside class="ds-card ds-secondary-rail" aria-label="Catalogo de modulos">
        <h3 class="ds-card-title">Modulos</h3>
        <p class="ds-aux">Alternar foco sem perder contexto.</p>
        <div class="module-summary-grid">
          ${others.map((item) => renderModuleSummary(ctx, item.module, item.chapters.length)).join("")}
        </div>
      </aside>
    </div>
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
    <div class="ds-section-head">
      <div>
        <p class="ds-caption">${module.title}${isActive ? " · Em andamento" : ""}</p>
        <h2 class="ds-section-title">${module.subtitle}</h2>
        <p class="ds-aux">${module.description}</p>
      </div>
      <a class="button accent" href="#reader/${continueChapter.id}/${continueTab}">Continuar</a>
    </div>
    ${inlineProgress(progress)}
    <ol class="learning-path timeline-path ds-timeline-primary" aria-label="Capitulos">
      ${visibleChapters.map((chapter) => renderPathNode(ctx, module, chapter)).join("")}
    </ol>
    ${situations.map((situation) => renderSituation(ctx, situation, visibleIds)).join("")}
  `;
}

function renderModuleSummary(ctx: AppContext, module: Module, visibleCount: number): string {
  const progress = getModuleProgress(ctx.data, ctx.state, module);
  const continueChapter = getModuleContinueChapter(ctx.data, ctx.state, module);
  return `
    <article class="module-summary-card ds-card">
      <span class="ds-caption">${module.title}</span>
      <h4 class="ds-card-title">${module.subtitle}</h4>
      <p class="ds-aux">${visibleCount} capitulo(s)</p>
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
        <p class="ds-aux">${chapter.description}</p>
        ${(() => {
          const note = (ctx.state.notes[chapter.id] || "").trim();
          if (!note) return "";
          const preview = note.length > 120 ? `${note.slice(0, 120).trim()}…` : note;
          return `<details class="path-note"><summary>Nota</summary><p>${escapeHtml(preview)}</p></details>`;
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
    <section class="lernsituation ds-aux">
      <span class="ds-caption">Lernsituation · ${completed}/${chapters.length}</span>
      <p>${situation.title} — ${situation.description}</p>
    </section>
  `;
}

function renderCheckpointSection(ctx: AppContext): string {
  const course = getNormalizedCourseData();
  const checkpoints = getLearningSituationCheckpoints(course)
    .filter((checkpoint) => isCheckpointUnlocked(ctx.state, checkpoint) || isCheckpointCompleted(ctx.state, checkpoint.situationId));

  if (!checkpoints.length) return "";

  return `
    <section class="ds-section rise-in" style="animation-delay:48ms" aria-label="Checkpoints">
      <h2 class="ds-section-title">Checkpoints</h2>
      <p class="ds-aux">Avaliacoes integradas por Lernsituation — disponiveis apos aprovar os testes de dominio de cada missao.</p>
      <div class="ds-workflow-grid">
        ${checkpoints.map((checkpoint) => {
          const done = isCheckpointCompleted(ctx.state, checkpoint.situationId);
          return `
            <article class="ds-card ds-workflow-card">
              <span class="ds-caption">${done ? "Concluido" : "Disponivel"}</span>
              <h3 class="ds-card-title">${checkpoint.title}</h3>
              <p class="ds-aux">${checkpoint.missionIds.length} missoes · minimo ${checkpoint.passingScore}%</p>
              <a class="button ${done ? "secondary" : "accent"}" href="#checkpoint/${escapeAttribute(checkpoint.situationId)}">
                ${done ? "Refazer checkpoint" : "Iniciar checkpoint"}
              </a>
            </article>
          `;
        }).join("")}
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
