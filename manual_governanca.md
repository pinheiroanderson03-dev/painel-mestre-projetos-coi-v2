# Manual de Governança
## COI — Centro de Operações Integradas
### Painel Mestre de Acompanhamento de Projetos

---

## 1. Introdução

Este manual define os processos, critérios e padrões para operação do Painel Mestre do COI. Seu objetivo é garantir que todas as informações registradas sejam confiáveis, atualizadas e úteis para a tomada de decisão executiva.

O Painel Mestre é composto por:
- **index.html** — Dashboard Executivo (visão consolidada)
- **portfolio.html** — Portfólio completo de projetos e demandas
- **ficha_COIxxx.html** — Fichas individuais por projeto
- **coi_base_dados.xlsx** — Base de dados auxiliar (fonte de verdade)

---

## 2. Como Cadastrar Projetos

### 2.1 Quando Cadastrar
Um projeto deve ser cadastrado sempre que uma iniciativa atender a pelo menos um dos seguintes critérios:
- Envolve desenvolvimento, implantação ou evolução de sistema
- Tem prazo definido e responsável técnico designado
- Gera impacto operacional, contratual ou estratégico para o COI
- Foi formalmente solicitado por área interna ou órgão externo

### 2.2 Campos Obrigatórios
Ao cadastrar um novo projeto, os seguintes campos são obrigatórios:

| Campo | Orientação |
|---|---|
| **ID** | Sequencial: COI-009, COI-010... (nunca reutilizar IDs) |
| **Nome do Projeto** | Nome oficial. Evitar siglas sem explicação. |
| **Classificação** | Ver seção 4 |
| **Prioridade** | Ver seção 5 |
| **Status** | Ver seção 6 |
| **Fase Atual** | Concepção / Planejamento / Execução / Homologação / Produção / Encerramento |
| **Responsável COI** | Nome completo do gestor técnico designado |
| **Sistema / Plataforma** | Tecnologias envolvidas (ex: CITSmartX / APIs) |
| **Data Início** | Data formal de início (DD/MM/AAAA) |
| **Prazo Previsto** | Data de entrega prevista (DD/MM/AAAA) |
| **Fonte da Informação** | Ver seção 8 |

### 2.3 Campos Complementares Recomendados
- Patrocinador: responsável executivo que aprova o projeto
- Cliente / Órgão: área demandante interna ou órgão externo
- Benefício Esperado: descrever o ganho esperado (operacional, financeiro, estratégico)
- Impacto Contratual: informar se há SLA, cláusula contratual ou risco de multa envolvido
- Dependências: listar projetos ou sistemas que bloqueiam ou são bloqueados

### 2.4 Como Criar uma Nova Ficha Individual
Ao cadastrar um novo projeto, copiar o arquivo `ficha_COI001.html` como modelo e renomear para `ficha_COIxxx.html`. Atualizar todos os campos do cabeçalho e blocos internos com os dados do novo projeto.

---

## 3. Como Atualizar o Status dos Projetos

### 3.1 Frequência de Atualização

| Tipo de Projeto | Frequência Mínima |
|---|---|
| Projetos P0 (Críticos) | Semanal |
| Projetos P1 (Alta prioridade) | Quinzenal |
| Projetos P2 e P3 | Mensal |

### 3.2 O Que Atualizar em Cada Revisão
- **Status atual** — verificar se houve mudança de fase
- **% de Conclusão** — percentual real com base nas entregas realizadas
- **Semáforo** — ajustar conforme critérios abaixo
- **Atividades Realizadas** — listar o que foi entregue desde a última atualização
- **Próximos Passos** — atualizar marcos futuros com datas e responsáveis
- **Riscos** — revisar riscos ativos e incluir novos se identificados
- **Pendências** — registrar itens em aberto com responsável e prazo
- **Observações Executivas** — campo livre para alertas à diretoria
- **Fonte da Informação** — registrar a origem da atualização
- **Última Atualização** — sempre registrar a data da revisão

### 3.3 Critério de Semáforo

