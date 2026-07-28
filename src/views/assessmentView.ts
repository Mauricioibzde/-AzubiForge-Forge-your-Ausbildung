import type { AppContext } from "../appContext";
import { getNormalizedCourseData } from "../data/normalizedCourse";
import { createCheckpointAttempt } from "../domain/checkpoint/checkpoints";
import { resolveNextLearningAction } from "../domain/learning/nextLearningAction";
import { createMissionReview } from "../domain/review/missionReviewSession";
import type { MasteryTestStatus, SelfCheckAssessment } from "../types";
import {
  getAssessmentAnsweredCount,
  getAssessmentGradedCount,
  getAssessmentWrongQuestions,
  scoreAssessment
} from "../domain/assessment/assessmentFlow";
import { escapeAttribute, escapeHtml } from "../ui/html";

export interface AssessmentViewConfig {
  pageCaption: string;
  entityLabel: string;
  entityTitle: string;
  exitHref: string;
  continueHref?: string;
  directedReviewHref?: string;
  passedMessage: string;
  failedMessage: string;
}

export function renderAssessmentFlow(
  attempt: SelfCheckAssessment & { id: string; startedAt: string; finishedAt?: string },
  config: AssessmentViewConfig,
  mode: "active" | "grading" | "results"
): string {
  if (mode === "active" || attempt.status === "active") return renderAssessmentActive(attempt, config);
  if (mode === "grading" || attempt.status === "grading") return renderAssessmentGrading(attempt, config);
  return renderAssessmentResults(attempt, config);
}

function renderAssessmentActive(
  attempt: SelfCheckAssessment & { id: string },
  config: AssessmentViewConfig
): string {
  const total = attempt.questions.length;
  const index = Math.min(attempt.currentIndex, total - 1);
  const question = attempt.questions[index];
  const response = attempt.responses[question.id] || {};
  const answered = getAssessmentAnsweredCount(attempt);

  return `
    <section class="ds-page mastery-test-page">
      <header class="study-session-header rise-in">
        <p class="ds-caption">${config.pageCaption} · ${escapeHtml(config.entityTitle)}</p>
        <h1 class="ds-section-title">Pergunta ${index + 1} de ${total}</h1>
        <p class="ds-aux">${answered}/${total} respondidas · minimo ${attempt.passingScore}% · feedback ao final</p>
      </header>

      <div class="mock-question-nav" aria-label="Navegacao">
        ${attempt.questions.map((item, itemIndex) => {
          const done = Boolean(attempt.responses[item.id]?.answered);
          return `
            <button class="mock-q-pill ${itemIndex === index ? "active" : ""} ${done ? "answered" : ""}" type="button" data-assessment-goto="${itemIndex}">${itemIndex + 1}</button>
          `;
        }).join("")}
      </div>

      <article class="ds-card mock-question-card rise-in">
        <h2 class="ds-card-title">${escapeHtml(question.question)}</h2>
        <textarea class="note-area" rows="4" placeholder="Sua resposta (opcional)" data-assessment-notes="${escapeAttribute(question.id)}">${escapeHtml(response.notes || "")}</textarea>
        <label class="check-row">
          <input type="checkbox" data-assessment-answered="${escapeAttribute(question.id)}" ${response.answered ? "checked" : ""}>
          Marquei como respondida
        </label>
      </article>

      <div class="study-session-actions mobile-sticky-actions">
        ${index > 0 ? `<button class="button secondary" type="button" data-assessment-step="-1">Anterior</button>` : ""}
        ${index < total - 1
          ? `<button class="button" type="button" data-assessment-step="1">Proxima</button>`
          : `<button class="button accent" type="button" data-assessment-submit>Enviar</button>`}
        <a class="button secondary" href="${config.exitHref}">Sair</a>
      </div>
    </section>
  `;
}

function renderAssessmentGrading(
  attempt: SelfCheckAssessment & { id: string },
  config: AssessmentViewConfig
): string {
  const total = attempt.questions.length;
  const index = Math.min(attempt.currentIndex, total - 1);
  const question = attempt.questions[index];
  const response = attempt.responses[question.id] || {};
  const graded = getAssessmentGradedCount(attempt);

  return `
    <section class="ds-page mastery-test-page">
      <header class="study-session-header rise-in">
        <p class="ds-caption">Correcao · ${escapeHtml(config.entityLabel)}</p>
        <h1 class="ds-section-title">Autoavaliacao ${index + 1} de ${total}</h1>
        <p class="ds-aux">${graded}/${total} corrigidas</p>
      </header>

      <article class="ds-card mock-question-card rise-in">
        <h2 class="ds-card-title">${escapeHtml(question.question)}</h2>
        <details class="mastery-answer-reveal">
          <summary>Ver resposta esperada</summary>
          <p>${escapeHtml(question.answer)}</p>
          ${question.explanation ? `<p class="ds-aux">${escapeHtml(question.explanation)}</p>` : ""}
        </details>
        <div class="study-session-actions">
          <button class="button secondary ${response.selfCheck === "correct" ? "active-check" : ""}" type="button" data-assessment-grade="correct" data-assessment-question="${escapeAttribute(question.id)}">Acertei</button>
          <button class="button secondary ${response.selfCheck === "wrong" ? "active-check wrong" : ""}" type="button" data-assessment-grade="wrong" data-assessment-question="${escapeAttribute(question.id)}">Errei</button>
        </div>
      </article>

      <div class="study-session-actions mobile-sticky-actions">
        ${index > 0 ? `<button class="button secondary" type="button" data-assessment-step="-1">Anterior</button>` : ""}
        ${index < total - 1
          ? `<button class="button" type="button" data-assessment-step="1">Proxima</button>`
          : `<button class="button accent" type="button" data-assessment-finish ${graded < total ? "disabled" : ""}>Ver resultado</button>`}
        <a class="button secondary" href="${config.exitHref}">Sair</a>
      </div>
    </section>
  `;
}

