/**
 * 🔐 NEBULA ENVIRONMENT LOADER
 * Sistema seguro para cargar variables de entorno desde .env
 */

class NebulaEnvLoader {
    constructor() {
        this.config = {};
        this.loaded = false;
    }

    /**
     * Carga las variables de entorno desde el archivo .env
     */
    async loadEnvironment() {
        try {
            const response = await fetch('./.env');
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo .env');
            }
            const envText = await response.text();
            this.parseEnvFile(envText);
            this.loaded = true;
            if (window.NEBULA_DEBUG) {
                console.log('🔐 Variables de entorno cargadas correctamente');
            }
            return true;
        } catch (error) {
            if (window.NEBULA_DEBUG) {
                console.warn('⚠️ No se pudo cargar .env, usando configuración por defecto:', error);
            }
            this.loadDefaultConfig();
            return false;
        }
    }

    /**
     * Parsea el contenido del archivo .env
     */    parseEnvFile(envText) {
        const lines = envText.split('\n');
        if (window.NEBULA_DEBUG) {
            console.log('🔍 DEBUG - Parseando .env, líneas encontradas:', lines.length);
        }
        lines.forEach(line => {
            // Ignorar comentarios y líneas vacías
            if (line.trim() === '' || line.trim().startsWith('#')) {
                return;
            }
            
            // Parsear líneas con formato KEY=VALUE
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim();
                const cleanValue = value.replace(/^["']/, '').replace(/["']$/, '');
                this.config[key] = cleanValue;
                if (window.NEBULA_DEBUG) {
                    console.log(`🔍 DEBUG - Env var: ${key} = ${cleanValue.substring(0, 10)}...`);
                }
            }
        });
        if (window.NEBULA_DEBUG) {
            console.log('🔍 DEBUG - Total env vars cargadas:', Object.keys(this.config).length);
            console.log('🔍 DEBUG - Claves encontradas:', Object.keys(this.config));
        }
    }

    /**
     * Configuración por defecto si no se puede cargar .env
     */
    loadDefaultConfig() {
        this.config = {
            FIREBASE_API_KEY: "demo-key",
            FIREBASE_AUTH_DOMAIN: "demo.firebaseapp.com",
            FIREBASE_PROJECT_ID: "demo-project",
            FIREBASE_STORAGE_BUCKET: "demo.appspot.com",
            FIREBASE_MESSAGING_SENDER_ID: "123456789",
            FIREBASE_APP_ID: "1:123456789:web:demo-app-id",
            APP_NAME: "Nebula Financial",
            APP_VERSION: "2.0.0",
            APP_ENVIRONMENT: "development",
            ENCRYPT_LOCAL_DATA: "true",
            SESSION_TIMEOUT: "24h"
        };
        this.loaded = true;
    }

    /**
     * Obtiene una variable de entorno
     */
    get(key, defaultValue = null) {
        return this.config[key] || defaultValue;
    }

    /**
     * Obtiene la configuración de Firebase
     */    getFirebaseConfig() {
        if (!this.loaded) {
            console.error('❌ Environment no cargado. Llama a loadEnvironment() primero.');
            return null;
        }

        console.log('🔍 DEBUG - Generando config Firebase...');
        const config = {
            apiKey: this.get('FIREBASE_API_KEY'),
            authDomain: this.get('FIREBASE_AUTH_DOMAIN'),
            projectId: this.get('FIREBASE_PROJECT_ID'),
            storageBucket: this.get('FIREBASE_STORAGE_BUCKET'),
            messagingSenderId: this.get('FIREBASE_MESSAGING_SENDER_ID'),
            appId: this.get('FIREBASE_APP_ID')
        };
        
        console.log('🔍 DEBUG - Config Firebase generada:', {
            apiKey: config.apiKey?.substring(0, 10) + '...',
            authDomain: config.authDomain,
            projectId: config.projectId,
            hasApiKey: !!config.apiKey,
            apiKeyLength: config.apiKey?.length
        });
        
        return config;
    }

    /**
     * Verifica si estamos en modo desarrollo
     */
    isDevelopment() {
        return this.get('APP_ENVIRONMENT', 'development') === 'development';
    }

    /**
     * Verifica si debe encriptar datos locales
     */
    shouldEncryptLocalData() {
        return this.get('ENCRYPT_LOCAL_DATA', 'true') === 'true';
    }
}

// Crear instancia global
window.NebulaEnv = new NebulaEnvLoader();

export default window.NebulaEnv;
