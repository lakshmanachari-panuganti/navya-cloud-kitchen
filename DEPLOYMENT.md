# 🍽️ Navya's Cloud Kitchen — Deployment & Architecture Guide

> A mobile-first, serverless food ordering web app built on Azure Static Web Apps  
> with integrated Azure Functions for payment processing.

---

## 📋 Table of Contents

1. [Application Stack](#-application-stack)
2. [Architecture Overview](#-architecture-overview)
3. [Azure Resources](#-azure-resources)
4. [Prerequisites](#-prerequisites)
5. [First-Time Infrastructure Setup](#-first-time-infrastructure-setup)
6. [Local Development](#-local-development)
7. [Deploy via Azure DevOps Pipeline](#-deploy-via-azure-devops-pipeline-recommended)
8. [Deploy via SWA CLI (Manual)](#-deploy-via-swa-cli-manual)
9. [Environment Variables & Secrets](#-environment-variables--secrets)
10. [Project Structure](#-project-structure)
11. [Post-Deployment Checklist](#-post-deployment-checklist)

---

## 🧱 Application Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | HTML5 + Vanilla CSS + JavaScript | Mobile-first, zero framework |
| **Backend API** | Azure Functions (Node.js 18 LTS) | Serverless, managed by SWA |
| **Hosting** | Azure Static Web Apps (Free tier) | Global CDN, auto-SSL |
| **Payments** | Razorpay | Order creation + signature verification |
| **Notifications** | WhatsApp deep link (`wa.me`) | Order confirmation to owner |
| **Order Storage** | Azure Table Storage | Lightweight NoSQL for order records |
| **Monitoring** | Azure Application Insights | API logs, errors, performance |
| **Fonts** | Google Fonts (Cormorant Garamond + Plus Jakarta Sans) | Loaded via CDN |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        USER / BROWSER                        │
│                 (Mobile-first PWA via HTTPS)                 │
└────────────────────────┬────────────────────────────────────┘
                         │  HTTPS (auto SSL via SWA)
┌────────────────────────▼────────────────────────────────────┐
│           Azure Static Web Apps (swa-navyascloudkitchen1-dev)│
│                                                             │
│  ┌──────────────────────┐   ┌──────────────────────────┐   │
│  │   Static Frontend    │   │   Managed Azure Functions │   │
│  │  index.html          │   │   /api/create-order       │   │
│  │  style.css           │   │   /api/verify-payment     │   │
│  │  app.js / config.js  │   │                           │   │
│  └──────────────────────┘   └───────────┬──────────────┘   │
└────────────────────────────────────────-│───────────────────┘
                                          │
          ┌───────────────────────────────┼──────────────────┐
          │                               │                  │
┌─────────▼──────────┐   ┌───────────────▼──────┐  ┌───────▼──────────┐
│      Razorpay      │   │  Azure Table Storage  │  │  App Insights    │
│  (Payment Gateway) │   │  stnavyascloudkitchen │  │  appi-navyas...  │
│  Orders + Verify   │   │  1dev                 │  │  (Monitoring)    │
└────────────────────┘   └───────────────────────┘  └──────────────────┘
```

**Request Flow:**
1. User browses menu → adds items → fills checkout form
2. Frontend calls `/api/create-order` → Azure Function creates Razorpay order
3. Razorpay payment modal opens in browser
4. On success, frontend calls `/api/verify-payment` → Function verifies HMAC signature
5. Order saved to Azure Table Storage
6. Success screen shown → WhatsApp share button sends order details to owner

---

## ☁️ Azure Resources

All resources follow a strict naming convention: `{type}-{appname}-{env}`

| Resource | Name | SKU / Tier | Purpose |
|---|---|---|---|
| **Resource Group** | `rg-navyascloudkitchen1-dev` | — | Container for all resources |
| **Static Web App** | `swa-navyascloudkitchen1-dev` | Free | Hosts frontend + managed Functions |
| **Storage Account** | `stnavyascloudkitchen1dev` | Standard LRS | Azure Table Storage for orders |
| **Application Insights** | `appi-navyascloudkitchen1-dev` | Pay-as-you-go | API monitoring & logging |

> **Note:** Azure Storage Account names do **not** allow hyphens — hence `stnavyascloudkitchen1dev` (no hyphens).

> **Note:** Azure Functions are **managed/integrated** inside the SWA — no separate Function App resource needed for the Free tier.

### Region
| Setting | Value |
|---|---|
| Resource Group Location | `Central India` |
| SWA Hosting Region | `East Asia` *(closest Free-tier SWA region to India)* |

---

## ✅ Prerequisites

Make sure these are installed on your machine before proceeding:

```powershell
# 1. Azure CLI
az --version        # Needs 2.50+

# 2. Node.js
node --version      # Needs 18.x LTS

# 3. npm
npm --version       # Needs 8+

# 4. SWA CLI (for manual deploy only)
npm install -g @azure/static-web-apps-cli

# 5. Login to Azure
az login
az account show     # Confirm correct subscription
```

---

## 🔧 First-Time Infrastructure Setup

> ⚠️ **Run this only once.** The script will exit if resources already exist.

```powershell
# Clone the repo
git clone <YOUR_REPO_URL>
cd navyaskitchen

# Run the infra deployment script
.\deploy_azure.ps1
```

The script will:
1. ✅ Check Azure CLI login
2. ✅ Verify resource names are available (exits if already exist)
3. 🔨 Create Storage Account (`stnavyascloudkitchen1dev`)
4. 🔨 Create Application Insights (`appi-navyascloudkitchen1-dev`)
5. 🔨 Create Static Web App (`swa-navyascloudkitchen1-dev`)
6. ⚙️ Configure App Settings (env vars) on SWA
7. 📋 Print the **SWA Deployment Token** — **save this!**

---

## 💻 Local Development

```powershell
# Step 1: Install API dependencies
cd api
npm install
cd ..

# Step 2: Copy AI-generated images into /images folder (first time only)
node copy-assets.js

# Step 3: Open index.html directly in browser
# Images auto-detect file:// vs https:// — no server needed for frontend
start index.html
```

> The `config.js` `IMAGE_BASE` auto-detection handles this:
> - `file://` → loads images from local brain folder path
> - `https://` → loads from `images/` folder (deployed)

To test the API functions locally:

```powershell
# Install SWA CLI globally
npm install -g @azure/static-web-apps-cli

# Start local emulator (runs both frontend + API functions together)
swa start ./ --api-location ./api
# Opens at: http://localhost:4280
```

---

## 🚀 Deploy via Azure DevOps Pipeline (Recommended)

This is the **recommended** approach — avoids SWA CLI binary issues on Windows.

### Step 1: Push code to repo

```powershell
cd navyaskitchen

# Copy images into the project first
node copy-assets.js

git add .
git commit -m "Deploy: Navya's Cloud Kitchen"
git push origin main
```

### Step 2: Get the SWA Deployment Token

```powershell
az staticwebapp secrets list `
  --name swa-navyascloudkitchen1-dev `
  --resource-group rg-navyascloudkitchen1-dev `
  --query "properties.apiKey" -o tsv
```

### Step 3: Add Secret in Azure DevOps

1. Go to **Azure DevOps → Pipelines → Library**
2. Click **+ Variable Group** → name it `navyaskitchen-secrets`
3. Add variable: `SWA_DEPLOYMENT_TOKEN` = *(paste token)*
4. Click 🔒 **lock icon** to mark as Secret
5. Save

### Step 4: Create the Pipeline

1. Go to **Azure DevOps → Pipelines → New Pipeline**
2. Select your repository
3. Choose **Existing Azure Pipelines YAML file**
4. Select `azure-pipelines.yml` from the repo root
5. Click **Run**

✅ Every future `git push` to `main` will **auto-deploy** frontend + API.

---

## 🖥️ Deploy via SWA CLI (Manual)

> Use this if you don't have Azure DevOps set up.

```powershell
# Step 1: Clear any corrupted SWA cache
Remove-Item -Recurse -Force "$env:USERPROFILE\.swa" -ErrorAction SilentlyContinue

# Step 2: Install fresh SWA CLI
npm uninstall -g @azure/static-web-apps-cli
npm install -g @azure/static-web-apps-cli@latest

# Step 3: Copy images
node copy-assets.js

# Step 4: Get deployment token
$apikey = az staticwebapp secrets list `
  --name swa-navyascloudkitchen1-dev `
  --resource-group rg-navyascloudkitchen1-dev `
  --query "properties.apiKey" -o tsv

# Step 5: Deploy
swa deploy ./ --api-location ./api --env production --deployment-token $apikey
```

---

## 🔐 Environment Variables & Secrets

These are configured on the SWA App Settings (not committed to code):

| Variable Name | Description | Where to get |
|---|---|---|
| `RAZORPAY_KEY_ID` | Razorpay Public Key | [Razorpay Dashboard](https://dashboard.razorpay.com) → Settings → API Keys |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret Key | Same as above — **never expose in frontend** |
| `AZURE_STORAGE_CONNECTION_STRING` | Table Storage connection | Azure Portal → Storage Account → Access Keys |

### Update secrets via Azure CLI:

```powershell
az staticwebapp appsettings set `
  --name swa-navyascloudkitchen1-dev `
  --resource-group rg-navyascloudkitchen1-dev `
  --setting-names `
    "RAZORPAY_KEY_ID=rzp_live_XXXXXXXX" `
    "RAZORPAY_KEY_SECRET=your_actual_secret" `
    "AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;..."
```

### Update frontend config:

Edit [`config.js`](./config.js):
```javascript
const CONFIG = {
    WHATSAPP_NUMBER: "918686216633",  // Owner's WhatsApp (with country code)
    RAZORPAY_KEY_ID: "rzp_live_XXXXXXXX",  // Public key only — safe in frontend
    CURRENCY: "INR",
    DELIVERY_CHARGE: 50,
    FREE_DELIVERY_THRESHOLD: 500
};
```

---

## 📁 Project Structure

```
navyaskitchen/
│
├── index.html              # Main app shell — single page
├── style.css               # All styles — mobile-first, responsive
├── app.js                  # Menu data, cart logic, payment flow
├── config.js               # App config (WhatsApp no., Razorpay key, thresholds)
│
├── api/                    # Azure Functions (serverless backend)
│   ├── host.json           # Functions runtime config
│   ├── package.json        # API dependencies (razorpay, @azure/data-tables)
│   ├── create-order/       # POST /api/create-order → creates Razorpay order
│   │   └── index.js
│   └── verify-payment/     # POST /api/verify-payment → verifies + saves order
│       └── index.js
│
├── images/                 # ⚠️ Generated by copy-assets.js before deploy
│   ├── hero.png            # Hero banner image
│   ├── logo.png            # Brand logo
│   └── *.png               # Product images (9 items)
│
├── copy-assets.js          # Script: copies AI images → images/ folder pre-deploy
├── deploy_azure.ps1        # Script: one-time Azure infra provisioning
├── azure-pipelines.yml     # Azure DevOps CI/CD pipeline definition
└── DEPLOYMENT.md           # This file
```

---

## ✔️ Post-Deployment Checklist

After deploying, verify the following:

- [ ] Visit your SWA URL: `https://swa-navyascloudkitchen1-dev.azurestaticapps.net`
- [ ] All 9 product images load correctly
- [ ] Hero banner image displays on mobile and desktop
- [ ] Category filter pills work (All / Health Podulu / Traditional / Sweets)
- [ ] Add to cart works — cart bar appears at bottom
- [ ] Cart drawer opens — items and bill summary correct
- [ ] Checkout form validates (name, phone, address, date)
- [ ] Razorpay payment modal opens (test mode)
- [ ] Success screen shows with WhatsApp share button
- [ ] WhatsApp share sends correct order summary to owner
- [ ] Check Application Insights for API logs: `appi-navyascloudkitchen1-dev`
- [ ] Replace `rzp_test_` key with `rzp_live_` key before going live

---

## 📞 Support

| Contact | Details |
|---|---|
| Owner WhatsApp | +91 86862 16633 |
| Azure Portal | [portal.azure.com](https://portal.azure.com) → `rg-navyascloudkitchen1-dev` |
| Razorpay Dashboard | [dashboard.razorpay.com](https://dashboard.razorpay.com) |

---

*Last updated: June 2026 | Built with ❤️ for Navya's Cloud Kitchen*
