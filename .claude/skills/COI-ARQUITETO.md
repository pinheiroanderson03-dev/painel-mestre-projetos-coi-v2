# COI-ARQUITETO — Analista de Escopo e Risco

**Projeto:** Painel Mestre COI · Centro de Operacoes Integradas · GDF
**Fase de criacao:** 5T.2
**Tipo:** Skill de planejamento tecnico

---

## Funcao

Analisar o escopo da tarefa recebida, definir o plano de execucao, identificar riscos
e preparar o plano de rollback conceitual antes de qualquer implementacao.

Esta skill e acionada APOS COI-MEMORIA e ANTES de COI-EXECUTOR.

---

## Processo de Analise

### 1. Classificar o Modo de Execucao

| Modo | Quando usar |
|---|---|
| Rapido | Documentacao, ajustes de texto, atualizacao de indicadores |
| Seguro | Alteracao tecnica em HTML, CSS ou JS |
| Critico | Merge, publicacao em main, rollback, alteracao estrutural em dados/projetos.js |

### 2. Mapear Arquivos

Para cada arquivo no escopo, classificar:

| Arquivo | Tipo | Autorizado? | Impacto se Errar |
|---|---|---|---|
| (listar) | funcional/doc/dados | Sim/Nao | Baixo/Medio/Alto |

Regras de classificacao:
- `dados/projetos.js` — CRITICO — nunca alterar sem autorizacao explicita
- `index.html`, `portfolio.html`, `projetos/ficha.html` — ALTO — alteracoes visiveis ao usuario
- `assets/style.css` — MEDIO — afeta visual mas nao dados
- `*.md` em raiz e `docs/` — BAIXO — documentacao interna
- `scripts/*.js` — MEDIO — afeta validacao e processo
- `scripts/*.ps1` — ALTO — usar bash para gravar, nao Write tool (risco de truncamento)
- `assets/js/chart.umd.min.js` — PROIBIDO — biblioteca externa, nunca tocar
- Branch `publicacao-demandas-central-df` — PROIBIDO — GitHub Pages v1

### 3. Definir Plano de Execucao

Listar os passos na ordem correta, com arquivo e descricao da alteracao esperada.
Incluir qual validacao sera executada apos cada alteracao.

### 4. Definir Rollback Conceitual

Descrever como desfazer a alteracao se algo der errado, sem executar.
Identificar se ha tag segura disponivel como ponto de retorno.

---

## Saida Obrigatoria

### Objetivo
Uma frase descrevendo o que esta fase entrega.

### Arquivos que Serao Alterados
Lista com justificativa de cada arquivo.

### Arquivos Proibidos
Lista explicita dos arquivos que NAO serao tocados.

### Impacto Esperado
O que muda para o usuario final (se houver).

### Riscos
| Risco | Probabilidade | Mitigacao |
|---|---|---|

### Plano de Rollback Conceitual
Como desfazer se necessario. Qual tag usar como ponto de retorno.

### Validacoes Necessarias
Quais scripts e comandos devem ser executados ao final.

---

## Condicao de Bloqueio

Parar e comunicar ao Anderson antes de prosseguir se:
- A tarefa exige alterar arquivo fora do escopo autorizado
- O impacto classificado e CRITICO e nao ha tag segura recente
- O modo classificado e Critico e Anderson nao confirmou cada etapa
