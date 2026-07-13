#!/usr/bin/env node
// =============================================================
// COI Intelligence Engine -- Modulo: COI Auditor Inteligente
// Arquivo: scripts/coi-auditor-inteligente.js
// Fase: 6.3 -- Auditoria Operacional Automatica
// =============================================================
//
// Interface padrao do COI Intelligence Engine:
//   MODULO.execute()         -- executa auditoria; retorna dados internos
//   MODULO.score()           -- retorna score de saude do ambiente
//   MODULO.recommendations() -- retorna lista de recomendacoes consolidadas
//   MODULO.export(formato)   -- 'texto' | 'json' | 'md'
//
// Uso:
//   node scripts/coi-auditor-inteligente.js           (texto)
//   node scripts/coi-auditor-inteligente.js --resumo  (resumo executivo)
//   node scripts/coi-auditor-inteligente.js --json    (JSON estruturado)
//   node scripts/coi-auditor-inteligente.js --md      (Markdown executivo)
//
// Fonte de dados: saida JSON de scripts/coi-curador-inteligente.js
// Nao altera dados/projetos.js nem outros arquivos.
// Exit: 0 = Baixa/Media | 1 = Alta/Critica
// =============================================================

'use strict';

var cp   = require('child_process');
var path = require('path');

var ROOT = path.join(__dirname, '..');

// --- Carregar dados do COI Curador ---
function carregarDadosCurador() {
  var result = cp.spawnSync(
    process.execPath,
    [path.join(ROOT, 'scripts', 'coi-curador-inteligente.js'), '--json'],
    { encoding: 'utf8', cwd: ROOT }
  );
  if (!result.stdout || result.stdout.trim() === '') {
    throw new Error('COI Curador nao produziu saida JSON. Verifique config/regras-curador.js e dados/projetos.js');
  }
  try {
    return JSON.parse(result.stdout);
  } catch (e) {
    throw new Error('Falha ao parsear JSON do COI Curador: ' + e.message);
  }
}

// --- Data de referencia ---
var HOJE = new Date();
HOJE.setHours(0, 0, 0, 0);

// --- Funcoes de analise ---

function calcularSaudeGeral(scoreMedia) {
  if (scoreMedia >= 90) return 'Excelente';
  if (scoreMedia >= 70) return 'Boa';
  if (scoreMedia >= 50) return 'Atencao';
  return 'Critica';
}

function calcularCriticidade(totalErros, itensCriticos) {
  if (itensCriticos > 5 || totalErros > 10) return 'Critica';
  if (itensCriticos > 2 || totalErros > 5)  return 'Alta';
  if (itensCriticos > 0 || totalErros > 0)  return 'Media';
  return 'Baixa';
}

function consolidarIndicadores(dados) {
  var ind   = dados.indicadores;
  var itens = dados.itens || [];
  var total = dados.resumo.totalItens || itens.length || 1;

  // Contar violacoes por regra
  var violacoesPorRegra = {};
  itens.forEach(function(item) {
    (item.violacoes || []).forEach(function(v) {
      violacoesPorRegra[v.codigo] = (violacoesPorRegra[v.codigo] || 0) + 1;
    });
  });

  return {
    itensExcelentes:        ind.excelentes,
    itensBons:              ind.bons,
    itensAtencao:           ind.atencao,
    itensCriticos:          ind.criticos,
    totalErros:             ind.totalErros,
    totalAlertas:           ind.totalAlertas,
    totalRecomendacoes:     dados.recomendacoes ? dados.recomendacoes.length : 0,
    itensSemViolacoes:      ind.itensSemViolacoes,
    taxaConformidade:       Math.round(((ind.excelentes + ind.bons) / total) * 100),
    taxaRisco:              Math.round((ind.criticos / total) * 100),
    taxaAlerta:             Math.round((ind.atencao / total) * 100),
    violacoesPorRegra:      violacoesPorRegra,
    itensSemResponsavel:    violacoesPorRegra['R01'] || 0,
    itensSemOrgao:          violacoesPorRegra['R02'] || 0,
    itensSemObjetivo:       violacoesPorRegra['R03'] || 0,
    itensPrazoVencido:      violacoesPorRegra['R10'] || 0,
    itensSemAtualizacao:    violacoesPorRegra['R11'] || 0,
    itensSemEvidencia:      violacoesPorRegra['R12'] || 0
  };
}

