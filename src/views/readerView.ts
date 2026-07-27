import type { AppContext } from "../appContext";
import {
  findChapter,
  getChapterIndex,
  getChapterLearningSituation,
  getChapterModule,
  getChapterVocabulary,
  getEstimatedSessionMinutes,
  getNextSessionTab,
  getReadingMinutes,
  getSessionProgress,
  getVisitedSteps,
  isCompleted,
  READER_STEPS
} from "../domain/course";
import type { Chapter, ChapterFullContent, ContentBlock, Diagram, ReaderTab } from "../types";
import {
  confidenceControls,
  escapeHtml,
  list,
  paragraphs,
  vocabularyTable
} from "../ui/html";
import { exerciseCard } from "../ui/components";

export function renderReaderView(ctx: AppContext, chapterId: string): string {
  const chapter = findChapter(ctx.data, chapterId) || ctx.data.chapters[0];
  const index = getChapterIndex(ctx.data, chapter.id);
  const previous = ctx.data.chapters[index - 1];
  const next = ctx.data.chapters[index + 1];
  const done = isCompleted(ctx.state, chapter.id);
  const note = ctx.state.notes[chapter.id] || "";
  const module = getChapterModule(ctx.data, chapter.id);
  const session = getSessionProgress(ctx.state, chapter.id);
  const nextTab = getNextSessionTab(ctx.state, chapter.id, ctx.ui.readerTab);
  const currentStep = READER_STEPS.find((step) => step.id === ctx.ui.readerTab) || READER_STEPS[0];
  const minutes = getEstimatedSessionMinutes(chapter);

  return `
    <section class="reader">
      <article class="article">
        <div class="reader-kicker">
          <p class="eyebrow">${module?.subtitle || ctx.data.course.title}</p>
          <span class="reader-session-pill">${session.completed}/${session.total} etapas · ${minutes} min</span>
        </div>
        <h1>${chapter.title}</h1>
        <div class="reader-meta">
          <span>${chapter.studyTime || `${getReadingMinutes(chapter)} min leitura`}</span>
          <span>${index + 1} de ${ctx.data.chapters.length}</span>
          <span>${done ? "Concluido" : "Em estudo"}</span>
        </div>

        <section class="session-guide" aria-label="Fluxo da sessao">
          <div class="session-guide-copy">
            <span class="card-label">Fluxo guiado</span>
            <strong>${currentStep.label}</strong>
            <p>${currentStep.hint}</p>
          </div>
          <div class="session-guide-track" role="list">
            ${READER_STEPS.map((step) => {
              const visited = getVisitedSteps(ctx.state, chapter.id).includes(step.id);
              const active = step.id === ctx.ui.readerTab;
              return `
                <button
                  class="session-guide-step ${visited ? "done" : ""} ${active ? "active" : ""}"
                  type="button"
                  role="listitem"
                  data-reader-tab="${step.id}"
                  data-reader-chapter="${chapter.id}"
                >
                  <span>${step.label}</span>
                </button>
              `;
            }).join("")}
          </div>
          <div class="session-progress-line" aria-hidden="true">
            <div style="width: ${session.percent}%"></div>
          </div>
        </section>

        <div class="article-body">
          ${readerTabs(ctx, chapter)}
          ${tabContent(ctx, chapter, ctx.ui.readerTab)}

          <section class="session-next-bar">
            ${nextTab ? `
              <div>
                <span class="card-label">Proximo passo</span>
                <p>${READER_STEPS.find((step) => step.id === nextTab)?.label || "Continuar"}</p>
              </div>
              <button class="button" type="button" data-session-next="${chapter.id}" data-next-tab="${nextTab}">
                Avancar na sessao
              </button>
            ` : `
              <div>
                <span class="card-label">Sessao completa</span>
                <p>Marque a confianca e conclua o capitulo.</p>
              </div>
              <button class="button ${done ? "complete" : ""}" type="button" data-complete="${chapter.id}">
                ${done ? "Concluido" : "Marcar como concluido"}
              </button>
            `}
          </section>

          <section class="notes-box">
            <div>
              <h2>Anotacoes</h2>
              <p>Salvas offline neste navegador.</p>
            </div>
            <textarea
              class="notes-input"
              data-note="${chapter.id}"
              rows="7"
              placeholder="Escreva suas observacoes, termos em alemao ou duvidas deste capitulo..."
            >${escapeHtml(note)}</textarea>
          </section>
        </div>
      </article>

      <aside class="reader-side">
        <div class="panel">
          <a class="text-link back-link" href="#course">Voltar a trilha</a>
          <div class="actions">
            ${previous ? `<a class="button secondary" href="#reader/${previous.id}">Anterior</a>` : ""}
            ${next ? `<a class="button secondary" href="#reader/${next.id}">Proximo capitulo</a>` : ""}
            <button class="button ${done ? "complete" : ""}" data-complete="${chapter.id}">
              ${done ? "Concluido" : "Marcar como concluido"}
            </button>
          </div>
          ${session.percent < 100 && !done ? `
            <p class="small-note">Dica: complete as ${session.total} etapas antes de marcar como concluido.</p>
          ` : ""}
          ${confidenceControls(ctx.state, chapter)}
          <div class="reader-tools">
            <span class="small-note">Leitura</span>
            <div class="segmented-control compact" aria-label="Tamanho do texto">
              ${sizeSegment("normal", "Normal", ctx.state.preferences.readingSize)}
              ${sizeSegment("large", "Grande", ctx.state.preferences.readingSize)}
            </div>
            <button class="button secondary" type="button" data-print-chapter>Imprimir capitulo</button>
          </div>
        </div>

        <nav class="panel chapter-mini-list" aria-label="Capitulos">
          ${ctx.data.chapters.slice(Math.max(0, index - 6), index + 7).map((item) => `
            <a class="${item.id === chapter.id ? "active" : ""}" href="#reader/${item.id}">
              ${isCompleted(ctx.state, item.id) ? "OK " : ""}${item.title}
            </a>
          `).join("")}
        </nav>
      </aside>
    </section>
  `;
}

