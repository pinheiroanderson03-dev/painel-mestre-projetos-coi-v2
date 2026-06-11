# CHANGELOG — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

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
- Nova função `renderEmConteudo(container, emData)` encapsula a renderização; `buildExecucaoMensal()` preservado como ponto de entrada
- Fallback robusto: `execucoesMensais[]` → `execucaoMensal` → `{}`; padrão = último item da lista (Junho/2026)
- Helper `clearEl()` adicionado ao bloco de helpers; estilo `.em-select` adicionado em `<style>` inline no `<head>`

---

## v1.4 — Fase 4A: Execução Mensal e Gestão Executiva (2026-06-10)

### Novos campos por projeto — `dados/projetos.js`
Commit: `03a54e6 fase-4a: adicionar campos executivos aos projetos`

- 11 novos campos adicionados a cada um dos 8 projetos: `frente`, `contrato`, `gerenteContrato`, `competencia`, `tipoItem`, `planoExcelencia`, `beneficioEsperado`, `beneficioRealizado`, `evidencia`, `riscosCriticos`, `decisoesPendentes`
- Novo bloco `meta.execucaoMensal` com: `competencia`, `resumo`, `totalAtividades`, `totalDemandas`, `totalMelhorias`, `pendenciasCriticas`, `principaisGanhos[]`, `proximasEntregas[]`, `planoExcelencia[]`
- `meta.versao` atualizado para `"1.4"`; `meta.atualizadoEm` para `"2026-06-10"`
- Frentes atribuídas: `CENTRAL DF` (COI-001, 002, 003, 005, 006), `Central de Atendimento` (COI-004, 007), `COI` (COI-008)

### Estilos da seção "Execução Mensal" — `assets/style.css`
Commit: `c727e2c fase-4a: adicionar estilos da secao execucao mensal`
Namespace `.em-*` (72 linhas, sem colisão com classes existentes):

- Classes de layout: `.em-section`, `.em-header`, `.em-competencia-badge`, `.em-resumo`, `.em-mini-cards`, `.em-mini-card` (variantes: `.vermelho`, `.amarelo`, `.verde`, `.roxo`), `.em-ganhos`, `.em-tables-grid`, `.em-table-card`
- Badges de status: `.badge-pe-pendente/andamento/concluido/atrasado/bloqueado`, `.badge-prazo-ok/atencao/atrasado`
- Responsivo: breakpoints `≤900px` e `≤640px`

### Dashboard — cards preenchidos e seção de Execução Mensal — `index.html`
Commit: `e8b8ce0 fase-4a: adicionar execucao mensal e cards executivos no dashboard`

- 4 cards antes vazios agora preenchidos com lógica derivada dos dados:
  - `c-demandas`: `projetos.filter(p => p.tipoItem === 'Demanda' && p.status !== 'Concluído').length`
  - `c-riscos`: soma de `riscosCriticos` de todos os projetos
  - `c-decisoes`: soma de `decisoesPendentes` de todos os projetos
  - `c-entregas`: contagem de `proximasEntregas` com `data` válida na janela `[hoje, hoje+7]`
- Nova seção "Execução Mensal e Plano de Excelência" via `buildExecucaoMensal()`: competência badge, resumo executivo, 4 mini-cards, principais ganhos, tabelas de próximas entregas e plano de excelência — 100% XSS-safe

### Portfólio — filtros e agrupamento por frente — `portfolio.html`
Commit: `d747819 fase-4a: adicionar filtros e agrupamento por frente no portfolio`

- 3 novos filtros: frente (select com 4 opções), contrato (input), gerente do contrato (input)
- `aplicarFiltros()` reescrito com array-filter — compatível com agrupamento visual
- `renderProjetos()` reescrito com `FRENTE_ORDER = {CENTRAL DF:1, Central de Atendimento:2, MDS:3, COI:4}`
- Cabeçalhos de grupo `<tr class="frente-header">` inseridos automaticamente na mudança de frente
- Coluna "Frente" adicionada (tabela passa a 13 colunas); fix de `faseTd`/`platTd` que não eram renderizados apesar de existirem no `<thead>`
- Empty-state exibido quando filtros não retornam projetos

### Ficha individual — campos da Fase 4A — `projetos/ficha.html`
Commit: `5352e83 fase-4a: adicionar campos executivos na ficha do projeto`

- Bloco 1 expandido: +2 campos em "Dados Gerais" (Frente, Tipo) e +3 em "Informações de Gestão" (Nº Contrato, Gerente do Contrato, Competência)
- Novo Bloco 9 "Execução Mensal e Gestão Executiva":
  - Indicadores: Riscos Críticos (badge vermelho/verde), Decisões Pendentes (badge amarelo/verde), Plano de Excelência (badge azul/cinza)
  - Benefícios e Evidências: Benefício Esperado, Benefício Realizado, Evidência
- `renderCampos()` atualizado para popular todos os novos campos; fallback `'—'` em campos vazios
- Modo de edição dos novos campos não expandido nesta fase — previsto para Fase 4B

