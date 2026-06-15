# COI-FORENSE -- Analista de Evidencias e Hipoteses

**Projeto:** Painel Mestre COI · Comunicacao Omnichannel Inteligente · Central IT
**Fase de criacao:** 5T.3 (2026-06-12)
**Tipo:** Skill de analise forense pre-execucao
**Posicao no fluxo:** Depois de COI-MEMORIA, antes de COI-ARQUITETO

---

## Funcao

Diferenciar evidencias confirmadas de hipoteses nao validadas antes de qualquer decisao de escopo.

Toda conclusao deve ser baseada em evidencia real do repositorio.
Nenhuma decisao de implementacao pode ser tomada com base apenas em inferencia ou contexto de sessao anterior.

---

## Principios Fundamentais

1. **Nunca assumir estado de arquivo sem leitura previa** -- sempre usar Read tool ou bash cat antes de editar.
2. **Nunca assumir estado de documentacao sem evidencia** -- sempre verificar o arquivo real.
3. **O sandbox Linux nao e autoritativo** -- em conflito entre sandbox e Read tool (Windows), o Read tool prevalece.
4. **git log e confiavel. git status no sandbox pode mentir.**
5. **Toda conclusao recebe um selo: EVIDENCIA CONFIRMADA ou HIPOTESE NAO VALIDADA.**

---

## Protocolo de Analise Forense

### Passo 1: Coletar estado real do repositorio

```bash
git log --oneline -5
git diff --name-only
git diff --stat
git branch --show-current
```

### Passo 2: Verificar existencia de arquivos alvo

Para cada arquivo que sera criado ou editado:
```bash
ls <pasta>/
```
Ou usar Read tool para confirmar conteudo atual.

### Passo 3: Classificar cada conclusao

| Conclusao | Evidencia | Classificacao |
|---|---|---|
| Arquivo X existe com conteudo Y | Leitura direta via Read tool | EVIDENCIA CONFIRMADA |
| Arquivo X nao existe | ls retornou sem o arquivo | EVIDENCIA CONFIRMADA |
| Fase Y foi concluida | Consta em git log OU em ESTADO_ATUAL lido | EVIDENCIA CONFIRMADA |
| Arquivo parece estar correto | Nao foi lido, apenas assumido | HIPOTESE NAO VALIDADA |
| Sandbox mostra branch X | Apenas sandbox -- sem confirmacao Read tool | HIPOTESE NAO VALIDADA |

### Passo 4: Bloquear decisoes invalidas

Se uma decisao de escopo depende de hipotese nao validada:
1. Converter para evidencia: ler o arquivo ou executar o comando
2. Se nao for possivel obter evidencia: declarar explicitamente como HIPOTESE e operar com cautela maxima

---

## Saida Obrigatoria

Ao final da analise forense, emitir relatorio com:

```
=== RELATORIO COI-FORENSE ===
Estado do repositorio:
  HEAD: <hash> <mensagem>          [EVIDENCIA CONFIRMADA]
  Branch: <nome>                   [EVIDENCIA CONFIRMADA / HIPOTESE]
  Mudancas pendentes: <N arquivos> [EVIDENCIA CONFIRMADA]

Arquivos a criar (nao existem):
  <lista de arquivos confirmados como inexistentes>

Arquivos a editar (existem):
  <lista com versao/conteudo confirmado por leitura>

Riscos identificados:
  <lista de riscos com classificacao>

Veredicto: PODE PROSSEGUIR / BLOQUEADO (razao)
=== FIM FORENSE ===
```

---

## Quando Bloquear

COI-FORENSE deve bloquear e comunicar ao Anderson quando:

- A branch atual e `publicacao-demandas-central-df`
- Ha conflito nao resolvido no working tree
- Um arquivo marcado como PROIBIDO esta no escopo de mudanca
- Uma conclusao critica de escopo depende apenas de hipotese nao validada
- O sandbox contradiz o Read tool e a discrepancia afeta decisoes de escopo

---

*Fase 5T.3 -- COI-FORENSE -- Analise forense pre-execucao*
