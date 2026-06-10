# MEMORIA OPERACIONAL DO PROJETO — Painel Mestre COI

Centro de Operacoes Integradas - Governo do Distrito Federal

Leitura obrigatoria antes de iniciar qualquer fase ou alteracao.

---

## Identificacao do Projeto

| Campo | Valor |
|---|---|
| Nome | Painel Mestre de Acompanhamento de Projetos COI |
| Repositorio V2 | pinheiroanderson03-dev/painel-mestre-projetos-coi-v2 |
| Pagina V2 | https://pinheiroanderson03-dev.github.io/painel-mestre-projetos-coi-v2/ |
| Pasta local V2 | COI - Painel Mestre de Acompanhamento de Projetos |
| Painel antigo | painel-mestre-projetos-coi-publicacao (somente consulta historica) |

**O painel antigo nunca deve ser alterado. Serve apenas como fonte de dados historicos confirmados.**

---

## Estado Atual

| Fase | Status | Descricao |
|---|---|---|
| v1.4 / Fase 4A | Concluida | Execucao Mensal e Gestao Executiva |
| v1.4.1 / Fase 4A.1 | Concluida | Historico mensal e seletor de competencia |
| Fase 4D.1 | Concluida | Governanca operacional dos agentes (AGENTS.md, docs/) |
| Fase 4D.2 | Concluida | Scripts de validacao PowerShell (scripts/) |
| Fase 4D.3 | Em andamento | Memoria operacional dos agentes |
| Fase 4C | Planejada | Edicao orientada pelo GitHub — sem implementacao |
| Fase 4B | Planejada | Edicao de fichas e exportacao de dados |

Branch de publicacao protegida: `publicacao-demandas-central-df` — NUNCA TOCAR.

---

## Tags Estaveis

| Tag | Descricao |
|---|---|
| v1.4.1-historico-mensal | Historico mensal com seletor de competencia |
| v1.4.1-governanca-agentes | Governanca operacional dos agentes |
| v1.4.1-scripts-validacao | Scripts de validacao PowerShell |

---

## Scripts Oficiais de Validacao

Executar sempre a partir da raiz do projeto no PowerShell.

| Script | Quando usar |
|---|---|
| `.\scripts\status-seguro.ps1` | Verificar branch, status e commits antes de qualquer acao |
| `.\scripts\validar-docs.ps1` | Apos alterar arquivos de documentacao |
| `.\scripts\validar-dados.ps1` | Apos alterar dados/projetos.js |
| `.\scripts\validar-projeto.ps1` | Validacao geral antes de qualquer commit ou push |

---

## Regras Rapidas

1. Nunca alterar o painel antigo.
2. Nunca fazer commit antes da validacao.
3. Nunca fazer push sem autorizacao do Anderson.
4. Nunca usar dados genericos se existir fonte real disponivel.
5. Sempre informar quais arquivos pretende alterar antes de comecar.
6. Sempre rodar os scripts de validacao antes do commit.
7. Se precisar sair do escopo autorizado, parar e pedir autorizacao.
8. Aviso LF/CRLF do git nao e erro — e comportamento normal do Windows.

---

## Estrutura de Arquivos Relevantes

```
raiz/
  index.html                  dashboard executivo
  portfolio.html               portfolio de projetos
  dados/projetos.js            fonte unica de verdade
  assets/style.css             design system
  projetos/ficha.html          ficha dinamica universal
  AGENTS.md                    regras e papeis dos agentes
  CHANGELOG.md                 historico de versoes tecnico
  RELEASE_NOTES.md             notas de versao para usuario
  ROADMAP_COI.md               roadmap de fases
  scripts/                     scripts de validacao PowerShell
  docs/
    PROTOCOLO_OPERACIONAL_AGENTES.md
    REGISTRO_DE_ERROS_E_APRENDIZADOS.md
    MEMORIA_OPERACIONAL_PROJETO.md   (este arquivo)
    CHECKLIST_EXECUCAO_AGENTES.md
```

---

*Ultima atualizacao: 2026-06-10 - Fase 4D.3 - Memoria Operacional*
