/**
 * 🎨 INTERFAZ DE AUTENTICACIÓN - NEBULA FINANCE
 * UI completa para login con Gmail y gestión de perfiles
 */

class NebulaAuthUI {
    constructor() {
        this.isVisible = false;
        this.currentStep = 'login'; // login, profile, loading
        this.container = null;
        
        this.initializeUI();
        this.setupAuthListener();
    }

    /**
     * Inicializar UI
     */
    initializeUI() {
        if (window.NEBULA_DEBUG) {
            console.log('🎨 Inicializando UI de autenticación...');
        }
        this.createAuthContainer();
        this.bindEvents();
    }

    /**
     * Crear contenedor de autenticación
     */
    createAuthContainer() {
        this.container = document.createElement('div');
        this.container.id = 'nebula-auth-ui';
        this.container.className = 'hidden';
        document.body.appendChild(this.container);
    }

    /**
     * Configurar listener de autenticación
     */
    setupAuthListener() {
        if (window.NebulaAuth) {
            window.NebulaAuth.addAuthListener((authData) => {
                this.handleAuthChange(authData);
            });
        }
    }

    /**
     * Manejar cambios de autenticación
     */
    handleAuthChange(authData) {
        if (authData.isAuthenticated) {
            this.showProfileInfo(authData);
            setTimeout(() => this.hideAuth(), 2000);
        } else {
            this.currentStep = 'login';
        }
    }

