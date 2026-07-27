import type { AppContext } from "../appContext";
import {
  getReviewExercises,
  getReviewQueue,
  getReviewVocabularyDeck,
  vocabCheckKey,
  type ReviewVocabItem
} from "../domain/course";
import type { ReviewFocusMode } from "../types";
import { chapterCard, exerciseCard } from "../ui/components";

export function renderReviewView(ctx: AppContext): string {
  const queue = getReviewQueue(ctx.data, ctx.state).slice(0, 8);
  const cards = getReviewExercises(ctx.data, ctx.state).slice(0, 10);
  const terms = getReviewVocabularyDeck(ctx.data, ctx.state, 18);
  const mode = ctx.ui.reviewFocusMode;
  const deckSize = mode === "flash" ? terms.length : cards.length;
  const index = deckSize ? ((ctx.ui.reviewFocusIndex % deckSize) + deckSize) % deckSize : 0;
  const wrongCount = Object.values(ctx.state.exerciseChecks).filter((value) => value === "wrong").length;

  return `
    <section class="review-shell">
      <div class="section-head">
        <div>
          <p class="eyebrow">Revisao ativa</p>
          <h1>Responda antes de olhar.</h1>
          <p>Modo foco para celular e estudo rapido: um termo ou uma pergunta por vez, sem lista infinita.</p>
        </div>
        <div class="panel">
          <span class="card-label">Fila</span>
          <h2>${queue.length}</h2>
          <p class="small-note">capitulos para revisar</p>
          ${wrongCount ? `<p class="small-note">${wrongCount} exercicios marcados para revisar</p>` : ""}
        </div>
      </div>

      <section class="review-focus panel" aria-label="Modo foco">
        <div class="review-focus-head">
          <span class="card-label">Modo foco</span>
          <div class="segmented-control compact" aria-label="Tipo de revisao">
            ${focusModeButton("flash", "Wortschatz", mode)}
            ${focusModeButton("quiz", "Perguntas", mode)}
          </div>
        </div>

        ${deckSize === 0 ? `<p class="empty-state">Nada na fila de foco agora.</p>` : `
          <div class="focus-stage" data-swipe-deck="review">
            ${mode === "flash" ? renderFlashFocus(ctx, terms[index], index, deckSize) : renderQuizFocus(ctx, cards[index], index, deckSize)}
          </div>
          <div class="focus-controls">
            <button class="button secondary" type="button" data-review-step="-1">Anterior</button>
            <span class="focus-count">${index + 1} / ${deckSize}</span>
            <button class="button" type="button" data-review-step="1">Proximo</button>
          </div>
          <p class="small-note">Deslize o card no celular ou use as setas do teclado.</p>
        `}
      </section>

      <details class="review-more">
        <summary>Ver fila completa e lista longa</summary>
        <div class="review-layout">
          <section class="panel">
            <span class="card-label">Flashcards</span>
            <div class="flashcard-grid">
              ${terms.map((term) => `
                <details class="flashcard">
                  <summary>${term.word}</summary>
                  <strong>${term.translation}</strong>
                  <p>${term.explanation}</p>
                </details>
              `).join("")}
            </div>
          </section>

          <section class="panel">
            <span class="card-label">Perguntas rapidas</span>
            <div class="exercise-group">
              ${cards.map((card, cardIndex) => exerciseCard(card, cardIndex, {
                chapterId: card.chapterId,
                chapterTitle: card.chapterTitle,
                checkKey: `review:${card.chapterId}:${cardIndex}`,
                check: ctx.state.exerciseChecks[`review:${card.chapterId}:${cardIndex}`]
              })).join("")}
            </div>
          </section>
        </div>

        <section class="review-queue">
          ${queue.map((chapter) => chapterCard(ctx, chapter, "Revisar")).join("")}
        </section>
      </details>
    </section>
  `;
}

function focusModeButton(value: ReviewFocusMode, label: string, current: ReviewFocusMode): string {
  return `
    <button
      class="${current === value ? "active" : ""}"
      type="button"
      data-filter-group="review-focus"
      data-filter-value="${value}"
    >${label}</button>
  `;
}

function renderFlashFocus(
  ctx: AppContext,
  term: ReviewVocabItem,
  index: number,
  total: number
): string {
  const key = vocabCheckKey(term.chapterId, term.index);
  const check = ctx.state.vocabChecks[key];
  return `
    <article class="focus-card-big ${check ? `checked-${check}` : ""}">
      <span class="card-label">Flashcard ${index + 1}/${total}</span>
      <h2>${term.word}</h2>
      <p class="focus-prompt">Explique em voz alta antes de revelar.</p>
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
            data-check-chapter="${term.chapterId}"
            data-auto-advance="review"
          >Acertei</button>
          <button
            class="button secondary ${check === "wrong" ? "active-check wrong" : ""}"
            type="button"
            data-vocab-check="wrong"
            data-check-key="${key}"
            data-check-chapter="${term.chapterId}"
            data-auto-advance="review"
          >Errei</button>
        </div>
        <a class="text-link" href="#reader/${term.chapterId}/vocab">Abrir Wortschatz</a>
      </details>
    </article>
  `;
}

function renderQuizFocus(
  ctx: AppContext,
  card: { question: string; answer: string; explanation?: string; chapterId: string; chapterTitle: string },
  index: number,
  total: number
): string {
  const checkKey = `focus:${card.chapterId}:${index}`;
  return `
    <article class="focus-card-big">
      <span class="card-label">Pergunta ${index + 1}/${total}</span>
      <p class="exam-chapter-tag">${card.chapterTitle}</p>
      <h2>AP1 check</h2>
      <p class="focus-question">${card.question}</p>
      <details class="focus-reveal">
        <summary>Revelar resposta</summary>
        <p><strong>Antwort:</strong> ${card.answer}</p>
        ${card.explanation ? `<p><strong>Erklaerung:</strong> ${card.explanation}</p>` : ""}
        <div class="self-check">
          <div class="self-check-actions">
            <button
              class="button secondary ${ctx.state.exerciseChecks[checkKey] === "correct" ? "active-check" : ""}"
              type="button"
              data-exercise-check="correct"
              data-check-key="${checkKey}"
              data-check-chapter="${card.chapterId}"
              data-auto-advance="review"
            >Acertei</button>
            <button
              class="button secondary ${ctx.state.exerciseChecks[checkKey] === "wrong" ? "active-check wrong" : ""}"
              type="button"
              data-exercise-check="wrong"
              data-check-key="${checkKey}"
              data-check-chapter="${card.chapterId}"
              data-auto-advance="review"
            >Errei / revisar</button>
          </div>
        </div>
        <a class="text-link" href="#reader/${card.chapterId}">Abrir capitulo</a>
      </details>
    </article>
  `;
}
