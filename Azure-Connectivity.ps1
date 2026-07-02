$ErrorActionPreference = 'Stop'

# ------------------------------------------------------------------
# Validate required environment variables
# ------------------------------------------------------------------

foreach ($var in @(
        'MY_APPREG_CLIENT_ID',
        'MY_APPREG_CERT_THUMBPRINT',
        'MY_APPREG_TENANT_ID'
    )) {

    # Resolve from process scope first, then fall back to User scope.
    # Always write into process scope so $env:VAR is populated for all
    # downstream code (Connect-AzAccount, az login, etc.).
    $value = [Environment]::GetEnvironmentVariable($var, 'Process')
    if ([string]::IsNullOrWhiteSpace($value)) {
        $value = [Environment]::GetEnvironmentVariable($var, 'User')
    }
    if ([string]::IsNullOrWhiteSpace($value)) {
        throw "Missing required environment variable: $var  (set it with: [Environment]::SetEnvironmentVariable('$var', '<value>', 'User'))"
    }
    [Environment]::SetEnvironmentVariable($var, $value, 'Process')
}


# ------------------------------------------------------------------
# Validate Azure PowerShell module
# ------------------------------------------------------------------

$azAccountsModule = Get-Module -ListAvailable -Name Az.Accounts |
    Sort-Object Version -Descending |
    Select-Object -First 1

if (-not $azAccountsModule) {
    throw "Azure PowerShell module 'Az.Accounts' is not installed."
}

Import-Module Az.Accounts -Force

# ------------------------------------------------------------------
# Validate Azure CLI
# ------------------------------------------------------------------

$azCli = Get-Command az -ErrorAction SilentlyContinue

if (-not $azCli) {
    throw "Azure CLI (az) is not installed or not found in PATH."
}

# ------------------------------------------------------------------
# Clear Azure PowerShell sessions
# ------------------------------------------------------------------

Write-Host "Clearing Azure PowerShell sessions..."

Disconnect-AzAccount -Scope Process -ErrorAction SilentlyContinue | Out-Null
Disconnect-AzAccount -Scope CurrentUser -ErrorAction SilentlyContinue | Out-Null

Clear-AzContext -Scope Process -Force -ErrorAction SilentlyContinue
Clear-AzContext -Scope CurrentUser -Force -ErrorAction SilentlyContinue

# ------------------------------------------------------------------
# Clear Azure CLI sessions
# ------------------------------------------------------------------

Write-Host "Clearing Azure CLI sessions..."

az logout --only-show-errors 2>$null
az account clear 2>$null
# Wipe the binary credential/token caches so no stale PEM path survives across logins.
# These are safe to delete — az login below re-creates them.
Remove-Item "$env:USERPROFILE\.azure\service_principal_entries.bin" -Force -ErrorAction SilentlyContinue
Remove-Item "$env:USERPROFILE\.azure\msal_token_cache.bin" -Force -ErrorAction SilentlyContinue

# ------------------------------------------------------------------
# Authenticate Azure PowerShell
# ------------------------------------------------------------------

Write-Host "Authenticating Azure PowerShell..."

$azContext = Connect-AzAccount `
    -ServicePrincipal `
    -Tenant $env:MY_APPREG_TENANT_ID `
    -ApplicationId $env:MY_APPREG_CLIENT_ID `
    -CertificateThumbprint $env:MY_APPREG_CERT_THUMBPRINT

# ------------------------------------------------------------------
# Resolve certificate for Azure CLI (--certificate expects PEM)
# ------------------------------------------------------------------

function Get-CertificateByThumbprint {
    param(
        [Parameter(Mandatory)] [string]$Thumbprint
    )

    $normalized = ($Thumbprint -replace '\s', '').ToUpperInvariant()
    $cert = Get-ChildItem -Path Cert:\CurrentUser\My -ErrorAction SilentlyContinue |
        Where-Object { $_.Thumbprint -eq $normalized } |
        Select-Object -First 1

    if (-not $cert) {
        $cert = Get-ChildItem -Path Cert:\LocalMachine\My -ErrorAction SilentlyContinue |
            Where-Object { $_.Thumbprint -eq $normalized } |
            Select-Object -First 1
    }

    return $cert
}

