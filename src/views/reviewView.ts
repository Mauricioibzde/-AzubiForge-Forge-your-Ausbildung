import type { AppContext } from "../appContext";
import {
  exerciseCheckKey,
  getReviewExercises,
  getReviewQueue,
  getReviewVocabularyDeck,
  sortByCheckPriority,
  vocabCheckKey,
  type ReviewVocabItem
} from "../domain/course";
import type { ReviewFocusMode } from "../types";
import { chapterCard, exerciseCard } from "../ui/components";

export function renderReviewView(ctx: AppContext): string {
  const queue = getReviewQueue(ctx.data, ctx.state).slice(0, 8);
  const allCards = getReviewExercises(ctx.data, ctx.state).slice(0, 24);
  const allTerms = getReviewVocabularyDeck(ctx.data, ctx.state, 24);
  const mode = ctx.ui.reviewFocusMode;
  const deckFilter = ctx.ui.reviewDeckFilter;

  const filteredTerms = allTerms.filter((term) => {
    const key = vocabCheckKey(term.chapterId, term.index);
    if (deckFilter === "wrong") return ctx.state.vocabChecks[key] === "wrong";
    if (deckFilter === "due") return isReviewItemDue(ctx.state.reviewSchedule, key);
    return true;
  });
  const filteredCards = allCards.filter((card) => {
    const key = exerciseCheckKey(card.chapterId, card.exerciseIndex);
    if (deckFilter === "wrong") return ctx.state.exerciseChecks[key] === "wrong";
    if (deckFilter === "due") return isReviewItemDue(ctx.state.reviewSchedule, key);
    return true;
  });

  const terms = prioritizeDueItems(
    filteredTerms,
    (term) => vocabCheckKey(term.chapterId, term.index),
    (term) => ctx.state.vocabChecks[vocabCheckKey(term.chapterId, term.index)],
    ctx.state.reviewSchedule
  );
  const cards = prioritizeDueItems(
    filteredCards,
    (card) => exerciseCheckKey(card.chapterId, card.exerciseIndex),
    (card) => ctx.state.exerciseChecks[exerciseCheckKey(card.chapterId, card.exerciseIndex)],
    ctx.state.reviewSchedule
  );

  const deckSize = mode === "flash" ? terms.length : cards.length;
  const index = deckSize ? ((ctx.ui.reviewFocusIndex % deckSize) + deckSize) % deckSize : 0;
  const wrongExerciseCount = allCards.filter(
    (card) => ctx.state.exerciseChecks[exerciseCheckKey(card.chapterId, card.exerciseIndex)] === "wrong"
  ).length;
  const wrongVocabCount = allTerms.filter(
    (term) => ctx.state.vocabChecks[vocabCheckKey(term.chapterId, term.index)] === "wrong"
  ).length;
  const focusWrongCount = mode === "flash" ? wrongVocabCount : wrongExerciseCount;
  const dueTermCount = filteredTerms.filter((term) => isReviewItemDue(ctx.state.reviewSchedule, vocabCheckKey(term.chapterId, term.index))).length;
  const dueCardCount = filteredCards.filter((card) => isReviewItemDue(ctx.state.reviewSchedule, exerciseCheckKey(card.chapterId, card.exerciseIndex))).length;
  const focusDueCount = mode === "flash" ? dueTermCount : dueCardCount;

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
          ${wrongExerciseCount || wrongVocabCount
            ? `<p class="small-note">${wrongExerciseCount} exercicios · ${wrongVocabCount} termos para revisar</p>`
            : ""}
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
        <div class="segmented-control compact" aria-label="Filtrar por desempenho">
          <button class="${deckFilter === "all" ? "active" : ""}" type="button" data-filter-group="review-wrong" data-filter-value="all">Todos</button>
          <button class="${deckFilter === "wrong" ? "active" : ""}" type="button" data-filter-group="review-wrong" data-filter-value="wrong">So erros (${focusWrongCount})</button>
          <button class="${deckFilter === "due" ? "active" : ""}" type="button" data-filter-group="review-wrong" data-filter-value="due">Vencidos hoje (${focusDueCount})</button>
        </div>
        <div class="review-due-summary" role="status">
          <span class="status-pill due">Vencidos hoje: ${focusDueCount}</span>
          <span class="small-note">Termos: ${dueTermCount} · Perguntas: ${dueCardCount}</span>
        </div>

        ${deckSize === 0 ? `<p class="empty-state">${emptyStateForFilter(deckFilter)}</p>` : `
          <div class="focus-stage" data-swipe-deck="review">
            ${mode === "flash" ? renderFlashFocus(ctx, terms[index], index, deckSize) : renderQuizFocus(ctx, cards[index], index, deckSize)}
          </div>
          <div class="focus-controls">
            <button class="button secondary" type="button" data-review-step="-1">Anterior</button>
            <span class="focus-count">${index + 1} / ${deckSize}</span>
            <button class="button" type="button" data-review-step="1">Proximo</button>
          </div>
          <p class="small-note">Espaco revela · 1 Acertei · 2 Errei · setas navegam · deslize no celular.</p>
        `}
      </section>

      <details class="review-more">
        <summary>Ver fila completa e lista longa</summary>
        <div class="review-layout">
          <section class="panel">
            <span class="card-label">Flashcards</span>
            <div class="flashcard-grid">
              ${allTerms.map((term) => `
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
              ${allCards.map((card) => exerciseCard(card, card.exerciseIndex, {
                chapterId: card.chapterId,
                chapterTitle: card.chapterTitle,
                checkKey: exerciseCheckKey(card.chapterId, card.exerciseIndex),
                check: ctx.state.exerciseChecks[exerciseCheckKey(card.chapterId, card.exerciseIndex)]
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
  const due = isReviewItemDue(ctx.state.reviewSchedule, key);
  return `
    <article class="focus-card-big ${check ? `checked-${check}` : ""}">
      <div class="focus-card-meta">
        <span class="card-label">Flashcard ${index + 1}/${total}</span>
        ${due ? `<span class="status-pill due">Vence hoje</span>` : ""}
      </div>
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
  card: { question: string; answer: string; explanation?: string; chapterId: string; chapterTitle: string; exerciseIndex: number },
  index: number,
  total: number
): string {
  const checkKey = exerciseCheckKey(card.chapterId, card.exerciseIndex);
  const due = isReviewItemDue(ctx.state.reviewSchedule, checkKey);
  return `
    <article class="focus-card-big">
      <div class="focus-card-meta">
        <span class="card-label">Pergunta ${index + 1}/${total}</span>
        ${due ? `<span class="status-pill due">Vence hoje</span>` : ""}
      </div>
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
        <a class="text-link" href="#reader/${card.chapterId}/${card.exerciseIndex >= 0 ? "practice" : "explain"}">Abrir capitulo</a>
      </details>
    </article>
  `;
}

function isReviewItemDue(schedule: Record<string, string>, key: string): boolean {
  const dueAt = schedule[key];
  if (!dueAt) return false;
  const due = Date.parse(dueAt);
  return !Number.isNaN(due) && due <= Date.now();
}

function prioritizeDueItems<T>(
  items: T[],
  getKey: (item: T) => string,
  getCheck: (item: T) => "correct" | "wrong" | undefined,
  schedule: Record<string, string>
): T[] {
  const sorted = sortByCheckPriority(items, getCheck);
  return [...sorted].sort((a, b) => Number(isReviewItemDue(schedule, getKey(b))) - Number(isReviewItemDue(schedule, getKey(a))));
}

function emptyStateForFilter(filter: "all" | "wrong" | "due"): string {
  if (filter === "wrong") return "Nenhum erro marcado neste modo.";
  if (filter === "due") return "Nenhum item vencido hoje neste modo.";
  return "Nada na fila de foco agora.";
}
