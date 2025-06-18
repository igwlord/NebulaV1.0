/**
 * 🎯 NEBULA FINANCIAL - DASHBOARD COMPONENT
 * =========================================
 * Componente principal del dashboard
 */

import { createIcon, formatCurrency, ICONS, getMonthKey } from '../utils/helpers.js';

class DashboardComponent {
    constructor() {
        this.data = null;
    }
    
    /**
     * 📊 Renderizar dashboard
     */
    render() {
        const { balance, netWorth } = this.calculateSummary();
        const firstGoal = this.getFirstGoal();
        const monthsToGoal = this.calculateMonthsToGoal(firstGoal);
        
        const infoHTML = this.renderDashboardInfo(netWorth, balance, monthsToGoal);
        
        return `
            <div class="flex flex-col items-center justify-center h-[calc(100vh-250px)] relative">
                <div class="w-80 h-80 sm:w-96 sm:h-96 rounded-full flex items-center justify-center text-center transition-all duration-500" 
                     style="background: radial-gradient(circle at 30% 30%, ${window.appState?.theme?.sunColor || '#FFD700'}, ${window.appState?.theme?.accentColor || '#FFD700'}aa 60%, ${window.appState?.theme?.accentColor || '#FFD700'}44 100%); 
                            box-shadow: 0 0 40px 10px ${window.appState?.theme?.sunColor || '#FFD700'}60, 
                                       0 0 80px 30px ${window.appState?.theme?.sunColor || '#FFD700'}30, 
                                       0 0 120px 50px ${window.appState?.theme?.sunColor || '#FFD700'}20,
                                       inset 0 0 30px ${window.appState?.theme?.sunColor || '#FFD700'}20;">
                    ${infoHTML}
                </div>
                
                <!-- Rayos de sol sutiles -->
                <div class="absolute inset-0 pointer-events-none">
                    ${Array.from({length: 8}, (_, i) => `
                        <div class="absolute w-1 h-20 origin-bottom animate-pulse" 
                             style="background: linear-gradient(to top, ${window.appState?.theme?.sunColor || '#FFD700'}20, transparent);
                                    left: 50%; top: 50%; 
                                    transform: translate(-50%, -100%) rotate(${i * 45}deg);
                                    animation-delay: ${i * 0.2}s;
                                    opacity: 0.6;">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    /**
     * 📈 Calcular resumen financiero
     */
    calculateSummary() {
        if (!window.appState?.data) {
            return { balance: 0, netWorth: 0 };
        }
        
        const currentMonthKey = getMonthKey();
        const currentTransactions = window.appState.data.transactions[currentMonthKey] || [];
        
        const monthlyIncome = currentTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const monthlyExpenses = currentTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const balance = monthlyIncome - monthlyExpenses;
        
        // Calcular patrimonio neto (incluye inversiones)
        const investmentValue = window.appState.data.investments?.reduce((sum, inv) => sum + inv.currentAmount, 0) || 0;
        const totalDebts = window.appState.data.debts?.reduce((sum, debt) => sum + debt.amount, 0) || 0;
        
        const netWorth = balance + investmentValue - totalDebts;
        
        return { balance, netWorth };
    }
    
    /**
     * 🎯 Obtener primera meta
     */
    getFirstGoal() {
        return window.appState?.data?.goals?.[0] || null;
    }
    
    /**
     * 📅 Calcular meses para alcanzar meta
     */
    calculateMonthsToGoal(goal) {
        if (!goal) return "Sin metas";
        
        const allTransactions = Object.values(window.appState.data.transactions).flat();
        const globalIncome = allTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const globalExpenses = allTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        
        const firstDate = allTransactions.length > 0 
            ? new Date(allTransactions.reduce((min, t) => Math.min(min, new Date(t.date).getTime()), Date.now())) 
            : new Date();
            
        const monthsDiff = Math.max(1, (new Date().getFullYear() - firstDate.getFullYear()) * 12 + (new Date().getMonth() - firstDate.getMonth()) + 1);
        const monthlySavings = (globalIncome - globalExpenses) / monthsDiff;
        
        return monthlySavings > 0 ? `${Math.ceil((goal.target - goal.saved) / monthlySavings)} meses` : '∞';
    }
    
    /**
     * 📊 Renderizar información del dashboard
     */
    renderDashboardInfo(netWorth, balance, monthsToGoal) {
        const isPrivate = window.appState?.isPrivate ?? false;
        
        if (isPrivate) {            return `
                <div class="flex flex-col items-center justify-center text-slate-900/70 backdrop-blur-sm p-10 rounded-full cursor-pointer" id="privacy-toggle">
                    ${createIcon(ICONS.eyeOff, "w-20 h-20")}
                    <p class="font-semibold mt-2">Información Oculta</p>
                </div>
            `;
        }
        
        return `
            <div class="flex flex-col items-center justify-center text-slate-900 w-full h-full">
                <div class="relative mb-4">
                    <div class="flex items-center gap-2">
                        <p class="text-sm font-medium opacity-70">Patrimonio Neto</p>                        <button id="privacy-toggle" class="text-slate-900/50 hover:text-slate-900 transition-colors" title="Ocultar información">
                            ${createIcon(ICONS.eye, "w-5 h-5")}
                        </button>
                    </div>
                    <p class="text-4xl font-bold">${formatCurrency(netWorth)}</p>
                </div>
                <div class="flex justify-around w-full text-sm">
                    <div>
                        <p class="font-medium opacity-70">Balance (Mes)</p>
                        <p class="font-semibold text-lg">${formatCurrency(balance)}</p>
                    </div>
                    <div class="border-l border-slate-900/30"></div>
                    <div>
                        <p class="font-medium opacity-70">Próxima Meta</p>
                        <p class="font-semibold text-lg">${monthsToGoal}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

/**
 * 🎯 Función de renderizado para el dashboard
 */
export function renderDashboard() {
    const dashboardComponent = new DashboardComponent();
    return dashboardComponent.render();
}

// Exportar componente
window.DashboardComponent = DashboardComponent;
