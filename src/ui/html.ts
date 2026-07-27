import type { AppState, Chapter, Confidence, Progress, VocabularyRow } from "../types";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

export function paragraphs(items: string[] | string | undefined): string {
  const values = Array.isArray(items) ? items : [items].filter(Boolean) as string[];
  return values.map((item) => `<p>${item}</p>`).join("");
}

export function list(items: string[] | undefined): string {
  return `<ul>${(items || []).map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

export function progressBlock(progress: Progress): string {
  return `
    <div class="progress-block">
      <div class="progress-meta">
        <span>${progress.completed} de ${progress.total} capitulos</span>
        <strong>${progress.percent}%</strong>
      </div>
      <div class="progress-track" aria-label="Progresso do curso">
        <div class="progress-fill" style="width: ${progress.percent}%"></div>
      </div>
    </div>
  `;
}

export function inlineProgress(progress: Progress): string {
  return `
    <div class="inline-progress">
      <div>
        <span>${progress.completed} de ${progress.total}</span>
        <strong>${progress.percent}%</strong>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${progress.percent}%"></div>
      </div>
    </div>
  `;
}

export function confidenceBadge(state: AppState, chapterId: string): string {
  const value = state.confidence[chapterId];
  if (!value) return "";

  const labels: Record<Confidence, string> = {
    ok: "Entendi",
    review: "Revisar",
    hard: "Dificil",
    ready: "Pronto AP1"
  };

  return `<span class="confidence-badge ${value}">${labels[value]}</span>`;
}

export function confidenceControls(state: AppState, chapter: Chapter): string {
  const current = state.confidence[chapter.id] || "";
  const options: Array<[Confidence, string]> = [
    ["ok", "Entendi"],
    ["review", "Preciso revisar"],
    ["hard", "Dificil"],
    ["ready", "Pronto AP1"]
  ];

  return `
    <section class="confidence-box">
      <span class="small-note">Confianca</span>
      <div class="confidence-actions">
        ${options.map(([value, label]) => `
          <button
            class="${current === value ? "active" : ""}"
            type="button"
            data-confidence="${value}"
            data-confidence-chapter="${chapter.id}"
          >${label}</button>
        `).join("")}
      </div>
    </section>
  `;
}

export function vocabularyTable(rows: VocabularyRow[]): string {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Deutsch</th>
            <th>Portugues</th>
            <th>Erklaerung</th>
            <th>Beispielsatz</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${row.de}</td>
              <td>${row.pt}</td>
              <td>${row.explanation}</td>
              <td>${row.example}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

export function emptyState(message: string): string {
  return `<p class="empty-state">${message}</p>`;
}
