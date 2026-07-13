
## [v1.6.1] -- Fase 6.2.1 -- COI Curador Inteligente -- Refinamento -- 2026-07-07

## [1.7.0] — Fase 6.3 — COI Auditor Inteligente

### Adicionado
- `scripts/coi-auditor-inteligente.js` (510 linhas): segundo módulo do COI Intelligence Engine
  - Consome JSON do COI Curador via `child_process.spawnSync`
  - Interface padrão: `execute()`, `score()`, `recommendations()`, `export(formato)`
  - Saídas: `--resumo`, `--json`, `--md` (relatório executivo Markdown)
  - JSON schema v1.0: `{ schema, engine, resumo, indicadores, auditoria, tendencias, recomendacoes }`
  - Classificação de Saúde Geral: Excelente / Boa / Atencao / Critica
  - Classificação de Criticidade: Baixa / Media / Alta / Critica
  - Exit code 1 quando criticidade Alta ou Crítica
- `scripts/validar-funcional.js`: Seção 13 com 45 assertions para COI Auditor (294 PASS total)
- Governança: AGENTS.md Seção 18, CHANGELOG v1.7.0, RELEASE_NOTES v1.7.0, ROADMAP Fase 6.3, ESTADO_ATUAL v1.7.0, MEMORIA Fase 6.3

---


### Adicionado
- `config/regras-curador.js`: configuracao centralizada das 12 regras de validacao
  - id, nome, peso, severidade, obrigatoria, ativa, validar(p, ctx)
  - Permite desativar/ajustar regras sem alterar o motor
  - Preparado para adicao de novas regras sem alteracao do motor

### Alterado
- `scripts/coi-curador-inteligente.js`: refatorado para separacao motor/regras
  - Carrega regras de config/regras-curador.js via require
  - Score calculado com peso por regra (nao mais peso fixo global)
  - Adicionada flag --json: saida estruturada para integracao futura
  - Saida JSON: resumo, indicadores, itens, erros, alertas, recomendacoes
- `scripts/validar-funcional.js`: Secao 12 atualizada para Fase 6.2.1
  - S12-05 a S12-09: verificacoes de config/regras-curador.js
  - S12-17 a S12-23: verificacoes do motor refatorado e --json
  - `config/regras-curador.js` adicionado a lista de arquivos obrigatorios
  - Total validador: 249 PASS / 0 FAIL / 12 secoes

## [v1.6.0] — Fase 6.2 — COI Curador Inteligente — 2026-07-07

### Adicionado
- `scripts/coi-curador-inteligente.js`: primeiro modulo funcional do COI Intelligence Engine
  - 12 regras de validacao automatica (R01 a R12)
  - Score de qualidade por item (0-100) com classificacao Excelente/Bom/Atencao/Critico
  - Diagnostico automatico: erros, alertas, recomendacoes, criticidade, situacao geral
  - Mock de localStorage para carregamento seguro em Node.js
  - Flags: --resumo (consolidado), --item COI-XXX (item especifico)
  - Exit code 0 = portfolio aceitavel | 1 = itens criticos
- Secao 12 em `scripts/validar-funcional.js`: 25 novos asserts para o Curador
  - `scripts/coi-curador-inteligente.js` adicionado a lista de arquivos obrigatorios (Secao 1)
  - Total validador: 230 PASS / 0 FAIL / 12 secoes
- Secao 17 em `AGENTS.md`: documentacao completa do COI Curador Inteligente

### Resultado da execucao (portfolio atual)
- Score medio: 50/100 (Critico — dados insuficientes para analise completa)
- Excelente: 1 item | Atencao: 3 itens | Critico: 9 itens
- Total erros: 27 | Total alertas: 64 | Itens sem violacoes: 1

## [v1.5.0] — Fase 6.1-RF — COI Intelligence Engine — Revisao Final — 2026-06-26

### Atualizado (documental — sem alteracao de arquivos funcionais)
- `docs/ARQUITETURA_COI_INTELLIGENCE.md`: conceito consolidado como COI Intelligence Engine; COI Analista reposicionado como modulo do Engine; fluxo oficial de 7 etapas (Dados > Analise > Classificacao > Priorizacao > Recomendacao > Acao > Aprendizado); 6 niveis de maturidade; tabela de modulos; diagrama de integracao revisado
- `docs/AGENTE_COI_ANALISTA.md`: identidade atualizada para Modulo do COI Intelligence Engine; missao referencia as 7 etapas do fluxo oficial; historico de versoes: v1.1
- `docs/MODELO_RECOMENDACOES_IA.md`: titulo e objetivo atualizados para COI Intelligence Engine; modelo declarado como compartilhado por todos os modulos do Engine
- `docs/ROADMAP_COI_IA.md`: titulo atualizado para ROADMAP COI INTELLIGENCE ENGINE; tabela de 6 niveis de maturidade adicionada; Fase 6.1 marcada como Concluida; cronograma ampliado com coluna de nivel de maturidade
- `AGENTS.md`: Secao 16 atualizada — COI Intelligence Engine; fluxo do Engine; niveis de maturidade; referencia a INDICADORES_INTELIGENCIA.md
- `docs/INDICADORES_INTELIGENCIA.md` (NOVO): indicadores de maturidade, desempenho, adocao e saude dos dados; consolidado padrao de sessao de analise; evolucao por fase

### Nao alterado (escopo preservado)
- `dados/projetos.js`, `index.html`, `portfolio.html`, `projetos/ficha.html`, `assets/style.css`, `scripts/*`, `.claude/skills/*`

---

## [v1.5.0] — Fase 6.1 — COI Analista — 2026-06-26

### Adicionado (documental — sem alteracao de arquivos funcionais)
- `docs/ARQUITETURA_COI_INTELLIGENCE.md`: arquitetura das 5 camadas da COI Intelligence (Dados, Analise, Recomendacao, Apresentacao, Governanca)
- `docs/AGENTE_COI_ANALISTA.md`: especificacao completa do COI Analista — 9 responsabilidades, entradas, saidas, fluxo de ativacao, limites e integracao com agentes existentes
- `docs/MODELO_RECOMENDACOES_IA.md`: modelo padrao de 8 campos para recomendacoes; 7 tipos; 6 status; 4 exemplos completos
- `docs/ROADMAP_COI_IA.md`: roadmap de 6 fases da COI Intelligence (6.1 a 6.6); cronograma; dependencias criticas; indicadores de sucesso
- `AGENTS.md`: Secao 16 — COI Intelligence; posicao no fluxo; restricoes da Fase 6.1; referencias

