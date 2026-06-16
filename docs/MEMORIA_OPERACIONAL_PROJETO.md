# MEMORIA OPERACIONAL DO PROJETO — Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

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

> Para o estado pontual atualizado (versao, branch, tag, fases, proxima acao), consultar `docs/ESTADO_ATUAL_DO_PROJETO.md`.

| Fase | Status | Descricao |
|---|---|---|
| v1.4 / Fase 4A | Concluida | Execucao Mensal e Gestao Executiva |
| v1.4.1 / Fase 4A.1 | Concluida | Historico mensal e seletor de competencia |
| Fase 4D.1 | Concluida | Governanca operacional dos agentes (AGENTS.md, docs/) |
| Fase 4D.2 | Concluida | Scripts de validacao PowerShell (scripts/) |
| Fase 4D.3 | Concluida | Memoria operacional e checklist (docs/) |
| Fase 4D.4 | Concluida | Base de interacao assistida no ChatGPT (docs/) |
| Fase 4D.4.1 | Concluida | Consolidacao da memoria operacional do projeto |
| Fase 4D.4.2 | Concluida | Delegacao operacional controlada ao Claude (AGENTS.md, CLAUDE.md, docs/) |
| Fase 4D.5 | Concluida | Plano de rollback seguro e matriz de contingencia (docs/) |
| Fase 5A.1 | Concluida | Preparacao da evolucao funcional — meta.versao corrigido, docs alinhados |
| Fase 5A.2 | Concluida | Evolucao Funcional do Painel — 9 melhorias (clearEl, filtro P0, frentes dinamicas, footer v1.4.1) |
| Fase 5A.3 | Concluida | Refinamentos Funcionais — tag v1.4.1-refinamentos-funcionais |
| Fase 5T.1 | Concluida | Infraestrutura de Qualidade — validador JS multiplataforma, checklist, docs |
| Fase 5T.2 | Concluida | Skills Operacionais Claude — 7 skills em .claude/skills/, 10 docs atualizados |
| Fase 5T.2-fix | Concluida | Correcao truncamento validar-funcional.js (E-007) + fechamento documental |
| Fase 5T.3 | Concluida | Framework 11 skills (COI-FORENSE, COI-LEARNINGS, COI-TESTES, COI-AUDITOR), 2 novos docs |
| Fase 5T.4 | Concluida | Enforcement operacional — COI-MESTRE como porta de entrada obrigatoria; 4 docs atualizados |
| Fase 5T.5 | Concluida | Correcao de Identidade Institucional — COI = Comunicacao Omnichannel Inteligente / Central IT; 30 arquivos corrigidos |
| Fase 5B.0 | Concluida | Auditoria Funcional — veredito NAO; painel sem representacao operacional real |
| Fase 5B.1 | Concluida | Modelagem Operacional Inicial — 5 registros COI-009 a COI-013; novos tipoItem; aba Demandas ativa; psProj/ps separados |
| Fase 5B.1.1 | Concluida | Consolidacao de Memoria e Aprendizado — E-008, A-008/A-009, PA-011 a PA-013, AP-011, DAR-011 registrados |
| Fase 5B.2 | Concluida | Exibicao Executiva das Demandas Operacionais no Portfolio — resumo executivo, 4 filtros, tabela 11 colunas, 11 novos asserts (66 total) |
| Fase 4B | Planejada | Edicao de fichas e exportacao de dados |
| Fase 4C | Planejada | Edicao orientada pelo GitHub — sem implementacao |

Branch de publicacao protegida: `publicacao-demandas-central-df` — NUNCA TOCAR.

### Modelagem Operacional (apos Fase 5B.1)

O painel passou a representar dois grupos de itens em `COI_DATA.projetos[]`:

**Projetos Estrategicos** (campo `tipoItem` omitido ou `'Projeto'`):
- COI-001 a COI-008

**Itens Operacionais** (campo `tipoItem` explicito):
- `'Demanda'` — COI-010 (Recarga Gupshup)
- `'Incidente'` — COI-011 (Incidente Nuvidio)
- `'Licenca/Contrato'` — COI-009 (Licenca AIOps)
- `'Atividade Operacional'` — COI-012 (Monitoramento AIOps AURA 156)
- `'Entrega Contratual'` — COI-013 (MDS Formulario Ouvidoria)

Campos adicionais em registros operacionais: `solicitante`, `dataSolicitacao`, `prazoResolucao`, `dataResolucao`, `categoriaOperacional`, `origem`, `observacoesOperacionais`.

---

