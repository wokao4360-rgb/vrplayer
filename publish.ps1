# 发布脚本：构建并同步到 docs 目录
# 用法：.\publish.ps1

$ErrorActionPreference = "Stop"

Write-Host "Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Syncing dist to docs..." -ForegroundColor Cyan
robocopy .\dist .\docs /MIR /NFL /NDL /NJH /NJS
if ($LASTEXITCODE -ge 8) {
    Write-Host "Robocopy failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Staging changes..." -ForegroundColor Cyan
git add -A
if ($LASTEXITCODE -ne 0) {
    Write-Host "Git add failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Checking for changes..." -ForegroundColor Cyan
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit 0
}

Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m "fix: robust drag fab + add ai disclaimer"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Git commit failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Pushing to origin main..." -ForegroundColor Cyan
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Done!" -ForegroundColor Green

