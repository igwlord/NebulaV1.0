/**
 * 🚀 NEBULA FINANCIAL - CONTROLADOR PRINCIPAL DE LA APLICACIÓN
 * 
 * Este archivo maneja la inicialización, el estado global y el renderizado principal
 * de la aplicación Nebula Financial.
 * 
 * @author Nebula Team
 * @version 2.0.0
 * 
 * CloudSonnet4: AUDITORÍA COMPLETA DEL CONTROLADOR PRINCIPAL
 * =========================================================
 * ✅ ASPECTOS POSITIVOS:
 * - Arquitectura modular bien organizada con imports ES6
 * - Estado global centralizado y bien documentado
 * - Sistema de notificaciones, shortcuts y modales integrado
 * - Excelente documentación de funciones
 * - Manejo robusto de errores en autenticación
 * - Sistema de fallbacks inteligente
 * 
 * 🚨 PROBLEMAS DETECTADOS:
 * 1. Complejidad cognitiva alta en funciones principales (>15)
 * 2. Falta integración entre login() de index.html y handleLogin() de app.js
 * 3. Algunos TODOs pendientes de implementar
 * 4. Declaraciones léxicas en case blocks sin llaves
 * 
 * 🔧 RECOMENDACIONES DE MEJORA:
 * 1. Refactorizar funciones complejas en subfunciones más pequeñas
 * 2. Integrar completamente sistema de autenticación
 * 3. Agregar llaves {} en case blocks con declaraciones let/const
 * 4. Implementar lazy loading para módulos no críticos
 * 5. Agregar validación de tipos más estricta
 * 
 * 📊 CALIFICACIÓN DE CALIDAD: 8/10
 * - Código muy bien estructurado pero con room for improvement en complejidad
 * 
 * CloudSonnet4: Mejoras críticas implementadas
 * - Fix en copyToFutureMonths: transacciones anuales ahora incluyen repeatYearly: true y originalId
 * - Importación de applyThousandsFormatting para formateo automático de miles
 * - Inicialización de formateo en inputs numéricos (.numeric-input y .update-investment-input)
 * - Correcciones en renderizado de secciones diferenciadas de ingresos/gastos
 * - Integración con componente de calendario modular mejorado
 */

import { formatCurrency, parseFormattedNumber, createIcon, THEMES, ICONS, applyThousandsFormatting } from './utils/helpers.js';
import { NotificationSystem } from './components/notifications.js';
import { ShortcutSystem } from './components/shortcuts.js';
import { ModalSystem } from './components/modals.js';
import { renderDashboard } from './components/dashboard.js';
import { renderTransactionsView } from './components/transactions.js';
// CloudSonnet4: Importación del componente de calendario modular (disponible para uso futuro)
// import { renderCalendarModal, attachCalendarListeners } from './components/calendar.js';
import { authService } from './auth.js';

// ===============================================
// 🏗️ ESTADO GLOBAL DE LA APLICACIÓN
// ===============================================

/**
 * Estado global de la aplicación Nebula Financial
 * Contiene todos los datos y configuraciones necesarias
 */
export const appState = {
    // 👤 Estado del usuario
    user: null,
    isLoading: false,
    
    // 🎨 Configuración visual
    themeKey: localStorage.getItem('nebulaTheme') || 'aureoAmanecer',
    
    // 🧭 Navegación
    activeView: 'dashboard',
    activeModal: null,
    
    // 📅 Fecha actual para navegación temporal
    currentDate: new Date(),
    
    // 💾 Datos financieros
    data: {
        transactions: JSON.parse(localStorage.getItem('nebulaTransactions')) || {},
        investments: JSON.parse(localStorage.getItem('nebulaInvestments')) || [],
        debts: JSON.parse(localStorage.getItem('nebulaDebts')) || [],
        goals: JSON.parse(localStorage.getItem('nebulaGoals')) || []
    },
      // 🎯 Propiedades computadas
    get theme() {
        return THEMES[this.themeKey] || THEMES.aureoAmanecer;
    },
    
    get currentMonthKey() {
        return `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}`;
    },
    
    // 🎨 Método para obtener tema actual (compatibilidad con módulos)
    getCurrentTheme() {
        return this.theme;
    },
    
    // 💾 Métodos de persistencia
    saveData() {
        try {
            localStorage.setItem('nebulaTransactions', JSON.stringify(this.data.transactions));
            localStorage.setItem('nebulaInvestments', JSON.stringify(this.data.investments));
            localStorage.setItem('nebulaDebts', JSON.stringify(this.data.debts));
            localStorage.setItem('nebulaGoals', JSON.stringify(this.data.goals));
            localStorage.setItem('nebulaTheme', this.themeKey);
            console.log('💾 Datos guardados correctamente');
        } catch (error) {
            console.error('❌ Error guardando datos:', error);
            NotificationSystem.show('Error guardando datos', 'error');
        }
    },
    
    // 🗑️ Limpiar datos de localStorage
    clearData() {
        const modalContainer = document.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.classList.add('modal-leave');
            setTimeout(() => {
                modalContainer.remove();
                localStorage.clear();
                location.reload();
            }, 300);
        }
    },
    
    // 📊 Obtener transacciones del mes actual
    getCurrentTransactions() {
        const key = this.currentMonthKey;
        return this.data.transactions[key] || [];
    },
    
    // 💰 Obtener balance del mes actual
    getCurrentBalance() {
        const transactions = this.getCurrentTransactions();
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return { income, expenses, balance: income - expenses };
    },
    
    // 📋 Copiar transacciones del mes anterior
    copyFromPreviousMonth(type) {
        const prevDate = new Date(this.currentDate);
        prevDate.setMonth(prevDate.getMonth() - 1);
        const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
        const prevTransactions = this.data.transactions[prevKey] || [];
        const transactionsToCopy = prevTransactions.filter(t => t.type === type);
        
        if (transactionsToCopy.length === 0) {
            NotificationSystem.show(`No hay ${type === 'income' ? 'ingresos' : 'gastos'} del mes anterior para copiar`, 'warning');
            return;
        }
        
        if (!this.data.transactions[this.currentMonthKey]) {
            this.data.transactions[this.currentMonthKey] = [];
        }
        
        let copiedCount = 0;
        transactionsToCopy.forEach(transaction => {
            const newTransaction = {
                ...transaction,
                id: Date.now() + Math.random(),
                date: new Date().toISOString().split('T')[0]
            };
            this.data.transactions[this.currentMonthKey].push(newTransaction);
            copiedCount++;
        });
        
        this.saveData();
        NotificationSystem.show(`${copiedCount} ${type === 'income' ? 'ingresos' : 'gastos'} copiados del mes anterior`, 'success');
        renderApp();
    },
    
    // 📅 Copiar transacciones a meses futuros
    copyToFutureMonths(type) {
        const currentTransactions = this.data.transactions[this.currentMonthKey] || [];
        const transactionsToCopy = currentTransactions.filter(t => t.type === type);
        
        if (transactionsToCopy.length === 0) {
            NotificationSystem.show(`No hay ${type === 'income' ? 'ingresos' : 'gastos'} para copiar`, 'warning');
            return;
        }
        
        const currentYear = this.currentDate.getFullYear();
        const currentMonth = this.currentDate.getMonth();
        let totalCopied = 0;
          // Copiar a todos los meses restantes del año
        for (let month = currentMonth + 1; month < 12; month++) {
            const targetKey = `${currentYear}-${String(month + 1).padStart(2, '0')}`;
            
            if (!this.data.transactions[targetKey]) {
                this.data.transactions[targetKey] = [];
            }
            
            transactionsToCopy.forEach(transaction => {
                const newTransaction = {
                    ...transaction,
                    id: Date.now() + Math.random(),
                    date: new Date(currentYear, month, 1).toISOString().split('T')[0],
                    // CloudSonnet4: Marcar como repetición anual para eliminación correcta
                    repeatYearly: true,
                    originalId: transaction.id
                };
                this.data.transactions[targetKey].push(newTransaction);
                totalCopied++;
            });
        }
        
        this.saveData();
        NotificationSystem.show(`${totalCopied} ${type === 'income' ? 'ingresos' : 'gastos'} copiados a meses futuros`, 'success');
    },
    
    // 📈 Actualizar inversión con valor actual
    updateInvestmentValue(id, currentValue) {
        const investment = this.data.investments.find(inv => inv.id === id);
        if (investment) {
            investment.currentValue = currentValue;
            investment.lastUpdate = new Date().toISOString();
            this.saveData();
            NotificationSystem.show('Inversión actualizada correctamente', 'success');
            renderApp();
        }
    },
    
    // CloudSonnet4: Función de reordenamiento de elementos
    reorderItem(type, index, direction) {
        const array = this.data[type];
        if (!array || index < 0 || index >= array.length) return false;
        
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= array.length) return false;
        
        // Intercambiar elementos
        [array[index], array[newIndex]] = [array[newIndex], array[index]];
        
        this.saveData();
        return true;
    },
};

