# Registry — Fonte Unica de Consulta do Projeto COI

O Registry e o ponto de partida estruturado para qualquer agente que precise entender
o estado, as regras, os modulos ou as dependencias do Painel Mestre COI.

> Antes de qualquer tarefa tecnica, consulte o Registry.
> Antes de qualquer duvida sobre regras, consulte o Registry.
> Antes de qualquer implementacao, consulte o Registry.

---

## Arquivos do Registry

| Arquivo             | Conteudo                                      | Quando consultar                          |
|---------------------|-----------------------------------------------|-------------------------------------------|
| runtime.json        | Estado operacional: versao, branch, restricoes| Inicio de toda sessao                     |
| agents.json         | Skills, papeis e responsabilidades            | Ao acionar qualquer agente ou skill       |
| commands.json       | Comandos autonomos vs bloqueados              | Antes de executar qualquer comando git    |
| phases.json         | Todas as fases: historico e planejadas        | Ao iniciar nova fase ou auditar historico |
| rules.json          | 12 regras operacionais ativas                 | Antes de qualquer decisao de escopo       |
| tests.json          | Suite de 293 assertions em 13 secoes          | Ao alterar scripts ou estrutura de dados  |
| dependencies.json   | Node.js, Chart.js, Python3, Git, PowerShell   | Ao configurar ambiente ou depurar         |
| documents.json      | Inventario completo de documentos do projeto  | Ao buscar qualquer documento              |
| modules.json        | COI Intelligence Engine e seus modulos        | Ao trabalhar com Engine ou pipeline       |

---

## Como consultar o Registry

### 1. Inicio de sessao (obrigatorio)

Ler nesta ordem:
1. `.claude/RUNTIME.md` — estado comprimido (30 linhas, carregamento automatico)
2. `registry/runtime.json` — estado estruturado completo
3. `STATUS.md` — versao, fases, pendencias

### 2. Antes de implementar

```
registry/rules.json      -> verificar regras aplicaveis a tarefa
registry/commands.json   -> confirmar se comandos necessarios sao autonomos ou bloqueados
registry/tests.json      -> identificar secoes de teste impactadas
```

### 3. Ao iniciar nova fase

```
registry/phases.json     -> verificar dependencias da nova fase
registry/tests.json      -> identificar secoes de teste que precisam ser adicionadas ou atualizadas
registry/agents.json     -> confirmar skills envolvidas no pipeline
```

### 4. Ao trabalhar com o Intelligence Engine

```
registry/modules.json    -> verificar interface padrao, pipeline e dependencias entre modulos
registry/dependencies.json -> confirmar versao de Node.js e modulos necessarios
registry/tests.json -> secoes S12 (Curador) e S13 (Auditor)
```

### 5. Ao executar comandos git

```
registry/commands.json -> categorias "autonomos" (ok) vs "bloqueados" (autorizacao Anderson)
```

---

## Regra de manutencao

O Registry deve ser atualizado ao fechar cada fase (COI-GOVERNANCA, passo 1):

- `runtime.json` — sempre: versao, branch, ultimo_commit, commits_pendentes
- `phases.json` — sempre: status da fase concluida, adicionar proxima
- `tests.json` — quando houver nova secao em validar-funcional.js
- `agents.json` — quando houver nova skill ou modulo
- `modules.json` — quando houver novo modulo do Intelligence Engine
- `rules.json` — quando houver nova regra operacional
- `commands.json` — quando houver mudanca na politica de autonomia
- `dependencies.json` — quando houver nova dependencia tecnica

---

## Hierarquia de verdade

Quando houver conflito entre fontes, a prioridade e:

1. `registry/runtime.json` — estado atual (mais recente)
2. `registry/rules.json` — regras operacionais
3. `CLAUDE.md` — instrucoes de identidade e fluxo
4. `.claude/skills/*.md` — comportamento detalhado por etapa
5. `AGENTS.md` — regras e historico completos
6. `CHANGELOG.md` / `STATUS.md` — historico de versoes

---

## Estrutura de cada entrada do Registry

Todos os registros seguem o schema:

```json
{
  "id": "identificador unico",
  "nome": "nome legivel",
  "descricao": "o que e e para que serve",
  "versao": "versao de criacao ou ultima mudanca relevante",
  "status": "ativo | planejado | legado | arquivado",
  "dependencias": ["lista de IDs de dependencias"],
  "arquivos": ["arquivos relevantes do projeto"],
  "validacoes": ["como verificar que esta correto"],
  "ultimaAtualizacao": "YYYY-MM-DD"
}
```
