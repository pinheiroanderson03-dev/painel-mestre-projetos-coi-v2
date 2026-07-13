# COI SESSION TEMPLATE
> Documento oficial de inicializacao de sessoes do projeto COI.
> Versao: v1.0 | Fase: R4 | Data: 2026-07-13
> Hierarquia: SESSION_TEMPLATE > RUNTIME.md > registry/ > AGENTS.md

---

## Historico de versoes

| Versao | Data       | Descricao                         |
|--------|------------|-----------------------------------|
| v1.0   | 2026-07-13 | Criacao inicial (Fase R4 -- COI OS) |

---

## Objetivo

Reduzir tempo de contexto, consumo de tokens e padronizar o fluxo operacional
entre Anderson, ChatGPT e Claude. Garantir que qualquer nova sessao seja
consistente, previsivel e reutilizavel sem reconstrucao de contexto.

---

## Escopo

Este template se aplica a toda e qualquer sessao do projeto COI, independente
de qual esteira (Plataforma ou Operacao) ou qual agente esteja conduzindo.

---

## 1. VISAO DO COI

### O que e o COI
COI = Comunicacao Omnichannel Inteligente. Plataforma proprietaria da Central IT
que integra canais de atendimento (telefonia, WhatsApp, chat, email) com
inteligencia artificial, automacao e governanca operacional para o GDF (cliente).

### O que e o Painel Mestre
Dashboard web executivo que consolida todos os projetos, demandas e indicadores
do COI em tempo real. Arquivos principais: index.html, portfolio.html,
projetos/ficha.html, assets/style.css, dados/projetos.js.

### O que e o COI OS
Sistema operacional do projeto: conjunto de padroes, documentos, registros e
ferramentas que governam como Anderson, ChatGPT e Claude trabalham juntos.
Componentes: Runtime, Registry, Command Language, Operating Protocol.

### O que e o Intelligence Engine
Motor de analise e recomendacao com 5 modulos em pipeline:
Analista -> Curador -> Auditor -> Daily (planejado) -> Weekly (planejado).
Localizado em scripts/coi-*.js.

### O que e o Runtime
Arquivo .claude/RUNTIME.md: estado operacional ativo (~50 linhas), carregado
automaticamente a cada sessao. Substitui leitura de 3.300+ linhas de docs.
Versao atual: v1.8.0 | Fase: R3 concluida.

### O que e o Registry
Pasta registry/ com 9 arquivos JSON: fonte primaria de consulta antes de
qualquer implementacao. Cobre estado, agentes, comandos, fases, regras,
testes, dependencias, documentos e modulos.

### O que e a Command Language (CCL)
Padrao oficial de instrucao para sessoes COI. 12 verbos (EXEC, UPDATE, QA,
REVIEW, DOC, REL, STATUS, RUNTIME, REGISTRY, TEST, RELEASE, COMMIT PREP),
3 modos (FAST/SAFE/CRITICAL). Definida em commands/.

### Arquitetura geral

```
Anderson (PO)  <-->  ChatGPT (Arquiteto)  <-->  Claude (Executor)
                              |
                    COI OS (Sistema Operacional)
                    +---------+----------+----------+
                    | Runtime | Registry | CCL      |
                    +---------+----------+----------+
                              |
                    Painel Mestre (Dashboard Web)
                    +-----------+------------------+
                    | index.html | portfolio.html  |
                    | ficha.html | style.css        |
                    | projetos.js (dados)           |
                    +-------------------------------+
                              |
                    Intelligence Engine (Scripts)
                    +----------+----------+---------+
                    | Analista | Curador  | Auditor |
                    +----------+----------+---------+
```

---

## 2. PAPEIS

### Anderson -- Product Owner
- Aprovacao de todas as alteracoes criticas
- Gestao do contrato com o GDF
- Autorizacao de git add, commit, push, merge, tag
- Decisao final sobre arquitetura e escopo
- Nao executa codigo; aprova e valida resultados

### ChatGPT -- Arquiteto Chefe
- Planejamento de fases e arquitetura
- Governanca e definicao de padroes
- QA critico pre-publicacao
- Revisao de decisoes de alto impacto
- Evolucao do COI OS
- Valida antes de qualquer push para producao

### Claude -- Executor Tecnico
- Implementacao de codigo (JS, HTML, CSS)
- Refatoracao e correcao de bugs
- Criacao e atualizacao de documentacao
- Execucao de testes e validacoes
- Operacao autonoma dentro dos limites definidos em CLAUDE.md
- Entrega relatorio de 6 itens ao final de cada fase

### Modelo de delegacao

```
Anderson (aprovacao)
    |
    v
Claude (execucao autonoma -- dentro dos limites)
    |
    v
ChatGPT (validacao critica pre-publicacao)
```

---

## 3. LEITURA OBRIGATORIA

