# MEMORIA OPERACIONAL DO PROJETO â€” Painel Mestre COI

ComunicaÃ§Ã£o Omnichannel Inteligente Â· Central IT

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
| Fase 5A.1 | Concluida | Preparacao da evolucao funcional â€” meta.versao corrigido, docs alinhados |
| Fase 5A.2 | Concluida | Evolucao Funcional do Painel â€” 9 melhorias (clearEl, filtro P0, frentes dinamicas, footer v1.4.1) |
| Fase 5A.3 | Concluida | Refinamentos Funcionais â€” tag v1.4.1-refinamentos-funcionais |
| Fase 5T.1 | Concluida | Infraestrutura de Qualidade â€” validador JS multiplataforma, checklist, docs |
| Fase 5T.2 | Concluida | Skills Operacionais Claude â€” 7 skills em .claude/skills/, 10 docs atualizados |
| Fase 5T.2-fix | Concluida | Correcao truncamento validar-funcional.js (E-007) + fechamento documental |
| Fase 5T.3 | Concluida | Framework 11 skills (COI-FORENSE, COI-LEARNINGS, COI-TESTES, COI-AUDITOR), 2 novos docs |
| Fase 5T.4 | Concluida | Enforcement operacional â€” COI-MESTRE como porta de entrada obrigatoria; 4 docs atualizados |
| Fase 5T.5 | Concluida | Correcao de Identidade Institucional â€” COI = Comunicacao Omnichannel Inteligente / Central IT; 30 arquivos corrigidos |
| Fase 5B.0 | Concluida | Auditoria Funcional â€” veredito NAO; painel sem representacao operacional real |
| Fase 5B.1 | Concluida | Modelagem Operacional Inicial â€” 5 registros COI-009 a COI-013; novos tipoItem; aba Demandas ativa; psProj/ps separados |
| Fase 5B.1.1 | Concluida | Consolidacao de Memoria e Aprendizado â€” E-008, A-008/A-009, PA-011 a PA-013, AP-011, DAR-011 registrados |
| Fase 5B.2 | Concluida | Exibicao Executiva das Demandas Operacionais no Portfolio â€” resumo executivo, 4 filtros, tabela 11 colunas, 11 novos asserts (66 total) |
| Fase 5B.2.1 | Concluida | Hotfix Renderizacao Abas Portfolio â€” portfolio.html truncado corrigido; null-check selProj; nav filtrada; Secao 9 validar-funcional.js (13 asserts, 79 total) |
| Fase 5B.3 | Concluida | Ficha Operacional Condicional
| Fase 5B.4 | Concluida | Indicadores Operacionais no Dashboard — buildIndicadoresOperacionais(); 7 grupos; 117 asserts | e Conclusao de Demandas â€” eOperacional(), renderFichaOperacional(), concluirDemanda(); 13 campos op; Secao 10 validar-funcional.js (14 asserts, 93 total) |
| Fase 5C.2 | Concluida | Execucao Assistida do Curador — COI-009 AIOps Concluido (chamado 518190); 5 campos atualizados via COI-CURADOR |
| Fase 5C.3 | Concluida | Protocolo de Validacao Obrigatoria — docs/PROTOCOLO_VALIDACAO_OBRIGATORIA.md criado; AGENTS.md secao 14 |
| Fase 5C.4 | Concluida | Consolidacao de Conhecimento — E-009/E-010 registrados, A-010/A-011 registrados, PVO atualizado com validar-docs.ps1, COI-CURADOR documentado na modelagem |
| Fase 5C.1 | Concluida | Agente Curador de Demandas e Projetos — 3 docs criados (AGENTE_CURADOR, MODELO_ENTRADA, PROTOCOLO_ATUALIZACAO); AGENTS.md secao 13; modos previa/assistido/publicacao |
| Fase 5B.5 | Concluida | Padronizacao COI 2.0 — renderFichaPadrao() 9 secoes em ficha.html; COI-013 OuvSUAS atualizado; namespace .fp-* |
| Fase 6.1 | Concluida | COI Analista — 4 docs criados (ARQUITETURA_COI_INTELLIGENCE, AGENTE_COI_ANALISTA, MODELO_RECOMENDACOES_IA, ROADMAP_COI_IA); AGENTS.md secao 16; fase exclusivamente documental |
| Fase 6.1-RF | Concluida | COI Intelligence Engine — Revisao Final: fluxo 7 etapas, 6 niveis de maturidade, COI Analista como modulo do Engine; INDICADORES_INTELIGENCIA.md criado; 4 docs atualizados; AGENTS.md secao 16 revisada |
| Fase 6.2 | Concluida | COI Curador Inteligente — primeiro modulo funcional do COI Intelligence Engine; scripts/coi-curador-inteligente.js; 12 regras R01-R12; score 0-100; 230 asserts (12 secoes) / 0 FAIL |
| Fase 6.2.1 | Concluida | Refinamento COI Curador Inteligente — config/regras-curador.js (12 regras); motor refatorado; --json; 294 asserts / 0 FAIL |
| Fase 4B | Planejada | Edicao de fichas e exportacao de dados |
| Fase 4C | Planejada | Edicao orientada pelo GitHub â€” sem implementacao |

