/**
 * ⚡ NEBULA FINANCIAL - SISTEMA DE ATAJOS DE TECLADO
 * 
 * Sistema completo de atajos de teclado para navegación rápida y acciones
 * frecuentes en Nebula Financial.
 * 
 * @author Nebula Team
 * @version 2.0.0
 * 
 * CloudSonnet4: Implementación completa de navegación circular A/D en dockbar
 * - Mapeo global de teclas A y D para navegación en dock
 * - Navegación circular con wrap-around automático
 * - Gestión visual de clases 'active' en elementos del dock
 * - Ignorar atajos cuando el usuario está escribiendo en inputs/textarea
 * - Integración con renderDock y updateDockGlider para feedback visual
 */

/**
 * ⚡ Sistema de Atajos de Teclado
 * Maneja todos los atajos de teclado de la aplicación
 */

const ShortcutSystem = {
    shortcuts: new Map(),
    isModalOpen: false,
    
    /**
     * 🚀 Inicializar el sistema de atajos
     */
    init() {
        this.registerDefaultShortcuts();
        this.addGlobalEventListener();
        console.log('⚡ Sistema de atajos inicializado');
    },
      /**
     * 📝 Registrar atajos por defecto
     */
    registerDefaultShortcuts() {
        // CloudSonnet4: Navegación del dock con A y D
        this.register('KeyA', () => this.navigateDock('left'), 'Dock: Izquierda');
        this.register('KeyD', () => this.navigateDock('right'), 'Dock: Derecha');
        
        // Navegación principal (con teclas alternativas)
        this.register('Digit1', () => this.navigateTo('dashboard'), 'Dashboard');
        this.register('Digit2', () => this.navigateTo('income'), 'Ingresos');
        this.register('Digit3', () => this.navigateTo('expenses'), 'Gastos');
        this.register('Digit4', () => this.navigateTo('investments'), 'Inversiones');
        this.register('Digit5', () => this.navigateTo('debts'), 'Deudas');
        this.register('Digit6', () => this.navigateTo('goals'), 'Metas');
        this.register('Digit7', () => this.navigateTo('settings'), 'Ajustes');
        
        // Navegación temporal
        this.register('ArrowLeft', () => this.navigateMonth(-1), 'Mes anterior');
        this.register('ArrowRight', () => this.navigateMonth(1), 'Mes siguiente');
        this.register('KeyH', () => this.goToToday(), 'Ir a hoy');
        this.register('KeyC', () => this.toggleCalendar(), 'Abrir calendario');
        
        // Acciones generales
        this.register('KeyS', () => this.saveData(), 'Guardar datos', true); // Ctrl+S
        this.register('KeyR', () => this.refreshApp(), 'Actualizar app', true); // Ctrl+R
        this.register('Slash', () => this.showShortcuts(), 'Mostrar atajos');
        this.register('Escape', () => this.closeModals(), 'Cerrar modales');
        
        // Acciones específicas
        this.register('KeyT', () => this.addQuickTransaction(), 'Transacción rápida');
        this.register('KeyF', () => this.focusSearch(), 'Buscar');
        
        // Temas
        this.register('Digit1', () => this.changeTheme('aureoAmanecer'), 'Tema Áureo');
        this.register('Digit2', () => this.changeTheme('crisonVespertino'), 'Tema Crisón');
        this.register('Digit3', () => this.changeTheme('aguamarinaAtardecer'), 'Tema Aguamarina');
        this.register('Digit4', () => this.changeTheme('violetaCeleste'), 'Tema Violeta');
    },
    
    /**
     * 📋 Registrar un nuevo atajo
     * @param {string} key - Código de la tecla
     * @param {Function} action - Función a ejecutar
     * @param {string} description - Descripción del atajo
     * @param {boolean} requiresCtrl - Si requiere la tecla Ctrl
     */
    register(key, action, description, requiresCtrl = false) {
        this.shortcuts.set(key, {
            action,
            description,
            requiresCtrl,
            key: this.formatKeyDisplay(key, requiresCtrl)
        });
    },
    
    /**
     * 🎯 Agregar event listener global
     */
    addGlobalEventListener() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    },
    
    /**
     * ⌨️ Manejar presión de tecla
     * @param {KeyboardEvent} e - Evento de teclado
     */
    handleKeyPress(e) {
        // Ignorar si estamos escribiendo en un input
        if (this.isTyping(e.target)) {
            return;
        }
        
        const shortcut = this.shortcuts.get(e.code);
        if (shortcut) {
            // Verificar si requiere Ctrl
            if (shortcut.requiresCtrl && !e.ctrlKey) {
                return;
            }
            
            // Verificar si NO debe tener Ctrl cuando no lo requiere
            if (!shortcut.requiresCtrl && e.ctrlKey) {
                return;
            }
            
            e.preventDefault();
            shortcut.action();
        }
    },
    
    /**
     * ✍️ Verificar si el usuario está escribiendo
     * @param {Element} target - Elemento objetivo
     * @returns {boolean}
     */
    isTyping(target) {
        const typingElements = ['INPUT', 'TEXTAREA', 'SELECT'];
        return typingElements.includes(target.tagName) || 
               target.contentEditable === 'true' ||
               target.isContentEditable;
    },
    
    /**
     * 🔤 Formatear display de tecla
     * @param {string} key - Código de tecla
     * @param {boolean} requiresCtrl - Si requiere Ctrl
     * @returns {string}
     */
    formatKeyDisplay(key, requiresCtrl = false) {
        const keyMap = {
            'KeyD': 'D', 'KeyI': 'I', 'KeyG': 'G', 'KeyN': 'N',
            'KeyP': 'P', 'KeyM': 'M', 'KeyA': 'A', 'KeyH': 'H',
            'KeyC': 'C', 'KeyS': 'S', 'KeyR': 'R', 'KeyT': 'T',
            'KeyF': 'F', 'Slash': '/', 'Escape': 'Esc',
            'ArrowLeft': '←', 'ArrowRight': '→',
            'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4'
        };
        
        const displayKey = keyMap[key] || key;
        return requiresCtrl ? `Ctrl+${displayKey}` : displayKey;
    },
    
    // ===============================================
    // 🎯 ACCIONES DE ATAJOS
    // ===============================================
      /**
     * 🧭 Navegar a una vista
     * @param {string} view - Vista de destino
     */
    navigateTo(view) {
        if (window.appState) {
            window.appState.activeView = view;
            if (window.renderApp) {
                window.renderApp();
            }
        }
    },    /**
     * 🧭 CloudSonnet4: Navegación circular A/D en dockbar con efectos visuales
     * @param {string} direction - 'left' o 'right'
     */
    navigateDock(direction) {
        const dockItems = ['dashboard', 'income', 'expenses', 'goals', 'investments', 'debts', 'settings'];
        const currentIndex = dockItems.indexOf(window.appState?.activeView || 'dashboard');
        
        // CloudSonnet4: navegación circular A/D en dockbar
        let newIndex;
        if (direction === 'left') {
            // CloudSonnet4: A decrementa con wrap-around
            newIndex = currentIndex > 0 ? currentIndex - 1 : dockItems.length - 1;
        } else {
            // CloudSonnet4: D incrementa con wrap-around  
            newIndex = currentIndex < dockItems.length - 1 ? currentIndex + 1 : 0;
        }
        
        // CloudSonnet4: Actualizar clases active en elementos del dock
        const dockButtons = document.querySelectorAll('[data-view]');
        dockButtons.forEach((btn, index) => {
            if (index === currentIndex) {
                btn.classList.remove('active');
            }
            if (index === newIndex) {
                btn.classList.add('active');
            }
        });
        
        // CloudSonnet4: Navegar y llamar a renderDock para actualizar visual
        this.navigateTo(dockItems[newIndex]);
        
        // CloudSonnet4: Actualizar glider del dock si existe
        if (window.updateDockGlider) {
            setTimeout(() => window.updateDockGlider(), 50);
        }
    },
    
    /**
     * 📅 Navegar entre meses
     * @param {number} direction - Dirección: -1 (anterior) o 1 (siguiente)
     */
    navigateMonth(direction) {
        if (window.appState) {
            window.appState.currentDate.setMonth(
                window.appState.currentDate.getMonth() + direction
            );
            if (window.renderApp) {
                window.renderApp();
            }
        }
    },
    
    /**
     * 🏠 Ir al mes actual
     */
    goToToday() {
        if (window.appState) {
            window.appState.currentDate = new Date();
            if (window.renderApp) {
                window.renderApp();
            }
        }
    },
    
    /**
     * 📅 Toggle calendario desplegable
     */
    toggleCalendar() {
        const calendarDropdown = document.getElementById('calendar-dropdown');
        if (calendarDropdown) {
            calendarDropdown.classList.toggle('hidden');
        }
    },
    
    /**
     * 💾 Guardar datos
     */
    saveData() {
        if (window.appState && window.appState.saveData) {
            window.appState.saveData();
            if (window.NotificationSystem) {
                window.NotificationSystem.success('Datos guardados manualmente');
            }
        }
    },
    
    /**
     * 🔄 Actualizar aplicación
     */
    refreshApp() {
        if (window.renderApp) {
            window.renderApp();
            if (window.NotificationSystem) {
                window.NotificationSystem.info('Aplicación actualizada');
            }
        }
    },
    
    /**
     * 🚪 Cerrar modales abiertos
     */
    closeModals() {
        // Cerrar dropdown de calendario
        const calendarDropdown = document.getElementById('calendar-dropdown');
        if (calendarDropdown && !calendarDropdown.classList.contains('hidden')) {
            calendarDropdown.classList.add('hidden');
            return;
        }
        
        // Cerrar modal de atajos
        if (this.isModalOpen) {
            this.hideShortcuts();
            return;
        }
        
        // Cerrar otros modales
        const modals = document.querySelectorAll('.modal-container');
        modals.forEach(modal => {
            modal.classList.add('modal-leave');
            setTimeout(() => modal.remove(), 300);
        });
    },
    
    /**
     * ⚡ Agregar transacción rápida
     */
    addQuickTransaction() {
        // Esta funcionalidad se implementará cuando tengamos el modal de transacciones
        if (window.NotificationSystem) {
            window.NotificationSystem.info('Transacción rápida: Ctrl+T (próximamente)');
        }
    },
    
    /**
     * 🔍 Enfocar campo de búsqueda
     */
    focusSearch() {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="buscar"], input[placeholder*="Buscar"]');
        if (searchInput) {
            searchInput.focus();
        } else if (window.NotificationSystem) {
            window.NotificationSystem.info('No hay campo de búsqueda disponible');
        }
    },
    
    /**
     * 🎨 Cambiar tema
     * @param {string} themeKey - Clave del tema
     */
    changeTheme(themeKey) {
        if (window.appState && window.THEMES && window.THEMES[themeKey]) {
            window.appState.themeKey = themeKey;
            window.appState.saveData();
            if (window.renderApp) {
                window.renderApp();
            }
            if (window.NotificationSystem) {
                window.NotificationSystem.success(`Tema cambiado: ${window.THEMES[themeKey].name}`);
            }
        }
    },
    
    /**
     * ❓ Mostrar modal de atajos
     */
    showShortcuts() {
        if (this.isModalOpen) {
            this.hideShortcuts();
            return;
        }
        
        this.isModalOpen = true;
        const modal = this.createShortcutsModal();
        document.body.appendChild(modal);
        
        // Animar entrada
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('.modal-content').classList.remove('scale-95');
            modal.querySelector('.modal-content').classList.add('scale-100');
        });
    },
    
    /**
     * 🙈 Ocultar modal de atajos
     */
    hideShortcuts() {
        const modal = document.getElementById('shortcuts-modal');
        if (modal) {
            modal.classList.add('opacity-0');
            modal.querySelector('.modal-content').classList.remove('scale-100');
            modal.querySelector('.modal-content').classList.add('scale-95');
            
            setTimeout(() => {
                modal.remove();
                this.isModalOpen = false;
            }, 200);
        }
    },
    
    /**
     * 🏗️ Crear modal de atajos
     * @returns {Element}
     */
    createShortcutsModal() {
        const modal = document.createElement('div');
        modal.id = 'shortcuts-modal';
        modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-200';
        
        const shortcuts = Array.from(this.shortcuts.entries()).map(([code, shortcut]) => {
            return {
                key: shortcut.key,
                description: shortcut.description
            };
        });
        
        // Agrupar atajos por categoría
        const categories = {
            'Navegación': shortcuts.filter(s => ['D', 'I', 'G', 'N', 'P', 'M', 'A'].includes(s.key)),
            'Temporal': shortcuts.filter(s => ['←', '→', 'H', 'C'].includes(s.key)),
            'Acciones': shortcuts.filter(s => ['Ctrl+S', 'Ctrl+R', '/', 'Esc', 'T', 'F'].includes(s.key)),
            'Temas': shortcuts.filter(s => ['1', '2', '3', '4'].includes(s.key))
        };
        
        modal.innerHTML = `
            <div class="modal-content bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 max-w-4xl w-full mx-4 scale-95 transition-transform duration-200 border border-white/10">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                        ${window.createIcon ? window.createIcon(window.ICONS?.zap, 'w-6 h-6 text-yellow-400') : '⚡'}
                        Atajos de Teclado
                    </h2>
                    <button onclick="ShortcutSystem.hideShortcuts()" class="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                        ${window.createIcon ? window.createIcon(window.ICONS?.x, 'w-5 h-5') : '✕'}
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${Object.entries(categories).map(([category, items]) => `
                        <div>
                            <h3 class="text-lg font-semibold text-white mb-3 border-b border-white/10 pb-2">
                                ${category}
                            </h3>
                            <div class="space-y-2">
                                ${items.map(item => `
                                    <div class="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <span class="text-gray-300 text-sm">${item.description}</span>
                                        <kbd class="px-3 py-1 bg-white/10 rounded-md text-xs font-mono text-white border border-white/20">
                                            ${item.key}
                                        </kbd>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-6 pt-4 border-t border-white/10 text-center">
                    <p class="text-gray-400 text-sm">
                        Presiona <kbd class="px-2 py-1 bg-white/10 rounded text-xs font-mono">Esc</kbd> para cerrar este modal
                    </p>
                </div>
            </div>
        `;
        
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideShortcuts();
            }
        });
        
        return modal;
    }
};

// Hacer el sistema disponible globalmente para el HTML inline
window.ShortcutSystem = ShortcutSystem;
