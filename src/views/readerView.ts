import type { AppContext } from "../appContext";
import {
  findChapter,
  getChapterExerciseStats,
  getChapterIndex,
  getChapterLearningSituation,
  getChapterModule,
  getChapterReadiness,
  getChapterVocabulary,
  getEstimatedSessionMinutes,
  getNextSessionTab,
  getReadingMinutes,
  getResumeTab,
  getSessionProgress,
  getVisitedSteps,
  getVocabStats,
  isCompleted,
  exerciseCheckKey,
  sortByCheckPriority,
  vocabCheckKey,
  READER_STEPS
} from "../domain/course";
import { getJourneyProgress, getNextJourneyHref } from "../domain/journey";
import type { Chapter, ChapterFullContent, ContentBlock, Diagram, ReaderTab } from "../types";
import {
  confidenceControls,
  escapeAttribute,
  escapeHtml,
  list,
  paragraphs,
  readinessBadge,
  vocabularyRecallCards,
  vocabularyTable
} from "../ui/html";
import { exerciseCard } from "../ui/components";
import { hasMasteryEvidence, evaluateMasteryGate } from "../domain/learning/masteryGate";
import { getNormalizedCourseData } from "../data/normalizedCourse";

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
  const readiness = getChapterReadiness(ctx.data, ctx.state, chapter);
  const vocabRows = getChapterVocabulary(ctx.data, chapter);
  const exerciseTotal = (chapter.fullContent
    ? [...chapter.fullContent.exercises.easy, ...chapter.fullContent.exercises.intermediate, ...chapter.fullContent.exercises.ap1Style]
    : chapter.exercises).length;
  const exerciseStats = getChapterExerciseStats(ctx.state, chapter.id, exerciseTotal);
  const vocabStats = getVocabStats(ctx.state, chapter.id, vocabRows.length);
  const stepCoach = getStepCoach(currentStep.id);
  const journey = getJourneyProgress(ctx.data, ctx.state);
  const nextJourneyHref = getNextJourneyHref(ctx.data, ctx.state);

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
          ${readinessBadge(readiness)}
        </div>

        <section class="session-guide" aria-label="Fluxo da sessao" data-swipe-tabs>
          <div class="session-guide-copy">
            <span class="card-label">Fluxo guiado · ${session.completed}/${session.total}</span>
            <strong>${currentStep.label}</strong>
            <p>${stepCoach.goal}</p>
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

        <section class="journey-reader-bar panel" aria-label="Posicao na jornada">
          <div>
            <span class="ds-caption">Jornada AP1</span>
            <p class="ds-aux">${journey.completed}/${journey.total} capitulos · ${journey.percent}% da trilha</p>
          </div>
          ${ctx.state.activeStudySession && ctx.state.activeStudySession.status !== "completed"
            ? `<a class="button accent" href="#session">Voltar a sessao focada</a>`
            : `<a class="button accent" href="${nextJourneyHref}">Proximo passo na jornada</a>`}
          <a class="button secondary" href="#home">Ver linha do tempo</a>
        </section>

        <section class="step-coach panel soft-panel" aria-label="Guia da etapa atual">
          <div>
            <span class="card-label">Etapa atual</span>
            <h2>${currentStep.label}</h2>
            <p>${stepCoach.goal}</p>
            <p class="small-note">Para concluir bem esta etapa: ${stepCoach.done}</p>
          </div>
          <div class="step-coach-actions">
            ${nextTab
              ? `<button class="button" type="button" data-session-next="${chapter.id}" data-next-tab="${nextTab}">Concluir e ir para ${READER_STEPS.find((step) => step.id === nextTab)?.label || "proxima etapa"}</button>`
              : `<a class="button" href="#review">Fechar e revisar erros</a>`
            }
            <a class="button secondary" href="#reader/${chapter.id}/${currentStep.id}">Focar nesta etapa</a>
          </div>
        </section>

        <div class="article-body" id="session-content">
          ${tabContent(ctx, chapter, ctx.ui.readerTab)}

          ${!nextTab ? renderSessionEvidence(ctx, chapter, readiness, session, exerciseStats, vocabStats, done) : ""}

          <section class="session-next-bar desktop-session-bar">
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
                <span class="card-label">Fechar sessao</span>
                <p>${readiness.label}. Revise a evidencia acima antes de concluir.</p>
                ${renderCompleteGateNote(ctx, chapter.id, session, exerciseStats)}
              </div>
              <div class="session-close-actions">
                ${renderCompleteButton(ctx, chapter.id, done, session, exerciseStats)}
                ${next ? `<a class="button secondary" href="#reader/${next.id}/${getResumeTab(ctx.state, next.id)}">Proximo: ${next.title}</a>` : `<a class="button secondary" href="#exam/drill">Treino AP1</a>`}
              </div>
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
              rows="5"
              placeholder="Escreva suas observacoes, termos em alemao ou duvidas deste capitulo..."
            >${escapeHtml(note)}</textarea>
          </section>
        </div>
      </article>

      <aside class="reader-side">
        <div class="panel">
          <a class="text-link back-link" href="#course">Voltar a trilha</a>
          <div class="actions">
            ${previous ? `<a class="button secondary" href="#reader/${previous.id}/${getResumeTab(ctx.state, previous.id)}">Anterior</a>` : ""}
            ${next ? `<a class="button secondary" href="#reader/${next.id}/${getResumeTab(ctx.state, next.id)}">Proximo capitulo</a>` : ""}
            ${renderCompleteButton(ctx, chapter.id, done, session, exerciseStats)}
          </div>
          ${renderCompleteGateNote(ctx, chapter.id, session, exerciseStats)}
          ${session.percent < 100 && !done && ctx.ui.completeGateChapterId !== chapter.id ? `
            <p class="small-note">Dica: complete as ${session.total} etapas antes de marcar como concluido.</p>
          ` : ""}
          ${confidenceControls(ctx.state, chapter, confidenceGateOptions(ctx, chapter.id))}
          <details class="reader-more-tools">
            <summary>Ferramentas de leitura</summary>
            <div class="reader-tools">
              <span class="small-note">Tamanho do texto</span>
              <div class="segmented-control compact" aria-label="Tamanho do texto">
                ${sizeSegment("normal", "Normal", ctx.state.preferences.readingSize)}
                ${sizeSegment("large", "Grande", ctx.state.preferences.readingSize)}
              </div>
              <button class="button secondary" type="button" data-print-chapter>Imprimir capitulo</button>
              ${session.completed > 0 ? `
                <button class="button secondary" type="button" data-reset-session="${chapter.id}">
                  Reiniciar sessao guiada
                </button>
                <p class="small-note">Limpa as etapas visitadas para refazer o fluxo de 5 passos.</p>
              ` : ""}
            </div>
          </details>
        </div>

        <details class="panel chapter-mini-wrap">
          <summary>Capitulos proximos</summary>
          <nav class="chapter-mini-list" aria-label="Capitulos">
            ${ctx.data.chapters.slice(Math.max(0, index - 6), index + 7).map((item) => `
              <a class="${item.id === chapter.id ? "active" : ""}" href="#reader/${item.id}">
                ${isCompleted(ctx.state, item.id) ? "OK " : ""}${item.title}
              </a>
            `).join("")}
          </nav>
        </details>
      </aside>

      <div class="mobile-study-dock" aria-label="Acoes da sessao">
        <div class="mobile-dock-tabs" data-swipe-tabs aria-label="Etapas da sessao">
          ${READER_STEPS.map((step) => {
            const visited = getVisitedSteps(ctx.state, chapter.id).includes(step.id);
            const active = step.id === ctx.ui.readerTab;
            return `
              <button
                class="mobile-dock-tab ${visited ? "visited" : ""} ${active ? "active" : ""}"
                type="button"
                data-reader-tab="${step.id}"
                data-reader-chapter="${chapter.id}"
              >${step.label}</button>
            `;
          }).join("")}
        </div>
        ${nextTab ? `
          <button class="button" type="button" data-session-next="${chapter.id}" data-next-tab="${nextTab}">
            Avancar: ${READER_STEPS.find((step) => step.id === nextTab)?.label || "proximo"}
          </button>
        ` : `
          <div class="mobile-dock-confidence">
            ${confidenceControls(ctx.state, chapter, confidenceGateOptions(ctx, chapter.id))}
          </div>
          ${renderCompleteGateNote(ctx, chapter.id, session, exerciseStats)}
          ${renderCompleteButton(ctx, chapter.id, done, session, exerciseStats)}
          ${next
            ? `<a class="button secondary" href="#reader/${next.id}/${getResumeTab(ctx.state, next.id)}">Proximo: ${next.title}</a>`
            : `<a class="button secondary" href="#exam/drill">Treino AP1</a>`}
        `}
        <div class="mobile-study-meta">
          <span>${session.completed}/${session.total} · ${readiness.label}</span>
          ${exerciseStats.wrong ? `<button class="text-link" type="button" data-show-wrong-practice="${chapter.id}">Ver erros (${exerciseStats.wrong})</button>` : `<a class="text-link" href="#course">Trilha</a>`}
        </div>
      </div>
    </section>
  `;
}

function getStepCoach(tab: ReaderTab): { goal: string; done: string } {
  if (tab === "explain") {
    return {
      goal: "Entender o conceito central e identificar onde ele aparece na prova AP1.",
      done: "você consegue explicar a ideia em 2 frases, sem consultar o texto"
    };
  }
  if (tab === "praxis") {
    return {
      goal: "Conectar a teoria a um cenário real de trabalho de infraestrutura/suporte.",
      done: "você consegue descrever um caso real e a decisão técnica tomada"
    };
  }
  if (tab === "vocab") {
    return {
      goal: "Fixar termos DE/PT críticos para perguntas curtas e interpretação de enunciado.",
      done: "você acerta os principais termos sem abrir a resposta"
    };
  }
  if (tab === "practice") {
    return {
      goal: "Treinar aplicação ativa e reduzir erros recorrentes antes do AP1-check.",
      done: "você respondeu e marcou Acertei/Errei em pelo menos 1 exercício"
    };
  }
  return {
    goal: "Consolidar a evidência da sessão e preparar revisão de pontos fracos.",
    done: "você identifica o que já domina e o que precisa voltar na revisão"
  };
}

function renderCompleteButton(
  ctx: AppContext,
  chapterId: string,
  done: boolean,
  session: { completed: number; total: number; percent: number },
  exerciseStats: { answered: number }
): string {
  const mastered = hasMasteryEvidence(ctx.state, chapterId);
  if (mastered) {
    return `<a class="button complete" href="#mastery/${escapeAttribute(chapterId)}">Domínio comprovado</a>`;
  }

  let mission = null as ReturnType<typeof getNormalizedCourseData>["missionsById"][string] | null;
  try {
    mission = getNormalizedCourseData().missionsById[chapterId] || null;
  } catch {
    mission = null;
  }
  const gate = evaluateMasteryGate(ctx.state, chapterId, mission);
  if (gate.allowed) {
    return `<a class="button accent" href="#mastery/${escapeAttribute(chapterId)}">Provar domínio agora</a>`;
  }

  const gated = ctx.ui.completeGateChapterId === chapterId;
  if (done) {
    return `<button class="button secondary" type="button" data-complete="${chapterId}">Estudo marcado (sem domínio)</button>`;
  }
  if (gated) {
    return `
      <button class="button secondary" type="button" data-complete="${chapterId}" data-complete-confirm="true">
        Só marcar estudo (sem domínio)
      </button>
      <button class="button secondary" type="button" data-complete-cancel="${chapterId}">Cancelar</button>
    `;
  }
  const soft = session.percent < 100 || exerciseStats.answered < 3;
  return `
    <button class="button ${soft ? "soft-complete" : "secondary"}" type="button" data-complete="${chapterId}">
      ${soft ? "Marcar estudo incompleto" : "Marcar estudo (sem domínio)"}
    </button>
  `;
}

function renderCompleteGateNote(
  ctx: AppContext,
  chapterId: string,
  session: { completed: number; total: number; percent: number },
  exerciseStats: { answered: number }
): string {
  if (ctx.ui.completeGateChapterId !== chapterId) return "";
  const reasons: string[] = [];
  if (session.percent < 100) {
    reasons.push(`Você visitou ${session.completed} de ${session.total} etapas.`);
  }
  if (exerciseStats.answered < 3) {
    reasons.push("Ainda há pouca prática marcada (Acertei/Errei).");
  }
  if (!hasMasteryEvidence(ctx.state, chapterId)) {
    reasons.push("Isso só marca estudo — domínio exige o teste.");
  }
  return `
    <p class="session-gate-note" role="status">
      ${reasons.join(" ")} Confirme se quiser marcar o estudo mesmo assim.
    </p>
  `;
}

function tabContent(ctx: AppContext, chapter: Chapter, tab: ReaderTab): string {
  if (tab === "praxis") return praxisTab(ctx, chapter);
  if (tab === "vocab") return vocabTab(ctx, chapter);
  if (tab === "practice") return practiceTab(ctx, chapter);
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
  const rawRows = getChapterVocabulary(ctx.data, chapter);
  const rows = sortByCheckPriority(
    rawRows.map((row, index) => ({ row, index })),
    (item) => ctx.state.vocabChecks[vocabCheckKey(chapter.id, item.index)]
  );
  const mode = ctx.ui.readerVocabMode;
  const total = rows.length;
  const index = total ? ((ctx.ui.readerVocabIndex % total) + total) % total : 0;
  const current = rows[index];
  const key = current ? vocabCheckKey(chapter.id, current.index) : "";
  const check = key ? ctx.state.vocabChecks[key] : undefined;
  const attempt = key ? (ctx.state.vocabAttempts?.[key] || "") : "";
  const revealed = Boolean(check);
  const row = current?.row;

  return `
    <section class="chapter-section">
      <div class="practice-head">
        <h2>Active Recall</h2>
        <div class="segmented-control compact" aria-label="Modo do Wortschatz">
          <button class="${mode === "flash" ? "active" : ""}" type="button" data-filter-group="reader-vocab-mode" data-filter-value="flash">Flash</button>
          <button class="${mode === "grid" ? "active" : ""}" type="button" data-filter-group="reader-vocab-mode" data-filter-value="grid">Grade</button>
        </div>
      </div>
      <p>Escreva o significado (DE→PT) <strong>antes</strong> de ver a resposta. Isso gera evidência real de aprendizagem.</p>
      ${mode === "flash" && row ? `
        <section class="review-focus" aria-label="Flash Wortschatz">
          <div class="focus-stage" data-swipe-deck="reader-vocab">
            <article class="focus-card-big ${check ? `checked-${check}` : ""}">
              <span class="card-label">Termo ${index + 1}/${total}</span>
              <h2>${row.de}</h2>
              <p class="focus-prompt">Digite o significado em português:</p>
              <label class="sr-only" for="vocab-attempt-input">Sua resposta</label>
              <textarea
                id="vocab-attempt-input"
                class="note-area production-attempt"
                rows="2"
                placeholder="Ex.: direitos e deveres do aprendiz"
                data-vocab-attempt="${escapeAttribute(key)}"
                data-vocab-expected="${escapeAttribute(row.pt)}"
                ${check ? "readonly" : ""}
              >${escapeHtml(attempt)}</textarea>
              ${!revealed ? `
                <button class="button accent" type="button" data-vocab-submit="${escapeAttribute(key)}" data-vocab-expected="${escapeAttribute(row.pt)}" data-check-chapter="${chapter.id}" data-auto-advance="reader-vocab">
                  Conferir resposta
                </button>
              ` : `
                <div class="production-feedback ${check === "correct" ? "is-correct" : "is-wrong"}" role="status">
                  <p><strong>${check === "correct" ? "Produção correta" : "Revise este termo"}</strong></p>
                  <p><strong>Esperado:</strong> ${escapeHtml(row.pt)}</p>
                  <p>${escapeHtml(row.explanation)}</p>
                  <p class="small-note">${escapeHtml(row.example)}</p>
                </div>
                <div class="self-check-actions">
                  <button class="button secondary ${check === "correct" ? "active-check" : ""}" type="button" data-vocab-check="correct" data-check-key="${key}" data-check-chapter="${chapter.id}" data-auto-advance="reader-vocab">Manter acerto</button>
                  <button class="button secondary ${check === "wrong" ? "active-check wrong" : ""}" type="button" data-vocab-check="wrong" data-check-key="${key}" data-check-chapter="${chapter.id}" data-auto-advance="reader-vocab">Marcar para revisar</button>
                </div>
              `}
            </article>
          </div>
          <div class="focus-controls">
            <button class="button secondary" type="button" data-reader-vocab-step="-1">Anterior</button>
            <span class="focus-count">${index + 1} / ${total}</span>
            <button class="button" type="button" data-reader-vocab-step="1">Proximo</button>
          </div>
        </section>
      ` : vocabularyRecallCards(rawRows, chapter.id, ctx.state.vocabChecks, ctx.state.vocabAttempts || {})}
    </section>
    <details class="vocab-table-details">
      <summary>Ver tabela completa</summary>
      ${vocabularyTable(rawRows)}
    </details>
  `;
}

function practiceTab(ctx: AppContext, chapter: Chapter): string {
  const content = chapter.fullContent;
  const exercises = content
    ? [...content.exercises.easy, ...content.exercises.intermediate, ...content.exercises.ap1Style]
    : chapter.exercises;
  const stats = getChapterExerciseStats(ctx.state, chapter.id, exercises.length);
  const filter = ctx.ui.practiceFilter;
  const mode = ctx.ui.readerPracticeMode;
  const visible = sortByCheckPriority(
    exercises
      .map((exercise, index) => ({ exercise, index }))
      .filter(({ index }) => {
        if (filter !== "wrong") return true;
        return ctx.state.exerciseChecks[exerciseCheckKey(chapter.id, index)] === "wrong";
      }),
    (item) => ctx.state.exerciseChecks[exerciseCheckKey(chapter.id, item.index)]
  );
  const total = visible.length;
  const flashIndex = total ? ((ctx.ui.readerPracticeIndex % total) + total) % total : 0;
  const current = visible[flashIndex];

  return `
    <section class="chapter-section">
      <div class="practice-head">
        <h2>Uebungen</h2>
        <p class="small-note">${stats.answered} respondidas · ${stats.correct} corretas · ${stats.wrong} para revisar</p>
      </div>
      <div class="practice-toolbar">
        <div class="segmented-control compact" aria-label="Modo das Uebungen">
          <button class="${mode === "flash" ? "active" : ""}" type="button" data-filter-group="reader-practice-mode" data-filter-value="flash">Flash</button>
          <button class="${mode === "list" ? "active" : ""}" type="button" data-filter-group="reader-practice-mode" data-filter-value="list">Lista</button>
        </div>
        <div class="segmented-control compact" aria-label="Filtrar exercicios">
          <button class="${filter === "all" ? "active" : ""}" type="button" data-filter-group="practice-filter" data-filter-value="all">Todos</button>
          <button class="${filter === "wrong" ? "active" : ""}" type="button" data-filter-group="practice-filter" data-filter-value="wrong">So erros (${stats.wrong})</button>
        </div>
      </div>
      <p>Escreva sua resposta <strong>antes</strong> de ver o gabarito. Sem produção, não há evidência.</p>
      ${!total ? `<p class="empty-state">${filter === "wrong" ? "Nenhum erro marcado neste capitulo." : "Nenhum exercicio neste capitulo."}</p>` : ""}
      ${total && mode === "flash" && current ? `
        <section class="review-focus" aria-label="Flash Uebungen">
          <div class="focus-stage" data-swipe-deck="reader-practice">
            ${renderPracticeFlash(ctx, chapter.id, current.exercise, current.index, flashIndex, total)}
          </div>
          <div class="focus-controls">
            <button class="button secondary" type="button" data-reader-practice-step="-1">Anterior</button>
            <span class="focus-count">${flashIndex + 1} / ${total}</span>
            <button class="button" type="button" data-reader-practice-step="1">Proximo</button>
          </div>
        </section>
      ` : ""}
      ${total && mode === "list" ? visible.map(({ exercise, index }) => exerciseCard(exercise, index, {
        chapterId: chapter.id,
        checkKey: exerciseCheckKey(chapter.id, index),
        check: ctx.state.exerciseChecks[exerciseCheckKey(chapter.id, index)]
      })).join("") : ""}
    </section>
  `;
}

function renderPracticeFlash(
  ctx: AppContext,
  chapterId: string,
  exercise: { question: string; answer: string; explanation?: string },
  exerciseIndex: number,
  displayIndex: number,
  total: number
): string {
  const checkKey = exerciseCheckKey(chapterId, exerciseIndex);
  const check = ctx.state.exerciseChecks[checkKey];
  const attempt = ctx.state.practiceAttempts?.[checkKey] || "";
  const revealed = Boolean(check) || Boolean(ctx.state.practiceRevealed?.[checkKey]);
  return `
    <article class="focus-card-big ${check ? `checked-${check}` : ""}">
      <span class="card-label">Uebung ${displayIndex + 1}/${total}</span>
      <h2>Aufgabe</h2>
      <p class="focus-question">${exercise.question}</p>
      <label class="sr-only" for="practice-attempt-input">Sua resposta</label>
      <textarea
        id="practice-attempt-input"
        class="note-area production-attempt"
        rows="3"
        placeholder="Escreva sua resposta aqui antes de conferir"
        data-practice-attempt="${escapeAttribute(checkKey)}"
        ${check ? "readonly" : ""}
      >${escapeHtml(attempt)}</textarea>
      ${!revealed ? `
        <button
          class="button accent"
          type="button"
          data-practice-submit="${escapeAttribute(checkKey)}"
          data-check-chapter="${escapeAttribute(chapterId)}"
          data-auto-advance="reader-practice"
        >Conferir com gabarito</button>
      ` : `
        <div class="production-feedback" role="status">
          <p><strong>Gabarito:</strong> ${escapeHtml(exercise.answer)}</p>
          ${exercise.explanation ? `<p><strong>Erklaerung:</strong> ${escapeHtml(exercise.explanation)}</p>` : ""}
          <p class="ds-aux">Compare com o que você escreveu e marque com honestidade.</p>
        </div>
        <div class="self-check-actions">
          <button
            class="button secondary ${check === "correct" ? "active-check" : ""}"
            type="button"
            data-exercise-check="correct"
            data-check-key="${checkKey}"
            data-check-chapter="${chapterId}"
            data-auto-advance="reader-practice"
          >Acertei</button>
          <button
            class="button secondary ${check === "wrong" ? "active-check wrong" : ""}"
            type="button"
            data-exercise-check="wrong"
            data-check-key="${checkKey}"
            data-check-chapter="${chapterId}"
            data-auto-advance="reader-practice"
          >Errei / revisar</button>
        </div>
      `}
    </article>
  `;
}

function ap1Tab(ctx: AppContext, chapter: Chapter): string {
  const content = chapter.fullContent;
  let mission = null as ReturnType<typeof getNormalizedCourseData>["missionsById"][string] | null;
  try {
    mission = getNormalizedCourseData().missionsById[chapter.id] || null;
  } catch {
    mission = null;
  }
  const gate = evaluateMasteryGate(ctx.state, chapter.id, mission);
  const applyActivities = mission?.phases.apply.activities || [];
  let criteriaIndex = 0;
  const applyBlock = applyActivities.length ? `
    <section class="chapter-section apply-task-card" aria-label="Tarefa aplicada">
      <h2>Tarefa aplicada (evidência)</h2>
      <p class="ds-aux">Marque os critérios que você consegue cumprir de verdade. Isso libera o teste de domínio.</p>
      ${applyActivities.map((activity) => {
        const criteria = activity.criteria || [];
        const items = criteria.map((criterion) => {
          const index = criteriaIndex;
          criteriaIndex += 1;
          const key = `${chapter.id}:${index}`;
          const checked = Boolean(ctx.state.applyCriteriaChecks?.[key]);
          return `
            <label class="check-row apply-criteria-row">
              <input type="checkbox" data-apply-criteria="${escapeAttribute(key)}" ${checked ? "checked" : ""}>
              <span>${escapeHtml(criterion)}</span>
            </label>
          `;
        }).join("");
        return `
          <article class="ds-card apply-activity">
            <h3 class="ds-card-title">${escapeHtml(activity.title || activity.instruction || "Desafio aplicado")}</h3>
            ${activity.modelAnswer ? `<p class="ds-aux">Dica de qualidade: compare depois com um modelo mental curto (não copie).</p>` : ""}
            <div class="apply-criteria-list">${items}</div>
          </article>
        `;
      }).join("")}
      <p class="ds-aux">${gate.applyDone ? "Critérios suficientes marcados." : "Ainda faltam critérios para liberar o domínio."}</p>
    </section>
  ` : "";

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
    ${applyBlock}
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
      ${confidenceControls(ctx.state, chapter, confidenceGateOptions(ctx, chapter.id))}
    </section>
    <section class="chapter-section mastery-gate-card" aria-label="Teste de domínio">
      <h2>Provar domínio</h2>
      <p class="ds-aux">${escapeHtml(gate.reason)}</p>
      <p class="ds-aux">Prática: ${gate.practiceAnswered} respostas · ${gate.practiceScore ?? 0}% acertos${gate.applyRequired ? ` · Apply: ${gate.applyDone ? "ok" : "pendente"}` : ""}</p>
      ${gate.allowed
        ? `<a class="button accent" href="#mastery/${escapeAttribute(chapter.id)}">Iniciar teste de domínio</a>`
        : `<a class="button secondary" href="#reader/${escapeAttribute(chapter.id)}/practice">Voltar à prática</a>`}
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

function renderSessionEvidence(
  ctx: AppContext,
  chapter: Chapter,
  readiness: ReturnType<typeof getChapterReadiness>,
  session: { completed: number; total: number; percent: number },
  exerciseStats: { correct: number; wrong: number; answered: number; total: number },
  vocabStats: { correct: number; wrong: number; answered: number; total: number },
  done: boolean
): string {
  const confidence = ctx.state.confidence[chapter.id];
  const gaps = [
    session.percent < 100 ? "Etapas da sessao incompletas" : "",
    exerciseStats.answered === 0 ? "Nenhum exercicio autoavaliado" : "",
    exerciseStats.wrong > 0 ? `${exerciseStats.wrong} erro(s) em exercicios` : "",
    vocabStats.answered === 0 ? "Vocabulario ainda sem recall" : "",
    vocabStats.wrong > 0 ? `${vocabStats.wrong} termo(s) fracos` : "",
    !confidence ? "Confianca nao marcada" : ""
  ].filter(Boolean);

  return `
    <section class="session-evidence" aria-label="Evidencia da sessao">
      <div class="session-evidence-head">
        <div>
          <span class="card-label">Evidencia de aprendizado</span>
          <h2>${readiness.label}</h2>
          <p>Use isto para decidir se conclui ou se ainda precisa revisar.</p>
        </div>
        ${readinessBadge(readiness)}
      </div>
      <div class="evidence-grid">
        <article>
          <span>Sessao</span>
          <strong>${session.completed}/${session.total}</strong>
        </article>
        <article>
          <span>Exercicios</span>
          <strong>${exerciseStats.correct} ok · ${exerciseStats.wrong} erro</strong>
        </article>
        <article>
          <span>Wortschatz</span>
          <strong>${vocabStats.correct} ok · ${vocabStats.wrong} erro</strong>
        </article>
        <article>
          <span>Status</span>
          <strong>${done ? "Concluido" : "Em aberto"}</strong>
        </article>
      </div>
      ${gaps.length ? `
        <ul class="evidence-gaps">
          ${gaps.map((gap) => `<li>${gap}</li>`).join("")}
        </ul>
      ` : `<p class="small-note">Boa evidencia. Voce pode marcar confianca e concluir com mais seguranca.</p>`}
      ${confidenceControls(ctx.state, chapter, confidenceGateOptions(ctx, chapter.id))}
    </section>
  `;
}

function confidenceGateOptions(ctx: AppContext, chapterId: string): { gateMessage?: string } {
  if (ctx.ui.confidenceGateChapterId !== chapterId || !ctx.ui.confidenceGateMessage) return {};
  return { gateMessage: ctx.ui.confidenceGateMessage };
}
