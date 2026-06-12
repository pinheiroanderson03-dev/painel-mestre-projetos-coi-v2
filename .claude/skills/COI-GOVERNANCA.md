# COI-GOVERNANCA — Guardiao Documental

**Projeto:** Painel Mestre COI · Centro de Operacoes Integradas · GDF
**Fase de criacao:** 5T.2
**Tipo:** Skill de documentacao e estado

---

## Funcao

Garantir que toda alteracao tecnica seja acompanhada pela atualizacao correspondente
nos documentos de estado e historico do projeto.

Nenhuma fase deve ser commitada sem que os documentos estejam sincronizados com o codigo.

Esta skill e acionada APOS COI-QA (veredicto APROVADO) e ANTES de COI-RELEASE-MANAGER.

---

## Documentos de Responsabilidade

| Documento | Quando atualizar | O que registrar |
|---|---|---|
| `docs/ESTADO_ATUAL_DO_PROJETO.md` | A cada fase concluida | versao, branch, ultima tag, fases, arquivos criticos, proxima acao |
| `CHANGELOG.md` | A cada fase commitada | descricao tecnica detalhada das alteracoes |
| `RELEASE_NOTES.md` | A cada versao publicavel | descricao em linguagem executiva (usuario final) |
| `ROADMAP_COI.md` | A cada fase concluida | marcar fase como concluida; incluir proxima fase |
| `docs/MEMORIA_OPERACIONAL_PROJETO.md` | Quando mudar estado, tags ou scripts | tabela de fases, tags, scripts, regras rapidas |

---

## Checklist Documental Obrigatorio

Antes de passar para COI-RELEASE-MANAGER, verificar:

- [ ] ESTADO_ATUAL reflete a fase atual como "Em andamento" ou a fase anterior como "Concluida"
- [ ] ESTADO_ATUAL tem a ultima tag correta registrada
- [ ] ESTADO_ATUAL tem a proxima acao prevista atualizada
- [ ] CHANGELOG tem entrada para cada fase commitada (nao apenas a atual)
- [ ] RELEASE_NOTES tem entrada em linguagem executiva para versoes publicadas
- [ ] ROADMAP tem a fase atual com status correto (check ou emoji adequado)
- [ ] MEMORIA_OPERACIONAL tem a tabela de fases e tags atualizada
- [ ] Rodapes de todos os docs atualizados para a data e fase atuais

---

## Padroes de Escrita

### CHANGELOG.md
```markdown
## v1.X.Y -- Fase NNN: Titulo (AAAA-MM-DD)

### Categoria das alteracoes -- arquivos

- Descricao tecnica objetiva da alteracao
- Motivacao (por que foi feito)
- Impacto (o que mudou para o sistema)
```

### RELEASE_NOTES.md
```markdown
## v1.X.Y -- Titulo (Fase NNN)
**Data:** AAAA-MM-DD

### O que melhorou
Descricao em linguagem de usuario final. Sem jargao tecnico.

### O que nao muda
Funcionalidades existentes que continuam iguais.
```

### ESTADO_ATUAL_DO_PROJETO.md
Atualizar SOMENTE os campos que mudaram. Nao reescrever o documento inteiro.
Campos obrigatorios apos cada fase: "Ultima tag estavel", "Fase em execucao", "Proxima acao prevista".

---

## Saida Obrigatoria

Ao final:

```
=== RESULTADO COI-GOVERNANCA ===

Fase registrada em:    CHANGELOG.md [SIM|NAO|PARCIAL]
Estado atualizado em:  ESTADO_ATUAL_DO_PROJETO.md [SIM|NAO]
Tag sugerida:          [ex: v1.4.1-infraestrutura-qualidade] — [registrada|pendente]
Historico atualizado:  ROADMAP_COI.md [SIM|NAO] | MEMORIA_OPERACIONAL [SIM|NAO]
Notas para usuario:    RELEASE_NOTES.md [SIM|NAO|nao aplicavel]
Pendencias documentais: [nenhuma | lista]
```

---

## Condicao de Bloqueio

Parar e comunicar ao Anderson se:
- Ha mais de uma fase sem registro no CHANGELOG (acumulo historico)
- ESTADO_ATUAL ainda refere uma tag que nao existe
- ROADMAP tem fase marcada como "em andamento" que ja foi concluida ha mais de uma sessao
