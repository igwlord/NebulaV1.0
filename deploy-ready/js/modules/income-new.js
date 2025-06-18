// ===============================================
// 💰 INCOME MODULE - COMPATIBLE CON SISTEMA ORIGINAL
// ===============================================

const IncomeModule = {
    render() {
        // Usar función global directamente - ES LA FUNCIÓN ORIGINAL
        if (typeof window.renderTransactionsView === 'function') {
            return window.renderTransactionsView('income');
        }
        
        // Este fallback NO debería ejecutarse si todo está bien
        return this.renderFallback();
    },
    
    renderFallback() {
        return `
            <div class="p-8 text-center text-white">
                <div class="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 mb-4">
                    <h2 class="text-2xl font-bold mb-4">💰 Gestión de Ingresos</h2>
                    <p class="text-green-100 mb-4">Error: Sistema no inicializado correctamente</p>
                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors" 
                            onclick="window.location.reload()">
                        🔄 Recargar Aplicación
                    </button>
                </div>
            </div>
        `;
    },
    
    init() {
        console.log('💰 IncomeModule inicializado - usando renderTransactionsView original');
    }
};

// ✅ EXPOSICIÓN GLOBAL - CON NOMBRE CORRECTO QUE ESPERA EL SISTEMA
if (typeof window !== 'undefined') {
    window.NebulaIncomeModule = IncomeModule;
    window.IncomeModule = IncomeModule; // Mantener compatibilidad
    console.log('💰 NebulaIncomeModule expuesto globalmente');
}
