# INDICADORES DE INTELIGENCIA — COI Intelligence Engine

**Projeto:** Painel Mestre COI — Comunicacao Omnichannel Inteligente · Central IT
**Fase de criacao:** 6.1-RF — Revisao Final COI Intelligence Engine
**Criado em:** 2026-06-26
**Tipo:** Indicadores de desempenho e maturidade

---

## Objetivo

Definir os indicadores que medem o desempenho, a qualidade e o nivel de maturidade do COI Intelligence Engine ao longo do tempo. Estes indicadores permitem avaliar se o Engine esta operando com eficacia, se as recomendacoes sao utilizadas e se o sistema esta evoluindo conforme o roadmap.

---

## Estrutura dos Indicadores

Os indicadores estao organizados em 4 grupos:

1. **Indicadores de Maturidade** — em qual nivel o Engine esta operando
2. **Indicadores de Desempenho** — qualidade e precisao das analises
3. **Indicadores de Adocao** — como as recomendacoes sao utilizadas
4. **Indicadores de Saude dos Dados** — qualidade da fonte (dados/projetos.js)

---

## Grupo 1 — Indicadores de Maturidade

Medem em qual nivel de maturidade o COI Intelligence Engine esta operando em determinado momento.

| Indicador | Descricao | Meta Fase 6.1 | Meta Fase 6.4 |
|---|---|---|---|
| **Nivel de maturidade ativo** | Nivel mais alto atingido e em uso regular (1 a 6) | >= 3 | >= 4 |
| **Modulos ativos do Engine** | Quantidade de modulos do Engine em operacao | >= 1 (COI Analista) | >= 4 |
| **Cobertura de tipos de analise** | Tipos de analise suportados: projeto, demanda, portfolio, temporal, consistencia | >= 3 tipos | 5 tipos |
| **Fases do roadmap concluidas** | Fases 6.1 a 6.6 concluidas e validadas | Fase 6.1 | Fase 6.4 |

### Descricao dos niveis de maturidade

| Nivel | Nome | Criterio de avaliacao |
|---|---|---|
| 1 | Resumos automaticos | Engine produz resumo estruturado do portfolio quando solicitado |
| 2 | Identificacao de riscos | Engine identifica riscos com evidencia em dados/projetos.js |
| 3 | Recomendacoes | Engine gera recomendacoes no formato padrao de 8 campos |
| 4 | Recomendacoes inteligentes | Engine referencia decisoes anteriores ao gerar novas recomendacoes |
| 5 | Predicao | Engine projeta riscos e tendencias com base em historico |
| 6 | Agente autonomo | Engine gera relatorios proativamente sem solicitacao manual |

---

## Grupo 2 — Indicadores de Desempenho

Medem a qualidade e a precisao das analises e recomendacoes produzidas pelo Engine.

| Indicador | Descricao | Meta |
|---|---|---|
| **Cobertura de analise** | % dos itens em dados/projetos.js analisados por sessao completa | 100% |
| **Precisao das recomendacoes** | % de recomendacoes com evidencia valida em dados/projetos.js | 100% |
| **Taxa de recomendacoes sem invencao** | % de analises sem dados inventados (ausencia = INCONSISTENCIA) | 100% |
| **Tempo de analise de portfolio** | Tempo medio para analise completa dos 13 itens | < 2 minutos |
| **Consistencia de formato** | % de recomendacoes nos 8 campos obrigatorios sem omissao | 100% |
| **Recomendacoes por sessao** | Quantidade media de recomendacoes por sessao de analise completa | 5 a 15 |

### Como medir

- **Cobertura:** contar itens analisados / total de itens ativos em dados/projetos.js
- **Precisao:** validar se o campo `evidencia` de cada recomendacao cita campo real de dados/projetos.js
- **Invencao:** verificar se alguma recomendacao cita dado nao presente em dados/projetos.js
- **Formato:** verificar se todos os 8 campos estao presentes em cada recomendacao

---

## Grupo 3 — Indicadores de Adocao

Medem como as recomendacoes do Engine sao utilizadas por Anderson e pela operacao do COI.

| Indicador | Descricao | Meta Fase 6.1 | Meta Fase 6.4 |
|---|---|---|---|
| **Taxa de recomendacoes aprovadas** | % de recomendacoes aprovadas pelo Anderson sobre o total gerado | > 50% | > 70% |
| **Taxa de recomendacoes executadas** | % de recomendacoes aprovadas que chegaram ao status EXECUTADA ou CONCLUIDA | > 40% | > 60% |
| **Taxa de recomendacoes descartadas** | % de recomendacoes descartadas — indica imprecisao ou baixa relevancia | < 30% | < 20% |
| **Frequencia de uso do COI Analista** | Sessoes de analise por semana | >= 1 | >= 3 |
| **Cobertura de COI Daily** | Vezes que COI Daily foi gerado por semana (Fase 6.2+) | N/A | >= 3 |

### Status cycle das recomendacoes

```
ABERTA → EM_ANALISE → APROVADA → EXECUTADA → CONCLUIDA
                    ↘ DESCARTADA
```

