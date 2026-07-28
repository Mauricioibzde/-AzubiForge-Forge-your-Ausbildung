# Estrutura do data.js

## Organização de arquivos

Não manter tudo em um único arquivo gigante.

```text
src/
└── data/
    ├── course.js
    ├── competencies.js
    ├── glossary.js
    ├── question-bank.js
    ├── review-config.js
    ├── planner-config.js
    │
    ├── lf1/
    │   ├── index.js
    │   ├── overview.js
    │   ├── ls01.js
    │   ├── ls02.js
    │   ├── missions/
    │   └── assessments/
    │
    ├── lf2/
    ├── lf3/
    ├── lf4/
    └── lf5/
```

Arquivo central:

```js
export const courseData = {
  id: "azubiforge-grundstufe",
  title: "IT-Berufe Grundstufe",
  learningFields: [],
  competencies: [],
  plannerConfig: {},
  reviewConfig: {}
};
```

## Modelo completo de missão

```js
export const mission = {
  id: "lf1-ls1-m01",
  learningFieldId: "lf1",
  learningSituationId: "lf1-ls1",

  title: "Rechte und Pflichten verstehen",
  description:
    "Entenda os principais direitos e deveres envolvidos no Ausbildungsverhältnis.",

  objective:
    "Distinguir os direitos e deveres do Auszubildenden e do Ausbildungsbetriebs.",

  competencyIds: [
    "lf1-rights-duties-identify",
    "lf1-rights-duties-apply"
  ],

  prerequisiteMissionIds: [],

  difficulty: 2,
  estimatedMinutes: 35,
  examRelevance: "high",

  phases: {
    prepare: {
      estimatedMinutes: 2,
      blocks: []
    },

    learn: {
      estimatedMinutes: 12,
      required: true,
      blocks: []
    },

    practice: {
      estimatedMinutes: 8,
      required: true,
      activities: []
    },

    apply: {
      estimatedMinutes: 7,
      required: true,
      activities: []
    },

    test: {
      estimatedMinutes: 6,
      required: true,
      questionPoolIds: [],
      questionCount: 8,
      passingScore: 80
    }
  },

  completionRules: {
    requireAllStudyBlocks: true,
    minimumPracticeScore: 70,
    requireAppliedChallenge: true,
    minimumMasteryTestScore: 80,
    delayedReviewRequired: true,
    minimumDelayedReviewScore: 70
  },

  reviewConfig: {
    intervalsInDays: [1, 3, 7, 14, 30, 60]
  },

  rewards: {
    xp: 120
  }
};
```

## Estado local do usuário

```js
const userLearningState = {
  profile: {
    objective: "ap1",
    examDate: null,
    availableDays: [],
    minutesPerSession: 30
  },

  missionProgress: {
    "lf1-ls1-m01": {
      status: "in-progress",
      currentPhase: "practice",
      completedBlockIds: [],
      practiceScore: 70,
      masteryTestScore: null,
      attempts: 0,
      startedAt: null,
      completedAt: null
    }
  },

  competencyProgress: {
    "lf1-rights-duties-identify": {
      masteryLevel: 2,
      evidenceIds: [],
      lastInteractionAt: null
    }
  },

  reviews: [],

  dailyPlans: {},

  studySessions: [],

  questionHistory: {}
};
```

## Tipos de material

```js
"objective"
"explanation"
"simple-explanation"
"technical-explanation"
"definition"
"important-term"
"example"
"counterexample"
"analogy"
"workplace-scenario"
"step-by-step"
"comparison"
"table"
"checklist"
"warning"
"common-mistake"
"exam-tip"
"diagram"
"timeline"
"formula"
"calculation-example"
"code-example"
"summary"
"glossary"
"source-reference"
```

Exemplo:

```js
{
  type: "comparison",
  title: "Tarifvertrag oder Betriebsvereinbarung?",
  columns: ["Tarifvertrag", "Betriebsvereinbarung"],
  rows: [
    {
      label: "Parteien",
      values: [
        "Gewerkschaft und Arbeitgeberverband",
        "Betriebsrat und Arbeitgeber"
      ]
    }
  ]
}
```

## Compatibilidade com conteúdo antigo

Criar um adapter:

```js
function adaptLegacyChapterToMission(chapter) {
  return {
    id: chapter.id,
    title: chapter.title,
    description: chapter.description,
    phases: {
      learn: {
        blocks: chapter.content || []
      },
      practice: {
        activities: chapter.exercises || []
      }
    }
  };
}
```
