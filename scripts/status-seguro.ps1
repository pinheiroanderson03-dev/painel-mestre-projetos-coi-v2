param()

Write-Host ""
Write-Host "=== COI - STATUS SEGURO DO REPOSITORIO ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "[ BRANCH ATUAL ]" -ForegroundColor Yellow
$branch = git branch --show-current 2>&1
Write-Host "  $branch" -ForegroundColor Green
Write-Host ""

Write-Host "[ STATUS ]" -ForegroundColor Yellow
git status 2>&1
Write-Host ""

$pendentes = git status --porcelain 2>&1
if ($pendentes) {
    Write-Host "ATENCAO: existem arquivos modificados ou nao rastreados." -ForegroundColor DarkYellow
} else {
    Write-Host "OK: working tree limpo." -ForegroundColor Green
}
Write-Host ""

Write-Host "[ ULTIMOS 5 COMMITS ]" -ForegroundColor Yellow
git log --oneline -5 2>&1
Write-Host ""

Write-Host "[ TAGS v1.4.1 ]" -ForegroundColor Yellow
$tags = git tag --list "v1.4.1*" 2>&1
if ($tags) {
    Write-Host "$tags" -ForegroundColor Green
} else {
    Write-Host "  Nenhuma tag v1.4.1 encontrada." -ForegroundColor DarkGray
}
Write-Host ""

Write-Host "=== Fim do status-seguro. Nenhuma alteracao realizada. ===" -ForegroundColor Cyan
Write-Host ""
