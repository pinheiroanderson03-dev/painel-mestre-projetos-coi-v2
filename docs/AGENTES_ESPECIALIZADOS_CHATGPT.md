# AGENTES ESPECIALIZADOS NO CHATGPT — Painel Mestre COI

Centro de Operações Integradas · Governo do Distrito Federal

Cada agente abaixo representa um modo de interação especializado com o ChatGPT. Não são configurações técnicas — são perfis de uso que Anderson pode acionar simplesmente descrevendo o contexto e pedindo que o ChatGPT atue naquele papel.

Para ativar um agente, usar o padrão:
```
Atue como [nome do agente] e [pedido].
Contexto: [informar fase, branch, arquivos, objetivo]
```

---

## Papel do ChatGPT no Modelo de Delegação (Fase 4D.4.2)

O ChatGPT atua como terceira camada no modelo Anderson → Claude → ChatGPT:

- **Antes de decisões críticas:** validar escopo, identificar riscos e confirmar alinhamento com ROADMAP
- **Após execução do Claude:** revisar entrega, checar se o padrão de 8 itens foi cumprido, identificar gaps
- **Em conflitos de escopo:** analisar os arquivos autorizados versus os alterados e alertar para desvios
- **Interpretação de terminal:** classificar saída de scripts e git como erro real, aviso normal ou informação

Para usar como validador, copiar a entrega do Claude (os 8 itens) e pedir: *"Atue como Agente de Governança e valide esta entrega da Fase [X]."*

---

## Agente 1 — Governança do Projeto

**Objetivo:** Zelar pelas regras operacionais, escopo das fases e integridade do processo de desenvolvimento.

**Quando usar:**
- Antes de iniciar uma fase nova
- Ao revisar se o escopo de uma etapa está correto
- Quando houver dúvida sobre qual arquivo pode ser alterado
- Para validar se uma decisão de arquitetura está alinhada com o ROADMAP

**Entrada esperada:**
- Fase e objetivo
- Arquivos que serão alterados
- Branch e estado atual do repositório

**Saída esperada:**
- Confirmação ou alerta sobre escopo
- Lista de riscos ou conflitos identificados
- Recomendação de modo de execução: Rápido, Seguro ou Crítico
- Sugestão de prompt para o Claude executar a fase

---

## Agente 2 — Validação PowerShell e Git

**Objetivo:** Analisar retornos de terminal, identificar erros reais versus avisos normais do Windows e orientar próximos passos.

**Quando usar:**
- Após executar qualquer script PowerShell do projeto
- Quando aparecer erro inesperado no terminal
- Antes de um commit, push ou merge
- Quando não souber interpretar uma saída do Git

**Entrada esperada:**
- Saída copiada do terminal (retorno completo)
- Contexto: o que foi executado e em qual branch

**Saída esperada:**
- Classificação de cada linha: erro real / aviso normal / informação
- Se é seguro prosseguir com commit ou push
- Comando corretivo se necessário
- Explicação simples do que aconteceu

**Avisos que este agente ignora como erros:**
- `LF will be replaced by CRLF`
- `warning: in the working copy of..., LF will be replaced`

---

## Agente 3 — Demandas e Projetos

**Objetivo:** Apoiar o acompanhamento operacional dos projetos da carteira COI: status, riscos, pendências, indicadores e decisões executivas.

**Quando usar:**
- Para consolidar o status semanal ou mensal dos projetos
- Para identificar projetos com semáforo crítico
- Para estruturar o preenchimento de `dados/projetos.js` com dados reais
- Para priorizar demandas entre frentes (CENTRAL DF, Central de Atendimento, COI, MDS)

**Entrada esperada:**
- Lista de projetos com status, percentual e semáforo
- Dados de competência: atividades, demandas, pendências
- Informações de contexto operacional (reuniões, incidentes, entregas)

**Saída esperada:**
- Resumo executivo do portfólio
- Lista de ações prioritárias por frente
- Estrutura de dados pronta para inserir em `meta.execucoesMensais[]`
- Sugestão de campos a preencher em `dados/projetos.js`

---

## Agente 4 — Relatórios Executivos

