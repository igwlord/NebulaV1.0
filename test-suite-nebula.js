// 🧪 NEBULA FINANCIAL - TEST SUITE AUTOMATIZADO v1.0
// Ejecutar en consola del navegador para validación rápida

console.log('🚀 Iniciando Test Suite Nebula Financial...');

const NebulaTestSuite = {
    results: {
        passed: 0,
        failed: 0,
        tests: []
    },

    test(name, testFn) {
        try {
            const result = testFn();
            if (result) {
                this.results.passed++;
                this.results.tests.push({name, status: '✅ PASS', details: ''});
                console.log(`✅ ${name}`);
            } else {
                this.results.failed++;
                this.results.tests.push({name, status: '❌ FAIL', details: 'Test returned false'});
                console.log(`❌ ${name}`);
            }
        } catch (error) {
            this.results.failed++;
            this.results.tests.push({name, status: '❌ ERROR', details: error.message});
            console.log(`❌ ${name} - ERROR: ${error.message}`);
        }
    },

    runAllTests() {
        console.log('\n🔍 Ejecutando tests de componentes críticos...\n');
        
        // Test 1: Verificar que no hay alert() nativos
        this.test('Sin alert() nativos en window', () => {
            const originalAlert = window.alert.toString();
            return !originalAlert.includes('[native code]') || window.alert.name === 'customAlert';
        });

        // Test 2: Verificar módulos de validación
        this.test('Sistema de validación visual cargado', () => {
            return typeof window.showFieldError === 'function' && 
                   typeof window.clearFieldError === 'function';
        });

        // Test 3: Verificar modales elegantes
        this.test('Sistema de modales elegantes disponible', () => {
            return typeof window.showConfirmModal === 'function' && 
                   typeof window.showWarningModal === 'function';
        });

        // Test 4: Verificar AppState
        this.test('AppState global disponible', () => {
            return typeof window.AppState === 'object' && 
                   window.AppState.hasOwnProperty('currentMonth');
        });

        // Test 5: Verificar carga de CSS
        this.test('Estilos principales cargados', () => {
            const styles = document.getElementsByTagName('style');
            return styles.length > 0 || document.styleSheets.length > 0;
        });

        // Test 6: Verificar elementos del DOM principal
        this.test('Elementos del dashboard presentes', () => {
            return document.getElementById('dashboard') !== null &&
                   document.getElementById('sidebar') !== null;
        });

        // Test 7: Verificar calendario de navegación
        this.test('Navegación de años en calendario', () => {
            const yearInput = document.getElementById('currentYearInput');
            const prevButton = document.querySelector('.year-nav-btn[onclick*="previous"]');
            const nextButton = document.querySelector('.year-nav-btn[onclick*="next"]');
            return yearInput !== null && prevButton !== null && nextButton !== null;
        });

        // Test 8: Verificar módulos externos
        this.test('Módulos de inversiones disponibles', () => {
            return typeof window.openInvestmentModal === 'function';
        });

        this.test('Módulos de deudas disponibles', () => {
            return typeof window.openDebtModal === 'function';
        });

        this.test('Módulos de metas disponibles', () => {
            return typeof window.openGoalModal === 'function';
        });

        // Test 9: Verificar temas
        this.test('Sistema de temas funcional', () => {
            return typeof window.applyTheme === 'function' && 
                   document.body.classList.length > 0;
        });

        // Test 10: Verificar LocalStorage
        this.test('LocalStorage accesible', () => {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch (e) {
                return false;
            }
        });

        this.showResults();
    },

    testInteractive() {
        console.log('\n🎮 Iniciando tests interactivos...\n');
        
        // Test de validación visual
        setTimeout(() => {
            console.log('📝 Probando validación visual...');
            const incomeInput = document.querySelector('#addIncomeForm input[type="number"]');
            if (incomeInput) {
                incomeInput.value = '';
                incomeInput.focus();
                incomeInput.blur();
                setTimeout(() => {
                    const errorMsg = document.querySelector('.error-message, .field-error');
                    console.log(errorMsg ? '✅ Validación visual funciona' : '❌ Validación visual no detectada');
                }, 500);
            }
        }, 1000);

        // Test de modal
        setTimeout(() => {
            console.log('🎭 Probando sistema de modales...');
            if (typeof window.showConfirmModal === 'function') {
                window.showConfirmModal(
                    'Test de Modal',
                    'Este es un test del sistema de modales elegantes. ¿Funciona correctamente?',
                    () => console.log('✅ Modal confirmado correctamente'),
                    () => console.log('❌ Modal cancelado')
                );
            }
        }, 2000);
    },

    showResults() {
        console.log('\n📊 RESULTADOS DEL TEST SUITE:\n');
        console.log(`✅ Tests pasados: ${this.results.passed}`);
        console.log(`❌ Tests fallidos: ${this.results.failed}`);
        console.log(`📈 Tasa de éxito: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)}%`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ Tests fallidos:');
            this.results.tests
                .filter(test => test.status.includes('FAIL') || test.status.includes('ERROR'))
                .forEach(test => {
                    console.log(`  - ${test.name}: ${test.details}`);
                });
        }

        const status = this.results.failed === 0 ? '🚀 DEPLOY READY' : '⚠️ REQUIERE FIXES';
        console.log(`\n${status}\n`);

        // Test de rendimiento básico
        this.performanceTest();
    },

    performanceTest() {
        console.log('⚡ Ejecutando test de rendimiento...');
        const start = performance.now();
        
        // Simular operaciones comunes
        for (let i = 0; i < 100; i++) {
            if (typeof window.calculateTotals === 'function') {
                window.calculateTotals();
            }
        }
        
        const end = performance.now();
        const time = (end - start).toFixed(2);
        console.log(`⏱️ 100 cálculos completados en ${time}ms`);
        
        if (time < 100) {
            console.log('✅ Rendimiento excelente');
        } else if (time < 500) {
            console.log('⚠️ Rendimiento aceptable');
        } else {
            console.log('❌ Rendimiento lento - revisar optimizaciones');
        }
    }
};

// Ejecutar automáticamente al cargar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('🎯 Test Suite cargado. Ejecuta NebulaTestSuite.runAllTests() para pruebas automáticas');
        console.log('🎮 O ejecuta NebulaTestSuite.testInteractive() para pruebas interactivas');
    }, 1000);
});

// Auto-ejecutar si la página ya está cargada
if (document.readyState === 'loading') {
    // Loading hasn't finished yet
} else {
    setTimeout(() => {
        console.log('🎯 Test Suite cargado. Ejecuta NebulaTestSuite.runAllTests() para pruebas automáticas');
        console.log('🎮 O ejecuta NebulaTestSuite.testInteractive() para pruebas interactivas');
    }, 1000);
}

// Hacer disponible globalmente
window.NebulaTestSuite = NebulaTestSuite;
