/**
 * 🔐 SISTEMA DE AUTENTICACIÓN AVANZADO - NEBULA FINANCE
 * Manejo completo de autenticación con Gmail y gestión de perfiles
 */

class NebulaAuthSystem {
    constructor() {
        this.currentUser = null;
        this.userProfile = null;
        this.isAuthenticating = false;
        this.listeners = new Set();
        this.isInitialized = false;
        this.auth = null;
        this.googleProvider = null;
        this.signInWithPopup = null;
        this.signOut = null;
        this.onAuthStateChanged = null;
        if (window.NEBULA_DEBUG) {
            console.log('🔐 Nebula Auth System inicializado');
        }
    }

    async initialize() {
        await this.initializeAuth();
    }

    async initializeAuth() {
        if (this.isInitialized) {
            if (window.NEBULA_DEBUG) {
                console.log('⚠️ NebulaAuth ya está inicializado, ignorando llamada duplicada');
            }
            return;
        }

        try {
            if (window.NEBULA_DEBUG) {
                console.log('🔥 Inicializando Firebase Auth...');
            }

            if (window.firebaseAuth && window.googleProvider) {
                if (window.NEBULA_DEBUG) {
                    console.log('✅ Firebase ya disponible globalmente');
                }
                this.setupFirebaseReferences();
                this.setupAuthStateListener();
                this.isInitialized = true;
                return;
            }

            let attempts = 0;
            const maxAttempts = 10;

            const waitForFirebase = () => {
                return new Promise((resolve, reject) => {
                    const checkFirebase = () => {
                        attempts++;

                        if (window.firebaseAuth && window.googleProvider) {
                            if (window.NEBULA_DEBUG) {
                                console.log('✅ Firebase disponible después de esperar');
                            }
                            resolve();
                        } else if (attempts >= maxAttempts) {
                            if (window.NEBULA_DEBUG) {
                                console.warn('⚠️ Firebase no disponible después de esperar');
                            }
                            reject(new Error('Firebase timeout'));
                        } else {
                            setTimeout(checkFirebase, 500);
                        }
                    };
                    checkFirebase();
                });
            };

            await waitForFirebase();
            this.setupFirebaseReferences();
            this.setupAuthStateListener();
            this.isInitialized = true;

        } catch (error) {
            console.error('❌ Error inicializando Firebase Auth:', error);
            this.handleAuthError(error);
        }
    }

    setupFirebaseReferences() {
        this.auth = window.firebaseAuth;
        this.googleProvider = window.googleProvider;
        this.signInWithPopup = window.signInWithPopup;
        this.signOut = window.signOut;
        this.onAuthStateChanged = window.onAuthStateChanged;
        if (window.NEBULA_DEBUG) {
            console.log('✅ Referencias Firebase configuradas');
        }
    }

    setupAuthStateListener() {
        if (this.auth && this.onAuthStateChanged) {
            this.onAuthStateChanged(this.auth, (user) => {
                this.handleAuthStateChange(user);
            });
            if (window.NEBULA_DEBUG) {
                console.log('✅ Auth state listener configurado');
            }
        }
    }

    async handleAuthStateChange(user) {
        if (window.NEBULA_DEBUG) {
            console.log('🔄 Estado de autenticación cambiado:', user ? 'Autenticado' : 'No autenticado');
        }

        if (user) {
            await this.handleSuccessfulAuth(user);
        } else {
            this.handleSignOut();
        }

        this.notifyListeners();
    }

    async loginWithGoogle() {
        if (this.isAuthenticating) {
            if (window.NEBULA_DEBUG) {
                console.log('⏳ Autenticación ya en progreso...');
            }
            return;
        }

        try {
            this.isAuthenticating = true;
            if (window.NEBULA_DEBUG) {
                console.log('🚀 Iniciando login con Google...');
            }

            if (!this.auth || !this.googleProvider || !this.signInWithPopup) {
                throw new Error('Firebase no está disponible');
            }

            this.showAuthStatus('Abriendo ventana de Google...', 'loading');

            const result = await this.signInWithPopup(this.auth, this.googleProvider);
            const user = result.user;
            if (window.NEBULA_DEBUG) {
                console.log('✅ Login exitoso:', user.displayName);
            }
            this.showAuthStatus(`¡Bienvenido ${user.displayName}!`, 'success');

            return { success: true, user };

        } catch (error) {
            console.error('❌ Error en login:', error);
            this.handleAuthError(error);
            return { success: false, error };

        } finally {
            this.isAuthenticating = false;
        }
    }

