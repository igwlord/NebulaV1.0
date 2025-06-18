/**
 * 💰 NEBULA FINANCIAL - TRANSACTIONS COMPONENT
 * ============================================
 * Componente para gestión de transacciones
 * 
 * CloudSonnet4: Correcciones aplicadas
 * - Fix en renderTransactionsView: pasar parámetro type correctamente al render()  
 * - Títulos diferenciados para secciones "Ingresos" y "Gastos"
 * - Tooltips específicos para cada sección con descripciones útiles
 * - Eliminación de duplicación en la sección "Gestión de Ingresos"
 * - Formateo automático de miles aplicado a inputs numéricos (.numeric-input)
 */

import { createIcon, formatCurrency, ICONS, CATEGORIES, getMonthKey, generateId, saveToLocalStorage } from '../utils/helpers.js';

class TransactionsComponent {
    constructor() {
        this.type = 'income'; // 'income' o 'expense'
    }
    
    /**
     * 💰 Renderizar vista de transacciones
     */    render(type = 'income') {
        this.type = type;
        // CloudSonnet4: Títulos diferenciados y tooltips específicos
        const title = type === 'income' ? 'Ingresos' : 'Gastos';
        const tooltip = type === 'income' 
            ? 'Añade todos tus ingresos regulares aquí' 
            : 'Registra cada gasto para controlar tu presupuesto';
        const isExpense = type === 'expense';
        
        const currentMonthKey = getMonthKey();
        const currentMonthTransactions = window.appState?.data?.transactions?.[currentMonthKey] || [];
        
        const transactionsHTML = this.renderTransactionsList(currentMonthTransactions.filter(t => t.type === type));
        const categoryFieldHTML = isExpense ? this.renderCategoryField() : '';
        
        return `
            <div class="${window.appState?.theme?.surface || 'bg-black/20'} rounded-2xl shadow-lg p-6 backdrop-blur-md">
                <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <div>
                        <h2 class="text-2xl font-bold ${window.appState?.theme?.textPrimary || 'text-white'}">
                            ${type === 'income' ? '💰' : '💸'} ${title}
                        </h2>
                        <p class="text-sm ${window.appState?.theme?.textSecondary || 'text-gray-400'} mt-1" title="${tooltip}">
                            ${tooltip}
                        </p>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-2">
                        <button id="repeat-month-button" data-type="${type}" class="flex items-center gap-2 text-sm ${window.appState?.theme?.textSecondary || 'text-gray-300'} hover:${window.appState?.theme?.accent || 'text-white'} transition-colors px-3 py-2 rounded-lg hover:bg-black/10 backdrop-blur-sm" title="Copia las transacciones del mes anterior">
                           ${createIcon(ICONS.history, 'w-4 h-4')} Repetir Mes Anterior
                        </button>
                        <button id="repeat-yearly-button" data-type="${type}" class="flex items-center gap-2 text-sm ${window.appState?.theme?.textSecondary || 'text-gray-300'} hover:${window.appState?.theme?.accent || 'text-white'} transition-colors px-3 py-2 rounded-lg hover:bg-black/10 backdrop-blur-sm" title="Copia estas transacciones hasta fin de año">
                           ${createIcon(ICONS.repeat, 'w-4 h-4')} Repetir Anualmente
                        </button>
                    </div>
                </div>
                
                <form id="transaction-form" class="grid grid-cols-1 md:grid-cols-${isExpense ? '4' : '2'} gap-4 mb-8 items-end">
                    <div class="${isExpense ? 'md:col-span-2' : ''}">
                        <label class="block text-sm font-medium ${window.appState?.theme?.textSecondary || 'text-gray-300'} mb-1">Descripción</label>
                        <input type="text" name="description" placeholder="Ej: Salario, Supermercado..." class="w-full bg-black/20 ${window.appState?.theme?.textPrimary || 'text-white'} rounded-md p-2 border border-white/20 focus:ring-2 ${window.appState?.theme?.accentRing || 'focus:ring-blue-500'} focus:outline-none backdrop-blur-md" required />
                    </div>
                    
                    ${categoryFieldHTML}

                    <div>
                        <label class="block text-sm font-medium ${window.appState?.theme?.textSecondary || 'text-gray-300'} mb-1">Monto</label>
                        <input type="text" inputmode="numeric" name="amount" placeholder="0" class="numeric-input w-full bg-black/20 ${window.appState?.theme?.textPrimary || 'text-white'} rounded-md p-2 border border-white/20 focus:ring-2 ${window.appState?.theme?.accentRing || 'focus:ring-blue-500'} focus:outline-none backdrop-blur-md" required />
                    </div>

                    <div class="md:col-span-full">
                        <button type="submit" class="w-full mt-2 ${window.appState?.theme?.accentBg || 'bg-blue-600'} text-slate-900 font-bold py-3 px-4 rounded-md hover:opacity-90 transition-opacity ${window.appState?.theme?.accentGlow || ''} flex items-center justify-center gap-2">
                            ${createIcon(ICONS.plus)} Agregar ${title.slice(0,-1)}
                        </button>
                    </div>
                </form>
                
                <div class="mt-6">
                    <h3 class="text-xl font-semibold ${window.appState?.theme?.textPrimary || 'text-white'} mb-4">Historial del Mes</h3>
                    <ul class="space-y-3">
                        ${transactionsHTML || `<p class="${window.appState?.theme?.textSecondary || 'text-gray-300'} text-center py-4">No hay transacciones aún.</p>`}
                    </ul>
                </div>
            </div>
        `;
    }
    
