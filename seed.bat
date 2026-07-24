@echo off
title JetLingo - Seed Database
color 0B

echo.
echo ============================================================
echo     JETLINGO - Database Seed
echo ============================================================
echo.

cd /d "%~dp0apps\backend"

set PGHOST=localhost
set PGPORT=5432
set PGUSER=postgres
set PGPASSWORD=persevale

echo Seeding database with avatars, lessons, and demo user...
echo.

call npx tsx src/db/seed.ts

if %errorlevel% neq 0 (
    echo.
    echo [X] Seed failed! Make sure PostgreSQL is running and .env is configured.
) else (
    echo.
    echo ============================================================
    echo     [OK] Seed completed successfully!
    echo ============================================================
    echo.
    echo     Database contents:
    echo       - 42 avatars (9 languages)
    echo       - 48 lessons
    echo       - 1 demo user
    echo       - 8 dictionary words
    echo       - 2 demo conversations
    echo.
    echo     Demo login: demo@jetlingo.app / demo1234
    echo ============================================================
)

echo.
pause