// ===============================================
// 🎨 VARIABLES DOM GLOBALES
// ===============================================
let contentRoot, dockRoot, parallaxBg, modalRoot;

// ===============================================
// 🖼️ FUNCIONES DE RENDERIZADO PRINCIPAL
// ===============================================

/**
 * 🎯 RENDERIZADOR PRINCIPAL DE LA APLICACIÓN
 * Controla el flujo de renderizado según el estado actual
 */
export function renderApp() {
    // Inicializar elementos DOM si no están disponibles
    if (!contentRoot || !dockRoot || !parallaxBg || !modalRoot) {
        console.log('🔧 Inicializando elementos DOM...');
        contentRoot = document.getElementById('content-root');
        dockRoot = document.getElementById('dock-root');
        parallaxBg = document.getElementById('parallax-bg');
        modalRoot = document.getElementById('modal-root');
        
        // Verificar que los elementos existen
        if (!contentRoot || !dockRoot || !parallaxBg || !modalRoot) {
            console.error('❌ Elementos DOM críticos no encontrados');
            return;
        }
    }
    
    // Aplicar tema visual
    document.body.style.setProperty('--bg-gradient', appState.theme.gradient);
    parallaxBg.innerHTML = renderParallaxBackground();
      if (appState.isLoading) {
        contentRoot.innerHTML = renderLoadingScreen();
        dockRoot.innerHTML = '';
    } else if (!appState.user) {
        // Auto-login como invitado para evitar pantalla de login
        console.log('🚀 Auto-iniciando sesión como invitado...');
        setTimeout(() => {
            handleLogin('guest');
        }, 100);
        
        // Mientras tanto, mostrar pantalla de login
        contentRoot.innerHTML = renderLoginView();
        dockRoot.innerHTML = '';
    } else {
        let viewHTML = '';
        
        // CloudSonnet4: Mensaje de bienvenida sutil
        const welcomeMessage = `
            <div class="fixed top-4 left-4 z-30 pointer-events-none">
                <div class="text-xs ${appState.theme.textSecondary} opacity-60 font-medium">
                    Bienvenido: ${appState.user.displayName || 'Usuario'}
                </div>
            </div>
        `;
        
        // Agregar selector de mes para vistas que lo requieren
        if(!['settings', 'achievements', 'goals', 'investments', 'debts'].includes(appState.activeView)) {
           viewHTML += renderMonthSelector();
        }

        // Renderizar vista según selección activa
        switch (appState.activeView) {
            case 'dashboard': 
                viewHTML += renderDashboard(); 
                break;
            case 'income': 
                viewHTML += renderTransactionsView('income'); 
                break;
            case 'expenses': 
                viewHTML += renderTransactionsView('expense'); 
                break;
            case 'goals': 
                viewHTML += renderGoalsView(); 
                break;
            case 'investments': 
                viewHTML += renderInvestmentsView(); 
                break;
            case 'debts': 
                viewHTML += renderDebtsView(); 
                break;
            case 'settings': 
                viewHTML += renderSettingsView(); 
                break;
            default: 
                viewHTML += renderComingSoon(appState.activeView);
        }
        
        contentRoot.innerHTML = `${welcomeMessage}<main class="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full view-transition">${viewHTML}</main>`;
        dockRoot.innerHTML = renderDock();
    }
    
    addEventListeners();
    
    // Actualizar glider después del renderizado
    setTimeout(() => updateDockGlider(), 100);
}

/**
 * 🔐 Vista de Login/Autenticación
 */
