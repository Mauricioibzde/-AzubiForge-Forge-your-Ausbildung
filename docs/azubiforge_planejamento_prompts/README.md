# AzubiForge — Planejamento e Prompts

Esta pasta destina-se aos arquivos `.md` de planejamento e prompts do AzubiForge.

## Como adicionar os arquivos do seu PC

Os arquivos em `D:\DOWNLOADS DO SISTEMA\azubiforge_planejamento_prompts\azubiforge_planejamento_prompts` **não estão acessíveis** pelo agente na nuvem (ambiente Linux remoto).

Para incluir no repositório:

1. Copie todos os `.md` desta pasta local para:
   `docs/azubiforge_planejamento_prompts/`
2. Ou arraste a pasta para o Cursor / faça commit manual.
3. Depois peça ao agente: *"Leia docs/azubiforge_planejamento_prompts e implemente"*.

## Estrutura esperada

```
docs/azubiforge_planejamento_prompts/
├── README.md          (este arquivo)
├── *.md               (seus prompts de planejamento)
└── ...
```

## Documentação relacionada já no repo

Parte do planejamento pode já estar em `/docs/`:

| Arquivo | Tema |
|---------|------|
| `01_AP1_EXAM_GUIDE.md` | Guia da prova AP1 |
| `02_COMPETENCY_FRAMEWORK.md` | Competências |
| `03_DEPENDENCY_MAP.md` | Ordem dos capítulos |
| `04_DEFINITION_OF_DONE.md` | Critérios de pronto |
| `05_DEPTH_STANDARD.md` | Profundidade do conteúdo |
| `06_EXAM_BLUEPRINT.md` | Blueprint do exame |
| `07_MODULE_ZERO.md` | Módulo introdutório |
| `08_CHAPTER_READY_CHECK.md` | Checklist de capítulo |
| `09_PROGRESS_FRAMEWORK.md` | Progresso do aluno |
| `10_AZUBIFORGE_PHILOSOPHY.md` | Filosofia do produto |
| `CONTENT_PRODUCTION_SYSTEM.md` | Sistema de produção de conteúdo |
| `ARCHITECTURE.md` | Arquitetura técnica |

Quando os arquivos locais forem copiados para cá, o agente poderá cruzar com esta documentação e priorizar o que falta na app.
