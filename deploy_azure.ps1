<#
.SYNOPSIS
Deploys the Azure Infrastructure for Navya's Cloud Kitchen.
Requires Azure CLI (az) to be installed and logged in.
#>

$BaseName = "navyascloudkitchen1"
$Environment = "prd"
$ResourceGroup = "rg-$BaseName-$Environment"

# Central India is usually best for Indian-based cloud kitchens for lower latency
$Location = "centralindia"

# Standard Azure Naming Conventions
$AppInsightsName = "appi-$BaseName-$Environment"
$SwaName = "swa-$BaseName-$Environment"

# Note: Azure Storage Accounts ONLY allow lowercase letters and numbers (no hyphens). 
# So 'st-navyaskitchen-dev' is invalid. We format it to 'stnavyaskitchendev'
$StorageAccountName = "st$BaseName$Environment"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " Deploying Navya's Kitchen Infrastructure to Azure" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# 0. Check if user is logged into Azure CLI
Write-Host "Checking Azure CLI Login..."
$account = az account show --query name -o tsv 2>$null
if (-not $account) {
    Write-Host "Error: You are not logged into Azure CLI. Please run 'az login' first." -ForegroundColor Red
    exit
}
Write-Host "Logged in to subscription: $account" -ForegroundColor Green

# Pre-flight Check: Verify if resources already exist
Write-Host "`nPerforming Pre-flight Checks..." -ForegroundColor Cyan

# Check Storage Account (Global namespace)
$saAvailable = az storage account check-name --name $StorageAccountName --query nameAvailable -o tsv
if ($saAvailable -eq "false") {
    Write-Host "Error: Storage Account name '$StorageAccountName' is already taken or exists. Please provide a different BaseName slug." -ForegroundColor Red
    exit
}

# Check Static Web App
$swaExists = az staticwebapp show --name $SwaName --resource-group $ResourceGroup --query name -o tsv 2>$null
if ($swaExists) {
    Write-Host "Error: Static Web App '$SwaName' already exists in this resource group. Please provide a different BaseName slug." -ForegroundColor Red
    exit
}

Write-Host "Pre-flight checks passed. Names are available.`n" -ForegroundColor Green

# 1. Create Azure Storage Account (for Table Storage Order tracking)
Write-Host "`n1. Creating Storage Account: $StorageAccountName ..."
az storage account create `
    --name $StorageAccountName `
    --resource-group $ResourceGroup `
    --location $Location `
    --sku Standard_LRS `
    --allow-blob-public-access false | Out-Null

Write-Host "Fetching Storage Connection String..."
$StorageConnString = az storage account show-connection-string --name $StorageAccountName --resource-group $ResourceGroup --query connectionString --output tsv

# 2. Create Application Insights (for API Monitoring)
Write-Host "`n2. Creating Application Insights: $AppInsightsName ..."
az monitor app-insights component create `
    --app $AppInsightsName `
    --location $Location `
    --kind web `
    --resource-group $ResourceGroup `
    --application-type web | Out-Null

# 3. Create Azure Static Web App (Free Tier)
Write-Host "`n3. Creating Static Web App (Free Tier): $SwaName ..."
# Note: Since SWA locations are limited for the Free tier hosting endpoint, 'centralindia' is supported for Standard, but 'eastasia' is the closest Free tier region. 
# The CLI will default to a valid region if centralindia isn't valid for SWA. We'll specify eastasia.
az staticwebapp create `
    --name $SwaName `
    --resource-group $ResourceGroup `
    --location eastasia `
    --sku Free | Out-Null

# 4. Apply Application Settings (Environment Variables) to SWA
Write-Host "`n4. Configuring Static Web App Environment Settings..."
az staticwebapp appsettings set `
    --name $SwaName `
    --resource-group $ResourceGroup `
    --setting-names "AZURE_STORAGE_CONNECTION_STRING=$StorageConnString" "RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXX" "RAZORPAY_KEY_SECRET=dummy_secret_do_not_use" | Out-Null

# 5. Get Deployment Token
Write-Host "`nFetching SWA Deployment Token..."
$SwaToken = az staticwebapp secrets list --name $SwaName --resource-group $ResourceGroup --query "properties.apiKey" -o tsv

Write-Host "`n======================================================" -ForegroundColor Cyan
Write-Host " Deployment Complete! " -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "Storage Account       : $StorageAccountName"
Write-Host "Static Web App        : $SwaName"
Write-Host "SWA Deployment Token  : $SwaToken"
Write-Host ""
Write-Host "To deploy the application code, use the Azure Static Web Apps CLI (swa-cli):" -ForegroundColor Yellow
Write-Host "1. npm install -g @azure/static-web-apps-cli"
Write-Host "2. swa deploy ./ --api-location ./api --env production --deployment-token `"$SwaToken`""
