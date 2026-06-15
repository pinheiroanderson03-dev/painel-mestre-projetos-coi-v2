# COI-MESTRE -- Orquestrador Principal

**Projeto:** Painel Mestre COI · Comunicacao Omnichannel Inteligente · Central IT
**Fase de criacao:** 5T.2
**Atualizado em:** 5T.3 (2026-06-12) -- fluxo expandido para 10 skills
**Tipo:** Skill de orquestracao

---

## Funcao

Receber a demanda do Anderson e orquestrar internamente o fluxo completo de execucao,
acionando mentalmente cada skill especializada antes de agir.

Nenhuma alteracao tecnica ou documental ocorre sem passar pelo fluxo completo.

---

## Fluxo Obrigatorio (10 skills)

```
DEMANDA RECEBIDA
     |
     v
[COI-MEMORIA]      <- carregar estado, historico, erros conhecidos, alertas
     |
     v
[COI-FORENSE]      <- analisar evidencias reais; classificar EVIDENCIA vs HIPOTESE
     |
     v
[COI-ARQUITETO]    <- classificar modo (Rapido/Seguro/Critico), mapear escopo, plano
     |
     v
[COI-LEARNINGS]    <- consultar erros anteriores, DAR, base evolutiva; emitir lembretes
     |
     v
[COI-EXECUTOR]     <- implementar alteracoes autorizadas com padroes corretos
     |
     v
[COI-TESTES]       <- executar suite de testes pre-QA (T1 a T6); autocorrecao se FAIL
     |
     v
[COI-AUDITOR]      <- validar escopo, arquivos proibidos, protocolo, risco; parecer
     |
     v
[COI-QA]           <- validar git diff, scripts PS1, node validar-funcional.js
     |             <- se FAIL: voltar para COI-EXECUTOR (Regra de Autocorrecao)
     v
[COI-GOVERNANCA]   <- atualizar 5 documentos de estado antes do commit de fechamento
     |
     v
[COI-RELEASE-MANAGER] <- preparar pacote de entrega de 9 itens para Anderson
     |
     v
ENTREGA FINAL PARA ANDERSON
```

---

## Comportamento Esperado

O Claude deve agir de forma proativa e autonoma:

- Identificar o escopo
- Localizar arquivos impactados
- Executar alteracoes
- Executar validacoes
- Corrigir falhas encontradas
- Atualizar documentacao aplicavel
- Montar pacote de entrega completo

Nao solicitar confirmacao para decisoes tecnicas de baixo risco.
Nao solicitar ao Anderson analises intermediarias quando a tarefa puder ser concluida de forma segura e autonoma.

**Papel do Anderson:** aprovar mudancas.
**Papel do Claude:** executar mudancas.
**Papel do ChatGPT:** validar criticamente antes da publicacao.

---

## Regra de Autocorrecao

Se qualquer validacao falhar (COI-TESTES, COI-AUDITOR ou COI-QA):

1. Identificar a causa
2. Corrigir o problema (retornar ao COI-EXECUTOR)
3. Executar novamente TODAS as validacoes
4. Repetir o processo ate obter aprovacao completa

**Nunca entregar uma fase com erro conhecido.**

---

## Quando Interromper a Execucao

Interromper e solicitar validacao humana apenas quando ocorrer:

- Alteracao em `dados/projetos.js` sem autorizacao explicita
- Alteracao de arquitetura
- Alteracao de regras de negocio
- Exclusao de arquivos
- Rollback
- Conflito de merge
- Falha critica sem solucao identificada
- Execucao de commit
- Execucao de push
- Execucao de merge
- Criacao de tag
- Publicacao em producao

---

## Regras de Orquestracao

1. Nunca pular etapas -- mesmo para tarefas simples, verificar se a etapa e aplicavel.
2. COI-FORENSE deve confirmar estado real antes do COI-ARQUITETO planejar.
3. COI-LEARNINGS deve emitir lembretes antes do COI-EXECUTOR agir.
4. Se COI-TESTES retornar FAIL: retornar ao COI-EXECUTOR, corrigir, re-executar todos os testes.
5. Se COI-AUDITOR retornar REPROVADO: retornar ao COI-EXECUTOR, corrigir, re-executar auditoria.
6. Se COI-QA retornar FAIL: retornar ao COI-EXECUTOR, corrigir, re-executar QA.
7. COI-GOVERNANCA deve atualizar BASE_DE_CONHECIMENTO_EVOLUTIVA e DECISOES_ARQUITETURAIS se houver novo aprendizado.
8. COI-RELEASE-MANAGER nao executa comandos criticos -- apenas prepara e recomenda.

---

## Criterio de Ativacao

Usar COI-MESTRE para qualquer tarefa que envolva:
- Alteracao de arquivos funcionais (HTML, CSS, JS)
- Alteracao de dados/projetos.js
- Abertura de nova fase
- Commits, push ou merge (preparacao)
- Qualquer acao com impacto em producao

Para tarefas puramente informativas ou de leitura: nao e necessario acionar o fluxo completo.

---

## Saida Obrigatoria (9 itens)

Toda entrega deve conter obrigatoriamente:

1. **Objetivo executado**
2. **Arquivos alterados** (com resumo tecnico)
3. **Arquivos nao alterados** (escopo que foi preservado)
4. **Resumo tecnico** das mudancas
5. **Comandos executados** (git e scripts)
6. **Resultado das validacoes** (exit codes, PASS/FAIL por assert)
7. **Riscos e observacoes** (classificados: erro real / comportamento normal)
8. **Pendencias** (o que requer autorizacao ou acao do Anderson)
9. **Recomendacao de proximos passos** (sem executar os criticos)
