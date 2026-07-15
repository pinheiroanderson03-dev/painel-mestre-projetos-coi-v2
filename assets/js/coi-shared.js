/**
 * COI — Funcoes e Componentes Compartilhados
 * Arquivo: assets/js/coi-shared.js
 * Sprint 6.1 — Consolidacao Arquitetural
 *
 * Consolida codigo que estava duplicado em index.html e portfolio.html:
 * helpers de badge/cor, saude do projeto e o componente de menu suspenso
 * "Projetos" (nav dropdown), criado na Fase 5.2 e agrupado na Fase EPIC 3.
 *
 * Carregar logo apos dados/projetos.js. As funcoes de helper (clearEl,
 * priorBadge, statusBadge, percColor, calcularSaude, getProjetosEstrategicos)
 * nao tocam o DOM na definicao, apenas quando chamadas — por isso podem
 * ser carregadas no <head>. coiInitNavDropdown() acessa o DOM e deve ser
 * chamada explicitamente por cada pagina, no ponto em que o <nav> ja
 * existe (mesmo lugar onde antes ficava o bloco inline duplicado).
 */

// ─── Helpers de apresentacao (antes duplicados em index.html/portfolio.html) ──
function clearEl(el) { while (el.firstChild) el.removeChild(el.firstChild); }

function priorBadge(p) { return p==='P0'?'badge-vermelho':p==='P1'?'badge-amarelo':'badge-azul'; }

function statusBadge(s) {
  return {
    'Em andamento':'badge-azul','Homologação':'badge-amarelo',
    'Produção':'badge-verde','Concluído':'badge-verde',
    'Planejamento':'badge-cinza','Suspenso':'badge-cinza'
  }[s] || 'badge-cinza';
}

function percColor(n) { return n>=70?'#2E7D32':n>=40?'#F9A825':'#C62828'; }

// ─── Saude do projeto (padrao consolidado — EPIC 3 / Sprint 6, Etapa 5) ───
// Regra: deriva de status + semaforo + prazo, sem novos campos em dados/projetos.js.
//   Critico  — semaforo vermelho, OU prazo previsto vencido e projeto nao concluido
//   Atencao  — semaforo amarelo
//   Saudavel — demais casos (inclui concluidos)
function calcularSaude(p) {
  if (p.status === 'Concluído') return { emoji: '🟢', label: 'Concluído', cls: 'badge-verde' };
  var atrasado = false;
  if (p.prazoPrevisto) {
    var d = new Date(p.prazoPrevisto);
    if (!isNaN(d.getTime())) {
      var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
      atrasado = d < hoje;
    }
  }
  if (p.semaforo === '🔴' || atrasado) return { emoji: '🔴', label: 'Crítico',   cls: 'badge-vermelho' };
  if (p.semaforo === '🟡')             return { emoji: '🟡', label: 'Atenção',   cls: 'badge-amarelo' };
  return { emoji: '🟢', label: 'Saudável', cls: 'badge-verde' };
}

// ─── Projetos estrategicos (tipoItem === 'Projeto' ou ausente) ────────────
function getProjetosEstrategicos(lista) {
  return (lista || []).filter(function(p) { return !p.tipoItem || p.tipoItem === 'Projeto'; });
}

// ─── Menu suspenso "Projetos" — Ativos / Concluidos, busca, teclado ───────
// Chamar coiInitNavDropdown() depois que o <nav id="nav-principal"> com o
// bloco #nav-projetos ja existir no DOM (fim do body, como antes).
function coiInitNavDropdown() {
  var wrap   = document.getElementById('nav-projetos');
  var toggle = document.getElementById('nav-projetos-toggle');
  var menu   = document.getElementById('nav-projetos-menu');
  var list   = document.getElementById('nav-projetos-list');
  var busca  = document.getElementById('nav-projetos-busca');
  if (!wrap || !toggle || !menu || !list) return;

  var psNav = getProjetosEstrategicos(COI_DATA.projetos);
  var grupos = [
    { titulo: 'Projetos Ativos',     lista: psNav.filter(function(p){ return p.status !== 'Concluído'; }) },
    { titulo: 'Projetos Concluídos', lista: psNav.filter(function(p){ return p.status === 'Concluído'; }) }
  ];

  var itens = [];
  var headers = [];
  grupos.forEach(function(grupo) {
    if (grupo.lista.length === 0) return;
    var header = document.createElement('div');
    header.className = 'nav-dropdown-group';
    header.textContent = grupo.titulo;
    list.appendChild(header);
    var headerItens = [];
    grupo.lista.forEach(function(p) {
      var a = document.createElement('a');
      a.href = 'projetos/ficha.html#' + p.id;
      a.className = 'nav-dropdown-item';
      a.setAttribute('role', 'menuitem');
      var code = document.createElement('span');
      code.className = 'nav-dropdown-code';
      code.textContent = p.id;
      var name = document.createElement('span');
      name.className = 'nav-dropdown-name';
      name.textContent = p.nome;
      a.append(code, name);
      a.dataset.busca = (p.id + ' ' + p.nome).toLowerCase();
      list.appendChild(a);
      itens.push(a);
      headerItens.push(a);
    });
    headers.push({ el: header, itens: headerItens });
  });

  if (itens.length === 0) {
    var vazio = document.createElement('div');
    vazio.className = 'nav-dropdown-empty';
    vazio.textContent = 'Nenhum projeto cadastrado.';
    list.appendChild(vazio);
  }

  function visiveis() {
    return itens.filter(function(a) { return a.style.display !== 'none'; });
  }
  function estaAberto() { return wrap.classList.contains('open'); }
  function abrir() {
    wrap.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function fechar(devolverFoco) {
    wrap.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (busca) { busca.value = ''; itens.forEach(function(a){ a.style.display = ''; }); headers.forEach(function(h){ h.el.style.display = ''; }); }
    if (devolverFoco) toggle.focus();
  }

  // Mouse
  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (estaAberto()) { fechar(false); } else { abrir(); if (busca) busca.focus(); }
  });

  // Teclado — abrir a partir do botao
  toggle.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { fechar(true); return; }
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!estaAberto()) abrir();
      var alvo = busca || visiveis()[0];
      if (alvo) alvo.focus();
    }
  });

  // Teclado — navegacao dentro do menu (setas e Escape)
  menu.addEventListener('keydown', function(e) {
    var lista = visiveis();
    var idx = lista.indexOf(document.activeElement);
    if (e.key === 'Escape') {
      e.preventDefault(); fechar(true);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      var prox = lista[idx + 1] || lista[0];
      if (prox) prox.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx <= 0) { if (busca) busca.focus(); }
      else { lista[idx - 1].focus(); }
    }
  });

  // Busca simples, sem dependencias externas
  if (busca) {
    busca.addEventListener('input', function() {
      var termo = busca.value.trim().toLowerCase();
      itens.forEach(function(a) {
        a.style.display = a.dataset.busca.indexOf(termo) === -1 ? 'none' : '';
      });
      headers.forEach(function(h) {
        h.el.style.display = h.itens.some(function(a){ return a.style.display !== 'none'; }) ? '' : 'none';
      });
    });
  }

  // Fechar ao clicar fora
  document.addEventListener('click', function(e) {
    if (estaAberto() && !wrap.contains(e.target)) fechar(false);
  });
  // Fechar com Escape em qualquer foco dentro do wrapper
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && estaAberto() && wrap.contains(document.activeElement)) fechar(true);
  });
}
