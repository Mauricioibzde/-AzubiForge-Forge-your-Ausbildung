import type { Chapter, ReaderTab, AppState } from "../../types";
import type { Mission } from "../../schemas/mission";
import type { MissionActivity } from "../../schemas/material";

export type DidacticTaskKind =
  | "explain-retrieval"
  | "praxis-decision"
  | "apply-production";

export interface DidacticTask {
  id: string;
  kind: DidacticTaskKind;
  title: string;
  prompt: string;
  context: string;
  modelAnswer: string;
  successCriteria: string[];
  whyItMatters: string;
  placeholder: string;
}

export function explainArtifactKey(chapterId: string): string {
  return `explain:${chapterId}`;
}

export function praxisArtifactKey(chapterId: string): string {
  return `praxis:${chapterId}`;
}

export function applyArtifactKey(activityId: string): string {
  return `apply:${activityId}`;
}

/** Active recall after reading — forces retrieval, not rereading. */
export function buildExplainRetrievalTask(chapter: Chapter): DidacticTask {
  const objective = chapter.fullContent?.objectives?.[0]
    || `Erklären Sie ${chapter.title} in eigenen Worten.`;
  return {
    id: explainArtifactKey(chapter.id),
    kind: "explain-retrieval",
    title: "Recuperação ativa",
    prompt: `Feche o texto mentalmente. Em 2 frases: (1) o que é ${chapter.title}? (2) por que isso importa no trabalho ou na AP1?`,
    context: objective,
    modelAnswer: [
      chapter.summary,
      chapter.description
    ].filter(Boolean).join(" "),
    successCriteria: [
      "Nomeei a ideia central sem copiar o texto",
      "Disse por que importa no trabalho ou na AP1",
      "Usei pelo menos 1 termo técnico"
    ],
    whyItMatters: "Recuperar de memória fixa mais do que reler. Esta é a evidência da etapa Erklären.",
    placeholder: "Frase 1: o que é…\nFrase 2: no trabalho/AP1 isso importa porque…"
  };
}

/** Transfer: scenario → decision + justification. */
export function buildPraxisDecisionTask(chapter: Chapter): DidacticTask {
  const practical = chapter.fullContent?.practicalExamples?.[0];
  const realWorld = chapter.fullContent?.realWorldExamples?.[0] || "";
  const scenario = [
    practical?.paragraphs?.join(" ") || "",
    chapter.example || "",
    realWorld
  ].filter(Boolean).join("\n\n") || chapter.description;

  const model = practical?.steps?.length
    ? practical.steps.join(" → ")
    : (chapter.summary || chapter.description);

  return {
    id: praxisArtifactKey(chapter.id),
    kind: "praxis-decision",
    title: "Decisão no caso",
    prompt: "Com base no caso: qual ação você toma primeiro e por quê? Responda em 2–3 frases com um Fachbegriff.",
    context: scenario,
    modelAnswer: model,
    successCriteria: [
      "Nomeei uma ação/checagem concreta",
      "Justifiquei a decisão com o caso",
      "Usei um termo técnico (Fachbegriff)"
    ],
    whyItMatters: "Na AP1 e no suporte, saber definir não basta — você precisa decidir e justificar.",
    placeholder: "Eu faria… porque… (termo técnico: …)"
  };
}

/** Applied production from mission apply activities. */
export function buildApplyProductionTasks(
  chapter: Chapter,
  mission: Mission | null | undefined
): DidacticTask[] {
  const activities = mission?.phases.apply.activities || [];
  if (!activities.length) {
    const fallback = buildPraxisDecisionTask(chapter);
    return [{
      ...fallback,
      id: applyArtifactKey(`${chapter.id}-apply-fallback`),
      kind: "apply-production",
      title: "Desafio aplicado",
      whyItMatters: "Sem produção aplicada, o teste de domínio fica bloqueado."
    }];
  }

  return activities.map((activity) => buildApplyTaskFromActivity(activity));
}

export function buildApplyTaskFromActivity(activity: MissionActivity): DidacticTask {
  const criteria = activity.criteria?.length
    ? activity.criteria
    : [
        "Nomeei uma decisão ou checagem concreta",
        "Justifiquei com o caso dado",
        "Usei Fachbegriffe corretos"
      ];

  return {
    id: applyArtifactKey(activity.id),
    kind: "apply-production",
    title: activity.title || "Desafio aplicado",
    prompt: activity.instruction || activity.question || "Resolva o caso e justifique.",
    context: activity.question && activity.question !== activity.instruction
      ? activity.question
      : (activity.instruction || ""),
    modelAnswer: activity.modelAnswer || activity.answer || "",
    successCriteria: criteria,
    whyItMatters: "Aplicar em um caso é a evidência que libera o teste de domínio.",
    placeholder: "Minha resposta / decisão: …\nJustificativa: …"
  };
}

export function hasArtifactSubmitted(state: AppState, artifactId: string): boolean {
  return Boolean(state.stepArtifactSubmitted?.[artifactId]);
}

export function getArtifactText(state: AppState, artifactId: string): string {
  return state.stepArtifacts?.[artifactId] || "";
}

/**
 * Evidence that the learner actually did the step's learning job —
 * not merely opened the tab.
 */
export function hasStepLearningEvidence(
  state: AppState,
  chapterId: string,
  tab: ReaderTab,
  mission?: Mission | null
): boolean {
  if (tab === "explain") {
    return hasArtifactSubmitted(state, explainArtifactKey(chapterId));
  }
  if (tab === "praxis") {
    return hasArtifactSubmitted(state, praxisArtifactKey(chapterId));
  }
  if (tab === "vocab") {
    return Object.keys(state.vocabChecks || {}).some((key) => key.includes(`:${chapterId}:`) || key.startsWith(`vocab:${chapterId}:`));
  }
  if (tab === "practice") {
    return Object.keys(state.exerciseChecks || {}).some((key) => key.startsWith(`${chapterId}:`));
  }
  if (tab === "ap1") {
    const activities = mission?.phases.apply.activities || [];
    if (!activities.length) {
      return hasArtifactSubmitted(state, applyArtifactKey(`${chapterId}-apply-fallback`));
    }
    const withProduction = activities.filter((activity) =>
      hasArtifactSubmitted(state, applyArtifactKey(activity.id))
    ).length;
    return withProduction >= Math.min(1, activities.length);
  }
  return false;
}

export function stepEvidenceLabel(tab: ReaderTab): string {
  if (tab === "explain") return "Escreva a recuperação ativa (2 frases) antes de avançar.";
  if (tab === "praxis") return "Registre sua decisão no caso antes de avançar.";
  if (tab === "vocab") return "Confera pelo menos 1 termo (produção DE→PT) antes de avançar.";
  if (tab === "practice") return "Responda e marque Acertei/Errei em pelo menos 1 exercício.";
  return "Escreva a resposta do desafio aplicado antes de avançar.";
}

/** Count apply activities with a submitted production artifact. */
export function countApplyProductions(
  state: AppState,
  mission: Mission | null | undefined
): { submitted: number; total: number; done: boolean } {
  const activities = mission?.phases.apply.activities || [];
  if (!activities.length) {
    return { submitted: 0, total: 0, done: true };
  }
  const submitted = activities.filter((activity) =>
    hasArtifactSubmitted(state, applyArtifactKey(activity.id))
  ).length;
  return {
    submitted,
    total: activities.length,
    done: submitted >= Math.max(1, Math.ceil(activities.length * 0.5))
  };
}
