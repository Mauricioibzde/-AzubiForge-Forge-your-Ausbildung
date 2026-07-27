import type { AppContext } from "../appContext";
import type { GlossaryFilter, GlossaryTerm } from "../types";
import { escapeAttribute } from "../ui/html";

export function renderGlossaryView(ctx: AppContext): string {
  const terms = getFilteredGlossary(ctx);
  const mode = ctx.ui.glossaryMode;
  const index = terms.length ? ((ctx.ui.glossaryFocusIndex % terms.length) + terms.length) % terms.length : 0;
  const current = terms[index];

  return `
    <section class="glossary-shell">
      <div class="section-head">
        <div>
          <p class="eyebrow">Glossario</p>
          <h1>Termos essenciais</h1>
          <p>Liste para consulta rapida ou use o modo flashcard para active recall em alemao.</p>
        </div>
        <div class="segmented-control compact" aria-label="Modo do glossario">
          <button class="${mode === "flash" ? "active" : ""}" type="button" data-filter-group="glossary-mode" data-filter-value="flash">Flashcards</button>
          <button class="${mode === "list" ? "active" : ""}" type="button" data-filter-group="glossary-mode" data-filter-value="list">Lista</button>
        </div>
      </div>

      <div class="toolbar glossary-tools">
        <input
          class="search-input"
          type="search"
          placeholder="Pesquisar termo"
          aria-label="Pesquisar termo"
          data-glossary-search
          value="${escapeAttribute(ctx.ui.glossaryQuery)}"
        >
        <div class="segmented-control" aria-label="Filtrar glossario">
          ${segment("all", "Todos", ctx.ui.glossaryFilter)}
          ${segment("network", "Redes", ctx.ui.glossaryFilter)}
          ${segment("security", "Seguranca", ctx.ui.glossaryFilter)}
          ${segment("database", "Dados", ctx.ui.glossaryFilter)}
          ${segment("programming", "Programacao", ctx.ui.glossaryFilter)}
        </div>
        <p class="small-note">${terms.length} de ${ctx.data.glossary.length} termos encontrados</p>
      </div>

      ${mode === "flash" ? renderGlossaryFlash(ctx, current, index, terms.length) : `
        <div class="glossary-list">
          ${terms.map(termCard).join("")}
        </div>
      `}
    </section>
  `;
}

function renderGlossaryFlash(
  ctx: AppContext,
  term: GlossaryTerm | undefined,
  index: number,
  total: number
): string {
  if (!term || !total) return `<p class="empty-state">Nenhum termo para este filtro.</p>`;

  const key = `glossary:${term.word.toLowerCase()}`;
  const check = ctx.state.vocabChecks[key];

  return `
    <section class="review-focus panel glossary-flash" aria-label="Flashcards do glossario">
      <div class="focus-stage" data-swipe-deck="glossary">
        <article class="focus-card-big ${check ? `checked-${check}` : ""}">
          <span class="card-label">Termo ${index + 1}/${total}</span>
          <h2>${term.word}</h2>
          <p class="focus-prompt">Explique em alemao simples antes de revelar.</p>
          <details class="focus-reveal">
            <summary>Revelar significado</summary>
            <strong>${term.translation}</strong>
            <p>${term.explanation}</p>
            <div class="self-check-actions">
              <button
                class="button secondary ${check === "correct" ? "active-check" : ""}"
                type="button"
                data-vocab-check="correct"
                data-check-key="${key}"
                data-check-chapter=""
                data-auto-advance="glossary"
              >Acertei</button>
              <button
                class="button secondary ${check === "wrong" ? "active-check wrong" : ""}"
                type="button"
                data-vocab-check="wrong"
                data-check-key="${key}"
                data-check-chapter=""
                data-auto-advance="glossary"
              >Errei</button>
            </div>
          </details>
        </article>
      </div>
      <div class="focus-controls">
        <button class="button secondary" type="button" data-glossary-step="-1">Anterior</button>
        <span class="focus-count">${index + 1} / ${total}</span>
        <button class="button" type="button" data-glossary-step="1">Proximo</button>
      </div>
      <p class="small-note">Dica mobile: deslize o card para o lado. No teclado, use as setas.</p>
    </section>
  `;
}

function segment(value: GlossaryFilter, label: string, current: GlossaryFilter): string {
  return `
    <button
      class="${current === value ? "active" : ""}"
      type="button"
      data-filter-group="glossary"
      data-filter-value="${value}"
    >${label}</button>
  `;
}

function termCard(term: GlossaryTerm): string {
  return `
    <article class="term">
      <div>
        <strong>${term.word}</strong>
        <span class="translation">${term.translation}</span>
      </div>
      <p>${term.explanation}</p>
    </article>
  `;
}

function getFilteredGlossary(ctx: AppContext): GlossaryTerm[] {
  const query = ctx.ui.glossaryQuery.trim().toLowerCase();

  return ctx.data.glossary.filter((term) => {
    const searchable = `${term.word} ${term.translation} ${term.explanation}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesFilter = ctx.ui.glossaryFilter === "all" || getTermCategory(term) === ctx.ui.glossaryFilter;
    return matchesQuery && matchesFilter;
  });
}

function getTermCategory(term: GlossaryTerm): GlossaryFilter {
  const searchable = `${term.word} ${term.translation} ${term.explanation}`.toLowerCase();
  const categories: Record<Exclude<GlossaryFilter, "all">, string[]> = {
    network: ["netz", "ip", "gateway", "router", "switch", "protokoll", "subnetz"],
    security: ["firewall", "datensicherung", "verfuegbarkeit", "vertraulichkeit", "integritaet", "schutz"],
    database: ["primaerschluessel", "fremdschluessel", "abfrage", "banco de dados", "tabela", "sql"],
    programming: ["schleife", "loop", "programa", "python", "test"]
  };

  const match = Object.entries(categories)
    .find(([, keywords]) => keywords.some((keyword) => searchable.includes(keyword)));

  return (match?.[0] as GlossaryFilter | undefined) || "all";
}
