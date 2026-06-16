# ESTADO ATUAL DO PROJETO — Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

> Este documento registra o estado pontual do projeto em determinado momento.
> Sem regras, sem fluxos, sem historico detalhado — apenas o que e preciso saber antes de comecar.
> Atualizar obrigatoriamente ao fechar cada fase.

---

Atualizado em: 2026-06-16 · Responsavel pela atualizacao: Fase 5C.1 — Agente Curador de Demandas e Projetos

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
| Fase 5B.2.1 | v1.4.1 | Hotfix Renderizacao Abas Portfolio — portfolio.html truncado corrigido; null-check selProj; nav filtrada; Secao 9 validar-funcional.js (13 asserts, 79 total) — Concluida |
| Fase 5B.3 | v1.4.1 | Ficha Operacional Condicional e Conclusao de Demandas — eOperacional(), renderFichaOperacional(), concluirDemanda(), 13 campos op, Secao 10 validar-funcional.js (14 asserts, 93 total) — Concluida |
| Fase 5C.1 | v1.4.1 | Agente Curador de Demandas e Projetos — 3 novos docs (AGENTE_CURADOR, MODELO_ENTRADA, PROTOCOLO_ATUALIZACAO); AGENTS.md secao 13 — Concluida |

---

## Fase em Execucao

Fase 5C.1 concluida em 2026-06-16. Agente COI-CURADOR-DEMANDAS-PROJETOS estruturado: 3 novos documentos criados (AGENTE_CURADOR, MODELO_ENTRADA, PROTOCOLO_ATUALIZACAO); AGENTS.md atualizado com secao 13.
Aguardando commit e aprovacao do Anderson para fechar 5C.1.
Proxima fase: Fase 5B.4 ou uso do agente curador para atualizar COI-009 (exemplo obrigatorio da fase).

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

Fase 5C.1 concluida em 2026-06-16.
3 novos documentos criados: docs/AGENTE_CURADOR_DEMANDAS_PROJETOS.md, docs/MODELO_ENTRADA_DEMANDAS_PROJETOS.md, docs/PROTOCOLO_ATUALIZACAO_DADOS_OPERACIONAIS.md.
AGENTS.md: secao 13 adicionada com papel, modos e limites do COI-CURADOR.
Validador: 93 PASS, 0 FAIL (sem alteracao em scripts/validar-funcional.js).
Aguardando commit e aprovacao do Anderson.
Proxima acao sugerida: usar COI-CURADOR para aplicar exemplo obrigatorio (atualizar COI-009 — chamado 518190, licenca AIOps concluida) ou iniciar Fase 5B.4.

---

## Arquivos Criticos e Estado

| Arquivo | Estado |
|---|---|
| `dados/projetos.js` | meta.versao "1.4.1"; 13 registros (COI-001 a COI-013); novos tipoItem: Demanda, Incidente, Licenca/Contrato, Atividade Operacional, Entrega Contratual |
| `index.html` | v1.4.1; seletor de competencia; fallback robusto; clearEl; filtro P0 ativo |
| `assets/style.css` | v1.4.1; namespace .em-*; .em-select com variaveis corretas |
| `portfolio.html` | Fase 5B.2.1 — CORRIGIDO (truncamento): fechamento JS/HTML restaurado, null-check selProj, nav filtrada. Contem tambem: resumo executivo, 4 filtros, tabela 11 colunas, getItensOperacionais(), renderResumoExecutivo() |
| `index.html` | Fase 5B.1 — psProj/ps separados; cards projetos usam psProj; nDemandas conta todos os nao-Projeto nao-Concluidos |
| `assets/style.css` | Fase 5B.1 — badges tipoItem: .badge-tipo-demanda, -incidente, -melhoria, -licen-a-contrato, -atividade-operacional, -entrega-contratual |
| `projetos/ficha.html` | Fase 5B.3 — eOperacional(), renderFichaOperacional(), concluirDemanda(), salvarEdicaoOp(); formulario condicional para itens operacionais; secao-projeto preservada para COI-001 a COI-008 |
| `scripts/validar-funcional.js` | Fase 5B.3 — 93 asserts (Secao 10: 14 novos asserts ficha operacional), 10 secoes, exit 0/1 |
| `.claude/skills/COI-MESTRE.md` | Atualizado (Fase 5T.3) — orquestrador de 11 skills |
| `.claude/skills/COI-FORENSE.md` | NOVO (Fase 5T.3) — analise forense pre-execucao |
| `.claude/skills/COI-LEARNINGS.md` | NOVO (Fase 5T.3) — prevencao de erros por aprendizado |
| `.claude/skills/COI-TESTES.md` | NOVO (Fase 5T.3) — suite de testes T1-T6 pre-QA |
| `.claude/skills/COI-AUDITOR.md` | NOVO (Fase 5T.3) — auditoria de protocolo e escopo |
| `docs/BASE_DE_CONHECIMENTO_EVOLUTIVA.md` | NOVO (Fase 5T.3) — padroes aprovados e anti-padroes |
| `docs/DECISOES_ARQUITETURAIS_COI.md` | NOVO (F