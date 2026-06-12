# COI-MESTRE — Orquestrador Principal

**Projeto:** Painel Mestre COI · Centro de Operacoes Integradas · GDF
**Fase de criacao:** 5T.2
**Tipo:** Skill de orquestracao

---

## Funcao

Receber a demanda do Anderson e orquestrar internamente o fluxo completo de execucao,
acionando mentalmente cada skill especializada antes de agir.

Nenhuma alteracao tecnica ou documental ocorre sem passar pelo fluxo completo.

---

## Fluxo Obrigatorio

```
DEMANDA RECEBIDA
     |
     v
[COI-MEMORIA]      <- consultar historico, erros, regras, estado atual
     |
     v
[COI-ARQUITETO]    <- analisar escopo, impacto, risco, plano, rollback
     |
     v
[COI-EXECUTOR]     <- implementar alteracoes autorizadas
     |
     v
[COI-QA]           <- validar tudo antes de devolver
     |
     v
[COI-GOVERNANCA]   <- atualizar docs de estado antes do commit de fechamento
     |
     v
[COI-RELEASE-MANAGER] <- preparar pacote de entrega para Anderson
     |
     v
ENTREGA FINAL PARA ANDERSON
```

---

## Regras de Orquestracao

1. Nunca pular etapas do fluxo — mesmo para tarefas simples, ao menos verificar se a etapa e aplicavel.
2. Se COI-MEMORIA identificar risco alto: parar e comunicar antes de passar para COI-ARQUITETO.
3. Se COI-ARQUITETO identificar necessidade de alterar arquivo proibido: parar e comunicar.
4. Se COI-QA retornar FAIL: voltar para COI-EXECUTOR, corrigir, re-executar QA.
5. Se COI-GOVERNANCA identificar doc desatualizado: atualizar antes de passar para COI-RELEASE-MANAGER.
6. COI-RELEASE-MANAGER nao executa comandos criticos — apenas prepara e recomenda.

---

## Criterio de Ativacao

Usar COI-MESTRE para qualquer tarefa que envolva:
- alteracao de arquivos funcionais (HTML, CSS, JS)
- alteracao de dados/projetos.js
- abertura de nova fase
- commits, push ou merge (preparacao)
- qualquer acao com impacto em producao

Para tarefas puramente informativas ou de leitura: nao e necessario acionar o fluxo completo.

---

## Saida Esperada

Ao final do fluxo completo, entregar:
1. Branch atual
2. Arquivos criados
3. Arquivos alterados (com resumo tecnico)
4. Resumo das skills acionadas
5. Documentos atualizados
6. Comandos executados
7. Resultado das validacoes
8. Riscos ou avisos
9. Recomendacao de commit (sem executar)
