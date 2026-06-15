# ROADMAP — Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

---

## Visão Estratégica

O Painel Mestre COI é a ferramenta central de gestão visual dos projetos estratégicos do COI — Comunicação Omnichannel Inteligente. Seu objetivo é fornecer rastreabilidade, transparência e agilidade na tomada de decisão, operando 100% em modo estático (sem servidor, sem banco de dados) e compatível com ambientes restritos de rede.

---

## Status das Fases

### ✅ v1.0 — Baseline (concluída)
Estrutura inicial estática com dados hardcoded. Geração de HTML por projeto, planilha Excel de dados, manual de governança.

### ✅ v1.1 — Fase 1: Estabilização (concluída)
- Fonte única de verdade: `dados/projetos.js` com `COI_DATA`
- CSS/JS externalizado: `assets/style.css`
- Persistência via `localStorage`
- Correção de vulnerabilidades XSS
- Gráficos dinâmicos com Chart.js 4.4.1

### ✅ v1.2 — Fase 2: Hash Routing (concluída)
- Ficha dinâmica universal: `projetos/ficha.html#COI-001`
- Eliminação da dependência de arquivos HTML por projeto
- Suporte a novos projetos sem criação de arquivos físicos
- Redirects de compatibilidade para fichas antigas

### ✅ v1.3 — Fase 3: Polimento e Robustez (concluída)

- [x] Remoção de dead code `idSlug()` — `index.html`, `portfolio.html`
- [x] Substituição de `innerHTML = ''` por `clearEl()` — `ficha.html`
- [x] Tratamento de `QuotaExceededError` no localStorage — `dados/projetos.js`, `ficha.html`
- [x] Log diagnóstico de hashes inválidos — `ficha.html`
- [x] `ROADMAP_COI.md` e `RELEASE_NOTES.md` criados
- [x] Chart.js 4.4.1 local em `assets/js/chart.umd.min.js` — painel 100% offline
- [x] `index.html` atualizado: local primário + fallback automático para CDN
- [~] Refatoração do `hashchange` — **adiado para Fase 5** (impacto baixo, complexidade média)

### ✅ v1.4 — Fase 4A: Execução Mensal e Gestão Executiva (concluída — 2026-06-10)

- [x] `dados/projetos.js` — 11 novos campos por projeto + bloco `meta.execucaoMensal`
- [x] `assets/style.css` — namespace `.em-*` para seção de Execução Mensal (72 linhas, sem colisão)
- [x] `index.html` — 4 cards preenchidos com lógica derivada dos dados; nova seção "Execução Mensal e Plano de Excelência"
- [x] `portfolio.html` — 3 novos filtros (frente, contrato, gerente); agrupamento visual por frente; coluna Frente na tabela; fix de colunas Fase/Plataforma
- [x] `projetos/ficha.html` — Bloco 1 expandido com campos de Fase 4A; Bloco 9 "Execução Mensal e Gestão Executiva"

### ✅ v1.4.1 — Fases 4D: Governança Operacional dos Agentes (concluídas — 2026-06-10/11)

**Objetivo:** Estabelecer a infraestrutura de governança operacional do projeto — regras, papéis, scripts de validação, memória operacional e base de interação assistida com ChatGPT.

| Fase | Data | Entrega |
|---|---|---|
| Fase 4D.1 | 2026-06-10 | `AGENTS.md`, `docs/PROTOCOLO_OPERACIONAL_AGENTES.md`, `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` |
| Fase 4D.2 | 2026-06-10 | 4 scripts PowerShell em ASCII puro (`scripts/*.ps1`) |
| Fase 4D.3 | 2026-06-10 | `docs/MEMORIA_OPERACIONAL_PROJETO.md`, `docs/CHECKLIST_EXECUCAO_AGENTES.md` |
| Fase 4D.4 | 2026-06-10 | `docs/BASE_INTERACAO_ASSISTIDA_CHATGPT.md`, `docs/AGENTES_ESPECIALIZADOS_CHATGPT.md` |
| Fase 4D.4.1 | 2026-06-11 | `docs/ESTADO_ATUAL_DO_PROJETO.md`; consolidação e sincronização de toda documentação operacional |
| Fase 4D.4.2 | 2026-06-11 | Delegação operacional controlada ao Claude — modelo de 3 camadas, padrão de entrega de 8 itens, tabelas de comandos autônomos e críticos |
| Fase 4D.5 | 2026-06-11 | Plano de rollback seguro e matriz de contingência — 14 tipos de rollback, 13 incidentes classificados, fluxo Anderson→Claude→ChatGPT |

**Tag estável:** `v1.4.1-base-interacao-chatgpt` · **Tags publicadas:** `v1.4.1-rollback-seguro` · **Tags pendentes push:** `v1.4.1-consolidacao-memoria`, `v1.4.1-delegacao-operacional`

