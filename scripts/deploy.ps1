# 🚀 Nebula Finance - Deployment Script for Windows
# PowerShell version of the deployment script

param(
    [switch]$SkipTests,
    [switch]$Force
)

Write-Host "🌌 Nebula Finance - Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Error "No package.json found. Are you in the project root?"
    exit 1
}

Write-Info "Starting deployment process..."

# Step 1: Validate project structure
Write-Host "`nStep 1: Validating project structure" -ForegroundColor Blue
try {
    npm run validate
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Project validation passed"
    } else {
        Write-Error "Project validation failed"
        exit 1
    }
} catch {
    Write-Error "Failed to run validation"
    exit 1
}

# Step 2: Run tests (optional)
if (-not $SkipTests) {
    Write-Host "`nStep 2: Running tests" -ForegroundColor Blue
    try {
        npm test
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Tests passed"
        } else {
            Write-Warning "Tests failed, but continuing..."
        }
    } catch {
        Write-Warning "Could not run tests, continuing..."
    }
}

# Step 3: Build project
Write-Host "`nStep 3: Building project" -ForegroundColor Blue
try {
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Build completed"
    } else {
        Write-Error "Build failed"
        exit 1
    }
} catch {
    Write-Error "Failed to run build"
    exit 1
}

# Step 4: Git operations
Write-Host "`nStep 4: Git operations" -ForegroundColor Blue

# Check for uncommitted changes
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Info "Uncommitted changes detected"
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "🚀 deploy: Production ready - $timestamp"
    git commit -m $commitMessage
    Write-Success "Changes committed"
} else {
    Write-Info "No changes to commit"
}

# Push to GitHub
Write-Info "Pushing to GitHub..."
try {
    git push origin main
    Write-Success "Pushed to GitHub successfully"
} catch {
    Write-Error "Failed to push to GitHub"
    if (-not $Force) {
        exit 1
    }
}

# Step 5: Deploy information
Write-Host "`nStep 5: Deployment Information" -ForegroundColor Blue

Write-Host "`n🎯 " -NoNewline -ForegroundColor White
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "================================"

Write-Host "`n📱 " -NoNewline -ForegroundColor White
Write-Host "GitHub Repository:" -ForegroundColor Blue
Write-Host "   https://github.com/igwlord/NebulaFinancial"

Write-Host "`n🌐 " -NoNewline -ForegroundColor White
Write-Host "GitHub Pages (will be available in ~5 minutes):" -ForegroundColor Blue
Write-Host "   https://igwlord.github.io/NebulaFinancial"

Write-Host "`n⚡ " -NoNewline -ForegroundColor White
Write-Host "For Netlify Deployment:" -ForegroundColor Blue
Write-Host "   1. Go to https://netlify.com"
Write-Host "   2. Connect your GitHub repository"
Write-Host "   3. Configure build settings:"
Write-Host "      - Build command: npm run build"
Write-Host "      - Publish directory: ./"
Write-Host "   4. Add environment variables for Firebase"

Write-Host "`n🔐 " -NoNewline -ForegroundColor White
Write-Host "Required Environment Variables:" -ForegroundColor Blue
Write-Host "   FIREBASE_API_KEY=your_api_key"
Write-Host "   FIREBASE_AUTH_DOMAIN=your_domain"
Write-Host "   FIREBASE_PROJECT_ID=your_project_id"
Write-Host "   FIREBASE_STORAGE_BUCKET=your_bucket"
Write-Host "   FIREBASE_MESSAGING_SENDER_ID=your_sender_id"
Write-Host "   FIREBASE_APP_ID=your_app_id"

Write-Host "`n🎉 " -NoNewline -ForegroundColor White
Write-Host "Happy coding! 🌌" -ForegroundColor Green

# Optional: Open GitHub repository
$openRepo = Read-Host "`nDo you want to open the GitHub repository? (y/N)"
if ($openRepo -eq 'y' -or $openRepo -eq 'Y') {
    Start-Process "https://github.com/igwlord/NebulaFinancial"
}
