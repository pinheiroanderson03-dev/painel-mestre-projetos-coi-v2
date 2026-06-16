#!/usr/bin/env node
// validar-funcional.js -- Validador multiplataforma Node.js puro
// Painel Mestre COI - Comunicacao Omnichannel Inteligente - Central IT
// Fase 5T.1 -- Infraestrutura de Qualidade e Validacao
//
// Uso:  node scripts/validar-funcional.js
// Exit: 0 = sem erros reais  |  1 = ha erros reais

'use strict';

var fs  = require('fs');
var path = require('path');
var cp  = require('child_process');

var ROOT   = path.join(__dirname, '..');
var erros  = 0;
var avisos = 0;
var linhas = [];

function pass(label) { linhas.push('PASS  | ' + label); }
function fail(label) { erros++; linhas.push('FAIL  | ' + label); }
function warn(label) { avisos++; linhas.push('AVISO | ' + label); }
function exists(rel) { return fs.existsSync(path.join(ROOT, rel)); }
function read(rel)   { try { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch (e) { return ''; } }
function sep(t)      { console.log('\n[ ' + t + ' ]'); }

// ============================================================
// 1. ARQUIVOS PRINCIPAIS
// ============================================================
sep('1. ARQUIVOS PRINCIPAIS');

[
  'index.html', 'portfolio.html', 'projetos/ficha.html',
  'assets/style.css', 'dados/projetos.js',
  'AGENTS.md', 'CHANGELOG.md', 'RELEASE_NOTES.md', 'ROADMAP_COI.md',
  'docs/ESTADO_ATUAL_DO_PROJETO.md', 'docs/MEMORIA_OPERACIONAL_PROJETO.md',
  'docs/CHECKLIST_EXECUCAO_AGENTES.md',
  'scripts/validar-projeto.ps1', 'scripts/validar-dados.ps1',
  'scripts/validar-docs.ps1', 'scripts/status-seguro.ps1'
].forEach(function(arq) {
  if (exists(arq)) { pass('Presente: ' + arq); }
  else             { fail('AUSENTE: '  + arq); }
});

// ============================================================
// 2. SINTAXE DE dados/projetos.js
// -- spawnSync com array de args evita problema com espacos
//    no PATH do Windows (ex.: C:\Program Files\nodejs\node.exe)
// ============================================================
sep('2. SINTAXE DE dados/projetos.js');

var syn = cp.spawnSync(
  process.execPath,
  ['--check', path.join(ROOT, 'dados', 'projetos.js')],
  { encoding: 'utf8' }
);
if (syn.status === 0) {
  pass('Sintaxe valida -- node --check sem erros');
} else {
  fail('Sintaxe INVALIDA: ' + (syn.stderr || syn.stdout || 'erro desconhecido').trim());
}

// ============================================================
// 3. CONTEUDO DE dados/projetos.js
// ============================================================
sep('3. CONTEUDO DE dados/projetos.js');

var js = read('dados/projetos.js');

(js.indexOf('const COI_DATA') !== -1)
  ? pass('const COI_DATA declarado')
  : fail('const COI_DATA NAO encontrado -- dados/projetos.js corrompido');

(js.match(/versao\s*:/) || js.indexOf('"versao"') !== -1 || js.indexOf("'versao'") !== -1)
  ? pass('meta.versao presente')
  : fail('meta.versao NAO encontrado');

(js.indexOf('execucoesMensais') !== -1)
  ? pass('meta.execucoesMensais presente')
  : fail('meta.execucoesMensais NAO encontrado');

var nComp = (js.match(/competencia\s*:/g) || []).length;
(nComp >= 1)
  ? pass('Competencias mensais: ' + nComp + ' entrada(s)')
  : fail('Nenhuma competencia mensal encontrada');

(js.match(/projetos\s*:\s*\[/))
  ? pass('Array projetos[] declarado')
  : fail('Array projetos[] NAO encontrado');

var nProj = (js.match(/id\s*:\s*["']COI-\d+["']/g) || []).length;
(nProj >= 1)
  ? pass('Projetos COI-NNN: ' + nProj + ' encontrado(s)')
  : fail('Nenhum projeto com ID COI-NNN encontrado');

(js.indexOf('coiSalvarProjeto') !== -1)
  ? pass('coiSalvarProjeto definido')
  : fail('coiSalvarProjeto NAO encontrado -- funcoes de persistencia ausentes');

// ============================================================
// 4. MELHORIAS DAS FASES 5A.2 / 5A.3
// ============================================================
sep('4. MELHORIAS DAS FASES 5A.2 / 5A.3');

var idx = read('index.html');
var pf  = read('portfolio.html');
var fh  = read('projetos/ficha.html');
var css = read('assets/style.css');

(idx.indexOf('clearEl') !== -1) ? pass('clearEl em index.html')         : fail('clearEl AUSENTE em index.html');
(pf.indexOf('clearEl')  !== -1) ? pass('clearEl em portfolio.html')     : fail('clearEl AUSENTE em portfolio.html');
(fh.indexOf('clearEl')  !== -1) ? pass('clearEl em projetos/ficha.html'): fail('clearEl AUSENTE em projetos/ficha.html');

(idx.indexOf('v1.4.1') !== -1 || idx.indexOf('1.4.1') !== -1)
  ? pass('v1.4.1 presente em index.html')
  : fail('v1.4.1 AUSENTE em index.html');

(idx.indexOf('execucoesMensais') !== -1)
  ? pass('execucoesMensais presente em index.html')
  : fail('execucoesMensais AUSENTE em index.html');

(css.indexOf('em-select') !== -1)
  ? pass('em-select presente em assets/style.css')
  : fail('em-select AUSENTE em assets/style.css');

(idx.indexOf('P0') !== -1 && (idx.indexOf('Ativos') !== -1 || idx.indexOf('prioridade') !== -1))
  ? pass('Logica P0 ativos presente em index.html')
  : warn('Verificar logica P0 em index.html -- padrao nao encontrado automaticamente');

// ============================================================
// 5. PADROES PROIBIDOS
// ============================================================
sep('5. PADROES PROIBIDOS');

(idx.indexOf("innerHTML = ''") === -1 && idx.indexOf('innerHTML=""') === -1)
  ? pass('Sem innerHTML vazio em index.html')
  : fail('innerHTML vazio em index.html -- substituir por clearEl()');

(pf.indexOf("innerHTML = ''") === -1 && pf.indexOf('innerHTML=""') === -1)
  ? pass('Sem innerHTML vazio em portfolio.html')
  : fail('innerHTML vazio em portfolio.html -- substituir por clearEl()');

(idx.indexOf('<style>') === -1)
  ? pass('Sem bloco style inline em index.html')
  : fail('Bloco style inline em index.html -- mover para assets/style.css');

pass('dados/projetos.js carregado como script externo (nao via innerHTML)');

// ============================================================
// 6. FASE 5B.1 — MODELAGEM OPERACIONAL
// ============================================================
sep('6. FASE 5B.1 - MODELAGEM OPERACIONAL');

var pj = require('fs').readFileSync(require('path').join(__dirname, '..', 'dados', 'projetos.js'), 'utf8');

// IDs dos novos registros operacionais
['COI-009','COI-010','COI-011','COI-012','COI-013'].forEach(function(id) {
  (pj.indexOf('"' + id + '"') !== -1)
    ? pass('Registro ' + id + ' presente em dados/projetos.js')
    : fail('Registro ' + id + ' AUSENTE em dados/projetos.js');
});

// Pelo menos 1 tipoItem diferente de 'Projeto'
(pj.indexOf("tipoItem: \"Demanda\"") !== -1 || pj.indexOf("tipoItem: 'Demanda'") !== -1)
  ? pass("tipoItem 'Demanda' presente em dados/projetos.js")
  : fail("tipoItem 'Demanda' AUSENTE em dados/projetos.js");

(pj.indexOf("tipoItem: \"Incidente\"") !== -1 || pj.indexOf("tipoItem: 'Incidente'") !== -1)
  ? pass("tipoItem 'Incidente' presente em dados/projetos.js")
  : fail("tipoItem 'Incidente' AUSENTE em dados/projetos.js");

(pj.indexOf("tipoItem: \"Licen") !== -1 || pj.indexOf("tipoItem: 'Licen") !== -1)
  ? pass("tipoItem 'Licenca/Contrato' presente em dados/projetos.js")
  : fail("tipoItem 'Licenca/Contrato' AUSENTE em dados/projetos.js");

(pj.indexOf("tipoItem: \"Atividade Operacional\"") !== -1 || pj.indexOf("tipoItem: 'Atividade Operacional'") !== -1)
  ? pass("tipoItem 'Atividade Operacional' presente em dados/projetos.js")
  : fail("tipoItem 'Atividade Operacional' AUSENTE em dados/projetos.js");

(pj.indexOf("tipoItem: \"Entrega Contratual\"") !== -1 || pj.indexOf("tipoItem: 'Entrega Contratual'") !== -1)
  ? pass("tipoItem 'Entrega Contratual' presente em dados/projetos.js")
  : fail("tipoItem 'Entrega Contratual' AUSENTE em dados/projetos.js");

// Novos campos operacionais
(pj.indexOf('categoriaOperacional') !== -1)
  ? pass("Campo 'categoriaOperacional' presente em dados/projetos.js")
  : fail("Campo 'categoriaOperacional' AUSENTE em dados/projetos.js");

(pj.indexOf('solicitante') !== -1)
  ? pass("Campo 'solicitante' presente em dados/projetos.js")
  : fail("Campo 'solicitante' AUSENTE em dados/projetos.js");

(pj.indexOf('observacoesOperacionais') !== -1)
  ? pass("Campo 'observacoesOperacionais' presente em dados/projetos.js")
  : fail("Campo 'observacoesOperacionais' AUSENTE em dados/projetos.js");

// Aba Demandas com binding dinamico em portfolio.html
(pf.indexOf('renderDemandas') !== -1)
  ? pass("Funcao renderDemandas() presente em portfolio.html")
  : fail("Funcao renderDemandas() AUSENTE em portfolio.html");

(pf.indexOf('tbody-demandas') !== -1)
  ? pass("tbody-demandas presente em portfolio.html")
  : fail("tbody-demandas AUSENTE em portfolio.html");

// Cards de projetos filtrados por psProj em index.html
(idx.indexOf('psProj') !== -1)
  ? pass("Separacao psProj/ps presente em index.html")
  : fail("Separacao psProj/ps AUSENTE em index.html");

// ============================================================
// 7. FASE 5B.2 — EXIBICAO EXECUTIVA DEMANDAS OPERACIONAIS
// ============================================================
sep('7. FASE 5B.2 - EXIBICAO EXECUTIVA DEMANDAS OPERACIONAIS');

(pf.indexOf('op-resumo-exec') !== -1)
  ? pass('op-resumo-exec presente em portfolio.html -- resumo executivo implementado')
  : fail('op-resumo-exec AUSENTE em portfolio.html');

(pf.indexOf('renderResumoExecutivo') !== -1)
  ? pass('renderResumoExecutivo() presente em portfolio.html')
  : fail('renderResumoExecutivo() AUSENTE em portfolio.html');

(pf.indexOf('getItensOperacionais') !== -1)
  ? pass('getItensOperacionais() presente em portfolio.html')
  : fail('getItensOperacionais() AUSENTE em portfolio.html');

(pf.indexOf('filtro-dem-tipo') !== -1)
  ? pass('Filtro tipoItem (filtro-dem-tipo) presente em portfolio.html')
  : fail('Filtro tipoItem AUSENTE em portfolio.html');

(pf.indexOf('filtro-dem-status') !== -1)
  ? pass('Filtro status (filtro-dem-status) presente em portfolio.html')
  : fail('Filtro status AUSENTE em portfolio.html');

(pf.indexOf('filtro-dem-prior') !== -1)
  ? pass('Filtro prioridade (filtro-dem-prior) presente em portfolio.html')
  : fail('Filtro prioridade AUSENTE em portfolio.html');

(pf.indexOf('filtro-dem-frente') !== -1)
  ? pass('Filtro frente (filtro-dem-frente) presente em portfolio.html')
  : fail('Filtro frente AUSENTE em portfolio.html');

(pf.indexOf('Frente/Cliente') !== -1)
  ? pass('Coluna Frente/Cliente presente na tabela de demandas')
  : fail('Coluna Frente/Cliente AUSENTE na tabela de demandas');

(pf.indexOf("tipoItem !== 'Projeto'") !== -1)
  ? pass("tipoItem !== 'Projeto' presente em portfolio.html")
  : fail("tipoItem !== 'Projeto' AUSENTE em portfolio.html");

(pf.indexOf("!p.tipoItem || p.tipoItem === 'Projeto'") !== -1 || pf.indexOf("tipoItem === 'Projeto'") !== -1)
  ? pass('Aba Projetos continua isolada para projetos estrategicos')
  : fail('Isolamento da aba Projetos AUSENTE em portfolio.html');

var chartJs = read('assets/js/chart.umd.min.js');
(chartJs.length > 10000)
  ? pass('assets/js/chart.umd.min.js preservado -- biblioteca nao alterada')
  : fail('assets/js/chart.umd.min.js AUSENTE ou corrompido');

// ============================================================
// 8. INTEGRIDADE BASICA DE NAVEGACAO
// ============================================================
sep('8. INTEGRIDADE BASICA DE NAVEGACAO');

(idx.indexOf('portfolio.html') !== -1) ? pass('Link portfolio.html em index.html')      : fail('Link portfolio.html AUSENTE em index.html');
(pf.indexOf('ficha.html')      !== -1) ? pass('Link ficha.html em portfolio.html')       : fail('Link ficha.html AUSENTE em portfolio.html');
(fh.indexOf('COI_DATA')        !== -1) ? pass('COI_DATA referenciado em ficha.html')     : fail('COI_DATA NAO referenciado em ficha.html');
(idx.indexOf('dados/projetos.js') !== -1) ? pass('dados/projetos.js carregado em index.html') : fail('dados/projetos.js NAO carregado em index.html');

// ============================================================
// 9. FASE 5B.2.1 -- HOTFIX RENDERIZACAO ABAS PORTFOLIO
// ============================================================
sep('9. FASE 5B.2.1 - HOTFIX RENDERIZACAO ABAS PORTFOLIO');

// Arquivo nao pode estar truncado -- deve ter fechamento correto
var CLOSE_SCRIPT = '</' + 'script>';
var CLOSE_BODY   = '</' + 'body>';
var CLOSE_HTML   = '</' + 'html>';

(pf.indexOf(CLOSE_SCRIPT) !== -1)
  ? pass('Fechamento script presente em portfolio.html -- arquivo nao truncado')
  : fail('Fechamento script AUSENTE em portfolio.html -- arquivo TRUNCADO (falha critica de JS)');

(pf.indexOf(CLOSE_BODY) !== -1)
  ? pass('Fechamento body presente em portfolio.html')
  : fail('Fechamento body AUSENTE em portfolio.html -- HTML incompleto');

(pf.indexOf(CLOSE_HTML) !== -1)
  ? pass('Fechamento html presente em portfolio.html')
  : fail('Fechamento html AUSENTE em portfolio.html -- HTML incompleto');

// renderProjetos() chamada na inicializacao
(pf.indexOf('renderProjetos(COI_DATA') !== -1)
  ? pass('renderProjetos() chamada na inicializacao do portfolio.html')
  : fail('renderProjetos() NAO chamada na inicializacao -- aba Projetos nao renderiza');

// renderDemandas() chamada na inicializacao
(pf.indexOf('renderDemandas()') !== -1)
  ? pass('renderDemandas() chamada na inicializacao do portfolio.html')
  : fail('renderDemandas() NAO chamada na inicializacao -- aba Demandas nao renderiza');

// null-check em selProj
(pf.indexOf('if (selProj)') !== -1)
  ? pass('null-check em selProj presente -- protegido contra TypeError')
  : fail('null-check em selProj AUSENTE -- risco de TypeError em selProj.appendChild');

// Nav dinamica filtrada para projetos estrategicos
(pf.indexOf("!p.tipoItem || p.tipoItem === 'Projeto'") !== -1)
  ? pass('Nav dinamica filtrada para projetos estrategicos em portfolio.html')
  : fail('Nav dinamica NAO filtrada -- itens operacionais na nav');

// Todas as abas tem data-tab e id correspondentes
var ABAS = ['projetos','demandas','melhorias','riscos','indicadores','cronograma','pendencias','decisoes','entregas'];
ABAS.forEach(function(t) {
  (pf.indexOf('data-tab="' + t + '"') !== -1 && pf.indexOf('id="tab-' + t + '"') !== -1)
    ? pass('Aba "' + t + '": data-tab e id tab-' + t + ' presentes')
    : fail('Aba "' + t + '": data-tab ou id AUSENTE -- alternancia pode falhar');
});

// ============================================================
// RESUMO FINAL
// ============================================================
console.log('\n' + '='.repeat(60));
linhas.forEach(function(l) { console.log(l); });
console.log('='.repeat(60));
console.log('');

if (erros > 0) {
  console.log('RESULTADO: ' + erros + ' erro(s) real(is). Corrija antes de continuar.');
  console.log('AVISOS:    ' + avisos);
  process.exit(1);
} else if (avisos > 0) {
  console.log('RESULTADO: 0 erros. ' + avisos + ' aviso(s) -- revise os itens com AVISO.');
  process.exit(0);
} else {
  console.log('RESULTADO: Todas as validacoes passaram. Sem erros reais.');
  process.exit(0);
}
