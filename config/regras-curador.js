// =============================================================
// COI Intelligence Engine -- Configuracao de Regras do Curador
// Arquivo: config/regras-curador.js
// Fase: 6.2.1 -- Refinamento do COI Curador Inteligente
// =============================================================
//
// Define as 12 regras de validacao automatica de qualidade de dados.
//
// Cada regra expoe:
//   id          : codigo da regra (R01-R12)
//   nome        : nome curto descritivo
//   peso        : pontos deduzidos do score quando violada
//   severidade  : 'ERRO' ou 'ALERTA'
//   obrigatoria : true = nao pode ser desativada
//   ativa       : true = sera executada pelo motor
//   validar(p, ctx) : funcao de validacao
//     p   = registro de dados/projetos.js
//     ctx = { vazio, parseData, diasDesde, ehConcluido, HOJE }
//     retorna objeto de violacao ou null
//
// Motor: scripts/coi-curador-inteligente.js
// =============================================================

'use strict';

var REGRAS_CURADOR = [

  // R01: Responsavel ausente
  {
    id: 'R01', nome: 'Responsavel ausente',
    peso: 12, severidade: 'ERRO', obrigatoria: true, ativa: true,
    validar: function(p, ctx) {
      if (!ctx.vazio(p.responsavel)) return null;
      return { tipo: 'ERRO', codigo: 'R01',
        descricao: 'Responsavel ausente ou nao definido',
        acao: 'Definir responsavel via COI-CURADOR e registrar em dados/projetos.js' };
    }
  },

  // R02: Orgao ausente
  {
    id: 'R02', nome: 'Orgao ausente',
    peso: 5, severidade: 'ALERTA', obrigatoria: false, ativa: true,
    validar: function(p, ctx) {
      if (!ctx.vazio(p.orgao)) return null;
      return { tipo: 'ALERTA', codigo: 'R02',
        descricao: 'Orgao ou cliente nao informado',
        acao: 'Identificar o orgao ou cliente responsavel e registrar o campo orgao' };
    }
  },

  // R03: Objetivo ausente
  {
    id: 'R03', nome: 'Objetivo ausente',
    peso: 12, severidade: 'ERRO', obrigatoria: true, ativa: true,
    validar: function(p, ctx) {
      if (!ctx.vazio(p.objetivo)) return null;
      return { tipo: 'ERRO', codigo: 'R03',
        descricao: 'Objetivo do item nao documentado',
        acao: 'Registrar objetivo claro e mensuravel via COI-CURADOR (campo: objetivo)' };
    }
  },

  // R04: Situacao atual ausente
  {
    id: 'R04', nome: 'Situacao atual ausente',
    peso: 5, severidade: 'ALERTA', obrigatoria: false, ativa: true,
    validar: function(p, ctx) {
      if (!ctx.vazio(p.situacaoAtual)) return null;
      return { tipo: 'ALERTA', codigo: 'R04',
        descricao: 'Situacao atual nao documentada',
        acao: 'Atualizar campo situacaoAtual descrevendo o estado presente do item' };
    }
  },

  // R05: Historico operacional ausente
  {
    id: 'R05', nome: 'Historico operacional ausente',
    peso: 5, severidade: 'ALERTA', obrigatoria: false, ativa: true,
    validar: function(p, ctx) {
      if (!ctx.vazio(p.historicoOperacional)) return null;
      return { tipo: 'ALERTA', codigo: 'R05',
        descricao: 'Historico operacional vazio ou ausente',
        acao: 'Registrar pelo menos um evento no historicoOperacional via COI-CURADOR' };
    }
  },

  // R06: Proximas acoes ausentes
  {
    id: 'R06', nome: 'Proximas acoes ausentes',
    peso: 5, severidade: 'ALERTA', obrigatoria: false, ativa: true,
    validar: function(p, ctx) {
      if (ctx.ehConcluido(p)) return null;
      if (!ctx.vazio(p.proximasAcoes)) return null;
      return { tipo: 'ALERTA', codigo: 'R06',
        descricao: 'Proximas acoes nao definidas para item em andamento',
        acao: 'Registrar proximasAcoes com responsavel e data prevista via COI-CURADOR' };
    }
  },

  // R07: Riscos nao registrados
  {
    id: 'R07', nome: 'Riscos nao registrados',
    peso: 5, severidade: 'ALERTA', obrigatoria: false, ativa: true,
    validar: function(p, ctx) {
      if (ctx.ehConcluido(p)) return null;
      var temRiscoCritico = p.riscosCriticos && Number(p.riscosCriticos) > 0;
      var altaPrioridade  = p.prioridade === 'P0' || p.prioridade === 'P1';
      if ((altaPrioridade || temRiscoCritico) && ctx.vazio(p.riscosRegistrados)) {
        return { tipo: 'ALERTA', codigo: 'R07',
          descricao: 'Riscos nao registrados para item de alta prioridade ou com risco critico declarado',
          acao: 'Documentar riscosRegistrados com probabilidade, impacto e mitigacao via COI-CURADOR' };
      }
      return null;
    }
  },

  // R08: Concluido sem data
  {
    id: 'R08', nome: 'Concluido sem data',
    peso: 12, severidade: 'ERRO', obrigatoria: true, ativa: true,
    validar: function(p, ctx) {
      if (!ctx.ehConcluido(p)) return null;
      var temData = !ctx.vazio(p.dataResolucao) || !ctx.vazio(p.prazoPrevisto) || !ctx.vazio(p.atualizadoEm);
      if (temData) return null;
      return { tipo: 'ERRO', codigo: 'R08',
        descricao: 'Item concluido sem data de conclusao registrada',
        acao: 'Registrar dataResolucao ou prazoPrevisto com a data real de conclusao via COI-CURADOR' };
    }
  },

  // R09: Percentual incompativel
  {
    id: 'R09', nome: 'Percentual incompativel',
    peso: 12, severidade: 'ERRO', obrigatoria: true, ativa: true,
    validar: function(p, ctx) {
      var pct = Number(p.percentual);
      if (ctx.ehConcluido(p) && pct !== 100) {
        return { tipo: 'ERRO', codigo: 'R09',
          descricao: 'Percentual ' + pct + '% incompativel com status Concluido (esperado: 100%)',
          acao: 'Corrigir percentual para 100 ou revisar status do item via COI-CURADOR' };
      }
      if (pct === 100 && !ctx.ehConcluido(p)) {
        return { tipo: 'ALERTA', codigo: 'R09',
          descricao: 'Percentual 100% com status "' + p.status + '" -- possivel inconsistencia',
          acao: 'Verificar se o item deve ser marcado como Concluido via COI-CURADOR' };
      }
      return null;
    }
  },

  // R10: Prazo vencido
  {
    id: 'R10', nome: 'Prazo vencido',
    peso: 12, severidade: 'ERRO', obrigatoria: true, ativa: true,
    validar: function(p, ctx) {
      if (ctx.ehConcluido(p)) return null;
      var prazo = ctx.parseData(p.prazoPrevisto);
      if (!prazo) return null;
      if (prazo < ctx.HOJE) {
        var dias = Math.floor((ctx.HOJE - prazo) / (1000 * 60 * 60 * 24));
        return { tipo: 'ERRO', codigo: 'R10',
          descricao: 'Prazo vencido ha ' + dias + ' dia(s) -- prazoPrevisto: ' + p.prazoPrevisto,
          acao: 'Atualizar prazoPrevisto ou documentar justificativa de atraso via COI-CURADOR' };
      }
      return null;
    }
  },

  // R11: Item sem atualizacao recente
  {
    id: 'R11', nome: 'Item sem atualizacao recente',
    peso: 5, severidade: 'ALERTA', obrigatoria: false, ativa: true,
    validar: function(p, ctx) {
      if (ctx.ehConcluido(p)) return null;
      if (ctx.vazio(p.atualizadoEm)) {
        return { tipo: 'ALERTA', codigo: 'R11',
          descricao: 'Campo atualizadoEm nao preenchido -- sem rastreabilidade temporal',
          acao: 'Registrar data da ultima atualizacao no campo atualizadoEm via COI-CURADOR' };
      }
      var dias = ctx.diasDesde(p.atualizadoEm);
      if (dias !== null && dias > 30) {
        return { tipo: 'ALERTA', codigo: 'R11',
          descricao: 'Item sem atualizacao ha ' + dias + ' dia(s) (ultima: ' + p.atualizadoEm + ')',
          acao: 'Coletar status atual com o responsavel e atualizar via COI-CURADOR' };
      }
      return null;
    }
  },

  // R12: Evidencia ausente
  {
    id: 'R12', nome: 'Evidencia ausente',
    peso: 12, severidade: 'ERRO', obrigatoria: true, ativa: true,
    validar: function(p, ctx) {
      var ehIncidente = p.tipoItem === 'Incidente';
      var ehP0 = p.prioridade === 'P0';
      var ehP1 = p.prioridade === 'P1';
      if ((ehIncidente || ehP0) && ctx.vazio(p.evidencia) && !ctx.ehConcluido(p)) {
        return { tipo: 'ERRO', codigo: 'R12',
          descricao: 'Evidencia obrigatoria ausente para ' + (ehIncidente ? 'Incidente' : 'item P0'),
          acao: 'Registrar evidencia (ticket, link, documento) no campo evidencia via COI-CURADOR' };
      }
      if (ehP1 && ctx.vazio(p.evidencia) && !ctx.ehConcluido(p)) {
        return { tipo: 'ALERTA', codigo: 'R12',
          descricao: 'Evidencia ausente para item P1 em andamento',
          acao: 'Registrar evidencia de acompanhamento no campo evidencia via COI-CURADOR' };
      }
      return null;
    }
  }

];

module.exports = { REGRAS_CURADOR: REGRAS_CURADOR };
