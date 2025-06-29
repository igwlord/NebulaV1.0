/**
 * 🧹 LIMPIADOR DE CÓDIGO DUPLICADO NEBULA
 * Identifica y reporta secciones duplicadas en index.html
 */

const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, 'index.html');

function cleanDuplicatedCode() {
    console.log('🧹 Analizando código duplicado en index.html...\n');
    
    try {
        let content = fs.readFileSync(HTML_FILE, 'utf8');
        const lines = content.split('\n');
        
        console.log(`📄 Archivo original: ${lines.length} líneas`);
        
        // Identificar patrones problemáticos
        const duplicatedPatterns = [
            // Firebase config duplicado
            /const firebaseConfig = \{[\s\S]*?\};/g,
            // NEBULA_MODULES duplicado
            /const NEBULA_MODULES = \{[\s\S]*?\};/g,
            // moduleLoader duplicado
            /const moduleLoader = new NebulaModuleLoader\(\);/g,
            // Funciones de formato duplicadas
            /const formatNumberWithDots[\s\S]*?;/g,
            /const formatCurrency[\s\S]*?;/g,
            // Variables de inicialización duplicadas
            /const buildTimestamp = Date\.now\(\);/g,
            /const waitForModules[\s\S]*?\};/g,
            /const initNebulaEpic[\s\S]*?\};/g
        ];
        
        let duplicationsFound = 0;
        let cleanedContent = content;
        
        duplicatedPatterns.forEach((pattern, index) => {
            const matches = content.match(pattern);
            if (matches && matches.length > 1) {
                console.log(`🔍 Patrón ${index + 1}: ${matches.length} duplicaciones encontradas`);
                duplicationsFound += matches.length - 1;
                
                // Mantener solo la primera ocurrencia
                let firstMatch = true;
                cleanedContent = cleanedContent.replace(pattern, (match) => {
                    if (firstMatch) {
                        firstMatch = false;
                        return match;
                    }
                    return ''; // Eliminar duplicados
                });
            }
        });
        
        // Limpiar líneas vacías excesivas
        cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
        
        if (duplicationsFound > 0) {
            // Crear backup
            const backupFile = HTML_FILE.replace('.html', `.backup-duplicate-clean-${Date.now()}.html`);
            fs.copyFileSync(HTML_FILE, backupFile);
            console.log(`\n📦 Backup creado: ${path.basename(backupFile)}`);
            
            // Escribir archivo limpio
            fs.writeFileSync(HTML_FILE, cleanedContent, 'utf8');
            
            const newLines = cleanedContent.split('\n').length;
            console.log(`\n✅ Limpieza completada:`);
            console.log(`   - ${duplicationsFound} duplicaciones eliminadas`);
            console.log(`   - ${lines.length} → ${newLines} líneas (reducción de ${lines.length - newLines})`);
            console.log(`   - Archivo optimizado guardado`);
        } else {
            console.log('✨ No se encontraron duplicaciones evidentes');
        }
        
    } catch (error) {
        console.error('❌ Error durante la limpieza:', error.message);
    }
}

// Versión simplificada para uso inmediato
function quickDuplicateReport() {
    try {
        const content = fs.readFileSync(HTML_FILE, 'utf8');
        
        const patterns = [
            'const firebaseConfig',
            'const NEBULA_MODULES',
            'const moduleLoader',
            'const formatNumberWithDots',
            'const formatCurrency',
            'const buildTimestamp',
            'const waitForModules',
            'const initNebulaEpic'
        ];
        
        console.log('🔍 REPORTE RÁPIDO DE DUPLICACIONES:');
        console.log('===================================');
        
        patterns.forEach(pattern => {
            const matches = (content.match(new RegExp(pattern, 'g')) || []).length;
            if (matches > 1) {
                console.log(`❌ ${pattern}: ${matches} ocurrencias`);
            } else if (matches === 1) {
                console.log(`✅ ${pattern}: OK`);
            }
        });
        
    } catch (error) {
        console.error('❌ Error en reporte:', error.message);
    }
}

// Ejecutar reporte rápido por defecto
if (require.main === module) {
    quickDuplicateReport();
    console.log('\n🔧 Para limpiar automáticamente, ejecuta con --clean');
    
    if (process.argv.includes('--clean')) {
        cleanDuplicatedCode();
    }
}
