# Plano de implementação

## Antes de alterar código

1. Analise a estrutura atual da aplicação.
2. Identifique os componentes reutilizáveis.
3. Identifique onde o progresso é salvo.
4. Identifique o formato atual do `data.js`.
5. Identifique os tipos atuais de exercícios.
6. Identifique dependências entre telas.
7. Crie um plano de migração.
8. Preserve o conteúdo e o progresso existentes.

## Fases

### Fase 1 — Schemas e adaptadores

Criar:

- Course
- LearningField
- LearningSituation
- Competency
- Mission
- UserLearningState
- adapter para conteúdo antigo

### Fase 2 — Motor de estados

Criar funções puras para:

- calcular estado atual;
- validar critérios;
- liberar próxima etapa;
- registrar falha;
- registrar aprovação;
- reagendar revisão.

### Fase 3 — Planejamento diário e semanal

Criar:

- gerador de plano diário;
- gerador de plano semanal;
- reorganização de tarefas atrasadas;
- cálculo por tempo disponível;
- justificativa de cada recomendação.

### Fase 4 — Sessão de estudo

Criar:

- modo focado;
- uma atividade por vez;
- pausa e retomada;
- resumo da sessão;
- persistência local.

### Fase 5 — Prática e testes

Criar:

- renderizador de exercícios;
- teste de domínio;
- resultados;
- tentativas;
- revisão direcionada.

### Fase 6 — Revisão espaçada

Criar:

- fila de revisões;
- cálculo de próxima data;
- progressão de nível;
- regressão após erro.

### Fase 7 — Checkpoints e simulados

Criar:

- checkpoints;
- avaliação integrada;
- simulado por Lernfeld;
- simulado de erros anteriores;
- simulado cronometrado.

### Fase 8 — Migração de conteúdo

Migrar gradualmente:

- capítulos;
- explicações;
- exercícios;
- glossário;
- testes.

### Fase 9 — Dashboard e navegação

Reorganizar:

- página Hoje;
- Planejamento;
- Missões;
- Revisões;
- Simulados;
- Progresso.

### Fase 10 — Testes finais

Testar:

- persistência;
- desbloqueios;
- pontuação;
- revisão;
- funcionamento offline;
- migração;
- compatibilidade com dados antigos.