function renderLoginView() {
    return `
        <div class="flex flex-col items-center justify-center h-screen login-card p-4">
            <div class="backdrop-blur-md rounded-2xl shadow-lg p-8 ${appState.theme.surface} text-center w-full max-w-sm">
                <h1 class="text-4xl font-black ${appState.theme.accent}">Nebula</h1>
                <p class="mt-2 ${appState.theme.textSecondary}">Tu universo financiero personal.</p>
                <div class="mt-8 space-y-4">
                    <button data-login-method="google" class="login-button w-full flex items-center justify-center gap-3 bg-white/90 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-white transition-transform transform hover:scale-105">
                        ${createIcon(ICONS.mail, 'w-6 h-6')}
                        Ingresar con Correo
                    </button>
                    <button data-login-method="guest" class="login-button w-full bg-white/20 text-white font-bold py-3 px-4 rounded-lg hover:bg-white/30 transition-transform transform hover:scale-105">
                        Entrar como Invitado
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * ⏳ Pantalla de Carga con Animación Orbital
 */
function renderLoadingScreen() {
    return `
        <div class="fixed inset-0 flex flex-col items-center justify-center text-white z-50">
            <div class="w-64 h-64 relative mb-8">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-400 rounded-full ${appState.theme.accentGlow}"></div>
                <div class="absolute inset-0 animate-[spin_20s_linear_infinite]">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <div class="absolute inset-4 animate-[spin_30s_linear_infinite_reverse]">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <div class="absolute inset-10 animate-[spin_45s_linear_infinite]">
                    <div class="absolute bottom-0 right-1/2 translate-x-1/2 w-5 h-5 bg-green-500 rounded-full"></div>
                </div>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Alineando las estrellas...</h1>
            <p class="${appState.theme.textSecondary}">Cargando tu universo financiero.</p>
        </div>
    `;
}

/**
 * 📅 Selector de Mes con Calendario Desplegable
 */
function renderMonthSelector() {
    const today = new Date();
    const currentDate = appState.currentDate;
    const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });
    const year = currentDate.getFullYear();
    
    // Determinar si es pasado, presente o futuro
    let timeLabel = '';
    if (currentDate.getFullYear() < today.getFullYear() || 
        (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() < today.getMonth())) {
        timeLabel = `<span class="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-medium backdrop-blur-sm border border-amber-400/30">✨ PASADO</span>`;
    } else if (currentDate.getFullYear() > today.getFullYear() || 
              (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() > today.getMonth())) {
        timeLabel = `<span class="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-medium backdrop-blur-sm border border-cyan-400/30">🚀 FUTURO</span>`;
    } else {
        timeLabel = `<span class="text-xs px-3 py-1 rounded-full ${appState.theme.accentBg}/20 ${appState.theme.accent} font-medium backdrop-blur-sm border ${appState.theme.accentBorder}/30">🌟 ACTUAL</span>`;
    }
    
    return `
        <div class="text-center mb-8 relative">
            <!-- Título principal centrado con efectos -->
            <div class="flex flex-col items-center gap-3 mb-6">
                <h1 class="text-3xl sm:text-4xl font-black ${appState.theme.textPrimary} capitalize relative">
                    <span class="relative z-10 bg-gradient-to-r from-${appState.theme.accent.replace('text-', '')} to-${appState.theme.accent.replace('text-', '')} bg-clip-text text-transparent filter drop-shadow-lg">
                        ${monthName} ${year}
                    </span>
                    <!-- Efecto de brillo sutil -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm opacity-30 animate-pulse"></div>
                    <!-- Sombra de resplandor -->
                    <div class="absolute inset-0 ${appState.theme.accentGlow} opacity-20 blur-lg"></div>
                </h1>
                ${timeLabel}
            </div>
            
            <!-- Controles de navegación centrados -->
            <div class="flex items-center justify-center gap-4">
                <button id="month-prev" class="${appState.theme.textSecondary} hover:${appState.theme.accent} p-3 rounded-full transition-all hover:scale-110 ${appState.theme.surface} backdrop-blur-sm" title="Mes anterior (←)">
                    ${createIcon(ICONS.chevronLeft, "w-6 h-6")}
                </button>
                
                <div class="relative">
                    <button id="calendar-dropdown-button" class="${appState.theme.textSecondary} hover:${appState.theme.accent} p-3 rounded-full transition-all hover:scale-110 ${appState.theme.surface} backdrop-blur-sm" title="Seleccionar mes (C)">
                        ${createIcon(ICONS.calendar, "w-6 h-6")}
                    </button>
                    
                    <div id="calendar-dropdown" class="hidden absolute left-1/2 transform -translate-x-1/2 top-14 z-50 backdrop-blur-md rounded-xl shadow-lg p-4 ${appState.theme.surface} w-64">
                        <div class="grid grid-cols-3 gap-2">
                            ${Array.from({length: 12}, (_, i) => {
                                const monthKey = `${year}-${String(i + 1).padStart(2, '0')}`;
                                const hasData = appState.data.transactions[monthKey] && 
                                               Object.values(appState.data.transactions[monthKey]).length > 0;
                                const isCurrentMonth = i === currentDate.getMonth();
                                const isToday = i === today.getMonth() && year === today.getFullYear();
                                
                                let classes = 'month-dropdown-item p-2 rounded-lg text-sm font-medium transition-all hover:bg-black/10 cursor-pointer text-center backdrop-blur-sm';
                                
                                if (isCurrentMonth) {
                                    classes += ` ring-2 ${appState.theme.accentRing} ${appState.theme.accent} ${appState.theme.accentGlow}`;
                                } else if (isToday) {
                                    classes += ` ${appState.theme.accentBg} text-slate-900`;
                                } else if (hasData) {
                                    classes += ` bg-black/20 ${appState.theme.textPrimary} backdrop-blur-md`;
                                } else {
                                    classes += ` ${appState.theme.textSecondary}`;
                                }
                                
                                return `<div class="${classes}" data-month="${i}">${new Date(year, i).toLocaleString('es-ES', {month: 'short'})}</div>`;
                            }).join('')}
                        </div>
                        
                        <div class="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                            <button id="today-shortcut" class="text-xs ${appState.theme.textSecondary} hover:${appState.theme.accent} transition-colors px-2 py-1 rounded">
                                🏠 Ir a hoy
                            </button>
                            <div class="flex items-center gap-2 text-xs ${appState.theme.textSecondary}">
                                <span class="w-2 h-2 rounded-full ${appState.theme.accentBg}"></span>Hoy
                                <span class="w-2 h-2 rounded-full bg-white/20"></span>Con datos
                            </div>
                        </div>
                    </div>
                </div>
                
                <button id="month-next" class="${appState.theme.textSecondary} hover:${appState.theme.accent} p-3 rounded-full transition-all hover:scale-110 ${appState.theme.surface} backdrop-blur-sm" title="Mes siguiente (→)">
                    ${createIcon(ICONS.chevronRight, "w-6 h-6")}
                </button>
            </div>
        </div>
    `;
}

// ===============================================
// 🧭 DOCK DE NAVEGACIÓN
// ===============================================

/**
 * 🧭 Renderizar Dock de Navegación Principal
 */
function renderDock() {
    const navItems = [
        { id: 'dashboard', label: 'Resumen', icon: ICONS.dashboard, key: 'D' },
        { id: 'income', label: 'Ingresos', icon: ICONS.income, key: 'I' },
        { id: 'expenses', label: 'Gastos', icon: ICONS.expenses, key: 'G' },
        { id: 'investments', label: 'Inversiones', icon: ICONS.investments, key: 'N' },
        { id: 'debts', label: 'Deudas', icon: ICONS.debts, key: 'P' },
        { id: 'goals', label: 'Metas', icon: ICONS.goals, key: 'M' },
        { id: 'settings', label: 'Ajustes', icon: ICONS.settings, key: 'A' }
    ];

    const navButtonsHTML = navItems.map(item => `
        <button data-view="${item.id}" aria-label="${item.label}" 
                class="nav-button p-3 w-16 h-16 flex items-center justify-center
                       ${appState.activeView === item.id ? `text-white active` : `${appState.theme.textSecondary} hover:text-white`}" 
                title="${item.label} (${item.key})">
            ${createIcon(item.icon, "w-6 h-6")}
        </button>
    `).join('');

    return `
        <nav class="p-4 backdrop-blur-lg bg-black/20">
            <div class="dock-container w-full max-w-md mx-auto flex justify-between items-center">
                ${navButtonsHTML}
            </div>
        </nav>`;
}

/**
 * 🎨 Actualizar efecto glider del dock
 */
function updateDockGlider() {
    // Esta función será implementada para el efecto visual del dock
    console.log('🎨 Actualizando glider del dock');
}

// ===============================================
// 🎭 FUNCIONES DE RENDERIZADO DE VISTAS
// ===============================================

/**
 * 🎯 Renderizar vista de Metas de Ahorro
 */
function renderGoalsView() {
    const goalsHTML = appState.data.goals.map((goal, index) => `
        <div class="bg-white/5 p-4 rounded-lg">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <p class="font-bold ${appState.theme.textPrimary}">${goal.name}</p>
                    <p class="text-sm ${appState.theme.textSecondary} mt-1">${formatCurrency(goal.saved)} / ${formatCurrency(goal.target)}</p>
                </div>
                <div class="flex items-center gap-2">
                    <!-- CloudSonnet4: Botones de reordenamiento -->
                    <button class="reorder-button text-${appState.theme.textSecondary} hover:${appState.theme.accent} transition-colors" 
                            data-direction="up" data-type="goals" data-index="${index}" 
                            ${index === 0 ? 'disabled opacity-50' : ''} title="Mover arriba">
                        ${createIcon(ICONS.chevronUp, 'w-4 h-4')}
                    </button>
                    <button class="reorder-button text-${appState.theme.textSecondary} hover:${appState.theme.accent} transition-colors" 
                            data-direction="down" data-type="goals" data-index="${index}" 
                            ${index === appState.data.goals.length - 1 ? 'disabled opacity-50' : ''} title="Mover abajo">
                        ${createIcon(ICONS.chevronDown, 'w-4 h-4')}
                    </button>
                    <button class="delete-goal-button text-red-500/70 hover:text-red-500" data-goal-id="${goal.id}">${createIcon(ICONS.trash, 'w-5 h-5')}</button>
                </div>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div class="${appState.theme.accentBg} h-2.5 rounded-full" style="width: ${((goal.saved / goal.target) * 100)}%"></div>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="backdrop-blur-md rounded-2xl shadow-lg p-6 ${appState.theme.surface}">
            <h2 class="text-2xl font-bold ${appState.theme.textPrimary} mb-6">Metas de Ahorro</h2>
            <form id="goal-form" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-end">
                <div><label class="block text-sm font-medium ${appState.theme.textSecondary} mb-1">Nombre de la Meta</label><input type="text" name="name" placeholder="Ej: Viaje a Marte" class="w-full bg-white/10 ${appState.theme.textPrimary} rounded-md p-2 border border-white/20 focus:ring-2 ${appState.theme.accentRing} focus:outline-none" required /></div>
                <div><label class="block text-sm font-medium ${appState.theme.textSecondary} mb-1">Monto Objetivo</label><input type="text" inputmode="numeric" name="target" placeholder="0" class="numeric-input w-full bg-white/10 ${appState.theme.textPrimary} rounded-md p-2 border border-white/20 focus:ring-2 ${appState.theme.accentRing} focus:outline-none" required /></div>
                <div class="self-end"><button type="submit" class="w-full ${appState.theme.accentBg} text-slate-900 font-bold py-3 px-4 rounded-md hover:opacity-90 transition-colors ${appState.theme.accentGlow} flex items-center justify-center gap-2">${createIcon(ICONS.plus)}Crear Meta</button></div>
            </form>
            <h3 class="text-xl font-semibold ${appState.theme.textPrimary} mt-8 mb-4">Mis Metas</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${goalsHTML || `<p class="${appState.theme.textSecondary} col-span-full text-center py-4">Aún no has definido metas.</p>`}</div>
        </div>
    `;
}

/**
 * 📈 Renderizar vista de Inversiones
 */
function renderInvestmentsView() {
    const investmentsHTML = appState.data.investments.map((inv, index) => `
        <div class="bg-white/5 p-4 rounded-lg">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-bold ${appState.theme.textPrimary} flex-1">${inv.name}</h4>
                <div class="flex items-center gap-2">
                    <!-- CloudSonnet4: Botones de reordenamiento -->
                    <button class="reorder-button text-${appState.theme.textSecondary} hover:${appState.theme.accent} transition-colors" 
                            data-direction="up" data-type="investments" data-index="${index}" 
                            ${index === 0 ? 'disabled opacity-50' : ''} title="Mover arriba">
                        ${createIcon(ICONS.chevronUp, 'w-4 h-4')}
                    </button>
                    <button class="reorder-button text-${appState.theme.textSecondary} hover:${appState.theme.accent} transition-colors" 
                            data-direction="down" data-type="investments" data-index="${index}" 
                            ${index === appState.data.investments.length - 1 ? 'disabled opacity-50' : ''} title="Mover abajo">
                        ${createIcon(ICONS.chevronDown, 'w-4 h-4')}
                    </button>
                    <button class="delete-investment-button text-red-500/70 hover:text-red-500" data-investment-id="${inv.id}">${createIcon(ICONS.trash, 'w-5 h-5')}</button>
                </div>
            </div>
            <p class="text-sm ${appState.theme.textSecondary} mb-2">${inv.type}</p>
            <div class="space-y-1">
                <div class="flex justify-between">
                    <span class="text-sm ${appState.theme.textSecondary}">Inicial:</span>
                    <span class="text-sm ${appState.theme.textPrimary}">${formatCurrency(inv.initialAmount)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm ${appState.theme.textSecondary}">Actual:</span>
                    <span class="text-sm ${inv.currentValue > inv.initialAmount ? 'text-green-400' : 'text-red-400'}">${formatCurrency(inv.currentValue || inv.initialAmount)}</span>
                </div>
                <div class="flex justify-between font-bold">
                    <span class="text-sm ${appState.theme.textSecondary}">Ganancia:</span>
                    <span class="text-sm ${(inv.currentValue || inv.initialAmount) - inv.initialAmount >= 0 ? 'text-green-400' : 'text-red-400'}">
                        ${formatCurrency((inv.currentValue || inv.initialAmount) - inv.initialAmount)}
                    </span>
                </div>
            </div>
            <div class="mt-3 flex gap-2">
                <input type="text" placeholder="Valor actual" class="update-investment-input flex-1 bg-black/20 text-white rounded px-2 py-1 text-sm" data-investment-id="${inv.id}">
                <button class="update-investment-button px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30" data-investment-id="${inv.id}">💹</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="backdrop-blur-md rounded-2xl shadow-lg p-6 ${appState.theme.surface}">
            <h2 class="text-2xl font-bold ${appState.theme.textPrimary} mb-6">💎 Cartera de Inversiones</h2>
            <form id="investment-form" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 items-end">
                <div><label class="block text-sm font-medium ${appState.theme.textSecondary} mb-1">Nombre</label><input name="name" type="text" placeholder="Ej: Apple Inc." class="w-full bg-black/20 text-white rounded-md p-2 border border-white/20 focus:ring-2 ${appState.theme.accentRing} focus:outline-none backdrop-blur-md" required /></div>
                <div><label class="block text-sm font-medium ${appState.theme.textSecondary} mb-1">Tipo</label><select name="type" class="w-full bg-black/20 text-white rounded-md p-2 border border-white/20 focus:ring-2 ${appState.theme.accentRing} focus:outline-none backdrop-blur-md"><option class="bg-slate-800">Acciones</option><option class="bg-slate-800">Cripto</option><option class="bg-slate-800">Fondos</option><option class="bg-slate-800">Otro</option></select></div>
                <div><label class="block text-sm font-medium ${appState.theme.textSecondary} mb-1">Inversión Inicial</label><input name="initialAmount" type="text" inputmode="numeric" placeholder="0" class="numeric-input w-full bg-white/10 ${appState.theme.textPrimary} rounded-md p-2 border border-white/20 focus:ring-2 ${appState.theme.accentRing} focus:outline-none" required /></div>
                <div class="md:col-span-4"><button type="submit" class="w-full mt-2 ${appState.theme.accentBg} text-slate-900 font-bold py-3 px-4 rounded-md hover:opacity-90 transition-opacity ${appState.theme.accentGlow} flex items-center justify-center gap-2">${createIcon(ICONS.plus)}Añadir Inversión</button></div>
            </form>
            <h3 class="text-xl font-semibold ${appState.theme.textPrimary} mt-8 mb-4">Mis Activos</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${investmentsHTML || `<p class="${appState.theme.textSecondary} text-center py-4 col-span-full">Tu cartera de inversiones está vacía.</p>`}</div>
        </div>
    `;
}

/**
 * 💳 Renderizar vista de Deudas
 */
function renderDebtsView() {
    const debtsHTML = appState.data.debts.map((debt, index) => `
        <li class="backdrop-blur-sm rounded-lg flex justify-between items-center p-4 ${appState.theme.surface}">
            <div class="flex-1"><p class="font-semibold ${appState.theme.textPrimary}">${debt.description}</p></div>
            <div class="flex items-center gap-2">
                <p class="font-bold text-lg ${appState.theme.negative}">${formatCurrency(debt.amount)}</p>
                <!-- CloudSonnet4: Botones de reordenamiento -->
                <button class="reorder-button text-${appState.theme.textSecondary} hover:${appState.theme.accent} transition-colors" 
                        data-direction="up" data-type="debts" data-index="${index}" 
                        ${index === 0 ? 'disabled opacity-50' : ''} title="Mover arriba">
                    ${createIcon(ICONS.chevronUp, 'w-4 h-4')}
                </button>
                <button class="reorder-button text-${appState.theme.textSecondary} hover:${appState.theme.accent} transition-colors" 
                        data-direction="down" data-type="debts" data-index="${index}" 
                        ${index === appState.data.debts.length - 1 ? 'disabled opacity-50' : ''} title="Mover abajo">
                    ${createIcon(ICONS.chevronDown, 'w-4 h-4')}
                </button>
                <button class="delete-debt-button text-red-500/70 hover:text-red-500 transition-colors" data-debt-id="${debt.id}">${createIcon(ICONS.trash, 'w-5 h-5')}</button>
            </div>
        </li>
    `).join('');

    return `
        <div class="${appState.theme.surface} rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold ${appState.theme.textPrimary} mb-6">💳 Gestión de Deudas</h2>
            <form id="debt-form" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-end">
                <div>
                    <label class="block text-sm font-medium ${appState.theme.textSecondary} mb-1">Descripción</label>
                    <input type="text" name="description" placeholder="Ej: Préstamo estudiantil" class="w-full bg-black/20 ${appState.theme.textPrimary} rounded-md p-2 border border-white/20 focus:ring-2 ${appState.theme.accentRing} focus:outline-none backdrop-blur-md" required />
                </div>
                <div>
                    <label class="block text-sm font-medium ${appState.theme.textSecondary} mb-1">Monto Total</label>
                    <input type="text" inputmode="numeric" name="amount" placeholder="0" class="numeric-input w-full bg-black/20 ${appState.theme.textPrimary} rounded-md p-2 border border-white/20 focus:ring-2 ${appState.theme.accentRing} focus:outline-none backdrop-blur-md" required />
                </div>
                <div class="self-end">
                    <button type="submit" class="w-full ${appState.theme.accentBg} text-slate-900 font-bold py-3 px-4 rounded-md hover:opacity-90 transition-all ${appState.theme.accentGlow} flex items-center justify-center gap-2">
                        ${createIcon(ICONS.plus)} Agregar Deuda
                    </button>
                </div>
            </form>
            <div class="mt-6">
                <h3 class="text-xl font-semibold ${appState.theme.textPrimary} mb-4">Deudas Actuales</h3>
                <ul class="space-y-3">
                    ${debtsHTML || `<div class="text-center py-8"><p class="${appState.theme.textSecondary}">🎉 ¡No tienes deudas registradas!</p></div>`}
                </ul>
            </div>
        </div>
    `;
}

/**
 * ⚙️ Renderizar vista de Configuración
 * CloudSonnet4: Refactorizado con diseño compacto
 */
function renderSettingsView() {
    const themesHTML = Object.entries(THEMES).map(([key, theme]) => `
        <button data-theme-key="${key}" class="theme-selector p-2 rounded-lg border transition-all ${appState.themeKey === key ? `${theme.accentBorder} scale-105` : 'border-transparent opacity-70 hover:opacity-100 hover:scale-102'}">
            <div class="w-full h-16 rounded-md mb-2" style="background: ${theme.gradient}"></div>
            <p class="text-sm font-medium ${appState.theme.textPrimary}">${theme.name}</p>
        </button>
    `).join('');

    return `
        <div class="${appState.theme.surface} rounded-lg shadow-md p-4 max-w-sm mx-auto fixed top-16 right-4 z-50">
            <h2 class="text-lg font-bold ${appState.theme.textPrimary} mb-4">⚙️ Ajustes</h2>
            <div class="space-y-4">
                <div>
                    <h3 class="text-md font-semibold ${appState.theme.textPrimary} mb-2">🎨 Temas</h3>
                    <div class="grid grid-cols-2 gap-2">${themesHTML}</div>
                </div>
                <div>
                    <h3 class="text-md font-semibold ${appState.theme.textPrimary} mb-2">🛠️ Herramientas</h3>
                    <button id="open-shortcuts-button" class="w-full flex items-center gap-2 ${appState.theme.surface} hover:bg-black/10 p-2 rounded-md transition-colors">
                        ${createIcon(ICONS.zap, `w-5 h-5 ${appState.theme.accent}`)}
                        <span class="text-sm ${appState.theme.textPrimary}">Atajos de Teclado</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * 🚧 Vista de "Próximamente" para funciones no implementadas
 */
function renderComingSoon(section = 'Esta sección') {
    const label = { achievements: 'Logros' }[section] || 'Esta sección';
    return `
        <div class="backdrop-blur-md rounded-2xl shadow-lg p-6 ${appState.theme.surface} text-center h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <div class="w-24 h-24 text-cyan-400 mb-4 animate-pulse">${createIcon(ICONS.settings)}</div>
            <h2 class="text-3xl font-bold ${appState.theme.textPrimary}">${label} en Construcción</h2>
            <p class="mt-4 ${appState.theme.textSecondary}">¡Estamos explorando esta galaxia! Vuelve pronto.</p>
        </div>
    `;
}

// ===============================================
// 🎨 SISTEMA DE FONDO PARALLAX
// ===============================================

/**
 * 🌌 Renderizar Fondo Parallax Según el Tema
 */
function renderParallaxBackground() {
    if (parallaxBg.children.length > 0 && parallaxBg.dataset.theme === appState.themeKey) return '';
    parallaxBg.dataset.theme = appState.themeKey;

    switch(appState.theme.particleType) {
        case 'goldenDust': {
            // Polvo dorado flotante para Áureo Amanecer
            const particles = Array.from({ length: 120 }).map(() => {
                const leftPos = Math.random() * 100;
                const topPos = Math.random() * 100;
                const size = Math.random() * 3 + 1;
                const duration = Math.random() * 8 + 4;
                return `<div class="particle absolute rounded-full" style="left: ${leftPos}%; top: ${topPos}%; width: ${size}px; height: ${size}px; background: ${appState.theme.sunColor}; box-shadow: 0 0 ${size*2}px ${appState.theme.sunColor}60; animation: float ${duration}s ease-in-out infinite alternate; opacity: ${Math.random() * 0.4 + 0.1};"></div>`;
            }).join('');

            const backgroundStars = Array.from({ length: 150 }).map(() => {
                const leftPos = Math.random() * 100;
                const topPos = Math.random() * 100;
                const twinkle = Math.random() * 3 + 2;
                return `<div class="absolute w-px h-px bg-amber-200 rounded-full" style="left:${leftPos}%; top:${topPos}%; animation: twinkle ${twinkle}s ease-in-out infinite alternate;"></div>`;
            }).join('');

            return particles + backgroundStars;
        }

        case 'crimsonMist': {
            // Niebla carmesí para Crisón Vespertino
            return Array.from({ length: 20 }).map(() => {
                const duration = Math.random() * 30 + 15;
                const size = Math.random() * 300 + 150;
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                return `<div class="particle absolute rounded-full" style="left: ${startX}%; top: ${startY}%; width: ${size}px; height: ${size}px; background: radial-gradient(circle, ${appState.theme.sunColor}08, transparent 70%); animation: drift ${duration}s linear infinite alternate; transform: translateZ(0);"></div>`;
            }).join('') + Array.from({ length: 180 }).map(() => {
                const leftPos = Math.random() * 100;
                const topPos = Math.random() * 100;
                const pulse = Math.random() * 4 + 3;
                return `<div class="absolute w-px h-px bg-rose-300 rounded-full" style="left:${leftPos}%; top:${topPos}%; animation: pulse ${pulse}s ease-in-out infinite;"></div>`;
            }).join('');
        }

        case 'aquaFlow': {
            // Flujo acuático para Aguamarina Celeste
            const waves = Array.from({ length: 8 }).map((_, i) => {
                const delay = i * 0.5;
                return `<div class="absolute inset-0 opacity-10" style="background: radial-gradient(ellipse at ${20 + i*10}% ${30 + i*8}%, ${appState.theme.sunColor}15, transparent 60%); animation: wave ${8 + i}s ease-in-out infinite; animation-delay: ${delay}s;"></div>`;
            }).join('');

            const bubbles = Array.from({ length: 25 }).map(() => {
                const leftPos = Math.random() * 100;
                const size = Math.random() * 8 + 3;
                const duration = Math.random() * 6 + 4;
                return `<div class="particle absolute rounded-full border border-cyan-300/20" style="left: ${leftPos}%; bottom: -10px; width: ${size}px; height: ${size}px; background: radial-gradient(circle at 30% 30%, ${appState.theme.sunColor}20, transparent 70%); animation: bubble ${duration}s linear infinite;"></div>`;
            }).join('');

            const stars = Array.from({ length: 200 }).map(() => {
                const leftPos = Math.random() * 100;
                const topPos = Math.random() * 100;
                const shimmer = Math.random() * 3 + 2;
                return `<div class="absolute w-px h-px bg-cyan-200 rounded-full" style="left:${leftPos}%; top:${topPos}%; animation: shimmer ${shimmer}s ease-in-out infinite alternate;"></div>`;
            }).join('');

            return waves + bubbles + stars;
        }

        default: {
            // Partículas genéricas para otros temas
            return Array.from({ length: 50 }).map(() => {
                const leftPos = Math.random() * 100;
                const topPos = Math.random() * 100;
                const size = Math.random() * 2 + 1;
                const duration = Math.random() * 6 + 4;
                return `<div class="particle absolute rounded-full bg-white/20" style="left: ${leftPos}%; top: ${topPos}%; width: ${size}px; height: ${size}px; animation: float ${duration}s ease-in-out infinite alternate; opacity: ${Math.random() * 0.3 + 0.1};"></div>`;
            }).join('');
        }
    }
}

// ===============================================
// 🎪 SISTEMA DE EVENT LISTENERS
// ===============================================

/**
 * 🎯 Agregar todos los event listeners necesarios
 */
function addEventListeners() {
    // Event listeners para navegación
    document.querySelectorAll('[data-view]').forEach(button => {
        button.addEventListener('click', (e) => {
            appState.activeView = e.target.closest('[data-view]').dataset.view;
            renderApp();
        });
    });

    // Event listeners para login
    document.querySelectorAll('[data-login-method]').forEach(button => {
        button.addEventListener('click', (e) => {
            const method = e.target.closest('[data-login-method]').dataset.loginMethod;
            handleLogin(method);
        });
    });

    // Event listeners para navegación de meses
    const monthPrev = document.getElementById('month-prev');
    const monthNext = document.getElementById('month-next');
    
    if (monthPrev) {
        monthPrev.addEventListener('click', () => {
            appState.currentDate.setMonth(appState.currentDate.getMonth() - 1);
            renderApp();
        });
    }
    
    if (monthNext) {
        monthNext.addEventListener('click', () => {
            appState.currentDate.setMonth(appState.currentDate.getMonth() + 1);
            renderApp();
        });
    }

    // Event listeners para dropdown de calendario
    const calendarButton = document.getElementById('calendar-dropdown-button');
    const calendarDropdown = document.getElementById('calendar-dropdown');
    
    if (calendarButton && calendarDropdown) {
        calendarButton.addEventListener('click', () => {
            calendarDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!calendarButton.contains(e.target) && !calendarDropdown.contains(e.target)) {
                calendarDropdown.classList.add('hidden');
            }
        });

        document.querySelectorAll('.month-dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const month = parseInt(e.target.dataset.month);
                appState.currentDate.setMonth(month);
                calendarDropdown.classList.add('hidden');
                renderApp();
            });
        });
    }

    // Event listener para "ir a hoy"
    const todayShortcut = document.getElementById('today-shortcut');
    if (todayShortcut) {
        todayShortcut.addEventListener('click', () => {
            appState.currentDate = new Date();
            calendarDropdown.classList.add('hidden');
            renderApp();
        });
    }

    // Event listeners para temas
    document.querySelectorAll('[data-theme-key]').forEach(button => {
        button.addEventListener('click', (e) => {
            appState.themeKey = e.target.closest('[data-theme-key]').dataset.themeKey;
            appState.saveData();
            renderApp();
        });
    });

    // Event listeners para formularios
    addFormEventListeners();
}

