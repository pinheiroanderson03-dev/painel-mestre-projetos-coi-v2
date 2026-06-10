param()

Write-Host ""
Write-Host "=== COI - VALIDACAO DE DOCUMENTACAO E GOVERNANCA ===" -ForegroundColor Cyan
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

Write-Host "[ ARQUIVOS DE GOVERNANCA ]" -ForegroundColor Yellow
Write-Host ""

$arquivos = @(
    "AGENTS.md",
    "docs\PROTOCOLO_OPERACIONAL_AGENTES.md",
    "docs\REGISTRO_DE_ERROS_E_APRENDIZADOS.md"
)

foreach ($arq in $arquivos) {
    if (Test-Path $arq) {
        Write-Host "  OK: $arq" -ForegroundColor Green
    } else {
        Write-Host "  AUSENTE: $arq" -ForegroundColor Red
    }
}
Write-Host ""

Write-Host "[ TERMOS-CHAVE NA DOCUMENTACAO ]" -ForegroundColor Yellow
Write-Host ""

$termosMap = @(
    @{ padrao = "E-001";       rotulo = "E-001" },
    @{ padrao = "E-002";       rotulo = "E-002" },
    @{ padrao = "E-003";       rotulo = "E-003" },
    @{ padrao = "E-004";       rotulo = "E-004" },
    @{ padrao = "E-005";       rotulo = "E-005" },
    @{ padrao = "Modo R.pido"; rotulo = "Modo Rapido / Modo Rapido (acentuado)" },
    @{ padrao = "Modo Seguro"; rotulo = "Modo Seguro" },
    @{ padrao = "Modo Cr.tico";rotulo = "Modo Critico / Modo Critico (acentuado)" },
    @{ padrao = "Rollback";    rotulo = "Rollback" },
    @{ padrao = "PowerShell";  rotulo = "PowerShell" },
    @{ padrao = "Painel V2";   rotulo = "Painel V2" }
)

$fontes = @(
    "AGENTS.md",
    "docs\PROTOCOLO_OPERACIONAL_AGENTES.md",
    "docs\REGISTRO_DE_ERROS_E_APRENDIZADOS.md"
)

foreach ($item in $termosMap) {
    $achou = $false
    foreach ($arq in $fontes) {
        if (Test-Path $arq) {
            $match = Select-String -Path $arq -Pattern $item.padrao -Quiet -ErrorAction SilentlyContinue
            if ($match) { $achou = $true; break }
        }
    }
    if ($achou) {
        Write-Host "  OK: $($item.rotulo)" -ForegroundColor Green
    } else {
        Write-Host "  AUSENTE: $($item.rotulo)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Fim da validacao de documentacao. Nenhuma alteracao feita. ===" -ForegroundColor Cyan
Write-Host ""