### Nao alterado (escopo preservado)
- `dados/projetos.js`, `index.html`, `portfolio.html`, `projetos/ficha.html`, `assets/style.css`, `scripts/*`, `.claude/skills/*`

---

## [v1.4.1] — Fase 5B.5 — 2026-06-26

### Adicionado
- `dados/projetos.js`: COI-013 atualizado — nome "MDS — Sistema de Ouvidoria (OuvSUAS)", percentual 50%, 5 novos campos: `objetivo`, `situacaoAtual`, `historicoOperacional[]`, `proximasAcoes[]`, `riscosRegistrados[]`
- `projetos/ficha.html`: função `renderFichaPadrao(p)` — 9 seções padrão oficiais (Resumo Executivo, Objetivo, Situação Atual, Histórico, Próximas Ações, Riscos, Dependências, Evidências, Obs. Operacionais)
- `assets/style.css`: namespace `.fp-*` para cards de resumo executivo

### Padrão
- Layout de 9 seções aplicado a TODOS os projetos via template universal
- Fallback "Não informado." para campos ausentes
- Preservação total de funcionalidades existentes (localStorage, edição, filtros, dashboard)

---

## [v1.4.1] — Fase 5B.4 — 2026-06-26

### Adicionado
- `index.html`: funcao `buildIndicadoresOperacionais()` — calcula e renderiza 7 grupos de indicadores dinamicamente a partir de `dados/projetos.js`
- `index.html`: 5 novos cards de demandas operacionais (`#op-total`, `#op-andamento`, `#op-concluidas`, `#op-criticas`, `#op-atrasadas`)
- `index.html`: secao `#op-analiticos` com grupos: Projetos Estrategicos, Percentual de Conclusao, Prioridade, Semaforo, Distribuicao por Cliente, Distribuicao por Responsavel
- `assets/style.css`: namespace `.op-*` — mini-cards, grupos analiticos, barras de distribuicao
- `scripts/validar-funcional.js`: Secao 11 — 24 novos asserts para Fase 5B.4 (total: 117 asserts)

### Regras
- Todos os valores calculados dinamicamente — zero numeros fixos no HTML para indicadores operacionais
- Origem exclusiva: `dados/projetos.js` (nao alterado nesta fase)

---

# CHANGELOG — Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

---

## v1.4.1 — Fase 5C.4: Consolidacao de Conhecimento e Memoria Operacional (2026-06-26)

**Branch:** `fase-5c-2-atualizacao-coi-009-aiops`

**Objetivo:** Consolidar conhecimento das Fases 5B e 5C para garantir consistencia nas proximas evolucoes.

**Arquivo criado:** nenhum

**Arquivos atualizados:**
- `docs/PROTOCOLO_VALIDACAO_OBRIGATORIA.md` — Secao 4.3: validar-docs.ps1 adicionado; prerequisitos de commit atualizados
- `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` — E-009 (index.lock NTFS), E-010 (HEAD truncado), A-010 (GIT_INDEX_FILE), A-011 (Python newline=)
- `docs/MEMORIA_OPERACIONAL_PROJETO.md` — COI-CURADOR documentado na modelagem; regras 11 e 12; Fase 5C.4
- `docs/ESTADO_ATUAL_DO_PROJETO.md` — linha 5C.2 corrigida; Fase 5C.4; atualizado em 2026-06-26
- `AGENTS.md` — Secao 15: alerta de commit via sandbox (E-009/E-010/A-010)
- `CHANGELOG.md`, `RELEASE_NOTES.md`, `ROADMAP_COI.md` — entradas 5C.4

**Validacoes:** git diff --check PASS · node scripts/validar-funcional.js 93 PASS / 0 FAIL

---

## v1.4.1 — Fase 5C.3: Protocolo de Validação Obrigatória (2026-06-23)

**Branch:** `fase-5c-2-atualizacao-coi-009-aiops`

**Objetivo:** Institucionalizar o fluxo de validação obrigatória (PVO) para todas as alterações futuras do Painel Mestre COI.

**Arquivo criado:**
- `docs/PROTOCOLO_VALIDACAO_OBRIGATORIA.md` — fluxo Anderson→ChatGPT→Claude→ChatGPT→Anderson, validações por camada, bloqueio triplo, histórico de aprovações

**Arquivos alterados:**
- `AGENTS.md` — Seção 14: PVO resumido com fluxo, bloqueio triplo e referência ao documento

**Validações:** git diff --check PASS · node scripts/validar-funcional.js 93 PASS / 0 FAIL

---

## v1.4.1 — Fase 5C.2: Execução Assistida do Curador — Atualização COI-009 AIOps (2026-06-16)

**Branch:** `fase-5c-2-atualizacao-coi-009-aiops`

**Objetivo:** Primeira execução assistida do COI-CURADOR-DEMANDAS-PROJETOS: atualização do registro COI-009 com conclusão da renovação da licença AIOps.

**Arquivo alterado:**
- `dados/projetos.js` — COI-009: status Concluído, dataResolucao 13/06/2026, atualizadoEm 16/06/2026, observacoesOperacionais e evidencia atualizados com chamado 518190.

**Campos atualizados em COI-009:**

| Campo | Antes | Depois |
|---|---|---|
| `status` | Em andamento | Concluído |
| `dataResolucao` | (vazio) | 13/06/2026 |
| `atualizadoEm` | 2026-06-15 | 16/06/2026 |
| `observacoesOperacionais` | Verificar vencimento... | Licença AIOps renovada após chamado 518190... |
| `evidencia` | (vazio) | Chamado 518190 — https://aiops-156-externo.centralitcloud.com.br/ |

**Validações:** node --check PASS · validar-funcional.js 93 PASS / 0 FAIL · git diff --check PASS

---

