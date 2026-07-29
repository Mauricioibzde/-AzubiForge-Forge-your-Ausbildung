import { escapeAttribute, escapeHtml } from "../../ui/html";
import type { MissionPanelModel, MissionStepView } from "../../domain/dashboard/missionPanel";

export function renderMissionCelebration(model: MissionPanelModel): string {
  if (!model.celebration.show) return "";
  return `
    <div class="mission-celebration rise-in" role="status">
      <strong>${escapeHtml(model.celebration.title)}</strong>
      <span>${escapeHtml(model.celebration.detail)}</span>
    </div>
  `;
}

export function renderMissionHero(model: MissionPanelModel): string {
  return `
    <section class="mission-hero rise-in" aria-label="Missão atual">
      <div class="mission-hero-copy">
        <p class="ds-caption">${escapeHtml(model.hierarchyCrumb)}</p>
        <h1 class="mission-hero-title">${escapeHtml(model.title)}</h1>
        <p class="mission-hero-lead">${escapeHtml(model.description)}</p>
        <div class="mission-hero-meta" aria-label="Metadados da missão">
          <span class="mission-meta-chip">${model.estimatedMinutes} min</span>
          <span class="mission-meta-chip">${escapeHtml(model.difficultyLabel)}</span>
          <span class="mission-meta-chip mission-meta-chip-accent">${escapeHtml(model.importanceLabel)}</span>
          <span class="mission-meta-chip">Evidência ${model.doneCount}/${model.stepsTotal}</span>
          <span class="mission-meta-chip">${model.masteryPassed ? "Domínio ok" : "Domínio pendente"}</span>
          ${model.studyStreak > 0 ? `<span class="mission-meta-chip">Streak ${model.studyStreak}d</span>` : ""}
        </div>
        <p class="mission-method-strip" aria-label="Como estudar">
          Aprender → Recuperar → Praticar → Aplicar → Provar
        </p>
        <a class="button accent mission-hero-cta" href="${escapeAttribute(model.continueHref)}" data-dashboard-cta data-mission-focus>
          ${escapeHtml(model.continueLabel)}
        </a>
      </div>
      <div class="mission-hero-visual" aria-hidden="true">
        <div class="mission-hero-orb"></div>
        <div class="mission-hero-stairs">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="mission-hero-flag"></div>
      </div>
    </section>
  `;
}

export function renderMissionStepper(model: MissionPanelModel): string {
  return `
    <nav class="mission-stepper rise-in" style="animation-delay:12ms" aria-label="Progresso das etapas">
      <ol class="mission-stepper-track">
        ${model.steps.map((step, index) => renderStepperItem(step, index, model.steps.length)).join("")}
      </ol>
    </nav>
  `;
}

function renderStepperItem(step: MissionStepView, index: number, total: number): string {
  const connector = index < total - 1
    ? `<span class="mission-stepper-line ${step.state === "done" ? "is-done" : ""}" aria-hidden="true"></span>`
    : "";
  return `
    <li class="mission-stepper-item is-${step.state}">
      <a class="mission-stepper-node" href="${escapeAttribute(step.href)}" aria-current="${step.state === "current" ? "step" : "false"}">
        <span class="mission-stepper-dot" aria-hidden="true">${step.state === "done" ? "✓" : index + 1}</span>
        <span class="mission-stepper-label">${escapeHtml(step.shortLabel)}</span>
      </a>
      ${connector}
    </li>
  `;
}