---

## v1.3 — Fase 3: Polimento e Robustez (2026-06-09)

### Débitos técnicos (itens 1–6)
- `index.html`, `portfolio.html` — dead code `idSlug()` removido
- `projetos/ficha.html` — helper `clearEl()` adicionado; 4 ocorrências de `innerHTML = ''` substituídas
- `dados/projetos.js` — `QuotaExceededError` e `NS_ERROR_DOM_QUOTA_REACHED` tratados em `coiSalvarProjeto` e `coiSalvarSecaoFicha`; retorno `{ok:false, quota:true}` para chamadores
- `projetos/ficha.html` — 4 verificações de quota (r1–r4) com toast de aviso ao usuário
- `projetos/ficha.html` — log diagnóstico `coi_hash_invalidos` (max 50 entradas) em hashes inválidos

### Chart.js local/offline (item 7)
- `assets/js/chart.umd.min.js` — Chart.js 4.4.1 incluído localmente (204KB, v4.4.1)
- `index.html` — carregamento local como primário; CDN `cdnjs.cloudflare.com` como fallback automático via `document.write` se arquivo local não encontrado
- Painel funciona agora 100% offline; CDN só é consultado se `assets/js/chart.umd.min.js` estiver ausente

### Documentação
- `ROADMAP_COI.md` criado — visão v1.0→v2.0, fases, critérios de qualidade, débitos técnicos
- `RELEASE_NOTES.md` criado — notas por versão para usuário final

---

## v1.2 — Fase 2: Hash Routing (2026-06-09)

**Objetivo:** Resolver R1 — novos projetos cadastrados via portfólio dependiam de arquivos HTML físicos inexistentes.

### Novo arquivo
- `projetos/ficha.html` — ficha dinâmica universal; carrega o projeto pelo hash da URL (`ficha.html#COI-001`). Substituição definitiva das 8 fichas individuais.

### Arquivos convertidos em redirects
- `projetos/ficha_COI001.html` até `ficha_COI008.html` — convertidos em redirects finos (`<meta http-equiv="refresh">` + `window.location.replace()`), apontando para `ficha.html#COI-00X`. Compatibilidade total com bookmarks e links existentes.

### Atualizações de links
- `index.html` — 2 links de nav/tabela atualizados de `ficha_${idSlug(p.id)}.html` para `ficha.html#${p.id}`
- `portfolio.html` — 3 links (nav + 2 tabelas) atualizados com o mesmo padrão

### Compatibilidade localStorage
- Nenhuma migração necessária: as chaves já usavam `projetoId` (ex.: `coi_ficha_COI-001_atividades`), não o nome do arquivo.

---

## v1.1 — Fase 1: Estabilização + Débitos Técnicos (2026-06-08)

### Fase 1 — Estabilização

**index.html**
- Reescrito com cards dinâmicos gerados de `COI_DATA`
- Alertas dinâmicos (projetos atrasados, em risco)
- Gráficos Chart.js 4.4.1 (CDN) com fallback `.chart-fallback`
- XSS: substituição de `innerHTML` por `createElement`/`textContent`

**portfolio.html**
- Dados 100% dinâmicos via `COI_DATA`
- CSS externalizado para `assets/style.css`
- Modal de novo projeto salva via `coiSalvarProjeto()`
- XSS: `td()` helper reescrito com `createElement`

**fichas COI-001 a COI-008**
- CSS externalizado para `assets/style.css`
- Persistência via `localStorage` (atividades, marcos, riscos, pendências)
- Funções `coiSalvarSecaoFicha` / `coiCarregarSecaoFicha` em `dados/projetos.js`

**dados/projetos.js**
- Fonte única de verdade: `const COI_DATA = { meta, projetos: [...] }`
- IIFE `aplicarOverridesLocalStorage()` aplica overrides na inicialização
- Funções exportadas: `coiSalvarProjeto`, `coiSalvarSecaoFicha`, `coiCarregarSecaoFicha`

**assets/style.css**
- Design system com CSS custom properties
- Classes adicionadas: `.perc-circle`, `.perc-inner`, `.perc-val`, `.perc-label`, `.field-val.edit`

### Débitos técnicos

- `index.html` — dead code `sanitize()` removido
- `portfolio.html` — ramo `isHTML=true` do helper `td()` removido
- Fichas — `emptyRow()` convertido de `innerHTML` para `createElement` (XSS)
- Fichas — campo percentual com clamp `Math.min(100, Math.max(0, ...))`
- Fichas — badge P1 padronizado para `badge-amarelo` (alinhado ao portfólio)

---

## v1.0 — Baseline (2026-06-07)

Versão inicial gerada com estrutura estática:
- `index.html` — dashboard executivo (dados hardcoded)
- `portfolio.html` — portfólio de projetos (dados hardcoded)
- `projetos/ficha_COI001.html` até `ficha_COI008.html` — fichas individuais (dados hardcoded)
- `dados/coi_base_dados.xlsx` — base de dados Excel
- `docs/manual_governanca.md` — manual de governança do COI
