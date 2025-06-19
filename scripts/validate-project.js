#!/usr/bin/env node

/**
 * 🧪 Nebula Finance - Validation Script
 * Validates project structure and dependencies
 */

const fs = require('fs');
const path = require('path');

console.log('🌌 Nebula Finance - Project Validation');
console.log('=====================================');

// Files that must exist
const requiredFiles = [
    'index.html',
    'index-LAB.html',
    'manifest.json',
    'sw.js',
    'netlify.toml',
    'package.json',
    'README.md',
    '.gitignore'
];

// Directories that must exist
const requiredDirs = [
    'js',
    'js/utils',
    'js/components',
    'js/modules',
    'test'
];

let errors = 0;

// Check required files
console.log('\n📁 Checking required files...');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        errors++;
    }
});

// Check required directories
console.log('\n📂 Checking required directories...');
requiredDirs.forEach(dir => {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        console.log(`✅ ${dir}/`);
    } else {
        console.log(`❌ ${dir}/ - MISSING`);
        errors++;
    }
});

// Check package.json structure
console.log('\n📦 Checking package.json...');
try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (pkg.name && pkg.version && pkg.description) {
        console.log('✅ Package.json structure valid');
    } else {
        console.log('❌ Package.json missing required fields');
        errors++;
    }
    
    if (pkg.scripts && pkg.scripts.start && pkg.scripts.build) {
        console.log('✅ Required scripts present');
    } else {
        console.log('❌ Required scripts missing');
        errors++;
    }
} catch (e) {
    console.log('❌ Package.json is invalid JSON');
    errors++;
}

// Check critical JavaScript files
console.log('\n🔧 Checking critical JS files...');
const criticalFiles = [
    'js/utils/security.js',
    'js/app.js'
];

criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`⚠️  ${file} - Optional but recommended`);
    }
});

// Check for security utils
console.log('\n🔒 Checking security implementation...');
if (fs.existsSync('js/utils/security.js')) {
    const securityContent = fs.readFileSync('js/utils/security.js', 'utf8');
    if (securityContent.includes('NebulaSecurityUtils') && 
        securityContent.includes('window.CryptoJS')) {
        console.log('✅ Security utils properly configured');
    } else {
        console.log('⚠️  Security utils may need configuration');
    }
} else {
    console.log('⚠️  Security utils not found');
}

// Final result
console.log('\n🎯 Validation Results');
console.log('===================');

if (errors === 0) {
    console.log('🎉 Project structure is valid!');
    console.log('🚀 Ready for deployment');
    process.exit(0);
} else {
    console.log(`❌ Found ${errors} errors`);
    console.log('🔧 Please fix the errors before deployment');
    process.exit(1);
}
