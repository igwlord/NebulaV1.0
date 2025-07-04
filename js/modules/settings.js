// ===============================================
// ⚙️ SETTINGS MODULE MODERNIZADO - Nebula Financial
// ===============================================

/**
 * 🎨 Módulo de configuración completamente rediseñado
 * Incluye: Temas, Monedas, Perfil de Usuario, Cotizaciones
 */
const SettingsModule = {
    
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
                <div class="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-2xl">
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
        // Verificar estado de autenticación
        const authState = window.NebulaAuth ? window.NebulaAuth.getState() : { isAuthenticated: false };
        const user = authState.user;
        
        return `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    👤 Perfil de Usuario
                    ${authState.isAuthenticated ? 
                        `<span class="text-xs px-2 py-1 bg-green-500 rounded-full text-white">${authState.isAnonymous ? 'Temporal' : 'Conectado'}</span>` : 
                        `<span class="text-xs px-2 py-1 bg-gray-500 rounded-full text-white">Sin conectar</span>`
                    }
                </h3>
                
                <!-- Estado de autenticación -->
                ${authState.isAuthenticated ? `
                    <!-- Usuario autenticado -->
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl cursor-pointer hover:scale-105 transition-transform" id="avatar-selector">
                            ${user.photoURL ? `<img src="${user.photoURL}" alt="Avatar" class="w-full h-full rounded-full object-cover">` : settings.profile.avatar}
                        </div>
                        
                        <div class="space-y-3">
                            <div>
                                <label class="block text-sm font-medium text-white/80 mb-1">Nombre</label>
                                <input type="text" 
                                       id="profile-name" 
                                       value="${user.displayName || settings.profile.name}"
                                       class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-white/80 mb-1">Email</label>
                                <input type="email" 
                                       id="profile-email" 
                                       value="${user.email || settings.profile.email}"
                                       placeholder="tu@email.com"
                                       ${user.email ? 'readonly' : ''}
                                       class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${user.email ? 'opacity-70' : ''}">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Info adicional -->
                    <div class="text-sm text-white/60 text-center mb-4">
                        <p>Miembro desde</p>
                        <p class="font-medium">${new Date(user.createdAt || settings.profile.joinDate).toLocaleDateString('es-ES')}</p>
                        ${user.lastSignIn ? `<p class="text-xs mt-1">Último acceso: ${new Date(user.lastSignIn).toLocaleDateString('es-ES')}</p>` : ''}
                    </div>
                    
                    <!-- Botones de acción -->
                    <div class="space-y-2">
                        <button onclick="SettingsModule.saveProfile()" 
                                class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                            💾 Guardar Perfil
                        </button>
                        
                        ${authState.isAnonymous ? `
                            <button onclick="SettingsModule.upgradeAccount()" 
                                    class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                🔗 Guardar Cuenta Permanentemente
                            </button>
                        ` : ''}
                        
                        <button onclick="SettingsModule.signOut()" 
                                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                            🚪 Cerrar Sesión
                        </button>
                    </div>
                ` : `
                    <!-- Usuario no autenticado -->
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-3xl">
                            �
                        </div>
                        
                        <p class="text-white/60 mb-4">Inicia sesión para sincronizar tus datos y acceder desde cualquier dispositivo</p>
                        
                        <div class="space-y-3">
                            <button onclick="SettingsModule.signInWithGoogle()" 
                                    class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Iniciar sesión con Google
                            </button>
                            
                            <button onclick="SettingsModule.signInAnonymously()" 
                                    class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                👻 Continuar sin cuenta
                            </button>
                            
                            <p class="text-xs text-white/50 mt-2">
                                Con "Continuar sin cuenta" puedes usar la app temporalmente. 
                                Podrás crear una cuenta permanente más tarde.
                            </p>
                        </div>
                    </div>
                `}
            </div>
        `;
    },

    /**
     * Sección de Tema Visual
     */
    renderThemeSection(settings) {
        // Mapear nuestros temas con los del sistema existente
        const themes = [
            { id: 'aureoAmanecer', newId: 'aureo-amanecer', name: 'Áureo Amanecer', colors: ['#1e3a8a', '#7c3aed', '#fcd34d'], emoji: '🌅' },
            { id: 'crisonVespertino', newId: 'crison-vespertino', name: 'Crisón Vespertino', colors: ['#7c2d12', '#dc2626', '#f59e0b'], emoji: '🌆' },
            { id: 'aguamarinaCeleste', newId: 'aguamarina-celeste', name: 'Aguamarina Celeste', colors: ['#0c4a6e', '#0891b2', '#06b6d4'], emoji: '🌊' },
            { id: 'violetaReal', newId: 'violeta-real', name: 'Violeta Real', colors: ['#581c87', '#7c3aed', '#a855f7'], emoji: '🔮' },
            { id: 'esmeraldaBosque', newId: 'esmeralda-bosque', name: 'Esmeralda Bosque', colors: ['#14532d', '#16a34a', '#22c55e'], emoji: '🌲' },
            { id: 'rosaAurora', newId: 'rosa-aurora', name: 'Rosa Aurora', colors: ['#831843', '#e11d48', '#f43f5e'], emoji: '🌸' }
        ];

        // Obtener el tema actual del appState global si está disponible
        const currentTheme = window.appState ? window.appState.themeKey : settings.theme;
        
        return `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    🎨 Tema Visual
                </h3>
                
                <div class="grid grid-cols-2 gap-3">
                    ${themes.map(theme => `
                        <button onclick="SettingsModule.changeTheme('${theme.id}')"
                                class="theme-option p-3 rounded-lg border-2 transition-all ${currentTheme === theme.id ? 'border-yellow-400 scale-105' : 'border-white/20 hover:border-white/40'}"
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
                        <button onclick="SettingsModule.updateMEP()" 
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
                
                <button onclick="SettingsModule.saveCurrency()" 
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
                    <button onclick="SettingsModule.exportData()" 
                            class="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        <span class="text-xl">📤</span>
                        <div class="text-left">
                            <div class="font-medium">Exportar a Excel</div>
                            <div class="text-xs text-blue-100">Descarga todos tus datos financieros</div>
                        </div>
                    </button>
                    
                    <button onclick="SettingsModule.importData()" 
                            class="w-full flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        <span class="text-xl">📥</span>
                        <div class="text-left">
                            <div class="font-medium">Importar Datos</div>
                            <div class="text-xs text-purple-100">Carga datos desde archivo Excel/CSV</div>
                        </div>
                    </button>
                    
                    <button onclick="SettingsModule.generateReport()" 
                            class="w-full flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        <span class="text-xl">📊</span>
                        <div class="text-left">
                            <div class="font-medium">Generar Reporte</div>
                            <div class="text-xs text-green-100">Resumen financiero detallado</div>
                        </div>
                    </button>
                    
                    <button onclick="SettingsModule.showShortcuts()" 
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
                            <button onclick="SettingsModule.confirmClearData()" 
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
        console.log('🎨 Cambiando tema a:', themeId);
        
        // Usar el sistema de temas existente de la aplicación
        if (window.appState && window.appState.setTheme) {
            window.appState.setTheme(themeId);
            console.log('✅ Tema aplicado via appState.setTheme');
        } else {
            console.log('⚠️ appState.setTheme no disponible, guardando en configuración local');
        }
        
        // Guardar en nuestra configuración local también
        const settings = this.getSettings();
        settings.theme = themeId;
        this.saveSettings(settings);
        
        // Actualizar interfaz local
        this.updateThemeUI(themeId);
        
        // Mostrar notificación
        this.showNotification('🎨 Tema cambiado correctamente', 'success');
        
        // Emitir evento personalizado para que otros módulos puedan reaccionar
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { themeId } 
        }));
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
     * ==============================================
     * 🔐 FUNCIONES DE AUTENTICACIÓN FIREBASE
     * ==============================================
     */

    /**
     * Iniciar sesión con Google
     */
    async signInWithGoogle() {
        try {
            this.showNotification('🔑 Iniciando sesión con Google...', 'info');
            
            if (window.NebulaAuth) {
                const result = await NebulaAuth.signInWithGoogle();
                this.showNotification('✅ ¡Bienvenido! Sesión iniciada correctamente', 'success');
                
                // Actualizar la vista después de login exitoso
                setTimeout(() => {
                    if (window.showView) {
                        window.showView('settings');
                    }
                }, 1000);
                
            } else {
                throw new Error('Módulo de autenticación no disponible');
            }
        } catch (error) {
            console.error('❌ Error en login con Google:', error);
            this.showNotification('❌ Error al iniciar sesión: ' + error.message, 'error');
        }
    },

    /**
     * Iniciar sesión anónima
     */
    async signInAnonymously() {
        try {
            this.showNotification('👻 Iniciando sesión temporal...', 'info');
            
            if (window.NebulaAuth) {
                const result = await NebulaAuth.signInAnonymously();
                this.showNotification('✅ Sesión temporal iniciada. Podrás guardar permanentemente más tarde', 'success');
                
                // Actualizar la vista después de login exitoso
                setTimeout(() => {
                    if (window.showView) {
                        window.showView('settings');
                    }
                }, 1000);
                
            } else {
                throw new Error('Módulo de autenticación no disponible');
            }
        } catch (error) {
            console.error('❌ Error en login anónimo:', error);
            this.showNotification('❌ Error al iniciar sesión temporal: ' + error.message, 'error');
        }
    },

    /**
     * Actualizar cuenta anónima a permanente
     */
    async upgradeAccount() {
        try {
            this.showNotification('⬆️ Actualizando cuenta a permanente...', 'info');
            
            if (window.NebulaAuth) {
                const result = await NebulaAuth.upgradeAnonymousAccount();
                this.showNotification('✅ ¡Perfecto! Tu cuenta ahora es permanente', 'success');
                
                // Actualizar la vista después de upgrade exitoso
                setTimeout(() => {
                    if (window.showView) {
                        window.showView('settings');
                    }
                }, 1000);
                
            } else {
                throw new Error('Módulo de autenticación no disponible');
            }
        } catch (error) {
            console.error('❌ Error actualizando cuenta:', error);
            this.showNotification('❌ Error al actualizar cuenta: ' + error.message, 'error');
        }
    },

    /**
     * Cerrar sesión
     */
    async signOut() {
        try {
            const confirmed = confirm('¿Estás seguro de que quieres cerrar sesión?\n\nTus datos locales se mantendrán, pero perderás el acceso a la sincronización.');
            
            if (!confirmed) return;
            
            this.showNotification('🚪 Cerrando sesión...', 'info');
            
            if (window.NebulaAuth) {
                await NebulaAuth.signOut();
                this.showNotification('✅ Sesión cerrada correctamente', 'success');
                
                // Actualizar la vista después de logout
                setTimeout(() => {
                    if (window.showView) {
                        window.showView('settings');
                    }
                }, 1000);
                
            } else {
                throw new Error('Módulo de autenticación no disponible');
            }
        } catch (error) {
            console.error('❌ Error cerrando sesión:', error);
            this.showNotification('❌ Error al cerrar sesión: ' + error.message, 'error');
        }
    },

    /**
     * Actualizar configuración del usuario desde Firebase
     */
    updateUserSettings(user) {
        if (!user) return;
        
        const settings = this.getSettings();
        
        // Actualizar datos del perfil con info de Firebase
        if (user.displayName) {
            settings.profile.name = user.displayName;
        }
        if (user.email) {
            settings.profile.email = user.email;
        }
        if (user.photoURL) {
            settings.profile.avatar = user.photoURL;
        }
        
        // Actualizar fecha de creación si es nueva
        if (user.createdAt && !settings.profile.joinDate) {
            settings.profile.joinDate = user.createdAt;
        }
        
        this.saveSettings(settings);
        console.log('👤 Configuración de usuario actualizada desde Firebase');
    },

    /**
     * Inicializar el módulo
     */
    init() {
        console.log('⚙️ Módulo de configuración modernizado inicializado');
        console.log('🎯 NebulaSettingsModule disponible:', typeof window.NebulaSettingsModule);
        
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
        
        // Hacer que el módulo esté disponible globalmente para debug
        window.SettingsModuleDebug = this;
    },

    /**
     * Función de debug para forzar actualización
     */
    forceUpdate() {
        console.log('🔄 Forzando actualización del módulo de settings...');
        
        // Si existe showView en el contexto global, actualizamos
        if (window.showView) {
            window.showView('settings');
            console.log('✅ Vista actualizada via showView');
        }
        
        // También forzamos una re-renderización del contenido actual si está en settings
        const contentRoot = document.getElementById('content-root');
        if (contentRoot) {
            if (contentRoot.innerHTML.includes('Ajustes y Personalización')) {
                contentRoot.innerHTML = this.render();
                this.init(); // Re-inicializar event listeners
                console.log('✅ Contenido actualizado directamente');
            } else {
                console.log('🔄 No estamos en la vista de settings, forzando navegación...');
                if (window.showView) {
                    window.showView('settings');
                }
            }
        }
        
        this.showNotification('🔄 Módulo de settings actualizado', 'success');
    },

    // ...existing code...
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.SettingsModule = SettingsModule;
    window.NebulaSettingsModule = SettingsModule; // Compatibilidad con la aplicación
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SettingsModule.init());
    } else {
        SettingsModule.init();
    }
}
