// 🎯 CloudSonnet4 - Módulo de Tarjetas en Grid
// Sistema de tarjetas principales con drag-and-drop y orden persistente

class NebulaGridCardsModule {
    constructor() {
        this.initialized = false;
        this.draggedCard = null;
        this.cardOrder = this.loadCardOrder();
        
        console.log('🎯 Módulo Grid Cards inicializado');
    }

    // 🎯 Inicialización del módulo
    init() {
        if (this.initialized) return;
        
        this.setupEventListeners();
        this.initialized = true;
        
        console.log('✅ Módulo Grid Cards - Listo para usar');
    }

    // 🎯 Configurar eventos
    setupEventListeners() {
        // Manejar eventos de drag and drop
        document.addEventListener('dragstart', (e) => {
            if (e.target.closest('.draggable-card')) {
                this.handleDragStart(e);
            }
        });

        document.addEventListener('dragover', (e) => {
            if (e.target.closest('.draggable-card')) {
                this.handleDragOver(e);
            }
        });

        document.addEventListener('drop', (e) => {
            if (e.target.closest('.draggable-card')) {
                this.handleDrop(e);
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.closest('.draggable-card')) {
                this.handleDragEnd(e);
            }
        });
    }

    // 🎯 Cargar orden de tarjetas desde localStorage
    loadCardOrder() {
        try {
            const saved = localStorage.getItem('nebula_card_order');
            return saved ? JSON.parse(saved) : [
                'dashboard', 'income', 'expenses', 'goals', 
                'investments', 'debts', 'achievements', 'settings'
            ];
        } catch (error) {
            console.error('Error loading card order:', error);
            return ['dashboard', 'income', 'expenses', 'goals', 
                    'investments', 'debts', 'achievements', 'settings'];
        }
    }

    // 🎯 Guardar orden de tarjetas
    saveCardOrder() {
        try {
            localStorage.setItem('nebula_card_order', JSON.stringify(this.cardOrder));
            console.log('✅ Orden de tarjetas guardado');
        } catch (error) {
            console.error('Error saving card order:', error);
        }
    }

    // 🎯 Renderizar grid principal con tarjetas
    renderMainGrid() {
        if (!window.appState) {
            console.error('❌ AppState no disponible');
            return '';
        }

        const currentTheme = window.appState.getCurrentTheme();
        
        // Definir información de cada tarjeta
        const cardInfo = {
            dashboard: {
                title: 'Dashboard',
                description: 'Vista general',
                icon: window.ICONS?.dashboard || 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
                color: currentTheme.accentBg,
                stats: this.getDashboardStats()
            },
            income: {
                title: 'Ingresos',
                description: 'Entradas de dinero',
                icon: window.ICONS?.income || 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
                color: 'bg-emerald-500',
                stats: this.getIncomeStats()
            },
            expenses: {
                title: 'Gastos',
                description: 'Salidas de dinero',
                icon: window.ICONS?.expenses || 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
                color: 'bg-red-500',
                stats: this.getExpensesStats()
            },
            goals: {
                title: 'Metas',
                description: 'Objetivos financieros',
                icon: window.ICONS?.goals || 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                color: 'bg-blue-500',
                stats: this.getGoalsStats()
            },
            investments: {
                title: 'Inversiones',
                description: 'Portafolio',
                icon: window.ICONS?.investments || 'M13 7h8m0 0v8m0-8l-8 8-4-4-4 4',
                color: 'bg-purple-500',
                stats: this.getInvestmentsStats()
            },
            debts: {
                title: 'Deudas',
                description: 'Compromisos',
                icon: window.ICONS?.debts || 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
                color: 'bg-orange-500',
                stats: this.getDebtsStats()
            },
            achievements: {
                title: 'Logros',
                description: 'Reconocimientos',
                icon: window.ICONS?.achievements || 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                color: 'bg-yellow-500',
                stats: this.getAchievementsStats()
            },
            settings: {
                title: 'Configuración',
                description: 'Personalización',
                icon: window.ICONS?.settings || 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
                color: 'bg-gray-500',
                stats: { primary: 'Configurar', secondary: 'Personalizar app' }
            }
        };

        // Renderizar tarjetas en el orden guardado
        const cardsHTML = this.cardOrder.map((cardKey, index) => {
            const info = cardInfo[cardKey];
            if (!info) return '';

            return this.renderCard(cardKey, info, index, currentTheme);
        }).join('');

        return `
            <div class="grid-cards-container">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${cardsHTML}
                </div>
                
                <!-- Información de drag and drop -->
                <div class="mt-6 text-center">
                    <p class="${currentTheme.textSecondary} text-sm">
                        💡 Arrastra las tarjetas para reorganizarlas según tus preferencias
                    </p>
                </div>
            </div>
        `;
    }

