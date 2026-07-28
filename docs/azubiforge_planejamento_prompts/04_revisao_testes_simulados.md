# Revisão, testes e simulados

## Revisão espaçada

Implementar revisão espaçada local.

Intervalos:

```js
reviewIntervals: [1, 3, 7, 14, 30, 60]
```

Regras:

```text
Acertou pelo menos 85%:
avançar um intervalo.

Acertou entre 70% e 84%:
manter o nível.

Acertou menos de 70%:
reduzir o nível e recomendar revisão do material.
```

Exemplo:

```js
{
  missionId: "lf1-ls1-mission-03",
  reviewLevel: 2,
  lastReviewedAt: "2026-07-28",
  nextReviewAt: "2026-08-04",
  lastScore: 85,
  status: "scheduled"
}
```

## Tipos de tarefas

O motor de exercícios deve suportar:

```js
"single-choice"
"multiple-choice"
"true-false"
"matching"
"ordering"
"fill-blank"
"categorization"
"highlight-error"
"select-in-image"
"table-completion"
"calculation"
"scenario-choice"
"decision-path"
"document-analysis"
"code-debug"
"code-output"
"comparison"
"checklist-task"
"self-assessment"
"case-study"
"mini-project"
"timed-test"
```

Estrutura comum:

```js
{
  id,
  type,
  title,
  instruction,
  difficulty,
  estimatedMinutes,
  points,
  competencyIds,
  content,
  correctAnswer,
  acceptedAnswers,
  feedback,
  explanation,
  hints,
  retryRules
}
```

## Respostas abertas sem IA

Fluxo:

```text
1. O usuário escreve ou pensa a resposta.
2. A resposta fica salva localmente.
3. A aplicação apresenta uma checklist de critérios.
4. O usuário marca os critérios cumpridos.
5. A aplicação mostra uma resposta-modelo.
6. O usuário compara e avalia sua resposta.
7. O resultado é registrado como autoavaliação.
```

Exemplo:

```js
{
  type: "self-assessment",
  prompt: "Explique a diferença entre Tarifvertrag e Betriebsvereinbarung.",
  criteria: [
    "Identifiquei quem celebra cada acordo",
    "Expliquei o alcance de cada acordo",
    "Dei pelo menos um exemplo",
    "Não confundi Betriebsrat com Gewerkschaft"
  ],
  modelAnswer: "...",
  minimumCriteria: 3
}
```

Nunca fingir correção semântica automática.

## Teste de domínio

Toda missão relevante deve possuir um teste de domínio.

Requisitos:

- banco local de perguntas;
- sorteio determinístico ou aleatório;
- mistura de tipos;
- limite opcional de tempo;
- nota mínima;
- análise por competência;
- nova tentativa com perguntas diferentes;
- bloqueio opcional de respostas já mostradas.

Exemplo de resultado:

```text
RESULTADO DO TESTE

Nota: 76%
Resultado: Ainda não aprovado

Você domina:
✓ Rechte des Auszubildenden

Você precisa revisar:
• Pflichten des Ausbildungsbetriebs
• Kündigung während der Probezeit

Próximo passo:
Revisão direcionada de 8 minutos
```

## Checkpoints

Após um conjunto de missões, criar checkpoint.

Após uma Lernsituation, criar avaliação integrada.

Após um Lernfeld, criar avaliação final.

```text
Missão
↓
Teste da missão
↓
Missão
↓
Teste da missão
↓
Checkpoint
↓
Lernsituation concluída
↓
Avaliação integrada
↓
Lernfeld dominado
```

## Simulados

Tipos:

- simulado rápido;
- simulado por Lernfeld;
- simulado de competências fracas;
- simulado completo;
- simulado cronometrado;
- simulado somente com erros anteriores.

Filtro:

```js
{
  learningFieldIds,
  competencyIds,
  difficulty,
  questionTypes,
  previousErrorsOnly,
  unansweredOnly,
  amount,
  timeLimit
}
```
