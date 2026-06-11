# PLANO DE ROLLBACK SEGURO — Painel Mestre COI

Centro de Operacoes Integradas · Governo do Distrito Federal

> Rollback e uma acao critica e irreversivel em alguns casos.
> Claude nao pode executar rollback sem autorizacao explícita do Anderson e validacao do ChatGPT.
> Este documento define quando usar, como usar e o que nunca fazer sem autorizacao.

---

## 1. Objetivo

Definir os procedimentos de recuperacao do repositorio do Painel Mestre COI em caso de:
- commit com erro
- merge indevido
- tag incorreta
- branch comprometida
- publicacao acidental em producao

Toda acao de rollback deve seguir este plano. Nenhuma etapa pode ser pulada.

---

## 2. Modelo de Aprovacao para Rollback

```
Anderson (autoriza) → Claude (prepara comandos e informa impacto) → ChatGPT (valida antes de executar)
```

- **Anderson:** autoriza o rollback e escolhe o tipo apos ver as opcoes
- **Claude:** prepara os comandos, descreve o impacto e aguarda autorizacao antes de executar
- **ChatGPT:** valida a logica do rollback, identifica riscos colaterais e confirma que o caminho e seguro

**Regra absoluta:** Claude nunca executa `git reset`, `git restore`, `git revert`, `git clean` ou qualquer operacao destrutiva sem "pode executar" explícito do Anderson.

---

## 3. Quando Usar Rollback

| Situacao | Usar rollback? |
|---|---|
| Commit com conteudo errado ainda nao enviado ao remoto | Sim — reset --soft ou --mixed |
| Commit enviado ao remoto com erro de conteudo | Sim — revert (nao-destrutivo) |
| Merge feito na branch errada, nao publicado | Sim — reset --hard (requer autorizacao) |
| Tag criada com nome errado | Sim — delete local + remoto |
| Arquivo modificado por engano, nao commitado | Sim — restore |
| Push acidental para branch protegida | Sim — CRITICO: ver secao 7 |
| Dado incorreto em dados/projetos.js ja commitado | Sim — revert ou correcao com novo commit |
| Documento com erro menor de texto | Nao — corrigir com novo commit |
| Mudanca de opiniao sobre conteudo ja aprovado | Nao — discutir com Anderson antes |

---

## 4. Quando NAO Usar Rollback

- Quando o erro e apenas de formatacao ou texto: **fazer novo commit de correcao**.
- Quando nao ha confirmacao do que exatamente precisa ser desfeito: **coletar evidencias primeiro**.
- Quando a branch nao e a correta: **verificar antes de agir**.
- Quando o push foi para `publicacao-demandas-central-df`: **parar imediatamente, acionar Anderson**.
- Quando houver duvida sobre o impacto: **consultar ChatGPT antes de qualquer acao**.

---

## 5. Rollback de Commit Local (nao enviado ao remoto)

**Agente responsavel:** Agente de Rollback + autorizacao Anderson.

```
Cenario: commit feito localmente com erro. git push ainda nao foi executado.
```

### Opcoes:

| Tipo | Comando | Efeito | Destrutivo? |
|---|---|---|---|
| Desfazer commit, manter arquivos em stage | `git reset --soft HEAD~1` | Remove o commit; arquivos ficam prontos para novo commit | Nao |
| Desfazer commit, manter arquivos no disco | `git reset --mixed HEAD~1` | Remove o commit; arquivos ficam modificados (unstaged) | Nao |
| Desfazer commit e descarter todas as alteracoes | `git reset --hard HEAD~1` | Remove o commit e todas as mudancas — IRREVERSIVEL | Sim |

### Fluxo obrigatorio:

```
1. git log --oneline -5          (confirmar qual commit desfazer)
2. git diff HEAD~1 HEAD          (ver o que sera desfeito)
3. Apresentar opcoes ao Anderson
4. Aguardar escolha e "pode executar"
5. Executar o reset
6. git log --oneline -3          (confirmar resultado)
7. git status                    (confirmar estado dos arquivos)
```

---

## 6. Rollback de Commit Enviado ao Remoto

**Agente responsavel:** Agente de Rollback + autorizacao Anderson + validacao ChatGPT.

```
Cenario: git push ja foi executado. O commit incorreto esta no repositorio remoto.
```

### Opcao recomendada: git revert (nao-destrutivo)

```powershell
# Identificar o commit
git log --oneline -10

# Criar commit de reversao (NAO apaga historico)
git revert <hash-do-commit>

# Confirmar resultado
git log --oneline -5
git push origin <branch>
```

**Por que usar revert em vez de reset?**
Porque `git revert` cria um novo commit que desfaz as mudancas sem apagar o historico. E seguro para branches compartilhadas ou ja publicadas.

### Quando usar force push (apenas em ultimo caso):

```
force push = reescrever historico do remoto
Consequencias: colaboradores com a branch local ficam com historico divergente.
Nunca fazer em main, publicacao-demandas-central-df ou qualquer branch compartilhada.
Requer: autorizacao Anderson + validacao ChatGPT + confirmacao de que ninguem mais tem a branch.
```

```powershell
# CRITICO — somente com autorizacao explícita
git push origin <branch> --force
```

---

## 7. Rollback de Merge

**Agente responsavel:** Agente de Rollback + autorizacao Anderson + validacao ChatGPT (obrigatorio).

```
Cenario: merge feito na branch errada ou com conflito mal resolvido.
```

### Se o merge nao foi publicado (local):

