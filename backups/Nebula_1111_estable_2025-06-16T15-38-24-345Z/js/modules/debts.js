// 💳 CloudSonnet4 - Módulo de Deudas
// Gestión completa de deudas y pagos

class NebulaDebtsModule {
    constructor() {
        this.initialized = false;
        this.currentView = 'list';
        this.editingDebt = null;
        
        console.log('💳 Módulo de Deudas inicializado');
    }

    // 💳 Inicialización del módulo
    init() {
        if (this.initialized) return;
        
        this.setupEventListeners();
        this.initialized = true;
        
        console.log('✅ Módulo de Deudas - Listo para usar');
    }

    // 💳 Configurar eventos
    setupEventListeners() {
        // Event delegation para botones dinámicos
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="add-debt"]')) {
                this.showAddDebtForm();
            } else if (e.target.matches('[data-action="edit-debt"]')) {
                const debtId = parseInt(e.target.dataset.debtId);
                this.editDebt(debtId);
            } else if (e.target.matches('[data-action="delete-debt"]')) {
                const debtId = parseInt(e.target.dataset.debtId);
                this.deleteDebt(debtId);
            } else if (e.target.matches('[data-action="save-debt"]')) {
                this.saveDebt();
            } else if (e.target.matches('[data-action="cancel-debt"]')) {
                this.cancelDebtEdit();
            }
        });

        // Evento para cerrar modales con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentView === 'form') {
                this.cancelDebtEdit();
            }
        });
    }

    // 💳 Renderizar vista principal de deudas
    render() {
        if (!window.appState) {
            console.error('❌ AppState no disponible');
            return '';
        }

        const debts = window.appState.data.debts || [];
        const currentTheme = window.appState.getCurrentTheme();
        
        // Calcular estadísticas de deudas
        const stats = this.calculateDebtStats(debts);
        
        return `
            <div class="debts-container h-full">
                <!-- Header con título y botón agregar -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-xl ${currentTheme.accentBg} flex items-center justify-center ${currentTheme.accentGlow}">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="1" y="4" width="22" height="16" rx="3" ry="3"/>
                                <line x1="1" y1="10" x2="23" y2="10"/>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold ${currentTheme.textPrimary}">Deudas</h2>
                            <p class="${currentTheme.textSecondary}">Gestión de compromisos financieros</p>
                        </div>
                    </div>
                    <button data-action="add-debt" 
                            class="px-4 py-2 ${currentTheme.accentBg} text-white rounded-lg hover:opacity-90 transition-all duration-200 ${currentTheme.accentGlow} font-medium">
                        <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        Nueva Deuda
                    </button>
                </div>

                <!-- Resumen de deudas -->
                ${debts.length > 0 ? this.renderDebtsSummary(stats, currentTheme) : ''}

                <!-- Lista de deudas -->
                <div class="debts-grid space-y-4">
                    ${debts.length === 0 ? this.renderEmptyState(currentTheme) : 
                      debts.map(debt => this.renderDebtCard(debt, currentTheme)).join('')}
                </div>
            </div>
        `;
    }

    // 💳 Calcular estadísticas de deudas
    calculateDebtStats(debts) {
        const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
        const totalPaid = debts.reduce((sum, debt) => sum + (debt.paidAmount || 0), 0);
        const totalRemaining = totalDebt - totalPaid;
        const averageInterestRate = debts.length > 0 ? 
            debts.reduce((sum, debt) => sum + (debt.interestRate || 0), 0) / debts.length : 0;
        
        return {
            totalDebt,
            totalPaid,
            totalRemaining,
            averageInterestRate,
            debtCount: debts.length,
            paymentProgress: totalDebt > 0 ? (totalPaid / totalDebt) * 100 : 0
        };
    }

    // 💳 Renderizar resumen de deudas
    renderDebtsSummary(stats, theme) {
        return `
            <div class="${theme.surface} rounded-xl p-6 mb-6 border ${theme.accentBorder} backdrop-blur-md">
                <h3 class="text-lg font-semibold ${theme.textPrimary} mb-4">Resumen de Deudas</h3>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div class="text-center">
                        <div class="${theme.textSecondary} text-sm mb-1">Deuda Total</div>
                        <div class="${theme.negative} font-semibold text-lg">$${stats.totalDebt.toLocaleString()}</div>
                    </div>
                    <div class="text-center">
                        <div class="${theme.textSecondary} text-sm mb-1">Pagado</div>
                        <div class="${theme.positive} font-semibold text-lg">$${stats.totalPaid.toLocaleString()}</div>
                    </div>
                    <div class="text-center">
                        <div class="${theme.textSecondary} text-sm mb-1">Por Pagar</div>
                        <div class="${theme.accent} font-semibold text-lg">$${stats.totalRemaining.toLocaleString()}</div>
                    </div>
                    <div class="text-center">
                        <div class="${theme.textSecondary} text-sm mb-1">Interés Promedio</div>
                        <div class="${theme.textPrimary} font-semibold text-lg">${stats.averageInterestRate.toFixed(1)}%</div>
                    </div>
                </div>

                <!-- Barra de progreso de pagos -->
                <div class="mt-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="${theme.textSecondary} text-sm">Progreso de Pagos</span>
                        <span class="${theme.positive} font-semibold text-sm">${stats.paymentProgress.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-black/30 rounded-full h-3 overflow-hidden">
                        <div class="${theme.accentBg} h-full rounded-full transition-all duration-500 ${theme.accentGlow}" 
                             style="width: ${Math.min(stats.paymentProgress, 100)}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // 💳 Renderizar estado vacío
    renderEmptyState(theme) {
        return `
            <div class="text-center py-12">
                <div class="w-20 h-20 mx-auto mb-4 rounded-full ${theme.surface} flex items-center justify-center">
                    <svg class="w-10 h-10 ${theme.textSecondary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="1" y="4" width="22" height="16" rx="3" ry="3"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold ${theme.textPrimary} mb-2">Sin deudas registradas</h3>
                <p class="${theme.textSecondary} mb-6">¡Excelente! Mantén tu libertad financiera</p>
                <button data-action="add-debt" 
                        class="px-6 py-3 ${theme.accentBg} text-white rounded-lg hover:opacity-90 transition-all duration-200 ${theme.accentGlow} font-medium">
                    Registrar deuda
                </button>
            </div>
        `;
    }

    // 💳 Renderizar tarjeta de deuda
    renderDebtCard(debt, theme) {
        const paidAmount = debt.paidAmount || 0;
        const remaining = debt.amount - paidAmount;
        const progress = debt.amount > 0 ? (paidAmount / debt.amount) * 100 : 0;
        const progressClamped = Math.min(progress, 100);
        
        // Calcular días hasta vencimiento si existe fecha
        let daysUntilDue = null;
        let dueDateStatus = '';
        if (debt.dueDate) {
            const today = new Date();
            const dueDate = new Date(debt.dueDate);
            daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            
            if (daysUntilDue < 0) {
                dueDateStatus = 'overdue';
            } else if (daysUntilDue <= 7) {
                dueDateStatus = 'urgent';
            } else if (daysUntilDue <= 30) {
                dueDateStatus = 'warning';
            } else {
                dueDateStatus = 'normal';
            }
        }
        
        return `
            <div class="${theme.surface} rounded-xl p-6 border ${theme.accentBorder} backdrop-blur-md">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <h3 class="text-lg font-semibold ${theme.textPrimary}">${debt.creditor}</h3>
                            ${debt.type ? `<span class="text-xs px-2 py-1 rounded-full ${theme.accentBg} text-white">${debt.type}</span>` : ''}
                        </div>
                        <p class="${theme.textSecondary} text-sm">${debt.description || 'Sin descripción'}</p>
                        ${debt.interestRate ? `<p class="${theme.textSecondary} text-xs mt-1">Interés: ${debt.interestRate}% anual</p>` : ''}
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button data-action="edit-debt" data-debt-id="${debt.id}"
                                class="p-2 ${theme.surface} hover:${theme.accentBg} rounded-lg transition-all duration-200 ${theme.textSecondary} hover:text-white"
                                title="Editar deuda">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        <button data-action="delete-debt" data-debt-id="${debt.id}"
                                class="p-2 ${theme.surface} hover:bg-red-500 rounded-lg transition-all duration-200 ${theme.textSecondary} hover:text-white"
                                title="Eliminar deuda">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Progreso de pago -->
                <div class="mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="${theme.textSecondary} text-sm">Progreso de Pago</span>
                        <span class="${theme.positive} font-semibold text-sm">${progressClamped.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                        <div class="${theme.accentBg} h-full rounded-full transition-all duration-500 ${theme.accentGlow}" 
                             style="width: ${progressClamped}%"></div>
                    </div>
                </div>

                <!-- Información financiera -->
                <div class="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                        <div class="${theme.textSecondary} text-xs mb-1">Deuda Total</div>
                        <div class="${theme.negative} font-semibold">$${debt.amount.toLocaleString()}</div>
                    </div>
                    <div>
                        <div class="${theme.textSecondary} text-xs mb-1">Pagado</div>
                        <div class="${theme.positive} font-semibold">$${paidAmount.toLocaleString()}</div>
                    </div>
                    <div>
                        <div class="${theme.textSecondary} text-xs mb-1">Restante</div>
                        <div class="${theme.accent} font-semibold">$${remaining.toLocaleString()}</div>
                    </div>
                </div>

                <!-- Información de vencimiento -->
                ${debt.dueDate ? `
                    <div class="mt-4 pt-4 border-t border-white/10">
                        <div class="flex items-center justify-center space-x-2 text-sm
                            ${dueDateStatus === 'overdue' ? theme.negative : 
                              dueDateStatus === 'urgent' ? 'text-red-400' :
                              dueDateStatus === 'warning' ? 'text-yellow-400' : 
                              theme.textSecondary}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"/>
                            </svg>
                            <span>
                                ${dueDateStatus === 'overdue' ? `Vencida hace ${Math.abs(daysUntilDue)} días` :
                                  dueDateStatus === 'urgent' ? `Vence en ${daysUntilDue} días` :
                                  dueDateStatus === 'warning' ? `Vence en ${daysUntilDue} días` :
                                  `Vence el ${new Date(debt.dueDate).toLocaleDateString()}`}
                            </span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // 💳 Mostrar formulario de nueva deuda
    showAddDebtForm() {
        this.editingDebt = null;
        this.currentView = 'form';
        this.showDebtModal();
    }

    // 💳 Editar deuda existente
    editDebt(debtId) {
        const debt = window.appState.data.debts.find(d => d.id === debtId);
        if (!debt) {
            console.error('Deuda no encontrada:', debtId);
            return;
        }
        
        this.editingDebt = debt;
        this.currentView = 'form';
        this.showDebtModal(debt);
    }

    // 💳 Mostrar modal de deuda
    showDebtModal(debt = null) {
        const currentTheme = window.appState.getCurrentTheme();
        const isEdit = debt !== null;
        
        const debtTypes = [
            'Tarjeta de Crédito', 'Préstamo Personal', 'Hipoteca', 'Préstamo Vehicular',
            'Préstamo Estudiantil', 'Línea de Crédito', 'Otros'
        ];
        
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="${currentTheme.surface} rounded-2xl p-6 w-full max-w-md border ${currentTheme.accentBorder} backdrop-blur-md">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold ${currentTheme.textPrimary}">
                            ${isEdit ? 'Editar Deuda' : 'Nueva Deuda'}
                        </h3>
                        <button data-action="cancel-debt" class="${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <form id="debt-form" class="space-y-4">
                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Acreedor/Institución</label>                            <input type="text" id="debt-creditor" value="${debt?.creditor || ''}" required
                                   class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                   placeholder="Ej: Préstamo de Mercado Plasma">
                        </div>

                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Tipo de deuda</label>
                            <select id="debt-type"
                                    class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200">
                                <option value="">Seleccionar tipo (opcional)</option>
                                ${debtTypes.map(type => 
                                    `<option value="${type}" ${debt?.type === type ? 'selected' : ''}>${type}</option>`
                                ).join('')}
                            </select>
                        </div>

                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Descripción (opcional)</label>
                            <textarea id="debt-description" rows="2"
                                      class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200 resize-none"
                                      placeholder="Detalles adicionales sobre la deuda...">${debt?.description || ''}</textarea>
                        </div>                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Monto total</label>                                <input type="text" id="debt-amount" value="${debt?.amount ? window.formatThousands(debt.amount) : ''}" required
                                       class="numeric-input w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                       placeholder="Ej: 50.000 o 1.500.000"
                                       title="Ingresa el monto total de la deuda. Puedes usar separadores de miles como 50.000 o 1.500.000">
                            </div>
                            <div>
                                <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Monto pagado</label>                                <input type="text" id="debt-paid" value="${debt?.paidAmount ? window.formatThousands(debt.paidAmount) : '0'}"
                                       class="numeric-input w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                       placeholder="Ej: 10.000 o 250.000"
                                       title="Monto ya pagado de la deuda. Se calcula automáticamente el saldo restante">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Tasa de interés (%)</label>
                                <input type="number" id="debt-interest" value="${debt?.interestRate || ''}" min="0" max="100" step="0.1"
                                       class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                       placeholder="Opcional">
                            </div>
                            <div>
                                <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Fecha de vencimiento</label>
                                <input type="date" id="debt-due" value="${debt?.dueDate?.split('T')[0] || ''}"
                                       class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200">
                            </div>
                        </div>

                        <div class="flex space-x-3 pt-4">
                            <button type="button" data-action="cancel-debt"
                                    class="flex-1 px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} ${currentTheme.textSecondary} rounded-lg hover:${currentTheme.textPrimary} transition-all duration-200">
                                Cancelar
                            </button>
                            <button type="button" data-action="save-debt"
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
                const creditorInput = document.getElementById('debt-creditor');
                if (creditorInput) creditorInput.focus();
            }, 100);
        }
    }

    // 💳 Guardar deuda
    saveDebt() {        const form = document.getElementById('debt-form');
        if (!form) return;

        const creditor = document.getElementById('debt-creditor').value.trim();
        const type = document.getElementById('debt-type').value;
        const description = document.getElementById('debt-description').value.trim();
        const amount = window.parseFormattedNumber ? window.parseFormattedNumber(document.getElementById('debt-amount').value) : parseFloat(document.getElementById('debt-amount').value.replace(/\./g, '')) || 0;
        const paidAmount = window.parseFormattedNumber ? window.parseFormattedNumber(document.getElementById('debt-paid').value) : parseFloat(document.getElementById('debt-paid').value.replace(/\./g, '')) || 0;
        const interestRate = parseFloat(document.getElementById('debt-interest').value) || null;
        const dueDate = document.getElementById('debt-due').value;        // CloudSonnet4: Validaciones con sistema visual elegante
        if (!creditor) {
            const creditorField = document.getElementById('debt-creditor');
            if (creditorField && window.showFieldError) {
                window.showFieldError(creditorField, 'Por favor ingresa el nombre del acreedor');
            }
            return;
        }

        if (amount <= 0) {
            const amountField = document.getElementById('debt-amount');
            if (amountField && window.showFieldError) {
                window.showFieldError(amountField, 'El monto de la deuda debe ser mayor a 0');
            }
            return;
        }

        if (paidAmount < 0) {
            const paidField = document.getElementById('debt-paid');
            if (paidField && window.showFieldError) {
                window.showFieldError(paidField, 'El monto pagado no puede ser negativo');
            }
            return;
        }

        if (paidAmount > amount) {
            const paidField = document.getElementById('debt-paid');
            if (paidField && window.showFieldError) {
                window.showFieldError(paidField, 'El monto pagado no puede ser mayor al monto total');
            }
            return;
        }

        // Crear o actualizar deuda
        const debtData = {
            creditor,
            type: type || null,
            description,
            amount,
            paidAmount,
            interestRate,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            createdAt: this.editingDebt?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (this.editingDebt) {
            // Actualizar deuda existente
            debtData.id = this.editingDebt.id;
            const index = window.appState.data.debts.findIndex(d => d.id === this.editingDebt.id);
            if (index !== -1) {
                window.appState.data.debts[index] = debtData;
            }
        } else {
            // Crear nueva deuda
            debtData.id = Date.now();
            window.appState.addDebt(debtData);
        }

        window.appState.saveState();
        this.cancelDebtEdit();
        
        // Actualizar vista si estamos en la sección de deudas
        if (window.currentSection === 'debts') {
            window.loadSection('debts');
        }

        // Notificación
        if (window.NotificationSystem) {
            window.NotificationSystem.success(
                this.editingDebt ? 'Deuda actualizada' : 'Deuda registrada',
                `${debtData.creditor} ${this.editingDebt ? 'actualizada' : 'registrada'} exitosamente`
            );
        }
    }

    // 💳 Cancelar edición
    cancelDebtEdit() {
        this.editingDebt = null;
        this.currentView = 'list';
        
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) {
            modalRoot.innerHTML = '';
            modalRoot.style.pointerEvents = 'none';
        }
    }    // 💳 Eliminar deuda con modal elegante
    async deleteDebt(debtId) {
        const debt = window.appState.data.debts.find(d => d.id === debtId);
        if (!debt) return;

        // CloudSonnet4: Modal elegante para confirmación
        const confirmed = await window.showDangerModal(
            '🗑️ Eliminar deuda',
            `¿Estás seguro de que quieres eliminar la deuda con <strong>"${debt.creditor}"</strong>?<br><br>Esta acción no se puede deshacer.`,
            { 
                confirmText: 'Sí, eliminar',
                cancelText: 'Cancelar' 
            }
        );

        if (confirmed) {
            window.appState.deleteDebt(debtId);
            
            // Actualizar vista si estamos en la sección de deudas
            if (window.currentSection === 'debts') {
                window.loadSection('debts');
            }

            // Notificación
            if (window.NotificationSystem) {
                window.NotificationSystem.success('Deuda eliminada', `Deuda con ${debt.creditor} eliminada exitosamente`);
            }
        }
    }
}

// 💳 Instancia global
window.NebulaDebtsModule = new NebulaDebtsModule();

// 💳 Auto-inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.NebulaDebtsModule.init();
    });
} else {
    window.NebulaDebtsModule.init();
}
