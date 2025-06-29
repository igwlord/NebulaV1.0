/**
 * 🔍 NEBULA VALIDATION SUITE - Sistema de Validación Automática
 * Valida sintaxis, dependencias y configuración antes del deploy
 */

const fs = require('fs');
const path = require('path');

class NebulaValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.passed = [];
        this.projectPath = './';
    }

    /**
     * 🚀 Ejecutar todas las validaciones
     */
    async runAllValidations() {
        console.log('🔍 Iniciando Validación Completa de Nebula...\n');
        
        await this.validateHTMLSyntax();
        await this.validateJavaScriptModules();
        await this.validateCSSFiles();
        await this.validateDependencies();
        await this.validateConfiguration();
        
        this.showResults();
        return this.errors.length === 0;
    }

    /**
     * ✅ Validar sintaxis HTML y JavaScript embebido
     */
    async validateHTMLSyntax() {
        try {
            const htmlFiles = ['index.html', 'index LAB.html'];
            
            for (const file of htmlFiles) {
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, 'utf8');
                    
                    // Verificar template literals no cerrados
                    const templateLiterals = content.match(/`/g);
                    if (templateLiterals && templateLiterals.length % 2 !== 0) {
                        this.errors.push(`❌ ${file}: Template literal no cerrado`);
                    } else {
                        this.passed.push(`✅ ${file}: Sintaxis válida`);
                    }
                    
                    // Verificar etiquetas HTML balanceadas
                    const openTags = content.match(/<[^\/][^>]*>/g) || [];
                    const closeTags = content.match(/<\/[^>]*>/g) || [];
                    
                    if (Math.abs(openTags.length - closeTags.length) > 10) {
                        this.warnings.push(`⚠️ ${file}: Posible desbalance de etiquetas HTML`);
                    }
                }
            }
        } catch (error) {
            this.errors.push(`❌ Error validando HTML: ${error.message}`);
        }
    }

    /**
     * 📦 Validar módulos JavaScript
     */
    async validateJavaScriptModules() {
        try {
            const modulesDirs = ['js/modules', 'js/components', 'js/utils', 'js/core'];
            
            for (const dir of modulesDirs) {
                if (fs.existsSync(dir)) {
                    const files = fs.readdirSync(dir);
                    const jsFiles = files.filter(file => file.endsWith('.js'));
                    
                    for (const file of jsFiles) {
                        const content = fs.readFileSync(path.join(dir, file), 'utf8');
                        
                        // Verificar sintaxis básica
                        const brackets = content.match(/[{}]/g) || [];
                        const openBrackets = brackets.filter(b => b === '{').length;
                        const closeBrackets = brackets.filter(b => b === '}').length;
                        
                        if (openBrackets !== closeBrackets) {
                            this.errors.push(`❌ ${dir}/${file}: Llaves desbalanceadas`);
                        } else {
                            this.passed.push(`✅ ${dir}/${file}: Sintaxis válida`);
                        }
                    }
                }
            }
        } catch (error) {
            this.errors.push(`❌ Error validando módulos JS: ${error.message}`);
        }
    }

    /**
     * 🎨 Validar archivos CSS
     */
    async validateCSSFiles() {
        try {
            const cssDir = 'css';
            const requiredFiles = [
                'production-tailwind.css',
                'styles.css',
                'components.css'
            ];
            
            for (const file of requiredFiles) {
                const filePath = path.join(cssDir, file);
                if (fs.existsSync(filePath)) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    if (content.trim().length > 0) {
                        this.passed.push(`✅ CSS: ${file} existe y tiene contenido`);
                    } else {
                        this.warnings.push(`⚠️ CSS: ${file} está vacío`);
                    }
                } else {
                    this.warnings.push(`⚠️ CSS: ${file} no encontrado`);
                }
            }
        } catch (error) {
            this.errors.push(`❌ Error validando CSS: ${error.message}`);
        }
    }

    /**
     * 📋 Validar dependencias y configuración
     */
    async validateDependencies() {
        try {
            // Verificar package.json
            if (fs.existsSync('package.json')) {
                const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
                
                if (pkg.dependencies && pkg.devDependencies) {
                    this.passed.push(`✅ package.json: Dependencias definidas`);
                } else {
                    this.warnings.push(`⚠️ package.json: Faltan dependencias`);
                }
            } else {
                this.warnings.push(`⚠️ package.json no encontrado`);
            }
            
            // Verificar manifest.json
            if (fs.existsSync('manifest.json')) {
                const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
                
                if (manifest.name && manifest.version && manifest.icons) {
                    this.passed.push(`✅ manifest.json: Configuración PWA válida`);
                } else {
                    this.warnings.push(`⚠️ manifest.json: Configuración incompleta`);
                }
            }
        } catch (error) {
            this.errors.push(`❌ Error validando dependencias: ${error.message}`);
        }
    }

    /**
     * ⚙️ Validar configuración del proyecto
     */
    async validateConfiguration() {
        try {
            // Verificar archivos de configuración
            const configFiles = [
                'tailwind.config.js',
                'netlify.toml',
                'sw.js'
            ];
            
            for (const file of configFiles) {
                if (fs.existsSync(file)) {
                    this.passed.push(`✅ Config: ${file} presente`);
                } else {
                    this.warnings.push(`⚠️ Config: ${file} no encontrado`);
                }
            }
        } catch (error) {
            this.errors.push(`❌ Error validando configuración: ${error.message}`);
        }
    }

    /**
     * 📊 Mostrar resultados de validación
     */
    showResults() {
        console.log('\n' + '='.repeat(60));
        console.log('🎯 RESULTADOS DE VALIDACIÓN NEBULA');
        console.log('='.repeat(60));
        
        if (this.passed.length > 0) {
            console.log('\n✅ VALIDACIONES EXITOSAS:');
            this.passed.forEach(msg => console.log(`   ${msg}`));
        }
        
        if (this.warnings.length > 0) {
            console.log('\n⚠️ ADVERTENCIAS:');
            this.warnings.forEach(msg => console.log(`   ${msg}`));
        }
        
        if (this.errors.length > 0) {
            console.log('\n❌ ERRORES CRÍTICOS:');
            this.errors.forEach(msg => console.log(`   ${msg}`));
        }
        
        console.log('\n' + '='.repeat(60));
        console.log(`📊 RESUMEN: ${this.passed.length} ✅ | ${this.warnings.length} ⚠️ | ${this.errors.length} ❌`);
        
        if (this.errors.length === 0) {
            console.log('🎉 ¡PROYECTO LISTO PARA DEPLOY!');
        } else {
            console.log('🚨 CORRIJE LOS ERRORES ANTES DEL DEPLOY');
        }
        console.log('='.repeat(60));
    }
}

// 🚀 Ejecutar validación
if (require.main === module) {
    const validator = new NebulaValidator();
    validator.runAllValidations().then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = NebulaValidator;
