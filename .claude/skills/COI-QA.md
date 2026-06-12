# COI-QA — Validador de Qualidade

**Projeto:** Painel Mestre COI · Centro de Operacoes Integradas · GDF
**Fase de criacao:** 5T.2
**Tipo:** Skill de validacao e qualidade

---

## Funcao

Validar todas as alteracoes antes de devolver para Anderson/ChatGPT.
Executar o conjunto completo de validacoes e classificar cada resultado.
Bloquear entrega se houver FAIL real.

Esta skill e acionada APOS COI-EXECUTOR e ANTES de COI-GOVERNANCA.

---

## Suite de Validacao

Executar SEMPRE:

| Validacao | Comando | Plataforma | Classificacao de Saida |
|---|---|---|---|
| Estado do repositorio | `git status` | Qualquer | Informativo |
| Arquivos modificados | `git diff --name-only` | Qualquer | Informativo |
| Resumo das modificacoes | `git diff --stat` | Qualquer | Informativo |
| Problemas de formatacao | `git diff --check` | Qualquer | CRLF = normal; outro = erro |
| Validador funcional | `node scripts/validar-funcional.js` | Qualquer | exit 0 = PASS; exit 1 = FAIL |
| Validacao geral | `.\scripts\validar-projeto.ps1` | Windows/PS | Erros reais = FAIL; CRLF = normal |

Executar QUANDO HOUVER ALTERACAO EM docs/*.md ou *.md:

| Validacao | Comando | Plataforma |
|---|---|---|
| Validacao de docs | `.\scripts\validar-docs.ps1` | Windows/PS |

Executar QUANDO HOUVER ALTERACAO EM dados/projetos.js:

| Validacao | Comando | Plataforma |
|---|---|---|
| Validacao de dados | `.\scripts\validar-dados.ps1` | Windows/PS |
| Sintaxe JS | `node --check dados/projetos.js` | Qualquer |

---

## Classificacao dos Resultados

### PASS
- Validacao concluida sem erros reais
- Avisos de CRLF/trailing whitespace em Windows — classificar como NORMAL, nao como erro
- Arquivos nao rastreados (untracked) — informativo, nao e erro

### WARN
- Aviso que requer atencao mas nao bloqueia o commit
- Exemplos: arquivo novo nao rastreado, aviso de deprecacao em biblioteca

### FAIL (bloqueia commit)
- Qualquer erro de sintaxe em .js
- Arquivo obrigatorio ausente
- Padrao proibido encontrado (innerHTML vazio, style inline, variavel CSS inexistente)
- exit code 1 do validar-funcional.js
- Erro real em validar-projeto.ps1 (distinto de aviso CRLF)

---

## Saida Obrigatoria

```
=== RESULTADO COI-QA ===

node scripts/validar-funcional.js : [PASS|FAIL] — N/N asserts
git diff --check                   : [PASS|WARN] — (CRLF = normal)
git status                         : [informativo]
git diff --name-only               : [lista de arquivos]
git diff --stat                    : [resumo]
.\scripts\validar-projeto.ps1      : [PASS|FAIL|pendente execucao Windows]
.\scripts\validar-docs.ps1         : [PASS|FAIL|nao aplicavel|pendente execucao Windows]

BLOQUEIOS PARA COMMIT: [nenhum | lista]
EVIDENCIAS: [links para linhas relevantes ou saida resumida]
VEREDICTO: [APROVADO para entrega | BLOQUEADO — corrigir antes]
```

---

## Condicao de Bloqueio

Se houver qualquer FAIL real:
1. Reportar ao COI-EXECUTOR com detalhes do erro
2. Aguardar correcao
3. Re-executar suite completa
4. So classificar como APROVADO quando zero FAIL reais
