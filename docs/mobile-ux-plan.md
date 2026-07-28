# Plano UX Mobile — AzubiForge

## Diagnóstico (estado atual)

A Trilha no telefone está organizada como um **dashboard desktop empilhado**. O primeiro viewport não responde “o que faço agora?”; responde “aqui está o catálogo do curso”.

### Problemas observados

| Problema | Evidência | Impacto |
|---|---|---|
| Vários protagonistas | Hero longo + Workflow + KPIs + Módulo + Catálogo | Usuário scrolla sem ação clara |
| CTAs redundantes | Topbar “Continuar” + Hero “Continuar” + Workflow “Retomar” + Módulo “Continuar” + Path “Continuar” | Paralisia de escolha |
| Cards demais | Workflow 3 cards, 4 KPIs em coluna, módulos altos | Altura vertical excessiva |
| Header congestionado | Menu + marca + Revisar + Continuar + context bar | Área útil do conteúdo reduzida |
| Catálogo dominante | 5 Lernfelder com Focar+Retomar cada | Lista infinita, baixa densidade útil |
| Home e Trilha se misturam | Ambos vendem “continuar / jornada / progresso” | Papéis de tela confusos |

### Princípios (alinhados ao Master UI)

1. **Uma ação principal por tela**
2. **Próxima atividade primeiro** — não o catálogo
3. **Cards só quando há interação** — métricas e listas não precisam de card alto
4. **Bottom-nav é a navegação estrutural** — topbar não compete com ela
5. **Progresso compacto** — barra/linha, não donut + 4 KPIs repetindo a mesma história

---

## Arquitetura de informação mobile

### Papel de cada aba

| Aba | Job-to-be-done | Primeiro viewport |
|---|---|---|
| **Jornada (Home)** | “O que estudar hoje?” | Plano do dia + 1 CTA Continuar |
| **Trilha** | “Onde estou no curso?” | Capítulo atual + capítulos do módulo ativo |
| **Revisão** | “O que está vencendo?” | Fila / card de foco |
| **AP1** | “Treinar prova” | Modo + início rápido |
| **Glossário** | “Termo DE/PT” | Busca + flash |

### Trilha — estrutura alvo (mobile)

```text
1. Faixa Continuar (capítulo atual + 1 botão)
2. Fila curta Depois / Reforço (2 linhas, sem cards altos)
3. Métricas compactas 2×2 (ou esconder atrás de “Ver progresso”)
4. Busca + filtros (sticky opcional)
5. Capítulos do módulo em foco (lista densa)
6. Troca de módulo (lista compacta, 1 linha cada)
```

### Topbar mobile alvo

```text
[☰]  AzubiForge / título da tela     [tema]
```

- Remover “Continuar estudo” e “Revisar hoje” da topbar nas telas que já têm CTA próprio (Home, Trilha).
- Context bar só em fluxos focados (reader, sessão, prova), não em catálogo.

---

## Fases de implementação

### Fase A — Trilha (este PR)
- Hero curto: capítulo atual + progresso linear + 1 CTA
- Workflow → lista compacta (não grid de cards)
- KPIs em grade 2×2 com altura reduzida
- Capítulos: descrição recolhida; botão full-width
- Módulos: linhas compactas (tap = focar), sem Focar+Retomar duplicados
- Topbar: esconder chips Continuar/Revisar em Home e Trilha

### Fase B — Home
- Remover atalhos que duplicam bottom-nav
- Uma seção “Hoje” com plano + CTA
- Prioridades em lista, não 3 cards altos
- Timeline só do módulo ativo, nós compactos

### Fase C — Reader / Sessão / AP1
- Já iniciado no mobile pass 2 (dock imersivo)
- Revisar densidade do step-coach e journey-bar no reader
- AP1 lobby: presets em lista, não cards altos

### Fase D — Polimento
- Densidade tipográfica mobile
- Espaçamento 8px consistente
- Testes de scroll first-viewport em 390×844

---

## Critérios de sucesso

- [ ] First viewport da Trilha mostra **só** próxima ação + progresso + CTA
- [ ] No máximo **1** botão accent visível por tela (exceto docks de sessão)
- [ ] Scroll até o capítulo atual &lt; 1 viewport após o hero
- [ ] Lista de módulos cabe ~5 itens sem scroll interno absurdo
- [ ] Topbar não repete CTAs da página
