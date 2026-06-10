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
| Feedback de erros ao usuário | Toast + tela de erro | ✅ |
| Diagnóstico de falhas | Log localStorage | ✅ |
| Tratamento de quota localStorage | QuotaExceededError | ✅ |
| Dead code zero | Auditoria contínua | ✅ |

---

## Débitos Técnicos em Aberto

| ID | Descrição | Prioridade | Fase |
|---|---|---|---|
| ~~DT-01~~ | ~~Chart.js via CDN — dependência de rede para gráficos~~ | ~~P2~~ | ✅ Resolvido v1.3 |
| DT-02 | `hashchange` com `location.reload()` — recarrega DOM inteiro | P3 | 3 |
| DT-03 | `ficha_COI001–008.html` são redirects, não removidos | P3 | 4 |
| DT-04 | Sem paginação em tabelas de atividades/riscos extensas | P3 | 4 |
| DT-05 | Sem acessibilidade ARIA nas tabelas e modais | P2 | 4 |

---

*Última atualização: 2026-06-10 · Versão: v1.4.1 · Próxima: v1.5 (Fase 4B — Edição e Exportação) · Planejadas: Fase 4C (Edição pelo GitHub)*
