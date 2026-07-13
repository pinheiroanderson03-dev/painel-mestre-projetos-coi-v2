# RELEASE NOTES — Painel Mestre COI

Comunicação Omnichannel Inteligente · Central IT

---

## v1.6.1 -- Fase 6.2.1 -- Refinamento COI Curador Inteligente (2026-07-07)

- `config/regras-curador.js` criado: 12 regras centralizadas com id, nome, peso, severidade, obrigatoria, ativa, validar
- Motor `coi-curador-inteligente.js` refatorado: separa logica de carregamento/execucao das regras
- Suporte a --json: saida estruturada com resumo, indicadores, itens, erros, alertas, recomendacoes
- Validador: 249 PASS / 0 FAIL / 12 secoes

## v1.6.0 — Fase 6.2 — COI Curador Inteligente (2026-07-07)

**COI Intelligence Engine — Primeiro modulo funcional**

- Implementado `scripts/coi-curador-inteligente.js`: valida automaticamente a qualidade de todos os itens de `dados/projetos.js` com 12 regras, score 0-100, diagnostico completo e recomendacoes automaticas
- 230 asserts no validador (12 secoes) — 0 FAIL
- Resultado do portfolio: score medio 50/100, 27 erros, 64 alertas em 13 itens analisados

## v1.5.0 — Fase 6.1-RF — COI Intelligence Engine (Revisao Final) (2026-06-26)

**Entrega principal:** Consolidacao do conceito COI Intelligence Engine e criacao de INDICADORES_INTELIGENCIA.md.

**O que foi entregue:**

- **ARQUITETURA_COI_INTELLIGENCE.md** (atualizado): Motor renomeado para COI Intelligence Engine; COI Analista reposicionado como modulo do Engine; fluxo oficial de 7 etapas documentado; 6 niveis de maturidade com descricao e fase correspondente; diagrama de modulos do Engine.
- **AGENTE_COI_ANALISTA.md** (atualizado): Identidade como Modulo do COI Intelligence Engine; missao explicitamente vinculada ao fluxo de 7 etapas.
- **MODELO_RECOMENDACOES_IA.md** (atualizado): Titulo e objetivo referenciando COI Intelligence Engine; modelo declarado como padrao compartilhado por todos os modulos.
- **ROADMAP_COI_IA.md** (atualizado): Titulo COI Intelligence Engine; tabela de niveis de maturidade; Fase 6.1 marcada como concluida; cronograma com coluna de nivel de maturidade.
- **INDICADORES_INTELIGENCIA.md** (NOVO): 4 grupos de indicadores — maturidade, desempenho, adocao, saude dos dados; consolidado padrao de sessao; evolucao por fase.
- **AGENTS.md** — Secao 16 atualizada para COI Intelligence Engine.

**Fonte de dados:** exclusivamente `dados/projetos.js`. Nenhuma base paralela.

**Arquivos funcionais preservados:** `dados/projetos.js`, `index.html`, `portfolio.html`, `projetos/ficha.html`, `assets/style.css`, todos os scripts e skills.

**Proximo passo:** Fase 6.2 — COI Daily (relatorio diario automatizado).

---

## v1.5.0 — Fase 6.1 — COI Analista (2026-06-26)

**Entrega principal:** Base documental e arquitetural da camada de inteligencia do Painel Mestre COI.

**O que foi entregue:**

- **ARQUITETURA_COI_INTELLIGENCE.md** — Definicao das 5 camadas: Dados, Analise, Recomendacao, Apresentacao e Governanca. Posicionamento de cada agente existente na arquitetura.
- **AGENTE_COI_ANALISTA.md** — Especificacao completa do COI Analista: 9 responsabilidades (analisar projetos, analisar demandas, identificar riscos, sugerir proximas acoes, gerar resumo executivo, identificar pendencias, apontar inconsistencias, apoiar priorizacao, alimentar COI Daily/Weekly/Monthly), entradas, saidas, limites e fluxo de ativacao.
- **MODELO_RECOMENDACOES_IA.md** — Modelo padrao de 8 campos para recomendacoes: tipo, item_relacionado, prioridade, motivo, evidencia, acao_sugerida, impacto_esperado, status_recomendacao. 7 tipos de recomendacao, 6 status, 4 exemplos com dados reais do painel.
- **ROADMAP_COI_IA.md** — Roadmap de 6 fases (6.1 a 6.6) com cronograma, dependencias criticas e indicadores de sucesso.

