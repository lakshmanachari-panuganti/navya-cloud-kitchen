<#
.SYNOPSIS
    Deploys Navya's Kitchen frontend + Azure Functions to Azure Static Web Apps.
    Invokes StaticSitesClient.exe directly, bypassing the SWA CLI remote metadata
    check that fails in restricted network environments.
#>

$BaseName = "navyascloudkitchen1"
$Environment = "dev"
$ResourceGroup = "rg-$BaseName-$Environment"
$SwaName = "swa-$BaseName-$Environment"
$ApiLanguage = "node"
$ApiVersion = "18"

# Resolve actual binary path from the cached metadata JSON (binary lives in a buildId subfolder)
$StaticSitesClientMetadata = "$env:USERPROFILE\.swa\deploy\StaticSitesClient.json"
if (Test-Path $StaticSitesClientMetadata) {
    $StaticSitesClientPath = (Get-Content $StaticSitesClientMetadata | ConvertFrom-Json).binary
} else {
    # Fallback: search recursively
    $found = Get-ChildItem "$env:USERPROFILE\.swa\deploy" -Recurse -Filter "StaticSitesClient.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
    $StaticSitesClientPath = if ($found) { $found.FullName } else { $null }
}

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Navya's Kitchen — Function App Deployment Script   " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# ── 1. Azure CLI Login Check ──────────────────────────────────────────────────
Write-Host "`n[1/5] Checking Azure CLI login..." -ForegroundColor Yellow
$account = az account show --query name -o tsv 2>$null
if (-not $account) {
    Write-Host "ERROR: Not logged in. Run 'az login' first." -ForegroundColor Red
    exit 1
}
Write-Host "      Logged in: $account" -ForegroundColor Green

# ── 2. Verify SWA exists ──────────────────────────────────────────────────────
Write-Host "`n[2/5] Verifying Static Web App '$SwaName'..." -ForegroundColor Yellow
$swaHostname = az staticwebapp show `
    --name $SwaName `
    --resource-group $ResourceGroup `
    --query defaultHostname -o tsv 2>$null

if (-not $swaHostname) {
    Write-Host "ERROR: Static Web App '$SwaName' not found in '$ResourceGroup'." -ForegroundColor Red
    Write-Host "       Run .\deploy_azure.ps1 first to provision infrastructure." -ForegroundColor Red
    exit 1
}
Write-Host "      Found: https://$swaHostname" -ForegroundColor Green

# ── 3. Fetch Deployment Token ─────────────────────────────────────────────────
Write-Host "`n[3/5] Fetching deployment token..." -ForegroundColor Yellow
$DeploymentToken = az staticwebapp secrets list `
    --name $SwaName `
    --resource-group $ResourceGroup `
    --query "properties.apiKey" -o tsv 2>$null

if (-not $DeploymentToken) {
    Write-Host "ERROR: Could not retrieve deployment token." -ForegroundColor Red
    exit 1
}
Write-Host "      Token retrieved ($($DeploymentToken.Length) chars)." -ForegroundColor Green

# ── 4. Prepare Assets ─────────────────────────────────────────────────────────
Write-Host "`n[4/5] Preparing assets..." -ForegroundColor Yellow

$ProjectRoot = $PSScriptRoot

# Install API dependencies
Write-Host "      Installing API dependencies..."
Push-Location "$ProjectRoot\api"
npm install --silent 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: npm install reported issues." -ForegroundColor Yellow
}
Pop-Location
Write-Host "      API dependencies ready." -ForegroundColor Green

# Copy images if copy-assets.js exists
if (Test-Path "$ProjectRoot\copy-assets.js") {
    Write-Host "      Copying assets (copy-assets.js)..."
    node "$ProjectRoot\copy-assets.js" 2>&1 | Out-Null
    Write-Host "      Assets copied." -ForegroundColor Green
}

# Stage only frontend files into a slim folder so the app zip excludes
# api/node_modules (~13 MB) and deploy scripts — keeping upload well within
# the 5-minute SAS token window.
$StagingDir = "$ProjectRoot\_swa_deploy"
Write-Host "      Staging frontend files → _swa_deploy/ ..."
if (Test-Path $StagingDir) { Remove-Item $StagingDir -Recurse -Force }
New-Item -ItemType Directory -Path $StagingDir | Out-Null

# Copy static frontend files
foreach ($file in @("index.html", "style.css", "app.js", "config.js")) {
    if (Test-Path "$ProjectRoot\$file") {
        Copy-Item "$ProjectRoot\$file" "$StagingDir\" -Force
    }
}
# Copy images folder if present
if (Test-Path "$ProjectRoot\images") {
    Copy-Item "$ProjectRoot\images" "$StagingDir\images" -Recurse -Force
}
$stagingSize = (Get-ChildItem $StagingDir -Recurse | Measure-Object -Property Length -Sum).Sum
Write-Host "      Staging complete — $([Math]::Round($stagingSize/1MB, 1)) MB (vs 22 MB full dir)." -ForegroundColor Green

