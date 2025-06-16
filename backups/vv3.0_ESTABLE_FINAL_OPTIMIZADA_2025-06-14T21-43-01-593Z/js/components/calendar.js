/**
 * 📅 NEBULA FINANCIAL - CALENDAR COMPONENT
 * =========================================
 * Componente modular para la gestión del calendario
 */

import { createIcon, ICONS } from '../utils/helpers.js';

/**
 * 📅 Componente de Calendario
 */
export class CalendarComponent {
    constructor() {
        this.viewYear = new Date().getFullYear();
    }

    /**
     * 📅 Renderizar modal de calendario con selector de año editable
     */
    renderModal() {
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const today = new Date();
        const currentSelectedDate = window.appState?.currentDate || new Date();

        const monthsHTML = months.map((month, index) => {
            const monthKey = `${this.viewYear}-${String(index + 1).padStart(2, '0')}`;
            let monthClass = 'bg-black/20 backdrop-blur-sm';
            
            // CloudSonnet4: Indicador visual para meses con datos
            if (window.appState?.data?.transactions?.[monthKey] && window.appState.data.transactions[monthKey].length > 0) {
                const density = Math.min(window.appState.data.transactions[monthKey].length / 10, 1);
                monthClass = `bg-black/30 opacity-${Math.floor(density * 10) * 10 + 30} backdrop-blur-md`;
            }
            
            // CloudSonnet4: Destacar mes seleccionado actualmente
            if(this.viewYear === currentSelectedDate.getFullYear() && index === currentSelectedDate.getMonth()) {
                 monthClass += ` ring-2 ${window.appState?.theme?.accentRing || 'ring-blue-500'}`;
            }
            
            // CloudSonnet4: Destacar mes actual
            if(this.viewYear === today.getFullYear() && index === today.getMonth()) {
                monthClass = `${window.appState?.theme?.accentBg || 'bg-blue-600'} text-slate-900`;
            }
            
            return `<button data-month-index="${index}" class="month-button p-4 rounded-lg text-lg font-semibold transition-transform duration-200 hover:scale-110 ${monthClass}" title="${new Date(this.viewYear, index).toLocaleString('es-ES', {month:'long'})}">${month}</button>`;
        }).join('');
        
        return `
            <div class="modal-container fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm modal-enter p-4">
                <div class="modal-content relative backdrop-blur-md rounded-2xl shadow-lg p-6 ${window.appState?.theme?.surface || 'bg-black/20'} w-full max-w-md mx-4">
                    <button class="modal-close-button absolute top-3 right-3 p-2 ${window.appState?.theme?.textSecondary || 'text-gray-400'} hover:${window.appState?.theme?.accent || 'text-white'} rounded-full">
                        ${createIcon(ICONS.x, 'w-6 h-6')}
                    </button>
                    
                    <div class="flex items-center justify-between mb-6">
                        <button id="calendar-year-prev" class="${window.appState?.theme?.textSecondary || 'text-gray-400'} hover:${window.appState?.theme?.accent || 'text-white'} p-2 rounded-full">
                            ${createIcon(ICONS.chevronLeft, "w-8 h-8")}
                        </button>
                        <input type="number" id="calendar-year-input" value="${this.viewYear}" min="1900" max="2200" class="text-2xl font-bold ${window.appState?.theme?.textPrimary || 'text-white'} bg-transparent w-24 text-center focus:outline-none focus:bg-black/20 rounded-lg backdrop-blur-md">
                        <button id="calendar-year-next" class="${window.appState?.theme?.textSecondary || 'text-gray-400'} hover:${window.appState?.theme?.accent || 'text-white'} p-2 rounded-full">
                            ${createIcon(ICONS.chevronRight, "w-8 h-8")}
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-4 gap-4 text-center">${monthsHTML}</div>
                    
                    <div class="flex items-center justify-between mt-6">
                        <button id="today-button" class="py-2 px-4 rounded-lg ${window.appState?.theme?.textSecondary || 'text-gray-400'} hover:${window.appState?.theme?.accent || 'text-white'} font-bold text-sm">
                            Volver a Hoy
                        </button>
                        <div class="flex items-center gap-4 text-xs ${window.appState?.theme?.textSecondary || 'text-gray-400'}">
                           <div class="flex items-center gap-1">
                               <span class="w-3 h-3 rounded-full ${window.appState?.theme?.accentBg || 'bg-blue-600'}"></span>Actual
                           </div>
                           <div class="flex items-center gap-1">
                               <span class="w-3 h-3 rounded-full bg-white/20"></span>Con Datos
                           </div>
                        </div>
                   </div>
                </div>
            </div>
        `;
    }

