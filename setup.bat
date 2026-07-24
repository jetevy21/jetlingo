@echo off
title JetLingo - Setup
color 0B

echo.
echo ============================================================
echo     JETLINGO - AI Language Learning Platform
echo     Setup Script
echo ============================================================
echo.

cd /d "%~dp0"

REM === STEP 1: Check Prerequisites ===
echo [1/8] Checking prerequisites...

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo    [OK] Node.js %NODE_VERSION% found

REM === STEP 2: Install Root Dependencies ===
echo.
echo [2/8] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [X] Failed to install root dependencies
    pause
    exit /b 1
)
echo    [OK] Root dependencies installed

REM === STEP 3: Install Backend Dependencies ===
echo.
echo [3/8] Installing backend dependencies...
cd apps\backend
call npm install
if %errorlevel% neq 0 (
    echo [X] Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..\..
echo    [OK] Backend dependencies installed

REM === STEP 4: Install Frontend Dependencies ===
echo.
echo [4/8] Installing frontend dependencies...
cd apps\web
call npm install
if %errorlevel% neq 0 (
    echo [X] Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..\..
echo    [OK] Frontend dependencies installed

REM === STEP 5: Setup Environment Files ===
echo.
echo [5/8] Setting up environment files...

if not exist "apps\backend\.env" (
    echo    Creating backend .env from template...
    copy "apps\backend\.env.example" "apps\backend\.env" >nul
    echo    [OK] Backend .env created
) else (
    echo    [OK] Backend .env already exists
)

if not exist "apps\web\.env.local" (
    echo    Creating frontend .env.local...
    echo NEXT_PUBLIC_API_URL=http://localhost:3001> "apps\web\.env.local"
    echo NEXT_PUBLIC_APP_NAME=JetLingo>> "apps\web\.env.local"
    echo    [OK] Frontend .env.local created
) else (
    echo    [OK] Frontend .env.local already exists
)

REM === STEP 6: Check PostgreSQL ===
echo.
echo [6/8] Checking PostgreSQL connection...

set PGHOST=localhost
set PGPORT=5432
set PGUSER=postgres
set PGPASSWORD=persevale

psql -U postgres -c "SELECT 1" >nul 2>&1
if %errorlevel% neq 0 (
    echo    [!] Cannot connect to PostgreSQL.
    echo    Run these commands in psql:
    echo    --------------------------------------------------
    echo    CREATE USER jetlingo WITH PASSWORD 'JetLingo2026!';
    echo    CREATE DATABASE jetlingo OWNER jetlingo;
    echo    --------------------------------------------------
    echo.
    pause
) else (
    echo    [OK] PostgreSQL connected
    echo    Creating database and user...
    psql -U postgres -c "CREATE USER jetlingo WITH PASSWORD 'JetLingo2026!';" >nul 2>&1
    psql -U postgres -c "CREATE DATABASE jetlingo OWNER jetlingo;" >nul 2>&1
    psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE jetlingo TO jetlingo;" >nul 2>&1
    echo    [OK] Database 'jetlingo' ready
)

REM === STEP 7: Push Database Schema ===
echo.
echo [7/8] Pushing database schema...
cd apps\backend
call npx drizzle-kit push
if %errorlevel% neq 0 (
    echo [X] Failed to push schema. Make sure DATABASE_URL is correct in .env
    pause
    exit /b 1
)
cd ..\..
echo    [OK] Database schema pushed

REM === STEP 8: Seed Database ===
echo.
echo [8/8] Seeding database...
cd apps\backend
call npx tsx src/db/seed.ts
if %errorlevel% neq 0 (
    echo [!] Seed failed. You can run it manually later with: npm run seed
) else (
    echo    [OK] Database seeded successfully
)
cd ..\..

REM === DONE ===
echo.
echo ============================================================
echo     [OK] SETUP COMPLETE!
echo ============================================================
echo.
echo     Frontend:  http://localhost:3000
echo     Backend:   http://localhost:3001
echo     Demo user: demo@jetlingo.app / demo1234
echo.
echo     Starting development servers...
echo ============================================================
echo.

start "JetLingo Backend" cmd /k "cd /d %~dp0apps\backend && npm run dev"
timeout /t 3 /nobreak >nul
start "JetLingo Frontend" cmd /k "cd /d %~dp0apps\web && npm run dev"

echo.
echo     Press any key to exit this window (servers keep running)...
pause >nul