# ── 5. Deploy via StaticSitesClient ───────────────────────────────────────────
Write-Host "`n[5/5] Deploying to Azure Static Web Apps..." -ForegroundColor Yellow

if (-not (Test-Path $StaticSitesClientPath)) {
    Write-Host "      StaticSitesClient.exe not found at:" -ForegroundColor Red
    Write-Host "        $StaticSitesClientPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "      Run the following to download it, then re-run this script:" -ForegroundColor Yellow
    Write-Host "        npm uninstall -g @azure/static-web-apps-cli" -ForegroundColor White
    Write-Host "        npm install -g @azure/static-web-apps-cli@latest" -ForegroundColor White
    Write-Host "        swa deploy ./ --api-location ./api --env production --deployment-token `$token" -ForegroundColor White
    Write-Host "      (This one-time run downloads the binary to the cache.)" -ForegroundColor Gray
    exit 1
}

Write-Host "      Using: $StaticSitesClientPath" -ForegroundColor Gray

# Set env vars directly — child process inherits them, output streams to console in real-time.
# WorkingDirectory is changed to $env:TEMP so StaticSitesClient CWD != APP_LOCATION (required by the tool).
$env:DEPLOYMENT_ACTION = "upload"
$env:DEPLOYMENT_PROVIDER = "SwaCli"
$env:REPOSITORY_BASE = $ProjectRoot
$env:APP_LOCATION = "_swa_deploy"   # slim staging folder — no node_modules
$env:API_LOCATION = "api"
$env:SKIP_APP_BUILD = "true"
$env:SKIP_API_BUILD = "true"
$env:DEPLOYMENT_TOKEN = $DeploymentToken
$env:FUNCTION_LANGUAGE = $ApiLanguage
$env:FUNCTION_LANGUAGE_VERSION = $ApiVersion
$env:VERBOSE = "true"
# DEPLOYMENT_ENVIRONMENT intentionally omitted → production

Push-Location $env:TEMP
& $StaticSitesClientPath
$exitCode = $LASTEXITCODE
Pop-Location

# Clean up staging folder and session env vars
Remove-Item $StagingDir -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item Env:DEPLOYMENT_TOKEN -ErrorAction SilentlyContinue
Remove-Item Env:DEPLOYMENT_ACTION, Env:DEPLOYMENT_PROVIDER, Env:REPOSITORY_BASE,
Env:APP_LOCATION, Env:API_LOCATION, Env:SKIP_APP_BUILD, Env:SKIP_API_BUILD,
Env:FUNCTION_LANGUAGE, Env:FUNCTION_LANGUAGE_VERSION, Env:VERBOSE -ErrorAction SilentlyContinue

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "======================================================" -ForegroundColor Cyan
    Write-Host "  Deployment Successful!" -ForegroundColor Green
    Write-Host "======================================================" -ForegroundColor Cyan
    Write-Host "  Site URL : https://$swaHostname" -ForegroundColor Green
    Write-Host "  API Base : https://$swaHostname/api/" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Post-deployment checklist:" -ForegroundColor Cyan
    Write-Host "    [ ] Browse https://$swaHostname" -ForegroundColor White
    Write-Host "    [ ] Test /api/create-order  (Razorpay order creation)" -ForegroundColor White
    Write-Host "    [ ] Test /api/verify-payment (HMAC verification)" -ForegroundColor White
    Write-Host "    [ ] Check App Insights: appi-$BaseName-$Environment" -ForegroundColor White
} else {
    Write-Host "  Deployment Failed (exit code $exitCode)." -ForegroundColor Red
    Write-Host ""
    Write-Host "  Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "    1. Confirm Razorpay + Storage keys are set on the SWA:" -ForegroundColor White
    Write-Host "       az staticwebapp appsettings list --name $SwaName --resource-group $ResourceGroup" -ForegroundColor Gray
    Write-Host "    2. Clear the SWA cache and re-download the binary:" -ForegroundColor White
    Write-Host "       Remove-Item -Recurse -Force `"`$env:USERPROFILE\.swa`"" -ForegroundColor Gray
    Write-Host "       npm install -g @azure/static-web-apps-cli@latest" -ForegroundColor Gray
    Write-Host "    3. Try the SWA CLI directly:" -ForegroundColor White
    Write-Host "       swa deploy ./ --api-location ./api --env production --deployment-token <token>" -ForegroundColor Gray
    exit $exitCode
}