    /**
     * 📅 CloudSonnet4: Cambiar año del calendario
     * @param {number} direction - Dirección: -1 (anterior) o 1 (siguiente)
     */
    changeYear(direction) {
        this.viewYear += direction;
        this.renderMonths();
    }

    /**
     * 📅 CloudSonnet4: Establecer año específico del calendario
     * @param {number} year - Año a establecer
     */
    setYear(year) {
        if (year > 1900 && year < 2200) {
            this.viewYear = year;
            this.renderMonths();
        }
    }

    /**
     * 📅 CloudSonnet4: Renderear meses después de cambio de año
     */
    renderMonths() {
        // Rerender el modal completo para mostrar el nuevo año
        if (window.appState?.activeModal === 'calendar') {
            const modalRoot = document.getElementById('modal-root');
            if (modalRoot) {
                modalRoot.innerHTML = this.renderModal();
                this.attachEventListeners();
            }
        }
    }

    /**
     * 📅 Adjuntar event listeners del calendario
     */
    attachEventListeners() {
        // CloudSonnet4: Event listeners para navegación de año
        const prevButton = document.getElementById('calendar-year-prev');
        const nextButton = document.getElementById('calendar-year-next');
        const yearInput = document.getElementById('calendar-year-input');
        const todayButton = document.getElementById('today-button');

        if (prevButton) {
            prevButton.addEventListener('click', () => this.changeYear(-1));
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => this.changeYear(1));
        }

        if (yearInput) {
            // CloudSonnet4: Selector de año editable con validación
            yearInput.addEventListener('change', (e) => {
                const year = parseInt(e.target.value);
                this.setYear(year);
            });

            yearInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const year = parseInt(e.target.value);
                    this.setYear(year);
                }
            });
        }

        if (todayButton) {
            todayButton.addEventListener('click', () => {
                const today = new Date();
                this.viewYear = today.getFullYear();
                // CloudSonnet4: Navegar al mes actual y cerrar modal
                if (window.appState?.setCalendarDate) {
                    window.appState.setCalendarDate(today.getMonth());
                }
            });
        }

        // CloudSonnet4: Event listeners para selección de mes
        document.querySelectorAll('.month-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const monthIndex = parseInt(e.currentTarget.dataset.monthIndex);
                if (window.appState?.setCalendarDate) {
                    // Actualizar el año de visualización en appState
                    window.appState.calendarViewYear = this.viewYear;
                    window.appState.setCalendarDate(monthIndex);
                }
            });
        });

        // CloudSonnet4: Event listener para cerrar modal
        const closeButton = document.querySelector('.modal-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                if (window.appState?.closeModal) {
                    window.appState.closeModal();
                }
            });
        }

        // CloudSonnet4: Event listener para cerrar al hacer clic fuera
        const modalContainer = document.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.addEventListener('click', (e) => {
                if (e.target === modalContainer && window.appState?.closeModal) {
                    window.appState.closeModal();
                }
            });
        }
    }
}

/**
 * 📅 Función de exportación para renderizar modal de calendario
 */
export function renderCalendarModal() {
    const calendar = new CalendarComponent();
    // CloudSonnet4: Sincronizar año con appState si existe
    if (window.appState?.calendarViewYear) {
        calendar.viewYear = window.appState.calendarViewYear;
    }
    return calendar.renderModal();
}

/**
 * 📅 Función para adjuntar event listeners del calendario
 */
export function attachCalendarListeners() {
    const calendar = new CalendarComponent();
    // CloudSonnet4: Sincronizar año con appState si existe
    if (window.appState?.calendarViewYear) {
        calendar.viewYear = window.appState.calendarViewYear;
    }
    calendar.attachEventListeners();
}

// CloudSonnet4: Exportar componente para uso global
window.CalendarComponent = CalendarComponent;
