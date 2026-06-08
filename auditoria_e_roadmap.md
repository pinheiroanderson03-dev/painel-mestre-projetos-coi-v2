# Auditoria Técnica e Roadmap de Evolução
## COI — Painel Mestre de Acompanhamento de Projetos
### Versão 1.0 — Junho de 2026

---

## 1. Escopo da Auditoria

Arquivos analisados:
- `index.html` — Dashboard Executivo
- `portfolio.html` — Portfólio de Projetos
- `projetos/ficha_COI001.html` a `ficha_COI008.html` — Fichas individuais
- `coi_base_dados.xlsx` — Base de dados auxiliar
- `manual_governanca.md` — Manual de governança

---

## 2. Arquitetura

### O que funciona bem
- Separação clara de responsabilidades entre dashboard, portfólio e fichas
- CSS custom properties (variáveis) bem estruturadas e consistentes entre arquivos
- Uso de Chart.js via CDN sem dependência de build tools — certo para contexto local
- Estrutura de pastas simples e navegável

### Problemas identificados

**P-ARQ-01 — Dados duplicados em múltiplos arquivos (crítico)**
Os dados dos 8 projetos estão hardcoded em `index.html`, em `portfolio.html` e parcialmente nas fichas individuais. Qualquer atualização exige edição manual em pelo menos 2 a 3 arquivos diferentes. Risco real de dessincronia.

**P-ARQ-02 — Ausência de fonte única de verdade em tempo real**
O Excel (`coi_base_dados.xlsx`) existe mas não é lido pelo HTML. Os painéis não consomem a planilha. A "base de dados" e o "painel web" são sistemas desconectados.

**P-ARQ-03 — Sem estado persistente entre sessões**
Dados adicionados via modal (novo projeto, nova atividade, novo risco) existem apenas na memória do navegador e são perdidos ao fechar a aba. Não há `localStorage`, `IndexedDB`, backend ou exportação.

**P-ARQ-04 — Navegação travada com crescimento do portfólio**
A nav hardcoda links para os 8 projetos iniciais. Com novos projetos (COI-009+), a nav não se atualiza automaticamente e ficará obsoleta.

**P-ARQ-05 — Sem versionamento ou controle de alterações**
Não há registro de quem editou o quê, quando e com qual justificativa dentro dos arquivos HTML.

---

## 3. HTML

### O que funciona bem
- `lang="pt-BR"` correto em todos os arquivos
- `meta charset` e `viewport` presentes
- Estrutura semântica razoável (`header`, `nav`, `main`, `footer`)
- IDs únicos nas páginas individuais

### Problemas identificados

**P-HTML-01 — CSS duplicado em todos os arquivos**
Os blocos de `<style>` são praticamente idênticos em todos os 10 arquivos HTML (index, portfolio, 8 fichas). Qualquer mudança de design exige editar 10 arquivos. Correto seria um único `style.css` externo referenciado em todos.

**P-HTML-02 — JavaScript inline misturado com lógica de dados**
Toda a lógica de negócio, dados dos projetos e manipulação de DOM está em blocos `<script>` inline ao final de cada página, sem separação de responsabilidades.

**P-HTML-03 — Títulos semânticos inconsistentes**
As fichas individuais usam `<h2>` dentro do hero e `<h3>` nos blocos, mas `<h1>` existe apenas no header. Para acessibilidade e SEO, a hierarquia deveria ser `h1` (título da página) → `h2` (seções principais) → `h3` (subseções).

**P-HTML-04 — `class` como atributo JavaScript**
Em `index.html` e `portfolio.html`, o campo de classificação usa a propriedade JavaScript `class` nos objetos de dados (`{id:'COI-001', class:'Estratégico'}`). `class` é palavra reservada em JavaScript; embora funcione como chave de objeto em modo não-estrito, é má prática. Deveria ser `classificacao` ou `tipo`.

