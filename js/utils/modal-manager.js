/**
 * 🪟 NEBULA FINANCIAL - GESTOR DE MODALES MEJORADO
 * 
 * Sistema avanzado para mantener modales abiertos después de confirmar acciones
 * Solo cierra con ESC o clic fuera explícito, mejorando la UX
 * 
 * @author CloudSonnet4 - Nebula Team
 * @version 2.1.0
 * 
 * Características:
 * - Mantiene modales abiertos tras confirmación
 * - Feedback visual inline sin interrupciones
 * - Cierre solo con ESC o clic fuera explícito
 * - Soporte para múltiples modales simultáneos
 */

class ModalManager {
    constructor() {
        this.activeModals = new Set();
        this.setupGlobalListeners();
        console.log('🪟 ModalManager inicializado');
    }

    setupGlobalListeners() {
        // Listener para ESC global - solo cierra el modal superior
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this.closeTopModal();
            }
        });

        // Listener para clic fuera del modal - solo si es realmente fuera
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
    }

    /**
     * Abrir modal y agregarlo al stack de modales activos
     */
    openModal(modalId, element = null) {
        this.activeModals.add(modalId);
        
        if (!element) {
            element = document.getElementById(modalId);
        }
        
        if (element) {
            element.style.display = 'block';
            element.classList.add('modal-active');
            
            // Asegurar que esté por encima de otros modales
            const zIndex = 1000 + this.activeModals.size;
            element.style.zIndex = zIndex;
        }
        
        console.log(`🪟 Modal abierto: ${modalId}`);
        return element;
    }

    /**
     * Cerrar modal específico
     */
    closeModal(modalId, element = null) {
        this.activeModals.delete(modalId);
        
        if (!element) {
            element = document.getElementById(modalId);
        }
        
        if (element) {
            element.style.display = 'none';
            element.classList.remove('modal-active');
        }
        
        console.log(`🪟 Modal cerrado: ${modalId}`);
    }

    /**
     * Cerrar solo el modal superior (último abierto)
     */
    closeTopModal() {
        const modalsArray = Array.from(this.activeModals);
        const topModal = modalsArray[modalsArray.length - 1];
        
        if (topModal) {
            const element = document.getElementById(topModal);
            this.closeModal(topModal, element);
            console.log(`🪟 Modal superior cerrado con ESC: ${topModal}`);
        }
    }

    /**
     * Cerrar todos los modales
     */
    closeAllModals() {
        const modalsToClose = Array.from(this.activeModals);
        modalsToClose.forEach(modalId => {
            const element = document.getElementById(modalId);
            this.closeModal(modalId, element);
        });
        console.log('🪟 Todos los modales cerrados');
    }

    /**
     * Manejar clic fuera del modal - solo cierra si es realmente fuera
     */
    handleOutsideClick(event) {
        // Verificar si el clic es dentro de algún contenido de modal
        const isInsideModal = event.target.closest('.modal-content, .dropdown-content, .submenu-content, .calendar-modal, .form-modal');
        
        // Solo cerrar si hay modales activos y el clic es realmente fuera
        if (!isInsideModal && this.activeModals.size > 0) {
            // Verificar que no sea un clic en un botón que debería abrir el modal
            const isModalTrigger = event.target.closest('[data-modal], .modal-trigger, .open-modal');
            
            if (!isModalTrigger) {
                this.closeTopModal();
                console.log('🪟 Modal cerrado por clic fuera');
            }
        }
    }

    /**
     * Mostrar feedback visual inline sin interrumpir la navegación
     */
    showInlineSuccess(targetElement, message = 'Guardado ✓', duration = 2000) {
        // Buscar elemento padre apropiado si el target es muy pequeño
        let parentElement = targetElement;
        if (targetElement.tagName === 'BUTTON' || targetElement.classList.contains('btn')) {
            parentElement = targetElement.parentElement || targetElement;
        }

        // Crear elemento de feedback
        const feedback = document.createElement('div');
        feedback.className = 'inline-feedback success';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            pointer-events: none;
        `;
        
        // Asegurar posicionamiento relativo
        const originalPosition = parentElement.style.position;
        if (!originalPosition || originalPosition === 'static') {
            parentElement.style.position = 'relative';
        }
        
        parentElement.appendChild(feedback);
        
        // Animación de entrada
        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(-50%) translateX(-5px)';
        });
        
        // Eliminación automática con animación
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-50%) translateX(10px)';
            
            setTimeout(() => {
                if (feedback.parentElement) {
                    feedback.remove();
                }
                // Restaurar posición original si era static
                if (!originalPosition || originalPosition === 'static') {
                    parentElement.style.position = originalPosition || '';
                }
            }, 300);
        }, duration);

        console.log(`✅ Feedback mostrado: ${message}`);
    }

    /**
     * Mostrar feedback de error
     */
    showInlineError(targetElement, message = 'Error ❌', duration = 3000) {
        const parentElement = targetElement.parentElement || targetElement;

        const feedback = document.createElement('div');
        feedback.className = 'inline-feedback error';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
            pointer-events: none;
        `;
        
        const originalPosition = parentElement.style.position;
        if (!originalPosition || originalPosition === 'static') {
            parentElement.style.position = 'relative';
        }
        
        parentElement.appendChild(feedback);
        
        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(-50%) translateX(-5px)';
        });
        
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => {
                if (feedback.parentElement) {
                    feedback.remove();
                }
                if (!originalPosition || originalPosition === 'static') {
                    parentElement.style.position = originalPosition || '';
                }
            }, 300);
        }, duration);

        console.log(`❌ Error mostrado: ${message}`);
    }

    /**
     * Verificar si un modal específico está activo
     */
    isModalActive(modalId) {
        return this.activeModals.has(modalId);
    }

    /**
     * Obtener el número de modales activos
     */
    getActiveModalsCount() {
        return this.activeModals.size;
    }

    /**
     * Limpiar y resetear el gestor
     */
    reset() {
        this.closeAllModals();
        console.log('🪟 ModalManager reseteado');
    }
}

// Crear instancia global del gestor de modales
const modalManager = new ModalManager();

// Hacer disponible globalmente para compatibilidad
window.modalManager = modalManager;

export { modalManager };
export default modalManager;