function readerTabs(ctx: AppContext, chapter: Chapter): string {
  return `
    <div class="reader-tabs" aria-label="Kapitelbereiche">
      ${READER_STEPS.map((step) => `
        <button
          class="${ctx.ui.readerTab === step.id ? "active" : ""} ${getVisitedSteps(ctx.state, chapter.id).includes(step.id) ? "visited" : ""}"
          type="button"
          data-reader-tab="${step.id}"
          data-reader-chapter="${chapter.id}"
        >${step.label}</button>
      `).join("")}
    </div>
  `;
}

function tabContent(ctx: AppContext, chapter: Chapter, tab: ReaderTab): string {
  if (tab === "praxis") return praxisTab(ctx, chapter);
  if (tab === "vocab") return vocabTab(ctx, chapter);
  if (tab === "practice") return practiceTab(chapter);
  if (tab === "ap1") return ap1Tab(ctx, chapter);
  return explainTab(chapter);
}

function explainTab(chapter: Chapter): string {
  const content = chapter.fullContent;
  if (!content) {
    return `
      <section class="chapter-section">
        <h2>Grundidee</h2>
        ${paragraphs(chapter.text)}
      </section>
      <section class="info-box summary">
        <h2>Resumo</h2>
        <p>${chapter.summary}</p>
      </section>
    `;
  }

  return `
    <section class="chapter-section compact-grid">
      <div class="info-box">
        <h2>Lernzeit</h2>
        <p>${content.studyTime}</p>
      </div>
      <div class="info-box">
        <h2>Schwierigkeit</h2>
        <p>${content.difficulty}</p>
      </div>
    </section>
    <section class="info-box ihk">
      <h2>Wichtigkeit fuer die AP1</h2>
      <p><strong>${content.importance.stars}</strong></p>
      ${paragraphs(content.importance.explanation)}
    </section>
    <section class="chapter-section">
      <h2>Lernziele</h2>
      ${list(content.objectives)}
    </section>
    <section class="chapter-section">
      <h2>Einfuehrung</h2>
      ${paragraphs(content.introduction)}
    </section>
    <section class="chapter-section">
      <h2>Erklaerung</h2>
      ${content.explanation.map(contentBlock).join("")}
    </section>
  `;
}