export function renderNextStepCard(model: MissionPanelModel): string {
  if (model.completed) {
    return `
      <article class="mission-next-card is-complete rise-in" style="animation-delay:20ms" aria-label="Domínio comprovado">
        <div class="mission-next-copy">
          <p class="ds-caption">Domínio comprovado</p>
          <h2 class="mission-next-title">${model.nextMission ? "Próxima missão pronta" : "Trilha avançada"}</h2>
          <p class="ds-aux">${model.nextMission
            ? `Você provou esta missão. Segue: ${escapeHtml(model.nextMission.title)}.`
            : "Domínio confirmado. Continue pela trilha ou revise pontos fracos."}</p>
          <div class="mission-next-meta">
            <span>${model.stepsTotal}/${model.stepsTotal} com evidência</span>
            <span class="mission-xp">${escapeHtml(model.rewards.evidenceSummary)}</span>
          </div>
          <a class="button mission-next-cta" href="${escapeAttribute(model.continueHref)}">${escapeHtml(model.continueLabel)}</a>
        </div>
        <div class="mission-next-visual" aria-hidden="true">
          <div class="mission-next-clipboard"></div>
        </div>
      </article>
    `;
  }

  if (model.doneCount === model.stepsTotal && !model.masteryPassed) {
    return `
      <article class="mission-next-card rise-in" style="animation-delay:20ms" aria-label="Provar domínio">
        <div class="mission-next-copy">
          <p class="ds-caption">Próxima etapa · ~ ${model.remainingMinutes} min</p>
          <h2 class="mission-next-title">Provar domínio</h2>
          <p class="ds-aux">Todas as etapas têm evidência. Faça o teste local para confirmar que você entendeu — não só que passou pelas abas.</p>
          <p class="mission-next-learn-label">Você vai:</p>
          <ul class="mission-next-learnings">
            <li>Responder sem consultar o guia</li>
            <li>Ver nota mínima e feedback</li>
            <li>Liberar revisão espaçada se passar</li>
          </ul>
          <div class="mission-next-meta">
            <span>${model.stepsTotal}/${model.stepsTotal} com evidência</span>
            <span class="mission-xp">${escapeHtml(model.rewards.masteryLabel)}</span>
          </div>
          <a class="button mission-next-cta" href="${escapeAttribute(model.continueHref)}" data-mission-focus>
            ${escapeHtml(model.continueLabel)}
          </a>
        </div>
        <div class="mission-next-visual" aria-hidden="true">
          <div class="mission-next-clipboard"></div>
        </div>
      </article>
    `;
  }

  const step = model.currentStep;
  return `
    <article class="mission-next-card rise-in" style="animation-delay:20ms" aria-label="Próxima etapa">
      <div class="mission-next-copy">
        <p class="ds-caption">Próxima etapa · ${step.estimatedMinutes} min</p>
        <h2 class="mission-next-title">${escapeHtml(step.label)}</h2>
        <p class="ds-aux">${escapeHtml(step.hint)}</p>
        <p class="mission-next-learn-label">Você aprenderá:</p>
        <ul class="mission-next-learnings">
          ${step.learnings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <div class="mission-next-meta">
          <span>~ ${model.remainingMinutes} min restantes na missão</span>
          <span class="mission-xp">${escapeHtml(model.rewards.practiceLabel)}</span>
        </div>
        <a class="button mission-next-cta" href="${escapeAttribute(model.continueHref)}" data-mission-focus>
          ${escapeHtml(model.continueLabel)}
        </a>
      </div>
      <div class="mission-next-visual" aria-hidden="true">
        <div class="mission-next-clipboard"></div>
      </div>
    </article>
  `;
}

export function renderAfterThisStep(model: MissionPanelModel): string {
  if (!model.upcomingSteps.length) {
    return `
      <section class="mission-after rise-in" style="animation-delay:28ms" aria-label="Depois desta etapa">
        <h3 class="mission-section-title">Depois desta etapa</h3>
        <p class="ds-aux">${model.masteryPassed
          ? "Domínio ok. A próxima missão da trilha fica disponível."
          : "Última etapa do percurso. Em seguida: teste de domínio para comprovar o aprendizado."}</p>
      </section>
    `;
  }

  return `
    <section class="mission-after rise-in" style="animation-delay:28ms" aria-label="Depois desta etapa">
      <h3 class="mission-section-title">Depois desta etapa</h3>
      <ol class="mission-after-list">
        ${model.upcomingSteps.map((step) => `
          <li class="mission-after-item">
            <span class="mission-after-icon" aria-hidden="true">○</span>
            <div class="mission-after-copy">
              <strong>${escapeHtml(step.label)}</strong>
              <span class="ds-aux">${step.estimatedMinutes} min</span>
            </div>
            <span class="mission-after-state">Em breve</span>
          </li>
        `).join("")}
      </ol>
    </section>
  `;
}

export function renderMissionRewards(model: MissionPanelModel): string {
  const { rewards } = model;
  return `
    <section class="mission-rewards rise-in" style="animation-delay:36ms" aria-label="Evidência da missão">
      <h3 class="mission-section-title">Evidência de aprendizagem</h3>
      <p class="ds-aux mission-evidence-lead">${escapeHtml(rewards.evidenceSummary)}</p>
      <div class="mission-rewards-grid">
        <div class="mission-reward-tile">
          <span class="ds-caption">XP</span>
          <strong>${escapeHtml(rewards.xpLabel)}</strong>
        </div>
        <div class="mission-reward-tile">
          <span class="ds-caption">Prática</span>
          <strong>${escapeHtml(rewards.practiceLabel)}</strong>
        </div>
        <div class="mission-reward-tile">
          <span class="ds-caption">Domínio</span>
          <strong>${escapeHtml(rewards.masteryLabel)}</strong>
        </div>
        <div class="mission-reward-tile">
          <span class="ds-caption">Revisão</span>
          <strong>${escapeHtml(rewards.reviewLabel)}</strong>
        </div>
        <div class="mission-reward-tile">
          <span class="ds-caption">Competências</span>
          <strong>${escapeHtml(rewards.competencyLabel)}</strong>
        </div>
        <div class="mission-reward-tile">
          <span class="ds-caption">Próximo</span>
          <strong>${escapeHtml(rewards.nextMissionLabel)}</strong>
        </div>
      </div>
    </section>
  `;
}

