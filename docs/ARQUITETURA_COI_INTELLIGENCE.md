# ARQUITETURA COI INTELLIGENCE ENGINE

**Projeto:** Painel Mestre COI — Comunicacao Omnichannel Inteligente · Central IT
**Fase de criacao:** 6.1 — COI Analista
**Revisao final:** 6.1-RF — COI Intelligence Engine
**Atualizado em:** 2026-06-26
**Tipo:** Documento arquitetural

---

## Definicao

O **COI Intelligence Engine** e o motor de inteligencia do Painel Mestre COI. Ele e responsavel por transformar dados operacionais brutos em conhecimento acionavel — analises, classificacoes, priorizacoes, recomendacoes e aprendizados — de forma estruturada, auditavel e progressivamente mais autonoma.

O COI Intelligence Engine nao substitui o painel visual. Ele e uma camada cognitiva que opera SOBRE os dados existentes, sem criar bases paralelas, sem duplicar informacao e sem alterar o fluxo operacional ja estabelecido.

O **COI Analista** e o primeiro modulo ativo do Engine. Outros modulos (COI Daily, COI Weekly, COI Monthly) serao adicionados progressivamente conforme a maturidade do sistema evolui.

---

## Principio Fundamental

**Fonte unica de dados:** `dados/projetos.js`

Toda analise, recomendacao e saida do Engine parte exclusivamente dos dados registrados em `dados/projetos.js`. Nenhuma base paralela sera criada. Nenhum dado sera inventado. A qualidade da inteligencia produzida e diretamente proporcional a qualidade dos dados inseridos via COI-CURADOR.

---

## Fluxo Oficial do COI Intelligence Engine

O Engine opera em 7 etapas sequenciais e encadeadas:

```
[1] DADOS
     Leitura de dados/projetos.js (unica fonte)
     COI-CURADOR alimenta; COI-MEMORIA contextualiza
          |
          v
[2] ANALISE
     COI-FORENSE + COI-ARQUITETO interpretam os dados
     Identificacao de padroes, anomalias, inconsistencias
          |
          v
[3] CLASSIFICACAO
     Cada item e classificado por: tipo, criticidade, urgencia
     Semaforo operacional: CRITICO / ATENCAO / NORMAL / CONCLUIDO
          |
          v
[4] PRIORIZACAO
     Ordenacao por: prioridade (P0>P1>P2>P3) + semaforo + prazo + risco
     Saida: lista priorizada para acao imediata vs monitoramento
          |
          v
[5] RECOMENDACAO
     COI Analista converte diagnostico em recomendacoes acionaveis
     Formato padrao: 8 campos (ver MODELO_RECOMENDACOES_IA.md)
     Tipos: RISCO, ACAO, PRIORIZACAO, INCONSISTENCIA, PENDENCIA, ALERTA, OPORTUNIDADE
          |
          v
[6] ACAO
     Anderson aprova; COI-EXECUTOR implementa
     COI-CURADOR atualiza dados/projetos.js se necessario
     COI-QA valida resultado da acao
          |
          v
[7] APRENDIZADO
     COI-GOVERNANCA registra: decisoes, erros, padroes, melhorias
     BASE_DE_CONHECIMENTO_EVOLUTIVA alimentada
     Proxima analise parte de base de conhecimento mais rica
          |
          v
     [retorna a etapa 1 no proximo ciclo]
```

---

## Modulos do Engine

O COI Intelligence Engine e composto por modulos especializados, ativados progressivamente conforme a maturidade do sistema:

| Modulo | Status | Fase | Responsabilidade |
|---|---|---|---|
| **COI Analista** | Ativo | 6.1 | Analise sob demanda; recomendacoes; resumo executivo |
| **COI Daily** | Planejado | 6.2 | Relatorio diario automatizado; alertas do dia |
| **COI Weekly** | Planejado | 6.3 | Evolucao semanal; tendencias; proximos vencimentos |
| **COI Monthly** | Planejado | 6.4 | Consolidado mensal; indicadores; aprendizados |
| **COI Intelligence UI** | Futuro | 6.5 | Integracao visual com o painel HTML |
| **COI Autonomo** | Futuro | 6.6 | Geracao automatica de relatorios sem solicitacao manual |

