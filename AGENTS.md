# AGENTS.md — Governança Operacional dos Agentes COI

Comunicação Omnichannel Inteligente · Central IT
Painel Mestre de Acompanhamento de Projetos

---

## Leitura Obrigatória Antes de Iniciar

Antes de qualquer fase ou alteração, consultar:

| Documento | Finalidade |
|---|---|
| `.claude/skills/COI-MESTRE.md` | **Acionar primeiro (Fase 5T.4).** Fluxo obrigatorio de 10 skills para qualquer tarefa tecnica. Proibido iniciar por COI-EXECUTOR, COI-TESTES, COI-QA, COI-AUDITOR, COI-GOVERNANCA ou COI-RELEASE-MANAGER. Fluxo pre-planejamento: COI-MEMORIA -> COI-FORENSE -> COI-LEARNINGS -> COI-ARQUITETO. |
| `docs/ESTADO_ATUAL_DO_PROJETO.md` | **Ler primeiro.** Versão, branch, tag atual, fases concluídas, próxima ação |
| `docs/MEMORIA_OPERACIONAL_PROJETO.md` | Regras rápidas, scripts, estrutura de arquivos |
| `docs/CHECKLIST_EXECUCAO_AGENTES.md` | Checklist passo a passo para execução segura |
| `docs/BASE_INTERACAO_ASSISTIDA_CHATGPT.md` | Como usar o ChatGPT como apoio analítico e operacional |
| `docs/AGENTES_ESPECIALIZADOS_CHATGPT.md` | Perfis de agentes ChatGPT por domínio (governança, Git, demandas, relatórios, etc.) |
| `docs/PLANO_ROLLBACK_SEGURO.md` | Quando e como executar rollback — tipos, checklists, comandos seguros e críticos |
| `docs/MATRIZ_CONTINGENCIA.md` | Incidentes por severidade — ação, aprovação, evidência, ChatGPT e Anderson |

Esses documentos são o ponto de entrada operacional. Este arquivo (`AGENTS.md`) contém as regras detalhadas e os papéis dos agentes internos do projeto.

---

## Propósito

Este arquivo define o comportamento esperado, os papéis e as regras obrigatórias para todos os agentes que atuam no projeto. Todo agente deve ler e aplicar este documento antes de qualquer ação técnica ou documental.

---

## 1. Separação de Ambientes

| Ambiente | Finalidade | Restrição |
|---|---|---|
| **Painel Antigo** (`painel-mestre-projetos-coi-publicacao/`) | Fonte histórica de consulta | Somente leitura. Nunca alterar. |
| **Painel V2** (`COI - Painel Mestre de Acompanhamento de Projetos/`) | Ambiente evolutivo atual | Todo desenvolvimento acontece aqui. |
| **GitHub Pages v1** (branch `publicacao-demandas-central-df`) | Publicação anterior em produção | **Nunca tocar.** |

**Regra:** Nunca copiar estrutura, dados ou lógica do painel antigo para a V2 sem validação explícita do Anderson. Consultar o painel antigo apenas para extração de dados históricos confirmados.

---

## 2. Regra de Escopo

Antes de qualquer alteração, o agente **deve declarar explicitamente**:

```
Arquivo(s) que pretendo alterar: [lista]
Arquivo(s) que NÃO serão tocados: [lista]
```

Se durante a execução surgir necessidade de alterar arquivo fora do escopo autorizado:
1. Parar imediatamente.
2. Descrever o que seria necessário alterar e por quê.
3. Aguardar autorização explícita do Anderson antes de prosseguir.

---

## 3. Regra de Dados

- Nunca preencher indicadores mensais com dados genéricos quando houver fonte real disponível.
- Antes de preencher `meta.execucoesMensais[]` ou qualquer campo quantitativo, consultar:
  - Painel anterior (`acompanhamento-mensal-v1.html`, `dados_painel_aura.json`)
  - Histórico validado e aprovado pelo Anderson
