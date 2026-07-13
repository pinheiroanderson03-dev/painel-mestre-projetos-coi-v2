#!/usr/bin/env node
// =============================================================
// COI Intelligence Engine -- Motor: COI Curador Inteligente
// Arquivo: scripts/coi-curador-inteligente.js
// Fase: 6.2.1 -- Refinamento do COI Curador Inteligente
// =============================================================
//
// Responsabilidade do motor:
//   1. Carregar dados/projetos.js com mock de localStorage
//   2. Carregar regras de config/regras-curador.js
//   3. Executar regras ativas sobre cada item
//   4. Calcular score com pesos por regra
//   5. Gerar saida: texto (padrao) ou JSON (--json)
//
// Uso:
//   node scripts/coi-curador-inteligente.js
//   node scripts/coi-curador-inteligente.js --resumo
//   node scripts/coi-curador-inteligente.js --item COI-XXX
//   node scripts/coi-curador-inteligente.js --json
//
// Exit: 0 = portfolio aceitavel | 1 = itens criticos detectados
//
// Fonte exclusiva: dados/projetos.js (leitura; nao alterado)
// Regras: config/regras-curador.js
// =============================================================

'use strict';

var fs   = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');

// --- Carregar configuracao de regras ---
var cfg;
try {
  cfg = require(path.join(ROOT, 'config', 'regras-curador.js'));
} catch (e) {
  console.error('[ERRO FATAL] Falha ao carregar config/regras-curador.js: ' + e.message);
  process.exit(1);
}
var REGRAS_CURADOR = cfg.REGRAS_CURADOR;
var REGRAS_ATIVAS  = REGRAS_CURADOR.filter(function(r) { return r.ativa; });

// --- Flags de linha de comando ---
var args       = process.argv.slice(2);
var modoResumo = args.indexOf('--resumo') !== -1;
var modoJSON   = args.indexOf('--json') !== -1;
var modoItem   = '';
var idxItem    = args.indexOf('--item');
if (idxItem !== -1 && args[idxItem + 1]) {
  modoItem = args[idxItem + 1].toUpperCase();
}

// --- Carregar dados/projetos.js ---
var dataPath = path.join(ROOT, 'dados', 'projetos.js');

if (!fs.existsSync(dataPath)) {
  console.error('[ERRO FATAL] dados/projetos.js nao encontrado em: ' + dataPath);
  process.exit(1);
}

var COI_DATA;
try {
  var src = fs.readFileSync(dataPath, 'utf-8');
  // Mock de localStorage: dados/projetos.js usa localStorage no browser
  var mockLocalStorage = {
    getItem:    function() { return null; },
    setItem:    function() {},
    removeItem: function() {},
    clear:      function() {}
  };
  var loader = new Function('localStorage', src + '\n; return COI_DATA;');
  COI_DATA = loader(mockLocalStorage);
} catch (e) {
  console.error('[ERRO FATAL] Falha ao carregar dados/projetos.js: ' + e.message);
  process.exit(1);
}

if (!COI_DATA || !Array.isArray(COI_DATA.projetos)) {
  console.error('[ERRO FATAL] dados/projetos.js com estrutura invalida');
  process.exit(1);
}

var projetos = COI_DATA.projetos;

// Filtrar por item especifico se solicitado
if (modoItem) {
  projetos = projetos.filter(function(p) { return p.id && p.id.toUpperCase() === modoItem; });
  if (projetos.length === 0) {
    console.error('[AVISO] Item nao encontrado: ' + modoItem);
    process.exit(1);
  }
}

// --- Data de referencia ---
var HOJE = new Date();
HOJE.setHours(0, 0, 0, 0);

// --- Helpers (contexto passado para as regras) ---
function vazio(v) {
  if (v === null || v === undefined) return true;
  if (typeof v === 'string' && v.trim() === '') return true;
  if (Array.isArray(v) && v.length === 0) return true;
  return false;
}

