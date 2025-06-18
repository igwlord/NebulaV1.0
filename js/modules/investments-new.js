// ===============================================
// 📈 INVESTMENTS MODULE - VERSION CLEAN SIN EXPORTS
// ===============================================

const InvestmentsModule = {
    render() {
        const investments = window.appState?.investments || [];
        
        return `
            <div class="p-8 text-white">
                <div class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 mb-6">
                    <h2 class="text-3xl font-bold mb-4">📈 Inversiones</h2>
                    <p class="text-purple-100 mb-4">Gestiona tu portafolio de inversiones</p>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors" 
                            onclick="InvestmentsModule.showAddForm()">
                        ➕ Nueva Inversión
                    </button>
                </div>
                
                <div class="grid gap-4">
                    ${investments.length === 0 ? 
                        '<div class="text-center text-gray-400 py-8">No hay inversiones registradas</div>' :
                        investments.map(investment => this.renderInvestmentCard(investment)).join('')
                    }
                </div>
            </div>
        `;
    },
    
    renderInvestmentCard(investment) {
        const gain = investment.currentValue - investment.initialValue;
        const gainPercent = (gain / investment.initialValue) * 100;
        const isPositive = gain >= 0;
        
        return `
            <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">${investment.name}</h3>
                    <div class="flex gap-2">
                        <button class="text-blue-400 hover:text-blue-300" onclick="InvestmentsModule.edit(${investment.id})">✏️</button>
                        <button class="text-red-400 hover:text-red-300" onclick="InvestmentsModule.delete(${investment.id})">🗑️</button>
                    </div>
                </div>
                <p class="text-gray-300 mb-4">${investment.type}</p>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-400">Inversión inicial:</span>
                        <div class="text-lg">$${window.formatCurrency ? window.formatCurrency(investment.initialValue) : investment.initialValue}</div>
                    </div>
                    <div>
                        <span class="text-gray-400">Valor actual:</span>
                        <div class="text-lg">$${window.formatCurrency ? window.formatCurrency(investment.currentValue) : investment.currentValue}</div>
                    </div>
                    <div>
                        <span class="text-gray-400">Ganancia/Pérdida:</span>
                        <div class="text-lg ${isPositive ? 'text-green-400' : 'text-red-400'}">
                            ${isPositive ? '+' : ''}$${window.formatCurrency ? window.formatCurrency(Math.abs(gain)) : Math.abs(gain)}
                        </div>
                    </div>
                    <div>
                        <span class="text-gray-400">Rendimiento:</span>
                        <div class="text-lg ${isPositive ? 'text-green-400' : 'text-red-400'}">
                            ${isPositive ? '+' : ''}${gainPercent.toFixed(2)}%
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    showAddForm() {
        console.log('📈 Mostrando formulario de nueva inversión');
    },
    
    edit(investmentId) {
        console.log('📈 Editando inversión:', investmentId);
    },
    
    delete(investmentId) {
        console.log('📈 Eliminando inversión:', investmentId);
    },
    
    init() {
        console.log('📈 InvestmentsModule inicializado correctamente');
    }
};

// ✅ EXPOSICIÓN GLOBAL - SIN EXPORT STATEMENTS
if (typeof window !== 'undefined') {
    window.InvestmentsModule = InvestmentsModule;
    console.log('📈 InvestmentsModule expuesto globalmente');
}
