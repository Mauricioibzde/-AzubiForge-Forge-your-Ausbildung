import type { Chapter } from "../../types";
import type { MissionActivity, StudyBlock } from "../../schemas/material";
import type {
  CompletionRules,
  ExamRelevance,
  Mission,
  MissionPhases,
  ReviewConfig
} from "../../schemas/mission";
import {
  DEFAULT_COMPLETION_RULES,
  DEFAULT_REVIEW_CONFIG
} from "../../schemas/mission";

export interface LegacyMissionContext {
  learningFieldId: string;
  learningSituationId: string;
  missionIndex: number;
  prerequisiteMissionIds: string[];
}

function parseStudyMinutes(studyTime?: string): number {
  if (!studyTime) return 35;
  const match = studyTime.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 35;
}

function parseDifficulty(raw?: string): 1 | 2 | 3 | 4 | 5 {
  const value = (raw || "medium").toLowerCase();
  if (value.includes("easy") || value.includes("leicht")) return 1;
  if (value.includes("hard") || value.includes("schwer")) return 4;
  return 2;
}

function examRelevanceFromChapter(chapter: Chapter): ExamRelevance {
  const stars = chapter.fullContent?.importance?.stars || "";
  if (stars.includes("★★★★★")) return "high";
  if (stars.includes("★★★★")) return "high";
  if (stars.includes("★★★")) return "medium";
  return "medium";
}

function competencyIdFor(chapterId: string, suffix: string): string {
  return `${chapterId}-${suffix}`;
}

function buildStudyBlocks(chapter: Chapter): StudyBlock[] {
  const fc = chapter.fullContent;
  const blocks: StudyBlock[] = [];

  if (fc?.objectives?.length) {
    blocks.push({
      id: `${chapter.id}-objectives`,
      type: "objective",
      title: "Lernziele",
      content: fc.objectives
    });
  }

  fc?.introduction?.forEach((paragraph, index) => {
    blocks.push({
      id: `${chapter.id}-intro-${index}`,
      type: "simple-explanation",
      content: [paragraph]
    });
  });

  fc?.explanation?.forEach((section, index) => {
    blocks.push({
      id: `${chapter.id}-explain-${index}`,
      type: "technical-explanation",
      title: section.title,
      content: section.paragraphs
    });
  });

  fc?.realWorldExamples?.forEach((example, index) => {
    blocks.push({
      id: `${chapter.id}-real-${index}`,
      type: "workplace-scenario",
      content: [example]
    });
  });

  fc?.vocabulary?.forEach((row, index) => {
    blocks.push({
      id: `${chapter.id}-term-${index}`,
      type: "important-term",
      title: row.de,
      content: [`${row.pt}: ${row.explanation}`, `Beispiel: ${row.example}`]
    });
  });

  fc?.commonMistakes?.forEach((mistake, index) => {
    blocks.push({
      id: `${chapter.id}-mistake-${index}`,
      type: "common-mistake",
      content: [mistake]
    });
  });

  fc?.summary?.forEach((line, index) => {
    blocks.push({
      id: `${chapter.id}-summary-${index}`,
      type: "summary",
      content: [line]
    });
  });

  if (fc?.revisionChecklist?.length) {
    blocks.push({
      id: `${chapter.id}-checklist`,
      type: "checklist",
      title: "Das musst du wissen",
      content: fc.revisionChecklist
    });
  }

  if (!blocks.length) {
    chapter.text.forEach((paragraph, index) => {
      blocks.push({
        id: `${chapter.id}-text-${index}`,
        type: "explanation",
        content: [paragraph]
      });
    });
  }

  return blocks;
}

function exercisesToActivities(
  chapter: Chapter,
  competencyIds: string[],
  tier: "practice" | "apply" | "test",
  source: "legacy" | "easy" | "intermediate" | "ap1"
): MissionActivity[] {
  const fc = chapter.fullContent;
  let exercises = chapter.exercises || [];

  if (source === "easy") exercises = fc?.exercises.easy || [];
  if (source === "intermediate") exercises = fc?.exercises.intermediate || [];
  if (source === "ap1") exercises = fc?.exercises.ap1Style || [];

  const difficulty = tier === "test" ? 3 : tier === "apply" ? 2 : 1;

  return exercises.map((exercise, index) => ({
    id: `${chapter.id}-${tier}-${source}-${index}`,
    type: tier === "test" ? "scenario-choice" : "open-question",
    title: exercise.question.slice(0, 80),
    instruction: exercise.question,
    difficulty,
    estimatedMinutes: tier === "test" ? 3 : 2,
    points: tier === "test" ? 10 : 5,
    competencyIds,
    question: exercise.question,
    answer: exercise.answer,
    explanation: exercise.explanation || exercise.answer,
    criteria: tier === "apply"
      ? [
          "Nennt eine konkrete Prüfung oder Entscheidung",
          "Begründet mit Bezug zur Situation",
          "Verwendet passende Fachbegriffe"
        ]
      : undefined,
    modelAnswer: exercise.answer,
    minimumCriteria: tier === "apply" ? 2 : undefined
  }));
}

