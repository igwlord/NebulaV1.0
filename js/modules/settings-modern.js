// ===============================================
// ⚙️ SETTINGS MODULE MODERNIZADO - Nebula Financial
// ===============================================

/**
 * 🎨 Módulo de configuración completamente rediseñado
 * Incluye: Temas, Monedas, Perfil de Usuario, Cotizaciones
 */
const ModernSettingsModule = {
    
    // Configuración por defecto
    defaultSettings: {
        currency: 'USD',
        dollarMEP: 0,
        profile: {
            name: 'Usuario',
            email: '',
            avatar: '👤',
            joinDate: new Date().toISOString()
        },
        theme: 'aureo-amanecer',
        notifications: true,
        autoSync: false
    },

    /**
     * Renderiza el módulo de configuración modernizado
     */
    render() {
        const settings = this.getSettings();
        
        return `
            <div class="max-w-6xl mx-auto space-y-6">
                <!-- Header Principal -->
                <div class="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                    <h1 class="text-3xl font-bold mb-2">⚙️ Ajustes y Personalización</h1>
                    <p class="text-blue-100">Personaliza tu experiencia en Nebula Financial</p>
                </div>

                <!-- Grid Principal -->
                <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    
                    <!-- Sección: Perfil de Usuario -->
                    ${this.renderProfileSection(settings)}
                    
                    <!-- Sección: Tema Visual -->
                    ${this.renderThemeSection(settings)}
                    
                    <!-- Sección: Moneda y Cotizaciones -->
                    ${this.renderCurrencySection(settings)}
                    
                    <!-- Sección: Herramientas -->
                    ${this.renderToolsSection()}
                    
                    <!-- Sección: Configuración Avanzada -->
                    ${this.renderAdvancedSection(settings)}
                    
                    <!-- Sección: Zona Peligrosa -->
                    ${this.renderDangerZone()}
                </div>
            </div>
        `;
    },

    /**
     * Sección de Perfil de Usuario
     */
    renderProfileSection(settings) {
        return `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    👤 Perfil de Usuario
                </h3>
                
                <!-- Avatar y nombre -->
                <div class="text-center mb-6">
                    <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl cursor-pointer hover:scale-105 transition-transform" id="avatar-selector">
                        ${settings.profile.avatar}
                    </div>
                    
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium text-white/80 mb-1">Nombre</label>
                            <input type="text" 
                                   id="profile-name" 
                                   value="${settings.profile.name}"
                                   class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-white/80 mb-1">Email</label>
                            <input type="email" 
                                   id="profile-email" 
                                   value="${settings.profile.email}"
                                   placeholder="tu@email.com"
                                   class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                        </div>
                    </div>
                </div>
                
                <!-- Info adicional -->
                <div class="text-sm text-white/60 text-center">
                    <p>Miembro desde</p>
                    <p class="font-medium">${new Date(settings.profile.joinDate).toLocaleDateString('es-ES')}</p>
                </div>
                
                <button onclick="ModernSettingsModule.saveProfile()" 
                        class="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    💾 Guardar Perfil
                </button>
            </div>
        `;
    },

    /**
     * Sección de Tema Visual
     */
    renderThemeSection(settings) {
        const themes = [
            { id: 'aureo-amanecer', name: 'Áureo Amanecer', colors: ['#1e3a8a', '#7c3aed', '#fcd34d'], emoji: '🌅' },
            { id: 'crison-vespertino', name: 'Crisón Vespertino', colors: ['#7c2d12', '#dc2626', '#f59e0b'], emoji: '🌆' },
            { id: 'aguamarina-celeste', name: 'Aguamarina Celeste', colors: ['#0c4a6e', '#0891b2', '#06b6d4'], emoji: '🌊' },
            { id: 'violeta-real', name: 'Violeta Real', colors: ['#581c87', '#7c3aed', '#a855f7'], emoji: '🔮' },
            { id: 'esmeralda-bosque', name: 'Esmeralda Bosque', colors: ['#14532d', '#16a34a', '#22c55e'], emoji: '🌲' },
            { id: 'rosa-aurora', name: 'Rosa Aurora', colors: ['#831843', '#e11d48', '#f43f5e'], emoji: '🌸' }
        ];

        return `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    🎨 Tema Visual
                </h3>
                
                <div class="grid grid-cols-2 gap-3 mb-4">
                    ${themes.map(theme => `
                        <button onclick="ModernSettingsModule.changeTheme('${theme.id}')"
                                class="theme-option p-3 rounded-lg border-2 transition-all ${settings.theme === theme.id ? 'border-yellow-400 scale-105' : 'border-white/20 hover:border-white/40'}"
                                data-theme="${theme.id}">
                            <div class="w-full h-12 rounded-lg mb-2 bg-gradient-to-r" 
                                 style="background: linear-gradient(45deg, ${theme.colors.join(', ')})"></div>
                            <div class="text-center">
                                <div class="text-lg mb-1">${theme.emoji}</div>
                                <div class="text-xs text-white/80 font-medium">${theme.name}</div>
                            </div>
                        </button>
                    `).join('')}
                </div>
                
                <!-- Configuraciones adicionales del tema -->
                <div class="space-y-3 pt-3 border-t border-white/20">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-white/80">Partículas de estrellas</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="particles-toggle" class="sr-only peer" checked>
                            <div class="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-white/80">Efectos de glassmorphism</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="glassmorphism-toggle" class="sr-only peer" checked>
                            <div class="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Sección de Moneda y Cotizaciones
     */
    renderCurrencySection(settings) {
        return `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    💰 Moneda y Cotizaciones
                </h3>
                
                <!-- Selector de moneda principal -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-white/80 mb-2">Moneda Principal</label>
                    <select id="currency-selector" 
                            class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                        <option value="USD" ${settings.currency === 'USD' ? 'selected' : ''}>🇺🇸 Dólar Estadounidense (USD)</option>
                        <option value="ARS" ${settings.currency === 'ARS' ? 'selected' : ''}>🇦🇷 Peso Argentino (ARS)</option>
                        <option value="EUR" ${settings.currency === 'EUR' ? 'selected' : ''}>🇪🇺 Euro (EUR)</option>
                        <option value="BRL" ${settings.currency === 'BRL' ? 'selected' : ''}>🇧🇷 Real Brasileño (BRL)</option>
                    </select>
                </div>
                
                <!-- Cotización Dólar MEP -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-white/80 mb-2">Dólar MEP (ARS por USD)</label>
                    <div class="flex gap-2">
                        <input type="number" 
                               id="dollar-mep" 
                               value="${settings.dollarMEP || ''}"
                               placeholder="1250.50"
                               step="0.01"
                               class="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                        <button onclick="ModernSettingsModule.updateMEP()" 
                                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors">
                            🔄
                        </button>
                    </div>
                </div>
                
                <!-- Enlace a cotizaciones -->
                <div class="mb-4">
                    <a href="https://www.dolarito.com" 
                       target="_blank" 
                       class="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        📊 Ver Cotizaciones en Dolarito
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </div>
                
                <!-- Info de conversión -->
                <div class="bg-white/5 rounded-lg p-3 text-sm">
                    <div class="text-white/60 mb-1">Conversión actual:</div>
                    <div class="text-white font-medium">
                        ${settings.currency === 'ARS' && settings.dollarMEP > 0 
                            ? `1 USD = $${settings.dollarMEP} ARS` 
                            : 'Configure la cotización MEP'}
                    </div>
                </div>
                
                <button onclick="ModernSettingsModule.saveCurrency()" 
                        class="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg font-medium transition-colors">
                    💾 Guardar Configuración
                </button>
            </div>
        `;
    },

    /**
     * Sección de Herramientas
     */
    renderToolsSection() {
        return `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    🛠️ Herramientas
                </h3>
                
                <div class="space-y-3">
                    <button onclick="ModernSettingsModule.exportData()" 
                            class="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        <span class="text-xl">📤</span>
                        <div class="text-left">
                            <div class="font-medium">Exportar a Excel</div>
                            <div class="text-xs text-blue-100">Descarga todos tus datos financieros</div>
                        </div>
                    </button>
                    
                    <button onclick="ModernSettingsModule.importData()" 
                            class="w-full flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        <span class="text-xl">📥</span>
                        <div class="text-left">
                            <div class="font-medium">Importar Datos</div>
                            <div class="text-xs text-purple-100">Carga datos desde archivo Excel/CSV</div>
                        </div>
                    </button>
                    
                    <button onclick="ModernSettingsModule.generateReport()" 
                            class="w-full flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        <span class="text-xl">📊</span>
                        <div class="text-left">
                            <div class="font-medium">Generar Reporte</div>
                            <div class="text-xs text-green-100">Resumen financiero detallado</div>
                        </div>
                    </button>
                    
                    <button onclick="ModernSettingsModule.showShortcuts()" 
                            class="w-full flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        <span class="text-xl">⌨️</span>
                        <div class="text-left">
                            <div class="font-medium">Atajos de Teclado</div>
                            <div class="text-xs text-orange-100">Navega más rápido por la aplicación</div>
                        </div>
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Sección de Configuración Avanzada
     */
    renderAdvancedSection(settings) {
        return `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    🔧 Configuración Avanzada
                </h3>
                
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-white font-medium">Notificaciones</div>
                            <div class="text-xs text-white/60">Recibir alertas y recordatorios</div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="notifications-toggle" class="sr-only peer" ${settings.notifications ? 'checked' : ''}>
                            <div class="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-white font-medium">Sincronización Automática</div>
                            <div class="text-xs text-white/60">Guardar cambios automáticamente</div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="autosync-toggle" class="sr-only peer" ${settings.autoSync ? 'checked' : ''}>
                            <div class="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>
                    
                    <div class="pt-3 border-t border-white/20">
                        <div class="text-white font-medium mb-2">Información del Sistema</div>
                        <div class="text-xs text-white/60 space-y-1">
                            <div>Versión: Nebula Financial v3.0</div>
                            <div>Última actualización: ${new Date().toLocaleDateString('es-ES')}</div>
                            <div>Datos almacenados: ${this.getStorageSize()}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Sección de Zona Peligrosa
     */
    renderDangerZone() {
        return `
            <div class="lg:col-span-2 xl:col-span-3 bg-red-500/10 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
                <h3 class="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                    ⚠️ Borrar Todos los Datos
                </h3>
                <div class="bg-red-500/20 rounded-lg p-4">
                    <div class="flex items-start gap-3">
                        <span class="text-2xl">🗑️</span>
                        <div class="flex-1">
                            <h4 class="text-red-300 font-medium mb-2">Esta acción no se puede deshacer</h4>
                            <p class="text-red-200 text-sm mb-4">
                                Se eliminarán todos tus datos financieros, configuraciones y preferencias. 
                                Te recomendamos hacer una copia de seguridad antes de continuar.
                            </p>
                            <button onclick="ModernSettingsModule.confirmClearData()" 
                                    class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                Borrar Todos los Datos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Obtener configuraciones guardadas
     */
    getSettings() {
        const saved = localStorage.getItem('nebula-settings');
        return saved ? { ...this.defaultSettings, ...JSON.parse(saved) } : this.defaultSettings;
    },

    /**
     * Guardar configuraciones
     */
    saveSettings(settings) {
        localStorage.setItem('nebula-settings', JSON.stringify(settings));
        console.log('⚙️ Configuraciones guardadas:', settings);
    },

    /**
     * Cambiar tema
     */
    changeTheme(themeId) {
        const settings = this.getSettings();
        settings.theme = themeId;
        this.saveSettings(settings);
        
        // Aplicar tema inmediatamente si existe la función
        if (window.changeTheme) {
            window.changeTheme(themeId);
        }
        
        // Actualizar interfaz
        this.updateThemeUI(themeId);
        
        // Mostrar notificación
        this.showNotification('🎨 Tema cambiado correctamente', 'success');
    },

    /**
     * Actualizar UI del tema
     */
    updateThemeUI(themeId) {
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.remove('border-yellow-400', 'scale-105');
            btn.classList.add('border-white/20');
        });
        
        const selectedTheme = document.querySelector(`[data-theme="${themeId}"]`);
        if (selectedTheme) {
            selectedTheme.classList.remove('border-white/20');
            selectedTheme.classList.add('border-yellow-400', 'scale-105');
        }
    },

    /**
     * Guardar perfil
     */
    saveProfile() {
        const settings = this.getSettings();
        settings.profile.name = document.getElementById('profile-name').value;
        settings.profile.email = document.getElementById('profile-email').value;
        this.saveSettings(settings);
        this.showNotification('👤 Perfil guardado correctamente', 'success');
    },

    /**
     * Guardar configuración de moneda
     */
    saveCurrency() {
        const settings = this.getSettings();
        settings.currency = document.getElementById('currency-selector').value;
        settings.dollarMEP = parseFloat(document.getElementById('dollar-mep').value) || 0;
        this.saveSettings(settings);
        this.showNotification('💰 Configuración de moneda guardada', 'success');
    },

    /**
     * Actualizar cotización MEP automáticamente
     */
    async updateMEP() {
        // Simular actualización (en producción conectarías a una API real)
        const randomMEP = (1200 + Math.random() * 200).toFixed(2);
        document.getElementById('dollar-mep').value = randomMEP;
        this.showNotification(`🔄 Cotización actualizada: $${randomMEP}`, 'info');
    },

    /**
     * Exportar datos
     */
    exportData() {
        const data = {
            settings: this.getSettings(),
            exportDate: new Date().toISOString(),
            version: '3.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nebula-financial-settings-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('📤 Datos exportados correctamente', 'success');
    },

    /**
     * Importar datos
     */
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (data.settings) {
                            this.saveSettings(data.settings);
                            this.showNotification('📥 Datos importados correctamente', 'success');
                            // Recargar la página para aplicar cambios
                            setTimeout(() => location.reload(), 1500);
                        }
                    } catch (error) {
                        this.showNotification('❌ Error al importar datos', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    },

    /**
     * Generar reporte
     */
    generateReport() {
        this.showNotification('📊 Generando reporte...', 'info');
        // Aquí implementarías la lógica del reporte
        setTimeout(() => {
            this.showNotification('✅ Reporte generado correctamente', 'success');
        }, 2000);
    },

    /**
     * Mostrar atajos de teclado
     */
    showShortcuts() {
        // Implementar modal de atajos
        this.showNotification('⌨️ Función de atajos próximamente', 'info');
    },

    /**
     * Confirmar borrado de datos
     */
    confirmClearData() {
        if (confirm('⚠️ ¿Estás completamente seguro?\n\nEsta acción eliminará TODOS tus datos financieros y no se puede deshacer.\n\n¿Deseas continuar?')) {
            if (confirm('⚠️ ÚLTIMA CONFIRMACIÓN\n\nEscribe "BORRAR" en mayúsculas y presiona OK para confirmar:')) {
                const confirmation = prompt('Escribe "BORRAR" para confirmar:');
                if (confirmation === 'BORRAR') {
                    this.clearAllData();
                } else {
                    this.showNotification('❌ Operación cancelada', 'info');
                }
            }
        }
    },

    /**
     * Borrar todos los datos
     */
    clearAllData() {
        localStorage.clear();
        this.showNotification('🗑️ Todos los datos han sido eliminados', 'success');
        setTimeout(() => location.reload(), 2000);
    },

    /**
     * Obtener tamaño de almacenamiento
     */
    getStorageSize() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length;
            }
        }
        return total > 1024 ? `${(total / 1024).toFixed(1)} KB` : `${total} bytes`;
    },

    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info') {
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };

        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Ocultar
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    /**
     * Inicializar el módulo
     */
    init() {
        console.log('⚙️ Módulo de configuración modernizado inicializado');
        
        // Event listeners para cambios automáticos
        document.addEventListener('change', (e) => {
            if (e.target.id === 'notifications-toggle' || e.target.id === 'autosync-toggle') {
                const settings = this.getSettings();
                if (e.target.id === 'notifications-toggle') {
                    settings.notifications = e.target.checked;
                }
                if (e.target.id === 'autosync-toggle') {
                    settings.autoSync = e.target.checked;
                }
                this.saveSettings(settings);
            }
        });
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ModernSettingsModule = ModernSettingsModule;
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ModernSettingsModule.init());
    } else {
        ModernSettingsModule.init();
    }
}
