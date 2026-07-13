# CCL Examples -- Exemplos Reais no Projeto COI
# Versao v1.0 (Fase R3)

Todos os exemplos abaixo sao baseados em situacoes reais do projeto COI.

---

## COI EXEC

### Executar Fase R3 (CCL Infrastructure)
```
COI EXEC R3 --modo FAST
```
- Ativa: COI-MESTRE -> COI-MEMORIA -> COI-FORENSE -> COI-ARQUITETO -> COI-LEARNINGS -> COI-EXECUTOR
- Cria: commands/grammar.md, commands/parser.md, commands/commands.json, commands/aliases.json, commands/examples.md
- Atualiza: .claude/RUNTIME.md, STATUS.md, INDEX.md, registry/commands.json, AGENTS.md
- Resultado: 5 novos arquivos + 5 atualizados; 293 PASS / 0 FAIL

### Executar Fase 6.4 (COI Daily) em modo seguro
```
COI EXEC 6.4 --modo SAFE
```
- Pausa antes de cada arquivo modificado
- Confirmar antes de criar scripts/coi-daily.js

### Executar apenas documentacao de uma fase
```
COI EXEC R3 --escopo docs
```
- Limita execucao a arquivos em docs/ e governanca

---

## COI UPDATE

### Atualizar estado do Registry apos nova fase
```
COI UPDATE registry --modo FAST
```
- Atualiza registry/runtime.json, registry/phases.json
- Resultado: JSON valido; git diff --check limpo

### Atualizar dados operacionais (requer autorizacao Anderson)
```
COI UPDATE dados --modo CRITICAL
```
- Para antes de qualquer alteracao em dados/projetos.js
- Sinaliza para ChatGPT review
- Nunca executar sem autorizacao explicita

### Atualizar RUNTIME apos Fase R3
```
COI UPDATE runtime
```
- Atualiza .claude/RUNTIME.md com VERSAO=v1.8.0, FASE_ATUAL=R3 concluida
- Atualiza STATUS.md com nova linha na tabela de fases

---

## COI QA

