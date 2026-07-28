import type { AppContext } from "../appContext";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import { findChapter } from "../domain/course";
import { resolveNextLearningAction } from "../domain/learning/nextLearningAction";
import { getDirectedReviewHref } from "../domain/mastery/applyMasteryResult";
import {
  createMasteryTest,
  getMasteryAnsweredCount,
  getMasteryGradedCount,
  getMasteryWrongQuestions,
  scoreMasteryTest
} from "../domain/mastery/masteryTest";
import type { MasteryTestAttempt } from "../types";
import { escapeAttribute, escapeHtml } from "../ui/html";

export function renderMasteryTestView(ctx: AppContext, missionId: string, returnToSession: boolean): string {
  let attempt = ctx.state.activeMasteryTest;

  if (!attempt || attempt.missionId !== missionId) {
    const created = createMasteryTest(missionId, getNormalizedCourseData(), { returnToSession });
    attempt = created;
    ctx.state.activeMasteryTest = created;
  }

  if (!attempt) {
    const chapter = findChapter(ctx.data, missionId);
    return `
      <section class="ds-page mastery-test-page">
        <article class="ds-card">
          <h1 class="ds-section-title">Teste indisponivel</h1>
          <p class="ds-aux">Nao ha perguntas suficientes para ${chapter?.title || "esta missao"}.</p>
          <a class="button secondary" href="${returnToSession ? "#session" : "#home"}">Voltar</a>
        </article>
      </section>
    `;
  }

  if (attempt.status === "active") return renderMasteryActive(attempt, returnToSession);
  if (attempt.status === "grading") return renderMasteryGrading(ctx, attempt, returnToSession);
  return renderMasteryResults(ctx, attempt, returnToSession);
}