function parseData(str) {
  if (!str || typeof str !== 'string') return null;
  var d;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str.trim())) {
    d = new Date(str.trim() + 'T00:00:00');
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(str.trim())) {
    var partes = str.trim().split('/');
    d = new Date(partes[2] + '-' + partes[1] + '-' + partes[0] + 'T00:00:00');
  } else {
    return null;
  }
  return isNaN(d.getTime()) ? null : d;
}

function diasDesde(str) {
  var d = parseData(str);
  if (!d) return null;
  return Math.floor((HOJE - d) / (1000 * 60 * 60 * 24));
}

function ehConcluido(p) {
  var s = (p.status || '').trim();
  return s === 'Concluido' || s === 'Concluida'
      || s === 'Concluido' || s === 'Concluida'
      || s === 'Concluido' || s === 'Concluida';
}

function linha(c, n) {
  var s = '';
  for (var i = 0; i < (n || 62); i++) s += c;
  return s;
}

// Contexto compartilhado com as regras
var ctx = { vazio: vazio, parseData: parseData, diasDesde: diasDesde, ehConcluido: ehConcluido, HOJE: HOJE };

// --- Score e classificacao ---
function calcularScore(violacoes) {
  var score = 100;
  for (var i = 0; i < violacoes.length; i++) {
    score -= violacoes[i]._peso || 0;
  }
  return Math.max(0, score);
}

function classificar(score) {
  if (score >= 95) return 'Excelente';
  if (score >= 80) return 'Bom';
  if (score >= 60) return 'Atencao';
  return 'Critico';
}

function criticidade(erros, alertas) {
  if (erros >= 3) return 'CRITICA';
  if (erros >= 1) return 'ALTA';
  if (alertas >= 3) return 'MEDIA';
  if (alertas >= 1) return 'BAIXA';
  return 'NENHUMA';
}

// --- Diagnostico por item ---
function diagnosticar(p) {
  var violacoes = [];
  for (var i = 0; i < REGRAS_ATIVAS.length; i++) {
    var regra = REGRAS_ATIVAS[i];
    var v = regra.validar(p, ctx);
    if (v) {
      v._peso = regra.peso;
      violacoes.push(v);
    }
  }
  var erros = 0, alertas = 0;
  for (var j = 0; j < violacoes.length; j++) {
    if (violacoes[j].tipo === 'ERRO') erros++;
    else alertas++;
  }
  var score = calcularScore(violacoes);
  var nivel = classificar(score);
  var crit  = criticidade(erros, alertas);
  var situacao;
  if (erros === 0 && alertas === 0) {
    situacao = 'Dados completos. Nenhuma acao necessaria.';
  } else if (erros === 0) {
    situacao = alertas + ' alerta(s) de completude. Dados aceitaveis mas melhoraveis.';
  } else {
    situacao = erros + ' erro(s) critico(s) e ' + alertas + ' alerta(s). Intervencao necessaria.';
  }
  return { p: p, violacoes: violacoes, erros: erros, alertas: alertas,
           score: score, nivel: nivel, crit: crit, situacao: situacao };
}

// --- Impressao de diagnostico individual (texto) ---
function imprimirDiag(diag) {
  var p    = diag.p;
  var tipo = p.tipoItem || 'Projeto';
  console.log('\n' + linha('-'));
  console.log('[' + p.id + '] ' + p.nome);
  console.log('Tipo: ' + tipo + ' | Prioridade: ' + (p.prioridade||'--') + ' | Status: ' + (p.status||'--') + ' | Semaforo: ' + (p.semaforo||'--'));
  console.log(linha('-'));
  console.log('Score de Qualidade   : ' + diag.score + '/100  [' + diag.nivel + ']');
  console.log('Erros                : ' + diag.erros);
  console.log('Alertas              : ' + diag.alertas);
  console.log('Nivel de Criticidade : ' + diag.crit);
  console.log('Situacao Geral       : ' + diag.situacao);
  if (diag.violacoes.length > 0) {
    console.log('\nRecomendacoes automaticas:');
    for (var i = 0; i < diag.violacoes.length; i++) {
      var viol = diag.violacoes[i];
      var pfx  = viol.tipo === 'ERRO' ? '[ERRO  ]' : '[ALERTA]';
      console.log('  ' + (i + 1) + '. ' + pfx + ' [' + viol.codigo + '] ' + viol.descricao + ' (peso: -' + viol._peso + ')');
      console.log('         Acao: ' + viol.acao);
    }
  }
}

