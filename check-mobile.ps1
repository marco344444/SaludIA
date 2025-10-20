# Script de Verificacion Mobile PWA

Write-Host "Verificando configuracion movil de MediTranslate AI..." -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Verificar archivos esenciales
Write-Host "Verificando archivos esenciales..." -ForegroundColor Yellow

$requiredFiles = @(
    "client\index.html",
    "client\public\manifest.json",
    "client\public\service-worker.js",
    "client\src\main.tsx",
    "client\src\index.css"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  OK: $file" -ForegroundColor Green
    } else {
        Write-Host "  ERROR: $file - NO ENCONTRADO" -ForegroundColor Red
        $errors++
    }
}

# Verificar iconos PWA
Write-Host ""
Write-Host "Verificando iconos PWA..." -ForegroundColor Yellow

if (Test-Path "client\public\icon-192.png") {
    Write-Host "  OK: icon-192.png" -ForegroundColor Green
} else {
    Write-Host "  WARNING: icon-192.png - NO ENCONTRADO (genera los iconos)" -ForegroundColor DarkYellow
    $warnings++
}

if (Test-Path "client\public\icon-512.png") {
    Write-Host "  OK: icon-512.png" -ForegroundColor Green
} else {
    Write-Host "  WARNING: icon-512.png - NO ENCONTRADO (genera los iconos)" -ForegroundColor DarkYellow
    $warnings++
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RESUMEN:" -ForegroundColor Cyan
Write-Host "  Errores: $errors" -ForegroundColor $(if ($errors -gt 0) { "Red" } else { "Green" })
Write-Host "  Warnings: $warnings" -ForegroundColor $(if ($warnings -gt 0) { "Yellow" } else { "Green" })
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0) {
    Write-Host "La aplicacion esta lista para movil!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Proximos pasos:" -ForegroundColor Yellow
    Write-Host "  1. Genera los iconos PNG (ver ICON-GENERATION.md)" -ForegroundColor White
    Write-Host "  2. Ejecuta: npm run dev" -ForegroundColor White
    Write-Host "  3. Abre en tu movil o DevTools (Ctrl+Shift+M)" -ForegroundColor White
} else {
    Write-Host "Por favor corrige los errores antes de continuar" -ForegroundColor Red
}
