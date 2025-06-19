/**
 * 🔒 NEBULA SECURITY UTILITIES
 * Sistema de seguridad avanzado para protección de datos
 * Implementado en Fase 4 - Seguridad Avanzada
 */

// Eliminar require y usar CryptoJS global
// const CryptoJS = require('crypto-js'); // ELIMINADO
// Usar window.CryptoJS global
const CryptoJS = window.CryptoJS;

const NebulaSecurityUtils = {
    // 🔐 Clave de cifrado (generada dinámicamente)
    encryptionKey: null,
    
    /**
     * Inicializar sistema de seguridad
     */
    init() {
        if (window.NEBULA_DEBUG) {
            console.log('🔒 Inicializando sistema de seguridad...');
        }
        this.generateEncryptionKey();
        this.setupCSPReporting();
        this.initializeSecureStorage();
        if (window.NEBULA_DEBUG) {
            console.log('✅ Sistema de seguridad inicializado');
        }
    },
    
    /**
     * Generar clave de cifrado única por sesión
     * Corregido para evitar caracteres no válidos
     */
    generateEncryptionKey() {
        try {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            this.encryptionKey = Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
            if (window.NEBULA_DEBUG) {
                console.log('🔑 Clave de cifrado generada correctamente');
            }
        } catch (error) {
            console.error('❌ Error generando clave de cifrado:', error);
            this.encryptionKey = null;
        }
    },

    /**
     * Cifrado simple pero efectivo para localStorage
     * Corregido para manejar caracteres no válidos
     */
    encrypt(text) {
        try {
            if (!this.encryptionKey) {
                this.generateEncryptionKey();
            }
            const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Hex.parse(this.encryptionKey), {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000')
            }).toString();
            return encrypted;
        } catch (error) {
            console.error('❌ Error en cifrado:', error);
            return text; // Fallback
        }
    },

    /**
     * Descifrado de datos
     * Corregido para manejar errores de descifrado
     */
    decrypt(encryptedText) {
        try {
            if (!this.encryptionKey) {
                console.error('❌ Error: Clave de cifrado no disponible.');
                return encryptedText;
            }
            const bytes = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Hex.parse(this.encryptionKey), {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000')
            });
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error('❌ Error en descifrado:', error);
            return encryptedText; // Fallback
        }
    },
    
    /**
     * Almacenamiento seguro en localStorage
     * @param {string} key - Clave
     * @param {any} value - Valor a almacenar
     */
    secureSetItem(key, value) {
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            const encryptedValue = this.encrypt(stringValue);
            localStorage.setItem(`nebula_${key}`, encryptedValue);
            console.log(`🔒 Datos guardados de forma segura: ${key}`);
        } catch (error) {
            console.error('❌ Error guardando datos seguros:', error);
            // Fallback: guardado normal
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
    },
    
    /**
     * Recuperación segura de localStorage
     * @param {string} key - Clave
     * @param {any} defaultValue - Valor por defecto
     * @returns {any} - Valor descifrado
     */
    secureGetItem(key, defaultValue = null) {
        try {
            const encryptedValue = localStorage.getItem(`nebula_${key}`);
            if (!encryptedValue) {
                return defaultValue;
            }
            
            const decryptedValue = this.decrypt(encryptedValue);
            
            // Intentar parsear JSON
            try {
                return JSON.parse(decryptedValue);
            } catch {
                return decryptedValue;
            }
        } catch (error) {
            console.error('❌ Error recuperando datos seguros:', error);
            // Fallback: recuperación normal
            const value = localStorage.getItem(key);
            if (!value) return defaultValue;
            
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        }
    },
    
    /**
     * Eliminar datos seguros
     * @param {string} key - Clave
     */
    secureRemoveItem(key) {
        localStorage.removeItem(`nebula_${key}`);
        console.log(`🗑️ Datos seguros eliminados: ${key}`);
    },
    
    /**
     * Configurar reporte de CSP
     */
    setupCSPReporting() {
        // Interceptar violaciones de CSP
        document.addEventListener('securitypolicyviolation', (event) => {
            console.warn('🚨 Violación de CSP detectada:', {
                violatedDirective: event.violatedDirective,
                blockedURI: event.blockedURI,
                originalPolicy: event.originalPolicy,
                sourceFile: event.sourceFile,
                lineNumber: event.lineNumber
            });
            
            // En producción, esto se enviaría a un endpoint de monitoreo
            this.logSecurityEvent('csp_violation', {
                directive: event.violatedDirective,
                uri: event.blockedURI,
                timestamp: new Date().toISOString()
            });
        });
    },
    
    /**
     * Inicializar almacenamiento seguro
     */
    initializeSecureStorage() {
        const keysToMigrate = ['nebula_data', 'nebula_settings', 'nebula_user_preferences'];

        // Procesar en lotes para evitar llenar el heap
        const batchSize = 1; // Procesar de a un elemento por vez
        const processBatch = (batch) => {
            batch.forEach(key => {
                const oldValue = localStorage.getItem(key);
                if (oldValue && !localStorage.getItem(`nebula_${key}`)) {
                    try {
                        this.secureSetItem(key.replace('nebula_', ''), oldValue);
                        localStorage.removeItem(key); // Limpiar versión no cifrada
                        console.log(`🔄 Migrado a almacenamiento seguro: ${key}`);
                    } catch (error) {
                        console.error(`❌ Error migrando ${key}:`, error);
                    }
                }
            });
        };

        for (let i = 0; i < keysToMigrate.length; i += batchSize) {
            const batch = keysToMigrate.slice(i, i + batchSize);
            processBatch(batch);
        }
    },
    
    /**
     * Registrar eventos de seguridad
     * @param {string} eventType - Tipo de evento
     * @param {object} details - Detalles del evento
     */
    logSecurityEvent(eventType, details) {
        const securityLog = this.secureGetItem('security_log', []);
        securityLog.push({
            type: eventType,
            timestamp: new Date().toISOString(),
            details,
            userAgent: navigator.userAgent,
            url: window.location.href
        });
        
        // Mantener solo los últimos 100 eventos
        if (securityLog.length > 100) {
            securityLog.splice(0, securityLog.length - 100);
        }
        
        this.secureSetItem('security_log', securityLog);
    },
    
    /**
     * Validar integridad de datos
     * @param {string} key - Clave de datos
     * @returns {boolean} - True si los datos son válidos
     */
    validateDataIntegrity(key) {
        try {
            const data = this.secureGetItem(key);
            if (!data) return true; // No hay datos, está bien
            
            // Validaciones básicas
            if (typeof data === 'object' && data !== null) {
                return true;
            }
            
            return typeof data === 'string' && data.length > 0;
        } catch (error) {
            console.error(`❌ Error validando integridad de ${key}:`, error);
            return false;
        }
    },
    
    /**
     * Optimización: Liberar recursos no utilizados y evitar acumulaciones innecesarias
     */
    clearSecurityData() {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('nebula_'));
        keys.forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('🧹 Datos de seguridad limpiados');

        // Liberar referencias a objetos grandes
        this.encryptionKey = null;
    },

    /* Protección Contra XSS */
    escapeHTML(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
};

// Asegurar que NebulaSecurityUtils esté disponible globalmente y manejar errores de carga
if (typeof window !== 'undefined') {
    try {
        if (!window.NebulaSecurityUtils) {
            window.NebulaSecurityUtils = NebulaSecurityUtils;
            console.log('✅ NebulaSecurityUtils definido globalmente.');
        } else {
            console.warn('⚠️ NebulaSecurityUtils ya estaba definido globalmente.');
        }
    } catch (error) {
        console.error('❌ Error al definir NebulaSecurityUtils globalmente:', error);
    }
} else {
    console.error('❌ El objeto window no está disponible. NebulaSecurityUtils no se puede definir globalmente.');
}
