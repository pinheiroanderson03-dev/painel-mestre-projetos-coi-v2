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
