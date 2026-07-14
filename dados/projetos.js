/**
 * COI — Fonte Única de Verdade dos Projetos
 * Arquivo: dados/projetos.js
 *
 * INSTRUÇÕES:
 * - Edite APENAS este arquivo para atualizar dados dos projetos.
 * - Os campos são carregados automaticamente por index.html, portfolio.html e fichas.
 * - Ao adicionar novo projeto: copie um objeto existente, atualize o ID e campos.
 * - Semáforo: '🟢' = no prazo | '🟡' = atenção | '🔴' = crítico
 * - Para persistência de edições feitas no painel, os dados são salvos em localStorage.
 *
 * FASE 4A — Novos campos por projeto:
 *   frente, contrato, gerenteContrato, competencia, tipoItem,
 *   planoExcelencia, beneficioEsperado, beneficioRealizado,
 *   evidencia, riscosCriticos, decisoesPendentes
 *
 * Novo bloco meta.execucaoMensal:
 *   competencia, resumo, totalAtividades, totalDemandas, totalMelhorias,
 *   pendenciasCriticas, principaisGanhos[], proximasEntregas[], planoExcelencia[]
 *
 * FASE 5 — Consolidação Executiva (2026-07-13):
 *   Junho/2026 e Julho/2026 preenchidos com dados reais do portfólio.
 *   Observações executivas atualizadas em todos os 13 projetos.
 */

