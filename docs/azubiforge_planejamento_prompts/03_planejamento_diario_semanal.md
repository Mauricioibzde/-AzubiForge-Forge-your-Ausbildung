# Planejamento diário e semanal

## Planejamento inicial

Criar um onboarding de planejamento.

Perguntar:

- Qual é o objetivo principal?
- Está estudando para AP1, escola ou revisão geral?
- Qual é a data da prova?
- Quantos dias por semana deseja estudar?
- Quais dias estão disponíveis?
- Quantos minutos possui por sessão?
- Quais Lernfelder já estudou?
- Quais temas considera difíceis?
- Deseja seguir a ordem do livro ou uma ordem personalizada?

Salvar tudo localmente.

O planejamento deve ser editável posteriormente.

## Página “Hoje”

Essa deve ser a página principal da aplicação.

Não mostrar todo o catálogo.

Mostrar somente o necessário para a sessão atual.

```text
HOJE

Objetivo da sessão
Tempo estimado
Progresso diário

1. Revisão vencida
2. Continuar missão atual
3. Nova missão recomendada
4. Teste ou prática pendente

Botão principal:
Começar sessão
```

Cada atividade deve mostrar:

- tipo;
- título;
- Lernfeld;
- duração;
- prioridade;
- motivo da recomendação;
- situação;
- botão de ação.

Exemplo:

```text
REVISÃO PRIORITÁRIA · 8 MIN

Rechte und Pflichten des Auszubildenden

Você passou nesse tema há 7 dias.
Faça uma revisão curta para confirmar a retenção.

[Revisar agora]
```

## Sessão de estudo

Ao clicar em “Começar sessão”, abrir um modo focado.

Mostrar uma atividade por vez.

```text
Sessão de hoje

Atividade 2 de 4
Tempo restante aproximado: 24 min

[conteúdo atual]

Voltar
Salvar e sair
Continuar
```

Ao concluir:

```text
Etapa concluída

Você terminou:
Prática guiada

Resultado:
8 de 10

Próximo passo:
Desafio aplicado
```

Ao terminar a sessão:

```text
Sessão concluída

Tempo estudado
Tarefas concluídas
Novos conceitos
Erros encontrados
Revisões programadas
Próxima atividade recomendada
```

## Planejamento semanal

Criar uma página “Planejamento”.

Cada dia deve mostrar:

- tempo previsto;
- tarefas previstas;
- tarefas concluídas;
- revisões;
- testes;
- status do dia.

Exemplo:

```text
SEGUNDA · 30 MIN

✓ Revisão Tarifvertrag
✓ Estudo Rechte und Pflichten
○ Teste de domínio

2 de 3 concluídas
```

Permitir:

- mover tarefa para outro dia;
- reduzir carga diária;
- adicionar uma missão;
- remover uma tarefa do plano;
- recalcular semana;
- marcar dia de descanso;
- recuperar tarefas atrasadas.

## Motor local de planejamento

Criar um algoritmo determinístico.

Prioridades:

```text
1. Revisões vencidas
2. Testes pendentes
3. Missões em andamento
4. Competências fracas
5. Próxima missão da sequência
6. Atividades extras
```

Respeitar:

- tempo disponível;
- duração das tarefas;
- pré-requisitos;
- dificuldade;
- última interação;
- quantidade de tarefas;
- revisões vencidas;
- limite de carga diária.

Exemplo:

```js
function generateDailyPlan({
  availableMinutes,
  missions,
  reviews,
  userProgress,
  preferences,
  currentDate
}) {
  // retornar tarefas ordenadas por prioridade
}
```

Não preencher 30 minutos com 60 minutos de tarefas.

Distribuição inicial:

```text
30% para revisão
50% para progresso atual
20% para teste ou consolidação
```

Esses valores devem ser configuráveis.
