# 🚀 Script de Verificación Mobile PWA

Write-Host "🔍 Verificando configuración móvil de MediTranslate AI..." -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()

# Verificar archivos esenciales
Write-Host "📋 Verificando archivos esenciales..." -ForegroundColor Yellow

$requiredFiles = @(
    "client\index.html",
    "client\public\manifest.json",
    "client\public\service-worker.js",
    "client\public\icon.svg",
    "client\src\main.tsx",
    "client\src\index.css"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - NO ENCONTRADO" -ForegroundColor Red
        $errors += "Falta archivo: $file"
    }
}

# Verificar iconos PWA
Write-Host ""
Write-Host "🎨 Verificando iconos PWA..." -ForegroundColor Yellow

if (Test-Path "client\public\icon-192.png") {
    Write-Host "  ✅ icon-192.png" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  icon-192.png - NO ENCONTRADO (genera los iconos)" -ForegroundColor DarkYellow
    $warnings += "Genera los iconos PNG desde icon.svg (ver ICON-GENERATION.md)"
}

if (Test-Path "client\public\icon-512.png") {
    Write-Host "  ✅ icon-512.png" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  icon-512.png - NO ENCONTRADO (genera los iconos)" -ForegroundColor DarkYellow
}

# Verificar contenido del manifest
Write-Host ""
Write-Host "📱 Verificando manifest.json..." -ForegroundColor Yellow

if (Test-Path "client\public\manifest.json") {
    $manifest = Get-Content "client\public\manifest.json" -Raw | ConvertFrom-Json
    
    if ($manifest.name) {
        Write-Host "  ✅ Nombre: $($manifest.name)" -ForegroundColor Green
    }
    if ($manifest.theme_color) {
        Write-Host "  ✅ Color tema: $($manifest.theme_color)" -ForegroundColor Green
    }
    if ($manifest.display) {
        Write-Host "  ✅ Modo display: $($manifest.display)" -ForegroundColor Green
    }
}

# Verificar meta tags en index.html
Write-Host ""
Write-Host "🏷️  Verificando meta tags móviles..." -ForegroundColor Yellow

if (Test-Path "client\index.html") {
    $html = Get-Content "client\index.html" -Raw
    
    $metaTags = @(
        "viewport",
        "theme-color",
        "apple-mobile-web-app-capable",
        "manifest"
    )
    
    foreach ($tag in $metaTags) {
        if ($html -match $tag) {
            Write-Host "  ✅ Meta tag: $tag" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Meta tag faltante: $tag" -ForegroundColor Red
            $errors += "Falta meta tag: $tag"
        }
    }
}

# Verificar clases CSS móviles
Write-Host ""
Write-Host "🎨 Verificando estilos móviles..." -ForegroundColor Yellow

if (Test-Path "client\src\index.css") {
    $css = Get-Content "client\src\index.css" -Raw
    
    $mobileClasses = @(
        "safe-top",
        "safe-bottom",
        "mobile-scroll",
        "touch-manipulation"
    )
    
    $foundClasses = 0
    foreach ($class in $mobileClasses) {
        if ($css -match $class) {
            $foundClasses++
        }
    }
    
    Write-Host "  ✅ Clases móviles encontradas: $foundClasses/$($mobileClasses.Length)" -ForegroundColor Green
}

# Verificar Service Worker registration
Write-Host ""
Write-Host "⚙️  Verificando registro de Service Worker..." -ForegroundColor Yellow

if (Test-Path "client\src\main.tsx") {
    $mainContent = Get-Content "client\src\main.tsx" -Raw
    
    if ($mainContent -match "serviceWorker") {
        Write-Host "  ✅ Service Worker registrado en main.tsx" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Service Worker NO registrado" -ForegroundColor Red
        $errors += "Service Worker no está registrado en main.tsx"
    }
}

# Resumen
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE VERIFICACIÓN" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "🎉 ¡TODO PERFECTO! La aplicación está lista para móvil" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "  1. Genera los iconos PNG (ver ICON-GENERATION.md)" -ForegroundColor White
    Write-Host "  2. Ejecuta: npm run dev" -ForegroundColor White
    Write-Host "  3. Abre http://localhost:5000 en tu móvil" -ForegroundColor White
    Write-Host "  4. Instala la PWA desde el menú del navegador" -ForegroundColor White
} else {
    if ($errors.Count -gt 0) {
        Write-Host "❌ ERRORES ENCONTRADOS ($($errors.Count)):" -ForegroundColor Red
        foreach ($error in $errors) {
            Write-Host "  • $error" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "⚠️  ADVERTENCIAS ($($warnings.Count)):" -ForegroundColor DarkYellow
        foreach ($warning in $warnings) {
            Write-Host "  • $warning" -ForegroundColor DarkYellow
        }
        Write-Host ""
    }
    
    Write-Host "💡 Consulta MOBILE-README.md para más información" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