    /**
     * 📝 Renderizar lista de transacciones
     */
    renderTransactionsList(transactions) {
        return transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(t => `
                <li class="${window.appState?.theme?.surface || 'bg-black/20'} p-4 rounded-lg flex justify-between items-center transition-all hover:bg-black/10 backdrop-blur-sm">
                    <div>
                        <p class="font-semibold ${window.appState?.theme?.textPrimary || 'text-white'}">${t.description}</p>
                        <div class="flex items-center gap-2 mt-1">
                            ${this.type === 'expense' && t.category ? `<p class="text-xs font-medium px-2 py-0.5 rounded-full" style="background-color:${window.appState?.theme?.accentColor || '#FFD700'}30; color:${window.appState?.theme?.accentColor || '#FFD700'}">${t.category}</p>` : ''}
                            <p class="text-xs ${window.appState?.theme?.textSecondary || 'text-gray-300'}">${new Date(t.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <p class="font-bold text-lg ${this.type === 'income' ? (window.appState?.theme?.positive || 'text-green-400') : (window.appState?.theme?.negative || 'text-red-400')}">
                            ${formatCurrency(t.amount)}
                        </p>
                        <button class="delete-transaction-button text-red-500/70 hover:text-red-500 transition-colors" data-transaction-id="${t.id}" title="Eliminar transacción">
                            ${createIcon(ICONS.trash, 'w-5 h-5')}
                        </button>
                    </div>
                </li>
            `).join('');
    }
    
    /**
     * 📂 Renderizar campo de categoría
     */
    renderCategoryField() {
        const categoryOptionsHTML = CATEGORIES.map(cat => 
            `<option class="bg-slate-800" value="${cat}">${cat}</option>`
        ).join('');
        
        return `
            <div>
                <label class="block text-sm font-medium ${window.appState?.theme?.textSecondary || 'text-gray-300'} mb-1">Categoría</label>
                <select name="category" class="w-full bg-black/20 ${window.appState?.theme?.textPrimary || 'text-white'} rounded-md p-2 border border-white/20 focus:ring-2 ${window.appState?.theme?.accentRing || 'focus:ring-blue-500'} focus:outline-none backdrop-blur-md" required>
                    ${categoryOptionsHTML}
                </select>
            </div>
        `;
    }
    
    /**
     * 💾 Agregar nueva transacción
     */
    addTransaction(transactionData) {
        if (!window.appState?.data?.transactions) {
            window.appState.data = { ...window.appState.data, transactions: {} };
        }
          const monthKey = getMonthKey();
        if (!window.appState.data.transactions[monthKey]) {
            window.appState.data.transactions[monthKey] = [];
        }
        
        const newTransaction = {
            id: generateId(),
            ...transactionData,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
          window.appState.data.transactions[monthKey].push(newTransaction);
        
        // Guardar en localStorage
        saveToLocalStorage('financialData', window.appState.data);
        
        return newTransaction;
    }
      /**
     * 🗑️ Eliminar transacción
     * CloudSonnet4: Mejorado para manejar repeticiones anuales
     */    
    deleteTransaction(transactionId) {
        const monthKey = getMonthKey();
        let deletedCount = 0;
        
        // Buscar y eliminar la transacción en el mes actual
        const transactions = window.appState?.data?.transactions?.[monthKey];
        if (transactions) {
            const index = transactions.findIndex(t => t.id === transactionId);
            if (index > -1) {
                const transaction = transactions[index];
                transactions.splice(index, 1);
                deletedCount++;
                
                // CloudSonnet4: Si tiene repetición anual, eliminar todas las instancias futuras
                if (transaction.repeatYearly) {
                    const allMonthKeys = Object.keys(window.appState.data.transactions);
                    allMonthKeys.forEach(key => {
                        if (key > monthKey) { // Solo meses futuros
                            const futureTransactions = window.appState.data.transactions[key];
                            const futureIndex = futureTransactions.findIndex(t => 
                                t.originalId === transactionId || 
                                (t.description === transaction.description && 
                                 t.amount === transaction.amount && 
                                 t.type === transaction.type &&
                                 t.repeatYearly)
                            );
                            if (futureIndex > -1) {
                                futureTransactions.splice(futureIndex, 1);
                                deletedCount++;
                            }
                        }
                    });
                }
                
                saveToLocalStorage('financialData', window.appState.data);
                
                // Mostrar mensaje informativo
                if (deletedCount > 1) {
                    window.NotificationSystem?.show(`Eliminadas ${deletedCount} transacciones (incluyendo repeticiones anuales)`, 'success');
                }
                
                return true;
            }
        }
        
        return false;
    }
}

/**
 * 🎯 Función de renderizado para transacciones
 * @param {string} type - Tipo de transacción ('income' o 'expense')
 */
export function renderTransactionsView(type = 'income') {
    const transactionsComponent = new TransactionsComponent();
    transactionsComponent.type = type;
    // CloudSonnet4: Fix para pasar el tipo correctamente al render
    return transactionsComponent.render(type);
}

// Exportar componente
window.TransactionsComponent = TransactionsComponent;
