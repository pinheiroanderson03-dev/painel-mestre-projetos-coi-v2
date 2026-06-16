# ESTADO ATUAL DO PROJETO — Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

> Este documento registra o estado pontual do projeto em determinado momento.
> Sem regras, sem fluxos, sem historico detalhado — apenas o que e preciso saber antes de comecar.
> Atualizar obrigatoriamente ao fechar cada fase.

---

Atualizado em: 2026-06-16 · Responsavel pela atualizacao: Fase 5B.2 — Exibicao Executiva das Demandas Operacionais no Portfolio

---

## Versao e Branch

| Campo | Valor |
|---|---|
| Versao atual | v1.4.1 |
| Branch principal | main |
| Ultima tag estavel | v1.4.1-modelagem-operacional-inicial |
| Branch protegida (nunca tocar) | publicacao-demandas-central-df |

---

## Fases Concluidas

| Fase | Versao | Entrega |
|---|---|---|
| Fase 4A | v1.4 | Execucao Mensal e Gestao Executiva |
| Fase 4A.1 | v1.4.1 | Historico mensal e seletor de competencia |
| Fase 4D.1 | v1.4.1 | Governanca operacional dos agentes (AGENTS.md, docs/) |
| Fase 4D.2 | v1.4.1 | Scripts de validacao PowerShell (scripts/) |
| Fase 4D.3 | v1.4.1 | Memoria operacional e checklist (docs/) |
| Fase 4D.4 | v1.4.1 | Base de interacao assistida no ChatGPT (docs/) |
| Fase 4D.4.1 | v1.4.1 | Consolidacao da memoria operacional do projeto |
| Fase 4D.4.2 | v1.4.1 | Delegacao operacional controlada ao Claude — Concluida |
| Fase 4D.5 | v1.4.1 | Plano de rollback seguro e matriz de contingencia — Concluida |
| Fase 5A.1 | v1.4.1 | Preparacao da evolucao funcional — meta.versao corrigido, documentacao alinhada — Concluida |
| Fase 5A.2 | v1.4.1 | Evolucao Funcional do Painel — 9 melhorias (B-01 a I-04, U-01 a U-04) — Concluida |
| Fase 5A.3 | v1.4.1 | Refinamentos Funcionais — tag v1.4.1-refinamentos-funcionais — Concluida |
| Fase 5T.1 | v1.4.1 | Infraestrutura de Qualidade — validador JS multiplataforma, checklist, docs — Concluida |
| Fase 5T.2 | v1.4.1 | Skills Operacionais Claude — 7 skills em .claude/skills/, 10 docs atualizados — Concluida |
| Fase 5T.2-fix | v1.4.1 | Correcao truncamento validar-funcional.js + fechamento documental (E-007) — Concluida |
| Fase 5T.3 | v1.4.1 | Aprendizado continuo e validacao forense — 4 skills novas, 2 docs novos, framework 11 skills — Concluida |
| Fase 5T.4 | v1.4.1 | Enforcement operacional do COI-MESTRE — COI-MESTRE como unica porta de entrada obrigatoria em CLAUDE.md, AGENTS.md, CHECKLIST, PROTOCOLO — Concluida |
| Fase 5T.5 | v1.4.1 | Correcao de Identidade Institucional — COI = Comunicacao Omnichannel Inteligente / Central IT; 30 arquivos corrigidos (HTML, skills, docs, script) — Concluida |
| Fase 5B.0 | v1.4.1 | Auditoria Funcional — veredito NAO; painel sem representacao operacional real — Concluida |
| Fase 5B.1 | v1.4.1 | Modelagem Operacional Inicial — 5 registros COI-009 a COI-013; novos tipoItem; aba Demandas ativa; psProj/ps separados — Concluida |
| Fase 5B.1.1 | v1.4.1 | Consolidacao de Memoria e Aprendizado — E-008, A-008/A-009, PA-011 a PA-013, AP-011, DAR-011; 5 docs atualizados — Concluida |
| Fase 5B.2 | v1.4.1 | Exibicao Executiva das Demandas Operacionais no Portfolio — resumo executivo, 4 filtros, tabela 11 colunas, 11 novos asserts (66 total) — Concluida |

---

## Fase em Execucao

Fase 5B.2 concluida em 2026-06-16. Portfolio com exibicao executiva das demandas operacionais implementada e validada.
Aguardando commit e aprovacao do Anderson para fechar 5B.2.
Proxima fase: Fase 5B.3 — Indicadores Operacionais (cards executivos para Incidentes, Licencas, Atividades Operacionais).

---

## Fases Planejadas

| Fase | Versao | Escopo |
|---|---|---|
| Fase 5B.3 | v1.5 | Indicadores operacionais — cards para Incidentes, Licencas, Atividades Operacionais |
| Fase 5B.4 | v1.5 | Evolucao ficha.html — exibicao de campos operacionais na ficha universal |
| Fase 4B | v1.5 | Edicao de fichas e exportacao de dados |
| Fase 4C | v1.6 | Edicao orientada pelo GitHub e governanca de dados |

---

## Proxima Acao Prevista

