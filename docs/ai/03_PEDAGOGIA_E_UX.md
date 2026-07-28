# 03 — Pedagogia, fluxos e UX

## Modelo pedagógico

O aluno não deve “navegar um catálogo”. Deve seguir um ciclo:

```text
Missão atual
  → Próxima etapa
    → Prática / evidência
      → Teste de domínio (quando aplicável)
        → Revisão espaçada
          → Checkpoint / simulado AP1
```

### Etapas do leitor (`READER_STEPS`)

Ordem fixa por missão/capítulo:

1. **explain** — Entender o conceito  
2. **praxis** — Caso prático / método  
3. **vocab** — Wortschatz DE/PT  
4. **practice** — Übungen  
5. **ap1** — Check de prova  

Visitadas em `state.sessionSteps[chapterId]`.

### Missões

- Schema rico (fases, competências, regras de conclusão)
- Na prática a UI ainda é fortemente **capítulo/leitor**
- Status de missão pode ser derivado do estado legado (`missionProgressFromLegacyState`)

### Sessão focada

- Plano diário (`generateDailyPlan`) prioriza: revisões → testes → missão em andamento → pontos fracos → próxima
- Sessão agrupa atividades com pause/resume
- Home atual **não** mostra mais a lista “Hoje” completa; o plano alimenta principalmente `#session`

### Mastery / Review / Checkpoint

| Mecanismo | Ideia | Nota |
|---|---|---|
| Mastery test | Self-check Acertei/Errei; limiar típico 80% | Sem correção automática de texto livre |
| Mission review | Intervalos 1/3/7/14/30/60 dias; ≥85 avança, &lt;70 regride | Persistido em `missionReviews` |
| Checkpoint | Por Lernsituation; desbloqueia após mastery das missões | Pass ~75% |

### Exame AP1

Modos: mock cronometrado, por Lernfeld, pontos fracos, Signalwörter, drills, checklist, erros.

## Jornada (Home) — estado atual

A Home foi redesenhada como **painel da missão atual** (não timeline completa).

### Hierarquia visual

1. Alertas (onboarding / mock em andamento)  
2. Celebration (etapa/missão concluída + XP)  
3. **MissionHero** — título, meta, 1 CTA  
4. **MissionStepper** — barra horizontal das 5 etapas  
5. **NextStepCard** — card dominante (learnings, tempo, XP)  
6. AfterThisStep — lista simples  
7. Rewards — XP / competência / revisão / próxima missão  
8. Rail: progresso, resumo, materiais (acordeão), dica  
9. Focus bar sticky — Continuar + Sair  

Arquivos:

- `src/domain/dashboard/missionPanel.ts`
- `src/views/homeView.ts`
- `src/views/missionPanel/components.ts`

## Trilha (`#course`)

Redesenho mobile Fase A:

- Faixa Continuar (capítulo atual)
- Fila compacta Depois / Reforço
- KPIs 2×2
- Capítulos densos + módulos one-tap

## Mobile (resumo)

Documento: `docs/mobile-ux-plan.md`

| Fase | Tema | Status |
|---|---|---|
| A | Trilha compacta | Feito |
| B | Home / topbar | Feito (depois viramos mission panel) |
| C | Reader dock / AP1 lobby | Parcial |
| D | Densidade tipográfica / polish | Parcial |

Problemas já corrigidos recentemente:

- Topbar com botões sobrepostos (`display` vs `[hidden]`)
- Timeline esmagando texto
- Bottom-nav competindo com docks de estudo

## Identidade visual

Manter:

- tema escuro premium
- verde primário / âmbar accent
- tipografia display + UI
- sensação Linear/Notion (clareza), não “dashboard lotado”

Evitar:

- muitos CTAs na mesma viewport
- cards demais
- métricas repetidas sem ação
- catálogo gigante no first viewport

## Papel de cada aba (mobile)

| Aba | Job |
|---|---|
| Jornada | O que estudar agora (missão) |
| Trilha | Onde estou no curso |
| Revisão | O que está vencendo |
| AP1 | Treinar prova |
| Glossário | Termo DE/PT |
