# Hierarquia da trilha e progresso

**Atualizado:** 2026-07-28

## Como o aluno deve ler a trilha

```text
Curso
└── Lernfeld (módulo)
    └── Lernsituation
        └── Missão (capítulo)
            └── 5 etapas: Aprender → Recuperar → Praticar → Aplicar → Provar
```

## Duas barras (honestas)

| Barra | Significa | Não significa |
|---|---|---|
| **Percurso** | Capítulos com evidência de estudo (produção/prática) ou marcados | Domínio |
| **Domínio** | Teste de domínio aprovado | Só ter aberto a página / visitado abas |

## Comprovação de entendimento

Em cada missão a UI mostra:

- etapas com evidência (não só abas abertas)
- score de prática
- se o domínio foi aprovado
- o próximo requisito do gate (prática / apply / teste)

Status da missão (`in-progress` / `study-completed` / `practice-required`) também deriva de evidência.
Checkpoint da Lernsituation só libera quando **todas** as missões da situação têm domínio.

## Sessão focada

“Concluir atividade” só libera com evidência da etapa (produção / prática / domínio).
Abrir o conteúdo sem fazer a tarefa **não** marca progresso.
Ao voltar do leitor com a tarefa já feita, a atividade **avança automaticamente**.
O plano da sessão fatia só as próximas etapas sem evidência (bloco focado).

## Plano diário

Missões longas (45–50 min) são fatiadas em **blocos de até 20 min** que cabem na sessão.
O planner **pula** candidatos grandes demais em vez de gerar plano vazio.

## Apply

Uma missão exige **um** desafio aplicado forte (não vários checklists genéricos).