**P-HTML-05 — Link de ficha com replace incorreto para IDs futuros**
`p.id.replace('-','')` remove apenas o primeiro hífen. COI-001 vira COI001 corretamente, mas se IDs futuros tiverem dois hífens (ex: COI-001-A), o resultado seria incorreto. Usar `replaceAll` ou regex global.

**P-HTML-06 — Ciclo hardcoded no banner executivo**
`"Ciclo: Junho 2026"` está fixo no HTML. Deveria ser calculado dinamicamente a partir da data atual.

---

## 4. CSS

### O que funciona bem
- Uso consistente de CSS custom properties (variáveis)
- Design System implícito bem definido (cores, bordas, sombras, espaçamentos)
- Responsividade básica com `grid` auto-fill e `flex-wrap`
- Hover states implementados nos cards e linhas de tabela

### Problemas identificados

**P-CSS-01 — Ausência de arquivo CSS externo compartilhado**
Todos os estilos estão inline em cada arquivo. Com 10 arquivos HTML, o CSS acumulado representa cerca de 8× a duplicação desnecessária.

**P-CSS-02 — Sem media queries para mobile**
O layout de 3 colunas de gráficos (`grid-template-columns: 1fr 1fr 1fr`) colapsa em telas pequenas sem breakpoints definidos. Em tablets o layout fica comprimido. Não há `@media (max-width: 768px)`.

**P-CSS-03 — Contraste de cor insuficiente em alguns elementos**
O texto `.card-sub` usa `color: #888` sobre fundo branco — contraste de aproximadamente 3.5:1, abaixo do mínimo WCAG AA de 4.5:1 para texto pequeno. Mesmo problema em `.hero-id` (`color: #777`) e `.empty` (`color: #999`).

**P-CSS-04 — Círculo de progresso CSS-only frágil**
`conic-gradient` com graus hardcoded na geração Python (`background:conic-gradient({cor_sem} {perc_deg}deg,...)`). Funciona visualmente mas é difícil de atualizar dinamicamente e não anima. Melhor implementar via SVG `<circle>` com `stroke-dashoffset`.

**P-CSS-05 — `transition: all` em navegação**
`transition: all .2s` em `nav a` é custoso para performance pois monitora todas as propriedades CSS. Usar `transition: color .2s, border-color .2s` explicitamente.

---

## 5. JavaScript

### O que funciona bem
- Geração de tabelas por `forEach` é limpa e legível
- Cálculo de cores de barra de progresso por threshold é correto
- Uso de `prompt()` como entrada rápida sem dependência externa

### Problemas identificados

**P-JS-01 — XSS via `innerHTML` com dados de usuário (segurança)**
Em `portfolio.html`, a função `salvarProjeto()` faz `PROJETOS.push(...)` e depois `renderProjetos()` que usa `innerHTML` com os dados inseridos pelo usuário sem sanitização. Se um usuário digitar `<img src=x onerror=alert(1)>` no campo nome, o script executa. Correto seria usar `textContent` ou sanitizar a entrada antes de inserir no DOM.

**P-JS-02 — Dados de projetos não calculados dinamicamente**
Os cards de totais (`c-total`, `c-andamento`, `c-atencao`, `c-criticos`, etc.) têm valores hardcoded no HTML. Os gráficos também têm dados hardcoded. Nenhum deles é calculado a partir do array `projetos`. Se um projeto mudar de status, os cards não se atualizam.

**P-JS-03 — `switchTab` em portfolio.html com lógica frágil**
A função `switchTab` tenta mapear IDs de aba para textos dos botões via `includes`, mas com lógica de substring que pode colidir (ex: "Entrega" vs "Próximas Entregas"). A implementação atual tem código redundante com dois blocos `forEach` consecutivos fazendo trabalho semelhante.

