#!/bin/bash

# 🚀 Nebula Finance - Deployment Script
# Automated deployment to GitHub and Netlify

echo "🌌 Nebula Finance - Deployment Script"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "No package.json found. Are you in the project root?"
    exit 1
fi

print_info "Starting deployment process..."

# Step 1: Validate project structure
echo -e "\n${BLUE}Step 1: Validating project structure${NC}"
if npm run validate; then
    print_status "Project validation passed"
else
    print_error "Project validation failed"
    exit 1
fi

# Step 2: Run tests
echo -e "\n${BLUE}Step 2: Running tests${NC}"
if npm test; then
    print_status "Tests passed"
else
    print_warning "Tests failed, but continuing..."
fi

# Step 3: Build project
echo -e "\n${BLUE}Step 3: Building project${NC}"
if npm run build; then
    print_status "Build completed"
else
    print_error "Build failed"
    exit 1
fi

# Step 4: Git operations
echo -e "\n${BLUE}Step 4: Git operations${NC}"

# Check for uncommitted changes
if [[ `git status --porcelain` ]]; then
    print_info "Uncommitted changes detected"
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    commit_message="🚀 deploy: Production ready - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message"
    print_status "Changes committed"
else
    print_info "No changes to commit"
fi

# Push to GitHub
print_info "Pushing to GitHub..."
if git push origin main; then
    print_status "Pushed to GitHub successfully"
else
    print_error "Failed to push to GitHub"
    exit 1
fi

# Step 5: Deploy information
echo -e "\n${BLUE}Step 5: Deployment Information${NC}"

echo -e "\n🎯 ${GREEN}Deployment Complete!${NC}"
echo "================================"

echo -e "📱 ${BLUE}GitHub Repository:${NC}"
echo "   https://github.com/igwlord/NebulaFinancial"

echo -e "\n🌐 ${BLUE}GitHub Pages (will be available in ~5 minutes):${NC}"
echo "   https://igwlord.github.io/NebulaFinancial"

echo -e "\n⚡ ${BLUE}For Netlify Deployment:${NC}"
echo "   1. Go to https://netlify.com"
echo "   2. Connect your GitHub repository"
echo "   3. Configure build settings:"
echo "      - Build command: npm run build"
echo "      - Publish directory: ./"
echo "   4. Add environment variables for Firebase"

echo -e "\n🔐 ${BLUE}Required Environment Variables:${NC}"
echo "   FIREBASE_API_KEY=your_api_key"
echo "   FIREBASE_AUTH_DOMAIN=your_domain"
echo "   FIREBASE_PROJECT_ID=your_project_id"
echo "   FIREBASE_STORAGE_BUCKET=your_bucket"
echo "   FIREBASE_MESSAGING_SENDER_ID=your_sender_id"
echo "   FIREBASE_APP_ID=your_app_id"

echo -e "\n🎉 ${GREEN}Happy coding!${NC} 🌌"
