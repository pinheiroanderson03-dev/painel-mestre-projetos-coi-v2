# PROTOCOLO OPERACIONAL DOS AGENTES — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

---

## Propósito

Este documento define o fluxo prático de execução para cada tipo de tarefa no projeto. É o guia de "como fazer" que complementa as regras do `AGENTS.md`.

---

## Fluxo Padrão de Execução

```
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

*Última atualização: 2026-06-10 · Fase: 4D.2 — Scripts de Validação*
