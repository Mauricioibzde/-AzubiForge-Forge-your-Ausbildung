# Docs AI — AzubiForge

Pasta pensada para **entregar o contexto da aplicação a outra IA** (ChatGPT, DeepSeek, Claude, Gemini, etc.) e pedir análise estratégica: melhorias, avanços, pontos ruins e pontos positivos.

## Arquivos

| Arquivo | Uso |
|---|---|
| [`AZUBIFORGE_HANDOFF_COMPLETO.md`](./AZUBIFORGE_HANDOFF_COMPLETO.md) | **Documento único** — cole inteiro no chat da IA |
| [`PROMPT_PARA_IA.md`](./PROMPT_PARA_IA.md) | Prompt pronto (cole **depois** do handoff, ou junto) |
| [`01_PRODUTO.md`](./01_PRODUTO.md) | Produto, público, exame AP1 |
| [`02_ARQUITETURA.md`](./02_ARQUITETURA.md) | Stack, pastas, rotas, estado, dados |
| [`03_PEDAGOGIA_E_UX.md`](./03_PEDAGOGIA_E_UX.md) | Modelo pedagógico, fluxos, Jornada, mobile |
| [`04_DIAGNOSTICO.md`](./04_DIAGNOSTICO.md) | Pontos fortes, fracos, dívidas técnicas, oportunidades |

## Como usar (recomendado)

1. Abra o ChatGPT / DeepSeek / Claude.
2. Cole o conteúdo de **`AZUBIFORGE_HANDOFF_COMPLETO.md`**.
3. Em seguida cole o conteúdo de **`PROMPT_PARA_IA.md`**.
4. Peça o formato de resposta que preferir (roadmap, critique, redesign, priorização).

Se o modelo tiver limite de tokens, use na ordem:

1. `01_PRODUTO.md` + `04_DIAGNOSTICO.md` + `PROMPT_PARA_IA.md`
2. Depois envie `02_ARQUITETURA.md` e `03_PEDAGOGIA_E_UX.md` como follow-up.

## O que esta pasta NÃO substitui

- Código-fonte (`src/`, `data.js`)
- Planejamento pedagógico detalhado: `docs/azubiforge_planejamento_prompts/`
- Arquitetura interna: `docs/ARCHITECTURE.md`
- Plano mobile: `docs/mobile-ux-plan.md`

## Atualização

Sempre que houver mudança grande de produto/UX/domínio, atualize o handoff completo e a data no topo do arquivo.
