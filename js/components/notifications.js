/**
 * 🔔 NEBULA FINANCIAL - SISTEMA DE NOTIFICACIONES
 * 
 * Sistema avanzado de notificaciones in-app con soporte para diferentes tipos,
 * animaciones suaves y stack de notificaciones.
 * 
 * @author Nebula Team
 * @version 2.0.0
 */

/**
 * 🔔 Sistema de Notificaciones
 * Maneja todas las notificaciones in-app de Nebula Financial
 */

const NotificationSystem = {
    container: null,
    
    /**
     * 🚀 Inicializar el sistema de notificaciones
     */
    init() {
        // Crear contenedor de notificaciones si no existe
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            this.container.className = 'fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none';
            document.body.appendChild(this.container);
        }
        
        console.log('🔔 Sistema de notificaciones inicializado');
    },
    
    /**
     * 📢 Mostrar una notificación
     * @param {string} message - Mensaje de la notificación
     * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
     * @param {number} duration - Duración en milisegundos (default: 4000)
     */
    show(message, type = 'info', duration = 4000) {
        if (!this.container) {
            this.init();
        }
        
        const id = Date.now().toString();        const iconMap = {
            success: window.ICONS?.checkCircle,
            error: window.ICONS?.xCircle,
            warning: window.ICONS?.alertTriangle,
            info: window.ICONS?.info
        };
        
        const notification = document.createElement('div');
        notification.id = `notification-${id}`;
        notification.className = 'pointer-events-auto transform transition-all duration-300 ease-out translate-x-full opacity-0';
        
        const colorClasses = {
            success: 'bg-green-500/90 border-green-400/50 text-white',
            error: 'bg-red-500/90 border-red-400/50 text-white',
            warning: 'bg-yellow-500/90 border-yellow-400/50 text-white',
            info: 'bg-blue-500/90 border-blue-400/50 text-white'
        };
        
        notification.innerHTML = `
            <div class="flex items-center gap-3 p-4 rounded-lg backdrop-blur-md border ${colorClasses[type]} shadow-lg min-w-80 max-w-md">
                <div class="flex-shrink-0">
                    ${window.createIcon ? window.createIcon((window.ICONS && iconMap[type]) || window.ICONS?.info, 'w-5 h-5') : '🔔'}
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium">${message}</p>
                </div>
                <button 
                    onclick="NotificationSystem.hide('${id}')" 
                    class="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Cerrar notificación"
                >
                    ${window.createIcon ? window.createIcon(window.ICONS?.x, 'w-4 h-4') : '✕'}
                </button>
            </div>
        `;
        
        this.container.appendChild(notification);
        
        // Animar entrada
        requestAnimationFrame(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
            notification.classList.add('translate-x-0', 'opacity-100');
        });
        
        // Auto-hide después de la duración especificada
        if (duration > 0) {
            setTimeout(() => {
                this.hide(id);
            }, duration);
        }
        
        return id;
    },
    
    /**
     * 🙈 Ocultar una notificación específica
     * @param {string} id - ID de la notificación
     */
    hide(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            notification.classList.add('translate-x-full', 'opacity-0');
            notification.classList.remove('translate-x-0', 'opacity-100');
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    },
    
    /**
     * 🧹 Limpiar todas las notificaciones
     */
    clear() {
        if (this.container) {
            const notifications = this.container.querySelectorAll('[id^="notification-"]');
            notifications.forEach(notification => {
                const id = notification.id.replace('notification-', '');
                this.hide(id);
            });
        }
    },
    
    /**
     * ✅ Notificación de éxito rápida
     * @param {string} message - Mensaje de éxito
     */
    success(message) {
        return this.show(message, 'success');
    },
    
    /**
     * ❌ Notificación de error rápida
     * @param {string} message - Mensaje de error
     */
    error(message) {
        return this.show(message, 'error');
    },
    
    /**
     * ⚠️ Notificación de advertencia rápida
     * @param {string} message - Mensaje de advertencia
     */
    warning(message) {
        return this.show(message, 'warning');
    },
    
    /**
     * ℹ️ Notificación informativa rápida
     * @param {string} message - Mensaje informativo
     */
    info(message) {
        return this.show(message, 'info');
    },
    
    /**
     * 🎯 Notificación de acción completada
     * @param {string} action - Acción realizada
     * @param {string} detail - Detalle adicional (opcional)
     */
    actionCompleted(action, detail = '') {
        const message = detail ? `${action}: ${detail}` : action;
        return this.success(message);
    },
    
    /**
     * 💾 Notificación de datos guardados
     */
    dataSaved() {
        return this.success('Datos guardados correctamente');
    },
    
    /**
     * 🗑️ Notificación de elemento eliminado
     * @param {string} item - Elemento eliminado
     */
    itemDeleted(item) {
        return this.info(`${item} eliminado`);
    },
    
    /**
     * 📋 Notificación de elementos copiados
     * @param {number} count - Número de elementos
     * @param {string} type - Tipo de elementos
     * @param {string} source - Origen de la copia
     */
    itemsCopied(count, type, source) {
        return this.success(`${count} ${type} copiados ${source}`);
    }
};

// Hacer el sistema disponible globalmente para el HTML inline
window.NotificationSystem = NotificationSystem;