**P-JS-04 — Sem tratamento de erro nas interações do usuário**
As funções `adicionarAtividade()`, `adicionarPasso()` e `adicionarRisco()` usam `prompt()` sem validação além do check de `if(!d) return`. Entradas em branco para campos obrigatórios subsequentes passam como `'—'`.

**P-JS-05 — Sem persistência de dados**
Nenhum dado inserido via modal ou prompt é salvo. Ao recarregar a página, tudo volta ao estado inicial. Para um painel operacional, isso é o maior gap funcional.

**P-JS-06 — `class` como chave de propriedade**
Ver P-HTML-04. No contexto JavaScript, `{class:'Estratégico'}` funciona mas é confuso e não semântico.

**P-JS-07 — Chart.js sem tratamento de falha de CDN**
Se o CDN do Chart.js estiver indisponível (rede interna restrita, por exemplo), os gráficos simplesmente não aparecem sem nenhuma mensagem de erro ou fallback.

---

## 6. Estrutura de Dados

### O que funciona bem
- Modelo de dados dos projetos bem definido com campos relevantes
- Excel com 9 abas cobrindo todas as dimensões necessárias
- Semáforo como campo explícito permite controle manual da criticidade

### Problemas identificados

**P-DADOS-01 — Duas fontes de verdade desconectadas**
O Excel tem os dados estruturados corretos, mas o HTML usa um array JavaScript separado. Não há mecanismo de sincronização entre os dois.

**P-DADOS-02 — Percentual de conclusão sem critério formal**
O campo `% Conclusão` é preenchido manualmente sem critério objetivo definido. Dois gestores diferentes podem interpretar 50% de formas distintas. O manual de governança trata o campo mas não define critério de cálculo.

**P-DADOS-03 — Ausência de campos de auditoria**
Os dados de projetos não têm campos `criado_por`, `criado_em`, `alterado_por`, `alterado_em`. Sem isso não é possível rastrear a história das modificações.

**P-DADOS-04 — Dependências como texto livre**
O campo "Dependências" é texto livre (`"Gupshup, WhatsApp Meta, CITSmartX"`). Não há validação de que os sistemas mencionados existem no cadastro. Isso inviabiliza análise de impacto automática.

---

## 7. Performance

### O que funciona bem
- Arquivos HTML leves (sem frameworks pesados)
- CSS inline evita requests adicionais de arquivo externo (trade-off)
- Chart.js carregado do CDN com versão fixada (4.4.1)

### Problemas identificados

**P-PERF-01 — Chart.js carregado bloqueando rendering**
`<script src="chart.js">` no `<head>` sem `defer` ou `async` bloqueia o parsing do HTML até o download da biblioteca. Adicionar `defer`.

**P-PERF-02 — Sem cache ou Service Worker**
Não há mecanismo de cache offline. Em redes instáveis ou sem acesso ao CDN, o painel fica sem gráficos.

**P-PERF-03 — 8 fichas HTML geradas estaticamente pesarão com escala**
Com 50+ projetos, manter 50+ arquivos HTML estáticos manualmente se torna inviável. A geração Python resolveu o bootstrap inicial mas não é sustentável como processo de manutenção.

---

## 8. Segurança

### O que funciona bem
- Painel local sem autenticação (adequado para ambiente interno COI)
- Sem cookies, sessions ou dados sensíveis transmitidos

### Problemas identificados

**P-SEG-01 — XSS via innerHTML (crítico para uso em intranet)**
Ver P-JS-01. Qualquer campo preenchido pelo usuário e inserido via `innerHTML` sem sanitização é vetor de XSS.

**P-SEG-02 — Sem controle de acesso**
Qualquer pessoa com acesso à pasta pode editar os arquivos HTML diretamente. Não há camada de autenticação ou controle de permissão por nível (leitura vs edição vs aprovação).

**P-SEG-03 — CDN externo como dependência**
O Chart.js é carregado de `cdnjs.cloudflare.com`. Em ambiente de intranet governamental, isso pode ser bloqueado por política de rede ou firewall. Recomendável hospedar a biblioteca localmente em `assets/js/chart.umd.min.js`.