**Fonte de dados:** exclusivamente `dados/projetos.js`. Nenhuma base paralela.

**Arquivos funcionais preservados:** `dados/projetos.js`, `index.html`, `portfolio.html`, `projetos/ficha.html`, `assets/style.css`, todos os scripts e skills.

**Proximo passo:** Fase 6.2 — COI Daily (relatorio diario automatizado).

---

## v1.4.1 — Fase 5B.5 — Padronização COI 2.0 (2026-06-26)

**Entrega principal:** Padrão oficial de 9 seções aplicado a todas as fichas de projeto.

**COI-013 atualizado:**
- Nome: "MDS — Sistema de Ouvidoria (OuvSUAS)"
- Progresso: 50%
- Histórico cronológico: 4 registros
- Próximas ações: 4 itens
- Riscos registrados: 2 itens

**Template universal:** `renderFichaPadrao(p)` em `projetos/ficha.html` exibe as 9 seções para qualquer projeto, com fallback "Não informado." para campos ausentes.

---

## v1.4.1 — Fase 5B.4 — Indicadores Operacionais no Dashboard (2026-06-26)

**Entrega principal:** Indicadores operacionais dinamicos implementados no dashboard (`index.html`).

**O que mudou:**
- 5 novos cards: Total de Demandas, Em Andamento, Concluidas, Criticas (P0), Atrasadas
- 7 grupos analiticos na secao `#op-analiticos`: Projetos Estrategicos (total, ativos, concluidos, bloqueados), Percentual de Conclusao (media, >80%, 30-80%, <30%), Prioridade (Alta/Media/Baixa), Semaforo (Verde/Amarelo/Vermelho), Distribuicao por Cliente, Distribuicao por Responsavel
- CSS: namespace `.op-*` em `assets/style.css`
- Validador: Secao 11 com 24 asserts — total 117 PASS / 0 FAIL

**Restricoes mantidas:**
- `dados/projetos.js` nao alterado — leitura apenas
- Nenhum numero fixo no HTML para indicadores operacionais
- Sem commit/push/merge/tag sem autorizacao de Anderson

---

## v1.4.1 — Consolidacao de Conhecimento e Memoria Operacional (Fase 5C.4)
**Data:** 2026-06-26

### O que mudou

Auditoria completa da documentacao das Fases 5B e 5C. Erros estruturais de sandbox documentados; fluxo de validacao complementado; curador operacional integrado a memoria do projeto.

### Detalhes

- `docs/PROTOCOLO_VALIDACAO_OBRIGATORIA.md` — validar-docs.ps1 adicionado a Secao 4.3 e aos prerequisitos de commit
- `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` — E-009, E-010, A-010, A-011 registrados
- `docs/MEMORIA_OPERACIONAL_PROJETO.md` — COI-CURADOR documentado, regras 11/12, Fase 5C.4
- `docs/ESTADO_ATUAL_DO_PROJETO.md` — linha 5C.2 corrigida, Fase 5C.4 registrada
- `AGENTS.md` — Secao 15 adicionada

---

## v1.4.1 — Protocolo de Validação Obrigatória (Fase 5C.3)
**Data:** 2026-06-23

### O que mudou para o usuário

O projeto passa a ter um protocolo formal de validação antes de qualquer publicação. Toda fase exige aprovação de Claude, ChatGPT e Anderson — nenhuma publicação ocorre sem os três.

### Detalhes técnicos

- `docs/PROTOCOLO_VALIDACAO_OBRIGATORIA.md` — criado: fluxo completo, validações obrigatórias por camada, bloqueio triplo, histórico
- `AGENTS.md` — Seção 14 adicionada: resumo do PVO

---

## v1.4.1 — Execução Assistida do Curador: COI-009 AIOps Concluído (Fase 5C.2)
**Data:** 2026-06-16

### O que mudou para o usuário

O registro COI-009 — Renovação de Licença AIOps foi atualizado para refletir a conclusão do chamado 518190. O painel agora exibe o item como Concluído, com data de resolução e evidência do chamado registradas.