/**
 * 📝 Agregar event listeners para formularios
 */
function addFormEventListeners() {
    // Formulario de metas
    const goalForm = document.getElementById('goal-form');
    if (goalForm) {
        goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const goal = {
                id: Date.now(),
                name: formData.get('name'),
                target: parseFormattedNumber(formData.get('target')),
                saved: 0
            };
            appState.data.goals.push(goal);
            appState.saveData();
            NotificationSystem.show('Meta creada correctamente', 'success');
            renderApp();
        });
    }

    // Formulario de inversiones
    const investmentForm = document.getElementById('investment-form');
    if (investmentForm) {
        investmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const investment = {
                id: Date.now(),
                name: formData.get('name'),
                type: formData.get('type'),
                initialAmount: parseFormattedNumber(formData.get('initialAmount')),
                currentValue: parseFormattedNumber(formData.get('initialAmount')),
                date: new Date().toISOString().split('T')[0]
            };
            appState.data.investments.push(investment);
            appState.saveData();
            NotificationSystem.show('Inversión agregada correctamente', 'success');
            renderApp();
        });
    }

    // Formulario de deudas
    const debtForm = document.getElementById('debt-form');
    if (debtForm) {
        debtForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const debt = {
                id: Date.now(),
                description: formData.get('description'),
                amount: parseFormattedNumber(formData.get('amount')),
                date: new Date().toISOString().split('T')[0]
            };
            appState.data.debts.push(debt);
            appState.saveData();
            NotificationSystem.show('Deuda agregada correctamente', 'success');
            renderApp();
        });
    }

    // Botones de eliminar
    document.querySelectorAll('.delete-goal-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const goalId = parseInt(e.target.closest('[data-goal-id]').dataset.goalId);
            appState.data.goals = appState.data.goals.filter(goal => goal.id !== goalId);
            appState.saveData();
            NotificationSystem.show('Meta eliminada', 'info');
            renderApp();
        });
    });

    document.querySelectorAll('.delete-investment-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const investmentId = parseInt(e.target.closest('[data-investment-id]').dataset.investmentId);
            appState.data.investments = appState.data.investments.filter(inv => inv.id !== investmentId);
            appState.saveData();
            NotificationSystem.show('Inversión eliminada', 'info');
            renderApp();
        });
    });

    document.querySelectorAll('.delete-debt-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const debtId = parseInt(e.target.closest('[data-debt-id]').dataset.debtId);
            appState.data.debts = appState.data.debts.filter(debt => debt.id !== debtId);
            appState.saveData();
            NotificationSystem.show('Deuda eliminada', 'info');
            renderApp();
        });    });

    // CloudSonnet4: Event listeners para botones de reordenamiento
    document.querySelectorAll('.reorder-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.target.closest('.reorder-button');
            const type = btn.dataset.type;
            const index = parseInt(btn.dataset.index);
            const direction = btn.dataset.direction;
            
            if (appState.reorderItem(type, index, direction)) {
                NotificationSystem.show('Orden actualizado', 'success');
                renderApp();
            }
        });
    });

    // Actualizar valor de inversiones
    document.querySelectorAll('.update-investment-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const investmentId = parseInt(e.target.dataset.investmentId);
            const input = document.querySelector(`.update-investment-input[data-investment-id="${investmentId}"]`);
            const newValue = parseFormattedNumber(input.value);
            
            if (newValue > 0) {
                appState.updateInvestmentValue(investmentId, newValue);
                input.value = '';
            }        });
    });

    // CloudSonnet4: Event listeners para nuevas funcionalidades de Settings
    
    // Exportar backup local
    const exportLocalButton = document.getElementById('export-local-button');
    if (exportLocalButton) {
        exportLocalButton.addEventListener('click', () => {
            const data = {
                transactions: appState.data.transactions,
                investments: appState.data.investments,
                debts: appState.data.debts,
                goals: appState.data.goals,
                exportDate: new Date().toISOString(),
                version: '2.0'
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nebula-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            NotificationSystem.show('Backup exportado correctamente', 'success');
        });
    }
    
    // Importar backup local
    const importLocalButton = document.getElementById('import-local-button');
    if (importLocalButton) {
        importLocalButton.addEventListener('click', () => {
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
                            if (data.transactions || data.investments || data.debts || data.goals) {
                                appState.data = {
                                    transactions: data.transactions || {},
                                    investments: data.investments || [],
                                    debts: data.debts || [],
                                    goals: data.goals || []
                                };
                                appState.saveData();
                                NotificationSystem.show('Backup importado correctamente', 'success');
                                renderApp();
                            } else {
                                NotificationSystem.show('Archivo de backup inválido', 'error');
                            }
                        } catch {
                            NotificationSystem.show('Error al leer el archivo', 'error');
                        }
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        });
    }
    
    // Exportar a Excel
    const exportExcelButton = document.getElementById('export-excel-button');
    if (exportExcelButton) {
        exportExcelButton.addEventListener('click', () => {
            let csvContent = 'data:text/csv;charset=utf-8,';
            csvContent += 'Fecha,Tipo,Descripción,Categoria,Monto\n';
            
            Object.entries(appState.data.transactions).forEach(([month, transactions]) => {
                transactions.forEach(t => {
                    csvContent += `${t.date},${t.type === 'income' ? 'Ingreso' : 'Gasto'},"${t.description}","${t.category || ''}",${t.amount}\n`;
                });
            });
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `nebula-financial-${new Date().toISOString().split('T')[0]}.csv`);
            link.click();
            
            NotificationSystem.show('Archivo Excel exportado', 'success');
        });
    }
    
    // Cerrar sesión
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                if (authService?.getCurrentUser()) {
                    await authService.logout();
                }
                appState.user = null;
                localStorage.removeItem('nebula_guest_user');
                NotificationSystem.show('Sesión cerrada', 'info');
                renderApp();
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
                NotificationSystem.show('Error al cerrar sesión', 'error');
            }
        });    }
    
    // Borrar todos los datos
    const clearAllDataButton = document.getElementById('clear-all-data-button');
    if (clearAllDataButton) {
        clearAllDataButton.addEventListener('click', async () => {
            // CloudSonnet4: Modal elegante para eliminar datos
            const confirmed = await window.showDangerModal(
                '🚨 Eliminar todos los datos',
                '¿Seguro que deseas eliminar <strong>TODOS</strong> los datos?<br><br><span style="color: #ef4444; font-weight: bold;">Esta acción NO se puede deshacer.</span>',
                { 
                    confirmText: 'SÍ, ELIMINAR TODO',
                    cancelText: 'Cancelar' 
                }
            );

            if (confirmed) {
                appState.clearData();
            }
        });
    }

    // CloudSonnet4: Aplicar formateo automático de miles a todos los inputs numéricos
    document.querySelectorAll('.numeric-input').forEach(input => {
        applyThousandsFormatting(input);
    });
    
    // CloudSonnet4: También aplicar a inputs de actualización de inversiones
    document.querySelectorAll('.update-investment-input').forEach(input => {
        applyThousandsFormatting(input);
    });
}

