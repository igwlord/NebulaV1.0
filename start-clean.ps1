# 🌌 Script de inicio limpio para Nebula Financial
# Inicia el servidor HTTP sin inyeccion de codigo live-server

Write-Host "Iniciando Nebula Financial - Servidor Limpio" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Blue

# Verificar si Python esta disponible
$pythonAvailable = $false
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Python detectado: $pythonVersion" -ForegroundColor Green
        $pythonAvailable = $true
    }
} catch {
    Write-Host "Python no encontrado" -ForegroundColor Red
}

# Intentar con diferentes metodos
if ($pythonAvailable) {
    Write-Host "Iniciando servidor con Python..." -ForegroundColor Yellow
    Write-Host "Directorio: $PWD" -ForegroundColor Gray
    Write-Host "URL: http://localhost:8080" -ForegroundColor Green
    Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow
    Write-Host ""
    
    # Abrir navegador despues de un momento
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 2
        Start-Process "http://localhost:8080/index.html"
    } | Out-Null
    
    # Iniciar servidor Python
    python -m http.server 8080
    
} else {
    Write-Host "Python no disponible, abriendo archivo directamente..." -ForegroundColor Yellow
    
    # Abrir archivo directamente
    $htmlPath = Join-Path $PWD "index.html"
    if (Test-Path $htmlPath) {
        Write-Host "Abriendo: $htmlPath" -ForegroundColor Green
        Start-Process $htmlPath
    } else {
        Write-Host "Archivo index.html no encontrado" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Nebula Financial iniciado" -ForegroundColor Green
