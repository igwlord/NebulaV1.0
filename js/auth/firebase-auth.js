// ===============================================
// 🔥 NEBULA FIREBASE AUTHENTICATION MODULE
// ===============================================

/**
 * 🔐 Módulo de autenticación Firebase para Nebula Financial
 * Incluye: Login con Google, modo anónimo, gestión de sesiones
 */
const NebulaAuth = {
    
    // Estado de autenticación
    state: {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isAnonymous: false,
        provider: null
    },

    // Configuración
    config: {
        persistence: 'local',
        enableAnonymous: true,
        enableGoogle: true
    },

    /**
     * Inicializar el módulo de autenticación
     */
    async init() {
        console.log('🔐 Inicializando Nebula Authentication...');
        
        try {
            // Inicializar variables de protección contra spam
            this.lastVerificationSent = 0;
            this.lastPasswordReset = {};
            
            // Verificar si Firebase está disponible
            if (!window.firebase) {
                throw new Error('Firebase SDK no está disponible');
            }

            // Verificar configuración
            if (!window.NebulaConfig || !window.NebulaConfig.firebase) {
                throw new Error('Configuración de Firebase no válida');
            }

            // 🔥 INICIALIZAR FIREBASE APP SI NO EXISTE
            if (!firebase.apps.length) {
                console.log('🔥 Inicializando Firebase App...');
                firebase.initializeApp(window.NebulaConfig.firebase);
                console.log('✅ Firebase App inicializado correctamente');
            } else {
                console.log('✅ Firebase App ya está inicializado');
            }

            // Configurar persistencia
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

            // Escuchar cambios de autenticación
            firebase.auth().onAuthStateChanged((user) => {
                this.handleAuthStateChange(user);
            });

            console.log('✅ Nebula Authentication inicializado');
            return true;

        } catch (error) {
            console.error('❌ Error inicializando autenticación:', error);
            this.handleAuthError(error);
            return false;
        }
    },

    /**
     * Manejar cambios en el estado de autenticación
     */
    handleAuthStateChange(user) {
        console.log('🔄 Cambio en estado de autenticación:', user ? 'Autenticado' : 'No autenticado');
        
        if (user) {
            // Detectar el proveedor de autenticación
            let provider = 'email';
            if (user.isAnonymous) {
                provider = 'anonymous';
            } else if (user.providerData && user.providerData.length > 0) {
                const providerId = user.providerData[0].providerId;
                if (providerId === 'google.com') {
                    provider = 'google';
                } else if (providerId === 'password') {
                    provider = 'email';
                }
            }
            
            this.state.user = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                createdAt: user.metadata.creationTime,
                lastSignIn: user.metadata.lastSignInTime,
                provider: provider
            };
            
            this.state.isAuthenticated = true;
            this.state.isAnonymous = user.isAnonymous;
            this.state.provider = provider;
            
            // Actualizar configuración del usuario en settings
            this.updateUserSettings(this.state.user);
            
            // Emitir evento con datos completos del usuario
            this.emitEvent('userSignedIn', this.state.user);
            
        } else {
            this.state.user = null;
            this.state.isAuthenticated = false;
            this.state.isAnonymous = false;
            this.state.provider = null;
            
            // Emitir evento
            this.emitEvent('userSignedOut');
        }
        
        this.state.isLoading = false;
    },

    /**
     * Login con Google
     * ✅ Con protección contra múltiples intentos simultáneos y fallback offline
     */
    async signInWithGoogle() {
        console.log('🔐 Iniciando login con Google...');
        
        try {
            // ⚠️ PROTECCIÓN CONTRA MÚLTIPLES POPUPS SIMULTÁNEOS
            if (this.state.isLoading) {
                console.log('⚠️ Login ya en proceso, evitando popup múltiple');
                this.showNotification('Login ya en proceso, espera un momento...', 'warning');
                return false;
            }
            
            this.state.isLoading = true;
            
            // 🔥 VERIFICAR SI FIREBASE ESTÁ DISPONIBLE Y CONFIGURADO CORRECTAMENTE
            if (!firebase.auth || !window.NebulaConfig || window.NebulaConfig.config.apiKey.includes('demo')) {
                console.log('⚠️ Firebase no disponible o en modo demo, usando fallback offline');
                return this.signInOffline('google');
            }
            
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            
            // Configurar popup para evitar bloqueo
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            
            const result = await firebase.auth().signInWithPopup(provider);
            
            console.log('✅ Login con Google exitoso (único)');
            this.showNotification('¡Bienvenido a Nebula Financial!', 'success');
            
            return result.user;
            
        } catch (error) {
            console.error('❌ Error en login con Google:', error);
            
            // 🆘 FALLBACK AUTOMÁTICO A MODO OFFLINE
            if (error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' || 
                error.code === 'auth/invalid-api-key' ||
                error.message.includes('API key not valid')) {
                console.log('🔄 API Key inválida, activando modo offline automáticamente');
                return this.signInOffline('google');
            }
            
            this.handleAuthError(error);
            throw error;
        } finally {
            // ⚠️ IMPORTANTE: Resetear estado de loading
            this.state.isLoading = false;
        }
    },

    /**
     * Login anónimo con fallback offline
     */
    async signInAnonymously() {
        console.log('🔐 Iniciando sesión anónima...');
        
        try {
            this.state.isLoading = true;
            
            // 🔥 VERIFICAR SI FIREBASE ESTÁ DISPONIBLE Y CONFIGURADO CORRECTAMENTE
            if (!firebase.auth || !window.NebulaConfig || window.NebulaConfig.config.apiKey.includes('demo')) {
                console.log('⚠️ Firebase no disponible o en modo demo, usando fallback offline');
                return this.signInOffline('guest');
            }
            
            const result = await firebase.auth().signInAnonymously();
            
            console.log('✅ Sesión anónima creada');
            this.showNotification('Sesión temporal iniciada', 'info');
            
            return result.user;
            
        } catch (error) {
            console.error('❌ Error en sesión anónima:', error);
            
            // 🆘 FALLBACK AUTOMÁTICO A MODO OFFLINE
            if (error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' || 
                error.code === 'auth/invalid-api-key' ||
                error.message.includes('API key not valid')) {
                console.log('🔄 API Key inválida, activando modo offline automáticamente');
                return this.signInOffline('guest');
            }
            
            this.handleAuthError(error);
            throw error;
        } finally {
            this.state.isLoading = false;
        }
    },

    /**
     * 🆘 Función de fallback para modo offline
     * Se ejecuta cuando Firebase no está disponible o configurado incorrectamente
     */
    async signInOffline(method = 'offline') {
        console.log(`🌐 Iniciando sesión offline (método: ${method})...`);
        
        // Crear usuario mock para modo offline
        const offlineUser = {
            uid: `offline_${Date.now()}`,
            email: method === 'google' ? 'demo@nebula-offline.local' : 'invitado@nebula-offline.local',
            displayName: method === 'google' ? 'Usuario Demo (Google)' : 'Invitado',
            photoURL: null,
            isAnonymous: method === 'guest',
            emailVerified: method === 'google',
            providerId: method === 'google' ? 'google.com' : 'anonymous',
            metadata: {
                creationTime: new Date().toISOString(),
                lastSignInTime: new Date().toISOString()
            },
            // Marcador de modo offline
            isOfflineUser: true,
            offlineMethod: method
        };
        
        // Simular delay de red para experiencia realista
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Notificar éxito con modo offline
        const methodName = method === 'google' ? 'Google (Offline)' : 'Invitado (Offline)';
        this.showNotification(`¡Bienvenido a Nebula Financial! Modo: ${methodName}`, 'success');
        
        // Emitir evento de cambio de autenticación
        this.emitEvent('authStateChanged', offlineUser);
        
        console.log(`✅ Login offline exitoso (${method})`);
        return offlineUser;
    },

    /**
     * Login con email y password con fallback offline
     */
    async signInWithEmail(email, password) {
        console.log('🔐 Iniciando login con email...');
        
        try {
            this.state.isLoading = true;
            
            // Validar email y password
            if (!this.validateEmail(email)) {
                throw new Error('Formato de email inválido');
            }
            
            if (!password || password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres');
            }
            
            // 🔥 VERIFICAR SI FIREBASE ESTÁ DISPONIBLE Y CONFIGURADO CORRECTAMENTE
            if (!firebase.auth || !window.NebulaConfig || window.NebulaConfig.config.apiKey.includes('demo')) {
                console.log('⚠️ Firebase no disponible o en modo demo, usando fallback offline');
                return this.signInEmailOffline(email, password);
            }
            
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            
            console.log('✅ Login con email exitoso');
            this.showNotification('¡Bienvenido de vuelta!', 'success');
            
            return result.user;
            
        } catch (error) {
            console.error('❌ Error en login con email:', error);
            
            // 🆘 FALLBACK AUTOMÁTICO A MODO OFFLINE para errores de API
            if (error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' || 
                error.code === 'auth/invalid-api-key' ||
                error.message.includes('API key not valid')) {
                console.log('🔄 API Key inválida, activando modo offline automáticamente');
                return this.signInEmailOffline(email, password);
            }
            
            this.handleAuthError(error);
            throw error;
        } finally {
            this.state.isLoading = false;
        }
    },

    /**
     * 📧 Login offline para email/password
     */
    async signInEmailOffline(email, password) {
        console.log('🌐 Procesando login de email en modo offline...');
        
        // Validaciones básicas
        if (!this.validateEmail(email)) {
            throw new Error('Formato de email inválido');
        }
        
        if (!password || password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        
        // Simular verificación (en producción esto iría contra tu backend)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Crear usuario offline para email
        const offlineUser = {
            uid: `email_offline_${Date.now()}`,
            email: email,
            displayName: email.split('@')[0], // Usar parte antes del @ como nombre
            photoURL: null,
            isAnonymous: false,
            emailVerified: true, // Asumir verificado en modo offline
            providerId: 'password',
            metadata: {
                creationTime: new Date().toISOString(),
                lastSignInTime: new Date().toISOString()
            },
            // Marcador de modo offline
            isOfflineUser: true,
            offlineMethod: 'email'
        };
        
        this.showNotification(`¡Bienvenido ${offlineUser.displayName}! (Modo Offline)`, 'success');
        
        // Emitir evento de cambio de autenticación
        this.emitEvent('authStateChanged', offlineUser);
        
        console.log('✅ Login offline con email exitoso');
        return offlineUser;
    },

    /**
     * Registro con email y password con fallback offline
     */
    async createUserWithEmail(email, password, displayName = null) {
        console.log('🔐 Creando usuario con email...');
        
        try {
            this.state.isLoading = true;
            
            // Validar email y password
            if (!this.validateEmail(email)) {
                throw new Error('Formato de email inválido');
            }
            
            if (!password || password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres');
            }
            
            // 🔥 VERIFICAR SI FIREBASE ESTÁ DISPONIBLE Y CONFIGURADO CORRECTAMENTE
            if (!firebase.auth || !window.NebulaConfig || window.NebulaConfig.config.apiKey.includes('demo')) {
                console.log('⚠️ Firebase no disponible o en modo demo, usando fallback offline');
                return this.createUserEmailOffline(email, password, displayName);
            }
            
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
            
            // Actualizar perfil con nombre si se proporciona
            if (displayName) {
                await result.user.updateProfile({
                    displayName: displayName
                });
            }
            
            console.log('✅ Usuario creado exitosamente');
            this.showNotification('¡Cuenta creada! Bienvenido a Nebula Financial', 'success');
            
            return result.user;
            
        } catch (error) {
            console.error('❌ Error creando usuario:', error);
            
            // 🆘 FALLBACK AUTOMÁTICO A MODO OFFLINE para errores de API
            if (error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' || 
                error.code === 'auth/invalid-api-key' ||
                error.message.includes('API key not valid')) {
                console.log('🔄 API Key inválida, activando modo offline automáticamente');
                return this.createUserEmailOffline(email, password, displayName);
            }
            
            this.handleAuthError(error);
            throw error;
        } finally {
            this.state.isLoading = false;
        }
    },

    /**
     * 📧 Registro offline para email/password
     */
    async createUserEmailOffline(email, password, displayName = null) {
        console.log('🌐 Creando usuario de email en modo offline...');
        
        // Validaciones básicas
        if (!this.validateEmail(email)) {
            throw new Error('Formato de email inválido');
        }
        
        if (!password || password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        
        // Simular creación de cuenta (en producción esto iría contra tu backend)
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Crear usuario offline para registro
        const offlineUser = {
            uid: `register_offline_${Date.now()}`,
            email: email,
            displayName: displayName || email.split('@')[0],
            photoURL: null,
            isAnonymous: false,
            emailVerified: true, // Asumir verificado en modo offline
            providerId: 'password',
            metadata: {
                creationTime: new Date().toISOString(),
                lastSignInTime: new Date().toISOString()
            },
            // Marcador de modo offline
            isOfflineUser: true,
            offlineMethod: 'email-register'
        };
        
        this.showNotification(`¡Cuenta creada ${offlineUser.displayName}! (Modo Offline)`, 'success');
        
        // Emitir evento de cambio de autenticación
        this.emitEvent('authStateChanged', offlineUser);
        
        console.log('✅ Registro offline con email exitoso');
        return offlineUser;
    },

    /**
     * Enviar email de verificación
     * ✅ Con protección contra múltiples envíos
     */
    async sendEmailVerification() {
        try {
            const user = firebase.auth().currentUser;
            if (user && !user.emailVerified) {
                // Verificar si ya se envió un correo recientemente (últimos 60 segundos)
                const lastSent = this.lastVerificationSent || 0;
                const now = Date.now();
                
                if (now - lastSent < 60000) {
                    console.log('⚠️ Email de verificación enviado recientemente, esperando...');
                    this.showNotification('Espera un minuto antes de solicitar otro email', 'warning');
                    return false;
                }
                
                await user.sendEmailVerification();
                this.lastVerificationSent = now;
                console.log('✅ Email de verificación enviado (único)');
                this.showNotification('Email de verificación enviado', 'info');
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Error enviando verificación:', error);
            this.handleAuthError(error);
            throw error;
        }
    },

    /**
     * Reenviar email de verificación
     */
    async resendEmailVerification() {
        return await this.sendEmailVerification();
    },

    /**
     * Restablecer contraseña
     * ✅ Con protección contra múltiples envíos
     */
    async resetPassword(email) {
        console.log('🔐 Enviando reset de contraseña para:', email);
        
        try {
            // Validar email primero
            if (!email || email.trim() === '') {
                throw new Error('Debes ingresar tu email para recuperar la contraseña');
            }
            
            // Verificar si ya se envió un reset recientemente (últimos 60 segundos)
            const resetKey = `reset_${email}`;
            const lastSent = this.lastPasswordReset?.[resetKey] || 0;
            const now = Date.now();
            
            if (now - lastSent < 60000) {
                console.log('⚠️ Reset de contraseña enviado recientemente para este email');
                this.showNotification('Espera un minuto antes de solicitar otro reset', 'warning');
                return false;
            }
            
            if (!this.validateEmail(email)) {
                throw new Error('Formato de email inválido. Debe ser algo como: ejemplo@correo.com');
            }
            
            // Mostrar notificación de proceso
            this.showNotification('📧 Enviando email de recuperación...', 'info');
            
            await firebase.auth().sendPasswordResetEmail(email);
            
            // Guardar timestamp del envío
            if (!this.lastPasswordReset) this.lastPasswordReset = {};
            this.lastPasswordReset[resetKey] = now;
            
            console.log('✅ Email de reset enviado exitosamente (único)');
            
            // Notificación de éxito más detallada
            this.showNotification(
                `✅ Email de recuperación enviado a ${email}. Revisa tu bandeja de entrada y spam. El enlace expira en 1 hora.`, 
                'success'
            );
            
            return true;
            
        } catch (error) {
            console.error('❌ Error en reset de contraseña:', error);
            
            // Manejo específico para reset de contraseña
            if (error.code === 'auth/user-not-found') {
                this.showNotification(
                    '👤 No existe una cuenta con este email. Verifica que sea correcto o regístrate.',
                    'warning'
                );
            } else if (error.code === 'auth/invalid-email') {
                this.showNotification(
                    '📧 Formato de email inválido. Debe ser algo como: ejemplo@correo.com',
                    'error'
                );
            } else if (error.code === 'auth/too-many-requests') {
                this.showNotification(
                    '⏳ Demasiados intentos de recuperación. Espera unos minutos antes de intentar nuevamente.',
                    'warning'
                );
            } else {
                this.handleAuthError(error);
            }
            
            throw error;
        }
    },

    /**
     * Validar formato de email
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Verificar si el email del usuario está verificado
     */
    isEmailVerified() {
        const user = firebase.auth().currentUser;
        return user ? user.emailVerified : false;
    },

    /**
     * Cerrar sesión
     */
    async signOut() {
        console.log('🔐 Cerrando sesión...');
        
        try {
            await firebase.auth().signOut();
            
            console.log('✅ Sesión cerrada');
            this.showNotification('Sesión cerrada correctamente', 'info');
            
            // Limpiar datos locales si es necesario
            this.clearLocalData();
            
        } catch (error) {
            console.error('❌ Error cerrando sesión:', error);
            this.handleAuthError(error);
            throw error;
        }
    },

    /**
     * Convertir usuario anónimo a cuenta permanente
     */
    async linkAnonymousWithGoogle() {
        console.log('🔐 Convirtiendo cuenta anónima a permanente...');
        
        try {
            if (!this.state.isAnonymous) {
                throw new Error('El usuario no es anónimo');
            }
            
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().currentUser.linkWithPopup(provider);
            
            console.log('✅ Cuenta anónima convertida a permanente');
            this.showNotification('¡Cuenta guardada permanentemente!', 'success');
            
            return result.user;
            
        } catch (error) {
            console.error('❌ Error convirtiendo cuenta:', error);
            this.handleAuthError(error);
            throw error;
        }
    },

    /**
     * Actualizar configuración del usuario en el módulo de settings
     */
    updateUserSettings(user) {
        if (window.SettingsModule) {
            const settings = window.SettingsModule.getSettings();
            
            // Actualizar perfil con datos de Firebase
            settings.profile.name = user.displayName || settings.profile.name;
            settings.profile.email = user.email || settings.profile.email;
            settings.profile.avatar = user.photoURL ? '🖼️' : settings.profile.avatar;
            
            // Actualizar fecha de registro si es la primera vez
            if (!settings.profile.joinDate || settings.profile.joinDate === settings.profile.joinDate) {
                settings.profile.joinDate = user.createdAt || new Date().toISOString();
            }
            
            window.SettingsModule.saveSettings(settings);
            console.log('✅ Configuración de usuario actualizada');
        }
    },

    /**
     * Limpiar datos locales
     */
    clearLocalData() {
        // Solo limpiar si es una sesión anónima
        if (this.state.isAnonymous) {
            console.log('🧹 Limpiando datos de sesión anónima...');
            // Aquí podrías limpiar datos específicos si es necesario
        }
    },

    /**
     * Manejar errores de autenticación
     */
    handleAuthError(error) {
        let message = 'Error de autenticación';
        let type = 'error';
        
        switch (error.code) {
            // Errores de popup/Google
            case 'auth/popup-closed-by-user':
                message = '🚪 Login cancelado por el usuario';
                type = 'warning';
                break;
            case 'auth/popup-blocked':
                message = '🚫 Popup bloqueado. Por favor, permite popups para este sitio';
                break;
            
            // Errores de email/password
            case 'auth/user-not-found':
                message = '👤 Usuario no encontrado. Verifica tu email o regístrate';
                break;
            case 'auth/wrong-password':
                message = '🔐 Contraseña incorrecta. ¿Olvidaste tu contraseña?';
                break;
            case 'auth/email-already-in-use':
                message = '📧 Este email ya está registrado. ¿Quieres iniciar sesión?';
                break;
            case 'auth/weak-password':
                message = '🔒 Contraseña muy débil. Debe tener al menos 6 caracteres';
                break;
            case 'auth/invalid-email':
                message = '📧 Formato de email inválido. Verifica que sea correcto';
                break;
            case 'auth/user-disabled':
                message = '🚫 Cuenta deshabilitada. Contacta soporte técnico';
                break;
            case 'auth/invalid-credential':
                message = '🔑 Credenciales inválidas. Verifica tu email y contraseña';
                break;
            
            // Errores de red y límites
            case 'auth/network-request-failed':
                message = '🌐 Error de conexión. Verifica tu internet e intenta nuevamente';
                break;
            case 'auth/too-many-requests':
                message = '⏳ Demasiados intentos fallidos. Espera unos minutos antes de intentar nuevamente';
                break;
            case 'auth/requires-recent-login':
                message = '🔐 Por seguridad, necesitas iniciar sesión nuevamente para realizar esta acción';
                break;
            
            // Errores específicos de reset de contraseña
            case 'auth/user-not-found':
                if (error.message && error.message.includes('reset')) {
                    message = '👤 No existe una cuenta con este email. Verifica que sea correcto';
                }
                break;
            
            // Error personalizado de validación
            default:
                if (error.message && error.message.includes('email inválido')) {
                    message = '📧 Formato de email inválido. Debe ser algo como: ejemplo@correo.com';
                } else if (error.message && error.message.includes('contraseña')) {
                    message = `🔐 ${error.message}`;
                } else if (error.message && error.message.includes('Re-autenticación')) {
                    message = `🔐 ${error.message}`;
                    type = 'warning';
                } else {
                    message = `❌ ${error.message || 'Error de autenticación inesperado'}`;
                }
        }
        
        // Mostrar notificación mejorada
        this.showNotification(message, type);
        this.state.isLoading = false;
        
        // Log detallado para debugging
        console.error('🔥 Auth Error Details:', {
            code: error.code,
            message: error.message,
            displayMessage: message
        });
    },

    /**
     * Emitir eventos personalizados
     */
    emitEvent(eventName, data = null) {
        const event = new CustomEvent(`nebula-auth-${eventName}`, {
            detail: data
        });
        window.dispatchEvent(event);
    },

    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else if (window.SettingsModule && window.SettingsModule.showNotification) {
            window.SettingsModule.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    },

    /**
     * Obtener información del usuario actual
     */
    getCurrentUser() {
        return this.state.user;
    },

    /**
     * Verificar si el usuario está autenticado
     */
    isAuthenticated() {
        return this.state.isAuthenticated;
    },

    /**
     * Verificar si es una sesión anónima
     */
    isAnonymous() {
        return this.state.isAnonymous;
    },

    /**
     * Obtener estado completo
     */
    getState() {
        return { ...this.state };
    },

    /**
     * 💀 Eliminar cuenta de usuario completamente
     */
    async deleteUserAccount() {
        try {
            console.log('🚨 Iniciando eliminación de cuenta...');

            const user = firebase.auth().currentUser;
            if (!user) {
                throw new Error('No hay usuario autenticado para eliminar');
            }

            console.log('🚨 Eliminando cuenta del usuario:', user.email);

            // Si el usuario se autenticó con Google, podría necesitar re-autenticación
            // Para este caso, procederemos directamente con la eliminación
            
            await user.delete();

            console.log('✅ Cuenta eliminada exitosamente de Firebase');
            
            // Limpiar estado local
            this.state.user = null;
            this.state.isAuthenticated = false;

            // Notificar éxito
            if (window.showNotification) {
                window.showNotification('Cuenta eliminada exitosamente', 'success');
            }

            // Limpiar cualquier caché o datos persistentes
            try {
                await firebase.auth().signOut();
            } catch (signOutError) {
                console.log('ℹ️ Usuario ya desconectado:', signOutError.message);
            }

            return true;

        } catch (error) {
            console.error('❌ Error eliminando cuenta:', error);
            
            // Manejar errores específicos
            if (error.code === 'auth/requires-recent-login') {
                // El usuario necesita re-autenticarse
                if (window.showNotification) {
                    window.showNotification(
                        'Para eliminar tu cuenta, necesitas iniciar sesión nuevamente por seguridad. Por favor, cierra sesión y vuelve a autenticarte.',
                        'warning'
                    );
                }
                
                // Cerrar sesión para forzar re-autenticación
                await this.signOut();
                throw new Error('Re-autenticación requerida. Por favor, inicia sesión nuevamente.');
                
            } else if (error.code === 'auth/network-request-failed') {
                if (window.showNotification) {
                    window.showNotification('Error de conexión. Verifica tu internet e intenta nuevamente.', 'error');
                }
                throw new Error('Error de conexión');
                
            } else {
                // Error genérico
                this.handleAuthError(error);
                throw error;
            }
        }
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.NebulaAuth = NebulaAuth;
}

// Función para inicializar con reintentos
const initializeWithRetry = async (maxRetries = 3) => {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            if (window.firebase && window.NebulaConfig) {
                const success = await NebulaAuth.init();
                if (success) {
                    console.log('🔥 Firebase Auth inicializado exitosamente');
                    return;
                }
            }
            throw new Error('Firebase o NebulaConfig no disponible');
        } catch (error) {
            retries++;
            console.warn(`⚠️ Intento ${retries}/${maxRetries} falló:`, error.message);
            
            if (retries < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1000 * retries));
            } else {
                console.warn('⚠️ Firebase Auth funcionando en modo fallback');
            }
        }
    }
};

// Auto-inicializar cuando Firebase esté disponible
if (window.firebase && window.NebulaConfig) {
    initializeWithRetry();
} else {
    // Esperar a que Firebase se cargue
    const checkFirebase = () => {
        if (window.firebase && window.NebulaConfig) {
            initializeWithRetry();
        } else {
            setTimeout(checkFirebase, 500);
        }
    };
    checkFirebase();
}

console.log('🔐 NebulaAuth module cargado y listo');
