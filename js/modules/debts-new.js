// ===============================================
// 💳 DEBTS MODULE - VERSION CLEAN SIN EXPORTS
// ===============================================

const DebtsModule = {
    render() {
        const debts = window.appState?.debts || [];
        
        return `
            <div class="p-8 text-white">
                <div class="bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg p-6 mb-6">
                    <h2 class="text-3xl font-bold mb-4">💳 Gestión de Deudas</h2>
                    <p class="text-orange-100 mb-4">Controla y reduce tus deudas efectivamente</p>
                    <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors" 
                            onclick="DebtsModule.showAddForm()">
                        ➕ Nueva Deuda
                    </button>
                </div>
                
                <div class="grid gap-4">
                    ${debts.length === 0 ? 
                        '<div class="text-center text-gray-400 py-8">No hay deudas registradas</div>' :
                        debts.map(debt => this.renderDebtCard(debt)).join('')
                    }
                </div>
            </div>
        `;
    },
    
    renderDebtCard(debt) {
        const remainingAmount = debt.totalAmount - debt.paidAmount;
        const paymentProgress = (debt.paidAmount / debt.totalAmount) * 100;
        
        return `
            <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">${debt.name}</h3>
                    <div class="flex gap-2">
                        <button class="text-blue-400 hover:text-blue-300" onclick="DebtsModule.edit(${debt.id})">✏️</button>
                        <button class="text-red-400 hover:text-red-300" onclick="DebtsModule.delete(${debt.id})">🗑️</button>
                    </div>
                </div>
                <p class="text-gray-300 mb-4">${debt.creditor}</p>
                <div class="mb-4">
                    <div class="flex justify-between text-sm mb-2">
                        <span>Progreso de pago</span>
                        <span>${paymentProgress.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(paymentProgress, 100)}%"></div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-400">Deuda total:</span>
                        <div class="text-lg text-red-400">$${window.formatCurrency ? window.formatCurrency(debt.totalAmount) : debt.totalAmount}</div>
                    </div>
                    <div>
                        <span class="text-gray-400">Pagado:</span>
                        <div class="text-lg text-green-400">$${window.formatCurrency ? window.formatCurrency(debt.paidAmount) : debt.paidAmount}</div>
                    </div>
                    <div>
                        <span class="text-gray-400">Restante:</span>
                        <div class="text-lg text-orange-400">$${window.formatCurrency ? window.formatCurrency(remainingAmount) : remainingAmount}</div>
                    </div>
                    <div>
                        <span class="text-gray-400">Tasa de interés:</span>
                        <div class="text-lg">${debt.interestRate}%</div>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
                    Próximo pago: ${debt.nextPaymentDate || 'No definido'}
                </div>
            </div>
        `;
    },
    
    showAddForm() {
        console.log('💳 Mostrando formulario de nueva deuda');
    },
    
    edit(debtId) {
        console.log('💳 Editando deuda:', debtId);
    },
    
    delete(debtId) {
        console.log('💳 Eliminando deuda:', debtId);
    },
    
    init() {
        console.log('💳 DebtsModule inicializado correctamente');
    }
};

// ✅ EXPOSICIÓN GLOBAL - SIN EXPORT STATEMENTS
if (typeof window !== 'undefined') {
    window.DebtsModule = DebtsModule;
    console.log('💳 DebtsModule expuesto globalmente');
}
