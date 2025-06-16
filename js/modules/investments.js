// 📈 CloudSonnet4 - Módulo de Inversiones
// Gestión completa de inversiones y portafolio

class NebulaInvestmentsModule {
    constructor() {
        this.initialized = false;
        this.currentView = 'list';
        this.editingInvestment = null;
        
        console.log('📈 Módulo de Inversiones inicializado');
    }

    // 📈 Inicialización del módulo
    init() {
        if (this.initialized) return;
        
        this.setupEventListeners();
        this.initialized = true;
        
        console.log('✅ Módulo de Inversiones - Listo para usar');
    }

    // 📈 Configurar eventos
    setupEventListeners() {
        // Event delegation para botones dinámicos
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="add-investment"]')) {
                this.showAddInvestmentForm();
            } else if (e.target.matches('[data-action="edit-investment"]')) {
                const investmentId = parseInt(e.target.dataset.investmentId);
                this.editInvestment(investmentId);
            } else if (e.target.matches('[data-action="delete-investment"]')) {
                const investmentId = parseInt(e.target.dataset.investmentId);
                this.deleteInvestment(investmentId);
            } else if (e.target.matches('[data-action="save-investment"]')) {
                this.saveInvestment();
            } else if (e.target.matches('[data-action="cancel-investment"]')) {
                this.cancelInvestmentEdit();
            }
        });

        // Evento para cerrar modales con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentView === 'form') {
                this.cancelInvestmentEdit();
            }
        });
    }

    // 📈 Renderizar vista principal de inversiones
    render() {
        if (!window.appState) {
            console.error('❌ AppState no disponible');
            return '';
        }

        const investments = window.appState.data.investments || [];
        const currentTheme = window.appState.getCurrentTheme();
        
        // Calcular estadísticas del portafolio
        const stats = this.calculatePortfolioStats(investments);
        
        return `
            <div class="investments-container h-full">
                <!-- Header con título y botón agregar -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-xl ${currentTheme.accentBg} flex items-center justify-center ${currentTheme.accentGlow}">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 3v18h18"/><path d="m4 14 4-4 4 4 6-6"/>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold ${currentTheme.textPrimary}">Inversiones</h2>
                            <p class="${currentTheme.textSecondary}">Portafolio y rendimientos</p>
                        </div>
                    </div>
                    <button data-action="add-investment" 
                            class="px-4 py-2 ${currentTheme.accentBg} text-white rounded-lg hover:opacity-90 transition-all duration-200 ${currentTheme.accentGlow} font-medium">
                        <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        Nueva Inversión
                    </button>
                </div>

                <!-- Resumen del portafolio -->
                ${investments.length > 0 ? this.renderPortfolioSummary(stats, currentTheme) : ''}

                <!-- Lista de inversiones -->
                <div class="investments-grid space-y-4">
                    ${investments.length === 0 ? this.renderEmptyState(currentTheme) : 
                      investments.map(investment => this.renderInvestmentCard(investment, currentTheme)).join('')}
                </div>
            </div>
        `;
    }

    // 📈 Calcular estadísticas del portafolio
    calculatePortfolioStats(investments) {
        const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
        const totalCurrent = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalGainLoss = totalCurrent - totalInvested;
        const totalReturnPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;
        
        return {
            totalInvested,
            totalCurrent,
            totalGainLoss,
            totalReturnPercentage,
            investmentCount: investments.length
        };
    }

    // 📈 Renderizar resumen del portafolio
    renderPortfolioSummary(stats, theme) {
        const isPositive = stats.totalGainLoss >= 0;
        const gainLossColor = isPositive ? theme.positive : theme.negative;
        const trendIcon = isPositive ? '↗️' : '↘️';
        
        return `
            <div class="${theme.surface} rounded-xl p-6 mb-6 border ${theme.accentBorder} backdrop-blur-md">
                <h3 class="text-lg font-semibold ${theme.textPrimary} mb-4">Resumen del Portafolio</h3>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="${theme.textSecondary} text-sm mb-1">Invertido</div>
                        <div class="${theme.textPrimary} font-semibold text-lg">$${stats.totalInvested.toLocaleString()}</div>
                    </div>
                    <div class="text-center">
                        <div class="${theme.textSecondary} text-sm mb-1">Valor Actual</div>
                        <div class="${theme.accent} font-semibold text-lg">$${stats.totalCurrent.toLocaleString()}</div>
                    </div>
                    <div class="text-center">
                        <div class="${theme.textSecondary} text-sm mb-1">Ganancia/Pérdida</div>
                        <div class="${gainLossColor} font-semibold text-lg">
                            ${trendIcon} $${Math.abs(stats.totalGainLoss).toLocaleString()}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="${theme.textSecondary} text-sm mb-1">Rendimiento</div>
                        <div class="${gainLossColor} font-semibold text-lg">
                            ${stats.totalReturnPercentage.toFixed(2)}%
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 📈 Renderizar estado vacío
    renderEmptyState(theme) {
        return `
            <div class="text-center py-12">
                <div class="w-20 h-20 mx-auto mb-4 rounded-full ${theme.surface} flex items-center justify-center">
                    <svg class="w-10 h-10 ${theme.textSecondary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3v18h18"/><path d="m4 14 4-4 4 4 6-6"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold ${theme.textPrimary} mb-2">Sin inversiones registradas</h3>
                <p class="${theme.textSecondary} mb-6">Comienza a construir tu portafolio de inversiones</p>
                <button data-action="add-investment" 
                        class="px-6 py-3 ${theme.accentBg} text-white rounded-lg hover:opacity-90 transition-all duration-200 ${theme.accentGlow} font-medium">
                    Registrar primera inversión
                </button>
            </div>
        `;
    }

    // 📈 Renderizar tarjeta de inversión
    renderInvestmentCard(investment, theme) {
        const gainLoss = investment.currentValue - investment.amount;
        const returnPercentage = investment.amount > 0 ? (gainLoss / investment.amount) * 100 : 0;
        const isPositive = gainLoss >= 0;
        const gainLossColor = isPositive ? theme.positive : theme.negative;
        const trendIcon = isPositive ? '📈' : '📉';
        
        return `
            <div class="${theme.surface} rounded-xl p-6 border ${theme.accentBorder} backdrop-blur-md">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <h3 class="text-lg font-semibold ${theme.textPrimary}">${investment.name}</h3>
                            <span class="text-xs px-2 py-1 rounded-full ${theme.accentBg} text-white">${investment.type}</span>
                        </div>
                        <p class="${theme.textSecondary} text-sm">${investment.description || 'Sin descripción'}</p>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button data-action="edit-investment" data-investment-id="${investment.id}"
                                class="p-2 ${theme.surface} hover:${theme.accentBg} rounded-lg transition-all duration-200 ${theme.textSecondary} hover:text-white"
                                title="Editar inversión">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        <button data-action="delete-investment" data-investment-id="${investment.id}"
                                class="p-2 ${theme.surface} hover:bg-red-500 rounded-lg transition-all duration-200 ${theme.textSecondary} hover:text-white"
                                title="Eliminar inversión">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Información financiera -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center p-3 ${theme.surface} rounded-lg border ${theme.accentBorder}">
                        <div class="${theme.textSecondary} text-xs mb-1">Invertido</div>
                        <div class="${theme.textPrimary} font-semibold">$${investment.amount.toLocaleString()}</div>
                    </div>
                    <div class="text-center p-3 ${theme.surface} rounded-lg border ${theme.accentBorder}">
                        <div class="${theme.textSecondary} text-xs mb-1">Valor Actual</div>
                        <div class="${theme.accent} font-semibold">$${investment.currentValue.toLocaleString()}</div>
                    </div>
                </div>

                <!-- Rendimiento -->
                <div class="text-center p-3 ${theme.surface} rounded-lg border ${theme.accentBorder}">
                    <div class="flex items-center justify-center space-x-2 mb-1">
                        <span class="${theme.textSecondary} text-xs">Rendimiento</span>
                        <span class="text-lg">${trendIcon}</span>
                    </div>
                    <div class="flex items-center justify-center space-x-4">
                        <div class="${gainLossColor} font-semibold">
                            ${isPositive ? '+' : ''}$${Math.abs(gainLoss).toLocaleString()}
                        </div>
                        <div class="${gainLossColor} font-semibold">
                            ${isPositive ? '+' : ''}${returnPercentage.toFixed(2)}%
                        </div>
                    </div>
                </div>

                <!-- Fecha de inversión -->
                <div class="mt-4 pt-4 border-t border-white/10">
                    <div class="flex items-center justify-center space-x-2 ${theme.textSecondary} text-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"/>
                        </svg>
                        <span>Invertido el: ${new Date(investment.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // 📈 Mostrar formulario de nueva inversión
    showAddInvestmentForm() {
        this.editingInvestment = null;
        this.currentView = 'form';
        this.showInvestmentModal();
    }

    // 📈 Editar inversión existente
    editInvestment(investmentId) {
        const investment = window.appState.data.investments.find(i => i.id === investmentId);
        if (!investment) {
            console.error('Inversión no encontrada:', investmentId);
            return;
        }
        
        this.editingInvestment = investment;
        this.currentView = 'form';
        this.showInvestmentModal(investment);
    }

    // 📈 Mostrar modal de inversión
    showInvestmentModal(investment = null) {
        const currentTheme = window.appState.getCurrentTheme();
        const isEdit = investment !== null;
        
        const investmentTypes = [
            'Acciones', 'Bonos', 'Fondos Mutuos', 'ETF', 'Criptomonedas', 
            'Bienes Raíces', 'Commodities', 'Forex', 'Otros'
        ];
        
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="${currentTheme.surface} rounded-2xl p-6 w-full max-w-md border ${currentTheme.accentBorder} backdrop-blur-md">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold ${currentTheme.textPrimary}">
                            ${isEdit ? 'Editar Inversión' : 'Nueva Inversión'}
                        </h3>
                        <button data-action="cancel-investment" class="${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <form id="investment-form" class="space-y-4">
                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Nombre de la inversión</label>                            <input type="text" id="investment-name" value="${investment?.name || ''}" required
                                   class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                   placeholder="Ej: Acciones de Adamantium">
                        </div>

                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Tipo de inversión</label>
                            <select id="investment-type" required
                                    class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200">
                                <option value="">Seleccionar tipo</option>
                                ${investmentTypes.map(type => 
                                    `<option value="${type}" ${investment?.type === type ? 'selected' : ''}>${type}</option>`
                                ).join('')}
                            </select>
                        </div>

                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Descripción (opcional)</label>
                            <textarea id="investment-description" rows="2"
                                      class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200 resize-none"
                                      placeholder="Detalles adicionales sobre la inversión...">${investment?.description || ''}</textarea>
                        </div>                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Monto invertido</label>                                <input type="text" id="investment-amount" value="${investment?.amount ? window.formatThousands(investment.amount) : ''}" required
                                       class="numeric-input w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                       placeholder="Ej: 75.000 o 2.500.000"
                                       title="Monto original invertido">
                            </div>
                            <div>
                                <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Valor actual</label>                                <input type="text" id="investment-current" value="${investment?.currentValue ? window.formatThousands(investment.currentValue) : ''}" required
                                       class="numeric-input w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                       placeholder="Ej: 85.000 o 3.200.000"
                                       title="Valor actual de la inversión">
                            </div>
                        </div>

                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Fecha de inversión</label>
                            <input type="date" id="investment-date" value="${investment?.date?.split('T')[0] || new Date().toISOString().split('T')[0]}" required
                                   class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200">
                        </div>

                        <div class="flex space-x-3 pt-4">
                            <button type="button" data-action="cancel-investment"
                                    class="flex-1 px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} ${currentTheme.textSecondary} rounded-lg hover:${currentTheme.textPrimary} transition-all duration-200">
                                Cancelar
                            </button>
                            <button type="button" data-action="save-investment"
                                    class="flex-1 px-4 py-3 ${currentTheme.accentBg} text-white rounded-lg hover:opacity-90 transition-all duration-200 ${currentTheme.accentGlow} font-medium">
                                ${isEdit ? 'Actualizar' : 'Registrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;        // Mostrar modal
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) {
            modalRoot.innerHTML = modalHTML;
            modalRoot.style.pointerEvents = 'auto';
              // Aplicar autoformato a campos numéricos
            if (window.applyNumericFormatting) {
                window.applyNumericFormatting();
            }
            
            // Focus en el primer input
            setTimeout(() => {
                const nameInput = document.getElementById('investment-name');
                if (nameInput) nameInput.focus();
            }, 100);
        }
    }

    // 📈 Guardar inversión
    saveInvestment() {
        const form = document.getElementById('investment-form');
        if (!form) return;

        const name = document.getElementById('investment-name').value.trim();
        const type = document.getElementById('investment-type').value;
        const description = document.getElementById('investment-description').value.trim();
        const amount = window.parseFormattedNumber ? window.parseFormattedNumber(document.getElementById('investment-amount').value) : parseFloat(document.getElementById('investment-amount').value.replace(/\./g, '')) || 0;
        const currentValue = window.parseFormattedNumber ? window.parseFormattedNumber(document.getElementById('investment-current').value) : parseFloat(document.getElementById('investment-current').value.replace(/\./g, '')) || 0;
        const date = document.getElementById('investment-date').value;

        // Validaciones
        if (!name) {
            alert('Por favor ingresa un nombre para la inversión');
            return;
        }

        if (!type) {
            alert('Por favor selecciona un tipo de inversión');
            return;
        }

        if (amount <= 0) {
            alert('El monto invertido debe ser mayor a 0');
            return;
        }

        if (currentValue < 0) {
            alert('El valor actual no puede ser negativo');
            return;
        }

        if (!date) {
            alert('Por favor selecciona la fecha de inversión');
            return;
        }

        // Crear o actualizar inversión
        const investmentData = {
            name,
            type,
            description,
            amount,
            currentValue,
            date: new Date(date).toISOString(),
            createdAt: this.editingInvestment?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (this.editingInvestment) {
            // Actualizar inversión existente
            investmentData.id = this.editingInvestment.id;
            const index = window.appState.data.investments.findIndex(i => i.id === this.editingInvestment.id);
            if (index !== -1) {
                window.appState.data.investments[index] = investmentData;
            }
        } else {
            // Crear nueva inversión
            investmentData.id = Date.now();
            window.appState.addInvestment(investmentData);
        }

        window.appState.saveState();
        this.cancelInvestmentEdit();
        
        // Actualizar vista si estamos en la sección de inversiones
        if (window.currentSection === 'investments') {
            window.loadSection('investments');
        }

        // Notificación
        if (window.NotificationSystem) {
            window.NotificationSystem.success(
                this.editingInvestment ? 'Inversión actualizada' : 'Inversión registrada',
                `${investmentData.name} ${this.editingInvestment ? 'actualizada' : 'registrada'} exitosamente`
            );
        }
    }

    // 📈 Cancelar edición
    cancelInvestmentEdit() {
        this.editingInvestment = null;
        this.currentView = 'list';
        
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) {
            modalRoot.innerHTML = '';
            modalRoot.style.pointerEvents = 'none';
        }
    }

    // 📈 Eliminar inversión
    deleteInvestment(investmentId) {
        const investment = window.appState.data.investments.find(i => i.id === investmentId);
        if (!investment) return;

        if (confirm(`¿Estás seguro de que quieres eliminar la inversión "${investment.name}"?`)) {
            window.appState.deleteInvestment(investmentId);
            
            // Actualizar vista si estamos en la sección de inversiones
            if (window.currentSection === 'investments') {
                window.loadSection('investments');
            }

            // Notificación
            if (window.NotificationSystem) {
                window.NotificationSystem.success('Inversión eliminada', `${investment.name} eliminada exitosamente`);
            }
        }
    }
}

// 📈 Instancia global
window.NebulaInvestmentsModule = new NebulaInvestmentsModule();

// 📈 Auto-inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.NebulaInvestmentsModule.init();
    });
} else {
    window.NebulaInvestmentsModule.init();
}