| Semáforo | Critério |
|---|---|
| 🟢 No Prazo | Projeto dentro do cronograma, sem riscos críticos ativos |
| 🟡 Atenção | Atraso de até 15 dias, ou risco alto identificado, ou pendência bloqueante |
| 🔴 Crítico | Atraso superior a 15 dias, risco crítico ativo, impacto contratual iminente, ou projeto suspenso sem previsão de retorno |

---

## 4. Classificação de Projetos

| Classificação | Descrição |
|---|---|
| **Estratégico** | Iniciativa de alto impacto para o COI ou órgão demandante. Vinculada a objetivos estratégicos institucionais. |
| **Operacional** | Projeto de sustentação, manutenção ou operação contínua de sistemas existentes. |
| **Melhoria** | Evolução incremental de funcionalidade ou processo já existente. |
| **Incidente Relevante** | Projeto originado de incidente crítico que exigiu resposta estruturada e acompanhamento formal. |
| **Automação** | Iniciativa de automação de processos (RPA, scripts, agentes inteligentes). |
| **Integração** | Projeto focado em conectar sistemas, APIs ou plataformas distintas. |

---

## 5. Classificação de Prioridades

| Prioridade | Nível | Critério |
|---|---|---|
| **P0** | Crítica | Impacto imediato em serviços essenciais, risco contratual ativo, ou determinação da diretoria. Exige resposta imediata. |
| **P1** | Alta | Projeto estratégico com prazo definido, impacto relevante em processos críticos, ou dependência de outros projetos P0. |
| **P2** | Média | Projeto importante com prazos flexíveis, sem impacto imediato em operações críticas. |
| **P3** | Baixa | Projeto de melhoria incremental, baixo impacto operacional, sem urgência definida. |

**Regra geral:** A prioridade deve ser revisada a cada ciclo de atualização. Um projeto pode ser escalado (ex: P2 → P1) se houver mudança de contexto, risco ou determinação da diretoria.

---

## 6. Status Permitidos

| Status | Descrição |
|---|---|
| **Planejamento** | Projeto em fase de escopo, aprovações e definições iniciais. Ainda não iniciado. |
| **Em andamento** | Execução ativa. Atividades em curso com responsável designado. |
| **Homologação** | Entrega técnica concluída. Em validação pelo cliente ou área demandante. |
| **Produção** | Sistema ou solução implantado e operando em ambiente produtivo. |
| **Concluído** | Projeto formalmente encerrado com aceite do cliente. |
| **Suspenso** | Projeto paralisado por decisão executiva, restrição técnica ou dependência externa. Deve conter justificativa e previsão de retorno (se houver). |

---

## 7. Como Registrar Riscos

### 7.1 Quando Registrar um Risco
Registrar sempre que identificar uma situação que possa comprometer o prazo, custo, qualidade ou continuidade do projeto.

### 7.2 Campos Obrigatórios do Risco

| Campo | Orientação |
|---|---|
| **Probabilidade** | Alta / Média / Baixa — avaliação qualitativa da chance de ocorrência |
| **Impacto** | Alto / Médio / Baixo — avaliação qualitativa das consequências |
| **Nível (Matriz)** | Resultado da combinação Probabilidade × Impacto (ver abaixo) |
| **Plano de Mitigação** | Ações concretas para reduzir probabilidade ou impacto |
| **Responsável** | Quem monitora e executa o plano de mitigação |
| **Prazo de Mitigação** | Data limite para a ação de mitigação |

### 7.3 Matriz de Nível de Risco

|  | Impacto Alto | Impacto Médio | Impacto Baixo |
|---|---|---|---|
| **Prob. Alta** | 🔴 Crítico | 🔴 Alto | 🟡 Médio |
| **Prob. Média** | 🔴 Alto | 🟡 Médio | 🟢 Baixo |
| **Prob. Baixa** | 🟡 Médio | 🟢 Baixo | 🟢 Baixo |

### 7.4 Status do Risco
- **Identificado** — risco mapeado, ainda sem plano formal
- **Mitigando** — plano de ação em execução
- **Aceito** — risco aceito formalmente pela gestão (sem mitigação ativa)
- **Encerrado** — risco materializado e tratado, ou situação eliminada

