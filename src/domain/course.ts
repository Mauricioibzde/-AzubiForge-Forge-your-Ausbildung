import type {
  AppState,
  AzubiForgeData,
  Chapter,
  Exercise,
  GlossaryTerm,
  LearningSituation,
  Module,
  Progress,
  VocabularyRow
} from "../types";

export function findChapter(data: AzubiForgeData, chapterId: string): Chapter | undefined {
  return data.chapters.find((chapter) => chapter.id === chapterId);
}

export function getChapterIndex(data: AzubiForgeData, chapterId: string): number {
  return data.chapters.findIndex((chapter) => chapter.id === chapterId);
}

export function getChapterModule(data: AzubiForgeData, chapterId: string): Module | undefined {
  return data.modules.find((module) => module.chapterIds.includes(chapterId));
}

export function getChapterLearningSituation(data: AzubiForgeData, chapterId: string): LearningSituation | undefined {
  const module = getChapterModule(data, chapterId);
  if (!module) return undefined;

  return (data.learningSituations?.[module.id] || []).find((situation) => situation.chapterIds.includes(chapterId));
}

export function isCompleted(state: AppState, chapterId: string): boolean {
  return state.completed.includes(chapterId);
}

export function getCourseProgress(data: AzubiForgeData, state: AppState): Progress {
  const validCompleted = state.completed.filter((id) => Boolean(findChapter(data, id)));

  return {
    completed: validCompleted.length,
    total: data.chapters.length,
    percent: percentage(validCompleted.length, data.chapters.length)
  };
}

export function getModuleProgress(data: AzubiForgeData, state: AppState, module: Module): Progress {
  const moduleChapters = module.chapterIds.map((id) => findChapter(data, id)).filter(Boolean) as Chapter[];
  const completed = moduleChapters.filter((chapter) => isCompleted(state, chapter.id)).length;

  return {
    completed,
    total: moduleChapters.length,
    percent: percentage(completed, moduleChapters.length)
  };
}

export function getSuggestedChapter(data: AzubiForgeData, state: AppState): Chapter {
  return data.chapters.find((chapter) => !isCompleted(state, chapter.id)) || data.chapters[data.chapters.length - 1];
}

export function getReviewQueue(data: AzubiForgeData, state: AppState): Chapter[] {
  const priority = { hard: 0, review: 1, ok: 2, ready: 3 };
  const marked = data.chapters
    .filter((chapter) => state.confidence[chapter.id] === "hard" || state.confidence[chapter.id] === "review")
    .sort((a, b) => priority[state.confidence[a.id]] - priority[state.confidence[b.id]]);
  const open = data.chapters.filter((chapter) => !isCompleted(state, chapter.id)).slice(0, 8);
  const recall = data.chapters
    .filter((chapter) => isCompleted(state, chapter.id) && state.confidence[chapter.id] !== "ready")
    .slice(0, 4);

  return uniqueChapters([...marked, ...open, ...recall]);
}

export function getTodayChapter(data: AzubiForgeData, state: AppState): Chapter {
  return getReviewQueue(data, state)[0] || getSuggestedChapter(data, state);
}

export function getChapterExercises(chapter: Chapter): Exercise[] {
  const exercises = chapter.fullContent?.exercises;
  if (!exercises) return chapter.exercises || [];

  return [...exercises.easy, ...exercises.intermediate, ...exercises.ap1Style];
}

export function getReviewExercises(data: AzubiForgeData, state: AppState): Array<Exercise & { chapterId: string }> {
  const queue = getReviewQueue(data, state);
  const source = queue.length ? queue : data.chapters.slice(0, 6);

  return source.flatMap((chapter) => getChapterExercises(chapter).map((exercise) => ({
    ...exercise,
    chapterId: chapter.id
  })));
}

export function getVocabularyPreview(data: AzubiForgeData, state: AppState): GlossaryTerm[] {
  const queueText = getReviewQueue(data, state)
    .slice(0, 6)
    .map((chapter) => `${chapter.title} ${chapter.description} ${chapter.ihk} ${chapter.summary}`)
    .join(" ")
    .toLowerCase();
  const matched = data.glossary.filter((term) => queueText.includes(term.word.toLowerCase()));

  return [...matched, ...data.glossary.filter((term) => !matched.includes(term))];
}

export function getChapterVocabulary(data: AzubiForgeData, chapter: Chapter): VocabularyRow[] {
  if (chapter.fullContent?.vocabulary?.length) return chapter.fullContent.vocabulary;

  const searchable = `${chapter.title} ${chapter.description} ${chapter.ihk} ${chapter.summary} ${chapter.example}`.toLowerCase();
  const matched = data.glossary
    .filter((term) => searchable.includes(term.word.toLowerCase()))
    .slice(0, 10)
    .map((term) => ({
      de: term.word,
      pt: term.translation,
      explanation: term.explanation,
      example: chapter.example
    }));

  return matched.length ? matched : [{
    de: chapter.title,
    pt: "tema do capitulo",
    explanation: chapter.description,
    example: chapter.example
  }];
}

export function getReadingMinutes(chapter: Chapter): number {
  const exerciseText = getChapterExercises(chapter).flatMap((exercise) => [exercise.question, exercise.answer]);
  const content = [
    chapter.title,
    chapter.description,
    ...chapter.text,
    chapter.ihk,
    chapter.summary,
    chapter.example,
    ...exerciseText
  ].join(" ");
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
}

export function getNotesCount(state: AppState): number {
  return Object.values(state.notes).filter((note) => note.trim()).length;
}

function percentage(value: number, total: number): number {
  return total ? Math.round((value / total) * 100) : 0;
}

function uniqueChapters(items: Chapter[]): Chapter[] {
  const seen = new Set<string>();

  return items.filter((chapter) => {
    if (seen.has(chapter.id)) return false;
    seen.add(chapter.id);
    return true;
  });
}
