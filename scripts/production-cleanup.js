/**
 * 🧹 NEBULA FINANCIAL - SCRIPT DE LIMPIEZA PARA PRODUCCIÓN
 * ========================================================
 * Script para preparar la aplicación para producción:
 * - Eliminar console.log de depuración
 * - Minificar archivos (opcional)
 * - Generar build local de Tailwind (opcional)
 */

const fs = require('fs');
const path = require('path');

// Archivos a limpiar
const filesToClean = [
    '../js/auth.js',
    '../js/app.js',
    '../js/components/notifications.js',
    '../js/components/shortcuts.js',
    '../js/components/modals.js'
];

/**
 * Reemplaza console.log con comentarios para producción
 */
function cleanDebugLogs(filePath) {
    try {
        const fullPath = path.join(__dirname, filePath);
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Reemplazar console.log con comentarios
        content = content.replace(/console\.log\(.*?\);?/g, (match) => {
            return `// DEBUG: ${match}`;
        });
        
        // Crear archivo de producción
        const prodPath = fullPath.replace('.js', '.prod.js');
        fs.writeFileSync(prodPath, content);
        
        console.log(`✅ Limpieza completada: ${prodPath}`);
        
    } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error.message);
    }
}

/**
 * Ejecutar limpieza para todos los archivos
 */
function runCleanup() {
    console.log('🧹 INICIANDO LIMPIEZA PARA PRODUCCIÓN');
    console.log('=====================================');
    
    filesToClean.forEach(cleanDebugLogs);
    
    console.log('\n✅ LIMPIEZA COMPLETADA');
    console.log('Los archivos .prod.js están listos para producción');
    console.log('\n📝 PASOS ADICIONALES RECOMENDADOS:');
    console.log('1. Reemplazar CDN de Tailwind con build local');
    console.log('2. Configurar minificación de archivos');
    console.log('3. Optimizar imágenes y assets');
    console.log('4. Configurar compresión gzip en servidor');
}

// Ejecutar si se llama directamente
if (require.main === module) {
    runCleanup();
}

module.exports = { cleanDebugLogs, runCleanup };
