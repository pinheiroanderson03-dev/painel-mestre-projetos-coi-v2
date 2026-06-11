# ESTADO ATUAL DO PROJETO — Painel Mestre COI

Centro de Operacoes Integradas · Governo do Distrito Federal

> Este documento registra o estado pontual do projeto em determinado momento.
> Sem regras, sem fluxos, sem historico detalhado — apenas o que e preciso saber antes de comecar.
> Atualizar obrigatoriamente ao fechar cada fase.

---

Atualizado em: 2026-06-11 · Responsavel pela atualizacao: Fase 4D.4.1 — Consolidacao da Memoria

---

## Versao e Branch

| Campo | Valor |
|---|---|
| Versao atual | v1.4.1 |
| Branch principal | main |
| Ultima tag estavel | v1.4.1-base-interacao-chatgpt |
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

---

## Fases Planejadas

| Fase | Versao | Escopo |
|---|---|---|
| Fase 4B | v1.5 | Edicao de fichas e exportacao de dados |
| Fase 4C | v1.6 | Edicao orientada pelo GitHub e governanca de dados |

---

## Proxima Acao Prevista

Fase 4B — Edicao de Fichas e Exportacao de Dados (planejada).
Aguardando autorizacao e definicao de escopo pelo Anderson.

---

## Arquivos Criticos e Estado

| Arquivo | Estado |
|---|---|
| `dados/projetos.js` | meta.versao "1.4"; execucoesMensais[] com Maio/2026 (dados reais) e Junho/2026 (estrutura pronta) |
| `index.html` | Seletor de competencia funcional; fallback robusto em cadeia |
| `assets/style.css` | Namespace .em-* completo (72 linhas, sem colisao) |
| `scripts/status-seguro.ps1` | Validacao de branch e status — ASCII puro |
| `scripts/validar-docs.ps1` | Validacao de documentacao — ASCII puro |
| `scripts/validar-dados.ps1` | Validacao de dados/projetos.js — ASCII puro |
| `scripts/validar-projeto.ps1` | Validacao geral pre-commit — ASCII puro |
| `docs/ESTADO_ATUAL_DO_PROJETO.md` | Este arquivo — estado pontual do projeto |
| `docs/MEMORIA_OPERACIONAL_PROJETO.md` | Regras, scripts, estrutura de arquivos — documento estrutural |
| `AGENTS.md` | Regras e papeis dos agentes — atualizado ate Fase 4D.4.1 |

---

## Tags Estaveis Registradas

| Tag | Fase | Descricao |
|---|---|---|
| v1.4.1-historico-mensal | 4A.1 | Historico mensal com seletor de competencia |
| v1.4.1-governanca-agentes | 4D.1 | Governanca operacional dos agentes |
| v1.4.1-scripts-validacao | 4D.2 | Scripts de validacao PowerShell |
| v1.4.1-base-interacao-chatgpt | 4D.4 | Base de interacao assistida no ChatGPT |

---

## Convencao de Atualizacao

- Quem fecha a fase atualiza este arquivo antes do commit de documentacao.
- Campos obrigatorios a atualizar: ultima tag estavel, tabela de fases concluidas, proxima acao prevista, estado dos arquivos criticos se houver mudanca.
- Nao registrar regras, fluxos ou historico detalhado aqui — esses conteudos pertencem a MEMORIA_OPERACIONAL_PROJETO.md, CHANGELOG.md e ROADMAP_COI.md.

---

*Ultima atualizacao: 2026-06-11 - Fase 4D.4.1 - Consolidacao da Memoria Operacional*
