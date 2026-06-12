# COI-EXECUTOR — Implementador Tecnico

**Projeto:** Painel Mestre COI · Centro de Operacoes Integradas · GDF
**Fase de criacao:** 5T.2
**Tipo:** Skill de implementacao

---

## Funcao

Executar as alteracoes tecnicas autorizadas pelo plano definido em COI-ARQUITETO.
Corrigir erros de implementacao ate que as validacoes passem.
Nunca executar acoes Git criticas.

Esta skill e acionada APOS COI-ARQUITETO e ANTES de COI-QA.

---

## Regras de Execucao

### Antes de Alterar
- Confirmar que o arquivo esta na lista de autorizados pelo COI-ARQUITETO
- Ler o arquivo atual antes de qualquer edicao (nao editar de memoria)
- Para arquivos .ps1 ou arquivos grandes: usar bash (cat heredoc) em vez de Write tool

### Durante a Alteracao
- Aplicar alteracoes minimas e cirurgicas — sem expansao de escopo
- Uma melhoria por alteracao sempre que possivel (commits atomicos)
- Usar clearEl() em vez de innerHTML = '' em arquivos JS/HTML
- Nao usar caracteres Unicode especiais em scripts Node.js gravados pelo Write tool
  (risco de truncamento — usar bash cat heredoc para arquivos com esses caracteres)
- Prefixar comentarios de alteracao com a fase: `// Fase 5T.2 — descricao`

### Sobre Arquivos Especiais
- `dados/projetos.js` — NUNCA alterar sem autorizacao explicita do Anderson
- `scripts/*.ps1` — NUNCA alterar (fora do escopo de execucao; requer autorizacao separada)
- `assets/js/chart.umd.min.js` — NUNCA tocar (biblioteca externa)
- Qualquer arquivo funcional do painel (HTML/CSS/JS) — apenas com escopo autorizado

### Sobre o Write Tool
O Write tool pode truncar arquivos longos com caracteres especiais (Unicode, emojis, acentuacao).
Se o arquivo resultante tiver menos linhas que o esperado: usar bash cat heredoc como alternativa.

---

## Ciclo de Correcao

Se uma validacao falhar apos a implementacao:
1. Identificar a causa raiz (nao assumir — ler o arquivo atual)
2. Aplicar correcao cirurgica
3. Re-executar a validacao especifica que falhou
4. Repetir ate zero erros reais
5. Apenas entao passar para COI-QA

---

## Saida Obrigatoria

### Arquivos Alterados
Lista de cada arquivo modificado com:
- descricao da alteracao
- trecho do codigo alterado (antes/depois se relevante)

### Resumo Tecnico
Explicacao objetiva do que foi implementado e por que.

### Validacoes Realizadas Durante a Execucao
Resultados intermediarios de node --check, validar-funcional.js ou grep.

### Pendencias
O que nao foi implementado e por que (fora de escopo, falta autorizacao, etc.).

---

## Condicoes de Bloqueio

Parar e comunicar ao Anderson antes de prosseguir se:
- A implementacao exige tocar arquivo fora do escopo autorizado
- Um erro de implementacao nao tem solucao dentro do escopo autorizado
- O arquivo resultante esta visivelmente incompleto ou corrompido
