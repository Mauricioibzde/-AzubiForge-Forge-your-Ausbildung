# Arquitetura pedagógica

## Hierarquia principal

Organizar todo o curso na seguinte estrutura:

```text
CURSO
└── LERNFELD
    └── LERNSITUATION
        └── COMPETÊNCIA
            └── MISSÃO
                ├── Objetivo
                ├── Diagnóstico opcional
                ├── Material de estudo
                ├── Exemplo
                ├── Prática guiada
                ├── Desafio aplicado
                ├── Teste de domínio
                ├── Resultado
                └── Revisão futura
```

Não tratar páginas ou capítulos lidos como aprendizagem concluída.

Uma missão somente pode ser considerada dominada quando o aluno gerar
evidências suficientes de aprendizagem.

## Ciclo obrigatório de cada missão

Cada missão deve seguir:

```text
1. PREPARAR
2. APRENDER
3. PRATICAR
4. APLICAR
5. TESTAR
6. CORRIGIR
7. CONCLUIR
8. REVISAR
```

### Preparar

Mostrar:

- título;
- objetivo;
- competência trabalhada;
- conhecimentos prévios;
- duração estimada;
- quantidade de etapas;
- critérios de conclusão;
- importância para a Ausbildung ou AP1.

### Aprender

Apresentar o conteúdo em blocos pequenos:

- explicação simples;
- explicação técnica;
- termos importantes em alemão;
- tradução ou explicação em português;
- analogia;
- exemplo profissional;
- erro comum;
- resumo visual;
- checklist “Das musst du wissen”.

### Praticar

Inserir exercícios curtos com feedback imediato.

### Aplicar

Apresentar uma situação profissional contextualizada.

### Testar

Aplicar um teste sem ajuda e sem mostrar respostas durante a execução.

### Corrigir

Mostrar:

- respostas certas;
- respostas erradas;
- justificativa;
- material que precisa ser revisado;
- nova tentativa disponível.

### Concluir

Somente concluir quando os requisitos forem alcançados.

### Revisar

Agendar automaticamente uma revisão futura.

## Estados das missões

Não usar apenas `completed: true` ou `false`.

```text
locked
available
in-progress
study-completed
practice-required
ready-for-test
test-failed
needs-review
provisionally-mastered
mastered
review-due
```

Apresentar em linguagem clara:

```text
locked                 → Bloqueada
available              → Disponível
in-progress            → Em andamento
study-completed        → Estudo concluído
practice-required      → Prática pendente
ready-for-test         → Pronta para o teste
test-failed            → Teste não aprovado
needs-review           → Precisa revisar
provisionally-mastered → Domínio inicial
mastered               → Dominada
review-due             → Revisão disponível
```

Cada estado deve ter:

- ícone;
- cor;
- descrição;
- próxima ação;
- regra objetiva de transição.

## Critérios de conclusão

Não marcar uma missão como concluída somente porque o usuário abriu
ou rolou até o final da página.

Usar critérios configuráveis:

- material obrigatório visualizado;
- prática guiada concluída;
- porcentagem mínima nos exercícios;
- desafio aplicado concluído;
- teste de domínio aprovado;
- revisão futura aprovada.

Valores recomendados:

```text
Prática guiada: mínimo de 70%
Teste de domínio: mínimo de 80%
Revisão futura: mínimo de 70%
```

Exemplo:

```js
completionRules: {
  requiredStudyBlocks: true,
  minimumPracticeScore: 70,
  requireAppliedChallenge: true,
  minimumMasteryScore: 80,
  requireDelayedReview: true,
  minimumReviewScore: 70
}
```

## Níveis de domínio

Separar progresso de domínio.

```text
0 — Não iniciado
1 — Conhecido
2 — Compreendido
3 — Praticado
4 — Aplicado
5 — Domínio inicial
6 — Retido
```

Regras:

```text
Conhecido:
material principal visualizado.

Compreendido:
exercícios básicos aprovados.

Praticado:
práticas variadas concluídas.

Aplicado:
desafio contextualizado aprovado.

Domínio inicial:
teste final com pelo menos 80%.

Retido:
revisão posterior com pelo menos 70%.
```

Mensagens úteis:

```text
Você compreendeu o conteúdo, mas ainda precisa aplicá-lo.

Você passou no teste inicial. A próxima revisão será em 3 dias.

Domínio confirmado após revisão.
```

## Regras de desbloqueio

Usar três tipos de acesso:

```text
Recomendado:
segue a sequência pedagógica.

Disponível:
pode ser acessado livremente.

Bloqueado por pré-requisito:
exige uma competência anterior essencial.
```

Ao bloquear:

```text
Esta missão exige primeiro:

• Fundamentos do Ausbildungsverhältnis

Conclua a missão anterior ou faça o teste de diagnóstico.
```
