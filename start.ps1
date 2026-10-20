# Gizli Madde — yerel sunucuyu arka planda başlatır.
# Kullanım:  .\start.ps1
# .env dosyasındaki anahtarı okur (bu dosya repoya girmez).

$ErrorActionPreference = "Stop"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $dir

# --- .env yükle ---
if (Test-Path ".env") {
  Get-Content ".env" | ForEach-Object {
    if ($_ -match '^\s*([^#=]+)=(.*)$') {
      [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), "Process")
    }
  }
}

$port = if ($env:PORT) { $env:PORT } else { "3000" }

# --- zaten ayaksa çık ---
$running = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($running) {
  "Sunucu zaten ayakta -> http://localhost:$port"
  exit 0
}

# --- başlat (detached: kabuk kapanınca da yaşamaya devam eder) ---
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $dir `
  -WindowStyle Hidden `
  -RedirectStandardOutput "$dir\server.log" `
  -RedirectStandardError  "$dir\server.err.log"

Start-Sleep -Seconds 2
try {
  $r = Invoke-WebRequest -Uri "http://localhost:$port/api/status" -UseBasicParsing -TimeoutSec 8
  "Sunucu ayakta -> http://localhost:$port"
  $r.Content
} catch {
  "Sunucu baslatilamadi. server.err.log:"
  Get-Content "$dir\server.err.log" -ErrorAction SilentlyContinue
}
