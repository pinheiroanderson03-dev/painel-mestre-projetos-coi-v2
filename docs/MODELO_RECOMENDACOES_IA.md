# MODELO DE RECOMENDACOES IA — COI Intelligence Engine

**Projeto:** Painel Mestre COI — Comunicacao Omnichannel Inteligente · Central IT
**Fase de criacao:** 6.1 — COI Analista
**Revisao final:** 6.1-RF — COI Intelligence Engine
**Criado em:** 2026-06-26
**Tipo:** Modelo padrao de saida do COI Intelligence Engine

---

## Objetivo

Definir o formato obrigatorio e padronizado para todas as recomendacoes produzidas pelo **COI Intelligence Engine**, garantindo rastreabilidade, consistencia e acionabilidade.

Toda recomendacao gerada pelo COI Analista — modulo ativo do Engine na Fase 6.1 — deve seguir este modelo. Nenhuma recomendacao pode ser entregue fora deste formato. O modelo e unico e compartilhado por todos os modulos do Engine (COI Analista, COI Daily, COI Weekly, COI Monthly).

---

## Estrutura da Recomendacao

Cada recomendacao e composta por 8 campos obrigatorios:

| Campo | Descricao | Obrigatorio |
|---|---|---|
| `tipo` | Classificacao da recomendacao (ver tabela de tipos) | Sim |
| `item_relacionado` | ID e nome do item em dados/projetos.js | Sim |
| `prioridade` | P0, P1, P2 ou P3 (alinhado com classificacao COI) | Sim |
| `motivo` | Descricao objetiva de por que esta recomendacao foi gerada | Sim |
| `evidencia` | Campo especifico de dados/projetos.js que embasou a recomendacao | Sim |
| `acao_sugerida` | O que deve ser feito; acionavel e especifico | Sim |
| `impacto_esperado` | O que melhora ou se evita com a acao | Sim |
| `status_recomendacao` | Estado atual da recomendacao (ver tabela de status) | Sim |

---

## Tipos de Recomendacao

| Tipo | Descricao | Urgencia tipica |
|---|---|---|
| `RISCO` | Risco critico identificado que requer atencao imediata | Alta (P0/P1) |
| `ACAO` | Proxima acao necessaria para avancar um projeto ou resolver uma demanda | Media (P1/P2) |
| `PRIORIZACAO` | Sugestao de reordenacao de prioridades com base no estado atual | Media (P1/P2) |
| `INCONSISTENCIA` | Dado conflitante, ausente ou incompativel identificado | Variavel |
| `PENDENCIA` | Item sem responsavel, prazo, evidencia ou dado obrigatorio | Media (P1/P2) |
| `ALERTA` | Condicao que pode evoluir para risco se nao tratada | Media (P2) |
| `OPORTUNIDADE` | Melhoria identificada que nao e urgente mas gera valor | Baixa (P2/P3) |

---

## Status da Recomendacao

| Status | Descricao |
|---|---|
| `ABERTA` | Recomendacao gerada; aguardando avaliacao do Anderson |
| `EM_ANALISE` | Anderson revisando; decisao pendente |
| `APROVADA` | Anderson aprovou; aguardando execucao |
| `EXECUTADA` | Acao tomada; aguardando verificacao |
| `CONCLUIDA` | Acao executada e verificada; recomendacao encerrada |
| `DESCARTADA` | Anderson optou por nao agir; registrar motivo |

---

## Formato de Apresentacao (Texto)

```
[RECOMENDACAO #NNN]
Tipo:              <tipo>
Item Relacionado:  <COI-XXX — Nome do Item>
Prioridade:        <P0 / P1 / P2 / P3>
Motivo:            <descricao objetiva de por que esta recomendacao foi gerada>
Evidencia:         <campo: valor extraido de dados/projetos.js>
Acao Sugerida:     <o que fazer; acionavel e especifico>
Impacto Esperado:  <o que melhora ou se evita>
Status:            <ABERTA / EM_ANALISE / APROVADA / EXECUTADA / CONCLUIDA / DESCARTADA>
```

---

## Exemplos de Recomendacao

### Exemplo 1 — Tipo RISCO

```
[RECOMENDACAO #001]
Tipo:              RISCO
Item Relacionado:  COI-004 — IA para Telefonia
Prioridade:        P0
Motivo:            Projeto com semaforo vermelho (🔴) e prioridade P0 sem registro de
                   mitigacao nos riscosRegistrados.
Evidencia:         semaforo: "🔴"; prioridade: "P0"; riscosRegistrados: [] (vazio)
Acao Sugerida:     Registrar os riscos ativos do projeto COI-004 via COI-CURADOR,
                   incluindo probabilidade, impacto, nivel e plano de mitigacao para
                   cada risco identificado.
Impacto Esperado:  Rastreabilidade de riscos garantida; base para decisao executiva
                   sobre continuar, pausar ou escalonar o projeto.
Status:            ABERTA
```

