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
import { confidenceBadge, escapeAttribute, escapeHtml, inlineProgress, kpiCard, readinessBadge } from "../ui/html";

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
      <section class="course-now-strip rise-in" aria-label="Continuar estudo">
        <div class="course-now-copy">
          <p class="ds-caption">Agora · ${activeModule.title}</p>
          <h1 class="course-now-title">${continueChapter.title}</h1>
          <p class="ds-aux">${activeModule.subtitle} · ${progress.completed}/${progress.total} capitulos (${progress.percent}%)</p>
          <div class="course-now-progress" aria-hidden="true">
            <span style="width:${progress.percent}%"></span>
          </div>
        </div>
        <a class="button accent course-now-cta" href="#reader/${continueChapter.id}/${continueTab}">Continuar estudo</a>
        <details class="course-about-details">
          <summary>Sobre a trilha</summary>
          <p class="ds-lead">${ctx.data.course.description}</p>
          ${renderCourseBasis(ctx)}
          <p class="ds-aux">${readiness.completed} capitulos quase prontos para AP1</p>
          <a class="text-link" href="#home">Ver jornada completa →</a>
        </details>
      </section>

      <section class="course-queue rise-in" style="animation-delay:16ms" aria-label="Fila de estudo">
        <a class="course-queue-row" href="#reader/${afterChapter.id}/${getResumeTab(ctx.state, afterChapter.id)}">
          <span class="ds-caption">Depois</span>
          <strong>${afterChapter.title}</strong>
          <span class="course-queue-action">Abrir</span>
        </a>
        <a class="course-queue-row" href="${dueReviewChapter ? "#review" : "#exam/drill"}" ${dueReviewChapter ? "data-go-review-due" : ""}>
          <span class="ds-caption">Reforco</span>
          <strong>${dueReviewChapter?.title || "Sem urgencias"}</strong>
          <span class="course-queue-action">${dueReviewChapter ? "Revisar" : "AP1"}</span>
        </a>
      </section>

      <section class="ds-kpi-grid course-kpi-grid rise-in" style="animation-delay:28ms" aria-label="Metricas">
        ${kpiCard("Pendencias", String(dueItems), dueReviewChapter?.title || "Em dia")}
        ${kpiCard("Streak", `${studyStreak}d`, `Rev ${reviewStreak}d`)}
        ${kpiCard("Progresso", `${progress.percent}%`, `${progress.completed}/${progress.total}`)}
        ${kpiCard("Tempo", `${studyMinutes}m`, `${resolvedToday} hoje`)}
      </section>

      ${renderCheckpointSection(ctx)}

      <section class="ds-section ds-search-block rise-in" style="animation-delay:40ms" aria-label="Busca e filtros">
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
    <div class="ds-main-layout rise-in" style="animation-delay:52ms">
      <section class="ds-section ds-timeline-block" id="course-focused-module">
        ${renderFocusedModule(ctx, focused.module, focused.chapters, focused.module.id === activeModuleId)}
      </section>
      <aside class="ds-secondary-rail course-module-switcher" aria-label="Trocar modulo">
        <div class="course-module-switcher-head">
          <h3 class="ds-card-title">Modulos</h3>
          <p class="ds-aux">Toque para focar</p>
        </div>
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
    <div class="ds-section-head course-focus-head">
      <div>
        <p class="ds-caption">${module.title}${isActive ? " · Em andamento" : ""}</p>
        <h2 class="ds-section-title">${module.subtitle}</h2>
        <p class="ds-aux course-focus-desc">${module.description}</p>
      </div>
      <a class="button accent course-focus-cta" href="#reader/${continueChapter.id}/${continueTab}">Continuar</a>
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
  return `
    <button class="module-summary-card module-switch-row" type="button" data-focus-module="${module.id}">
      <span class="module-switch-copy">
        <span class="ds-caption">${module.title}</span>
        <strong class="ds-card-title">${module.subtitle}</strong>
        <span class="ds-aux">${visibleCount} cap. · ${progress.percent}%</span>
      </span>
      <span class="module-switch-meta" aria-hidden="true">
        <span class="module-switch-bar"><span style="width:${progress.percent}%"></span></span>
        <span class="module-switch-chevron">›</span>
      </span>
    </button>
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
        <p class="ds-aux path-desc">${chapter.description}</p>
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
      <a class="button ${status === "current" ? "accent" : "secondary"} path-node-cta" href="#reader/${chapter.id}/${getResumeTab(ctx.state, chapter.id)}">${action}</a>
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
