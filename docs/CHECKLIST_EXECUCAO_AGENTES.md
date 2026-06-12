# CHECKLIST DE EXECUCAO DOS AGENTES — Painel Mestre COI

Executar este checklist em toda nova fase ou alteracao tecnica.
Para detalhes de cada item, consultar AGENTS.md e PROTOCOLO_OPERACIONAL_AGENTES.md.

---

## 1. Antes de Iniciar

- [ ] Consultar `docs/ESTADO_ATUAL_DO_PROJETO.md` — versao, branch, tag, fases concluidas, proxima acao
- [ ] Consultar `docs/MEMORIA_OPERACIONAL_PROJETO.md` — regras rapidas, scripts, estrutura de arquivos
- [ ] Confirmar branch atual com `.\scripts\status-seguro.ps1`
- [ ] Confirmar que NAO esta na branch `publicacao-demandas-central-df`
- [ ] Confirmar escopo da fase: objetivo, entregaveis, restricoes
- [ ] Listar arquivos que serao alterados
- [ ] Listar arquivos que NAO serao alterados
- [ ] Confirmar que Anderson autorizou o escopo antes de comecar
- [ ] Verificar se ha comandos criticos no escopo (git add, commit, push, merge, tag, reset, restore) — aguardar autorizacao explícita antes de executar
- [ ] Se houver risco de rollback: consultar `docs/PLANO_ROLLBACK_SEGURO.md` e `docs/MATRIZ_CONTINGENCIA.md` antes de agir

---

## 2. Durante a Execucao

- [ ] Alterar somente arquivos explicitamente autorizados
- [ ] Se precisar sair do escopo: parar e comunicar antes de agir
- [ ] Nao criar dados inventados — usar fontes reais quando disponivel
- [ ] Para dados historicos mensais: consultar painel antigo antes de preencher
- [ ] Registrar qualquer decisao relevante no relatorio da etapa
- [ ] Nao fazer commit nem push durante a execucao
- [ ] Preferir commits atomicos por melhoria individual — nao agrupar varias melhorias num unico commit se puder ser evitado (Fase 5T.1)
- [ ] Nunca acumular mais de uma fase inteira sem commit — aumenta risco de rollback e dificulta revisao (Fase 5T.1)

---

## 3. Antes do Commit

Escolher o script adequado e rodar:

| Tipo de alteracao | Script | Plataforma |
|---|---|---|
| Documentacao (*.md) | `.\scripts\validar-docs.ps1` | Windows / PowerShell |
| Dados (dados/projetos.js) | `.\scripts\validar-dados.ps1` | Windows / PowerShell |
| Qualquer alteracao | `.\scripts\validar-projeto.ps1` | Windows / PowerShell |
| Alteracao funcional (HTML/CSS/JS) | `node scripts/validar-funcional.js` | Qualquer SO (Node.js) |

- [ ] Rodar script e verificar saida
- [ ] Se houver alteracao funcional: executar tambem `node scripts/validar-funcional.js` e confirmar exit code 0 (Fase 5T.1)
- [ ] Aviso LF/CRLF: ignorar (comportamento normal do Windows)
- [ ] Erros reais: corrigir antes de continuar
- [ ] Enviar retorno da validacao para Anderson revisar
- [ ] Aguardar aprovacao explicitamente antes de commitar
- [ ] Usar mensagem de commit no padrao: `<fase>: <descricao objetiva>`

---

## 4. Antes do Push ou Merge

- [ ] Rodar `.\scripts\status-seguro.ps1` e confirmar working tree limpo
- [ ] Confirmar branch de destino (nunca `publicacao-demandas-central-df`)
- [ ] Confirmar ultimos commits com `git log --oneline -5`
- [ ] Aguardar autorizacao do Anderson para push
- [ ] Avaliar se a fase concluida merece tag estavel

---

## 5. Ao Finalizar uma Fase

- [ ] Atualizar `docs/ESTADO_ATUAL_DO_PROJETO.md` — fase concluida, tag, proxima acao (obrigatorio antes do commit)
- [ ] Atualizar `CHANGELOG.md` com commits e descricoes tecnicas
- [ ] Atualizar `RELEASE_NOTES.md` com linguagem para usuario final
- [ ] Atualizar `ROADMAP_COI.md` marcando fase como concluida
- [ ] Atualizar `docs/MEMORIA_OPERACIONAL_PROJETO.md` com novo estado na tabela
- [ ] Registrar aprendizados em `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md`
- [ ] Sugerir tag estavel ao Anderson
- [ ] OBRIGATORIO: os 4 documentos acima (ESTADO_ATUAL, CHANGELOG, ROADMAP, MEMORIA) devem ser atualizados ANTES do commit de fechamento da fase — nao depois (Fase 5T.1)
- [ ] Verificar se ESTADO_ATUAL reflete a tag mais recente e a proxima fase correta

---

---

## 6. Entrega Final da Fase (Padrao 4D.4.2)

Ao entregar qualquer fase ou etapa com alteracoes, Claude deve incluir:

- [ ] Branch atual
- [ ] Arquivos criados nesta fase
- [ ] Arquivos alterados com resumo das mudancas
- [ ] Comandos executados (git e scripts)
- [ ] Resultado das validacoes
- [ ] Erros ou avisos classificados (erro real / comportamento normal)
- [ ] Pendencias que requerem autorizacao do Anderson
- [ ] Proximos comandos recomendados (sem executar os criticos)

---

*Ultima atualizacao: 2026-06-12 - Fase 5T.1 - Infraestrutura de Qualidade e Validacao*
