# ROADMAP COI INTELLIGENCE ENGINE

**Projeto:** Painel Mestre COI — Comunicacao Omnichannel Inteligente · Central IT
**Fase de criacao:** 6.1 — COI Analista
**Revisao final:** 6.1-RF — COI Intelligence Engine
**Criado em:** 2026-06-26
**Tipo:** Roadmap de produto

---

## Objetivo

Definir o caminho evolutivo do **COI Intelligence Engine** — motor de inteligencia do Painel Mestre COI — do estado atual (analise sob demanda, Niveis 1-3) ate uma plataforma com analise automatizada, recomendacoes adaptativas e relatorios periodicos gerados de forma autonoma (Nivel 6).

---

## Estado Atual (Pre-COI Intelligence)

| Componente | Estado |
|---|---|
| `dados/projetos.js` | 13 registros estruturados (COI 2.0); 44 campos disponiveis para analise |
| `index.html` | Dashboard com indicadores operacionais dinamicos (Fase 5B.4) |
| `portfolio.html` | Portfolio com filtros e aba Demandas Executiva (Fases 5B.2/5B.3) |
| `projetos/ficha.html` | Ficha universal com 9 secoes padrao COI 2.0 (Fase 5B.5) |
| COI-CURADOR | Agente de alimentacao de dados via linguagem natural (Fase 5C.1) |
| Validador funcional | 117 asserts automatizados cobrindo painel e dados (Fase 5B.4) |

**Lacuna atual:** o painel visualiza dados mas nao os interpreta. Nao ha analise automatizada, nao ha recomendacoes, nao ha relatorios periodicos estruturados.

---

## Niveis de Maturidade do Engine

O COI Intelligence Engine evolui progressivamente por 6 niveis de maturidade. Cada fase do roadmap avanca um ou mais niveis:

| Nivel | Nome | Descricao | Fase |
|---|---|---|---|
| **1** | Resumos automaticos | Engine produz resumos estruturados do portfolio sob demanda | 6.1 — Ativo |
| **2** | Identificacao de riscos | Engine identifica e classifica riscos com base nos dados existentes | 6.1 — Ativo |
| **3** | Recomendacoes | Engine gera recomendacoes acionaveis no formato padrao de 8 campos | 6.1 — Ativo |
| **4** | Recomendacoes inteligentes | Engine aprende com decisoes anteriores para refinar recomendacoes futuras | 6.3/6.4 — Planejado |
| **5** | Predicao | Engine identifica tendencias e projeta riscos antes de se materializarem | 6.5 — Futuro |
| **6** | Agente autonomo | Engine opera proativamente, gerando relatorios e alertas sem solicitacao manual | 6.6 — Futuro |

---

## Visao de Produto

> Em 2027, o Painel Mestre COI entrega automaticamente, toda manha, um resumo executivo com o estado do portfolio, os riscos criticos, as acoes prioritarias e as demandas atrasadas — sem que o Anderson precise solicitar.

---

## Fases da COI Intelligence

### Fase 6.1 — COI Analista (CONCLUIDA)

**Status:** Concluida · 2026-06-26
**Tipo:** Documental e arquitetural
**Niveis de maturidade atingidos:** 1, 2 e 3

**Entregaveis:**
- `docs/ARQUITETURA_COI_INTELLIGENCE.md` — arquitetura do COI Intelligence Engine (5 camadas, 7 etapas, 6 niveis de maturidade, modulos do Engine)
- `docs/AGENTE_COI_ANALISTA.md` — especificacao do COI Analista como modulo do Engine
- `docs/MODELO_RECOMENDACOES_IA.md` — modelo padrao de 8 campos; unico modelo para todos os modulos do Engine
- `docs/ROADMAP_COI_IA.md` — este documento; revisado para refletir o conceito de Engine
- `docs/INDICADORES_INTELIGENCIA.md` — indicadores de desempenho e maturidade do Engine

