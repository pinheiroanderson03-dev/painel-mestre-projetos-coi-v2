# CHANGELOG — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

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
