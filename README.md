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

## Arquitetura

Veja [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