Toda sessao deve consultar obrigatoriamente na ordem abaixo.
Nao consultar documentacao adicional sem necessidade real.

| # | Arquivo                | O que fornece                              |
|---|------------------------|--------------------------------------------|
| 1 | .claude/RUNTIME.md     | Estado atual: versao, branch, commit, erros |
| 2 | STATUS.md              | Fases, pendencias e proximos passos        |
| 3 | INDEX.md               | Mapa completo de documentos do projeto     |
| 4 | registry/              | Fonte primaria: agentes, regras, fases     |
| 5 | AGENTS.md              | Regras operacionais detalhadas (19 secoes) |
| 6 | ROADMAP_COI.md         | Planejamento de fases futuras              |

---

## 4. CHECKPOINT INICIAL

Executar obrigatoriamente ao iniciar qualquer sessao.
Nunca assumir informacoes sem verificar.

```bash
git branch --show-current          # branch atual
git status                         # arquivos modificados/nao rastreados
git log --oneline -3               # ultimos commits
git tag --sort=-v:refname | head -3 # ultima tag
```

Verificar tambem:
- RUNTIME.md: VERSAO, FASE_ATUAL, COMMITS_PENDENTES
- registry/runtime.json: estado estruturado
- STATUS.md: pendencias e proximos passos

---

## 5. ESTEIRAS

### ESTEIRA 1 -- PLATAFORMA

Evolucao do COI OS e da infraestrutura tecnica do projeto.

