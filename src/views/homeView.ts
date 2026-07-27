import type { AppContext } from "../appContext";
import {
  getChapterLearningSituation,
  getChapterModule,
  getCourseProgress,
  getModuleProgress,
  getReviewQueue,
  getTodayChapter,
  getVocabularyPreview
} from "../domain/course";
import { confidenceBadge, escapeAttribute, inlineProgress, progressBlock } from "../ui/html";

export function renderHomeView(ctx: AppContext): string {
  const progress = getCourseProgress(ctx.data, ctx.state);
  const chapter = getTodayChapter(ctx.data, ctx.state);
  const module = getChapterModule(ctx.data, chapter.id);
  const situation = getChapterLearningSituation(ctx.data, chapter.id);
  const review = getReviewQueue(ctx.data, ctx.state).slice(0, 4);
  const vocabulary = getVocabularyPreview(ctx.data, ctx.state).slice(0, 8);

  return `
    <section class="today-layout">
      <div class="today-main">
        <section class="today-hero">
          <div>
            <p class="eyebrow">Hoje</p>
            <h1>Forge your Ausbildung.</h1>
            <p class="lead">Uma sessao curta, clara e orientada pelos Lernfelder Westermann. Comece pelo proximo passo, revise o que esta fraco e feche com uma pergunta AP1.</p>
          </div>
          <div class="today-score">${progressBlock(progress)}</div>
        </section>

        <section class="focus-card">
          <div>
            <span class="card-label">Foco da sessao</span>
            <h2>${chapter.title}</h2>
            <p>${chapter.description}</p>
            <div class="chapter-meta">
              <span>${module?.title || "Curso"}</span>
              <span>${situation?.title || "Lernsituation"}</span>
              ${confidenceBadge(ctx.state, chapter.id)}
            </div>
          </div>
          <div class="focus-actions">
            <a class="button" href="#reader/${chapter.id}">Comecar sessao</a>
            <a class="button secondary" href="#review">Revisao ativa</a>
          </div>
        </section>

        <section class="study-flow" aria-label="Sessao sugerida">
          ${flowStep(1, "Erklaeren", "Leia a ideia principal e diga em voz alta em alemao simples.")}
          ${flowStep(2, "Praxisfall", "Conecte o tema a uma situacao da JIKU IT-Solutions.")}
          ${flowStep(3, "Wortschatz", "Revise os termos que costumam aparecer no enunciado.")}
          ${flowStep(4, "AP1-Check", "Responda antes de abrir a solucao e marque sua confianca.")}
        </section>
      </div>

      <aside class="today-rail">
        <section class="panel">
          <span class="card-label">Revisar hoje</span>
          <div class="mini-list">
            ${review.map((item) => `
              <a href="#reader/${item.id}">
                <strong>${item.title}</strong>
                <span>${getChapterModule(ctx.data, item.id)?.title || "Curso"} ${confidenceBadge(ctx.state, item.id)}</span>
              </a>
            `).join("")}
          </div>
        </section>

        <section class="panel">
          <span class="card-label">Wortschatz</span>
          <div class="term-cloud">
            ${vocabulary.map((term) => `<a href="#review">${term.word}</a>`).join("")}
          </div>
        </section>
      </aside>
    </section>

    <section class="panel global-search" aria-label="Busca global">
      <div>
        <span class="card-label">Busca offline</span>
        <h2>Encontrar conteudo</h2>
        <p>Pesquise capitulos, termos do glossario e explicacoes sem sair do navegador.</p>
      </div>
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

    <section class="module-progress-grid" aria-label="Progresso por Lernfeld">
      ${ctx.data.modules.map((item) => `
        <a class="module-progress-card" href="#course">
          <span class="card-label">${item.title}</span>
          <strong>${item.subtitle}</strong>
          ${inlineProgress(getModuleProgress(ctx.data, ctx.state, item))}
        </a>
      `).join("")}
    </section>

    <section class="panel data-tools" aria-label="Dados locais">
      <div>
        <span class="card-label">Dados locais</span>
        <h2>Backup offline</h2>
        <p>Exporte ou importe seu progresso, confianca e anotacoes usando um arquivo JSON.</p>
      </div>
      <div class="tool-actions">
        <button class="button secondary" data-export-progress>Exportar progresso</button>
        <label class="button secondary file-button">
          Importar progresso
          <input type="file" accept="application/json,.json" data-import-progress>
        </label>
      </div>
    </section>
  `;
}

function flowStep(index: number, title: string, text: string): string {
  return `
    <article class="flow-step">
      <span>${index}</span>
      <strong>${title}</strong>
      <p>${text}</p>
    </article>
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
