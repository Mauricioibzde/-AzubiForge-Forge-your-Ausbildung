import type { AppState, AzubiForgeData, Module, ReaderTab } from "../types";
import {
  findChapter,
  getResumeTab,
  getSessionProgress,
  getSuggestedChapter,
  getTodayChapter,
  getVisitedSteps,
  isCompleted,
  READER_STEPS
} from "./course";

export type JourneyNodeKind = "module" | "chapter" | "session-step" | "review-gate" | "exam-gate";

export type JourneyStatus = "done" | "current" | "open";

export interface JourneyNode {
  id: string;
  kind: JourneyNodeKind;
  title: string;
  subtitle: string;
  status: JourneyStatus;
  href: string;
  moduleId?: string;
  chapterId?: string;
  stepId?: ReaderTab;
  stepIndex?: number;
}

export interface JourneyProgress {
  total: number;
  completed: number;
  percent: number;
  current: JourneyNode | null;
}

export function getJourneyNodes(data: AzubiForgeData, state: AppState): JourneyNode[] {
  const nodes: JourneyNode[] = [];
  const focusChapter = getTodayChapter(data, state);
  const focusId = focusChapter.id;

  data.modules.forEach((module) => {
    nodes.push({
      id: `module-${module.id}`,
      kind: "module",
      title: module.title,
      subtitle: module.subtitle,
      status: getModuleJourneyStatus(data, state, module, focusId),
      href: `#course`,
      moduleId: module.id
    });

    module.chapterIds.forEach((chapterId) => {
      const chapter = findChapter(data, chapterId);
      if (!chapter) return;

      const isFocus = chapter.id === focusId;
      const chapterStatus = getChapterJourneyStatus(state, chapter.id, isFocus);
      nodes.push({
        id: `chapter-${chapter.id}`,
        kind: "chapter",
        title: chapter.title,
        subtitle: chapter.studyTime || "Sessao guiada",
        status: chapterStatus,
        href: `#reader/${chapter.id}/${getResumeTab(state, chapter.id)}`,
        moduleId: module.id,
        chapterId: chapter.id
      });

      if (isFocus && !isCompleted(state, chapter.id)) {
        const visited = getVisitedSteps(state, chapter.id);
        const session = getSessionProgress(state, chapter.id);
        READER_STEPS.forEach((step, index) => {
          const done = visited.includes(step.id);
          const current = !done && index === session.completed;
          nodes.push({
            id: `step-${chapter.id}-${step.id}`,
            kind: "session-step",
            title: step.label,
            subtitle: step.hint,
            status: done ? "done" : current ? "current" : "open",
            href: `#reader/${chapter.id}/${step.id}`,
            moduleId: module.id,
            chapterId: chapter.id,
            stepId: step.id,
            stepIndex: index
          });
        });
      }
    });
  });

  nodes.push({
    id: "gate-review",
    kind: "review-gate",
    title: "Revisao ativa",
    subtitle: "Consolidar erros e vocabulario",
    status: "open",
    href: "#review"
  });

  nodes.push({
    id: "gate-exam",
    kind: "exam-gate",
    title: "Treino AP1",
    subtitle: "Simulado e checklist",
    status: "open",
    href: "#exam/drill"
  });

  return nodes;
}

export function getJourneyProgress(data: AzubiForgeData, state: AppState): JourneyProgress {
  const chapterNodes = getJourneyNodes(data, state).filter((node) => node.kind === "chapter");
  const completed = chapterNodes.filter((node) => node.status === "done").length;
  const current = getJourneyNodes(data, state).find((node) => node.status === "current") || null;

  return {
    total: chapterNodes.length,
    completed,
    percent: chapterNodes.length ? Math.round((completed / chapterNodes.length) * 100) : 0,
    current
  };
}

export function getNextJourneyHref(data: AzubiForgeData, state: AppState): string {
  const nodes = getJourneyNodes(data, state).filter((node) => node.kind !== "module");
  const currentIndex = nodes.findIndex((node) => node.status === "current");
  if (currentIndex >= 0) return nodes[currentIndex].href;

  const nextOpen = nodes.find((node) => node.status === "open");
  if (nextOpen) return nextOpen.href;

  const suggested = getSuggestedChapter(data, state);
  return `#reader/${suggested.id}/${getResumeTab(state, suggested.id)}`;
}

function getModuleJourneyStatus(
  data: AzubiForgeData,
  state: AppState,
  module: Module,
  focusId: string
): JourneyStatus {
  const chapters = module.chapterIds.map((id) => findChapter(data, id)).filter(Boolean);
  if (!chapters.length) return "open";
  if (chapters.every((chapter) => isCompleted(state, chapter!.id))) return "done";
  if (module.chapterIds.includes(focusId)) return "current";
  const hasOpen = chapters.some((chapter) => !isCompleted(state, chapter!.id));
  return hasOpen ? "open" : "done";
}

function getChapterJourneyStatus(state: AppState, chapterId: string, isFocus: boolean): JourneyStatus {
  if (isCompleted(state, chapterId)) return "done";
  if (isFocus) return "current";
  return "open";
}
