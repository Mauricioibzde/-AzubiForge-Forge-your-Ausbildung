# AGENTS.md

## Cursor Cloud specific instructions

AzubiForge is a **client-only, offline-first study PWA** (Vite + TypeScript, vanilla TS UI). There is no backend, database, or auth — all content is static (`data.js`, `data/deep-content.js`) and progress lives in browser `localStorage`. The only "service" to run is the Vite dev/preview static server.

Standard commands live in `package.json` and `README.md` (`npm run dev`, `check`, `test`, `build`, `preview`, `smoke`). Notes below are only the non-obvious caveats.

- **Dev server:** `npm run dev` serves at `http://127.0.0.1:5174/`. `npm run preview` (after `npm run build`) serves the built `dist/` at `http://127.0.0.1:4174/`. Routing is hash-based (e.g. `/#exam`, `/#course`, `/#reader/<chapterId>`).
- **Smoke tests:** `npm run smoke` (Playwright) requires a running server AND Playwright browser binaries. If they're missing, run `npx playwright install chromium` once. Point at the preview server with `AZUBIFORGE_URL=http://127.0.0.1:4174 npm run smoke`.
- **Known smoke caveat:** the mobile-reader section of `scripts/smoke.mjs` clicks `[data-reader-tab="practice"]`, which currently resolves to 2 elements (one hidden), so the smoke run can fail at that step even though all desktop routes (home, course, reader, review, exam, glossary, docs-ai) and mobile-home render correctly and screenshots are written to `test-results/screenshots/`. Treat a failure only at that mobile-reader step as a pre-existing test-selector issue, not an environment break.
- **"Lint":** there is no ESLint/Prettier. `npm run check` (`tsc --noEmit`) is the type/lint gate.
- **CI:** `.github/workflows/deploy-pages.yml` only builds and deploys to GitHub Pages; it does not run unit or smoke tests.
- **`agent/` folder** is an optional, standalone Ollama Python prototype unrelated to the study app. It needs a local Ollama instance and is not required to run or test AzubiForge.
- Root `script.js` is legacy/unused; the real app entry is `src/main.ts` via Vite.
