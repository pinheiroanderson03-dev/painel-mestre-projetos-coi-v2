# COI-TESTES -- Executor de Testes Funcionais e de Regressao

**Projeto:** Painel Mestre COI - Centro de Operacoes Integradas - GDF
**Fase de criacao:** 5T.3 (2026-06-12)
**Tipo:** Skill de testes pre-QA
**Posicao no fluxo:** Depois de COI-EXECUTOR, antes de COI-AUDITOR

---

## Funcao

Executar todas as validacoes possiveis antes do QA.
Consolidar resultados por categoria.
Identificar falhas antes que cheguem ao COI-AUDITOR e COI-QA.
Aplicar a Regra de Autocorrecao: se falhar, retornar para COI-EXECUTOR.

---

## Suite de Testes

### T1 -- Validacao Funcional Multiplataforma

```bash
node scripts/validar-funcional.js
```

- Esperado: 40/40 PASS -- exit code 0
- Se FAIL: identificar assert com falha, corrigir, re-executar
- Classifica como: PASS / WARN / FAIL

### T2 -- Verificacao Sintatica de Arquivos JS Modificados

Para cada arquivo .js alterado nesta fase:
```bash
node --check <arquivo>
```

- Esperado: sem erros de sintaxe
- Executar em: dados/projetos.js, scripts/validar-funcional.js, qualquer .js modificado
- Classifica como: PASS / FAIL

### T3 -- Verificacao de Padroes Proibidos

```bash
grep -rn "innerHTML\s*=" index.html portfolio.html projetos/ficha.html
grep -rn "eval(" index.html portfolio.html projetos/ficha.html
grep -rn "innerHTML\s*=\s*['\"]" assets/
```

- Esperado: 0 ocorrencias de innerHTML com dados externos
- Excecao permitida: innerHTML com string literal vazia em clearEl() -- nao se aplica
- Classifica como: PASS / FAIL

### T4 -- Verificacao de clearEl

```bash
grep -n "clearEl" index.html portfolio.html projetos/ficha.html
```

- Verificar que clearEl() esta sendo usado onde aplicavel
- Classifica como: INFO (nao bloqueia)

### T5 -- Integridade de Scripts PS1

```bash
grep -rn "[^\x00-\x7F]" scripts/*.ps1
```

- Esperado: 0 caracteres nao-ASCII nos scripts PowerShell
- Se encontrar: FAIL -- arquivo .ps1 tem caracteres fora do ASCII puro
- Classifica como: PASS / FAIL

### T6 -- Verificacao de Estrutura de Arquivos Criticos

```bash
ls -la dados/ assets/ scripts/ .claude/skills/ docs/
```

- Verificar que nenhum arquivo critico foi removido ou renomeado
- Classifica como: PASS / FAIL

---

## Regra de Autocorrecao

Se qualquer teste retornar FAIL:

1. Identificar causa raiz
2. Retornar para COI-EXECUTOR com descricao do problema
3. COI-EXECUTOR corrige
4. COI-TESTES re-executa TODOS os testes (nao apenas o que falhou)
5. Repetir ate todos os testes passarem

**Nunca avancar para COI-AUDITOR com teste em FAIL.**

---

## Saida Obrigatoria

```
=== RELATORIO COI-TESTES ===
T1 - validar-funcional.js: [PASS/FAIL] -- <N>/40 asserts
T2 - node --check arquivos JS: [PASS/FAIL] -- <arquivos verificados>
T3 - padroes proibidos: [PASS/FAIL] -- <ocorrencias encontradas>
T4 - clearEl usage: [INFO] -- <ocorrencias>
T5 - ASCII em PS1: [PASS/FAIL] -- <arquivos verificados>
T6 - estrutura de arquivos: [PASS/FAIL]

Veredicto: APROVADO (0 FAIL) / REPROVADO (<N> FAIL -- retornar ao COI-EXECUTOR)
=== FIM TESTES ===
```

---

*Fase 5T.3 -- COI-TESTES -- Validacao pre-QA*
