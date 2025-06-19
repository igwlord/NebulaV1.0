/**
 * 🌌 NEBULA FINANCIAL - MINIMAL CALENDAR SYSTEM
 * ============================================
 * Calendario minimalista y elegante, completamente integrado con Nebula:
 * - Diseño super simple y atractivo
 * - Perfecta integración visual con el tema
 * - UX fluida y responsive
 * - Vista de 12 meses optimizada
 */

class NebulaMinimalCalendar {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.today = new Date();
        this.dataStatus = new Map();
        this.isVisible = false;
        
        this.initializeDataStatus();
    }    /**
     * 🎨 Obtener tema simplificado
     */
    getTheme() {
        return {
            primary: '#FCD34D',
            primaryRgb: '252, 211, 77',
            surface: 'bg-black/90 border border-amber-200/20 backdrop-blur-xl',
            card: 'bg-white/5 border border-white/10 hover:bg-white/10',
            text: 'text-amber-50',
            textSoft: 'text-amber-200/80',
            textMuted: 'text-white/40',
            accent: 'bg-amber-400/30 border-amber-400/80 text-amber-100',
            hasData: 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300',
            noData: 'bg-white/5 border-white/20 text-white/60',
            today: 'bg-blue-500/30 border-blue-400 text-blue-100 shadow-lg shadow-blue-500/30',
            glow: 'shadow-[0_0_30px_rgba(252,211,77,0.6)]'
        };
    }

    /**
     * 📊 Inicializar datos
     */
    initializeDataStatus() {
        try {
            const appState = window.appState || {};
            const allData = [
                ...(appState.data?.income || []),
                ...(appState.data?.expenses || []),
                ...(appState.data?.investments || []),
                ...(appState.data?.debts || [])
            ];

            this.dataStatus.clear();
            allData.forEach(item => {
                if (item.date) {
                    const dateKey = new Date(item.date).toDateString();
                    this.dataStatus.set(dateKey, true);
                }
            });
        } catch (error) {
            console.warn('⚠️ Error en datos del calendario:', error);
        }
    }

    /**
     * 🎯 Verificar si una fecha tiene datos
     */
    hasDataForDate(date) {
        return this.dataStatus.has(date.toDateString());
    }

    /**
     * 📅 Nombres de meses cortos
     */
    getMonthNames() {
        return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    }    /**
     * 🎯 Renderizar un mes minimalista con mejoras visuales
     */
    renderMonth(monthIndex) {
        const theme = this.getTheme();
        const monthNames = this.getMonthNames();
        const daysInMonth = new Date(this.currentYear, monthIndex + 1, 0).getDate();
        const firstDay = new Date(this.currentYear, monthIndex, 1).getDay();
        
        let monthHasData = false;
        let monthDataDays = 0;

        // Crear grid de días con mejor UX
        let daysHtml = '';
        
        // Días vacíos al inicio con mejor espaciado
        for (let i = 0; i < firstDay; i++) {
            daysHtml += '<div class="w-6 h-6 opacity-30"></div>';
        }
        
        // Días del mes con indicadores mejorados
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, monthIndex, day);
            const hasData = this.hasDataForDate(date);
            const isToday = date.toDateString() === this.today.toDateString();
            
            if (hasData) {
                monthHasData = true;
                monthDataDays++;
            }
            
            let dayClass = 'day-cell w-6 h-6 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 cursor-pointer relative group ';
            
            if (isToday) {
                dayClass += theme.today + ' ring-1 ring-blue-400/80 pulse-glow';
            } else if (hasData) {
                dayClass += theme.hasData + ' hover:scale-110 hover:bg-emerald-400/30';
            } else {
                dayClass += theme.noData + ' hover:bg-white/15 hover:scale-105';
            }
            
            // Tooltip mejorado
            const tooltip = isToday ? 'Hoy' : hasData ? 'Tiene datos' : 'Sin datos';
            
            daysHtml += `
                <div class="${dayClass}" 
                     title="${date.toLocaleDateString()} - ${tooltip}"
                     data-date="${date.toISOString()}">
                    ${day}
                    ${hasData ? '<div class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>' : ''}
                </div>
            `;
        }

        // Calcular progreso del mes
        const progressPercent = monthHasData ? Math.round((monthDataDays / daysInMonth) * 100) : 0;

        // Indicador de estado del mes con gradientes
        const monthStatusClass = monthHasData ? 
            'border-emerald-400/50 bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/15' : 
            'border-white/20 bg-gradient-to-br from-white/5 to-white/2 hover:from-white/10 hover:to-white/5';        return `
            <div class="group month-card ${theme.card} rounded-2xl p-5 transition-all duration-200 ${monthStatusClass} relative overflow-hidden"
                 onclick="nebulaMinimalCalendar.goToMonth(${monthIndex})">
                
                <!-- Efecto de brillo sutil sin movimiento -->
                <div class="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                
                <!-- Header del mes mejorado -->
                <div class="flex items-center justify-between mb-4 relative z-10">
                    <h3 class="${theme.text} font-semibold text-base tracking-wide">${monthNames[monthIndex]}</h3>
                    <div class="flex items-center space-x-2">
                        ${monthHasData ? `
                            <div class="flex items-center space-x-1">
                                <div class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                                <span class="text-emerald-300 text-sm font-bold">${monthDataDays}</span>
                            </div>
                        ` : `
                            <div class="w-3 h-3 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors"></div>
                        `}
                    </div>
                </div>
                
                <!-- Mini grid de días mejorado -->
                <div class="grid grid-cols-7 gap-1.5 mb-4 relative z-10">
                    ${daysHtml}
                </div>
                
                <!-- Barra de progreso del mes -->
                ${monthHasData ? `
                    <div class="mb-3 relative z-10">
                        <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500" 
                                 style="width: ${progressPercent}%"></div>
                        </div>
                        <div class="flex justify-between mt-1 text-xs ${theme.textMuted}">
                            <span>${progressPercent}% activo</span>
                            <span>${daysInMonth - monthDataDays} días libres</span>
                        </div>
                    </div>
                ` : ''}
                
                <!-- Footer con info mejorada -->
                <div class="pt-3 border-t border-white/10 relative z-10">
                    <div class="flex items-center justify-between">
                        <span class="${theme.textMuted} text-xs">
                            ${monthHasData ? `${monthDataDays} registros` : 'Sin datos'}
                        </span>
                        <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-2 h-2 rounded-full bg-amber-400"></div>
                            <span class="text-amber-300 text-xs">Click para explorar</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }    /**
     * 🎯 Renderizar modal principal ultra minimalista
     */
    render() {
        const theme = this.getTheme();
        const monthsHtml = Array.from({length: 12}, (_, i) => this.renderMonth(i)).join('');
        
        // Calcular estadísticas globales
        const totalDaysWithData = this.dataStatus.size;
        const activeMonths = this.getActiveMonthsCount();
        
        return `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn" 
                 onclick="this.remove()" data-calendar-overlay>
                  <!-- Container principal elegante y simple -->
                <div class="w-full max-w-7xl max-h-[95vh] glass-morphism rounded-3xl overflow-hidden nebula-glow animate-slideUp"
                     onclick="event.stopPropagation()">
                    
                    <!-- Header limpio -->
                    <div class="p-6 border-b border-white/20 bg-gradient-to-r from-white/8 via-white/4 to-transparent relative">
                        
                        <div class="flex items-center justify-between relative z-10">
                            
                            <!-- Título simple -->
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 rounded-full bg-amber-400 animate-pulse"></div>
                                <h2 class="${theme.text} text-3xl font-light tracking-wide">
                                    Calendario ${this.currentYear}
                                </h2>
                                <div class="hidden sm:flex items-center space-x-4 text-sm ${theme.textSoft}">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                                        <span>${totalDaysWithData} días activos</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span>${activeMonths} meses con datos</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Controles premium -->
                            <div class="flex items-center space-x-3">
                                
                                <!-- Selector de año elegante -->
                                <div class="flex items-center space-x-3 bg-black/30 rounded-2xl p-2 border border-white/20">
                                    <button onclick="nebulaMinimalCalendar.changeYear(-1)" 
                                            class="w-10 h-10 rounded-xl bg-white/10 ${theme.textSoft} hover:${theme.text} hover:bg-white/20 transition-all flex items-center justify-center group">
                                        <span class="text-lg group-hover:scale-125 transition-transform">‹</span>
                                    </button>
                                    <span class="${theme.text} text-xl font-medium min-w-[80px] text-center tracking-wider">${this.currentYear}</span>
                                    <button onclick="nebulaMinimalCalendar.changeYear(1)" 
                                            class="w-10 h-10 rounded-xl bg-white/10 ${theme.textSoft} hover:${theme.text} hover:bg-white/20 transition-all flex items-center justify-center group">
                                        <span class="text-lg group-hover:scale-125 transition-transform">›</span>
                                    </button>
                                </div>
                                
                                <!-- Botón Ir a hoy -->
                                <button onclick="nebulaMinimalCalendar.goToToday()" 
                                        class="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600/80 to-blue-500/80 ${theme.text} text-sm font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 border border-blue-400/30">
                                    <span class="flex items-center space-x-2">
                                        <div class="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></div>
                                        <span>Hoy</span>
                                    </span>
                                </button>
                                
                                <!-- Cerrar elegante -->
                                <button onclick="nebulaMinimalCalendar.hide()" 
                                        class="w-12 h-12 rounded-2xl bg-white/10 ${theme.textSoft} hover:text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center group border border-white/20">
                                    <span class="text-2xl group-hover:scale-125 transition-transform">×</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contenido principal -->
                    <div class="flex-1 overflow-hidden">
                        <div class="p-6 overflow-y-auto max-h-[calc(95vh-140px)] custom-scrollbar">
                            
                            <!-- Grid de meses premium -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                ${monthsHtml}
                            </div>
                              <!-- Panel de estadísticas simple y elegante -->
                            <div class="mt-8 p-6 rounded-2xl glass-morphism border border-white/20 relative">
                                
                                <div class="relative z-10">
                                    <h3 class="${theme.text} text-lg font-semibold mb-4 flex items-center">
                                        <div class="w-3 h-3 rounded-full bg-amber-400 mr-3"></div>
                                        Resumen del año
                                    </h3>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        
                                        <!-- Días activos -->
                                        <div class="text-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
                                            <div class="flex items-center justify-center space-x-2 mb-2">
                                                <div class="w-4 h-4 rounded-full bg-emerald-400 emerald-glow"></div>
                                                <span class="${theme.textSoft} text-sm font-medium">Días con datos</span>
                                            </div>
                                            <div class="text-2xl font-bold text-emerald-300">${totalDaysWithData}</div>
                                            <div class="text-xs ${theme.textMuted}">de 365 días</div>
                                        </div>
                                        
                                        <!-- Meses activos -->
                                        <div class="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-400/30">
                                            <div class="flex items-center justify-center space-x-2 mb-2">
                                                <div class="w-4 h-4 rounded-full bg-blue-400"></div>
                                                <span class="${theme.textSoft} text-sm font-medium">Meses activos</span>
                                            </div>
                                            <div class="text-2xl font-bold text-blue-300">${activeMonths}</div>
                                            <div class="text-xs ${theme.textMuted}">de 12 meses</div>
                                        </div>
                                        
                                        <!-- Cobertura -->
                                        <div class="text-center p-4 rounded-xl bg-amber-500/10 border border-amber-400/30">
                                            <div class="flex items-center justify-center space-x-2 mb-2">
                                                <div class="w-4 h-4 rounded-full bg-amber-400"></div>
                                                <span class="${theme.textSoft} text-sm font-medium">Cobertura</span>
                                            </div>
                                            <div class="text-2xl font-bold text-amber-300">${Math.round((totalDaysWithData/365)*100)}%</div>
                                            <div class="text-xs ${theme.textMuted}">del año</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Leyenda mejorada -->
                                    <div class="mt-6 pt-4 border-t border-white/20">
                                        <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
                                            <div class="flex items-center space-x-2">
                                                <div class="w-3 h-3 rounded-full bg-emerald-400 emerald-glow"></div>
                                                <span class="${theme.textSoft}">Con registros</span>
                                            </div>
                                            <div class="flex items-center space-x-2">
                                                <div class="w-3 h-3 rounded-full bg-white/30"></div>
                                                <span class="${theme.textSoft}">Sin datos</span>
                                            </div>
                                            <div class="flex items-center space-x-2">
                                                <div class="w-3 h-3 rounded-full bg-blue-400 pulse-glow"></div>
                                                <span class="${theme.textSoft}">Hoy</span>
                                            </div>
                                            <div class="flex items-center space-x-2">
                                                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                                                <span class="${theme.textSoft}">Clickeable</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 🎯 Mostrar calendario
     */
    show() {
        if (this.isVisible) return;
        
        this.initializeDataStatus();
        this.isVisible = true;
        
        // Crear modal
        const modal = document.createElement('div');
        modal.innerHTML = this.render();
        modal.className = 'nebula-calendar-modal';
        document.body.appendChild(modal);
        
        // Agregar estilos de animación si no existen
        this.addAnimationStyles();
        
        console.log('🌌 Calendario Nebula abierto');
    }

    /**
     * 🎯 Ocultar calendario
     */
    hide() {
        const modal = document.querySelector('.nebula-calendar-modal');
        if (modal) {
            modal.remove();
        }
        this.isVisible = false;
        console.log('🌌 Calendario Nebula cerrado');
    }

    /**
     * 🎯 Cambiar año
     */
    changeYear(delta) {
        this.currentYear += delta;
        this.refreshCalendar();
    }    /**
     * 🎯 Ir a hoy con enfoque automático
     */
    goToToday() {
        this.currentYear = this.today.getFullYear();
        this.refreshCalendar();
        
        // Auto-seleccionar y enfocar el mes actual después de refrescar
        setTimeout(() => {
            const currentMonth = this.today.getMonth();
            this.goToMonth(currentMonth);
            
            // Scroll suave al mes actual
            const monthCards = document.querySelectorAll('.month-card');
            if (monthCards[currentMonth]) {
                monthCards[currentMonth].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 200);
    }/**
     * 🎯 Ir a un mes específico con información detallada
     */
    goToMonth(monthIndex) {
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        const monthDetails = this.getMonthDetails(monthIndex);
        
        // Mostrar notificación elegante con detalles
        if (window.showNotification) {
            const message = monthDetails.daysWithData > 0 ? 
                `📅 ${monthNames[monthIndex]} ${this.currentYear}\n💾 ${monthDetails.daysWithData} días con datos (${monthDetails.coverage}% cobertura)` :
                `📅 ${monthNames[monthIndex]} ${this.currentYear}\n📝 Sin registros este mes`;
            
            window.showNotification(message, monthDetails.daysWithData > 0 ? 'success' : 'info');
        }
        
        // Efecto visual en el mes seleccionado
        this.highlightMonth(monthIndex);
        
        console.log(`🌌 Mes seleccionado: ${monthNames[monthIndex]} ${this.currentYear}`, monthDetails);
    }

    /**
     * 🎨 Destacar visualmente un mes
     */
    highlightMonth(monthIndex) {
        // Remover highlight anterior
        document.querySelectorAll('.month-highlighted').forEach(el => {
            el.classList.remove('month-highlighted');
        });
        
        // Agregar highlight al mes actual
        setTimeout(() => {
            const monthCards = document.querySelectorAll('[onclick*="goToMonth"]');
            if (monthCards[monthIndex]) {
                monthCards[monthIndex].classList.add('month-highlighted');
                monthCards[monthIndex].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Remover highlight después de 3 segundos
                setTimeout(() => {
                    monthCards[monthIndex].classList.remove('month-highlighted');
                }, 3000);
            }
        }, 100);
    }

    /**
     * 🎯 Contar días con datos en un mes
     */
    getMonthDataCount(monthIndex) {
        let count = 0;
        const daysInMonth = new Date(this.currentYear, monthIndex + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, monthIndex, day);
            if (this.hasDataForDate(date)) {
                count++;
            }
        }
        
        return count;
    }

    /**
     * 🎯 Contar meses activos
     */
    getActiveMonthsCount() {
        const activeMonths = new Set();
        
        for (const dateString of this.dataStatus.keys()) {
            const date = new Date(dateString);
            if (date.getFullYear() === this.currentYear) {
                activeMonths.add(date.getMonth());
            }
        }
        
        return activeMonths.size;
    }

    /**
     * 🎯 Obtener datos detallados de un mes
     */
    getMonthDetails(monthIndex) {
        const details = {
            daysWithData: 0,
            totalDays: new Date(this.currentYear, monthIndex + 1, 0).getDate(),
            dataPoints: []
        };
        
        for (let day = 1; day <= details.totalDays; day++) {
            const date = new Date(this.currentYear, monthIndex, day);
            if (this.hasDataForDate(date)) {
                details.daysWithData++;
                details.dataPoints.push(day);
            }
        }
        
        details.coverage = Math.round((details.daysWithData / details.totalDays) * 100);
        
        return details;
    }

    /**
     * 🎯 Actualizar calendario
     */
    refreshCalendar() {
        if (!this.isVisible) return;
        
        const modal = document.querySelector('.nebula-calendar-modal');
        if (modal) {
            modal.innerHTML = this.render();
        }
    }    /**
     * 🎨 Agregar estilos de animación avanzados
     */
    addAnimationStyles() {
        if (document.querySelector('#nebula-calendar-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'nebula-calendar-styles';
        styles.textContent = `
            /* Animaciones de entrada */            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { 
                    opacity: 0; 
                    transform: translateY(20px) scale(0.98); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            
            @keyframes pulseGlow {
                0%, 100% { 
                    box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
                }
                50% { 
                    box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
                }
            }
            
            /* Clases de animación simplificadas */
            .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
            }
            
            .animate-slideUp {
                animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .pulse-glow {
                animation: pulseGlow 2s infinite;
            }
            
            /* Efectos hover reducidos - sin movimiento */
            .month-card:hover {
                box-shadow: 0 8px 25px rgba(0,0,0,0.2), 0 0 20px rgba(252,211,77,0.15);
            }
            
            .day-cell:hover {
                transform: scale(1.1);
                z-index: 10;
                box-shadow: 0 3px 8px rgba(0,0,0,0.2);
            }
            
            /* Resplandores simplificados */
            .nebula-glow {
                box-shadow: 
                    0 0 15px rgba(252,211,77,0.2),
                    0 0 25px rgba(252,211,77,0.1);
            }
            
            .emerald-glow {
                box-shadow: 
                    0 0 8px rgba(16,185,129,0.3),
                    0 0 15px rgba(16,185,129,0.1);
            }
              /* Transiciones suaves */
            * {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
              /* Highlight para mes seleccionado - sin movimiento */
            .month-highlighted {
                box-shadow: 
                    0 0 25px rgba(252,211,77,0.4),
                    0 0 15px rgba(252,211,77,0.2),
                    inset 0 1px 0 rgba(255,255,255,0.2) !important;
                border-color: rgba(252,211,77,0.8) !important;
                background: linear-gradient(135deg, 
                    rgba(252,211,77,0.15), 
                    rgba(252,211,77,0.08)) !important;
                z-index: 5 !important;
            }
            
            /* Scrollbar personalizado */
            .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.1);
                border-radius: 4px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, 
                    rgba(252,211,77,0.6), 
                    rgba(252,211,77,0.8));
                border-radius: 4px;
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, 
                    rgba(252,211,77,0.8), 
                    rgba(252,211,77,1));
            }
              /* Responsive improvements - sin animaciones */
            @media (max-width: 768px) {
                .month-card,
                .month-card:hover {
                    transform: none !important;
                }
                
                .day-cell:hover {
                    transform: scale(1.05) !important;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Instancia global
window.nebulaMinimalCalendar = new NebulaMinimalCalendar();

/**
 * 🎯 Función global para abrir el calendario
 */
window.openCalendar = function() {
    window.nebulaMinimalCalendar.show();
};

console.log('🌌 Nebula Minimal Calendar inicializado');
