# Prompts por fase

## Prompt 1 — Análise e schemas

```text
Comece apenas pela Fase 1.

Analise a estrutura atual do projeto e o formato do meu data.js.

Não altere a interface ainda.

Crie:

1. o schema de Course;
2. o schema de LearningField;
3. o schema de LearningSituation;
4. o schema de Competency;
5. o schema de Mission;
6. o schema de UserLearningState;
7. um adapter para o conteúdo antigo;
8. um exemplo completo usando uma missão real do Lernfeld 1.

Mostre os arquivos que serão criados ou alterados antes de implementar.
Preserve integralmente o conteúdo atual e a compatibilidade da aplicação.
```

## Prompt 2 — Motor de estados

```text
Agora implemente somente o motor de estados e regras de conclusão.

Não redesenhe a interface.

A missão deve avançar entre:

available
in-progress
study-completed
practice-required
ready-for-test
test-failed
provisionally-mastered
review-due
mastered

Crie funções puras, fáceis de testar, sem dependências externas e
sem conteúdo hardcoded.

Implemente testes unitários para todas as transições possíveis.
```

## Prompt 3 — Planejador local

```text
Agora implemente o planejador local diário e semanal.

Use apenas:

- dados já existentes;
- progresso local;
- tempo disponível;
- revisões pendentes;
- missões atuais;
- pré-requisitos.

Não use IA, API ou servidor.

O planejador deve retornar uma justificativa para cada tarefa escolhida:

- revisão vencida;
- missão em andamento;
- teste pendente;
- próxima missão recomendada;
- competência fraca.

Crie testes para sessões de 15, 30, 45 e 60 minutos.
```

## Prompt 4 — Sessão de estudo

```text
Implemente agora o modo de sessão de estudo.

Requisitos:

- mostrar uma atividade por vez;
- indicar atividade atual e total;
- mostrar tempo estimado;
- permitir salvar e sair;
- permitir retomar;
- registrar início, pausa e conclusão;
- gerar resumo ao final;
- salvar tudo localmente.

Não altere o conteúdo educacional.
Não use IA.
Não use servidor.
```

## Prompt 5 — Teste de domínio

```text
Implemente o sistema de teste de domínio.

Requisitos:

- banco local de perguntas;
- seleção por competência;
- mistura de tipos;
- nota mínima configurável;
- feedback somente ao terminar;
- análise de erros;
- nova tentativa;
- revisão direcionada;
- persistência local.

Não marque a missão como dominada se o aluno não atingir a nota mínima.
```

## Prompt 6 — Revisão espaçada

```text
Implemente a revisão espaçada local.

Use os intervalos:

1, 3, 7, 14, 30 e 60 dias.

Regras:

- 85% ou mais: avançar;
- 70% a 84%: manter;
- abaixo de 70%: reduzir.

Salvar:

- nível de revisão;
- última data;
- próxima data;
- nota;
- status.

Inclua revisões vencidas no planejador diário.
```

## Prompt 7 — Interface

```text
Somente agora reorganize a interface.

A página inicial deve ser “Hoje”.

Prioridades visuais:

1. próxima ação;
2. plano do dia;
3. revisões;
4. missão em andamento;
5. domínio por Lernfeld.

Não use cards para tudo.
Não repita métricas.
Não crie vários botões principais na mesma tela.
Preserve a identidade visual já aprovada.
```
