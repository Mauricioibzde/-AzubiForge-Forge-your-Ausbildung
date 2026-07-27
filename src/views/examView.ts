import type { AppContext } from "../appContext";
import {
  detectSignalWort,
  EXAM_CHECKLIST,
  getAp1DrillExercises,
  getExamReadinessSummary,
  getWeakChapters,
  SIGNAL_WORDS,
  type Ap1DrillItem,
  type SignalWort
} from "../domain/exam";
import type { ExamFocusMode } from "../types";
import { readinessBadge } from "../ui/html";

export function renderExamView(ctx: AppContext): string {
  const summary = getExamReadinessSummary(ctx.data, ctx.state);
  const mode = ctx.ui.examFocusMode;

  return `
    <section class="exam-shell">
      <div class="section-head">
        <div>
          <p class="eyebrow">AP1 Pruefungstraining</p>
          <h1>Treine como a IHK pergunta.</h1>
          <p>Foco total na prova: Signalwoerter, perguntas no estilo AP1 e seus pontos fracos.</p>
        </div>
        <div class="panel exam-summary-panel">
          <span class="card-label">Estado para a prova</span>
          <p><strong>${summary.readyCount}</strong> quase prontos</p>
          <p><strong>${summary.weakCount}</strong> pontos fracos</p>
          <p><strong>${summary.drillCount}</strong> perguntas AP1 disponiveis</p>
        </div>
      </div>

      <div class="segmented-control exam-mode-control" aria-label="Modo de treino AP1">
        ${modeButton("weak", "Pontos fracos", mode)}
        ${modeButton("signals", "Signalwoerter", mode)}
        ${modeButton("drill", "Perguntas AP1", mode)}
        ${modeButton("checklist", "Checklist", mode)}
      </div>

      ${mode === "weak" ? renderWeakMode(ctx) : ""}
      ${mode === "signals" ? renderSignalsMode(ctx) : ""}
      ${mode === "drill" ? renderDrillMode(ctx) : ""}
      ${mode === "checklist" ? renderChecklistMode(ctx) : ""}
    </section>
  `;
}

function modeButton(value: ExamFocusMode, label: string, current: ExamFocusMode): string {
  return `
    <button
      class="${current === value ? "active" : ""}"
      type="button"
      data-filter-group="exam-focus"
      data-filter-value="${value}"
    >${label}</button>
  `;
}

