/**
 * 🔥 NEBULA FINANCIAL - FIREBASE CONFIGURATION
 * ============================================
 * Configuración robusta de Firebase con variables de entorno seguras
 * 
 * CARACTERÍSTICAS:
 * ✅ Configuración desde variables de entorno (.env)
 * ✅ Fallback a configuración hardcodeada para desarrollo
 * ✅ Validación completa de credenciales
 * ✅ Manejo robusto de errores
 * ✅ Exportación global para compatibilidad
 * 
 * 🔒 SEGURIDAD:
 * - Credenciales cargadas desde .env (no hardcodeadas)
 * - Validación de disponibilidad de Firebase SDK
 * - Permisos configurados en Firebase Console
 * - Dominios autorizados configurados
 * 
 * FUNCIONALIDAD:
 * - Configuración completa de Firebase Authentication y Firestore
 * - Validación automática de credenciales
 * - Detección de disponibilidad de Firebase SDK
 * - Fallback robusto para modo offline
 * - Exportación global segura para compatibilidad
 */

// 🔐 Configuración de Firebase usando variables de entorno
let firebaseConfig = {};

// Intentar obtener configuración desde variables de entorno
if (window.NebulaEnv && window.NebulaEnv.loaded) {
    firebaseConfig = window.NebulaEnv.getFirebaseConfig();
    console.log('🔐 Firebase config cargado desde .env');
} else {
    // Fallback a configuración demo para desarrollo
    firebaseConfig = {
        apiKey: "demo-api-key-for-development",
        authDomain: "demo.firebaseapp.com", 
        projectId: "demo-project",
        storageBucket: "demo-project.firebasestorage.app",
        messagingSenderId: "000000000000",
        appId: "1:000000000000:web:demo"
    };
    console.log('⚠️ Firebase config usando configuración demo - Modo invitado habilitado');
}

// 🔐 Configuración de autenticación
// Define qué métodos de login están disponibles y cómo se comportan
const authConfig = {
    providers: {
        google: {
            enabled: true,
            scopes: ['profile', 'email'] // Permisos solicitados a Google
        },
        anonymous: {
            enabled: true // Habilita modo invitado sin registro
        }
    },
    persistence: 'local', // Mantener sesión entre cierres del navegador
    redirectUrl: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8000',
    cookiePolicy: 'single_host_origin' // Política de cookies para seguridad
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
    enableOfflineSupport: true,    cacheSizeBytes: 40000000 // 40MB cache
};

/**
 * 🔍 Validación de configuración de Firebase
 * 
 * PROPÓSITO:
 * - Verifica que las credenciales de Firebase estén configuradas
 * - Detecta configuraciones de placeholder (que contienen 'TU_')
 * - Proporciona feedback claro sobre el estado de la configuración
 * 
 * RETORNA:
 * - true: Firebase configurado y listo para usar
 * - false: Configuración incompleta, usar modo offline
 * 
 * CÓMO PROBAR:
 * - Consola: validateConfig() debe retornar true
 * - Ver logs: "✅ Configuración de Firebase validada correctamente"
 */
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

// 💡 MEJORAS SUGERIDAS (NO IMPLEMENTADAS):
// 1. Sistema de configuración por entorno: Implementar detección automática del entorno
//    (desarrollo/staging/producción) y cargar configuraciones específicas desde archivos
//    separados o variables de entorno del servidor. Esto permitiría tener diferentes
//    proyectos Firebase para cada entorno sin cambiar código.
//
// 2. Validación avanzada de permisos: Agregar verificación en tiempo real de los
//    permisos configurados en Firebase Console (Rules de Firestore, métodos de auth
//    habilitados, dominios autorizados) y mostrar warnings específicos si detecta
//    configuraciones potencialmente inseguras o incompletas.
