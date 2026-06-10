param()

Write-Host ""
Write-Host "=== COI - VALIDACAO DO ARQUIVO DE DADOS ===" -ForegroundColor Cyan
Write-Host ""

$arquivoDados = "dados\projetos.js"

Write-Host "[ ARQUIVO DE DADOS ]" -ForegroundColor Yellow
if (Test-Path $arquivoDados) {
    Write-Host "  OK: $arquivoDados encontrado." -ForegroundColor Green
} else {
    Write-Host "  ERRO: $arquivoDados NAO encontrado." -ForegroundColor Red
    Write-Host ""
    exit 1
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
} else {
    Write-Host "  Nenhum arquivo com diferenca." -ForegroundColor DarkGray
}
Write-Host ""

Write-Host "git diff --stat:" -ForegroundColor DarkGray
$diffStat = git diff --stat 2>&1
if ($diffStat) {
    Write-Host "$diffStat"
} else {
    Write-Host "  Nenhuma diferenca encontrada." -ForegroundColor DarkGray
}
Write-Host ""

Write-Host "git diff --check:" -ForegroundColor DarkGray
$diffCheck = git diff --check 2>&1
$errosReais = @($diffCheck | Where-Object { $_ -notmatch "LF will be replaced by CRLF" })
if ($errosReais.Count -gt 0) {
    Write-Host "  ERRO: conflitos encontrados:" -ForegroundColor Red
    $errosReais | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
} elseif ($diffCheck) {
    Write-Host "  Aviso normal do Windows: LF/CRLF (nao e erro)." -ForegroundColor DarkYellow
} else {
    Write-Host "  OK: nenhum conflito encontrado." -ForegroundColor Green
}
Write-Host ""

Write-Host "[ VALIDACAO DE SINTAXE JS ]" -ForegroundColor Yellow
Write-Host ""

$nodeVer = node --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Node.js: $nodeVer" -ForegroundColor DarkGray
    Write-Host "  Executando: node --check .\$arquivoDados" -ForegroundColor DarkGray
    $nodeCheck = node --check ".\$arquivoDados" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  OK: sintaxe JavaScript valida." -ForegroundColor Green
    } else {
        Write-Host "  ERRO DE SINTAXE:" -ForegroundColor Red
        Write-Host "$nodeCheck" -ForegroundColor Red
    }
} else {
    Write-Host "  AVISO: Node.js nao encontrado. Execute manualmente: node --check .\$arquivoDados" -ForegroundColor DarkYellow
}
Write-Host ""

Write-Host "[ TERMOS-CHAVE EM dados/projetos.js ]" -ForegroundColor Yellow
Write-Host ""

$termos = @("execucoesMensais","Maio/2026","Junho/2026","execucaoMensal","totalAtividades","totalDemandas")

foreach ($termo in $termos) {
    $match = Select-String -Path $arquivoDados -Pattern $termo -Quiet -ErrorAction SilentlyContinue
    if ($match) {
        Write-Host "  OK: $termo" -ForegroundColor Green
    } else {
        Write-Host "  AUSENTE: $termo" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Fim da validacao de dados. Nenhuma alteracao foi feita. ===" -ForegroundColor Cyan
Write-Host ""
