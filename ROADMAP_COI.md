# ROADMAP — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

---

## Visão Estratégica

O Painel Mestre COI é a ferramenta central de gestão visual dos projetos estratégicos do Centro de Operações Integradas. Seu objetivo é fornecer rastreabilidade, transparência e agilidade na tomada de decisão, operando 100% em modo estático (sem servidor, sem banco de dados) e compatível com ambientes restritos de rede.

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

### 🔄 v1.3 — Fase 3: Polimento e Robustez (em andamento)

**Concluído nesta fase:**
- [x] Remoção de dead code `idSlug()` — `index.html`, `portfolio.html`
- [x] Substituição de `innerHTML = ''` por `clearEl()` — `ficha.html`
- [x] Tratamento de `QuotaExceededError` no localStorage — `dados/projetos.js`, `ficha.html`
- [x] Log diagnóstico de hashes inválidos — `ficha.html`
- [x] `ROADMAP_COI.md` (este arquivo)
- [x] `RELEASE_NOTES.md`

**Pendente (baixo risco, aprovação necessária):**
- [ ] Chart.js local/offline: download de `chart.umd.min.js` para `assets/js/`
- [ ] Refatoração do `hashchange`: re-render sem reload completo da página

---

## v1.4 — Fase 4: Funcionalidades Avançadas (planejada)

| Funcionalidade | Descrição | Complexidade | Valor |
|---|---|---|---|
| Exportação PDF | Gerar PDF da ficha individual via `window.print()` + CSS `@media print` | Média | Alto |
| Exportação XLSX | Exportar dados de atividades/riscos/pendências para Excel via SheetJS | Alta | Alto |
| Filtros avançados | Filtro por status, prioridade, classificação e responsável no portfólio | Média | Médio |
| Histórico de mudanças | Registrar linha do tempo de edições por projeto no localStorage | Alta | Médio |
| Dashboard de resumo | Card de KPIs consolidados no topo do portfólio (total, % médio, alertas) | Baixa | Alto |
| Modo escuro | Toggle dark/light mode via CSS custom properties | Baixa | Baixo |
| Pesquisa global | Campo de busca no topo do portfólio filtrando por nome, ID, responsável | Baixa | Alto |

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
| Funcional offline (sem CDN) | Chart.js local | ⏳ Fase 3 |
| Novos projetos sem arquivos físicos | Hash routing | ✅ |
| Feedback de erros ao usuário | Toast + tela de erro | ✅ |
| Diagnóstico de falhas | Log localStorage | ✅ |
| Tratamento de quota localStorage | QuotaExceededError | ✅ |
| Dead code zero | Auditoria contínua | ✅ |

---

## Débitos Técnicos em Aberto

| ID | Descrição | Prioridade | Fase |
|---|---|---|---|
| DT-01 | Chart.js via CDN — dependência de rede para gráficos | P2 | 3 |
| DT-02 | `hashchange` com `location.reload()` — recarrega DOM inteiro | P3 | 3 |
| DT-03 | `ficha_COI001–008.html` são redirects, não removidos | P3 | 4 |
| DT-04 | Sem paginação em tabelas de atividades/riscos extensas | P3 | 4 |
| DT-05 | Sem acessibilidade ARIA nas tabelas e modais | P2 | 4 |

---

*Última atualização: 2026-06-09 · Versão: v1.3*
