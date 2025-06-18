// ===============================================
// 🎯 DOCK NAVIGATION MODULE - CloudSonnet4
// ===============================================

/**
 * ⌨️ Módulo de navegación del dock con atajos A/D mejorados
 * Navegación circular con wrap-around y feedback visual
 */
const DockNavigationModule = {
    
    currentFocusIndex: 0,
    dockItems: [],
    isNavigationActive: false,
    feedbackTimeout: null,
    
    /**
     * CloudSonnet4: Inicializa la navegación del dock
     */
    init() {
        this.updateDockItems();
        this.initKeyboardNavigation();
        this.addVisualFocusIndicator();
        this.createNavigationFeedback();
    },
    
    /**
     * CloudSonnet4: Actualiza la lista de elementos del dock
     */
    updateDockItems() {
        this.dockItems = Array.from(document.querySelectorAll('.dock-item'));
        this.currentFocusIndex = Math.min(this.currentFocusIndex, Math.max(0, this.dockItems.length - 1));
        this.updateFocusIndicator();
    },
    
    /**
     * CloudSonnet4: Crea el elemento de feedback de navegación
     */
    createNavigationFeedback() {
        if (document.getElementById('navigation-feedback')) return;
        
        const feedback = document.createElement('div');
        feedback.id = 'navigation-feedback';
        feedback.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 opacity-0 transition-all duration-300 pointer-events-none';
        feedback.innerHTML = `
            <div class="${appState.theme.surface} ${appState.theme.accentBorder} border-2 rounded-lg p-3 shadow-lg backdrop-blur-md">
                <div class="flex items-center gap-2">
                    <span id="feedback-icon" class="text-lg"></span>
                    <span id="feedback-text" class="${appState.theme.textPrimary} font-medium text-sm"></span>
                </div>
                <div class="mt-1 text-xs ${appState.theme.textSecondary}">
                    A/D para navegar • Enter para activar • Esc para salir
                </div>
            </div>
        `;
        document.body.appendChild(feedback);
    },
    
    /**
     * CloudSonnet4: Inicializa los event listeners de navegación mejorados
     */
    initKeyboardNavigation() {
        let isHoldingKey = false;
        let keyHoldTimer = null;
        
        document.addEventListener('keydown', (e) => {
            // CloudSonnet4: No activar si el usuario está en input o textarea
            if (this.shouldIgnoreNavigation(e)) {
                return;
            }
            
            const key = e.key.toLowerCase();
            
            if ((key === 'a' || key === 'd') && !isHoldingKey) {
                isHoldingKey = true;
                this.isNavigationActive = true;
                
                // Activar navegación inmediatamente
                this.handleNavigation(key, e);
                
                // Mostrar indicador de navegación activa
                this.showNavigationMode(true);
                
                // Timer para detección de mantener tecla presionada
                keyHoldTimer = setTimeout(() => {
                    // Navegación rápida al mantener presionada
                    const rapidNavigation = () => {
                        if (isHoldingKey) {
                            this.handleNavigation(key, e);
                            setTimeout(rapidNavigation, 150); // Navegación cada 150ms
                        }
                    };
                    rapidNavigation();
                }, 300); // Después de 300ms activar navegación rápida
            }
            
            // Activar elemento actual
            if ((key === 'enter' || key === ' ') && this.isNavigationActive) {
                if (this.dockItems[this.currentFocusIndex]) {
                    e.preventDefault();
                    this.activateCurrentItem();
                }
            }
            
            // Escape para salir del modo navegación
            if (key === 'escape' && this.isNavigationActive) {
                this.showNavigationMode(false);
            }
        });
        
        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            
            if (key === 'a' || key === 'd') {
                isHoldingKey = false;
                if (keyHoldTimer) {
                    clearTimeout(keyHoldTimer);
                    keyHoldTimer = null;
                }
                
                // Desactivar modo navegación después de un tiempo
                setTimeout(() => {
                    if (!isHoldingKey) {
                        this.showNavigationMode(false);
                    }
                }, 2000);
            }
        });
    },
    
    /**
     * CloudSonnet4: Maneja la navegación con A/D
     */
    handleNavigation(key, event) {
        event.preventDefault();
        
        if (key === 'a') {
            this.navigateLeft();
        } else if (key === 'd') {
            this.navigateRight();
        }
    },
    
    /**
     * CloudSonnet4: Verifica si debe ignorar la navegación
     */
    shouldIgnoreNavigation(event) {
        const activeElement = document.activeElement;
        const isInputField = activeElement && 
            ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName);
        const isContentEditable = activeElement && 
            activeElement.contentEditable === 'true';
        const hasModifiers = event.ctrlKey || event.metaKey || event.altKey || event.shiftKey;
        const isInModal = appState.activeModal !== null;
        
        return isInputField || isContentEditable || hasModifiers || isInModal;
    },
    
    /**
     * CloudSonnet4: Navega hacia la izquierda (A)
     */
    navigateLeft() {
        if (this.dockItems.length === 0) return;
        
        this.currentFocusIndex--;
        
        // CloudSonnet4: Navegación circular - wrap-around
        if (this.currentFocusIndex < 0) {
            this.currentFocusIndex = this.dockItems.length - 1;
        }
        
        this.updateFocusIndicator();
        this.showNavigationFeedback('⬅️ Navegando izquierda', this.getCurrentItemName());
    },
    
    /**
     * CloudSonnet4: Navega hacia la derecha (D)
     */
    navigateRight() {
        if (this.dockItems.length === 0) return;
        
        this.currentFocusIndex++;
        
        // CloudSonnet4: Navegación circular - wrap-around
        if (this.currentFocusIndex >= this.dockItems.length) {
            this.currentFocusIndex = 0;
        }
        
        this.updateFocusIndicator();
        this.showNavigationFeedback('➡️ Navegando derecha', this.getCurrentItemName());
    },
    
    /**
     * CloudSonnet4: Obtiene el nombre del elemento actual
     */
    getCurrentItemName() {
        const currentItem = this.dockItems[this.currentFocusIndex];
        if (!currentItem) return 'Sin elemento';
        
        const viewName = currentItem.getAttribute('data-view');
        const viewNames = {
            'dashboard': 'Dashboard',
            'income': 'Ingresos',
            'expenses': 'Gastos',
            'goals': 'Metas',
            'investments': 'Inversiones',
            'debts': 'Deudas',
            'achievements': 'Logros',
            'settings': 'Configuración'
        };
        
        return viewNames[viewName] || 'Elemento';
    },
    
    /**
     * CloudSonnet4: Activa el elemento actual
     */
    activateCurrentItem() {
        const currentItem = this.dockItems[this.currentFocusIndex];
        if (currentItem) {
            // Efecto visual de activación
            currentItem.style.transform = 'scale(0.9)';
            setTimeout(() => {
                currentItem.style.transform = 'scale(1)';
            }, 100);
            
            // Activar el elemento
            currentItem.click();
            this.showNavigationFeedback('✅ Activado', this.getCurrentItemName());
            
            // Salir del modo navegación
            setTimeout(() => {
                this.showNavigationMode(false);
            }, 500);
        }
    },
    
    /**
     * CloudSonnet4: Actualiza el indicador de foco visual
     */
    updateFocusIndicator() {
        // Remover indicadores anteriores
        this.dockItems.forEach((item, index) => {
            item.classList.remove('dock-focused');
            if (index === this.currentFocusIndex) {
                item.classList.add('dock-focused');
            }
        });
        
        // Actualizar el indicador de posición
        const indicator = document.getElementById('dock-focus-indicator');
        if (indicator && this.dockItems[this.currentFocusIndex]) {
            const currentItem = this.dockItems[this.currentFocusIndex];
            const rect = currentItem.getBoundingClientRect();
            indicator.style.left = `${rect.left + rect.width / 2 - 2}px`;
            indicator.style.opacity = this.isNavigationActive ? '1' : '0';
        }
    },
    
    /**
     * CloudSonnet4: Añade el indicador visual de foco
     */
    addVisualFocusIndicator() {
        if (document.getElementById('dock-focus-indicator')) return;
        
        const indicator = document.createElement('div');
        indicator.id = 'dock-focus-indicator';
        indicator.className = 'fixed bottom-0 w-1 h-full bg-gradient-to-t from-transparent via-current to-transparent opacity-0 transition-all duration-300 pointer-events-none z-30';
        indicator.style.color = appState.theme.accentColor;
        document.body.appendChild(indicator);
    },
    
    /**
     * CloudSonnet4: Muestra/oculta el modo navegación
     */
    showNavigationMode(show) {
        this.isNavigationActive = show;
        
        const feedback = document.getElementById('navigation-feedback');
        if (feedback) {
            if (show) {
                feedback.style.opacity = '1';
                feedback.style.transform = 'translateX(-50%) translateY(0)';
            } else {
                feedback.style.opacity = '0';
                feedback.style.transform = 'translateX(-50%) translateY(-10px)';
            }
        }
        
        // Actualizar indicadores visuales
        this.updateFocusIndicator();
        
        // Aplicar estilos especiales al dock
        const dock = document.querySelector('.dock-container');
        if (dock) {
            if (show) {
                dock.classList.add('navigation-active');
            } else {
                dock.classList.remove('navigation-active');
            }
        }
    },
    
    /**
     * CloudSonnet4: Muestra feedback de navegación temporal
     */
    showNavigationFeedback(icon, text) {
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackText = document.getElementById('feedback-text');
        
        if (feedbackIcon && feedbackText) {
            feedbackIcon.textContent = icon;
            feedbackText.textContent = text;
        }
        
        // Limpiar timeout anterior
        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }
        
        // Auto-ocultar después de 1.5 segundos de inactividad
        this.feedbackTimeout = setTimeout(() => {
            this.showNavigationMode(false);
        }, 1500);
    },
    
    /**
     * CloudSonnet4: Establece el foco en una vista específica
     */
    setFocusToView(viewName) {
        const targetIndex = this.dockItems.findIndex(item => 
            item.getAttribute('data-view') === viewName
        );
        
        if (targetIndex !== -1) {
            this.currentFocusIndex = targetIndex;
            this.updateFocusIndicator();
        }
    }
};

// CloudSonnet4: Exportar para uso global
window.DockNavigationModule = DockNavigationModule;
