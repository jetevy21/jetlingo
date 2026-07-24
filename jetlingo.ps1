# ============================================================
#  JETLINGO - Script All-in-One
#  Usage: .\jetlingo.ps1 [setup|start|seed|reset|status|stop]
# ============================================================
param(
    [ValidateSet("setup","start","seed","reset","status","stop")]
    [string]$Command = "start"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendDir = Join-Path $Root "apps\backend"
$FrontendDir = Join-Path $Root "apps\web"

$PGHOST = "localhost"
$PGPORT = "5432"
$PGUSER = "postgres"
$PGPASS = "persevale"

$env:PGHOST = $PGHOST
$env:PGPORT = $PGPORT
$env:PGUSER = $PGUSER
$env:PGPASSWORD = $PGPASS
$env:DATABASE_URL = "postgresql://jetlingo:JetLingo2026!@localhost:5432/jetlingo"

function Write-Header($text) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "  $text" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Ok($text)    { Write-Host "  [OK] $text" -ForegroundColor Green }
function Write-Err($text)   { Write-Host "  [X] $text" -ForegroundColor Red }
function Write-Info($text)  { Write-Host "  [i] $text" -ForegroundColor Yellow }
function Write-Step($n,$total,$text) { Write-Host "[$n/$total] $text" -ForegroundColor White }

function Test-Port($port) {
    $tcp = New-Object System.Net.Sockets.TcpClient
    try { $tcp.Connect("127.0.0.1", $port); $tcp.Close(); return $true }
    catch { return $false }
}

function Invoke-Psql($sql) {
    & psql -U postgres -q -t -A -c $sql 2>&1
}

function Stop-Servers {
    Get-Process -Name "node" -ErrorAction SilentlyContinue |
        Where-Object { $_.CommandLine -match "jetlingo" -or $_.CommandLine -match "next dev" -or $_.CommandLine -match "tsx watch" } |
        Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Ok "All node processes stopped"
}

# ── SETUP ─────────────────────────────────────────────────────
function Invoke-Setup {
    Write-Header "JETLINGO SETUP"

    Write-Step 1 8 "Checking prerequisites..."
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Err "Node.js not found. Install from https://nodejs.org"; exit 1
    }
    $v = (node -v).Trim()
    Write-Ok "Node.js $v"

    $psql = Get-Command psql -ErrorAction SilentlyContinue
    if (-not $psql) {
        Write-Err "psql not found in PATH. Add PostgreSQL bin to PATH."
        Write-Info "Typical path: C:\Program Files\PostgreSQL\16\bin"
        exit 1
    }
    Write-Ok "psql found"

    Write-Step 2 8 "Installing root dependencies..."
    Push-Location $Root; npm install; Pop-Location
    Write-Ok "Root deps installed"

    Write-Step 3 8 "Installing backend dependencies..."
    Push-Location $BackendDir; npm install; Pop-Location
    Write-Ok "Backend deps installed"

    Write-Step 4 8 "Installing frontend dependencies..."
    Push-Location $FrontendDir; npm install; Pop-Location
    Write-Ok "Frontend deps installed"

    Write-Step 5 8 "Setting up .env files..."
    $backendEnv = Join-Path $BackendDir ".env"
    if (-not (Test-Path $backendEnv)) {
        $example = Join-Path $BackendDir ".env.example"
        if (Test-Path $example) { Copy-Item $example $backendEnv }
        else {
@"
DATABASE_URL=postgresql://jetlingo:JetLingo2026!@localhost:5432/jetlingo
JWT_SECRET=jl_jwt_k3y_2026_s3cur3_r4nd0m_h4sh
OPENAI_API_KEY=demo
PORT=3001
"@ | Set-Content $backendEnv -Encoding UTF8
        }
        Write-Ok "Backend .env created"
    } else { Write-Ok "Backend .env exists" }

    $frontendEnv = Join-Path $FrontendDir ".env.local"
    if (-not (Test-Path $frontendEnv)) {
@"
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=JetLingo
"@ | Set-Content $frontendEnv -Encoding UTF8
        Write-Ok "Frontend .env.local created"
    } else { Write-Ok "Frontend .env.local exists" }

    Write-Step 6 8 "Testing PostgreSQL connection..."
    try {
        $ver = Invoke-Psql "SELECT version();"
        Write-Ok "PostgreSQL connected"
    } catch {
        Write-Err "Cannot connect to PostgreSQL. Is the service running?"
        Write-Info "Start it: net start postgresql-x64-18"
        exit 1
    }

    Write-Step 7 8 "Creating database and user..."
    Invoke-Psql "CREATE USER jetlingo WITH PASSWORD 'JetLingo2026!' CREATEDB;" 2>$null
    Invoke-Psql "CREATE DATABASE jetlingo OWNER jetlingo;" 2>$null
    Invoke-Psql "GRANT ALL PRIVILEGES ON DATABASE jetlingo TO jetlingo;" 2>$null
    Write-Ok "Database ready"

    Write-Step 8 8 "Pushing schema + seeding..."
    Push-Location $BackendDir
    npm run db:push 2>$null
    npm run seed
    Pop-Location
    Write-Ok "Schema pushed and seeded"

    Write-Header "SETUP COMPLETE"
    Write-Ok "Frontend : http://localhost:3000"
    Write-Ok "Backend  : http://localhost:3001"
    Write-Ok "Demo     : demo@jetlingo.app / demo1234"
    Write-Host ""
    Write-Info "Run: .\jetlingo.ps1 start"
}