function gerarAuditoria(dados, indicadores) {
  var total = dados.resumo.totalItens || 1;
  var score = dados.resumo.scoreMedia || 0;

  var pctConf = indicadores.taxaConformidade;
  var conformidade = {
    percentual: pctConf,
    status: pctConf >= 70 ? 'Conforme' : pctConf >= 40 ? 'Parcialmente conforme' : 'Nao conforme',
    descricao: pctConf + '% dos itens em nivel Excelente ou Bom (' + (indicadores.itensExcelentes + indicadores.itensBons) + ' de ' + total + ')'
  };

  var nSemObrig = indicadores.itensSemResponsavel + indicadores.itensSemObjetivo;
  var pctCompl  = Math.round(((total - nSemObrig) / total) * 100);
  var completude = {
    percentual: pctCompl,
    itensSemCamposObrigatorios: nSemObrig,
    status: pctCompl >= 90 ? 'Completo' : pctCompl >= 70 ? 'Parcialmente completo' : 'Incompleto',
    descricao: nSemObrig + ' item(s) sem campos obrigatorios criticos (responsavel ou objetivo)'
  };

  var nPrazo = indicadores.itensPrazoVencido;
  var pontualidade = {
    itensPrazoVencido: nPrazo,
    status: nPrazo === 0 ? 'Em dia' : nPrazo <= 2 ? 'Atencao' : 'Atrasado',
    descricao: nPrazo + ' item(s) com prazo vencido e ainda Em andamento'
  };

  var nSemAtu = indicadores.itensSemAtualizacao;
  var rastreabilidade = {
    itensSemAtualizacao: nSemAtu,
    status: nSemAtu === 0 ? 'Rastreavel' : nSemAtu <= 3 ? 'Atencao' : 'Sem rastreabilidade',
    descricao: nSemAtu + ' item(s) sem atualizacao recente (>30 dias ou campo ausente)'
  };

  var nSemResp = indicadores.itensSemResponsavel;
  var governanca = {
    itensSemResponsavel: nSemResp,
    status: nSemResp === 0 ? 'Governado' : nSemResp <= 2 ? 'Atencao' : 'Sem governanca',
    descricao: nSemResp + ' item(s) sem responsavel definido'
  };

  return {
    scoreGeral:       score,
    conformidade:     conformidade,
    completude:       completude,
    pontualidade:     pontualidade,
    rastreabilidade:  rastreabilidade,
    governanca:       governanca
  };
}

function identificarTendencias(dados, indicadores) {
  var itens = dados.itens || [];
  var total = dados.resumo.totalItens || 1;

  // Regra mais violada
  var vpr      = indicadores.violacoesPorRegra || {};
  var regraMax = null, maxV = 0;
  Object.keys(vpr).forEach(function(r) {
    if (vpr[r] > maxV) { maxV = vpr[r]; regraMax = r; }
  });

  // Quick wins: itens com 1 violacao
  var quickWins = itens
    .filter(function(i) { return i.violacoes && i.violacoes.length === 1; })
    .map(function(i) { return i.id; });

  // Top 3 mais criticos
  var top3 = itens
    .filter(function(i) { return i.nivel === 'Critico'; })
    .sort(function(a, b) { return a.score - b.score; })
    .slice(0, 3)
    .map(function(i) { return i.id + ' (' + i.nome + ')'; });

  var saudeGeral  = calcularSaudeGeral(dados.resumo.scoreMedia);
  var criticidade = calcularCriticidade(indicadores.totalErros, indicadores.itensCriticos);

  return {
    saudeGeral:          saudeGeral,
    criticidade:         criticidade,
    regraMoreViolada:    regraMax ? { codigo: regraMax, ocorrencias: maxV } : null,
    itensCriticosTop3:   top3,
    quickWins:           quickWins,
    alertaConformidade:  indicadores.taxaConformidade < 30,
    alertaPrazo:         indicadores.itensPrazoVencido > 0,
    alertaCompletude:    (indicadores.itensSemResponsavel + indicadores.itensSemObjetivo) > Math.floor(total * 0.3),
    tendenciaGeral:      criticidade === 'Critica' || criticidade === 'Alta' ? 'Negativa' :
                         criticidade === 'Media' ? 'Neutra' : 'Positiva'
  };
}

