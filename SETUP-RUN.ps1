# Petrol Pump Management System - Setup & Run Script
# Right-click -> Run with PowerShell (or run in terminal)

$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot

Write-Host "`n=== Petrol Pump Management System Setup ===`n" -ForegroundColor Cyan

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "Node: $(node -v) | NPM: $(npm -v)" -ForegroundColor Green

# Backend .env
$backendEnv = Join-Path $Root "backend\.env"
if (-not (Test-Path $backendEnv)) {
    Copy-Item (Join-Path $Root "backend\.env.example") $backendEnv
    Write-Host "Created backend\.env - EDIT DB_PASSWORD if MySQL has a password!" -ForegroundColor Yellow
}

# Frontend .env
$frontendEnv = Join-Path $Root "frontend\.env"
if (-not (Test-Path $frontendEnv)) {
    Copy-Item (Join-Path $Root "frontend\.env.example") $frontendEnv
}

# Install dependencies
Write-Host "`nInstalling backend packages..." -ForegroundColor Cyan
Set-Location (Join-Path $Root "backend")
npm install

Write-Host "`nInstalling frontend packages..." -ForegroundColor Cyan
Set-Location (Join-Path $Root "frontend")
npm install

# Seed database
Write-Host "`nSeeding database (requires MySQL running)..." -ForegroundColor Cyan
Set-Location (Join-Path $Root "backend")
npm run seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "`nSeed failed. Common fixes:" -ForegroundColor Yellow
    Write-Host "  1. Start MySQL (XAMPP/WAMP -> Start MySQL)"
    Write-Host "  2. Create DB: mysql -u root -p -e ""CREATE DATABASE petrol_pump_db;"""
    Write-Host "  3. Edit backend\.env -> set DB_PASSWORD=your_password"
    Write-Host "`nAfter fixing, run: cd backend && npm run seed`n"
}

Write-Host "`n=== Setup complete! ===`n" -ForegroundColor Green
Write-Host "To RUN the app, open TWO terminals:`n"
Write-Host "  Terminal 1 (Backend):  cd backend  && npm run dev"
Write-Host "  Terminal 2 (Frontend): cd frontend && npm run dev`n"
Write-Host "Then open: http://localhost:5173"
Write-Host "Login: admin@petrolpump.com / admin123`n"
