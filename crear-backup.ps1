# ====== SCRIPT DE BACKUP AUTOMÁTICO PARA SALUDIA ======
# Uso: .\crear-backup.ps1
# Crea un ZIP del proyecto SIN node_modules (más liviano y rápido)

$proyectoPath = "c:\Users\prada\Downloads\SaludIA\SaludIA"
$tempPath = "c:\Users\prada\Downloads\SaludIA-Temp-Backup"
$fecha = Get-Date -Format 'yyyy-MM-dd_HH-mm'
$zipPath = "c:\Users\prada\Downloads\SaludIA-Backup-$fecha.zip"

Write-Host ""
Write-Host "📦 ========================================" -ForegroundColor Cyan
Write-Host "   BACKUP AUTOMÁTICO DE SALUDIA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Crear carpeta temporal
Write-Host "📂 Creando carpeta temporal..." -ForegroundColor Yellow
New-Item -Path $tempPath -ItemType Directory -Force | Out-Null

# Copiar archivos necesarios
Write-Host "📋 Copiando archivos del proyecto..." -ForegroundColor Yellow
Write-Host "   ➜ client/" -ForegroundColor Gray
Copy-Item "$proyectoPath\client" -Destination "$tempPath\client" -Recurse -Force

Write-Host "   ➜ server/" -ForegroundColor Gray
Copy-Item "$proyectoPath\server" -Destination "$tempPath\server" -Recurse -Force

Write-Host "   ➜ shared/" -ForegroundColor Gray
Copy-Item "$proyectoPath\shared" -Destination "$tempPath\shared" -Recurse -Force

Write-Host "   ➜ Archivos de configuración" -ForegroundColor Gray
Copy-Item "$proyectoPath\*.json" -Destination "$tempPath\" -Force
Copy-Item "$proyectoPath\*.ts" -Destination "$tempPath\" -Force
Copy-Item "$proyectoPath\*.js" -Destination "$tempPath\" -Force
Copy-Item "$proyectoPath\*.md" -Destination "$tempPath\" -Force

# Comprimir
Write-Host ""
Write-Host "🗜️  Comprimiendo archivos..." -ForegroundColor Yellow
Compress-Archive -Path "$tempPath\*" -DestinationPath $zipPath -Force

# Limpiar
Write-Host "🧹 Limpiando archivos temporales..." -ForegroundColor Yellow
Remove-Item $tempPath -Recurse -Force

# Calcular tamaño
$tamanoBytes = (Get-Item $zipPath).Length
$tamanoMB = [math]::Round($tamanoBytes / 1MB, 2)

# Resultado
Write-Host ""
Write-Host "✅ ========================================" -ForegroundColor Green
Write-Host "   BACKUP CREADO EXITOSAMENTE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Ubicación:" -ForegroundColor White
Write-Host "   $zipPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Tamaño: $tamanoMB MB" -ForegroundColor White
Write-Host ""
Write-Host "📝 Contenido incluido:" -ForegroundColor White
Write-Host "   ✓ client/ (código frontend)" -ForegroundColor Gray
Write-Host "   ✓ server/ (código backend)" -ForegroundColor Gray
Write-Host "   ✓ shared/ (esquemas)" -ForegroundColor Gray
Write-Host "   ✓ Archivos de configuración (.json, .ts, .js)" -ForegroundColor Gray
Write-Host "   ✓ Documentación (.md)" -ForegroundColor Gray
Write-Host ""
Write-Host "❌ Excluido (se reinstala después):" -ForegroundColor White
Write-Host "   ✗ node_modules/ (~300 MB)" -ForegroundColor Gray
Write-Host "   ✗ dist/ (se genera con build)" -ForegroundColor Gray
Write-Host ""
Write-Host "🔄 Para restaurar en otra PC:" -ForegroundColor White
Write-Host "   1. Descomprime el ZIP" -ForegroundColor Cyan
Write-Host "   2. Abre PowerShell en la carpeta descomprimida" -ForegroundColor Cyan
Write-Host "   3. Ejecuta: npm install" -ForegroundColor Cyan
Write-Host "   4. Ejecuta: npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
