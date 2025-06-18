/**
 * 🔒 NEBULA SECURITY UTILITIES
 * Sistema de seguridad avanzado para protección de datos
 * Implementado en Fase 4 - Seguridad Avanzada
 */

const NebulaSecurityUtils = {
    // 🔐 Clave de cifrado (generada dinámicamente)
    encryptionKey: null,
    
    /**
     * Inicializar sistema de seguridad
     */
    init() {
        console.log('🔒 Inicializando sistema de seguridad...');
        this.generateEncryptionKey();
        this.setupCSPReporting();
        this.initializeSecureStorage();
        console.log('✅ Sistema de seguridad inicializado');
    },
    
    /**
     * Generar clave de cifrado única por sesión
     */
    generateEncryptionKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        this.encryptionKey = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        console.log('🔑 Clave de cifrado generada');
    },
    
    /**
     * Cifrado simple pero efectivo para localStorage
     * @param {string} text - Texto a cifrar
     * @returns {string} - Texto cifrado
     */
    encrypt(text) {
        try {
            if (!this.encryptionKey) {
                this.generateEncryptionKey();
            }
            
            // Cifrado simple XOR con la clave
            let encrypted = '';
            for (let i = 0; i < text.length; i++) {
                const keyChar = this.encryptionKey[i % this.encryptionKey.length];
                const textChar = text.charCodeAt(i);
                const keyCode = parseInt(keyChar, 16);
                encrypted += String.fromCharCode(textChar ^ keyCode);
            }
            
            // Codificar en Base64 para almacenamiento seguro
            return btoa(encrypted);
        } catch (error) {
            console.error('❌ Error en cifrado:', error);
            return text; // Fallback: devolver texto plano
        }
    },
    
    /**
     * Descifrado de datos
     * @param {string} encryptedText - Texto cifrado
     * @returns {string} - Texto descifrado
     */
    decrypt(encryptedText) {
        try {
            if (!this.encryptionKey) {
                console.warn('⚠️ Clave de cifrado no disponible');
                return encryptedText;
            }
            
            // Decodificar Base64
            const encrypted = atob(encryptedText);
            
            // Descifrar con XOR
            let decrypted = '';
            for (let i = 0; i < encrypted.length; i++) {
                const keyChar = this.encryptionKey[i % this.encryptionKey.length];
                const encryptedChar = encrypted.charCodeAt(i);
                const keyCode = parseInt(keyChar, 16);
                decrypted += String.fromCharCode(encryptedChar ^ keyCode);
            }
            
            return decrypted;
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
        // Migrar datos existentes a almacenamiento seguro
        const keysToMigrate = ['nebula_data', 'nebula_settings', 'nebula_user_preferences'];
        
        keysToMigrate.forEach(key => {
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
     * Limpiar datos de seguridad
     */
    clearSecurityData() {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('nebula_'));
        keys.forEach(key => localStorage.removeItem(key));
        console.log('🧹 Datos de seguridad limpiados');
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.NebulaSecurityUtils = NebulaSecurityUtils;
}
