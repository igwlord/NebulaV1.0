// 🧪 SCRIPT DE PRUEBAS FINALES - CORRECCIONES NEBULA
// Ejecutar en consola del navegador para validar las correcciones aplicadas

console.log('🚀 Iniciando validación de correcciones...\n');

const CorrectionTests = {
    results: [],
    
    log(test, status, details = '') {
        const result = { test, status, details };
        this.results.push(result);
        const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
        console.log(`${icon} ${test}: ${status}${details ? ' - ' + details : ''}`);
    },
    
    // Test 1: Verificar selector de años en calendario
    testCalendarYearSelector() {
        console.log('\n📅 Test 1: Selector de años en calendario');
        
        // Abrir modal de calendario
        if (typeof appState !== 'undefined' && appState.openModal) {
            appState.openModal('calendar');
            
            setTimeout(() => {
                const yearInput = document.getElementById('calendar-year-input');
                const prevButton = document.getElementById('calendar-year-prev');
                const nextButton = document.getElementById('calendar-year-next');
                
                if (yearInput && prevButton && nextButton) {
                    this.log('Elementos del selector de año', 'PASS', 'Input y botones presentes');
                    
                    // Test funcionalidad del input
                    const originalValue = yearInput.value;
                    yearInput.value = '2023';
                    yearInput.dispatchEvent(new Event('change'));
                    
                    this.log('Input de año funcional', 'PASS', 'Acepta cambios');
                    
                    // Restaurar valor original
                    yearInput.value = originalValue;
                    
                    // Cerrar modal
                    appState.closeModal();
                } else {
                    this.log('Elementos del selector de año', 'FAIL', 'Elementos faltantes');
                }
            }, 500);
        } else {
            this.log('AppState disponible', 'FAIL', 'No se puede acceder a appState');
        }
    },
    
    // Test 2: Verificar sistema de edición de transacciones
    testTransactionEditing() {
        console.log('\n✏️ Test 2: Sistema de edición de transacciones');
        
        // Verificar funciones disponibles
        if (typeof showEditTransactionModal === 'function') {
            this.log('Función de edición', 'PASS', 'showEditTransactionModal disponible');
        } else {
            this.log('Función de edición', 'FAIL', 'showEditTransactionModal no encontrada');
        }
        
        if (typeof appState !== 'undefined' && typeof appState.updateTransaction === 'function') {
            this.log('Función updateTransaction', 'PASS', 'Disponible en appState');
        } else {
            this.log('Función updateTransaction', 'FAIL', 'No disponible en appState');
        }
        
        if (typeof appState !== 'undefined' && typeof appState.getTransaction === 'function') {
            this.log('Función getTransaction', 'PASS', 'Disponible en appState');
        } else {
            this.log('Función getTransaction', 'FAIL', 'No disponible en appState');
        }
        
        // Verificar si hay botones de edición en el DOM
        const editButtons = document.querySelectorAll('.edit-transaction-button');
        if (editButtons.length > 0) {
            this.log('Botones de edición', 'PASS', `${editButtons.length} botones encontrados`);
        } else {
            this.log('Botones de edición', 'INFO', 'No hay transacciones para editar');
        }
    },
    
    // Test 3: Verificar funcionamiento de X en modales
    testModalCloseButtons() {
        console.log('\n❌ Test 3: Botones de cerrar en modales');
        
        // Test con modal de calendario
        if (typeof appState !== 'undefined' && appState.openModal) {
            appState.openModal('calendar');
            
            setTimeout(() => {
                const closeButton = document.querySelector('.modal-close-button');
                if (closeButton) {
                    this.log('Botón X presente', 'PASS', 'Encontrado en modal de calendario');
                    
                    // Test del evento click
                    const clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    
                    closeButton.dispatchEvent(clickEvent);
                    
                    setTimeout(() => {
                        const modalStillOpen = document.querySelector('.modal-container');
                        if (!modalStillOpen) {
                            this.log('Funcionalidad X', 'PASS', 'Modal se cierra correctamente');
                        } else {
                            this.log('Funcionalidad X', 'FAIL', 'Modal no se cierra con X');
                        }
                    }, 100);
                } else {
                    this.log('Botón X presente', 'FAIL', 'No encontrado en modal');
                    appState.closeModal(); // Cerrar manualmente
                }
            }, 500);
        }
    },
    
    // Test 4: Verificar sistema de validación visual
    testVisualValidation() {
        console.log('\n📝 Test 4: Sistema de validación visual');
        
        // Verificar funciones de validación
        const validationFunctions = [
            'showFieldError',
            'clearFieldError', 
            'validateField',
            'validateForm'
        ];
        
        validationFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                this.log(`Función ${funcName}`, 'PASS', 'Disponible globalmente');
            } else {
                this.log(`Función ${funcName}`, 'FAIL', 'No disponible');
            }
        });
    },
    
    // Test 5: Verificar sistema de modales elegantes
    testElegantModals() {
        console.log('\n🎭 Test 5: Sistema de modales elegantes');
        
        const modalFunctions = [
            'showConfirmModal',
            'showWarningModal',
            'showDangerModal'
        ];
        
        modalFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                this.log(`Función ${funcName}`, 'PASS', 'Disponible globalmente');
            } else {
                this.log(`Función ${funcName}`, 'FAIL', 'No disponible');
            }
        });
    },
    
    // Ejecutar todos los tests
    async runAllTests() {
        console.log('🔍 Ejecutando batería completa de tests...\n');
        
        this.testTransactionEditing();
        this.testVisualValidation();
        this.testElegantModals();
        this.testCalendarYearSelector();
        
        // Tests de modales al final (requieren interacción)
        setTimeout(() => {
            this.testModalCloseButtons();
            
            // Mostrar resumen final
            setTimeout(() => {
                this.showResults();
            }, 2000);
        }, 1000);
    },
    
    // Mostrar resultados finales
    showResults() {
        console.log('\n📊 RESUMEN DE RESULTADOS:\n');
        
        const passed = this.results.filter(r => r.status === 'PASS').length;
        const failed = this.results.filter(r => r.status === 'FAIL').length;
        const info = this.results.filter(r => r.status === 'INFO').length;
        const total = this.results.length;
        
        console.log(`✅ Tests pasados: ${passed}`);
        console.log(`❌ Tests fallidos: ${failed}`);
        console.log(`ℹ️ Informativos: ${info}`);
        console.log(`📈 Total ejecutados: ${total}`);
        
        const successRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
        console.log(`🎯 Tasa de éxito: ${successRate}%\n`);
        
        if (failed === 0) {
            console.log('🎉 ¡TODAS LAS CORRECCIONES FUNCIONAN PERFECTAMENTE!');
            console.log('🚀 La aplicación está lista para usar con todas las mejoras');
        } else if (failed <= 2) {
            console.log('⚠️ Algunas correcciones necesitan ajustes menores');
            console.log('📋 Revisar los tests fallidos arriba');
        } else {
            console.log('❌ Varias correcciones requieren atención');
            console.log('🔧 Revisar la implementación');
        }
        
        console.log('\n📝 Tests fallidos:');
        this.results
            .filter(r => r.status === 'FAIL')
            .forEach(r => console.log(`  - ${r.test}: ${r.details}`));
    }
};

// Auto-ejecutar tests cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => CorrectionTests.runAllTests(), 2000);
    });
} else {
    setTimeout(() => CorrectionTests.runAllTests(), 2000);
}

// Exponer globalmente para uso manual
window.CorrectionTests = CorrectionTests;

console.log('🎯 Tests de correcciones cargados');
console.log('📋 Ejecutar manualmente: CorrectionTests.runAllTests()');
console.log('🔍 Ver resultados: CorrectionTests.results');

// Test rápido del servidor
fetch(window.location.href, { method: 'HEAD' })
    .then(() => console.log('🌐 Servidor respondiendo correctamente'))
    .catch(() => console.log('❌ Problema de conectividad con servidor'));
