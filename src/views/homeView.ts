import type { AppContext } from "../appContext";
import {
  getActiveModule,
  getChapterLearningSituation,
  getChapterModule,
  getChapterReadiness,
  getCourseProgress,
  getCourseReadiness,
  getEstimatedSessionMinutes,
  getModuleContinueChapter,
  getModuleProgress,
  getReviewQueue,
  getSessionProgress,
  getTodayChapter,
  isReviewDue,
  READER_STEPS
} from "../domain/course";
import { confidenceBadge, escapeAttribute, inlineProgress, progressBlock, readinessBadge } from "../ui/html";

export function renderHomeView(ctx: AppContext): string {
  const progress = getCourseProgress(ctx.data, ctx.state);
  const readiness = getCourseReadiness(ctx.data, ctx.state);
  const chapter = getTodayChapter(ctx.data, ctx.state);
  const chapterReadiness = getChapterReadiness(ctx.data, ctx.state, chapter);
  const module = getChapterModule(ctx.data, chapter.id) || getActiveModule(ctx.data, ctx.state);
  const situation = getChapterLearningSituation(ctx.data, chapter.id);
  const session = getSessionProgress(ctx.state, chapter.id);
  const minutes = getEstimatedSessionMinutes(chapter);
  const review = getReviewQueue(ctx.data, ctx.state).filter((item) => item.id !== chapter.id).slice(0, 3);
  const dueCount = ctx.data.chapters.filter((item) => isReviewDue(ctx.state, item.id)).length;
  const continueChapter = getModuleContinueChapter(ctx.data, ctx.state, module);
  const moduleProgress = getModuleProgress(ctx.data, ctx.state, module);
  const ctaLabel = session.completed > 0 && session.percent < 100 ? "Continuar sessao" : "Comecar sessao";

  return `
    <section class="study-home">
      <section class="study-hero rise-in">
        <p class="eyebrow">Curso offline AP1 FIAE</p>
        <h1>AzubiForge</h1>
        <p class="lead">Forge your Ausbildung. Uma sessao curta, guiada e pratica: leia, aplique, treine vocabulario e feche com AP1.</p>
        <div class="study-hero-meta dual-progress">
          ${progressBlock(progress, "concluidos")}
          ${progressBlock(readiness, "quase prontos")}
          <p class="small-note">Prontidao media ${readiness.percent}% · ${dueCount} capitulos em revisao</p>
        </div>
      </section>

      <section class="session-focus rise-in" style="animation-delay: 80ms">
        <div class="session-focus-copy">
          <span class="card-label">Sessao de hoje</span>
          <h2>${chapter.title}</h2>
          <p>${chapter.description}</p>
          <div class="chapter-meta">
            <span>${module.title} · ${module.subtitle}</span>
            <span>${minutes} min</span>
            <span>${situation?.title || "Lernsituation"}</span>
            ${confidenceBadge(ctx.state, chapter.id)}
            ${readinessBadge(chapterReadiness)}
          </div>
          ${chapterReadiness.reasons.length ? `<p class="small-note">${chapterReadiness.reasons.join(" · ")}</p>` : ""}
          <div class="session-stepper" aria-label="Etapas da sessao">
            ${READER_STEPS.map((step, index) => {
              const done = (ctx.state.sessionSteps[chapter.id] || []).includes(step.id);
              return `
                <div class="session-step ${done ? "done" : ""} ${index === session.completed ? "current" : ""}">
                  <span>${index + 1}</span>
                  <strong>${step.label}</strong>
                  <small>${step.hint}</small>
                </div>
              `;
            }).join("")}
          </div>
          <div class="session-progress-line" aria-hidden="true">
            <div style="width: ${session.percent}%"></div>
          </div>
          <p class="small-note">${session.completed} de ${session.total} etapas nesta sessao</p>
        </div>
        <div class="session-focus-actions">
          <a class="button large" href="#reader/${chapter.id}">${ctaLabel}</a>
          <a class="button secondary" href="#course">Ver trilha do curso</a>
          <a class="button secondary" href="#review">Revisao ativa</a>
        </div>
      </section>

      <section class="home-split rise-in" style="animation-delay: 140ms">
        <section class="panel soft-panel">
          <div class="panel-head-row">
            <div>
              <span class="card-label">Modulo em andamento</span>
              <h2>${module.subtitle}</h2>
              <p>${module.description}</p>
            </div>
            <a class="text-link" href="#course">Abrir curso</a>
          </div>
          ${inlineProgress(moduleProgress)}
          <ol class="module-trail compact-trail" aria-label="Trilha do modulo">
            ${module.chapterIds.slice(0, 6).map((id, index) => {
              const item = ctx.data.chapters.find((chapterItem) => chapterItem.id === id);
              if (!item) return "";
              const done = ctx.state.completed.includes(id);
              const current = continueChapter.id === id;
              return `
                <li class="${done ? "done" : ""} ${current ? "current" : ""}">
                  <a href="#reader/${id}">
                    <span>${index + 1}</span>
                    <strong>${item.title}</strong>
                  </a>
                </li>
              `;
            }).join("")}
          </ol>
          <a class="button secondary" href="#reader/${continueChapter.id}">Continuar em ${continueChapter.title}</a>
        </section>

        <section class="panel soft-panel">
          <span class="card-label">Revisar agora</span>
          <h2>Fila curta</h2>
          <p>Capitulos fracos ou ainda abertos. Tres no maximo para nao sobrecarregar.</p>
          <div class="mini-list">
            ${review.length ? review.map((item) => `
              <a href="#reader/${item.id}">
                <strong>${item.title}</strong>
                <span>${getChapterModule(ctx.data, item.id)?.subtitle || "Curso"} ${confidenceBadge(ctx.state, item.id)}</span>
              </a>
            `).join("") : `<p class="empty-state">Nada urgente na fila. Avance a sessao de hoje.</p>`}
          </div>
        </section>
      </section>

      <details class="tools-drawer rise-in" style="animation-delay: 180ms">
        <summary>Busca e backup offline</summary>
        <div class="tools-drawer-body">
          <section class="panel soft-panel" aria-label="Busca global">
            <span class="card-label">Busca offline</span>
            <h2>Encontrar conteudo</h2>
            <input
              class="search-input"
              type="search"
              placeholder="Buscar por DNS, Firewall, SQL..."
              aria-label="Busca global"
              data-global-search
              value="${escapeAttribute(ctx.ui.globalQuery)}"
            >
            ${ctx.ui.globalQuery ? renderGlobalResults(ctx) : ""}
          </section>
          <section class="panel soft-panel" aria-label="Dados locais">
            <span class="card-label">Dados locais</span>
            <h2>Backup offline</h2>
            <p>Exporte ou importe progresso, confianca e anotacoes em JSON.</p>
            <div class="tool-actions">
              <button class="button secondary" data-export-progress>Exportar progresso</button>
              <label class="button secondary file-button">
                Importar progresso
                <input type="file" accept="application/json,.json" data-import-progress>
              </label>
            </div>
          </section>
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
      href: `#reader/${chapter.id}`
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
