import type { AppContext } from "../../appContext";
import type { Chapter, Module, ReaderTab } from "../../types";
import type { Mission } from "../../schemas/mission";
import { getNormalizedCourseData } from "../../data/normalizedCourse";
import {
  READER_STEPS,
  getActiveModule,
  getChapterIndex,
  getChapterReadiness,
  getEstimatedSessionMinutes,
  getSessionProgress,
  getStudyStreak,
  getTodayChapter,
  getVisitedSteps,
  isCompleted,
  stampToLocalDayKey
} from "../course";

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
  xp: number;
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
    xp: number;
    competencyLabel: string;
    reviewLabel: string;
    nextMissionLabel: string;
  };
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
  const chapter = getTodayChapter(ctx.data, ctx.state);
  const module = getActiveModule(ctx.data, ctx.state);
  let mission = null as ReturnType<typeof getNormalizedCourseData>["missionsById"][string] | null;
  try {
    mission = getNormalizedCourseData().missionsById[chapter.id] || null;
  } catch {
    mission = null;
  }
  const session = getSessionProgress(ctx.state, chapter.id);
  const visited = new Set(getVisitedSteps(ctx.state, chapter.id));
  const readiness = getChapterReadiness(ctx.data, ctx.state, chapter);
  const estimatedMinutes = mission?.estimatedMinutes || getEstimatedSessionMinutes(chapter);
  const stepMinutes = Math.max(8, Math.round(estimatedMinutes / READER_STEPS.length));
  const xpTotal = mission?.rewards.xp || 80 + Math.max(0, ctx.data.chapters.findIndex((item) => item.id === chapter.id)) * 10;
  const stepXp = Math.max(20, Math.round(xpTotal / READER_STEPS.length));
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
      learnings: objectives.length ? objectives.slice(0, 3) : display.learnings,
      xp: stepXp
    };
  });

  const chapterDone = isCompleted(ctx.state, chapter.id);
  const allStepsVisited = session.percent === 100;
  const completed = chapterDone || allStepsVisited;

  let assignedCurrent = false;
  for (const step of steps) {
    if (visited.has(step.id)) {
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
  const remainingSteps = Math.max(completed ? 0 : 1, steps.filter((step) => step.state !== "done").length);
  const remainingMinutes = completed ? 0 : remainingSteps * stepMinutes;
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

  const celebration: MissionCelebration = completed
    ? {
        show: true,
        title: "Missão concluída",
        detail: `+${xpTotal} XP · ${nextMission ? `Próxima: ${nextMission.title}` : "Trilha liberada"}`
      }
    : lastDone
      ? {
          show: true,
          title: "Etapa concluída",
          detail: `✓ ${lastDone.shortLabel} · +${lastDone.xp} XP · Próxima: ${currentStep.shortLabel}`
        }
      : { show: false, title: "", detail: "" };

  return {
    chapter,
    module,
    mission,
    title: chapter.title,
    description: truncate(description, 160),
    estimatedMinutes,
    difficultyLabel: DIFFICULTY_LABELS[difficulty] || "Intermediário",
    importanceLabel: IMPORTANCE_LABELS[importance],
    continueHref: completed
      ? (nextMission?.href || "#course")
      : `#reader/${chapter.id}/${currentStep.id}`,
    continueLabel: completed
      ? (nextMission ? "Próxima missão" : "Abrir trilha")
      : session.completed > 0
        ? "Continuar missão"
        : "Começar missão",
    sessionPercent: session.percent,
    currentStepIndex: steps.findIndex((step) => step.id === currentStep.id) + 1,
    stepsTotal: steps.length,
    remainingMinutes,
    doneCount: doneSteps.length,
    studyStreak,
    steps,
    currentStep,
    upcomingSteps,
    celebration,
    nextMission,
    rewards: {
      xp: xpTotal,
      competencyLabel: "1 competência",
      reviewLabel: "Revisão em 3 dias",
      nextMissionLabel: nextMission ? nextMission.title : "Fim do módulo atual"
    },
    summary: {
      learningField: `${module.title} · ${module.subtitle}`,
      situation: truncate(module.description || module.subtitle, 72),
      status: completed ? "Concluída" : session.completed > 0 ? "Em andamento" : "Disponível",
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
    completed
  };
}

function tipForStep(id: ReaderTab, hint: string): string {
  if (id === "explain") return "Leia com calma e feche a etapa só quando conseguir explicar a ideia em 2 frases.";
  if (id === "praxis") return "Conecte o conceito a um cenário real de suporte ou infraestrutura.";
  if (id === "vocab") return "Treine recall: esconda a resposta e diga o termo em alemão antes de revelar.";
  if (id === "practice") return "Marque Acertei/Errei com honestidade — isso monta sua fila de revisão.";
  if (id === "ap1") return "Feche a evidência da sessão e anote o que ainda está frágil para a prova.";
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