function renderWeakMode(ctx: AppContext): string {
  const weak = getWeakChapters(ctx.data, ctx.state, 8);
  if (!weak.length) {
    return `
      <section class="panel completion-card">
        <span class="card-label">Bom sinal</span>
        <h2>Nenhum ponto critico agora.</h2>
        <p>Avance para Signalwoerter e perguntas AP1 para manter a forma de prova.</p>
        <button class="button" type="button" data-filter-group="exam-focus" data-filter-value="drill">Treinar perguntas AP1</button>
      </section>
    `;
  }

  return `
    <section class="exam-weak-list" aria-label="Pontos fracos">
      ${weak.map((item, index) => `
        <article class="exam-weak-card">
          <div>
            <span class="card-label">${index + 1}. ${item.moduleTitle}</span>
            <h2>${item.chapter.title}</h2>
            <p>${item.chapter.description}</p>
            <div class="chapter-meta">
              ${readinessBadge(item.readiness)}
              ${item.readiness.reasons.map((reason) => `<span>${reason}</span>`).join("")}
            </div>
          </div>
          <div class="exam-weak-actions">
            <a class="button" href="#reader/${item.chapter.id}">Estudar agora</a>
            <a class="button secondary" href="#reader/${item.chapter.id}/ap1">Abrir AP1-Check</a>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderSignalsMode(ctx: AppContext): string {
  const total = SIGNAL_WORDS.length;
  const index = ((ctx.ui.examFocusIndex % total) + total) % total;
  const item = SIGNAL_WORDS[index];

  return `
    <section class="review-focus panel" aria-label="Treino de Signalwoerter">
      <p class="small-note">Na AP1, o verbo do enunciado define o formato da resposta. Treine reconhecer isso antes de responder.</p>
      <div class="focus-stage" data-swipe-deck="exam">
        ${renderSignalCard(item, index, total)}
      </div>
      <div class="focus-controls">
        <button class="button secondary" type="button" data-exam-step="-1">Anterior</button>
        <span class="focus-count">${index + 1} / ${total}</span>
        <button class="button" type="button" data-exam-step="1">Proximo</button>
      </div>
    </section>
  `;
}

function renderSignalCard(item: SignalWort, index: number, total: number): string {
  return `
    <article class="focus-card-big exam-signal-card">
      <span class="card-label">Signalwort ${index + 1}/${total}</span>
      <h2>${item.de}</h2>
      <p class="focus-prompt">${item.pt}</p>
      <details class="focus-reveal">
        <summary>O que a IHK espera</summary>
        <p><strong>Formato:</strong> ${item.expect}</p>
        <p><strong>Dica:</strong> ${item.tip}</p>
        <p><strong>Beispiel:</strong> ${item.example}</p>
      </details>
    </article>
  `;
}

function renderDrillMode(ctx: AppContext): string {
  const items = getAp1DrillExercises(ctx.data, ctx.state, 24);
  if (!items.length) {
    return `<p class="empty-state">Ainda nao ha perguntas AP1 suficientes neste curso.</p>`;
  }

  const index = ((ctx.ui.examFocusIndex % items.length) + items.length) % items.length;
  const item = items[index];
  const signal = detectSignalWort(item.question);
  const checkKey = `exam:${item.chapterId}:${item.style}:${item.question}`;
  const check = ctx.state.exerciseChecks[checkKey];

  return `
    <section class="review-focus panel" aria-label="Drill AP1">
      <p class="small-note">Responda como na prova: leia o Signalwort, monte a resposta, so depois revele.</p>
      <div class="focus-stage" data-swipe-deck="exam">
        ${renderDrillCard(item, index, items.length, signal, checkKey, check)}
      </div>
      <div class="focus-controls">
        <button class="button secondary" type="button" data-exam-step="-1">Anterior</button>
        <span class="focus-count">${index + 1} / ${items.length}</span>
        <button class="button" type="button" data-exam-step="1">Proximo</button>
      </div>
    </section>
  `;
}

function renderDrillCard(
  item: Ap1DrillItem,
  index: number,
  total: number,
  signal: SignalWort | undefined,
  checkKey: string,
  check: string | undefined
): string {
  return `
    <article class="focus-card-big">
      <span class="card-label">${item.style === "ap1" ? "AP1-Style" : "Pratica"} ${index + 1}/${total}</span>
      <p class="exam-chapter-tag">${item.chapterTitle}</p>
      ${signal ? `<p class="exam-signal-tag">Signalwort: <strong>${signal.de}</strong> · ${signal.expect}</p>` : ""}
      <h2>Aufgabe</h2>
      <p class="focus-question">${item.question}</p>
      <details class="focus-reveal">
        <summary>Antwort anzeigen</summary>
        <p><strong>Antwort:</strong> ${item.answer}</p>
        ${item.explanation ? `<p><strong>Erklaerung:</strong> ${item.explanation}</p>` : ""}
        ${signal ? `<p class="small-note">Lembrete: ${signal.tip}</p>` : ""}
        <div class="self-check-actions">
          <button
            class="button secondary ${check === "correct" ? "active-check" : ""}"
            type="button"
            data-exercise-check="correct"
            data-check-key="${checkKey}"
            data-check-chapter="${item.chapterId}"
            data-auto-advance="exam"
          >Acertei</button>
          <button
            class="button secondary ${check === "wrong" ? "active-check wrong" : ""}"
            type="button"
            data-exercise-check="wrong"
            data-check-key="${checkKey}"
            data-check-chapter="${item.chapterId}"
            data-auto-advance="exam"
          >Errei / revisar</button>
        </div>
        <a class="text-link" href="#reader/${item.chapterId}">Abrir capitulo</a>
      </details>
    </article>
  `;
}

function renderChecklistMode(ctx: AppContext): string {
  const checked = EXAM_CHECKLIST.filter((_, index) => ctx.state.examChecklist[String(index)]).length;
  return `
    <section class="panel exam-checklist">
      <span class="card-label">Checklist de prova</span>
      <h2>Antes da AP1, eu consigo...</h2>
      <p class="small-note">${checked} de ${EXAM_CHECKLIST.length} itens marcados</p>
      <ul class="exam-checklist-items">
        ${EXAM_CHECKLIST.map((item, index) => {
          const done = Boolean(ctx.state.examChecklist[String(index)]);
          return `
            <li>
              <button
                class="exam-check-item ${done ? "checked" : ""}"
                type="button"
                data-exam-checklist="${index}"
                aria-pressed="${done}"
              >
                <span class="exam-check-mark" aria-hidden="true">${done ? "OK" : ""}</span>
                <span>${item}</span>
              </button>
            </li>
          `;
        }).join("")}
      </ul>
      <p class="small-note">Marque o que ja domina. Itens em aberto apontam de volta aos pontos fracos.</p>
      ${checked < EXAM_CHECKLIST.length
        ? `<button class="button secondary" type="button" data-filter-group="exam-focus" data-filter-value="weak">Ver pontos fracos</button>`
        : `<p class="small-note">Checklist completa. Mantenha o ritmo com perguntas AP1.</p>`}
    </section>
  `;
}
