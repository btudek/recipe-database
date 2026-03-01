@echo off
echo Starting Recipe Database...
echo.

echo Starting API server on port 8080...
start "API Server" cmd /k "cd %~dp0apps\api && node --import tsx src/app.ts"

echo Waiting for API to start...
timeout /t 3 /nobreak >nul

echo Starting Web server on port 3000...
start "Web Server" cmd /k "cd %~dp0apps\web && npm run dev"

echo.
echo ==========================================
echo Recipe Database is starting!
echo.
echo Web UI:   http://localhost:3000
echo API:      http://localhost:8080
echo.
echo Press any key to exit this window (servers will keep running)...
pause >nul