- Campos sem confirmação devem permanecer `""` ou `0`, com observação explícita no relatório.
- Nunca inventar datas, contagens, nomes de responsáveis ou projetos.

---

## 4. Regra de Validação

Após qualquer alteração técnica, solicitar ao Anderson que execute:

```powershell
git status
git diff --name-only
git diff --stat
git diff --check
```

Para arquivos `.js`, adicionar:

```powershell
node --check .\caminho\do\arquivo.js
```

O agente deve aguardar a confirmação do resultado antes de recomendar commit.

---

## 5. Regra de Commit

- **Nunca recomendar commit antes da validação** (`node --check`, `git diff --check`, revisão visual).
- Commit somente após aprovação explícita do Anderson: "pode commitar" ou similar.
- Formato da mensagem de commit:

```
<fase>: <descrição objetiva em português, sem ponto final>

Exemplos:
  fase-4a1: adicionar seletor de competencia na execucao mensal
  docs: atualizar CHANGELOG e RELEASE_NOTES para v1.4.1
  fix: corrigir renderizacao de faseTd e platTd no portfolio
```

---

## 6. Regra de Push e Publicação

- Nunca recomendar `git push` direto sem confirmação do Anderson.
- Publicação na `main` do V2 somente após validação local completa.
- Sequência obrigatória antes de qualquer push:

```powershell
git log --oneline -5   # confirmar commits
git status             # confirmar working tree limpo
git push origin <branch>
```

- Após uma fase importante publicada, sugerir criação de tag estável:

```powershell
git tag v1.4.1
git push origin v1.4.1
```

---

## 7. Regra de Rollback

- O agente pode sugerir rollback, explicar impacto e preparar os comandos.
- **Nunca executar rollback destrutivo sem autorização explícita.**
- Antes de qualquer rollback, sempre coletar:

```powershell
git status
git log --oneline -10
```

- Tipos de rollback disponíveis:

| Tipo | Comando | Destrutivo? |
|---|---|---|
| Desfazer último commit (mantém arquivos) | `git reset --soft HEAD~1` | Não |
| Descartar último commit | `git reset --hard HEAD~1` | Sim — requer autorização |
| Reverter arquivo específico | `git checkout HEAD -- arquivo.js` | Parcial |
| Criar commit de reversão | `git revert <hash>` | Não |

---

## 8. Regra contra Erros no PowerShell

- Sempre apresentar comandos dentro de bloco de código (``` ```powershell ... ``` ```).
- **Nunca pedir para o Anderson colar saída do terminal de volta no PowerShell.**
- Se aparecer `>>` no terminal, explicar: *"O PowerShell está aguardando continuação de comando. Pressione Ctrl+C para cancelar e tente novamente, garantindo que o bloco de código esteja completo."*
- Orientar a copiar somente o conteúdo dentro do bloco, sem incluir o prompt (`PS C:\...>`).

---

## 9. Papéis dos Agentes

| Agente | Responsabilidade principal | Arquivos autorizados por padrão |
|---|---|---|
| **Orquestrador** | Coordena fases, distribui tarefas, valida escopo e autoriza execução | Todos (leitura); ação via delegação |
| **Agente de Dados** | Mantém `dados/projetos.js` — estrutura, campos, integridade, consistência | `dados/projetos.js` |
| **Agente de Interface** | Implementa lógica JS e estrutura HTML do dashboard e portfólio | `index.html`, `portfolio.html` |
| **Agente de Estilo** | Mantém CSS, design system, responsividade e acessibilidade visual | `assets/style.css` |
| **Agente de Qualidade** | Audita o código, identifica bugs, inconsistências e débitos técnicos | Leitura de todos; sem alteração |
| **Agente de Documentação** | Mantém CHANGELOG, ROADMAP, RELEASE_NOTES e AGENTS.md atualizados | `*.md` na raiz e `docs/` |
| **Agente Guardião Git** | Garante higiene do repositório, nomenclatura de branches e commits | Apenas orientação; sem `git push` |
| **Agente de Rollback** | Prepara e executa reversões sob autorização; diagnostica regressões | Somente com autorização explícita |
| **Agente Aprendiz** | Registra erros, aprendizados e padrões bem-sucedidos para reuso | `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` |
| **Agente de Segurança** | Audita XSS, injeção de dados, tokens expostos, localStorage e acessos | Leitura de todos; sem alteração |

