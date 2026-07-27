import type { AppContext } from "../appContext";
import { findChapter, getCourseProgress, isCompleted } from "../domain/course";
import { escapeHtml } from "../ui/html";

export function renderDocsAiView(ctx: AppContext): string {
  const prompt = buildDocsAiPrompt(ctx);
  const chapter = getDocsAiChapter(ctx);

  return `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">Docs AI</p>
          <h1>Contexto para ChatGPT</h1>
          <p>Gere um documento com seu progresso, anotacoes e objetivo de estudo para copiar e enviar manualmente ao ChatGPT.</p>
        </div>
      </div>

      <div class="docs-ai-layout">
        <aside class="panel docs-ai-settings">
          <div>
            <span class="card-label">Foco</span>
            <div class="segmented-control vertical" aria-label="Foco do prompt">
              ${segment("study-plan", "Plano de estudo", ctx.ui.docsAiFocus)}
              ${segment("chapter-help", "Ajuda no capitulo", ctx.ui.docsAiFocus)}
              ${segment("review", "Revisao AP1", ctx.ui.docsAiFocus)}
            </div>
          </div>

          <label class="field">
            <span>Capitulo principal</span>
            <select data-docs-ai-chapter>
              ${ctx.data.chapters.map((item) => `
                <option value="${item.id}" ${chapter.id === item.id ? "selected" : ""}>
                  ${item.title}
                </option>
              `).join("")}
            </select>
          </label>
        </aside>

        <article class="panel docs-ai-output">
          <div class="docs-ai-head">
            <div>
              <span class="card-label">Prompt pronto</span>
              <h2>AzubiForge Study Context</h2>
            </div>
            <button class="button" type="button" data-copy-docs-ai>Copiar para ChatGPT</button>
          </div>
          <textarea
            class="prompt-output"
            data-docs-ai-output
            rows="24"
            aria-label="Prompt para ChatGPT"
            readonly
          >${escapeHtml(prompt)}</textarea>
          <p class="small-note" data-copy-status>Este texto fica apenas no seu navegador ate voce copiar manualmente.</p>
        </article>
      </div>
    </section>
  `;
}

function segment(value: AppContext["ui"]["docsAiFocus"], label: string, current: AppContext["ui"]["docsAiFocus"]): string {
  return `
    <button
      class="${current === value ? "active" : ""}"
      type="button"
      data-filter-group="docs-ai-focus"
      data-filter-value="${value}"
    >${label}</button>
  `;
}

function getDocsAiChapter(ctx: AppContext) {
  return findChapter(ctx.data, ctx.ui.docsAiChapterId)
    || findChapter(ctx.data, ctx.state.lastChapterId)
    || ctx.data.chapters[0];
}

function buildDocsAiPrompt(ctx: AppContext): string {
  const progress = getCourseProgress(ctx.data, ctx.state);
  const chapter = getDocsAiChapter(ctx);
  const completed = ctx.data.chapters.filter((item) => isCompleted(ctx.state, item.id)).map((item) => item.title);
  const open = ctx.data.chapters.filter((item) => !isCompleted(ctx.state, item.id)).slice(0, 6).map((item) => item.title);
  const notes = Object.entries(ctx.state.notes)
    .filter(([, note]) => note.trim())
    .map(([chapterId, note]) => `- ${findChapter(ctx.data, chapterId)?.title || chapterId}: ${note.trim()}`);

  return [
    "Quero que voce seja meu tutor para a AP1 da Ausbildung FIAE.",
    "",
    "Contexto:",
    "- Estou estudando com uma aplicacao offline chamada AzubiForge.",
    "- A trilha foi estruturada por Lernfelder e Lernsituationen dos livros Westermann Grundstufe LF 1-5.",
    "- Quero explicacoes claras, exemplos, perguntas de revisao e proximos passos.",
    "",
    `Foco deste pedido: ${focusLabel(ctx)}.`,
    `Progresso atual: ${progress.completed} de ${progress.total} capitulos concluidos (${progress.percent}%).`,
    `Ultimo capitulo aberto: ${findChapter(ctx.data, ctx.state.lastChapterId)?.title || "nao definido"}.`,
    "",
    "Capitulos concluidos:",
    completed.length ? completed.map((title) => `- ${title}`).join("\n") : "- Nenhum capitulo concluido ainda.",
    "",
    "Proximos capitulos pendentes:",
    open.length ? open.map((title) => `- ${title}`).join("\n") : "- Todos os capitulos foram marcados como concluidos.",
    "",
    "Capitulo principal para trabalhar agora:",
    `Titulo: ${chapter.title}`,
    `Descricao: ${chapter.description}`,
    "",
    "Texto base do capitulo:",
    chapter.text.map((paragraph) => `- ${paragraph}`).join("\n"),
    "",
    "Wichtig fuer die IHK:",
    chapter.ihk,
    "",
    "Resumo em Portugues:",
    chapter.summary,
    "",
    "Exemplo:",
    chapter.example,
    "",
    "Minhas anotacoes locais:",
    notes.length ? notes.join("\n") : "- Ainda nao tenho anotacoes salvas.",
    "",
    "O que eu quero de voce:",
    instruction(ctx),
    "",
    "Responda em portugues, mas mantenha os termos tecnicos alemaes importantes quando eles forem uteis para a AP1."
  ].join("\n");
}

function focusLabel(ctx: AppContext): string {
  const labels = {
    "study-plan": "criar um plano de estudo curto e pratico",
    "chapter-help": "me ajudar a entender melhor o capitulo selecionado",
    review: "fazer uma revisao focada para AP1"
  };

  return labels[ctx.ui.docsAiFocus];
}

function instruction(ctx: AppContext): string {
  const instructions = {
    "study-plan": "Crie um plano de estudo objetivo para os proximos capitulos. Priorize o que costuma ser importante para a IHK e sugira uma sequencia curta de revisao.",
    "chapter-help": "Explique o capitulo principal com linguagem simples, depois faca 5 perguntas de revisao com respostas escondidas em formato markdown details/summary.",
    review: "Faca uma revisao AP1 com pontos-chave, armadilhas comuns de prova e 8 perguntas curtas para testar minha compreensao."
  };

  return instructions[ctx.ui.docsAiFocus];
}
