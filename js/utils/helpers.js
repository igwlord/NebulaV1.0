/**
 * 🛠️ NEBULA FINANCIAL - UTILIDADES Y HELPERS
 * ============================================
 * Funciones utilitarias y helpers para la aplicación
 */

// ===============================================
// 🎨 TEMAS VISUALES
// ===============================================
export const THEMES = {
    aureoAmanecer: { 
        name: 'Áureo Amanecer', 
        gradient: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 40%, #0f1419 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffd700\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3Ccircle cx=\'27\' cy=\'27\' r=\'1\'/%3E%3Ccircle cx=\'47\' cy=\'47\' r=\'1\'/%3E%3Ccircle cx=\'17\' cy=\'37\' r=\'0.5\'/%3E%3Ccircle cx=\'37\' cy=\'17\' r=\'0.5\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', 
        accent: 'text-amber-300', 
        accentBg: 'bg-amber-400', 
        accentGlow: 'shadow-[0_0_25px_rgba(251,191,36,0.8)]', 
        accentColor: '#FCD34D', 
        accentBorder: 'border-amber-300', 
        accentRing: 'focus:ring-amber-300', 
        positive: 'text-emerald-300', 
        negative: 'text-rose-300', 
        surface: 'bg-black/20 border-amber-200/30 backdrop-blur-md', 
        textPrimary: 'text-amber-50', 
        textSecondary: 'text-amber-200/80', 
        particleType: 'goldenDust',
        sunColor: '#FFD700'
    },
    crisonVespertino: { 
        name: 'Crisón Vespertino', 
        gradient: 'radial-gradient(ellipse at center, #2d1b3d 0%, #4a1942 40%, #1a0f1a 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ff6b9d\' fill-opacity=\'0.08\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3Ccircle cx=\'27\' cy=\'27\' r=\'1\'/%3E%3Ccircle cx=\'47\' cy=\'47\' r=\'1\'/%3E%3Ccircle cx=\'17\' cy=\'37\' r=\'0.5\'/%3E%3Ccircle cx=\'37\' cy=\'17\' r=\'0.5\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', 
        accent: 'text-rose-300', 
        accentBg: 'bg-rose-400', 
        accentGlow: 'shadow-[0_0_25px_rgba(251,113,133,0.8)]', 
        accentColor: '#FB7185', 
        accentBorder: 'border-rose-300', 
        accentRing: 'focus:ring-rose-300', 
        positive: 'text-teal-300', 
        negative: 'text-orange-300', 
        surface: 'bg-black/20 border-rose-200/30 backdrop-blur-md', 
        textPrimary: 'text-rose-50', 
        textSecondary: 'text-rose-200/80', 
        particleType: 'crimsonMist',
        sunColor: '#FF4C6A'
    },
    aguamarinaCeleste: { 
        name: 'Aguamarina Celeste', 
        gradient: 'radial-gradient(ellipse at center, #0f2027 0%, #203a43 40%, #0c1419 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2367e8f9\' fill-opacity=\'0.08\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3Ccircle cx=\'27\' cy=\'27\' r=\'1\'/%3E%3Ccircle cx=\'47\' cy=\'47\' r=\'1\'/%3E%3Ccircle cx=\'17\' cy=\'37\' r=\'0.5\'/%3E%3Ccircle cx=\'37\' cy=\'17\' r=\'0.5\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', 
        accent: 'text-cyan-300', 
        accentBg: 'bg-cyan-400', 
        accentGlow: 'shadow-[0_0_25px_rgba(103,232,249,0.8)]', 
        accentColor: '#67E8F9', 
        accentBorder: 'border-cyan-300', 
        accentRing: 'focus:ring-cyan-300', 
        positive: 'text-lime-300', 
        negative: 'text-amber-300', 
        surface: 'bg-black/20 border-cyan-200/30 backdrop-blur-md', 
        textPrimary: 'text-cyan-50', 
        textSecondary: 'text-cyan-200/80', 
        particleType: 'aquaFlow',
        sunColor: '#00CED1'
    },
    violetaReal: { 
        name: 'Violeta Real', 
        gradient: 'radial-gradient(ellipse at center, #1e1b4b 0%, #312e81 40%, #111827 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a855f7\' fill-opacity=\'0.08\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3Ccircle cx=\'27\' cy=\'27\' r=\'1\'/%3E%3Ccircle cx=\'47\' cy=\'47\' r=\'1\'/%3E%3Ccircle cx=\'17\' cy=\'37\' r=\'0.5\'/%3E%3Ccircle cx=\'37\' cy=\'17\' r=\'0.5\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', 
        accent: 'text-purple-300', 
        accentBg: 'bg-purple-500', 
        accentGlow: 'shadow-[0_0_25px_rgba(168,85,247,0.8)]', 
        accentColor: '#A855F7', 
        accentBorder: 'border-purple-300', 
        accentRing: 'focus:ring-purple-300', 
        positive: 'text-green-300', 
        negative: 'text-red-300', 
        surface: 'bg-black/20 border-purple-200/30 backdrop-blur-md', 
        textPrimary: 'text-purple-50', 
        textSecondary: 'text-purple-200/80', 
        particleType: 'royalAura',
        sunColor: '#8B5CF6'
    }
};