Branch de publicacao protegida: `publicacao-demandas-central-df` â€” NUNCA TOCAR.


### Fase 6.3 — COI Auditor Inteligente (2026-07-07)
- **Arquivo criado:** `scripts/coi-auditor-inteligente.js` (510 linhas)
- **Arquivos alterados:** `scripts/validar-funcional.js` (Seção 13, +45 assertions), AGENTS.md (Seção 18), CHANGELOG.md (v1.7.0), RELEASE_NOTES.md (v1.7.0), ROADMAP_COI.md (Fase 6.3 concluída), docs/ESTADO_ATUAL_DO_PROJETO.md (v1.7.0), docs/MEMORIA_OPERACIONAL_PROJETO.md
- **Resultado:** 294 PASS / 0 FAIL / 13 seções
- **Padrão estabelecido:** Interface COI Intelligence Engine (`execute`, `score`, `recommendations`, `export`) para todos os módulos futuros
- **Pipeline:** Curador (--json) → Auditor (child_process.spawnSync) → [futuros módulos]
- **Aguardando:** commit + push + aprovação Anderson


### Modelagem Operacional (apos Fase 5B.1)

O painel passou a representar dois grupos de itens em `COI_DATA.projetos[]`:

**Projetos Estrategicos** (campo `tipoItem` omitido ou `'Projeto'`):
- COI-001 a COI-008

**Itens Operacionais** (campo `tipoItem` explicito):
- `'Demanda'` â€” COI-010 (Recarga Gupshup)
- `'Incidente'` â€” COI-011 (Incidente Nuvidio)
- `'Licenca/Contrato'` â€” COI-009 (Licenca AIOps â€” Concluido, chamado 518190)
- `'Atividade Operacional'` â€” COI-012 (Monitoramento AIOps AURA 156)
- `'Entrega Contratual'` â€” COI-013 (MDS Formulario Ouvidoria)

Campos adicionais em registros operacionais: `solicitante`, `dataSolicitacao`, `prazoResolucao`, `dataResolucao`, `categoriaOperacional`, `origem`, `observacoesOperacionais`, `evidencia`.

**Curador Operacional (Fase 5C):**
A atualizacao de registros operacionais e feita via COI-CURADOR-DEMANDAS-PROJETOS. O curador interpreta texto livre ou formulario, gera previa JSON para aprovacao de Anderson, e aciona o COI-EXECUTOR para aplicar apos confirmacao. Nunca altera `dados/projetos.js` diretamente sem previa aprovada.
- Documentacao: `docs/AGENTE_CURADOR_DEMANDAS_PROJETOS.md`
- Formularios: `docs/MODELO_ENTRADA_DEMANDAS_PROJETOS.md`
- Protocolo: `docs/PROTOCOLO_ATUALIZACAO_DADOS_OPERACIONAIS.md`

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
| v1.4.1-refinamentos-funcionais | 5A.3 | Refinamentos funcionais â€” ULTIMA TAG ESTAVEL ATUAL |

---

## Scripts Oficiais de Validacao

| Script | Quando usar | Plataforma |
|---|---|---|
| `.\scripts\status-seguro.ps1` | Verificar branch, status e commits antes de qualquer acao | Windows / PowerShell |
| `.\scripts\validar-docs.ps1` | Apos alterar arquivos de documentacao | Windows / PowerShell |
| `.\scripts\validar-dados.ps1` | Apos alterar dados/projetos.js | Windows / PowerShell |
| `.\scripts\validar-projeto.ps1` | Validacao geral antes de qualquer commit ou push | Windows / PowerShell |
| `node scripts/validar-funcional.js` | Apos alterar HTML, CSS ou JS funcional | Qualquer SO (Node.js) |

O script `validar-funcional.js` foi criado na Fase 5T.1, expandido nas Fases 5B.1, 5B.2, 5B.2.1, 5B.3, 6.2 e 6.2.1. Executa 294 asserts em 12 secoes: arquivos, sintaxe, conteudo de dados/projetos.js, melhorias das fases 5A.2/5A.3, padroes proibidos, modelagem operacional (Secao 6 â€” 14 asserts), exibicao executiva demandas (Secao 7 â€” 11 asserts), integridade de navegacao (Secao 8), hotfix renderizacao portfolio (Secao 9 â€” 13 asserts), ficha operacional e conclusao de demandas (Secao 10 â€” 14 asserts). Retorna exit code 0 (sem erros) ou 1 (ha erros).

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
8. Aviso LF/CRLF do git nao e erro â€” e comportamento normal do Windows.
11. Commits via sandbox Linux requerem workaround GIT_INDEX_FILE (ver E-009/A-010). Nunca usar git add/commit direto do sandbox.
12. Apos qualquer commit via workaround, verificar e corrigir .git/HEAD via Python se necessario (ver E-010).
9. Preferir commits atomicos por melhoria individual â€” nu
| R4    | COI OS Session Template | v1.9.0  | 2026-07-13 | Criados: COI_SESSION_TEMPLATE.md (x3). Atualizados: AGENTS.md S20, RUNTIME, STATUS, INDEX, CHANGELOG, RELEASE_NOTES, ROADMAP, ESTADO_ATUAL, MEMORIA |
