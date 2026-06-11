# ESTADO ATUAL DO PROJETO — Painel Mestre COI

Centro de Operacoes Integradas · Governo do Distrito Federal

> Este documento registra o estado pontual do projeto em determinado momento.
> Sem regras, sem fluxos, sem historico detalhado — apenas o que e preciso saber antes de comecar.
> Atualizar obrigatoriamente ao fechar cada fase.

---

Atualizado em: 2026-06-11 · Responsavel pela atualizacao: Fase 5A.1 — Preparacao da Evolucao Funcional

---

## Versao e Branch

| Campo | Valor |
|---|---|
| Versao atual | v1.4.1 |
| Branch principal | main |
| Ultima tag estavel | v1.4.1-rollback-seguro |
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

---

## Fases Planejadas

| Fase | Versao | Escopo |
|---|---|---|
| Fase 4B | v1.5 | Edicao de fichas e exportacao de dados |
| Fase 4C | v1.6 | Edicao orientada pelo GitHub e governanca de dados |

---

## Proxima Acao Prevista

Fase 5A.1 — Concluida (branch: fase-5a-1-preparacao-evolucao-funcional).
Proxima fase planejada: Fase 5A.2 — Evolucao Funcional do Painel (escopo a definir com Anderson).

---

## Arquivos Criticos e Estado

| Arquivo | Estado |
|---|---|
| `dados/projetos.js` | meta.versao "1.4.1" (corrigido na Fase 5A.1); execucoesMensais[] com Maio/2026 (dados reais) e Junho/2026 (estrutura pronta) |
| `index.html` | Seletor de competencia funcional; fallback robusto em cadeia |
| `assets/style.css` | Namespace .em-* completo (72 linhas, sem colisao) |
| `scripts/status-seguro.ps1` | Validacao de branch e status — ASCII puro |
| `scripts/validar-docs.ps1` | Validacao de documentacao — ASCII puro |
| `scripts/validar-dados.ps1` | Validacao de dados/projetos.js — ASCII puro |
| `scripts/validar-projeto.ps1` | Validacao geral pre-commit — ASCII puro |
| `docs/ESTADO_ATUAL_DO_PROJETO.md` | Este arquivo — estado pontual do projeto |
| `docs/MEMORIA_OPERACIONAL_PROJETO.md` | Regras, scripts, estrutura de arquivos — documento estrutural |
| `AGENTS.md` | Regras e papeis dos agentes — atualizado ate Fase 4D.5 (leitura obrigatoria: rollback e contingencia) |
| `docs/PLANO_ROLLBACK_SEGURO.md` | Novo — procedimentos de rollback por tipo; checklists antes/depois; comandos seguros e criticos |
| `docs/MATRIZ_CONTINGENCIA.md` | Novo — 13 tipos de incidente com severidade, acao, evidencia e fluxo de aprovacao |

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

---

## Convencao de Atualizacao

- Quem fecha a fase atualiza este arquivo antes do commit de documentacao.
- Campos obrigatorios a atualizar: ultima tag estavel, tabela de fases concluidas, proxima acao prevista, estado dos arquivos criticos se houver mudanca.
- Nao registrar regras, fluxos ou historico detalhado aqui — esses conteudos pertencem a MEMORIA_OPERACIONAL_PROJETO.md, CHANGELOG.md e ROADMAP_COI.md.

---

*Ultima atualizacao: 2026-06-11 - Fase 5A.1 - Preparacao da Evolucao Funcional*
