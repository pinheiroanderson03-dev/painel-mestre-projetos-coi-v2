# DECISOES ARQUITETURAIS COI -- Painel Mestre COI

Centro de Operacoes Integradas - Governo do Distrito Federal

> Registro formal de decisoes arquiteturais relevantes tomadas durante o desenvolvimento.
> Cada decisao tem contexto, alternativas consideradas, razao da escolha e impacto.
> Consultado por COI-LEARNINGS antes de qualquer implementacao estrutural.

---

## Como usar este documento

- **COI-LEARNINGS** consulta antes de cada implementacao para garantir aderencia
- **COI-AUDITOR** verifica que implementacoes nao violam decisoes ativas
- **COI-GOVERNANCA** registra novas decisoes ao fechar fases com mudancas arquiteturais
- Decisoes podem ser revisadas pelo Anderson, nunca por Claude autonomamente

---

## Decisoes Ativas

### DAR-001 -- Painel 100% estatico (sem servidor, sem banco de dados)

**Status:** ATIVA
**Fase:** v1.0 (baseline)
**Decisao:** O painel opera exclusivamente como arquivos estaticos (HTML/CSS/JS). Sem backend, sem API, sem banco de dados.
**Contexto:** Ambiente COI tem restricoes de rede e servidores. GitHub Pages e o canal de publicacao.
**Alternativas consideradas:** Node.js + Express (descartado por infraestrutura), Google Sheets API (descartado por token exposto).
**Impacto:** Todos os dados vivem em `dados/projetos.js`. Edicao e manual. Sem autenticacao.
**Restricao derivada:** Nenhum token de API pode aparecer no frontend publico.

---

### DAR-002 -- `dados/projetos.js` como unica fonte de verdade

**Status:** ATIVA
**Fase:** v1.1 (Fase 1)
**Decisao:** Todos os dados do painel (projetos, indicadores, execucoes mensais) residem exclusivamente em `dados/projetos.js` via objeto global `COI_DATA`.
**Contexto:** Antes havia dados hardcoded em cada HTML. Inconsistente e dificil de manter.
**Alternativas consideradas:** JSON separado (descartado por requerer fetch/servidor), localStorage (descartado por volatilidade).
**Impacto:** Qualquer alteracao de dados requer editar `dados/projetos.js`. Requer autorizacao explicita do Anderson.
**Restricao derivada:** `dados/projetos.js` e arquivo CRITICO. Claude nao altera sem autorizacao.

---

### DAR-003 -- Chart.js local (offline-first)

**Status:** ATIVA
**Fase:** v1.3 (Fase 3)
**Decisao:** Chart.js 4.4.1 reside em `assets/js/chart.umd.min.js`. CDN e fallback secundario.
**Contexto:** Ambiente COI pode ter restricoes de acesso externo. Painel deve funcionar sem internet.
**Alternativas consideradas:** CDN primario (descartado por dependencia de rede), D3.js (descartado por complexidade).
**Impacto:** `assets/js/chart.umd.min.js` e arquivo PROIBIDO para edicao. Nunca modificar.
**Restricao derivada:** Atualizacao do Chart.js requer substituicao completa do arquivo, nao edicao.

---

### DAR-004 -- `clearEl()` em vez de `innerHTML = ''`

**Status:** ATIVA
**Fase:** v1.3 (Fase 3)
**Decisao:** Para limpar elementos DOM antes de re-renderizar, usar `clearEl(el)` que remove filhos via `removeChild`.
**Contexto:** `innerHTML = ''` remove event listeners, tem risco de XSS com dados externos, e mais lento.
**Alternativas consideradas:** `innerHTML = ''` (descartado por segurança e performance), `replaceChildren()` (descartado por compatibilidade).
**Impacto:** Toda funcao que limpa elemento DOM deve usar `clearEl`. Auditoria de segurança verifica isso.
**Restricao derivada:** Codigo novo com `innerHTML = ''` e reprovado no COI-TESTES (T3) e COI-AUDITOR (A3).

---

### DAR-005 -- `spawnSync` para validacao sintatica JS no Node

