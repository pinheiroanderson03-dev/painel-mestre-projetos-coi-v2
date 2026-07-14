# GOVERNANCA_DADOS — Modelo Oficial de Dados do Painel Mestre COI

**Projeto:** Painel Mestre COI · Comunicação Omnichannel Inteligente · Central IT  
**Versão:** 1.1  
**Criado em:** Fase 6 (Governança do Projeto)  
**Revisado em:** 2026-07-14 (hierarquia visual e ciclo de vida adicionados)  
**Vigência:** permanente — revisão mediante nova DAR

> Este documento define o modelo oficial de dados do painel.  
> Toda entrada em `dados/projetos.js` deve seguir estas definições.  
> Referência técnica complementar: `docs/DECISOES_ARQUITETURAIS_COI.md` (DAR-002, DAR-011)

---

## Hierarquia dos Tipos de Item

```
  COI_DATA.projetos[]
  │
  ├── tipoItem: "Projeto"               ← Iniciativa estratégica com escopo
  │     └── tem: gerente, percentual, semáforo, riscos, histórico
  │
  ├── tipoItem: "Demanda"               ← Solicitação formal com SLA
  │     └── tem: chamado, SLA, recorrência
  │
  ├── tipoItem: "Atividade Operacional" ← Sustentação contínua
  │     └── tem: frequência, automação
  │
  ├── tipoItem: "Entrega Contratual"    ← Artefato formal para cliente
  │     └── tem: dataEntrega, critério de aceite, evidência
  │
  ├── tipoItem: "Incidente"             ← Interrupção não planejada
  │     └── tem: severidade, RCA, lição aprendida
  │
  ├── tipoItem: "Melhoria"             ← Evolução funcional ou técnica
  │
  └── tipoItem: "Licença/Contrato"     ← Gestão de licenças e contratos
        └── tem: vencimento, renovação, chamado

  Campos não-item (residem dentro dos itens acima):
  ├── riscosCriticos[]   ← riscos com probabilidade + impacto + mitigação
  ├── historicoOperacional[] ← registros com data + descrição + evidência
  └── indicadores        ← percentual, semáforo, score do Curador

  Fora do projetos[] (metadata):
  ├── meta.execucoesMensais[] ← competências mensais com atividades e ganhos
  └── Decisão (DAR)           ← em docs/DECISOES_ARQUITETURAIS_COI.md
```

---

## Ciclo de Vida de um Item

```
  CRIAÇÃO
  (Anderson autoriza + Claude insere em dados/projetos.js)
       │
       ▼
  Planejamento ──► Em andamento ──► Homologação ──► Produção ──► Concluído
                        │                                │
                        └────────────────────────────────┘
                              pode ir para Suspenso em qualquer etapa

  Em cada transição de status:
  - historicoOperacional[] recebe nova entrada com evidência
  - semáforo é revisado (🟢/🟡/🔴)
  - percentual é atualizado com base em fonte verificável
  - atualizadoEm recebe a data real da atualização
```

---

## 1. Fonte Única de Verdade

Todos os dados do painel residem exclusivamente em `dados/projetos.js`, via objeto global `COI_DATA`:

```javascript
const COI_DATA = {
  meta: { /* metadados do painel */ },
  projetos: [ /* array de todos os itens */ ]
};
```

**Proibido:** hardcoded de dados em HTML, CSS ou qualquer outro arquivo.  
**Proibido:** uso de localStorage como fonte primária (volátil).  
**Proibido:** fetch de dados externos (painel estático — DAR-001).

---

## 2. Definições Oficiais dos Tipos de Item

Todos os itens coexistem no array `COI_DATA.projetos[]`, diferenciados pelo campo `tipoItem` (DAR-011).

---

### 2.1 Projeto (`tipoItem: "Projeto"`)

**Definição:** Iniciativa estratégica com escopo definido, prazo, budget e entregas formais. Representa um projeto de transformação digital ou melhoria estrutural da Central IT ou do GDF.

**Características:**
- Possui gerente de projeto e patrocinador
- Tem marcos formais e entregas contratuais associadas
- Acompanhado por percentual de conclusão e semáforo
- Pode ter histórico operacional, riscos e dependências

**Exemplos no painel:** Sistema AURA, Aplicativo e-GDF, Portal do Cidadão, WhatsApp Oficial

