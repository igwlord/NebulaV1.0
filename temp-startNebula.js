        function startNebula() {
            if (nebulaStarted) {
                console.log('⚠️ Nebula ya está iniciado, ignorando llamada duplicada');
                return;
            }
            
            // Verificar si ya se renderizó la aplicación (indica éxito previo)
            if (document.querySelector('#content-root').innerHTML.trim() !== '') {
                console.log('⚠️ Aplicación ya renderizada, ignorando startNebula duplicado');
                nebulaStarted = true;
                window.nebulaStarted = true;
                return;
            }
            
            try {
                nebulaStarted = true;
                window.nebulaStarted = true;
                console.log('🚀 Iniciando Nebula Financial...');
                
                // Verificar elementos DOM
                const elements = ['content-root', 'dock-root', 'parallax-bg', 'modal-root'];
                const domElements = elements.map(id => document.getElementById(id));
                
                if (domElements.some(el => !el)) {
                    console.error('❌ Elementos DOM faltantes:', elements.filter((_, i) => !domElements[i]));
                    throw new Error('Elementos DOM no encontrados');
                }
                
                // Asignar elementos a variables globales
                [contentRoot, dockRoot, parallaxBg, modalRoot] = domElements;
                
                // Verificar objetos necesarios
                if (!THEMES || !ICONS || !appState) {
                    throw new Error('Objetos globales no definidos');
                }
                
                // 🌍 EXPOSICIÓN GLOBAL CRÍTICA - Para compatibilidad con módulos
                window.appState = appState;
                window.THEMES = THEMES;
                window.ICONS = ICONS;
                window.renderApp = renderApp;
                
                // Función global para aplicar autoformato numérico
                window.formatThousands = function(value) {
                    if (!value) return '';
                    // Remover todo excepto números
                    const cleanValue = value.toString().replace(/[^\d]/g, '');
                    // Aplicar formato con puntos cada 3 dígitos
                    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                };
                
                window.applyThousandsFormatting = function(input) {
                    if (!input) return;
                    
                    // Evento input para formateo en tiempo real
                    input.addEventListener('input', (e) => {
                        const cursorPosition = e.target.selectionStart;
                        const oldValue = e.target.value;
                        const newValue = window.formatThousands(oldValue);
                        
                        // Solo actualizar si cambió el valor
                        if (newValue !== oldValue) {
                            e.target.value = newValue;
                            
                            // Mantener posición del cursor
                            const newCursorPosition = cursorPosition + (newValue.length - oldValue.length);
                            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
                        }
                    });
                    
                    // Formatear valor inicial si existe
                    if (input.value) {
                        input.value = window.formatThousands(input.value);
                    }
                };
                
                window.applyNumericFormatting = function() {
                    // Aplicar formateo automático de miles a todos los inputs numéricos
                    document.querySelectorAll('.numeric-input').forEach(input => {
                        window.applyThousandsFormatting(input);
                    });
                    
                    // También aplicar a inputs de actualización de inversiones
                    document.querySelectorAll('.update-investment-input').forEach(input => {
                        window.applyThousandsFormatting(input);
                    });
                };
                
                console.log('✅ Objetos globales expuestos correctamente');
                
                // Inicializar sistemas
                ShortcutSystem.init();
                NotificationSystem.init();
                
                // Renderizar aplicación
                renderApp();
                
                // 🔐 INICIALIZAR SISTEMA DE AUTENTICACIÓN NEBULA
                if (typeof NebulaAuthUI !== 'undefined' && window.NebulaAuth) {
                    console.log('🔐 Inicializando sistema de autenticación Nebula...');
                    
                    // Usar la instancia global de NebulaAuth
                    window.nebulaAuth = window.NebulaAuth; // Alias para compatibilidad
                    window.nebulaAuthUI = new NebulaAuthUI(window.NebulaAuth);
                    
                    // Configurar listener de estado de autenticación
                    window.nebulaAuth.addAuthListener((authData) => {
                        const { user, profile, isAuthenticated } = authData;
                        if (isAuthenticated && user && profile) {
                            console.log('🔐 Usuario autenticado:', user.displayName);
                            appState.user = {
                                name: user.displayName || profile.displayName || 'Usuario',
                                email: user.email || profile.email,
                                photoURL: user.photoURL || profile.photoURL,
                                uid: user.uid,
                                provider: 'google',
                                profile: profile
                            };
                            
                            // Cargar datos del usuario desde el perfil
                            if (profile.financialData) {
                                Object.assign(appState, profile.financialData);
                            }
                            
                            // Solo renderizar si renderApp está disponible
                            if (typeof renderApp === 'function') {
                                renderApp();
                            } else {
                                console.log('⏳ renderApp no disponible aún');
                            }
                        } else {
                            console.log('👤 Usuario no autenticado');
                            // Limpiar datos de usuario pero mantener datos locales
                            appState.user = null;
                        }
                    });
                    
                    // La inicialización de NebulaAuth se hace automáticamente en el constructor
                    console.log('✅ Sistema de autenticación Nebula configurado');
                    
                } else {
                    console.log('⚠️ Sistema de autenticación Nebula no disponible');
                    
                    // 🔥 Fallback a Firebase Authentication básico
                    if (window.firebaseAuth && window.onAuthStateChanged) {
                        window.onAuthStateChanged(window.firebaseAuth, (user) => {
                            if (user) {
                                console.log('🔥 Usuario autenticado detectado:', user.displayName);
                                if (!appState.user || appState.user.uid !== user.uid) {
                                    appState.user = {
                                        name: user.displayName || 'Usuario de Google',
                                        email: user.email,
                                        photoURL: user.photoURL,
                                        uid: user.uid,
                                        provider: 'google'
                                    };
                                    renderApp();
                                }
                            } else {
                                console.log('🔥 No hay usuario autenticado');
                            }
                        });
                    } else {
                        console.log('⚠️ Firebase no disponible, usando autenticación local');
                    }
                }
                
                // Configurar dock
                setTimeout(() => {
                    if (typeof updateDockGlider === 'function') {
                        updateDockGlider();
                    }
                }, 200);
                
                // Mostrar mensaje de bienvenida si es la primera vez
                const isFirstVisit = NebulaSecurityUtils ? 
                    !NebulaSecurityUtils.secureGetItem('nebula_visited') :
                    !localStorage.getItem('nebula_visited');
                if (isFirstVisit) {
                    if (NebulaSecurityUtils) {
                        NebulaSecurityUtils.secureSetItem('nebula_visited', true);
                    } else {
                        localStorage.setItem('nebula_visited', 'true');
                    }
                    setTimeout(() => {
                        NotificationSystem.info('¡Bienvenido!', 
                            'Presiona H para ver los atajos de teclado disponibles', 6000);
                    }, 2000);
                }
                
                console.log('✅ Nebula iniciada correctamente');
                
            } catch (error) {
                nebulaStarted = false; // Reset para permitir reintento
                window.nebulaStarted = false;
                console.error('❌ Error en inicialización:', error);
                
                // Mostrar página de error
                document.body.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); color: white; font-family: 'Inter', Arial, sans-serif;">
                        <div style="text-align: center; padding: 40px; background: rgba(0,0,0,0.4); border-radius: 20px; backdrop-filter: blur(10px); max-width: 500px;">
                            <h1 style="font-size: 3rem; margin-bottom: 1rem;">🌌</h1>
                            <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #e2e8f0;">Nebula Financial</h2>
                            <p style="margin-bottom: 1.5rem; color: #cbd5e1; font-size: 1.1rem;">Iniciando tu universo financiero...</p>
                            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; margin-bottom: 2rem; text-align: left;">
                                <small style="color: #fcd34d; font-family: monospace;">${error.message}</small>
                            </div>
                            <button onclick="location.reload()" style="background: linear-gradient(45deg, #22c55e, #16a34a); border: none; color: white; padding: 14px 28px; border-radius: 25px; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4); transition: transform 0.2s; margin-right: 10px;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                🔄 Recargar App
                            </button>
                            <button onclick="if(NebulaSecurityUtils) { NebulaSecurityUtils.clearSecurityData(); } else { localStorage.clear(); } location.reload()" style="background: linear-gradient(45deg, #f59e0b, #d97706); border: none; color: white; padding: 14px 28px; border-radius: 25px; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                🗑️ Limpiar Datos
                            </button>
                        </div>
                    </div>
                `;
            }
        }