---

## 8. Fonte da Informação

Toda atualização de projeto deve registrar sua origem. Opções válidas:

| Fonte | Descrição |
|---|---|
| **Reunião** | Informação obtida em reunião de acompanhamento, comitê ou alinhamento |
| **E-mail** | Atualização recebida via e-mail de responsável ou área |
| **Evidência Técnica** | Log, print, relatório técnico ou evidência direta do sistema |
| **Relatório** | Relatório formal emitido pela equipe ou fornecedor |
| **Painel** | Informação extraída diretamente de painel de monitoramento (AIOps, Grafana, etc.) |
| **Solicitação Direta** | Comunicação verbal ou formal do responsável ou diretoria |

---

## 9. Como Atualizar Indicadores (KPIs)

### 9.1 Frequência
Indicadores devem ser atualizados mensalmente, ou com frequência maior quando vinculados a projetos P0.

### 9.2 Campos do Indicador

| Campo | Orientação |
|---|---|
| **Meta** | Valor-alvo definido no início do ciclo |
| **Realizado** | Valor medido no período de referência |
| **Variação** | Diferença entre realizado e meta (usar fórmula no Excel) |
| **Tendência** | ↑ Melhora / ↓ Piora / → Estável — avaliar em relação ao período anterior |
| **Semáforo** | 🟢 ≥ meta / 🟡 entre 80% e 99% da meta / 🔴 abaixo de 80% da meta |
| **Período** | Mês/Ano de referência (ex: Jun/2026) |

---

## 10. Como Preparar o Status Report Executivo

O Status Report é o documento de comunicação formal do COI para a diretoria. Deve ser produzido mensalmente ou sob demanda.

### 10.1 Estrutura Padrão do Status Report

1. **Sumário Executivo** — visão geral do portfólio em 3 a 5 linhas
2. **Cards de Visão Geral** — total de projetos, em andamento, críticos, concluídos, demandas abertas, riscos altos
3. **Projetos em Destaque** — projetos P0 e P1 com semáforo atualizado
4. **Alertas e Pendências** — itens que requerem decisão ou atenção da diretoria
5. **Próximas Entregas** — marcos previstos nos próximos 30 dias
6. **Riscos Críticos Ativos** — top 5 riscos com plano de mitigação
7. **Indicadores do Período** — KPIs com meta x realizado e tendência

### 10.2 Checklist de Validação Antes de Publicar

- [ ] Todos os projetos P0 e P1 foram revisados na semana
- [ ] Semáforos conferem com o status real de cada projeto
- [ ] % de conclusão está atualizado e coerente
- [ ] Riscos críticos possuem plano de mitigação registrado
- [ ] Pendências possuem responsável e prazo definidos
- [ ] Indicadores do mês foram atualizados
- [ ] Fonte da Informação registrada em todas as atualizações
- [ ] Observações Executivas preenchidas nos projetos com alerta

### 10.3 Responsabilidades

| Papel | Responsabilidade |
|---|---|
| **Gestor de Projeto** | Atualizar ficha individual do projeto no prazo definido |
| **PMO COI** | Consolidar as informações e validar o painel antes da publicação |
| **Coordenação COI** | Revisar alertas executivos e aprovar o Status Report |
| **Diretoria** | Receber o Status Report e tomar decisões com base nos alertas |

---

## 11. Boas Práticas

- Nunca inventar dados. Quando não houver informação, registrar "Aguardando confirmação" com data limite.
- Usar linguagem executiva e objetiva. Evitar jargões técnicos nas observações para diretoria.
- Manter a data de "Última Atualização" sempre preenchida.
- Registrar decisões formalmente na aba "Decisões" para rastreabilidade.
- Qualquer mudança de prioridade (escalada ou rebaixamento) deve ser registrada com justificativa.

---

*Documento mantido pelo PMO Digital do COI — Centro de Operações Integradas*
*Versão 1.0 — Junho de 2026*
