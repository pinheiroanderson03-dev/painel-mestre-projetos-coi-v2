# REGISTRO DE ERROS E APRENDIZADOS — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

> Este documento registra erros ocorridos durante o desenvolvimento, a causa raiz identificada e a regra ou padrão adotado para evitar repetição. Deve ser atualizado ao final de cada fase ou quando um erro relevante for identificado.

---

## Formato de Registro

```
### E-NNN — Título do Erro
**Fase:** vX.X.X / Fase XY
**Quando ocorreu:** descrição do contexto
**O que aconteceu:** descrição objetiva do erro
**Causa raiz:** por que o erro ocorreu
**Impacto:** o que foi afetado
**Como foi resolvido:** ação corretiva aplicada
**Regra adotada:** comportamento que deve ser seguido daqui em diante
```

---

## Erros Registrados

---

### E-001 — Dados genéricos usados antes de buscar fonte real
**Fase:** v1.4.1 / Fase 4A.1 — Etapa 2.1
**Quando ocorreu:** Preenchimento inicial de Maio/2026 em `meta.execucoesMensais[]`
**O que aconteceu:** O Agente de Dados preencheu os campos `resumo` e `principaisGanhos` com conteúdo elaborado genericamente, sem consultar o painel anterior onde os dados reais já existiam. O Anderson precisou identificar a fonte e solicitar a correção manualmente.
**Causa raiz:** Ausência de protocolo explícito de consulta ao painel anterior antes de preencher dados históricos. O agente inferiu dados em vez de extraí-los.
**Impacto:** Commit precisou ser refeito (substituição por dados reais em `8eaef98`); conteúdo impreciso publicado temporariamente.
**Como foi resolvido:** Anderson identificou os arquivos `acompanhamento-mensal-v1.html` e `dados_painel_aura.json` como fontes. Agente reescreveu o bloco com os dados reais confirmados.
**Regra adotada:** Antes de preencher qualquer campo quantitativo ou de histórico mensal, o Agente de Dados deve buscar ativamente dados no painel anterior. Campos sem confirmação explícita ficam `0` ou `""` com observação no relatório. Ver Protocolo P6.

---

### E-002 — Alteração fora do escopo autorizado realizada sem aviso
**Fase:** v1.4.1 / Fase 4A.1
**Quando ocorreu:** Durante a Etapa 2 (index.html), o agente também editou `dados/projetos.js` no mesmo turno, sem que isso tivesse sido solicitado explicitamente na etapa.
**O que aconteceu:** A edição de `dados/projetos.js` com dados genéricos de Maio/2026 foi feita junto com as alterações de `index.html`, misturando escopos de duas etapas distintas.
**Causa raiz:** O agente antecipou a próxima etapa sem aguardar autorização. A instrução da etapa autorizava apenas `index.html`.
**Impacto:** A edição de `dados/projetos.js` precisou ser refeita na Etapa 2.1 para corrigir os dados genéricos. Criou confusão no histórico de commits.
**Como foi resolvido:** Anderson identificou o desvio, separou a Etapa 2.1 como etapa própria e solicitou a correção com dados reais.
**Regra adotada:** O agente deve alterar somente os arquivos explicitamente autorizados na etapa. Se identificar necessidade de alterar arquivo adicional, deve parar e comunicar antes de agir. Ver Regra de Escopo no `AGENTS.md`.

---

### E-003 — Bash indisponível causou atraso na validação sintática
**Fase:** v1.4.1 / Fase 4A.1 — Etapa 1
**Quando ocorreu:** Após edição de `dados/projetos.js` com o array `execucoesMensais`
**O que aconteceu:** O workspace bash estava com disco cheio, impossibilitando `node --check` no ambiente do agente. A validação teve que ser delegada ao Anderson via PowerShell.
**Causa raiz:** Disco do workspace sandbox esgotado (condição pré-existente). O agente tentou usar bash e recebeu erro de espaço.
**Impacto:** Nenhum direto — o agente documentou a impossibilidade e delegou corretamente. Porém gerou uma etapa extra de comunicação.
**Como foi resolvido:** Anderson executou `node --check .\dados\projetos.js` localmente e confirmou sem erros.
**Regra adotada:** Quando bash estiver indisponível, o agente deve informar imediatamente, não tentar alternativas (curl, python, etc.) e delegar validações ao Anderson com os comandos exatos em bloco PowerShell. Ver Regra 4 e Regra 8 no `AGENTS.md`.

---

### E-004 — Coluna `faseTd`/`platTd` ausente na tabela de portfólio
**Fase:** v1.3 → detectado e corrigido na v1.4 / Fase 4A
**Quando ocorreu:** Auditoria de `portfolio.html` durante a Fase 4A
**O que aconteceu:** As células `faseTd` e `platTd` eram criadas no código mas nunca eram adicionadas ao `<tr>`. O `<thead>` tinha colunas Fase e Plataforma, mas os dados nunca eram renderizados na tabela.
**Causa raiz:** Bug de regressão não detectado — as células foram criadas mas `tr.append()` não as incluiu. Ausência de teste de regressão da tabela.
**Impacto:** Colunas Fase e Plataforma no portfólio exibiam células vazias para todos os projetos desde a Fase 1.
**Como foi resolvido:** Corrigido no `renderProjetos()` reescrito na Fase 4A (`d747819`).
**Regra adotada:** Após qualquer alteração em `renderProjetos()` ou em funções de criação de tabelas, verificar que todas as colunas do `<thead>` têm célula correspondente sendo adicionada ao `<tr>` com `tr.append()` ou `tr.appendChild()`. Ver checklist de regressão no Protocolo P2.