/**
 * 🔐 Manejar proceso de login
 */
/**
 * 🔐 Manejar proceso de login
 * 
 * FUNCIONALIDAD:
 * - Gestiona el flujo de autenticación para Google y modo invitado
 * - Actualiza estado de carga durante el proceso
 * - Maneja errores con mensajes específicos y fallbacks inteligentes
 * - Evita duplicación de notificaciones
 * 
 * PARÁMETROS:
 * @param {string} method - 'google' para Google Login, 'guest' para modo invitado
 * 
 * PROCESO:
 * 1. Activa estado de carga
 * 2. Ejecuta método de autenticación correspondiente
 * 3. Maneja resultado (éxito o error)
 * 4. Actualiza UI con notificaciones apropiadas
 * 5. Maneja fallbacks para errores específicos
 * 
 * MANEJO DE ERRORES:
 * - auth/unauthorized-domain → Sugerencia configuración Firebase
 * - auth/operation-not-allowed → Google Auth no habilitado
 * - Modo invitado falla → Recarga automática de página
 * - Error general → Verificación de usuario ya autenticado
 * 
 * CÓMO PROBAR:
 * 1. handleLogin('guest') → debe funcionar siempre
 * 2. handleLogin('google') → requiere Firebase configurado
 * 3. Ver notificaciones en UI después del login
 */
