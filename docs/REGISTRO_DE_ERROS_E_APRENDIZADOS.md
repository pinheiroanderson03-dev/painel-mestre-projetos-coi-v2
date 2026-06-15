# REGISTRO DE ERROS E APRENDIZADOS — Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

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

### E-007 — Truncamento silencioso de arquivos .js pela ferramenta Write e pelo sandbox Linux

**Fase:** v1.4.1 / Fase 5T.1 e 5T.2-fix
**Quando ocorreu:** Criacao e reescrita de `scripts/validar-funcional.js`
**O que aconteceu:** A ferramenta Write truncou silenciosamente o arquivo em ~306 linhas ao gravar conteudo com caracteres Unicode. O arquivo aparecia correto no editor mas `node scripts/validar-funcional.js` retornava `SyntaxError: Unexpected end of input`. Em sessao posterior, mesmo apos reescrita via bash heredoc, o sandbox Linux exibia versao truncada ao ler o arquivo, enquanto o Read tool no lado Windows mostrava o arquivo completo.
**Causa raiz (dupla):**
(1) Write tool: limite interno ao serializar conteudo com caracteres Unicode em combinacoes especificas de encoding.
(2) Sandbox Linux: discrepancia de cache entre o sistema de arquivos montado (Windows) e a visao do processo bash no container.
**Impacto:** `validar-funcional.js` commitado na Fase 5T.1 com os ultimos 3 bytes ausentes. Erro detectado apenas na sessao seguinte. Retrabalho de reescrita completa na Fase 5T.2-fix.
**Como foi resolvido:** Reescrita completa via `bash cat << 'ENDOFSCRIPT' ... ENDOFSCRIPT` (heredoc puro, ASCII). Verificacao pos-escrita via `node scripts/validar-funcional.js` confirmou 40/40 PASS exit 0.
**Regra adotada:**
(1) NUNCA usar a ferramenta Write para arquivos .js ou .ps1 que contenham ou possam conter caracteres Unicode.
(2) SEMPRE usar bash cat heredoc para scripts. Verificar com `node <script>` imediatamente apos escrita.
(3) Se sandbox mostrar arquivo truncado mas Read tool (Windows) mostrar completo: Read tool e autoritativo. Refazer escrita via heredoc.
(4) Apos qualquer escrita de script JS: executar `node scripts/validar-funcional.js` como verificacao obrigatoria antes de reportar conclusao.

---

### E-008 — Truncamento silencioso de arquivos .js pela ferramenta Edit em insercao de multiplos registros

**Fase:** v1.4.1 / Fase 5B.1 — Modelagem Operacional Inicial
**Quando ocorreu:** Insercao dos registros operacionais COI-009 a COI-013 em `dados/projetos.js`
**O que aconteceu:** A ferramenta Edit truncou silenciosamente o arquivo ao inserir bloco grande (5 registros JS em uma unica operacao). O arquivo encerrou no meio do campo `tipoItem: "Dema` (byte ~16920 de 16941). A ferramenta nao reportou erro — entregou como se tivesse concluido com sucesso.
**Causa raiz:** A ferramenta Edit tem limite de payload similar ao da ferramenta Write para operacoes grandes. Insercoes de conteudo acima do limite causam truncamento sem aviso.
**Impacto:** `dados/projetos.js` ficou com sintaxe invalida (SyntaxError: Unexpected end of input). Os registros COI-010 a COI-013 foram perdidos ate a correcao via Python.
**Como foi resolvido:** Script Python para: (1) localizar o ponto de truncamento com `content.rfind(b'tipoItem: "Dema')`; (2) concatenar o conteudo ausente (restante de COI-010 + COI-011 a COI-013 + fechamento do arquivo); (3) escrever o arquivo corrigido (25863 bytes); (4) verificar com `node --check dados/projetos.js` -> SYNTAX OK.
**Regra adotada:** Para insercoes de multiplos registros JS em `dados/projetos.js`, preferir script Python que abre o arquivo, localiza o ponto de insercao e escreve o conteudo completo em uma unica operacao. Nunca confiar que Edit reportou sucesso sem verificar com `node --check` imediatamente apos.

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