    // 🎯 Renderizar tarjeta individual
    renderCard(cardKey, info, index, theme) {
        const isActive = window.appState && window.appState.activeView === cardKey;
        
        return `
            <div class="draggable-card group relative ${theme.surface} rounded-2xl p-6 border ${theme.accentBorder} backdrop-blur-md transition-all duration-300 hover:scale-105 hover:${theme.accentGlow} cursor-pointer ${isActive ? theme.accentGlow + ' ring-2 ' + theme.accentRing : ''}"
                 draggable="true"
                 data-card-id="${cardKey}"
                 data-card-index="${index}"
                 onclick="handleCardClick('${cardKey}')">
                 
                <!-- Icono de drag (solo visible en hover) -->
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity duration-200">
                    <svg class="w-4 h-4 ${theme.textSecondary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </div>

                <!-- Contenido de la tarjeta -->
                <div class="flex items-start space-x-4">
                    <!-- Icono principal -->
                    <div class="w-12 h-12 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${info.icon}"/>
                        </svg>
                    </div>
                    
                    <!-- Información -->
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold ${theme.textPrimary} mb-1">${info.title}</h3>
                        <p class="${theme.textSecondary} text-sm mb-3">${info.description}</p>
                        
                        <!-- Estadísticas -->
                        <div class="space-y-1">
                            <div class="${theme.accent} font-medium text-sm">${info.stats.primary}</div>
                            <div class="${theme.textSecondary} text-xs">${info.stats.secondary}</div>
                        </div>
                    </div>
                </div>

                <!-- Indicador de sección activa -->
                ${isActive ? `
                    <div class="absolute inset-0 rounded-2xl border-2 ${theme.accentBorder} pointer-events-none">
                        <div class="absolute -top-1 -right-1 w-3 h-3 ${theme.accentBg} rounded-full animate-pulse"></div>
                    </div>
                ` : ''}
            </div>
        `;
    }    // 🎯 Obtener estadísticas del dashboard
    getDashboardStats() {
        if (!window.appState) return { primary: 'Cargando...', secondary: 'Datos no disponibles' };
        
        const balance = window.appState.calculateBalance();
        
        return {
            primary: `$${balance.toLocaleString()}`,
            secondary: 'Balance actual'
        };
    }

    // 🎯 Obtener estadísticas de ingresos
    getIncomeStats() {
        if (!window.appState) return { primary: 'Cargando...', secondary: 'Datos no disponibles' };
        
        const currentMonth = window.appState.currentDate.toISOString().substring(0, 7);
        const transactions = window.appState.data.transactions[currentMonth] || [];
        const income = transactions.filter(t => t.type === 'income');
        const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
        
        return {
            primary: `$${totalIncome.toLocaleString()}`,
            secondary: `${income.length} ingresos este mes`
        };
    }

    // 🎯 Obtener estadísticas de gastos
    getExpensesStats() {
        if (!window.appState) return { primary: 'Cargando...', secondary: 'Datos no disponibles' };
        
        const currentMonth = window.appState.currentDate.toISOString().substring(0, 7);
        const transactions = window.appState.data.transactions[currentMonth] || [];
        const expenses = transactions.filter(t => t.type === 'expense');
        const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
        
        return {
            primary: `$${totalExpenses.toLocaleString()}`,
            secondary: `${expenses.length} gastos este mes`
        };
    }

    // 🎯 Obtener estadísticas de metas
    getGoalsStats() {
        if (!window.appState) return { primary: 'Cargando...', secondary: 'Datos no disponibles' };
        
        const goals = window.appState.data.goals || [];
        const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount);
        
