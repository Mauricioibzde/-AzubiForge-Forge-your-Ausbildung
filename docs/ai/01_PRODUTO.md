# 01 — Produto e contexto

## O que é

**AzubiForge** (“Forge your Ausbildung”) é um app de estudo **offline-first** para a **AP1 FIAE** (Abschlussprüfung Teil 1 — Fachinformatiker Anwendungsentwicklung / IHK).

Não é um ebook. É um sistema de aprendizagem guiada: missão atual → próxima etapa → prática → revisão → prontidão para prova.

## Público

- Aprendizes de Ausbildung em informática (nível iniciante a intermediário)
- Muitas vezes com dificuldade em alemão técnico + ansiedade de prova
- Precisam de clareza: **“O que faço agora?”**

## Idiomas

- **UI:** português (pt-BR)
- **Conteúdo:** bilíngue DE/PT (termos, Wortschatz, Signalwörter, títulos frequentemente em alemão)

## Objetivo de aprendizagem

Preparar o aluno para a AP1 com:

- fundamentos (hardware, SO, redes, segurança, dados/software)
- cenários de trabalho (Praxisfall)
- vocabulário de prova
- exercícios e simulados no estilo IHK
- revisão espaçada e evidência de domínio

## Princípios de produto (não negociáveis)

1. Offline-first (funciona sem servidor)
2. Sem APIs externas obrigatórias / sem IA em tempo real no produto
3. Progresso salvo localmente no dispositivo
4. Conteúdo local (`data.js` + deep-content)
5. Não copiar livro protegido; Westermann LF1–5 é **referência estrutural**, não clone digital
6. Uma ação principal por tela (foco cognitivo)

## Sites / execução

- Produção (GitHub Pages):  
  `https://mauricioibzde.github.io/-AzubiForge-Forge-your-Ausbildung./`
- Local: `npm run dev` → tipicamente `http://127.0.0.1:5173/` ou `5174`
- Deploy: workflow GitHub Actions publica `dist/` a cada push em `main`

## Escopo atual (alto nível)

| Área | Status |
|---|---|
| Trilha por Lernfeld / capítulos | Existe |
| Leitor em 5 etapas | Existe |
| Glossário DE/PT | Existe |
| Revisão (fila + flash) | Existe |
| Exame AP1 (mock, drill, Signalwörter, checklist) | Existe |
| Sessão focada + plano diário | Existe (domínio) |
| Teste de domínio (mastery) | Existe |
| Revisão espaçada por missão | Existe |
| Checkpoints por Lernsituation | Existe |
| Dashboard Jornada = painel da missão | Existe (redesign recente) |
| Weekly planner | Não implementado |
| Ledger real de XP/competências | Não (UI mostra XP derivado) |
| Backend / multi-dispositivo sync | Fora de escopo atual |