---

### ✅ v1.4.1 — Ciclo 5A: Evolução Funcional do Painel (concluído — 2026-06-12)

**Objetivo:** Preparar e executar melhorias funcionais no painel com qualidade, rastreabilidade e governança.

| Fase | Data | Status | Entrega |
|---|---|---|---|
| Fase 5A.1 | 2026-06-11 | ✅ Concluída | Preparação — `meta.versao` corrigido, documentação alinhada, diagnóstico técnico |
| Fase 5A.2 | 2026-06-12 | ✅ Concluída | 9 melhorias: clearEl, CSS vars, filtro P0, frentes dinâmicas, salvarEdicao, footer v1.4.1 |
| Fase 5A.3 | 2026-06-12 | ✅ Concluída | Refinamentos funcionais — tag `v1.4.1-refinamentos-funcionais` |

**Última tag estável:** `v1.4.1-refinamentos-funcionais`

---

### ✅ v1.4.1 — Fase 5T.1: Infraestrutura de Qualidade e Validação (concluída — 2026-06-12)

**Objetivo:** Fechar lacunas de tooling expostas pelo Ciclo 5A antes de avançar para desenvolvimento funcional complexo (5B).

| Entregavel | Status | Descricao |
|---|---|---|
| `scripts/validar-funcional.js` | Criado | Validador Node.js puro, 40 asserts, multiplataforma, exit 0/1 |
| `docs/CHECKLIST_EXECUCAO_AGENTES.md` | Atualizado | Commits atomicos, proibicao de acumulo, validar-funcional.js, docs antes do commit |
| `docs/ESTADO_ATUAL_DO_PROJETO.md` | Atualizado | Reflete 5A.2, 5A.3, 5T.1, tag atual |
| `docs/MEMORIA_OPERACIONAL_PROJETO.md` | Atualizado | Tags completas, scripts atualizados, 2 novas regras |
| `CHANGELOG.md`, `RELEASE_NOTES.md`, `ROADMAP_COI.md` | Atualizados | Entradas para 5A.2, 5A.3, 5T.1 |

**Branch:** `fase-5t-1-infraestrutura-qualidade-validacao`

---

### ✅ v1.4.1 — Fase 5T.2: Skills Operacionais Claude (concluida — 2026-06-12)

**Objetivo:** Criar framework de skills especializadas para padronizar e qualificar o fluxo de execucao do Claude em cada fase.

| Entregavel | Status | Descricao |
|---|---|---|
| `.claude/skills/COI-MESTRE.md` | Criado | Orquestrador -- coordena as 6 skills especializadas |
| `.claude/skills/COI-MEMORIA.md` | Criado | Leitura de contexto, erros conhecidos e alertas |
| `.claude/skills/COI-ARQUITETO.md` | Criado | Classificacao de modo, mapeamento de arquivos |
| `.claude/skills/COI-EXECUTOR.md` | Criado | Implementacao segura com padroes corretos |
| `.claude/skills/COI-QA.md` | Criado | Suite completa de validacoes |
| `.claude/skills/COI-GOVERNANCA.md` | Criado | Atualizacao obrigatoria de 5 documentos |
| `.claude/skills/COI-RELEASE-MANAGER.md` | Criado | Pacote de entrega de 9 itens |
| 10 documentos de governanca | Atualizados | AGENTS, CLAUDE, PROTOCOLO, AGENTES_CHATGPT, CHECKLIST, ESTADO_ATUAL, MEMORIA, CHANGELOG, RELEASE_NOTES, ROADMAP |

**Branch:** `fase-5t-1-infraestrutura-qualidade-validacao`

---

### ✅ v1.4.1 — Fase 5T.5: Correcao de Identidade Institucional (concluida — 2026-06-15)

**Objetivo:** Corrigir a identidade institucional ativa do COI em todos os arquivos do projeto, padronizando para COI = Comunicacao Omnichannel Inteligente / Central IT.

| Entregavel | Status | Descricao |
|---|---|---|
| `index.html` | CORRIGIDO | h1, header-meta, meta description, footer |
| `portfolio.html` | CORRIGIDO | h1, header-meta, footer |
| `projetos/ficha.html` | CORRIGIDO | subtitulo, header-meta, footer, document.title JS |
| `.claude/skills/*.md` (11) | CORRIGIDOS | linha 3 — Projeto: identidade padronizada |
| 14 documentos de governanca | CORRIGIDOS | subtitulo linha 3 — identidade padronizada |
| `scripts/validar-funcional.js` | CORRIGIDO | comentario de cabecalho |

**Branch:** `fase-5t-5-correcao-identidade-institucional`

---

