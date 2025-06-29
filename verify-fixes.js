#!/usr/bin/env node

/**
 * 🔍 VERIFICADOR FINAL DE CORRECCIONES NEBULA
 * Valida que todos los errores críticos hayan sido resueltos
 */

const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, 'index.html');

function verifyFixes() {
    console.log('🔍 Verificando correcciones aplicadas...\n');
    
    try {
        const content = fs.readFileSync(HTML_FILE, 'utf8');
        const issues = [];
        
        // 1. Verificar que startNebula no se use más
        if (content.includes('startNebula()')) {
            issues.push('❌ startNebula() aún se está llamando');
        } else {
            console.log('✅ startNebula() eliminado correctamente');
        }
        
        // 2. Verificar que initializeApp esté definida
        if (content.includes('function initializeApp()')) {
            console.log('✅ function initializeApp() definida');
        } else {
            issues.push('❌ function initializeApp() no encontrada');
        }
        
        // 3. Verificar que validateNebula esté definida
        if (content.includes('function validateNebula()')) {
            console.log('✅ function validateNebula() definida');
        } else {
            issues.push('❌ function validateNebula() no encontrada');
        }
        
        // 4. Verificar template literals corregidos
        const badTemplates = content.match(/`[^`]*"[^`]*`/g);
        if (badTemplates && badTemplates.length > 0) {
            issues.push(`❌ ${badTemplates.length} template literals con comillas dobles encontrados`);
        } else {
            console.log('✅ Template literals corregidos (sin comillas dobles)');
        }
        
        // 5. Verificar que no haya script/link inconsistencias
        if (content.includes('script.onerror') && content.includes('appendChild(link)')) {
            issues.push('❌ Inconsistencia script/link detectada');
        } else {
            console.log('✅ Consistencia script/link verificada');
        }
        
        // 6. Verificar estructura básica del HTML
        if (content.includes('</html>')) {
            console.log('✅ Archivo HTML cerrado correctamente');
        } else {
            issues.push('❌ Archivo HTML no cerrado correctamente');
        }
        
        // 7. Verificar js/app.js en módulos críticos
        if (content.includes("'js/app.js'")) {
            console.log('✅ js/app.js incluido en módulos críticos');
        } else {
            issues.push('❌ js/app.js no encontrado en módulos críticos');
        }
        
        console.log('\n📊 RESUMEN DE VERIFICACIÓN:');
        console.log('==========================');
        
        if (issues.length === 0) {
            console.log('🎉 ¡TODAS LAS CORRECCIONES APLICADAS EXITOSAMENTE!');
            console.log('\n✅ La aplicación debería funcionar sin errores críticos');
            console.log('✅ No debería aparecer código de live-server en la UI');
            console.log('✅ Los módulos deberían cargarse correctamente');
            console.log('✅ La inicialización debería completarse sin problemas');
        } else {
            console.log('⚠️ PROBLEMAS DETECTADOS:');
            issues.forEach(issue => console.log(`   ${issue}`));
        }
        
    } catch (error) {
        console.error('❌ Error durante la verificación:', error.message);
    }
}

// Verificar si estamos en Node.js o en navegador
if (typeof module !== 'undefined' && module.exports) {
    verifyFixes();
} else {
    // Versión para navegador
    window.verifyNebulaFixes = verifyFixes;
}