# ── START ─────────────────────────────────────────────────────
function Invoke-Start {
    Write-Header "JETLINGO - Starting Servers"

    if (Test-Port 3001) {
        Write-Info "Backend already running on :3001"
    } else {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BackendDir'; npm run dev" -WindowStyle Normal
        Write-Ok "Backend starting..."
    }

    if (Test-Port 3000) {
        Write-Info "Frontend already running on :3000"
    } else {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FrontendDir'; npm run dev" -WindowStyle Normal
        Write-Ok "Frontend starting..."
    }

    Write-Host ""
    Write-Ok "Frontend : http://localhost:3000"
    Write-Ok "Backend  : http://localhost:3001"
    Write-Ok "Demo     : demo@jetlingo.app / demo1234"
    Write-Host ""
}

# ── SEED ──────────────────────────────────────────────────────
function Invoke-Seed {
    Write-Header "JETLINGO - Database Seed"
    Push-Location $BackendDir
    npm run seed
    Pop-Location
}

# ── RESET ─────────────────────────────────────────────────────
function Invoke-Reset {
    Write-Header "JETLINGO - Database Reset"
    Write-Host "  This will DROP and recreate the database." -ForegroundColor Red
    Write-Host ""
    $confirm = Read-Host "  Type YES to confirm"
    if ($confirm -ne "YES") { Write-Info "Cancelled"; return }

    Invoke-Psql "DROP DATABASE IF EXISTS jetlingo;" 2>$null
    Invoke-Psql "CREATE DATABASE jetlingo OWNER jetlingo;" 2>$null
    Invoke-Psql "GRANT ALL PRIVILEGES ON DATABASE jetlingo TO jetlingo;" 2>$null
    Write-Ok "Database recreated"

    Push-Location $BackendDir
    npm run db:push
    npm run seed
    Pop-Location
    Write-Ok "Reset complete"
}

# ── STATUS ────────────────────────────────────────────────────
function Invoke-Status {
    Write-Header "JETLINGO - Status"
    $be = Test-Port 3001
    $fe = Test-Port 3000
    if ($be) { Write-Ok "Backend  : http://localhost:3001" } else { Write-Err "Backend  : not running" }
    if ($fe) { Write-Ok "Frontend : http://localhost:3000" } else { Write-Err "Frontend : not running" }
    Write-Host ""
}

# ── STOP ──────────────────────────────────────────────────────
function Invoke-Stop {
    Write-Header "JETLINGO - Stopping Servers"
    Stop-Servers
}

# ── DISPATCH ──────────────────────────────────────────────────
switch ($Command) {
    "setup"  { Invoke-Setup }
    "start"  { Invoke-Start }
    "seed"   { Invoke-Seed }
    "reset"  { Invoke-Reset }
    "status" { Invoke-Status }
    "stop"   { Invoke-Stop }
}