### Detalhes técnicos

- `dados/projetos.js` — COI-009: 5 campos atualizados via COI-CURADOR-DEMANDAS-PROJETOS (primeira execução assistida)
- Validações: 93 PASS / 0 FAIL

---

## v1.4.1 — Agente Curador de Demandas e Projetos (Fase 5C.1)
**Data:** 2026-06-16

### O que mudou para o usuario

**Novo agente: COI-CURADOR-DEMANDAS-PROJETOS**

A partir desta fase, o Anderson pode descrever em texto livre qualquer criação, atualização ou conclusão de demanda, projeto ou item operacional — e o agente cuida de mapear os campos corretamente, apresentar uma prévia estruturada para aprovação e, após confirmação, aplicar a alteração em `dados/projetos.js`.

**Como usar:**
- Modo Prévia (padrão): "Atualize a COI-009. Licença AIOps concluída, chamado 518190." → o agente apresenta a prévia e aguarda aprovação.
- Modo Assistido: após aprovação, aplica a alteração e valida sem commit.
- Modo Publicação: após aprovação, aplica, valida, cria branch, commit e push.

**Documentação disponível em:**
- `docs/AGENTE_CURADOR_DEMANDAS_PROJETOS.md`
- `docs/MODELO_ENTRADA_DEMANDAS_PROJETOS.md`
- `docs/PROTOCOLO_ATUALIZACAO_DADOS_OPERACIONAIS.md`

---

## v1.4.1 — Ficha Operacional e Conclusao de Demandas (Fase 5B.3)
**Data:** 2026-06-16

### O que mudou para o usuario

**Ficha de Demandas, Incidentes e Atividades Operacionais:**
- Ao abrir a ficha de um item operacional (Demanda, Incidente, Licenca/Contrato, Atividade Operacional ou Entrega Contratual), o painel exibe agora um formulario especifico com os campos relevantes para aquele tipo de item.
- Campos visiveis: Categoria, Frente/Cliente, Solicitante, Origem, Status, Prioridade, Responsavel, Orgao, Prazo de Resolucao, Data de Resolucao, Observacoes Operacionais, Evidencias.
- Botao **Editar Demanda**: habilita a edicao dos campos. Clicar em **Salvar Alteracoes** persiste as mudancas no navegador (localStorage). Cancelar descarta as edicoes.
- Botao **Concluir Demanda**: define automaticamente Status = Concluido, registra a data de resolucao de hoje e persiste. Itens ja concluidos exibem confirmacao em verde.
- Fichas de Projetos Estrategicos (COI-001 a COI-008) continuam funcionando exatamente como antes — sem nenhuma alteracao visivel.

---

## v1.4.1 — Hotfix Renderizacao das Abas do Portfolio (Fase 5B.2.1)
**Data:** 2026-06-16

### O que foi corrigido

O portfolio.html carregava visualmente mas nenhuma aba funcionava — a aba Projetos aparecia sem dados e as demais abas (Demandas, Melhorias, Riscos etc.) nao respondiam a cliques. A causa era um arquivo HTML commitado truncado: o JavaScript terminava no meio de uma string, causando SyntaxError no browser e bloqueando 100% da execucao JS.

**Correccoes aplicadas:**
- Fechamento do handler de tecla ESC restaurado
- Tags `</script>`, `</body>`, `</html>` restauradas
- null-check adicionado ao bloco de popular select de projetos (`if (selProj)`) — previne TypeError
- Nav dinamica filtrada somente para projetos estrategicos

**Validador atualizado:**
- 13 novos asserts na Secao 9 detectam truncamento futuro de portfolio.html
- Total: 79 asserts | 0 FAIL

---

## v1.4.1 — Exibicao Executiva das Demandas Operacionais (Fase 5B.2)
**Data:** 2026-06-16

### O que mudou

A aba "Demandas" do portfolio passou de uma listagem basica para um painel de gestao executiva operacional.

**Resumo Executivo (novo):**
- Painel com 4 mini-cards: Total / Em Aberto / Concluidos / P0+P1
- Badges coloridos por tipo de item (Demanda, Incidente, Licenca/Contrato, Atividade Operacional, Entrega Contratual)

