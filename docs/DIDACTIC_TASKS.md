# Tarefas didáticas — Fase B

**Atualizado:** 2026-07-28  
**Módulo:** `src/domain/learning/didacticTasks.ts`

## Problema

Abrir abas e marcar checkboxes preenchia a trilha sem provar aprendizagem.
Grande parte do conteúdo gerado era genérico (“Situation erkennen…”).

## Princípio

Cada etapa tem **uma tarefa com evidência**:

| Etapa | Tarefa | Evidência |
|---|---|---|
| Erklären | Recuperação ativa (2 frases) | `stepArtifacts` + submit |
| Praxis | Decisão no caso + justificativa | `stepArtifacts` + submit |
| Wortschatz | Produção DE→PT | `vocabAttempts` / checks |
| Übung | Resposta antes do gabarito | `practiceAttempts` / checks |
| AP1/Apply | Caso escrito + critérios | apply artifact + critérios |

Avançar na sessão exige a evidência da etapa atual.

## Conteúdo gerado

`buildGuidedFullContent` em `data.js` passou a gerar:

- casos com pergunta de decisão (“Was prüfst du zuerst?”)
- exercícios com sintoma → checagem → justificativa
- critérios observáveis (decisão, justificativa, Fachbegriff)

Missões com conteúdo rico em `data.js` continuam prioritárias; o gerador deixa de ser filler puro.

## Domínio

O gate de mastery exige produção aplicada **e** critérios (≥70%), além da prática mínima.