---

### E-006A — Encoding não-ASCII em scripts PowerShell causa falha de parsing

**Fase:** v1.4.1 / Fase 4D.2 — Scripts de Validação
**Quando ocorreu:** Criação e execução inicial dos scripts `scripts/*.ps1`
**O que aconteceu:** Scripts PowerShell criados com strings `Write-Host` contendo caracteres UTF-8 acentuados (ex.: `ã`, `ç`, `ô`) causaram o erro "cadeia de caracteres sem terminador" ao serem executados no PowerShell do Windows. Os scripts eram sintaticamente corretos no editor, mas o interpretador PowerShell rejeitava o arquivo inteiro.
**Causa raiz:** O PowerShell no Windows lê arquivos `.ps1` com encoding diferente do que o editor de texto usa para salvá-los. Caracteres fora do ASCII puro (> 127) geram inconsistência de encoding que o parser trata como string não fechada.
**Impacto:** Todos os 4 scripts precisaram ser reescritos — retrabalho completo na Fase 4D.2. O erro só foi identificado após tentativa de execução real no terminal do Anderson.
**Como foi resolvido:** Todos os scripts foram reescritos usando apenas caracteres ASCII simples (sem acentos, sem cedilha, sem til). Mensagens como "Validação" → "Validacao", "Verificação" → "Verificacao".
**Regra adotada:** Arquivos `.ps1` devem usar exclusivamente ASCII puro (caracteres ≤ 127). Nenhuma string, comentário ou nome de variável deve conter caracteres acentuados. Antes de entregar qualquer script PowerShell, verificar manualmente se todos os textos visíveis usam apenas letras não acentuadas.

---

### E-005 — Risco de colisão de ID entre `f-contrato` e novo campo contrato
**Fase:** v1.4 / Fase 4A — ficha.html
**Quando ocorreu:** Adição de novo campo "Nº Contrato" em `projetos/ficha.html`
**O que aconteceu:** O ID `f-contrato` já existia no arquivo para o campo `impactoContratual`. Ao adicionar o novo campo "Nº Contrato", havia risco de usar o mesmo ID, sobrescrevendo o campo existente.
**Causa raiz:** Nomenclatura ambígua — "contrato" poderia se referir tanto ao impacto contratual quanto ao número do contrato.
**Impacto:** Nenhum — o agente identificou o conflito antes de aplicar e usou `f-contrato-num` para o novo campo.
**Como foi resolvido:** ID alternativo `f-contrato-num` adotado para o novo campo, preservando `f-contrato` intacto.
**Regra adotada:** Antes de adicionar campo com ID novo em `ficha.html`, fazer `Grep` por IDs existentes com padrão similar. Nunca reutilizar ou colidir com IDs existentes.

---

## Aprendizados Positivos (padrões que funcionaram bem)

### A-001 — Separação `em-controls` / `em-content`
**Fase:** v1.4.1
**Contexto:** Implementação do seletor de competência em `index.html`
**O que funcionou:** Dividir a seção em dois contêineres distintos — um para controles persistentes (`em-controls`) e outro para conteúdo re-renderizável (`em-content`) — evitou que o seletor fosse destruído a cada troca de competência. O padrão é reutilizável em qualquer seção com filtros dinâmicos.

### A-002 — Fallback em cadeia para dados mensais
**Fase:** v1.4.1
**Contexto:** Lógica de resolução de dados em `buildExecucaoMensal()`
**O que funcionou:** A cadeia `execucoesMensais[] → execucaoMensal → {}` garante que o painel nunca quebra por ausência de dados, mesmo em versões antigas dos dados. É o padrão correto para campos opcionais evolutivos.

### A-003 — Namespace CSS `.em-*`
**Fase:** v1.4
**Contexto:** Adição de estilos para a seção Execução Mensal
**O que funcionou:** Usar prefixo `.em-` para todas as novas classes evitou colisão com classes existentes e facilitou auditoria futura. Adotar namespaces de fase para novos blocos CSS é o padrão recomendado.

### A-004 — Multi-branch com proteção de produção
**Fase:** v1.3 → v1.4.1
**Contexto:** Estratégia de branches do projeto
**O que funcionou:** Manter a branch `publicacao-demandas-central-df` (GitHub Pages v1) completamente isolada das branches de desenvolvimento permitiu evoluir o V2 sem risco de quebrar o painel em produção. Regra: branches de publicação ativas nunca recebem push acidental.

---

*Última atualização: 2026-06-11 · Fase: 4D.4.1 — Consolidação da Memória Operacional*
