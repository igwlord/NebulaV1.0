/**
 * 🔧 NEBULA FINANCIAL - SISTEMA DE BACKUP Y ROLLBACK
 * ==================================================
 * Sistema automatizado para crear backups y gestionar rollbacks
 * durante el proceso de optimización gradual
 */

import fs from 'fs';
import path from 'path';

class BackupSystem {
    constructor(projectPath) {
        this.projectPath = projectPath;
        this.backupPath = path.join(projectPath, 'backups');
        this.tempPath = path.join(projectPath, 'temp');
        this.currentVersion = '1.0';
        this.lastStableVersion = null;
    }

    /**
     * 📦 Crear backup completo del estado actual
     */
    async createBackup(version, description = '') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupName = `v${version}_${timestamp}`;
        const backupDir = path.join(this.backupPath, backupName);

        try {
            // Crear directorio de backup
            await fs.promises.mkdir(backupDir, { recursive: true });

            // Archivos críticos a respaldar
            const criticalFiles = [
                'index.html',
                'package.json',
                'css/',
                'js/',
                'config/',
                '*.md'
            ];

            // Copiar archivos
            for (const file of criticalFiles) {
                const sourcePath = path.join(this.projectPath, file);
                const targetPath = path.join(backupDir, file);
                
                if (await this.fileExists(sourcePath)) {
                    await this.copyRecursive(sourcePath, targetPath);
                }
            }

            // Crear archivo de metadata
            const metadata = {
                version,
                description,
                timestamp: new Date().toISOString(),
                files: criticalFiles,
                status: 'stable'
            };

            await fs.promises.writeFile(
                path.join(backupDir, 'backup-metadata.json'),
                JSON.stringify(metadata, null, 2)
            );

            console.log(`✅ Backup creado: ${backupName}`);
            this.lastStableVersion = backupName;
            return backupName;

        } catch (error) {
            console.error(`❌ Error creando backup: ${error.message}`);
            throw error;
        }
    }

    /**
     * 🔄 Restaurar desde backup
     */
    async restoreFromBackup(backupName) {
        const backupDir = path.join(this.backupPath, backupName);
        
        if (!await this.fileExists(backupDir)) {
            throw new Error(`Backup no encontrado: ${backupName}`);
        }

        try {
            // Crear backup temporal del estado actual
            await this.createBackup('temp', 'Pre-rollback state');

            // Restaurar archivos
            const items = await fs.promises.readdir(backupDir);
            
            for (const item of items) {
                if (item === 'backup-metadata.json') continue;
                
                const sourcePath = path.join(backupDir, item);
                const targetPath = path.join(this.projectPath, item);
                
                // Eliminar archivo/directorio existente
                if (await this.fileExists(targetPath)) {
                    await fs.promises.rm(targetPath, { recursive: true, force: true });
                }
                
                // Copiar desde backup
                await this.copyRecursive(sourcePath, targetPath);
            }

            console.log(`✅ Restauración completada desde: ${backupName}`);
            return true;

        } catch (error) {
            console.error(`❌ Error en restauración: ${error.message}`);
            throw error;
        }
    }

    /**
     * 📋 Listar backups disponibles
     */
    async listBackups() {
        try {
            const backups = await fs.promises.readdir(this.backupPath);
            const backupInfo = [];

            for (const backup of backups) {
                const metadataPath = path.join(this.backupPath, backup, 'backup-metadata.json');
                
                if (await this.fileExists(metadataPath)) {
                    const metadata = JSON.parse(
                        await fs.promises.readFile(metadataPath, 'utf8')
                    );
                    backupInfo.push({ name: backup, ...metadata });
                }
            }

            return backupInfo.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        } catch (error) {
            console.error(`❌ Error listando backups: ${error.message}`);
            return [];
        }
    }

    /**
     * 🧹 Limpiar backups antiguos (mantener últimos 10)
     */
    async cleanupOldBackups(keepCount = 10) {
        const backups = await this.listBackups();
        const toDelete = backups.slice(keepCount);

        for (const backup of toDelete) {
            const backupDir = path.join(this.backupPath, backup.name);
            await fs.promises.rm(backupDir, { recursive: true, force: true });
            console.log(`🗑️ Backup eliminado: ${backup.name}`);
        }
    }

    /**
     * 🔍 Verificar si archivo/directorio existe
     */
    async fileExists(filePath) {
        try {
            await fs.promises.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 📁 Copiar archivo o directorio recursivamente
     */
    async copyRecursive(source, target) {
        const stat = await fs.promises.stat(source);
        
        if (stat.isDirectory()) {
            await fs.promises.mkdir(target, { recursive: true });
            const items = await fs.promises.readdir(source);
            
            for (const item of items) {
                await this.copyRecursive(
                    path.join(source, item),
                    path.join(target, item)
                );
            }
        } else {
            await fs.promises.mkdir(path.dirname(target), { recursive: true });
            await fs.promises.copyFile(source, target);
        }
    }

    /**
     * 🎯 Crear punto de control rápido
     */
    async createCheckpoint(name) {
        const version = `checkpoint_${name}_${Date.now()}`;
        return await this.createBackup(version, `Checkpoint: ${name}`);
    }

    /**
     * ⚡ Rollback rápido al último backup estable
     */
    async quickRollback() {
        if (!this.lastStableVersion) {
            const backups = await this.listBackups();
            if (backups.length === 0) {
                throw new Error('No hay backups disponibles para rollback');
            }
            this.lastStableVersion = backups[0].name;
        }

        return await this.restoreFromBackup(this.lastStableVersion);
    }
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.BackupSystem = BackupSystem;
}
// En entorno Node.js, exportar solo si module está disponible
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackupSystem;
}
