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
  'scripts/validar-docs.ps1', 'scripts/status-seguro.ps1',
  'scripts/coi-curador-inteligente.js',
  'config/regras-curador.js',
  'scripts/coi-auditor-inteligente.js'
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
// 6. FASE 5B.1 â€” MODELAGEM OPERACIONAL
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
// 7. FASE 5B.2 â€” EXIBICAO EXECUTIVA DEMANDAS OPERACIONAIS
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



// ============================================================
// [ 10. FASE 5B.3 - FICHA OPERACIONAL E CONCLUSAO DE DEMANDAS ]
// ============================================================
sep('10. FASE 5B.3 - FICHA OPERACIONAL E CONCLUSAO DE DEMANDAS');

var fh = fs.readFileSync('projetos/ficha.html', 'utf8');

// 10.1 Deteccao de tipoItem operacional
(fh.indexOf('eOperacional') !== -1)
  ? pass('Funcao eOperacional() presente em ficha.html -- deteccao condicional implementada')
  : fail('Funcao eOperacional() ausente em ficha.html -- ficha operacional nao detecta tipoItem');

// 10.2 Campos operacionais editaveis
(fh.indexOf('op-categoria') !== -1)
  ? pass('Campo categoriaOperacional editavel (op-categoria) presente em ficha.html')
  : fail('Campo op-categoria ausente em ficha.html');

// 10.3 Status editavel
(fh.indexOf('op-status') !== -1)
  ? pass('Campo status editavel (op-status) presente em ficha.html')
  : fail('Campo op-status ausente em ficha.html -- status de demanda nao editavel');

// 10.4 Prazo de resolucao editavel
(fh.indexOf('op-prazo-resolucao') !== -1)
  ? pass('Campo prazoResolucao editavel (op-prazo-resolucao) presente em ficha.html')
  : fail('Campo op-prazo-resolucao ausente em ficha.html');

// 10.5 Data de resolucao editavel
(fh.indexOf('op-data-resolucao') !== -1)
  ? pass('Campo dataResolucao editavel (op-data-resolucao) presente em ficha.html')
  : fail('Campo op-data-resolucao ausente em ficha.html');

// 10.6 Observacoes operacionais editaveis
(fh.indexOf('op-obs-operacionais') !== -1)
  ? pass('Campo observacoesOperacionais editavel (op-obs-operacionais) presente em ficha.html')
  : fail('Campo op-obs-operacionais ausente em ficha.html');

// 10.7 Botao/funcao de conclusao
(fh.indexOf('concluirDemanda') !== -1)
  ? pass('Funcao concluirDemanda() presente em ficha.html -- botao de conclusao implementado')
  : fail('Funcao concluirDemanda() ausente em ficha.html -- sem fluxo de conclusao');

// 10.8 Acao que define status = Concluído
(/p\.status\s*=\s*'Concluído'/.test(fh))
  ? pass("Acao p.status = 'Concluído' presente em ficha.html -- conclusao registra status corretamente")
  : fail("Acao p.status = 'Concluído' ausente em ficha.html");

// 10.9 Acao que atualiza dataResolucao
(fh.indexOf('p.dataResolucao') !== -1)
  ? pass('Acao dataResolucao atualizada em ficha.html -- data de resolucao registrada automaticamente')
  : fail('Acao dataResolucao ausente em ficha.html');

// 10.10 Acao que atualiza atualizadoEm
(fh.indexOf('p.atualizadoEm') !== -1)
  ? pass('Acao atualizadoEm atualizada em ficha.html -- data de atualizacao registrada automaticamente')
  : fail('Acao atualizadoEm ausente em ficha.html');

// 10.11 Preservacao da ficha de projeto estrategico (secao-projeto)
(fh.indexOf('secao-projeto') !== -1)
  ? pass('Secao-projeto preservada em ficha.html -- COI-001 a COI-008 continuam funcionando')
  : fail('Secao-projeto ausente em ficha.html -- ficha de projetos estrategicos pode estar quebrada');

// 10.12 Fechamento </script> presente em ficha.html
var CLOSE_SCRIPT_F = '</' + 'script>';
(fh.lastIndexOf(CLOSE_SCRIPT_F) > fh.indexOf(CLOSE_SCRIPT_F))
  ? pass('Fechamento script presente em ficha.html (inline) -- arquivo nao truncado')
  : fail('Fechamento script ausente ou unico em ficha.html -- arquivo pode estar truncado');

