import type { AppContext } from "../appContext";
import { getReviewExercises, getReviewQueue, getVocabularyPreview } from "../domain/course";
import { chapterCard, exerciseCard } from "../ui/components";

export function renderReviewView(ctx: AppContext): string {
  const queue = getReviewQueue(ctx.data, ctx.state).slice(0, 8);
  const cards = getReviewExercises(ctx.data, ctx.state).slice(0, 10);
  const terms = getVocabularyPreview(ctx.data, ctx.state).slice(0, 18);

  return `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">Revisao ativa</p>
          <h1>Responda antes de olhar.</h1>
          <p>Treino curto de active recall: vocabulario, perguntas AP1 e capitulos marcados como revisar ou dificil.</p>
        </div>
        <div class="panel">
          <span class="card-label">Fila</span>
          <h2>${queue.length}</h2>
          <p class="small-note">capitulos para revisar</p>
        </div>
      </div>

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
            ${cards.map((card, index) => exerciseCard(card, index, card.chapterId)).join("")}
          </div>
        </section>
      </div>

      <section class="review-queue">
        ${queue.map((chapter) => chapterCard(ctx, chapter, "Revisar")).join("")}
      </section>
    </section>
  `;
}
