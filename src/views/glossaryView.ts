import type { AppContext } from "../appContext";
import type { GlossaryFilter, GlossaryTerm } from "../types";
import { escapeAttribute } from "../ui/html";

export function renderGlossaryView(ctx: AppContext): string {
  const terms = getFilteredGlossary(ctx);

  return `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">Glossario</p>
          <h1>Termos essenciais</h1>
          <p>Pesquise palavras tecnicas em alemao e revise a traducao em portugues com explicacoes curtas.</p>
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

      <div class="glossary-list">
        ${terms.map(termCard).join("")}
      </div>
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