---

## 10. Modos de Execução

### Modo Rápido
**Uso:** documentação, ajustes de texto, correções ortográficas, atualizações de indicadores em `dados/projetos.js`.

- Declarar arquivo(s) alterado(s)
- Aplicar alteração
- Apresentar diff
- Aguardar commit do Anderson

### Modo Seguro
**Uso:** toda alteração técnica em HTML, CSS ou JS.

- Declarar escopo (arquivos, funções, linhas)
- Apresentar plano antes de alterar
- Aplicar alteração
- Apresentar diff + relatório de validação
- Solicitar `git diff --check` e `node --check` (se .js)
- Aguardar validação visual e commit do Anderson

### Modo Crítico
**Uso:** merge entre branches, publicação em `main`, rollback, alteração em `dados/projetos.js` com dados estruturais, qualquer ação com impacto no GitHub Pages.

- Declarar escopo completo + risco
- Apresentar alternativas se houver
- Aguardar confirmação explícita antes de cada etapa
- Documentar toda ação realizada
- Nunca avançar para a próxima etapa sem confirmação

---

---

## 11. Modelo de Delegação Operacional (Fase 4D.4.2)

Fluxo de responsabilidade: **Anderson (aprovação) → Claude (execução e validação) → ChatGPT (suporte a decisões críticas)**.

O ChatGPT não executa alterações. Atua como parceiro analítico para revisar decisões de escopo, interpretar retornos de terminal e validar raciocínios antes de ações críticas.

### Comandos que Claude pode executar de forma autônoma

| Comando | Finalidade |
|---|---|
| `git status` | Verificar estado do repositório |
| `git diff --name-only` | Listar arquivos modificados |
| `git diff --stat` | Resumo das modificações |
| `git diff --check` | Verificar trailing whitespace e problemas de formatação |
| `git branch --show-current` | Confirmar branch ativa |
| `git log --oneline -5` | Verificar últimos commits |
| `git add -N` | Marcar arquivo para rastreamento sem estagiá-lo |
| `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` | Habilitar execução de scripts PS1 |
| `.\scripts\validar-projeto.ps1` | Validação geral pré-commit |
| `.\scripts\validar-docs.ps1` | Validação de documentação |
| `.\scripts\validar-dados.ps1` | Validação de dados/projetos.js |

### Comandos que exigem autorização explícita do Anderson

| Comando | Motivo |
|---|---|
| `git add` (definitivo) | Prepara o commit — ponto de não-retorno fácil |
| `git commit` | Registro permanente no histórico |
| `git push` | Envia para repositório remoto |
| `git switch main` | Muda para branch principal |
| `git merge` | Integração entre branches |
| `git tag` | Cria tag estável |
| `git push origin main` | Publica na branch principal remota |
| `git push origin <tag>` | Publica tag no remoto |
| `git reset` | Desfaz commits ou alterações |
| `git restore` | Descarta alterações em arquivo |
| `git clean` | Remove arquivos não rastreados |
| Exclusão de branch | Remove histórico de branch |
| Qualquer rollback | Operação potencialmente destrutiva |

### Padrão de Entrega ao Final de Cada Fase

Ao final de qualquer fase ou etapa com alterações, Claude deve entregar obrigatoriamente:

1. **Branch atual** — nome da branch em que o trabalho foi realizado
2. **Arquivos criados** — lista de arquivos novos criados nesta fase
3. **Arquivos alterados** — lista de arquivos modificados com resumo das mudanças
4. **Comandos executados** — todos os comandos git e scripts rodados
5. **Validações realizadas** — resultado das validações (scripts, node --check, git diff --check)
6. **Erros ou avisos** — avisos encontrados e classificação: erro real ou comportamento normal (ex: CRLF)
7. **Pendências** — o que ainda não foi feito e requer autorização ou ação do Anderson
8. **Proximos comandos recomendados** — sugestão de próximos passos sem executar os críticos