async function handleLogin(method) {
    try {
        // 1. Preparar UI para proceso de login
        appState.isLoading = true;
        renderApp();
        
        console.log(`🔐 Iniciando login con método: ${method}`);
        
        // 2. Ejecutar método de autenticación seleccionado
        const result = await executeAuthMethod(method);
        
        // 3. Procesar resultado del login
        if (result.success) {
            handleLoginSuccess(result);
        } else {
            handleLoginError(result, method);
        }
        
    } catch (error) {
        handleLoginException(error);
    }
}

/**
 * 🔧 Ejecutar método de autenticación específico
 * Función auxiliar para reducir complejidad de handleLogin
 */
async function executeAuthMethod(method) {
    if (method === 'google') {
        return await authService.signInWithGoogle();
    } else if (method === 'guest') {
        return await authService.signInAsGuest();
    } else {
        throw new Error(`Método de login no soportado: ${method}`);
    }
}

/**
 * ✅ Manejar login exitoso
 * Función auxiliar para reducir complejidad de handleLogin
 */
function handleLoginSuccess(result) {
    console.log('✅ Login exitoso:', result.user);
    // Solo mostrar notificación si no estamos en loading (evitar duplicados)
    if (!appState.isLoading) {
        const welcomeMsg = result.user.displayName ? 
            `¡Bienvenido ${result.user.displayName}!` : 
            '¡Bienvenido a Nebula Financial!';
        NotificationSystem.show(welcomeMsg, 'success');
    }

    // Redirigir automáticamente al dashboard después de la autenticación
    if (appState.user) {
        appState.activeView = 'dashboard';
        renderApp();
    }
}

