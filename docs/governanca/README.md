# Governança do Painel Mestre COI

**Comunicação Omnichannel Inteligente · Central IT**  
**Pasta:** `docs/governanca/`  
**Versão:** 1.1 · Atualizado em: 2026-07-14

---

## Missão

> Garantir que o Painel Mestre COI evolua com qualidade, rastreabilidade e segurança —  
> eliminando retrabalho, prevenindo erros e mantendo a governança operacional alinhada  
> entre Anderson, Claude e ChatGPT.

---

## Princípios

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRINCÍPIOS DO PROJETO                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. VERDADE VERIFICÁVEL                                         │
│     Nenhuma informação é criada sem evidência no repositório.   │
│                                                                 │
│  2. ESCOPO DECLARADO                                            │
│     Toda fase declara o que será e o que NÃO será alterado.    │
│                                                                 │
│  3. AUTONOMIA COM LIMITE                                        │
│     Claude executa livremente dentro do escopo autorizado.      │
│     Decisões irreversíveis requerem Anderson.                   │
│                                                                 │
│  4. VALIDAÇÃO EM CAMADAS                                        │
│     Anderson aprova → Claude executa → ChatGPT valida.         │
│                                                                 │
│  5. ZERO ERRO CONHECIDO                                         │
│     Nenhuma fase é entregue com falha conhecida. Autocorrigir. │
│                                                                 │
│  6. RASTREABILIDADE TOTAL                                       │
│     Todo dado alterado tem origem declarada e evidência.        │
│                                                                 │
│  7. PAINEL ESTÁTICO                                             │
│     Sem servidor. Sem banco. Sem API pública. Sempre offline.   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Arquitetura Resumida

```
  USUÁRIO
    │
    ▼
┌──────────────────────────────────────────────┐
│           PAINEL MESTRE COI                  │
│  index.html  ·  portfolio.html  ·  ficha.html│
└────────────────────┬─────────────────────────┘
                     │ lê
                     ▼
           dados/projetos.js
           (COI_DATA — fonte única)
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       meta{}   projetos[]   execucoesMensais[]

  COI INTELLIGENCE ENGINE
  ├── coi-curador-inteligente.js  (score 0-100, 12 regras)
  ├── coi-auditor-inteligente.js  (auditoria automática)
  ├── config/regras-curador.js    (12 regras centralizadas)
  └── validar-funcional.js        (294 PASS / 13 seções)

  COI OS
  ├── .claude/skills/   (11 skills — COI-MESTRE é a entrada)
  ├── registry/         (9 JSONs de estado e configuração)
  └── commands/         (CCL — 12 verbos, 3 modos)
```

---

## Fluxo de Operação

```
  DEMANDA DO ANDERSON
        │
        ▼
  COI-MESTRE (porta de entrada obrigatória)
        │
        ├─► COI-MEMORIA    (estado atual)
        ├─► COI-FORENSE    (evidências reais)
        ├─► COI-ARQUITETO  (plano de execução)
        ├─► COI-LEARNINGS  (prevenção de erros)
        ├─► COI-EXECUTOR   (implementação)
        ├─► COI-TESTES     (validação T1–T6)
        ├─► COI-AUDITOR    (auditoria de escopo)
        ├─► COI-QA         (qualidade final)
        ├─► COI-GOVERNANCA (docs de estado)
        └─► COI-RELEASE-MANAGER (pacote 9 itens)
                │
                ▼
        ANDERSON revisa
                │
                ▼
        CHATGPT valida criticamente
                │
                ▼
        PRODUÇÃO (GitHub Pages)
```

---

## Roadmap Visual

```
  v1.0──v1.3   v1.4    v1.4.1   v1.5.0   v1.6─v1.7   v1.7.1─v1.9.0
  ─────────────────────────────────────────────────────────────────►
  │           │        │        │         │            │
  Baseline    Exec.    Gov.     Model.    COI          COI OS
  Estabil.    Mensal   Agent.   Operac.   Intelligence Runtime
  Hash        Gestão   4D.1-5   Analista  Curador      Registry
  Routing     Execut.           COI-009   Auditor      CCL
  Polimento                               Engine       Session

  ──────────────────────────────────────────────────────── FUTURO ►
  │              │                  │
  Fase 6.4       Fase R1.2          Fase R5
  COI Daily      Simplif. Docs      Context Engine
  (Planejada)    (Planejada)        (Planejada)
```

---

## Índice de Leitura

Use este guia para saber **qual documento ler** em cada situação:

| Situação | Documento |
|---|---|
| Primeira vez no projeto / sessão nova | **README.md** (este arquivo) |
| Preciso entender o projeto completo | `COI_MASTER_CONTEXT.md` |
| Preciso saber o estado atual | `STATUS_DO_PROJETO.md` |
| Vou executar uma tarefa técnica com Claude | `CLAUDE_RULES.md` |
| Vou validar uma entrega com ChatGPT | `CHATGPT_RULES.md` |
| Preciso adicionar ou alterar dados | `GOVERNANCA_DADOS.md` |
| Preciso consultar uma decisão arquitetural | `docs/DECISOES_ARQUITETURAIS_COI.md` |
| Preciso ver histórico de versões | `CHANGELOG.md` |
| Preciso ver erros conhecidos e aprendizados | `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` |
| Vou iniciar uma nova sessão do Claude | `.claude/COI_SESSION_TEMPLATE.md` |
| Preciso do estado técnico pontual | `STATUS.md` + `registry/runtime.json` |

---

## Documentos desta Pasta

| Arquivo | Propósito | Atualizar quando |
|---|---|---|
| `README.md` | Portal de entrada — missão, princípios, índice | Ao criar novos docs ou mudar missão |
| `COI_MASTER_CONTEXT.md` | Contexto completo do projeto | Ao fechar cada sprint relevante |
| `CLAUDE_RULES.md` | Regras permanentes do Claude | Apenas por Anderson |
| `CHATGPT_RULES.md` | Papel e responsabilidades do ChatGPT | Apenas por Anderson |
| `STATUS_DO_PROJETO.md` | Acompanhamento executivo por sprint | Ao fechar cada fase |
| `GOVERNANCA_DADOS.md` | Modelo oficial de dados | Ao criar novos tipoItem ou DAR de dados |

---

## Regras de Ouro (resumo)

```
NUNCA inventar dados.          NUNCA alterar fora do escopo.
NUNCA commit sem Anderson.     NUNCA tocar branch protegida.
SEMPRE declarar origem.        SEMPRE validar antes de entregar.
SEMPRE informar arquivos.      SEMPRE autocorrigir falhas.
```

---

*Pasta criada em: 2026-07-14 — Fase 6 (Governança do Projeto)*  
*Revisado em: 2026-07-14 — Revisão de consistência*
