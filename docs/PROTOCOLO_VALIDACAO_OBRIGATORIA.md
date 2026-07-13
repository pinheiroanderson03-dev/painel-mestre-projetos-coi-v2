# PROTOCOLO DE VALIDAÇÃO OBRIGATÓRIA (PVO) — COI

Comunicação Omnichannel Inteligente · Central IT

> Define o fluxo de validação obrigatória para todas as alterações do Painel Mestre COI.
> Nenhum commit, push, merge ou tag pode ocorrer sem aprovação completa dos três agentes.

Criado na Fase 5C.3 — 2026-06-23

---

## 1. Princípio

Toda alteração no repositório do Painel Mestre COI passa por três camadas de validação antes de ser publicada:

1. **Claude** — executa e valida tecnicamente
2. **ChatGPT** — valida escopo, governança e qualidade
3. **Anderson** — aprova a publicação

Nenhuma camada pode ser pulada. A ausência de qualquer aprovação bloqueia o avanço.

---

## 2. Fluxo Oficial de Alteração

```
Anderson
  ↓ Define escopo e objetivo da fase
ChatGPT
  ↓ Valida o escopo, sugere riscos, aponta lacunas antes da execução
Claude
  ↓ Executa as alterações autorizadas
Claude
  ↓ Executa validações técnicas (ver Seção 4)
ChatGPT
  ↓ Valida funcionalmente, estruturalmente e de governança (ver Seção 5)
Anderson
  ↓ Aprova com "pode commitar" ou equivalente
git add → git commit → git push → (merge) → (tag)
```

**Bloqueio:** Se qualquer camada retornar FAIL ou não aprovar, o fluxo para. Correção → re-execução de todas as validações → nova aprovação.

---

## 3. Responsabilidades por Camada

| Camada | Responsável | Papel |
|---|---|---|
| Escopo | Anderson + ChatGPT | Definir o que será feito e o que está proibido |
| Execução | Claude | Implementar dentro do escopo autorizado |
| Validação técnica | Claude | Confirmar que o código e os dados estão íntegros |
| Validação de governança | ChatGPT | Confirmar escopo, qualidade documental e ausência de efeitos colaterais |
| Aprovação final | Anderson | Autorizar commit, push, merge e tag |

---

## 4. Validações Obrigatórias — Claude

Executar **antes de declarar qualquer fase concluída** e **antes de qualquer commit**.

### 4.1 Validações Git

```bash
git branch --show-current
git status
git status --short
git diff --name-only
git diff --stat
git diff --check
```

| Validação | Critério de aprovação |
|---|---|
| `git branch --show-current` | Branch correta para a fase (nunca `publicacao-demandas-central-df`) |
| `git status` | Nenhum arquivo fora do escopo autorizado modificado |
| `git status --short` | Apenas os arquivos da fase aparecem como M, A ou ?? |
| `git diff --name-only` | Lista contém somente arquivos autorizados |
| `git diff --stat` | Linhas alteradas condizentes com o escopo da fase |
| `git diff --check` | Zero trailing whitespace / zero problemas de encoding |

### 4.2 Validações Funcionais (Node.js)

```bash
node --check dados/projetos.js
node scripts/validar-funcional.js
```

| Validação | Critério de aprovação |
|---|---|
| `node --check dados/projetos.js` | Sem erros de sintaxe JavaScript |
| `node scripts/validar-funcional.js` | 0 FAIL — qualquer FAIL bloqueia o commit |

### 4.3 Validações PowerShell (Windows)

```powershell
.\scripts\validar-projeto.ps1
.\scripts\validar-dados.ps1
.\scripts\validar-docs.ps1
```

| Validação | Critério de aprovação | Quando executar |
|---|---|---|
| `validar-projeto.ps1` | Sem erros reportados | Antes de qualquer commit |
| `validar-dados.ps1` | Sem erros reportados | Após alteração em dados/projetos.js |
| `validar-docs.ps1` | Sem erros reportados | Após alteração em qualquer .md |

---

## 5. Validações Obrigatórias — ChatGPT

O ChatGPT deve validar em **quatro dimensões** antes de aprovar:

| Dimensão | O que verificar |
|---|---|
| **Funcional** | O código/dado alterado funciona corretamente? Há regressão possível? |
| **Estrutural** | Os arquivos respeitam o padrão do projeto (indentação, encoding UTF-8, sem BOM)? |
| **Governança** | Apenas os arquivos autorizados foram alterados? Os docs de estado foram atualizados? |
| **git diff --check** | O diff não contém trailing whitespace ou problemas de encoding? |

