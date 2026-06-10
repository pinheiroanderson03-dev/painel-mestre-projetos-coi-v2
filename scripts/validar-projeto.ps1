param()

Write-Host ""
Write-Host "=== COI - VALIDACAO GERAL DO PROJETO ===" -ForegroundColor Cyan
Write-Host "Execute antes de qualquer commit ou push." -ForegroundColor Cyan
Write-Host ""

$erros  = 0
$avisos = 0

Write-Host "[ BRANCH ATUAL ]" -ForegroundColor Yellow
$branch = git branch --show-current 2>&1
Write-Host "  $branch" -ForegroundColor Green
if ($branch -eq "publicacao-demandas-central-df") {
    Write-Host "  ALERTA CRITICO: branch de producao. Nao faca commit nem push." -ForegroundColor Red
    $erros++
}
Write-Host ""

Write-Host "[ ESTADO GIT ]" -ForegroundColor Yellow
Write-Host ""
Write-Host "git status:" -ForegroundColor DarkGray
git status 2>&1
Write-Host ""

Write-Host "git diff --name-only:" -ForegroundColor DarkGray
$diffNames = git diff --name-only 2>&1
if ($diffNames) {
    Write-Host "$diffNames" -ForegroundColor DarkYellow
    $avisos++
} else {
    Write-Host "  Nenhum arquivo com diferenca." -ForegroundColor DarkGray
}
Write-Host ""

Write-Host "git diff --stat:" -ForegroundColor DarkGray
$diffStat = git diff --stat 2>&1
if ($diffStat) {
    Write-Host "$diffStat"
} else {
    Write-Host "  Nenhuma diferenca." -ForegroundColor DarkGray
}
Write-Host ""

Write-Host "git diff --check:" -ForegroundColor DarkGray
$diffCheck = git diff --check 2>&1
$errosReais = @($diffCheck | Where-Object { $_ -notmatch "LF will be replaced by CRLF" })
if ($errosReais.Count -gt 0) {
    Write-Host "  ERRO: conflitos encontrados:" -ForegroundColor Red
    $errosReais | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    $erros++
} elseif ($diffCheck) {
    Write-Host "  Aviso normal do Windows: LF/CRLF (nao e erro)." -ForegroundColor DarkYellow
    $avisos++
} else {
    Write-Host "  OK: nenhum conflito encontrado." -ForegroundColor Green
}
Write-Host ""

Write-Host "[ VALIDACAO DE SINTAXE JS ]" -ForegroundColor Yellow
Write-Host ""
$arquivoDados = "dados\projetos.js"
$nodeVer = node --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Node.js: $nodeVer" -ForegroundColor DarkGray
    if (Test-Path $arquivoDados) {
        $nodeCheck = node --check ".\$arquivoDados" 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  OK: $arquivoDados sintaxe valida." -ForegroundColor Green
        } else {
            Write-Host "  ERRO DE SINTAXE em $arquivoDados" -ForegroundColor Red
            Write-Host "$nodeCheck" -ForegroundColor Red
            $erros++
        }
    } else {
        Write-Host "  AUSENTE: $arquivoDados nao encontrado." -ForegroundColor Red
        $erros++
    }
} else {
    Write-Host "  AVISO: Node.js nao encontrado. Valide manualmente: node --check .\$arquivoDados" -ForegroundColor DarkYellow
    $avisos++
}
Write-Host ""

Write-Host "[ ARQUIVOS PRINCIPAIS DO PROJETO ]" -ForegroundColor Yellow
Write-Host ""

$arquivos = @(
    "index.html",
    "portfolio.html",
    "dados\projetos.js",
    "assets\style.css",
    "CHANGELOG.md",
    "RELEASE_NOTES.md",
    "ROADMAP_COI.md",
    "AGENTS.md"
)

foreach ($arq in $arquivos) {
    if (Test-Path $arq) {
        Write-Host "  OK: $arq" -ForegroundColor Green
    } else {
        Write-Host "  AUSENTE: $arq" -ForegroundColor Red
        $erros++
    }
}
Write-Host ""

Write-Host "=== RESUMO DA VALIDACAO ===" -ForegroundColor Cyan
if ($erros -gt 0) {
    Write-Host "  RESULTADO: $erros erro(s). Corrija antes de continuar." -ForegroundColor Red
} elseif ($avisos -gt 0) {
    Write-Host "  RESULTADO: $avisos aviso(s). Revise os itens acima." -ForegroundColor DarkYellow
} else {
    Write-Host "  RESULTADO: Nenhum erro encontrado." -ForegroundColor Green
}
Write-Host ""
Write-Host "  Se nao houve erros, envie o retorno desta validacao" -ForegroundColor DarkGray
Write-Host "  para revisao antes de autorizar o commit." -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Nenhuma alteracao foi realizada por este script." -ForegroundColor Cyan
Write-Host ""
