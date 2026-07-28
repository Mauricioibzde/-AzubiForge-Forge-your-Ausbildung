# AzubiForge — Handoff Completo para Análise por IA

> **Atualizado:** 2026-07-28  
> **Como usar:** cole este arquivo inteiro no ChatGPT, Claude, DeepSeek ou similar, junto com o prompt em `PROMPT_PARA_IA.md`.
>
> **Produto:** https://mauricioibzde.github.io/-AzubiForge-Forge-your-Ausbildung./
> **Repo:** https://github.com/Mauricioibzde/-AzubiForge-Forge-your-Ausbildung.
> **Idioma deste handoff:** PT-BR | **Idioma do produto:** DE (conteúdo) + PT (UI)

---

# PARTE 1 — PRODUTO

## O que é

AzubiForge ("Forge your Ausbildung") é um app web offline-first de estudo para a **Ausbildung Fachinformatiker Anwendungsentwicklung** na Alemanha. Não é LMS genérico: é um ciclo de preparação para a **Abschlussprüfung Teil 1 (AP1)** com trilha, sessões, flashcards, quizzes, simulado e readiness.

## Problema

Aprendizes precisam estudar alemão técnico + lógica + redes + SQL + UI + Git de forma estruturada, com pouco tempo, sem depender de backend, e com feedback de prontidão para a prova.

## Usuário

- Azubi (aprendiz) de programação na Alemanha
- Estuda no celular e no desktop
- Quer: continuar de onde parou, treinar AP1, ver progresso, exportar dados

## Proposta de valor

1. Trilha por módulos → missões → sessões
2. Sessão guiada (estudo → flashcards → quiz → checkpoint)
3. Banco AP1 com simulado cronometrado
4. Readiness com gaps e plano semanal
5. Offline total (localStorage + Service Worker)
6. Export/import JSON

## Stack

| Camada | Tecnologia |
|--------|------------|
| Build | Vite 5 + TypeScript |
| UI | HTML string templates + CSS (sem React/Vue) |
| Estado | localStorage `azubiforge.progress.v1` |
| Offline | `public/sw.js` (cache-first + network-first seletivo) |
| Testes | Vitest (~42) + Playwright |
| Deploy | GitHub Pages (`main`) |

**Não há:** backend, auth, sync cloud, analytics, i18n framework, design system externo.

## Navegação

| Rota | Função |
|------|--------|
| `#home` | Jornada = painel da missão ativa |
| `#journey` | Trilha completa |
| `#learn` | Sessão de estudo |
| `#session` | Alias sessão |
| `#ap1` | Banco AP1 |
| `#exam` | Simulado |
| `#cards` | Flashcards |
| `#review` | Revisão diária |
| `#progress` | Progresso / XP visual |
| `#mastery` | Domínio |
| `#readiness` | Prontidão AP1 |
| `#planner` | Plano semanal |
| `#history` | Histórico |
| `#settings` | Config + export |
| `#dashboard` | Dashboard analítico |
| `#docs-ai` | Docs AI in-app |
| `#resources` | Recursos |

Mobile: bottom nav = Início, Trilha, Estudar, AP1, Mais.

## Conteúdo

- `data.js`: ~10 módulos, ~50 missões, quizzes, cards, AP1 (~180Q), recursos
- `data/deep-content.js`: conteúdo longo, glossário, tips, checkpoints
- Missões: `concept` | `practice` | `project` | `assessment`
- Estimativa ~35–45h total

## Progresso

`ProgressState`: completedMissions, missionStatuses, quizAttempts, cardStates (SM-2 light), examAttempts, reviewQueue, weeklyPlan, sessionDraft, studySecondsByDay, etc. Export v11.

## Modelo mental UX

Home = **missão atual** (não timeline completa). Trilha = mapa. Estudar = execução. AP1 = prova.

---

# PARTE 2 — ARQUITETURA

## Bootstrap

`index.html` → `data.js` + `deep-content.js` → `src/main.ts` → `createApp()` → router hash.

## Camadas

```
Views → Domain/Adapters → Data (window.*)
         ↓
    ProgressStore (localStorage)
```

| Pasta | Papel |
|-------|-------|
| `src/app.ts` | Router, shell, deep links |
| `src/domain/` | Lógica pura |
| `src/adapters/` | Normalização data.js |
| `src/views/` | HTML por rota |
| `src/styles/` | CSS |
| `src/ui/` | Toasts, modal, confetti |
| `src/sw/` | Versão SW |

## Domínio chave

- `sessionEngine` — ciclo de sessão
- `srs` — spaced repetition
- `masteryEngine` / `readinessEngine`
- `weeklyPlanner`
- `examEngine` / `ap1Bank`
- `dashboard/missionPanel` — view-model da Home
- `progressStore` — persistência

