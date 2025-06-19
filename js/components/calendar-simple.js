/**
 * 🌌 NEBULA FINANCIAL - INTEGRATED CALENDAR SYSTEM
 * ===============================================
 * Calendario completamente integrado con el diseño de Nebula:
 * - Hereda temas y colores de la aplicación principal
 * - Diseño minimalista y elegante
 * - Transiciones suaves y animaciones
 * - Perfectamente responsive
 * - UX optimizada para teclado y mouse
 */

/**
 * 📅 Calendario Integrado Nebula
 */
class NebulaIntegratedCalendar {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.selectedDate = new Date();
        this.today = new Date();
        this.dataStatus = new Map();
        this.viewMode = 'year'; // 'year' o 'month'
        this.isVisible = false;
        
        // Inicializar estado de datos
        this.initializeDataStatus();
    }

    /**
     * 🎨 Obtener tema actual de la aplicación
     */
    getTheme() {
        const appState = window.appState || {};
        const theme = appState.theme || {};
        
        return {
            // Colores principales heredados de Nebula
            primary: theme.accentColor || '#FCD34D',
            accent: theme.accent || 'text-amber-300',
            accentBg: theme.accentBg || 'bg-amber-400',
            
            // Superficies y fondos
            surface: theme.surface || 'bg-black/20 border-amber-200/30 backdrop-blur-md',
            modalBg: 'bg-black/60 backdrop-blur-sm',
            cardBg: 'bg-white/5 border border-white/10',
            
            // Textos
            textPrimary: theme.textPrimary || 'text-amber-50',
            textSecondary: theme.textSecondary || 'text-amber-200/80',
            textMuted: 'text-white/40',
            
            // Estados del calendario
            hasData: 'bg-green-400/20 border-green-400/60 text-green-300',
            noData: 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10',
            selected: 'bg-amber-400/30 border-amber-400 text-white',
            today: 'bg-blue-400/30 border-blue-400 text-blue-100 ring-2 ring-blue-400/50',
            
            // Efectos y sombras
            glow: theme.accentGlow || 'shadow-[0_0_25px_rgba(251,191,36,0.8)]',
            cardShadow: 'shadow-lg shadow-black/20',
            
            // Gradientes
            headerGradient: 'bg-gradient-to-r from-white/10 to-white/5',
            buttonGradient: 'bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10'
        };
    }

    /**
     * 📊 Inicializar estado de datos
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

            console.log(`📊 Calendario: ${this.dataStatus.size} días con datos`);
        } catch (error) {
            console.warn('⚠️ Error inicializando datos del calendario:', error);
        }
    }

    /**
     * 🎯 Verificar si una fecha tiene datos
     */
    hasDataForDate(date) {
        return this.dataStatus.has(date.toDateString());
    }

    /**
     * 🔍 Verificar si dos fechas son el mismo día
     */
    isSameDay(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    }

    /**
     * 📅 Obtener nombre del mes
     */
    getMonthName(monthIndex, short = false) {
        const months = short ? [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ] : [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[monthIndex];
    }

    /**
     * 📅 Obtener días de la semana
     */
    getDayNames() {
        return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    }

    /**
     * 🎯 Renderizar modal del calendario integrado
     */
    render() {
        const theme = this.getTheme();
        
        return `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.modalBg}" 
                 onclick="this.remove()" data-calendar-overlay>
                
                <!-- Container principal minimalista -->
                <div class="w-full max-w-6xl max-h-[90vh] ${theme.surface} rounded-2xl overflow-hidden ${theme.glow}"
                     onclick="event.stopPropagation()">
                    
                    <!-- Header simplificado -->
                    <div class="p-6 ${theme.headerGradient} border-b border-white/10">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4">
                                <h2 class="text-2xl font-bold ${theme.textPrimary}">
                                    📅 Calendario
                                </h2>
                                
                                <!-- Navegación de año minimalista -->
                                <div class="flex items-center space-x-1">
                                    <button onclick="nebulaCalendar.changeYear(-1)" 
                                            class="p-2 ${theme.buttonGradient} rounded-lg transition-all duration-200 ${theme.textPrimary} hover:scale-110">
                                        ←
                                    </button>
                                    
                                    <span class="px-3 py-1 text-xl font-semibold ${theme.accent} min-w-[80px] text-center">
                                        ${this.currentYear}
                                    </span>
                                    
                                    <button onclick="nebulaCalendar.changeYear(1)" 
                                            class="p-2 ${theme.buttonGradient} rounded-lg transition-all duration-200 ${theme.textPrimary} hover:scale-110">
                                        →
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Controles minimalistas -->
                            <div class="flex items-center space-x-2">
                                <button onclick="nebulaCalendar.goToToday()" 
                                        class="px-4 py-2 bg-green-500/20 border border-green-500/40 text-green-300 
                                               rounded-lg font-medium hover:bg-green-500/30 transition-all duration-200">
                                    Hoy
                                </button>
                                
                                <button onclick="nebulaCalendar.toggleView()" 
                                        class="px-4 py-2 ${theme.buttonGradient} ${theme.textSecondary} 
                                               rounded-lg font-medium hover:${theme.textPrimary} transition-all duration-200">
                                    ${this.viewMode === 'year' ? 'Mes' : 'Año'}
                                </button>
                                
                                <button onclick="this.closest('[data-calendar-overlay]').remove()" 
                                        class="p-2 hover:bg-red-500/20 rounded-lg transition-colors ${theme.textSecondary} hover:text-red-300">
                                    ✕
                                </button>
                            </div>
                        </div>
                        
                        <!-- Indicadores simples -->
                        <div class="flex items-center justify-center space-x-4 mt-4 text-xs ${theme.textSecondary}">
                            <div class="flex items-center space-x-1">
                                <div class="w-3 h-3 rounded-full bg-green-400/30 border border-green-400/60"></div>
                                <span>Con datos</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <div class="w-3 h-3 rounded-full bg-blue-400/30 border border-blue-400"></div>
                                <span>Hoy</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <div class="w-3 h-3 rounded-full bg-amber-400/30 border border-amber-400"></div>
                                <span>Seleccionado</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contenido del calendario -->
                    <div class="p-6 overflow-y-auto max-h-[70vh]">
                        ${this.viewMode === 'year' ? this.renderYearView() : this.renderMonthView()}
                    </div>
                    
                    <!-- Footer minimalista -->
                    <div class="px-6 py-4 border-t border-white/10 ${theme.headerGradient} text-center">
                        <p class="${theme.textSecondary} text-sm">
                            ${this.dataStatus.size} días con datos | ${this.selectedDate.toLocaleDateString('es-ES')}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 📊 Renderizar vista de año (12 meses minimalistas)
     */
    renderYearView() {
        let yearHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">`;
        
        for (let month = 0; month < 12; month++) {
            yearHTML += this.renderMiniMonth(month);
        }
        
        yearHTML += `</div>`;
        return yearHTML;
    }

    /**
     * 📅 Renderizar vista de mes detallada
     */
    renderMonthView() {
        const theme = this.getTheme();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const dayNames = this.getDayNames();
        
        let monthHTML = `
            <!-- Header del mes -->
            <div class="mb-6">
                <div class="flex items-center justify-between mb-6">
                    <button onclick="nebulaCalendar.changeMonth(-1)" 
                            class="flex items-center space-x-2 px-4 py-2 ${theme.buttonGradient} 
                                   rounded-lg transition-all duration-200 ${theme.textSecondary} hover:${theme.textPrimary}">
                        <span>←</span>
                        <span>Anterior</span>
                    </button>
                    
                    <h3 class="text-2xl font-bold ${theme.textPrimary}">
                        ${this.getMonthName(this.currentMonth)} ${this.currentYear}
                    </h3>
                    
                    <button onclick="nebulaCalendar.changeMonth(1)" 
                            class="flex items-center space-x-2 px-4 py-2 ${theme.buttonGradient} 
                                   rounded-lg transition-all duration-200 ${theme.textSecondary} hover:${theme.textPrimary}">
                        <span>Siguiente</span>
                        <span>→</span>
                    </button>
                </div>
                
                <!-- Días de la semana -->
                <div class="grid grid-cols-7 gap-2 mb-4">
                    ${dayNames.map(day => `
                        <div class="text-center py-3 ${theme.textSecondary} font-medium text-sm">
                            ${day}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Grid de días -->
            <div class="grid grid-cols-7 gap-2">
        `;
        
        // Espacios vacíos al inicio
        for (let i = 0; i < firstDayOfMonth; i++) {
            monthHTML += `<div class="aspect-square"></div>`;
        }
        
        // Días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, this.currentMonth, day);
            const isToday = this.isSameDay(date, this.today);
            const isSelected = this.isSameDay(date, this.selectedDate);
            const hasData = this.hasDataForDate(date);
            
            let dayClasses = `aspect-square p-3 rounded-lg border cursor-pointer transition-all duration-200 
                             hover:scale-105 flex items-center justify-center relative`;
            
            if (isToday) {
                dayClasses += ` ${theme.today}`;
            } else if (isSelected) {
                dayClasses += ` ${theme.selected}`;
            } else if (hasData) {
                dayClasses += ` ${theme.hasData}`;
            } else {
                dayClasses += ` ${theme.noData}`;
            }
            
            monthHTML += `
                <div class="${dayClasses}" 
                     onclick="nebulaCalendar.selectDate(${this.currentYear}, ${this.currentMonth}, ${day})">
                    <span class="font-semibold">${day}</span>
                    ${hasData ? '<div class="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full"></div>' : ''}
                </div>
            `;
        }
        
        monthHTML += `</div>`;
        return monthHTML;
    }

    /**
     * 📅 Renderizar mini calendario para vista de año
     */
    renderMiniMonth(monthIndex) {
        const theme = this.getTheme();
        const daysInMonth = new Date(this.currentYear, monthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(this.currentYear, monthIndex, 1).getDay();
        const monthName = this.getMonthName(monthIndex, true);
        
        // Contar días con datos
        let daysWithData = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, monthIndex, day);
            if (this.hasDataForDate(date)) {
                daysWithData++;
            }
        }
        
        const hasAnyData = daysWithData > 0;
        const dataPercentage = Math.round((daysWithData / daysInMonth) * 100);
        
        return `
            <div class="${theme.cardBg} ${theme.cardShadow} rounded-xl p-4 
                        hover:scale-105 transition-all duration-300 cursor-pointer group"
                 onclick="nebulaCalendar.selectMonth(${monthIndex})">
                
                <!-- Header del mini mes -->
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-semibold ${theme.textPrimary} group-hover:${theme.accent} transition-colors">
                        ${monthName}
                    </h4>
                    ${hasAnyData ? `
                        <span class="text-xs px-2 py-1 bg-green-400/20 text-green-400 rounded-full">
                            ${dataPercentage}%
                        </span>
                    ` : `
                        <div class="w-2 h-2 rounded-full bg-white/20"></div>
                    `}
                </div>
                
                <!-- Grid simplificado -->
                <div class="grid grid-cols-7 gap-1 text-xs mb-3">
                    ${['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => `
                        <div class="text-center p-1 ${theme.textMuted}">${day}</div>
                    `).join('')}
                    
                    ${Array(firstDayOfMonth).fill(0).map(() => '<div></div>').join('')}
                    
                    ${Array.from({length: daysInMonth}, (_, i) => {
                        const day = i + 1;
                        const date = new Date(this.currentYear, monthIndex, day);
                        const isToday = this.isSameDay(date, this.today);
                        const hasData = this.hasDataForDate(date);
                        
                        let dayClass = 'text-center p-1 rounded text-xs';
                        if (isToday) {
                            dayClass += ` bg-blue-400/40 text-blue-200 font-bold`;
                        } else if (hasData) {
                            dayClass += ` bg-green-400/20 text-green-400`;
                        } else {
                            dayClass += ` ${theme.textSecondary}`;
                        }
                        
                        return `<div class="${dayClass}">${day}</div>`;
                    }).join('')}
                </div>
                
                <!-- Indicador simple -->
                <div class="flex justify-between items-center text-xs ${theme.textSecondary}">
                    <span>${daysWithData} días</span>
                    <div class="w-4 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div class="h-full bg-green-400 rounded-full transition-all duration-300" 
                             style="width: ${dataPercentage}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 🔄 Cambiar año
     */
    changeYear(direction) {
        this.currentYear += direction;
        this.updateView();
    }

    /**
     * 🔄 Cambiar mes
     */
    changeMonth(direction) {
        this.currentMonth += direction;
        
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        
        this.updateView();
    }

    /**
     * 🎯 Seleccionar fecha
     */
    selectDate(year, month, day) {
        this.selectedDate = new Date(year, month, day);
        this.updateView();
        
        // Notificación elegante
        if (typeof NotificationSystem !== 'undefined') {
            const hasData = this.hasDataForDate(this.selectedDate);
            NotificationSystem.info('📅 Fecha seleccionada', 
                `${this.selectedDate.toLocaleDateString('es-ES')}${hasData ? ' · Con datos' : ''}`, 2000);
        }
    }

    /**
     * 📅 Seleccionar mes
     */
    selectMonth(monthIndex) {
        this.currentMonth = monthIndex;
        this.viewMode = 'month';
        this.updateView();
    }

    /**
     * 🏠 Ir a hoy
     */
    goToToday() {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.selectedDate = new Date(today);
        this.updateView();
        
        if (typeof NotificationSystem !== 'undefined') {
            NotificationSystem.success('🏠 Navegando a hoy', 
                today.toLocaleDateString('es-ES'), 1500);
        }
    }

    /**
     * 🔄 Alternar vista
     */
    toggleView() {
        this.viewMode = this.viewMode === 'year' ? 'month' : 'year';
        this.updateView();
    }

    /**
     * 🔄 Actualizar vista
     */
    updateView() {
        const container = document.querySelector('[data-calendar-overlay]');
        if (container) {
            // Actualizar datos antes de renderizar
            this.initializeDataStatus();
            
            const newHTML = this.render();
            container.outerHTML = newHTML;
        }
    }

    /**
     * 🚀 Mostrar calendario
     */
    show() {
        // Remover calendario existente
        const existing = document.querySelector('[data-calendar-overlay]');
        if (existing) {
            existing.remove();
        }

        // Actualizar datos
        this.initializeDataStatus();

        // Crear y mostrar calendario
        const calendarHTML = this.render();
        document.body.insertAdjacentHTML('beforeend', calendarHTML);
        
        this.isVisible = true;
        
        // Animación de entrada suave
        const overlay = document.querySelector('[data-calendar-overlay]');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transform = 'scale(0.95)';
            overlay.offsetHeight; // Force reflow
            overlay.style.transition = 'all 0.3s ease';
            overlay.style.opacity = '1';
            overlay.style.transform = 'scale(1)';
        }
    }

    /**
     * 🚪 Ocultar calendario
     */
    hide() {
        const overlay = document.querySelector('[data-calendar-overlay]');
        if (overlay) {
            overlay.style.transition = 'all 0.2s ease';
            overlay.style.opacity = '0';
            overlay.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                overlay.remove();
                this.isVisible = false;
            }, 200);
        }
    }
}

// 🌍 Instancia global del calendario integrado
window.nebulaCalendar = new NebulaIntegratedCalendar();

// 🚀 Función global simplificada
window.showNebulaCalendar = () => {
    window.nebulaCalendar.show();
};

// 🔧 Función para cerrar calendario
window.hideNebulaCalendar = () => {
    window.nebulaCalendar.hide();
};

console.log('📅 Sistema de Calendario Integrado Nebula inicializado');
