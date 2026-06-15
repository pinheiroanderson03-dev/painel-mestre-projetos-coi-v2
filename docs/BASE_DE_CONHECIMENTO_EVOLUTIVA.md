# BASE DE CONHECIMENTO EVOLUTIVA -- Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

> Repositorio vivo de padroes aprovados, anti-padroes, solucoes recorrentes e licoes aprendidas.
> Atualizar obrigatoriamente apos cada nova correcao, decisao ou aprendizado.
> Consultado por COI-LEARNINGS antes de qualquer implementacao.

---

## Como usar este documento

- **COI-LEARNINGS** consulta este documento antes de cada implementacao
- **COI-GOVERNANCA** atualiza este documento ao fechar cada fase
- Toda nova solucao bem-sucedida deve ser registrada aqui
- Todo anti-padrao identificado deve ser listado com a alternativa correta

---

## Padroes Aprovados

Solucoes validadas e recomendadas para uso no projeto.

| Codigo | Padrao | Contexto | Regra |
|---|---|---|---|
| PA-001 | `clearEl(el)` para limpar DOM | Qualquer limpeza de elemento HTML | Usar `while(el.firstChild) el.removeChild(el.firstChild)`. Nunca `innerHTML = ''` |
| PA-002 | `spawnSync(process.execPath, ['--check', file])` | Validacao sintatica de .js no Node | Evita quebra em caminhos Windows com espacos (ex: Program Files) |
| PA-003 | `bash cat << 'ENDOFSKILL' ... ENDOFSKILL` | Criar ou reescrever arquivos .js e .ps1 | Evita truncamento silencioso da ferramenta Write com Unicode |
| PA-004 | ASCII puro em scripts .ps1 | Todos os arquivos PowerShell | Sem acentos, cedilha ou caracteres > 127. "Validacao" -> "Validacao" |
| PA-005 | Namespace `.em-*` para novos estilos CSS | Novos blocos de estilo | Evita colisao com classes existentes |
| PA-006 | `var` para funcoes globais em HTML | Funcoes novas em index.html | `const`/`let` tem escopo de bloco -- `var` garante acesso global |
| PA-007 | Fallback em cadeia para dados mensais | Leitura de execucoes mensais | `execucoesMensais[last]` -> `execucaoMensal` -> `{}` |
| PA-008 | Commits atomicos por melhoria | Historico de commits | Nunca acumular mais de uma fase sem commit |
| PA-009 | Read tool (Windows) prevalece sobre sandbox | Conflito sandbox x Windows | Em conflito de estado de arquivo, o Read tool e autoritativo |
| PA-010 | Verificar com `node <script>` apos qualquer escrita | Qualquer escrita de .js | Executar imediatamente apos criar/editar para confirmar sintaxe |
| PA-011 | Separacao `psProj`/`ps` para filtragem por tipoItem | `index.html` com itens multi-tipo | `psProj = ps.filter(p => !p.tipoItem \|\| p.tipoItem === 'Projeto')` para cards/graficos; `ps` completo para demandas |
| PA-012 | Campo `tipoItem` para diferenciar tipos de item em `COI_DATA.projetos[]` | Modelagem operacional | Valores: `'Projeto'`, `'Demanda'`, `'Incidente'`, `'Melhoria'`, `'Atividade Operacional'`, `'Entrega Contratual'`, `'Licenca/Contrato'` |
| PA-013 | Python `rfind()` + concatenacao de bytes para reparo cirurgico de JS truncado | Arquivo .js truncado no meio do conteudo | Localizar byte de truncamento, concatenar conteudo ausente como UTF-8, verificar com `node --check` |

---

## Anti-Padroes

Abordagens proibidas ou que causaram problemas confirmados.

| Codigo | Anti-padrao | Problema | Alternativa |
|---|---|---|---|
| AP-001 | `innerHTML = ''` para limpar elemento | XSS potencial; listener leaks | Usar `clearEl(el)` -- PA-001 |
| AP-002 | `cp.execSync(process.execPath + ' --check ' + file)` | Quebra em caminhos com espacos no Windows | Usar `spawnSync` com array de args -- PA-002 |
| AP-003 | Write tool para arquivos .js com Unicode | Truncamento silencioso em ~306 linhas | Usar bash cat heredoc -- PA-003 |
| AP-004 | Acentos e cedilha em scripts .ps1 | "Cadeia de caracteres sem terminador" no PowerShell | ASCII puro -- PA-004 |
| AP-005 | Assumir estado de arquivo sem leitura previa | Decisoes erradas de escopo | Sempre usar Read tool ou bash cat antes de editar |
| AP-006 | Confiar no git status do sandbox Linux | Sandbox pode mostrar estado corrompido | Usar git log (confiavel) e Read tool para verificar arquivos |
| AP-007 | Preencher dados sem fonte real | Dados genericos comprometendo integridade | Consultar painel anterior ou aguardar confirmacao do Anderson |
| AP-008 | Alterar arquivo fora do escopo sem comunicar | Quebra de governanca e commits misturados | Parar e comunicar antes de agir |
| AP-009 | `eval()` com dados externos | Vulnerabilidade de segurança critica | Nao usar eval() em nenhuma circunstancia |
| AP-010 | Tocar `assets/js/chart.umd.min.js` | Biblioteca externa -- pode quebrar graficos | Arquivo PROIBIDO: nunca editar |
| AP-011 | Usar ferramenta Edit para insercao de multiplos registros JS em bloco unico | Truncamento silencioso sem aviso de erro | Usar script Python com abertura binaria, localizacao de ponto de insercao e escrita atomica |

