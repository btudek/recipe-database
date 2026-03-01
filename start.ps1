# Recipe Database Startup Script

Write-Host "Starting Recipe Database..." -ForegroundColor Green
Write-Host ""

# Start API server
Write-Host "Starting API server on port 8080..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\apps\api'; node --import tsx src/app.ts" -WindowStyle Normal

Start-Sleep -Seconds 3

# Start Web server
Write-Host "Starting Web server on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\apps\web'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "Recipe Database is starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Web UI:   http://localhost:3000" -ForegroundColor Cyan
Write-Host "API:      http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
