# Prompt pronto para ChatGPT / Claude / DeepSeek

Cole **primeiro** o arquivo `AZUBIFORGE_HANDOFF_COMPLETO.md` (ou os arquivos `01`–`04`).

Depois cole o bloco abaixo.

---

## Prompt

```
Você é um product strategist + lead engineer analisando o AzubiForge, um app web offline-first de preparação para a Ausbildung (Fachinformatiker Anwendungsentwicklung / AP1) na Alemanha.

Use APENAS o handoff que eu colei acima como fonte de verdade. Não invente features que não estejam documentadas. Se algo estiver ambíguo, marque como hipótese.

Contexto do usuário: sou o mantenedor solo do app. Quero um plano de avanços realista, priorizado, que maximize valor para o aprendiz ocupado (mobile + AP1 + offline), sem reescrever a stack à toa.

Entregue em português (PT-BR), com esta estrutura:

## 1. Síntese do produto (máx. 5 linhas)

## 2. Pontos positivos (Top 5)
Para cada um: o que é + por que importa estrategicamente.

## 3. Pontos fracos / riscos (Top 5)
Para cada um: impacto no usuário + risco técnico/produto + severidade (alta/média/baixa).

## 4. Roadmap em 3 fases
Para cada fase:
- Objetivo
- Escopo concreto (telas/rotas/sistemas: #home, #journey, #learn, AP1, progressStore, etc.)
- Fora de escopo
- Dependências / riscos
Não use prazos em dias/semanas; fale em esforço relativo (P/M/G) e invasividade.

## 5. Quick wins (5–8)
Baixo esforço, alto impacto. Cada item: mudança → efeito esperado → onde tocar no código (se inferível).

## 6. O que NÃO fazer agora
Lista explícita com motivo (ex.: rewrite React, auth obrigatório, etc.).

## 7. Hipóteses a validar
3–5 hipóteses com: como validar de forma barata (sem analytics enterprise).

## 8. Prompt de follow-up
Um prompt curto que eu possa colar depois para detalhar só a Fase 1 em issues/PRs.

Restrições:
- Preserve offline-first e localStorage como default.
- Não sugira inchamento da Home (#home = painel da missão, não dashboard).
- Prefira evoluir Vite+TS+HTML strings a menos que justifique migração.
- Seja específico ao AzubiForge; evite conselhos genéricos de SaaS/edtech.
- Quando citar melhoria de UX mobile, alinhe com bottom nav e sessão imersiva já existentes.
```

---

## Variações úteis

### Só produto / UX
Adicione no final: `Foque em UX pedagógica e mobile. Minimize discussão de infra.`

### Só engenharia
Adicione: `Foque em arquitetura, dívida técnica, testes e modelo de dados. Minimize copy de marketing.`

### Comparar com alternativas
Adicione: `Compare brevemente com Anki + Notion + curso genérico: o que AzubiForge deve ganhar e o que não deve copiar.`