---

## Niveis de Maturidade do Engine

O COI Intelligence Engine evolui progressivamente por 6 niveis de maturidade:

| Nivel | Nome | Descricao | Fase correspondente |
|---|---|---|---|
| **1** | Resumos automaticos | Engine produz resumos estruturados do portfolio sob demanda | 6.1 — Ativo |
| **2** | Identificacao de riscos | Engine identifica e classifica riscos com base em dados existentes | 6.1 — Ativo |
| **3** | Recomendacoes | Engine gera recomendacoes acionaveis e priorizadas no formato padrao | 6.1 — Ativo |
| **4** | Recomendacoes inteligentes | Engine aprende com decisoes anteriores para refinar recomendacoes futuras | 6.3/6.4 — Planejado |
| **5** | Predicao | Engine identifica tendencias e projeta riscos antes de se materializarem | 6.5 — Futuro |
| **6** | Agente autonomo | Engine opera de forma proativa, gerando relatorios e alertas sem solicitacao | 6.6 — Futuro |

**Estado atual da Fase 6.1:** Niveis 1, 2 e 3 ativos (analise sob demanda). Niveis 4, 5 e 6 planejados para fases futuras.

---

## Arquitetura de Camadas

```
+----------------------------------------------------------+
|                CAMADA DE GOVERNANCA (5)                  |
|   COI-QA · COI-RELEASE-MANAGER · COI-AUDITOR            |
|   COI-GOVERNANCA · Aprendizado · BASE_EVOLUTIVA          |
+----------------------------------------------------------+
                            |
+----------------------------------------------------------+
|               CAMADA DE APRESENTACAO (4)                 |
|   Resumo Executivo · COI Daily · COI Weekly              |
|   COI Monthly · Ficha de Analise                         |
+----------------------------------------------------------+
                            |
+----------------------------------------------------------+
|             CAMADA DE RECOMENDACAO (3)                   |
|       COI Intelligence Engine                            |
|   [COI Analista] [COI Daily*] [COI Weekly*]              |
|   Modelo de Recomendacoes IA (8 campos)                  |
+----------------------------------------------------------+
                            |
+----------------------------------------------------------+
|               CAMADA DE ANALISE (2)                      |
|   COI-FORENSE · COI-MEMORIA · COI-ARQUITETO              |
|   Classificacao · Priorizacao · Diagnostico              |
+----------------------------------------------------------+
                            |
+----------------------------------------------------------+
|                CAMADA DE DADOS (1)                       |
|            dados/projetos.js (unica fonte)               |
|   COI-CURADOR (alimentacao) · 13 registros · 44 campos   |
+----------------------------------------------------------+

(*) modulos planejados para fases futuras
```

---

## Camada 1 — Dados

### Responsabilidade

Armazenar todos os registros operacionais do COI de forma estruturada, versionada e auditavel.

### Componentes

| Componente | Descricao |
|---|---|
| `dados/projetos.js` | Unica fonte de verdade. 13 registros (COI-001 a COI-013). Estrutura COI 2.0. |
| `meta` | Metadados globais: versao, execucoesMensais, execucaoMensal (fallback) |
| `projetos[]` | Array de itens: Projetos, Demandas, Incidentes, Licencas, Atividades Operacionais, Entregas Contratuais |

### Grupos de campos disponivel para analise

| Grupo | Campos |
|---|---|
| Identificacao | id, nome, tipoItem, classificacao, prioridade, semaforo, status, fase |
| Tempo | dataInicio, prazoPrevisto, prazoResolucao, dataResolucao, dataSolicitacao, atualizadoEm |
| Responsabilidade | responsavel, patrocinador, orgao, solicitante, gerenteContrato |
| Progresso | percentual, planoExcelencia, beneficioEsperado, beneficioRealizado |
| Risco | riscosCriticos, riscosRegistrados[], decisoesPendentes, impactoContratual |
| Conteudo | objetivo, situacaoAtual, historicoOperacional[], proximasAcoes[] |
| Evidencia | evidencia, fonteInformacao, observacoesExecutivas, observacoesOperacionais |
| Operacional | categoriaOperacional, origem, contrato, frente, competencia, plataforma |