### ✅ v1.4.1 — Fase 5T.4: Enforcement Operacional do COI-MESTRE (concluida — 2026-06-15)

**Objetivo:** Eliminar ambiguidade de protocolo e tornar COI-MESTRE a unica porta de entrada obrigatoria para qualquer atividade tecnica no projeto.

**Problema resolvido:** CLAUDE.md tinha dois protocolos paralelos (Fase PF-001/PF-002); linha 108 subordinava skills ao protocolo original; PROTOCOLO_OPERACIONAL tinha fluxo sem rota pelo COI-MESTRE (PF-003).

| Entregavel | Status | Descricao |
|---|---|---|
| `CLAUDE.md` | ALTERADO | Secao 1 substituida por "Regra de Entrada Obrigatoria (Fase 5T.4)"; hierarquia linha 108 corrigida |
| `AGENTS.md` | ALTERADO | COI-MESTRE como primeira linha da tabela "Leitura Obrigatoria" |
| `docs/CHECKLIST_EXECUCAO_AGENTES.md` | ALTERADO | PASSO 0 obrigatorio (3 novos itens) no topo da secao 1 |
| `docs/PROTOCOLO_OPERACIONAL_AGENTES.md` | ALTERADO | Bloco REGRA OBRIGATORIA + passo -1 ACIONAR COI-MESTRE |

**Branch:** `main` (aguardando commit)

---

### ✅ v1.4.1 — Fase 5T.3: Aprendizado Continuo, Autonomia Inteligente e Validacao Forense (concluida — 2026-06-12)

**Objetivo:** Expandir o framework de skills para 11 componentes com capacidade forense, prevencao de erros por aprendizado, suite de testes pre-QA e auditoria de protocolo.

| Entregavel | Status | Descricao |
|---|---|---|
| `.claude/skills/COI-FORENSE.md` | CRIADO | Analise forense: diferencia evidencias de hipoteses; bloqueia decisoes sem leitura previa |
| `.claude/skills/COI-LEARNINGS.md` | CRIADO | Consulta REGISTRO, BASE_EVOLUTIVA e DECISOES antes de executar; impede repeticao de erros |
| `.claude/skills/COI-TESTES.md` | CRIADO | Suite T1-T6: validar-funcional.js, node --check, anti-padroes, clearEl, ASCII PS1, estrutura |
| `.claude/skills/COI-AUDITOR.md` | CRIADO | Auditoria A1-A5: escopo, arquivos proibidos, padroes de codigo, modo, rollback; parecer final |
| `.claude/skills/COI-MESTRE.md` | ATUALIZADO | Fluxo expandido de 7 para 10 skills (posicoes 1-10) |
| `docs/BASE_DE_CONHECIMENTO_EVOLUTIVA.md` | CRIADO | PA-001/PA-010, AP-001/AP-010, 5 categorias de solucoes |
| `docs/DECISOES_ARQUITETURAIS_COI.md` | CRIADO | DAR-001 a DAR-010 com contexto, alternativas e impacto |
| 10 documentos de governanca | ATUALIZADOS | AGENTS, CLAUDE, PROTOCOLO, CHECKLIST, ESTADO_ATUAL, MEMORIA, CHANGELOG, RELEASE_NOTES, ROADMAP, REGISTRO |

**Branch:** `fase-5t-1-infraestrutura-qualidade-validacao`

---

### ✅ v1.4.1 — Fase 4A.1: Histórico Mensal e Filtro por Competência (concluída — 2026-06-10)

**Objetivo:** Permitir selecionar a competência/mês na seção "Execução Mensal e Plano de Excelência", com histórico de múltiplas competências.

| Funcionalidade | Descrição | Arquivos | Commits |
|---|---|---|---|
| `meta.execucoesMensais[]` | Array com Maio/2026 e Junho/2026; `meta.execucaoMensal` preservado como fallback | `dados/projetos.js` | `5f00783` · `065c3ac` · `8eaef98` |
| Seletor de competência | `<select>` em `em-controls`, oculto quando há apenas uma competência | `index.html` | `c451426` |
| Re-render isolado | Troca de mês atualiza somente `em-content` — cards, gráficos, portfólio e alertas inalterados | `index.html` | `c451426` |
| Fallback robusto | `execucoesMensais[]` → `execucaoMensal` → `{}`; padrão = último item (Junho/2026) | `index.html` | `c451426` |
| Dados reais Maio/2026 | 9 atividades, 5 demandas, 8 principais ganhos e 6 próximos passos extraídos do painel anterior | `dados/projetos.js` | `8eaef98` |
| Documentação v1.4.1 | ROADMAP, CHANGELOG e RELEASE_NOTES | `ROADMAP_COI.md` · `CHANGELOG.md` · `RELEASE_NOTES.md` | `c83031a` |