---

## 9. UX e Usabilidade

### O que funciona bem
- Visual limpo, cores institucionais consistentes
- Cards com ícones facilitam escaneamento rápido
- Semáforos visuais comunicam status de forma intuitiva
- Barra de progresso por projeto é clara e efetiva
- Tabs no portfólio organizam bem o volume de informação

### Problemas identificados

**P-UX-01 — Nav com muitos itens fixos**
A navegação horizontal lista todos os 8 projetos individualmente. Com mais projetos, a nav vai quebrar em múltiplas linhas ou transbordar. Recomendável usar dropdown ou menu lateral colapsável.

**P-UX-02 — `prompt()` nativo como interface de entrada**
As fichas usam `window.prompt()` para inserir atividades, riscos e marcos. Isso é visualmente inconsistente com o design do painel, bloqueante e sem validação rica. Deveria ser um modal com formulário.

**P-UX-03 — Campos "—" em responsáveis e prazos**
Todos os projetos iniciais têm responsável `"—"` e prazo `"—"`. Para um painel executivo, isso é o dado mais crítico e aparece vazio. Deveria haver ao menos um estado visual de "campo pendente" com destaque visual.

**P-UX-04 — Alertas e cards com valores hardcoded**
Os alertas executivos do dashboard estão escritos como texto fixo no HTML, não sendo gerados dinamicamente pelo estado real dos projetos. Um projeto que mude de 🔴 para 🟢 não remove o alerta automaticamente.

**P-UX-05 — Sem feedback de sucesso ao salvar**
O modal de "Novo Projeto" fecha após `salvarProjeto()` sem qualquer confirmação visual (toast, banner) de que a operação foi bem-sucedida.

**P-UX-06 — Sem indicação de "última atualização" no dashboard**
O dashboard não exibe quando os dados foram atualizados pela última vez, o que pode gerar desconfiança nos números apresentados.

**P-UX-07 — Acessibilidade básica ausente**
Não há atributos `aria-label` nos botões de ícone, `role` nas tabs, `aria-selected` nos itens ativos, nem `alt` nos emojis usados como ícones funcionais. Leitores de tela terão dificuldade.

---

## 10. Escalabilidade

### O que funciona bem
- A estrutura de dados dos projetos é extensível (novos campos podem ser adicionados ao objeto)
- As abas do portfólio suportam qualquer volume de registros nas tabelas

### Problemas identificados

**P-ESC-01 — Adição de novos projetos requer edição manual de múltiplos arquivos**
Para cadastrar COI-009, é necessário: (1) criar `ficha_COI009.html`, (2) adicionar o objeto no array de `index.html`, (3) adicionar no array de `portfolio.html`, (4) adicionar link na nav de todos os arquivos. Processo manual e propenso a erro.

**P-ESC-02 — Sem mecanismo de busca global**
Com 20+ projetos, não há como buscar por palavra-chave entre fichas, demandas e riscos de forma unificada.

**P-ESC-03 — Sem exportação de relatórios**
Não há funcionalidade de exportar o status atual para PDF ou Excel a partir do painel. O status report executivo mencionado no manual precisa ser feito manualmente.

---

## 11. Funcionalidades Faltantes