    /**
     * Mostrar interfaz de login
     */
    showAuth() {
        this.isVisible = true;
        this.currentStep = 'login';
        this.render();
        this.container.classList.remove('hidden');
        
        // Animación de entrada
        requestAnimationFrame(() => {
            this.container.style.opacity = '0';
            this.container.style.transform = 'scale(0.9)';
            this.container.style.transition = 'all 0.3s ease-out';
            
            requestAnimationFrame(() => {
                this.container.style.opacity = '1';
                this.container.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * Ocultar interfaz
     */
    hideAuth() {
        if (!this.isVisible) return;
        
        this.container.style.transition = 'all 0.3s ease-in';
        this.container.style.opacity = '0';
        this.container.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            this.container.classList.add('hidden');
            this.isVisible = false;
        }, 300);
    }

    /**
     * Renderizar interfaz
     */
    render() {
        const theme = this.getCurrentTheme();
        
        this.container.innerHTML = `
            <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                <div class="relative w-full max-w-md mx-4">
                    ${this.renderContent(theme)}
                </div>
            </div>
        `;
        
        this.bindEvents();
    }

    /**
     * Renderizar contenido según el paso actual
     */
    renderContent(theme) {
        switch (this.currentStep) {
            case 'login':
                return this.renderLoginStep(theme);
            case 'loading':
                return this.renderLoadingStep(theme);
            case 'profile':
                return this.renderProfileStep(theme);
            case 'error':
                return this.renderErrorStep(theme);
            default:
                return this.renderLoginStep(theme);
        }
    }

    /**
     * Renderizar paso de login
     */
    renderLoginStep(theme) {
        return `
            <div class="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <span class="text-3xl">🌌</span>
                    </div>
                    <h2 class="text-2xl font-bold text-white mb-2">Nebula Finance</h2>
                    <p class="text-gray-400">Accede con tu cuenta de Google para sincronizar tus datos</p>
                </div>

                <!-- Login Button -->
                <button id="nebula-google-login" 
                        class="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 mb-6">
                    <svg class="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar con Google
                </button>

                <!-- Guest Option -->
                <button id="nebula-guest-login" 
                        class="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-gray-600 hover:border-gray-500 mb-6">
                    👤 Continuar como invitado
                </button>

                <!-- Info -->
                <div class="text-center">
                    <p class="text-xs text-gray-500 mb-4">
                        Al iniciar sesión, aceptas nuestros términos de servicio y política de privacidad
                    </p>
                    
                    <div class="flex items-center justify-center gap-4 text-xs text-gray-600">
                        <span class="flex items-center gap-1">
                            🔒 Datos seguros
                        </span>
                        <span class="flex items-center gap-1">
                            ☁️ Sincronización
                        </span>
                        <span class="flex items-center gap-1">
                            📱 Multiplataforma
                        </span>
                    </div>
                </div>

                <!-- Close Button -->
                <button id="nebula-auth-close" 
                        class="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
    }

    /**
     * Renderizar paso de carga
     */
    renderLoadingStep(theme) {
        return `
            <div class="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div class="text-center">
                    <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-pulse">
                        <span class="text-3xl">🌌</span>
                    </div>
                    
                    <h3 class="text-xl font-semibold text-white mb-4">Iniciando sesión...</h3>
                    
                    <div class="flex justify-center mb-6">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                    </div>
                    
                    <p class="text-gray-400 text-sm" id="loading-message">
                        Conectando con Google...
                    </p>
                </div>
            </div>
        `;
    }

    /**
     * Renderizar información de perfil
     */
    renderProfileStep(theme) {
        const user = window.NebulaAuth?.getCurrentUser();
        
        return `
            <div class="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div class="text-center">
                    <div class="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-400">
                        ${user?.user?.photoURL ? 
                            `<img src="${user.user.photoURL}" alt="Profile" class="w-full h-full object-cover">` :
                            `<div class="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-2xl">👤</div>`
                        }
                    </div>
                    
                    <h3 class="text-xl font-semibold text-white mb-2">
                        ¡Bienvenido, ${user?.user?.displayName || 'Usuario'}!
                    </h3>
                    
                    <p class="text-gray-400 text-sm mb-6">
                        Tu perfil ha sido configurado exitosamente
                    </p>
                    
                    <div class="flex items-center justify-center gap-2 text-green-400 mb-6">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span class="text-sm font-medium">Sesión iniciada</span>
                    </div>
                    
                    <button id="nebula-continue" 
                            class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105">
                        Continuar a la aplicación
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Renderizar paso de error
     */
    renderErrorStep(theme) {
        return `
            <div class="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div class="text-center">
                    <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <span class="text-3xl">❌</span>
                    </div>
                    
                    <h3 class="text-xl font-semibold text-white mb-4">Error de autenticación</h3>
                    
                    <p class="text-gray-400 text-sm mb-6" id="error-message">
                        Ha ocurrido un error. Por favor, inténtalo de nuevo.
                    </p>
                    
                    <div class="flex gap-3">
                        <button id="nebula-retry" 
                                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
                            Reintentar
                        </button>
                        
                        <button id="nebula-guest-fallback" 
                                class="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-3 px-4 rounded-xl transition-colors">
                            Modo invitado
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Enlazar eventos
     */
    bindEvents() {
        // Google Login
        const googleBtn = document.getElementById('nebula-google-login');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.handleGoogleLogin());
        }

        // Guest Login
        const guestBtn = document.getElementById('nebula-guest-login');
        if (guestBtn) {
            guestBtn.addEventListener('click', () => this.handleGuestLogin());
        }

        // Close
        const closeBtn = document.getElementById('nebula-auth-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideAuth());
        }

        // Continue
        const continueBtn = document.getElementById('nebula-continue');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.hideAuth());
        }

        // Retry
        const retryBtn = document.getElementById('nebula-retry');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.handleRetry());
        }

        // Guest fallback
        const guestFallbackBtn = document.getElementById('nebula-guest-fallback');
        if (guestFallbackBtn) {
            guestFallbackBtn.addEventListener('click', () => this.handleGuestLogin());
        }

        // Click outside to close
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.hideAuth();
            }
        });
    }

    /**
     * Manejar login con Google
     */
    async handleGoogleLogin() {
        try {
            this.currentStep = 'loading';
            this.render();
            const result = await window.NebulaAuth.loginWithGoogle();
            if (result.success) {
                this.currentStep = 'profile';
                this.render();
            } else {
                this.showError('Error al iniciar sesión con Google');
            }
        } catch (error) {
            console.error('❌ Error en login UI:', error);
            this.showError(error.message);
        }
    }

    /**
     * Manejar login como invitado
     */
    handleGuestLogin() {
        // Crear sesión de invitado
        const guestData = {
            user: {
                uid: 'guest_' + Date.now(),
                displayName: 'Invitado',
                email: null,
                photoURL: null
            },
            isGuest: true
        };
        if (window.appState) {
            window.appState.user = guestData.user;
            window.appState.user.provider = 'guest';
        }
        this.currentStep = 'profile';
        this.render();
        if (window.NEBULA_DEBUG) {
            console.log('👤 Modo invitado activado');
        }
    }

    /**
     * Manejar reintentar
     */
    handleRetry() {
        this.currentStep = 'login';
        this.render();
    }

    /**
     * Mostrar error
     */
    showError(message) {
        this.currentStep = 'error';
        this.render();
        
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    /**
     * Mostrar información de perfil
     */
    showProfileInfo(authData) {
        this.currentStep = 'profile';
        this.render();
    }

    /**
     * Obtener tema actual
     */
    getCurrentTheme() {
        return window.appState?.theme || {
            surface: 'bg-gray-800',
            textPrimary: 'text-white',
            textSecondary: 'text-gray-400',
            accent: 'text-yellow-400'
        };
    }

    /**
     * Métodos públicos
     */
    show() {
        this.showAuth();
    }

    hide() {        this.hideAuth();
    }

    isOpen() {
        return this.isVisible;
    }
}

// Exponer clase globalmente sin export para compatibilidad
window.NebulaAuthUI = NebulaAuthUI;

console.log('✅ NebulaAuthUI cargado y disponible globalmente');