Resposta esperada do ChatGPT:

```
Funcional: OK / FAIL — <motivo>
Estrutural: OK / FAIL — <motivo>
Governança: OK / FAIL — <motivo>
git diff --check: PASS / FAIL — <motivo>
```

Se qualquer dimensão retornar FAIL: Claude corrige → re-executa validações técnicas → ChatGPT revalida.

---

## 6. Regras de Commit

### 6.1 Pré-requisitos obrigatórios

- [ ] `git diff --check` — PASS
- [ ] `node --check dados/projetos.js` — PASS (se dados/projetos.js foi alterado)
- [ ] `node scripts/validar-funcional.js` — 0 FAIL
- [ ] `.\scriptsalidar-projeto.ps1` — sem erros
- [ ] `.\scriptsalidar-dados.ps1` — sem erros (se dados/projetos.js foi alterado)
- [ ] `.\scriptsalidar-docs.ps1` — sem erros (se qualquer .md foi alterado)
- [ ] ChatGPT — aprovação nas 4 dimensões
- [ ] Anderson — autorização explícita ("pode commitar", "confirma", "go" ou equivalente)

### 6.2 Formato da mensagem de commit

```
<tipo>(<fase>): <descrição objetiva em português, sem ponto final>

Exemplos:
  docs(5C.3): criar protocolo de validação obrigatória
  feat(5B.4): indicadores operacionais no dashboard
  fix(5B.3-hotfix): encoding mojibake ficha.html
  curador(5C.2): atualização COI-009 licença AIOps concluída
```

Tipos permitidos: `docs`, `feat`, `fix`, `refactor`, `curador`, `chore`

### 6.3 Arquivos sempre proibidos de commit sem autorização explícita

- `dados/projetos.js` — requer autorização explícita separada
- `publicacao-demandas-central-df` — branch protegida, nunca tocar

---

## 7. Regras de Push, Merge e Tag

| Operação | Requer |
|---|---|
| `git push` | Autorização explícita de Anderson após commit bem-sucedido |
| `git merge` | Autorização explícita de Anderson — descrever branches envolvidas |
| `git tag` | Autorização explícita de Anderson — apenas após push validado |

Sequência obrigatória:

```
git add <arquivos-autorizados>
git commit -m "<mensagem-padrao>"
git log --oneline -3          # confirmar commit
git status                    # confirmar working tree limpo
git push origin <branch>
git log --oneline -3          # confirmar push
```

---

## 8. Situações de Bloqueio

| Situação | Ação |
|---|---|
| `git diff --check` retorna FAIL | Corrigir trailing whitespace → re-executar todas as validações |
| `node scripts/validar-funcional.js` retorna FAIL | Identificar assert com falha → corrigir → re-executar |
| ChatGPT retorna FAIL em qualquer dimensão | Corrigir conforme feedback → ChatGPT revalida |
| Arquivo fora do escopo aparece em `git diff --name-only` | Parar — reverter alteração → comunicar Anderson |
| `git commit` falha com `index.lock` | Remover lock se seguro (verificar com Anderson) → retry |
| Anderson não responde | Não avançar — aguardar autorização |

---

## 9. Histórico de Validações Aprovadas

Registrar aqui as aprovações de cada fase para rastreabilidade.

| Fase | Claude | ChatGPT | Anderson | Data |
|---|---|---|---|---|
| 5B.3 | PASS | PASS | Aprovado | 2026-06-15 |
| 5C.1 | PASS | PASS | Aprovado | 2026-06-23 |
| 5C.2 | PASS | PASS | Pendente | 2026-06-23 |
| 5C.3 | PASS | Pendente | Pendente | 2026-06-23 |

---

## 10. Referências

| Documento | Conteúdo |
|---|---|
| `AGENTS.md` — Seção 14 | Resumo do PVO e link para este documento |
| `docs/CHECKLIST_EXECUCAO_AGENTES.md` | Checklist operacional passo a passo |
| `docs/PLANO_ROLLBACK_SEGURO.md` | Procedimentos de reversão |
| `docs/MATRIZ_CONTINGENCIA.md` | Incidentes por severidade |
| `.claude/skills/COI-QA.md` | Suite de validação técnica do Claude |
| `.claude/skills/COI-RELEASE-MANAGER.md` | Pacote de entrega de 9 itens |

---

*Criado na Fase 5C.3 — 2026-06-23*
*Última atualização: Fase 5C.4 — 2026-06-26*
