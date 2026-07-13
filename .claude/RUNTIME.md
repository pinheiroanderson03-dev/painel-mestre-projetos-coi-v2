# COI RUNTIME -- Estado Operacional Ativo
# Atualizar ao fechar cada fase (COI-GOVERNANCA, passo 1)
# Hierarquia: RUNTIME > rules.json > CLAUDE.md > skills > AGENTS.md

PROJETO    : Painel Mestre COI -- Comunicacao Omnichannel Inteligente -- Central IT
VERSAO     : v1.9.0
FASE_ATUAL : R4 concluida (COI OS -- Session Template)
PROXIMA    : 6.4 (COI Daily) ou R1.2 (simplificacao docs)
BRANCH     : fase-5c-2-atualizacao-coi-009-aiops
ULTIMO_COMMIT : 3a71c5e feat(5C.2-5C.3)

VALIDADOR  : node scripts/validar-funcional.js -> 293 PASS / 0 FAIL / 13 secoes
DADOS_JS   : dados/projetos.js v1.4.1 -- 13 projetos

COMMITS_PENDENTES: sim -- fases 5B.4 a R4 -- git add + commit (autorizacao Anderson)

-- SESSION TEMPLATE (COI OS) --
TEMPLATE   : COI_SESSION_TEMPLATE.md (raiz / docs/ / .claude/)
ESTEIRAS   : PLATAFORMA (Runtime/Registry/CCL/OS) | OPERACAO (dados/projetos)
CHECKPOINT : git branch, git status, git log -3, git tag

-- CCL (COI Command Language) --
GRAMATICA  : commands/grammar.md
PARSER     : commands/parser.md
COMANDOS   : commands/commands.json (12 verbos oficiais)
ALIASES    : commands/aliases.json
EXEMPLOS   : commands/examples.md
MODOS      : FAST (default) | SAFE | CRITICAL

-- REGISTRY (primeira fonte de consulta) --
ESTADO     : registry/runtime.json
AGENTES    : registry/agents.json
COMANDOS   : registry/commands.json
FASES      : registry/phases.json
REGRAS     : registry/rules.json
TESTES     : registry/tests.json
DEPS       : registry/dependencies.json
DOCS       : registry/documents.json
MODULOS    : registry/modules.json
GUIA       : registry/README.md

-- PROIBICOES ABSOLUTAS --
git_criticos : add/commit/push/merge/tag/reset/restore/clean -> autorizacao Anderson
dados        : dados/projetos.js -> nao alterar sem autorizacao explicita
branch       : publicacao-demandas-central-df -> nunca tocar
skills       : .claude/skills/* -> nao alterar conteudo

-- PADROES TECNICOS --
js_style     : ES5 (var, 'use strict', sem arrow functions)
ps1_encoding : ASCII puro (sem acentos, caracteres <= 127)
file_write   : python3 com encoding='utf-8', newline='\n'
validacao    : node scripts/validar-funcional.js (293 PASS esperado)

-- ERROS CRITICOS ATIVOS --
E-006A : PS1 rejeita acentos -> sempre ASCII em scripts PowerShell
E-007  : Unicode em JS causa truncamento -> usar python3 para arquivos extensos

ENTRADA_OPERACIONAL : .claude/skills/COI-MESTRE.md
ENTRADA_CCL         : commands/grammar.md
SESSION_TEMPLATE    : COI_SESSION_TEMPLATE.md
INDICE_DOCUMENTOS   : INDEX.md
STATUS_DETALHADO    : STATUS.md