function gerarRecomendacoesConsolidadas(indicadores, tendencias) {
  var recs = [];

  if (indicadores.itensSemResponsavel > 0) {
    recs.push({
      prioridade: 'P0', tipo: 'GOVERNANCA',
      titulo: 'Definir responsaveis para itens sem governanca',
      descricao: indicadores.itensSemResponsavel + ' item(s) sem responsavel definido (R01). Risco critico de perda de rastreabilidade.',
      acao: 'Identificar e registrar responsaveis via COI-CURADOR para todos os itens afetados.',
      impacto: '+' + (indicadores.itensSemResponsavel * 12) + ' pts no score'
    });
  }

  if (indicadores.itensPrazoVencido > 0) {
    recs.push({
      prioridade: 'P0', tipo: 'PONTUALIDADE',
      titulo: 'Tratar prazos vencidos urgentemente',
      descricao: indicadores.itensPrazoVencido + ' item(s) com prazo vencido e Em andamento (R10).',
      acao: 'Atualizar prazoPrevisto com nova data justificada ou documentar escalonamento via COI-CURADOR.',
      impacto: '+' + (indicadores.itensPrazoVencido * 12) + ' pts no score'
    });
  }

  if (indicadores.itensSemObjetivo > 0) {
    recs.push({
      prioridade: 'P1', tipo: 'COMPLETUDE',
      titulo: 'Documentar objetivos dos itens incompletos',
      descricao: indicadores.itensSemObjetivo + ' item(s) sem objetivo documentado (R03).',
      acao: 'Registrar objetivo mensuravel para cada item afetado via COI-CURADOR.',
      impacto: '+' + (indicadores.itensSemObjetivo * 12) + ' pts no score'
    });
  }

  if (indicadores.itensSemAtualizacao > 0) {
    recs.push({
      prioridade: 'P1', tipo: 'RASTREABILIDADE',
      titulo: 'Atualizar itens parados sem rastreabilidade',
      descricao: indicadores.itensSemAtualizacao + ' item(s) sem atualizacao nos ultimos 30 dias (R11).',
      acao: 'Coletar status atual com responsaveis e registrar atualizadoEm e situacaoAtual via COI-CURADOR.',
      impacto: '+' + (indicadores.itensSemAtualizacao * 5) + ' pts no score'
    });
  }

  if (tendencias.quickWins && tendencias.quickWins.length > 0) {
    recs.push({
      prioridade: 'P2', tipo: 'QUICK_WIN',
      titulo: 'Quick wins: corrigir itens com 1 violacao',
      descricao: tendencias.quickWins.length + ' item(s) com apenas 1 violacao: ' + tendencias.quickWins.join(', ') + '.',
      acao: 'Priorizar correcao no proximo ciclo do COI-CURADOR. Ganho imediato com minimo esforco.',
      impacto: 'Reducao direta de alertas e erros no proximo ciclo'
    });
  }

  return recs;
}

// --- Formatadores ---
function lin(c, n) { var s = ''; for (var i = 0; i < (n || 62); i++) s += c; return s; }

