#!/usr/bin/env node

/**
 * 🧹 LIMPIADOR DE LIVE-SERVER PARA NEBULA
 * Elimina automáticamente cualquier código inyectado por live-server
 */

const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, 'index.html');

function cleanLiveServerCode() {
    try {
        console.log('🧹 Iniciando limpieza de código live-server...');
        
        let content = fs.readFileSync(HTML_FILE, 'utf8');
        
        // Patrones de código de live-server a eliminar
        const liveServerPatterns = [
            // Código WebSocket típico de live-server
            /\/\*\s*<!\[CDATA\[\s*\*\/[\s\S]*?\/\*\s*\]\]>\s*\*\//g,
            // Scripts de live-server
            /<script[^>]*>[\s\S]*?live.*?reload[\s\S]*?<\/script>/gi,
            // Código JavaScript de recarga automática
            /\(function\(\)\s*\{[\s\S]*?_cacheOverride[\s\S]*?\}\)\(\);?/g,
            // WebSocket connections
            /var\s+socket\s*=\s*new\s+WebSocket[\s\S]*?;/g,
            // Live reload mensajes
            /console\.log\(['"]Live reload enabled['"].*?\);?/g,
            // Patrones específicos que aparecen en el error
            /= 0 \? '&' : '\?'\) \+ '_cacheOverride='[\s\S]*?WebSocket for Live-Reloading[\s\S]*?\/\/ \]\]>\s*"/g
        ];
        
        let cleaned = false;
        liveServerPatterns.forEach((pattern, index) => {
            const before = content.length;
            content = content.replace(pattern, '');
            if (content.length < before) {
                console.log(`✅ Patrón ${index + 1} eliminado`);
                cleaned = true;
            }
        });
        
        // Limpiar líneas vacías excesivas
        content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
        
        if (cleaned) {
            // Crear backup antes de limpiar
            const backupFile = HTML_FILE.replace('.html', `.backup-${Date.now()}.html`);
            fs.copyFileSync(HTML_FILE, backupFile);
            console.log(`📦 Backup creado: ${path.basename(backupFile)}`);
            
            // Escribir archivo limpio
            fs.writeFileSync(HTML_FILE, content, 'utf8');
            console.log('🎉 Archivo limpiado exitosamente');
        } else {
            console.log('✨ No se encontró código de live-server para limpiar');
        }
        
    } catch (error) {
        console.error('❌ Error durante la limpieza:', error.message);
        process.exit(1);
    }
}

// Ejecutar limpieza
cleanLiveServerCode();
