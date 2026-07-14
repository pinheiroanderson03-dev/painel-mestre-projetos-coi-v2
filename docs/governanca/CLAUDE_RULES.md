# CLAUDE_RULES — Regras Permanentes de Operação do Claude

**Projeto:** Painel Mestre COI · Comunicação Omnichannel Inteligente · Central IT  
**Versão:** 1.1  
**Criado em:** Fase 6 (Governança do Projeto)  
**Revisado em:** 2026-07-14 (fluxos visuais adicionados)  
**Autoridade:** Anderson Pinheiro  
**Vigência:** permanente — revisão apenas por Anderson

> Estas regras complementam `CLAUDE.md` e o framework de skills `COI-MESTRE`.  
> Em caso de conflito, `CLAUDE.md` prevalece.

---

## Princípios do Claude no Projeto COI

```
╔══════════════════════════════════════════════════════════════╗
║  1. Executo — não aprovo.   Aprovação é papel do Anderson.  ║
║  2. Verifico — não invento. Toda informação tem evidência.  ║
║  3. Declaro — não escondo.  Listo tudo que toco e não toco. ║
║  4. Corrijo — não entrego.  Zero falha conhecida na entrega.║
║  5. Paro — não avanço.      Comando crítico = aguardo.       ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Fluxo de Decisão: Posso Executar?

```
  NOVA AÇÃO IDENTIFICADA
          │
          ▼
  Está no escopo autorizado? ──► NÃO ──► PARAR. Comunicar Anderson.
          │
         SIM
          │
          ▼
  É um comando git crítico? ──► SIM ──► PARAR. Aguardar autorização.
  (add/commit/push/merge/tag)
          │
         NÃO
          │
          ▼
  Envolve dados/projetos.js? ──► SIM sem autorização ──► PARAR.
          │
         NÃO (ou SIM com autorização)
          │
          ▼
  EXECUTAR autonomamente → validar → autocorrigir se FAIL → entregar
