# Learning Evidence — métricas honestas

**Atualizado:** 2026-07-28  
**Módulo:** `src/domain/learning/learningEvidence.ts` · `masteryGate.ts` · `productionCheck.ts`

## Mudança pedagógica

Antes, a Home mostrava:

- XP por etapa (inventado a partir do índice do capítulo)
- “+N XP” em celebrações sem ledger
- “1 competência” fixo

Isso era **gamificação vazia** e conflitava com a regra de honestidade das métricas.

## Regra atual

| Sinal | Fonte real | Mentira removida |
|---|---|---|
| XP ganho | `mission.rewards.xp` **somente** se houver mastery test **passed** | XP por clique/etapa |
| XP potencial | `mission.rewards.xp` do schema | Fórmula `80 + index * 10` |
| Prática | `exerciseChecks` Acertei/Errei | — |
| Domínio | `masteryTestHistory` | — |
| Revisão | `missionReviews` / schedule | “Revisão em 3 dias” genérico |
| Competências | `mission.competencyIds.length` | “1 competência” |

Nada disso altera o envelope **v11** (campos novos são opcionais e sanitizados).

## Produção antes do gabarito (fase A)

| Etapa | Evidência | Persistência |
|---|---|---|
| Vocab | Digitar significado DE→PT antes de conferir | `vocabAttempts` + `vocabChecks` |
| Practice | Digitar resposta antes do gabarito | `practiceAttempts` + `practiceRevealed` + `exerciseChecks` |
| Apply (AP1) | Critérios checados (≥70%) | `applyCriteriaChecks` |
| Mastery | Gate: ≥3 práticas, score ≥70%, apply se exigido | `evaluateMasteryGate` |

“Marcar estudo” (`completed[]`) **não** prova domínio. No painel da jornada, **missão concluída** = mastery passed.

## UI

A seção da Jornada passou de “Recompensas” para **Evidência de aprendizagem**, com prática, domínio, revisão, XP honesto e competências do mapa.

## Bridge

`userLearningStateFromAppState(state, course?)` agora preenche `missionProgress` e `reviews` quando o curso normalizado é passado — o planner e a Home compartilham o mesmo progresso derivado.