function gerarTexto(r) {
  var L = [];
  L.push('\n' + lin('='));
  L.push('COI INTELLIGENCE ENGINE -- AUDITOR INTELIGENTE');
  L.push('Auditoria Operacional Automatica | Fase 6.3');
  L.push('Data: ' + r.resumo.data + ' | Versao dados: ' + r.resumo.versaoDados + ' | Itens: ' + r.resumo.totalItens);
  L.push(lin('='));
  L.push('');
  L.push('SAUDE GERAL : ' + r.resumo.saudeGeral);
  L.push('CRITICIDADE : ' + r.resumo.criticidade);
  L.push('Score medio : ' + r.resumo.scoreMedia + '/100');
  L.push('');
  L.push(lin('-'));
  L.push('INDICADORES');
  L.push(lin('-'));
  var ind = r.indicadores;
  L.push('  Conformidade        : ' + ind.taxaConformidade + '% (' + (ind.itensExcelentes + ind.itensBons) + ' itens Excelente/Bom)');
  L.push('  Taxa de risco       : ' + ind.taxaRisco + '% (' + ind.itensCriticos + ' criticos)');
  L.push('  Total erros         : ' + ind.totalErros);
  L.push('  Total alertas       : ' + ind.totalAlertas);
  L.push('  Sem responsavel     : ' + ind.itensSemResponsavel);
  L.push('  Sem objetivo        : ' + ind.itensSemObjetivo);
  L.push('  Prazo vencido       : ' + ind.itensPrazoVencido);
  L.push('  Sem atualizacao     : ' + ind.itensSemAtualizacao);
  L.push('  Sem violacoes       : ' + ind.itensSemViolacoes);
  L.push('');
  L.push(lin('-'));
  L.push('AUDITORIA POR DIMENSAO');
  L.push(lin('-'));
  var aud = r.auditoria;
  L.push('  Conformidade    : ' + aud.conformidade.status + ' (' + aud.conformidade.percentual + '%) -- ' + aud.conformidade.descricao);
  L.push('  Completude      : ' + aud.completude.status + ' -- ' + aud.completude.descricao);
  L.push('  Pontualidade    : ' + aud.pontualidade.status + ' -- ' + aud.pontualidade.descricao);
  L.push('  Rastreabilidade : ' + aud.rastreabilidade.status + ' -- ' + aud.rastreabilidade.descricao);
  L.push('  Governanca      : ' + aud.governanca.status + ' -- ' + aud.governanca.descricao);
  L.push('');
  L.push(lin('-'));
  L.push('TENDENCIAS');
  L.push(lin('-'));
  var t = r.tendencias;
  L.push('  Tendencia geral    : ' + t.tendenciaGeral);
  if (t.regraMoreViolada)       L.push('  Regra mais violada : ' + t.regraMoreViolada.codigo + ' (' + t.regraMoreViolada.ocorrencias + ' ocorrencias)');
  if (t.itensCriticosTop3.length > 0) L.push('  Top 3 criticos     : ' + t.itensCriticosTop3.join(' | '));
  if (t.quickWins.length > 0)   L.push('  Quick wins         : ' + t.quickWins.join(', '));
  L.push('  Alertas ativos     : Conformidade=' + (t.alertaConformidade?'SIM':'Nao') + ' Prazo=' + (t.alertaPrazo?'SIM':'Nao') + ' Completude=' + (t.alertaCompletude?'SIM':'Nao'));
  L.push('');
  L.push(lin('-'));
  L.push('RECOMENDACOES CONSOLIDADAS (' + r.recomendacoes.length + ')');
  L.push(lin('-'));
  r.recomendacoes.forEach(function(rec, i) {
    L.push('  ' + (i + 1) + '. [' + rec.prioridade + '] [' + rec.tipo + '] ' + rec.titulo);
    L.push('     ' + rec.descricao);
    L.push('     Acao   : ' + rec.acao);
    L.push('     Impacto: ' + rec.impacto);
    L.push('');
  });
  L.push(lin('='));
  return L.join('\n');
}

