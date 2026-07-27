import { getChapterModule, getReadingMinutes, isCompleted } from "../domain/course";
import type { AppContext } from "../appContext";
import type { Chapter, Exercise } from "../types";
import { confidenceBadge } from "./html";

export function chapterCard(ctx: AppContext, chapter: Chapter, actionLabel = "Estudar"): string {
  const done = isCompleted(ctx.state, chapter.id);
  const hasNote = Boolean((ctx.state.notes[chapter.id] || "").trim());
  const module = getChapterModule(ctx.data, chapter.id);

  return `
    <article class="chapter-item ${done ? "done" : ""}">
      <div>
        <div class="chapter-title">
          <span class="status-dot" aria-hidden="true"></span>
          <h3>${chapter.title}</h3>
        </div>
        <p>${chapter.description}</p>
        <div class="chapter-meta">
          <span>${getReadingMinutes(chapter)} min leitura</span>
          ${module ? `<span>${module.title}</span>` : ""}
          ${hasNote ? "<span>Com nota</span>" : ""}
          ${done ? "<span>Concluido</span>" : ""}
          ${confidenceBadge(ctx.state, chapter.id)}
        </div>
      </div>
      <a class="button secondary" href="#reader/${chapter.id}">${actionLabel}</a>
    </article>
  `;
}

export function exerciseCard(exercise: Exercise, index: number, chapterId?: string): string {
  return `
    <div class="exercise">
      <p><strong>${index + 1}. ${exercise.question}</strong></p>
      <details>
        <summary>Antwort anzeigen</summary>
        <p><strong>Antwort:</strong> ${exercise.answer}</p>
        ${exercise.explanation ? `<p><strong>Erklaerung:</strong> ${exercise.explanation}</p>` : ""}
        ${chapterId ? `<a class="text-link" href="#reader/${chapterId}">Kapitel oeffnen</a>` : ""}
      </details>
    </div>
  `;
}
