// ===============================================
// 📊 DASHBOARD MODULE - CloudSonnet4
// ===============================================

/**
 * 📈 Módulo del Dashboard con diseño rediseñado
 * Contenido reorganizado del círculo central con tipografía mejorada
 */
const DashboardModule = {    /**
     * Renderiza el dashboard rediseñado con nuevo layout
     */
    render() {
        const { balance, netWorth, totalInvestments, totalDebts, totalIncome, totalExpenses } = calculateSummary();
        const nextGoal = this.getNextGoal();
        
        return `
            <div class="${appState.theme.surface} rounded-2xl shadow-lg p-6 mb-6">
                <h2 class="text-2xl font-bold ${appState.theme.textPrimary} mb-6 text-center">
                    📊 Dashboard Financiero
                </h2>
                
                <!-- CloudSonnet4: Dashboard rediseñado con círculo central reorganizado -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <!-- Círculo Central Rediseñado -->
                    <div class="lg:col-span-1 flex justify-center">
                        <div class="relative w-80 h-80">
                            <!-- Círculo principal con diseño mejorado -->
                            <div class="${appState.theme.surface} border-4 ${appState.theme.accentBorder} rounded-full w-full h-full flex flex-col justify-center items-center p-6 shadow-xl ${appState.theme.accentGlow}">
                                
                                <!-- CloudSonnet4: Total del mes (grande) -->
                                <div class="text-center mb-4">
                                    <p class="text-sm ${appState.theme.textSecondary} font-medium uppercase tracking-wide">Total del mes</p>
                                    <p class="text-4xl font-black ${appState.theme.textPrimary} tracking-tight leading-none mt-1">
                                        ${formatCurrency(totalIncome - totalExpenses)}
                                    </p>
                                </div>
                                
                                <!-- CloudSonnet4: Grid de información equilibrada usando CSS Grid -->
                                <div class="grid grid-cols-1 gap-3 text-center w-full max-w-xs">
                                    
                                    <div class="border-t ${appState.theme.accentBorder} pt-3">
                                        <p class="text-xs ${appState.theme.textSecondary} font-medium">Balance mes:</p>
                                        <p class="text-xl font-bold ${balance >= 0 ? appState.theme.positive : appState.theme.negative} mt-1">
                                            ${formatCurrency(balance)}
                                        </p>
                                    </div>
                                    
                                    <div class="border-t ${appState.theme.accentBorder} pt-3">
                                        <p class="text-xs ${appState.theme.textSecondary} font-medium">Próxima meta:</p>
                                        <p class="text-base font-semibold ${appState.theme.accent} mt-1 truncate">
                                            ${nextGoal ? nextGoal.title : 'Sin metas activas'}
                                        </p>
                                        ${nextGoal ? `
                                            <div class="w-full bg-gray-600 rounded-full h-1.5 mt-1">
                                                <div class="${appState.theme.accentBg} h-1.5 rounded-full transition-all duration-300" style="width: ${Math.min((nextGoal.saved / nextGoal.target) * 100, 100)}%"></div>
                                            </div>
                                        ` : ''}
                                    </div>
                                    
                                    <div class="border-t ${appState.theme.accentBorder} pt-3">
                                        <p class="text-xs ${appState.theme.textSecondary} font-medium">Patrimonio total:</p>
                                        <p class="text-xl font-bold ${appState.theme.textPrimary} mt-1">
                                            ${formatCurrency(netWorth)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Estadísticas laterales con mejor diseño -->
                    <div class="lg:col-span-2 space-y-6">
                        ${this.renderStatsCards(totalIncome, totalExpenses, totalInvestments, totalDebts, balance, netWorth)}
                    </div>
                </div>
                
                <!-- Resumen adicional -->
                <div class="mt-8 pt-6 border-t ${appState.theme.accentBorder}/30">
                    ${this.renderQuickActions()}
                </div>
            </div>
            
            <!-- CloudSonnet4: Grid de tarjetas principales -->
            <div class="mt-8">
                <h3 class="text-xl font-semibold ${appState.theme.textPrimary} mb-6">Acceso Rápido</h3>
                ${window.NebulaGridCardsModule ? window.NebulaGridCardsModule.renderMainGrid() : ''}
            </div>
        `;
    },
    
    /**
     * CloudSonnet4: Obtiene la próxima meta más cercana
     */
    getNextGoal() {
        const goals = appState.data.goals || [];
        const activeGoals = goals.filter(goal => !goal.completed);
        
        if (activeGoals.length === 0) return null;
        
        // Ordenar por progreso (menos completadas primero)
        return activeGoals.sort((a, b) => {
            const progressA = (a.currentAmount / a.targetAmount) * 100;
            const progressB = (b.currentAmount / b.targetAmount) * 100;
            return progressB - progressA; // Más cercanas a completar primero
        })[0];
    },
      /**
     * CloudSonnet4: Renderiza las tarjetas de estadísticas mejoradas
     */
    renderStatsCards(totalIncome, totalExpenses, totalInvestments, totalDebts, balance, netWorth) {
        const stats = [
            {
                title: 'Ingresos del mes',
                amount: totalIncome,
                icon: '💰',
                color: appState.theme.positive,
                bgColor: 'bg-emerald-500/20',
                description: 'Total acumulado'
            },
            {
                title: 'Gastos del mes',
                amount: totalExpenses,
                icon: '💸',
                color: appState.theme.negative,
                bgColor: 'bg-rose-500/20',
                description: 'Total gastado'
            },
            {
                title: 'Inversiones activas',
                amount: totalInvestments,
                icon: '📈',
                color: appState.theme.accent,
                bgColor: 'bg-blue-500/20',
                description: `${appState.data.investments.length} inversiones`
            },
            {
                title: 'Deudas pendientes',
                amount: totalDebts,
                icon: '💳',
                color: appState.theme.negative,
                bgColor: 'bg-orange-500/20',
                description: `${appState.data.debts.length} deudas`
            }
        ];
        
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${stats.map(stat => `
                    <div class="${appState.theme.surface} ${stat.bgColor} rounded-xl p-5 border ${appState.theme.accentBorder}/30 hover:scale-102 transition-transform duration-200">
                        <div class="flex items-center justify-between mb-3">
                            <div class="text-3xl">${stat.icon}</div>
                            <div class="text-right">
                                <p class="text-sm ${appState.theme.textSecondary} font-medium">${stat.title}</p>
                                <p class="text-xs ${appState.theme.textSecondary} opacity-75">${stat.description}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold ${stat.color}">${formatCurrency(stat.amount)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    /**
     * CloudSonnet4: Renderiza acciones rápidas
     */
    renderQuickActions() {
        const currentMonth = new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        
        return `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center">
                    <h4 class="font-semibold ${appState.theme.textPrimary} mb-2">📊 Resumen de ${currentMonth}</h4>
                    <div class="space-y-1 text-sm ${appState.theme.textSecondary}">
                        <p>Transacciones registradas</p>
                        <p class="font-bold ${appState.theme.accent}">
                            ${(appState.data.transactions[appState.currentMonthKey] || []).length} operaciones
                        </p>
                    </div>
                </div>
                
                <div class="text-center">
                    <h4 class="font-semibold ${appState.theme.textPrimary} mb-2">🎯 Metas activas</h4>
                    <div class="space-y-1 text-sm ${appState.theme.textSecondary}">
                        <p>Objetivos pendientes</p>
                        <p class="font-bold ${appState.theme.accent}">
                            ${appState.data.goals.filter(g => !g.completed).length} metas
                        </p>
                    </div>
                </div>
                  <div class="text-center">
                    <h4 class="font-semibold ${appState.theme.textPrimary} mb-2">💼 Portfolio</h4>
                    <div class="space-y-1 text-sm ${appState.theme.textSecondary}">
                        <p>Inversiones + Efectivo</p>
                        <p class="font-bold ${appState.theme.accent}">
                            ${formatCurrency(calculateSummary().netWorth)}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.DashboardModule = DashboardModule;
}