---

---

## 12. Skills Operacionais Claude (Fase 5T.2 -- atualizado 5T.3)

A pasta `.claude/skills/` contem 11 skills Markdown que definem o fluxo operacional completo do Claude.

**Fluxo obrigatorio:**
```
COI-MEMORIA -> COI-FORENSE -> COI-ARQUITETO -> COI-LEARNINGS -> COI-EXECUTOR
  -> COI-TESTES -> COI-AUDITOR -> COI-QA -> COI-GOVERNANCA -> COI-RELEASE-MANAGER
```

| Skill | Papel |
|---|---|
| COI-MESTRE | Orquestrador -- unica porta de entrada |
| COI-MEMORIA | Estado atual, erros, alertas |
| COI-FORENSE | Evidencias vs hipoteses; estado real do repo |
| COI-ARQUITETO | Modo, escopo, plano |
| COI-LEARNINGS | Prevencao de erros; DAR; base evolutiva |
| COI-EXECUTOR | Implementacao segura |
| COI-TESTES | Suite pre-QA (T1-T6) |
| COI-AUDITOR | Auditoria de protocolo e escopo |
| COI-QA | Validacao completa |
| COI-GOVERNANCA | Documentos de estado |
| COI-RELEASE-MANAGER | Pacote de entrega |

**Documentos de conhecimento (consultados pelas skills):**
- `docs/BASE_DE_CONHECIMENTO_EVOLUTIVA.md` -- padroes aprovados, anti-padroes, solucoes
- `docs/DECISOES_ARQUITETURAIS_COI.md` -- DAR-001 a DAR-NNN
- `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` -- E-NNN e A-NNN

**Regra:** Skills nao substituem este arquivo. Em conflito, prevalece AGENTS.md.

*Ultima atualizacao: 2026-06-12 - Fase 5T.3*

### Hierarquia de Skills

| Skill | Papel | Quando usar |
|---|---|---|
| `COI-MESTRE.md` | Orquestrador geral | Inicio de qualquer fase -- coordena as demais skills |
| `COI-MEMORIA.md` | Leitura de contexto | Antes de qualquer execucao -- carrega estado, erros e regras |
| `COI-ARQUITETO.md` | Planejamento tecnico | Classificar modo, mapear arquivos, planejar rollback |
| `COI-EXECUTOR.md` | Implementacao segura | Aplicar alteracoes autorizadas com padroes corretos |
| `COI-QA.md` | Validacao completa | Rodar suite de validacoes e classificar resultados |
| `COI-GOVERNANCA.md` | Atualizacao de docs | Atualizar ESTADO_ATUAL, CHANGELOG, ROADMAP, MEMORIA, RELEASE_NOTES |
| `COI-RELEASE-MANAGER.md` | Empacotamento final | Montar pacote de entrega de 9 itens, preparar commit |

### Fluxo obrigatorio via COI-MESTRE

```
COI-MEMORIA -> COI-ARQUITETO -> COI-EXECUTOR -> COI-QA -> COI-GOVERNANCA -> COI-RELEASE-MANAGER
```

Nenhuma etapa pode ser pulada. Se uma skill identificar bloqueador, a execucao para e Anderson e consultado

---

## 13. Agente Curador de Demandas e Projetos (Fase 5C.1)

### Papel

O COI-CURADOR-DEMANDAS-PROJETOS recebe informacoes operacionais em texto livre ou formulario estruturado e as transforma em entradas validas para dados/projetos.js, sem necessidade de edicao manual.

### Modos de Operacao

