import { getChapterModule } from "../course";
import { getMockExamPool, pickBalancedQuestions } from "../mockExam";
import type { AzubiForgeData, MockExamAttempt, MockExamQuestion } from "../../types";

export function getLernfeldQuestionPool(data: AzubiForgeData, learningFieldId: string): MockExamQuestion[] {
  return getMockExamPool(data).filter((question) => {
    const module = getChapterModule(data, question.chapterId);
    return module?.id === learningFieldId;
  });
}

export function createLernfeldSimulation(
  data: AzubiForgeData,
  learningFieldId: string,
  moduleTitle: string,
  questionCount = 10,
  durationMinutes = 20
): MockExamAttempt | null {
  const pool = getLernfeldQuestionPool(data, learningFieldId);
  if (!pool.length) return null;

  const questions = pickBalancedQuestions(pool, Math.min(questionCount, pool.length));
  const now = new Date().toISOString();

  return {
    id: `lernfeld-${learningFieldId}-${Date.now()}`,
    length: "short",
    status: "active",
    startedAt: now,
    durationMinutes,
    currentIndex: 0,
    questions,
    responses: Object.fromEntries(questions.map((question) => [question.id, {}])),
    learningFieldId,
    simulationLabel: `Simulado ${moduleTitle}`
  };
}

export function listAvailableLernfelder(data: AzubiForgeData): Array<{ id: string; title: string; poolSize: number }> {
  return data.modules.map((module) => ({
    id: module.id,
    title: module.subtitle || module.title,
    poolSize: getLernfeldQuestionPool(data, module.id).length
  })).filter((item) => item.poolSize > 0);
}