function renderMasteryActive(attempt: MasteryTestAttempt, returnToSession: boolean): string {
  const total = attempt.questions.length;
  const index = Math.min(attempt.currentIndex, total - 1);
  const question = attempt.questions[index];
  const response = attempt.responses[question.id] || {};
  const answered = getMasteryAnsweredCount(attempt);

  return `
    <section class="ds-page mastery-test-page">
      <header class="study-session-header rise-in">
        <p class="ds-caption">Teste de dominio · ${escapeHtml(attempt.missionTitle)}</p>
        <h1 class="ds-section-title">Pergunta ${index + 1} de ${total}</h1>
        <p class="ds-aux">${answered}/${total} respondidas · minimo ${attempt.passingScore}% · feedback ao final</p>
      </header>

      <div class="mock-question-nav" aria-label="Navegacao">
        ${attempt.questions.map((item, itemIndex) => {
          const done = Boolean(attempt.responses[item.id]?.answered);
          return `
            <button
              class="mock-q-pill ${itemIndex === index ? "active" : ""} ${done ? "answered" : ""}"
              type="button"
              data-mastery-goto="${itemIndex}"
            >${itemIndex + 1}</button>
          `;
        }).join("")}
      </div>

      <article class="ds-card mock-question-card rise-in">
        <span class="today-task-type">${questionTypeLabel(question.type)}</span>
        <h2 class="ds-card-title">${escapeHtml(question.question)}</h2>
        <textarea
          class="note-area"
          rows="4"
          placeholder="Sua resposta (opcional — autoavaliacao no final)"
          data-mastery-notes="${escapeAttribute(question.id)}"
        >${escapeHtml(response.notes || "")}</textarea>
        <label class="check-row">
          <input type="checkbox" data-mastery-answered="${escapeAttribute(question.id)}" ${response.answered ? "checked" : ""}>
          Marquei como respondida
        </label>
      </article>

      <div class="study-session-actions mobile-sticky-actions">
        ${index > 0 ? `<button class="button secondary" type="button" data-mastery-step="-1">Anterior</button>` : ""}
        ${index < total - 1
          ? `<button class="button" type="button" data-mastery-step="1">Proxima</button>`
          : `<button class="button accent" type="button" data-mastery-submit>Enviar teste</button>`}
        <a class="button secondary" href="${returnToSession ? "#session" : `#reader/${escapeAttribute(attempt.missionId)}/explain`}">Sair</a>
      </div>
    </section>
  `;
}

function renderMasteryGrading(_ctx: AppContext, attempt: MasteryTestAttempt, returnToSession: boolean): string {
  const total = attempt.questions.length;
  const index = Math.min(attempt.currentIndex, total - 1);
  const question = attempt.questions[index];
  const response = attempt.responses[question.id] || {};
  const graded = getMasteryGradedCount(attempt);

  return `
    <section class="ds-page mastery-test-page">
      <header class="study-session-header rise-in">
        <p class="ds-caption">Correcao · sem nota ate o fim</p>
        <h1 class="ds-section-title">Autoavaliacao ${index + 1} de ${total}</h1>
        <p class="ds-aux">${graded}/${total} corrigidas</p>
      </header>

      <article class="ds-card mock-question-card rise-in">
        <h2 class="ds-card-title">${escapeHtml(question.question)}</h2>
        ${response.notes ? `<p class="ds-aux"><strong>Sua nota:</strong> ${escapeHtml(response.notes)}</p>` : ""}
        <details class="mastery-answer-reveal">
          <summary>Ver resposta esperada</summary>
          <p>${escapeHtml(question.answer)}</p>
          ${question.explanation ? `<p class="ds-aux">${escapeHtml(question.explanation)}</p>` : ""}
        </details>
        <div class="study-session-actions">
          <button class="button secondary ${response.selfCheck === "correct" ? "active-check" : ""}" type="button" data-mastery-grade="correct" data-mastery-question="${escapeAttribute(question.id)}">Acertei</button>
          <button class="button secondary ${response.selfCheck === "wrong" ? "active-check wrong" : ""}" type="button" data-mastery-grade="wrong" data-mastery-question="${escapeAttribute(question.id)}">Errei</button>
        </div>
      </article>

      <div class="study-session-actions mobile-sticky-actions">
        ${index > 0 ? `<button class="button secondary" type="button" data-mastery-step="-1">Anterior</button>` : ""}
        ${index < total - 1
          ? `<button class="button" type="button" data-mastery-step="1">Proxima</button>`
          : `<button class="button accent" type="button" data-mastery-finish ${graded < total ? "disabled" : ""}>Ver resultado</button>`}
        <a class="button secondary" href="${returnToSession ? "#session" : "#home"}">Sair</a>
      </div>
    </section>
  `;
}

function renderMasteryResults(ctx: AppContext, attempt: MasteryTestAttempt, returnToSession: boolean): string {
  const score = scoreMasteryTest(attempt);
  const passed = score.percent >= attempt.passingScore;
  const wrong = getMasteryWrongQuestions(attempt);
  const history = ctx.state.masteryTestHistory.filter((entry) => entry.missionId === attempt.missionId).slice(0, 3);
  let nextHref = "#home";
  try {
    nextHref = resolveNextLearningAction({
      course: getNormalizedCourseData(),
      state: ctx.state
    }).href;
  } catch {
    nextHref = "#home";
  }

  return `
    <section class="ds-page mastery-test-page">
      <article class="ds-card mastery-result-card rise-in">
        <p class="ds-caption">Resultado do teste de dominio</p>
        <h1 class="ds-section-title">${passed ? "Dominio inicial comprovado" : "Ainda nao aprovado"}</h1>
        <div class="mastery-score ${passed ? "passed" : "failed"}">${score.percent}%</div>
        <p class="ds-lead">${score.correct}/${score.total} corretas · minimo ${attempt.passingScore}%</p>
        ${passed
          ? `<p class="ds-aux">Revisao espaçada agendada. A missao nao e marcada como dominada ate confirmar retencao.</p>`
          : `<p class="ds-aux">A missao nao foi marcada como dominada. Revise os erros e tente novamente.</p>`}

        ${wrong.length ? `
          <section class="mastery-error-analysis">
            <h2 class="ds-card-title">Analise de erros</h2>
            <ul class="mastery-error-list">
              ${wrong.map((question) => `
                <li>
                  <strong>${escapeHtml(question.question)}</strong>
                  <p class="ds-aux">${escapeHtml(question.answer)}</p>
                </li>
              `).join("")}
            </ul>
            <a class="button secondary" href="${getDirectedReviewHref(attempt.missionId)}">Revisao direcionada</a>
          </section>
        ` : ""}

        ${history.length > 1 ? `
          <p class="ds-aux">Tentativas recentes: ${history.map((entry) => `${entry.score}%`).join(" · ")}</p>
        ` : ""}

        <div class="study-session-actions">
          ${passed && returnToSession
            ? `<a class="button accent" href="#session">Continuar sessao</a>`
            : passed
              ? `<a class="button accent" href="${escapeAttribute(nextHref)}">Continuar</a>`
              : `<button class="button accent" type="button" data-mastery-retry>Nova tentativa</button>`}
          ${!passed ? `<a class="button secondary" href="${getDirectedReviewHref(attempt.missionId)}">Estudar erros</a>` : ""}
          <button class="button secondary" type="button" data-mastery-clear>Fechar</button>
        </div>
      </article>
    </section>
  `;
}

function questionTypeLabel(type: string): string {
  if (type === "scenario-choice") return "Cenario AP1";
  if (type === "true-false") return "V/F";
  return "Pergunta aberta";
}

export function startMasteryTest(ctx: AppContext, missionId: string, returnToSession: boolean): void {
  const attempt = createMasteryTest(missionId, getNormalizedCourseData(), { returnToSession });
  ctx.state.activeMasteryTest = attempt;
}

export function submitMasteryTestForGrading(ctx: AppContext): void {
  const attempt = ctx.state.activeMasteryTest;
  if (!attempt || attempt.status !== "active") return;
  ctx.state.activeMasteryTest = {
    ...attempt,
    status: "grading",
    currentIndex: 0
  };
}

export function finishMasteryTest(ctx: AppContext): void {
  const attempt = ctx.state.activeMasteryTest;
  if (!attempt || attempt.status !== "grading") return;
  const score = scoreMasteryTest(attempt);
  ctx.state.activeMasteryTest = {
    ...attempt,
    status: "finished",
    finishedAt: new Date().toISOString(),
    score: score.percent
  };
}
