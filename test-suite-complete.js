/**
 * 🧪 NEBULA FINANCIAL - SUITE DE TESTS COMPLETA
 * 
 * Este script ejecuta todos los tests de validación y funcionalidad
 * de la aplicación Nebula Financial.
 * 
 * @author Nebula Team
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

console.log('🌌 NEBULA FINANCIAL - SUITE DE TESTS COMPLETA');
console.log('='.repeat(50));
console.log(`📅 Fecha: ${new Date().toLocaleString('es-ES')}`);
console.log(`📁 Directorio: ${process.cwd()}`);
console.log('');

// ==============================================
// 🔍 TEST 1: VALIDACIÓN DE ARCHIVOS PRINCIPALES
// ==============================================
function test1_validateMainFiles() {
    console.log('=== TEST 1: VALIDACIÓN DE ARCHIVOS PRINCIPALES ===');
    
    const mainFiles = [
        'index.html',
        'js/app.js',
        'css/styles.css',
        'manifest.json',
        'sw.js',
        'package.json'
    ];
    
    let passed = 0;
    let total = mainFiles.length;
    
    mainFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`✅ ${file} - EXISTE`);
            passed++;
        } else {
            console.log(`❌ ${file} - NO ENCONTRADO`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 1:');
    console.log(`Archivos validados: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 TEST 2: VALIDACIÓN DE ESTRUCTURA DE MÓDULOS
// ==============================================
function test2_validateModuleStructure() {
    console.log('=== TEST 2: VALIDACIÓN DE ESTRUCTURA DE MÓDULOS ===');
    
    const jsModules = [
        'js/app.js',
        'js/auth.js',
        'js/modules/dashboard.js',
        'js/modules/income-new.js',
        'js/modules/expenses-new.js',
        'js/modules/goals-new.js',
        'js/modules/investments-new.js',
        'js/modules/debts-new.js',
        'js/modules/settings.js',
        'js/modules/calendar.js',
        'js/modules/dock-navigation.js',
        'js/modules/grid-cards.js'
    ];
    
    let passed = 0;
    let total = jsModules.length;
    
    jsModules.forEach(module => {
        if (fs.existsSync(module)) {
            console.log(`✅ ${module} - EXISTE`);
            passed++;
        } else {
            console.log(`❌ ${module} - NO ENCONTRADO`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 2:');
    console.log(`Módulos validados: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 TEST 3: VALIDACIÓN DE COMPONENTES Y UTILIDADES
// ==============================================
function test3_validateComponents() {
    console.log('=== TEST 3: VALIDACIÓN DE COMPONENTES Y UTILIDADES ===');
    
    const components = [
        'js/components/shortcuts.js',
        'js/components/modals.js',
        'js/components/transactions.js',
        'js/components/notifications.js',
        'js/components/dashboard.js',
        'js/utils/helpers.js',
        'js/utils/security.js',
        'js/utils/validation-suite.js',
        'js/utils/input-validation.js',
        'js/utils/modal-manager.js',
        'js/utils/backup-system.js'
    ];
    
    let passed = 0;
    let total = components.length;
    
    components.forEach(component => {
        if (fs.existsSync(component)) {
            console.log(`✅ ${component} - EXISTE`);
            passed++;
        } else {
            console.log(`❌ ${component} - NO ENCONTRADO`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 3:');
    console.log(`Componentes validados: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 TEST 4: VALIDACIÓN DE ESTILOS CSS
// ==============================================
function test4_validateStyles() {
    console.log('=== TEST 4: VALIDACIÓN DE ESTILOS CSS ===');
    
    const cssFiles = [
        'css/styles.css',
        'css/critical.css',
        'css/components.css',
        'css/modal-improvements.css',
        'css/themes.css'
    ];
    
    let passed = 0;
    let total = cssFiles.length;
    
    cssFiles.forEach(cssFile => {
        if (fs.existsSync(cssFile)) {
            console.log(`✅ ${cssFile} - EXISTE`);
            passed++;
        } else {
            console.log(`❌ ${cssFile} - NO ENCONTRADO`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 4:');
    console.log(`Estilos validados: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 TEST 5: VALIDACIÓN DE SINTAXIS HTML
// ==============================================
function test5_validateHTMLSyntax() {
    console.log('=== TEST 5: VALIDACIÓN DE SINTAXIS HTML ===');
    
    if (!fs.existsSync('index.html')) {
        console.log('❌ index.html no encontrado');
        return { passed: 0, total: 5, success: false };
    }
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    const checks = [
        { name: 'DOCTYPE válido', test: () => htmlContent.includes('<!DOCTYPE html>') },
        { name: 'HTML lang válido', test: () => htmlContent.includes('<html lang=') },
        { name: 'Charset válido', test: () => htmlContent.includes('<meta charset=') },
        { name: 'Title válido', test: () => htmlContent.includes('<title>') },
        { name: 'PWA Manifest', test: () => htmlContent.includes('manifest.json') }
    ];
    
    let passed = 0;
    let total = checks.length;
    
    checks.forEach(check => {
        if (check.test()) {
            console.log(`✅ ${check.name}`);
            passed++;
        } else {
            console.log(`❌ ${check.name}`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 5:');
    console.log(`Sintaxis HTML validada: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 TEST 6: VALIDACIÓN DE COMPONENTES JAVASCRIPT
// ==============================================
function test6_validateJavaScriptComponents() {
    console.log('=== TEST 6: VALIDACIÓN DE COMPONENTES JAVASCRIPT ===');
    
    if (!fs.existsSync('js/app.js')) {
        console.log('❌ js/app.js no encontrado');
        return { passed: 0, total: 4, success: false };
    }
    
    const appContent = fs.readFileSync('js/app.js', 'utf8');
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    const checks = [
        { name: 'appState encontrado', test: () => appContent.includes('appState') },
        { name: 'THEMES encontrado', test: () => indexContent.includes('THEMES') },
        { name: 'DOMContentLoaded encontrado', test: () => indexContent.includes('DOMContentLoaded') },
        { name: 'initializeApp encontrado', test: () => appContent.includes('initializeApp') || indexContent.includes('initNebulaEpic') }
    ];
    
    let passed = 0;
    let total = checks.length;
    
    checks.forEach(check => {
        if (check.test()) {
            console.log(`✅ ${check.name}`);
            passed++;
        } else {
            console.log(`❌ ${check.name}`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 6:');
    console.log(`Componentes JS validados: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 TEST 7: VALIDACIÓN DE SISTEMA PARALLAX
// ==============================================
function test7_validateParallaxSystem() {
    console.log('=== TEST 7: VALIDACIÓN DE SISTEMA PARALLAX ===');
    
    if (!fs.existsSync('index.html')) {
        console.log('❌ index.html no encontrado');
        return { passed: 0, total: 4, success: false };
    }
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
      const checks = [
        { name: 'Sistema parallax encontrado', test: () => htmlContent.includes('renderParallaxBackground') },
        { name: 'Tema Aureo Amanecer', test: () => htmlContent.includes('aureoAmanecer') },
        { name: 'Tema Crison Vespertino', test: () => htmlContent.includes('crisonVespertino') },
        { name: 'Tema Aguamarina Celeste', test: () => htmlContent.includes('aguamarinaCeleste') }
    ];
    
    let passed = 0;
    let total = checks.length;
    
    checks.forEach(check => {
        if (check.test()) {
            console.log(`✅ ${check.name}`);
            passed++;
        } else {
            console.log(`❌ ${check.name}`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 7:');
    console.log(`Sistema Parallax validado: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 TEST 8: VALIDACIÓN DE PWA Y MANIFEST
// ==============================================
function test8_validatePWA() {
    console.log('=== TEST 8: VALIDACIÓN DE PWA Y MANIFEST ===');
    
    const checks = [
        { name: 'Manifest.json', file: 'manifest.json' },
        { name: 'Service Worker', file: 'sw.js' },
        { name: 'Favicon definido', test: () => {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            return htmlContent.includes('rel="icon"');
        }},
        { name: 'Theme color definido', test: () => {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            return htmlContent.includes('theme-color');
        }}
    ];
    
    let passed = 0;
    let total = checks.length;
    
    checks.forEach(check => {
        let success = false;
        if (check.file) {
            success = fs.existsSync(check.file);
        } else if (check.test) {
            success = check.test();
        }
        
        if (success) {
            console.log(`✅ ${check.name}`);
            passed++;
        } else {
            console.log(`❌ ${check.name}`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 8:');
    console.log(`PWA Components validados: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 TEST 9: VALIDACIÓN DE DOCUMENTACIÓN
// ==============================================
function test9_validateDocumentation() {
    console.log('=== TEST 9: VALIDACIÓN DE DOCUMENTACIÓN ===');
    
    const docFiles = [
        'README.md',
        'CHANGELOG.md',
        'LICENSE',
        'CONTRIBUTING.md',
        'AUDITORIA_COMPLETA_FINAL.md',
        'REPORTE_TECNICO_DETALLADO.md',
        'VALIDACION_FINAL_COMPLETADA_v2.md',
        'PLAN_MEJORAS_NEBULA_V9_ROADMAP.md'
    ];
    
    let passed = 0;
    let total = docFiles.length;
    
    docFiles.forEach(docFile => {
        if (fs.existsSync(docFile)) {
            console.log(`✅ ${docFile} - EXISTE`);
            passed++;
        } else {
            console.log(`❌ ${docFile} - NO ENCONTRADO`);
        }
    });
    
    console.log('');
    console.log('📊 RESULTADO TEST 9:');
    console.log(`Documentación validada: ${passed}/${total}`);
    console.log(`Estado: ${passed === total ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('');
    
    return { passed, total, success: passed === total };
}

// ==============================================
// 🔍 EJECUTAR TODOS LOS TESTS
// ==============================================
function runAllTests() {
    const results = [];
    
    results.push(test1_validateMainFiles());
    results.push(test2_validateModuleStructure());
    results.push(test3_validateComponents());
    results.push(test4_validateStyles());
    results.push(test5_validateHTMLSyntax());
    results.push(test6_validateJavaScriptComponents());
    results.push(test7_validateParallaxSystem());
    results.push(test8_validatePWA());
    results.push(test9_validateDocumentation());
    
    // Calcular resultados totales
    const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
    const totalTests = results.reduce((sum, result) => sum + result.total, 0);
    const successfulTests = results.filter(result => result.success).length;
    const totalSuites = results.length;
    
    // Mostrar resumen final
    console.log('🏆 RESUMEN FINAL DE TESTS');
    console.log('='.repeat(50));
    console.log(`📊 Tests individuales: ${totalPassed}/${totalTests} (${((totalPassed/totalTests)*100).toFixed(1)}%)`);
    console.log(`🎯 Suites completas: ${successfulTests}/${totalSuites} (${((successfulTests/totalSuites)*100).toFixed(1)}%)`);
    console.log(`🌟 Estado general: ${successfulTests === totalSuites ? 'TODOS LOS TESTS PASARON ✅' : 'ALGUNOS TESTS FALLARON ⚠️'}`);
    console.log('');
    
    return {
        totalPassed,
        totalTests,
        successfulTests,
        totalSuites,
        overallSuccess: successfulTests === totalSuites,
        passRate: (totalPassed/totalTests)*100,
        suiteSuccessRate: (successfulTests/totalSuites)*100
    };
}

// Ejecutar todos los tests
const finalResults = runAllTests();

// Salir con código apropiado
process.exit(finalResults.overallSuccess ? 0 : 1);