    async handleSuccessfulAuth(user) {
        try {
            if (window.NEBULA_DEBUG) {
                console.log('👤 Procesando usuario autenticado...');
            }

            this.currentUser = user;

            await this.loadOrCreateUserProfile(user);

            await this.saveUserSession();
            if (window.NEBULA_DEBUG) {
                console.log('✅ Usuario procesado exitosamente');
            }

        } catch (error) {
            console.error('❌ Error procesando usuario:', error);
        }
    }

    async loadOrCreateUserProfile(user) {
        try {
            if (window.NEBULA_DEBUG) {
                console.log('📋 Cargando perfil de usuario...');
            }

            const existingProfile = await this.loadUserProfile(user.uid);

            if (existingProfile) {
                if (window.NEBULA_DEBUG) {
                    console.log('✅ Perfil existente encontrado');
                }
                this.userProfile = existingProfile;
                this.userProfile.lastLogin = new Date().toISOString();
            } else {
                if (window.NEBULA_DEBUG) {
                    console.log('🆕 Creando nuevo perfil de usuario');
                }
                this.userProfile = await this.createNewUserProfile(user);
            }

            await this.saveUserProfile();

        } catch (error) {
            console.error('❌ Error con perfil de usuario:', error);
            this.userProfile = this.createTemporaryProfile(user);
        }
    }

