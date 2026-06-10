# AGENTS.md — Governança Operacional dos Agentes COI

Centro de Operações Integradas · Governo do Distrito Federal
Painel Mestre de Acompanhamento de Projetos

---

## Leitura Obrigatória Antes de Iniciar

Antes de qualquer fase ou alteração, consultar:

| Documento | Finalidade |
|---|---|
| `docs/MEMORIA_OPERACIONAL_PROJETO.md` | Estado atual, repositório, tags, scripts, regras rápidas |
| `docs/CHECKLIST_EXECUCAO_AGENTES.md` | Checklist passo a passo para execução segura |
| `docs/BASE_INTERACAO_ASSISTIDA_CHATGPT.md` | Como usar o ChatGPT como apoio analítico e operacional |
| `docs/AGENTES_ESPECIALIZADOS_CHATGPT.md` | Perfis de agentes ChatGPT por domínio (governança, Git, demandas, relatórios, etc.) |

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

*Última atualização: 2026-06-10 · Versão: v1.4.1 · Fase: 4D.1 — Governança Operacional*