## Sessão

Fases: study → cards → quiz → checkpoint → done. Draft recupera sessão. Deep link `#learn?mission=ID`.

## Offline / PWA

SW v69+ (cache bump a cada release). Manifest instalável. Sem Background Sync / Push.

## Testes

Vitest: srs, mastery, readiness, planner, session, missionPanel, etc. Playwright: smoke.

## Limitações técnicas conscientes

- Views = strings HTML (sem componentes reativos)
- XP display-only (sem ledger)
- Conteúdo acoplado a `window.AF_DATA`
- CSS monolítico (~4k+ linhas em `base.css`)
- Sem i18n real
- Deploy só via merge em `main`

---

# PARTE 3 — PEDAGOGIA E UX

## Princípios

1. Uma decisão por tela
2. Continuar > explorar
3. Produção > consumo (checkpoint)
4. Feedback imediato (quiz, confetti, readiness)
5. Offline-first
6. Mobile-first em evolução

## Loop pedagógico

Trilha → Missão → Sessão (estudo/cards/quiz/checkpoint) → Progresso → Revisão SRS → Readiness → Planner → AP1/Exam

## Jornada (Home) atual

Painel: Hero (módulo + missão + CTA) → Stepper 4 passos → Próximo passo → Depois → Recompensas → Progresso → Materiais → Dicas → Focus bar.

Não é timeline completa (isso é Trilha).

## Trilha

Continuar strip + fila compacta + KPI 2×2 + módulos one-tap. Evitar wall of text.

## Mobile

Bottom nav; sessão imersiva (esconde nav); docks sticky; topbar mobile só menu+marca; touch ≥44px.

## Design tokens

Verde floresta `#1F6B4A`, creme `#F4F7F2`, tipografia Source Serif 4 + Source Sans 3. Evitar purple AI-slop.

## Tom

PT na UI, DE no conteúdo técnico. Direto, acionável, sem gamificação vazia.

---

# PARTE 4 — DIAGNÓSTICO (baseline para a IA melhorar)

## Pontos positivos

1. Produto claro (AP1 Ausbildung) — não genérico
2. Offline-first real
3. Loop pedagógico completo
4. Domínio TypeScript testável
5. Export/import
6. Home como missão (foco)
7. Banco AP1 + simulado
8. Mobile melhorando com intent
9. Deploy simples
10. Docs de planejamento existentes

## Pontos fracos / riscos

1. XP sem ledger (confiança)
2. Conteúdo difícil de escalar (JS global)
3. UI por strings (manutenção)
4. CSS grande
5. Sem sync multi-device
6. Sem contas
7. i18n incompleto
8. Dashboard / Docs AI / Recursos na periferia
9. Possível sobrecarga cognitiva na Trilha
10. Cobertura E2E limitada
11. Sem analytics
12. Deep content vs card UI inconsistente
13. Acessibilidade não auditada a fundo
14. Dependência de hash router + SW cache (stale risk)

## Oportunidades

A. Autenticidade do progresso (XP real ou remover)
B. Conteúdo versionado (JSON/MD)
C. Modo foco / ritual diário
D. AP1 como produto premium UX
E. Sync opcional
F. Onboarding 60s
G. A11y
H. Micro-interações de domínio
I. Separar “estudar” vs “provar”
J. Teacher/Betrieb mode leve

## Ameaças

- Virar dashboard genérico
- Feature creep
- Mobile regressar
- Conteúdo desatualizar vs IHK
- Overengineering (React rewrite sem necessidade)

## Dívida

P0: XP honesto, stale SW, a11y básica, onboarding  
P1: conteúdo estruturado, CSS split, E2E críticos, i18n  
P2: sync, contas, analytics ético

## Métricas sugeridas (manual ok)

TTFS, completion missão, % AP1, readiness trend, review adherence, export usage, install PWA.

## Princípios para próximos avanços

1. Não quebrar offline
2. Não inchamento da Home
3. Conteúdo > chrome
4. Medir antes de reescrever stack
5. Mobile como constraint
6. Uma aposta por release

---

# PARTE 5 — PEDIDO À IA

Com base neste handoff, produza:

1. **Síntese** do produto em 5 linhas
2. **Top 5 pontos positivos** (por que importam)
3. **Top 5 pontos fracos** (impacto + risco)
4. **Roadmap de 3 fases** (escopo técnico, sem calendário)
5. **Quick wins** (baixo esforço, alto impacto)
6. **O que NÃO fazer** agora
7. **Hipóteses** a validar com usuários
8. **Prompt de follow-up** para detalhar a Fase 1

Priorize: aprendiz ocupado, mobile, AP1, offline, honestidade do progresso.
Seja específico ao AzubiForge (cite rotas/módulos/sistemas). Evite conselhos genéricos de SaaS.
