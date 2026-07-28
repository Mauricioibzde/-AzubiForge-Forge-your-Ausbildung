# Next Learning Action — fonte única de verdade

**Atualizado:** 2026-07-28  
**Módulo:** `src/domain/learning/nextLearningAction.ts`

## Regra pedagógica

Para o mesmo `AppState`, **todas** as CTAs principais devem responder a mesma pergunta:

> O que eu devo fazer agora?

Consumidores obrigatórios:

- Home / Jornada (`buildMissionPanelModel`)
- Trilha (`#course` strip Continuar)
- Plano de hoje (`todayPlanView`)
- Chip Continuar / `getNextJourneyHref`
- Continuar após mastery / review-missão / checkpoint (quando aplicável)

Telas **não** devem inventar uma próxima ação local independente.

## Ordem de prioridade

| Prioridade | `type` | `reason` | Quando |
|---:|---|---|---|
| 10 | `resume-session` | `active-session` | Sessão focada ativa ou pausada |
| 20 | `start-review` | `review-overdue` | Revisão de missão / schedule vencido |
| 30 | `retry-mastery` | `mastery-failed` | Último teste de domínio falhou |
| 40 | `start-mastery` | `mastery-pending` | Status `ready-for-test` |
| 50 | `start-checkpoint` | `checkpoint-ready` | Checkpoint liberado e não concluído |
| 60 | `start-practice` | `practice-pending` | `practice-required` / `study-completed` |
| 70 | `continue-study` | `mission-in-progress` | Missão `in-progress` / `needs-review` |
| 80 | `start-next-mission` | `next-mission` | Próxima missão `available`/`locked` |
| 90 | `start-exam` | `exam-recommended` | Trilha avançada (domínio provisório) |
| 100 | `course-complete` | `course-complete` | Todas as missões `mastered` |

## Persistência

Esta fase **não** altera:

- chave `azubiforge.progress.v1`
- envelope de export `version: 11`
- `data.js`

O resolver deriva progresso via `missionProgressFromLegacyState` (bridge não destrutivo).

## Mudança pedagógica documentada

Antes, Home usava `getTodayChapter` (fila de reforço/erros) e Trilha usava `getSuggestedChapter` / continue do módulo — recomendações podiam divergir.

Agora a CTA primária vem só de `resolveNextLearningAction`. A fila de revisão (`getReviewQueue`) continua existindo para a tela `#review` e reforços secundários, mas **não** define mais a ação global “agora”.