## v1.4.1 — Fase 5C.1: Agente Curador de Demandas e Projetos (2026-06-16)

**Branch:** `fase-`

**Objetivo:** Criar a estrutura de governança do agente COI-CURADOR-DEMANDAS-PROJETOS, que recebe texto livre e transforma em atualizações estruturadas em `dados/projetos.js`, eliminando a necessidade de edição manual do arquivo.

**Arquivos criados:**
- `docs/AGENTE_CURADOR_DEMANDAS_PROJETOS.md` — documento principal: objetivo, tipos de entrada, campos, regras de classificação, criação, atualização, conclusão, modos de operação, exemplos, limites de segurança, integração Anderson+ChatGPT+Claude (342 linhas)
- `docs/MODELO_ENTRADA_DEMANDAS_PROJETOS.md` — templates de entrada por tipo: e-mail, chamado, ata, WhatsApp, resumo, criação, conclusão, atualização parcial; campos mínimos por tipoItem; perguntas de complemento; formato de saída (274 linhas)
- `docs/PROTOCOLO_ATUALIZACAO_DADOS_OPERACIONAIS.md` — protocolo passo a passo: 5 fases (interpretação, prévia, execução, validação, entrega); Modo 2 e Modo 3; checklist de segurança; integração com REGISTRO_DE_ERROS (269 linhas)

**Arquivos alterados:**
- `AGENTS.md` — seção 13 adicionada: papel, modos, limites e integração do COI-CURADOR

**Não alterados nesta fase:**
- `dados/projetos.js`, `portfolio.html`, `index.html`, `projetos/ficha.html`, `assets/style.css`, `scripts/validar-funcional.js`

**Resultado do validador:** 93 PASS | 0 FAIL | 0 AVISO

---

## v1.4.1 — Fase 5B.3: Ficha Operacional Condicional e Conclusao de Demandas (2026-06-16)

**Branch:** `fase-`

**Objetivo:** Implementar formulario operacional condicional em `projetos/ficha.html` para itens com `tipoItem` diferente de `'Projeto'`, com edicao de campos operacionais e botao "Concluir Demanda".

**Alteracoes em projetos/ficha.html:**
- `eOperacional(p)` — detecta se o item e operacional pelo campo `tipoItem`
- `normalizarStatus(s)` — normaliza acentuacao para comparacao robusta de status
- `renderFichaOperacional(p)` — renderiza formulario operacional (oculta secao-projeto, exibe secao-operacional)
- `renderBlocoConclusao(p)` — renderiza bloco condicional: se concluido, exibe confirmacao verde; se nao, exibe botao "Concluir Demanda"
- `ativarEdicaoOp()` / `cancelarEdicaoOp()` — habilita/desabilita campos editaveis
- `salvarEdicaoOp()` — coleta valores dos campos operacionais e persiste via `coiSalvarProjeto()`
- `concluirDemanda()` — define `status='Concluido'`, `dataResolucao=hoje`, `atualizadoEm=hoje`, `percentual=100`, persiste e re-renderiza
- Dispatch condicional: `eOperacional(projeto)` ? `renderFichaOperacional()` : fluxo de projeto existente
- Campos HTML: `secao-operacional` (oculto por padrao), `op-categoria`, `op-frente`, `op-solicitante`, `op-origem`, `op-status` (select), `op-prioridade` (select), `op-responsavel`, `op-orgao`, `op-prazo-resolucao`, `op-data-resolucao`, `op-obs-operacionais`, `op-evidencia`, `op-atualizado-em`
- `<div id="secao-projeto">` envolvendo os blocos 1-9 originais — preserva 100% da ficha de projetos estrategicos

**Alteracoes em assets/style.css:**
- `.op-select` / `.op-select:disabled` — estilo de selects operacionais
- `.op-editavel` / `.op-editavel.edit` — campos editaveis com fundo amarelo claro ao editar
- `.op-concluido` — bloco de confirmacao de conclusao com gradiente verde
- `.btn-concluir` / `.btn-concluir:hover` — botao de conclusao de demanda

**Alteracoes em scripts/validar-funcional.js:**
- Secao 10 adicionada com 14 novos asserts: eOperacional, campos op-*, concluirDemanda, acoes de conclusao, preservacao secao-projeto, fechamento HTML
- Assert 10.8 usa regex `/p\.status\s*=\s*'Concluido'/` para tolerar alinhamento com espacos
- Total: 93 asserts | 0 FAIL | 0 AVISO

**Resultado do validador:** 93 PASS | 0 FAIL | 0 AVISO

---

## v1.4.1 — Fase 5B.2.1: Hotfix Renderizacao das Abas do Portfolio (2026-06-16)

**Branch:** `main`

**Objetivo:** Corrigir falha critica de execucao JS em portfolio.html — arquivo commitado truncado na Fase 5B.2 causava parse error total, impedindo renderizacao de todas as abas (Projetos, Demandas e demais).

**Causa raiz:** `portfolio.html` foi commitado truncado no commit 60915bc (35571 bytes) — arquivo cortado a meio dentro da string `document.getElementById('`, causando SyntaxError no parser do browser e bloqueio completo de todo o JS da pagina.

**Alteracoes em portfolio.html:**
- Restaurado fechamento do handler ESC: `forEach(m => m.classList.remove('open'));`
- Restaurados `});\n});\n</script>\n</body>\n</html>` ausentes
- `null-check` adicionado ao bloco `selProj`: `if (selProj) { ... }` — protege contra TypeError se elemento nao existir
- Nav dinamica filtrada: apenas `tipoItem === 'Projeto'` adicionada ao nav-principal (Fase 5B.2.1)

**Alteracoes em scripts/validar-funcional.js:**
- Secao 9 adicionada com 13 novos asserts: fechamento </script>, </body>, </html>; renderProjetos(); renderDemandas(); null-check selProj; nav dinamica filtrada; 9 verificacoes de data-tab/id por aba
- Total: 79 asserts | 0 FAIL | 0 AVISO

---

## v1.4.1 — Fase 5B.2: Exibicao Executiva das Demandas Operacionais no Portfolio (2026-06-16)

**Branch:** `main`

