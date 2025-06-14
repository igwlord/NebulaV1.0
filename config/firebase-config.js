/**
 * 🔥 NEBULA FINANCIAL - FIREBASE CONFIGURATION
 * ============================================
 * Configuración robusta de Firebase con manejo de errores
 */

// Configuración de Firebase (credenciales reales)
const firebaseConfig = {
    apiKey: "AIzaSyCk9hfIQXFQoPplvcdWqM62dbpl5L5Hzcg",
    authDomain: "nebula-v2-94054.firebaseapp.com", 
    projectId: "nebula-v2-94054",
    storageBucket: "nebula-v2-94054.firebasestorage.app",
    messagingSenderId: "568313746240",
    appId: "1:568313746240:web:8b86cc922438022672a0a5"
};

// Configuración de autenticación
const authConfig = {
    providers: {
        google: {
            enabled: true,
            scopes: ['profile', 'email']
        },
        anonymous: {
            enabled: true // Para modo invitado
        }
    },
    persistence: 'local',
    redirectUrl: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8000',
    cookiePolicy: 'single_host_origin'
};

// Configuración de Firestore
const firestoreConfig = {
    collections: {
        users: 'users',
        transactions: 'user_transactions',
        goals: 'user_goals',
        investments: 'user_investments',
        debts: 'user_debts',
        settings: 'user_settings'
    },
    enableOfflineSupport: true,
    cacheSizeBytes: 40000000 // 40MB cache
};

// Función de validación con manejo de errores robusto
function validateConfig() {
    try {
        const required = ['apiKey', 'authDomain', 'projectId'];
        const missing = required.filter(key => !firebaseConfig[key] || firebaseConfig[key].includes('TU_'));
        
        if (missing.length > 0) {
            console.warn('⚠️ Variables de Firebase no configuradas:', missing);
            console.log('� La aplicación funcionará en modo offline/invitado');
            return false;
        }
        
        console.log('✅ Configuración de Firebase validada correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error validando configuración:', error);
        return false;
    }
}

// Función para detectar si Firebase está disponible
function isFirebaseAvailable() {
    try {
        return typeof firebase !== 'undefined' && firebase.apps !== undefined;
    } catch (error) {
        console.warn('⚠️ Firebase no disponible:', error.message);
        return false;
    }
}

// Validar configuración de forma segura
let isConfigValid = false;
let hasFirebase = false;

try {
    isConfigValid = validateConfig();
    hasFirebase = isFirebaseAvailable();
} catch (error) {
    console.error('❌ Error durante la validación:', error);
    isConfigValid = false;
    hasFirebase = false;
}

// Configuración completa
const nebulaConfig = {
    firebase: firebaseConfig,
    auth: authConfig,
    firestore: firestoreConfig,
    app: {
        name: "Nebula Financial",
        version: "2.0.0",
        environment: "development",
        fallbackMode: !isConfigValid || !hasFirebase,
        guestMode: {
            enabled: true,
            storageKey: 'nebula_guest_data',
            maxTransactions: 1000
        }
    },
    isValid: isConfigValid,
    hasFirebase: hasFirebase
};

// Exportar configuración globalmente de forma segura
try {
    if (typeof window !== 'undefined') {
        window.NebulaConfig = nebulaConfig;
        window.firebaseConfig = firebaseConfig;
        
        console.log('🔥 Firebase config cargado:', isConfigValid ? '✅ Válido' : '⚠️ Modo fallback');
        console.log('🔧 Firebase disponible:', hasFirebase ? '✅ Sí' : '❌ No');
        console.log('🎯 NebulaConfig exportado exitosamente');
        
        if (!isConfigValid || !hasFirebase) {
            console.log('🏠 Modo invitado habilitado - La app funcionará offline');
        }
    }
} catch (error) {
    console.error('❌ Error exportando configuración:', error);
    
    // Fallback mínimo garantizado
    if (typeof window !== 'undefined') {
        window.NebulaConfig = {
            firebase: {},
            auth: { providers: { anonymous: { enabled: true } } },
            firestore: { enableOfflineSupport: true },
            app: { 
                name: "Nebula Financial",
                fallbackMode: true, 
                guestMode: { enabled: true, storageKey: 'nebula_guest_data' }
            },
            isValid: false,
            hasFirebase: false
        };
        console.log('🔄 Configuración fallback aplicada');
    }
}
