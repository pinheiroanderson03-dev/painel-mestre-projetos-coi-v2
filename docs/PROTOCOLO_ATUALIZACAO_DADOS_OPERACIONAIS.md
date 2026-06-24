# PROTOCOLO DE ATUALIZAÇÃO DE DADOS OPERACIONAIS — COI

Comunicação Omnichannel Inteligente · Central IT

> Define o fluxo completo e as regras de autorização para atualização de `dados/projetos.js` por meio do agente COI-CURADOR-DEMANDAS-PROJETOS.
> Toda atualização de dados operacionais deve seguir este protocolo.

---

## 1. Princípios Fundamentais

1. **Nenhum dado entra em `dados/projetos.js` sem prévia aprovada por Anderson.**
2. **O curador gera JSON — o COI-EXECUTOR aplica — somente após autorização explícita.**
3. **Campos não mencionados na entrada nunca são sobrescritos.**
4. **IDs são imutáveis após criação.**
5. **Commit e push requerem autorização explícita de Anderson — nunca automáticos.**
6. **A branch `publicacao-demandas-central-df` nunca é tocada.**

---

## 2. Quando Usar Este Protocolo

| Situação | Usar? |
|---|---|
| Criar nova demanda, incidente, licença ou atividade | Sim |
| Atualizar campos de item existente (status, responsável, prazo, etc.) | Sim |
| Concluir uma demanda ou incidente | Sim |
| Atualizar projetos estratégicos (COI-001 a COI-008) | Sim — com escopo explicitamente autorizado |
| Corrigir typo em campo de texto | Sim |
| Alterar `meta.versao` em dados/projetos.js | Não — controlado por fases de release |
| Remover/excluir registro | Não — requer autorização especial fora deste protocolo |

---

## 3. Fluxo Completo de Atualização

```
FASE 1 — ENTRADA
  Anderson fornece informação (texto livre, formulário ou comando direto)

FASE 2 — INTERPRETAÇÃO (COI-CURADOR)
  Curador identifica tipo, classifica campos, detecta lacunas
  Se campos obrigatórios faltam → Modo Assistido: curador pergunta
  Se informação completa → gera PRÉVIA diretamente

FASE 3 — PRÉVIA (COI-CURADOR)
  Curador apresenta:
    - Resumo em tabela (campos antes/depois para atualização)
    - Bloco JSON completo pronto para inserção
    - Alerta se algum campo conflita com regras
  Aguarda: "sim", "ajuste X", ou "cancela"

FASE 4 — VALIDAÇÃO PRÉVIA (Anderson)
  Anderson revisa a prévia e:
    a) Confirma → protocolo avança para Fase 5
    b) Solicita ajuste → curador corrige e reapresenta a prévia
    c) Cancela → nenhum arquivo é alterado

FASE 5 — APLICAÇÃO (COI-EXECUTOR)
  COI-EXECUTOR aplica o JSON aprovado em dados/projetos.js
  Regras obrigatórias:
    - Ler o arquivo completo antes de qualquer alteração
    - Inserir no array correto (projetos[])
    - Para atualização: localizar por ID, alterar apenas campos aprovados
    - Preservar formatação e comentários existentes
    - Não alterar meta.versao

FASE 6 — VALIDAÇÃO TÉCNICA (COI-QA)
  Executar: node scripts/validar-funcional.js
  Critério de aprovação: 0 FAIL (qualquer FAIL bloqueia o commit)
  Se FAIL:
    - Identificar causa
    - Corrigir
    - Re-executar validação
    - Reportar a Anderson

FASE 7 — STAGING E COMMIT (requer autorização Anderson)
  git add dados/projetos.js
  git commit -m "curador: <tipo> <ID> — <descrição resumida> (5C.1)"

  Commit NUNCA é executado sem autorização explícita de Anderson.

FASE 8 — PUSH (requer autorização Anderson)
  git push
  Push NUNCA é executado sem autorização explícita de Anderson.
```

---

## 4. Formato da Prévia

Para **criação** de novo item:

```
[PRÉVIA — CRIAÇÃO — aguardando aprovação]

ID proposto: COI-NNN
Nome: ...
Tipo: ...
Status: ...
Prioridade: ...
Frente: ...
Responsável: ...
Data de Solicitação: ...
[outros campos informados]

JSON a inserir em dados/projetos.js:
{
  "id": "COI-NNN",
  ...
}

Confirma publicação? (sim / ajuste / cancela)
```

Para **atualização** de item existente:

