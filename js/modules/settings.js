// ===============================================
// ⚙️ SETTINGS MODULE - CloudSonnet4
// ===============================================

/**
 * 🎨 Módulo de configuración rediseñado con interfaz limpia y profesional
 * Incluye todas las funcionalidades solicitadas con diseño mejorado
 */
const SettingsModule = {
    
    /**
     * CloudSonnet4: Renderiza el menú de configuración rediseñado
     */
    render() {
        return `
            <div class="${appState.theme.surface} rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
                <h2 class="text-2xl font-bold ${appState.theme.textPrimary} mb-6 flex items-center gap-3">
                    ⚙️ Configuración
                </h2>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Sección de Temas -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold ${appState.theme.textPrimary} flex items-center gap-2">
                            🎨 Temas
                        </h3>
                        <div class="grid grid-cols-2 gap-3">
                            ${this.renderThemes()}
                        </div>
                    </div>
                    
                    <!-- Sección de Herramientas -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold ${appState.theme.textPrimary} flex items-center gap-2">
                            🛠️ Herramientas
                        </h3>
                        <div class="space-y-2">
                            ${this.renderToolButtons()}
                        </div>
                    </div>
                    
                    <!-- Sección de Atajos de Teclado -->
                    <div class="lg:col-span-2 space-y-4">
                        <h3 class="text-lg font-semibold ${appState.theme.textPrimary} flex items-center gap-2">
                            ⌨️ Atajos de Teclado
                            <button id="shortcuts-tooltip-btn" class="text-sm ${appState.theme.accent} hover:${appState.theme.accentBg} px-2 py-1 rounded">
                                ℹ️
                            </button>
                        </h3>                        <div id="shortcuts-help" class="hidden ${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg p-4">
                            ${this.renderShortcutsHelp()}
                        </div>
                    </div>
                    
                    <!-- Sección de Zona Peligrosa -->
                    <div class="lg:col-span-2 mt-8 pt-6 border-t border-red-500/30">
                        <h3 class="text-lg font-semibold text-red-400 flex items-center gap-2 mb-4">
                            ⚠️ Zona Peligrosa
                        </h3>
                        <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                            <button id="clear-all-data-btn" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                🗑️ Borrar todos los datos
                            </button>
                            <p class="text-sm text-red-300 mt-2">
                                Esta acción no se puede deshacer. Se recomienda hacer un backup antes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * CloudSonnet4: Renderiza las previsualizaciones de temas mejoradas (solo partículas de estrellas)
     */
    renderThemes() {
        return Object.entries(THEMES).map(([key, theme]) => `
            <button data-theme-key="${key}" class="theme-selector group relative p-3 rounded-xl border-2 transition-all duration-200 ${appState.themeKey === key ? `${theme.accentBorder} scale-105 shadow-lg` : 'border-transparent opacity-70 hover:opacity-100 hover:scale-102'}">
                <!-- CloudSonnet4: Solo fondo de partículas de estrellas (eliminados fondos dinámicos adicionales) -->
                <div class="w-full h-20 rounded-lg mb-3 overflow-hidden relative" style="background: ${theme.gradient}">
                    <div class="absolute inset-0 opacity-40">
                        ${this.renderStarParticles(theme.sunColor)}
                    </div>
                    <!-- Indicador del tema activo -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-3 h-3 rounded-full" style="background-color: ${theme.sunColor}; box-shadow: 0 0 12px ${theme.sunColor}40;"></div>
                    </div>
                </div>
                <p class="text-sm font-medium ${appState.theme.textPrimary} text-center">${theme.name}</p>
                ${appState.themeKey === key ? `<div class="absolute -top-1 -right-1 w-6 h-6 ${theme.accentBg} rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>` : ''}
            </button>
        `).join('');
    },
    
    /**
     * CloudSonnet4: Renderiza partículas de estrellas para vista previa
     */
    renderStarParticles(sunColor = '#FFD700') {
        const stars = Array.from({length: 12}, () => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 1.5 + 0.5;
            const opacity = Math.random() * 0.8 + 0.2;
            return `<div class="absolute bg-white rounded-full animate-pulse" style="left: ${left}%; top: ${top}%; width: ${size}px; height: ${size}px; opacity: ${opacity}; animation-delay: ${Math.random() * 2}s;"></div>`;
        });
        return stars.join('');
    },
    
    /**
     * CloudSonnet4: Renderiza los botones de herramientas mejorados
     */
    renderToolButtons() {
        const tools = [
            {
                id: 'logout-btn',
                icon: '🚪',
                text: 'Cerrar sesión',
                description: 'Salir de la aplicación',
                color: 'text-red-400',
                bgHover: 'hover:bg-red-500/10'
            },
            {
                id: 'export-json-btn',
                icon: '📥',
                text: 'Exportar backup (JSON)',
                description: 'Descargar todos los datos',
                color: 'text-green-400',
                bgHover: 'hover:bg-green-500/10'
            },
            {
                id: 'import-json-btn',
                icon: '📤',
                text: 'Importar backup',
                description: 'Cargar datos desde archivo',
                color: 'text-blue-400',
                bgHover: 'hover:bg-blue-500/10'
            },
            {
                id: 'export-excel-btn',
                icon: '📊',
                text: 'Exportar a Excel',
                description: 'Crear hoja de cálculo',
                color: 'text-emerald-400',
                bgHover: 'hover:bg-emerald-500/10'
            },
            {
                id: 'open-shortcuts-btn',
                icon: '⌨️',
                text: 'Ver atajos de teclado',
                description: 'Lista completa de shortcuts',
                color: 'text-purple-400',
                bgHover: 'hover:bg-purple-500/10'
            }
        ];
        
        return tools.map(tool => `
            <button id="${tool.id}" class="w-full flex items-center gap-3 ${appState.theme.surface} ${tool.bgHover} p-3 rounded-lg transition-all duration-200 border ${appState.theme.accentBorder}/20 hover:border-${appState.theme.accentBorder} hover:scale-102">
                <span class="text-xl ${tool.color}">${tool.icon}</span>
                <div class="text-left flex-1">
                    <p class="font-medium ${appState.theme.textPrimary}">${tool.text}</p>
                    <p class="text-xs ${appState.theme.textSecondary}">${tool.description}</p>
                </div>
                <span class="text-sm ${appState.theme.textSecondary}">›</span>
            </button>
        `).join('');
    },
    
    /**
     * CloudSonnet4: Renderiza la ayuda de atajos de teclado
     */
    renderShortcutsHelp() {
        const shortcuts = [
            { keys: ['D'], description: 'Ir al Dashboard' },
            { keys: ['I'], description: 'Ir a Ingresos' },
            { keys: ['G'], description: 'Ir a Gastos' },
            { keys: ['N'], description: 'Ir a Inversiones' },
            { keys: ['P'], description: 'Ir a Deudas' },
            { keys: ['M'], description: 'Ir a Metas' },
            { keys: ['A'], description: 'Ir a Ajustes' },
            { keys: ['F4'], description: 'Abrir calendario' },
            { keys: ['H'], description: 'Mostrar atajos' },
            { keys: ['T'], description: 'Alternar privacidad' },
            { keys: ['ESC'], description: 'Cerrar modal' },
            { keys: ['←', '→'], description: 'Navegar meses' },
            { keys: ['A', 'D'], description: 'Navegar dock (izq/der)' }
        ];
        
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${shortcuts.map(shortcut => `
                    <div class="flex items-center gap-3 p-2 rounded">
                        <div class="flex gap-1">
                            ${shortcut.keys.map(key => `
                                <kbd class="px-2 py-1 text-xs font-mono ${appState.theme.accentBg} ${appState.theme.textPrimary} rounded border">${key}</kbd>
                            `).join('')}
                        </div>
                        <span class="text-sm ${appState.theme.textSecondary}">${shortcut.description}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    /**
     * CloudSonnet4: Inicializa los event listeners del módulo
     */
    initEventListeners() {
        // Toggle shortcuts help
        const shortcutsTooltipBtn = document.getElementById('shortcuts-tooltip-btn');
        const shortcutsHelp = document.getElementById('shortcuts-help');
        
        if (shortcutsTooltipBtn && shortcutsHelp) {
            shortcutsTooltipBtn.addEventListener('click', () => {
                shortcutsHelp.classList.toggle('hidden');
            });
        }
        
        // Theme selectors
        document.querySelectorAll('.theme-selector').forEach(button => {
            button.addEventListener('click', (e) => {
                const themeKey = e.currentTarget.dataset.themeKey;
                appState.setTheme(themeKey);
            });
        });
        
        // Tool buttons
        this.initToolButtons();
    },
    
    /**
     * CloudSonnet4: Inicializa los botones de herramientas
     */
    initToolButtons() {
        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
        
        // Export JSON
        const exportJsonBtn = document.getElementById('export-json-btn');
        if (exportJsonBtn) {
            exportJsonBtn.addEventListener('click', () => {
                this.exportToJSON();
            });
        }
        
        // Import JSON
        const importJsonBtn = document.getElementById('import-json-btn');
        if (importJsonBtn) {
            importJsonBtn.addEventListener('click', () => {
                this.importFromJSON();
            });
        }
        
        // Export Excel
        const exportExcelBtn = document.getElementById('export-excel-btn');
        if (exportExcelBtn) {
            exportExcelBtn.addEventListener('click', () => {
                this.exportToExcel();
            });
        }
          // Clear all data
        const clearAllBtn = document.getElementById('clear-all-data-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                this.handleClearAllData();
            });
        }
        
        // Open shortcuts help
        const openShortcutsBtn = document.getElementById('open-shortcuts-btn');
        if (openShortcutsBtn) {
            openShortcutsBtn.addEventListener('click', () => {
                this.showShortcutsModal();
            });
        }
    },
      /**
     * CloudSonnet4: Maneja el cierre de sesión con modal elegante
     */
    async handleLogout() {
        // CloudSonnet4: Modal elegante para cerrar sesión
        const confirmed = await window.showWarningModal(
            '¿Cerrar sesión?',
            'Tus datos se mantendrán guardados localmente de forma segura.',
            { 
                confirmText: 'Cerrar sesión',
                cancelText: 'Permanecer' 
            }
        );

        if (confirmed) {
            // Limpiar datos de sesión pero mantener datos guardados
            appState.user = null;
            appState.isLoggedIn = false;
            
            // Redirigir al login
            renderApp();
            
            NotificationSystem.info('Sesión', 'Has cerrado sesión exitosamente');
        }
    },
    
    /**
     * CloudSonnet4: Exporta los datos a JSON
     */
    exportToJSON() {
        try {
            const exportData = {
                version: '2.4',
                timestamp: new Date().toISOString(),
                data: appState.data,
                settings: {
                    theme: appState.themeKey,
                    privacy: appState.isPrivate
                }
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nebula-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            NotificationSystem.success('Exportación', 'Backup creado exitosamente');
        } catch (error) {
            console.error('Error al exportar:', error);
            NotificationSystem.error('Error', 'No se pudo crear el backup');
        }
    },
    
    /**
     * CloudSonnet4: Importa datos desde JSON
     */
    importFromJSON() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
          input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    // CloudSonnet4: Modal elegante para importar datos
                    const confirmed = await window.showDangerModal(
                        '⚠️ Importar datos',
                        '¿Estás seguro de que quieres importar estos datos?<br><br><strong>Esto sobrescribirá todos los datos actuales.</strong><br><br>Esta acción no se puede deshacer.',
                        { 
                            confirmText: 'Sí, importar',
                            cancelText: 'Cancelar' 
                        }
                    );

                    if (confirmed) {
                        appState.data = importData.data || appState.data;
                        
                        if (importData.settings) {
                            if (importData.settings.theme) {
                                appState.setTheme(importData.settings.theme);
                            }
                            appState.isPrivate = importData.settings.privacy || false;
                        }
                        
                        appState.saveState();
                        renderApp();
                        
                        NotificationSystem.success('Importación', 'Datos importados exitosamente');
                    }
                } catch (error) {
                    console.error('Error al importar:', error);
                    NotificationSystem.error('Error', 'Archivo JSON inválido');
                }
            };
            reader.readAsText(file);
        });
        
        input.click();
    },
    
    /**
     * CloudSonnet4: Exporta a Excel (CSV compatible)
     */
    exportToExcel() {
        try {
            const transactions = Object.entries(appState.data.transactions).flatMap(([month, trans]) => 
                trans.map(t => ({
                    Fecha: new Date(t.date).toLocaleDateString(),
                    Mes: month,
                    Tipo: t.type === 'income' ? 'Ingreso' : 'Gasto',
                    Descripción: t.description,
                    Categoría: t.category,
                    Monto: t.amount
                }))
            );
            
            const csvContent = this.arrayToCSV(transactions);
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nebula-transactions-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            NotificationSystem.success('Exportación', 'Archivo Excel creado exitosamente');
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
            NotificationSystem.error('Error', 'No se pudo crear el archivo Excel');
        }
    },
    
    /**
     * CloudSonnet4: Convierte array a CSV
     */
    arrayToCSV(array) {
        if (array.length === 0) return '';
        
        const headers = Object.keys(array[0]);
        const csvRows = [headers.join(',')];
        
        for (const row of array) {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
            });
            csvRows.push(values.join(','));
        }
        
        return csvRows.join('\n');
    },
    
    /**
     * CloudSonnet4: Maneja el borrado de todos los datos
     */
    handleClearAllData() {
        const confirmText = 'BORRAR DATOS';
        const userInput = prompt(
            `¿Estás COMPLETAMENTE seguro de que quieres borrar TODOS los datos?\n\n` +
            `Esta acción NO se puede deshacer.\n\n` +
            `Escribe "${confirmText}" para confirmar:`
        );
        
        if (userInput === confirmText) {
            // Limpiar todos los datos
            appState.data = {
                transactions: {},
                goals: [],
                investments: [],
                debts: []
            };
            
            // Mantener tema y configuraciones básicas
            appState.saveState();
            renderApp();
              NotificationSystem.warning('Datos Eliminados', 'Todos los datos han sido borrados', 5000);
        } else if (userInput !== null) {
            NotificationSystem.error('Cancelado', 'Texto de confirmación incorrecto');
        }
    },
    
    /**
     * CloudSonnet4: Muestra modal con todos los atajos de teclado
     */
    showShortcutsModal() {
        const modalContent = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div class="${appState.theme.surface} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b ${appState.theme.accentBorder}">
                        <h2 class="text-xl font-bold ${appState.theme.textPrimary} flex items-center gap-2">
                            ⌨️ Atajos de Teclado
                        </h2>
                        <button onclick="this.closest('.fixed').remove()" class="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            ${createIcon(ICONS.x, 'w-5 h-5 ' + appState.theme.textSecondary)}
                        </button>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-6 overflow-y-auto max-h-[60vh]">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <!-- Navegación General -->
                            <div>
                                <h3 class="font-semibold ${appState.theme.textPrimary} mb-3 flex items-center gap-2">
                                    🗂️ Navegación General
                                </h3>
                                <div class="space-y-2">
                                    ${this.renderShortcutItem(['A'], 'Navegar dock izquierda')}
                                    ${this.renderShortcutItem(['D'], 'Navegar dock derecha')}
                                    ${this.renderShortcutItem(['Enter'], 'Activar elemento seleccionado')}
                                    ${this.renderShortcutItem(['Esc'], 'Salir modo navegación / Cerrar modal')}
                                    ${this.renderShortcutItem(['←', '→'], 'Cambiar mes (Dashboard)')}
                                </div>
                            </div>
                            
                            <!-- Acceso Rápido -->
                            <div>
                                <h3 class="font-semibold ${appState.theme.textPrimary} mb-3 flex items-center gap-2">
                                    🚀 Acceso Rápido
                                </h3>
                                <div class="space-y-2">
                                    ${this.renderShortcutItem(['F4'], 'Abrir calendario')}
                                    ${this.renderShortcutItem(['T'], 'Alternar modo privado')}
                                    ${this.renderShortcutItem(['H'], 'Mostrar esta ayuda')}
                                    ${this.renderShortcutItem(['Ctrl', '+', 'S'], 'Guardar datos')}
                                    ${this.renderShortcutItem(['Ctrl', '+', 'E'], 'Exportar datos')}
                                </div>
                            </div>
                            
                            <!-- Transacciones -->
                            <div>
                                <h3 class="font-semibold ${appState.theme.textPrimary} mb-3 flex items-center gap-2">
                                    💰 Transacciones
                                </h3>
                                <div class="space-y-2">
                                    ${this.renderShortcutItem(['N'], 'Nueva transacción')}
                                    ${this.renderShortcutItem(['Delete'], 'Eliminar seleccionada')}
                                    ${this.renderShortcutItem(['Ctrl', '+', 'C'], 'Copiar mes anterior')}
                                    ${this.renderShortcutItem(['Ctrl', '+', 'Y'], 'Repetir hasta fin de año')}
                                </div>
                            </div>
                            
                            <!-- Configuración -->
                            <div>
                                <h3 class="font-semibold ${appState.theme.textPrimary} mb-3 flex items-center gap-2">
                                    ⚙️ Configuración
                                </h3>
                                <div class="space-y-2">
                                    ${this.renderShortcutItem(['1', '2', '3', '4'], 'Cambiar tema rápido')}
                                    ${this.renderShortcutItem(['Ctrl', '+', 'R'], 'Reiniciar aplicación')}
                                    ${this.renderShortcutItem(['Ctrl', '+', 'L'], 'Cerrar sesión')}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Nota importante -->
                        <div class="mt-6 p-4 ${appState.theme.surface} border ${appState.theme.accentBorder} rounded-lg">
                            <h4 class="font-semibold ${appState.theme.accent} mb-2">💡 Importante</h4>
                            <p class="text-sm ${appState.theme.textSecondary}">
                                Los atajos A/D para navegar el dock no funcionan cuando estás escribiendo en campos de texto. 
                                Esto es intencional para no interferir con la escritura normal.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="flex justify-end gap-2 p-6 border-t ${appState.theme.accentBorder}">
                        <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 ${appState.theme.accentBg} text-white rounded-lg hover:opacity-80 transition-opacity">
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    },
    
    /**
     * CloudSonnet4: Renderiza un elemento de atajo de teclado
     */
    renderShortcutItem(keys, description) {
        return `
            <div class="flex items-center justify-between py-2">
                <div class="flex gap-1">
                    ${keys.map(key => `
                        <kbd class="px-2 py-1 text-xs font-mono ${appState.theme.surface} border ${appState.theme.accentBorder} rounded">${key}</kbd>
                    `).join('<span class="text-xs text-gray-400 mx-1">+</span>')}
                </div>
                <span class="text-sm ${appState.theme.textSecondary} ml-3">${description}</span>
            </div>
        `;
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.SettingsModule = SettingsModule;
}