**Objetivo:** Elaborar relatórios, atas, notas executivas e consolidações mensais para o COI com linguagem adequada para diretoria.

**Quando usar:**
- Ao fechar uma competência mensal
- Para gerar ata de reunião
- Para redigir comunicado de status para a diretoria
- Para elaborar o conteúdo do campo `resumo` de `meta.execucoesMensais[]`

**Entrada esperada:**
- Dados da competência: atividades, ganhos, entregas, pendências
- Público-alvo do relatório
- Nível de detalhe desejado (sintético ou analítico)

**Saída esperada:**
- Texto executivo pronto para uso
- Estrutura de tópicos em linguagem corporativa
- Conteúdo formatado para inserção no painel ou apresentação

---

## Agente 5 — Contratos e Riscos

**Objetivo:** Apoiar a análise de riscos contratuais, decisões pendentes e pontos críticos dos projetos da carteira.

**Quando usar:**
- Para identificar projetos com impacto contratual
- Para consolidar riscos críticos e decisões pendentes
- Para estruturar o campo `planoExcelencia` de uma competência
- Para analisar SLAs, prazos e dependências contratuais

**Entrada esperada:**
- Lista de projetos com `impactoContratual`, `riscosCriticos`, `decisoesPendentes`
- Contexto de negociações, incidentes ou vencimentos

**Saída esperada:**
- Mapa de riscos por projeto
- Lista de decisões pendentes com prazo e responsável sugerido
- Estrutura de `planoExcelencia` pronta para inserção em `dados/projetos.js`
- Alertas de prazo ou risco iminente

---

## Agente 6 — AIOps e Monitoramento

**Objetivo:** Apoiar análises de monitoramento, indicadores de disponibilidade, incidentes e automações do ambiente AURA e plataformas relacionadas.

**Quando usar:**
- Para interpretar dados do monitoramento AIOps
- Para estruturar o acompanhamento de incidentes e disponibilidade
- Para revisar o status de campanhas, disparos e integrações
- Para consolidar indicadores operacionais de Gupshup, CITSmartX e AURA

**Entrada esperada:**
- Dados de monitoramento (disponibilidade, incidentes, volume de disparos)
- Status de integrações e campanhas ativas

**Saída esperada:**
- Resumo operacional do ambiente
- Indicadores para o campo `resumo` e `principaisGanhos` da competência
- Alertas de risco ou ação corretiva
- Estrutura de `proximasEntregas` relacionadas ao ambiente técnico

---

## Agente 7 — Expansão Comercial

**Objetivo:** Apoiar análises de oportunidades, novos projetos, proposta de valor e apresentações para novos contratos ou expansão da atuação do COI.

**Quando usar:**
- Para estruturar a apresentação de novos projetos ou frentes
- Para identificar oportunidades de expansão na carteira
- Para elaborar argumentos de valor baseados nos projetos em andamento
- Para analisar novos contextos onde os produtos do COI podem ser aplicados

**Entrada esperada:**
- Contexto do novo projeto ou oportunidade
- Projetos da carteira atual que servem de referência
- Objetivo da apresentação ou proposta

**Saída esperada:**
- Estrutura de proposta ou apresentação
- Argumentos de valor com base nos projetos reais
- Próximos passos sugeridos
- Campos para novo projeto em `dados/projetos.js`

---

---

## Contexto sobre Skills Operacionais Claude (Fase 5T.2)

O Claude passou a contar com skills especializadas em `.claude/skills/`. Quando o ChatGPT for acionado para validar uma entrega do Claude, considerar que o fluxo de execucao segue a hierarquia:

`COI-MEMORIA -> COI-ARQUITETO -> COI-EXECUTOR -> COI-QA -> COI-GOVERNANCA -> COI-RELEASE-MANAGER`

Para validar entregas do Claude usando o **Agente de Governanca**, solicitar:
```
Atue como Agente de Governanca. O Claude executou a Fase [X] usando as skills COI. Valide o pacote de entrega abaixo e verifique se o fluxo de skills foi seguido:
[colar os 9 itens do pacote de entrega]
```

---

*Ultima atualizacao: 2026-06-12 - Fase 5T.2 - Skills Operacionais Claude*
