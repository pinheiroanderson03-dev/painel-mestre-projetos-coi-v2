# RELEASE NOTES — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

---

## v1.3 — Polimento e Robustez
**Data:** 2026-06-09

### O que melhorou

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
