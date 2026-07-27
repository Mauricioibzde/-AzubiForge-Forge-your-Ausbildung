import type { AppState, Chapter, Confidence, ExerciseCheck, Progress, Readiness, VocabularyRow } from "../types";

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

export function progressBlock(progress: Progress, label = "capitulos"): string {
  return `
    <div class="progress-block">
      <div class="progress-meta">
        <span>${progress.completed} de ${progress.total} ${label}</span>
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

export function readinessBadge(readiness: Readiness): string {
  return `<span class="readiness-badge level-${readiness.level}">${readiness.label}</span>`;
}

export function confidenceControls(
  state: AppState,
  chapter: Chapter,
  options: { gateMessage?: string } = {}
): string {
  const current = state.confidence[chapter.id] || "";
  const optionsList: Array<[Confidence, string]> = [
    ["ok", "Entendi"],
    ["review", "Preciso revisar"],
    ["hard", "Dificil"],
    ["ready", "Pronto AP1"]
  ];

  return `
    <section class="confidence-box">
      <span class="small-note">Confianca</span>
      <div class="confidence-actions">
        ${optionsList.map(([value, label]) => `
          <button
            class="${current === value ? "active" : ""}"
            type="button"
            data-confidence="${value}"
            data-confidence-chapter="${chapter.id}"
          >${label}</button>
        `).join("")}
      </div>
      ${options.gateMessage ? `
        <p class="session-gate-note" role="status">${options.gateMessage}</p>
        <button class="button secondary" type="button" data-confidence-gate-cancel="${chapter.id}">Entendi</button>
      ` : ""}
    </section>
  `;
}

export function vocabularyRecallCards(
  rows: VocabularyRow[],
  chapterId: string,
  checks: Record<string, ExerciseCheck>
): string {
  return `
    <div class="vocab-recall-grid">
      ${rows.map((row, index) => {
        const key = `vocab:${chapterId}:${index}`;
        const check = checks[key];
        return `
          <article class="vocab-recall-card ${check ? `checked-${check}` : ""}">
            <strong>${row.de}</strong>
            <details>
              <summary>Revelar significado</summary>
              <p><strong>${row.pt}</strong></p>
              <p>${row.explanation}</p>
              <p class="small-note">${row.example}</p>
              <div class="self-check-actions">
                <button
                  class="button secondary ${check === "correct" ? "active-check" : ""}"
                  type="button"
                  data-vocab-check="correct"
                  data-check-key="${key}"
                  data-check-chapter="${chapterId}"
                >Acertei</button>
                <button
                  class="button secondary ${check === "wrong" ? "active-check wrong" : ""}"
                  type="button"
                  data-vocab-check="wrong"
                  data-check-key="${key}"
                  data-check-chapter="${chapterId}"
                >Errei</button>
              </div>
            </details>
          </article>
        `;
      }).join("")}
    </div>
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