function renderAssessmentResults(
  attempt: SelfCheckAssessment & { id: string; finishedAt?: string },
  config: AssessmentViewConfig
): string {
  const score = scoreAssessment(attempt);
  const passed = score.percent >= attempt.passingScore;
  const wrong = getAssessmentWrongQuestions(attempt);

  return `
    <section class="ds-page mastery-test-page">
      <article class="ds-card mastery-result-card rise-in">
        <p class="ds-caption">${config.pageCaption}</p>
        <h1 class="ds-section-title">${passed ? config.passedMessage : config.failedMessage}</h1>
        <div class="mastery-score ${passed ? "passed" : "failed"}">${score.percent}%</div>
        <p class="ds-lead">${score.correct}/${score.total} corretas · minimo ${attempt.passingScore}%</p>

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
            ${config.directedReviewHref ? `<a class="button secondary" href="${config.directedReviewHref}">Revisao direcionada</a>` : ""}
          </section>
        ` : ""}

        <div class="study-session-actions">
          ${passed && config.continueHref
            ? `<a class="button accent" href="${config.continueHref}">Continuar</a>`
            : passed
              ? `<a class="button accent" href="#home">Voltar para Hoje</a>`
              : `<button class="button accent" type="button" data-assessment-retry>Nova tentativa</button>`}
          ${!passed && config.directedReviewHref ? `<a class="button secondary" href="${config.directedReviewHref}">Estudar erros</a>` : ""}
          <button class="button secondary" type="button" data-assessment-clear>Fechar</button>
        </div>
      </article>
    </section>
  `;
}

export function submitAssessmentForGrading<T extends SelfCheckAssessment>(attempt: T): T {
  return { ...attempt, status: "grading" as MasteryTestStatus, currentIndex: 0 };
}

export function finishAssessment<T extends SelfCheckAssessment>(attempt: T): T {
  const score = scoreAssessment(attempt);
  return {
    ...attempt,
    status: "finished",
    finishedAt: new Date().toISOString(),
    score: score.percent
  };
}

export function renderMissionReviewView(ctx: AppContext, missionId: string, returnToSession: boolean): string {
  let attempt = ctx.state.activeMissionReview;
  if (!attempt || attempt.missionId !== missionId) {
    attempt = createMissionReview(missionId, getNormalizedCourseData(), { returnToSession }) ?? null;
    ctx.state.activeMissionReview = attempt;
  }

  if (!attempt) {
    return `<section class="ds-page"><div class="ds-card"><h1>Revisao indisponivel</h1><a href="#home">Voltar</a></div></section>`;
  }

  const mode = attempt.status === "finished" ? "results" : attempt.status === "grading" ? "grading" : "active";
  let continueHref = returnToSession ? "#session" : "#home";
  if (!returnToSession && attempt.status === "finished") {
    try {
      continueHref = resolveNextLearningAction({
        course: getNormalizedCourseData(),
        state: ctx.state
      }).href;
    } catch {
      continueHref = "#home";
    }
  }
  return renderAssessmentFlow(attempt, {
    pageCaption: "Revisao de retencao",
    entityLabel: attempt.missionTitle,
    entityTitle: attempt.missionTitle,
    exitHref: returnToSession ? "#session" : "#home",
    continueHref: returnToSession ? "#session" : (attempt.status === "finished" ? continueHref : undefined),
    directedReviewHref: `#reader/${escapeAttribute(missionId)}/explain`,
    passedMessage: "Retencao confirmada",
    failedMessage: "Revisao necessaria"
  }, mode);
}

export function renderCheckpointView(ctx: AppContext, situationId: string): string {
  let attempt = ctx.state.activeCheckpoint;
  if (!attempt || attempt.situationId !== situationId) {
    attempt = createCheckpointAttempt(situationId, getNormalizedCourseData()) ?? null;
    ctx.state.activeCheckpoint = attempt;
  }

  if (!attempt) {
    return `<section class="ds-page"><div class="ds-card"><h1>Checkpoint indisponivel</h1><a href="#course">Voltar</a></div></section>`;
  }

  const mode = attempt.status === "finished" ? "results" : attempt.status === "grading" ? "grading" : "active";
  let continueHref: string | undefined;
  if (attempt.status === "finished") {
    try {
      continueHref = resolveNextLearningAction({
        course: getNormalizedCourseData(),
        state: ctx.state
      }).href;
    } catch {
      continueHref = "#course";
    }
  }
  return renderAssessmentFlow(attempt, {
    pageCaption: "Checkpoint integrado",
    entityLabel: attempt.situationTitle,
    entityTitle: attempt.situationTitle,
    exitHref: "#course",
    continueHref,
    directedReviewHref: "#course",
    passedMessage: "Lernsituation validada",
    failedMessage: "Checkpoint nao aprovado"
  }, mode);
}