**Campos obrigatórios:** `id`, `nome`, `status`, `percentual`, `prioridade`, `semaforo`, `gerente`

---

### 2.2 Demanda (`tipoItem: "Demanda"`)

**Definição:** Solicitação formal de serviço, ajuste ou entrega pontual registrada por um cliente interno ou externo. Não necessariamente tem escopo de projeto — pode ser uma tarefa técnica, uma configuração ou uma solicitação operacional.

**Características:**
- Originada por chamado, ticket ou solicitação formal
- Tem SLA associado (prazo de atendimento)
- Pode ser recorrente
- Rastreada por número de chamado

**Exemplos no painel:** Demanda de licença AIOps (chamado 518190), integrações pontuais

**Campos obrigatórios:** `id`, `nome`, `status`, `tipoItem`, `chamado` (quando aplicável)

---

### 2.3 Atividade Operacional (`tipoItem: "Atividade Operacional"`)

**Definição:** Tarefa recorrente ou contínua que faz parte da operação regular da Central IT. Não tem data de início/fim definida — é parte do trabalho normal de sustentação.

**Características:**
- Natureza contínua (não pontual)
- Não possui marcos formais
- Medida por frequência de execução ou indicadores de desempenho
- Pode ser automatizada

**Exemplos no painel:** Monitoramento AIOps, atividades de suporte técnico

**Campos obrigatórios:** `id`, `nome`, `status`, `tipoItem`

---

### 2.4 Entrega (`tipoItem: "Entrega Contratual"`)

**Definição:** Produto, documento ou artefato específico que deve ser formalmente entregue a um cliente, seja como parte de um projeto ou de um contrato. Tem data de entrega, aceite formal e responsável.

**Características:**
- Vinculada a um contrato ou projeto pai
- Possui critério de aceite formal
- Controlada por prazo e aceite do cliente
- Gera evidência documentada

**Exemplos no painel:** Relatórios de entregas contratuais, documentos de aceite

**Campos obrigatórios:** `id`, `nome`, `status`, `tipoItem`, `dataEntrega` (quando aplicável)

---

### 2.5 Incidente (`tipoItem: "Incidente"`)

**Definição:** Evento não planejado que causa interrupção ou degradação de um serviço de TI. Requer resposta imediata e tem ciclo de vida próprio (abertura → investigação → resolução → fechamento).

**Características:**
- Abertura via chamado ou detecção automática
- Tem severidade (P0 a P3)
- Possui RCA (Root Cause Analysis) obrigatória para P0 e P1
- Gera registro de lição aprendida

**Campos obrigatórios:** `id`, `nome`, `status`, `tipoItem`, `prioridade`, `semaforo`

---

### 2.6 Risco (`campo: riscosCriticos[]` dentro de qualquer item)

**Definição:** Evento futuro incerto que, se ocorrer, pode impactar negativamente o objetivo de um projeto, demanda ou serviço. Não é um item separado — é um campo dentro de outro item.

**Estrutura:**
```javascript
riscosCriticos: [
  {
    descricao: "Atraso na aprovação do contrato",
    probabilidade: "Alta",
    impacto: "Alto",
    mitigacao: "Escalar para diretoria até 15/07"
  }
]
```

**Nota:** Riscos com probabilidade Alta + impacto Alto disparam semáforo 🔴.

---

### 2.7 Decisão (`docs/DECISOES_ARQUITETURAIS_COI.md`)

**Definição:** Escolha arquitetural ou técnica formal que define como o sistema deve se comportar. Registrada como DAR (Decisão Arquitetural Registrada) com contexto, alternativas e impacto.

**Não é campo em projetos.js** — reside em `docs/DECISOES_ARQUITETURAIS_COI.md`.

**Estrutura de uma DAR:**
```markdown
### DAR-NNN — Título da Decisão
Status: ATIVA | REVOGADA
Fase: v1.x
Decisão: ...
Contexto: ...
Alternativas consideradas: ...
Impacto: ...
Restrição derivada: ...
```

---

### 2.8 Indicador (`campo: indicadores` / seção de dashboard)

**Definição:** Métrica mensurável que representa o desempenho ou saúde de um projeto, serviço ou processo. Usado para construir o dashboard executivo.

**Tipos de indicador no painel:**
- Percentual de conclusão (`percentual`)
- Semáforo de saúde (`semaforo`: 🟢 / 🟡 / 🔴)
- Número de riscos críticos (`riscosCriticos.length`)
- Score de qualidade (COI Curador: 0–100)
- Contagem de projetos por status