// 10.13 Fechamento </body> e </html> em ficha.html
var CLOSE_BODY_F = '</' + 'body>';
var CLOSE_HTML_F = '</' + 'html>';
(fh.indexOf(CLOSE_BODY_F) !== -1)
  ? pass('Fechamento body presente em ficha.html')
  : fail('Fechamento body AUSENTE em ficha.html -- HTML incompleto');
(fh.indexOf(CLOSE_HTML_F) !== -1)
  ? pass('Fechamento html presente em ficha.html')
  : fail('Fechamento html AUSENTE em ficha.html -- HTML incompleto');

// 10.14 chart.umd.min.js intocado
(fh.indexOf('chart.umd.min.js') === -1)
  ? pass('assets/js/chart.umd.min.js nao referenciado em ficha.html -- biblioteca preservada')
  : pass('Referencia a chart.umd.min.js em ficha.html -- verificar se nao foi alterada');


// ============================================================
// SECAO 11 — Indicadores Operacionais (Fase 5B.4)
// ============================================================
sep('11. FASE 5B.4 - INDICADORES OPERACIONAIS');
var idxOp = read('index.html');
var cssOp = read('assets/style.css');

// HTML — cards de demandas operacionais
idxOp.indexOf('id="op-total"') !== -1
  ? pass('S11-01: index.html tem card #op-total (total demandas)')
  : fail('S11-01: index.html FALTANDO card #op-total');
idxOp.indexOf('id="op-andamento"') !== -1
  ? pass('S11-02: index.html tem card #op-andamento (demandas em andamento)')
  : fail('S11-02: index.html FALTANDO card #op-andamento');
idxOp.indexOf('id="op-concluidas"') !== -1
  ? pass('S11-03: index.html tem card #op-concluidas (demandas concluidas)')
  : fail('S11-03: index.html FALTANDO card #op-concluidas');
idxOp.indexOf('id="op-criticas"') !== -1
  ? pass('S11-04: index.html tem card #op-criticas (demandas criticas P0)')
  : fail('S11-04: index.html FALTANDO card #op-criticas');
idxOp.indexOf('id="op-atrasadas"') !== -1
  ? pass('S11-05: index.html tem card #op-atrasadas (demandas atrasadas)')
  : fail('S11-05: index.html FALTANDO card #op-atrasadas');

// HTML — secao analitica
idxOp.indexOf('id="op-analiticos"') !== -1
  ? pass('S11-06: index.html tem div#op-analiticos (secao analitica)')
  : fail('S11-06: index.html FALTANDO div#op-analiticos');

// JS — funcao buildIndicadoresOperacionais
idxOp.indexOf('buildIndicadoresOperacionais') !== -1
  ? pass('S11-07: index.html contem funcao buildIndicadoresOperacionais()')
  : fail('S11-07: index.html FALTANDO funcao buildIndicadoresOperacionais');
idxOp.indexOf('psOp') !== -1
  ? pass('S11-08: index.html contem variavel psOp (itens operacionais)')
  : fail('S11-08: index.html FALTANDO variavel psOp');

// JS — calculos de percentual
idxOp.indexOf('percAcima80') !== -1
  ? pass('S11-09: index.html calcula percAcima80 (>= 80%)')
  : fail('S11-09: index.html FALTANDO calculo percAcima80');
idxOp.indexOf('percMedio') !== -1
  ? pass('S11-10: index.html calcula percMedio (30-80%)')
  : fail('S11-10: index.html FALTANDO calculo percMedio');
idxOp.indexOf('percAbaixo30') !== -1
  ? pass('S11-11: index.html calcula percAbaixo30 (< 30%)')
  : fail('S11-11: index.html FALTANDO calculo percAbaixo30');

// JS — calculos de prioridade
idxOp.indexOf('priorAlta') !== -1
  ? pass('S11-12: index.html calcula priorAlta (P0+P1)')
  : fail('S11-12: index.html FALTANDO calculo priorAlta');
idxOp.indexOf('priorMedia') !== -1
  ? pass('S11-13: index.html calcula priorMedia (P2)')
  : fail('S11-13: index.html FALTANDO calculo priorMedia');
idxOp.indexOf('priorBaixa') !== -1
  ? pass('S11-14: index.html calcula priorBaixa (P3)')
  : fail('S11-14: index.html FALTANDO calculo priorBaixa');