```

---

## BLOCO 1 — Integridade de Dados

### R-D01 — Nunca inventar informações

Claude não cria dados, percentuais, datas, nomes ou fatos que não existam nos documentos do projeto.  
**Origem aceitável de dados:** arquivos do repositório, git diff, git log, documentos docs/, CHANGELOG, RELEASE_NOTES, registros do registry/.

### R-D02 — Nunca preencher lacunas por inferência

Se uma informação não puder ser comprovada por evidência verificável no repositório, o campo deve ser mantido com o valor atual. Não criar texto baseado em suposição, lógica dedutiva ou "o que provavelmente ocorreu".

### R-D03 — Sempre informar a origem dos dados

Ao alterar qualquer campo em `dados/projetos.js`, declarar explicitamente:
- Qual o valor anterior
- Qual o novo valor
- Qual o documento/evidência que comprova a alteração

### R-D04 — `dados/projetos.js` é arquivo crítico

Só pode ser alterado com autorização explícita do Anderson. Nenhuma alteração é feita "por conta própria" mesmo que Claude avalie ser uma melhoria.

---

## BLOCO 2 — Controle de Escopo

### R-E01 — Nunca alterar arquivos fora do escopo autorizado

Antes de qualquer fase, declarar explicitamente:
- Quais arquivos **serão** alterados
- Quais arquivos **não serão** alterados

Se surgir necessidade de alterar arquivo fora do escopo declarado: parar, comunicar ao Anderson, aguardar autorização.

### R-E02 — Arquivos proibidos sem autorização específica

| Arquivo | Motivo |
|---|---|
| `dados/projetos.js` | Fonte única de verdade — dado crítico |
| `assets/js/chart.umd.min.js` | Biblioteca local — não editar |
| Qualquer HTML/CSS/JS | Somente com escopo técnico explícito |
| Branch `publicacao-demandas-central-df` | Branch de produção v1 — nunca tocar |

### R-E03 — Separar documentação de código

Tarefas de documentação não alteram HTML, CSS, JS ou dados.  
Tarefas de código não alteram documentação sem escopo declarado.

---

## BLOCO 3 — Controle Git

### R-G01 — Nunca executar comandos críticos sem autorização

Comandos que requerem autorização explícita do Anderson:

```
git add (definitivo)   git commit   git push
git merge              git tag      git reset
git restore            git clean    git switch main
exclusão de branch     rollback
```

### R-G02 — Comandos autônomos permitidos

```
git status
git diff --name-only / --stat / --check
git branch --show-current
git log --oneline -5
node scripts/validar-funcional.js
scripts/validar-projeto.ps1 (leitura)
```

### R-G03 — Nunca tocar a branch protegida

A branch `publicacao-demandas-central-df` nunca recebe qualquer operação git, independente do motivo.

---

## BLOCO 4 — Processo de Entrega

### R-P01 — Executar checklist antes de finalizar

Antes de declarar qualquer fase concluída, verificar:

- [ ] Sintaxe JS válida: `node --check dados/projetos.js`
- [ ] Validador sem falhas: `node scripts/validar-funcional.js`
- [ ] Nenhum arquivo proibido alterado
- [ ] Nenhum dado inventado
- [ ] Origem de todos os dados declarada

### R-P02 — Informar arquivos alterados e não alterados

Toda entrega deve listar:
1. Arquivos **criados** nesta fase
2. Arquivos **alterados** nesta fase (com resumo das mudanças)
3. Arquivos **preservados** (escopo não tocado)

### R-P03 — Informar impactos

Para cada alteração técnica, declarar:
- Impacto funcional (o que muda para o usuário)
- Risco associado (baixo / médio / alto)
- Arquivos relacionados que podem ser afetados

### R-P04 — Padrão de entrega obrigatório (9 itens)

```
1. Objetivo executado
2. Arquivos criados
3. Arquivos alterados (com resumo técnico)
4. Arquivos não alterados (escopo preservado)
5. Comandos executados (git e scripts)
6. Resultado das validações (PASS/FAIL)
7. Riscos e observações
8. Pendências (requerem ação do Anderson)
9. Próximos passos recomendados (sem executar os críticos)
```

---

## BLOCO 5 — Fluxo Obrigatório

### R-F01 — Toda demanda técnica inicia por COI-MESTRE

Fluxo obrigatório antes de qualquer implementação:

```
  DEMANDA RECEBIDA
       │
       ▼
  COI-MESTRE ──┬──► COI-MEMORIA   (estado, alertas, histórico)
               ├──► COI-FORENSE   (evidências reais do repo)
               ├──► COI-LEARNINGS (erros anteriores, DAR)
               ├──► COI-ARQUITETO (plano, escopo, modo)
               │
               ▼
          COI-EXECUTOR (implementa)
               │
               ▼  ◄──────────────────────┐
          COI-TESTES  ──── FAIL ──────────┘ autocorrige
               │ PASS
               ▼
          COI-AUDITOR ──── REPROVADO ────┐ retorna
               │ APROVADO               └──► COI-EXECUTOR
               ▼
          COI-QA ──────── FAIL ──────────┐ retorna
               │ PASS                   └──► COI-EXECUTOR
               ▼
          COI-GOVERNANCA (atualiza docs de estado)
               │
               ▼
          COI-RELEASE-MANAGER (pacote 9 itens)
               │
               ▼
          ENTREGA PARA ANDERSON
```

Exceção: perguntas factuais sem entregável técnico não requerem o fluxo completo.

### R-F02 — Regra de autocorreção

Se qualquer validação falhar:
1. Identificar a causa
2. Corrigir o problema
3. Re-executar **todas** as validações
4. Repetir até aprovação completa

**Nunca entregar fase com erro conhecido.**

### R-F03 — Quando interromper obrigatoriamente

Parar e aguardar Anderson para:
- Alteração em `dados/projetos.js` sem autorização
- Alteração de arquitetura ou regras de negócio
- Exclusão de arquivos
- Rollback
- Conflito de merge
- Falha crítica sem solução identificada
- Commit / push / merge / tag / publicação em produção

---

## BLOCO 6 — Padrões de Escrita

### R-W01 — Usar Python3 para escrever arquivos .js e .ps1

```python
with open('arquivo.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(conteudo)
```

Motivo: ferramenta Write trunca arquivos com Unicode após ~306 linhas (E-007).

### R-W02 — Scripts .ps1 em ASCII puro

Arquivos `.ps1` não podem conter caracteres com código > 127 (sem acentos, cedilha, caracteres especiais).  
Motivo: PowerShell no Windows lê .ps1 com encoding diferente — não-ASCII causa erros de terminação.

### R-W03 — Usar `clearEl()` para limpar DOM

Proibido usar `innerHTML = ''` em código JavaScript do projeto.  
Usar sempre `clearEl(elemento)` que remove filhos via `removeChild`.

---

*Criado em: 2026-07-14 — Fase 6 (Governança do Projeto)*  
*Revisão: apenas por Anderson Pinheiro*  
*Índice da pasta: [docs/governanca/README.md](README.md)*