const COI_DATA = {

  meta: {
    versao: "1.5.0",
    ciclo: "Julho 2026",
    responsavel: "PMO Digital COI",
    atualizadoEm: "2026-07-13",

    execucaoMensal: {
      competencia: "Julho/2026",
      resumo: "Durante o mês foi dada continuidade à evolução do Painel Mestre COI como iniciativa estratégica de gestão, com melhorias na organização das informações, padronização da governança e consolidação do acompanhamento dos projetos do contrato. Na frente de contratos, o WhatsApp Oficial aguarda definição da janela de produção, o Sistema OuvSUAS MDS evolui para publicação no CITSmartX e o monitoramento AIOps opera em regime contínuo pós-renovação de licença. O portfólio conta com 7 projetos em andamento, 4 concluídos e 2 em planejamento/homologação.",
      totalAtividades: 7,
      totalDemandas: 3,
      totalMelhorias: 4,
      pendenciasCriticas: 2,
      principaisGanhos: [
        "Painel Mestre COI: organização e padronização das informações de gestão do contrato",
        "Painel Mestre COI: consolidação da governança e rastreabilidade dos projetos e demandas",
        "Painel Mestre COI: padronização dos processos de atualização e acompanhamento executivo",
        "Painel Mestre COI: estruturação da documentação de suporte à gestão do contrato",
        "Painel Mestre COI: melhoria das ferramentas de análise e validação da qualidade das informações",
        "Monitoramento AIOps em regime contínuo com licença renovada (Chamado 518190 — 13/06/2026)",
        "MDS OuvSUAS: evolução para publicação no CITSmartX MDS em andamento"
      ],
      proximasEntregas: [
        { data: "2026-07-31", entrega: "Definição e execução da janela de virada WhatsApp para produção", projeto: "WhatsApp Oficial / Gupshup", responsavel: "COI / Gupshup", status: "Atenção" },
        { data: "2026-07-31", entrega: "Publicação do formulário OuvSUAS no CITSmartX MDS", projeto: "MDS — Sistema de Ouvidoria", responsavel: "COI / MDS", status: "Em andamento" },
        { data: "2026-08-15", entrega: "Documentação técnica e análise de viabilidade OuvSUAS", projeto: "MDS — Sistema de Ouvidoria", responsavel: "COI", status: "Pendente" },
        { data: "2026-08-31", entrega: "COI Daily — Relatório diário automatizado (Fase 6.4)", projeto: "Painel Mestre COI", responsavel: "PMO Digital COI", status: "Planejado" },
        { data: "", entrega: "Definição escopo IA para Telefonia — alinhamento com fornecedor NLU", projeto: "IA para Telefonia e NLU", responsavel: "COI", status: "Crítico" }
      ],
      planoExcelencia: [
        { acao: "Definir janela de virada WhatsApp para produção com Gupshup e Meta", responsavel: "COI / Gupshup", prazo: "2026-07-31", status: "Em andamento", evidencia: "" },
        { acao: "Concluir publicação OuvSUAS no CITSmartX MDS", responsavel: "COI / MDS", prazo: "2026-07-31", status: "Em andamento", evidencia: "" },
        { acao: "Alinhar fornecedor IA/NLU para evolução projeto COI-004", responsavel: "COI", prazo: "2026-07-31", status: "Pendente", evidencia: "" },
      ],
      alertasExecutivos: [
        { tipo: "CRÍTICO", descricao: "IA para Telefonia (COI-004) com semáforo vermelho — fornecedor NLU sem definição de escopo" },
        { tipo: "ATENÇÃO", descricao: "WhatsApp Oficial (COI-006) — janela de produção pendente de definição; risco de impacto contratual" },
        { tipo: "ATENÇÃO", descricao: "MDS OuvSUAS (COI-013) — publicação CITSmartX dependente de aprovação interna MDS" }
      ]
    },

    execucoesMensais: [
      {
        competencia: "Maio/2026",
        rotulo: "Maio/2026",
        resumo: "Em Maio/2026, o COI consolidou entregas relevantes nas frentes Central DF, MDS e Central de Atendimento, com destaque para a apresentação do Sistema Formulário de Ouvidoria, validações da Migração WhatsApp para AURA, fortalecimento do monitoramento AIOps do ambiente AURA 156, conclusão da Campanha Ativa de Resgate Qualifica DF, recarga emergencial da plataforma Gupshup e publicação do Painel COI no GitHub Pages integrado ao Google Sites. O período também marcou a organização da visão por contrato e a preparação dos próximos passos executivos para Junho/2026.",
        totalAtividades: 9,
        totalDemandas: 5,
        totalMelhorias: 0,
        pendenciasCriticas: 0,
        principaisGanhos: [
          "Sistema Formulário de Ouvidoria (MDS) apresentado em 29/05/2026 com demonstração de ambiente, formulário e funcionalidades",
          "Migração WhatsApp para AURA: ambiente de homologação validado e testes funcionais concluídos",
          "Incidente Nuvidio validado e reclassificado para acompanhamento controlado",
          "Painel COI publicado no GitHub Pages e integrado ao Google Sites com visão por contrato (Central DF, MDS e Central de Atendimento)",
          "Conclusão da Campanha Ativa de Resgate Qualifica DF com envio de relatório consolidado (14 a 18/05/2026)",
          "Ajustes e evolução do monitoramento AIOps do ambiente AURA 156 (07 a 27/05/2026)",
          "Recarga emergencial Gupshup executada — Ticket nº 511151 registrado em 27/05/2026",
          "Início do Painel Inteligente Portal do Cidadão – Gestão de Calçadas com levantamento funcional e estruturação do dashboard"
        ],
        proximasEntregas: [
          { data: "2026-06-03", entrega: "Ajuste da pesquisa de satisfação da Migração WhatsApp para AURA", projeto: "WhatsApp Oficial / Gupshup", responsavel: "", status: "No prazo" },
          { data: "2026-06-04", entrega: "Reunião de ajuste do transbordo URA → WhatsApp", projeto: "IA para Telefonia e NLU", responsavel: "", status: "No prazo" },
          { data: "", entrega: "Continuidade da publicação do Sistema Formulário de Ouvidoria no CITSmartX MDS", projeto: "Integrações CITSmartX", responsavel: "", status: "No prazo" },
          { data: "", entrega: "Documentação do produto para análise e ajustes", projeto: "MDS - Formulário de Ouvidoria", responsavel: "", status: "No prazo" },
          { data: "", entrega: "Análise de viabilidade econômica e financeira do produto", projeto: "MDS - Formulário de Ouvidoria", responsavel: "", status: "No prazo" },
          { data: "", entrega: "Definição de janela de virada para produção da Migração WhatsApp para AURA", projeto: "WhatsApp Oficial / Gupshup", responsavel: "", status: "No prazo" }
        ],
        planoExcelencia: [
          { acao: "", responsavel: "", prazo: "", status: "Pendente", evidencia: "" }
        ]
      },
      {
        competencia: "Junho/2026",
        rotulo: "Junho/2026",
        resumo: "Em Junho/2026, o COI registrou avanços em múltiplas frentes de projeto. Na frente WhatsApp/AURA, foram realizadas comparação técnica entre plataformas, evolução da migração operacional, ajustes no Facebook Business Manager, atualização da identidade visual dos canais e recarga de créditos Gupshup (Ticket 518941). A licença AIOps foi renovada (Chamado 518190 — 13/06/2026), o Ponto de Controle do Contrato 156 foi realizado e a publicação do OuvSUAS no CITSmartX MDS foi iniciada em 15/06/2026. No Portal do Cidadão GDF, foram realizadas atividades de organização da automação e preparação da arquitetura para Manus AI. O ChatBot MDS avançou na validação técnica. Registrado incidente operacional de lentidão no CITSmart entre 08h e 10h (Chamados 517681, 517842 e 518394 em acompanhamento, sem causa raiz confirmada no período). O portfólio manteve 7 projetos em andamento, com pendência crítica na definição da janela de produção do WhatsApp Oficial.",
        totalAtividades: 10,
        totalDemandas: 4,
        totalMelhorias: 5,
        pendenciasCriticas: 2,
        principaisGanhos: [
          "Renovação da licença AIOps concluída em 13/06/2026 — Chamado 518190 atendido, monitoramento contínuo do ambiente AURA garantido",
          "Plataforma AURA: comparação técnica com Tactium realizada, migração operacional do WhatsApp para AURA em andamento e Portal de Atendimento Humano com melhorias priorizadas (Origem: Microsoft Teams)",
          "WhatsApp Oficial / Gupshup: recarga de créditos concluída (Ticket 518941), permissões do Facebook Business Manager ajustadas, identidade visual dos canais atualizada e pesquisa de satisfação ajustada em 03/06/2026 (Origem: Microsoft Teams)",
          "Reunião de ajuste do transbordo URA → WhatsApp realizada em 04/06/2026; correção da geração de protocolos de campanhas no CITSmart concluída (Origem: Microsoft Teams)",
          "Ponto de Controle do Contrato 156 realizado (Origem: Reunião)",
          "MDS OuvSUAS: publicação no CITSmartX MDS iniciada em 15/06/2026; análise de viabilidade econômica e financeira iniciada em 26/06/2026; documentação técnica em preparação",
          "ChatBot MDS: validação técnica em andamento, certificado HTTPS em análise e homologação em continuidade",
          "Portal do Cidadão GDF — evolução da automação inteligente, fortalecimento da governança do processo de testes, organização da documentação técnica e ampliação da rastreabilidade das validações utilizando Manus AI.",
          "Painel Mestre COI — evolução da iniciativa estratégica de gestão do contrato, consolidando o acompanhamento dos projetos, a organização das informações executivas e o fortalecimento da governança operacional."
        ],
        proximasEntregas: [
          { data: "2026-07-31", entrega: "Definição e execução da janela de virada WhatsApp para produção", projeto: "WhatsApp Oficial / Gupshup", responsavel: "COI / Gupshup", status: "Atenção" },
          { data: "2026-07-31", entrega: "Publicação do formulário OuvSUAS no ambiente CITSmartX MDS", projeto: "MDS — Sistema de Ouvidoria", responsavel: "COI / MDS", status: "Em andamento" },
          { data: "2026-08-15", entrega: "Documentação técnica e análise de viabilidade OuvSUAS concluídas", projeto: "MDS — Sistema de Ouvidoria", responsavel: "COI", status: "Pendente" },
          { data: "", entrega: "Alinhamento de escopo e fornecedor de solução IA para Telefonia e NLU", projeto: "IA para Telefonia e NLU", responsavel: "COI", status: "Crítico" },
        ],
        planoExcelencia: [
          { acao: "Definir janela de virada WhatsApp para produção com Gupshup e Meta", responsavel: "COI / Gupshup", prazo: "2026-07-31", status: "Em andamento", evidencia: "" },
          { acao: "Concluir publicação OuvSUAS no CITSmartX MDS", responsavel: "COI / MDS", prazo: "2026-07-31", status: "Em andamento", evidencia: "" },
          { acao: "Retomar alinhamento com fornecedor IA/NLU — COI-004", responsavel: "COI", prazo: "2026-07-31", status: "Pendente", evidencia: "" }
        ],
        alertasExecutivos: [
          { tipo: "CRÍTICO", descricao: "IA para Telefonia (COI-004) — semáforo vermelho. Fornecedor NLU sem escopo definido. Risco de atraso contratual." },
          { tipo: "ATENÇÃO", descricao: "WhatsApp Oficial (COI-006) — janela de produção ainda não definida. Risco de impacto contratual com GDF." },
          { tipo: "ATENÇÃO", descricao: "MDS OuvSUAS (COI-013) — publicação CITSmartX depende de aprovação interna MDS. Monitorar cronograma." },
          { tipo: "INCIDENTE OPERACIONAL", descricao: "CITSmart — lentidão recorrente identificada no período entre 08h e 10h. Chamados relacionados: 517681, 517842 e 518394. Situação: incidente acompanhado pela equipe técnica. Sem causa raiz confirmada durante o período." },
          { tipo: "ATENÇÃO", descricao: "Infraestrutura da Filial — aquisição de fibras ópticas e Mini-GBICs aguardando confirmação documental." },
          { tipo: "OBSERVAÇÃO", descricao: "Segurança — identificada exposição de credencial institucional em canal de comunicação. Recomendado reforço das práticas de segurança da informação." }
        ]
      },
      {
        competencia: "Julho/2026",
        rotulo: "Julho/2026",
        resumo: "Durante o mês foi dada continuidade à evolução do Painel Mestre COI como iniciativa estratégica de gestão, com melhorias na organização das informações, padronização da governança e consolidação do acompanhamento dos projetos do contrato. Na frente de contratos, o WhatsApp Oficial aguarda definição da janela de produção, o Sistema OuvSUAS MDS evolui para publicação no CITSmartX e o monitoramento AIOps opera em regime contínuo. O portfólio conta com 7 projetos em andamento, 4 concluídos e 2 em planejamento/homologação.",
        totalAtividades: 7,
        totalDemandas: 3,
        totalMelhorias: 4,
        pendenciasCriticas: 2,
        principaisGanhos: [
          "Painel Mestre COI: organização e padronização das informações de gestão do contrato",
          "Painel Mestre COI: consolidação da governança e rastreabilidade dos projetos e demandas",
          "Painel Mestre COI: padronização dos processos de atualização e acompanhamento executivo",
          "Painel Mestre COI: estruturação da documentação de suporte à gestão do contrato",
          "Monitoramento AIOps em regime contínuo pós-renovação de licença (Chamado 518190)",
          "MDS OuvSUAS: publicação no CITSmartX MDS em andamento; documentação técnica em preparação",
          "Painel Mestre COI: validação da consistência e integridade das informações do portfólio"
        ],
        proximasEntregas: [
          { data: "2026-07-31", entrega: "Definição e execução da janela de virada WhatsApp para produção", projeto: "WhatsApp Oficial / Gupshup", responsavel: "COI / Gupshup", status: "Atenção" },
          { data: "2026-07-31", entrega: "Publicação do formulário OuvSUAS no CITSmartX MDS", projeto: "MDS — Sistema de Ouvidoria", responsavel: "COI / MDS", status: "Em andamento" },
          { data: "2026-08-15", entrega: "Documentação técnica e análise de viabilidade OuvSUAS", projeto: "MDS — Sistema de Ouvidoria", responsavel: "COI", status: "Pendente" },
          { data: "2026-08-31", entrega: "COI Daily — Relatório diário automatizado (Fase 6.4)", projeto: "Painel Mestre COI", responsavel: "PMO Digital COI", status: "Planejado" },
          { data: "", entrega: "Alinhamento de escopo e fornecedor IA/NLU", projeto: "IA para Telefonia e NLU", responsavel: "COI", status: "Crítico" }
        ],
        planoExcelencia: [
          { acao: "Definir janela de virada WhatsApp para produção com Gupshup e Meta", responsavel: "COI / Gupshup", prazo: "2026-07-31", status: "Em andamento", evidencia: "" },
          { acao: "Concluir publicação OuvSUAS no CITSmartX MDS", responsavel: "COI / MDS", prazo: "2026-07-31", status: "Em andamento", evidencia: "" },
          { acao: "Alinhar fornecedor IA/NLU para evolução do COI-004", responsavel: "COI", prazo: "2026-07-31", status: "Pendente", evidencia: "" },
          ],
        alertasExecutivos: [
          { tipo: "CRÍTICO", descricao: "IA para Telefonia (COI-004) com semáforo vermelho — fornecedor NLU sem definição de escopo" },
          { tipo: "ATENÇÃO", descricao: "WhatsApp Oficial (COI-006) — janela de produção pendente de definição; risco de impacto contratual" },
          { tipo: "ATENÇÃO", descricao: "MDS OuvSUAS (COI-013) — publicação CITSmartX dependente de aprovação interna MDS" }
        ]
      }
    ]
  },

  projetos: [
    {
      id: "COI-001",
      nome: "Sistema de Disparo de Campanhas AURA",
      classificacao: "Estratégico",
      prioridade: "P1",
      status: "Em andamento",
      fase: "Execução",
      plataforma: "AURA / Gupshup / WhatsApp / CITSmartX",
      percentual: 35,
      semaforo: "🟡",
      patrocinador: "Central IT / GDF",
      responsavel: "PMO Digital COI",
      orgao: "SECOM / GDF",
      dataInicio: "2026-01-01",
      prazoPrevisto: "2026-12-31",
      dependencias: "Gupshup (API), WhatsApp Meta, CITSmartX",
      beneficio: "Aumento da eficiência operacional no envio de comunicações massivas e rastreabilidade das campanhas.",
      impactoContratual: "Sim",
      fonteInformacao: "Painel COI / Reuniões operacionais",
      observacoesExecutivas: "Campanha Ativa de Resgate Qualifica DF concluída em Maio/2026 com relatório enviado (14 a 18/05). Sistema AURA em operação com campanhas ativas. Migração WhatsApp para AURA em fase final de homologação — pesquisa de satisfação ajustada em 03/06/2026. Em Junho: realizada comparação técnica entre módulo Chat Humano AURA e plataforma Tactium, correção da geração de protocolos de campanhas WhatsApp no CITSmart concluída e avanço nas discussões técnicas de migração da operação WhatsApp para a plataforma AURA (Origem: Microsoft Teams). Janela de virada para produção sendo definida com equipe Gupshup. Progresso atual em 35% aguardando integração completa com canal WhatsApp oficial.",
      atualizadoEm: "2026-07-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Projeto",
      planoExcelencia: true,
      beneficioEsperado: "Canal AURA integrado ao WhatsApp Meta para disparos de campanha com rastreabilidade completa.",
      beneficioRealizado: "Campanha Resgate Qualifica DF concluída com sucesso. Canal operacional para disparos via Gupshup.",
      evidencia: "Relatório Campanha Qualifica DF (14 a 18/05/2026) — Ticket 511151 Gupshup",
      riscosCriticos: 1,
      decisoesPendentes: 1,
      proximosPasso: "Definir janela de virada para produção da Migração WhatsApp para AURA com Gupshup e Meta.",
      evolucaoJunhoJulho: "Junho: homologação WhatsApp validada, pesquisa de satisfação ajustada (03/06), comparação técnica AURA vs Tactium realizada, correção de protocolos de campanhas no CITSmart concluída, discussões técnicas de migração em andamento (Origem: Microsoft Teams). Julho: aguardando definição da janela de produção."
    },
    {
      id: "COI-002",
      nome: "Painel Inteligente Portal do Cidadão – Gestão de Calçadas",
      classificacao: "Estratégico",
      prioridade: "P1",
      status: "Em andamento",
      fase: "Execução",
      plataforma: "Portal do Cidadão / AIOps / Dashboard Web",
      percentual: 40,
      semaforo: "🟡",
      patrocinador: "Central IT / GDF",
      responsavel: "PMO Digital COI",
      orgao: "GDF / Secretaria de Obras",
      dataInicio: "2026-05-01",
      prazoPrevisto: "2026-09-30",
      dependencias: "Portal do Cidadão, AIOps, Dados geoespaciais GDF",
      beneficio: "Melhora na gestão urbana e transparência de dados de calçadas para o cidadão e gestores.",
      impactoContratual: "Não",
      fonteInformacao: "Painel COI / Reuniões operacionais",
      observacoesExecutivas: "Projeto iniciado em Maio/2026 com levantamento funcional e estruturação do dashboard de calçadas. Em Junho: organização da automação do Portal do Cidadão, estruturação do processo de testes automatizados, evolução da documentação técnica, preparação da arquitetura para automação inteligente com Manus AI, padronização dos processos de validação, organização da geração automática de evidências e organização da governança técnica do projeto. Em Julho, evolução das visualizações para gestores com indicadores de cobertura e manutenção. Progresso em 40% conforme cronograma.",
      atualizadoEm: "2026-07-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "Dashboard web com visualização de dados de calçadas do GDF para gestores e cidadãos.",
      beneficioRealizado: "Levantamento funcional concluído. Estrutura do dashboard definida em Maio/2026.",
      evidencia: "Reunião de levantamento funcional Maio/2026 — Painel COI",
      riscosCriticos: 0,
      decisoesPendentes: 1,
      proximosPasso: "Integrar dados geoespaciais ao dashboard e validar visualizações com equipe GDF.",
      evolucaoJunhoJulho: "Junho: organização da automação do portal, estruturação de testes automatizados, documentação técnica evoluída, arquitetura para Manus AI preparada, padronização dos processos de validação e governança técnica organizada. Julho: evolução das visualizações e integração de dados."
    },
    {
      id: "COI-003",
      nome: "Evolução Aplicativo e-GDF",
      classificacao: "Estratégico",
      prioridade: "P1",
      status: "Em andamento",
      fase: "Execução",
      plataforma: "Aplicativo e-GDF / Serviços Digitais",
      percentual: 50,
      semaforo: "🟢",
      patrocinador: "Central IT / GDF",
      responsavel: "PMO Digital COI",
      orgao: "GDF / SEGOV",
      dataInicio: "2026-01-01",
      prazoPrevisto: "2026-12-31",
      dependencias: "Plataforma de Serviços Digitais GDF",
      beneficio: "Ampliação do acesso digital a serviços públicos e melhora da experiência do cidadão.",
      impactoContratual: "Não",
      fonteInformacao: "Painel COI",
      observacoesExecutivas: "Projeto em andamento no segundo semestre de 2026 com foco na ampliação do catálogo de serviços digitais disponíveis no aplicativo e-GDF. Progresso em 50% com entregas parciais realizadas. Sem riscos críticos identificados no período.",
      atualizadoEm: "2026-07-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "Novos serviços digitais disponíveis para cidadãos via aplicativo e-GDF.",
      beneficioRealizado: "Evolução contínua do catálogo de serviços. Progresso de 50% no período.",
      evidencia: "Painel COI — Registro de progresso Junho-Julho/2026",
      riscosCriticos: 0,
      decisoesPendentes: 0,
      proximosPasso: "Continuar evolução do catálogo de serviços e validar novas funcionalidades com equipe GDF.",
      evolucaoJunhoJulho: "Junho: 45% concluído. Julho: 50% com entregas parciais no catálogo de serviços."
    },
    {
      id: "COI-004",
      nome: "IA para Telefonia e NLU",
      classificacao: "Estratégico",
      prioridade: "P0",
      status: "Em andamento",
      fase: "Execução",
      plataforma: "Telefonia / URA / IA / NLU / CITSmartX",
      percentual: 30,
      semaforo: "🔴",
      patrocinador: "Central IT / GDF",
      responsavel: "PMO Digital COI",
      orgao: "GDF / Central de Atendimento",
      dataInicio: "2026-01-01",
      prazoPrevisto: "2026-12-31",
      dependencias: "CITSmartX, URA, Fornecedor de IA/NLU",
      beneficio: "Redução do tempo de atendimento, aumento de automação e melhora na qualidade das interações.",
      impactoContratual: "Sim",
      fonteInformacao: "Painel COI / Reuniões operacionais",
      observacoesExecutivas: "Projeto CRÍTICO (P0 — semáforo vermelho). Reunião de ajuste do transbordo URA → WhatsApp realizada em 04/06/2026. Pendência de definições técnicas e alinhamento de escopo com fornecedor de IA/NLU. Progresso estagnado em 30% devido à dependência do fornecedor. Risco de impacto contratual identificado. Ação imediata necessária para retomada do alinhamento.",
      atualizadoEm: "2026-07-13",
      frente: "Central de Atendimento",
      contrato: "Central de Atendimento",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Projeto",
      planoExcelencia: true,
      beneficioEsperado: "Automação de atendimento via IA/NLU integrada à URA e WhatsApp, reduzindo fila humana.",
      beneficioRealizado: "Reunião de transbordo realizada. Escopo técnico em definição.",
      evidencia: "Reunião 04/06/2026 — Transbordo URA → WhatsApp",
      riscosCriticos: 2,
      decisoesPendentes: 2,
      proximosPasso: "Alinhar escopo e contrato com fornecedor IA/NLU. Definir roadmap técnico de integração URA → WhatsApp.",
      evolucaoJunhoJulho: "Junho: reunião transbordo realizada (04/06). Julho: pendente alinhamento com fornecedor — risco crítico mantido."
    },
    {
      id: "COI-005",
      nome: "Monitoramento AIOps",
      classificacao: "Operacional",
      prioridade: "P1",
      status: "Em andamento",
      fase: "Execução",
      plataforma: "AIOps / Grafana / Prometheus / Monitoramento Web",
      percentual: 55,
      semaforo: "🟢",
      patrocinador: "Central IT",
      responsavel: "PMO Digital COI",
      orgao: "Central IT",
      dataInicio: "2026-01-01",
      prazoPrevisto: "2026-12-31",
      dependencias: "Grafana, Prometheus, infraestrutura de TI",
      beneficio: "Detecção proativa de falhas, redução de tempo de indisponibilidade e melhora na gestão de incidentes.",
      impactoContratual: "Não",
      fonteInformacao: "Painel COI / AIOps Dashboard",
      observacoesExecutivas: "Monitoramento AIOps em regime contínuo com licença renovada em 13/06/2026 (Chamado 518190 — Ticket atendido). Ambiente AURA 156 monitorado com alertas configurados e dashboard atualizado. Operação estável sem incidentes relevantes desde a renovação da licença.",
      atualizadoEm: "2026-06-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "Monitoramento proativo 24/7 do ambiente AURA com alertas e dashboards em tempo real.",
      beneficioRealizado: "Monitoramento contínuo ativo. Licença renovada (13/06/2026). Alertas configurados. Ambiente AURA 156 estável.",
      evidencia: "Chamado 518190 — https://aiops-156-externo.centralitcloud.com.br/ — Resolvido 13/06/2026",
      riscosCriticos: 0,
      decisoesPendentes: 0,
      proximosPasso: "Expandir cobertura do monitoramento para novos componentes do ambiente COI.",
      evolucaoJunhoJulho: "Junho: licença AIOps renovada (13/06 — Chamado 518190 — fonte: CHANGELOG Fase 5C.2)."
    },
    {
      id: "COI-006",
      nome: "WhatsApp Oficial / Gupshup",
      classificacao: "Estratégico",
      prioridade: "P0",
      status: "Homologação",
      fase: "Homologação",
      plataforma: "WhatsApp Oficial / Gupshup / Meta",
      percentual: 75,
      semaforo: "🟡",
      patrocinador: "Central IT / GDF",
      responsavel: "PMO Digital COI",
      orgao: "GDF / SECOM",
      dataInicio: "2026-01-01",
      prazoPrevisto: "2026-07-31",
      dependencias: "Meta (aprovação), Gupshup (plataforma), CITSmartX",
      beneficio: "Canal oficial de comunicação digital de alta abrangência com o cidadão, reduzindo custos e aumentando alcance.",
      impactoContratual: "Sim",
      fonteInformacao: "Painel COI / Reuniões operacionais",
      observacoesExecutivas: "Homologação concluída com testes funcionais e ambiente validados em Maio/2026. Pesquisa de satisfação ajustada em 03/06/2026. Reunião de transbordo URA → WhatsApp realizada em 04/06/2026. Em Junho: recarga de créditos Gupshup concluída (Ticket 518941), ajustes de permissões no Facebook Business Manager executados, atualização da identidade visual institucional dos canais WhatsApp Oficial em andamento e priorização de melhorias do Portal de Atendimento Humano realizada (Origem: Microsoft Teams). Janela de virada para produção ainda não definida — ponto de atenção com impacto contratual. Progresso em 75% aguardando go-live em produção.",
      atualizadoEm: "2026-07-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Projeto",
      planoExcelencia: true,
      beneficioEsperado: "Canal WhatsApp oficial ativo para comunicação em massa com cidadãos via AURA/Gupshup.",
      beneficioRealizado: "Homologação concluída. Ambiente de produção preparado. Pesquisa de satisfação ajustada.",
      evidencia: "Testes funcionais Maio/2026 — Pesquisa satisfação 03/06/2026 — Reunião URA 04/06/2026 — Ticket 518941 (recarga Gupshup Junho/2026)",
      riscosCriticos: 1,
      decisoesPendentes: 1,
      proximosPasso: "Definir e executar janela de virada para produção com Gupshup, Meta e equipe GDF.",
      evolucaoJunhoJulho: "Junho: pesquisa satisfação ajustada (03/06), transbordo alinhado (04/06), recarga Gupshup concluída (Ticket 518941), permissões Facebook Business Manager ajustadas, identidade visual WhatsApp em atualização, melhorias Portal Atendimento Humano priorizadas (Origem: Microsoft Teams). Julho: janela produção pendente — risco contratual."
    },
    {
      id: "COI-007",
      nome: "Integrações CITSmartX",
      classificacao: "Integração",
      prioridade: "P1",
      status: "Em andamento",
      fase: "Execução",
      plataforma: "CITSmartX / APIs / Integrações",
      percentual: 50,
      semaforo: "🟢",
      patrocinador: "Central IT",
      responsavel: "PMO Digital COI",
      orgao: "Central IT / GDF",
      dataInicio: "2026-01-01",
      prazoPrevisto: "2026-12-31",
      dependencias: "APIs externas, sistemas legados GDF, CITSmartX",
      beneficio: "Redução de retrabalho, automação de fluxos e melhora na troca de dados entre sistemas.",
      impactoContratual: "Não",
      fonteInformacao: "Painel COI",
      observacoesExecutivas: "Integrações CITSmartX em andamento com suporte ativo à publicação do Sistema OuvSUAS MDS no ambiente CITSmartX. Em Junho/Julho, foco na integração do formulário de ouvidoria (COI-013). Progresso evoluído de 45% para 50% no período. Sem riscos críticos identificados.",
      atualizadoEm: "2026-07-13",
      frente: "Central de Atendimento",
      contrato: "Central de Atendimento",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "Integração completa entre CITSmartX e sistemas externos do GDF com fluxos automatizados.",
      beneficioRealizado: "Integração OuvSUAS-CITSmartX em andamento. Publicação MDS em progresso (15/06/2026).",
      evidencia: "Início publicação CITSmartX MDS — 15/06/2026",
      riscosCriticos: 0,
      decisoesPendentes: 0,
      proximosPasso: "Concluir publicação do OuvSUAS no CITSmartX MDS e validar fluxo de integração completo.",
      evolucaoJunhoJulho: "Junho: publicação OuvSUAS no CITSmartX iniciada (15/06). Julho: evolução para 50%, foco na conclusão."
    },
    {
      id: "COI-008",
      nome: "Projetos de Automação e IA",
      classificacao: "Automação",
      prioridade: "P2",
      status: "Em andamento",
      fase: "Execução",
      plataforma: "Automação / IA / RPA / Agentes Inteligentes / Painel Mestre COI",
      percentual: 30,
      semaforo: "🟢",
      patrocinador: "Central IT",
      responsavel: "PMO Digital COI",
      orgao: "Central IT",
      dataInicio: "2026-05-01",
      prazoPrevisto: "2026-12-31",
      dependencias: "GitHub Pages, ferramentas de gestão e acompanhamento de projetos",
      beneficio: "Automação de tarefas repetitivas, liberação de equipe para atividades estratégicas e ganho de eficiência.",
      impactoContratual: "Não",
      fonteInformacao: "Painel Mestre COI",
      observacoesExecutivas: "O Painel Mestre COI é uma iniciativa estratégica de gestão voltada à consolidação dos projetos, demandas, indicadores, riscos, entregas e informações executivas do COI. A iniciativa fortalece a governança, a rastreabilidade das informações, a padronização dos processos de acompanhamento e a elaboração de relatórios para apoio à tomada de decisão.",
      atualizadoEm: "2026-07-13",
      frente: "COI",
      contrato: "COI",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "Painel Mestre COI consolidado como plataforma de gestão executiva do contrato, com governança, rastreabilidade e relatórios estruturados para apoio à tomada de decisão.",
      beneficioRealizado: "Painel Mestre COI em operação com governança estruturada, processos de acompanhamento padronizados e informações executivas consolidadas.",
      evidencia: "Painel Mestre COI — GitHub Pages — iniciativa em operação contínua com melhorias incrementais",
      riscosCriticos: 0,
      decisoesPendentes: 1,
      proximosPasso: "Evoluir o Painel Mestre COI com relatório diário automatizado do portfólio de projetos.",
      evolucaoJunhoJulho: "Junho/Julho 2026: melhoria das ferramentas de análise, padronização da governança e consolidação do acompanhamento executivo do portfólio."
    },

    // ================================================================
    // Fase 5B.1 — Modelagem Operacional (2026-06-15)
    // Novos registros operacionais: COI-009 a COI-013
    // ================================================================

    {
      id: "COI-009",
      nome: "Renovação de Licença AIOps",
      classificacao: "Operacional",
      prioridade: "P1",
      status: "Concluído",
      fase: "Execução",
      plataforma: "AIOps / Grafana / Prometheus",
      percentual: 100,
      semaforo: "🟢",
      patrocinador: "",
      responsavel: "PMO Digital COI",
      orgao: "Central IT",
      dataInicio: "2026-06-01",
      prazoPrevisto: "2026-06-15",
      dependencias: "Fornecedor AIOps, Financeiro Central IT",
      beneficio: "Continuidade do monitoramento proativo do ambiente AURA sem interrupção.",
      impactoContratual: "Sim",
      fonteInformacao: "Gestão de Contratos",
      observacoesExecutivas: "Licença AIOps renovada com sucesso em 13/06/2026 via Chamado 518190. A renovação evitou impacto no monitoramento do ambiente AURA 156, garantindo continuidade dos alertas, dashboards e serviços de observabilidade. Demanda concluída dentro do prazo.",
      atualizadoEm: "2026-07-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Junho/2026",
      tipoItem: "Licença/Contrato",
      planoExcelencia: false,
      beneficioEsperado: "Continuidade do monitoramento AIOps sem interrupção.",
      beneficioRealizado: "Licença renovada em 13/06/2026. Monitoramento AURA 156 garantido. Sem impacto operacional.",
      evidencia: "Chamado 518190 — https://aiops-156-externo.centralitcloud.com.br/ — Resolvido 13/06/2026",
      riscosCriticos: 0,
      decisoesPendentes: 0,
      solicitante: "Equipe COI",
      dataSolicitacao: "2026-06-01",
      prazoResolucao: "2026-06-15",
      dataResolucao: "13/06/2026",
      categoriaOperacional: "Licença",
      origem: "Gestão de Contratos",
      observacoesOperacionais: "Licença AIOps renovada após atendimento do chamado 518190. A renovação evitou impacto no monitoramento dos serviços, alertas e painéis da plataforma.",
      proximosPasso: "Acompanhar próximo vencimento da licença e planejar renovação com antecedência.",
      evolucaoJunhoJulho: "Junho: licença renovada (13/06 — Chamado 518190 concluído). Julho: operação estável."
    },

    {
      id: "COI-010",
      nome: "Recarga Emergencial Gupshup — Ticket 511151",
      classificacao: "Operacional",
      prioridade: "P1",
      status: "Concluído",
      fase: "Encerramento",
      plataforma: "Gupshup / WhatsApp / AURA",
      percentual: 100,
      semaforo: "🟢",
      patrocinador: "",
      responsavel: "PMO Digital COI",
      orgao: "Central IT",
      dataInicio: "2026-05-27",
      prazoPrevisto: "2026-05-27",
      dependencias: "Gupshup, Financeiro Central IT",
      beneficio: "Restabelecimento imediato do canal WhatsApp para envio de campanhas e atendimento.",
      impactoContratual: "Sim",
      fonteInformacao: "Ticket",
      observacoesExecutivas: "Recarga emergencial executada com sucesso em 27/05/2026 — Ticket nº 511151 registrado junto ao Gupshup. Canal WhatsApp restabelecido no mesmo dia. Demanda encerrada. Ação de prevenção: monitorar saldo Gupshup mensalmente para evitar recargas emergenciais.",
      atualizadoEm: "2026-07-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Maio/2026",
      tipoItem: "Demanda",
      planoExcelencia: false,
      beneficioEsperado: "Restabelecimento imediato do saldo Gupshup.",
      beneficioRealizado: "Saldo recarregado. Canal WhatsApp operacional restabelecido em 27/05/2026.",
      evidencia: "Ticket nº 511151 (27/05/2026)",
      riscosCriticos: 0,
      decisoesPendentes: 0,
      solicitante: "Equipe COI / AURA",
      dataSolicitacao: "2026-05-27",
      prazoResolucao: "2026-05-27",
      dataResolucao: "2026-05-27",
      categoriaOperacional: "Sustentação",
      origem: "Operação emergencial",
      observacoesOperacionais: "Ticket Gupshup nº 511151 registrado em 27/05/2026. Recarga executada no mesmo dia. Canal restabelecido.",
      proximosPasso: "Instituir monitoramento preventivo do saldo Gupshup para evitar recargas emergenciais.",
      evolucaoJunhoJulho: "Demanda concluída em Maio/2026. Sem pendências em Junho/Julho."
    },

    {
      id: "COI-011",
      nome: "Incidente Nuvidio — Validação e Reclassificação",
      classificacao: "Incidente Relevante",
      prioridade: "P1",
      status: "Concluído",
      fase: "Encerramento",
      plataforma: "Nuvidio / AURA",
      percentual: 100,
      semaforo: "🟢",
      patrocinador: "",
      responsavel: "PMO Digital COI",
      orgao: "Central IT",
      dataInicio: "2026-05-01",
      prazoPrevisto: "",
      dependencias: "Nuvidio, Equipe Técnica COI",
      beneficio: "Contenção e reclassificação do incidente. Sem impacto aos usuários finais.",
      impactoContratual: "Não",
      fonteInformacao: "Monitoramento operacional",
      observacoesExecutivas: "Incidente Nuvidio identificado, investigado e reclassificado para acompanhamento controlado em Maio/2026. Conclusão confirmada em 31/05/2026 sem impacto ao usuário final. Demanda encerrada. Lição aprendida: fortalecer monitoramento Nuvidio no AIOps.",
      atualizadoEm: "2026-07-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Maio/2026",
      tipoItem: "Incidente",
      planoExcelencia: false,
      beneficioEsperado: "Contenção e reclassificação do incidente.",
      beneficioRealizado: "Incidente reclassificado para acompanhamento controlado. Risco mitigado. Sem impacto ao usuário final.",
      evidencia: "Registro operacional Maio/2026",
      riscosCriticos: 0,
      decisoesPendentes: 0,
      solicitante: "Equipe COI",
      dataSolicitacao: "2026-05-01",
      prazoResolucao: "",
      dataResolucao: "2026-05-31",
      categoriaOperacional: "Incidente",
      origem: "Monitoramento operacional",
      observacoesOperacionais: "Incidente Nuvidio identificado, investigado e reclassificado para acompanhamento controlado. Sem impacto ao usuário final confirmado.",
      proximosPasso: "Incluir Nuvidio no monitoramento proativo AIOps para detecção precoce de falhas.",
      evolucaoJunhoJulho: "Incidente concluído em Maio/2026. Acompanhamento controlado ativo em Junho/Julho."
    },

    {
      id: "COI-012",
      nome: "Atividade Operacional — Monitoramento AIOps AURA 156",
      classificacao: "Operacional",
      prioridade: "P2",
      status: "Concluído",
      fase: "Encerramento",
      plataforma: "AIOps / Grafana / Prometheus / AURA",
      percentual: 100,
      semaforo: "🟢",
      patrocinador: "",
      responsavel: "PMO Digital COI",
      orgao: "Central IT",
      dataInicio: "2026-05-07",
      prazoPrevisto: "2026-05-27",
      dependencias: "COI-005 (Monitoramento AIOps), COI-001 (AURA)",
      beneficio: "Estabilidade do ambiente AURA 156 com monitoramento contínuo e ajustes realizados.",
      impactoContratual: "Não",
      fonteInformacao: "Rotina operacional",
      observacoesExecutivas: "Atividade de monitoramento AIOps do ambiente AURA 156 concluída entre 07 e 27/05/2026. Alertas configurados, dashboards atualizados e estabilidade do ambiente garantida. Atividade incorporada à rotina operacional contínua vinculada ao projeto COI-005.",
      atualizadoEm: "2026-07-13",
      frente: "CENTRAL DF",
      contrato: "Central DF",
      gerenteContrato: "PMO Digital COI",
      competencia: "Maio/2026",
      tipoItem: "Atividade Operacional",
      planoExcelencia: false,
      beneficioEsperado: "Melhoria contínua do monitoramento AIOps do ambiente AURA 156.",
      beneficioRealizado: "Ambiente AURA 156 monitorado e ajustado. Alertas configurados. Dashboard atualizado.",
      evidencia: "Registros de monitoramento AIOps (07 a 27/05/2026)",
      riscosCriticos: 0,
      decisoesPendentes: 0,
      solicitante: "Equipe COI",
      dataSolicitacao: "2026-05-07",
      prazoResolucao: "2026-05-27",
      dataResolucao: "2026-05-27",
      categoriaOperacional: "Monitoramento",
      origem: "Rotina operacional",
      observacoesOperacionais: "Atividade de monitoramento contínuo com foco em estabilidade e alertas proativos. Vinculada ao projeto COI-005.",
      proximosPasso: "Continuidade do monitoramento AIOps vinculada ao projeto COI-005.",
      evolucaoJunhoJulho: "Atividade concluída em Maio/2026. Monitoramento incorporado à rotina operacional COI-005."
    },

    {
      id: "COI-013",
      nome: "MDS — Sistema de Ouvidoria (OuvSUAS)",
      classificacao: "Estratégico",
      prioridade: "P1",
      status: "Em andamento",
      fase: "Homologação",
      plataforma: "CITSmartX / MDS / Formulário Web",
      percentual: 50,
      semaforo: "🟢",
      patrocinador: "MDS — Ministério do Desenvolvimento Social",
      responsavel: "PMO Digital COI",
      orgao: "MDS",
      dataInicio: "2026-05-01",
      prazoPrevisto: "2026-08-31",
      dependencias: "CITSmartX, MDS, COI-007 (Integrações CITSmartX)",
      beneficio: "Canal formal de ouvidoria digital para o MDS, integrado ao CITSmartX.",
      impactoContratual: "Sim",
      fonteInformacao: "Reunião",
      observacoesExecutivas: "Sistema demonstrado em 29/05/2026 com validação do formulário e funcionalidades pela equipe MDS. Publicação no CITSmartX MDS iniciada em 15/06/2026. Documentação técnica do produto em preparação. Análise de viabilidade econômica e financeira iniciada em 26/06/2026.",
      atualizadoEm: "2026-06-26",
      frente: "MDS",
      contrato: "MDS",
      gerenteContrato: "PMO Digital COI",
      competencia: "Julho/2026",
      tipoItem: "Entrega Contratual",
      planoExcelencia: true,
      beneficioEsperado: "Sistema de ouvidoria digital operacional para o MDS via CITSmartX.",
      beneficioRealizado: "Sistema demonstrado em 29/05/2026. Publicação no CITSmartX MDS iniciada (15/06/2026). Análise de viabilidade iniciada (26/06/2026).",
      evidencia: "Apresentação 29/05/2026 — Publicação CITSmartX 15/06/2026 — Atualização 26/06/2026",
      riscosCriticos: 1,
      decisoesPendentes: 1,
      solicitante: "MDS",
      dataSolicitacao: "2026-05-01",
      prazoResolucao: "2026-08-31",
      dataResolucao: "",
      categoriaOperacional: "Entrega",
      origem: "Contrato MDS",
      observacoesOperacionais: "Sistema em fase de publicação no CITSmartX MDS. Documentação técnica em preparação. Análise de viabilidade econômica e financeira em andamento.",
      objetivo: "Implementar canal formal de ouvidoria digital para o MDS (Ministério do Desenvolvimento Social), baseado no sistema OuvSUAS, integrado ao CITSmartX para registro, acompanhamento e resolução de manifestações cidadãs via formulário web.",
      situacaoAtual: "Sistema demonstrado em 29/05/2026 com formulário e funcionalidades validadas pela equipe MDS. Em fase de publicação no CITSmartX MDS. Documentação técnica do produto em preparação. Análise de viabilidade econômica e financeira iniciada. Progresso atual: 50%.",
      historicoOperacional: [
        { data: "2026-05-01", descricao: "Início formal do projeto OuvSUAS — levantamento de requisitos com equipe MDS", responsavel: "COI / MDS", evidencia: "" },
        { data: "2026-05-29", descricao: "Demonstração do Sistema Formulário de Ouvidoria MDS — funcionalidades validadas pela equipe", responsavel: "COI", evidencia: "Apresentação 29/05/2026 — Sistema Formulário de Ouvidoria MDS" },
        { data: "2026-06-15", descricao: "Início da fase de publicação no CITSmartX MDS e preparação da documentação técnica", responsavel: "COI", evidencia: "" },
        { data: "2026-06-26", descricao: "Atualização de progresso para 50%. Análise de viabilidade econômica e financeira iniciada", responsavel: "PMO Digital COI", evidencia: "" }
      ],
      proximasAcoes: [
        { acao: "Publicar formulário OuvSUAS no ambiente CITSmartX MDS", responsavel: "COI / MDS", dataPrevista: "2026-07-31", status: "Em andamento" },
        { acao: "Elaborar documentação técnica do produto", responsavel: "COI", dataPrevista: "2026-08-15", status: "Em andamento" },
        { acao: "Concluir análise de viabilidade econômica e financeira", responsavel: "COI / MDS", dataPrevista: "2026-08-15", status: "Em andamento" },
        { acao: "Validação final e homologação com equipe MDS", responsavel: "MDS", dataPrevista: "2026-08-31", status: "Pendente" }
      ],
      riscosRegistrados: [
        { descricao: "Atraso na publicação no CITSmartX MDS por dependência de aprovações internas", probabilidade: "Média", impacto: "Alto", nivel: "Alto", status: "Identificado", mitigacao: "Manter comunicação ativa com equipe MDS e monitorar cronograma de aprovações" },
        { descricao: "Requisitos da análise de viabilidade podem alterar escopo do sistema", probabilidade: "Baixa", impacto: "Médio", nivel: "Médio", status: "Identificado", mitigacao: "Concluir análise antecipadamente para evitar retrabalho" }
      ],
      proximosPasso: "Concluir publicação no CITSmartX MDS e elaborar documentação técnica do produto OuvSUAS.",
      evolucaoJunhoJulho: "Junho: publicação CITSmartX iniciada (15/06/2026); análise de viabilidade econômica e financeira iniciada (26/06/2026)."
    }
  ]
};