| Modo | Descricao |
|---|---|
| Previa (padrao) | Interpreta a entrada, gera bloco JSON, aguarda aprovacao. Nenhum arquivo e alterado. |
| Assistido | Entrada incompleta: o curador identifica campos obrigatorios faltantes e faz perguntas especificas. |
| Publicacao | Apos confirmacao explicita de Anderson: aciona COI-EXECUTOR para aplicar o JSON aprovado. |

### Tipos de Item Gerenciados

Demanda - Incidente - Licenca/Contrato - Atividade Operacional - Entrega Contratual

Projetos estrategicos (COI-001 a COI-008) so sao atualizados com escopo explicitamente autorizado por Anderson.

### Limites de Seguranca

- Nunca altera dados/projetos.js sem previa aprovada
- Nunca remove registros existentes
- Nunca altera campo id de registro existente
- Nunca altera meta.versao
- Nunca faz commit ou push sem autorizacao explicita de Anderson
- Nunca toca a branch publicacao-demandas-central-df

### Documentos de Referencia

| Documento | Conteudo |
|---|---|
| docs/AGENTE_CURADOR_DEMANDAS_PROJETOS.md | Papel, campos, regras, exemplos, fluxos completos |
| docs/MODELO_ENTRADA_DEMANDAS_PROJETOS.md | Formularios por tipo de item e exemplos de texto livre |
| docs/PROTOCOLO_ATUALIZACAO_DADOS_OPERACIONAIS.md | Fluxo de autorizacao, validacao e commit |

---

## 14. Protocolo de Validação Obrigatória — PVO (Fase 5C.3)

Toda alteração no repositório exige aprovação sequencial de três camadas antes de qualquer commit, push, merge ou tag.

### Fluxo

```
Anderson (escopo) → ChatGPT (validação de escopo) → Claude (execução + validação técnica)
→ ChatGPT (validação final: Funcional / Estrutural / Governança / git diff --check)
→ Anderson (aprovação) → commit → push → merge → tag
```

### Bloqueio triplo obrigatório

| Camada | Critério |
|---|---|
| Claude | node --check PASS · validar-funcional.js 0 FAIL · git diff --check

---

## 15. Alerta de Commit via Sandbox Linux (Fase 5C.4)

### Problema estrutural

Commits executados diretamente do sandbox Linux (bash) em repositorios montados via NTFS/SMB falham com erro `index.lock` irremovivel (E-009). O arquivo `.git/index.lock` e visivel para o git Windows mas invisivel ao VFS Linux. `rm -f`, `os.remove()` e quaisquer alternativas retornam erro ou `FileNotFoundError`.

### Workaround obrigatorio (A-010)

```bash
cp "$REPO/.git/index" /tmp/coi-index-XXX
TREE=$(GIT_DIR="$REPO/.git" GIT_INDEX_FILE=/tmp/coi-index-XXX git write-tree)
PARENT=$(git -C "$REPO" rev-parse HEAD)
COMMIT=$(GIT_DIR="$REPO/.git" git commit-tree "$TREE" -p "$PARENT" -m "<mensagem>")
GIT_DIR="$REPO/.git" git update-ref HEAD "$COMMIT"
```

Apos o commit, corrigir `.git/HEAD` obrigatoriamente (E-010):

```python
with open('.git/HEAD', 'w') as f:
    f.write('ref: refs/heads/<branch-atual>\n')
```

### Alternativa recomendada

Sempre que possivel, pedir ao Anderson que execute os comandos git diretamente no Windows (PowerShell). Evita o workaround inteiro.

---

## 16. COI Intelligence Engine -- Motor de Analise e Recomendacoes (Fase 6.1-RF)

### Visao Geral

O **COI Intelligence Engine** e o motor de inteligencia do Painel Mestre COI, responsavel por transformar dados operacionais de `dados/projetos.js` em conhecimento acionavel: analises, classificacoes, priorizacoes, recomendacoes e aprendizados. O Engine opera em 7 etapas sequenciais: Dados -> Analise -> Classificacao -> Priorizacao -> Recomendacao -> Acao -> Aprendizado.