| Componente         | Descricao                                          |
|--------------------|----------------------------------------------------|
| Runtime            | .claude/RUNTIME.md -- estado operacional           |
| Registry           | registry/*.json -- fonte primaria de consulta      |
| Command Language   | commands/ -- CCL (12 verbos, 3 modos)              |
| Operating Protocol | CLAUDE.md + AGENTS.md -- regras de operacao        |
| Dashboard          | index.html, portfolio.html, ficha.html             |
| DevOps             | Scripts PS1, git flow, branches                    |
| Automation         | Scripts de validacao (validar-funcional.js, PS1)   |
| Intelligence       | COI Intelligence Engine (Analista/Curador/Auditor) |

### ESTEIRA 2 -- OPERACAO

Atualizacao continua dos dados e acompanhamento dos projetos.

| Componente      | Descricao                                              |
|-----------------|--------------------------------------------------------|
| Projetos        | Atualizacao de status, percentual, entregas            |
| Demandas        | Registro de novas demandas e alteracoes                |
| Historico       | Registro de execucoes mensais (execucoesMensais)       |
| Percentuais     | Avanco de cada projeto (%conclusao)                    |
| Indicadores     | KPIs do COI (SLA, CSAT, volume, disponibilidade)       |
| Proximas acoes  | Definicao e atualizacao de nextSteps por projeto       |
| Health Score    | Score calculado pelo COI Auditor Inteligente           |

---

## 6. PERGUNTAS INICIAIS

Toda sessao deve responder antes de qualquer execucao:

1. Qual evolucao sera feita na Plataforma (Esteira 1)?
2. Quais projetos precisam ser atualizados (Esteira 2)?
3. Existe alguma pendencia critica no STATUS.md?
4. Existe alguma publicacao pendente aguardando autorizacao?

---

## 7. PRINCIPIOS

Antes de qualquer implementacao, validar:

| Principio                  | Pergunta                                           |
|----------------------------|----------------------------------------------------|
| Solucao mais simples       | Existe alternativa mais simples e segura?          |
| Reutilizacao               | Existe codigo ou doc reutilizavel?                 |
| Runtime first              | O Runtime ja resolve ou ja documenta isso?         |
| Registry first             | O Registry ja tem esse dado estruturado?           |
| Command first              | Existe um comando CCL para essa acao?              |
| Documentacao existente     | Ja existe documentacao que cobre esse cenario?     |
| Impacto arquitetural       | Esta mudanca afeta a arquitetura geral?            |

---

## 8. REGRA DE OURO

Toda fase deve seguir obrigatoriamente este fluxo:

```
Arquitetura   -- definir o que sera feito e como
     |
Planejamento  -- escopo, arquivos, riscos
     |
Execucao      -- implementacao controlada (COI-EXECUTOR)
     |
Validacao     -- testes, QA, git diff --check (COI-TESTES -> COI-QA)
     |
Governanca    -- atualizar docs de estado (COI-GOVERNANCA)
     |
Publicacao    -- commit + push (autorizacao Anderson)
```

Nenhuma etapa pode ser pulada.

---

## 9. PADRAO DE ENTREGA

Toda resposta com entregavel tecnico deve conter:

| # | Campo           | Conteudo esperado                                    |
|---|-----------------|------------------------------------------------------|
| 1 | Objetivo        | O que foi feito e por que                           |
| 2 | Arquivos        | Criados e alterados (com nome e descricao)           |
| 3 | Resumo          | O que mudou tecnicamente                            |
| 4 | Validacoes      | Resultados de testes e checks                       |
| 5 | Riscos          | Riscos identificados e mitigacoes                   |
| 6 | Proximos passos | Acoes recomendadas (sem executar as criticas)        |

---

## 10. CHECKLIST DE ENCERRAMENTO

Executar ao final de cada fase antes de solicitar commit:

- [ ] Runtime atualizado (.claude/RUNTIME.md)
- [ ] Registry atualizado (registry/runtime.json, registry/phases.json)
- [ ] STATUS.md atualizado (nova fase na tabela)
- [ ] INDEX.md atualizado (novos arquivos indexados)
- [ ] ROADMAP_COI.md atualizado (fase concluida marcada)
- [ ] RELEASE_NOTES.md atualizado (nova versao)
- [ ] CHANGELOG.md atualizado (nova versao)
- [ ] QA executado (node scripts/validar-funcional.js -> 0 FAIL)
- [ ] Git diff --check limpo
- [ ] COI COMMIT PREP executado (lista de arquivos para Anderson)

---

## 11. CHECKPOINT DE CONTEXTO

Responder internamente antes de cada acao:

| Pergunta                                        | Fonte de resposta           |
|-------------------------------------------------|-----------------------------|
| Onde estamos? (versao, fase, branch)            | .claude/RUNTIME.md          |
| O que mudou desde o ultimo commit?              | git diff --name-only        |
| O que esta pendente?                            | STATUS.md (pendencias)      |
| Qual e a prioridade desta demanda?              | P0/P1/P2/P3 (AGENTS.md)     |
| Esta demanda e Plataforma ou Operacao?          | Ver secao 5 (Esteiras)      |
| Existe algo reutilizavel no Registry?           | registry/*.json             |

---

## 12. MELHORES PRATICAS

| Pratica                          | Descricao                                        |
|----------------------------------|--------------------------------------------------|
| Nunca reconstruir contexto       | Sempre usar RUNTIME.md e Registry               |
| Reutilizar Runtime               | Se ja esta no Runtime, nao duplicar             |
| Reutilizar Registry              | Consultar antes de criar qualquer estrutura     |
| Reduzir tokens                   | Respostas concisas; sem recaps desnecessarios   |
| Reduzir contexto                 | Nao ler docs que o Runtime ja cobre            |
| Priorizar arquitetura            | Decisao de arquitetura antes de implementar     |
| Priorizar reutilizacao           | DRY: nao duplicar logica ja existente           |
| Nunca inventar dados             | Consultar fontes reais; nunca assumir           |
| Separar Plataforma de Operacao   | Esteiras distintas; nao misturar escopos        |
| Sempre entregar 6 itens          | Formato padrao de entrega em toda resposta      |

---

## 13. EVOLUCAO CONTINUA

Principio oficial do COI: a cada nova fase o projeto deve se tornar:

- **Mais simples** -- menos codigo, menos contexto, menos fricao
- **Mais rapido** -- sessoes mais curtas, menos tokens, mais autonomia
- **Mais reutilizavel** -- Runtime, Registry e CCL crescem a cada fase
- **Mais inteligente** -- Intelligence Engine e Auditor evoluem
- **Mais autonomo** -- Claude executa mais; Anderson aprova menos vezes

### Regra de automacao

Sempre que uma melhoria puder ser automatizada, ela deve entrar em:
- **Runtime** (.claude/RUNTIME.md) -- se e estado ou padrao
- **Registry** (registry/*.json) -- se e dado estruturado
- **CCL** (commands/) -- se e fluxo de execucao
- **COI OS** -- se e principio ou politica

---

## 14. ROADMAP DO COI OS

Evolucao prevista da plataforma de operacao:

```
COI OS (base)              -- v1.8.0 -- atual
     |
     v
Runtime                    -- v1.7.1 -- CONCLUIDO (R1.1)
     |
     v
Registry                   -- v1.7.1 -- CONCLUIDO (R2)
     |
     v
Command Language (CCL)     -- v1.8.0 -- CONCLUIDO (R3)
     |
     v
Operating Protocol         -- v1.8.0 -- CONCLUIDO (R4 -- este doc)
     |
     v
Context Engine             -- planejado -- reducao de contexto por fase
     |
     v
Memory Engine              -- planejado -- memoria persistente entre sessoes
     |
     v
Knowledge Graph            -- planejado -- grafo de dependencias do projeto
     |
     v
Automation                 -- planejado -- execucao automatica de fases
     |
     v
Developer Experience       -- planejado -- onboarding zero-friction
```

---

*Este documento e gerenciado pelo COI OS -- Fase R4.*
*Atualizar sempre que houver mudanca estrutural no COI OS.*
*Sincronizar obrigatoriamente: COI_SESSION_TEMPLATE.md / docs/ / .claude/*