### ✅ v1.4.1 — Fase 5B.0: Auditoria Funcional (concluída — 2026-06-15)

**Veredito:** NÃO — painel v1.4.1 representava apenas 8 projetos estratégicos; demandas, incidentes, licenças e atividades operacionais reais do mês de Maio/2026 não eram rastreáveis.

---

### ✅ v1.4.1 — Fase 5B.1: Modelagem Operacional Inicial (concluída — 2026-06-15)

**Objetivo:** Transformar o painel em instrumento de gestão operacional completa — além de projetos estratégicos.

| Entregavel | Status | Descricao |
|---|---|---|
| `dados/projetos.js` | ALTERADO | 5 novos registros (COI-009 a COI-013); 7 novos campos operacionais; 5 novos tipoItem |
| `index.html` | ALTERADO | Separacao psProj/ps; cards corretos; nDemandas conta todos os itens operacionais ativos |
| `portfolio.html` | ALTERADO | Aba Projetos filtrada; aba Demandas dinamica com renderDemandas() |
| `assets/style.css` | ALTERADO | 6 badges de tipoItem operacional |
| `scripts/validar-funcional.js` | ALTERADO | 14 novas assertivas; 55 PASS total |

**Branch:** `fase-5b-1-modelagem-operacional`

---

### 🔄 v1.5 — Fase 5B.2: Evolução do Painel para Registros Operacionais (próxima)

**Objetivo:** Expandir a ficha.html para exibir campos operacionais dos novos tipos; adicionar filtro de tipoItem no portfólio; considerar cards de Incidentes e Licenças no dashboard.
Escopo a definir com Anderson antes de iniciar.

---

### 🔄 v1.5 — Fase 4B: Edição de Fichas e Exportação de Dados (planejada)

**Objetivo:** Expandir o modo de edição das fichas e permitir exportação de dados dos projetos.

| Funcionalidade | Descrição | Complexidade | Valor |
|---|---|---|---|
| Edição dos novos campos | Expandir modo de edição da ficha para cobrir os 11 campos da Fase 4A | Média | Alto |
| Exportação PDF | Gerar PDF da ficha individual via `window.print()` + CSS `@media print` | Média | Alto |
| Exportação XLSX | Exportar atividades, riscos e pendências para Excel via SheetJS | Alta | Alto |
| Histórico de mudanças | Linha do tempo de edições por projeto no localStorage | Alta | Médio |
| Linha do Tempo Executiva | Página `linha-do-tempo.html` com visão cronológica dos marcos | Alta | Alto |
| Relatório Mensal PDF | Página `relatorio-mensal.html` com consolidação mensal exportável | Alta | Alto |

### 🔄 v1.6 — Fase 4C: Edição Orientada pelo GitHub e Governança de Dados (planejada)

**Objetivo:** Facilitar a gestão e edição dos dados do painel diretamente pelo GitHub, sem dependência de alteração manual complexa no código.

> Esta fase não tem implementação técnica iniciada. É um planejamento de governança de dados.

| Diretriz | Descrição |
|---|---|
| Estrutura de dados editável | Avaliar separação em `dados/projetos.json` + `dados/execucoes-mensais.json`, ou manter `dados/projetos.js` com estrutura mais simples e documentada |
| Edição pelo GitHub | Permitir que o gestor edite dados pelo GitHub Web Editor ou `github.dev` sem necessidade de ambiente local |
| Documentação de edição | Guia claro: onde alterar projeto, onde alterar mês, onde alterar entregas, onde alterar plano de excelência, como validar antes de salvar |
| `admin.html` local (futuro) | Interface local que permita preencher campos e exportar JSON pronto para colar no GitHub — sem token exposto |
| Gravação automática | Qualquer gravação no GitHub deve ser avaliada com segurança — preferencialmente via GitHub Actions, Pull Request ou fluxo controlado. **Sem token de API exposto no frontend público.** |

---

## v2.0 — Fase 5: Integração e Multi-usuário (visão futura)

> Requer decisão arquitetural: manter estático ou migrar para servidor.

- API REST simples (Node/Python) para substituir `localStorage` por banco de dados
- Autenticação via LDAP/AD do GDF
- Notificações por e-mail para projetos com semáforo vermelho
- Integração com sistemas do GDF (SEI, SUAP, ÁGATHA)
- Painel de indicadores consolidados para diretoria

---

## Critérios de Qualidade

| Critério | Meta | Status |
|---|---|---|
| Sem innerHTML com dados externos | 0 ocorrências | ✅ |
| Fonte única de verdade | `dados/projetos.js` | ✅ |
| Funcional offline (sem CDN) | Chart.js local | ✅ |
| Novos projetos sem arquivos físicos | Hash routing | ✅ |
| Feedback de erros ao usuário |