// --- Consolidado do portfolio (texto) ---
function imprimirConsolidado(diagnosticos) {
  var total = diagnosticos.length;
  var somaScore = 0;
  var excelentes = 0, bons = 0, atencao = 0, criticos = 0;
  var totalErros = 0, totalAlertas = 0;
  for (var i = 0; i < diagnosticos.length; i++) {
    var d = diagnosticos[i];
    somaScore += d.score;
    if (d.nivel === 'Excelente') excelentes++;
    else if (d.nivel === 'Bom')  bons++;
    else if (d.nivel === 'Atencao') atencao++;
    else criticos++;
    totalErros   += d.erros;
    totalAlertas += d.alertas;
  }
  var media = Math.round(somaScore / total);
  var versaoDados = COI_DATA.meta && COI_DATA.meta.versao ? COI_DATA.meta.versao : '--';
  console.log('\n' + linha('='));
  console.log('COI INTELLIGENCE ENGINE -- CURADOR INTELIGENTE');
  console.log('Relatorio Consolidado de Qualidade do Portfolio');
  console.log('Data: ' + HOJE.toLocaleDateString('pt-BR') + ' | Versao dados: ' + versaoDados);
  console.log('Fonte: dados/projetos.js | Regras ativas: ' + REGRAS_ATIVAS.length + ' | Total de itens: ' + total);
  console.log(linha('='));
  console.log('\nSCORE DO PORTFOLIO');
  console.log('  Score medio   : ' + media + '/100');
  console.log('  Classificacao : ' + classificar(media));
  console.log('\nDISTRIBUICaO POR NIVEL');
  console.log('  Excelente (95-100) : ' + excelentes + ' item(s)');
  console.log('  Bom       (80-94)  : ' + bons       + ' item(s)');
  console.log('  Atencao   (60-79)  : ' + atencao    + ' item(s)');
  console.log('  Critico   (0-59)   : ' + criticos   + ' item(s)');
  console.log('\nVIOLACOES ENCONTRADAS');
  console.log('  Total de erros      : ' + totalErros);
  console.log('  Total de alertas    : ' + totalAlertas);
  var semViolacao = diagnosticos.filter(function(d) { return d.violacoes.length === 0; }).length;
  console.log('  Itens sem violacoes : ' + semViolacao);
  var comErro = diagnosticos.filter(function(d) { return d.erros > 0; });
  if (comErro.length > 0) {
    comErro.sort(function(a, b) { return a.score - b.score; });
    console.log('\nITENS COM ERROS CRITICOS (' + comErro.length + '):');
    for (var k = 0; k < comErro.length; k++) {
      var de = comErro[k];
      console.log('  [' + de.p.id + '] ' + de.p.nome);
      console.log('       Score: ' + de.score + '/100 | Erros: ' + de.erros + ' | Alertas: ' + de.alertas + ' | Criticidade: ' + de.crit);
    }
  }
  console.log('');
  return { media: media, totalErros: totalErros, criticos: criticos };
}

