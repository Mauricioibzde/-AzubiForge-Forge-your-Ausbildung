import { describe, expect, it } from "vitest";
import { createLernfeldSimulation, getLernfeldQuestionPool, listAvailableLernfelder } from "./lernfeldSimulation";

import type { AzubiForgeData } from "../../types";

const data = {
  course: { id: "c", title: "C", description: "D" },
  modules: [
    { id: "lf1", title: "LF1", subtitle: "LF1 Sub", description: "d", chapterIds: ["c1"] },
    { id: "lf2", title: "LF2", subtitle: "LF2 Sub", description: "d", chapterIds: ["c2"] }
  ],
  chapters: [
    {
      id: "c1",
      title: "C1",
      description: "d",
      text: [],
      ihk: "",
      summary: "",
      example: "",
      exercises: [{ question: "Q1", answer: "A1" }],
      fullContent: { exercises: { ap1Style: [{ question: "AP1", answer: "A" }] } }
    },
    {
      id: "c2",
      title: "C2",
      description: "d",
      text: [],
      ihk: "",
      summary: "",
      example: "",
      exercises: [{ question: "Q2", answer: "A2" }]
    }
  ],
  glossary: []
} as AzubiForgeData;

describe("lernfeldSimulation", () => {
  it("filters question pool by learning field", () => {
    const lf1Pool = getLernfeldQuestionPool(data, "lf1");
    expect(lf1Pool.every((question) => question.chapterId === "c1")).toBe(true);
  });

  it("creates timed lernfeld simulation", () => {
    const attempt = createLernfeldSimulation(data, "lf1", "LF1 Sub", 5, 15);
    expect(attempt).toBeTruthy();
    expect(attempt?.learningFieldId).toBe("lf1");
    expect(attempt?.durationMinutes).toBe(15);
    expect(attempt?.questions.length).toBeGreaterThan(0);
  });

  it("lists lernfelder with available questions", () => {
    const list = listAvailableLernfelder(data);
    expect(list.some((item) => item.id === "lf1")).toBe(true);
  });
});