    async createNewUserProfile(user) {
        const profile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            loginCount: 1,
            preferences: {
                theme: 'cosmos',
                currency: 'USD',
                language: 'es',
                notifications: true,
                autoSave: true,
                privateMode: false
            },
            financialData: {
                transactions: {},
                goals: [],
                investments: [],
                debts: [],
                categories: this.getDefaultCategories()
            },
            sync: {
                enabled: true,
                lastSync: new Date().toISOString(),
                conflicts: []
            }
        };
        if (window.NEBULA_DEBUG) {
            console.log('✅ Nuevo perfil creado');
        }
        return profile;
    }

    async loadUserProfile(uid) {
        try {
            if (window.NebulaSecurityUtils) {
                const profile = window.NebulaSecurityUtils.secureGetItem(`user_profile_${uid}`);
                if (profile) {
                    if (window.NEBULA_DEBUG) {
                        console.log('✅ Perfil cargado desde almacenamiento seguro');
                    }
                    return profile;
                }
            }
            const stored = localStorage.getItem(`nebula_user_profile_${uid}`);
            if (stored) {
                if (window.NEBULA_DEBUG) {
                    console.log('✅ Perfil cargado desde localStorage');
                }
                return JSON.parse(stored);
            }
            return null;
        } catch (error) {
            console.error('❌ Error cargando perfil:', error);
            return null;
        }
    }

    async saveUserProfile() {
        if (!this.userProfile) {
            if (window.NEBULA_DEBUG) {
                console.warn('⚠️ No hay perfil para guardar');
            }
            return;
        }

        try {
            const uid = this.userProfile.uid;
            if (window.NebulaSecurityUtils) {
                window.NebulaSecurityUtils.secureSetItem(`user_profile_${uid}`, this.userProfile);
                if (window.NEBULA_DEBUG) {
                    console.log('✅ Perfil guardado en almacenamiento seguro');
                }
            } else {
                localStorage.setItem(`nebula_user_profile_${uid}`, JSON.stringify(this.userProfile));
                if (window.NEBULA_DEBUG) {
                    console.log('✅ Perfil guardado en localStorage');
                }
            }
            localStorage.setItem('nebula_last_user_uid', uid);
        } catch (error) {
            console.error('❌ Error guardando perfil:', error);
        }
    }

    async saveUserSession() {
        try {
            const sessionData = {
                uid: this.currentUser.uid,
                email: this.currentUser.email,
                displayName: this.currentUser.displayName,
                photoURL: this.currentUser.photoURL,
                loginTime: new Date().toISOString(),
                provider: 'google'
            };
            if (window.NebulaSecurityUtils) {
                window.NebulaSecurityUtils.secureSetItem('nebula_user_session', sessionData);
            } else {
                sessionStorage.setItem('nebula_user_session', JSON.stringify(sessionData));
            }
            if (window.NEBULA_DEBUG) {
                console.log('✅ Sesión guardada');
            }
        } catch (error) {
            console.error('❌ Error guardando sesión:', error);
        }
    }

    async logout() {
        try {
            if (window.NEBULA_DEBUG) {
                console.log('🚪 Cerrando sesión...');
            }
            if (this.auth && this.signOut) {
                await this.signOut(this.auth);
            }
            this.handleSignOut();
            if (window.NEBULA_DEBUG) {
                console.log('✅ Sesión cerrada exitosamente');
            }
        } catch (error) {
            console.error('❌ Error cerrando sesión:', error);
        }
    }

    handleSignOut() {
        this.currentUser = null;
        this.userProfile = null;
        if (window.NebulaSecurityUtils) {
            window.NebulaSecurityUtils.secureRemoveItem('nebula_user_session');
        } else {
            sessionStorage.removeItem('nebula_user_session');
        }
        if (window.NEBULA_DEBUG) {
            console.log('✅ Datos de sesión limpiados');
        }
    }

    getDefaultCategories() {
        return {
            income: [
                { id: 'salary', name: 'Salario', icon: '💼', color: '#10b981' },
                { id: 'freelance', name: 'Freelance', icon: '💻', color: '#3b82f6' },
                { id: 'investments', name: 'Inversiones', icon: '📈', color: '#8b5cf6' },
                { id: 'other_income', name: 'Otros ingresos', icon: '💰', color: '#f59e0b' }
            ],
            expense: [
                { id: 'food', name: 'Alimentación', icon: '🍽️', color: '#ef4444' },
                { id: 'transport', name: 'Transporte', icon: '🚗', color: '#f97316' },
                { id: 'housing', name: 'Vivienda', icon: '🏠', color: '#84cc16' },
                { id: 'utilities', name: 'Servicios', icon: '⚡', color: '#06b6d4' },
                { id: 'entertainment', name: 'Entretenimiento', icon: '🎮', color: '#8b5cf6' },
                { id: 'health', name: 'Salud', icon: '🏥', color: '#ec4899' },
                { id: 'education', name: 'Educación', icon: '📚', color: '#6366f1' },
                { id: 'other_expense', name: 'Otros gastos', icon: '💸', color: '#6b7280' }
            ]
        };
    }

    createTemporaryProfile(user) {
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            isTemporary: true,
            createdAt: new Date().toISOString(),
            financialData: {
                transactions: {},
                goals: [],
                investments: [],
                debts: []
            }
        };
    }

    showAuthStatus(message, type = 'info') {
        console.log(`🔐 ${message}`);

        if (window.NotificationSystem) {
            const methods = {
                'success': 'success',
                'error': 'error',
                'loading': 'info',
                'info': 'info'
            };

            window.NotificationSystem[methods[type]]('Autenticación', message);
        }
    }

    handleAuthError(error) {
        let message;

        switch (error.code) {
            case 'auth/popup-closed-by-user':
                message = 'Login cancelado por el usuario';
                break;
            case 'auth/popup-blocked':
                message = 'Popup bloqueado. Permite popups para este sitio';
                break;
            case 'auth/network-request-failed':
                message = 'Error de conexión. Verifica tu internet';
                break;
            case 'auth/too-many-requests':
                message = 'Demasiados intentos. Espera un momento';
                break;
            default:
                message = error.message || 'Error al iniciar sesión';
        }

        this.showAuthStatus(message, 'error');
    }

    addAuthListener(listener) {
        this.listeners.add(listener);
    }

    removeAuthListener(listener) {
        this.listeners.delete(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => {
            try {
                listener({
                    user: this.currentUser,
                    profile: this.userProfile,
                    isAuthenticated: !!this.currentUser
                });
            } catch (error) {
                console.error('❌ Error en listener:', error);
            }
        });
    }

    getCurrentUser() {
        return {
            user: this.currentUser,
            profile: this.userProfile,
            isAuthenticated: !!this.currentUser
        };
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    isReady() {
        return !!(this.auth && this.googleProvider && this.signInWithPopup);
    }

    syncFinancialData(data) {
        if (this.userProfile) {
            this.userProfile.financialData = { ...this.userProfile.financialData, ...data };
            this.userProfile.sync.lastSync = new Date().toISOString();
            this.saveUserProfile();
            if (window.NEBULA_DEBUG) {
                console.log('✅ Datos financieros sincronizados');
            }
        }
    }
}

/* Autenticación Más Segura */
async function refreshToken() {
    if (!window.firebaseAuth) return;
    const user = window.firebaseAuth.currentUser;
    if (user) {
        const token = await user.getIdToken(true);
        sessionStorage.setItem('nebula_user_session', JSON.stringify({
            token,
            expiration: Date.now() + 3600 * 1000 // 1 hora
        }));
    }
}

setInterval(refreshToken, 3000 * 1000); // Refrescar cada 50 minutos

// Crear instancia global y llamar a la inicialización
window.NebulaAuth = new NebulaAuthSystem();
window.NebulaAuth.initialize();
window.NebulaAuth.signInWithGoogle = (...args) => window.NebulaAuth.loginWithGoogle(...args);

console.log('✅ NebulaAuth cargado y disponible globalmente');