/**
 * Carrega dados do localStorage (se existir versão editada pelo usuário)
 * e mescla com os dados base. Campos editados no painel têm precedência.
 */
(function aplicarOverridesLocalStorage() {
  try {
    const saved = localStorage.getItem("coi_projetos_overrides");
    if (!saved) return;
    const overrides = JSON.parse(saved);
    COI_DATA.projetos = COI_DATA.projetos.map(p => {
      const override = overrides.find(o => o.id === p.id);
      return override ? { ...p, ...override } : p;
    });
    // Adiciona projetos novos cadastrados no painel
    overrides.forEach(o => {
      if (!COI_DATA.projetos.find(p => p.id === o.id)) {
        COI_DATA.projetos.push(o);
      }
    });
  } catch (e) {
    console.warn("COI: erro ao carregar localStorage:", e);
  }
})();

/**
 * Salva um projeto atualizado no localStorage.
 * @param {object} projeto - objeto do projeto com id obrigatório
 */
function coiSalvarProjeto(projeto) {
  try {
    const saved = localStorage.getItem("coi_projetos_overrides");
    let overrides = saved ? JSON.parse(saved) : [];
    const idx = overrides.findIndex(o => o.id === projeto.id);
    if (idx >= 0) overrides[idx] = { ...overrides[idx], ...projeto };
    else overrides.push(projeto);
    localStorage.setItem("coi_projetos_overrides", JSON.stringify(overrides));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
      console.error("COI: localStorage cheio ao salvar projeto.", e);
      return { ok: false, quota: true };
    }
    console.error("COI: erro ao salvar projeto:", e);
    return false;
  }
}

/**
 * Salva dados extras de uma ficha (atividades, riscos, marcos, pendências).
 * @param {string} projetoId - ex: "COI-001"
 * @param {string} secao - ex: "atividades", "riscos", "marcos"
 * @param {Array} dados - array de objetos
 */
function coiSalvarSecaoFicha(projetoId, secao, dados) {
  try {
    const key = `coi_ficha_${projetoId}_${secao}`;
    localStorage.setItem(key, JSON.stringify(dados));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
      console.error("COI: localStorage cheio ao salvar seção:", secao, e);
      return { ok: false, quota: true };
    }
    console.error("COI: erro ao salvar seção:", e);
    return false;
  }
}

/**
 * Carrega dados de uma seção de ficha do localStorage.
 * @param {string} projetoId
 * @param {string} secao
 * @returns {Array} dados salvos ou array vazio
 */
function coiCarregarSecaoFicha(projetoId, secao) {
  try {
    const key = `coi_ficha_${projetoId}_${secao}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn("COI: erro ao carregar seção:", e);
    return [];
  }
}
