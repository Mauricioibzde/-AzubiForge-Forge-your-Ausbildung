import type { NormalizedCourse } from "../schemas/course";
import { getCourseData } from "./courseData";
import { adaptLegacyCourseData } from "./adapters/legacyCourseAdapter";

let cachedNormalized: NormalizedCourse | null = null;

/** Normalized course (missions, competencies, Lernfelder) built from legacy data.js. */
export function getNormalizedCourseData(): NormalizedCourse {
  if (!cachedNormalized) {
    cachedNormalized = adaptLegacyCourseData(getCourseData());
  }
  return cachedNormalized;
}

export function resetNormalizedCourseCache(): void {
  cachedNormalized = null;
}
