# INDEX -- Mapa de Documentos COI
> Indice completo de arquivos e sua finalidade.
> Para estado atual: STATUS.md | Para runtime operacional: .claude/RUNTIME.md

---

## Registry (primeira fonte de consulta)

> Consultar antes de qualquer implementacao ou analise.

| Arquivo                    | Conteudo                                         |
|----------------------------|--------------------------------------------------|
| registry/README.md         | Guia: quando e como consultar cada registro      |
| registry/runtime.json      | Estado atual, restricoes, padroes tecnicos       |
| registry/agents.json       | 14 agentes/skills com papeis e dependencias      |
| registry/commands.json     | Comandos autonomos vs bloqueados vs proibidos    |
| registry/phases.json       | Historico de 18 fases (concluidas e planejadas)  |
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

---

## Controle de versao e estado

| Arquivo                          | Conteudo                                         |
|----------------------------------|--------------------------------------------------|
| CHANGELOG.md                     | Historico de versoes (v1.0.0 a v1.7.0)          |
| RELEASE_NOTES.md                 | Notas de versao por release                      |
| ROADMAP_COI.md                   | Planejamento de fases futuras                    |
| docs/ESTADO_ATUAL_DO_PROJETO.md  | Tabela historica de fases                        |
| docs/MEMORIA_OPERACIONAL_PROJETO.md | Registro operacional detalhado              |

---

## Regras e governanca

| Arquivo        | Conteudo                                                     |
|----------------|--------------------------------------------------------------|
| CLAUDE.md      | Instrucoes de comportamento e regras de seguranca            |
| AGENTS.md      | 18 secoes de regras operacionais detalhadas                  |

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

## Documentacao tecnica (docs/)

| Arquivo                         | Conteudo                                         |
|---------------------------------|--------------------------------------------------|
| docs/ARQUITETURA.md             | Visao geral da arquitetura do sistema            |
| docs/API_CURADOR.md             | Documentacao da API do COI Curador               |
| docs/API_AUDITOR.md             | Documentacao da API do COI Auditor               |
| docs/PADROES_CODIGO.md          | ES5, PS1 ASCII, python3 utf-8                    |
| docs/GUIA_VALIDACAO.md          | Como executar e interpretar validacoes           |

---

## Infraestrutura (COI Runtime -- Fase R1)

| Arquivo              | Finalidade                                        |
|----------------------|---------------------------------------------------|
| .claude/RUNTIME.md   | Estado operacional (30 linhas, carregado auto)    |
| STATUS.md            | Tabelas detalhadas de estado e pendencias         |
| INDEX.md             | Este arquivo -- mapa completo de documentos       |
| registry/            | 9 registros JSON -- fonte primaria de consulta    |
