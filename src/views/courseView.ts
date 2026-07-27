import type { AppContext } from "../appContext";
import {
  findChapter,
  getChapterModule,
  getCourseProgress,
  getModuleProgress,
  getSuggestedChapter,
  isCompleted
} from "../domain/course";
import type { Chapter, LearningSituation, Module } from "../types";
import { chapterCard } from "../ui/components";
import { escapeAttribute, inlineProgress, progressBlock } from "../ui/html";

export function renderCourseView(ctx: AppContext): string {
  const progress = getCourseProgress(ctx.data, ctx.state);
  const next = getSuggestedChapter(ctx.data, ctx.state);
  const filtered = getFilteredChapters(ctx);

  return `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">Curso AP1</p>
          <h1>${ctx.data.course.title}</h1>
          <p>${ctx.data.course.description}</p>
          ${renderCourseBasis(ctx)}
        </div>
        <div class="panel">
          ${progressBlock(progress)}
          <p class="small-note">Sugestao: ${next.title}</p>
        </div>
      </div>

      <div class="toolbar" aria-label="Filtros do curso">
        <input
          class="search-input"
          type="search"
          placeholder="Pesquisar capitulo"
          aria-label="Pesquisar capitulo"
          data-course-search
          value="${escapeAttribute(ctx.ui.courseQuery)}"
        >
        <div class="segmented-control" aria-label="Filtrar capitulos">
          ${segment("all", "Todos", ctx.ui.courseFilter)}
          ${segment("open", "Em estudo", ctx.ui.courseFilter)}
          ${segment("done", "Concluidos", ctx.ui.courseFilter)}
          ${segment("notes", "Com notas", ctx.ui.courseFilter)}
          ${segment("hard", "Dificeis", ctx.ui.courseFilter)}
        </div>
        <p class="small-note">${filtered.length} de ${ctx.data.chapters.length} capitulos exibidos</p>
      </div>

      ${renderModules(ctx, filtered)}
    </section>
  `;
}

function renderCourseBasis(ctx: AppContext): string {
  if (!ctx.data.course.basis?.length) return "";

  return `
    <div class="source-list">
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

function renderModules(ctx: AppContext, filtered: Chapter[]): string {
  if (!filtered.length) return `<p class="empty-state">Nenhum capitulo encontrado.</p>`;

  const filteredIds = new Set(filtered.map((chapter) => chapter.id));

  return `
    <div class="module-list">
      ${ctx.data.modules.map((module) => renderModule(ctx, module, filteredIds)).join("")}
    </div>
  `;
}

function renderModule(ctx: AppContext, module: Module, filteredIds: Set<string>): string {
  const visibleChapters = module.chapterIds
    .map((id) => findChapter(ctx.data, id))
    .filter((chapter): chapter is Chapter => Boolean(chapter && filteredIds.has(chapter.id)));

  if (!visibleChapters.length) return "";

  const visibleIds = new Set(visibleChapters.map((chapter) => chapter.id));
  const progress = getModuleProgress(ctx.data, ctx.state, module);
  const situations = ctx.data.learningSituations?.[module.id] || [{
    id: `${module.id}-main`,
    title: module.subtitle,
    description: module.description,
    chapterIds: module.chapterIds
  }];
  const collapsed = Boolean(ctx.state.collapsedModules[module.id]) && !ctx.ui.courseQuery.trim();

  return `
    <section class="module-section ${collapsed ? "collapsed" : ""}" id="${module.id}">
      <div class="module-head">
        <div>
          <span class="card-label">${module.title}</span>
          <h2>${module.subtitle}</h2>
          <p>${module.description}</p>
          ${inlineProgress(progress)}
        </div>
        <button class="module-toggle" type="button" data-toggle-module="${module.id}" aria-expanded="${!collapsed}">
          <span class="module-count">${progress.completed} / ${progress.total}</span>
          <span>${collapsed ? "Abrir" : "Recolher"}</span>
        </button>
      </div>
      ${collapsed ? "" : `
        <div class="module-body">
          ${situations.map((situation) => renderSituation(ctx, situation, visibleIds)).join("")}
        </div>
      `}
    </section>
  `;
}

function renderSituation(ctx: AppContext, situation: LearningSituation, visibleIds: Set<string>): string {
  const chapters = situation.chapterIds
    .map((id) => findChapter(ctx.data, id))
    .filter((chapter): chapter is Chapter => Boolean(chapter && visibleIds.has(chapter.id)));

  if (!chapters.length) return "";

  const completed = chapters.filter((chapter) => isCompleted(ctx.state, chapter.id)).length;
  const progress = {
    completed,
    total: chapters.length,
    percent: chapters.length ? Math.round((completed / chapters.length) * 100) : 0
  };

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
      ${inlineProgress(progress)}
      <div class="chapter-list">
        ${chapters.map((chapter) => chapterCard(ctx, chapter)).join("")}
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
