# RELEASE NOTES — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

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

**Portfólio com agrupamento por frente:** os projetos no portfólio agora são organizados visualmente por frente de atuação (CENTRAL DF, Central de Atendimento, MDS, COI). Novos filtros permitem localizar projetos por frente, número de contrato ou gerente do contrato — além dos filtros de prioridade, status e busca por nome que já existiam.

**Cards do dashboard preenchidos:** os 4 cards de acompanhamento rápido (Demandas Ativas, Riscos Críticos, Decisões Pendentes, Entregas da Semana) agora exibem valores calculados automaticamente a partir dos dados reais dos projetos. Antes exibiam zero.

**Nova seção no dashboard — Execução Mensal e Plano de Excelência:** o painel principal passou a consolidar a competência em vigência, resumo executivo do mês, totais de atividades e melhorias, principais ganhos, próximas entregas com prazo e plano de excelência do COI.

**Fichas individuais com dados executivos completos:** cada ficha de projeto agora exibe frente, tipo do item, número e gerente do contrato, competência de referência. Uma nova seção — Execução Mensal e Gestão Executiva — mostra indicadores como riscos críticos, decisões pendentes e status do plano de excelência, além de benefícios esperados, realizados e evidências.

**Campos preparados para preenchimento:** todos os novos campos têm valor padrão `—` quando não preenchidos. O preenchimento desses campos será habilitado no modo de edição da próxima versão (Fase 4B).

### O que não muda

Todas as funcionalidades existentes continuam iguais: cadastro de projetos, atividades, riscos, marcos, pendências, modo de edição dos campos originais e funcionamento offline.

---

## v1.3 — Polimento e Robustez
**Data:** 2026-06-09

### O que melhorou

**Dashboard funciona sem internet:** os gráficos do painel principal agora carregam de um arquivo local (`assets/js/chart.umd.min.js`), sem precisar de conexão com a internet. Caso o arquivo local não seja encontrado, o painel busca automaticamente a versão online como reserva. Ambientes com restrição de rede no GDF não são mais afetados.

**Armazenamento mais seguro:** se o navegador atingir o limite de armazenamento local (~5MB), o painel agora exibe um aviso claro em vez de falhar silenciosamente. A mensagem orienta o usuário a exportar os dados antes de continuar.

**Diagnóstico de links inválidos:** acessos a fichas com ID inexistente passam a ser registrados automaticamente. Isso permite identificar rapidamente links quebrados sem depender de relatos manuais dos usuários. Os registros ficam visíveis no DevTools do navegador.

**Código mais limpo:** remoção de funções sem uso que haviam ficado como resíduo de versões anteriores. Sem impacto visível para o usuário.

### O que não muda

Todas as funcionalidades existentes continuam iguais: cadastro de projetos, fichas individuais, atividades, riscos, marcos, pendências e modo de edição.

---

## v1.2 — Ficha Dinâmica Universal
**Data:** 2026-06-09

### O que mudou

**Novos projetos funcionam imediatamente:** antes, cadastrar um novo projeto no portfólio gerava uma ficha sem conteúdo porque o arquivo HTML físico não existia. Agora, qualquer projeto cadastrado em `dados/projetos.js` abre sua ficha automaticamente pelo endereço `projetos/ficha.html#COI-009` (ou qualquer ID).

**Links antigos continuam funcionando:** os endereços `ficha_COI001.html` até `ficha_COI008.html` redirecionam automaticamente para a nova ficha. Bookmarks salvos não quebram.

**Dados históricos preservados:** nenhum dado registrado em versões anteriores foi perdido. O armazenamento local (atividades, riscos, marcos, pendências) permanece intacto.

### O que não muda

A aparência, o layout e o funcionamento das fichas são idênticos à versão anterior.

---

## v1.1 — Estabilização
**Data:** 2026-06-08

### O que mudou

**Dados centralizados:** todas as informações dos projetos passaram a ser gerenciadas em um único arquivo (`dados/projetos.js`). Antes, os dados estavam duplicados em cada arquivo HTML — qualquer atualização exigia editar 10 arquivos.

**Persistência de dados:** atividades, riscos, marcos e pendências registrados nas fichas agora são salvos no navegador e sobrevivem ao fechamento da janela ou ao recarregamento da página.

**Gráficos no dashboard:** o painel principal passou a exibir gráficos de distribuição por status, prioridade e classificação dos projetos, atualizados automaticamente a partir dos dados reais.

**Segurança:** correção de vulnerabilidade que permitia injeção de código via campos de texto. Todos os campos agora são tratados como texto simples.

### O que não muda

A estrutura visual do painel, as fichas individuais e a navegação entre projetos.

---

## v1.0 — Versão Inicial
**Data:** 2026-06-07

Lançamento do Painel Mestre COI com:
- Dashboard executivo com visão geral dos 8 projetos
- Portfólio com listagem, filtros e status de todos os projetos
- Fichas individuais para COI-001 a COI-008 com objetivo, cronograma, responsáveis, riscos e próximos passos
- Base de dados Excel (`coi_base_dados.xlsx`)
- Manual de governança (`manual_governanca.md`)
