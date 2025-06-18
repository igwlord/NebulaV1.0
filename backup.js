#!/usr/bin/env node

/**
 * 🚀 NEBULA FINANCIAL - SCRIPT DE BACKUP AUTOMÁTICO
 * ================================================
 * Script para crear backups manuales desde terminal
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class SimpleBackup {
    constructor() {
        this.projectPath = process.cwd();
        this.backupPath = path.join(this.projectPath, 'backups');
    }

    async createBackup(version, description = '') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupName = `v${version}_${timestamp}`;
        const backupDir = path.join(this.backupPath, backupName);

        try {
            console.log(`📦 Creando backup: ${backupName}`);
            
            // Crear directorio
            await fs.mkdir(backupDir, { recursive: true });

            // Archivos a respaldar
            const files = [
                'index.html',
                'package.json',
                'css',
                'js',
                'config',
                '*.md'
            ];            // Copiar archivos usando Node.js nativo
            for (const file of files) {
                if (file === '*.md') {
                    // Copiar archivos markdown
                    const mdFiles = await fs.readdir(this.projectPath);
                    for (const mdFile of mdFiles) {
                        if (mdFile.endsWith('.md')) {
                            await fs.copyFile(
                                path.join(this.projectPath, mdFile),
                                path.join(backupDir, mdFile)
                            );
                        }
                    }
                    continue;
                }

                const sourcePath = path.join(this.projectPath, file);
                
                try {
                    const stat = await fs.stat(sourcePath);
                    
                    if (stat.isDirectory()) {
                        // Copiar directorio recursivamente
                        await this.copyDirectory(sourcePath, path.join(backupDir, file));
                    } else {
                        // Copiar archivo
                        await fs.copyFile(sourcePath, path.join(backupDir, file));
                    }
                } catch (err) {
                    // Archivo no existe, continuar
                    if (err.code !== 'ENOENT') {
                        console.warn(`⚠️ Error copiando ${file}: ${err.message}`);
                    }
                }
            }

            // Crear metadata
            const metadata = {
                version,
                description,
                timestamp: new Date().toISOString(),
                status: 'stable'
            };

            await fs.writeFile(
                path.join(backupDir, 'backup-metadata.json'),
                JSON.stringify(metadata, null, 2)
            );

            console.log(`✅ Backup completado: ${backupName}`);
            return backupName;

        } catch (error) {
            console.error(`❌ Error creando backup: ${error.message}`);
            throw error;
        }
    }

    async listBackups() {
        try {
            const backups = await fs.readdir(this.backupPath);
            console.log('\n📋 Backups disponibles:');
            
            for (const backup of backups) {
                const metadataPath = path.join(this.backupPath, backup, 'backup-metadata.json');
                
                try {
                    const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf8'));
                    console.log(`  📦 ${backup} - ${metadata.description} (${metadata.timestamp})`);
                } catch {
                    console.log(`  📦 ${backup} - Sin metadata`);
                }
            }
        } catch (error) {
            console.log('📋 No hay backups disponibles');
        }
    }

    async copyDirectory(source, target) {
        await fs.mkdir(target, { recursive: true });
        const items = await fs.readdir(source);
        
        for (const item of items) {
            const sourcePath = path.join(source, item);
            const targetPath = path.join(target, item);
            const stat = await fs.stat(sourcePath);
            
            if (stat.isDirectory()) {
                await this.copyDirectory(sourcePath, targetPath);
            } else {
                await fs.copyFile(sourcePath, targetPath);
            }
        }
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const backup = new SimpleBackup();
    const args = process.argv.slice(2);
    
    if (args[0] === 'create') {
        const version = args[1] || '1.0';
        const description = args.slice(2).join(' ') || 'Manual backup';
        backup.createBackup(version, description);
    } else if (args[0] === 'list') {
        backup.listBackups();
    } else {
        console.log(`
🌌 NEBULA BACKUP SYSTEM

Uso:
  node backup.js create [version] [descripción]
  node backup.js list

Ejemplos:
  node backup.js create 1.1 "Después de CSS crítico"
  node backup.js create 2.0 "Seguridad XSS implementada"
  node backup.js list
        `);
    }
}

module.exports = SimpleBackup;
