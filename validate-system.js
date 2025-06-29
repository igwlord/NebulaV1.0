/**
 * 🔍 VALIDACIÓN COMPLETA - NEBULA FINANCIAL
 * ========================================
 * Script para verificar que todos los sistemas estén funcionando correctamente
 */

console.log('🔍 INICIANDO VALIDACIÓN COMPLETA DE NEBULA FINANCIAL...');
console.log('=====================================');

// 📋 Tests a realizar
const tests = [
    {
        name: '🔐 Variables de Entorno',
        test: () => {
            if (window.NebulaEnv && window.NebulaEnv.loaded) {
                const firebaseConfig = window.NebulaEnv.getFirebaseConfig();
                return firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId;
            }
            return false;
        }
    },
    {
        name: '🔥 Firebase SDK',
        test: () => {
            return typeof firebase !== 'undefined' && firebase.apps && firebase.auth && firebase.firestore;
        }
    },
    {
        name: '⚙️ Firebase Config',
        test: () => {
            return window.NebulaConfig && window.NebulaConfig.isValid;
        }
    },
    {
        name: '🔐 Nebula Auth Module',
        test: () => {
            return window.NebulaAuth && typeof window.NebulaAuth.init === 'function';
        }
    },
    {
        name: '⚙️ Settings Module',
        test: () => {
            return window.SettingsModule && typeof window.SettingsModule.render === 'function';
        }
    },
    {
        name: '🎨 AppState Global',
        test: () => {
            return window.appState && typeof window.appState.setTheme === 'function';
        }
    },
    {
        name: '🚢 Dock Navigation',
        test: () => {
            return window.DockNavigation && typeof window.DockNavigation.init === 'function';
        }
    },
    {
        name: '📊 Dashboard Module',
        test: () => {
            return window.Dashboard && typeof window.Dashboard.render === 'function';
        }
    }
];

// 🎯 Ejecutar tests
let passedTests = 0;
let totalTests = tests.length;

console.log(`\n🧪 Ejecutando ${totalTests} tests...\n`);

tests.forEach((test, index) => {
    try {
        const result = test.test();
        if (result) {
            console.log(`✅ ${test.name}: PASS`);
            passedTests++;
        } else {
            console.log(`❌ ${test.name}: FAIL`);
        }
    } catch (error) {
        console.log(`❌ ${test.name}: ERROR - ${error.message}`);
    }
});

// 📊 Resultados finales
console.log('\n=====================================');
console.log(`📊 RESULTADOS: ${passedTests}/${totalTests} tests pasaron`);

if (passedTests === totalTests) {
    console.log('🎉 ¡TODOS LOS TESTS PASARON! Sistema completamente funcional');
} else if (passedTests >= totalTests * 0.75) {
    console.log('⚠️ La mayoría de tests pasaron. Revisa los fallos menores');
} else {
    console.log('❌ Fallos críticos detectados. Revisa la configuración');
}

// 🔍 Información adicional del sistema
console.log('\n🔍 INFORMACIÓN DEL SISTEMA:');
console.log(`- Navegador: ${navigator.userAgent}`);
console.log(`- URL actual: ${window.location.href}`);
console.log(`- LocalStorage disponible: ${typeof Storage !== "undefined"}`);
console.log(`- ServiceWorker disponible: ${'serviceWorker' in navigator}`);

// 🔥 Test específico de Firebase si está disponible
if (window.firebase) {
    console.log('\n🔥 FIREBASE DETAILS:');
    console.log(`- Firebase version: ${firebase.SDK_VERSION || 'Unknown'}`);
    console.log(`- Apps initialized: ${firebase.apps.length}`);
    
    if (window.NebulaConfig) {
        console.log(`- Project ID: ${window.NebulaConfig.firebase.projectId}`);
        console.log(`- Auth Domain: ${window.NebulaConfig.firebase.authDomain}`);
    }
}

// 🎯 Mostrar estado de autenticación si está disponible
if (window.NebulaAuth) {
    console.log('\n🔐 ESTADO DE AUTENTICACIÓN:');
    const authState = window.NebulaAuth.getState();
    console.log(`- Autenticado: ${authState.isAuthenticated}`);
    console.log(`- Usuario anónimo: ${authState.isAnonymous}`);
    console.log(`- Proveedor: ${authState.provider || 'Ninguno'}`);
}

console.log('\n🚀 VALIDACIÓN COMPLETA FINALIZADA');
console.log('=====================================');

// 🎨 Exportar resultados para uso en consola
window.NebulaValidation = {
    tests,
    results: {
        passed: passedTests,
        total: totalTests,
        percentage: Math.round((passedTests / totalTests) * 100)
    },
    runTests: () => {
        location.reload();
    }
};

// 🔔 Mostrar notificación visual si hay un sistema de notificaciones
if (window.SettingsModule && window.SettingsModule.showNotification) {
    setTimeout(() => {
        if (passedTests === totalTests) {
            window.SettingsModule.showNotification('🎉 Sistema validado: Todo funcional', 'success');
        } else {
            window.SettingsModule.showNotification(`⚠️ Validación: ${passedTests}/${totalTests} tests OK`, 'warning');
        }
    }, 2000);
}
