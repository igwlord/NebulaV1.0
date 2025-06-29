// 🍎 APPLE DOCK STYLE - MÓDULO OPTIMIZADO
// Renderizado y funcionalidad del dock separados para mejor rendimiento

// 🎨 PRELOAD DE ICONOS OPTIMIZADO
function preloadDockIcons() {
    const iconPaths = [
        'images/dock/home.png',
        'images/dock/Ingresos.png', 
        'images/dock/gastos.png',
        'images/dock/inversiones.png',
        'images/dock/deudas.png',
        'images/dock/metas.png',
        'images/dock/settings.png',
        'images/dock/Calendario.png'
    ];
    
    const promises = iconPaths.map(path => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(path);
            img.onerror = () => resolve(path);
            img.src = path;
        });
    });
    
    Promise.all(promises).then(() => {
        console.log('🎨 Iconos del dock precargados');
    });
}

// 🍎 RENDERIZADO DEL DOCK OPTIMIZADO
function renderDock() {
    return `
        <div id="apple-dock" 
             class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50
                    bg-white bg-opacity-20 backdrop-blur-2xl
                    px-4 py-2 rounded-2xl flex items-end space-x-2
                    border border-white border-opacity-30
                    shadow-2xl transition-all duration-300">
            
            <!-- Dashboard -->
            <div class="dock-item relative cursor-pointer transition-all duration-300 transform-origin-bottom" 
                 data-view="dashboard" data-name="Dashboard">
                <div class="dock-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden">
                    <img src="images/dock/home.png" alt="Dashboard" class="w-full h-full object-cover rounded-2xl" />
                </div>
                <div class="dock-label absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-xs opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap">Dashboard</div>
            </div>

            <!-- Ingresos -->
            <div class="dock-item relative cursor-pointer transition-all duration-300 transform-origin-bottom" 
                 data-view="income" data-name="Ingresos">
                <div class="dock-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden">
                    <img src="images/dock/Ingresos.png" alt="Ingresos" class="w-full h-full object-cover rounded-2xl" />
                </div>
                <div class="dock-label absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-xs opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap">Ingresos</div>
            </div>

            <!-- Gastos -->
            <div class="dock-item relative cursor-pointer transition-all duration-300 transform-origin-bottom" 
                 data-view="expenses" data-name="Gastos">
                <div class="dock-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden">
                    <img src="images/dock/gastos.png" alt="Gastos" class="w-full h-full object-cover rounded-2xl" />
                </div>
                <div class="dock-label absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-xs opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap">Gastos</div>
            </div>

            <!-- Inversiones -->
            <div class="dock-item relative cursor-pointer transition-all duration-300 transform-origin-bottom" 
                 data-view="investments" data-name="Inversiones">
                <div class="dock-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden">
                    <img src="images/dock/inversiones.png" alt="Inversiones" class="w-full h-full object-cover rounded-2xl" />
                </div>
                <div class="dock-label absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-xs opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap">Inversiones</div>
            </div>

            <!-- Deudas -->
            <div class="dock-item relative cursor-pointer transition-all duration-300 transform-origin-bottom" 
                 data-view="debts" data-name="Deudas">
                <div class="dock-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden">
                    <img src="images/dock/deudas.png" alt="Deudas" class="w-full h-full object-cover rounded-2xl" />
                </div>
                <div class="dock-label absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-xs opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap">Deudas</div>
            </div>

            <!-- Metas -->
            <div class="dock-item relative cursor-pointer transition-all duration-300 transform-origin-bottom" 
                 data-view="goals" data-name="Metas">
                <div class="dock-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden">
                    <img src="images/dock/metas.png" alt="Metas" class="w-full h-full object-cover rounded-2xl" />
                </div>
                <div class="dock-label absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-xs opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap">Metas</div>
            </div>

            <!-- Configuración -->
            <div class="dock-item relative cursor-pointer transition-all duration-300 transform-origin-bottom" 
                 data-view="settings" data-name="Configuración">
                <div class="dock-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden">
                    <img src="images/dock/settings.png" alt="Configuración" class="w-full h-full object-cover rounded-2xl" />
                </div>
                <div class="dock-label absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-xs opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap">Configuración</div>
            </div>

            <!-- Calendario -->
            <div class="dock-item relative cursor-pointer transition-all duration-300 transform-origin-bottom" 
                 data-view="calendar" data-name="Calendario">
                <div class="dock-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden">
                    <img src="images/dock/Calendario.png" alt="Calendario" class="w-full h-full object-cover rounded-2xl" />
                </div>
                <div class="dock-label absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-xs opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap">Calendario</div>
            </div>

            <!-- Indicador activo -->
            <div id="active-dot" class="absolute -bottom-1 w-1 h-1 bg-white rounded-full opacity-0 transition-all duration-300 shadow-lg"></div>
        </div>

        <!-- CSS del Apple Dock optimizado -->
        <style>
            #apple-dock {
                backdrop-filter: blur(30px);
                -webkit-backdrop-filter: blur(30px);
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
            }

            .dock-item:hover {
                transform: scale(1.4) translateY(-8px);
                z-index: 10;
            }

            .dock-item:hover .dock-icon {
                box-shadow: 
                    0 12px 32px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }

            .dock-item:hover .dock-label {
                opacity: 1;
            }

            .dock-item:hover + .dock-item {
                transform: scale(1.2) translateY(-4px);
            }

            .dock-item:has(+ .dock-item:hover) {
                transform: scale(1.2) translateY(-4px);
            }

            .dock-item:hover + .dock-item + .dock-item {
                transform: scale(1.1) translateY(-2px);
            }

            .dock-item:has(+ .dock-item + .dock-item:hover) {
                transform: scale(1.1) translateY(-2px);
            }

            .dock-item.active .dock-icon {
                box-shadow: 
                    0 8px 24px rgba(59, 130, 246, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    0 0 0 2px rgba(59, 130, 246, 0.3);
            }

            #active-dot.show {
                opacity: 0.8;
                box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
            }

            @keyframes appleBounce {
                0% { transform: scale(1.4) translateY(-8px); }
                50% { transform: scale(1.5) translateY(-12px) rotate(5deg); }
                100% { transform: scale(1.4) translateY(-8px); }
            }

            .dock-item.clicking {
                animation: appleBounce 0.3s ease-in-out;
            }
        </style>
    `;
}