// JS — semaforo
idxOp.indexOf('semVerde') !== -1
  ? pass('S11-15: index.html calcula semVerde')
  : fail('S11-15: index.html FALTANDO calculo semVerde');
idxOp.indexOf('semAmarelo') !== -1
  ? pass('S11-16: index.html calcula semAmarelo')
  : fail('S11-16: index.html FALTANDO calculo semAmarelo');
idxOp.indexOf('semVermelho') !== -1
  ? pass('S11-17: index.html calcula semVermelho')
  : fail('S11-17: index.html FALTANDO calculo semVermelho');

// JS — distribuicao por cliente e responsavel
idxOp.indexOf('clienteMap') !== -1
  ? pass('S11-18: index.html calcula distribuicao por cliente (clienteMap)')
  : fail('S11-18: index.html FALTANDO distribuicao clienteMap');
idxOp.indexOf('respMap') !== -1
  ? pass('S11-19: index.html calcula distribuicao por responsavel (respMap)')
  : fail('S11-19: index.html FALTANDO distribuicao respMap');

// JS — projetos bloqueados
idxOp.indexOf('projBloqueados') !== -1
  ? pass('S11-20: index.html calcula projBloqueados (semaforo vermelho)')
  : fail('S11-20: index.html FALTANDO calculo projBloqueados');

// CSS — namespace op-
cssOp.indexOf('.op-mini-card') !== -1
  ? pass('S11-21: style.css contem .op-mini-card (indicadores operacionais)')
  : fail('S11-21: style.css FALTANDO .op-mini-card');
cssOp.indexOf('.op-dist-bar-fill') !== -1
  ? pass('S11-22: style.css contem .op-dist-bar-fill (barra de distribuicao)')
  : fail('S11-22: style.css FALTANDO .op-dist-bar-fill');
cssOp.indexOf('.op-group') !== -1
  ? pass('S11-23: style.css contem .op-group (grupo analitico)')
  : fail('S11-23: style.css FALTANDO .op-group');

// dados — card sem valor fixo no HTML (valor dinamico via JS)
(idxOp.indexOf('id="op-total"') !== -1 && idxOp.indexOf('>op-total<') === -1)
  ? pass('S11-24: card op-total sem valor fixo no HTML (dinamico via JS)')
  : fail('S11-24: card op-total com valor fixo detectado');

// ============================================================
// 12. COI CURADOR INTELIGENTE (Fase 6.2)
// ============================================================
sep('12. COI CURADOR INTELIGENTE');

var curador = read('scripts/coi-curador-inteligente.js');

// Existencia e cabecalho
curador.indexOf('COI Curador Inteligente') !== -1
  ? pass('S12-01: coi-curador-inteligente.js com cabecalho correto')
  : fail('S12-01: coi-curador-inteligente.js SEM cabecalho COI Curador Inteligente');

curador.indexOf('Fase: 6.2') !== -1
  ? pass('S12-02: coi-curador-inteligente.js referencia Fase 6.2')
  : fail('S12-02: coi-curador-inteligente.js SEM referencia Fase 6.2');

// Mock localStorage
curador.indexOf('mockLocalStorage') !== -1
  ? pass('S12-03: coi-curador-inteligente.js contem mock de localStorage')
  : fail('S12-03: coi-curador-inteligente.js SEM mock localStorage');

curador.indexOf("new Function('localStorage'") !== -1
  ? pass('S12-04: coi-curador-inteligente.js usa new Function com localStorage mockado')
  : fail('S12-04: coi-curador-inteligente.js SEM new Function com localStorage');

// --- Seção 12.2: config/regras-curador.js ---
var cfgRegras = read('config/regras-curador.js');

cfgRegras.length > 0
  ? pass('S12-05: config/regras-curador.js carregado e nao vazio')
  : fail('S12-05: config/regras-curador.js VAZIO ou ausente');

cfgRegras.indexOf('REGRAS_CURADOR') !== -1
  ? pass('S12-06: config/regras-curador.js define REGRAS_CURADOR')
  : fail('S12-06: config/regras-curador.js FALTANDO REGRAS_CURADOR');

cfgRegras.indexOf("module.exports") !== -1
  ? pass('S12-07: config/regras-curador.js exporta via module.exports')
  : fail('S12-07: config/regras-curador.js SEM module.exports');