**Derivados automaticamente de `dados/projetos.js`** — nunca hardcoded no HTML.

---

### 2.9 Competência (`meta.execucoesMensais[]`)

**Definição:** Período mensal de acompanhamento do painel. Registra as atividades realizadas, principais ganhos, alertas e plano de excelência de um mês específico.

**Estrutura:**
```javascript
{
  competencia: "Julho/2026",
  resumo: "...",
  totalAtividades: 7,
  atividades: [ /* lista de entregas do mês */ ],
  principaisGanhos: [ /* ganhos verificados */ ],
  alertasExecutivos: [ /* alertas do período */ ],
  planoExcelencia: { /* metas do próximo mês */ }
}
```

**Regra:** Somente adicionar atividades e ganhos com evidência verificável (git log, CHANGELOG, documentos).

---

### 2.10 Evidência (`campo: evidencia` em historicoOperacional[])

**Definição:** Referência verificável que comprova uma alteração de estado ou entrega. Pode ser um número de chamado, um commit, uma tag, um documento ou uma versão do painel.

**Estrutura:**
```javascript
historicoOperacional: [
  {
    data: "2026-06-13",
    descricao: "Licença AIOps renovada — chamado 518190",
    evidencia: "CHANGELOG Fase 5C.2"
  }
]
```

**Regra crítica:** Nunca registrar entrada em `historicoOperacional[]` sem campo `evidencia` preenchido com fonte verificável.

---

### 2.11 Documento (`registry/documents.json`)

**Definição:** Artefato de governança, técnico ou operacional que faz parte da base documental do projeto. Inventariado em `registry/documents.json`.

**Categorias de documentos:**
- Governança: CLAUDE.md, AGENTS.md, docs/governanca/
- Estado: STATUS.md, CHANGELOG.md, RELEASE_NOTES.md
- Técnico: DECISOES_ARQUITETURAIS_COI.md, REGISTRO_DE_ERROS_E_APRENDIZADOS.md
- Operacional: MEMORIA_OPERACIONAL_PROJETO.md, CHECKLIST_EXECUCAO_AGENTES.md
- Intelligence: ARQUITETURA_COI_INTELLIGENCE.md, ROADMAP_COI_IA.md

---

## 3. Regras de Integridade dos Dados

| Regra | Descrição |
|---|---|
| RD-01 | Nunca inventar dados — toda informação precisa de fonte verificável |
| RD-02 | `tipoItem` obrigatório em novos registros |
| RD-03 | `historicoOperacional[]` exige campo `evidencia` em cada entrada |
| RD-04 | `percentual` só muda com autorização explícita e fonte verificável |
| RD-05 | `semaforo` deriva do estado real — 🟢 ≥ 70%, 🟡 30–69%, 🔴 < 30% ou risco crítico |
| RD-06 | `execucoesMensais[]` — somente ganhos com evidência em CHANGELOG ou git log |
| RD-07 | Alterações em `dados/projetos.js` requerem autorização explícita do Anderson |
| RD-08 | Cada campo alterado deve ter origem declarada no pacote de entrega |

---

## 4. Campos Universais (todos os tipos de item)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | Sim | Identificador único (ex.: "COI-001") |
| `nome` | string | Sim | Nome do projeto/demanda/item |
| `tipoItem` | string | Sim | Tipo do item (ver seção 2) |
| `status` | string | Sim | Status atual (ver valores permitidos) |
| `prioridade` | string | Sim | P0 / P1 / P2 / P3 |
| `semaforo` | string | Sim | 🟢 / 🟡 / 🔴 |
| `atualizadoEm` | string | Sim | Data da última atualização (YYYY-MM-DD) |

**Valores permitidos para `status`:**  
`Planejamento` · `Em andamento` · `Homologação` · `Produção` · `Concluído` · `Suspenso`

**Valores permitidos para `prioridade`:**  
`P0` (Crítica) · `P1` (Alta) · `P2` (Média) · `P3` (Baixa)

---

*Criado em: 2026-07-14 — Fase 6 (Governança do Projeto)*  
*Revisão: mediante nova DAR aprovada por Anderson Pinheiro*  
*Índice da pasta: [docs/governanca/README.md](README.md)*
