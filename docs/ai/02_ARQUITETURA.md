# 02 — Arquitetura e código

## Stack

| Camada | Tecnologia |
|---|---|
| Build | Vite 7 (`base: "./"`) |
| Linguagem | TypeScript (SPA sem React/Vue) |
| UI | HTML gerado por funções TS + `style.css` monolítico (~7k linhas) |
| Ícones | lucide |
| Testes unitários | Vitest (`src/**/*.test.ts`) — ~11 arquivos / ~42 testes |
| Smoke | Playwright (`npm run smoke`) |
| Offline | Service Worker manual `sw.js` (cache versionado, ex.: v69) |
| Persistência | `localStorage` chave `azubiforge.progress.v1` |
| Deploy | GitHub Actions → GitHub Pages (`dist/`) |

## Estrutura principal

```text
/
  data.js                    # Conteúdo do curso (window.AZUBIFORGE_DATA)
  data/deep-content.js       # Overrides profundos de fullContent (LF selecionados)
  index.html                 # Shell: sidebar, topbar, bottom-nav, #app
  style.css                  # Design system + todas as telas
  sw.js                      # Service worker
  src/
    main.ts                  # Bootstrap
    app.ts                   # Router hash + eventos + render
    types.ts                 # Tipos AppState / UI / Chapter
    data/                    # Loader + adapters → NormalizedCourse
    domain/                  # Regras pedagógicas puras
    state/                   # store.ts + bridge UserLearningState
    schemas/                 # Contratos Mission/Course/UserLearningState
    ui/                      # html helpers, navigation, icons
    views/                   # Telas por rota + missionPanel/
  docs/                      # Pedagogia, arquitetura, mobile, planejamento
  docs/ai/                   # Este pacote para IAs externas
```

## Rotas (hash)

| Rota | View | Função |
|---|---|---|
| `#home` | `homeView.ts` | Jornada — painel da missão atual |
| `#course` | `courseView.ts` | Trilha / catálogo Lernfeld |
| `#reader/:id/:tab?` | `readerView.ts` | Leitor 5 etapas |
| `#review` | `reviewView.ts` | Revisão legado (cards/deck) |
| `#glossary` | `glossaryView.ts` | Glossário |
| `#exam` / `#exam/:mode` | `examView.ts` | Treino AP1 |
| `#docs-ai` | `docsAiView.ts` | Exportar contexto para colar no ChatGPT |
| `#session` | `studySessionView.ts` | Sessão focada |
| `#mastery/:id` | `masteryTestView.ts` | Teste de domínio |
| `#review-mission` | assessment flow | Revisão espaçada de missão |
| `#checkpoint/:id` | assessment flow | Checkpoint de Lernsituation |

Rotas imersivas (escondem bottom-nav): reader, session, mastery, review-mission, checkpoint (+ exam com mock ativo).

## Domínio (`src/domain`)

| Módulo | Papel |
|---|---|
| `course.ts` | Capítulos, `READER_STEPS`, progresso, readiness, filas |
| `journey.ts` | Nós de jornada + continue href |
| `exam.ts` / `mockExam.ts` | Drill AP1, Signalwörter, mock cronometrado |
| `mission/engine.ts` | FSM de status de missão |
| `planner/generateDailyPlan.ts` | Plano diário determinístico |
| `session/studySession.ts` | Sessão focada pause/resume |
| `mastery/*` | Teste de domínio |
| `review/*` | Revisão espaçada por missão `[1,3,7,14,30,60]` dias |
| `checkpoint/*` | Avaliações por Lernsituation |
| `assessment/*` | Fluxo compartilhado self-check |
| `simulation/lernfeldSimulation.ts` | Simulado por Lernfeld |
| `dashboard/missionPanel.ts` | View-model da Home/Jornada |
| `dashboard/homeToday.ts` | Insights (revisões, missão em andamento) |

## Estado persistido (`AppState`)

Export envelope `version: 11`. Persiste entre outras coisas:

- `completed`, `lastChapterId`, `notes`, `confidence`
- `sessionSteps` (etapas visitadas por capítulo)
- `exerciseChecks` / `vocabChecks` / `reviewSchedule`
- `mockExam` + histórico
- `studyDates` / `lastStudiedAt`
- `preferences` (tema, meta diária, onboarding…)
- `activeStudySession` + histórico
- mastery / missionReview / checkpoint ativos + históricos

**Não persiste:** `UiState` (filtros, índices de flash, etc.).

## Dados

### Legacy (`data.js`)

- `course`, `modules[]`, `chapters[]` (~110 capítulos), `glossary[]`
- `learningSituations` por módulo
- Capítulo pode ter `fullContent` rico (objetivos, explicação, praxis, vocabulário, exercícios por nível, checklist)

### Deep content

`data/deep-content.js` sobrescreve/enriquece `fullContent` em tópicos curados (especialmente LF1/LF4/LF5).

### Camada normalizada

`getNormalizedCourseData()` adapta legacy → `NormalizedCourse`:

- LearningFields, Situations, Competencies, Missions
- Missão 1:1 com capítulo (`legacyChapterId`)
- Fases: prepare / learn / practice / apply / test
- `rewards.xp` derivado (não é ledger de usuário)

## Padrão de UI

- Views retornam **strings HTML**
- `app.ts` injeta em `#app` e registra listeners
- Design system: tokens CSS (`--primary`, `--accent`, `--surface`, fontes Inter + Playfair Display)
- Tema escuro premium como identidade principal

## Comandos

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
npm run preview
npm run smoke   # precisa de servidor ativo
```