Arquitetura completa: `docs/ARQUITETURA_COI_INTELLIGENCE.md`

### Modulo COI Analista

O COI Analista e o primeiro modulo ativo do COI Intelligence Engine (Fase 6.1). Como modulo do Engine, ele executa as etapas 2 a 5 do fluxo oficial (Analise, Classificacao, Priorizacao, Recomendacao). Niveis de maturidade ativos: 1, 2 e 3. E ativado quando Anderson solicita analise de portfolio, diagnostico de projetos, resumo executivo, identificacao de riscos ou geracao de relatorios periodicos.

Especificacao completa: `docs/AGENTE_COI_ANALISTA.md`

### Posicao no fluxo do Engine

```
dados/projetos.js (unica fonte)
  -> COI-MEMORIA -> COI-FORENSE -> COI-ARQUITETO
  -> COI Intelligence Engine
       [COI Analista] -> COI-QA -> COI-RELEASE-MANAGER
  -> Anderson (aprovacao) -> COI-EXECUTOR (acao)
  -> COI-GOVERNANCA (aprendizado)
```

### Modelo de Recomendacoes

Toda saida do Engine segue o Modelo de Recomendacoes IA de 8 campos:
tipo, item_relacionado, prioridade, motivo, evidencia, acao_sugerida, impacto_esperado, status_recomendacao.
O modelo e compartilhado por todos os modulos do Engine.

Modelo completo: `docs/MODELO_RECOMENDACOES_IA.md`

### Niveis de Maturidade

Nivel 1: Resumos automaticos | Nivel 2: Identificacao de riscos | Nivel 3: Recomendacoes (ativos na Fase 6.1)
Nivel 4: Recomendacoes inteligentes (Fase 6.3) | Nivel 5: Predicao (Fase 6.5) | Nivel 6: Agente autonomo (Fase 6.6)

### Indicadores do Engine

Documentacao completa: `docs/INDICADORES_INTELIGENCIA.md`

### Restricoes da Fase 6.1

- COI Analista nao altera `dados/projetos.js` -- apenas le
- Nenhuma logica IA implementada em JavaScript nesta fase
- Nenhuma alteracao no layout do painel (index.html, portfolio.html, ficha.html, style.css)
- Fonte exclusiva: `dados/projetos.js` -- sem base paralela

### Roadmap COI Intelligence Engine

Fases: 6.1 COI Analista (concluida) -> 6.2 COI Daily -> 6.3 COI Weekly -> 6.4 COI Monthly -> 6.5 Intelligence no Painel -> 6.6 Automacao.

Roadmap completo: `docs/ROADMAP_COI_IA.md`

---

### 17. COI Curador Inteligente (Fase 6.2)

**Arquivo:** `scripts/coi-curador-inteligente.js`
**Fase:** 6.2 — Validacao de Qualidade de Dados
**Modulo:** COI Intelligence Engine — Primeiro modulo funcional do Engine
**Uso:** `node scripts/coi-curador-inteligente.js [--resumo] [--item COI-XXX]`
**Exit code:** 0 = portfolio aceitavel | 1 = itens criticos detectados

**Responsabilidade:**
Analisar todos os itens de `dados/projetos.js` e produzir, para cada um, um diagnostico de qualidade automatico com 12 regras de validacao, score (0-100), erros, alertas, recomendacoes, nivel de criticidade e situacao geral.

**12 Regras de validacao:**

| Codigo | Tipo | Regra |
|---|---|---|
| R01 | ERRO (-12) | Responsavel ausente ou nao definido |
| R02 | ALERTA (-5) | Orgao ou cliente nao informado |
| R03 | ERRO (-12) | Objetivo do item nao documentado |
| R04 | ALERTA (-5) | Situacao atual nao documentada |
| R05 | ALERTA (-5) | Historico operacional vazio ou ausente |
| R06 | ALERTA (-5) | Proximas acoes nao definidas (exceto concluidos) |
| R07 | ALERTA (-5) | Riscos nao registrados para itens P0/P1 com risco critico |
| R08 | ERRO (-12) | Item concluido sem data de conclusao registrada |
| R09 | ERRO/ALERTA | Percentual incompativel com status |
| R10 | ERRO (-12) | Prazo vencido para item em andamento |
| R11 | ALERTA (-5) | Item sem atualizacao ha mais de 30 dias |
| R12 | ERRO/ALERTA | Evidencia ausente para Incidente, P0 ou P1 |

