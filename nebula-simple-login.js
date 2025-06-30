// ===============================================
// 🔥 SISTEMA DE LOGIN SIMPLIFICADO - DEFINITIVO
// ===============================================

console.log('🔥 INICIANDO SISTEMA DE LOGIN SIMPLIFICADO');

// Estado global del login
window.NEBULA_LOGIN_STATE = {
    isProcessing: false,
    initialized: false,
    retryCount: 0,
    maxRetries: 3
};

// Función principal de login simplificado
function NEBULA_SIMPLE_LOGIN(method = 'guest') {
    console.log(`🚀 NEBULA SIMPLE LOGIN: ${method}`);
    
    // Prevenir múltiples ejecuciones
    if (window.NEBULA_LOGIN_STATE.isProcessing) {
        console.log('⚠️ Login ya en proceso, ignorando...');
        return;
    }
    
    window.NEBULA_LOGIN_STATE.isProcessing = true;
    
    try {
        // Configurar usuario directamente
        const userName = method === 'google' ? 'Usuario Google' : 
                        method === 'guest' ? 'Invitado' : 'Usuario Email';
        
        if (window.appState) {
            window.appState.user = {
                name: userName,
                method: method,
                isOffline: true,
                loginTime: new Date().toISOString(),
                simple: true
            };
            
            window.appState.isLoading = false;
            
            console.log(`✅ Usuario configurado: ${userName}`);
            
            // Forzar renderizado si está disponible
            if (typeof renderApp === 'function') {
                renderApp();
                console.log('✅ App renderizada');
            }
            
            // Notificación de éxito
            if (window.NotificationSystem) {
                window.NotificationSystem.success('Login', `Sesión iniciada como ${userName}`);
            }
            
            // Limpiar estado
            setTimeout(() => {
                window.NEBULA_LOGIN_STATE.isProcessing = false;
            }, 1000);
            
            return true;
            
        } else {
            throw new Error('appState no disponible');
        }
        
    } catch (error) {
        console.error('❌ Error en login simplificado:', error);
        window.NEBULA_LOGIN_STATE.isProcessing = false;
        
        if (window.NotificationSystem) {
            window.NotificationSystem.error('Error', 'Error al iniciar sesión');
        }
        
        return false;
    }
}

// Función para configurar botones de forma garantizada
function NEBULA_SETUP_BUTTONS() {
    console.log('🔧 CONFIGURANDO BOTONES DE LOGIN...');
    
    const maxAttempts = 10;
    let attempts = 0;
    
    const setupAttempt = () => {
        attempts++;
        console.log(`🔍 Intento ${attempts}/${maxAttempts} - Buscando botones...`);
        
        const googleBtn = document.getElementById('google-login-btn');
        const guestBtn = document.getElementById('guest-login-btn');
        const emailBtn = document.getElementById('email-register-btn');
        
        console.log('Botones encontrados:', {
            google: !!googleBtn,
            guest: !!guestBtn,
            email: !!emailBtn
        });
        
        if (!googleBtn && !guestBtn && !emailBtn && attempts < maxAttempts) {
            setTimeout(setupAttempt, 200);
            return;
        }
        
        // Configurar botones encontrados
        if (googleBtn && !googleBtn.hasAttribute('data-nebula-fixed')) {
            console.log('🔧 Configurando botón Google...');
            
            // Limpiar eventos anteriores
            const newGoogleBtn = googleBtn.cloneNode(true);
            googleBtn.parentNode.replaceChild(newGoogleBtn, googleBtn);
            
            // Configurar evento
            newGoogleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔥 CLICK GOOGLE DETECTADO');
                NEBULA_SIMPLE_LOGIN('google');
            });
            
            // Asegurar clickeabilidad
            newGoogleBtn.style.pointerEvents = 'auto';
            newGoogleBtn.style.cursor = 'pointer';
            newGoogleBtn.style.zIndex = '9999';
            newGoogleBtn.disabled = false;
            newGoogleBtn.setAttribute('data-nebula-fixed', 'true');
            
            console.log('✅ Botón Google configurado');
        }
        
        if (guestBtn && !guestBtn.hasAttribute('data-nebula-fixed')) {
            console.log('🔧 Configurando botón Guest...');
            
            // Limpiar eventos anteriores
            const newGuestBtn = guestBtn.cloneNode(true);
            guestBtn.parentNode.replaceChild(newGuestBtn, guestBtn);
            
            // Configurar evento
            newGuestBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔥 CLICK GUEST DETECTADO');
                NEBULA_SIMPLE_LOGIN('guest');
            });
            
            // Asegurar clickeabilidad
            newGuestBtn.style.pointerEvents = 'auto';
            newGuestBtn.style.cursor = 'pointer';
            newGuestBtn.style.zIndex = '9999';
            newGuestBtn.disabled = false;
            newGuestBtn.setAttribute('data-nebula-fixed', 'true');
            
            console.log('✅ Botón Guest configurado');
        }
        
        if (emailBtn && !emailBtn.hasAttribute('data-nebula-fixed')) {
            console.log('🔧 Configurando botón Email...');
            
            // Limpiar eventos anteriores
            const newEmailBtn = emailBtn.cloneNode(true);
            emailBtn.parentNode.replaceChild(newEmailBtn, emailBtn);
            
            // Configurar evento
            newEmailBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔥 CLICK EMAIL DETECTADO');
                
                const modal = document.getElementById('email-register-modal');
                if (modal) {
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                }
            });
            
            // Asegurar clickeabilidad
            newEmailBtn.style.pointerEvents = 'auto';
            newEmailBtn.style.cursor = 'pointer';
            newEmailBtn.style.zIndex = '9999';
            newEmailBtn.disabled = false;
            newEmailBtn.setAttribute('data-nebula-fixed', 'true');
            
            console.log('✅ Botón Email configurado');
        }
        
        window.NEBULA_LOGIN_STATE.initialized = true;
        console.log('🎉 SISTEMA DE LOGIN SIMPLIFICADO CONFIGURADO');
    };
    
    // Iniciar configuración
    setupAttempt();
}

// Función de inicialización
function NEBULA_INIT_SIMPLE_LOGIN() {
    console.log('🚀 INICIALIZANDO SISTEMA DE LOGIN SIMPLIFICADO...');
    
    // Exponer función global
    window.loginNow = NEBULA_SIMPLE_LOGIN;
    window.fixLogin = NEBULA_SETUP_BUTTONS;
    
    // Configurar botones cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', NEBULA_SETUP_BUTTONS);
    } else {
        setTimeout(NEBULA_SETUP_BUTTONS, 100);
    }
    
    console.log('✅ FUNCIONES GLOBALES DISPONIBLES:');
    console.log('  - loginNow("guest") - Login inmediato');
    console.log('  - fixLogin() - Reparar botones');
}

// Auto-inicializar
NEBULA_INIT_SIMPLE_LOGIN();

console.log('🔥 SISTEMA DE LOGIN SIMPLIFICADO CARGADO');
