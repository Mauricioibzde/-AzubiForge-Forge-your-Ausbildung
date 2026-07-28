import type { AppContext } from "../appContext";
import {
  findChapter,
  getActiveModule,
  getChapterModule,
  getChapterPathStatus,
  getChapterReadiness,
  getCourseReadiness,
  getDueReviewItemCount,
  getEstimatedStudyMinutes,
  getModuleContinueChapter,
  getReviewQueue,
  getReviewResolutionStreak,
  getResumeTab,
  getStudyStreak,
  getSuggestedChapter,
  getTodayResolvedReviewCount,
  getVisitedSteps,
  isReviewDue,
  isCompleted,
  READER_STEPS
} from "../domain/course";
import type { Chapter, LearningSituation, Module } from "../types";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import {
  getLearningSituationCheckpoints,
  isCheckpointCompleted,
  isCheckpointUnlocked,
  type CheckpointDefinition
} from "../domain/checkpoint/checkpoints";
import {
  labelForLearningAction,
  resolveNextLearningAction
} from "../domain/learning/nextLearningAction";
import {
  confidenceBadge,
  dualProgressBars,
  escapeAttribute,
  escapeHtml,
  kpiCard,
  readinessBadge
} from "../ui/html";
import { getCourseLearningEvidence, getMissionLearningEvidence } from "../domain/learning/learningEvidence";
import { getCourseDualProgress, getModuleDualProgress, makeProgress } from "../domain/learning/courseProgress";
import { evaluateMasteryGate, hasMasteryEvidence } from "../domain/learning/masteryGate";

