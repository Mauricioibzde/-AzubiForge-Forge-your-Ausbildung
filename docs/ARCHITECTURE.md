# AzubiForge Architecture

AzubiForge agora usa uma stack simples e mais sustentavel para um app de estudo offline:

- Vite para servidor de desenvolvimento e build.
- TypeScript para contratos entre dados, estado e telas.
- CSS unico por enquanto, porque a interface ainda e pequena e o custo de um framework de componentes seria maior que o ganho.
- Dados do curso em `data.js`, importados pela entrada principal e expostos como `window.AZUBIFORGE_DATA` para manter compatibilidade com o conteudo ja produzido.

## Estrutura

```text
src/
  app.ts                 Controller principal: rotas, eventos e persistencia.
  appContext.ts          Contrato compartilhado entre views.
  main.ts                Entrada do Vite.
  types.ts               Tipos de dominio e UI.
  data/courseData.ts     Adaptador para carregar o conteudo do curso.
  domain/course.ts       Regras puras: progresso, filas, filtros e selecoes.
  state/store.ts         LocalStorage, importacao e exportacao de progresso.
  ui/html.ts             Helpers pequenos de HTML seguro e componentes basicos.
  ui/components.ts       Cards e blocos reutilizaveis.
  views/*.ts             Telas completas por rota.
```

## Responsabilidades

`data.js` deve continuar focado em conteudo: capitulos, modulos, glossario e Lernsituationen.

`src/domain/course.ts` deve receber dados e estado, calcular resultados e nao tocar no DOM. Essa separacao facilita testes futuros.

`src/state/store.ts` e o unico lugar que conhece o formato salvo no navegador. Mudancas futuras no progresso devem passar por uma migracao aqui.

`src/views/` gera HTML de cada tela. As views podem chamar helpers de UI e dominio, mas nao devem salvar estado diretamente.

`src/app.ts` coordena eventos, atualiza estado, salva progresso e redesenha a rota atual.

## Comandos

```bash
npm run dev
npm run check
npm run build
npm run preview
npm run smoke
```

`npm run smoke` espera que um servidor esteja ativo em `http://127.0.0.1:5174`. Para testar outro alvo, use `AZUBIFORGE_URL`.

## Deploy (GitHub Pages)

GitHub Pages nao executa Vite. Publicar a pasta `dist/` gerada por `npm run build`.

- `vite.config.ts` usa `base: "./"` para assets relativos no subcaminho do repositorio.
- Workflow: `.github/workflows/deploy-pages.yml`.
- Em Settings → Pages, a fonte deve ser **GitHub Actions**.

Se Pages estiver em "Deploy from a branch" na raiz de `main`, o navegador recebe `index.html` apontando para `/src/main.ts` e a app nao carrega.

## Proximos passos recomendados

- Migrar `data.js` para `src/data/courseContent.ts` quando o conteudo estiver mais estavel.
- Criar testes unitarios para `src/domain/course.ts` e `src/state/store.ts`.
- Trocar o service worker manual por uma solucao PWA integrada ao Vite caso o offline precise ficar mais robusto.
- Quebrar `style.css` em tokens, layout e componentes se o CSS crescer muito mais.