**Status:** ATIVA
**Fase:** 5T.1
**Decisao:** Em `scripts/validar-funcional.js`, usar `cp.spawnSync(process.execPath, ['--check', file])` em vez de `cp.execSync(process.execPath + ' --check ' + file)`.
**Contexto:** Windows tem espacos em "C:\Program Files". `execSync` passa o comando via shell, quebrando em caminhos com espacos.
**Alternativas consideradas:** `execSync` com aspas (descartado por complexidade de escape cross-platform).
**Impacto:** Validacao JS funciona em todos os SOs sem ajuste de path.

---

### DAR-006 -- ASCII puro em scripts PowerShell

**Status:** ATIVA
**Fase:** 4D.2
**Decisao:** Todos os arquivos `.ps1` devem usar exclusivamente caracteres ASCII (codigo <= 127). Sem acentos, cedilha ou caracteres especiais.
**Contexto:** PowerShell no Windows lê `.ps1` com encoding diferente do editor. Caracteres > 127 causam "cadeia de caracteres sem terminador".
**Alternativas consideradas:** Salvar como UTF-8 BOM (descartado por inconsistencia entre ambientes).
**Impacto:** Mensagens em .ps1 usam "Validacao" em vez de "Validacao", "Verificacao" em vez de "Verificacao".
**Restricao derivada:** Scripts .ps1 com non-ASCII falham no COI-TESTES (T5).

---

### DAR-007 -- bash cat heredoc para escrita de scripts longos

**Status:** ATIVA
**Fase:** 5T.2-fix (documentado apos E-007)
**Decisao:** Para criar ou reescrever arquivos .js, .ps1 ou qualquer script com conteudo especial, usar `bash cat << 'ENDOFSCRIPT' > <arquivo> ... ENDOFSCRIPT` em vez da ferramenta Write.
**Contexto:** A ferramenta Write trunca silenciosamente arquivos com Unicode em ~306 linhas. O sandbox Linux pode exibir versao em cache inconsistente com o Windows.
**Alternativas consideradas:** Write tool (descartado por E-007), printf/echo linha a linha (descartado por complexidade).
**Impacto:** Todos os scripts do projeto sao escritos via heredoc. Verificar com `node <script>` apos escrita.
**Restricao derivada:** Nunca usar Write tool para .js, .ps1 com Unicode.

---

### DAR-008 -- Branch `publicacao-demandas-central-df` NUNCA TOCAR

**Status:** ATIVA -- CRITICA
**Fase:** v1.0 (baseline)
**Decisao:** A branch `publicacao-demandas-central-df` e a publicacao do GitHub Pages v1 do painel anterior. Nunca recebe push, merge ou qualquer alteracao.
**Contexto:** Qualquer push acidental nesta branch derruba o painel em producao para usuarios reais.
**Impacto:** COI-FORENSE bloqueia execucao se branch atual for `publicacao-demandas-central-df`.

---

### DAR-009 -- Framework de Skills COI como unica porta de entrada

**Status:** ATIVA
**Fase:** 5T.2
**Decisao:** Toda demanda no projeto COI inicia obrigatoriamente por COI-MESTRE, que orquestra o fluxo completo de skills especializadas.
**Contexto:** Execucao ad-hoc sem fluxo estruturado gerou erros de escopo e falta de rastreabilidade.
**Fluxo atual:** COI-MEMORIA -> COI-FORENSE -> COI-ARQUITETO -> COI-LEARNINGS -> COI-EXECUTOR -> COI-TESTES -> COI-AUDITOR -> COI-QA -> COI-GOVERNANCA -> COI-RELEASE-MANAGER
**Impacto:** Sem COI-MESTRE, nenhuma fase pode ser iniciada autonomamente.

---

### DAR-010 -- Modelo de 3 camadas para decisoes criticas

**Status:** ATIVA
**Fase:** 4D.4.2
**Decisao:** Anderson (aprovacao) -> Claude (execucao) -> ChatGPT (validacao critica pre-publicacao).
**Contexto:** Delegacao total ao Claude sem camada de aprovacao gerava risco de acoes irreversiveis. Delegacao zero ao Claude gerava lentidao operacional.
**Impacto:** Claude executa autonomamente dentro do escopo autorizado. Commits, push, merge e tags sempre aguardam Anderson.

---

## Historico de Atualizacoes

| Data | Fase | Atualizacao |
|---|---|---|
| 2026-06-12 | 5T.3 | Documento criado -- DAR-001 a DAR-010 |

---

*Ultima atualizacao: 2026-06-12 - Fase 5T.3 - Criacao do documento*