**Filtros avancados (novos):**
- Busca por texto (ja existia) + 4 novos filtros encadeados:
  - Tipo de Item (`filtro-dem-tipo`)
  - Status (`filtro-dem-status`)
  - Prioridade (`filtro-dem-prior`)
  - Frente/Cliente (`filtro-dem-frente`) — populado dinamicamente com valores unicos

**Tabela expandida:**
- De 10 para 11 colunas: adicionada coluna "Frente/Cliente"

**Aba Projetos preservada:**
- Nenhuma alteracao na logica de projetos estrategicos (psProj)

**Validacao:** 66 PASS | 0 FAIL | 0 AVISO

### O que nao muda

Os dados (`dados/projetos.js`) nao foram alterados. Os 13 registros (COI-001 a COI-013) estao intactos.

---

## v1.4.1 — Modelagem Operacional Inicial (Fase 5B.1)
**Data:** 2026-06-15

### O que mudou

O painel passou a representar a operação real do contrato Central IT — não apenas projetos estratégicos.

**Novos registros:**
- **COI-009** — Renovação de Licença AIOps (`Licença/Contrato`, Em andamento)
- **COI-010** — Recarga Emergencial Gupshup — Ticket 511151 (`Demanda`, Concluído)
- **COI-011** — Incidente Nuvidio — Validação e Reclassificação (`Incidente`, Concluído)
- **COI-012** — Atividade Operacional — Monitoramento AIOps AURA 156 (`Atividade Operacional`, Concluído)
- **COI-013** — MDS — Sistema Formulário de Ouvidoria (`Entrega Contratual`, Em andamento)

**Dashboard (index.html):**
- Cards de projetos estratégicos não são mais distorcidos por itens operacionais (separação `psProj`/`ps`)
- Card "Demandas em Aberto" retorna 2 (COI-009 + COI-013 — itens operacionais ativos)
- Gráficos e alertas filtrados para projetos apenas

**Portfólio (portfolio.html):**
- Aba "Projetos" exibe somente tipoItem='Projeto' (8 itens)
- Aba "Demandas" ativa: lista os 5 novos registros operacionais com busca dinâmica

**Validação:** 55 PASS | 0 FAIL | 0 AVISO

### O que não muda

Os 8 projetos estratégicos existentes (COI-001 a COI-008) não foram alterados. Toda a lógica e estrutura anterior do painel é preservada.

---

## v1.4.1 — Correção de Identidade Institucional (Fase 5T.5)
**Data:** 2026-06-15

### O que mudou (internamente)

Esta versao nao altera o painel visivelmente para o usuario final. Consolida a identidade institucional oficial do COI em todos os arquivos do projeto.

