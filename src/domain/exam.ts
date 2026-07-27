import {
  getChapterExercises,
  getChapterModule,
  getChapterReadiness,
  getReviewQueue,
  isCompleted
} from "./course";
import type { AppState, AzubiForgeData, Chapter, Exercise, Readiness } from "../types";

export interface SignalWort {
  de: string;
  pt: string;
  expect: string;
  tip: string;
  example: string;
}

export interface WeakChapter {
  chapter: Chapter;
  readiness: Readiness;
  moduleTitle: string;
}

export interface Ap1DrillItem extends Exercise {
  chapterId: string;
  chapterTitle: string;
  style: "ap1" | "mixed";
}

export const SIGNAL_WORDS: SignalWort[] = [
  {
    de: "nennen",
    pt: "citar / nomear",
    expect: "Liste pontos curtos e objetivos. Sem explicacao longa.",
    tip: "Resposta tipica: 2 a 4 itens claros.",
    example: "Nennen Sie zwei Vorteile einer SSD."
  },
  {
    de: "beschreiben",
    pt: "descrever",
    expect: "Diga o que e e como funciona, em ordem simples.",
    tip: "Use: Was ist das? Wie laeuft es ab?",
    example: "Beschreiben Sie den Boot-Prozess."
  },
  {
    de: "erklaeren",
    pt: "explicar",
    expect: "Mostre causa e efeito. Por que acontece?",
    tip: "Ligue sintoma -> causa -> consequencia.",
    example: "Erklaeren Sie, warum zu wenig RAM den PC verlangsamt."
  },
  {
    de: "begruenden",
    pt: "justificar",
    expect: "Escolha + motivo tecnico curto.",
    tip: "Formule: Deshalb, weil ...",
    example: "Begruenden Sie, warum ein Router noetig ist."
  },
  {
    de: "vergleichen",
    pt: "comparar",
    expect: "Mostre diferencas relevantes para a decisao.",
    tip: "Use uma tabela mental: A vs B.",
    example: "Vergleichen Sie TCP und UDP."
  },
  {
    de: "zuordnen",
    pt: "associar / classificar",
    expect: "Ligue termos, camadas ou funcoes corretamente.",
    tip: "Procure a palavra-chave de cada item.",
    example: "Ordnen Sie Dienste den OSI-Schichten zu."
  },
  {
    de: "berechnen",
    pt: "calcular",
    expect: "Mostre a conta e a unidade final.",
    tip: "Escreva os passos, nao so o resultado.",
    example: "Berechnen Sie den Speicherbedarf."
  },
  {
    de: "beurteilen",
    pt: "avaliar",
    expect: "Pese vantagens, riscos e contexto da empresa.",
    tip: "Conclua com uma recomendacao clara.",
    example: "Beurteilen Sie den Austausch von HDD durch SSD."
  }
];

export const EXAM_CHECKLIST = [
  "Eu reconheco Signalwoerter no enunciado (nennen, erklaeren, begruenden...).",
  "Eu sei explicar Hardware basico com exemplos de empresa.",
  "Eu diferencio RAM, SSD/HDD e sintomas de gargalo.",
  "Eu entendo tarefas basicas do Betriebssystem.",
  "Eu sei o papel de Switch, Router, DNS, DHCP e Firewall.",
  "Eu evito confusoes classicas (DNS vs DHCP, RAM vs SSD, Prozess vs Thread).",
  "Eu consigo justificar uma decisao tecnica em 1-3 frases.",
  "Eu revisei meus erros marcados e capitulos fracos."
];

export function getWeakChapters(data: AzubiForgeData, state: AppState, limit = 6): WeakChapter[] {
  return data.chapters
    .map((chapter) => ({
      chapter,
      readiness: getChapterReadiness(data, state, chapter),
      moduleTitle: getChapterModule(data, chapter.id)?.subtitle || "Curso"
    }))
    .filter((item) => item.readiness.level < 4 || state.confidence[item.chapter.id] === "review" || state.confidence[item.chapter.id] === "hard")
    .sort((a, b) => {
      if (a.readiness.level !== b.readiness.level) return a.readiness.level - b.readiness.level;
      return a.readiness.percent - b.readiness.percent;
    })
    .slice(0, limit);
}

export function getAp1DrillExercises(data: AzubiForgeData, state: AppState, limit = 20): Ap1DrillItem[] {
  const weakIds = new Set(getWeakChapters(data, state, 12).map((item) => item.chapter.id));
  const queueIds = new Set(getReviewQueue(data, state).map((chapter) => chapter.id));
  const prioritized = [
    ...data.chapters.filter((chapter) => weakIds.has(chapter.id)),
    ...data.chapters.filter((chapter) => queueIds.has(chapter.id) && !weakIds.has(chapter.id)),
    ...data.chapters.filter((chapter) => !weakIds.has(chapter.id) && !queueIds.has(chapter.id))
  ];

  const ap1First: Ap1DrillItem[] = [];
  const fallback: Ap1DrillItem[] = [];

  prioritized.forEach((chapter) => {
    const full = chapter.fullContent?.exercises;
    if (full?.ap1Style?.length) {
      full.ap1Style.forEach((exercise) => {
        ap1First.push({
          ...exercise,
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          style: "ap1"
        });
      });
    } else {
      getChapterExercises(chapter).slice(0, 2).forEach((exercise) => {
        fallback.push({
          ...exercise,
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          style: "mixed"
        });
      });
    }
  });

  return [...ap1First, ...fallback].slice(0, limit);
}

export function getExamReadinessSummary(data: AzubiForgeData, state: AppState): {
  weakCount: number;
  readyCount: number;
  drillCount: number;
  completedCount: number;
} {
  const weak = getWeakChapters(data, state, data.chapters.length);
  const readyCount = data.chapters.filter((chapter) => getChapterReadiness(data, state, chapter).level >= 4).length;
  return {
    weakCount: weak.length,
    readyCount,
    drillCount: getAp1DrillExercises(data, state, 50).length,
    completedCount: data.chapters.filter((chapter) => isCompleted(state, chapter.id)).length
  };
}

export function detectSignalWort(question: string): SignalWort | undefined {
  const lower = question.toLowerCase();
  return SIGNAL_WORDS.find((item) => lower.includes(item.de.toLowerCase()));
}
