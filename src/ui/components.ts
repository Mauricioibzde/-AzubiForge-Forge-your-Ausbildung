import { getChapterModule, getReadingMinutes, getResumeTab, isCompleted } from "../domain/course";
import type { AppContext } from "../appContext";
import type { Chapter, Exercise, ExerciseCheck } from "../types";
import { confidenceBadge } from "./html";

export function chapterCard(ctx: AppContext, chapter: Chapter, actionLabel = "Estudar"): string {
  const done = isCompleted(ctx.state, chapter.id);
  const hasNote = Boolean((ctx.state.notes[chapter.id] || "").trim());
  const module = getChapterModule(ctx.data, chapter.id);
  const resumeTab = getResumeTab(ctx.state, chapter.id);

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
      <a class="button secondary" href="#reader/${chapter.id}/${resumeTab}">${actionLabel}</a>
    </article>
  `;
}

export function exerciseCard(
  exercise: Exercise,
  index: number,
  options: {
    chapterId?: string;
    chapterTitle?: string;
    checkKey?: string;
    check?: ExerciseCheck;
  } = {}
): string {
  const checkKey = options.checkKey || (options.chapterId ? `${options.chapterId}:${index}` : "");
  const check = options.check;

  return `
    <div class="exercise ${check ? `checked-${check}` : ""}">
      ${options.chapterTitle ? `<span class="card-label">${options.chapterTitle}</span>` : ""}
      <p><strong>${index + 1}. ${exercise.question}</strong></p>
      <details>
        <summary>Antwort anzeigen</summary>
        <p><strong>Antwort:</strong> ${exercise.answer}</p>
        ${exercise.explanation ? `<p><strong>Erklaerung:</strong> ${exercise.explanation}</p>` : ""}
        ${options.chapterId ? `<a class="text-link" href="#reader/${options.chapterId}">Kapitel oeffnen</a>` : ""}
        ${checkKey ? `
          <div class="self-check" aria-label="Autoavaliacao">
            <span class="small-note">Depois de responder:</span>
            <div class="self-check-actions">
              <button
                class="button secondary ${check === "correct" ? "active-check" : ""}"
                type="button"
                data-exercise-check="correct"
                data-check-key="${checkKey}"
                data-check-chapter="${options.chapterId || ""}"
              >Acertei</button>
              <button
                class="button secondary ${check === "wrong" ? "active-check wrong" : ""}"
                type="button"
                data-exercise-check="wrong"
                data-check-key="${checkKey}"
                data-check-chapter="${options.chapterId || ""}"
              >Errei / revisar</button>
            </div>
          </div>
        ` : ""}
      </details>
    </div>
  `;
}
