# PROTOCOLO OPERACIONAL DOS AGENTES — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

---

## Propósito

Este documento define o fluxo prático de execução para cada tipo de tarefa no projeto. É o guia de "como fazer" que complementa as regras do `AGENTS.md`.

---

## Consulta Obrigatória ao Iniciar uma Fase

Toda nova fase deve começar com a leitura dos seguintes documentos:

1. `docs/ESTADO_ATUAL_DO_PROJETO.md` — versão, branch, tag atual, fases concluídas e próxima ação prevista.
2. `docs/MEMORIA_OPERACIONAL_PROJETO.md` — regras rápidas, scripts disponíveis e estrutura de arquivos.
3. `docs/CHECKLIST_EXECUCAO_AGENTES.md` — checklist passo a passo para execução segura, do início ao push.

Esses documentos evitam repetição de contexto, confusão entre ambientes e erros de escopo.

### Apoio via ChatGPT (Fase 4D.4)

O ChatGPT pode ser usado como parceiro analítico e operacional antes, durante e após as fases. Ele não executa alterações no projeto — analisa retornos, valida raciocínios, elabora relatórios e sugere prompts para o Claude.

Documentos de referência:

- `docs/BASE_INTERACAO_ASSISTIDA_CHATGPT.md` — como iniciar conversa, informar contexto, pedir análise de terminal, criar prompts para o Claude e validar antes de commit/push.
- `docs/AGENTES_ESPECIALIZADOS_CHATGPT.md` — perfis especializados: governança, Git/PowerShell, demandas, relatórios executivos, contratos/riscos, AIOps e expansão comercial.
- `docs/PLANO_ROLLBACK_SEGURO.md` — quando e como executar rollback, checklists antes/depois e comandos seguros vs. críticos.
- `docs/MATRIZ_CONTINGENCIA.md` — incidentes por severidade, ação recomendada, evidência necessária e fluxo de aprovação.

---

## Fluxo Padrão de Execução

```
0. CONSULTAR ESTADO E MEMORIA
   └─ Ler docs/ESTADO_ATUAL_DO_PROJETO.md     (versao, branch, tag, fases)
   └─ Ler docs/MEMORIA_OPERACIONAL_PROJETO.md (regras, scripts, estrutura)
   └─ Abrir docs/CHECKLIST_EXECUCAO_AGENTES.md

1. RECEBER TAREFA
   └─ Identificar modo: Rápido / Seguro / Crítico

2. DECLARAR ESCOPO
   └─ Listar arquivos que serão alterados
   └─ Listar arquivos que NÃO serão alterados
   └─ Confirmar com Anderson se houver dúvida

3. EXECUTAR
   └─ Aplicar alteração mínima e cirúrgica
   └─ Não expandir escopo durante execução

4. APRESENTAR RELATÓRIO
   └─ Arquivos alterados
   └─ Diff resumido
   └─ Validações solicitadas (comandos para Anderson)

5. AGUARDAR VALIDAÇÃO
   └─ node --check (se .js)
   └─ Abertura no navegador (se HTML/CSS)
   └─ git diff --check

6. AGUARDAR AUTORIZAÇÃO DE COMMIT
   └─ Sugerir mensagem de commit
   └─ Nunca commitar sem "pode commitar" do Anderson

7. REGISTRAR (se houve aprendizado)
   └─ Atualizar docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md
```

---

## Protocolos Específicos

### P1 — Alteração em `dados/projetos.js`

**Agente responsável:** Agente de Dados

```
1. Confirmar branch correta (não é publicacao-demandas-central-df)
2. Ler o arquivo completo antes de alterar
3. Alterar somente o campo/bloco autorizado
4. Não remover campos existentes
5. Validar: node --check .\dados\projetos.js
6. Apresentar: arquivos alterados + diff + resultado do node --check
7. Aguardar commit do Anderson
```

**Atenção:** `meta.execucaoMensal` é fallback permanente — nunca remover.

---

### P2 — Alteração em `index.html`

**Agente responsável:** Agente de Interface

```
1. Ler as seções relevantes antes de alterar
2. Nunca usar innerHTML com dados externos
3. Funções novas: usar var (não const/let) para escopo global seguro
4. Após alteração: abrir no navegador, verificar console (F12) sem erros
5. Verificar que cards, gráficos e alertas continuam funcionando
6. Apresentar: arquivos alterados + diff + checklist de regressão
```

**Checklist de regressão obrigatório para index.html:**
- [ ] Cards executivos (total, andamento, atenção, críticos, concluídos, evolução)
- [ ] Cards c-demandas, c-riscos, c-decisoes, c-entregas
- [ ] Gráficos Chart.js sem erro
- [ ] Tabela de portfólio renderizando
- [ ] Seção Execução Mensal com seletor funcionando
- [ ] Alertas executivos dinâmicos

