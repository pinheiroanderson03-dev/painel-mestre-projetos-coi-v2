# COI-RELEASE-MANAGER — Preparador de Publicacao

**Projeto:** Painel Mestre COI · Centro de Operacoes Integradas · GDF
**Fase de criacao:** 5T.2
**Tipo:** Skill de preparacao de release

---

## Funcao

Preparar o pacote completo de publicacao sem executar nenhum comando critico.
Conferir branch, commits pendentes, validacoes, rollback disponivel e tag sugerida.
Entregar ao Anderson tudo que ele precisa para executar o commit e o push com seguranca.

Esta skill e a ULTIMA do fluxo COI-MESTRE, acionada APOS COI-GOVERNANCA.

---

## Checklist de Preparacao

### 1. Branch
- [ ] Confirmar nome da branch atual
- [ ] Confirmar que NAO e main, NAO e publicacao-demandas-central-df
- [ ] Confirmar que o nome da branch reflete a fase

### 2. Commits Pendentes
- [ ] Listar arquivos modified (git diff --name-only)
- [ ] Listar arquivos untracked novos relevantes
- [ ] Verificar se ha arquivos staged indevidos

### 3. Validacoes
- [ ] node scripts/validar-funcional.js: exit 0
- [ ] git diff --check: apenas CRLF (normal) ou sem erros
- [ ] Scripts PowerShell: resultado confirmado ou pendente execucao Windows

### 4. Rollback Disponivel
- [ ] Identificar a ultima tag estavel disponivel
- [ ] Confirmar que o rollback para essa tag e possivel sem perda de dados
- [ ] Descrever o comando de rollback (sem executar)

### 5. Tag Sugerida
- [ ] Propor nome da tag no padrao: vX.Y.Z-descricao-kebab-case
- [ ] Confirmar que a descricao reflete o conteudo da fase

---

## Saida Obrigatoria — Pacote de Entrega

```
=== PACOTE DE RELEASE COI-RELEASE-MANAGER ===

1. BRANCH ATUAL
   [nome da branch]

2. ARQUIVOS CRIADOS NESTA FASE
   - [lista]

3. ARQUIVOS ALTERADOS
   - arquivo: descricao resumida da alteracao

4. RESUMO TECNICO
   [descricao objetiva do que a fase entrega]

5. DOCUMENTOS ATUALIZADOS
   - [lista dos docs atualizados por COI-GOVERNANCA]

6. COMANDOS EXECUTADOS
   [git e scripts executados durante a fase]

7. RESULTADO DAS VALIDACOES
   node validar-funcional.js : PASS N/N | exit 0
   git diff --check          : sem erros reais (CRLF = normal)
   validar-projeto.ps1       : [PASS | pendente execucao Windows]
   validar-docs.ps1          : [PASS | pendente execucao Windows | nao aplicavel]

8. RISCOS OU AVISOS
   [classificados: erro real / comportamento normal / informativo]

9. RECOMENDACAO DE COMMIT
   git add [lista de arquivos]
   git commit -m "[fase]: [descricao objetiva]"

   Tag sugerida apos commit:
   git tag [tag-sugerida]

   Push (aguardar autorizacao do Anderson):
   git push origin [branch]
   git push origin [tag-sugerida]
```

---

## Regras de Entrega

- Nunca executar git add, git commit, git push, git tag sem autorizacao do Anderson
- Nunca sugerir push direto para main
- Nunca sugerir tag sem a fase estar documentada no CHANGELOG
- Se houver FAIL em qualquer validacao: informar claramente no item 8 e nao sugerir commit

---

## Condicao Especial — Publicacao em GitHub Pages

Se a fase inclui publicacao em GitHub Pages (merge para branch de publicacao):
- Confirmar com Anderson qual branch de publicacao deve ser usada
- Nunca tocar a branch publicacao-demandas-central-df
- Documentar a sequencia completa sem executar
