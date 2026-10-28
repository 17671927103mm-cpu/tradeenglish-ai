$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$tradeNode = Get-Command node -ErrorAction SilentlyContinue
if (-not $tradeNode) { throw '请先安装 Node.js 20.9 或以上版本。' }
if (Test-Path -LiteralPath "$PSScriptRoot/node_modules/next/dist/bin/next") {
  & node "$PSScriptRoot/node_modules/next/dist/bin/next" dev --hostname 0.0.0.0
} else {
  $tradeNpm = Get-Command npm -ErrorAction SilentlyContinue
  if ($tradeNpm) { & npm install; if ($LASTEXITCODE -eq 0) { & npm run dev } }
  else { throw '请先安装依赖：npm install，或使用 pnpm install。' }
}
