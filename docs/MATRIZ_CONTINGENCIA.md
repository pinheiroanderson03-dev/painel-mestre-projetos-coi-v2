# MATRIZ DE CONTINGENCIA — Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

> Este documento classifica incidentes no repositorio por severidade e define a acao recomendada,
> quem aprova, qual evidencia e necessaria e se e obrigatorio validar com ChatGPT antes de agir.

---

## Escala de Severidade

| Nivel | Definicao |
|---|---|
| **S1 — Critico** | Afeta producao (GitHub Pages publicado), branch protegida ou perda de historico irreversivel |
| **S2 — Alto** | Commit errado ja no remoto, merge indevido publicado ou tag incorreta publicada |
| **S3 — Medio** | Commit local errado (nao publicado), arquivo modificado por engano (nao commitado) |
| **S4 — Baixo** | Erro de formatacao, texto incorreto, rodape desatualizado |

---

## Matriz de Incidentes

| # | Tipo de Incidente | Severidade | Impacto | Acao Recomendada | Evidencia Necessaria | ChatGPT Valida? | Anderson Autoriza? |
|---|---|---|---|---|---|---|---|
| I-01 | Push acidental para `publicacao-demandas-central-df` | S1 | GitHub Pages v1 comprometido | PARAR. Coletar log. Consultar ChatGPT. Aguardar Anderson. Revert ou force push conforme orientacao | `git log --oneline -5` da branch | **Obrigatorio** | **Obrigatorio** |
| I-02 | Push com conteudo errado para `main` | S1 | GitHub Pages v2 comprometido | `git revert <hash>` + `git push origin main` | `git log --oneline -5` + diff do commit | **Obrigatorio** | **Obrigatorio** |
| I-03 | Merge feito na branch errada, ja publicado | S2 | Historico divergente no remoto | `git revert -m 1 <hash-merge>` + push | `git log --all --oneline -10` | **Obrigatorio** | **Obrigatorio** |
| I-04 | Commit com dados incorretos em `dados/projetos.js`, ja no remoto | S2 | Painel exibe dados errados | `git revert <hash>` + push | `git show <hash>` do commit incorreto | **Recomendado** | **Obrigatorio** |
| I-05 | Tag criada com nome errado, ja publicada no remoto | S2 | Referencia errada no historico | `git tag -d <tag>` + `git push origin --delete <tag>` + recriar no commit correto | `git tag --list` | Opcional | **Obrigatorio** |
| I-06 | Merge feito na branch errada, ainda local (nao publicado) | S3 | Historico local divergente | `git reset --hard HEAD~1` | `git log --oneline -5` | Recomendado | **Obrigatorio** |
| I-07 | Commit local com conteudo errado, nao publicado | S3 | Apenas local — sem impacto no remoto | `git reset --soft HEAD~1` (recomendado) ou `--mixed` | `git log --oneline -5` + `git diff HEAD~1 HEAD` | Opcional | **Obrigatorio** |
| I-08 | Arquivo modificado por engano, nao commitado | S3 | Apenas working tree — sem impacto | `git restore <arquivo>` | `git status` + `git diff <arquivo>` | Opcional | **Obrigatorio** |
| I-09 | Branch criada com nome errado, sem commits exclusivos | S3 | Apenas local | `git branch -m <antigo> <novo>` | `git branch -a` | Nao | **Obrigatorio** |
| I-10 | Arquivo de governança com conteudo incorreto, ja commitado | S3 | Documentacao errada no historico | Corrigir e fazer novo commit (nao rollback) | Identificar o erro via diff | Nao | Sim (commit) |
| I-11 | Tag criada com nome errado, ainda local | S3 | Apenas local — sem impacto no remoto | `git tag -d <nome-da-tag>` | `git tag --list` | Nao | Recomendado |
| I-12 | Erro de texto/formatacao em documento ja commitado | S4 | Documentacao imprecisa | Corrigir e fazer novo commit | Identificar o texto errado | Nao | Sim (commit) |
| I-13 | Branch com nome correto mas base errada, sem push | S4 | Historico local desorganizado | Criar nova branch na base correta + cherry-pick se necessario | `git log --all --oneline -10` | Nao | Sim |

---

## Fluxo de Decisao para Qualquer Incidente

```
1. IDENTIFICAR o tipo de incidente (tabela acima)
2. COLETAR evidencias (git log, git status, git diff)
3. CONSULTAR ChatGPT se coluna "ChatGPT Valida?" = Obrigatorio ou Recomendado
4. APRESENTAR diagnostico e opcoes ao Anderson
5. AGUARDAR autorizacao explícita ("pode executar")
6. EXECUTAR acao recomendada
7. CONFIRMAR resultado com git log e git status
8. REGISTRAR em docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md
9. ATUALIZAR docs/ESTADO_ATUAL_DO_PROJETO.md se necessario
```

---

## Evidencias Padrao por Tipo de Coleta

| Evidencia | Comando |
|---|---|
| Estado atual do repositorio | `git status` |
| Ultimos commits | `git log --oneline -10` |
| Todos os commits de todas as branches | `git log --all --oneline -10` |
| Conteudo de um commit especifico | `git show <hash>` |
| Diferenca entre dois commits | `git diff <hash1> <hash2>` |
| Lista de tags | `git tag --list` |
| Lista de branches | `git branch -a` |
| Diferenca do working tree | `git diff` |
| Diferenca staged | `git diff --cached` |

---

## Regras de Comunicacao em Incidente

1. Claude nao age sem diagnostico completo. Sempre coletar evidencias primeiro.
2. Para S1 e S2: Claude apresenta o diagnostico, aguarda ChatGPT validar e aguarda Anderson autorizar antes de qualquer acao.
3. Para S3: Claude pode preparar os comandos mas nao executa sem "pode executar" do Anderson.
4. Para S4: Claude sugere correcao via novo commit. Nao usa rollback.
5. Nunca usar `--force` sem classificar o incidente como S1 ou S2 e ter autorizacao explícita.
6. Nunca agir em `publicacao-demandas-central-df` — sempre acionar Anderson diretamente.

---

## Referencia Cruzada

- Procedimentos detalhados por tipo: `docs/PLANO_ROLLBACK_SEGURO.md`
- Papeis e autorizacoes: `AGENTS.md` — Secao 7 (Regra de Rollback) e Secao 11 (Delegacao Operacional)
- Protocolo de execucao: `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` — Protocolo P7

---

*Ultima atualizacao: 2026-06-11 · Fase: 4D.5 — Plano de Rollback Seguro*