        return {
            primary: `${completedGoals.length}/${goals.length}`,
            secondary: 'Metas completadas'
        };
    }

    // 🎯 Obtener estadísticas de inversiones
    getInvestmentsStats() {
        if (!window.appState) return { primary: 'Cargando...', secondary: 'Datos no disponibles' };
        
        const investments = window.appState.data.investments || [];
        const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
        
        return {
            primary: `$${totalValue.toLocaleString()}`,
            secondary: `${investments.length} inversiones`
        };
    }

    // 🎯 Obtener estadísticas de deudas
    getDebtsStats() {
        if (!window.appState) return { primary: 'Cargando...', secondary: 'Datos no disponibles' };
        
        const debts = window.appState.data.debts || [];
        const totalDebt = debts.reduce((sum, debt) => sum + (debt.amount - (debt.paidAmount || 0)), 0);
        
        return {
            primary: `$${totalDebt.toLocaleString()}`,
            secondary: `${debts.length} deudas pendientes`
        };
    }

    // 🎯 Obtener estadísticas de logros
    getAchievementsStats() {
        return {
            primary: 'Próximamente',
            secondary: 'Sistema de logros'
        };
    }

    // 🎯 Manejar inicio de arrastre
    handleDragStart(e) {
        const card = e.target.closest('.draggable-card');
        if (!card) return;

        this.draggedCard = {
            element: card,
            id: card.dataset.cardId,
            index: parseInt(card.dataset.cardIndex)
        };

        // Estilo visual durante el drag
        card.classList.add('opacity-50');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', card.outerHTML);
    }

    // 🎯 Manejar movimiento sobre elemento
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const card = e.target.closest('.draggable-card');
        if (card && this.draggedCard && card !== this.draggedCard.element) {
            // Efecto visual de drop zone
            card.classList.add('ring-2', 'ring-blue-400', 'ring-opacity-50');
        }
    }

    // 🎯 Manejar drop
    handleDrop(e) {
        e.preventDefault();
        
        const targetCard = e.target.closest('.draggable-card');
        if (!targetCard || !this.draggedCard || targetCard === this.draggedCard.element) {
            return;
        }

        const targetIndex = parseInt(targetCard.dataset.cardIndex);
        const draggedIndex = this.draggedCard.index;

        // Reordenar array
        const draggedCardId = this.cardOrder[draggedIndex];
        this.cardOrder.splice(draggedIndex, 1);
        this.cardOrder.splice(targetIndex, 0, draggedCardId);

        // Guardar nuevo orden
        this.saveCardOrder();

        // Recargar vista si estamos en dashboard
        if (window.appState && window.appState.activeView === 'dashboard') {
            window.loadSection('dashboard');
        }

        // Notificación
        if (window.NotificationSystem) {
            window.NotificationSystem.success('Tarjetas reorganizadas', 'El nuevo orden se ha guardado automáticamente');
        }
    }

    // 🎯 Manejar fin de arrastre
    handleDragEnd(e) {
        const card = e.target.closest('.draggable-card');
        if (card) {
            card.classList.remove('opacity-50');
        }

        // Limpiar efectos visuales de todos los elementos
        document.querySelectorAll('.draggable-card').forEach(c => {
            c.classList.remove('ring-2', 'ring-blue-400', 'ring-opacity-50');
        });

        this.draggedCard = null;
    }

    // 🎯 Resetear orden predeterminado
    resetCardOrder() {
        this.cardOrder = [
            'dashboard', 'income', 'expenses', 'goals', 
            'investments', 'debts', 'achievements', 'settings'
        ];
        this.saveCardOrder();
        
        // Recargar vista si estamos en dashboard
        if (window.appState && window.appState.activeView === 'dashboard') {
            window.loadSection('dashboard');
        }

        if (window.NotificationSystem) {
            window.NotificationSystem.success('Orden restaurado', 'Las tarjetas volvieron a su orden original');
        }
    }
}

// 🎯 Función global para manejar clics en tarjetas
window.handleCardClick = function(cardKey) {
    if (window.appState) {
        window.appState.activeView = cardKey;
        window.loadSection(cardKey);
    }
};

// 🎯 Instancia global
window.NebulaGridCardsModule = new NebulaGridCardsModule();

// 🎯 Auto-inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.NebulaGridCardsModule.init();
    });
} else {
    window.NebulaGridCardsModule.init();
}