| # | Funcionalidade | Impacto | Prioridade |
|---|---|---|---|
| F-01 | Persistência de dados (localStorage ou backend leve) | Alto | P0 |
| F-02 | Cards e gráficos calculados dinamicamente a partir dos dados reais | Alto | P0 |
| F-03 | Sincronização entre HTML e Excel (import/export) | Alto | P1 |
| F-04 | Modo de edição inline nas fichas com save persistente | Alto | P1 |
| F-05 | Exportação de Status Report em PDF | Médio | P1 |
| F-06 | Filtro de busca global entre todos os projetos | Médio | P1 |
| F-07 | Registro de auditoria (quem editou, quando, o quê) | Médio | P1 |
| F-08 | Alertas dinâmicos gerados pelo estado real dos semáforos | Alto | P1 |
| F-09 | Timeline visual de cronograma (Gantt simplificado) | Médio | P2 |
| F-10 | Cadastro de novos projetos com criação automática de ficha | Alto | P2 |
| F-11 | Notificações de prazo (projetos com entrega próxima) | Médio | P2 |
| F-12 | Modo comparação entre ciclos (mês atual vs mês anterior) | Médio | P2 |
| F-13 | Impressão / Print CSS otimizado para relatórios | Baixo | P3 |
| F-14 | Modo escuro | Baixo | P3 |
| F-15 | Suporte mobile completo com layout adaptativo | Médio | P2 |

---

## 12. Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Dessincronia de dados entre index.html, portfolio.html e fichas | Alta | Alto | Centralizar dados em JSON único (F-01) |
| Perda de dados inseridos no painel ao recarregar página | Alta | Alto | Implementar localStorage ou backend (F-01) |
| Chart.js indisponível por bloqueio de rede | Média | Médio | Hospedar localmente em assets/ |
| XSS via campos de entrada no modal | Média | Alto (intranet) | Sanitizar inputs antes de innerHTML |
| Crescimento do portfólio tornando manutenção manual inviável | Alta | Alto | Gerar fichas dinamicamente via JSON |
| Ciclo e dados de status desatualizados por falta de processo | Alta | Alto | Automatizar alertas de atualização pendente |

---

## 13. Roadmap de Evolução

### Fase 1 — Estabilização (Julho 2026) — Correções Críticas
**Objetivo:** Eliminar os riscos mais graves e estabelecer base técnica sólida.

- [ ] **1.1** Extrair CSS para `assets/style.css` compartilhado entre todos os HTMLs
- [ ] **1.2** Extrair dados dos projetos para `dados/projetos.json` como fonte única de verdade
- [ ] **1.3** Calcular cards e gráficos dinamicamente a partir do JSON
- [ ] **1.4** Gerar alertas executivos dinamicamente pelo semáforo real
- [ ] **1.5** Implementar `localStorage` para persistir dados inseridos pelo usuário
- [ ] **1.6** Hospedar Chart.js localmente em `assets/js/`
- [ ] **1.7** Corrigir XSS: substituir `innerHTML` por `textContent` / `createElement` nos inputs do usuário
- [ ] **1.8** Adicionar `defer` no script do Chart.js
- [ ] **1.9** Renomear propriedade `class` para `classificacao` nos objetos de dados

**Entregáveis:** Painel tecnicamente correto, sem dados hardcoded, sem XSS, com dados persistentes na sessão.

---

### Fase 2 — Consolidação (Agosto 2026) — Funcionalidade Completa
**Objetivo:** Tornar o painel operacionalmente utilizável pela equipe do COI.

- [ ] **2.1** Modal completo de cadastro de projetos com criação automática de ficha HTML
- [ ] **2.2** Modo de edição inline nas fichas com salvamento em `localStorage`
- [ ] **2.3** Import/Export de dados via JSON (upload de arquivo ou copiar/colar)
- [ ] **2.4** Exportação de Status Report em PDF (usando `window.print()` com CSS de impressão)
- [ ] **2.5** Nav dinâmica gerada a partir da lista de projetos (sem links hardcoded)
- [ ] **2.6** Substituição de `prompt()` por modais com formulários HTML
- [ ] **2.7** Registro de auditoria: campo `editado_por` e `editado_em` em cada objeto
- [ ] **2.8** Alertas de prazo: badge "vence em X dias" calculado a partir do prazo previsto
- [ ] **2.9** Busca global entre projetos, demandas e riscos

**Entregáveis:** Painel com CRUD completo, exportação de relatório e auditoria básica.

---