### Responsavel pela alimentacao

**COI-CURADOR:** agente responsavel por interpretar entradas em linguagem natural e traduzir para atualizacoes estruturadas em `dados/projetos.js`, com previa de mudancas e aprovacao do Anderson antes de qualquer alteracao.

---

## Camada 2 — Analise

### Responsabilidade

Interpretar os dados da Camada 1 e produzir diagnosticos estruturados, identificando padroes, anomalias, riscos e oportunidades. Inclui as etapas de Classificacao e Priorizacao do fluxo oficial.

### Agentes envolvidos

| Agente | Contribuicao |
|---|---|
| COI-MEMORIA | Carrega estado atual, historico de erros, alertas ativos e regras de comportamento |
| COI-FORENSE | Analisa evidencias reais vs hipoteses; classifica estado atual dos dados |
| COI-ARQUITETO | Define modo de operacao, mapeia escopo, determina plano de analise |

### Tipos de analise suportados

1. **Projeto individual** — status, percentual, semaforo, riscos, proximas acoes
2. **Demanda operacional** — criticidade, prazo, responsavel, estado de resolucao
3. **Portfolio completo** — visao consolidada dos 13 itens; desequilibrios, dependencias
4. **Temporal** — itens atrasados, sem atualizacao recente, progresso estagnado
5. **Consistencia** — campos ausentes, semaforo incompativel, status sem evidencia

### Classificacao operacional de itens

| Classificacao | Criterio |
|---|---|
| CRITICO | P0 ou semaforo 🔴 ou prazo vencido |
| ATENCAO | P1 ou semaforo 🟡 ou riscosCriticos > 0 |
| NORMAL | P2/P3 e semaforo 🟢 e dentro do prazo |
| CONCLUIDO | status = "Concluido" ou "Concluido" |

---

## Camada 3 — Recomendacao (COI Intelligence Engine)

### Responsabilidade

Converter diagnosticos classificados em recomendacoes acionaveis, priorizadas e documentadas. Esta e a camada onde o **COI Intelligence Engine** opera ativamente — onde analise bruta vira conhecimento acionavel.

### Modulo ativo: COI Analista

O COI Analista e o primeiro e principal modulo do Engine na Fase 6.1. Ele:
- Recebe o diagnostico classificado da Camada 2
- Aplica a logica de priorizacao do Engine
- Produz recomendacoes no formato padrao de 8 campos
- Gera resumos executivos e insumos para COI Daily/Weekly/Monthly

Especificacao completa: `docs/AGENTE_COI_ANALISTA.md`

### Formato de saida obrigatorio

Toda saida do Engine segue o Modelo de Recomendacoes IA (8 campos obrigatorios):
`tipo · item_relacionado · prioridade · motivo · evidencia · acao_sugerida · impacto_esperado · status_recomendacao`

Especificacao completa: `docs/MODELO_RECOMENDACOES_IA.md`

---

## Camada 4 — Apresentacao

### Responsabilidade

Entregar os resultados do Engine em formatos adequados ao publico-alvo.

| Formato | Publico | Modulo do Engine |
|---|---|---|
| Resumo Executivo | Diretoria / Anderson | COI Analista (ativo) |
| COI Daily | PMO / Operacional | COI Daily (planejado — Fase 6.2) |
| COI Weekly | Anderson / Diretoria | COI Weekly (planejado — Fase 6.3) |
| COI Monthly | Governanca / Clientes | COI Monthly (planejado — Fase 6.4) |
| Ficha de Analise | Tecnico / PMO | COI Analista (ativo) |

A Camada de Apresentacao nao altera o layout do painel. Ela produz saidas textuais e documentais que complementam o painel visual.

---

## Camada 5 — Governanca

### Responsabilidade