**O que muda:** Define a base conceitual e arquitetural do COI Intelligence Engine. Nenhuma logica JS implementada. O COI Analista opera como modulo do Engine — Anderson solicita analise, Claude executa os 7 passos do fluxo oficial seguindo as especificacoes deste documento.

**Dependencias:** Fase 5B.5 concluida (dados COI 2.0 estruturados); COI-CURADOR ativo (Fase 5C.1)

---

### Fase 6.2 — COI Daily

**Status:** Planejada
**Niveis de maturidade previstos:** 3 consolidado + inicio do 4
**Tipo:** Operacional (documental)
**Prerequisito:** Fase 6.1 concluida

**Objetivo:** Criar o produto COI Daily — relatorio diario do estado operacional do portfolio.

**Entregaveis previstos:**
- `docs/TEMPLATE_COI_DAILY.md` — template padrao do relatorio diario
- `docs/PROTOCOLO_COI_DAILY.md` — protocolo de geracao e entrega

**Conteudo do COI Daily:**
- Data e competencia
- Portfolio: projetos ativos, em risco, concluidos
- Demandas: abertas, atrasadas, criticas (P0)
- Incidentes: ativos, sem evidencia
- Acoes do dia: top 3 acoes prioritarias com responsavel
- Alertas: P0 sem atualizacao; prazo vencendo hoje

**Mecanismo de geracao:** solicitacao manual do Anderson ("Gere o COI Daily") → Claude executa como COI Analista → entrega relatorio padrao

---

### Fase 6.3 — COI Weekly

**Status:** Planejada
**Niveis de maturidade previstos:** 4 (recomendacoes com aprendizado)
**Tipo:** Operacional (documental)
**Prerequisito:** Fase 6.2 concluida e pelo menos 2 competencias de COI Daily

**Objetivo:** Relatorio semanal com evolucao do portfolio e analise de tendencias.

**Entregaveis previstos:**
- `docs/TEMPLATE_COI_WEEKLY.md`
- `docs/PROTOCOLO_COI_WEEKLY.md`

**Conteudo do COI Weekly:**
- Evolucao de percentual por projeto (semana anterior vs atual)
- Novos riscos registrados na semana
- Entregas realizadas na semana
- Demandas abertas vs fechadas na semana
- Top 5 recomendacoes da semana
- Proximos vencimentos (proximos 7 dias)

---

### Fase 6.4 — COI Monthly

**Status:** Planejada
**Niveis de maturidade previstos:** 4 maduro + base para o 5
**Tipo:** Operacional e Executivo
**Prerequisito:** Fase 6.3 concluida; pelo menos 1 competencia completa de COI Daily + Weekly

**Objetivo:** Consolidado mensal com indicadores, aprendizados e planejamento da proxima competencia.

**Entregaveis previstos:**
- `docs/TEMPLATE_COI_MONTHLY.md`
- `docs/PROTOCOLO_COI_MONTHLY.md`

**Conteudo do COI Monthly:**
- Execucao mensal: projetos avancados, concluidos, pausados
- Indicadores: percentual medio, taxa de conclusao de demandas, tempo medio de resolucao
- Riscos criticos do mes: identificados, mitigados, remanescentes
- Aprendizados operacionais da competencia
- Top 10 recomendacoes estrategicas para o proximo mes
- Alimentacao automatica de `meta.execucoesMensais` via COI-CURADOR

---

### Fase 6.5 — COI Intelligence no Painel

**Status:** Futura
**Niveis de maturidade previstos:** 5 (predicao via painel visual)
**Tipo:** Tecnica (HTML/JS)
**Prerequisito:** Fases 6.1 a 6.4 consolidadas; modelo de recomendacoes validado operacionalmente

**Objetivo:** Integrar a camada de inteligencia diretamente ao painel HTML, exibindo recomendacoes e alertas de forma visual e interativa.

**Entregaveis previstos:**
- Secao "COI Analista" no `index.html`
- Cards de recomendacoes criticas no dashboard
- Badge de inconsistencias na ficha do projeto
- Integracao do COI Daily no painel principal

