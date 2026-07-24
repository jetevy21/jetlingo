@echo off
title JetLingo - Start
color 0B

echo.
echo ============================================================
echo     JETLINGO - Starting Development Servers
echo ============================================================
echo.

cd /d "%~dp0"

echo Starting Backend (port 3001)...
start "JetLingo Backend" cmd /k "cd /d %~dp0apps\backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend (port 3000)...
start "JetLingo Frontend" cmd /k "cd /d %~dp0apps\web && npm run dev"

echo.
echo ============================================================
echo     Frontend:  http://localhost:3000
echo     Backend:   http://localhost:3001
echo     Demo:      demo@jetlingo.app / demo1234
echo ============================================================
echo.
echo     Press any key to exit (servers keep running)...
pause >nul