**Objetivo:** Evoluir a aba Demandas do portfolio.html com painel executivo, filtros avancados e tabela expandida — transformando a listagem basica de 5B.1 em instrumento de gestao operacional real.

**Alteracoes em portfolio.html:**
- `getItensOperacionais()` — nova funcao: filtra `COI_DATA.projetos` para `tipoItem !== 'Projeto'`
- `renderResumoExecutivo()` — nova funcao: painel com 4 mini-cards (Total / Em Aberto / Concluidos / P0+P1) e badges por tipo
- `renderDemandas()` — expandida com 4 filtros encadeados (tipoItem, status, prioridade, frente) alem da busca por texto
- Tabela de 10 para 11 colunas: adicionada coluna `Frente/Cliente`
- IIFE para popular dinamicamente o filtro de frente com valores unicos
- `<div id="op-resumo-exec">` injetado no topo da aba Demandas
- 4 `<select>` com IDs: `filtro-dem-tipo`, `filtro-dem-status`, `filtro-dem-prior`, `filtro-dem-frente`
- Aba Projetos permanece isolada — sem alteracao na logica de `psProj`

**Alteracoes em assets/style.css:**
- 9 novas regras: `.op-resumo-exec`, `.op-resumo-exec h3`, `.op-mini-cards`, `.op-mini-card`, `.op-mini-value`, `.op-mini-value.verde`, `.op-mini-value.amarelo`, `.op-mini-value.vermelho`, `.op-mini-label`, `.op-tipo-badges`

**Alteracoes em scripts/validar-funcional.js:**
- Secao 7 adicionada com 11 novos asserts: resumo executivo, filtros, coluna Frente/Cliente, isolamento da aba Projetos, integridade do chart.js
- Secao anterior (navegacao basica) renomeada para Secao 8
- Total: 66 asserts | 0 FAIL | 0 AVISO

**Resultado do validador:** 66 PASS | 0 FAIL | 0 AVISO

---

## v1.4.1 — Fase 5B.1: Modelagem Operacional Inicial (2026-06-15)

**Branch:** `fase-5b-1-modelagem-operacional`

**Objetivo:** Transformar o painel de vitrine de projetos estratégicos em instrumento de gestão operacional completa do contrato Central IT, conforme veredito da Fase 5B.0.

**Novos registros em dados/projetos.js (COI-009 a COI-013):**

| ID | Nome | tipoItem | Status |
|---|---|---|---|
| COI-009 | Renovação de Licença AIOps | Licença/Contrato | Em andamento |
| COI-010 | Recarga Emergencial Gupshup — Ticket 511151 | Demanda | Concluído |
| COI-011 | Incidente Nuvidio — Validação e Reclassificação | Incidente | Concluído |
| COI-012 | Atividade Operacional — Monitoramento AIOps AURA 156 | Atividade Operacional | Concluído |
| COI-013 | MDS — Sistema Formulário de Ouvidoria | Entrega Contratual | Em andamento |

**Novos campos adicionados ao schema:**
`solicitante`, `dataSolicitacao`, `prazoResolucao`, `dataResolucao`, `categoriaOperacional`, `origem`, `observacoesOperacionais`

**Alterações em index.html:**
- Separação `psProj` (tipoItem='Projeto') × `ps` (todos os itens) — cards de projetos não são mais afetados por novos tipos operacionais
- `nDemandas` agora conta todos os itens operacionais não-Concluídos (Demanda + Incidente + Licença/Contrato + etc.)
- Gráficos (status, prioridade, classificação, evolução) filtrados para `psProj` apenas
- Alertas (críticos, atenção, P0, prazo) filtrados para `psProj` apenas

**Alterações em portfolio.html:**
- `aplicarFiltros()` filtrada para exibir apenas `tipoItem === 'Projeto'` na aba Projetos
- `renderProjetos()` inicializado com filtro `tipoItem === 'Projeto'`
- Aba Demandas ativada com `renderDemandas()` dinâmica: lista todos os itens operacionais não-Projeto com busca por texto
- `tbody-demandas` e `busca-demanda` adicionados ao HTML da aba

**Alterações em assets/style.css:**
- 6 novos badges: `.badge-tipo-demanda`, `.badge-tipo-incidente`, `.badge-tipo-melhoria`, `.badge-tipo-licen-a-contrato`, `.badge-tipo-atividade-operacional`, `.badge-tipo-entrega-contratual`

**Alterações em scripts/validar-funcional.js:**
- 14 novas asserções: IDs COI-009 a COI-013, todos os novos tipoItem, campos categoriaOperacional/solicitante/observacoesOperacionais, renderDemandas(), tbody-demandas, psProj

**Resultado do validador:** 55 PASS | 0 FAIL | 0 AVISO

---

## v1.4.1 — Fase 5B.0: Auditoria Funcional (2026-06-15)

**Branch:** (diagnóstico — sem alteração de código)

**Veredito:** NÃO — o painel, em sua versão v1.4.1 anterior à Fase 5B.1, não atendia ao objetivo real de gestão completa do contrato. Todos os 8 projetos tinham `tipoItem: 'Projeto'`; demandas, incidentes, licenças e atividades operacionais reais do mês de Maio/2026 não eram rastreáveis no painel.

---

## v1.4.1 — Fase 5T.5: Correção de Identidade Institucional (2026-06-15)

**Branch:** `fase-5t-5-correcao-identidade-institucional`

**Problema resolvido:** Todos os arquivos ativos do projeto exibiam a expansao incorreta do COI ("Centro de Operacoes Integradas") e identificavam o GDF como proprietario ("Governo do Distrito Federal"). A identidade oficial e: COI = Comunicacao Omnichannel Inteligente, plataforma da Central IT. GDF e cliente.

**Arquivos alterados (30):**