```
[PRÉVIA — ATUALIZAÇÃO COI-NNN — aguardando aprovação]

| Campo           | Antes                | Depois               |
|-----------------|----------------------|----------------------|
| status          | Em andamento         | Concluído            |
| dataResolucao   | —                    | 23/06/2026           |
| atualizadoEm    | 15/06/2026           | 23/06/2026           |

Campos não alterados: id, nome, prioridade, tipoItem, frente, responsavel, ...

Confirma publicação? (sim / ajuste / cancela)
```

Para **conclusão** de item:

```
[PRÉVIA — CONCLUSÃO COI-NNN — aguardando aprovação]

Item: <nome do item>
Alterações aplicadas:
  - status: 'Concluído'
  - percentual: 100
  - dataResolucao: <hoje ou data informada>
  - atualizadoEm: <hoje>

Confirma conclusão? (sim / cancela)
```

---

## 5. Regras de Validação Obrigatórias

### 5.1 Antes de gerar a prévia

- [ ] Verificar o próximo ID disponível em dados/projetos.js (para criação)
- [ ] Confirmar que o ID informado existe (para atualização/conclusão)
- [ ] Validar que `status` é um dos 6 permitidos
- [ ] Validar que `prioridade` é P0, P1, P2 ou P3
- [ ] Validar que `tipoItem` é um dos tipos suportados
- [ ] Validar que `dataSolicitacao` está em formato DD/MM/AAAA
- [ ] Validar que `prazoResolucao` e `dataResolucao` estão em formato YYYY-MM-DD (input date)

### 5.2 Após aplicação em dados/projetos.js

- [ ] `node scripts/validar-funcional.js` retorna 0 FAIL
- [ ] Array `projetos[]` segue o padrão de vírgulas e chaves
- [ ] Nenhum campo de outros registros foi alterado
- [ ] `meta.versao` não foi alterado

---

## 6. Mensagens de Commit Padronizadas

```
curador: nova demanda COI-014 — Integração WhatsApp SES (5C.1)
curador: atualização COI-010 — status Concluído (5C.1)
curador: conclusão COI-011 — Incidente Nuvidio encerrado (5C.1)
curador: atualização COI-009 — renovação licença AIOps (5C.1)
```

Formato: `curador: <ação> <ID> — <descrição> (<fase>)`

---

## 7. Controle de Autorização

| Ação | Quem autoriza | Quando |
|---|---|---|
| Gerar prévia | Anderson (implícito pelo envio da entrada) | A cada entrada recebida |
| Aplicar JSON em dados/projetos.js | Anderson (explícito: "sim" ou "confirma") | Após revisar a prévia |
| Executar git add | Anderson (explícito) | Após validação técnica passar |
| Executar git commit | Anderson (explícito) | Após staging |
| Executar git push | Anderson (explícito) | Após commit |

---

## 8. Situações de Bloqueio

| Situação | Ação |
|---|---|
| Campo obrigatório ausente e Anderson não responde após 2 perguntas | Apresentar prévia com campo em branco, sinalizar lacuna |
| Validação técnica retorna FAIL | Não avançar — corrigir e revalidar |
| ID informado não existe | Alertar Anderson e aguardar correção |
| ID proposto já existe (conflito) | Propor próximo ID disponível |
| Alteração em campos fora do escopo autorizado | Parar, comunicar, aguardar autorização |
| Erro de parse em dados/projetos.js após edição | Reverter, reportar, aguardar instrução de Anderson |

---

## 9. Rastreabilidade

Cada operação do curador gera ao final um registro de auditoria:

```
[AUDITORIA CURADOR 5C.1]
Data: 23/06/2026
Operação: Criação
ID: COI-014
Campos alterados: id, nome, status, prioridade, tipoItem, frente, responsavel, solicitante, origem, dataSolicitacao, categoriaOperacional, percentual, atualizadoEm
Aprovado por: Anderson
Validação técnica: 93 PASS / 0 FAIL
Commit: pendente
```

---

## 10. Referências

| Documento | Conteúdo |
|---|---|
| `docs/AGENTE_CURADOR_DEMANDAS_PROJETOS.md` | Papel, modos, campos, regras, exemplos |
| `docs/MODELO_ENTRADA_DEMANDAS_PROJETOS.md` | Formulários e exemplos de entrada |
| `dados/projetos.js` | Fonte de dados authoritative |
| `.claude/skills/COI-EXECUTOR.md` | Regras de implementação segura |
| `.claude/skills/COI-QA.md` | Suite de validação técnica |
| `AGENTS.md` — Seção 13 | Papel e limites do COI-CURADOR |

---

*Criado na Fase 5C.1 — 2026-06-23*
*Última atualização: Fase 5C.1*