### A-005 — Modelo de 3 camadas para decisoes criticas
**Fase:** v1.4.1 / Fase 4D.4.2 — Delegacao Operacional
**Contexto:** Formalizacao do modelo Anderson → Claude → ChatGPT para operacao do repositorio
**O que funcionou:** Separar as responsabilidades em tres camadas distintas — Anderson aprova, Claude executa e valida, ChatGPT analisa decisoes criticas — criou um padrao claro de governanca que evita acoes acidentais e distribui a responsabilidade de forma rastreavel. O ponto de corte "Claude nao executa git commit/push/reset sem 'pode executar'" provou ser seguro em todas as fases da 4D.

### A-007 -- Framework forense e aprendizado continuo como camadas de prevencao
**Fase:** v1.4.1 / Fase 5T.3 -- Aprendizado Continuo e Validacao Forense
**Contexto:** Expansao do framework de skills de 7 para 11 componentes
**O que funcionou:** Separar a analise de evidencias (COI-FORENSE) da tomada de decisao (COI-ARQUITETO) eliminou decisoes de escopo baseadas em estado inferido do sandbox. Consultar o historico de erros antes de executar (COI-LEARNINGS) preveniu repeticao dos erros E-006A e E-007 em implementacoes subsequentes. A suite de testes T1-T6 (COI-TESTES) detecta problemas antes do QA, reduzindo iteracoes de correcao. A auditoria A1-A5 (COI-AUDITOR) garante que escopo e protocolo sejam verificados independentemente de quem executou.

### A-006 — Documentacao de rollback antes de precisar dele
**Fase:** v1.4.1 / Fase 4D.5 — Plano de Rollback Seguro
**Contexto:** Criacao de PLANO_ROLLBACK_SEGURO.md e MATRIZ_CONTINGENCIA.md antes de qualquer incidente real
**O que funcionou:** Documentar os tipos de rollback e a matriz de incidentes em estado de calma — sem pressao de um incidente real — permitiu cobrir todos os cenarios possiveis com clareza. A matriz com severidade S1-S4 e especialmente util para diferenciar rapidamente o que exige acao imediata (S1) do que pode ser corrigido com novo commit (S4).

---

### A-008 — Separacao psProj/ps para modelagem multi-tipo no painel
**Fase:** v1.4.1 / Fase 5B.1 — Modelagem Operacional Inicial
**Contexto:** Insercao de itens operacionais (Demanda, Incidente, Licenca/Contrato, Atividade Operacional, Entrega Contratual) em `COI_DATA.projetos[]`
**O que funcionou:** Separar `psProj = ps.filter(p => !p.tipoItem || p.tipoItem === 'Projeto')` de `ps` (todos os itens) em `index.html` permitiu que os cards, graficos e alertas do dashboard continuassem exibindo apenas projetos estrategicos, enquanto o card `nDemandas` passou a contar todos os itens operacionais nao-concluidos. A aba Demandas em `portfolio.html` passou a ser populada dinamicamente pela funcao `renderDemandas()`, que filtra `p.tipoItem && p.tipoItem !== 'Projeto'`. O padrao e extensivel: qualquer novo tipoItem futuro e automaticamente incluido nos filtros sem alterar logica central.

### A-009 — Python como ferramenta de reparo cirurgico de arquivos JS truncados
**Fase:** v1.4.1 / Fase 5B.1 — Modelagem Operacional Inicial
**Contexto:** Reparo de `dados/projetos.js` truncado pela ferramenta Edit
**O que funcionou:** Script Python de 10 linhas para: (1) ler o arquivo como bytes; (2) localizar o byte exato de truncamento com `rfind()`; (3) concatenar o conteudo ausente como bytes UTF-8; (4) escrever o arquivo reparado. Mais preciso e seguro do que bash heredoc para arquivos que ja existem parcialmente e precisam ser completados, nao reescritos do zero.

---

*Ultima atualizacao: 2026-06-15 - Fase 5B.1.1 - E-008 (truncamento Edit), A-008 (psProj/ps), A-009 (Python reparo cirurgico)*
