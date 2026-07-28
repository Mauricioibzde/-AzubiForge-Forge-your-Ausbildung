import type { AzubiForgeData, Chapter } from "../../types";
import type { Competency, LearningField, LearningSituationSchema, NormalizedCourse } from "../../schemas/course";
import { courseInfoFromLegacy, DEFAULT_PLANNER_CONFIG } from "../../schemas/course";
import type { Mission } from "../../schemas/mission";
import { adaptLegacyChapterToMission } from "./legacyChapterToMission";

function chapterById(data: AzubiForgeData): Map<string, Chapter> {
  return new Map(data.chapters.map((chapter) => [chapter.id, chapter]));
}

function buildCompetencies(missions: Mission[]): Competency[] {
  const map = new Map<string, Competency>();

  missions.forEach((mission) => {
    mission.competencyIds.forEach((competencyId) => {
      const existing = map.get(competencyId);
      if (existing) {
        if (!existing.missionIds.includes(mission.id)) {
          existing.missionIds.push(mission.id);
        }
        return;
      }

      map.set(competencyId, {
        id: competencyId,
        learningFieldId: mission.learningFieldId,
        title: competencyId.replace(/-/g, " "),
        description: `Kompetenz aus Mission ${mission.title}`,
        missionIds: [mission.id]
      });
    });
  });

  return [...map.values()];
}

export function adaptLegacyCourseData(data: AzubiForgeData): NormalizedCourse {
  const chapters = chapterById(data);
  const missions: Mission[] = [];
  const learningFields: LearningField[] = [];
  const learningSituations: LearningSituationSchema[] = [];
  const situationMissionOrder = new Map<string, string[]>();

  data.modules.forEach((module) => {
    const situations = data.learningSituations?.[module.id] || [];
    const fieldMissionIds: string[] = [];
    const situationIds: string[] = [];

    if (situations.length) {
      situations.forEach((situation) => {
        situationIds.push(situation.id);
        const situationMissionIds: string[] = [];
        let previousMissionId: string | null = null;

        situation.chapterIds.forEach((chapterId, index) => {
          const chapter = chapters.get(chapterId);
          if (!chapter) return;

          const prerequisiteMissionIds = previousMissionId ? [previousMissionId] : [];
          const mission = adaptLegacyChapterToMission(chapter, {
            learningFieldId: module.id,
            learningSituationId: situation.id,
            missionIndex: index,
            prerequisiteMissionIds
          });

          missions.push(mission);
          situationMissionIds.push(mission.id);
          fieldMissionIds.push(mission.id);
          previousMissionId = mission.id;
        });

        situationMissionOrder.set(situation.id, situationMissionIds);
        learningSituations.push({
          id: situation.id,
          learningFieldId: module.id,
          title: situation.title,
          description: situation.description,
          missionIds: situationMissionIds
        });
      });
    } else {
      module.chapterIds.forEach((chapterId, index) => {
        const chapter = chapters.get(chapterId);
        if (!chapter) return;

        const syntheticSituationId = `${module.id}-default`;
        const previousId = index > 0 ? module.chapterIds[index - 1] : null;
        const mission = adaptLegacyChapterToMission(chapter, {
          learningFieldId: module.id,
          learningSituationId: syntheticSituationId,
          missionIndex: index,
          prerequisiteMissionIds: previousId ? [previousId] : []
        });

        missions.push(mission);
        fieldMissionIds.push(mission.id);

        if (!situationIds.includes(syntheticSituationId)) {
          situationIds.push(syntheticSituationId);
          learningSituations.push({
            id: syntheticSituationId,
            learningFieldId: module.id,
            title: module.title,
            description: module.description,
            missionIds: []
          });
        }

        const situation = learningSituations.find((row) => row.id === syntheticSituationId);
        if (situation) situation.missionIds.push(mission.id);
      });
    }

    learningFields.push({
      id: module.id,
      title: module.title,
      subtitle: module.subtitle,
      description: module.description,
      situationIds,
      missionIds: fieldMissionIds
    });
  });

  const missionsById = Object.fromEntries(missions.map((mission) => [mission.id, mission]));
  const competencies = buildCompetencies(missions);

  return {
    ...courseInfoFromLegacy(data.course),
    learningFields,
    learningSituations,
    competencies,
    missions,
    missionsById,
    plannerConfig: DEFAULT_PLANNER_CONFIG
  };
}

export function getMissionById(course: NormalizedCourse, missionId: string): Mission | undefined {
  return course.missionsById[missionId];
}

export function getMissionsForLearningField(course: NormalizedCourse, learningFieldId: string): Mission[] {
  const field = course.learningFields.find((row) => row.id === learningFieldId);
  if (!field) return [];
  return field.missionIds.map((id) => course.missionsById[id]).filter(Boolean);
}
