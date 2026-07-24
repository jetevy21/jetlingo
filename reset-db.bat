@echo off
title JetLingo - Reset Database
color 0C

echo.
echo ============================================================
echo     JETLINGO - Database Reset
echo ============================================================
echo.
echo     This will DROP and recreate the database.
echo     All data will be lost!
echo.
echo     Press any key to continue, or close this window to cancel...
pause >nul

cd /d "%~dp0apps\backend"

set PGHOST=localhost
set PGPORT=5432
set PGUSER=postgres
set PGPASSWORD=persevale

echo.
echo [1/3] Dropping database...
psql -U postgres -c "DROP DATABASE IF EXISTS jetlingo;" >nul 2>&1

echo [2/3] Creating database...
psql -U postgres -c "CREATE DATABASE jetlingo OWNER jetlingo;" >nul 2>&1
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE jetlingo TO jetlingo;" >nul 2>&1

echo [3/3] Pushing schema and seeding...
call npx drizzle-kit push
call npx tsx src/db/seed.ts

echo.
echo ============================================================
echo     [OK] Database reset complete!
echo ============================================================
echo.
pause