// 🚀 INICIALIZACIÓN DEL DOCK OPTIMIZADO
function initializeDock() {
    setTimeout(() => {
        try {
            const dockItems = document.querySelectorAll('.dock-item');
            const activeDot = document.getElementById('active-dot');
            
            if (dockItems.length === 0) {
                console.warn('🍎 Apple Dock no encontrado');
                return;
            }
            
            // Event listeners optimizados
            dockItems.forEach((item, index) => {
                const label = item.querySelector('.dock-label');
                
                // Click handler con debounce
                item.addEventListener('click', debounce(() => {
                    const view = item.dataset.view;
                    const name = item.dataset.name;
                    
                    // Efecto bounce
                    item.classList.add('clicking');
                    setTimeout(() => item.classList.remove('clicking'), 300);
                    
                    // Actualizar estado
                    if (window.appState && window.appState.setCurrentView(view)) {
                        updateActiveState();
                        
                        if (window.renderApp) {
                            window.renderApp();
                        }
                        
                        console.log(`🍎 Navegación: ${name}`);
                    }
                }, 100));
                
                // Hover effects
                item.addEventListener('mouseenter', () => {
                    if (label) label.style.opacity = '1';
                    applyMagnificationEffect(item, index);
                });
                
                item.addEventListener('mouseleave', () => {
                    if (label) label.style.opacity = '0';
                    removeMagnificationEffect();
                });
            });
            
            updateActiveState();
            console.log('🍎 Apple Dock inicializado - Optimizado');
            
        } catch (error) {
            console.error('Error inicializando dock:', error);
        }
    }, 100);
}

// 🎯 FUNCIONES AUXILIARES OPTIMIZADAS
function applyMagnificationEffect(hoveredItem, hoveredIndex) {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach((item, index) => {
        const distance = Math.abs(index - hoveredIndex);
        let scale = 1;
        let translateY = 0;
        
        if (distance === 0) {
            scale = 1.4;
            translateY = -8;
        } else if (distance === 1) {
            scale = 1.2;
            translateY = -4;
        } else if (distance === 2) {
            scale = 1.1;
            translateY = -2;
        }
        
        item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        item.style.zIndex = distance === 0 ? 10 : 5 - distance;
    });
}

function removeMagnificationEffect() {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
        if (!item.classList.contains('clicking')) {
            item.style.transform = 'scale(1) translateY(0)';
            item.style.zIndex = 'auto';
        }
    });
}

function updateActiveState() {
    const dockItems = document.querySelectorAll('.dock-item');
    const activeDot = document.getElementById('active-dot');
    const currentView = window.appState?.activeView || 'dashboard';
    
    dockItems.forEach((item) => {
        item.classList.remove('active');
        if (item.dataset.view === currentView) {
            item.classList.add('active');
            
            // Mover indicador
            if (activeDot) {
                const itemRect = item.getBoundingClientRect();
                const dockRect = document.getElementById('apple-dock').getBoundingClientRect();
                const offsetX = itemRect.left - dockRect.left + (itemRect.width / 2) - 2;
                activeDot.style.left = `${offsetX}px`;
                activeDot.classList.add('show');
            }
        }
    });
}

// 🔧 UTILIDAD DEBOUNCE
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 🌐 EXPOSICIÓN GLOBAL
window.renderDock = renderDock;
window.initializeDock = initializeDock;
window.preloadDockIcons = preloadDockIcons;

// Auto-preload de iconos
preloadDockIcons();

console.log('✅ Apple Dock módulo cargado - Optimizado');
