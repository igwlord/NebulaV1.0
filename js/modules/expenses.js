// ===============================================
// 💸 EXPENSES MODULE - CloudSonnet4
// ===============================================

/**
 * 📉 Módulo de gestión de gastos
 * Funcionalidades completas para manejo de gastos mensuales
 */
const ExpensesModule = {
    
    /**
     * CloudSonnet4: Renderiza la vista de gastos
     */
    render() {
        const currentTransactions = appState.data.transactions[appState.currentMonthKey] || [];
        const expenseTransactions = currentTransactions.filter(t => t.type === 'expense');
        const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        // Agrupar por categorías
        const expensesByCategory = this.groupByCategory(expenseTransactions);
        
        return `
            <div class="space-y-6">
                <!-- Header con estadísticas -->
                <div class="${appState.theme.surface} rounded-2xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold ${appState.theme.textPrimary} flex items-center gap-3">
                            💸 Gestión de Gastos
                        </h2>
                        <button onclick="ExpensesModule.showAddExpenseModal()" class="${appState.theme.accentBg} hover:opacity-80 px-4 py-2 rounded-lg text-white font-medium transition-opacity">
                            + Agregar Gasto
                        </button>
                    </div>
                    
                    <!-- Estadísticas del mes -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="text-center p-4 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg">
                            <p class="text-sm ${appState.theme.textSecondary} mb-1">Total gastado</p>
                            <p class="text-2xl font-bold ${appState.theme.negative}">${formatCurrency(totalExpenses)}</p>
                        </div>
                        <div class="text-center p-4 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg">
                            <p class="text-sm ${appState.theme.textSecondary} mb-1">Transacciones</p>
                            <p class="text-2xl font-bold ${appState.theme.accent}">${expenseTransactions.length}</p>
                        </div>
                        <div class="text-center p-4 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg">
                            <p class="text-sm ${appState.theme.textSecondary} mb-1">Gasto promedio</p>
                            <p class="text-2xl font-bold ${appState.theme.textPrimary}">
                                ${expenseTransactions.length > 0 ? formatCurrency(totalExpenses / expenseTransactions.length) : '€0'}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Acciones rápidas -->
                    <div class="flex flex-wrap gap-2">
                        <button onclick="appState.repeatPreviousMonth('expense')" class="text-sm px-3 py-1 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded hover:bg-white/5">
                            📋 Repetir mes anterior
                        </button>
                        <button onclick="appState.repeatYearlyFromCurrent('expense')" class="text-sm px-3 py-1 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded hover:bg-white/5">
                            🔄 Repetir hasta fin de año
                        </button>
                    </div>
                </div>
                
                <!-- Análisis por categorías -->
                ${Object.keys(expensesByCategory).length > 0 ? `
                    <div class="${appState.theme.surface} rounded-2xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold ${appState.theme.textPrimary} mb-4">📊 Gastos por Categoría</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            ${Object.entries(expensesByCategory).map(([category, data]) => `
                                <div class="p-3 ${appState.theme.surface} border ${appState.theme.accentBorder}/30 rounded-lg text-center">
                                    <p class="text-sm ${appState.theme.textSecondary} mb-1">${category}</p>
                                    <p class="font-bold ${appState.theme.negative}">${formatCurrency(data.total)}</p>
                                    <p class="text-xs ${appState.theme.textSecondary}">${data.count} gastos</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Lista de gastos -->
                <div class="${appState.theme.surface} rounded-2xl shadow-lg p-6">
                    <h3 class="text-lg font-semibold ${appState.theme.textPrimary} mb-4">
                        📋 Gastos de ${new Date(appState.currentDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </h3>
                    
                    ${expenseTransactions.length > 0 ? `
                        <div class="space-y-3">
                            ${expenseTransactions.map(transaction => this.renderExpenseItem(transaction)).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-8 ${appState.theme.textSecondary}">
                            <p class="text-lg mb-2">📭 No hay gastos registrados este mes</p>
                            <p class="text-sm">Agrega tu primer gasto para comenzar a llevar control</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    },
    
    /**
     * CloudSonnet4: Agrupa gastos por categoría
     */
    groupByCategory(transactions) {
        const grouped = {};
        
        transactions.forEach(transaction => {
            const category = transaction.category || 'Sin categoría';
            if (!grouped[category]) {
                grouped[category] = { total: 0, count: 0 };
            }
            grouped[category].total += transaction.amount;
            grouped[category].count++;
        });
        
        return grouped;
    },
    
    /**
     * CloudSonnet4: Renderiza un elemento de gasto individual
     */
    renderExpenseItem(transaction) {
        const date = new Date(transaction.date).toLocaleDateString('es-ES');
        const categoryIcon = this.getCategoryIcon(transaction.category);
        
        return `
            <div class="flex items-center justify-between p-4 ${appState.theme.surface} border ${appState.theme.accentBorder}/30 rounded-lg hover:bg-white/5 transition-colors">
                <div class="flex items-center gap-4">
                    <div class="text-2xl">${categoryIcon}</div>
                    <div>
                        <p class="font-medium ${appState.theme.textPrimary}">${transaction.description}</p>
                        <div class="flex items-center gap-2 text-sm ${appState.theme.textSecondary}">
                            <span>${date}</span>
                            <span>•</span>
                            <span class="px-2 py-1 ${appState.theme.surface} border ${appState.theme.accentBorder}/50 rounded text-xs">
                                ${transaction.category || 'Sin categoría'}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <p class="text-lg font-bold ${appState.theme.negative}">-${formatCurrency(transaction.amount)}</p>
                    <button onclick="appState.deleteTransaction(${transaction.id})" class="text-red-400 hover:text-red-300 p-1 rounded transition-colors" title="Eliminar">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    },
    
    /**
     * CloudSonnet4: Obtiene el icono de una categoría
     */
    getCategoryIcon(category) {
        const icons = {
            'Comida': '🍽️',
            'Transporte': '🚗',
            'Ocio': '🎮',
            'Hogar': '🏠',
            'Salud': '⚕️',
            'Educación': '📚',
            'Regalos': '🎁',
            'Varios': '📦'
        };
        return icons[category] || '💰';
    },
    
    /**
     * CloudSonnet4: Muestra modal para agregar gasto
     */
    showAddExpenseModal() {
        const modalContent = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div class="${appState.theme.surface} rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <h3 class="text-xl font-bold ${appState.theme.textPrimary} mb-4">💸 Agregar Gasto</h3>
                    
                    <form id="expense-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium ${appState.theme.textPrimary} mb-2">Descripción</label>
                            <input type="text" id="expense-description" required 
                                   class="${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg px-3 py-2 w-full ${appState.theme.textPrimary}"
                                   placeholder="Ej: Supermercado, Gasolina, Cena...">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium ${appState.theme.textPrimary} mb-2">Cantidad</label>
                            <input type="number" id="expense-amount" required step="0.01" min="0"
                                   class="${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg px-3 py-2 w-full ${appState.theme.textPrimary}"
                                   placeholder="0.00">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium ${appState.theme.textPrimary} mb-2">Categoría</label>
                            <select id="expense-category" 
                                    class="${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg px-3 py-2 w-full ${appState.theme.textPrimary}">
                                ${CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="flex gap-2 pt-4">
                            <button type="submit" class="${appState.theme.accentBg} hover:opacity-80 px-4 py-2 rounded-lg text-white font-medium flex-1">
                                Agregar Gasto
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
        document.getElementById('expense-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const description = document.getElementById('expense-description').value.trim();
            const amount = parseFloat(document.getElementById('expense-amount').value);
            const category = document.getElementById('expense-category').value;
            
            if (description && amount > 0) {
                appState.addTransaction({
                    type: 'expense',
                    description: sanitizeHTML(description),
                    amount: amount,
                    category: category
                });
                
                // Cerrar modal
                e.target.closest('.fixed').remove();
                
                NotificationSystem.warning('Gasto agregado', `-${formatCurrency(amount)}`);
            }
        });
        
        // Focus en el primer input
        setTimeout(() => {
            document.getElementById('expense-description').focus();
        }, 100);
    }
};

// CloudSonnet4: Exportar para uso global
window.ExpensesModule = ExpensesModule;