---

### P3 — Alteração em `assets/style.css`

**Agente responsável:** Agente de Estilo

```
1. Usar namespace de classe específico para novas adições (ex: .em-*, .fase-*)
2. Nunca remover ou renomear classe existente sem auditoria de uso
3. Testar responsividade: mobile (≤640px), tablet (≤900px), desktop
4. Verificar que classes antigas não foram sobrescritas
5. Apresentar: linhas adicionadas + impacto visual esperado
```

---

### P4 — Documentação (CHANGELOG, ROADMAP, RELEASE_NOTES)

**Agente responsável:** Agente de Documentação

```
1. Nova versão sempre no TOPO do arquivo (acima da versão anterior)
2. CHANGELOG: registrar todos os commits da fase com hash completo
3. RELEASE_NOTES: linguagem executiva para usuário final (sem jargão técnico)
4. ROADMAP: marcar fase concluída com ✅ e data; manter futuras com 🔄
5. Rodapé do ROADMAP: atualizar versão atual e próxima
6. Apresentar diff antes de commit
```

---

### P5 — Push e Publicação

**Agente responsável:** Agente Guardião Git (em coordenação com Orquestrador)

```
MODO CRÍTICO obrigatório.

1. Confirmar: git status (working tree limpo)
2. Confirmar: git log --oneline -5 (commits corretos)
3. Confirmar branch de destino (nunca publicacao-demandas-central-df)
4. Sugerir comando de push — aguardar autorização
5. Após push: confirmar no GitHub que branch subiu corretamente
6. Sugerir tag estável se for publicação de fase importante
```

---

### P6 — Extração de Dados do Painel Anterior

**Agente responsável:** Agente de Dados + Agente Aprendiz

```
1. Acessar somente em modo leitura:
   painel-mestre-projetos-coi-publicacao/acompanhamento-mensal-v1.html
   painel-mestre-projetos-coi-publicacao/dados_painel_aura.json

2. Mapear campos disponíveis para campos do V2:
   totalAtividades  ← atividades registradas na competência
   totalDemandas    ← tarefas/demandas concluídas
   principaisGanhos ← entregas executadas
   proximasEntregas ← próximos passos registrados no fechamento do mês

3. Campos sem correspondência confirmada → manter 0 ou ""
4. Registrar fonte de cada dado no relatório antes de commit
5. Nunca interpolar ou inferir dados não explicitamente registrados
```

---

### P7 — Rollback

**Agente responsável:** Agente de Rollback

```
MODO CRÍTICO obrigatório.

1. Coletar estado atual:
   git status
   git log --oneline -10

2. Identificar o commit alvo e apresentar ao Anderson

3. Escolher tipo de rollback (apresentar opções com impacto):
   a) reset --soft  → desfaz commit, mantém arquivos modificados no stage
   b) reset --hard  → desfaz commit e alterações (DESTRUTIVO — requer autorização)
   c) revert        → cria novo commit que desfaz o anterior (não-destrutivo)
   d) checkout      → restaura arquivo específico sem afetar outros

4. Aguardar escolha e autorização explícita do Anderson
5. Executar e confirmar resultado com git log --oneline -5
```

---

### P8 — Auditoria de Segurança

**Agente responsável:** Agente de Segurança

```
Verificar em todos os arquivos HTML/JS:
- innerHTML com dados externos → deve ser textContent ou createElement
- eval() ou Function() com dados externos → proibido
- Token de API exposto no frontend → proibido
- localStorage com dados sensíveis sem tratamento → revisar
- Formulários sem validação de entrada → registrar como débito técnico
```

---

## Regras de Comunicação entre Agentes

- O Orquestrador autoriza início de cada fase/etapa.
- Cada agente apresenta relatório antes de commit.
- Agente de Qualidade pode ser convocado a qualquer momento para auditoria sem alteração.
- Agente Aprendiz registra erros e aprendizados ao final de cada fase.
- Em caso de conflito de escopo entre agentes, o Orquestrador decide.

---

## Nomenclatura de Branches

```
fase-<numero><letra>[-<sufixo>]   →   fase-4a1-historico-mensal
fix-<descricao-curta>              →   fix-faseTd-portfolio
docs-<descricao-curta>             →   docs-v1.4.1-changelog
publicacao-<nome>                  →   publicacao-demandas-central-df (NÃO TOCAR)
```

---

---

## Scripts de Validação (Fase 4D.2)

Os scripts abaixo ficam na pasta `scripts/` e devem ser executados a partir da raiz do projeto no PowerShell. Nenhum script realiza alterações — apenas leitura e validação.