Fase 5B.2 concluida em 2026-06-16.
Portfolio com resumo executivo operacional (totais, por tipo, P0/P1), 4 filtros (tipoItem, status, prioridade, frente), tabela com 11 colunas e novas funcoes JS (getItensOperacionais, renderResumoExecutivo).
validar-funcional.js: 66 asserts, 0 falhas.
Aguardando commit e aprovacao do Anderson.
Proxima fase sugerida: Fase 5B.3 — Indicadores Operacionais (cards dashboard para Incidentes, Licencas, Atividades).

---

## Arquivos Criticos e Estado

| Arquivo | Estado |
|---|---|
| `dados/projetos.js` | meta.versao "1.4.1"; 13 registros (COI-001 a COI-013); novos tipoItem: Demanda, Incidente, Licenca/Contrato, Atividade Operacional, Entrega Contratual |
| `index.html` | v1.4.1; seletor de competencia; fallback robusto; clearEl; filtro P0 ativo |
| `assets/style.css` | v1.4.1; namespace .em-*; .em-select com variaveis corretas |
| `portfolio.html` | Fase 5B.2 — resumo executivo operacional, 4 filtros (tipoItem/status/prioridade/frente), tabela 11 colunas, getItensOperacionais(), renderResumoExecutivo() |
| `index.html` | Fase 5B.1 — psProj/ps separados; cards projetos usam psProj; nDemandas conta todos os nao-Projeto nao-Concluidos |
| `assets/style.css` | Fase 5B.1 — badges tipoItem: .badge-tipo-demanda, -incidente, -melhoria, -licen-a-contrato, -atividade-operacional, -entrega-contratual |
| `projetos/ficha.html` | clearEl; salvarEdicao permite limpar campos; footer v1.4.1 |
| `scripts/validar-funcional.js` | Fase 5B.2 — 66 asserts (11 novos para exibicao executiva demandas), 8 secoes, exit 0/1 |
| `.claude/skills/COI-MESTRE.md` | Atualizado (Fase 5T.3) — orquestrador de 11 skills |
| `.claude/skills/COI-FORENSE.md` | NOVO (Fase 5T.3) — analise forense pre-execucao |
| `.claude/skills/COI-LEARNINGS.md` | NOVO (Fase 5T.3) — prevencao de erros por aprendizado |
| `.claude/skills/COI-TESTES.md` | NOVO (Fase 5T.3) — suite de testes T1-T6 pre-QA |
| `.claude/skills/COI-AUDITOR.md` | NOVO (Fase 5T.3) — auditoria de protocolo e escopo |
| `docs/BASE_DE_CONHECIMENTO_EVOLUTIVA.md` | NOVO (Fase 5T.3) — padroes aprovados e anti-padroes |
| `docs/DECISOES_ARQUITETURAIS_COI.md` | NOVO (Fase 5T.3) — DAR-001 a DAR-010 |
| `scripts/status-seguro.ps1` | Validacao de branch e status — ASCII puro |
| `scripts/validar-docs.ps1` | Validacao de documentacao — ASCII puro |
| `scripts/validar-dados.ps1` | Validacao de dados/projetos.js — ASCII puro |
| `scripts/validar-projeto.ps1` | Validacao geral pre-commit — ASCII puro |
| `docs/ESTADO_ATUAL_DO_PROJETO.md` | Este arquivo — atualizado em Fase 5T.1 |
| `docs/MEMORIA_OPERACIONAL_PROJETO.md` | Documento estrutural — atualizado em Fase 5T.1 |
| `AGENTS.md` | Regras e papeis dos agentes — COI-MESTRE como primeira leitura obrigatoria (Fase 5T.4) |
| `CLAUDE.md` | Regra de Entrada Obrigatoria (Fase 5T.4) — COI-MESTRE como unica porta de entrada; protocolo paralelo removido |
| `docs/CHECKLIST_EXECUCAO_AGENTES.md` | PASSO 0 obrigatorio (Fase 5T.4) — COI-MESTRE; proibicao de entrada direta por skills especializadas |
| `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` | Passo -1 ACIONAR COI-MESTRE (Fase 5T.4) — regra obrigatoria antes do fluxo padrao |
| `docs/PLANO_ROLLBACK_SEGURO.md` | Procedimentos de rollback por tipo — Fase 4D.5 |
| `docs/MATRIZ_CONTINGENCIA.md` | 13 tipos de incidente classificados — Fase 4D.5 |

---

## Tags Estaveis Registradas

| Tag | Fase | Descricao |
|---|---|---|
| v1.4.1-historico-mensal | 4A.1 | Historico mensal com seletor de competencia |
| v1.4.1-governanca-agentes | 4D.1 | Governanca operacional dos agentes |
| v1.4.1-scripts-validacao | 4D.2 | Scripts de validacao PowerShell |
| v1.4.1-base-interacao-chatgpt | 4D.4 | Base de interacao assistida no ChatGPT |
| v1.4.1-consolidacao-memoria | 4D.4.1 | Consolidacao da memoria operacional |
| v1.4.1-delegacao-operacional | 4D.4.2 | Delegacao operacional controlada ao Claude |
| v1.4.1-rollback-seguro | 4D.5 | Plano de rollback seguro e matriz de contingencia |
| v1.4.1-refinamentos-funcionais | 5A.3 | Refinamentos funcionais — ultima tag estavel atual |

---

## Recomendacoes Tecnica