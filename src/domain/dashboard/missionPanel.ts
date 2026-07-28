import type { AppContext } from "../../appContext";
import type { Chapter, Module, ReaderTab } from "../../types";
import type { Mission } from "../../schemas/mission";
import { getNormalizedCourseData } from "../../data/normalizedCourse";
import {
  READER_STEPS,
  findChapter,
  getActiveModule,
  getChapterIndex,
  getChapterModule,
  getChapterReadiness,
  getEstimatedSessionMinutes,
  getSessionProgress,
  getStudyStreak,
  getTodayChapter,
  isCompleted,
  stampToLocalDayKey
} from "../course";
import {
  labelForLearningAction,
  resolveNextLearningAction,
  type NextLearningAction
} from "../learning/nextLearningAction";
import { getMissionLearningEvidence, type MissionLearningEvidence } from "../learning/learningEvidence";
import { hasStepLearningEvidence } from "../learning/didacticTasks";
import { hasMasteryEvidence } from "../learning/masteryGate";

export type MissionStepState = "done" | "current" | "upcoming";

export interface MissionStepView {
  id: ReaderTab;
  label: string;
  shortLabel: string;
  hint: string;
  state: MissionStepState;
  estimatedMinutes: number;
  href: string;
  learnings: string[];
}

export interface MissionCelebration {
  show: boolean;
  title: string;
  detail: string;
}

export interface MissionPanelModel {
  chapter: Chapter;
  module: Module;
  mission: Mission | null;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficultyLabel: string;
  importanceLabel: string;
  continueHref: string;
  continueLabel: string;
  sessionPercent: number;
  evidencePercent: number;
  masteryPassed: boolean;
  hierarchyCrumb: string;
  currentStepIndex: number;
  stepsTotal: number;
  remainingMinutes: number;
  doneCount: number;
  studyStreak: number;
  steps: MissionStepView[];
  currentStep: MissionStepView;
  upcomingSteps: MissionStepView[];
  celebration: MissionCelebration;
  nextMission: { title: string; href: string } | null;
  rewards: {
    potentialXp: number;
    earnedXp: number;
    xpLabel: string;
    competencyLabel: string;
    reviewLabel: string;
    practiceLabel: string;
    masteryLabel: string;
    nextMissionLabel: string;
    evidenceSummary: string;
  };
  evidence: MissionLearningEvidence | null;
  summary: {
    learningField: string;
    situation: string;
    status: string;
    startedLabel: string;
    lastActivityLabel: string;
  };
  materials: Array<{ label: string; href: string; kind: string }>;
  tip: string;
  completed: boolean;
  nextAction: NextLearningAction | null;
}

const STEP_DISPLAY: Record<ReaderTab, { label: string; shortLabel: string; learnings: string[] }> = {
  explain: {
    label: "Entender o conceito",
    shortLabel: "Introdução",
    learnings: [
      "A ideia central da missão",
      "Onde isso aparece na AP1",
      "Como explicar em poucas frases"
    ]
  },
  praxis: {
    label: "Caso prático",
    shortLabel: "Método",
    learnings: [
      "Como o tema aparece no trabalho",
      "Uma decisão técnica típica",
      "Ligação teoria → prática"
    ]
  },
  vocab: {
    label: "Vocabulário DE/PT",
    shortLabel: "Vocabulário",
    learnings: [
      "Termos críticos em alemão",
      "Tradução e uso no enunciado",
      "Recall sem consultar a resposta"
    ]
  },
  practice: {
    label: "Prática guiada",
    shortLabel: "Prática",
    learnings: [
      "Aplicar o conceito em exercícios",
      "Identificar erros recorrentes",
      "Marcar Acertei/Errei com consciência"
    ]
  },
  ap1: {
    label: "Check AP1",
    shortLabel: "Conclusão",
    learnings: [
      "Fechar evidência da sessão",
      "Priorizar pontos fracos",
      "Preparar revisão e prova"
    ]
  }
};

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Iniciante",
  2: "Intermediário",
  3: "Intermediário",
  4: "Avançado",
  5: "Desafiador"
};

const IMPORTANCE_LABELS = {
  low: "Importante",
  medium: "Alta importância",
  high: "Muito importante"
} as const;