### Exemplo 2 — Tipo INCONSISTENCIA

```
[RECOMENDACAO #002]
Tipo:              INCONSISTENCIA
Item Relacionado:  COI-009 — Monitoramento AIOps / Licenca Zabbix
Prioridade:        P1
Motivo:            Item com status "Concluido" e percentual 10%, o que e inconsistente.
                   Itens concluidos devem ter percentual = 100%.
Evidencia:         status: "Concluido"; percentual: 10
Acao Sugerida:     Verificar com Anderson o estado real do COI-009. Se concluido,
                   atualizar percentual para 100 via COI-CURADOR. Se nao concluido,
                   corrigir o status para "Em andamento".
Impacto Esperado:  Dados corretos no dashboard; indicadores operacionais precisos;
                   semaforo e cards do index.html refletindo a realidade.
Status:            ABERTA
```

### Exemplo 3 — Tipo PENDENCIA

```
[RECOMENDACAO #003]
Tipo:              PENDENCIA
Item Relacionado:  COI-008 — Integrações CITSmartX
Prioridade:        P2
Motivo:            Projeto em Planejamento com percentual 10% e sem objetivo
                   documentado. Campo obrigatorio para analise e comunicacao executiva.
Evidencia:         status: "Planejamento"; percentual: 10; objetivo: (ausente)
Acao Sugerida:     Alimentar o campo "objetivo" do COI-008 via COI-CURADOR descrevendo
                   o escopo tecnico e o resultado esperado das integracoes CITSmartX.
Impacto Esperado:  Ficha do projeto completa; COI Analista consegue gerar analise
                   completa do item; resumo executivo mais preciso.
Status:            ABERTA
```

### Exemplo 4 — Tipo ACAO

```
[RECOMENDACAO #004]
Tipo:              ACAO
Item Relacionado:  COI-006 — Portal do Cidadao
Prioridade:        P1
Motivo:            Projeto em Homologacao com 75% de avanco e semaforo amarelo (🟡).
                   Nao ha proximas acoes documentadas para conclusao da homologacao.
Evidencia:         status: "Homologacao"; percentual: 75; semaforo: "🟡";
                   proximasAcoes: [] (vazio)
Acao Sugerida:     Registrar as proximas acoes para fechamento da homologacao via
                   COI-CURADOR: responsavel, data prevista e criterio de aceite.
Impacto Esperado:  Clareza sobre o caminho critico para conclusao; reduz risco de
                   atraso; melhora visibilidade executiva.
Status:            ABERTA
```

---

## Regras de Preenchimento

1. **`evidencia`** deve sempre citar o campo exato e o valor atual em `dados/projetos.js`. Formato: `campo: "valor"` ou `campo: valor`.
2. **`acao_sugerida`** deve ser acionavel, especifica e direcionada a um responsavel (Anderson, COI-CURADOR, responsavel do projeto etc.).
3. **`motivo`** deve ser objetivo e baseado nos dados — sem suposicoes ou interpretacoes subjetivas.
4. **`prioridade`** deve ser coerente com o tipo da recomendacao e o risco associado.
5. Recomendacoes do tipo INCONSISTENCIA nao implicam acao automatica — exigem validacao humana antes de qualquer alteracao.
6. Recomendacoes nao alteram `dados/projetos.js`. Isso e responsabilidade do COI-CURADOR com aprovacao do Anderson.

---

## Volume de Recomendacoes por Analise

| Tipo de analise | Volume esperado |
|---|---|
| Analise individual de projeto | 1 a 5 recomendacoes |
| Analise de demandas operacionais | 1 a 8 recomendacoes |
| Analise completa de portfolio | 5 a 20 recomendacoes |
| Resumo executivo | Top 3 a Top 5 recomendacoes criticas |
| COI Daily | 1 a 5 alertas e acoes prioritarias |
| COI Weekly | 3 a 10 recomendacoes consolidadas |
| COI Monthly | Top 10 recomendacoes estrategicas |

Quando o volume for alto, ordenar por prioridade (P0 primeiro) e depois por tipo (RISCO > INCONSISTENCIA > PENDENCIA > ACAO > ALERTA > PRIORIZACAO > OPORTUNIDADE).

---

## Rastreabilidade

Cada recomendacao e identificada por numero sequencial por sessao de analise (`#001`, `#002`...). O numero reinicia a cada nova sessao. Para rastreabilidade entre sessoes, registrar no historico operacional do item relacionado apos aprovacao do Anderson.

---

## Referencias

- `docs/ARQUITETURA_COI_INTELLIGENCE.md` — Arquitetura do COI Intelligence Engine (5 camadas, 7 etapas, 6 niveis de maturidade)
- `docs/AGENTE_COI_ANALISTA.md` — Modulo produtor das recomendacoes (ativo na Fase 6.1)
- `docs/INDICADORES_INTELIGENCIA.md` — Indicadores de desempenho e maturidade do Engine
- `dados/projetos.js` — Unica fonte de dados para evidencias