export function renderProgressIndicator(model: MissionPanelModel): string {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference * (1 - model.evidencePercent / 100);
  return `
    <section class="mission-progress-card ds-card" id="dashboard-progress" aria-label="Progresso com evidência">
      <div class="mission-progress-ring-wrap">
        <svg class="mission-progress-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle class="mission-progress-ring-bg" cx="50" cy="50" r="42"></circle>
          <circle class="mission-progress-ring-fg" cx="50" cy="50" r="42"
            stroke-dasharray="${circumference.toFixed(1)}"
            stroke-dashoffset="${offset.toFixed(1)}"></circle>
        </svg>
        <div class="mission-progress-ring-label">
          <strong>${model.evidencePercent}%</strong>
          <span>evidência</span>
        </div>
      </div>
      <div class="mission-progress-stats">
        <p><span class="ds-caption">Evidência</span><strong>${model.doneCount} de ${model.stepsTotal}</strong></p>
        <p><span class="ds-caption">Domínio</span><strong>${model.masteryPassed ? "Aprovado" : "Pendente"}</strong></p>
        <p><span class="ds-caption">Restam</span><strong>${model.remainingMinutes ? `~ ${model.remainingMinutes} min` : "0 min"}</strong></p>
      </div>
    </section>
  `;
}

export function renderMissionSummary(model: MissionPanelModel): string {
  const { summary } = model;
  return `
    <section class="mission-summary-card ds-card" aria-label="Resumo da missão">
      <h3 class="mission-side-title">Resumo</h3>
      <dl class="mission-summary-list">
        <div><dt>Lernfeld</dt><dd>${escapeHtml(summary.learningField)}</dd></div>
        <div><dt>Status</dt><dd>${escapeHtml(summary.status)}</dd></div>
        <div><dt>Situação</dt><dd>${escapeHtml(summary.situation)}</dd></div>
        <div><dt>Prontidão</dt><dd>${escapeHtml(summary.lastActivityLabel)}</dd></div>
        <div><dt>Registro</dt><dd>${escapeHtml(summary.startedLabel)}</dd></div>
      </dl>
    </section>
  `;
}

export function renderMissionMaterials(model: MissionPanelModel, collapsed = true): string {
  return `
    <details class="mission-materials-card ds-card" ${collapsed ? "" : "open"} aria-label="Materiais">
      <summary class="mission-materials-summary">
        <span class="mission-side-title">Materiais</span>
        <span class="ds-aux">${model.materials.length} itens</span>
      </summary>
      <ul class="mission-materials-list">
        ${model.materials.map((item) => `
          <li>
            <a href="${escapeAttribute(item.href)}">
              <span>${escapeHtml(item.label)}</span>
              <span aria-hidden="true">›</span>
            </a>
          </li>
        `).join("")}
      </ul>
      <a class="text-link mission-materials-all" href="#course">Ver trilha completa →</a>
    </details>
  `;
}

export function renderMissionTips(model: MissionPanelModel): string {
  return `
    <section class="mission-tips-card ds-card" aria-label="Dica">
      <p class="ds-caption">Dica da etapa</p>
      <p class="mission-tip-text">${escapeHtml(model.tip)}</p>
    </section>
  `;
}

export function renderMissionFocusBar(model: MissionPanelModel): string {
  const focusLabel = model.completed
    ? model.title
    : model.doneCount === model.stepsTotal
      ? "Provar domínio"
      : model.currentStep.label;
  return `
    <footer class="mission-focus-bar" aria-label="Foco de hoje">
      <p class="mission-focus-copy">
        <span class="ds-caption">Foco de hoje</span>
        <strong>${escapeHtml(focusLabel)}</strong>
      </p>
      <div class="mission-focus-actions">
        <a class="button accent mission-focus-continue" href="${escapeAttribute(model.continueHref)}" data-mission-focus>
          ${escapeHtml(model.continueLabel)}
        </a>
        <a class="button secondary mission-focus-exit" href="#course">Sair</a>
      </div>
    </footer>
  `;
}
