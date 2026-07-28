import type { AppContext } from "../appContext";
import { sortByCheckPriority } from "../domain/course";
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
import {
  formatMockExamTimer,
  getMockExamAnsweredCount,
  getMockExamElapsedSeconds,
  getMockExamGradedCount,
  getMockExamPool,
  getMockExamRemainingMs,
  getMockExamTrend,
  getWeakChaptersFromAttempt,
  MOCK_EXAM_PRESETS,
  scoreMockExam
} from "../domain/mockExam";
import type { ExamFocusMode, MockExamAttempt, MockExamLength } from "../types";
import { escapeAttribute, escapeHtml, readinessBadge } from "../ui/html";

export function renderExamView(ctx: AppContext): string {
  const summary = getExamReadinessSummary(ctx.data, ctx.state);
  const mode = ctx.ui.examFocusMode;
  const poolSize = getMockExamPool(ctx.data).length;
  const historyCount = ctx.state.mockExamHistory.length;
  const unfinished = ctx.state.mockExam && ctx.state.mockExam.status !== "finished" ? ctx.state.mockExam : null;

  return `
    <section class="exam-shell">
      ${unfinished && mode !== "mock" ? renderMockResumeBanner(unfinished) : ""}
      <div class="section-head">
        <div>
          <p class="eyebrow">AP1 Pruefungstraining</p>
          <h1>Treine como a IHK pergunta.</h1>
          <p>Foco total na prova: Signalwoerter, drills, checklist e simulados com cronometro.</p>
        </div>
        <div class="panel exam-summary-panel">
          <span class="card-label">Estado para a prova</span>
          <p><strong>${summary.readyCount}</strong> quase prontos</p>
          <p><strong>${summary.weakCount}</strong> pontos fracos</p>
          <p><strong>${poolSize}</strong> perguntas no banco</p>
          <p><strong>${historyCount}</strong> simulado(s) feitos</p>
        </div>
      </div>

      <div class="segmented-control exam-mode-control" aria-label="Modo de treino AP1">
        ${modeButton("mock", "Simulado", mode)}
        ${modeButton("weak", "Pontos fracos", mode)}
        ${modeButton("signals", "Signalwoerter", mode)}
        ${modeButton("drill", "Perguntas AP1", mode)}
        ${modeButton("checklist", "Checklist", mode)}
      </div>

      ${mode === "mock" ? renderMockMode(ctx) : ""}
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

function renderMockMode(ctx: AppContext): string {
  const attempt = ctx.state.mockExam;
  if (!attempt) return renderMockLobby(ctx);
  if (attempt.status === "active") return renderMockActive(attempt);
  if (attempt.status === "grading") return renderMockGrading(attempt);
  return renderMockResults(attempt);
}

function renderMockLobby(ctx: AppContext): string {
  const poolSize = getMockExamPool(ctx.data).length;
  const history = ctx.state.mockExamHistory.slice(0, 5);
  const trend = getMockExamTrend(ctx.state.mockExamHistory);
  const spark = [...ctx.state.mockExamHistory].slice(0, 8).reverse();

  return `
    <section class="mock-lobby" aria-label="Simulado AP1">
      <div class="panel mock-intro">
        <span class="card-label">Simulacao de prova</span>
        <h2>Faca a prova sob pressao de tempo.</h2>
        <p>Perguntas AP1 de varios modulos, sem ver a resposta. No final voce corrige e ve o mapa de erros.</p>
        <div class="chapter-meta">
          <span>${poolSize} perguntas no banco</span>
          <span>Mistura por modulo</span>
          <span>Salvo offline</span>
          ${trend ? `<span class="mock-trend ${trend.improving === true ? "up" : trend.improving === false ? "down" : ""}">${trend.label}</span>` : ""}
        </div>
      </div>

      <div class="mock-preset-grid">
        ${(["short", "full"] as MockExamLength[]).map((length) => {
          const preset = MOCK_EXAM_PRESETS[length];
          return `
            <article class="panel mock-preset-card">
              <span class="card-label">${preset.label}</span>
              <h2>${preset.questionCount} perguntas</h2>
              <p>${preset.description}</p>
              <p class="small-note">${preset.durationMinutes} minutos no cronometro</p>
              <button class="button large" type="button" data-mock-start="${length}">
                Comecar ${preset.label.toLowerCase()}
              </button>
            </article>
          `;
        }).join("")}
      </div>

      ${history.length ? `
        <section class="panel mock-history">
          <span class="card-label">Historico recente</span>
          <h2>Seus simulados</h2>
          ${spark.length > 1 ? `
            <div class="mock-spark" aria-hidden="true">
              ${spark.map((entry) => `
                <span class="mock-spark-bar" style="height: ${Math.max(12, entry.percent)}%" title="${entry.percent}%"></span>
              `).join("")}
            </div>
          ` : ""}
          <div class="mini-list">
            ${history.map((entry) => `
              <div class="mock-history-row">
                <strong>${MOCK_EXAM_PRESETS[entry.length].label} · ${entry.percent}%</strong>
                <span>${entry.correct}/${entry.total} · ${formatElapsed(entry.elapsedSeconds)} · ${formatDate(entry.finishedAt)}</span>
              </div>
            `).join("")}
          </div>
        </section>
      ` : `
        <p class="small-note">Ainda sem historico. O primeiro simulado cria sua linha de base.</p>
      `}
    </section>
  `;
}

function renderMockActive(attempt: MockExamAttempt): string {
  const total = attempt.questions.length;
  const index = Math.min(attempt.currentIndex, total - 1);
  const question = attempt.questions[index];
  const response = attempt.responses[question.id] || {};
  const remainingMs = getMockExamRemainingMs(attempt);
  const answered = getMockExamAnsweredCount(attempt);
  const urgent = remainingMs <= 5 * 60_000;

  return `
    <section class="mock-runner panel" aria-label="Prova em andamento">
      <div class="mock-runner-bar">
        <div>
          <span class="card-label">${MOCK_EXAM_PRESETS[attempt.length].label}</span>
          <p class="small-note">${answered}/${total} marcadas como respondidas</p>
        </div>
        <div class="mock-timer ${urgent ? "urgent" : ""}" data-mock-timer aria-live="polite">
          ${formatMockExamTimer(remainingMs)}
        </div>
      </div>

      <div class="mock-question-nav" aria-label="Navegacao das perguntas">
        ${attempt.questions.map((item, itemIndex) => {
          const done = Boolean(attempt.responses[item.id]?.answered);
          return `
            <button
              class="mock-q-pill ${itemIndex === index ? "active" : ""} ${done ? "answered" : ""}"
              type="button"
              data-mock-goto="${itemIndex}"
              aria-label="Pergunta ${itemIndex + 1}"
            >${itemIndex + 1}</button>
          `;
        }).join("")}
      </div>
      ${answered < total ? `
        <button class="button secondary mock-jump-unanswered" type="button" data-mock-jump-unanswered>
          Ir para a primeira sem resposta (${total - answered})
        </button>
      ` : ""}

      <article class="mock-question-card">
        <span class="card-label">Aufgabe ${index + 1}/${total}</span>
        <p class="exam-chapter-tag">${question.moduleTitle}</p>
        <h2>Situacao de prova</h2>
        <p class="focus-question">${escapeHtml(question.question)}</p>
        <label class="mock-notes-label" for="mock-notes">Rascunho da resposta (opcional)</label>
        <textarea
          id="mock-notes"
          class="notes-input mock-notes"
          rows="5"
          data-mock-notes="${escapeAttribute(question.id)}"
          placeholder="Escreva pontos-chave como na prova: Signalwort, causa, resposta curta..."
        >${escapeHtml(response.notes || "")}</textarea>
        <div class="mock-question-actions">
          <button
            class="button secondary ${response.answered ? "active-check" : ""}"
            type="button"
            data-mock-answered="${escapeAttribute(question.id)}"
          >${response.answered ? "Respondida" : "Marcar como respondida"}</button>
        </div>
      </article>

      <div class="focus-controls">
        <button class="button secondary" type="button" data-mock-step="-1" ${index === 0 ? "disabled" : ""}>Anterior</button>
        <span class="focus-count">${index + 1} / ${total}</span>
        ${index < total - 1
          ? `<button class="button" type="button" data-mock-step="1">Proxima</button>`
          : `<button class="button" type="button" data-mock-submit>Entregar prova</button>`}
      </div>

      <div class="mock-footer-actions">
        <button class="button secondary" type="button" data-mock-submit>Entregar agora</button>
        <button class="text-link" type="button" data-mock-abandon>Abandonar simulado</button>
      </div>
      <p class="small-note">Na prova real nao ha gabarito no meio. Aqui as respostas so abrem depois de entregar.</p>
    </section>
  `;
}

function renderMockGrading(attempt: MockExamAttempt): string {
  const total = attempt.questions.length;
  const index = Math.min(attempt.currentIndex, total - 1);
  const question = attempt.questions[index];
  const response = attempt.responses[question.id] || {};
  const graded = getMockExamGradedCount(attempt);
  const signal = detectSignalWort(question.question);

  return `
    <section class="mock-runner panel" aria-label="Correcao do simulado">
      <div class="mock-runner-bar">
        <div>
          <span class="card-label">Correcao</span>
          <p class="small-note">Compare sua resposta com o gabarito e marque Acertei/Errei.</p>
        </div>
        <div class="mock-timer">${graded}/${total} corrigidas</div>
      </div>

      <div class="mock-question-nav" aria-label="Navegacao da correcao">
        ${attempt.questions.map((item, itemIndex) => {
          const check = attempt.responses[item.id]?.selfCheck;
          return `
            <button
              class="mock-q-pill ${itemIndex === index ? "active" : ""} ${check === "correct" ? "answered" : ""} ${check === "wrong" ? "wrong" : ""}"
              type="button"
              data-mock-goto="${itemIndex}"
            >${itemIndex + 1}</button>
          `;
        }).join("")}
      </div>

      <article class="mock-question-card">
        <span class="card-label">Aufgabe ${index + 1}/${total}</span>
        <p class="exam-chapter-tag">${question.moduleTitle} · ${question.chapterTitle}</p>
        ${signal ? `<p class="exam-signal-tag">Signalwort: <strong>${signal.de}</strong> · ${signal.expect}</p>` : ""}
        <p class="focus-question">${escapeHtml(question.question)}</p>
        ${response.notes ? `
          <div class="mock-your-answer">
            <span class="card-label">Seu rascunho</span>
            <p>${escapeHtml(response.notes)}</p>
          </div>
        ` : ""}
        <div class="mock-official-answer">
          <span class="card-label">Gabarito</span>
          <p><strong>Antwort:</strong> ${escapeHtml(question.answer)}</p>
          ${question.explanation ? `<p><strong>Erklaerung:</strong> ${escapeHtml(question.explanation)}</p>` : ""}
        </div>
        <div class="self-check-actions">
          <button
            class="button secondary ${response.selfCheck === "correct" ? "active-check" : ""}"
            type="button"
            data-mock-grade="correct"
            data-mock-question="${escapeAttribute(question.id)}"
          >Acertei</button>
          <button
            class="button secondary ${response.selfCheck === "wrong" ? "active-check wrong" : ""}"
            type="button"
            data-mock-grade="wrong"
            data-mock-question="${escapeAttribute(question.id)}"
          >Errei</button>
        </div>
        <a class="text-link" href="#reader/${question.chapterId}">Abrir capitulo</a>
      </article>

      <div class="focus-controls">
        <button class="button secondary" type="button" data-mock-step="-1" ${index === 0 ? "disabled" : ""}>Anterior</button>
        <span class="focus-count">${index + 1} / ${total}</span>
        ${index < total - 1
          ? `<button class="button" type="button" data-mock-step="1">Proxima</button>`
          : `<button class="button" type="button" data-mock-finish>Ver resultado</button>`}
      </div>
      <div class="mock-footer-actions">
        <button class="button" type="button" data-mock-finish>Calcular resultado</button>
      </div>
    </section>
  `;
}

function renderMockResults(attempt: MockExamAttempt): string {
  const score = scoreMockExam(attempt);
  const weak = getWeakChaptersFromAttempt(attempt);
  const elapsed = formatElapsed(getMockExamElapsedSeconds(attempt));
  const tone = score.percent >= 80 ? "Bom ritmo de prova" : score.percent >= 60 ? "Quase la" : "Precisa reforcar";

  return `
    <section class="mock-results" aria-label="Resultado do simulado">
      <div class="panel completion-card">
        <span class="card-label">Resultado</span>
        <h2>${score.percent}% · ${tone}</h2>
        <p>${score.correct} certas · ${score.wrong} erradas · ${score.unanswered} sem correcao · tempo ${elapsed}</p>
        <div class="session-focus-actions">
          <button class="button" type="button" data-mock-clear>Novo simulado</button>
          ${score.wrong ? `
            <button class="button secondary" type="button" data-review-mistakes>Revisar erros</button>
            <button class="button secondary" type="button" data-drill-mistakes>Drill so erros</button>
          ` : `
            <button class="button secondary" type="button" data-filter-group="exam-focus" data-filter-value="weak">Pontos fracos</button>
            <a class="button secondary" href="#review">Revisao ativa</a>
          `}
        </div>
      </div>

      ${weak.length ? `
        <section class="panel">
          <span class="card-label">Erros por capitulo</span>
          <h2>Priorize estes temas</h2>
          <div class="mini-list">
            ${weak.map((item) => `
              <a href="#reader/${item.chapterId}">
                <strong>${item.chapterTitle}</strong>
                <span>${item.wrongCount} erro(s) neste simulado</span>
              </a>
            `).join("")}
          </div>
        </section>
      ` : `
        <p class="small-note">Nenhum erro marcado. Mantenha o ritmo com outro simulado ou drills.</p>
      `}

      <details class="review-more">
        <summary>Ver todas as perguntas do simulado</summary>
        <div class="exercise-group">
          ${attempt.questions.map((question, index) => {
            const check = attempt.responses[question.id]?.selfCheck;
            return `
              <article class="exercise ${check ? `checked-${check}` : ""}">
                <span class="card-label">${index + 1}. ${question.chapterTitle}</span>
                <p><strong>${escapeHtml(question.question)}</strong></p>
                <p><strong>Antwort:</strong> ${escapeHtml(question.answer)}</p>
                <a class="text-link" href="#reader/${question.chapterId}">Abrir capitulo</a>
              </article>
            `;
          }).join("")}
        </div>
      </details>
    </section>
  `;
}

function renderMockResumeBanner(attempt: MockExamAttempt): string {
  const remaining = formatMockExamTimer(getMockExamRemainingMs(attempt));
  const answered = getMockExamAnsweredCount(attempt);
  const label = attempt.status === "grading" ? "Correcao em andamento" : "Simulado em andamento";
  return `
    <div class="mock-resume-banner" role="status">
      <div>
        <strong>${label}</strong>
        <p class="small-note">${answered}/${attempt.questions.length} · tempo restante ${remaining}</p>
      </div>
      <button class="button" type="button" data-filter-group="exam-focus" data-filter-value="mock">Retomar</button>
    </div>
  `;
}

function renderWeakMode(ctx: AppContext): string {
  const weak = getWeakChapters(ctx.data, ctx.state, 8);
  if (!weak.length) {
    return `
      <section class="panel completion-card">
        <span class="card-label">Bom sinal</span>
        <h2>Nenhum ponto critico agora.</h2>
        <p>Avance para um simulado ou perguntas AP1 para manter a forma de prova.</p>
        <button class="button" type="button" data-filter-group="exam-focus" data-filter-value="mock">Abrir simulado</button>
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
  const allItems = sortByCheckPriority(
    getAp1DrillExercises(ctx.data, ctx.state, 24),
    (item) => ctx.state.exerciseChecks[`exam:${item.chapterId}:${item.style}:${item.question}`]
  );
  const wrongOnly = ctx.ui.examDrillWrongOnly;
  const items = wrongOnly
    ? allItems.filter((item) => ctx.state.exerciseChecks[`exam:${item.chapterId}:${item.style}:${item.question}`] === "wrong")
    : allItems;
  const wrongCount = allItems.filter((item) => ctx.state.exerciseChecks[`exam:${item.chapterId}:${item.style}:${item.question}`] === "wrong").length;

  if (!allItems.length) {
    return `<p class="empty-state">Ainda nao ha perguntas AP1 suficientes neste curso.</p>`;
  }

  if (!items.length) {
    return `
      <section class="review-focus panel" aria-label="Drill AP1">
        <div class="segmented-control compact" aria-label="Filtrar drills">
          <button class="${!wrongOnly ? "active" : ""}" type="button" data-filter-group="exam-drill-wrong" data-filter-value="all">Todos</button>
          <button class="${wrongOnly ? "active" : ""}" type="button" data-filter-group="exam-drill-wrong" data-filter-value="wrong">So erros (${wrongCount})</button>
        </div>
        <p class="empty-state">Nenhum erro marcado nos drills ainda.</p>
      </section>
    `;
  }

  const index = ((ctx.ui.examFocusIndex % items.length) + items.length) % items.length;
  const item = items[index];
  const signal = detectSignalWort(item.question);
  const checkKey = `exam:${item.chapterId}:${item.style}:${item.question}`;
  const check = ctx.state.exerciseChecks[checkKey];

  return `
    <section class="review-focus panel" aria-label="Drill AP1">
      <p class="small-note">Responda como na prova: leia o Signalwort, monte a resposta, so depois revele. Espaco / 1 / 2 no teclado.</p>
      <div class="segmented-control compact" aria-label="Filtrar drills">
        <button class="${!wrongOnly ? "active" : ""}" type="button" data-filter-group="exam-drill-wrong" data-filter-value="all">Todos</button>
        <button class="${wrongOnly ? "active" : ""}" type="button" data-filter-group="exam-drill-wrong" data-filter-value="wrong">So erros (${wrongCount})</button>
      </div>
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
      <p class="exam-chapter-tag">${escapeHtml(item.chapterTitle)}</p>
      ${signal ? `<p class="exam-signal-tag">Signalwort: <strong>${escapeHtml(signal.de)}</strong> · ${escapeHtml(signal.expect)}</p>` : ""}
      <h2>Aufgabe</h2>
      <p class="focus-question">${escapeHtml(item.question)}</p>
      <details class="focus-reveal">
        <summary>Antwort anzeigen</summary>
        <p><strong>Antwort:</strong> ${escapeHtml(item.answer)}</p>
        ${item.explanation ? `<p><strong>Erklaerung:</strong> ${escapeHtml(item.explanation)}</p>` : ""}
        ${signal ? `<p class="small-note">Lembrete: ${escapeHtml(signal.tip)}</p>` : ""}
        <div class="self-check-actions">
          <button
            class="button secondary ${check === "correct" ? "active-check" : ""}"
            type="button"
            data-exercise-check="correct"
            data-check-key="${escapeAttribute(checkKey)}"
            data-check-chapter="${escapeAttribute(item.chapterId)}"
            data-auto-advance="exam"
          >Acertei</button>
          <button
            class="button secondary ${check === "wrong" ? "active-check wrong" : ""}"
            type="button"
            data-exercise-check="wrong"
            data-check-key="${escapeAttribute(checkKey)}"
            data-check-chapter="${escapeAttribute(item.chapterId)}"
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
      <p class="small-note">Marque o que ja domina. Depois valide com um simulado completo.</p>
      <button class="button secondary" type="button" data-filter-group="exam-focus" data-filter-value="mock">Fazer simulado</button>
    </section>
  `;
}

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}
