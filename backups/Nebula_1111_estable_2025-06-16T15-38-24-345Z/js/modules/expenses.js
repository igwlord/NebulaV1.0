// ===============================================
// 💸 EXPENSES MODULE - Sin Export Statements
// ===============================================

const ExpensesModule = {
    render() {
        // Usar función global directamente sin verificación
        if (typeof window.renderTransactionsView === 'function') {
            return window.renderTransactionsView('expense');
        }
        
        // Fallback simple si no está disponible
        return `
            <div class="p-8 text-center text-white">
                <p>Módulo de Gastos - Función renderTransactionsView no disponible</p>
                <p>Refresca la página para cargar correctamente.</p>
            </div>
        `;
    },
    
    init() {
        console.log('💸 ExpensesModule inicializado sin exports');
    }
};

// Solo exposición global - SIN EXPORT STATEMENTS
if (typeof window !== 'undefined') {
    window.ExpensesModule = ExpensesModule;
}
