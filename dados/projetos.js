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
 */

const COI_DATA = {

  meta: {
    versao: "1.0",
    ciclo: "Junho 2026",
    responsavel: "PMO Digital COI",
    atualizadoEm: "2026-06-08"
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
      atualizadoEm: ""
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
      atualizadoEm: ""
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
      atualizadoEm: ""
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
      atualizadoEm: ""
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
      atualizadoEm: ""
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
      atualizadoEm: ""
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
      atualizadoEm: ""
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
      atualizadoEm: ""
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