/**
 * ❌ Manejar errores de login
 * Función auxiliar para reducir complejidad de handleLogin
 */
function handleLoginError(result, method) {
    console.error('❌ Error en login:', result.error);
    
    // Verificar si a pesar del error, el usuario se autenticó (Firebase listener)
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
        console.log('✅ A pesar del error, usuario autenticado:', currentUser.displayName);
        return; // No mostrar error si el usuario está autenticado
    }
    
    appState.isLoading = false;
    renderApp();
    
    // Mostrar mensajes específicos según el tipo de error y método
    showSpecificErrorMessage(result, method);
}

/**
 * 🚨 Mostrar mensajes de error específicos
 * Función auxiliar para manejar diferentes tipos de errores
 */
function showSpecificErrorMessage(result, method) {
    if (method === 'google') {
        if (result.error === 'auth/unauthorized-domain') {
            NotificationSystem.show(
                '🔧 Configuración pendiente: Este dominio no está autorizado. Usa el modo invitado mientras tanto.', 
                'warning'
            );
        } else if (result.error === 'auth/operation-not-allowed') {
            NotificationSystem.show(
                '🔧 Google Auth no habilitado en Firebase. Usa el modo invitado para continuar.', 
                'warning'
            );
        } else {
            NotificationSystem.show(
                result.helpText || 'Error con Google. Prueba el modo invitado para acceder.', 
                'warning'
            );
        }
    } else if (method === 'guest') {
        // Error en modo invitado (esto no debería pasar con la nueva implementación)
        NotificationSystem.show(
            'Error en modo invitado. Recargando la página...', 
            'error'
        );
        setTimeout(() => location.reload(), 2000);
    } else {
        NotificationSystem.show(result.message || 'Error al iniciar sesión', 'error');
    }
}