export function renderCourseView(ctx: AppContext): string {
  const readiness = getCourseReadiness(ctx.data, ctx.state);
  const dual = getCourseDualProgress(ctx.data, ctx.state);
  const next = getSuggestedChapter(ctx.data, ctx.state);
  const activeModule = getActiveModule(ctx.data, ctx.state);
  const continueChapter = getModuleContinueChapter(ctx.data, ctx.state, activeModule);
  const continueTab = getResumeTab(ctx.state, continueChapter.id);
  let continueHref = `#reader/${continueChapter.id}/${continueTab}`;
  let continueTitle = continueChapter.title;
  let continueLabel = "Continuar estudo";
  let continueCaption = `Agora · ${activeModule.title}`;
  let courseEvidenceLabel = `${dual.study.completed}/${dual.study.total} capítulos no percurso`;
  try {
    const nextAction = resolveNextLearningAction({
      course: getNormalizedCourseData(),
      state: ctx.state
    });
    continueHref = nextAction.href;
    continueLabel = labelForLearningAction(nextAction);
    continueCaption = `Agora · ${nextAction.description}`;
    const focusChapter = nextAction.missionId ? findChapter(ctx.data, nextAction.missionId) : null;
    if (focusChapter) {
      const focusModule = getChapterModule(ctx.data, focusChapter.id);
      if (focusModule) continueCaption = `Agora · ${focusModule.title}`;
      continueTitle = focusChapter.title;
    } else {
      continueTitle = nextAction.title;
    }
    const courseEvidence = getCourseLearningEvidence(getNormalizedCourseData(), ctx.state);
    courseEvidenceLabel = courseEvidence.summaryLabel;
  } catch {
    // keep legacy continue strip when normalized course is unavailable
  }
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
          <p class="ds-caption">${escapeHtml(continueCaption)}</p>
          <h1 class="course-now-title">${escapeHtml(continueTitle)}</h1>
          <p class="ds-aux">${escapeHtml(activeModule.subtitle)} · ${escapeHtml(courseEvidenceLabel)}</p>
          ${dualProgressBars({
            study: dual.study,
            mastery: dual.mastery,
            studyLabel: "Percurso da trilha",
            masteryLabel: "Domínio comprovado"
          })}
        </div>
        <a class="button accent course-now-cta" href="${escapeAttribute(continueHref)}">${escapeHtml(continueLabel)}</a>
        <details class="course-about-details">
          <summary>Como estudar nesta trilha</summary>
          ${renderStudyMethodLegend()}
          <p class="ds-lead">${ctx.data.course.description}</p>
          ${renderCourseBasis(ctx)}
          <p class="ds-aux">${readiness.completed} capítulos quase prontos para AP1</p>
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
          <span class="ds-caption">Reforço</span>
          <strong>${dueReviewChapter?.title || "Sem urgências"}</strong>
          <span class="course-queue-action">${dueReviewChapter ? "Revisar" : "AP1"}</span>
        </a>
      </section>

      <section class="ds-kpi-grid course-kpi-grid rise-in" style="animation-delay:28ms" aria-label="Métricas">
        ${kpiCard("Pendências", String(dueItems), dueReviewChapter?.title || "Em dia")}
        ${kpiCard("Streak", `${studyStreak}d`, `Rev ${reviewStreak}d`)}
        ${kpiCard("Domínio", `${dual.mastery.percent}%`, `${dual.mastery.completed}/${dual.mastery.total} provas`)}
        ${kpiCard("Tempo", `${studyMinutes}m`, `${resolvedToday} hoje`)}
      </section>

      <section class="ds-section ds-search-block rise-in" style="animation-delay:40ms" aria-label="Busca e filtros">
        <input class="search-input premium-search" type="search" placeholder="Pesquisar capítulo ou módulo..." aria-label="Pesquisar capítulo" data-course-search value="${escapeAttribute(ctx.ui.courseQuery)}">
        <div class="segmented-control filter-chips" aria-label="Filtrar capítulos">
          ${segment("all", "Todos", ctx.ui.courseFilter)}
          ${segment("open", "Em estudo", ctx.ui.courseFilter)}
          ${segment("done", "Concluídos", ctx.ui.courseFilter)}
          ${segment("hard", "Difíceis", ctx.ui.courseFilter)}
          ${segment("notes", "Notas", ctx.ui.courseFilter)}
        </div>
        <p class="ds-aux">${filtered.length} de ${ctx.data.chapters.length} capítulos</p>
      </section>

      ${renderModules(ctx, filtered, activeModule.id)}
    </section>
  `;
}

function renderStudyMethodLegend(): string {
  return `
    <ol class="study-method-legend" aria-label="Método AzubiForge">
      <li><strong>1. Aprender</strong> — leia o conceito</li>
      <li><strong>2. Recuperar</strong> — escreva de memória</li>
      <li><strong>3. Praticar</strong> — responda exercícios</li>
      <li><strong>4. Aplicar</strong> — resolva o caso</li>
      <li><strong>5. Provar</strong> — passe no teste de domínio</li>
    </ol>
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
  if (!filtered.length) return `<p class="ds-aux">Nenhum capítulo encontrado.</p>`;

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

  return `
    <div class="ds-main-layout rise-in" style="animation-delay:52ms">
      <section class="ds-section ds-timeline-block" id="course-focused-module">
        ${renderFocusedModule(ctx, focused.module, focused.chapters, focused.module.id === activeModuleId)}
      </section>
      <aside class="ds-secondary-rail course-module-switcher" aria-label="Trocar módulo">
        <div class="course-module-switcher-head">
          <h3 class="ds-card-title">Módulos</h3>
          <p class="ds-aux">Lernfeld → situação → missão</p>
        </div>
        <div class="module-summary-grid">
          ${visibleModules.map((item) => renderModuleSummary(
            ctx,
            item.module,
            item.chapters.length,
            item.module.id === focused.module.id
          )).join("")}
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
  const dual = getModuleDualProgress(ctx.data, ctx.state, module);
  const continueChapter = getModuleContinueChapter(ctx.data, ctx.state, module);
  const continueTab = getResumeTab(ctx.state, continueChapter.id);
  const situations = ctx.data.learningSituations?.[module.id] || [{
    id: `${module.id}-main`,
    title: module.subtitle,
    description: module.description,
    chapterIds: module.chapterIds
  }];

  let checkpoints: CheckpointDefinition[] = [];
  try {
    checkpoints = getLearningSituationCheckpoints(getNormalizedCourseData());
  } catch {
    checkpoints = [];
  }

  const usedChapterIds = new Set<string>();
  const situationBlocks = situations.map((situation) => {
    const chapters = situation.chapterIds
      .map((id) => findChapter(ctx.data, id))
      .filter((chapter): chapter is Chapter => Boolean(chapter && visibleIds.has(chapter.id)));
    chapters.forEach((chapter) => usedChapterIds.add(chapter.id));
    const checkpoint = checkpoints.find((item) => item.situationId === situation.id) || null;
    return renderSituationBlock(ctx, module, situation, chapters, checkpoint);
  }).join("");

  const orphanChapters = visibleChapters.filter((chapter) => !usedChapterIds.has(chapter.id));
  const orphanBlock = orphanChapters.length
    ? renderSituationBlock(
      ctx,
      module,
      {
        id: `${module.id}-more`,
        title: "Outras missões",
        description: "Capítulos deste módulo ainda não agrupados em uma Lernsituation.",
        chapterIds: orphanChapters.map((chapter) => chapter.id)
      },
      orphanChapters,
      null
    )
    : "";

  return `
    <div class="ds-section-head course-focus-head">
      <div>
        <p class="ds-caption">${escapeHtml(module.title)}${isActive ? " · Em andamento" : ""}</p>
        <h2 class="ds-section-title">${escapeHtml(module.subtitle)}</h2>
        <p class="ds-aux course-focus-desc">${escapeHtml(module.description)}</p>
        <p class="course-hierarchy-crumb">
          <span>${escapeHtml(module.title)}</span>
          <span aria-hidden="true">›</span>
          <span>Lernsituation</span>
          <span aria-hidden="true">›</span>
          <span>Missão</span>
        </p>
      </div>
      <a class="button accent course-focus-cta" href="#reader/${continueChapter.id}/${continueTab}">Continuar</a>
    </div>
    ${dualProgressBars({
      study: dual.study,
      mastery: dual.mastery,
      studyLabel: "Percurso do módulo",
      masteryLabel: "Domínio do módulo"
    })}
    <div class="study-method-strip" aria-label="Como avançar">
      <span>Aprender</span><span aria-hidden="true">→</span>
      <span>Recuperar</span><span aria-hidden="true">→</span>
      <span>Praticar</span><span aria-hidden="true">→</span>
      <span>Aplicar</span><span aria-hidden="true">→</span>
      <span>Provar domínio</span>
    </div>
    ${situationBlocks}
    ${orphanBlock}
  `;
}

function renderModuleSummary(
  ctx: AppContext,
  module: Module,
  visibleCount: number,
  focused: boolean
): string {
  const dual = getModuleDualProgress(ctx.data, ctx.state, module);
  return `
    <button
      class="module-summary-card module-switch-row ${focused ? "is-focused" : ""}"
      type="button"
      data-focus-module="${module.id}"
      ${focused ? 'aria-current="true"' : ""}
    >
      <span class="module-switch-copy">
        <span class="ds-caption">${escapeHtml(module.title)}${focused ? " · Foco" : ""}</span>
        <strong class="ds-card-title">${escapeHtml(module.subtitle)}</strong>
        <span class="ds-aux">${visibleCount} cap. · domínio ${dual.mastery.percent}%</span>
      </span>
      <span class="module-switch-meta">
        <span class="module-switch-bar" aria-hidden="true"><span style="width:${dual.mastery.percent}%"></span></span>
        <span class="module-switch-chevron" aria-hidden="true">›</span>
      </span>
    </button>
  `;
}

function renderSituationBlock(
  ctx: AppContext,
  module: Module,
  situation: LearningSituation,
  chapters: Chapter[],
  checkpoint: CheckpointDefinition | null
): string {
  if (!chapters.length) return "";
  const study = makeProgress(
    chapters.filter((chapter) => getVisitedSteps(ctx.state, chapter.id).length > 0 || isCompleted(ctx.state, chapter.id)).length,
    chapters.length
  );
  const mastery = makeProgress(
    chapters.filter((chapter) => hasMasteryEvidence(ctx.state, chapter.id)).length,
    chapters.length
  );
  const checkpointUnlocked = checkpoint ? isCheckpointUnlocked(ctx.state, checkpoint) : false;
  const checkpointDone = checkpoint ? isCheckpointCompleted(ctx.state, checkpoint.situationId) : false;

  return `
    <section class="situation-block" aria-label="Lernsituation ${escapeAttribute(situation.title)}">
      <header class="situation-block-head">
        <span class="ds-caption">Lernsituation · percurso ${study.completed}/${study.total} · domínio ${mastery.completed}/${mastery.total}</span>
        <h3 class="situation-block-title">${escapeHtml(situation.title)}</h3>
        <p class="ds-aux">${escapeHtml(situation.description)}</p>
        <div class="situation-mini-bars" aria-hidden="true">
          <span class="situation-mini-bar study"><span style="width:${study.percent}%"></span></span>
          <span class="situation-mini-bar mastery"><span style="width:${mastery.percent}%"></span></span>
        </div>
      </header>
      <ol class="learning-path timeline-path ds-timeline-primary" aria-label="Missões de ${escapeAttribute(situation.title)}">
        ${chapters.map((chapter) => renderPathNode(ctx, module, chapter)).join("")}
      </ol>
      ${checkpoint ? `
        <div class="situation-checkpoint ${checkpointDone ? "is-done" : checkpointUnlocked ? "is-ready" : "is-locked"}">
          <div>
            <span class="ds-caption">${checkpointDone ? "Checkpoint concluído" : checkpointUnlocked ? "Checkpoint liberado" : "Checkpoint bloqueado"}</span>
            <strong>${escapeHtml(checkpoint.title)}</strong>
            <p class="ds-aux">${checkpointDone
              ? "Você já comprovou o conjunto desta situação."
              : checkpointUnlocked
                ? "Todas as missões desta situação têm domínio — avalie o conjunto."
                : "Libera quando todas as missões tiverem domínio aprovado."}</p>
          </div>
          ${checkpointUnlocked || checkpointDone
            ? `<a class="button ${checkpointDone ? "secondary" : "accent"}" href="#checkpoint/${escapeAttribute(checkpoint.situationId)}">${checkpointDone ? "Refazer" : "Iniciar"}</a>`
            : `<span class="button soft-complete" aria-disabled="true">Aguardando domínio</span>`
          }
        </div>
      ` : ""}
    </section>
  `;
}

function renderPathNode(ctx: AppContext, module: Module, chapter: Chapter): string {
  const status = getChapterPathStatus(ctx.data, ctx.state, chapter.id, module);
  const readiness = getChapterReadiness(ctx.data, ctx.state, chapter);
  const labels = { done: "Concluído", current: "Agora", open: "A seguir" };
  const mastered = hasMasteryEvidence(ctx.state, chapter.id);
  const action = mastered
    ? "Revisar"
    : status === "current"
      ? "Continuar"
      : status === "done"
        ? "Provar domínio"
        : "Abrir";

  let evidenceHtml = "";
  let proofHint = "";
  try {
    const mission = getNormalizedCourseData().missionsById[chapter.id] || null;
    if (mission) {
      const evidence = getMissionLearningEvidence(mission, ctx.state);
      const gate = evaluateMasteryGate(ctx.state, chapter.id, mission);
      evidenceHtml = `
        <div class="path-evidence tone-${evidence.tone}" aria-label="Evidência de aprendizagem">
          <span>Etapas ${evidence.stepsDone}/${evidence.stepsTotal}</span>
          <span>${escapeHtml(evidence.practiceScore === null ? "Prática —" : `Prática ${evidence.practiceScore}%`)}</span>
          <span>${evidence.masteryPassed ? "Domínio ok" : "Domínio pendente"}</span>
        </div>
      `;
      if (!evidence.masteryPassed) {
        proofHint = `<p class="path-proof-hint">${escapeHtml(gate.reason)}</p>`;
      } else {
        proofHint = `<p class="path-proof-hint is-proven">Entendimento comprovado no teste de domínio.</p>`;
      }
    }
  } catch {
    const steps = getVisitedSteps(ctx.state, chapter.id).length;
    evidenceHtml = `
      <div class="path-evidence tone-${mastered ? "strong" : steps ? "partial" : "empty"}">
        <span>Etapas ${steps}/${READER_STEPS.length}</span>
        <span>${mastered ? "Domínio ok" : "Domínio pendente"}</span>
      </div>
    `;
  }

  return `
    <li class="path-node ${status}${mastered ? " mastered" : ""}">
      <div class="path-marker" aria-hidden="true">${mastered ? "★" : status === "done" ? "✓" : "○"}</div>
      <div class="path-body">
        <div class="path-copy">
          <span class="path-status">${labels[status]}</span>
          <div class="path-title-row">
            <h3>${escapeHtml(chapter.title)}</h3>
            ${readinessBadge(readiness)}
            ${mastered ? `<span class="path-mastery-pill">Domínio</span>` : ""}
          </div>
          <p class="ds-aux path-desc">${escapeHtml(chapter.description)}</p>
          ${evidenceHtml}
          ${proofHint}
          ${(() => {
            const note = (ctx.state.notes[chapter.id] || "").trim();
            if (!note) return "";
            const preview = note.length > 120 ? `${note.slice(0, 120).trim()}…` : note;
            return `<details class="path-note"><summary>Nota</summary><p>${escapeHtml(preview)}</p></details>`;
          })()}
          <div class="chapter-meta path-meta">
            <span>${escapeHtml(chapter.studyTime || "Sessão curta")}</span>
            ${confidenceBadge(ctx.state, chapter.id)}
          </div>
        </div>
        <div class="path-actions">
          <a class="button ${status === "current" || (!mastered && status === "done") ? "accent" : "secondary"} path-node-cta" href="#reader/${chapter.id}/${getResumeTab(ctx.state, chapter.id)}">${action}</a>
        </div>
      </div>
    </li>
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