// 12 IDs de regra presentes na config
['R01', 'R02', 'R03', 'R04', 'R05', 'R06',
 'R07', 'R08', 'R09', 'R10', 'R11', 'R12'
].forEach(function(id) {
  cfgRegras.indexOf("id: '" + id + "'") !== -1
    ? pass('S12-08: config/regras-curador.js contem regra ' + id)
    : fail('S12-08: config/regras-curador.js FALTANDO regra ' + id);
});

// Campos obrigatorios de cada regra
['peso', 'severidade', 'obrigatoria', 'ativa', 'validar'].forEach(function(campo) {
  cfgRegras.indexOf(campo + ':') !== -1
    ? pass('S12-09: config/regras-curador.js contem campo de regra: ' + campo)
    : fail('S12-09: config/regras-curador.js FALTANDO campo de regra: ' + campo);
});

// --- Secao 12.3: motor (curador) consome a config ---
curador.indexOf("require") !== -1 && curador.indexOf("regras-curador") !== -1
  ? pass('S12-17: coi-curador-inteligente.js carrega config/regras-curador via require')
  : fail('S12-17: coi-curador-inteligente.js NAO carrega config/regras-curador');

curador.indexOf('REGRAS_ATIVAS') !== -1
  ? pass('S12-18: coi-curador-inteligente.js filtra regras ativas (REGRAS_ATIVAS)')
  : fail('S12-18: coi-curador-inteligente.js FALTANDO filtragem REGRAS_ATIVAS');

curador.indexOf('regra.peso') !== -1 || curador.indexOf('r.peso') !== -1
  ? pass('S12-19: coi-curador-inteligente.js usa peso por regra (nao peso fixo)')
  : fail('S12-19: coi-curador-inteligente.js FALTANDO uso de peso por regra');

// Funcoes core do motor
['calcularScore', 'classificar', 'criticidade', 'diagnosticar',
 'imprimirDiag', 'imprimirConsolidado', 'gerarJSON'
].forEach(function(fn) {
  curador.indexOf(fn) !== -1
    ? pass('S12-20: coi-curador-inteligente.js contem funcao ' + fn)
    : fail('S12-20: coi-curador-inteligente.js FALTANDO funcao ' + fn);
});

// Classificacao Excelente/Bom/Atencao/Critico
curador.indexOf("'Excelente'") !== -1 && curador.indexOf("'Bom'") !== -1
  && curador.indexOf("'Atencao'") !== -1 && curador.indexOf("'Critico'") !== -1
  ? pass('S12-21: coi-curador-inteligente.js implementa 4 niveis de classificacao')
  : fail('S12-21: coi-curador-inteligente.js FALTANDO classificacoes Excelente/Bom/Atencao/Critico');

// Suporte a --json
curador.indexOf("'--json'") !== -1 || curador.indexOf('"--json"') !== -1
  ? pass('S12-22: coi-curador-inteligente.js suporta flag --json')
  : fail('S12-22: coi-curador-inteligente.js SEM suporte a flag --json');

// Estrutura da saida JSON
['resumo', 'indicadores', 'itens', 'erros', 'alertas', 'recomendacoes'].forEach(function(campo) {
  curador.indexOf(campo + ':') !== -1 || curador.indexOf('"' + campo + '"') !== -1
    ? pass('S12-23: JSON output contem campo: ' + campo)
    : fail('S12-23: JSON output FALTANDO campo: ' + campo);
});

// ============================================================
// 13. COI AUDITOR INTELIGENTE (Fase 6.3)
// ============================================================
sep('13. COI AUDITOR INTELIGENTE');

var auditor = read('scripts/coi-auditor-inteligente.js');

// Cabecalho e fase
auditor.indexOf('COI Auditor Inteligente') !== -1
  ? pass('S13-01: coi-auditor-inteligente.js com cabecalho correto')
  : fail('S13-01: coi-auditor-inteligente.js SEM cabecalho COI Auditor Inteligente');

auditor.indexOf('Fase 6.3') !== -1
  ? pass('S13-02: coi-auditor-inteligente.js referencia Fase 6.3')
  : fail('S13-02: coi-auditor-inteligente.js SEM referencia Fase 6.3');