**Restricao:** Esta fase requer autorizacao especifica do Anderson e validacao pelo ChatGPT antes de qualquer alteracao em index.html, portfolio.html ou ficha.html.

---

### Fase 6.6 — Automacao e Agendamento

**Status:** Futura
**Niveis de maturidade previstos:** 6 (agente autonomo)
**Tipo:** Infra / Automacao
**Prerequisito:** Fase 6.5 concluida

**Objetivo:** COI Daily e COI Weekly gerados automaticamente sem solicitacao manual.

**Conteudo previsto:**
- Script de geracao automatica de relatorios
- Agendamento via sistema operacional ou CI
- Notificacao para Anderson via email ou canal definido
- Registro automatico no historico operacional do painel

---

## Cronograma Indicativo

| Fase | Status | Prazo indicativo | Nivel de maturidade |
|---|---|---|---|
| 6.1 — COI Analista | Concluida | 2026-06-26 | 1, 2, 3 |
| 6.2 — COI Daily | Planejada | Q3 2026 | 3+, inicio do 4 |
| 6.3 — COI Weekly | Planejada | Q3 2026 | 4 |
| 6.4 — COI Monthly | Planejada | Q4 2026 | 4 maduro |
| 6.5 — Intelligence no Painel | Futura | Q1 2027 | 5 |
| 6.6 — Automacao | Futura | Q2 2027 | 6 |

---

## Dependencias Criticas

```
dados/projetos.js (COI 2.0) — base de tudo
     |
     +-- COI-CURADOR (Fase 5C.1) — alimentacao de dados
     |
     v
Fase 6.1 — COI Analista (base documental)
     |
     v
Fase 6.2 — COI Daily
     |
     v
Fase 6.3 — COI Weekly
     |
     v
Fase 6.4 — COI Monthly
     |
     v
Fase 6.5 — Intelligence no Painel
     |
     v
Fase 6.6 — Automacao
```

---

## Principios de Evolucao

1. **Nao interromper o painel operacional:** cada fase da COI Intelligence e aditiva — nenhuma fase remove ou degrada funcionalidades existentes.
2. **Dados primeiro:** qualquer fase de analise depende de dados de qualidade. A maturidade da COI Intelligence e diretamente proporcional a completude de `dados/projetos.js`.
3. **Documental antes de tecnico:** definir o modelo antes de implementar o codigo. Nenhuma logica JS antes da especificacao documental estar aprovada.
4. **Aprovacao incremental:** cada fase requer aprovacao do Anderson antes de avancar para a proxima.
5. **Validacao pelo ChatGPT:** fases com impacto em arquivos funcionais (HTML/JS) passam pelo protocolo PVO antes do commit.

---

## Indicadores de Sucesso da COI Intelligence

| Indicador | Meta |
|---|---|
| Cobertura de analise | 100% dos itens em dados/projetos.js analisados por sessao |
| Precisao das recomendacoes | 0 recomendacoes sem evidencia em dados/projetos.js |
| Adocao do COI Daily | COI Daily gerado pelo menos 3x por semana |
| Reducao de inconsistencias | Inconsistencias em dados/projetos.js < 5% dos campos por item |
| Tempo de resposta | Analise completa do portfolio em < 2 minutos por sessao |

---

## Referencias

- `docs/ARQUITETURA_COI_INTELLIGENCE.md` — Arquitetura do COI Intelligence Engine (5 camadas, 7 etapas, 6 niveis de maturidade)
- `docs/AGENTE_COI_ANALISTA.md` — Especificacao do COI Analista (modulo ativo do Engine)
- `docs/MODELO_RECOMENDACOES_IA.md` — Modelo padrao de recomendacoes do Engine
- `docs/INDICADORES_INTELIGENCIA.md` — Indicadores de desempenho e maturidade do Engine
- `ROADMAP_COI.md` — Roadmap geral do Painel Mestre
- `dados/projetos.js` — Fonte de dados
