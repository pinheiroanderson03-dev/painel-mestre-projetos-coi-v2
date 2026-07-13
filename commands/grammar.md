# CCL -- COI Command Language
# Gramatica Oficial v1.0 (Fase R3)
# Hierarquia: CCL > registry/commands.json > AGENTS.md

## Definicao

CCL e o padrao linguistico de instrucao para sessoes do projeto COI.
Toda tarefa tecnica com entregavel deve ser expressa em CCL antes da execucao.

---

## Sintaxe

```
COI <VERBO> [ALVO] [--modo <MODO>] [--escopo <ESCOPO>]
```

### Componentes

| Componente | Obrigatorio | Descricao                                     |
|------------|-------------|-----------------------------------------------|
| COI        | sim         | Prefixo identificador -- toda instrucao CCL   |
| VERBO      | sim         | Acao principal (ver lista em commands.json)   |
| ALVO       | nao         | Contexto especifico (fase, arquivo, modulo)   |
| --modo     | nao         | FAST (default) / SAFE / CRITICAL              |
| --escopo   | nao         | Limita acao a um conjunto de arquivos         |

---

## Verbos oficiais

| Verbo       | Alias  | Descricao curta                             |
|-------------|--------|---------------------------------------------|
| EXEC        | X      | Executa fase ou conjunto de tarefas         |
| UPDATE      | U      | Atualiza dados ou documentos operacionais   |
| QA          | Q      | Executa validacoes completas                |
| REVIEW      | RV     | Audita escopo, arquivos e protocolo         |
| DOC         | D      | Atualiza documentacao de governanca         |
| REL         | RL     | Gera release notes e changelog              |
| STATUS      | ST     | Exibe estado atual do projeto               |
| RUNTIME     | RT     | Atualiza .claude/RUNTIME.md                 |
| REGISTRY    | RG     | Consulta ou atualiza arquivos registry/     |
| TEST        | T      | Executa suite validar-funcional.js          |
| RELEASE     | RS     | Prepara pacote de entrega (9 itens)         |
| COMMIT PREP | CP     | Gera lista de arquivos para git add         |

---

## Modos de execucao

| Modo     | Comportamento                                                              |
|----------|----------------------------------------------------------------------------|
| FAST     | Default. Claude executa de forma autonoma sem pausas intermediarias.       |
| SAFE     | Claude pausa antes de cada arquivo modificado e aguarda confirmacao.       |
| CRITICAL | Claude pausa + sinaliza para review ChatGPT antes de qualquer alteracao.  |

### Quando usar cada modo

- **FAST**: documentacao, criacao de arquivos novos, validacoes, status.
- **SAFE**: alteracao de arquivos funcionais (JS, HTML, CSS), dados complexos.
- **CRITICAL**: qualquer acao que afete dados/projetos.js, arquitetura ou publicacao.

---

## Regras gramaticais

1. O prefixo `COI` e obrigatorio em toda instrucao CCL.
2. O VERBO deve ser um dos 12 verbos oficiais (ver tabela acima).
3. `--modo FAST` e implicito quando nenhum modo for especificado.
4. ALVO e livre mas recomenda-se usar identificadores de fase (ex: R3, 6.4) ou nomes de arquivos.
5. Combinacoes invalidas (ex: `COI COMMIT PREP --modo CRITICAL` para git add) devem ser recusadas.
6. CCL nao substitui as proibicoes de CLAUDE.md; apenas organiza o fluxo de execucao.

---

## Composicao de comandos

Multiplos comandos CCL podem ser compostos em sequencia:

```
COI EXEC R3 --modo FAST
COI TEST
COI DOC --escopo governance
COI REL v1.8.0
COI COMMIT PREP
```

Esta sequencia representa o fluxo completo de uma fase de implementacao.

---

## Compatibilidade com o fluxo de skills

```
CCL Input -> COI-MESTRE -> COI-MEMORIA -> COI-FORENSE -> COI-ARQUITETO
          -> COI-LEARNINGS -> COI-EXECUTOR -> COI-TESTES -> COI-AUDITOR
          -> COI-QA -> COI-GOVERNANCA -> COI-RELEASE-MANAGER
```

Cada verbo CCL mapeia para um subconjunto desse fluxo (ver parser.md).
