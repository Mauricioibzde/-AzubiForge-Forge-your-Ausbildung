# AzubiForge

Forge your Ausbildung.

AzubiForge e um app de estudo offline para AP1 FIAE, organizado por Lernfelder e pensado para estudar em ciclos curtos: leitura, Praxisfall, Wortschatz, exercicios, revisao e prontidao para prova.

## Stack

- Vite
- TypeScript
- CSS
- Playwright para smoke tests

## Rodar localmente

```bash
npm install
npm run dev
```

Servidor padrao:

```text
http://127.0.0.1:5174/
```

## Comandos

```bash
npm run check
npm run build
npm run preview
npm run smoke
```

`npm run smoke` espera um servidor ativo em `http://127.0.0.1:5174`. Para testar outro alvo:

```bash
AZUBIFORGE_URL=http://127.0.0.1:4174 npm run smoke
```

No PowerShell:

```powershell
$env:AZUBIFORGE_URL='http://127.0.0.1:4174'; npm run smoke; Remove-Item Env:AZUBIFORGE_URL
```

## GitHub Pages

O site precisa do **build do Vite** (`dist/`), nao do codigo-fonte.

1. Em **Settings → Pages → Build and deployment**, escolha **GitHub Actions** (nao "Deploy from a branch").
2. O workflow `.github/workflows/deploy-pages.yml` publica `dist/` a cada push em `main`.
3. URL esperada:
   `https://mauricioibzde.github.io/-AzubiForge-Forge-your-Ausbildung./`

Com `base: "./"` no Vite, CSS/JS e o service worker resolvem no subcaminho do repositorio.

## Planejamento e prompts

Especificação completa do sistema de aprendizagem (missões, planejador, revisão, schemas):

[docs/azubiforge_planejamento_prompts/](docs/azubiforge_planejamento_prompts/)

## Arquitetura

Veja [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Próxima ação de aprendizagem

Fonte única de verdade para “O que eu devo fazer agora?”:

[docs/NEXT_LEARNING_ACTION.md](docs/NEXT_LEARNING_ACTION.md)

Evidência e XP honestos (sem gamificação vazia):

[docs/LEARNING_EVIDENCE.md](docs/LEARNING_EVIDENCE.md)
