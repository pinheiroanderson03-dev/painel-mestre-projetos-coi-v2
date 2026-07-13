# INDEX -- Mapa de Documentos COI
> Indice completo de arquivos e sua finalidade.
> Para estado atual: STATUS.md | Para runtime operacional: .claude/RUNTIME.md

---

## COI OS -- Session Template (Fase R4)

> Template oficial de inicializacao de sessoes. Ler ao iniciar qualquer sessao.

| Arquivo                         | Localizacao      |
|---------------------------------|------------------|
| COI_SESSION_TEMPLATE.md         | Raiz do projeto  |
| docs/COI_SESSION_TEMPLATE.md    | docs/            |
| .claude/COI_SESSION_TEMPLATE.md | .claude/         |

---

## CCL -- COI Command Language (Fase R3)

> Padrao oficial de instrucao para sessoes COI.

| Arquivo                 | Conteudo                                         |
|-------------------------|--------------------------------------------------|
| commands/grammar.md     | Sintaxe, verbos, modos (FAST/SAFE/CRITICAL)      |
| commands/parser.md      | Mapeamento verbo -> pipeline de skills           |
| commands/commands.json  | 12 comandos oficiais com documentacao completa   |
| commands/aliases.json   | Aliases X/U/Q/RV/D/RL/ST/RT/RG/T/RS/CP + modos  |
| commands/examples.md    | Exemplos reais usando o projeto COI              |

---

## Registry (primeira fonte de consulta)

> Consultar antes de qualquer implementacao ou analise.

| Arquivo                    | Conteudo                                         |
|----------------------------|--------------------------------------------------|
| registry/README.md         | Guia: quando e como consultar cada registro      |
| registry/runtime.json      | Estado atual, restricoes, padroes tecnicos       |
| registry/agents.json       | 14 agentes/skills com papeis e dependencias      |
| registry/commands.json     | Comandos autonomos vs bloqueados + CCL           |
| registry/phases.json       | Historico de fases (concluidas e planejadas)     |
| registry/rules.json        | 12 regras operacionais ativas                    |
| registry/tests.json        | Suite 293 PASS / 13 secoes com contagens         |
| registry/dependencies.json | Node.js, Chart.js, Python3, Git, PS1, etc.       |
| registry/documents.json    | Inventario categorizado de documentos            |
| registry/modules.json      | COI Intelligence Engine (5 modulos)              |

---

## Leitura obrigatoria por sessao

| # | Arquivo                  | Quando ler                              |
|---|--------------------------|-----------------------------------------|
| 1 | .claude/RUNTIME.md       | Sempre (carregado automaticamente)      |
| 2 | STATUS.md                | Ao iniciar qualquer fase                |
| 3 | registry/README.md       | Antes de implementar ou consultar       |
| 4 | commands/grammar.md      | Antes de interpretar instrucao CCL      |
| 5 | COI_SESSION_TEMPLATE.md  | Ao iniciar nova sessao                  |

---

## Controle de versao e estado

| Arquivo                          | Conteudo                                         |
|----------------------------------|--------------------------------------------------|
| CHANGELOG.md                     | Historico de versoes                             |
| RELEASE_NOTES.md                 | Notas de versao por release                      |
| ROADMAP_COI.md                   | Planejamento de fases futuras                    |
| docs/ESTADO_ATUAL_DO_PROJETO.md  | Tabela historica de fases                        |
| docs/MEMORIA_OPERACIONAL_PROJETO.md | Registro operacional detalhado              |

---

## Regras e governanca

| Arquivo        | Conteudo                                                     |
|----------------|--------------------------------------------------------------|
| CLAUDE.md      | Instrucoes de comportamento e regras de seguranca            |
| AGENTS.md      | 20 secoes de regras operacionais detalhadas                  |

---

## Skills operacionais (.claude/skills/)

| Skill                   | Papel                                   | Ordem |
|-------------------------|-----------------------------------------|-------|
| COI-MESTRE.md           | Orquestrador (unica porta de entrada)   | 0     |
| COI-MEMORIA.md          | Estado atual, erros, alertas            | 1     |
| COI-FORENSE.md          | Evidencias vs hipoteses                 | 2     |
| COI-ARQUITETO.md        | Plano de execucao                       | 3     |
| COI-LEARNINGS.md        | Prevencao de erros; base DAR            | 4     |
| COI-EXECUTOR.md         | Implementacao segura                    | 5     |
| COI-TESTES.md           | Suite T1 a T6 pre-QA                   | 6     |
| COI-AUDITOR.md          | Auditoria de escopo e protocolo         | 7     |
| COI-QA.md               | Validacao completa                      | 8     |
| COI-GOVERNANCA.md       | Atualizacao de documentos de estado     | 9     |
| COI-RELEASE-MANAGER.md  | Pacote de entrega (9 itens)             | 10    |

---

## COI Intelligence Engine (scripts/)

| Modulo                           | Versao | Status    |
|----------------------------------|--------|-----------|
| coi-analista-inteligente.js      | v1.0   | Producao  |
| coi-curador-inteligente.js       | v1.0   | Producao  |
| coi-auditor-inteligente.js       | v1.0   | Producao  |
| coi-daily.js                     | -      | Planejado |
| coi-weekly.js                    | -      | Planejado |

---

## Scripts de validacao (scripts/)

| Script                  | Tipo         | Finalidade                              |
|-------------------------|--------------|-----------------------------------------|
| validar-funcional.js    | Node.js      | 293 PASS / 0 FAIL / 13 secoes          |
| validar-projeto.ps1     | PowerShell   | Validacao estrutural (ASCII puro)        |
| validar-docs.ps1        | PowerShell   | Validacao de documentos (ASCII puro)     |
| validar-dados.ps1       | PowerShell   | Validacao de dados/projetos.js           |

---

## Infraestrutura (COI Runtime -- Fases R1/R2/R3/R4)

| Arquivo              | Finalidade                                        |
|----------------------|---------------------------------------------------|
| .claude/RUNTIME.md   | Estado operacional (carregado auto, ~60 linhas)   |
| STATUS.md            | Tabelas detalhadas de estado e pendencias         |
| INDEX.md             | Este arquivo -- mapa completo de documentos       |
| registry/            | 9 registros JSON -- fonte primaria de consulta    |
| commands/            | CCL -- 4 docs + 1 JSON de definicao               |
| COI_SESSION_TEMPLATE.md | Template oficial de sessao (3 copias)         |
