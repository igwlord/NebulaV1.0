/**
 * 🌌 NEBULA FINANCIAL - EPIC CALENDAR SYSTEM
 * ==========================================
 * Sistema de calendario épico con:
 * - Vista de 12 meses
 * - Selector de año con navegación rápida
 * - Botón "Ir a Hoy"
 * - Indicadores de estado de datos
 * - Diseño moderno con glassmorphism
 * - Navegación intuitiva
 * - Responsive design
 */

/**
 * 📅 Sistema de Calendario Épico Nebula
 */
class NebulaEpicCalendar {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.selectedDate = new Date();
        this.today = new Date();
        this.theme = this.getTheme();
        this.dataStatus = new Map(); // Para rastrear qué días tienen datos
        this.viewMode = 'year'; // 'year' o 'month'
        
        // Inicializar estado de datos
        this.initializeDataStatus();
    }

    /**
     * 🎨 Obtener configuración de tema actual
     */
    getTheme() {
        const appState = window.appState || {};
        const isDark = appState.theme?.isDark !== false;
        
        return {
            // Colores base
            primary: '#fcd34d',
            secondary: '#7c3aed',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            
            // Backgrounds
            surface: isDark ? 'bg-slate-900/95' : 'bg-white/95',
            surfaceSecondary: isDark ? 'bg-slate-800/90' : 'bg-gray-50/90',
            surfaceHover: isDark ? 'bg-slate-700/90' : 'bg-gray-100/90',
            
            // Text
            textPrimary: isDark ? 'text-white' : 'text-gray-900',
            textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
            textMuted: isDark ? 'text-gray-500' : 'text-gray-400',
            
            // Accents
            accent: 'text-yellow-400',
            accentBg: 'bg-yellow-400',
            accentRing: 'ring-yellow-400',
            
            // States
            hasData: 'bg-green-500/20 border-green-400 text-green-300',
            noData: 'bg-gray-500/20 border-gray-400 text-gray-400',
            selected: 'bg-yellow-400/30 border-yellow-400 text-yellow-200',
            today: 'bg-blue-500/30 border-blue-400 text-blue-200',
            
            // Effects
            glow: 'shadow-xl shadow-yellow-400/20',
            border: 'border-white/20',
            glass: 'backdrop-blur-xl'
        };
    }

    /**
     * 📊 Inicializar estado de datos
     */
    initializeDataStatus() {
        // Aquí verificaremos qué días tienen datos registrados
        try {
            const appState = window.appState || {};
            const allData = [
                ...(appState.data?.income || []),
                ...(appState.data?.expenses || []),
                ...(appState.data?.investments || []),
                ...(appState.data?.debts || [])
            ];

            // Marcar días con datos
            allData.forEach(item => {
                if (item.date) {
                    const dateKey = new Date(item.date).toDateString();
                    this.dataStatus.set(dateKey, true);
                }
            });

            console.log(`📊 Días con datos identificados: ${this.dataStatus.size}`);
        } catch (error) {
            console.warn('⚠️ Error inicializando estado de datos del calendario:', error);
        }
    }

    /**
     * 🎯 Verificar si una fecha tiene datos
     */
    hasDataForDate(date) {
        const dateKey = date.toDateString();
        return this.dataStatus.has(dateKey);
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
    getDayNames(short = true) {
        return short ? 
            ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'] :
            ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    }

    /**
     * 🎯 Renderizar modal del calendario épico
     */
    render() {
        const theme = this.theme;
        
        return `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" 
                 onclick="this.remove()" data-calendar-overlay>
                
                <!-- Container principal del calendario -->
                <div class="w-full max-w-7xl max-h-[90vh] ${theme.surface} ${theme.glass} 
                           border ${theme.border} rounded-3xl ${theme.glow} overflow-hidden"
                     onclick="event.stopPropagation()">
                    
                    <!-- Header épico -->
                    <div class="relative p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b ${theme.border}">
                        <div class="flex items-center justify-between">
                            <!-- Título y navegación de año -->
                            <div class="flex items-center space-x-6">
                                <h2 class="text-3xl font-bold ${theme.textPrimary} flex items-center">
                                    📅 Calendario Épico
                                </h2>
                                
                                <!-- Selector de año -->
                                <div class="flex items-center space-x-2">
                                    <button onclick="nebulaCalendar.changeYear(-1)" 
                                            class="p-2 ${theme.surfaceSecondary} hover:${theme.surfaceHover} 
                                                   rounded-lg transition-all duration-200 ${theme.textPrimary}
                                                   hover:scale-110 active:scale-95">
                                        ⬅️
                                    </button>
                                    
                                    <div class="px-4 py-2 ${theme.surfaceSecondary} rounded-lg border ${theme.border}">
                                        <span class="text-xl font-bold ${theme.accent}">${this.currentYear}</span>
                                    </div>
                                    
                                    <button onclick="nebulaCalendar.changeYear(1)" 
                                            class="p-2 ${theme.surfaceSecondary} hover:${theme.surfaceHover} 
                                                   rounded-lg transition-all duration-200 ${theme.textPrimary}
                                                   hover:scale-110 active:scale-95">
                                        ➡️
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Controles -->
                            <div class="flex items-center space-x-3">
                                <!-- Botón Ir a Hoy -->
                                <button onclick="nebulaCalendar.goToToday()" 
                                        class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 
                                               text-white rounded-lg font-semibold hover:scale-105 
                                               transition-all duration-200 shadow-lg hover:shadow-green-500/25">
                                    🏠 Hoy
                                </button>
                                
                                <!-- Toggle de vista -->
                                <button onclick="nebulaCalendar.toggleView()" 
                                        class="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 
                                               text-white rounded-lg font-semibold hover:scale-105 
                                               transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
                                    ${this.viewMode === 'year' ? '📅 Vista Mes' : '📊 Vista Año'}
                                </button>
                                
                                <!-- Cerrar -->
                                <button onclick="this.closest('[data-calendar-overlay]').remove()" 
                                        class="p-2 hover:bg-red-500/20 rounded-lg transition-colors ${theme.textPrimary}">
                                    ❌
                                </button>
                            </div>
                        </div>
                        
                        <!-- Leyenda de colores -->
                        <div class="flex items-center justify-center space-x-6 mt-4 text-sm">
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 rounded border-2 ${theme.hasData}"></div>
                                <span class="${theme.textSecondary}">Con datos</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 rounded border-2 ${theme.noData}"></div>
                                <span class="${theme.textSecondary}">Sin datos</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 rounded border-2 ${theme.today}"></div>
                                <span class="${theme.textSecondary}">Hoy</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 rounded border-2 ${theme.selected}"></div>
                                <span class="${theme.textSecondary}">Seleccionado</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contenido del calendario -->
                    <div class="p-6 overflow-y-auto max-h-[70vh]">
                        ${this.viewMode === 'year' ? this.renderYearView() : this.renderMonthView()}
                    </div>
                    
                    <!-- Footer con información -->
                    <div class="p-4 border-t ${theme.border} ${theme.surfaceSecondary} text-center">
                        <p class="${theme.textSecondary} text-sm">
                            📊 Total de días con datos: <span class="${theme.accent} font-semibold">${this.dataStatus.size}</span> | 
                            📅 Fecha seleccionada: <span class="${theme.accent} font-semibold">${this.selectedDate.toLocaleDateString('es-ES')}</span>
                        </p>
                    </div>
                </div>
            </div>        `;
    }

    /**
     * 📊 Renderizar vista de año completo (12 meses)
     */
    renderYearView() {
        const theme = this.theme;
        let yearHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">`;
        
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
        const theme = this.theme;
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const dayNames = this.getDayNames();
        
        let monthHTML = `
            <!-- Header del mes -->
            <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                    <button onclick="nebulaCalendar.changeMonth(-1)" 
                            class="p-3 ${theme.surfaceSecondary} hover:${theme.surfaceHover} 
                                   rounded-xl transition-all duration-200 ${theme.textPrimary}
                                   hover:scale-110 active:scale-95">
                        ⬅️ Anterior
                    </button>
                    
                    <h3 class="text-2xl font-bold ${theme.textPrimary}">
                        ${this.getMonthName(this.currentMonth)} ${this.currentYear}
                    </h3>
                    
                    <button onclick="nebulaCalendar.changeMonth(1)" 
                            class="p-3 ${theme.surfaceSecondary} hover:${theme.surfaceHover} 
                                   rounded-xl transition-all duration-200 ${theme.textPrimary}
                                   hover:scale-110 active:scale-95">
                        Siguiente ➡️
                    </button>
                </div>
                
                <!-- Días de la semana -->
                <div class="grid grid-cols-7 gap-2 mb-4">
                    ${dayNames.map(day => `
                        <div class="text-center p-3 ${theme.surfaceSecondary} rounded-lg">
                            <span class="${theme.textSecondary} font-semibold">${day}</span>
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
            
            let dayClasses = `aspect-square p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 
                             hover:scale-105 active:scale-95 flex flex-col items-center justify-center`;
            
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
                    <span class="font-bold text-lg">${day}</span>
                    ${hasData ? '<span class="text-xs mt-1">📊</span>' : ''}
                    ${isToday ? '<span class="text-xs mt-1">🏠</span>' : ''}
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
        const theme = this.theme;
        const daysInMonth = new Date(this.currentYear, monthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(this.currentYear, monthIndex, 1).getDay();
        const monthName = this.getMonthName(monthIndex, true);
        
        // Contar días con datos en este mes
        let daysWithData = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, monthIndex, day);
            if (this.hasDataForDate(date)) {
                daysWithData++;
            }
        }
        
        const hasAnyData = daysWithData > 0;
        const dataPercentage = Math.round((daysWithData / daysInMonth) * 100);
        
        let monthHTML = `
            <div class="p-4 ${theme.surfaceSecondary} rounded-xl border ${theme.border} 
                        hover:scale-105 transition-all duration-300 cursor-pointer
                        ${hasAnyData ? 'shadow-lg shadow-green-500/10' : 'shadow-lg shadow-gray-500/10'}"
                 onclick="nebulaCalendar.selectMonth(${monthIndex})">
                
                <!-- Header del mini mes -->
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-bold ${theme.textPrimary}">${monthName}</h4>
                    <div class="flex items-center space-x-1">
                        ${hasAnyData ? `
                            <span class="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                                ${dataPercentage}%
                            </span>
                        ` : `
                            <span class="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full">
                                Sin datos
                            </span>
                        `}
                    </div>
                </div>
                
                <!-- Grid simplificado del mes -->
                <div class="grid grid-cols-7 gap-1 text-xs">
                    <!-- Días de la semana -->
                    ${['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => `
                        <div class="text-center p-1 ${theme.textMuted}">${day}</div>
                    `).join('')}
                    
                    <!-- Espacios vacíos -->
                    ${Array(firstDayOfMonth).fill(0).map(() => '<div></div>').join('')}
                    
                    <!-- Días del mes -->
                    ${Array.from({length: daysInMonth}, (_, i) => {
                        const day = i + 1;
                        const date = new Date(this.currentYear, monthIndex, day);
                        const isToday = this.isSameDay(date, this.today);
                        const hasData = this.hasDataForDate(date);
                        
                        let dayClass = 'text-center p-1 rounded';
                        if (isToday) {
                            dayClass += ` bg-blue-500/30 text-blue-300 font-bold`;
                        } else if (hasData) {
                            dayClass += ` bg-green-500/20 text-green-400`;
                        } else {
                            dayClass += ` ${theme.textSecondary}`;
                        }
                        
                        return `<div class="${dayClass}">${day}</div>`;
                    }).join('')}
                </div>
                
                <!-- Estadísticas del mes -->
                <div class="mt-3 pt-3 border-t border-white/10">
                    <div class="flex justify-between text-xs ${theme.textSecondary}">
                        <span>📊 Días: ${daysWithData}/${daysInMonth}</span>
                        <span class="${hasAnyData ? 'text-green-400' : 'text-gray-400'}">
                            ${hasAnyData ? '✅' : '❌'}
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        return monthHTML;
    }
            const isSelected = this.currentYear === currentDate.getFullYear() && index === currentDate.getMonth();
            const isCurrent = this.currentYear === today.getFullYear() && index === today.getMonth();            let monthClasses = [
                'group relative overflow-hidden',
                'rounded-xl p-4 min-h-[80px]',
                'transition-all duration-300 ease-out',
                'cursor-pointer transform select-none',
                'hover:scale-105 hover:z-10 hover:shadow-lg',
                'active:scale-95',
                'backdrop-blur-sm border',
                this.theme.border
            ];

            if (isCurrent) {
                monthClasses.push(this.theme.accentBg, 'text-slate-900 font-bold', this.theme.glow, 'ring-2 ring-yellow-400/50');
            } else if (isSelected) {
                monthClasses.push('bg-white/20 ring-2', this.theme.accentRing, this.theme.textPrimary, 'shadow-lg');
            } else if (hasData) {
                monthClasses.push('bg-white/10 border-white/30', this.theme.textPrimary, 'hover:bg-white/20');
            } else {
                monthClasses.push('bg-white/5', this.theme.textSecondary, 'hover:bg-white/15 hover:text-white');
            }

            return `
                <button data-month="${index}" class="${monthClasses.join(' ')}" title="Seleccionar ${month} ${this.currentYear}" type="button">
                    <div class="relative z-10 pointer-events-none">
                        <div class="text-sm font-medium mb-1">${monthsShort[index]}</div>
                        <div class="text-lg font-bold">${month.substring(0, 3)}</div>
                        ${hasData ? '<div class="absolute top-0 right-0 w-2 h-2 bg-current rounded-full opacity-70 animate-pulse"></div>' : ''}
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </button>
            `;
        }).join('');        return `
            <div class="calendar-modal fixed inset-0 z-50 flex items-center justify-center p-4">
                <!-- Backdrop with blur -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-md" data-close-modal></div>
                
                <!-- Modal Content -->
                <div class="relative ${this.theme.surface} rounded-3xl ${this.theme.border} border backdrop-blur-xl shadow-2xl w-full max-w-2xl animate-scale-in">
                    <!-- Header -->
                    <div class="relative p-6 pb-4">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h2 class="text-2xl font-bold ${this.theme.textPrimary}">Calendario</h2>
                                <p class="text-sm ${this.theme.textSecondary} mt-1">Selecciona un mes para navegar</p>
                            </div>
                            
                            <!-- Close Button - Moved to top right -->
                            <button class="p-2 rounded-full ${this.theme.button} ${this.theme.textSecondary} hover:${this.theme.textPrimary} transition-all hover:scale-110" data-close-modal title="Cerrar calendario">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Year Navigator - Repositioned below header -->
                        <div class="flex items-center justify-center gap-4 py-3 bg-white/5 rounded-xl border ${this.theme.border}">
                            <button class="p-3 rounded-lg ${this.theme.button} ${this.theme.textSecondary} hover:${this.theme.textPrimary} transition-all hover:scale-110 active:scale-95" data-year-change="-1" title="Año anterior (←)">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            
                            <div class="text-center px-4">
                                <div class="text-xs ${this.theme.textSecondary} mb-1">Año</div>
                                <input type="number" class="year-input text-2xl font-bold ${this.theme.textPrimary} bg-white/10 text-center w-24 focus:outline-none focus:bg-white/20 rounded-lg px-3 py-2 transition-all border ${this.theme.border} focus:border-white/40" value="${this.currentYear}" min="1900" max="2100" title="Cambiar año">
                            </div>
                            
                            <button class="p-3 rounded-lg ${this.theme.button} ${this.theme.textSecondary} hover:${this.theme.textPrimary} transition-all hover:scale-110 active:scale-95" data-year-change="1" title="Año siguiente (→)">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Calendar Grid -->
                    <div class="p-6">
                        <div class="grid grid-cols-4 gap-4 mb-6">
                            ${monthsGrid}
                        </div>
                          <!-- Footer Actions -->
                        <div class="flex items-center justify-between pt-4 border-t ${this.theme.border}">
                            <button class="px-6 py-3 rounded-xl ${this.theme.accentBg} text-slate-900 hover:scale-105 active:scale-95 transition-all text-sm font-semibold shadow-lg hover:shadow-xl" data-today title="Navegar al mes actual">
                                📅 Ir a Hoy
                            </button>
                            
                            <div class="flex items-center gap-4 text-xs ${this.theme.textSecondary}">
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full ${this.theme.accentBg} animate-pulse"></div>
                                    <span>Mes Actual</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full bg-white/30"></div>
                                    <span>Con Datos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * � Verificar si hay transacciones en un mes
     */
    hasTransactionsInMonth(monthKey) {
        const appState = window.appState;
        if (!appState?.data?.transactions) return false;
        
        const transactions = appState.data.transactions[monthKey];
        if (!transactions) return false;
        
        // Verificar si hay transacciones en cualquier categoría
        return Object.values(transactions).some(categoryTransactions => 
            Array.isArray(categoryTransactions) && categoryTransactions.length > 0
        );
    }

    /**
     * 🎯 Adjuntar event listeners
     */
    attachEventListeners() {
        const modal = document.querySelector('.calendar-modal');
        if (!modal) return;

        // Cerrar modal
        modal.querySelectorAll('[data-close-modal]').forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // Cambio de año
        modal.querySelectorAll('[data-year-change]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const change = parseInt(e.target.closest('[data-year-change]').dataset.yearChange);
                this.changeYear(change);
            });
        });

        // Input de año
        const yearInput = modal.querySelector('.year-input');
        if (yearInput) {
            yearInput.addEventListener('change', (e) => {
                const newYear = parseInt(e.target.value);
                if (newYear >= 1900 && newYear <= 2100) {
                    this.currentYear = newYear;
                    this.updateView();
                }
            });

            yearInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    yearInput.blur();
                }
            });
        }        // Selección de mes - Mejorado
        modal.querySelectorAll('[data-month]').forEach(monthEl => {
            monthEl.addEventListener('click', (e) => {
                e.preventDefault();
                const button = e.target.closest('[data-month]');
                const monthIndex = parseInt(button.dataset.month);
                
                // Feedback visual inmediato
                button.style.transform = 'scale(0.95)';
                button.style.transition = 'transform 0.1s ease';
                
                setTimeout(() => {
                    button.style.transform = '';
                    this.selectMonth(monthIndex);
                }, 100);
            });
            
            // Agregar soporte para Enter y Space
            monthEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const monthIndex = parseInt(e.target.dataset.month);
                    this.selectMonth(monthIndex);
                }
            });
        });

        // Ir a hoy
        const todayBtn = modal.querySelector('[data-today]');
        if (todayBtn) {
            todayBtn.addEventListener('click', () => this.goToToday());
        }

        // Cerrar con escape
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    /**
     * ⌨️ Manejar teclas del teclado
     */
    handleKeydown(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    /**
     * 📅 Cambiar año
     */
    changeYear(direction) {
        const newYear = this.currentYear + direction;
        if (newYear >= 1900 && newYear <= 2100) {
            this.currentYear = newYear;
            this.updateView();
        }
    }

    /**
     * 🔄 Actualizar vista del calendario
     */
    updateView() {
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) {
            modalRoot.innerHTML = this.render();
            this.attachEventListeners();
        }
    }    /**
     * 🎯 Seleccionar mes
     */
    selectMonth(monthIndex) {
        console.log(`📅 Seleccionando mes: ${monthIndex + 1}/${this.currentYear}`);
        
        if (window.appState && typeof window.appState.setCalendarDate === 'function') {
            // Actualizar año en appState antes de seleccionar
            window.appState.calendarViewYear = this.currentYear;
            
            // Seleccionar el mes
            window.appState.setCalendarDate(monthIndex);
            
            // Mostrar notificación si está disponible
            if (window.NotificationSystem) {
                const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                window.NotificationSystem.success('Calendario', `Navegando a ${monthNames[monthIndex]} ${this.currentYear}`);
            }
        }
        
        this.close();
    }

    /**
     * 🏠 Ir al mes actual
     */
    goToToday() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        console.log(`🏠 Navegando a HOY: ${currentMonth + 1}/${currentYear}`);
        
        // Actualizar el año del calendario
        this.currentYear = currentYear;
        
        // Seleccionar el mes actual
        this.selectMonth(currentMonth);
    }

    /**
     * ❌ Cerrar modal
     */
    close() {
        if (window.appState && typeof window.appState.closeModal === 'function') {
            window.appState.closeModal();
        }
        
        // Remover listener de teclado
        document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
}

/**
 * � Función para renderizar el calendario
 */
function renderNebulaCalendar() {
    const calendar = new NebulaCalendar();
    
    // Sincronizar con appState si existe
    if (window.appState?.calendarViewYear) {
        calendar.currentYear = window.appState.calendarViewYear;
    }
    
    return calendar.render();
}

/**
 * 🎯 Función para adjuntar listeners del calendario
 */
function attachNebulaCalendarListeners() {
    const calendar = new NebulaCalendar();
    
    // Sincronizar con appState si existe
    if (window.appState?.calendarViewYear) {
        calendar.currentYear = window.appState.calendarViewYear;
    }
    
    calendar.attachEventListeners();
}

// Exportar para uso global
window.NebulaCalendar = NebulaCalendar;
window.renderNebulaCalendar = renderNebulaCalendar;
window.attachNebulaCalendarListeners = attachNebulaCalendarListeners;
