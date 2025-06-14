/**
 * 💰 NEBULA FINANCIAL - TRANSACTIONS COMPONENT
 * ============================================
 * Componente para gestión de transacciones
 */

import { createIcon, formatCurrency, ICONS, CATEGORIES, getMonthKey, generateId, saveToLocalStorage } from '../utils/helpers.js';

class TransactionsComponent {
    constructor() {
        this.type = 'income'; // 'income' o 'expense'
    }
    
    /**
     * 💰 Renderizar vista de transacciones
     */
    render(type = 'income') {
        this.type = type;
        const title = type === 'income' ? 'Ingresos' : 'Gastos';
        const isExpense = type === 'expense';
        
        const currentMonthKey = getMonthKey();
        const currentMonthTransactions = window.appState?.data?.transactions?.[currentMonthKey] || [];
        
        const transactionsHTML = this.renderTransactionsList(currentMonthTransactions.filter(t => t.type === type));
        const categoryFieldHTML = isExpense ? this.renderCategoryField() : '';
        
        return `
            <div class="${window.appState?.theme?.surface || 'bg-black/20'} rounded-2xl shadow-lg p-6 backdrop-blur-md">
                <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h2 class="text-2xl font-bold ${window.appState?.theme?.textPrimary || 'text-white'}">💰 Gestión de ${title}</h2>
                    
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
     */    deleteTransaction(transactionId) {
        const monthKey = getMonthKey();
        const transactions = window.appState?.data?.transactions?.[monthKey];
        
        if (transactions) {
            const index = transactions.findIndex(t => t.id === transactionId);
            if (index > -1) {
                transactions.splice(index, 1);
                saveToLocalStorage('financialData', window.appState.data);
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
    return transactionsComponent.render();
}

// Exportar componente
window.TransactionsComponent = TransactionsComponent;
