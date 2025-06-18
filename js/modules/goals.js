// 🎯 CloudSonnet4 - Módulo de Metas Financieras
// Gestión completa de objetivos y metas financieras

class NebulaGoalsModule {
    constructor() {
        this.initialized = false;
        this.currentView = 'list';
        this.editingGoal = null;
        
        console.log('🎯 Módulo de Metas Financieras inicializado');
    }

    // 🎯 Inicialización del módulo
    init() {
        if (this.initialized) return;
        
        this.setupEventListeners();
        this.initialized = true;
        
        console.log('✅ Módulo de Metas - Listo para usar');
    }

    // 🎯 Configurar eventos
    setupEventListeners() {
        // Event delegation para botones dinámicos
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="add-goal"]')) {
                this.showAddGoalForm();
            } else if (e.target.matches('[data-action="edit-goal"]')) {
                const goalId = parseInt(e.target.dataset.goalId);
                this.editGoal(goalId);
            } else if (e.target.matches('[data-action="delete-goal"]')) {
                const goalId = parseInt(e.target.dataset.goalId);
                this.deleteGoal(goalId);
            } else if (e.target.matches('[data-action="save-goal"]')) {
                this.saveGoal();
            } else if (e.target.matches('[data-action="cancel-goal"]')) {
                this.cancelGoalEdit();
            }
        });

        // Evento para cerrar modales con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentView === 'form') {
                this.cancelGoalEdit();
            }
        });
    }

    // 🎯 Renderizar vista principal de metas
    render() {
        if (!window.appState) {
            console.error('❌ AppState no disponible');
            return '';
        }

        const goals = window.appState.data.goals || [];
        const currentTheme = window.appState.getCurrentTheme();
        
        return `
            <div class="goals-container h-full">
                <!-- Header con título y botón agregar -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-xl ${currentTheme.accentBg} flex items-center justify-center ${currentTheme.accentGlow}">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <circle cx="12" cy="12" r="4"/>
                                <circle cx="12" cy="12" r="1"/>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold ${currentTheme.textPrimary}">Metas Financieras</h2>
                            <p class="${currentTheme.textSecondary}">Objetivos y aspiraciones</p>
                        </div>
                    </div>
                    <button data-action="add-goal" 
                            class="px-4 py-2 ${currentTheme.accentBg} text-white rounded-lg hover:opacity-90 transition-all duration-200 ${currentTheme.accentGlow} font-medium">
                        <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        Nueva Meta
                    </button>
                </div>

                <!-- Lista de metas -->
                <div class="goals-grid space-y-4">
                    ${goals.length === 0 ? this.renderEmptyState(currentTheme) : 
                      goals.map(goal => this.renderGoalCard(goal, currentTheme)).join('')}
                </div>
            </div>
        `;
    }

    // 🎯 Renderizar estado vacío
    renderEmptyState(theme) {
        return `
            <div class="text-center py-12">
                <div class="w-20 h-20 mx-auto mb-4 rounded-full ${theme.surface} flex items-center justify-center">
                    <svg class="w-10 h-10 ${theme.textSecondary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="12" cy="12" r="1"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold ${theme.textPrimary} mb-2">Sin metas definidas</h3>
                <p class="${theme.textSecondary} mb-6">Establece objetivos financieros para alcanzar tus sueños</p>
                <button data-action="add-goal" 
                        class="px-6 py-3 ${theme.accentBg} text-white rounded-lg hover:opacity-90 transition-all duration-200 ${theme.accentGlow} font-medium">
                    Crear primera meta
                </button>
            </div>
        `;
    }

    // 🎯 Renderizar tarjeta de meta
    renderGoalCard(goal, theme) {
        const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
        const progressClamped = Math.min(progress, 100);
        const remaining = Math.max(goal.targetAmount - goal.currentAmount, 0);
        
        return `
            <div class="${theme.surface} rounded-xl p-6 border ${theme.accentBorder} backdrop-blur-md">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold ${theme.textPrimary} mb-1">${goal.name}</h3>
                        <p class="${theme.textSecondary} text-sm">${goal.description || 'Sin descripción'}</p>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button data-action="edit-goal" data-goal-id="${goal.id}"
                                class="p-2 ${theme.surface} hover:${theme.accentBg} rounded-lg transition-all duration-200 ${theme.textSecondary} hover:text-white"
                                title="Editar meta">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        <button data-action="delete-goal" data-goal-id="${goal.id}"
                                class="p-2 ${theme.surface} hover:bg-red-500 rounded-lg transition-all duration-200 ${theme.textSecondary} hover:text-white"
                                title="Eliminar meta">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Progreso -->
                <div class="mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="${theme.textSecondary} text-sm">Progreso</span>
                        <span class="${theme.accent} font-semibold text-sm">${progressClamped.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                        <div class="${theme.accentBg} h-full rounded-full transition-all duration-500 ${theme.accentGlow}" 
                             style="width: ${progressClamped}%"></div>
                    </div>
                </div>

                <!-- Montos -->
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div class="${theme.textSecondary} text-xs mb-1">Actual</div>
                        <div class="${theme.positive} font-semibold">$${goal.currentAmount.toLocaleString()}</div>
                    </div>
                    <div>
                        <div class="${theme.textSecondary} text-xs mb-1">Objetivo</div>
                        <div class="${theme.accent} font-semibold">$${goal.targetAmount.toLocaleString()}</div>
                    </div>
                    <div>
                        <div class="${theme.textSecondary} text-xs mb-1">Falta</div>
                        <div class="${theme.textPrimary} font-semibold">$${remaining.toLocaleString()}</div>
                    </div>
                </div>

                <!-- Fecha límite si existe -->
                ${goal.targetDate ? `
                    <div class="mt-4 pt-4 border-t border-white/10">
                        <div class="flex items-center justify-center space-x-2 ${theme.textSecondary} text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <span>Fecha límite: ${new Date(goal.targetDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // 🎯 Mostrar formulario de nueva meta
    showAddGoalForm() {
        this.editingGoal = null;
        this.currentView = 'form';
        this.showGoalModal();
    }

    // 🎯 Editar meta existente
    editGoal(goalId) {
        const goal = window.appState.data.goals.find(g => g.id === goalId);
        if (!goal) {
            console.error('Meta no encontrada:', goalId);
            return;
        }
        
        this.editingGoal = goal;
        this.currentView = 'form';
        this.showGoalModal(goal);
    }

    // 🎯 Mostrar modal de meta
    showGoalModal(goal = null) {
        const currentTheme = window.appState.getCurrentTheme();
        const isEdit = goal !== null;
        
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="${currentTheme.surface} rounded-2xl p-6 w-full max-w-md border ${currentTheme.accentBorder} backdrop-blur-md">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold ${currentTheme.textPrimary}">
                            ${isEdit ? 'Editar Meta' : 'Nueva Meta'}
                        </h3>
                        <button data-action="cancel-goal" class="${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <form id="goal-form" class="space-y-4">
                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Nombre de la meta</label>
                            <input type="text" id="goal-name" value="${goal?.name || ''}" required
                                   class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                   placeholder="Ej: Casa nueva, Vacaciones, Fondo de emergencia">
                        </div>

                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Descripción (opcional)</label>
                            <textarea id="goal-description" rows="2"
                                      class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200 resize-none"
                                      placeholder="Describe tu meta financiera...">${goal?.description || ''}</textarea>
                        </div>                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Monto actual</label>                                <input type="text" id="goal-current" value="${goal?.currentAmount ? window.formatThousands(goal.currentAmount) : '0'}" required
                                       class="numeric-input w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                       placeholder="Ej: 15.000 o 500.000"
                                       title="Monto que ya tienes ahorrado para esta meta">
                            </div>
                            <div>
                                <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Monto objetivo</label>                                <input type="text" id="goal-target" value="${goal?.targetAmount ? window.formatThousands(goal.targetAmount) : ''}" required
                                       class="numeric-input w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200"
                                       placeholder="Ej: 100.000 o 2.500.000"
                                       title="Monto total que necesitas para alcanzar tu meta">
                            </div>
                        </div>

                        <div>
                            <label class="${currentTheme.textPrimary} block text-sm font-medium mb-2">Fecha límite (opcional)</label>
                            <input type="date" id="goal-date" value="${goal?.targetDate || ''}"
                                   class="w-full px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} rounded-lg ${currentTheme.textPrimary} focus:${currentTheme.accentRing} focus:border-transparent transition-all duration-200">
                        </div>

                        <div class="flex space-x-3 pt-4">
                            <button type="button" data-action="cancel-goal"
                                    class="flex-1 px-4 py-3 ${currentTheme.surface} border ${currentTheme.accentBorder} ${currentTheme.textSecondary} rounded-lg hover:${currentTheme.textPrimary} transition-all duration-200">
                                Cancelar
                            </button>
                            <button type="button" data-action="save-goal"
                                    class="flex-1 px-4 py-3 ${currentTheme.accentBg} text-white rounded-lg hover:opacity-90 transition-all duration-200 ${currentTheme.accentGlow} font-medium">
                                ${isEdit ? 'Actualizar' : 'Crear Meta'}
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
                const nameInput = document.getElementById('goal-name');
                if (nameInput) nameInput.focus();
            }, 100);
        }
    }

    // 🎯 Guardar meta
    saveGoal() {        const form = document.getElementById('goal-form');
        if (!form) return;

        const name = document.getElementById('goal-name').value.trim();
        const description = document.getElementById('goal-description').value.trim();
        const currentAmount = window.parseFormattedNumber ? window.parseFormattedNumber(document.getElementById('goal-current').value) : parseFloat(document.getElementById('goal-current').value.replace(/\./g, '')) || 0;
        const targetAmount = window.parseFormattedNumber ? window.parseFormattedNumber(document.getElementById('goal-target').value) : parseFloat(document.getElementById('goal-target').value.replace(/\./g, '')) || 0;
        const targetDate = document.getElementById('goal-date').value;        // CloudSonnet4: Validaciones con sistema visual elegante
        if (!name) {
            const nameField = document.getElementById('goal-name');
            if (nameField && window.showFieldError) {
                window.showFieldError(nameField, 'Por favor ingresa un nombre para la meta');
            }
            return;
        }

        if (targetAmount <= 0) {
            const targetField = document.getElementById('goal-target');
            if (targetField && window.showFieldError) {
                window.showFieldError(targetField, 'El monto objetivo debe ser mayor a 0');
            }
            return;
        }

        if (currentAmount < 0) {
            const currentField = document.getElementById('goal-current');
            if (currentField && window.showFieldError) {
                window.showFieldError(currentField, 'El monto actual no puede ser negativo');
            }
            return;
        }

        // Crear o actualizar meta
        const goalData = {
            name,
            description,
            currentAmount,
            targetAmount,
            targetDate: targetDate || null,
            createdAt: this.editingGoal?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (this.editingGoal) {
            // Actualizar meta existente
            goalData.id = this.editingGoal.id;
            const index = window.appState.data.goals.findIndex(g => g.id === this.editingGoal.id);
            if (index !== -1) {
                window.appState.data.goals[index] = goalData;
            }
        } else {
            // Crear nueva meta
            goalData.id = Date.now();
            window.appState.addGoal(goalData);
        }

        window.appState.saveState();
        this.cancelGoalEdit();
        
        // Actualizar vista si estamos en la sección de metas
        if (window.currentSection === 'goals') {
            window.loadSection('goals');
        }

        // Notificación
        if (window.NotificationSystem) {
            window.NotificationSystem.success(
                this.editingGoal ? 'Meta actualizada' : 'Meta creada',
                `${goalData.name} ${this.editingGoal ? 'actualizada' : 'creada'} exitosamente`
            );
        }
    }

    // 🎯 Cancelar edición
    cancelGoalEdit() {
        this.editingGoal = null;
        this.currentView = 'list';
        
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) {
            modalRoot.innerHTML = '';
            modalRoot.style.pointerEvents = 'none';
        }
    }    // 🎯 Eliminar meta con modal elegante
    async deleteGoal(goalId) {
        const goal = window.appState.data.goals.find(g => g.id === goalId);
        if (!goal) return;

        // CloudSonnet4: Modal elegante para confirmación
        const confirmed = await window.showDangerModal(
            '🗑️ Eliminar meta',
            `¿Estás seguro de que quieres eliminar la meta <strong>"${goal.name}"</strong>?<br><br>Esta acción no se puede deshacer.`,
            { 
                confirmText: 'Sí, eliminar',
                cancelText: 'Cancelar' 
            }
        );

        if (confirmed) {
            window.appState.deleteGoal(goalId);
            
            // Actualizar vista si estamos en la sección de metas
            if (window.currentSection === 'goals') {
                window.loadSection('goals');
            }

            // Notificación
            if (window.NotificationSystem) {
                window.NotificationSystem.success('Meta eliminada', `${goal.name} eliminada exitosamente`);
            }
        }
    }
}

// 🎯 Instancia global
window.NebulaGoalsModule = new NebulaGoalsModule();

// 🎯 Auto-inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.NebulaGoalsModule.init();
    });
} else {
    window.NebulaGoalsModule.init();
}
