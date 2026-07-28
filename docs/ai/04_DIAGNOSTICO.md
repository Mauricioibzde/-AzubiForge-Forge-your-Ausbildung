# 04 — Diagnóstico: pontos positivos, ruins e oportunidades

Este arquivo é o coração da análise para outra IA.

## Pontos positivos

1. **Clareza de produto** — foco AP1 + offline + “próxima ação” é forte e diferenciado.
2. **Conteúdo estruturado** — Lernfelder, capítulos, fullContent, glossário e deep-content curado.
3. **Domínio pedagógico avançado** — missões, planner, sessão, mastery, revisão espaçada, checkpoints e simulados já existem no código.
4. **Jornada redesenhada** — Home virou painel de missão (Hero → Stepper → NextStep), alinhado a Learning Experience moderna.
5. **Mobile consciente** — bottom-nav, docks imersivos, safe-areas, correções de topbar/timeline.
6. **Offline real** — localStorage + service worker + GitHub Pages estático.
7. **Testes de domínio** — Vitest cobre motor/planner/session/mastery/review/checkpoints/integração (~42 testes).
8. **Identidade visual premium** — tokens, tema escuro, hierarquia tipográfica.
9. **Planejamento escrito** — `docs/azubiborge...` e docs pedagógicos dão norte (mesmo com drift parcial).
10. **Sem dependência de backend** — fácil de hospedar e entregar.

## Pontos ruins / riscos

1. **Dois mundos de progresso** — schemas `UserLearningState`/`MissionProgress` vs `AppState` legado; bridge incompleta.
2. **XP/competência cosmética** — UI mostra XP e “1 competência”, sem ledger persistido nem histórico real de conquistas.
3. **Home vs Planner desalinhados** — plano diário existe, mas a lista “Hoje” saiu da Home; sessão ainda depende do planner.
4. **Weekly planner ausente** — previsto no planejamento, não implementado.
5. **Conteúdo desigual** — ~110 capítulos; profundidade alta só em parte (deep-content).
6. **Self-check ≠ correção automática** — mastery/review/checkpoint dependem de honestidade do aluno.
7. **CSS monolítico** — `style.css` enorme; manutenção e regressões visuais fáceis.
8. **`script.js` legado** — arquivo grande fora do caminho Vite (ruído).
9. **Docs/ARCHITECTURE parcialmente desatualizados** — descrevem Home/domínio antigos.
10. **Docs AI no produto** — útil, mas tensiona o princípio “sem IA no produto” (é só export manual).
11. **Mobile Fase C/D incompleta** — AP1 lobby e densidade ainda podem poluir.
12. **Sem sync multi-dispositivo** — ok para offline, limite para alunos que trocam aparelho (mitigado por export/import).
13. **Chave localStorage `.v1` vs export v11** — versionamento de migração pouco explícito.
14. **Carga cognitiva residual** — ainda há atalhos/opções secundárias; risco de voltar ao “dashboard cheio”.

## Dívida técnica observável

| Item | Impacto |
|---|---|
| Bridge legado → mission state incompleta | Features novas não “grudam” no progresso real |
| `renderTodayPlanSection` órfão | Confusão de IA/feature |
| IndexedDB especificado, não usado | Limite de armazenamento a longo prazo |
| Poucos testes em `course.ts` / `store.ts` | Risco em progresso/readiness |
| SW manual (não Vite PWA) | Cache bumps manuais (vNN) |
| Journey timeline UI vs mission panel | Código morto ou semi-usado |

## Oportunidades de avanço (priorizáveis)

### P0 — Alto impacto / baixo risco de arquitetura

- Unificar “próxima ação” entre Jornada, Sessão e Trilha (uma fonte de verdade)
- Tornar XP/competências reais **ou** remover da UI até existir ledger
- Completar profundidade dos capítulos prioritários AP1 (não todos de uma vez)
- Fechar mobile Fase C (AP1 lobby + reader chrome)
- Atualizar `ARCHITECTURE.md` para o estado real

### P1 — Aprendizagem

- Weekly planner simples (visão semanal, sem overengineering)
- Feedback pós-etapa no reader alinhado ao celebration da Home
- Mapa de competências visível (mesmo que derivado)
- Direcionar falha de mastery → revisão guiada (já há hrefs; fortalecer UX)

### P2 — Produto / escala

- Separar CSS por área
- Migrar progressivamente UI para componentes mais explícitos
- Melhorar export/import (QR / file share) para troca de aparelho
- Smoke visual automatizado no CI
- Remover ou arquivar `script.js` legado

### P3 — Fora do núcleo (só se necessário)

- Conta/sync cloud (quebra offline-first se mal feito)
- IA dentro do app (contraria restrição atual)
- Gamificação pesada (risco de ruído)

## Critérios de sucesso (para a IA avaliar propostas)

Uma melhoria é boa se:

1. Responde melhor a **“O que faço agora?”**
2. Não exige servidor/API
3. Não aumenta a poluição da primeira viewport
4. Respeita identidade visual premium
5. Melhora evidência de aprendizado (não só estética)
6. É implementável sem reescrever `data.js` inteiro
7. Tem caminho de teste (unit ou smoke)

## Perguntas abertas (a IA deve ajudar a decidir)

1. XP deve virar sistema real ou sumir da UI?
2. Home deve reincorporar o plano diário ou a Sessão é o único lugar?
3. Qual Lernfeld/capítulo priorizar no deep-content?
4. Checkpoints devem ser mais visíveis na Jornada?
5. Continuar SPA TS+HTML strings ou migrar gradualmente para framework?
6. Qual métrica de prontidão AP1 deve ser a “norte” do aluno?
