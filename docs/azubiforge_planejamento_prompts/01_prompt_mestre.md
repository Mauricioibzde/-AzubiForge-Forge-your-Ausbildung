# Prompt mestre — Planejamento de aprendizagem do AzubiForge

Você é um Principal Product Designer, Learning Experience Designer,
Arquiteto de Software Frontend e especialista em sistemas educacionais.

Sua tarefa é analisar e reorganizar completamente o AzubiForge,
transformando-o de um catálogo de capítulos em um sistema local,
estruturado e mensurável de aprendizagem para os Lernfelder 1–5
dos cursos de formação profissional em TI na Alemanha.

A aplicação é inspirada na organização dos livros Westermann:

- IT-Berufe Grundstufe Lernfelder 1–5
- Arbeitsbuch Lernsituationen Grundstufe Lernfelder 1–5
- materiais de exercícios e soluções correspondentes

Esses livros devem servir como referência para:

- Lernfelder
- Lernsituationen
- competências
- temas
- exercícios
- situações profissionais
- controle e reflexão

Entretanto, não transforme a aplicação em uma cópia digital do livro.

Use o conteúdo como base para criar uma jornada digital de aprendizagem
mais clara, interativa, mensurável e organizada.

## Restrições obrigatórias

- Não usar inteligência artificial.
- Não usar APIs externas.
- Não usar serviços pagos.
- Não criar dependência de servidor.
- Não criar dependência de internet.
- Não alterar funcionalidades existentes sem necessidade.
- Não excluir conteúdo já cadastrado.
- Não copiar textos protegidos integralmente dos livros.
- Preservar a aplicação como offline-first.
- Armazenar o conteúdo educacional em arquivos JavaScript locais.
- Usar `data.js` ou módulos JavaScript derivados dele.
- Salvar progresso no `IndexedDB` ou `localStorage`.
- Toda correção deve ser determinística.
- Toda regra de progressão deve funcionar localmente.

## Objetivo principal

O AzubiForge deve responder claramente:

1. O que eu devo estudar agora?
2. Por que devo estudar isso?
3. Quanto tempo essa tarefa levará?
4. O que preciso fazer para terminá-la?
5. Como posso praticar o conteúdo?
6. Como posso comprovar que entendi?
7. O que acontece se eu não passar no teste?
8. Quando devo revisar novamente?
9. Quanto realmente domino de cada competência?
10. Qual é o próximo passo depois da conclusão?

O usuário nunca deve ficar perdido ou precisar escolher aleatoriamente
o próximo capítulo.

A aplicação deve oferecer um plano claro, mas permitir que o usuário
acesse manualmente outros conteúdos quando desejar.

## Resultado esperado

O AzubiForge deve deixar de parecer:

- um livro digital;
- um catálogo de capítulos;
- uma coleção de cards;
- um conjunto de exercícios desconectados.

Ele deve passar a funcionar como:

- um planejador de aprendizagem;
- um guia de estudo diário;
- um sistema de missões;
- um ambiente de prática;
- um mecanismo de avaliação;
- um sistema de revisão;
- um mapa real de domínio das competências.

## Fluxo final esperado

```text
Abrir a aplicação
↓
Ver o plano de hoje
↓
Começar uma sessão
↓
Aprender um objetivo específico
↓
Praticar
↓
Aplicar
↓
Fazer o teste
↓
Receber um resultado claro
↓
Revisar o que errou
↓
Confirmar o domínio
↓
Receber o próximo passo
```

Implemente primeiro a engenharia pedagógica e de dados.

Somente depois refine o visual.

Não tente esconder uma arquitetura confusa usando cards, gradientes,
animações ou efeitos visuais.

A organização, o planejamento e as regras de aprendizagem devem ser
compreensíveis mesmo sem qualquer estilo CSS.