**Classificacao de score:**

| Faixa | Nivel |
|---|---|
| 95-100 | Excelente |
| 80-94 | Bom |
| 60-79 | Atencao |
| 0-59 | Critico |

**Regras de seguranca:**
- Fonte exclusiva: `dados/projetos.js`
- Nao cria base de dados paralela
- Nao altera nenhum arquivo
- Nao executa git add, commit, push, merge, tag

---

## 17. COI Curador Inteligente (Fase 6.2 / 6.2.1)

**Arquivo:** `scripts/coi-curador-inteligente.js`
**Config:** `config/regras-curador.js`
**Fase:** 6.2 / 6.2.1
**Status:** Operacional

Motor de curadoria com 12 regras configuráveis (R01-R12), sistema de pesos por regra, score 0-100 e saída estruturada JSON.

**Saídas:** `--resumo`, `--item <n>`, `--json`
**JSON:** `{ resumo, indicadores, itens, erros, alertas, recomendacoes }`

---

## 18. COI Auditor Inteligente (Fase 6.3)

**Arquivo:** `scripts/coi-auditor-inteligente.js`
**Fase:** 6.3
**Status:** Operacional

Segundo módulo do COI Intelligence Engine. Consome a saída JSON do COI Curador Inteligente via `child_process.spawnSync` e produz auditoria operacional executiva consolidada.

**Interface padrão (COI Intelligence Engine):**
- `MODULO.execute()` — executa análise completa e retorna resultado consolidado
- `MODULO.score()` — retorna score médio do ambiente (0-100)
- `MODULO.recommendations()` — retorna array de recomendações priorizadas
- `MODULO.export(formato)` — exporta em `'text'`, `'json'` ou `'md'`

**Saídas:** `--resumo`, `--json`, `--md`

**JSON Schema:**
```json
{
  "schema": "1.0",
  "engine": "COI Auditor Inteligente",
  "resumo": { "data", "versaoDados", "totalItens", "regrasAtivas", "scoreMedia", "saudeGeral", "criticidade" },
  "indicadores": { "totalErros", "totalAlertas", "itensCriticos", "itensSaudaveis", "taxaConformidade" },
  "auditoria": { "scoreGeral", "conformidade", "completude", "pontualidade", "rastreabilidade", "governanca" },
  "tendencias": { "saudeGeral", "criticidade", "regraMoreViolada", "itensCriticosTop3", "quickWins" },
  "recomendacoes": []
}
```

**Classificações:**
- Saúde Geral: `Excelente` (>=90) / `Boa` (>=70) / `Atencao` (>=50) / `Critica` (<50)
- Criticidade: `Baixa` / `Media` / `Alta` / `Critica`

**Exit codes:** 0 = saudável / 1 = criticidade Alta ou Crítica


## 19. COI Command Language -- CCL (Fase R3)

CCL e o padrao oficial de instrucao para todas as sessoes do projeto COI.
Toda tarefa tecnica com entregavel deve ser expressa como comando CCL antes da execucao.

### Sintaxe

```
COI <VERBO> [ALVO] [--modo FAST|SAFE|CRITICAL] [--escopo ESCOPO]
```

### 12 Verbos Oficiais