function gerarMarkdown(r) {
  var L = [];
  L.push('# COI INTELLIGENCE ENGINE -- AUDITORIA EXECUTIVA');
  L.push('');
  L.push('**Modulo:** COI Auditor Inteligente (Fase 6.3)  ');
  L.push('**Data:** ' + r.resumo.data + '  ');
  L.push('**Versao dos dados:** ' + r.resumo.versaoDados + '  ');
  L.push('**Total de itens auditados:** ' + r.resumo.totalItens);
  L.push('');
  L.push('---');
  L.push('');
  L.push('## Resumo Executivo');
  L.push('');
  L.push('| Campo | Valor |');
  L.push('|---|---|');
  L.push('| Saude Geral do Ambiente | **' + r.resumo.saudeGeral + '** |');
  L.push('| Criticidade | **' + r.resumo.criticidade + '** |');
  L.push('| Score medio do portfolio | ' + r.resumo.scoreMedia + '/100 |');
  L.push('| Taxa de conformidade | ' + r.indicadores.taxaConformidade + '% |');
  L.push('| Taxa de risco | ' + r.indicadores.taxaRisco + '% |');
  L.push('| Tendencia geral | ' + r.tendencias.tendenciaGeral + ' |');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## Indicadores de Saude');
  L.push('');
  L.push('| Indicador | Valor |');
  L.push('|---|---|');
  var ind = r.indicadores;
  L.push('| Excelente (95-100) | ' + ind.itensExcelentes + ' itens |');
  L.push('| Bom (80-94) | ' + ind.itensBons + ' itens |');
  L.push('| Atencao (60-79) | ' + ind.itensAtencao + ' itens |');
  L.push('| Critico (0-59) | ' + ind.itensCriticos + ' itens |');
  L.push('| Total de erros | ' + ind.totalErros + ' |');
  L.push('| Total de alertas | ' + ind.totalAlertas + ' |');
  L.push('| Itens sem violacoes | ' + ind.itensSemViolacoes + ' |');
  L.push('| Prazos vencidos | ' + ind.itensPrazoVencido + ' |');
  L.push('| Sem atualizacao recente | ' + ind.itensSemAtualizacao + ' |');
  L.push('| Sem responsavel (R01) | ' + ind.itensSemResponsavel + ' |');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## Auditoria por Dimensao');
  L.push('');
  var aud = r.auditoria;
  L.push('### Conformidade');
  L.push('');
  L.push('**Status:** ' + aud.conformidade.status + ' | **Percentual:** ' + aud.conformidade.percentual + '%');
  L.push('');
  L.push(aud.conformidade.descricao);
  L.push('');
  L.push('### Completude');
  L.push('');
  L.push('**Status:** ' + aud.completude.status);
  L.push('');
  L.push(aud.completude.descricao);
  L.push('');
  L.push('### Pontualidade');
  L.push('');
  L.push('**Status:** ' + aud.pontualidade.status + ' | ' + aud.pontualidade.descricao);
  L.push('');
  L.push('### Rastreabilidade');
  L.push('');
  L.push('**Status:** ' + aud.rastreabilidade.status + ' | ' + aud.rastreabilidade.descricao);
  L.push('');
  L.push('### Governanca');
  L.push('');
  L.push('**Status:** ' + aud.governanca.status + ' | ' + aud.governanca.descricao);
  L.push('');
  L.push('---');
  L.push('');
  L.push('## Tendencias Identificadas');
  L.push('');
  var t = r.tendencias;
  L.push('- **Tendencia geral:** ' + t.tendenciaGeral);
  if (t.regraMoreViolada)             L.push('- **Regra mais violada:** ' + t.regraMoreViolada.codigo + ' com ' + t.regraMoreViolada.ocorrencias + ' ocorrencias');
  if (t.itensCriticosTop3.length > 0) L.push('- **Top 3 criticos:** ' + t.itensCriticosTop3.join(', '));
  if (t.quickWins.length > 0)         L.push('- **Quick wins (1 violacao):** ' + t.quickWins.join(', '));
  L.push('- **Alerta conformidade:** ' + (t.alertaConformidade ? 'Sim' : 'Nao'));
  L.push('- **Alerta prazo:** ' + (t.alertaPrazo ? 'Sim' : 'Nao'));
  L.push('- **Alerta completude:** ' + (t.alertaCompletude ? 'Sim' : 'Nao'));
  L.push('');
  L.push('---');
  L.push('');
  L.push('## Recomendacoes Consolidadas');
  L.push('');
  r.recomendacoes.forEach(function(rec, i) {
    L.push('### ' + (i + 1) + '. [' + rec.prioridade + '] ' + rec.titulo);
    L.push('');
    L.push('**Tipo:** ' + rec.tipo + '  ');
    L.push('**Prioridade:** ' + rec.prioridade);
    L.push('');
    L.push(rec.descricao);
    L.push('');
    L.push('**Acao:** ' + rec.acao);
    L.push('');
    L.push('**Impacto estimado:** ' + rec.impacto);
    L.push('');
  });
  L.push('---');
  L.push('');
  L.push('*Gerado automaticamente pelo COI Auditor Inteligente -- COI Intelligence Engine -- Fase 6.3*');
  L.push('*Fonte: node scripts/coi-curador-inteligente.js --json*');
  return L.join('\n');
}