function buildApplyActivities(chapter: Chapter, competencyIds: string[]): MissionActivity[] {
  const fc = chapter.fullContent;
  const fromExamples = (fc?.practicalExamples || []).map((example, index) => ({
    id: `${chapter.id}-apply-example-${index}`,
    type: "scenario-choice" as const,
    title: example.title,
    instruction: `Fall lösen: Was prüfen oder entscheiden Sie zuerst — und warum?`,
    difficulty: 2 as const,
    estimatedMinutes: 5,
    points: 10,
    competencyIds,
    question: example.paragraphs.join(" "),
    answer: (example.steps || []).join(" → "),
    explanation: chapter.example,
    criteria: [
      "Nennt eine konkrete Prüfung oder Entscheidung",
      "Begründet mit Bezug zur Situation",
      "Verwendet passende Fachbegriffe"
    ],
    modelAnswer: (example.steps || []).join("\n"),
    minimumCriteria: 2
  }));

  // One strong required apply case — extras stay in practice, not as checkbox spam.
  const primary = fromExamples[0]
    || exercisesToActivities(chapter, competencyIds, "apply", "intermediate")[0]
    || null;
  return primary ? [primary] : [];
}

function buildPhases(chapter: Chapter, competencyIds: string[], estimatedMinutes: number): MissionPhases {
  const learnBlocks = buildStudyBlocks(chapter);
  const practiceActivities = [
    ...exercisesToActivities(chapter, competencyIds, "practice", "easy"),
    ...exercisesToActivities(chapter, competencyIds, "practice", "legacy").slice(0, 2)
  ];
  const applyActivities = buildApplyActivities(chapter, competencyIds);
  const testPool = exercisesToActivities(chapter, competencyIds, "test", "ap1");

  const prepareMinutes = 2;
  const learnMinutes = Math.round(estimatedMinutes * 0.4);
  const practiceMinutes = Math.round(estimatedMinutes * 0.25);
  const applyMinutes = Math.round(estimatedMinutes * 0.2);
  const testMinutes = Math.max(6, estimatedMinutes - prepareMinutes - learnMinutes - practiceMinutes - applyMinutes);

  return {
    prepare: {
      estimatedMinutes: prepareMinutes,
      blocks: [
        {
          id: `${chapter.id}-prepare`,
          type: "objective",
          title: "Mission",
          content: [chapter.description, chapter.summary]
        }
      ]
    },
    learn: {
      estimatedMinutes: learnMinutes,
      required: true,
      blocks: learnBlocks
    },
    practice: {
      estimatedMinutes: practiceMinutes,
      required: true,
      activities: practiceActivities
    },
    apply: {
      estimatedMinutes: applyMinutes,
      required: applyActivities.length > 0,
      activities: applyActivities
    },
    test: {
      estimatedMinutes: testMinutes,
      required: true,
      questionPoolIds: testPool.map((activity) => activity.id),
      questionCount: Math.min(8, Math.max(3, testPool.length)),
      passingScore: DEFAULT_COMPLETION_RULES.minimumMasteryTestScore
    }
  };
}

export function adaptLegacyChapterToMission(
  chapter: Chapter,
  context: LegacyMissionContext,
  rules: CompletionRules = DEFAULT_COMPLETION_RULES,
  reviewConfig: ReviewConfig = DEFAULT_REVIEW_CONFIG
): Mission {
  const competencyIds = [
    competencyIdFor(chapter.id, "understand"),
    competencyIdFor(chapter.id, "apply")
  ];
  const estimatedMinutes = parseStudyMinutes(chapter.fullContent?.studyTime || chapter.studyTime);
  const phases = buildPhases(chapter, competencyIds, estimatedMinutes);
  const objective = chapter.fullContent?.objectives?.[0] || chapter.summary;

  return {
    id: chapter.id,
    legacyChapterId: chapter.id,
    learningFieldId: context.learningFieldId,
    learningSituationId: context.learningSituationId,
    title: chapter.title,
    description: chapter.description,
    objective,
    competencyIds,
    prerequisiteMissionIds: context.prerequisiteMissionIds,
    difficulty: parseDifficulty(chapter.fullContent?.difficulty || chapter.difficulty),
    estimatedMinutes,
    examRelevance: examRelevanceFromChapter(chapter),
    phases,
    completionRules: rules,
    reviewConfig,
    rewards: { xp: 80 + context.missionIndex * 10 }
  };
}

/** Canonical LF1 example mission (rechte-pflichten) for tests and documentation. */
export const LF1_EXAMPLE_MISSION_ID = "rechte-pflichten";
