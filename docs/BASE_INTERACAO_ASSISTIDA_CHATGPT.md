# BASE DE INTERAÇÃO ASSISTIDA NO CHATGPT — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

Este documento padroniza como Anderson interage com o ChatGPT no contexto do projeto COI, reduzindo perda de contexto, aumentando precisão nas respostas e facilitando a continuidade entre sessões.

---

## Objetivo da Base de Interação

O ChatGPT atua como parceiro analítico e operacional do projeto. Ele não executa comandos diretamente no projeto — mas analisa retornos, valida raciocínios, sugere prompts para o Claude, elabora relatórios e apoia a tomada de decisão.

O Claude (via Cowork ou Claude Code) executa as alterações técnicas com base nas instruções definidas em conjunto com o ChatGPT ou pelo próprio Anderson.

---

## Como Iniciar uma Nova Conversa no ChatGPT

Sempre que abrir uma nova conversa relacionada ao projeto, copiar e colar o bloco abaixo como primeira mensagem:

```
Contexto do projeto:
- Nome: Painel Mestre de Acompanhamento de Projetos COI
- Repositório V2: pinheiroanderson03-dev/painel-mestre-projetos-coi-v2
- Tecnologia: HTML/CSS/JS estático, sem servidor, sem framework
- Fonte de dados: dados/projetos.js (COI_DATA)
- Branch atual: [informar]
- Fase atual: [informar]
- Última tag estável: [informar]

Agentes disponíveis: Orquestrador, Dados, Interface, Estilo, Qualidade, Documentação, Guardião Git, Rollback, Aprendiz, Segurança.
Scripts de validação: scripts/status-seguro.ps1, validar-docs.ps1, validar-dados.ps1, validar-projeto.ps1

Preciso de ajuda com: [descrever o que precisa]
```

---

## Como Informar Fase, Branch, Escopo e Evidências

Ao pedir análise de uma fase em andamento, seguir este modelo:

```
Fase: [ex: 4A.1 — Histórico Mensal]
Branch: [ex: fase-4a1-historico-mensal]
Escopo desta etapa: [ex: alterar somente dados/projetos.js]
Arquivos autorizados: [lista]
Arquivos proibidos: [lista]
O que foi feito: [resumo]
Evidência ou retorno do terminal: [colar aqui]
Dúvida ou pedido: [descrever]
```

---

## Como Pedir Análise de Retorno PowerShell

Quando um script ou comando PowerShell retornar saída inesperada, copiar o retorno e usar:

```
Analise o retorno abaixo do PowerShell e me diga:
1. Se há erros reais ou apenas avisos normais do Windows.
2. Se o projeto está em estado seguro para commit.
3. O que preciso corrigir antes de continuar.

Retorno:
[colar o retorno aqui]
```

Exemplos de avisos normais que não exigem correção:
- `LF will be replaced by CRLF the next time Git touches it`
- `warning: in the working copy of '...', LF will be replaced by CRLF`

---

## Como Pedir Criação de Prompt para o Claude

Quando quiser que o ChatGPT elabore a instrução a ser passada ao Claude:

```
Preciso criar um prompt para o Claude executar a seguinte tarefa no projeto COI:
- Objetivo: [descrever]
- Arquivo autorizado: [listar]
- Arquivos proibidos: [listar]
- Regras: [listar regras específicas da etapa]
- Resultado esperado: [descrever]

Por favor, elabore o prompt completo que devo enviar ao Claude.
```

---

## Como Pedir Validação Antes de Commit, Push, Merge ou Tag

**Antes de commit:**
```
Quero commitar a seguinte alteração no projeto COI.
Arquivo alterado: [arquivo]
Resumo da mudança: [descrever]
Retorno do validador: [colar saída do script]
A mensagem de commit que pensei: [mensagem]
Isso está correto e seguro para commitar?
```

**Antes de push:**
```
Quero fazer push da branch [nome] para o repositório V2.
Branch atual: [nome]
Últimos commits: [colar git log --oneline -5]
Status: [colar git status]
Existe algum risco ou ponto de atenção antes de eu fazer o push?
```

**Antes de merge:**
```
Quero fazer merge da branch [origem] na branch [destino].
Objetivo do merge: [descrever]
Há conflitos conhecidos? [sim/não]
Preciso que você revise se o merge é seguro neste momento.
```

**Antes de criar tag:**
```
A fase [nome] foi concluída e publicada.
Última tag estável: [tag anterior]
Commits desta fase: [colar git log --oneline]
Qual tag você recomenda criar e qual o comando git?
```

---

## Exemplos Práticos de Comandos para Anderson Usar no ChatGPT

**Análise de fase concluída:**
```
A Fase 4A.1 foi concluída. Revise o que foi entregue:
- Commits: [lista]
- Arquivos alterados: [lista]
- O que funcionou: [descrever]
- O que precisou de correção: [descrever]
Registre aprendizados relevantes para as próximas fases.
```

**Planejamento de próxima fase:**
```
Quero planejar a Fase 4B — Edição de Fichas e Exportação de Dados.
Contexto atual do projeto: [resumo]
O que preciso que você faça:
1. Apresente os arquivos que serão afetados.
2. Identifique riscos.
3. Sugira a sequência de agentes e etapas.
4. Proponha o prompt de instrução para o Claude iniciar a Fase 4B.
```

**Elaboração de relatório executivo:**
```
Preciso de um relatório executivo de [competência] para o COI.
Dados disponíveis: [resumo ou lista]
Público-alvo: [ex: Diretoria do COI]
Formato: [ex: tópicos curtos, linguagem executiva, sem termos técnicos]
```

**Diagnóstico de problema técnico:**
```
Estou com o seguinte problema no projeto COI:
[descrever o problema]
Retorno do terminal: [colar]
O que pode estar causando e como resolver?
```

---

*Última atualização: 2026-06-10 · Fase 4D.4 — Base de Interação Assistida no ChatGPT*