// --- Interface padrao COI Intelligence Engine ---
var MODULO = {
  _dadosCurador: null,
  _resultado:    null,

  execute: function() {
    var dados       = carregarDadosCurador();
    var indicadores = consolidarIndicadores(dados);
    var auditoria   = gerarAuditoria(dados, indicadores);
    var tendencias  = identificarTendencias(dados, indicadores);
    var recomendacoes = gerarRecomendacoesConsolidadas(indicadores, tendencias);
    var saudeGeral  = calcularSaudeGeral(dados.resumo.scoreMedia);
    var criticidade = calcularCriticidade(indicadores.totalErros, indicadores.itensCriticos);

    this._dadosCurador = dados;
    this._resultado = {
      schema:  '1.0',
      engine:  'COI Auditor Inteligente',
      modulo:  'Fase 6.3',
      resumo: {
        data:         HOJE.toISOString().substring(0, 10),
        versaoDados:  dados.resumo.versaoDados,
        totalItens:   dados.resumo.totalItens,
        regrasAtivas: dados.resumo.regrasAtivas,
        scoreMedia:   dados.resumo.scoreMedia,
        saudeGeral:   saudeGeral,
        criticidade:  criticidade
      },
      indicadores:  indicadores,
      auditoria:    auditoria,
      tendencias:   tendencias,
      recomendacoes: recomendacoes
    };
    return this._resultado;
  },

  score: function() {
    if (!this._resultado) this.execute();
    return this._resultado.resumo.scoreMedia;
  },

  recommendations: function() {
    if (!this._resultado) this.execute();
    return this._resultado.recomendacoes;
  },

  export: function(formato) {
    if (!this._resultado) this.execute();
    var r = this._resultado;
    if (formato === 'json') return JSON.stringify(r, null, 2);
    if (formato === 'md')   return gerarMarkdown(r);
    return gerarTexto(r);
  }
};

module.exports = MODULO;

// --- CLI entrypoint ---
if (require.main === module) {
  var args       = process.argv.slice(2);
  var modoResumo = args.indexOf('--resumo') !== -1;
  var modoJSON   = args.indexOf('--json')   !== -1;
  var modoMD     = args.indexOf('--md')     !== -1;

  try {
    MODULO.execute();
  } catch (e) {
    console.error('[ERRO FATAL] ' + e.message);
    process.exit(1);
  }

  if (modoJSON) {
    console.log(MODULO.export('json'));
  } else if (modoMD) {
    console.log(MODULO.export('md'));
  } else if (modoResumo) {
    var res = MODULO._resultado;
    console.log('\nCOI AUDITOR INTELIGENTE -- Resumo Executivo');
    console.log('Saude Geral   : ' + res.resumo.saudeGeral);
    console.log('Criticidade   : ' + res.resumo.criticidade);
    console.log('Score medio   : ' + res.resumo.scoreMedia + '/100');
    console.log('Conformidade  : ' + res.indicadores.taxaConformidade + '%');
    console.log('Tendencia     : ' + res.tendencias.tendenciaGeral);
    console.log('Recomendacoes : ' + res.recomendacoes.length);
  } else {
    console.log(MODULO.export('texto'));
  }

  var crit = MODULO._resultado.resumo.criticidade;
  process.exit(crit === 'Alta' || crit === 'Critica' ? 1 : 0);
}
