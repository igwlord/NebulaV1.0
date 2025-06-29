/**
 * 🎨 NEBULA CSS MINIFIER - Sistema de Optimización Profesional
 * Minifica y optimiza archivos CSS para producción
 */

const fs = require('fs');
const path = require('path');

class NebulaMinifier {
    constructor() {
        this.cssDir = './css/';
        this.outputFile = './css/production-optimized.css';
        this.stats = {
            originalSize: 0,
            minifiedSize: 0,
            filesProcessed: 0
        };
    }

    /**
     * 🚀 Minificar CSS eliminando espacios, comentarios y optimizando
     */
    minifyCSS(css) {
        return css
            // Eliminar comentarios /* ... */
            .replace(/\/\*[\s\S]*?\*\//g, '')
            // Eliminar espacios innecesarios
            .replace(/\s+/g, ' ')
            // Eliminar espacios alrededor de : ; { } , 
            .replace(/\s*([{}:;,>+~])\s*/g, '$1')
            // Eliminar último ; antes de }
            .replace(/;}/g, '}')
            // Eliminar espacios al inicio y final
            .trim();
    }

    /**
     * 📁 Procesar todos los archivos CSS
     */
    async processCSS() {
        console.log('🎨 Iniciando minificación CSS...');
        
        const cssFiles = [
            'styles.css',
            'components.css', 
            'themes.css',
            'critical.css',
            'production-tailwind.css'
        ];

        let combinedCSS = '/* 🌌 NEBULA FINANCIAL - CSS OPTIMIZADO PARA PRODUCCIÓN */\n';
        
        for (const file of cssFiles) {
            const filePath = path.join(this.cssDir, file);
            
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                this.stats.originalSize += content.length;
                
                const minified = this.minifyCSS(content);
                combinedCSS += `\n/* === ${file} === */\n${minified}\n`;
                
                this.stats.filesProcessed++;
                console.log(`✅ Procesado: ${file}`);
            } else {
                console.log(`⚠️ No encontrado: ${file}`);
            }
        }

        // Guardar archivo combinado y minificado
        this.stats.minifiedSize = combinedCSS.length;
        fs.writeFileSync(this.outputFile, combinedCSS);
        
        this.showStats();
    }

    /**
     * 📊 Mostrar estadísticas de optimización
     */
    showStats() {
        const saved = this.stats.originalSize - this.stats.minifiedSize;
        const reduction = ((saved / this.stats.originalSize) * 100).toFixed(1);
        
        console.log('\n🎯 ESTADÍSTICAS DE MINIFICACIÓN:');
        console.log(`📁 Archivos procesados: ${this.stats.filesProcessed}`);
        console.log(`📊 Tamaño original: ${this.formatBytes(this.stats.originalSize)}`);
        console.log(`⚡ Tamaño minificado: ${this.formatBytes(this.stats.minifiedSize)}`);
        console.log(`💾 Bytes ahorrados: ${this.formatBytes(saved)} (${reduction}%)`);
        console.log(`✅ Archivo generado: ${this.outputFile}`);
    }

    /**
     * 📏 Formatear bytes a formato legible
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// 🚀 Ejecutar minificador
if (require.main === module) {
    const minifier = new NebulaMinifier();
    minifier.processCSS().catch(console.error);
}

module.exports = NebulaMinifier;