Garantir que toda saida do Engine seja auditavel, rastreavel e que o aprendizado seja incorporado ao ciclo seguinte.

| Agente | Papel |
|---|---|
| COI-QA | Valida consistencia das saidas do Engine com os dados reais |
| COI-RELEASE-MANAGER | Prepara entrega das analises para Anderson |
| COI-AUDITOR | Verifica se o escopo de cada analise foi respeitado |
| COI-GOVERNANCA | Registra aprendizados e decisoes; alimenta BASE_EVOLUTIVA |

### Principios de governanca

1. **Rastreabilidade:** toda recomendacao referencia campo e item de `dados/projetos.js`
2. **Auditabilidade:** historico de analises nos documentos de governanca
3. **Imutabilidade:** o Engine nao altera `dados/projetos.js` — apenas le
4. **Aprovacao humana:** Anderson aprova acoes antes da execucao
5. **Nao invencao:** campo ausente = recomendacao INCONSISTENCIA, nunca valor inventado
6. **Aprendizado:** toda decisao tomada alimenta o ciclo seguinte (Nivel 4+)

---

## Integracao com Agentes Existentes

```
COI-CURADOR
  | (alimenta dados/projetos.js com aprovacao do Anderson)
  v
dados/projetos.js ← unica fonte do Engine
  |
  +-- COI-MEMORIA  (contextualiza: estado, erros, alertas)
  |
  +-- COI-FORENSE  (valida: evidencias vs hipoteses)
  |
  +-- COI-ARQUITETO (planeja: escopo, modo, plano de analise)
  |
  v
COI Intelligence Engine
  |
  +-- [etapa 2] ANALISE
  +-- [etapa 3] CLASSIFICACAO
  +-- [etapa 4] PRIORIZACAO
  +-- [etapa 5] RECOMENDACAO  ← COI Analista (modulo ativo)
  |
  v
COI-QA  (valida saida do Engine)
  |
  v
COI-RELEASE-MANAGER  (prepara entrega para Anderson)
  |
  v
Anderson  (aprova e decide)
  |
  v
COI-EXECUTOR  (implementa acoes aprovadas)
  |
  v
COI-GOVERNANCA  ← [etapa 7] APRENDIZADO → alimenta proximo ciclo
```

---

## Restricoes da Fase 6.1

| Restricao | Justificativa |
|---|---|
| Sem logica IA em JavaScript | Fase documental e arquitetural |
| Sem alteracao do layout do painel | Engine e camada cognitiva, nao visual |
| Sem base de dados paralela | Fonte unica: dados/projetos.js |
| Sem alteracao de index.html, portfolio.html, ficha.html, style.css | Escopo preservado |

---

## Evolucao do Engine por Fase

| Fase | Modulo adicionado | Nivel de maturidade atingido |
|---|---|---|
| 6.1 — atual | COI Analista | Nivel 1 + 2 + 3 (resumo, risco, recomendacao) |
| 6.2 | COI Daily | Nivel 3 consolidado + inicio do 4 |
| 6.3 | COI Weekly | Nivel 4 (recomendacoes com aprendizado) |
| 6.4 | COI Monthly | Nivel 4 maduro + base para o 5 |
| 6.5 | COI Intelligence UI | Nivel 5 (predicao via painel visual) |
| 6.6 | COI Autonomo | Nivel 6 (agente autonomo) |

---

## Referencias

- `docs/AGENTE_COI_ANALISTA.md` — Especificacao do modulo COI Analista
- `docs/MODELO_RECOMENDACOES_IA.md` — Modelo padronizado de saida do Engine
- `docs/ROADMAP_COI_IA.md` — Roadmap completo do Engine
- `docs/INDICADORES_INTELIGENCIA.md` — Indicadores de desempenho e maturidade do Engine
- `dados/projetos.js` — Fonte unica de dados
- `docs/AGENTE_CURADOR_DEMANDAS_PROJETOS.md` — COI-CURADOR (alimentacao de dados)
- `.claude/skills/COI-MESTRE.md` — Orquestrador do fluxo operacional
