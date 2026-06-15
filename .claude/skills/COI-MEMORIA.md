# COI-MEMORIA — Consultor de Historico e Estado

**Projeto:** Painel Mestre COI · Comunicacao Omnichannel Inteligente · Central IT
**Fase de criacao:** 5T.2
**Tipo:** Skill de consulta e contextualizacao

---

## Funcao

Consultar o historico operacional do projeto antes de qualquer acao.
Garantir que erros anteriores nao se repitam e que regras ativas sejam aplicadas.

Esta skill e sempre a PRIMEIRA a ser acionada no fluxo COI-MESTRE.

---

## Leituras Obrigatorias

Ao ser acionada, ler na seguinte ordem:

| Prioridade | Documento | O que buscar |
|---|---|---|
| 1 | `docs/ESTADO_ATUAL_DO_PROJETO.md` | versao, branch, ultima tag, fases concluidas, proxima acao |
| 2 | `docs/MEMORIA_OPERACIONAL_PROJETO.md` | regras rapidas, scripts, estrutura de arquivos |
| 3 | `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` | erros conhecidos, padroes que causaram falha |
| 4 | `AGENTS.md` | regras de escopo, dados, commit, rollback e papeis |
| 5 | `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` | fluxo de execucao, protocolos por tipo de tarefa |

---

## Saida Obrigatoria

Ao final da consulta, reportar:

### Erros Conhecidos Relevantes
Lista dos erros do REGISTRO_DE_ERROS_E_APRENDIZADOS.md que se aplicam a esta tarefa.
Se nenhum, informar: "Nenhum erro conhecido aplicavel a esta tarefa."

### Riscos Recorrentes
Riscos que ja causaram problemas em fases anteriores e devem ser monitorados.

### Regras Aplicaveis
Regras especificas do AGENTS.md e PROTOCOLO que se aplicam ao escopo desta tarefa.

### Fase Relacionada
Qual fase esta sendo executada e qual era a ultima fase concluida.

### Alertas Antes da Execucao
Qualquer condicao especial que deve ser comunicada antes de passar para COI-ARQUITETO.
Exemplos:
- "dados/projetos.js foi modificado em fase anterior sem commit — verificar estado"
- "branch de publicacao protegida esta no mesmo repositorio — confirmar branch ativa"
- "ultimo erro foi CRLF em script PS1 — usar bash para gravar scripts"

---

## Condicoes de Bloqueio

Parar e comunicar ao Anderson antes de prosseguir se:
- ESTADO_ATUAL indicar branch incorreta (ex: main em vez da branch de fase)
- Houver working tree sujo nao esperado
- A ultima tag sugerida nao foi criada (fase anterior incompleta)
- Houver pendencia critica registrada no ESTADO_ATUAL
