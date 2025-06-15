// ===============================================
// 💰 INCOME MODULE - CloudSonnet4
// ===============================================

/**
 * 📈 Módulo de gestión de ingresos
 * Funcionalidades completas para manejo de ingresos mensuales
 */
const IncomeModule = {
    
    /**
     * CloudSonnet4: Renderiza la vista de ingresos
     */
    render() {
        const currentTransactions = appState.data.transactions[appState.currentMonthKey] || [];
        const incomeTransactions = currentTransactions.filter(t => t.type === 'income');
        const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        return `
            <div class="space-y-6">
                <!-- Header con estadísticas -->
                <div class="${appState.theme.surface} rounded-2xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold ${appState.theme.textPrimary} flex items-center gap-3">
                            💰 Gestión de Ingresos
                        </h2>
                        <button onclick="this.showAddIncomeModal()" class="${appState.theme.accentBg} hover:opacity-80 px-4 py-2 rounded-lg text-white font-medium transition-opacity">
                            + Agregar Ingreso
                        </button>
                    </div>
                    
                    <!-- Estadísticas del mes -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="text-center p-4 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg">
                            <p class="text-sm ${appState.theme.textSecondary} mb-1">Total del mes</p>
                            <p class="text-2xl font-bold ${appState.theme.positive}">${formatCurrency(totalIncome)}</p>
                        </div>
                        <div class="text-center p-4 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg">
                            <p class="text-sm ${appState.theme.textSecondary} mb-1">Transacciones</p>
                            <p class="text-2xl font-bold ${appState.theme.accent}">${incomeTransactions.length}</p>
                        </div>
                        <div class="text-center p-4 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg">
                            <p class="text-sm ${appState.theme.textSecondary} mb-1">Promedio</p>
                            <p class="text-2xl font-bold ${appState.theme.textPrimary}">
                                ${incomeTransactions.length > 0 ? formatCurrency(totalIncome / incomeTransactions.length) : '€0'}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Acciones rápidas -->
                    <div class="flex flex-wrap gap-2">
                        <button onclick="appState.repeatPreviousMonth('income')" class="text-sm px-3 py-1 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded hover:bg-white/5">
                            📋 Repetir mes anterior
                        </button>
                        <button onclick="appState.repeatYearlyFromCurrent('income')" class="text-sm px-3 py-1 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded hover:bg-white/5">
                            🔄 Repetir hasta fin de año
                        </button>
                    </div>
                </div>
                
                <!-- Lista de ingresos -->
                <div class="${appState.theme.surface} rounded-2xl shadow-lg p-6">
                    <h3 class="text-lg font-semibold ${appState.theme.textPrimary} mb-4">
                        📋 Ingresos de ${new Date(appState.currentDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </h3>
                    
                    ${incomeTransactions.length > 0 ? `
                        <div class="space-y-3">
                            ${incomeTransactions.map(transaction => this.renderIncomeItem(transaction)).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-8 ${appState.theme.textSecondary}">
                            <p class="text-lg mb-2">📭 No hay ingresos registrados este mes</p>
                            <p class="text-sm">Agrega tu primer ingreso para comenzar</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    },
    
    /**
     * CloudSonnet4: Renderiza un elemento de ingreso individual
     */
    renderIncomeItem(transaction) {
        const date = new Date(transaction.date).toLocaleDateString('es-ES');
        
        return `
            <div class="flex items-center justify-between p-4 ${appState.theme.surface} border ${appState.theme.accentBorder}/30 rounded-lg hover:bg-white/5 transition-colors">
                <div class="flex items-center gap-4">
                    <div class="w-3 h-3 rounded-full ${appState.theme.accentBg}"></div>
                    <div>
                        <p class="font-medium ${appState.theme.textPrimary}">${transaction.description}</p>
                        <p class="text-sm ${appState.theme.textSecondary}">${date}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <p class="text-lg font-bold ${appState.theme.positive}">+${formatCurrency(transaction.amount)}</p>
                    <button onclick="appState.deleteTransaction(${transaction.id})" class="text-red-400 hover:text-red-300 p-1 rounded transition-colors" title="Eliminar">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    },
    
    /**
     * CloudSonnet4: Muestra modal para agregar ingreso
     */
    showAddIncomeModal() {
        const modalContent = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div class="${appState.theme.surface} rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <h3 class="text-xl font-bold ${appState.theme.textPrimary} mb-4">💰 Agregar Ingreso</h3>
                    
                    <form id="income-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium ${appState.theme.textPrimary} mb-2">Descripción</label>
                            <input type="text" id="income-description" required 
                                   class="${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg px-3 py-2 w-full ${appState.theme.textPrimary}"
                                   placeholder="Ej: Salario, Freelance, Venta...">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium ${appState.theme.textPrimary} mb-2">Cantidad</label>
                            <input type="number" id="income-amount" required step="0.01" min="0"
                                   class="${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg px-3 py-2 w-full ${appState.theme.textPrimary}"
                                   placeholder="0.00">
                        </div>
                        
                        <div class="flex gap-2 pt-4">
                            <button type="submit" class="${appState.theme.accentBg} hover:opacity-80 px-4 py-2 rounded-lg text-white font-medium flex-1">
                                Agregar Ingreso
                            </button>
                            <button type="button" onclick="this.closest('.fixed').remove()" class="${appState.theme.surface} border ${appState.theme.accentBorder} hover:bg-white/5 px-4 py-2 rounded-lg ${appState.theme.textPrimary}">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
        
        // Event listener para el formulario
        document.getElementById('income-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const description = document.getElementById('income-description').value.trim();
            const amount = parseFloat(document.getElementById('income-amount').value);
            
            if (description && amount > 0) {
                appState.addTransaction({
                    type: 'income',
                    description: sanitizeHTML(description),
                    amount: amount
                });
                
                // Cerrar modal
                e.target.closest('.fixed').remove();
                
                NotificationSystem.success('Ingreso agregado', `+${formatCurrency(amount)}`);
            }
        });
        
        // Focus en el primer input
        setTimeout(() => {
            document.getElementById('income-description').focus();
        }, 100);
    }
};

// CloudSonnet4: Exportar para uso global
window.IncomeModule = IncomeModule;
