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
 */

const COI_DATA = {

  meta: {
    versao: "1.4.1",
    ciclo: "Junho 2026",
    responsavel: "PMO Digital COI",
    atualizadoEm: "2026-06-10",

    execucaoMensal: {
      competencia: "Junho/2026",
      resumo: "",
      totalAtividades: 0,
      totalDemandas: 0,
      totalMelhorias: 0,
      pendenciasCriticas: 0,
      principaisGanhos: [],
      proximasEntregas: [
        { data: "", entrega: "", projeto: "", responsavel: "", status: "No prazo" }
      ],
      planoExcelencia: [
        { acao: "", responsavel: "", prazo: "", status: "Pendente", evidencia: "" }
      ]
    },

    // ── Fase 4A.1 — Histórico mensal indexado por competência ─────────
    // Mais antigo primeiro. O seletor exibirá o último item por padrão.
    // execucaoMensal acima é preservado como fallback caso este array não exista.
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
        resumo: "",
        totalAtividades: 0,
        totalDemandas: 0,
        totalMelhorias: 0,
        pendenciasCriticas: 0,
        principaisGanhos: [],
        proximasEntregas: [
          { data: "", entrega: "", projeto: "", responsavel: "", status: "No prazo" }
        ],
        planoExcelencia: [
          { acao: "", responsavel: "", prazo: "", status: "Pendente", evidencia: "" }
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
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "",
      prazoPrevisto: "",
      dependencias: "Gupshup (API), WhatsApp Meta, CITSmartX",
      beneficio: "Aumento da eficiência operacional no envio de comunicações massivas e rastreabilidade das campanhas.",
      impactoContratual: "Sim",
      fonteInformacao: "",
      observacoesExecutivas: "",
      atualizadoEm: "",
      // --- Fase 4A ---
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "",
      beneficioRealizado: "",
      evidencia: "",
      riscosCriticos: 0,
      decisoesPendentes: 0
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
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "",
      prazoPrevisto: "",
      dependencias: "Portal do Cidadão, AIOps",
      beneficio: "Melhora na gestão urbana e transparência de dados de calçadas para o cidadão e gestores.",
      impactoContratual: "Não",
      fonteInformacao: "",
      observacoesExecutivas: "",
      atualizadoEm: "",
      // --- Fase 4A ---
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "",
      beneficioRealizado: "",
      evidencia: "",
      riscosCriticos: 0,
      decisoesPendentes: 0
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
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "",
      prazoPrevisto: "",
      dependencias: "Plataforma de Serviços Digitais GDF",
      beneficio: "Ampliação do acesso digital a serviços públicos e melhora da experiência do cidadão.",
      impactoContratual: "Não",
      fonteInformacao: "",
      observacoesExecutivas: "",
      atualizadoEm: "",
      // --- Fase 4A ---
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "",
      beneficioRealizado: "",
      evidencia: "",
      riscosCriticos: 0,
      decisoesPendentes: 0
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
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "",
      prazoPrevisto: "",
      dependencias: "CITSmartX, URA, Fornecedor de IA/NLU",
      beneficio: "Redução do tempo de atendimento, aumento de automação e melhora na qualidade das interações.",
      impactoContratual: "Sim",
      fonteInformacao: "",
      observacoesExecutivas: "",
      atualizadoEm: "",
      // --- Fase 4A ---
      frente: "Central de Atendimento",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "",
      beneficioRealizado: "",
      evidencia: "",
      riscosCriticos: 0,
      decisoesPendentes: 0
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
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "",
      prazoPrevisto: "",
      dependencias: "Grafana, Prometheus, infraestrutura de TI",
      beneficio: "Detecção proativa de falhas, redução de tempo de indisponibilidade e melhora na gestão de incidentes.",
      impactoContratual: "Não",
      fonteInformacao: "",
      observacoesExecutivas: "",
      atualizadoEm: "",
      // --- Fase 4A ---
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "",
      beneficioRealizado: "",
      evidencia: "",
      riscosCriticos: 0,
      decisoesPendentes: 0
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
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "",
      prazoPrevisto: "",
      dependencias: "Meta (aprovação), Gupshup (plataforma), CITSmartX",
      beneficio: "Canal oficial de comunicação digital de alta abrangência com o cidadão, reduzindo custos e aumentando alcance.",
      impactoContratual: "Sim",
      fonteInformacao: "",
      observacoesExecutivas: "",
      atualizadoEm: "",
      // --- Fase 4A ---
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "",
      beneficioRealizado: "",
      evidencia: "",
      riscosCriticos: 0,
      decisoesPendentes: 0
    },
    {
      id: "COI-007",
      nome: "Integrações CITSmartX",
      classificacao: "Integração",
      prioridade: "P1",
      status: "Em andamento",
      fase: "Execução",
      plataforma: "CITSmartX / APIs / Integrações",
      percentual: 45,
      semaforo: "🟢",
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "",
      prazoPrevisto: "",
      dependencias: "APIs externas, sistemas legados GDF",
      beneficio: "Redução de retrabalho, automação de fluxos e melhora na troca de dados entre sistemas.",
      impactoContratual: "Não",
      fonteInformacao: "",
      observacoesExecutivas: "",
      atualizadoEm: "",
      // --- Fase 4A ---
      frente: "Central de Atendimento",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "",
      beneficioRealizado: "",
      evidencia: "",
      riscosCriticos: 0,
      decisoesPendentes: 0
    },
    {
      id: "COI-008",
      nome: "Projetos de Automação e IA",
      classificacao: "Automação",
      prioridade: "P2",
      status: "Planejamento",
      fase: "Planejamento",
      plataforma: "Automação / IA / RPA / Agentes Inteligentes",
      percentual: 10,
      semaforo: "🟢",
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "",
      prazoPrevisto: "",
      dependencias: "Definir na fase de planejamento",
      beneficio: "Automação de tarefas repetitivas, liberação de equipe para atividades estratégicas e ganho de eficiência.",
      impactoContratual: "Não",
      fonteInformacao: "",
      observacoesExecutivas: "",
      atualizadoEm: "",
      // --- Fase 4A ---
      frente: "COI",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Projeto",
      planoExcelencia: false,
      beneficioEsperado: "",
      beneficioRealizado: "",
      evidencia: "",
      riscosCriticos: 0,
      decisoesPendentes: 0
    },

    // ================================================================
    // Fase 5B.1 — Modelagem Operacional (2026-06-15)
    // Novos registros operacionais: COI-009 a COI-013
    // Novos campos: solicitante, dataSolicitacao, prazoResolucao,
    //   dataResolucao, categoriaOperacional, origem, observacoesOperacionais
    // ================================================================

    {
      id: "COI-009",
      nome: "Renovação de Licença AIOps",
      classificacao: "Operacional",
      prioridade: "P1",
      status: "Concluído",
      fase: "Execução",
      plataforma: "AIOps / Grafana / Prometheus",
      percentual: 10,
      semaforo: "🟡",
      patrocinador: "",
      responsavel: "",
      orgao: "",
      dataInicio: "2026-06-01",
      prazoPrevisto: "",
      dependencias: "Fornecedor AIOps, Financeiro Central IT",
      beneficio: "Continuidade do monitoramento proativo do ambiente AURA sem interrupção.",
      impactoContratual: "Sim",
      fonteInformacao: "Gestão de Contratos",
      observacoesExecutivas: "Licença AIOps em uso no ambiente AURA 156. Renovação necessária para garantir continuidade do monitoramento.",
      atualizadoEm: "16/06/2026",
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Licença/Contrato",
      planoExcelencia: false,
      beneficioEsperado: "Continuidade do monitoramento AIOps sem interrupção.",
      beneficioRealizado: "",
      evidencia: "Chamado 518190 — https://aiops-156-externo.centralitcloud.com.br/",
      riscosCriticos: 1,
      decisoesPendentes: 1,
      solicitante: "Equipe COI",
      dataSolicitacao: "2026-06-01",
      prazoResolucao: "",
      dataResolucao: "13/06/2026",
      categoriaOperacional: "Licença",
      origem: "Gestão de Contratos",
      observacoesOperacionais: "Licença AIOps renovada após atendimento do chamado 518190. A renovação evitou impacto no monitoramento dos serviços, alertas e painéis da plataforma."
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
      responsavel: "",
      orgao: "",
      dataInicio: "2026-05-27",
      prazoPrevisto: "2026-05-27",
      dependencias: "Gupshup, Financeiro Central IT",
      beneficio: "Restabelecimento imediato do canal WhatsApp para envio de campanhas e atendimento.",
      impactoContratual: "Sim",
      fonteInformacao: "Ticket",
      observacoesExecutivas: "Recarga emergencial executada em 27/05/2026. Ticket nº 511151 registrado junto ao Gupshup.",
      atualizadoEm: "2026-05-27",
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
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
      observacoesOperacionais: "Ticket Gupshup nº 511151 registrado em 27/05/2026. Recarga executada no mesmo dia. Canal restabelecido."
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
      responsavel: "",
      orgao: "",
      dataInicio: "2026-05-01",
      prazoPrevisto: "",
      dependencias: "Nuvidio, Equipe Técnica COI",
      beneficio: "Contenção e reclassificação do incidente. Sem impacto aos usuários finais.",
      impactoContratual: "Não",
      fonteInformacao: "Monitoramento operacional",
      observacoesExecutivas: "Incidente Nuvidio identificado, investigado e reclassificado para acompanhamento controlado em Maio/2026.",
      atualizadoEm: "2026-05-31",
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
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
      observacoesOperacionais: "Incidente Nuvidio identificado, investigado e reclassificado para acompanhamento controlado. Sem impacto ao usuário final confirmado."
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
      responsavel: "",
      orgao: "",
      dataInicio: "2026-05-07",
      prazoPrevisto: "2026-05-27",
      dependencias: "COI-005 (Monitoramento AIOps), COI-001 (AURA)",
      beneficio: "Estabilidade do ambiente AURA 156 com monitoramento contínuo e ajustes realizados.",
      impactoContratual: "Não",
      fonteInformacao: "Rotina operacional",
      observacoesExecutivas: "Ajustes e evolução do monitoramento AIOps do ambiente AURA 156 realizados entre 07 e 27/05/2026.",
      atualizadoEm: "2026-05-27",
      frente: "CENTRAL DF",
      contrato: "",
      gerenteContrato: "",
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
      observacoesOperacionais: "Atividade de monitoramento contínuo com foco em estabilidade e alertas proativos. Vinculada ao projeto COI-005."
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
      prazoPrevisto: "",
      dependencias: "CITSmartX, MDS, COI-007 (Integrações CITSmartX)",
      beneficio: "Canal formal de ouvidoria digital para o MDS, integrado ao CITSmartX.",
      impactoContratual: "Sim",
      fonteInformacao: "Reunião",
      observacoesExecutivas: "Sistema apresentado em 29/05/2026. Publicação no CITSmartX MDS em andamento. Documentação e análise de viabilidade em preparação.",
      atualizadoEm: "2026-06-26",
      frente: "MDS",
      contrato: "",
      gerenteContrato: "",
      competencia: "Junho/2026",
      tipoItem: "Entrega Contratual",
      planoExcelencia: false,
      beneficioEsperado: "Sistema de ouvidoria digital operacional para o MDS via CITSmartX.",
      beneficioRealizado: "Sistema demonstrado em 29/05/2026 com formulário e funcionalidades validadas.",
      evidencia: "Apresentação 29/05/2026 — Sistema Formulário de Ouvidoria MDS",
      riscosCriticos: 1,
      decisoesPendentes: 1,
      solicitante: "MDS",
      dataSolicitacao: "2026-05-01",
      prazoResolucao: "",
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
        { acao: "Publicar formulário OuvSUAS no ambiente CITSmartX MDS", responsavel: "COI / MDS", dataPrevista: "", status: "Em andamento" },
        { acao: "Elaborar documentação técnica do produto", responsavel: "COI", dataPrevista: "", status: "Em andamento" },
        { acao: "Concluir análise de viabilidade econômica e financeira", responsavel: "COI / MDS", dataPrevista: "", status: "Pendente" },
        { acao: "Validação final e homologação com equipe MDS", responsavel: "MDS", dataPrevista: "", status: "Pendente" }
      ],
      riscosRegistrados: [
        { descricao: "Atraso na publicação no CITSmartX MDS por dependência de aprovações internas", probabilidade: "Média", impacto: "Alto", nivel: "Alto", status: "Identificado", mitigacao: "Manter comunicação ativa com equipe MDS e monitorar cronograma de aprovações" },
        { descricao: "Requisitos da análise de viabilidade podem alterar escopo do sistema", probabilidade: "Baixa", impacto: "Médio", nivel: "Médio", status: "Identificado", mitigacao: "Concluir análise antecipadamente para evitar retrabalho" }
      ]
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
