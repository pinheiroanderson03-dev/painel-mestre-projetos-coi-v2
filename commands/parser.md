# CCL Parser -- Mapeamento de Comandos para Skills
# Versao v1.0 (Fase R3)

## Funcao do Parser

O parser CCL interpreta uma instrucao e determina:
1. Quais skills do pipeline devem ser ativadas.
2. Quais arquivos serao lidos (entradas).
3. Quais arquivos serao modificados (saidas).
4. Qual validacao deve ser executada ao final.

---

## Mapeamento Verbo -> Pipeline de Skills

| Verbo       | Skills ativadas (em ordem)                                                      |
|-------------|---------------------------------------------------------------------------------|
| EXEC        | MESTRE -> MEMORIA -> FORENSE -> ARQUITETO -> LEARNINGS -> EXECUTOR              |
| UPDATE      | MESTRE -> MEMORIA -> EXECUTOR                                                   |
| QA          | TESTES -> AUDITOR -> QA                                                         |
| REVIEW      | MESTRE -> FORENSE -> AUDITOR                                                    |
| DOC         | GOVERNANCA                                                                      |
| REL         | GOVERNANCA -> RELEASE-MANAGER                                                   |
| STATUS      | MEMORIA (leitura apenas)                                                        |
| RUNTIME     | GOVERNANCA (apenas .claude/RUNTIME.md + STATUS.md)                             |
| REGISTRY    | EXECUTOR (apenas registry/*.json)                                               |
| TEST        | TESTES -> QA                                                                    |
| RELEASE     | AUDITOR -> QA -> GOVERNANCA -> RELEASE-MANAGER                                 |
| COMMIT PREP | AUDITOR (lista de arquivos; sem git add)                                        |

---

## Mapeamento Modo -> Comportamento de Execucao

| Modo     | Antes de cada arquivo    | Apos erros       | Pre-requisito         |
|----------|--------------------------|------------------|-----------------------|
| FAST     | Nenhuma pausa            | Autocorrecao     | Nenhum                |
| SAFE     | Declarar + aguardar OK   | Parar + reportar | Nenhum                |
| CRITICAL | Declarar + flags ChatGPT | Parar + escalate | Review ChatGPT ativo  |

---

## Algoritmo de parsing

```
1. Receber instrucao: "COI <VERBO> [ALVO] [--modo M] [--escopo E]"
2. Validar prefixo COI
3. Extrair VERBO -- verificar em lista de 12 verbos oficiais
4. Extrair ALVO (opcional) -- usado para filtrar escopo
5. Extrair modo (default: FAST)
6. Extrair escopo (default: todos os arquivos do verbo)
7. Carregar pipeline de skills correspondente ao VERBO
8. Aplicar restricoes de modo
9. Executar pipeline
10. Validar saidas
11. Entregar relatorio de 6 itens
```

---

## Regras de escopo por verbo

### COI EXEC [ALVO]
- Sem alvo: executa fase corrente definida em RUNTIME.md
- Com alvo (ex: R3, 6.4): executa apenas essa fase
- `--escopo scripts`: limita a arquivos em scripts/
- `--escopo docs`: limita a arquivos em docs/
- `--escopo governance`: limita a CHANGELOG, ROADMAP, AGENTS, MEMORIA, ESTADO_ATUAL

### COI UPDATE [ALVO]
- `dados`: dados/projetos.js (CRITICAL obrigatorio)
- `docs`: documentos de governanca
- `registry`: arquivos registry/*.json
- `runtime`: .claude/RUNTIME.md + STATUS.md

### COI DOC [--escopo governance]
Arquivos afetados por escopo:
- governance: CHANGELOG.md, RELEASE_NOTES.md, ROADMAP_COI.md, docs/ESTADO_ATUAL_DO_PROJETO.md, docs/MEMORIA_OPERACIONAL_PROJETO.md
- agents: AGENTS.md (apenas secao indicada)
- runtime: .claude/RUNTIME.md, STATUS.md, INDEX.md

---

## Sinais de instrucao invalida

| Erro detectado                              | Acao do parser                          |
|---------------------------------------------|-----------------------------------------|
| Prefixo ausente (ex: "EXEC R3")            | Rejeitar -- solicitar COI EXEC R3       |
| Verbo nao reconhecido (ex: "COI BUILD")    | Rejeitar -- listar verbos validos       |
| CRITICAL sem alvo de revisao ChatGPT        | Alertar -- prosseguir em SAFE           |
| EXEC sem ALVO em fase ambigua               | Solicitar alvo antes de prosseguir      |
| Escopo proibido (dados/projetos.js em FAST) | Elevar modo para CRITICAL automaticamente|

---

## Saida padrao do parser (relatorio de 6 itens)

```
1. Arquivos criados
2. Arquivos alterados
3. Resumo tecnico
4. Validacoes executadas
5. Riscos identificados
6. Proximos passos recomendados
```
