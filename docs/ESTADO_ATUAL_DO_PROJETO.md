# ESTADO ATUAL DO PROJETO — Painel Mestre COI

Centro de Operacoes Integradas · Governo do Distrito Federal

> Este documento registra o estado pontual do projeto em determinado momento.
> Sem regras, sem fluxos, sem historico detalhado — apenas o que e preciso saber antes de comecar.
> Atualizar obrigatoriamente ao fechar cada fase.

---

Atualizado em: 2026-06-15 · Responsavel pela atualizacao: Fase 5T.4 — Enforcement operacional do COI-MESTRE

---

## Versao e Branch

| Campo | Valor |
|---|---|
| Versao atual | v1.4.1 |
| Branch principal | main |
| Ultima tag estavel | v1.4.1-refinamentos-funcionais |
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

---

## Fase em Execucao

Nenhuma fase em execucao no momento. Proxima: Fase 5B — Evolucao das Fichas dos Projetos. (Fase 5T.4 concluida em 2026-06-15 — aguardando commit do Anderson)

---

## Fases Planejadas

| Fase | Versao | Escopo |
|---|---|---|
| Fase 5B | v1.5 | Evolucao das Fichas dos Projetos |
| Fase 4B | v1.5 | Edicao de fichas e exportacao de dados |
| Fase 4C | v1.6 | Edicao orientada pelo GitHub e governanca de dados |

---

## Proxima Acao Prevista

Fase 5T.4 concluida (2026-06-15). COI-MESTRE declarado como unica porta de entrada obrigatoria.
Aguardando commit e aprovacao do Anderson para fechar a fase.
Proxima fase: Fase 5B — Evolucao das Fichas dos Projetos.

---

## Arquivos Criticos e Estado

| Arquivo | Estado |
|---|---|
| `dados/projetos.js` | meta.versao "1.4.1"; execucoesMensais[] com Maio/2026 (dados reais) e Junho/2026 |
| `index.html` | v1.4.1; seletor de competencia; fallback robusto; clearEl; filtro P0 ativo |
| `assets/style.css` | v1.4.1; namespace .em-*; .em-select com variaveis corretas |
| `portfolio.html` | clearEl; filtro frente dinamico; footer v1.4.1 |
| `projetos/ficha.html` | clearEl; salvarEdicao permite limpar campos; footer v1.4.1 |
| `scripts/validar-funcional.js` | Fase 5T.1 — validador Node.js multiplataforma, 40 asserts, exit 0/1 |
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

## Recomendacoes Tecnicas Pendentes (nao criticas)

| Item | Descricao | Fase sugerida |
|---|---|---|
| .gitattributes | Normalizar CRLF/LF para eliminar ruido no git diff --check | Fase tecnica futura (apos 5B) |

---

## Convencao de Atualizacao

- Quem fecha a fase atualiza este arquivo antes do commit de documentacao.
- Campos obrigatorios a atualizar: ultima tag estavel, tabela de fases concluidas, proxima acao prevista, estado dos arquivos criticos se houver mudanca.
- Nao registrar regras, fluxos ou historico detalhado aqui — esses conteudos pertencem a MEMORIA_OPERACIONAL_PROJETO.md, CHANGELOG.md e ROADMAP_COI.md.

---

*Ultima atualizacao: 2026-06-15 - Fase 5T.4 - COI-MESTRE como porta de entrada obrigatoria; enforcement operacional em 4 documentos*
