# COI-LEARNINGS -- Consultor de Aprendizados e Prevencao de Erros

**Projeto:** Painel Mestre COI · Comunicacao Omnichannel Inteligente · Central IT
**Fase de criacao:** 5T.3 (2026-06-12)
**Tipo:** Skill de prevencao por aprendizado continuo
**Posicao no fluxo:** Depois de COI-ARQUITETO, antes de COI-EXECUTOR

---

## Funcao

Consultar o historico de erros, decisoes arquiteturais e base de conhecimento evolutiva antes de qualquer implementacao.
Impedir a repeticao de erros ja registrados.
Emitir lista de lembretes obrigatorios para o COI-EXECUTOR.

---

## Fontes de Consulta (obrigatorias)

| Fonte | Caminho | O que buscar |
|---|---|---|
| Registro de Erros | `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` | Erros E-001 a E-NNN e aprendizados A-001 a A-NNN |
| Base Evolutiva | `docs/BASE_DE_CONHECIMENTO_EVOLUTIVA.md` | Padroes aprovados e anti-padroes |
| Decisoes Arquiteturais | `docs/DECISOES_ARQUITETURAIS_COI.md` | DAR-001 a DAR-NNN |

---

## Erros Criticos Permanentes (memorizar)

Estes erros devem ser verificados em TODA execucao, independente do escopo:

| Codigo | Regra | Origem |
|---|---|---|
| E-001 | Nunca preencher dados sem fonte real confirmada | REGISTRO |
| E-002 | Nunca alterar arquivo fora do escopo sem comunicar | REGISTRO |
| E-006A | Scripts .ps1: ASCII puro obrigatorio (sem acentos) | REGISTRO |
| E-007 | Scripts .js: NUNCA usar Write tool. Sempre bash cat heredoc | REGISTRO |
| DAR-002 | dados/projetos.js: unica fonte de verdade. Nunca alterar sem autorizacao | DECISOES |

---

## Protocolo de Consulta

### Passo 1: Identificar erros relevantes para a tarefa atual

Para cada arquivo que o COI-EXECUTOR vai modificar:
- Buscar no REGISTRO se houve erro anterior neste arquivo
- Buscar no REGISTRO se houve erro no tipo de operacao (criar arquivo, editar JS, editar PS1)

### Passo 2: Verificar anti-padroes na BASE_DE_CONHECIMENTO_EVOLUTIVA

- O tipo de mudanca usa algum anti-padrao listado?
- Existe padrao aprovado para esta situacao?

### Passo 3: Verificar decisoes arquiteturais relevantes

- A mudanca respeita todas as DAR ativas?
- Alguma DAR proibe ou condiciona a abordagem planejada?

### Passo 4: Emitir lembretes para COI-EXECUTOR

---

## Saida Obrigatoria

```
=== LEMBRETES COI-LEARNINGS ===
Erros anteriores relevantes:
  [E-XXX] <descricao do risco> -- <regra a aplicar>

Anti-padroes a evitar nesta tarefa:
  [AP-XXX] <anti-padrao> -- <alternativa correta>

Decisoes arquiteturais aplicaveis:
  [DAR-XXX] <decisao> -- <impacto na tarefa>

Veredicto: PODE PROSSEGUIR / BLOQUEADO (razao)
=== FIM LEARNINGS ===
```

---

## Quando Bloquear

COI-LEARNINGS deve bloquear e comunicar ao Anderson quando:

- O plano do COI-EXECUTOR repete um erro ja registrado com solucao conhecida
- O plano viola uma decisao arquitetural ativa (DAR)
- O plano usa um anti-padrao critico listado na BASE_DE_CONHECIMENTO_EVOLUTIVA

---

## Registro Automatico

Apos cada fase concluida, COI-LEARNINGS deve verificar se algum aprendizado novo deve ser registrado em:
- `docs/REGISTRO_DE_ERROS_E_APRENDIZADOS.md` (erros e aprendizados positivos)
- `docs/BASE_DE_CONHECIMENTO_EVOLUTIVA.md` (padroes e solucoes)
- `docs/DECISOES_ARQUITETURAIS_COI.md` (decisoes de arquitetura)

---

*Fase 5T.3 -- COI-LEARNINGS -- Prevencao por aprendizado continuo*
