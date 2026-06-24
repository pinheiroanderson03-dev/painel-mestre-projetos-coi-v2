# MODELO DE ENTRADA — DEMANDAS E PROJETOS COI

Comunicação Omnichannel Inteligente · Central IT

> Formulário e exemplos para entrada padronizada de informações ao agente COI-CURADOR-DEMANDAS-PROJETOS.
> Preencher parcialmente também é válido — o curador solicita os campos faltantes.

---

## Como usar

Copie o modelo correspondente ao tipo de item, preencha os campos disponíveis e envie ao curador. Campos marcados com `*` são obrigatórios. Os demais são opcionais — se não informados, o curador pergunta ou deixa em branco.

---

## Modelo 1 — Demanda

```
TIPO: Demanda

Nome*:
Solicitante*:
Responsável*:
Órgão/Cliente:
Frente*: [ ] AIOps  [ ] Omnichannel  [ ] Plataforma  [ ] Gestão  [ ] IA
Prioridade*: [ ] P0  [ ] P1  [ ] P2  [ ] P3
Status inicial: [ ] Planejamento  [ ] Em andamento  [ ] Suspenso
Origem: [ ] WhatsApp  [ ] E-mail  [ ] Chamado  [ ] Reunião  [ ] Outro: ____
Data de solicitação*:
Prazo de resolução (se houver):
Categoria operacional:
Observações / Contexto:
Número do chamado (se houver):
```

---

## Modelo 2 — Incidente

```
TIPO: Incidente

Nome do incidente*:
Sistema/Serviço afetado*:
Responsável pela investigação*:
Frente*: [ ] AIOps  [ ] Omnichannel  [ ] Plataforma  [ ] Gestão  [ ] IA
Prioridade*: [ ] P0  [ ] P1  [ ] P2  [ ] P3
Status atual*: [ ] Em andamento  [ ] Homologação  [ ] Concluído
Data de abertura*:
Data de resolução (se resolvido):
Órgão/Cliente impactado:
Número do chamado:
Causa raiz (se identificada):
Observações / Ações tomadas:
```

---

## Modelo 3 — Licença / Contrato

```
TIPO: Licença/Contrato

Nome do produto/serviço*:
Fornecedor*:
Responsável*:
Frente: [ ] AIOps  [ ] Omnichannel  [ ] Plataforma  [ ] Gestão  [ ] IA
Status*: [ ] Planejamento  [ ] Em andamento  [ ] Produção  [ ] Suspenso  [ ] Concluído
Prioridade: [ ] P0  [ ] P1  [ ] P2  [ ] P3
Data de solicitação:
Prazo de vencimento/renovação:
Valor (se aplicável):
Órgão/Cliente:
Número do chamado/processo:
Observações:
```

---

## Modelo 4 — Atividade Operacional

```
TIPO: Atividade Operacional

Nome da atividade*:
Responsável*:
Frente*: [ ] AIOps  [ ] Omnichannel  [ ] Plataforma  [ ] Gestão  [ ] IA
Prioridade: [ ] P0  [ ] P1  [ ] P2  [ ] P3
Status*: [ ] Planejamento  [ ] Em andamento  [ ] Concluído
Data de início:
Data de conclusão (se concluída):
Periodicidade (se recorrente):
Categoria:
Observações:
```

---

## Modelo 5 — Entrega Contratual

```
TIPO: Entrega Contratual

Nome da entrega*:
Contrato/Fornecedor*:
Responsável*:
Frente*: [ ] AIOps  [ ] Omnichannel  [ ] Plataforma  [ ] Gestão  [ ] IA
Status*: [ ] Planejamento  [ ] Em andamento  [ ] Homologação  [ ] Concluído
Prioridade: [ ] P0  [ ] P1  [ ] P2  [ ] P3
Prazo contratual*:
Data de entrega efetiva (se entregue):
Órgão/Cliente:
Evidência/Link de entrega:
Observações:
```

---

## Modelo 6 — Atualização de Item Existente

```
TIPO: Atualização

ID do item*: COI-___
Campos a alterar*:

  Campo: _______________  Novo valor: _______________
  Campo: _______________  Novo valor: _______________
  Campo: _______________  Novo valor: _______________

Motivo da atualização (opcional):
```

---

## Modelo 7 — Conclusão de Item Existente

```
TIPO: Conclusão

ID do item*: COI-___
Data de resolução (deixar em branco para usar a data de hoje):
Observações finais:
Evidência de conclusão (URL ou referência):
```

---

## Exemplos de Entrada em Texto Livre

O curador também aceita texto livre sem modelo. Exemplos:

**Exemplo 1 — Demanda simples:**
> "Cria uma demanda: recarga Gupshup de R$ 3.000. Urgente. Fábio cuida. Pedido da equipe de WhatsApp."

**Exemplo 2 — Incidente:**
> "Incidente no Nuvidio — sistema fora desde ontem à tarde. Thiago está investigando. Afeta o GDF. Abri chamado 89012."

**Exemplo 3 — Licença:**
> "Licença AIOps Solarwinds vence em 15/07. Precisa renovar. Responsável: Anderson. Chamado 518190 já aberto."

**Exemplo 4 — Conclusão:**
> "Fecha o COI-010. Recarga foi feita hoje."

**Exemplo 5 — Atualização de campo:**
> "Atualiza COI-011: status para Concluído, data de resolução 20/06/2026."

---

## Campos de Frente — Referência Rápida

| Frente | Sistemas / Contextos relacionados |
|---|---|
| `AIOps` | Monitoramento, Solarwinds, alertas, infraestrutura |
| `Omnichannel` | WhatsApp, chatbot, telefonia, AURA |
| `Plataforma` | CITSmart, portais, integrações, APIs |
| `Gestão` | Contratos, licenças, processos administrativos |
| `IA` | Projetos de inteligência artificial, automação cognitiva |

---

## Status — Referência Rápida

| Status | Quando usar |
|---|---|
| `Planejamento` | Demanda recebida, não iniciada |
| `Em andamento` | Trabalho em execução |
| `Homologação` | Aguardando validação/aprovação |
| `Produção` | Solução implantada, em uso |
| `Concluído` | Encerrada com sucesso |
| `Suspenso` | Pausada por decisão ou bloqueio |

---

*Criado na Fase 5C.1 — 2026-06-23*
*Última atualização: Fase 5C.1*