---

## Grupo 4 — Indicadores de Saude dos Dados

Medem a qualidade de dados/projetos.js como fonte para o Engine. A inteligencia do Engine e diretamente proporcional a qualidade dos dados.

| Indicador | Descricao | Meta |
|---|---|---|
| **Completude de campos obrigatorios** | % de itens com todos os campos obrigatorios preenchidos (nome, responsavel, objetivo, status, prioridade, semaforo, dataInicio) | >= 90% |
| **Taxa de inconsistencias** | % de campos com inconsistencias identificadas pelo Engine por sessao | < 5% por item |
| **Atualizacao recente** | % de itens com `atualizadoEm` nos ultimos 30 dias | >= 70% |
| **Cobertura de historicoOperacional** | % de projetos em andamento com pelo menos 1 entrada em historicoOperacional[] | >= 80% |
| **Cobertura de proximasAcoes** | % de itens Em andamento com pelo menos 1 entrada em proximasAcoes[] | >= 80% |
| **Cobertura de evidencia** | % de incidentes e demandas P0/P1 com campo evidencia preenchido | 100% |
| **Semaforo consistente** | % de itens com semaforo coerente com percentual e status | >= 95% |

### Criterios de inconsistencia de semaforo

| Situacao | Classificacao |
|---|---|
| percentual >= 90% e semaforo 🔴 | Inconsistente |
| status "Concluido" e semaforo != 🟢 | Inconsistente |
| prioridade P0 e semaforo 🟢 e em andamento | Suspeito — verificar |
| percentual = 100% e status != "Concluido" | Inconsistente |

---

## Consolidado por Sessao de Analise

Ao final de cada sessao de analise completa, o COI Analista deve entregar os seguintes indicadores consolidados:

```
SESSAO DE ANALISE — [DATA]
═══════════════════════════════════════════════════════

PORTFOLIO (dados/projetos.js)
  Total de itens:              [N]
  Projetos ativos:             [N]
  Itens operacionais:          [N]
  Concluidos no periodo:       [N]

SEMAFORO DO PORTFOLIO
  🟢 Normal:                  [N] ([%])
  🟡 Atencao:                 [N] ([%])
  🔴 Critico:                 [N] ([%])

MATURIDADE DO ENGINE (sessao atual)
  Nivel ativo:                 [1/2/3/4/5/6]
  Tipos de analise executados: [lista]
  Modulos utilizados:          [COI Analista / ...]

RECOMENDACOES GERADAS
  Total:                       [N]
  Por tipo: RISCO [N] · ACAO [N] · PRIORIZACAO [N]
            INCONSISTENCIA [N] · PENDENCIA [N]
            ALERTA [N] · OPORTUNIDADE [N]

SAUDE DOS DADOS
  Campos obrigatorios completos: [%]
  Inconsistencias detectadas:    [N]
  Itens sem atualizacao recente: [N]

TOP 3 RISCOS ATIVOS
  1. [COI-XXX] — [descricao resumida]
  2. [COI-XXX] — [descricao resumida]
  3. [COI-XXX] — [descricao resumida]

TOP 3 ACOES PRIORITARIAS
  1. [COI-XXX] — [acao sugerida resumida]
  2. [COI-XXX] — [acao sugerida resumida]
  3. [COI-XXX] — [acao sugerida resumida]

═══════════════════════════════════════════════════════
```

---

## Evolucao dos Indicadores por Fase

| Indicador | Fase 6.1 (atual) | Fase 6.3 | Fase 6.6 |
|---|---|---|---|
| Nivel de maturidade | 3 | 4 | 6 |
| Modulos ativos | 1 | 3 | 5+ |
| Frequencia de analise | Sob demanda | Semanal | Diaria/automatica |
| Recomendacoes por ciclo | 5-15 | 5-10 (refinadas) | Automatico |
| Aprendizado entre sessoes | Manual (COI-GOVERNANCA) | Semi-automatico | Automatico |
| Predicao de riscos | Nao | Parcial | Sim |

---

## Como Registrar Evolucao dos Indicadores

Na Fase 6.1, os indicadores sao verificados manualmente por sessao. O registro e feito em:

- `docs/ESTADO_ATUAL_DO_PROJETO.md` — indicadores consolidados por fase
- `docs/MEMORIA_OPERACIONAL_PROJETO.md` — alertas e aprendizados de qualidade de dados
- `CHANGELOG.md` — melhora significativa em indicadores registrada como event relevante

A partir da Fase 6.4, o COI Monthly incluira uma secao de indicadores do Engine com comparativo entre competencias.

---

## Referencias

- `docs/ARQUITETURA_COI_INTELLIGENCE.md` — Arquitetura do Engine e niveis de maturidade
- `docs/AGENTE_COI_ANALISTA.md` — Modulo produtor das metricas de analise
- `docs/MODELO_RECOMENDACOES_IA.md` — Formato das recomendacoes que alimentam estes indicadores
- `docs/ROADMAP_COI_IA.md` — Metas por fase do roadmap
- `dados/projetos.js` — Fonte dos dados que alimentam os indicadores de saude