| Script | Quando usar | Comando |
|---|---|---|
| `status-seguro.ps1` | Ver branch, status e commits de forma rápida | `.\scripts\status-seguro.ps1` |
| `validar-docs.ps1` | Conferir governança antes de commit de documentação | `.\scripts\validar-docs.ps1` |
| `validar-dados.ps1` | Após qualquer alteração em `dados/projetos.js` | `.\scripts\validar-dados.ps1` |
| `validar-projeto.ps1` | Validação geral antes de qualquer commit ou push | `.\scripts\validar-projeto.ps1` |

**Ordem recomendada antes de um commit:**

```powershell
.\scripts\validar-projeto.ps1
```

Se houver alteração em `dados/projetos.js`:

```powershell
.\scripts\validar-dados.ps1
```

Se houver alteração em documentação:

```powershell
.\scripts\validar-docs.ps1
```

---

---

### P9 — Delegação Operacional ao Claude (Fase 4D.4.2)

**Modelo de responsabilidade:** Anderson (aprovação) → Claude (execução) → ChatGPT (suporte a decisões críticas).

```
COMANDOS AUTONOMOS (Claude pode executar sem pedir autorização):
  git status
  git diff --name-only
  git diff --stat
  git diff --check
  git branch --show-current
  git log --oneline -5
  git add -N
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
  .\scripts\validar-projeto.ps1
  .\scripts\validar-docs.ps1
  .\scripts\validar-dados.ps1

COMANDOS CRITICOS (exigem "pode executar" do Anderson):
  git add (definitivo)
  git commit
  git push
  git switch main
  git merge
  git tag
  git push origin main / git push origin <tag>
  git reset / git restore / git clean
  exclusao de branch / qualquer rollback
```

**Padrão de entrega obrigatório ao final de cada fase:**

```
1. Branch atual
2. Arquivos criados
3. Arquivos alterados (com resumo das mudanças)
4. Comandos executados
5. Validações realizadas (resultado dos scripts e checks)
6. Erros ou avisos (classificados: erro real ou comportamento normal)
7. Pendências (o que requer autorização ou ação do Anderson)
8. Próximos comandos recomendados (sem executar os críticos)
```

---

---

### P10 — Skills Operacionais Claude (Fase 5T.2 -- atualizado 5T.3)

A pasta `.claude/skills/` contem 11 skills Markdown que definem o fluxo operacional completo do Claude.

**Fluxo via COI-MESTRE (obrigatorio para qualquer fase nova):**

```
COI-MEMORIA -> COI-FORENSE -> COI-ARQUITETO -> COI-LEARNINGS -> COI-EXECUTOR
  -> COI-TESTES -> COI-AUDITOR -> COI-QA -> COI-GOVERNANCA -> COI-RELEASE-MANAGER
```

**Quando usar cada skill:**

| Skill | Posicao | Situacao |
|---|---|---|
| COI-MESTRE | Orquestrador | Unica porta de entrada para qualquer fase |
| COI-MEMORIA | 1 | Carregar estado atual, erros conhecidos, alertas |
| COI-FORENSE | 2 | Classificar evidencias vs hipoteses; confirmar estado real do repo |
| COI-ARQUITETO | 3 | Classificar modo, mapear escopo, plano de execucao |
| COI-LEARNINGS | 4 | Consultar erros anteriores, DAR e base evolutiva; emitir lembretes |
| COI-EXECUTOR | 5 | Implementar alteracoes com padroes corretos |
| COI-TESTES | 6 | Suite de testes pre-QA (T1-T6); autocorrecao se FAIL |
| COI-AUDITOR | 7 | Auditoria de escopo, arquivos proibidos, protocolo; parecer final |
| COI-QA | 8 | Validacao completa: git diff, validar-funcional.js, PS1 |
| COI-GOVERNANCA | 9 | Atualizar 5 documentos obrigatorios + base evolutiva + decisoes |
| COI-RELEASE-MANAGER | 10 | Montar pacote de entrega de 9 itens |

**Documentos de conhecimento consultados pelas skills:**

| Documento | Consultado por |
|---|---|
| `docs/BASE_DE_CONHECIMENTO_EVOLUTIVA.md` | COI-LEARNINGS, COI-GOVERNANCA |
| `docs/DECISOES_ARQUITETURAIS_COI.md` | COI-LEARNINGS, COI-AUDITOR, COI-GOVERNANCA |
| `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` | COI-LEARNINGS, COI-GOVERNANCA |

**Regra:** Skills nao substituem AGENTS.md. Em conflito, prevalece AGENTS.md.

---

*Ultima atualizacao: 2026-06-12 - Fase 5T.3 - Framework expandido para 11 skills*