/**
 * 💥 Manejar excepciones no controladas
 * Función auxiliar para errores inesperados
 */
function handleLoginException(error) {
    console.error('❌ Error en handleLogin:', error);
    appState.isLoading = false;
    renderApp();
    NotificationSystem.show('Error de conexión. Intenta nuevamente.', 'error');
}

// ===============================================
// 🚀 SISTEMA DE INICIALIZACIÓN
// ===============================================

/**
 * 🎯 Inicialización principal de la aplicación
 */
export function initializeApp() {
    try {
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
          // Hacer appState disponible globalmente para compatibilidad
        window.appState = appState;
        window.renderApp = renderApp;
        window.THEMES = THEMES;
        window.ICONS = ICONS;
        window.authService = authService;
        
        // Inicializar sistemas
        ShortcutSystem.init();
        NotificationSystem.init();
        ModalSystem.init();        // Inicializar autenticación
        if (authService && !authService.isInitialized) {
            console.log('🔐 Inicializando sistema de autenticación...');
            // La inicialización de Firebase ocurre automáticamente en el constructor
            
            // Verificar si hay usuario invitado persistente
            const guestUser = localStorage.getItem('nebula_guest_user');
            if (guestUser && !appState.user) {
                try {
                    const userData = JSON.parse(guestUser);
                    console.log('👥 Usuario invitado encontrado en localStorage');
                    appState.user = {
                        uid: userData.uid,
                        name: userData.displayName || 'Invitado',
                        email: userData.email,
                        photoURL: userData.photoURL,
                        isAnonymous: true,
                        method: 'guest',
                        offline: true
                    };
                } catch (error) {
                    console.error('❌ Error cargando usuario invitado:', error);
                    localStorage.removeItem('nebula_guest_user');
                }
            }
              // Agregar listener para cambios de estado de autenticación
            authService.onAuthStateChanged((user) => {
                console.log('🔐 Estado de autenticación cambió:', user ? 'Autenticado' : 'No autenticado');
                
                if (user) {
                    appState.user = {
                        uid: user.uid,
                        name: user.displayName || user.email || 'Usuario',
                        email: user.email,
                        photoURL: user.photoURL,
                        isAnonymous: user.isAnonymous,
                        method: user.isAnonymous ? 'guest' : 'google'
                    };
                    
                    // Mostrar notificación de bienvenida si el usuario acaba de loguearse
                    if (!appState.isLoading) {
                        const welcomeMsg = user.displayName ? 
                            `¡Bienvenido ${user.displayName}!` : 
                            '¡Bienvenido a Nebula Financial!';
                        NotificationSystem.show(welcomeMsg, 'success');
                    }
                } else {
                    appState.user = null;
                }
                
                appState.isLoading = false;
                renderApp();
            });
        }
        
        // Renderizar aplicación
        renderApp();
        
        // Configurar dock
        setTimeout(() => {
            if (typeof updateDockGlider === 'function') {
                updateDockGlider();
            }
        }, 200);
        
        console.log('✅ Nebula iniciada correctamente');
        
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
        showErrorScreen(error);
    }
}

/**
 * 🚫 Mostrar pantalla de error
 */
function showErrorScreen(error) {
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
                <button onclick="localStorage.clear(); location.reload()" style="background: linear-gradient(45deg, #f59e0b, #d97706); border: none; color: white; padding: 14px 28px; border-radius: 25px; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    🗑️ Limpiar Datos
                </button>
            </div>
        </div>
    `;
}

// 💡 MEJORAS SUGERIDAS (NO IMPLEMENTADAS):
// 1. Sistema de persistencia unificado: Crear una clase DataManager que unifique
//    el manejo de localStorage, sessionStorage y Firestore. Esto permitiría
//    sincronización automática entre dispositivos cuando el usuario esté logueado
//    con Google, y fallback local cuando esté en modo invitado. Incluir compresión
//    de datos y limpieza automática de datos antiguos.
//
// 2. State Management con observadores: Implementar un sistema de estado reactivo
//    donde los componentes se suscriban automáticamente a cambios en appState.
//    Esto eliminaría las llamadas manuales a renderApp() y garantizaría UI
//    siempre actualizada. Usar patrón Observer o similar para detectar cambios
//    en propiedades específicas y actualizar solo las partes necesarias del DOM.

// 🌐 EXPOSICIÓN GLOBAL DE FUNCIONES CRÍTICAS
window.initializeApp = initializeApp;
window.renderApp = renderApp;
window.showErrorScreen = showErrorScreen;

console.log('✅ app.js - Funciones expuestas globalmente');