### Fase 3 — Evolução (Setembro–Outubro 2026) — Inteligência e Escala
**Objetivo:** Transformar o painel em ferramenta estratégica de PMO digital.

- [ ] **3.1** Backend leve (Node.js / Python Flask) com API REST para persistência real em arquivo JSON ou SQLite
- [ ] **3.2** Cronograma visual tipo Gantt simplificado para marcos dos projetos
- [ ] **3.3** Painel de histórico: evolução do % de conclusão por projeto ao longo do tempo (gráfico de linha)
- [ ] **3.4** Comparativo de ciclos: status atual vs ciclo anterior
- [ ] **3.5** Dashboard de riscos consolidado com mapa de calor (matriz probabilidade × impacto)
- [ ] **3.6** Sistema de notificações: alerta visual para projetos com prazo em menos de 7 dias
- [ ] **3.7** Modo de impressão otimizado para reuniões de diretoria
- [ ] **3.8** Layout responsivo completo para tablets e mobile
- [ ] **3.9** Atributos ARIA e acessibilidade básica (WCAG AA)
- [ ] **3.10** Contadores de contraste mínimo 4.5:1 para todos os textos

**Entregáveis:** PMO Digital funcional com backend, histórico, alertas e acessibilidade.

---

### Fase 4 — Maturidade (4º Trimestre 2026) — Integração e Governança
**Objetivo:** Integrar o painel ao ecossistema COI e automatizar fluxos de governança.

- [ ] **4.1** Autenticação por perfil (visualizador, editor, aprovador)
- [ ] **4.2** Integração com Excel via script Python agendado (leitura do `coi_base_dados.xlsx` e atualização do JSON)
- [ ] **4.3** Geração automática de Status Report mensal (PDF) por e-mail ou Teams
- [ ] **4.4** Integração com AIOps para puxar indicadores reais de disponibilidade/performance
- [ ] **4.5** API de leitura para consumo por outros sistemas do COI
- [ ] **4.6** Painel de controle de versão: diff de alterações entre ciclos
- [ ] **4.7** Dashboard de capacidade da equipe (horas alocadas por projeto por responsável)

**Entregáveis:** Plataforma de PMO Digital integrada, com governança automatizada e dados em tempo real.

---

## 14. Resumo Executivo da Auditoria

| Dimensão | Avaliação | Nota |
|---|---|---|
| Arquitetura | Base sólida, dados duplicados e desconectados | ⭐⭐⭐☆☆ |
| HTML | Semântica correta, CSS duplicado, palavra reservada | ⭐⭐⭐☆☆ |
| CSS | Design system bem definido, sem responsividade | ⭐⭐⭐⭐☆ |
| JavaScript | Funcional, sem persistência, XSS latente | ⭐⭐☆☆☆ |
| Dados | Estrutura correta, sem sincronização | ⭐⭐⭐☆☆ |
| Performance | Aceitável para uso local, CDN externo é risco | ⭐⭐⭐☆☆ |
| Segurança | XSS em formulários, sem autenticação | ⭐⭐☆☆☆ |
| UX / Usabilidade | Visual limpo, interações primitivas (`prompt`) | ⭐⭐⭐☆☆ |
| Escalabilidade | Não escala além de 15-20 projetos sem refatoração | ⭐⭐☆☆☆ |
| **Média geral** | **Base funcional com gaps críticos a corrigir na Fase 1** | **⭐⭐⭐☆☆** |

### Veredicto
A versão 1.0 cumpre seu papel como **protótipo funcional e base visual do painel**. O design e a estrutura de informação são sólidos. Os riscos mais graves estão na **ausência de persistência de dados** e nos **dados duplicados** entre os arquivos — problemas que devem ser endereçados antes do uso operacional regular. Com a Fase 1 do roadmap executada, o painel atinge maturidade para uso institucional.

---

*Auditoria realizada pelo PMO Digital COI — Junho de 2026*
