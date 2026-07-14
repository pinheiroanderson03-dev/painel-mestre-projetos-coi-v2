# COI_MASTER_CONTEXT — Contexto Mestre do Projeto

**Projeto:** Painel Mestre COI  
**Organização:** Comunicação Omnichannel Inteligente · Central IT  
**Cliente:** GDF — Governo do Distrito Federal  
**Versão:** 1.1  
**Criado em:** Fase 6 (Governança) · **Revisado em:** 2026-07-14  
**Atualizar em:** ao fechar cada sprint ou fase relevante

---

## Sumário

| Seção | Título |
|---|---|
| 0 | [Missão e Princípios](#0-missão-e-princípios) |
| 1 | [Objetivo do Painel Mestre](#1-objetivo-do-painel-mestre) |
| 2 | [Visão do Produto](#2-visão-do-produto) |
| 3 | [Arquitetura Geral](#3-arquitetura-geral) |
| 4 | [Estrutura do Projeto](#4-estrutura-do-projeto) |
| 5 | [Fluxo Operacional: Anderson → Claude → ChatGPT](#5-fluxo-operacional-anderson--claude--chatgpt) |
| 6 | [Fluxo Git](#6-fluxo-git) |
| 7 | [Estrutura dos Dados](#7-estrutura-dos-dados-dadosprojetosjs) |
| 8 | [Convenções do Projeto](#8-convenções-do-projeto) |
| 9 | [Roadmap Visual](#9-roadmap-visual) |
| 10 | [Estado Atual do Projeto](#10-estado-atual-do-projeto) |

---

## 0. Missão e Princípios

### Missão

> Ser a ferramenta central de visibilidade operacional da Central IT —  
> entregando rastreabilidade, transparência e agilidade decisória para o GDF,  
> com qualidade verificável e governança contínua.

### Princípios Norteadores

| # | Princípio | Descrição |
|---|---|---|
| P1 | **Verdade Verificável** | Nenhuma informação é criada sem evidência no repositório |
| P2 | **Escopo Declarado** | Toda fase declara o que será e o que NÃO será alterado |
| P3 | **Autonomia com Limite** | Claude executa livremente; decisões irreversíveis requerem Anderson |
| P4 | **Validação em Camadas** | Anderson aprova → Claude executa → ChatGPT valida |
| P5 | **Zero Erro Conhecido** | Nenhuma fase é entregue com falha conhecida — autocorrigir |
| P6 | **Rastreabilidade Total** | Todo dado alterado tem origem declarada e evidência |
| P7 | **Painel Estático** | Sem servidor, sem banco, sem API pública — sempre offline-first |

---

## 1. Objetivo do Painel Mestre

O Painel Mestre COI é a ferramenta central de gestão visual dos projetos, demandas, incidentes e atividades operacionais da Central IT. Seu propósito é fornecer:

- Rastreabilidade de projetos estratégicos e demandas operacionais
- Transparência executiva para diretoria e stakeholders
- Agilidade na tomada de decisão via indicadores visuais
- Histórico consolidado por competência mensal

O painel opera 100% em modo estático — sem servidor, sem banco de dados — compatível com ambientes restritos de rede. A publicação é feita via GitHub Pages.

---

## 2. Visão do Produto

| Dimensão | Descrição |
|---|---|
| Usuário principal | Anderson Pinheiro — PMO Digital / Central IT |
| Consumidores | Diretoria COI, equipes técnicas, auditores |
| Canal de publicação | GitHub Pages (branch main) |
| Ambiente | 100% estático; sem backend; sem API pública |
| Dados | Editados manualmente em `dados/projetos.js` |
| Versionamento | Git + tags semânticas (ex.: v1.9.0) |

---

## 3. Arquitetura Geral

### Visão em Camadas

```
╔═════════════════════════════════════════════════════════╗
║                   CAMADA DE APRESENTAÇÃO                ║
║                                                         ║
║   index.html          → Dashboard Executivo             ║
║   portfolio.html      → Portfólio de Projetos           ║
║   projetos/ficha.html → Ficha Universal (hash routing)  ║
║                                                         ║
║              ↓ lê exclusivamente via COI_DATA           ║
╠═════════════════════════════════════════════════════════╣
║                    CAMADA DE DADOS                      ║
║                                                         ║
║   dados/projetos.js                                     ║
║   ├── COI_DATA.meta          → versão, ciclo, histórico ║
║   └── COI_DATA.projetos[]    → 13 itens (COI-001–013)  ║
║                                                         ║
║              ↓ estilizado por                           ║
║   assets/style.css    → CSS global (namespaces: em/fp)  ║
║   assets/js/chart.umd.min.js → Chart.js 4.4.1 local    ║
╠═════════════════════════════════════════════════════════╣
║               CAMADA DE INTELIGÊNCIA                    ║
║                                                         ║
║   COI Intelligence Engine                               ║
║   ├── coi-curador-inteligente.js → score 0-100, 12 reg ║
║   ├── coi-auditor-inteligente.js → auditoria automática ║
║   ├── config/regras-curador.js   → 12 regras externas   ║
║   └── validar-funcional.js       → 294 PASS / 13 seções ║
╠═════════════════════════════════════════════════════════╣
║               CAMADA OPERACIONAL (COI OS)               ║
║                                                         ║
║   .claude/RUNTIME.md  → Runtime v1.7.1                  ║
║   .claude/skills/     → 11 skills (COI-MESTRE é a porta)║
║   registry/           → 9 JSONs de estado e configuração║
║   commands/           → CCL v1.0 — 12 verbos, 3 modos  ║
╚═════════════════════════════════════════════════════════╝
```

### Fluxo de Dados Simplificado

```
  ANDERSON edita
       │
       ▼
  dados/projetos.js ──► index.html (Dashboard)
       │           └──► portfolio.html (Portfólio)
       │           └──► ficha.html (Ficha #COI-XXX)
       │
       ▼
  Intelligence Engine analisa
  └── score / auditoria / alertas (Node.js, pré-publicação)
```

**Decisões arquiteturais ativas:** DAR-001 a DAR-011 — ver `docs/DECISOES_ARQUITETURAIS_COI.md`

---

## 4. Estrutura do Projeto

```
COI - Painel Mestre de Acompanhamento de Projetos/
│
├── index.html                   # Dashboard Executivo
├── portfolio.html               # Portfólio de Projetos
├── CLAUDE.md                    # Instruções do Claude (entrada obrigatória)
├── AGENTS.md                    # Papéis e responsabilidades
├── CHANGELOG.md                 # Histórico de versões
├── RELEASE_NOTES.md             # Notas de entrega
├── ROADMAP_COI.md               # Roadmap geral
├── STATUS.md                    # Estado pontual atual
├── INDEX.md                     # Índice de documentos
│
├── dados/
│   └── projetos.js              # ÚNICA FONTE DE VERDADE
│
├── assets/
│   ├── style.css                # Estilos globais
│   └── js/chart.umd.min.js     # Chart.js local (PROIBIDO editar)
│
├── projetos/
│   ├── ficha.html               # Ficha universal (hash routing)
│   ├── ficha_COI001.html        # Redirect → ficha.html#COI-001
│   ├── ficha_COI002.html        # Redirect → ficha.html#COI-002
│   └── ...ficha_COI008.html     # (8 redirects — COI-001 a COI-008)
│
├── scripts/
│   ├── validar-funcional.js     # Suite de 294 testes
│   ├── validar-projeto.ps1      # Validação PS1 principal
│   ├── validar-dados.ps1        # Validação de dados
│   ├── validar-docs.ps1         # Validação de docs
│   ├── coi-curador-inteligente.js
│   └── coi-auditor-inteligente.js
│
├── config/
│   └── regras-curador.js        # 12 regras de validação
│
├── registry/                    # COI OS Registry (9 JSONs)
│   ├── runtime.json
│   ├── agents.json
│   ├── commands.json
│   ├── phases.json
│   ├── rules.json
│   ├── tests.json
│   ├── dependencies.json
│   ├── documents.json
│   └── modules.json
│
├── commands/                    # COI Command Language (CCL)
│   ├── grammar.md
│   ├── parser.md
│   ├── commands.json
│   ├── aliases.json
│   └── examples.md
│
├── .claude/
│   ├── RUNTIME.md               # COI Runtime v1.7.1
│   ├── COI_SESSION_TEMPLATE.md  # Template de sessão
│   └── skills/                  # 11 skills operacionais
│       ├── COI-MESTRE.md
│       ├── COI-MEMORIA.md
│       ├── COI-FORENSE.md
│       ├── COI-ARQUITETO.md
│       ├── COI-LEARNINGS.md
│       ├── COI-EXECUTOR.md
│       ├── COI-TESTES.md
│       ├── COI-AUDITOR.md
│       ├── COI-QA.md
│       ├── COI-GOVERNANCA.md
│       └── COI-RELEASE-MANAGER.md
│
└── docs/
    ├── governanca/              # PASTA DESTA FASE
    │   ├── COI_MASTER_CONTEXT.md
    │   ├── CLAUDE_RULES.md
    │   ├── CHATGPT_RULES.md
    │   ├── STATUS_DO_PROJETO.md
    │   └── GOVERNANCA_DADOS.md
    └── [30+ documentos operacionais]
```

---

## 5. Fluxo Operacional: Anderson → Claude → ChatGPT

```
╔══════════════════════════════════════════════════════════╗
║  ANDERSON (aprovação)                                    ║
║  · Define escopo e autoriza alterações                   ║
║  · Aprova commits, push, merge, tags                     ║
║  · Valida entregas finais                                ║
╚══════════════════════╦═══════════════════════════════════╝
                       │ autoriza
                       ▼
╔══════════════════════════════════════════════════════════╗
║  CLAUDE (execução autônoma dentro do escopo)             ║
║                                                          ║
║  COI-MESTRE ──► COI-MEMORIA ──► COI-FORENSE             ║
║       │                                                  ║
║       ├──► COI-LEARNINGS ──► COI-ARQUITETO               ║
║       │                                                  ║
║       ├──► COI-EXECUTOR (implementa)                     ║
║       │         │  se FAIL ◄─────────────────┐           ║
║       ├──► COI-TESTES ────────────────────────┘          ║
║       ├──► COI-AUDITOR                                   ║
║       ├──► COI-QA                                        ║
║       ├──► COI-GOVERNANCA (atualiza docs)                ║
║       └──► COI-RELEASE-MANAGER (pacote 9 itens)         ║
╚══════════════════════╦═══════════════════════════════════╝
                       │ entrega pacote
                       ▼
╔══════════════════════════════════════════════════════════╗
║  CHATGPT (validação crítica — pré-publicação)            ║
║  · Audita escopo vs. entregáveis                         ║
║  · Revisa decisões arquiteturais                         ║
║  · Emite: ✅ APROVADO / ⚠️ RESSALVAS / ❌ REPROVADO     ║
╚══════════════════════╦═══════════════════════════════════╝
                       │ parecer aprovado
                       ▼
              PRODUÇÃO (GitHub Pages)
```

**Regra fundamental:** Claude executa de forma autônoma dentro do escopo. Commit, push, merge e tag sempre aguardam Anderson.

---

## 6. Fluxo Git

```
Branches ativas:
  main                              ← branch principal de publicação
  fase-*                            ← branches de desenvolvimento

Branch protegida (NUNCA TOCAR):
  publicacao-demandas-central-df    ← painel v1 em produção para GDF

Fluxo padrão:
  1. Claude executa na branch de trabalho atual
  2. Claude prepara o pacote de entrega (nunca executa commit)
  3. Anderson revisa e executa: git add → git commit → git push
  4. ChatGPT valida antes do merge para main
  5. Anderson executa merge e tag semântica

Comandos autônomos (Claude pode executar):
  git status / git diff / git branch / git log --oneline -5

Comandos críticos (requerem autorização do Anderson):
  git add · git commit · git push · git merge · git tag
  git reset · git restore · git clean · git switch main
```

---

## 7. Estrutura dos Dados (`dados/projetos.js`)

O arquivo exporta o objeto global `COI_DATA` com duas seções principais:

### `COI_DATA.meta`

```javascript
meta: {
  versao: "1.5.0",
  ciclo: "Julho 2026",
  atualizadoEm: "2026-07-13",
  execucaoMensal: { /* competência ativa */ },
  execucoesMensais: [ /* histórico mensal */ ]
}
```

### `COI_DATA.projetos[]`

Cada item do array representa um projeto, demanda, incidente ou atividade operacional, diferenciados pelo campo `tipoItem` (DAR-011):

```javascript
{
  id: "COI-001",
  tipoItem: "Projeto",        // Projeto | Demanda | Incidente | Melhoria |
                               // Licença/Contrato | Atividade Operacional |
                               // Entrega Contratual
  nome: "...",
  status: "Em andamento",
  percentual: 65,
  semaforo: "🟡",
  prioridade: "P1",
  // ... 30+ campos adicionais
}
```

**Campos críticos:** `tipoItem`, `status`, `percentual`, `semaforo`, `prioridade`, `observacoesExecutivas`, `historicoOperacional[]`

---

## 8. Convenções do Projeto

| Convenção | Regra |
|---|---|
| Dados | Editar apenas `dados/projetos.js`; nunca hardcoded nos HTMLs |
| DOM | Usar `clearEl()` em vez de `innerHTML = ''` (DAR-004) |
| CSS | Namespace por seção: `.em-*`, `.fp-*`, `.op-*` |
| Chart.js | Usar arquivo local; CDN apenas como fallback (DAR-003) |
| Scripts .ps1 | Somente ASCII puro (código ≤ 127) — sem acentos (DAR-006) |
| Escrita de .js | Usar Python3 com `encoding='utf-8', newline='\n'` (E-007) |
| Validação | Executar `node scripts/validar-funcional.js` antes de entregar |
| Prioridade | P0 Crítica / P1 Alta / P2 Média / P3 Baixa |
| Status | Planejamento / Em andamento / Homologação / Produção / Concluído / Suspenso |

---

## 9. Roadmap Visual

```
CONCLUÍDO ──────────────────────────────────────────────────► FUTURO

v1.0  v1.1  v1.2  v1.3   v1.4   v1.4.1  v1.5  v1.6  v1.7  v1.7.1─v1.9
 │     │     │     │       │       │       │     │     │        │
Base  Est.  Hash  Pol.   Exec.   Gov.    Mod.  Cur.  Aud.    COI OS
line  bil.  Rout  imen   Men.    Ag.     Op.   Int.  Int.   Runtime
      FUDT  ing   to     Gest.   4D.*    AURA  Eng.  Eng.   Registry
                         Exec.           COI9        CCL
                                         013         Session

                                                          ▼ HOJE: v1.9.0

Fase 6.4         Fase R1.2        Fase R5
COI Daily   ──►  Simplif.   ──►  Context
(relatório        Docs            Engine
diário)           Legados
[Planejada]      [Planejada]     [Planejada]
```

| Versão | Conteúdo | Status |
|---|---|---|
| v1.0–v1.3 | Baseline · Estabilização · Hash Routing · Polimento | ✅ |
| v1.4 | Execução Mensal e Gestão Executiva | ✅ |
| v1.4.1 | Governança Operacional (Fases 4D.1–4D.5) | ✅ |
| v1.5.0 | Modelagem Operacional · COI-009 · COI Analista | ✅ |
| v1.6.0–v1.7.0 | COI Curador + Auditor Inteligentes | ✅ |
| v1.7.1–v1.9.0 | COI OS — Runtime · Registry · CCL · Session Template | ✅ |
| — | **Fase 6.4** — COI Daily (relatório diário automatizado) | 🔵 Planejada |
| — | **Fase R1.2** — Simplificação de docs legados | 🔵 Planejada |
| — | **Fase R5** — Context Engine | 🔵 Planejada |

---

## 10. Estado Atual do Projeto

| Campo | Valor |
|---|---|
| Versão do sistema | v1.9.0 |
| Versão dos dados | v1.5.0 (dados/projetos.js) |
| Branch de trabalho | fase-5c-2-atualizacao-coi-009-aiops |
| Último commit | 3a71c5e |
| Suite de testes | 294 PASS / 0 FAIL / 13 seções |
| Projetos no painel | 13 registros (COI-001 a COI-013) |
| Fase concluída | Fase 6.3 (COI Auditor Inteligente) + COI OS R1.1–R4 + Fase 5 (Governança Executiva) |
| Pendência crítica | Commit acumulado aguardando autorização do Anderson |
| Próxima fase | Fase 6.4 — COI Daily |

---

*Última atualização: 2026-07-14 — Fase 6 (Governança do Projeto)*  
*Índice da pasta: [docs/governanca/README.md](README.md)*