function Convert-CertificateToPemFile {
    param(
        [Parameter(Mandatory)] [System.Security.Cryptography.X509Certificates.X509Certificate2]$Certificate
    )

    if (-not $Certificate.HasPrivateKey) {
        throw "Certificate '$($Certificate.Thumbprint)' does not include a private key. Azure CLI SP login requires cert + private key PEM."
    }

    $rsaKey = [System.Security.Cryptography.X509Certificates.RSACertificateExtensions]::GetRSAPrivateKey($Certificate)
    $ecdsaKey = [System.Security.Cryptography.X509Certificates.ECDsaCertificateExtensions]::GetECDsaPrivateKey($Certificate)

    $privateKeyPem = $null
    if ($rsaKey) {
        try {
            $privateKeyPem = $rsaKey.ExportPkcs8PrivateKeyPem()
        } catch {
            throw "Private key export is blocked for thumbprint '$($Certificate.Thumbprint)'. Set MY_APPREG_CERT_PATH to a PEM file that contains both private key and certificate for Azure CLI login."
        }
    } elseif ($ecdsaKey) {
        try {
            $privateKeyPem = $ecdsaKey.ExportPkcs8PrivateKeyPem()
        } catch {
            throw "Private key export is blocked for thumbprint '$($Certificate.Thumbprint)'. Set MY_APPREG_CERT_PATH to a PEM file that contains both private key and certificate for Azure CLI login."
        }
    } else {
        throw "Unsupported certificate key type for thumbprint '$($Certificate.Thumbprint)'. Only RSA/ECDSA keys are supported."
    }

    $certPem = $null
    $exportCertPemMethod = $Certificate.GetType().GetMethod('ExportCertificatePem', [Type[]]@())
    if ($exportCertPemMethod) {
        $certPem = $Certificate.ExportCertificatePem()
    } else {
        $base64 = [Convert]::ToBase64String($Certificate.RawData)
        $wrapped = ($base64 -split '(.{1,64})' | Where-Object { $_ -and $_.Length -gt 0 }) -join [Environment]::NewLine
        $certPem = "-----BEGIN CERTIFICATE-----$([Environment]::NewLine)$wrapped$([Environment]::NewLine)-----END CERTIFICATE-----"
    }

    $pemPath = Join-Path ([System.IO.Path]::GetTempPath()) ("az-sp-cert-$($Certificate.Thumbprint.ToLowerInvariant()).pem")

    $pemContent = @(
        $privateKeyPem.TrimEnd()
        ''
        $certPem.TrimEnd()
    ) -join [Environment]::NewLine

    [System.IO.File]::WriteAllText($pemPath, $pemContent, [System.Text.UTF8Encoding]::new($false))
    return $pemPath
}

# ------------------------------------------------------------------
# Authenticate Azure CLI
# ------------------------------------------------------------------

Write-Host "Authenticating Azure CLI..."

$azCertificatePemPath = $null
$configuredPemPath = [System.Environment]::GetEnvironmentVariable('MY_APPREG_CERT_PATH')
if (-not [string]::IsNullOrWhiteSpace($configuredPemPath)) {
    if (-not (Test-Path -LiteralPath $configuredPemPath)) {
        throw "MY_APPREG_CERT_PATH is set but file does not exist: $configuredPemPath"
    }
    $azCertificatePemPath = $configuredPemPath
} else {
    $spCertificate = Get-CertificateByThumbprint -Thumbprint $env:MY_APPREG_CERT_THUMBPRINT
    if (-not $spCertificate) {
        throw "Certificate with thumbprint '$($env:MY_APPREG_CERT_THUMBPRINT)' not found in Cert:\CurrentUser\My or Cert:\LocalMachine\My. Set MY_APPREG_CERT_PATH to a PEM file as fallback."
    }
    $azCertificatePemPath = Convert-CertificateToPemFile -Certificate $spCertificate
}

az login `
    --service-principal `
    --username $env:MY_APPREG_CLIENT_ID `
    --tenant $env:MY_APPREG_TENANT_ID `
    --certificate $azCertificatePemPath `
    --only-show-errors | Out-Null

# Force az CLI to enumerate and cache the subscription list.
# After a fresh login (especially when token/SP caches were wiped),
# 'az account set --subscription' fails with "doesn't exist" unless
# the subscription list is populated first.
az account list --output none --only-show-errors 2>$null

# Expose the PEM path in process scope so subsequent az CLI calls can
# resolve the credential. Azure CLI stores the cert path in its session;
# the file must remain on disk for the lifetime of this process.
[Environment]::SetEnvironmentVariable('MY_APPREG_CERT_PATH', $azCertificatePemPath, 'Process')

# ------------------------------------------------------------------
# Validation
# ------------------------------------------------------------------

$currentAzContext = Get-AzContext

if (-not $currentAzContext) {
    throw "Azure PowerShell authentication verification failed."
}

$cliAccount = az account show --output json 2>$null | ConvertFrom-Json

if (-not $cliAccount) {
    throw "Azure CLI authentication verification failed."
}

Write-Host ""
Write-Host "Azure authentication successful." -ForegroundColor Green
Write-Host "PowerShell Account : $($currentAzContext.Account.Id)"
Write-Host "PowerShell Tenant  : $($currentAzContext.Tenant.Id)"
Write-Host "CLI Tenant         : $($cliAccount.tenantId)"
Write-Host ""