export function buildMissionPanelModel(ctx: AppContext): MissionPanelModel {
  let nextAction: NextLearningAction | null = null;
  try {
    nextAction = resolveNextLearningAction({
      course: getNormalizedCourseData(),
      state: ctx.state
    });
  } catch {
    nextAction = null;
  }

  const focusId = nextAction?.missionId || nextAction?.chapterId;
  const chapter =
    (focusId && findChapter(ctx.data, focusId)) ||
    getTodayChapter(ctx.data, ctx.state);
  const module = getChapterModule(ctx.data, chapter.id) || getActiveModule(ctx.data, ctx.state);
  let mission = null as ReturnType<typeof getNormalizedCourseData>["missionsById"][string] | null;
  try {
    mission = getNormalizedCourseData().missionsById[chapter.id] || null;
  } catch {
    mission = null;
  }
  const session = getSessionProgress(ctx.state, chapter.id);
  const readiness = getChapterReadiness(ctx.data, ctx.state, chapter);
  const estimatedMinutes = mission?.estimatedMinutes || getEstimatedSessionMinutes(chapter);
  const stepMinutes = Math.max(8, Math.round(estimatedMinutes / READER_STEPS.length));
  const evidence = mission ? getMissionLearningEvidence(mission, ctx.state) : null;
  const studyStreak = getStudyStreak(ctx.state);

  const steps: MissionStepView[] = READER_STEPS.map((step) => {
    const display = STEP_DISPLAY[step.id];
    const objectives = chapter.fullContent?.objectives?.slice(0, 3) || [];

    return {
      id: step.id,
      label: display.label,
      shortLabel: display.shortLabel,
      hint: step.hint,
      state: "upcoming" as MissionStepState,
      estimatedMinutes: stepMinutes,
      href: `#reader/${chapter.id}/${step.id}`,
      learnings: objectives.length ? objectives.slice(0, 3) : display.learnings
    };
  });

  const chapterDone = isCompleted(ctx.state, chapter.id);
  const allStepsVisited = session.percent === 100;
  const studyDone = chapterDone || allStepsVisited;
  const mastered = hasMasteryEvidence(ctx.state, chapter.id);
  const completed = mastered;

  let assignedCurrent = false;
  for (const step of steps) {
    if (hasStepLearningEvidence(ctx.state, chapter.id, step.id, mission)) {
      step.state = "done";
      continue;
    }
    if (!assignedCurrent) {
      step.state = "current";
      assignedCurrent = true;
    } else {
      step.state = "upcoming";
    }
  }
  if (!assignedCurrent && steps.length) {
    for (const step of steps) step.state = "done";
  }

  for (const step of steps) {
    if (step.state !== "current" || step.id !== "explain") {
      step.learnings = STEP_DISPLAY[step.id].learnings;
    }
  }

  const currentStep = steps.find((step) => step.state === "current") || steps[steps.length - 1];
  const upcomingSteps = steps.filter((step) => step.state === "upcoming");
  const doneSteps = steps.filter((step) => step.state === "done");
  const remainingOpenSteps = steps.filter((step) => step.state !== "done").length;
  const remainingSteps = mastered ? 0 : Math.max(1, remainingOpenSteps);
  const remainingMinutes = mastered
    ? 0
    : studyDone
      ? Math.max(12, stepMinutes)
      : remainingSteps * stepMinutes;
  const lastDone = doneSteps[doneSteps.length - 1] || null;

  const chapterIndex = getChapterIndex(ctx.data, chapter.id);
  const nextChapter = ctx.data.chapters[chapterIndex + 1] || null;
  const nextMission = nextChapter
    ? { title: nextChapter.title, href: `#reader/${nextChapter.id}/explain` }
    : null;

  const description =
    chapter.fullContent?.introduction?.[0] ||
    chapter.summary ||
    chapter.description ||
    mission?.description ||
    "Continue a missão guiada desta jornada.";

  const difficulty = mission?.difficulty || parseDifficulty(chapter.fullContent?.difficulty || chapter.difficulty);
  const importance = mission?.examRelevance || "medium";

  const lastStudiedKey = ctx.state.studyDates.length
    ? ctx.state.studyDates[ctx.state.studyDates.length - 1]
    : null;
  const lastChapterStudied = ctx.state.lastStudiedAt[chapter.id];
  const startedLabel = lastChapterStudied
    ? formatDay(stampToLocalDayKey(lastChapterStudied))
    : lastStudiedKey
      ? formatDay(lastStudiedKey)
      : "Ainda não iniciada";

  const evidenceDoneCount = doneSteps.length;
  const evidencePercent = Math.round((evidenceDoneCount / Math.max(steps.length, 1)) * 100);

  const celebration: MissionCelebration = mastered
    ? {
        show: true,
        title: "Domínio comprovado",
        detail: evidence
          ? `${evidence.summaryLabel} · ${nextMission ? `Próxima: ${nextMission.title}` : "Trilha liberada"}`
          : (nextMission ? `Próxima: ${nextMission.title}` : "Trilha liberada")
      }
    : evidenceDoneCount === steps.length
      ? {
          show: true,
          title: "Percurso com evidência",
          detail: "Todas as etapas têm produção. Próximo: prove o domínio no teste."
        }
      : lastDone
        ? {
            show: true,
            title: "Evidência da etapa ok",
            detail: `✓ ${lastDone.shortLabel} · Próxima: ${currentStep.shortLabel}`
          }
        : { show: false, title: "", detail: "" };

  const hierarchyCrumb = `${module.title} › ${chapter.title}`;

  return {
    chapter,
    module,
    mission,
    title: chapter.title,
    description: truncate(description, 160),
    estimatedMinutes,
    difficultyLabel: DIFFICULTY_LABELS[difficulty] || "Intermediário",
    importanceLabel: IMPORTANCE_LABELS[importance],
    continueHref: nextAction?.href
      || (mastered ? (nextMission?.href || "#course") : studyDone ? `#mastery/${chapter.id}` : `#reader/${chapter.id}/${currentStep.id}`),
    continueLabel: nextAction
      ? labelForLearningAction(nextAction)
      : mastered
        ? (nextMission ? "Próxima missão" : "Abrir trilha")
        : studyDone
          ? "Provar domínio"
          : evidenceDoneCount > 0
            ? "Continuar missão"
            : "Começar missão",
    sessionPercent: evidencePercent,
    evidencePercent,
    masteryPassed: mastered,
    hierarchyCrumb,
    currentStepIndex: steps.findIndex((step) => step.id === currentStep.id) + 1,
    stepsTotal: steps.length,
    remainingMinutes,
    doneCount: evidenceDoneCount,
    studyStreak,
    steps,
    currentStep,
    upcomingSteps,
    celebration,
    nextMission,
    rewards: {
      potentialXp: evidence?.potentialXp || 0,
      earnedXp: evidence?.earnedXp || 0,
      xpLabel: evidence?.rewardXpLabel || "XP só após domínio comprovado",
      competencyLabel: evidence?.competencyLabel || "Competências do capítulo",
      reviewLabel: evidence?.reviewLabel || "Após o domínio",
      practiceLabel: evidence?.practiceLabel || "Sem exercícios marcados",
      masteryLabel: evidence?.masteryLabel || "Teste ainda não feito",
      nextMissionLabel: nextMission ? nextMission.title : "Fim do módulo atual",
      evidenceSummary: evidence?.summaryLabel || "Ainda sem evidência registrada"
    },
    evidence,
    summary: {
      learningField: `${module.title} · ${module.subtitle}`,
      situation: mission
        ? truncate(`${module.title} › ${chapter.title}`, 72)
        : truncate(module.description || module.subtitle, 72),
      status: evidence
        ? evidence.summaryLabel
        : mastered
          ? "Domínio comprovado"
          : studyDone
            ? "Estudo concluído"
            : session.completed > 0
              ? "Em andamento"
              : "Disponível",
      startedLabel,
      lastActivityLabel: readiness.label
    },
    materials: [
      { label: "Guia da missão", href: `#reader/${chapter.id}/explain`, kind: "guide" },
      { label: "Caso prático", href: `#reader/${chapter.id}/praxis`, kind: "map" },
      { label: "Checklist AP1", href: `#reader/${chapter.id}/ap1`, kind: "checklist" },
      { label: "Glossário", href: "#glossary", kind: "glossary" }
    ],
    tip: tipForStep(currentStep.id, currentStep.hint),
    completed,
    nextAction
  };
}

function tipForStep(id: ReaderTab, hint: string): string {
  if (id === "explain") return "Leia com calma e feche a etapa só quando conseguir explicar a ideia em 2 frases.";
  if (id === "praxis") return "Conecte o conceito a um cenário real de suporte ou infraestrutura.";
  if (id === "vocab") return "Produza antes de ver: digite o significado em PT e só então confira.";
  if (id === "practice") return "Escreva a resposta, confira o gabarito e marque Acertei/Errei com honestidade.";
  if (id === "ap1") return "Marque os critérios da tarefa aplicada — isso libera o teste de domínio.";
  return hint;
}

function parseDifficulty(raw?: string): number {
  const value = (raw || "").toLowerCase();
  if (value.includes("easy") || value.includes("leicht") || value.includes("inici")) return 1;
  if (value.includes("hard") || value.includes("schwer") || value.includes("avanc")) return 4;
  return 2;
}

function truncate(text: string, max: number): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function formatDay(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  if (!y || !m || !d) return key;
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}