| ID      | Verbo       | Alias | Modo Default | Pipeline de Skills Principal                    |
|---------|-------------|-------|--------------|-------------------------------------------------|
| CCL-01  | EXEC        | X     | FAST         | MESTRE->MEMORIA->FORENSE->ARQUITETO->LEARNINGS->EXECUTOR |
| CCL-02  | UPDATE      | U     | FAST         | MESTRE->MEMORIA->EXECUTOR                       |
| CCL-03  | QA          | Q     | FAST         | TESTES->AUDITOR->QA                             |
| CCL-04  | REVIEW      | RV    | SAFE         | MESTRE->FORENSE->AUDITOR                        |
| CCL-05  | DOC         | D     | FAST         | GOVERNANCA                                      |
| CCL-06  | REL         | RL    | FAST         | GOVERNANCA->RELEASE-MANAGER                     |
| CCL-07  | STATUS      | ST    | FAST         | MEMORIA (leitura apenas)                        |
| CCL-08  | RUNTIME     | RT    | FAST         | GOVERNANCA                                      |
| CCL-09  | REGISTRY    | RG    | FAST         | EXECUTOR (apenas registry/*.json)               |
| CCL-10  | TEST        | T     | FAST         | TESTES->QA                                      |
| CCL-11  | RELEASE     | RS    | SAFE         | AUDITOR->QA->GOVERNANCA->RELEASE-MANAGER        |
| CCL-12  | COMMIT PREP | CP    | FAST         | AUDITOR (lista; sem git add)                    |

### Modos de Execucao

| Modo     | Comportamento                                                             |
|----------|---------------------------------------------------------------------------|
| FAST     | Default. Execucao autonoma sem pausas. Usar para docs e arquivos novos.   |
| SAFE     | Pausa antes de cada arquivo modificado. Usar para JS/HTML/CSS.            |
| CRITICAL | Pausa + sinaliza ChatGPT review. Obrigatorio para dados/projetos.js.      |

### Regras

## 20. COI OS -- Session Template (Fase R4)

O COI_SESSION_TEMPLATE.md e o documento oficial de inicializacao de sessoes.
Toda nova sessao do projeto COI deve consultar este documento antes de qualquer execucao.

### Localizacoes (3 copias sincronizadas)

| Arquivo                         | Finalidade                           |
|---------------------------------|--------------------------------------|
| COI_SESSION_TEMPLATE.md         | Fonte principal (raiz do projeto)    |
| docs/COI_SESSION_TEMPLATE.md    | Copia para documentacao              |
| .claude/COI_SESSION_TEMPLATE.md | Copia para acesso direto do Claude   |

### Estrutura (14 secoes)

1. Visao do COI -- COI, COI OS, Painel, Engine, Runtime, Registry, CCL, Arquitetura
2. Papeis -- Anderson (PO), ChatGPT (Arquiteto), Claude (Executor)
3. Leitura Obrigatoria -- 6 arquivos em ordem de prioridade
4. Checkpoint Inicial -- git branch/status/log/tag + Runtime + Registry
5. Esteiras -- PLATAFORMA (OS/infra) vs OPERACAO (dados/projetos)
6. Perguntas Iniciais -- 4 perguntas obrigatorias no inicio de cada sessao
7. Principios -- 7 principios antes de qualquer implementacao
8. Regra de Ouro -- Arquitetura -> Planejamento -> Execucao -> Validacao -> Governanca -> Publicacao
9. Padrao de Entrega -- 6 itens obrigatorios em toda resposta tecnica
10. Checklist de Encerramento -- 10 itens antes de solicitar commit
11. Checkpoint de Contexto -- 6 perguntas internas antes de cada acao
12. Melhores Praticas -- 10 praticas oficiais do COI OS
13. Evolucao Continua -- principio: mais simples, rapido, reutilizavel, inteligente, autonomo
14. Roadmap do COI OS -- COI OS -> Runtime -> Registry -> CCL -> Protocol -> Context/Memory/Knowledge -> Automation -> DX

### Regras

- Atualizar obrigatoriamente ao alterar qualquer componente do COI OS.
- Sincronizar sempre as 3 copias (raiz, docs/, .claude/).
- Versionar com data e descricao no historico de versoes interno.