## Tags Estaveis

| Tag | Fase | Descricao |
|---|---|---|
| v1.4.1-historico-mensal | 4A.1 | Historico mensal com seletor de competencia |
| v1.4.1-governanca-agentes | 4D.1 | Governanca operacional dos agentes |
| v1.4.1-scripts-validacao | 4D.2 | Scripts de validacao PowerShell |
| v1.4.1-base-interacao-chatgpt | 4D.4 | Base de interacao assistida no ChatGPT |
| v1.4.1-consolidacao-memoria | 4D.4.1 | Consolidacao da memoria operacional |
| v1.4.1-delegacao-operacional | 4D.4.2 | Delegacao operacional controlada ao Claude |
| v1.4.1-rollback-seguro | 4D.5 | Plano de rollback seguro e matriz de contingencia |
| v1.4.1-refinamentos-funcionais | 5A.3 | Refinamentos funcionais — ULTIMA TAG ESTAVEL ATUAL |

---

## Scripts Oficiais de Validacao

| Script | Quando usar | Plataforma |
|---|---|---|
| `.\scripts\status-seguro.ps1` | Verificar branch, status e commits antes de qualquer acao | Windows / PowerShell |
| `.\scripts\validar-docs.ps1` | Apos alterar arquivos de documentacao | Windows / PowerShell |
| `.\scripts\validar-dados.ps1` | Apos alterar dados/projetos.js | Windows / PowerShell |
| `.\scripts\validar-projeto.ps1` | Validacao geral antes de qualquer commit ou push | Windows / PowerShell |
| `node scripts/validar-funcional.js` | Apos alterar HTML, CSS ou JS funcional | Qualquer SO (Node.js) |

O script `validar-funcional.js` foi criado na Fase 5T.1, expandido na Fase 5B.1 e na Fase 5B.2. Executa 66 asserts em 8 secoes: arquivos, sintaxe, conteudo de dados/projetos.js, melhorias das fases 5A.2/5A.3, padroes proibidos, modelagem operacional (Secao 6 — 14 asserts), exibicao executiva demandas (Secao 7 — 11 asserts) e integridade de navegacao (Secao 8). Retorna exit code 0 (sem erros) ou 1 (ha erros).

Executar sempre a partir da raiz do projeto.

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
9. Preferir commits atomicos por melhoria individual — nunca acumular mais de uma fase sem commit (Fase 5T.1).
10. ESTADO_ATUAL, CHANGELOG, ROADMAP e MEMORIA devem ser atualizados ANTES do commit de fechamento de fase (Fase 5T.1).

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
  scripts/                     scripts de validacao PowerShell e Node.js
    validar-funcional.js         validador multiplataforma Node.js (Fase 5T.1)
  .claude/skills/              skills operacionais Claude (Fase 5T.2-5T.3) -- 11 skills
    COI-MESTRE.md                orquestrador -- unica porta de entrada
    COI-MEMORIA.md               estado atual, erros, alertas
    COI-FORENSE.md               evidencias vs hipoteses (Fase 5T.3)
    COI-ARQUITETO.md             modo, escopo, plano
    COI-LEARNINGS.md             prevencao de erros; DAR; base evolutiva (Fase 5T.3)
    COI-EXECUTOR.md              implementacao segura com padroes corretos
    COI-TESTES.md                suite de testes pre-QA T1-T6 (Fase 5T.3)
    COI-AUDITOR.md               auditoria de protocolo e escopo (Fase 5T.3)
    COI-QA.md                    validacao completa
    COI-GOVERNANCA.md            atualizacao de documentos obrigatorios
    COI-RELEASE-MANAGER.md       pacote de entrega de 9 itens
  docs/
    ESTADO_ATUAL_DO_PROJETO.md     estado pontual do projeto (atualizar ao fechar fase)
    PROTOCOLO_OPERACIONAL_AGENTES.md
    REGISTRO_DE_ERROS_E_APRENDIZADOS.md
    BASE_DE_CONHECIMENTO_EVOLUTIVA.md  padroes aprovados, anti-padroes, solucoes (Fase 5T.3)
    DECISOES_ARQUITETURAIS_COI.md      DAR-001 a DAR-NNN (Fase 5T.3)
    MEMORIA_OPERACIONAL_PROJETO.md   (este arquivo — documento estrutural)
    CHECKLIST_EXECUCAO_AGENTES.md
    BASE_INTERACAO_ASSISTIDA_CHATGPT.md
    AGENTES_ESPECIALIZADOS_CHATGPT.md
```

---