| Grupo | Arquivos | Mudanca |
|---|---|---|
| HTML | index.html, portfolio.html, projetos/ficha.html | h1, header-meta, footer, document.title |
| Skills (11) | COI-MESTRE a COI-RELEASE-MANAGER | linha 3: Projeto — identidade corrigida |
| Governanca (14) | AGENTS, CHANGELOG, RELEASE_NOTES, ROADMAP, docs/*.md | subtitulo linha 3 |
| Script | scripts/validar-funcional.js | comentario de cabecalho |

**Regras aplicadas:**
- Identidade institucional ativa: corrigida
- Nomes proprios de projetos (e-GDF, e-SIC): preservados
- Referencias ao GDF como cliente, ambiente, contrato: preservadas
- Historico no corpo do CHANGELOG: preservado
- manual_governanca.md (legado): nao tocado
- dados/projetos.js: nao alterado

---

## v1.4.1 — Fase 5T.4: Enforcement Operacional do COI-MESTRE (2026-06-15)

### Problema resolvido

O COI-MESTRE estava declarado como obrigatorio na secao de Skills (CLAUDE.md linha ~63) mas linha 108 subordinava as skills ao protocolo original de "Arquiteto de Solucoes" — criando dois protocolos paralelos em conflito. O PROTOCOLO_OPERACIONAL tambem tinha um "Fluxo Padrao de Execucao" (passos 0-6) sem rota pelo COI-MESTRE.

### Alteracoes realizadas

**`CLAUDE.md`**
- Secao 1 (linhas 1-43) substituida: removido protocolo paralelo "Arquiteto de Solucoes" e dashboard diagnose; substituido por "Regra de Entrada Obrigatoria (Fase 5T.4)" declarando COI-MESTRE como unica porta de entrada
- Linha 108 (hierarquia): substituida subordinacao das skills pelo protocolo original por: regras de seguranca prevalecem em conflitos de seguranca; COI-MESTRE e obrigatorio e nao substituivel por protocolo alternativo

**`AGENTS.md`**
- COI-MESTRE adicionado como primeira linha da tabela "Leitura Obrigatoria Antes de Iniciar" com instrucao "(Fase 5T.4) — Acionar primeiro"

**`docs/CHECKLIST_EXECUCAO_AGENTES.md`**
- 3 novos itens inseridos no topo da secao 1 como PASSO 0: acionar COI-MESTRE, proibicao de entrada direta, fluxo pre-planejamento obrigatorio

**`docs/PROTOCOLO_OPERACIONAL_AGENTES.md`**
- Bloco `> REGRA OBRIGATORIA (Fase 5T.4)` adicionado antes do "Fluxo Padrao de Execucao"
- Passo `-1. ACIONAR COI-MESTRE` inserido antes do passo `0. CONSULTAR ESTADO E MEMORIA`

### Resultado

Nenhum arquivo HTML, CSS ou JS funcional alterado. Sem impacto no painel para o usuario.
Eliminacao dos dois pontos fracos de enforcement: protocolo paralelo e hierarquia incorreta.

---

## v1.4.1 — Fase 5T.3: Aprendizado Continuo, Autonomia Inteligente e Validacao Forense (2026-06-12)

### Skills criadas -- `.claude/skills/`

- `COI-FORENSE.md` -- analise forense pre-execucao: classifica EVIDENCIA CONFIRMADA vs HIPOTESE NAO VALIDADA; bloqueia decisoes sem leitura previa; relatorio estruturado antes do COI-ARQUITETO
- `COI-LEARNINGS.md` -- prevencao de erros por aprendizado continuo: consulta REGISTRO, BASE_EVOLUTIVA e DECISOES antes de executar; emite lembretes obrigatorios; bloqueia se anti-padrao critico detectado
- `COI-TESTES.md` -- suite de testes pre-QA (T1-T6): validar-funcional.js (40 asserts), node --check em .js modificados, grep anti-padroes (innerHTML, eval), clearEl audit, ASCII em .ps1, estrutura de arquivos
- `COI-AUDITOR.md` -- auditoria de protocolo (A1-A5): escopo vs autorizado, arquivos proibidos, padroes de codigo, modo de execucao, disponibilidade de rollback; parecer APROVADO/CONDICIONADO/REPROVADO
- `COI-MESTRE.md` -- atualizado: fluxo expandido de 7 para 10 skills; posicoes definidas (1-10)

### Documentos criados -- `docs/`

- `docs/BASE_DE_CONHECIMENTO_EVOLUTIVA.md` -- padroes aprovados PA-001/PA-010, anti-padroes AP-001/AP-010, solucoes recorrentes por categoria (escrita de arquivos, validacao JS, limpeza DOM, conflito sandbox/Windows, dados mensais)
- `docs/DECISOES_ARQUITETURAIS_COI.md` -- DAR-001 a DAR-010 com contexto, alternativas consideradas e restricoes derivadas

### Documentos atualizados

- `AGENTS.md` -- secao 12 atualizada com tabela de 11 skills e documentos de conhecimento
- `CLAUDE.md` -- Skills Operacionais atualizado: 11 skills, fluxo completo
- `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` -- P10 atualizado: fluxo de 10 skills, tabela de quando usar, docs de conhecimento
- `docs/CHECKLIST_EXECUCAO_AGENTES.md` -- Secao 1 e 3: COI-FORENSE, COI-LEARNINGS, COI-TESTES, COI-AUDITOR; Secao 5: BASE_EVOLUTIVA e DECISOES
- `docs/ESTADO_ATUAL_DO_PROJETO.md` -- Fase 5T.3 em Fases Concluidas; 7 novos arquivos criticos listados
- `docs/MEMORIA_OPERACIONAL_PROJETO.md` -- 11 skills na estrutura; 2 novos docs; status 5T.3 atualizado
- `ROADMAP_COI.md` -- Secao 5T.3 expandida com todos os entregaveis
- `RELEASE_NOTES.md` -- entrada 5T.3 adicionada (infra interna)
- `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` -- A-007 adicionado (framework forense e aprendizado)

---

## v1.4.1 — Fase 5T.2-fix: Correcao de truncamento em validar-funcional.js (2026-06-12)

### Bugfix -- scripts/validar-funcional.js

- Corrigido truncamento silencioso em `scripts/validar-funcional.js` -- arquivo commitado com os ultimos 3 bytes ausentes (`;\r\n}\r\n`), causando SyntaxError `Unexpected end of input` ao executar no Node.js
- Causa raiz: bash heredoc escreveu arquivo com LF; montagem sandbox/Windows gerou inconsistencia que deixou arquivo truncado na visao do sistema de arquivos. Ver E-007 em REGISTRO_DE_ERROS_E_APRENDIZADOS.md
- Solucao: reescrita completa via bash cat heredoc (177 linhas, ASCII puro, LF)
- Validacao: 40/40 PASS -- exit 0 confirmado

---

## v1.4.1 — Fase 5T.2: Skills Operacionais Claude (2026-06-12)

### Skills de execucao especializada — `.claude/skills/` — 7 arquivos criados

- Criada pasta `.claude/skills/` com 7 skills Markdown de papeis operacionais especializados
- `COI-MESTRE.md` — orquestrador; define fluxo obrigatorio entre as 6 skills especializadas; produz pacote de entrega de 9 itens
- `COI-MEMORIA.md` — carrega estado atual (ESTADO_ATUAL, MEMORIA, REGISTRO, AGENTS, PROTOCOLO); identifica erros conhecidos, riscos recorrentes e regras aplicaveis; bloqueia execucao em condicoes criticas (branch errada, working tree sujo, tag ausente)
- `COI-ARQUITETO.md` — classifica modo (Rapido/Seguro/Critico); mapeia arquivos autorizados vs proibidos com tabela de impacto; define plano de execucao e rollback conceitual; tratamento especial para dados/projetos.js (CRITICO) e assets/js/chart.umd.min.js (PROIBIDO)
- `COI-EXECUTOR.md` — implementa alteracoes autorizadas; regras: ler antes de editar; usar bash heredoc para .ps1 e arquivos grandes; nao usar Unicode especial em Write tool; prefixar comentarios com fase; clearEl em vez de innerHTML=''
- `COI-QA.md` — suite completa: git status, git diff --name-only/stat/check, node scripts/validar-funcional.js, validar-projeto.ps1, validar-docs.ps1 (se docs alterados), validar-dados.ps1 + node --check (se dados alterados); classificacao PASS/WARN/FAIL; CRLF = WARN/NORMAL
- `COI-GOVERNANCA.md` — atualiza ESTADO_ATUAL, CHANGELOG, RELEASE_NOTES, ROADMAP, MEMORIA; checklist de 8 itens; bloqueia se multiplas fases sem registro, tag inexistente ou mismatch no ROADMAP
- `COI-RELEASE-MANAGER.md` — prepara pacote de 9 itens (branch, arquivos criados, alterados, skills, docs, comandos, validacoes, riscos, recomendacao de commit); nunca executa comandos criticos; template padrao de output
- Atualizados 10 documentos de governanca: AGENTS.md, CLAUDE.md, PROTOCOLO, AGENTES_CHATGPT, CHECKLIST, ESTADO_ATUAL, MEMORIA, CHANGELOG, RELEASE_NOTES, ROADMAP

---

## v1.4.1 — Fase 5T.1: Infraestrutura de Qualidade e Validação (2026-06-12)

### Tooling multiplataforma e governança — `scripts/validar-funcional.js`, `docs/`, `CHANGELOG.md`, `ROADMAP_COI.md`, `RELEASE_NOTES.md`

- Criado `scripts/validar-funcional.js` — validador Node.js puro, multiplataforma (Windows, Linux, macOS); 40 asserts em 6 seções: arquivos principais (16), sintaxe de dados/projetos.js (1), conteúdo de dados/projetos.js (7), melhorias das Fases 5A.2/5A.3 (7), padrões proibidos (4), integridade de navegação (4); exit code 0 (sem erros) ou 1 (há erros); sem dependências externas
- Atualizado `docs/CHECKLIST_EXECUCAO_AGENTES.md` — 4 novos itens: preferência por commits atômicos por melhoria; proibição de acumular mais de uma fase sem commit; `node scripts/validar-funcional.js` adicionado à tabela de scripts (seção 3); obrigação de atualizar ESTADO_ATUAL, CHANGELOG, ROADMAP e MEMORIA antes do commit de fechamento da fase (seção 5)
- Atualizado `docs/ESTADO_ATUAL_DO_PROJETO.md` — fases 5A.2 e 5A.3 marcadas como concluídas; tag v1.4.1-refinamentos-funcionais registrada como última tag estável; Fase 5T.1 registrada como em andamento; scripts/validar-funcional.js incluído na tabela de arquivos críticos; recomendação futura de .gitattributes documentada (sem implementar)
- Atualizado `docs/MEMORIA_OPERACIONAL_PROJETO.md` — tabela de estado atualizada com 5A.2, 5A.3 (concluídas) e 5T.1 (em andamento); tabela de tags completa com todas as tags até v1.4.1-refinamentos-funcionais; tabela de scripts inclui validar-funcional.js com coluna de plataforma; 2 novas regras rápidas (9 e 10); estrutura de arquivos inclui scripts/validar-funcional.js
- Atualizado `CHANGELOG.md`, `RELEASE_NOTES.md`, `ROADMAP_COI.md` — fases 5A.2 e 5A.3 registradas; Fase 5T.1 documentada; Fase 5B marcada como próxima

---

## v1.4.1 — Fase 5A.3: Refinamentos Funcionais (2026-06-12)

### Refinamentos funcionais — tag: `v1.4.1-refinamentos-funcionais`

- Fase concluída, commitada e tagueada com `v1.4.1-refinamentos-funcionais`
- Detalhes técnicos completos a registrar a partir do histórico da sessão correspondente

---

## v1.4.1 — Fase 5A.2: Evolução Funcional do Painel (2026-06-12)

### Correções de bugs e melhorias funcionais — `index.html`, `assets/style.css`, `portfolio.html`, `projetos/ficha.html`

**B-01 / U-03 — Variáveis CSS corrigidas e estilo inline removido**
- Removido bloco `<style>` inline do `<head>` de `index.html` — usava 3 variáveis inexistentes (`--border`, `--bg-card`, `--text-main`)
- Adicionado `.em-select` e `#em-controls` em `assets/style.css` com variáveis corretas (`--borda`, `--branco`, `--texto`)

**B-02 — Card "Entregas da Semana" corrigido**
- Alinhado ao mesmo fallback chain de `buildExecucaoMensal()`: `execucoesMensais[last] → execucaoMensal → {}`
- Eliminada divergência que usava `meta.execucaoMensal` estático em vez do último item do array

**B-04 — clearEl em buildAlertas()**
- `innerHTML = ''` substituído por `clearEl(grid)` em `index.html` — padrão v1.3

**B-05 — clearEl em portfolio.html**
- Função `clearEl()` adicionada ao bloco de helpers de `portfolio.html`
- 2 ocorrências de `innerHTML = ''` substituídas: em `renderProjetos()` e em `renderRiscos()`

**U-04 — Filtro P0 ativos**
- Card P0 em `index.html` agora exclui projetos com status `Concluído` ou `Suspenso`

**I-03 — salvarEdicao permite limpar campos**
- `ficha.html`: campo com valor `'—'` agora é salvo como string vazia, permitindo limpeza intencional de campos

**I-04 — Filtro de frente dinâmico**
- `portfolio.html`: opções hardcoded removidas do `<select id="filtro-frente">`
- IIFE popula o seletor dinamicamente a partir de `COI_DATA.projetos`, ordenado por `FRENTE_ORDER`

**U-01 — Footer unificado v1.4.1**
- Footer atualizado para `v1.4.1` em `index.html`, `portfolio.html` e `projetos/ficha.html` (HTML + `renderHero()`)

**U-02 — Versão em assets/style.css**
- Comentário de versão atualizado para `1.4.1 (Fase 5A.2 — Evolução Funcional)`

---

## v1.4.1 — Fase 5A.1: Preparação da Evolução Funcional do Painel (2026-06-11)

### Preparação técnica e documental — `dados/projetos.js`, `docs/`, `CHANGELOG.md`, `ROADMAP_COI.md`

- Atualizado `dados/projetos.js` — `meta.versao` corrigido de `"1.4"` para `"1.4.1"` (campo puramente informacional; 0 referências em HTML/CSS; sem impacto funcional confirmado via inspeção)
- Atualizado `docs/ESTADO_ATUAL_DO_PROJETO.md` — Fase 5A.1 registrada como concluída; última tag segura: `v1.4.1-rollback-seguro`; próxima fase: 5A.2 — Evolução Funcional do Painel
- Atualizado `docs/MEMORIA_OPERACIONAL_PROJETO.md` — Fase 5A.1 adicionada como concluída; ciclo 5A iniciado

---

## v1.4.1 — Fase 4D.5: Plano de Rollback Seguro (2026-06-11)

### Governança de contingência — `docs/`, `AGENTS.md`

- Criado `docs/PLANO_ROLLBACK_SEGURO.md` — 14 seções: objetivo, modelo de aprovação (Anderson→Claude→ChatGPT), quando usar/não usar rollback, rollback de commit local, commit remoto, merge, tag, branch e GitHub Pages; checklists antes/depois de rollback; comandos seguros e comandos críticos
- Criado `docs/MATRIZ_CONTINGENCIA.md` — 13 tipos de incidente classificados por severidade (S1 a S4); colunas: tipo, impacto, ação recomendada, evidência necessária, se exige validação do ChatGPT, se exige autorização do Anderson; fluxo de decisão e referência cruzada ao PLANO_ROLLBACK_SEGURO.md
- Atualizado `AGENTS.md` — tabela "Leitura Obrigatória" inclui PLANO_ROLLBACK_SEGURO.md e MATRIZ_CONTINGENCIA.md; rodapé atualizado para Fase 4D.5
- Atualizado `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` — seção "Apoio via ChatGPT" inclui referências ao plano de rollback e à matriz de contingência; rodapé atualizado para Fase 4D.5
- Atualizado `docs/CHECKLIST_EXECUCAO_AGENTES.md` — item adicionado na seção 1: consultar PLANO_ROLLBACK_SEGURO.md e MATRIZ_CONTINGENCIA.md se houver risco de rollback; rodapé atualizado para Fase 4D.5
- Atualizado `docs/ESTADO_ATUAL_DO_PROJETO.md` — Fase 4D.4.2 marcada como Concluída; Fase 4D.5 registrada como em execução; dois novos arquivos adicionados à tabela de arquivos críticos
- Atualizado `docs/MEMORIA_OPERACIONAL_PROJETO.md` — Fase 4D.4.2 marcada como Concluída; Fase 4D.5 adicionada como "Em andamento"; rodapé atualizado

---

## v1.4.1 — Fase 4D.4.2: Delegação Operacional Controlada ao Claude (2026-06-11)

### Governança operacional — `AGENTS.md`, `CLAUDE.md`, `docs/`

- Atualizado `AGENTS.md` — nova seção 11 "Modelo de Delegação Operacional (Fase 4D.4.2)": tabela de comandos autônomos (11 comandos), tabela de comandos críticos que exigem autorização (13 entradas), padrão de entrega com 8 itens obrigatórios ao final de cada fase
- Atualizado `CLAUDE.md` — adicionada seção "Delegação Operacional" com regras de operação autônoma, lista de comandos permitidos e proibidos, e padrão de entrega de 8 itens; referência ao modelo Anderson → Claude → ChatGPT
- Atualizado `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` — adicionado protocolo P9 "Delegação Operacional ao Claude" com listas de comandos autônomos e críticos, e padrão de entrega de 8 itens em formato de checklist
- Atualizado `docs/CHECKLIST_EXECUCAO_AGENTES.md` — seção 1 ("Antes de Iniciar") inclui verificação de comandos críticos no escopo; nova seção 6 ("Entrega Final da Fase") com checklist dos 8 itens obrigatórios
- Atualizado `docs/AGENTES_ESPECIALIZADOS_CHATGPT.md` — adicionada seção "Papel do ChatGPT no Modelo de Delegação" descrevendo a terceira camada (validação crítica, revisão de entrega, interpretação de terminal)
- Atualizado `docs/ESTADO_ATUAL_DO_PROJETO.md` — Fase 4D.4.2 registrada como em execução; tag `v1.4.1-consolidacao-memoria` adicionada; próxima ação atualizada para Fase 4D.5
- Atualizado `docs/MEMORIA_OPERACIONAL_PROJETO.md` — Fase 4D.4.2 adicionada à tabela de estado atual como "Em andamento"

---

## v1.4.1 — Fase 4D.4.1: Consolidação da Memória Operacional (2026-06-11)

### Governança e documentação — `docs/`, `AGENTS.md`, `CHANGELOG.md`, `ROADMAP_COI.md`

- Criado `docs/ESTADO_ATUAL_DO_PROJETO.md` — documento de estado pontual do projeto (versão, branch, tag, fases, próxima ação, arquivos críticos); ponto de entrada único para novas sessões
- Atualizado `docs/MEMORIA_OPERACIONAL_PROJETO.md` — Fase 4D.3 corrigida para "Concluída"; Fase 4D.4 e Fase 4D.4.1 adicionadas; tag `v1.4.1-base-interacao-chatgpt` registrada; coluna "Fase" adicionada à tabela de tags; `docs/ESTADO_ATUAL_DO_PROJETO.md` incluído na estrutura de arquivos; nota de redirecionamento para o novo documento de estado
- Atualizado `docs/CHECKLIST_EXECUCAO_AGENTES.md` — seção 1 ("Antes de Iniciar") inclui consulta a `ESTADO_ATUAL_DO_PROJETO.md` como primeiro item; seção 5 ("Ao Finalizar") inclui atualização do documento de estado como etapa obrigatória antes do commit; rodapé corrigido para Fase 4D.4.1
- Atualizado `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` — seção "Consulta Obrigatória" inclui `ESTADO_ATUAL_DO_PROJETO.md` como primeira leitura (item 1); passo 0 do fluxo reescrito com separação entre estado pontual e memória estrutural; rodapé corrigido para Fase 4D.4.1
- Atualizado `AGENTS.md` — `docs/ESTADO_ATUAL_DO_PROJETO.md` adicionado como primeira linha da tabela "Leitura Obrigatória" com marcação "Ler primeiro"; rodapé corrigido para Fase 4D.4.1
- Registrado `E-006A` em `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` — encoding ASCII obrigatório em scripts PowerShell (Fase 4D.2)

---

## v1.4.1 — Fases 4D: Governança Operacional dos Agentes (2026-06-10)

### Fase 4D.1 — Governança Operacional dos Agentes

- Criado `AGENTS.md` — regras obrigatórias (10 regras), papéis dos agentes (10 papéis), modos de execução (Rápido, Seguro, Crítico)
- Criado `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` — fluxo padrão de execução (passos 0–7), protocolos específicos P1–P8 por tipo de tarefa
- Criado `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` — erros E-001 a E-005 e aprendizados A-001 a A-004 das fases anteriores

### Fase 4D.2 — Scripts de Validação PowerShell

- Criados 4 scripts em `scripts/`: `status-seguro.ps1`, `validar-docs.ps1`, `validar-dados.ps1`, `validar-projeto.ps1`
- Scripts reescritos em ASCII puro após erro de encoding (E-006A) — caracteres acentuados causavam "cadeia de caracteres sem terminador"
- Filtro LF/CRLF adicionado em `validar-projeto.ps1` — avisos do Windows não incrementam contagem de erros
- Regex com `.` como wildcard para termos acentuados em `Select-String` — evita falso negativo em validações de documentação

### Fase 4D.3 — Memória Operacional e Checklist

- Criado `docs/MEMORIA_OPERACIONAL_PROJETO.md` — identificação do projeto, estado atual, tags estáveis, scripts de validação, regras rápidas, estrutura de arquivos
- Criado `docs/CHECKLIST_EXECUCAO_AGENTES.md` — 5 seções: antes de iniciar, durante a execução, antes do commit, antes do push, ao finalizar uma fase
- Atualizado `AGENTS.md` — tabela "Leitura Obrigatória" adicionada; referência à Fase 4D.3
- Atualizado `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` — passo 0 "CONSULTAR MEMORIA" adicionado ao fluxo; tabela de scripts adicionada

### Fase 4D.4 — Base de Interação Assistida no ChatGPT

- Criado `docs/BASE_INTERACAO_ASSISTIDA_CHATGPT.md` — bloco de contexto inicial, modelos de mensagem por tipo de pedido (fase, PowerShell, prompt para Claude, validação pré-commit/push/merge/tag), exemplos práticos
- Criado `docs/AGENTES_ESPECIALIZADOS_CHATGPT.md` — 7 agentes especializados: Governança, PowerShell/Git, Demandas, Relatórios Executivos, Contratos/Riscos, AIOps, Expansão Comercial
- Atualizado `AGENTS.md` — referências a `BASE_INTERACAO_ASSISTIDA_CHATGPT.md` e `AGENTES_ESPECIALIZADOS_CHATGPT.md`
- Atualizado `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` — seção "Apoio via ChatGPT (Fase 4D.4)" adicionada

---

## v1.4.1 — Fase 4A.1: Histórico Mensal e Filtro por Competência (2026-06-10)

### Histórico mensal indexado — `dados/projetos.js`
Commits: `c83031a` · `5f00783` · `065c3ac` · `8eaef98`

- Novo array `meta.execucoesMensais[]` com 2 competências iniciais: Maio/2026 e Junho/2026
- Estrutura por item: `competencia`, `rotulo`, `resumo`, `totalAtividades`, `totalDemandas`, `totalMelhorias`, `pendenciasCriticas`, `principaisGanhos[]`, `proximasEntregas[]`, `planoExcelencia[]`
- `meta.execucaoMensal` preservado intacto como fallback
- Maio/2026 preenchido com dados reais do painel anterior (`acompanhamento-mensal-v1.html`, `dados_painel_aura.json`): 9 atividades, 5 demandas, 8 principais ganhos, 6 próximos passos registrados
- Junho/2026 mantido com estrutura pronta para preenchimento

### Seletor de competência — `index.html`
Commit: `c451426`

- Seção `em-section` dividida em `em-controls` (persistente, contém o seletor) e `em-content` (re-renderizável)
- `<select>` exibido automaticamente quando `execucoesMensais.length > 1`; oculto quando há apenas uma competência
- Troca de competência atualiza somente `em-content` — cards, gráficos, tabela e alertas executivos não são afetados
- Nova função `renderEmConteudo(container, emData)` encapsula a renderização; `buildExecucaoMensal()` preservado como ponto de e