```powershell
git log --oneline -5             # identificar o commit de merge
git reset --hard HEAD~1          # desfaz o merge — DESTRUTIVO, requer autorizacao
git log --oneline -3             # confirmar
```

### Se o merge ja foi publicado:

```powershell
# Identificar o hash do commit de merge
git log --oneline -10

# Reverter o merge (nao-destrutivo)
git revert -m 1 <hash-do-merge>

# -m 1 indica que queremos manter o historico do parent 1 (branch de destino antes do merge)
git log --oneline -5
git push origin <branch>
```

---

## 8. Rollback de Tag

**Agente responsavel:** Agente de Rollback + autorizacao Anderson.

```
Cenario: tag criada com nome incorreto, no commit errado ou prematuramente.
```

### Remover tag local:

```powershell
git tag -d <nome-da-tag>
```

### Remover tag do remoto:

```powershell
# REQUER AUTORIZACAO — acao irreversivel no remoto
git push origin --delete <nome-da-tag>
```

### Recriar tag no commit correto:

```powershell
git log --oneline -10            # identificar o commit correto
git tag <nome-da-tag> <hash>     # criar tag no commit certo
git push origin <nome-da-tag>    # publicar (requer autorizacao)
```

---

## 9. Rollback de Branch

**Agente responsavel:** Agente de Rollback + autorizacao Anderson + validacao ChatGPT.

```
Cenario: branch foi criada com nome errado, com base errada ou com commits indevidos.
```

### Renomear branch local:

```powershell
git branch -m <nome-antigo> <nome-novo>
```

### Apagar branch local (apenas se nao tiver commits exclusivos):

```powershell
git branch -d <nome-da-branch>   # seguro: recusa se houver commits nao mergeados
git branch -D <nome-da-branch>   # forcado — REQUER AUTORIZACAO
```

### Apagar branch remota:

```powershell
# REQUER AUTORIZACAO — acao irreversivel no remoto
git push origin --delete <nome-da-branch>
```

### Recriar branch no commit correto:

```powershell
git switch -c <nova-branch> <hash-ou-tag>
```

---

## 10. Rollback de Publicacao GitHub Pages

**Agente responsavel:** Agente de Rollback + autorizacao Anderson + validacao ChatGPT (OBRIGATORIO).

```
Cenario: push acidental para main com conteudo errado, afetando a publicacao do GitHub Pages.
Ou: push acidental para publicacao-demandas-central-df (branch NUNCA TOCAR).
```

**Este e o cenario de maior severidade. Nao agir sem evidencias claras e autorizacao.**

### Fluxo de contingencia:

```
1. PARAR toda acao imediata
2. Registrar: qual commit foi publicado, em qual branch, quando
3. Consultar o ChatGPT com o log e a situacao completa
4. Aguardar validacao do ChatGPT
5. Comunicar Anderson com o diagnostico e opcoes
6. Aguardar autorizacao explícita antes de qualquer acao
```

### Opcao 1 — Revert (recomendado, nao-destrutivo):

```powershell
git revert <hash-do-commit-errado>
git push origin main
```

### Opcao 2 — Force push para voltar ao estado anterior (CRITICO):

```powershell
# Somente com autorizacao Anderson + validacao ChatGPT
git push origin main --force
```

**Regra absoluta:** `publicacao-demandas-central-df` NUNCA deve receber push. Se ocorrer acidentalmente, acionar Anderson imediatamente e nao tentar corrigir sem orientacao.

---

## 11. Checklist Antes de Qualquer Rollback

- [ ] Confirmar branch atual: `git branch --show-current`
- [ ] Confirmar estado: `git status`
- [ ] Coletar log: `git log --oneline -10`
- [ ] Identificar exatamente qual commit/merge/tag/branch sera revertido
- [ ] Descrever o impacto ao Anderson (o que sera perdido, o que sera preservado)
- [ ] Consultar ChatGPT com o log e as opcoes
- [ ] Aguardar "pode executar" do Anderson
- [ ] Confirmar que nao e a branch `publicacao-demandas-central-df`
- [ ] Confirmar que ninguem mais esta trabalhando na mesma branch (se colaborativo)

---

## 12. Checklist Depois do Rollback

- [ ] Confirmar novo estado: `git log --oneline -5`
- [ ] Confirmar working tree limpo: `git status`
- [ ] Verificar que os arquivos corretos estao no estado esperado
- [ ] Executar `.\scripts\validar-projeto.ps1` para validar integridade
- [ ] Registrar o incidente em `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md`
- [ ] Atualizar `docs/ESTADO_ATUAL_DO_PROJETO.md` se o rollback afetou o estado do projeto
- [ ] Comunicar Anderson com o resultado

---

## 13. Comandos Seguros (leitura — Claude pode executar)

```powershell
git status
git log --oneline -10
git log --oneline --all -10
git diff HEAD
git diff HEAD~1 HEAD
git branch --show-current
git branch -a
git tag --list
git show <hash>
git show <tag>
```

---

## 14. Comandos Criticos (requerem autorizacao Anderson + validacao ChatGPT)

```powershell
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
git revert <hash>
git revert -m 1 <hash-de-merge>
git push origin <branch> --force
git push origin --delete <tag>
git push origin --delete <branch>
git branch -D <branch>
git tag -d <tag>
git clean -fd
git restore <arquivo>
```

---

*Ultima atualizacao: 2026-06-11 · Fase: 4D.5 — Plano de Rollback Seguro*