---

## Solucoes Recorrentes por Categoria

### Categoria: Escrita de Arquivos

**Problema:** Precisar criar/reescrever arquivo .js ou .ps1 longo
**Solucao:** `bash cat << 'ENDOFSKILL' > <caminho> ... ENDOFSKILL`
**Verificacao:** Executar o script imediatamente apos; confirmar linha count com `wc -l`
**Referencia:** PA-003, E-007

---

### Categoria: Validacao Sintatica JS

**Problema:** Verificar se .js tem sintaxe valida sem executar
**Solucao:** `node --check <arquivo>` ou `spawnSync(process.execPath, ['--check', file])`
**Referencia:** PA-002, E-003

---

### Categoria: Limpeza de Elementos DOM

**Problema:** Limpar conteudo de elemento HTML antes de re-renderizar
**Solucao:** `function clearEl(el) { while (el.firstChild) el.removeChild(el.firstChild); }`
**Referencia:** PA-001

---

### Categoria: Conflito de Estado Sandbox x Windows

**Problema:** Sandbox mostra arquivo diferente do Read tool
**Solucao:** Confiar no Read tool. Reescrever via bash cat heredoc na mesma sessao.
**Referencia:** PA-009, E-007

---

### Categoria: Dados Mensais Ausentes

**Problema:** Campo de competencia sem dados
**Solucao:** Fallback em cadeia: `execucoesMensais[last]` -> `execucaoMensal` -> `{}`
**Referencia:** PA-007

---

---

### Categoria: Modelagem Multi-Tipo em COI_DATA.projetos[]

**Problema:** Precisar exibir projetos estrategicos e itens operacionais (demandas, incidentes, licencas) no mesmo painel sem distorcer os cards de indicadores
**Solucao:**
- Em `dados/projetos.js`: adicionar campo `tipoItem` a todos os registros operacionais (`'Demanda'`, `'Incidente'`, `'Licenca/Contrato'`, `'Atividade Operacional'`, `'Entrega Contratual'`). Registros de projeto estrategico omitem o campo ou usam `'Projeto'`.
- Em `index.html`: separar `psProj = ps.filter(p => !p.tipoItem || p.tipoItem === 'Projeto')` de `ps`. Cards, graficos e alertas usam `psProj`. Card `nDemandas` conta `ps` completo.
- Em `portfolio.html`: funcao `renderDemandas()` filtra `p.tipoItem && p.tipoItem !== 'Projeto'` e renderiza tabela dedicada. Aba Projetos usa `aplicarFiltros()` com filtro adicional por `tipoItem`.
**Verificacao:** `psProj.length` deve ser igual ao numero de projetos estrategicos. `ps.length - psProj.length` deve ser igual ao numero de itens operacionais.
**Referencia:** PA-011, PA-012, DAR-011

---

### Categoria: Reparo Cirurgico de Arquivo JS Truncado

**Problema:** Arquivo .js truncado no meio do conteudo por ferramenta Edit, com bytes ausentes a partir de um ponto especifico
**Solucao:**
```python
with open('dados/projetos.js', 'rb') as f:
    content = f.read()
idx = content.rfind(b'<string-unica-no-ponto-de-corte>')
conteudo_ausente = b'<resto-do-conteudo>'
with open('dados/projetos.js', 'wb') as f:
    f.write(content[:idx] + conteudo_ausente)
```
**Verificacao:** `node --check dados/projetos.js` imediatamente apos. Confirmar tamanho final em bytes.
**Referencia:** PA-013, E-008, A-009

---

## Historico de Atualizacoes

| Data | Fase | Atualizacao |
|---|---|---|
| 2026-06-12 | 5T.3 | Documento criado -- PA-001 a PA-010, AP-001 a AP-010, 5 categorias de solucoes |
| 2026-06-15 | 5B.1.1 | PA-011 a PA-013, AP-011, 2 novas categorias (Modelagem Multi-Tipo, Reparo Cirurgico JS) |

---

*Ultima atualizacao: 2026-06-15 - Fase 5B.1.1 - PA-011 a PA-013, AP-011, categorias de modelagem multi-tipo e reparo JS*
