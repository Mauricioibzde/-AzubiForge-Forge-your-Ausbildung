import { describe, expect, it } from "vitest";
import { adaptLegacyChapterToMission, LF1_EXAMPLE_MISSION_ID } from "../../data/adapters/legacyChapterToMission";
import { adaptLegacyCourseData } from "../../data/adapters/legacyCourseAdapter";
import type { Chapter } from "../../types";

const sampleChapter: Chapter = {
  id: LF1_EXAMPLE_MISSION_ID,
  title: "Rechte und Pflichten",
  description: "Rechte und Pflichten in der Ausbildung.",
  text: ["Intro paragraph."],
  ihk: "BBiG, Probezeit, Verguetung",
  summary: "Azubi hat Rechte und Pflichten.",
  example: "Ausbildungsnachweis fuehren.",
  exercises: [{ question: "Nennen Sie eine Pflicht.", answer: "Nachweis fuehren." }],
  studyTime: "50 Minuten",
  difficulty: "Medium",
  fullContent: {
    studyTime: "50 Minuten",
    difficulty: "Medium",
    importance: { stars: "★★★★★", explanation: ["AP1 classic"] },
    objectives: ["Rechte und Pflichten unterscheiden."],
    introduction: ["BBiG regelt Ausbildung."],
    explanation: [{ title: "Rechte", paragraphs: ["Verguetung", "Berufsschule"] }],
    realWorldExamples: ["Nachweis bis Freitag."],
    practicalExamples: [{
      title: "Nachweis",
      paragraphs: ["Woechentlicher Eintrag."],
      steps: ["Oeffnen", "Schreiben", "Unterschrift"]
    }],
    diagrams: [],
    ihkFocus: {
      appears: ["BBiG"],
      commonMistakes: [],
      importantDetails: [],
      confusedConcepts: [],
      vocabulary: []
    },
    commonMistakes: ["Probezeit verwechseln."],
    vocabulary: [{
      de: "BBiG",
      pt: "lei da formacao",
      explanation: "Bundesgesetz.",
      example: "Rechte und Pflichten."
    }],
    summary: ["Rechte vs Pflichten."],
    mindMap: { title: "Map", code: "A -> B" },
    exercises: {
      easy: [{ question: "Was ist BBiG?", answer: "Gesetz." }],
      intermediate: [{ question: "Pflicht Azubi?", answer: "Nachweis." }],
      ap1Style: [{ question: "AP1: Berufsschule optional?", answer: "Falsch." }]
    },
    related: { previous: "Duales System", next: "Mitbestimmung" },
    revisionChecklist: ["Rechte nennen.", "Pflichten nennen."]
  }
};

describe("legacyChapterToMission", () => {
  it("builds LF1 example mission with phases", () => {
    const mission = adaptLegacyChapterToMission(sampleChapter, {
      learningFieldId: "lf1",
      learningSituationId: "lf1-rolle",
      missionIndex: 1,
      prerequisiteMissionIds: ["duales-system"]
    });

    expect(mission.id).toBe(LF1_EXAMPLE_MISSION_ID);
    expect(mission.learningFieldId).toBe("lf1");
    expect(mission.learningSituationId).toBe("lf1-rolle");
    expect(mission.phases.learn.blocks.length).toBeGreaterThan(0);
    expect(mission.phases.test.questionCount).toBeGreaterThan(0);
    expect(mission.prerequisiteMissionIds).toEqual(["duales-system"]);
    expect(mission.completionRules.minimumMasteryTestScore).toBe(80);
  });
});

describe("legacyCourseAdapter", () => {
  it("produces missions for all modules", () => {
    const data = {
      course: { id: "test", title: "Test", description: "Test" },
      modules: [{
        id: "lf1",
        title: "LF1",
        subtitle: "Sub",
        description: "Desc",
        chapterIds: ["duales-system", LF1_EXAMPLE_MISSION_ID]
      }],
      chapters: [sampleChapter, {
        ...sampleChapter,
        id: "duales-system",
        title: "Duales System"
      }],
      glossary: [],
      learningSituations: {
        lf1: [{
          id: "lf1-rolle",
          title: "Rolle",
          description: "Desc",
          chapterIds: ["duales-system", LF1_EXAMPLE_MISSION_ID]
        }]
      }
    };

    const normalized = adaptLegacyCourseData(data);
    expect(normalized.missions.length).toBe(2);
    expect(normalized.learningFields.length).toBe(1);
    expect(normalized.learningSituations[0].missionIds.length).toBe(2);
    expect(normalized.missionsById[LF1_EXAMPLE_MISSION_ID].learningSituationId).toBe("lf1-rolle");
  });
});
