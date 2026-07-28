# Interface e componentes

## Dashboard

A primeira informação deve ser a próxima ação.

Ordem:

```text
1. Próxima atividade recomendada
2. Planejamento de hoje
3. Revisões pendentes
4. Missão em andamento
5. Domínio por Lernfeld
6. Competências fracas
7. Histórico recente
8. Catálogo completo
```

Mostrar separadamente:

```text
Progresso do conteúdo
Domínio comprovado
Retenção
Preparação para avaliação
```

Não misturar esses indicadores.

## Organização visual

A estrutura pedagógica deve determinar a interface.

Não colocar tudo dentro de cards.

Aplicar:

- container central consistente;
- largura de leitura entre 680px e 820px;
- sidebar para navegação estrutural;
- painel principal para a tarefa atual;
- painel secundário apenas quando necessário;
- sistema de espaçamento baseado em 8px;
- seções claramente separadas;
- hierarquia tipográfica previsível;
- uma ação principal por tela;
- estados visuais consistentes;
- indicadores com explicação textual;
- feedback sempre próximo da ação realizada.

Evitar:

- excesso de cards;
- métricas repetidas;
- múltiplos botões principais;
- catálogos gigantes no dashboard;
- informações sem prioridade;
- porcentagens sem significado;
- telas com vários protagonistas;
- menus que repetem a mesma função.

## Componentes necessários

```text
TodayPlan
WeeklyPlanner
StudySession
MissionOverview
MissionPhaseStepper
StudyBlockRenderer
PracticeRenderer
MasteryTest
TestResult
ReviewQueue
ReviewCard
CompetencyMap
MasteryIndicator
LearningFieldProgress
SessionSummary
CheckpointAssessment
SimulationBuilder
QuestionRenderer
SelfAssessment
CompletionCriteria
NextActionCard
```

Cada componente deve consumir dados.

Nenhum componente deve conter conteúdo educacional hardcoded.