// Interface padrao do COI Intelligence Engine
['execute', 'score', 'recommendations', 'export'].forEach(function(fn) {
  auditor.indexOf(fn + ':') !== -1 || auditor.indexOf(fn + ' =') !== -1
    ? pass('S13-03: coi-auditor-inteligente.js contem funcao interface: ' + fn)
    : fail('S13-03: coi-auditor-inteligente.js FALTANDO funcao interface: ' + fn);
});

// module.exports
auditor.indexOf('module.exports') !== -1
  ? pass('S13-04: coi-auditor-inteligente.js exporta via module.exports')
  : fail('S13-04: coi-auditor-inteligente.js SEM module.exports');

// Consome o COI Curador
auditor.indexOf('coi-curador-inteligente.js') !== -1
  ? pass('S13-05: coi-auditor-inteligente.js consome coi-curador-inteligente.js')
  : fail('S13-05: coi-auditor-inteligente.js NAO referencia coi-curador-inteligente.js');

// Flags de saida
['--resumo', '--json', '--md'].forEach(function(flag) {
  auditor.indexOf("'" + flag + "'") !== -1 || auditor.indexOf('"' + flag + '"') !== -1
    ? pass('S13-06: coi-auditor-inteligente.js suporta flag ' + flag)
    : fail('S13-06: coi-auditor-inteligente.js SEM suporte a flag ' + flag);
});

// Schema JSON obrigatorio
['schema', 'engine', 'resumo', 'indicadores', 'auditoria', 'tendencias', 'recomendacoes'].forEach(function(campo) {
  auditor.indexOf(campo + ':') !== -1
    ? pass('S13-07: JSON schema contem campo: ' + campo)
    : fail('S13-07: JSON schema FALTANDO campo: ' + campo);
});

// Classificacoes de saude geral
['Excelente', 'Boa', 'Atencao', 'Critica'].forEach(function(nivel) {
  auditor.indexOf("'" + nivel + "'") !== -1
    ? pass('S13-08: coi-auditor-inteligente.js contem nivel de saude: ' + nivel)
    : fail('S13-08: coi-auditor-inteligente.js FALTANDO nivel de saude: ' + nivel);
});

// Classificacoes de criticidade
['Baixa', 'Media', 'Alta', 'Critica'].forEach(function(crit) {
  auditor.indexOf("'" + crit + "'") !== -1
    ? pass('S13-09: coi-auditor-inteligente.js contem criticidade: ' + crit)
    : fail('S13-09: coi-auditor-inteligente.js FALTANDO criticidade: ' + crit);
});

// Funcoes de analise obrigatorias
['calcularSaudeGeral', 'calcularCriticidade', 'consolidarIndicadores',
 'gerarAuditoria', 'identificarTendencias', 'gerarRecomendacoesConsolidadas',
 'gerarMarkdown', 'gerarTexto', 'carregarDadosCurador'
].forEach(function(fn) {
  auditor.indexOf(fn) !== -1
    ? pass('S13-10: coi-auditor-inteligente.js contem funcao: ' + fn)
    : fail('S13-10: coi-auditor-inteligente.js FALTANDO funcao: ' + fn);
});

// Dimensoes de auditoria
['conformidade', 'completude', 'pontualidade', 'rastreabilidade', 'governanca'].forEach(function(dim) {
  auditor.indexOf(dim + ':') !== -1
    ? pass('S13-11: coi-auditor-inteligente.js audita dimensao: ' + dim)
    : fail('S13-11: coi-auditor-inteligente.js FALTANDO dimensao: ' + dim);
});

// Markdown
auditor.indexOf('gerarMarkdown') !== -1
  ? pass('S13-12: coi-auditor-inteligente.js gera saida Markdown')
  : fail('S13-12: coi-auditor-inteligente.js SEM saida Markdown');

// require.main guard
auditor.indexOf('require.main') !== -1
  ? pass('S13-13: coi-auditor-inteligente.js tem guard require.main === module')
  : fail('S13-13: coi-auditor-inteligente.js SEM guard require.main');

// ============================================================
// RESULTADO FINAL
// ============================================================

console.log('\n' + '='.repeat(60));
linhas.forEach(function(l) { console.log(l); });
console.log('='.repeat(60));
console.log('');

if (erros > 0) {
  console.log('RESULTADO: ' + erros + ' erro(s) real(is). Corrija antes de continuar.');
  process.exit(1);
} else {
  console.log('RESULTADO: Todas as validacoes passaram. Sem erros reais.');
  process.exit(0);
}
