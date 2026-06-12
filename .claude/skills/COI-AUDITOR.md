# COI-AUDITOR -- Auditor de Protocolo e Escopo

**Projeto:** Painel Mestre COI - Centro de Operacoes Integradas - GDF
**Fase de criacao:** 5T.3 (2026-06-12)
**Tipo:** Skill de auditoria de aderencia ao protocolo
**Posicao no fluxo:** Depois de COI-TESTES, antes de COI-QA

---

## Funcao

Validar que a implementacao do COI-EXECUTOR respeitou:
- O escopo autorizado (arquivos certos, nada a mais)
- Os arquivos proibidos (nenhum tocado)
- As regras de governanca (AGENTS.md)
- O risco da operacao (modo correto: Rapido/Seguro/Critico)
- A disponibilidade de rollback

Emitir parecer final antes do QA.

---

## Checklist de Auditoria

### A1 -- Verificacao de Escopo

```bash
git diff --name-only
```

Comparar lista de arquivos modificados com escopo autorizado pelo COI-ARQUITETO.

| Verificacao | Criterio | Resultado |
|---|---|---|
| Apenas arquivos autorizados foram alterados | Diff so mostra arquivos do escopo | PASS / FAIL |
| Nenhum arquivo fora do escopo foi tocado | Sem surpresas no diff | PASS / FAIL |

### A2 -- Verificacao de Arquivos Proibidos

Verificar que os seguintes arquivos NAO foram alterados:

| Arquivo | Motivo |
|---|---|
| `assets/js/chart.umd.min.js` | Biblioteca externa -- nunca editar |
| `dados/projetos.js` | Somente com autorizacao explicita do Anderson |
| Branch `publicacao-demandas-central-df` | Nunca tocar |

```bash
git diff --name-only | grep "chart.umd.min.js"
git diff --name-only | grep "projetos.js"
```

### A3 -- Verificacao de Padroes de Codigo

```bash
grep -rn "innerHTML\s*=" index.html portfolio.html projetos/ficha.html 2>/dev/null | grep -v "//.*innerHTML"
```

- innerHTML com dados externos: FAIL
- clearEl() presente onde necessario: PASS

### A4 -- Verificacao de Risco

Confirmar que o modo de execucao foi compativel com o risco:

| Tipo de alteracao | Modo exigido |
|---|---|
| Documentacao .md | Rapido |
| HTML / CSS / JS | Seguro |
| dados/projetos.js com dados | Critico |
| Merge / push / tag | Critico |

### A5 -- Verificacao de Rollback Disponivel

- Ha um commit anterior valido para rollback? (git log confirma)
- A branch nao foi forcada?
- O working tree pode ser restaurado via git restore?

---

## Parecer Final

O COI-AUDITOR emite um dos tres pareceres:

| Parecer | Significado | Proximo passo |
|---|---|---|
| APROVADO | Tudo em ordem | Prosseguir para COI-QA |
| CONDICIONADO | Aviso nao critico; pode prosseguir com ressalva | Registrar aviso, prosseguir |
| REPROVADO | Violacao de escopo ou protocolo | Retornar ao COI-EXECUTOR |

---

## Saida Obrigatoria

```
=== PARECER COI-AUDITOR ===
A1 - Escopo: [PASS/FAIL] -- <arquivos modificados vs autorizados>
A2 - Arquivos proibidos: [PASS/FAIL] -- <verificados>
A3 - Padroes de codigo: [PASS/FAIL] -- <ocorrencias proibidas>
A4 - Modo de execucao: [PASS/FAIL] -- <modo usado vs modo exigido>
A5 - Rollback disponivel: [PASS/FAIL] -- <commit anterior>

Parecer Final: APROVADO / CONDICIONADO / REPROVADO
Razao: <descricao objetiva>
=== FIM AUDITOR ===
```

---

*Fase 5T.3 -- COI-AUDITOR -- Auditoria de protocolo e escopo*