- **Identidade corrigida:** COI = Comunicacao Omnichannel Inteligente, plataforma da Central IT. Todos os arquivos ativos que exibiam "Centro de Operacoes Integradas" ou "Governo do Distrito Federal" como proprietario foram corrigidos.
- **30 arquivos atualizados:** index.html, portfolio.html, projetos/ficha.html, 11 skills (.claude/skills/*.md), 14 documentos de governanca e scripts/validar-funcional.js.
- **Preservacao de historico:** ocorrencias no corpo do CHANGELOG (historico tecnico), nomes proprios de projetos (e-GDF) e referencias ao GDF como cliente, ambiente ou sistema foram preservadas.
- **Validacao completa:** node scripts/validar-funcional.js — 40 asserts, exit 0.

### O que nao muda

Todas as funcionalidades do painel continuam identicas para o usuario.

---

## v1.4.1 — Enforcement Operacional do COI-MESTRE (Fase 5T.4)
**Data:** 2026-06-15

### O que mudou (internamente)

Esta versao nao altera o painel visivelmente para o usuario final. Consolida o modelo de governanca operacional do Claude no projeto.

- **Porta de entrada unica definida:** o Claude agora tem uma unica instrucao de entrada para qualquer tarefa tecnica — COI-MESTRE. Antes havia dois protocolos paralelos em CLAUDE.md, um dos quais subordinava o framework de skills ao protocolo original. Essa ambiguidade foi eliminada.
- **Sequencia pre-planejamento obrigatoria:** antes de qualquer execucao, o Claude deve obrigatoriamente percorrer COI-MEMORIA → COI-FORENSE → COI-LEARNINGS → COI-ARQUITETO. Isso garante que nenhuma fase seja planejada sem evidencia real e consulta ao historico de erros.
- **Proibicao explicita de atalhos:** COI-EXECUTOR, COI-TESTES, COI-QA, COI-AUDITOR, COI-GOVERNANCA e COI-RELEASE-MANAGER nao podem mais ser o ponto de entrada de qualquer atividade.
- **Checklist e protocolo alinhados:** os dois documentos de execucao refletem a nova regra com items de verificacao explicitamente identificados como "PASSO 0 — OBRIGATORIO".

### O que nao muda

Todas as funcionalidades do painel continuam identicas para o usuario.

---

## v1.4.1 — Aprendizado Continuo e Validacao Forense (Fase 5T.3)
**Data:** 2026-06-12

### O que mudou (internamente)

Esta versao nao altera o painel visivelmente para o usuario final. Melhora a qualidade e seguranca do processo de desenvolvimento com 4 novas camadas de controle operacional:

- **Analise forense antes de cada fase:** o Claude agora distingue o que foi confirmado por leitura direta do que e apenas inferencia. Decisoes erradas de escopo sao prevenidas antes de qualquer edicao.
- **Prevencao de erros por aprendizado:** antes de implementar, o Claude consulta automaticamente o historico de erros, padroes aprovados e decisoes arquiteturais do projeto para evitar repeticao de problemas conhecidos.
- **Suite de testes pre-validacao:** 6 categorias de testes (T1-T6) sao executadas antes do QA -- incluindo validacao funcional completa, verificacao de sintaxe JS, auditoria de padroes proibidos e integridade de arquivos.
- **Auditoria de protocolo:** apos cada implementacao, uma auditoria (A1-A5) verifica se o escopo foi respeitado, nenhum arquivo proibido foi tocado e o modo de execucao foi adequado ao risco.
- **Base de conhecimento evolutiva:** padroes aprovados (PA) e anti-padroes (AP) documentados para consulta futura.
- **Registro de decisoes arquiteturais:** DAR-001 a DAR-010 documentados com contexto e restricoes derivadas.

### O que nao muda

Todas as funcionalidades do painel continuam identicas para o usuario.

---

## v1.4.1 — Skills Operacionais Claude (Fase 5T.2)
**Data:** 2026-06-12

### O que mudou (internamente)

Esta versao nao altera nenhuma funcionalidade visivel do painel. As mudancas sao de infraestrutura operacional do Claude.

**Skills especializadas criadas:** foram criados 7 arquivos de skills em `.claude/skills/` que definem papeis operacionais do Claude para este projeto. O orquestrador `COI-MESTRE` coordena um fluxo de 6 especialidades: leitura de contexto, planejamento, execucao, validacao, governanca de documentacao e empacotamento da entrega. O objetivo e garantir que toda fase siga o mesmo padrao de qualidade, rastreabilidade e seguranca.

**Governanca atualizada:** 10 documentos de governanca foram atualizados para refletir o novo framework de skills, incluindo AGENTS.md, CLAUDE.md e o Protocolo Operacional.

### O que nao muda

Todas as funcionalidades do painel continuam iguais. Nenhum arquivo HTML, CSS ou JavaScript funcional foi alterado nesta fase.

---

## v1.4.1 — Infraestrutura de Qualidade e Validação (Fase 5T.1)
**Data:** 2026-06-12

### O que mudou (internamente)

Esta versão não altera nenhuma funcionalidade visível do painel. As mudanças são internas, de infraestrutura e processo.

**Validação multiplataforma:** foi criado um script de validação em Node.js (`scripts/validar-funcional.js`) que pode ser executado em qualquer sistema operacional — Windows, Linux ou macOS. Ele verifica automaticamente se os arquivos principais estão presentes, se os dados estão íntegros e se as melhorias mais recentes estão corretamente implementadas. Garante que erros técnicos sejam detectados antes de qualquer commit.

**Processo de commit aprimorado:** o checklist operacional foi atualizado para formalizar boas práticas de rastreabilidade: preferência por commits por melhoria individual, proibição de acumular fases sem commit e obrigação de atualizar toda a documentação antes de fechar cada fase.

**Documentação sincronizada:** todos os documentos de estado (ESTADO_ATUAL, MEMORIA, CHANGELOG, ROADMAP) foram atualizados para refletir o estado real do projeto após as Fases 5A.2 e 5A.3.

### O que não muda

Todas as funcionalidades do painel continuam iguais. Nenhum arquivo HTML, CSS ou JavaScript funcional foi alterado nesta fase.

---

## v1.4.1 — Refinamentos Funcionais (Fase 5A.3)
**Data:** 2026-06-12
**Tag:** `v1.4.1-refinamentos-funcionais`

### O que melhorou

Refinamentos aplicados sobre a base estabelecida na Fase 5A.2. Detalhes completos registrados no histórico da fase.

---

## v1.4.1 — Evolução Funcional do Painel (Fase 5A.2)
**Data:** 2026-06-12

### O que melhorou

**Card "Entregas da Semana" corrigido:** o card agora exibe corretamente as entregas da competência selecionada ou da última competência disponível, em vez de usar sempre um valor estático. Estava divergindo da seção "Execução Mensal" abaixo do dashboard.

**Card P0 exibe apenas projetos realmente ativos:** o contador de projetos P0 (críticos) passou a excluir projetos com status "Concluído" ou "Suspenso". Antes contabilizava todos os P0 independente do status, inflando o número exibido.

**Painel funciona sem erros visuais de estilo:** corrigidas três variáveis CSS que não existiam no design system do projeto. O seletor de competência mensal agora usa as cores e fontes corretas definidas pelo painel — antes herdava estilos do navegador.

**Filtro de frente no portfólio é dinâmico:** as opções do filtro de frente são geradas automaticamente a partir dos dados reais dos projetos. Antes eram quatro opções fixas no código que precisavam ser atualizadas manualmente ao adicionar projetos com novas frentes.

**Edição de campos permite limpeza:** ao editar uma ficha de projeto, campos preenchidos com `—` agora podem ser limpos corretamente. Antes o sistema ignorava a limpeza e mantinha o valor anterior.

**Código mais seguro e padronizado:** substituição do padrão `innerHTML = ''` por `clearEl()` nos arquivos de portfólio, alinhando com o padrão de segurança adotado desde a v1.3. Rodapé de versão unificado em todas as páginas.

### O que não muda

Todas as funcionalidades existentes continuam iguais: cadastro de projetos, fichas, atividades, riscos, marcos, pendências, seletor de competência e funcionamento offline.

---

## v1.4.1 — Histórico Mensal e Filtro por Competência
**Data:** 2026-06-10

### O que melhorou

**Seletor de competência na seção "Execução Mensal e Plano de Excelência":** o painel agora exibe um seletor que permite navegar entre competências mensais sem recarregar a página. Apenas a seção mensal é atualizada — cards, gráficos, tabela de portfólio e alertas executivos permanecem inalterados.

**Histórico mensal estruturado:** os dados do painel passam a suportar múltiplas competências por meio do array `meta.execucoesMensais[]`. Maio/2026 foi preenchido com os dados reais extraídos do painel anterior, incluindo 9 atividades, 5 demandas concluídas, 8 principais ganhos e 6 próximos passos registrados no fechamento do mês.

**Dados reais de Maio/2026:** os ganhos registrados incluem a apresentação do Sistema Formulário de Ouvidoria (MDS), validação da Migração WhatsApp para AURA, publicação do Painel COI no GitHub Pages integrado ao Google Sites, conclusão da Campanha Ativa de Resgate Qualifica DF, evolução do monitoramento AIOps e recarga emergencial da plataforma Gupshup.

**Compatibilidade retroativa:** caso o array `meta.execucoesMensais` não exista ou esteja vazio, o painel utiliza automaticamente `meta.execucaoMensal` como fallback — garantindo que versões anteriores não sejam afetadas.

### O que não muda

Todas as funcionalidades da v1.4 continuam iguais: seletor por frente e contrato no portfólio, cards executivos preenchidos, seção de Execução Mensal, fichas individuais com Bloco 9 e funcionamento offline.

---

## v1.4 — Execução Mensal e Gestão Executiva
**Data:** 2026-06-10

### O que melhorou

**Portfólio com agrupamento por frente:** os projetos no portfólio agora são