// --- Saida JSON ---
function gerarJSON(diagnosticos) {
  var total = diagnosticos.length;
  var somaScore = 0, excelentes = 0, bons = 0, atencao = 0, criticos = 0;
  var totalErros = 0, totalAlertas = 0;
  var todosErros = [], todosAlertas = [], todasRecomendacoes = [];
  var itens = [];

  for (var i = 0; i < diagnosticos.length; i++) {
    var d = diagnosticos[i];
    somaScore += d.score;
    if (d.nivel === 'Excelente') excelentes++;
    else if (d.nivel === 'Bom')  bons++;
    else if (d.nivel === 'Atencao') atencao++;
    else criticos++;
    totalErros   += d.erros;
    totalAlertas += d.alertas;

    var violacoesLimpas = d.violacoes.map(function(v) {
      return { tipo: v.tipo, codigo: v.codigo, peso: v._peso, descricao: v.descricao, acao: v.acao };
    });

    itens.push({
      id: d.p.id, nome: d.p.nome,
      tipoItem: d.p.tipoItem || 'Projeto',
      prioridade: d.p.prioridade || null,
      status: d.p.status || null,
      semaforo: d.p.semaforo || null,
      score: d.score, nivel: d.nivel,
      criticidade: d.crit,
      erros: d.erros, alertas: d.alertas,
      situacao: d.situacao,
      violacoes: violacoesLimpas
    });

    for (var j = 0; j < d.violacoes.length; j++) {
      var viol = d.violacoes[j];
      var entry = { item: d.p.id, nome: d.p.nome, codigo: viol.codigo, descricao: viol.descricao, peso: viol._peso };
      if (viol.tipo === 'ERRO') todosErros.push(entry);
      else todosAlertas.push(entry);
      todasRecomendacoes.push({ item: d.p.id, nome: d.p.nome, codigo: viol.codigo,
        prioridade: viol.tipo === 'ERRO' ? 'ALTA' : 'MEDIA', acao: viol.acao });
    }
  }

  var media = Math.round(somaScore / total);
  var versaoDados = COI_DATA.meta && COI_DATA.meta.versao ? COI_DATA.meta.versao : null;

  return {
    resumo: {
      data: HOJE.toISOString().substring(0, 10),
      versaoDados: versaoDados,
      totalItens: total,
      regrasAtivas: REGRAS_ATIVAS.length,
      scoreMedia: media,
      classificacao: classificar(media)
    },
    indicadores: {
      excelentes: excelentes,
      bons: bons,
      atencao: atencao,
      criticos: criticos,
      totalErros: totalErros,
      totalAlertas: totalAlertas,
      itensSemViolacoes: diagnosticos.filter(function(d) { return d.violacoes.length === 0; }).length
    },
    itens: itens,
    erros: todosErros,
    alertas: todosAlertas,
    recomendacoes: todasRecomendacoes
  };
}

// --- Execucao principal ---
if (!modoJSON) {
  console.log('\n' + linha('='));
  console.log('COI CURADOR INTELIGENTE -- Iniciando analise de qualidade...');
  console.log('Itens carregados: ' + projetos.length + ' | Regras ativas: ' + REGRAS_ATIVAS.length);
  console.log('Modo: ' + (modoItem || (modoResumo ? 'resumo' : 'completo')));
}

var diagnosticos = projetos.map(diagnosticar);

if (modoJSON) {
  var saida = gerarJSON(diagnosticos);
  console.log(JSON.stringify(saida, null, 2));
  var exitJSON = (saida.indicadores.criticos > 0 || saida.indicadores.totalErros > 5) ? 1 : 0;
  process.exit(exitJSON);
}

if (!modoResumo) {
  for (var idx = 0; idx < diagnosticos.length; idx++) {
    imprimirDiag(diagnosticos[idx]);
  }
}

var resultado = imprimirConsolidado(diagnosticos);

if (resultado.criticos > 0 || resultado.totalErros > 5) {
  console.log('RESULTADO: Portfolio com itens criticos. Intervencao recomendada.\n');
  process.exit(1);
} else {
  console.log('RESULTADO: Portfolio em estado aceitavel. Verifique alertas pendentes.\n');
  process.exit(0);
}