### Validacao completa pre-commit
```
COI QA
```
- Executa: node scripts/validar-funcional.js -> 293 PASS / 0 FAIL
- Executa: git diff --check -> limpo
- Executa: node --check scripts/*.js -> sem erros de sintaxe
- Executa: node -e JSON.parse para todos registry/*.json -> 9/9 OK

### Validar apenas arquivos JSON
```
COI QA --escopo json
```
- Valida: registry/*.json, commands/commands.json, commands/aliases.json
- Resultado esperado: todos OK

---

## COI REVIEW

### Auditoria pre-commit de uma fase
```
COI REVIEW R3 --modo SAFE
```
- Lista todos os arquivos modificados por git diff --name-only
- Verifica conformidade com registry/rules.json
- Confirma que dados/projetos.js nao foi tocado sem autorizacao
- Confirma que branch != publicacao-demandas-central-df
- Entrega: relatorio de conformidade APROVADO ou PENDENCIAS

### Auditoria express pre-push
```
COI REVIEW --modo CRITICAL
```
- Pausa + sinaliza ChatGPT review
- Util antes de autorizar push para branch remota

---

## COI DOC

### Atualizar governanca apos Fase R3
```
COI DOC --escopo governance
```
- Atualiza: CHANGELOG.md (nova entrada v1.8.0)
- Atualiza: ROADMAP_COI.md (R3 marcada como CONCLUIDA)
- Atualiza: docs/ESTADO_ATUAL_DO_PROJETO.md (nova linha R3)
- Atualiza: docs/MEMORIA_OPERACIONAL_PROJETO.md (nova linha R3)
- Resultado: 4-5 docs atualizados; sem erros de encoding

### Atualizar secao de AGENTS.md
```
COI DOC --escopo agents
```
- Adiciona Secao 19 (CCL) ao AGENTS.md
- Resultado: AGENTS.md com nova secao

---

## COI REL

### Gerar release v1.8.0
```
COI REL v1.8.0
```
- Prepend em CHANGELOG.md: ## [v1.8.0] -- 2026-07-13
- Prepend em RELEASE_NOTES.md: # v1.8.0
- Documenta: Fase R3 (CCL), arquivos criados, melhorias

---

## COI STATUS

### Ver estado atual do projeto
```
COI STATUS
```
Saida esperada:
```
VERSAO    : v1.7.1
BRANCH    : fase-5c-2-atualizacao-coi-009-aiops
COMMIT    : 3a71c5e
VALIDADOR : 293 PASS / 0 FAIL / 13 secoes
PENDENTES : sim (fases 5B.4 a R3)
PROXIMA   : 6.4 (COI Daily)
```

### Ver resumo compacto
```
COI STATUS --formato resumo
```
- Uma linha por campo critico
- Util no inicio rapido de sessao

---

## COI RUNTIME

### Atualizar runtime apos Fase R3
```
COI RUNTIME --versao v1.8.0 --fase R3
```
- .claude/RUNTIME.md: VERSAO=v1.8.0, FASE_ATUAL=R3 concluida, PROXIMA=6.4
- STATUS.md: nova linha R3 na tabela de fases
- registry/runtime.json: versao e faseAtual atualizados

---

## COI REGISTRY

### Validar todos os registros
```
COI REGISTRY validate
```
- node -e JSON.parse para cada um dos 9 arquivos registry/*.json
- Resultado: 9/9 OK (ou lista de erros)

### Atualizar registro de fases
```
COI REGISTRY update phases
```
- Abre registry/phases.json, adiciona entrada para Fase R3

---

## COI TEST

### Executar suite completa
```
COI TEST
```
- node scripts/validar-funcional.js
- Resultado: 293 PASS / 0 FAIL / 13 secoes

### Testar apenas Secao 13 (COI Auditor)
```
COI TEST --secao S13
```
- Filtra saida para linhas S13-XX
- Resultado esperado: 42 PASS

---

## COI RELEASE

### Preparar pacote completo v1.8.0
```
COI RELEASE v1.8.0 --modo SAFE
```
Entrega 9 itens:
1. Branch: fase-5c-2-atualizacao-coi-009-aiops
2. Arquivos criados: 5 (commands/)
3. Arquivos alterados: 5 (RUNTIME, STATUS, INDEX, registry/commands, AGENTS)
4. Comandos executados: COI EXEC R3, COI QA, COI DOC, COI REL
5. Validacoes: 293 PASS / 0 FAIL; git diff --check limpo; JSON 9/9 OK
6. Erros: nenhum
7. Pendencias: git add + commit (autorizacao Anderson)
8. Proximos passos: COI COMMIT PREP -> Anderson aprova -> git add + commit
9. Recomendacoes: COI EXEC 6.4 como proxima fase

---

## COI COMMIT PREP

### Preparar lista de arquivos para commit apos Fase R3
```
COI COMMIT PREP --fase R3
```
Saida:
```
ARQUIVOS PARA GIT ADD (aguardando autorizacao Anderson):
git add commands/grammar.md
git add commands/parser.md
git add commands/commands.json
git add commands/aliases.json
git add commands/examples.md
git add .claude/RUNTIME.md
git add STATUS.md
git add INDEX.md
git add registry/commands.json
git add AGENTS.md

MENSAGEM DE COMMIT SUGERIDA:
feat(R3): implementa COI Command Language (CCL) v1.0

- Cria commands/ com grammar, parser, commands.json, aliases, examples
- Atualiza RUNTIME.md, STATUS.md, INDEX.md com referencia CCL
- Atualiza registry/commands.json com categoria ccl (12 comandos)
- Adiciona Secao 19 (CCL) ao AGENTS.md
- 293 PASS / 0 FAIL / 13 secoes

AVISO: NAO EXECUTAR sem autorizacao explicita de Anderson.
```

---

## Composicao -- Fluxo completo de uma fase

```
# 1. Implementar
COI EXEC R3 --modo FAST

# 2. Validar
COI QA

# 3. Revisar conformidade
COI REVIEW R3

# 4. Atualizar governanca
COI DOC --escopo governance

# 5. Gerar release
COI REL v1.8.0

# 6. Atualizar runtime
COI RUNTIME --versao v1.8.0 --fase R3

# 7. Preparar commit (sem executar)
COI COMMIT PREP --fase R3

# 8. Aguardar Anderson -> git add + git commit
```