// ===============================================
// 🎨 ICONOS SVG VECTORIALES
// ===============================================
export const ICONS = {
    dashboard: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>`,
    income: `<circle cx="12" cy="12" r="10"/><path d="m8 12 4-4 4 4"/><path d="M12 8v8"/>`,
    expenses: `<circle cx="12" cy="12" r="10"/><path d="m8 12 4 4 4-4"/><path d="M12 8v8"/>`,
    goals: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>`,
    investments: `<path d="M3 3v18h18"/><path d="m4 14 4-4 4 4 6-6"/>`,
    debts: `<rect x="1" y="4" width="22" height="16" rx="3" ry="3"/><line x1="1" y1="10" x2="23" y2="10"/>`,
    achievements: `<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
    settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
    plus: `<path d="M12 5v14m-7-7h14" />`,
    trash: `<path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
    eye: `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
    eyeOff: `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a18.35 18.35 0 0 1-2.18 3.2M3.5 12a10.43 10.43 0 0 1 2.22-3.2"/><path d="M1 1l22 22"/>`,
    chevronLeft: `<path d="m15 18-6-6 6-6"/>`,
    chevronRight: `<path d="m9 18 6-6-6-6"/>`,
    history: `<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>`,
    mail: `<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`,
    zap: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`,
    x: `<path d="M18 6 6 18M6 6l12 12"/>`,
    calendar: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
    check: `<polyline points="20 6 9 17 4 12"/>`,
    alertCircle: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/>`,
    info: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/>`,
    alertTriangle: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/>`,
    repeat: `<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>`,
    copy: `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`
};

// ===============================================
// 📂 CATEGORÍAS DE GASTOS
// ===============================================
export const CATEGORIES = ['Comida', 'Transporte', 'Ocio', 'Hogar', 'Salud', 'Educación', 'Regalos', 'Varios'];

// ===============================================
// 🛠️ FUNCIONES UTILITARIAS
// ===============================================

/**
 * 🖼️ Crear icono SVG
 * @param {string} iconPath - Path del icono SVG
 * @param {string} className - Clases CSS del icono
 * @returns {string} HTML del icono
 */
export function createIcon(iconPath, className = 'w-6 h-6') {
    return `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${iconPath}</svg>`;
}

/**
 * 💰 Formatear cantidad como moneda
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada
 */
export function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * 🔢 Formatear número con puntos
 * @param {string|number} value - Valor a formatear
 * @returns {string} Número formateado
 */
export function formatNumberWithDots(value) {
    if (!value) return '';
    const numStr = value.toString().replace(/\D/g, '');
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * 🔢 Parsear número con puntos
 * @param {string} value - Valor con puntos
 * @returns {number} Número parseado
 */
export function parseNumberWithDots(value) {
    if (!value) return 0;
    return parseInt(value.replace(/\./g, '')) || 0;
}

/**
 * 🔢 Parsear número formateado (alias para compatibilidad)
 * @param {string|number} value - Valor formateado
 * @returns {number} Número sin formato
 */
export function parseFormattedNumber(value) {
    return parseNumberWithDots(value);
}

/**
 * 📅 Generar clave de mes
 * @param {Date} date - Fecha
 * @returns {string} Clave del mes (YYYY-MM)
 */
export function getMonthKey(date = new Date()) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

/**
 * 📅 Obtener nombre del mes
 * @param {Date} date - Fecha
 * @returns {string} Nombre del mes
 */
export function getMonthName(date = new Date()) {
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

/**
 * 🎲 Generar ID único
 * @returns {string} ID único
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 💾 Guardar en localStorage de forma segura
 * @param {string} key - Clave
 * @param {any} data - Datos a guardar
 */
export function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error guardando en localStorage:', error);
    }
}

/**
 * 📥 Obtener de localStorage de forma segura
 * @param {string} key - Clave
 * @param {any} defaultValue - Valor por defecto
 * @returns {any} Datos obtenidos
 */
export function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error leyendo de localStorage:', error);
        return defaultValue;
    }
}

/**
 * 🎨 Obtener color del tema actual
 * @param {object} theme - Tema actual
 * @param {string} property - Propiedad del color
 * @returns {string} Color hexadecimal
 */
export function getThemeColor(theme, property = 'accentColor') {
    return theme[property] || '#FFD700';
}

/**
 * 📱 Detectar si es dispositivo móvil
 * @returns {boolean} True si es móvil
 */
export function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 🌙 Obtener saludo según la hora
 * @returns {string} Saludo personalizado
 */
export function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
}

/**
 * 🎯 Debounce function para optimizar rendimiento
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función debounced
 */
export function debounce(func, wait) {
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

/**
 * 📊 Calcular porcentaje de progreso
 * @param {number} current - Valor actual
 * @param {number} target - Valor objetivo
 * @returns {number} Porcentaje (0-100)
 */
export function calculateProgress(current, target) {
    if (target <= 0) return 0;
    return Math.min(Math.max((current / target) * 100, 0), 100);
}

/**
 * 🔄 Animar contador numérico
 * @param {HTMLElement} element - Elemento a animar
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} duration - Duración en ms
 */
export function animateCounter(element, start, end, duration = 1000) {
    if (!element) return;
    
    const startTime = performance.now();
    const range = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);
        
        element.textContent = Math.round(current).toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * 🎨 Interpolar entre dos colores
 * @param {string} color1 - Color inicial (hex)
 * @param {string} color2 - Color final (hex)
 * @param {number} factor - Factor de interpolación (0-1)
 * @returns {string} Color interpolado
 */
export function interpolateColor(color1, color2, factor) {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}


