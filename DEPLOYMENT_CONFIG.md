# 🚀 Nebula Finance - Configuration Files

## GitHub Actions para Deploy Automático

### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install --production
    
    - name: Build
      run: npm run build
      env:
        FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
        FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## Variables de Entorno para Producción

### .env.example
```
# Firebase Configuration
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxxx

# App Configuration
APP_ENV=production
APP_URL=https://your-domain.com
```

## Netlify Deploy Settings

### Build Configuration
- Build command: `npm run build` (o dejar vacío)
- Publish directory: `./`
- Node version: `18`

### Environment Variables (Netlify Dashboard)
```
FIREBASE_API_KEY = your_actual_api_key
FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
FIREBASE_PROJECT_ID = your-project-id
FIREBASE_STORAGE_BUCKET = your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID = 123456789
FIREBASE_APP_ID = 1:123456789:web:xxxxxxxxxxxxx
```

## GitHub Repository Settings

### 1. Secrets Configuration
GitHub Repo → Settings → Secrets and variables → Actions

Add these secrets:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`  
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

### 2. Pages Configuration
Settings → Pages → Source: GitHub Actions

## Performance Optimizations

### Headers Configuration (netlify.toml)
```toml
[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

## Security Headers

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```
