/**
 * 🪟 NEBULA FINANCIAL - SISTEMA DE MODALES
 * 
 * Sistema de modales reutilizable para diferentes funcionalidades de la aplicación.
 * Incluye modales para calendario, confirmaciones, formularios, etc.
 * 
 * @author Nebula Team
 * @version 2.0.0
 */

import { createIcon, ICONS } from '../utils/helpers.js';

/**
 * 🪟 Sistema de Modales
 * Maneja todos los modales de la aplicación
 */
export const ModalSystem = {
    activeModals: new Set(),
    
    /**
     * 🚀 Inicializar el sistema de modales
     */
    init() {
        this.addGlobalEventListeners();
        console.log('🪟 Sistema de modales inicializado');
    },
    
    /**
     * 🎯 Agregar event listeners globales
     */
    addGlobalEventListeners() {
        // Cerrar modales con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeTopModal();
            }
        });
    },
    
    /**
     * 📅 Crear modal de calendario
     * @returns {string} HTML del modal
     */
    createCalendarModal() {
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const today = new Date();
        const currentSelectedDate = window.appState?.currentDate || new Date();
        
        const monthsHTML = months.map((month, index) => {
            const isSelected = index === currentSelectedDate.getMonth();
            const isToday = index === today.getMonth() && 
                           currentSelectedDate.getFullYear() === today.getFullYear();
            
            let classes = 'calendar-month-item p-3 rounded-lg cursor-pointer transition-all text-center font-medium';
            
            if (isSelected) {
                classes += ' bg-blue-500 text-white shadow-lg';
            } else if (isToday) {
                classes += ' bg-blue-500/20 text-blue-300 border border-blue-400/30';
            } else {
                classes += ' bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white';
            }
            
            return `<div class="${classes}" data-month="${index}">${month}</div>`;
        }).join('');
        
        return `
            <div class="modal-container fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm modal-enter">
                <div class="modal-content bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 max-w-md w-full mx-4 border border-white/10">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-bold text-white flex items-center gap-2">
                            ${createIcon(ICONS.calendar, 'w-5 h-5 text-blue-400')}
                            Seleccionar Mes
                        </h2>
                        <button onclick="ModalSystem.closeModal()" class="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                            ${createIcon(ICONS.x, 'w-4 h-4')}
                        </button>
                    </div>
                    
                    <div class="mb-4">
                        <div class="flex items-center justify-between mb-4">
                            <button id="year-prev" class="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                ${createIcon(ICONS.chevronLeft, 'w-4 h-4')}
                            </button>
                            <h3 class="text-lg font-semibold text-white">${currentSelectedDate.getFullYear()}</h3>
                            <button id="year-next" class="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                ${createIcon(ICONS.chevronRight, 'w-4 h-4')}
                            </button>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-3 mb-6">
                        ${monthsHTML}
                    </div>
                    
                    <div class="flex justify-between items-center pt-4 border-t border-white/10">
                        <button id="today-btn" class="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm">
                            🏠 Hoy
                        </button>
                        <div class="text-xs text-gray-400">
                            Usa las flechas ← → para navegar
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * ❓ Crear modal de confirmación
     * @param {Object} options - Opciones del modal
     * @returns {string} HTML del modal
     */
    createConfirmationModal(options = {}) {
        const {
            title = 'Confirmar Acción',
            message = '¿Estás seguro de que deseas continuar?',
            confirmText = 'Confirmar',
            cancelText = 'Cancelar',
            type = 'info', // 'info', 'warning', 'danger'
            onConfirm = () => {},
            onCancel = () => {}
        } = options;
        
        const typeClasses = {
            info: 'text-blue-400',
            warning: 'text-yellow-400',
            danger: 'text-red-400'
        };
        
        const typeIcons = {
            info: ICONS.info,
            warning: ICONS.alertTriangle,
            danger: ICONS.alertCircle
        };
        
        const confirmClasses = {
            info: 'bg-blue-500 hover:bg-blue-600',
            warning: 'bg-yellow-500 hover:bg-yellow-600',
            danger: 'bg-red-500 hover:bg-red-600'
        };
        
        return `
            <div class="modal-container fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm modal-enter">
                <div class="modal-content bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 max-w-md w-full mx-4 border border-white/10">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="${typeClasses[type]}">
                            ${createIcon(typeIcons[type], 'w-6 h-6')}
                        </div>
                        <h2 class="text-xl font-bold text-white">${title}</h2>
                    </div>
                    
                    <p class="text-gray-300 mb-6 leading-relaxed">${message}</p>
                    
                    <div class="flex gap-3 justify-end">
                        <button onclick="ModalSystem.closeModal(); (${onCancel})()" 
                                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                            ${cancelText}
                        </button>
                        <button onclick="ModalSystem.closeModal(); (${onConfirm})()" 
                                class="px-4 py-2 ${confirmClasses[type]} text-white rounded-lg transition-colors">
                            ${confirmText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * 📝 Crear modal de formulario genérico
     * @param {Object} options - Opciones del formulario
     * @returns {string} HTML del modal
     */
    createFormModal(options = {}) {
        const {
            title = 'Formulario',
            fields = [],
            onSubmit = () => {},
            submitText = 'Guardar',
            cancelText = 'Cancelar'
        } = options;
        
        const fieldsHTML = fields.map(field => {
            const {
                name,
                label,
                type = 'text',
                placeholder = '',
                required = false,
                options = []
            } = field;
            
            let inputHTML = '';
            
            switch (type) {
                case 'select':
                    inputHTML = `
                        <select name="${name}" class="w-full bg-white/10 text-white rounded-md p-3 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none" ${required ? 'required' : ''}>
                            ${options.map(option => `<option value="${option.value}" class="bg-slate-800">${option.label}</option>`).join('')}
                        </select>
                    `;
                    break;
                case 'textarea':
                    inputHTML = `
                        <textarea name="${name}" placeholder="${placeholder}" 
                                class="w-full bg-white/10 text-white rounded-md p-3 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" 
                                rows="3" ${required ? 'required' : ''}></textarea>
                    `;
                    break;
                default:
                    inputHTML = `
                        <input type="${type}" name="${name}" placeholder="${placeholder}" 
                               class="w-full bg-white/10 text-white rounded-md p-3 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none ${type === 'number' ? 'numeric-input' : ''}" 
                               ${required ? 'required' : ''} />
                    `;
            }
            
            return `
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-300 mb-2">${label}</label>
                    ${inputHTML}
                </div>
            `;
        }).join('');
        
        return `
            <div class="modal-container fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm modal-enter">
                <div class="modal-content bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 max-w-lg w-full mx-4 border border-white/10 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-bold text-white">${title}</h2>
                        <button onclick="ModalSystem.closeModal()" class="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                            ${createIcon(ICONS.x, 'w-4 h-4')}
                        </button>
                    </div>
                    
                    <form id="modal-form" onsubmit="event.preventDefault(); ModalSystem.handleFormSubmit(${onSubmit})">
                        ${fieldsHTML}
                        
                        <div class="flex gap-3 justify-end pt-4 border-t border-white/10">
                            <button type="button" onclick="ModalSystem.closeModal()" 
                                    class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                                ${cancelText}
                            </button>
                            <button type="submit" 
                                    class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                                ${submitText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },
    
    /**
     * 📊 Crear modal de información/detalles
     * @param {Object} options - Opciones del modal
     * @returns {string} HTML del modal
     */
    createInfoModal(options = {}) {
        const {
            title = 'Información',
            content = '',
            size = 'md' // 'sm', 'md', 'lg', 'xl'
        } = options;
        
        const sizeClasses = {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl'
        };
        
        return `
            <div class="modal-container fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm modal-enter">
                <div class="modal-content bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 ${sizeClasses[size]} w-full mx-4 border border-white/10 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-bold text-white">${title}</h2>
                        <button onclick="ModalSystem.closeModal()" class="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                            ${createIcon(ICONS.x, 'w-4 h-4')}
                        </button>
                    </div>
                    
                    <div class="text-gray-300">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * 📱 Mostrar modal
     * @param {string} modalHTML - HTML del modal
     */
    showModal(modalHTML) {
        const modalElement = document.createElement('div');
        modalElement.innerHTML = modalHTML;
        const modal = modalElement.firstElementChild;
        
        document.body.appendChild(modal);
        this.activeModals.add(modal);
        
        // Enfocar el modal para accesibilidad
        modal.focus();
        
        // Agregar event listener para cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
        
        return modal;
    },
    
    /**
     * 🚪 Cerrar modal específico
     * @param {Element} modal - Elemento del modal (opcional)
     */
    closeModal(modal = null) {
        const targetModal = modal || document.querySelector('.modal-container');
        
        if (targetModal) {
            targetModal.classList.remove('modal-enter');
            targetModal.classList.add('modal-leave');
            
            setTimeout(() => {
                if (targetModal.parentNode) {
                    targetModal.parentNode.removeChild(targetModal);
                }
                this.activeModals.delete(targetModal);
            }, 300);
        }
    },
    
    /**
     * 🔝 Cerrar el modal superior
     */
    closeTopModal() {
        const modals = document.querySelectorAll('.modal-container');
        if (modals.length > 0) {
            this.closeModal(modals[modals.length - 1]);
        }
    },
    
    /**
     * 🧹 Cerrar todos los modales
     */
    closeAllModals() {
        const modals = document.querySelectorAll('.modal-container');
        modals.forEach(modal => this.closeModal(modal));
    },
    
    /**
     * 📝 Manejar envío de formulario en modal
     * @param {Function} onSubmit - Función callback
     */
    handleFormSubmit(onSubmit) {
        const form = document.getElementById('modal-form');
        if (form) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            onSubmit(data);
            this.closeModal();
        }
    },
    
    // ===============================================
    // 🚀 MÉTODOS DE CONVENIENCIA
    // ===============================================
    
    /**
     * ✅ Mostrar confirmación rápida
     */
    confirm(message, onConfirm = () => {}) {
        const modal = this.createConfirmationModal({
            message,
            onConfirm
        });
        return this.showModal(modal);
    },
    
    /**
     * ⚠️ Mostrar advertencia
     */
    warning(message, onConfirm = () => {}) {
        const modal = this.createConfirmationModal({
            title: 'Advertencia',
            message,
            type: 'warning',
            onConfirm
        });
        return this.showModal(modal);
    },
    
    /**
     * 🚨 Mostrar peligro
     */
    danger(message, onConfirm = () => {}) {
        const modal = this.createConfirmationModal({
            title: 'Acción Peligrosa',
            message,
            type: 'danger',
            confirmText: 'Sí, continuar',
            onConfirm
        });
        return this.showModal(modal);
    },
    
    /**
     * ℹ️ Mostrar información
     */
    info(title, content) {
        const modal = this.createInfoModal({
            title,
            content
        });
        return this.showModal(modal);
    }
};

// Hacer el sistema disponible globalmente
window.ModalSystem = ModalSystem;