function praxisTab(ctx: AppContext, chapter: Chapter): string {
  const content = chapter.fullContent;
  const situation = getChapterLearningSituation(ctx.data, chapter.id);
  const module = getChapterModule(ctx.data, chapter.id);

  return `
    <section class="praxisfall">
      <span class="card-label">JIKU Praxisfall</span>
      <h2>${situation?.title || module?.subtitle || "Berufliche Situation"}</h2>
      <p>Bei JIKU IT-Solutions taucht dieses Thema nicht als isolierte Definition auf, sondern als Aufgabe im Kunden- oder Betriebsprozess.</p>
      <ul>
        <li>Welche Information braucht der Kunde oder das Team?</li>
        <li>Welche Fachwoerter muss ich im Auftrag erkennen?</li>
        <li>Welche Entscheidung oder Kontrolle gehoert zu diesem Kapitel?</li>
        <li>Wie begruende ich die Antwort kurz und pruefungstauglich?</li>
      </ul>
    </section>
    <section class="chapter-section">
      <h2>Beispiel</h2>
      <p class="example">${chapter.example}</p>
    </section>
    ${content ? `
      <section class="chapter-section">
        <h2>Beispiele aus der Praxis</h2>
        ${list(content.realWorldExamples)}
      </section>
      <section class="chapter-section">
        <h2>Praktische Beispiele</h2>
        ${content.practicalExamples.map(contentBlock).join("")}
      </section>
      <section class="chapter-section">
        <h2>Visuelle Denkmodelle</h2>
        ${content.diagrams.map(diagram).join("")}
      </section>
    ` : ""}
  `;
}

function vocabTab(ctx: AppContext, chapter: Chapter): string {
  return `
    <section class="chapter-section">
      <h2>Deutscher Wortschatz</h2>
      ${vocabularyTable(getChapterVocabulary(ctx.data, chapter))}
    </section>
    <section class="info-box summary">
      <h2>Active Recall</h2>
      <p>Decke die portugiesische Bedeutung ab und erklaere den deutschen Begriff zuerst selbst.</p>
    </section>
  `;
}

function practiceTab(chapter: Chapter): string {
  const content = chapter.fullContent;
  const exercises = content
    ? [...content.exercises.easy, ...content.exercises.intermediate, ...content.exercises.ap1Style]
    : chapter.exercises;

  return `
    <section class="chapter-section">
      <h2>Uebungen</h2>
      ${exercises.map((exercise, index) => exerciseCard(exercise, index)).join("")}
    </section>
  `;
}

function ap1Tab(ctx: AppContext, chapter: Chapter): string {
  const content = chapter.fullContent;

  return `
    <section class="info-box ihk">
      <h2>IHK Exam Focus</h2>
      ${content ? ihkFocus(content.ihkFocus) : `<p>${chapter.ihk}</p>`}
    </section>
    <section class="chapter-section">
      <h2>Haeufige Fehler</h2>
      ${list(content?.commonMistakes || [
        `Nur eine Definition zu ${chapter.title} lernen, ohne ein Beispiel zu nennen.`,
        "Deutsche Fachwoerter im Auftrag ueberlesen.",
        "Eine technische Antwort geben, aber keine kurze Begruendung liefern."
      ])}
    </section>
    <section class="info-box summary">
      <h2>Zusammenfassung</h2>
      ${content ? paragraphs(content.summary) : `<p>${chapter.summary}</p>`}
    </section>
    ${content ? `
      <section class="chapter-section">
        <h2>Mindmap</h2>
        ${diagram(content.mindMap)}
      </section>
    ` : ""}
    <section class="chapter-section">
      <h2>Readiness</h2>
      ${list(content?.revisionChecklist || [
        `Ich kann ${chapter.title} in einfachem Deutsch erklaeren.`,
        "Ich kenne die wichtigsten Fachwoerter.",
        "Ich kann ein Praxisbeispiel nennen.",
        "Ich kann eine kurze AP1-Antwort formulieren."
      ])}
      ${confidenceControls(ctx.state, chapter)}
    </section>
  `;
}

function contentBlock(block: ContentBlock): string {
  return `
    <div class="content-block">
      <h3>${block.title}</h3>
      ${paragraphs(block.paragraphs)}
      ${block.steps ? list(block.steps) : ""}
    </div>
  `;
}

function diagram(item: Diagram): string {
  return `
    <div class="diagram-block">
      <h3>${item.title}</h3>
      <pre><code>${escapeHtml(item.code)}</code></pre>
    </div>
  `;
}

function ihkFocus(focus: ChapterFullContent["ihkFocus"]): string {
  if (!focus) return "";

  return `
    <h3>Was kommt haeufig vor?</h3>
    ${list(focus.appears)}
    <h3>Haeufige Fehler</h3>
    ${list(focus.commonMistakes)}
    <h3>Wichtige Details</h3>
    ${list(focus.importantDetails)}
    <h3>Oft verwechselt</h3>
    ${list(focus.confusedConcepts)}
    <h3>Wortschatz</h3>
    ${list(focus.vocabulary)}
  `;
}

function sizeSegment(value: string, label: string, current: string): string {
  return `
    <button
      class="${current === value ? "active" : ""}"
      type="button"
      data-filter-group="reading-size"
      data-filter-value="${value}"
    >${label}</button>
  `;
}
