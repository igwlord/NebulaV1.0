// 🌟 CONFIGURACIÓN GLOBAL - NEBULA FINANCIAL
// Archivo optimizado para carga rápida

// 🎨 TEMAS VISUALES OPTIMIZADOS
const THEMES = {
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
        gradient: 'radial-gradient(ellipse at center, #2d1b69 0%, #11101d 40%, #0f0f23 100%)',
        accent: 'text-rose-300',
        accentBg: 'bg-rose-500',
        accentGlow: 'shadow-[0_0_25px_rgba(244,63,94,0.8)]',
        accentColor: '#FB7185',
        accentBorder: 'border-rose-300',
        accentRing: 'focus:ring-rose-300',
        positive: 'text-emerald-300',
        negative: 'text-orange-300',
        surface: 'bg-black/20 border-rose-200/30 backdrop-blur-md',
        textPrimary: 'text-rose-50',
        textSecondary: 'text-rose-200/80',
        particleType: 'crimsonMist',
        sunColor: '#FF4C6A'
    },
    aguamarinaCeleste: { 
        name: 'Aguamarina Celeste',
        gradient: 'radial-gradient(ellipse at center, #134e4a 0%, #042f2e 40%, #0f1419 100%)',
        accent: 'text-cyan-300',
        accentBg: 'bg-cyan-500',
        accentGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.8)]',
        accentColor: '#22D3EE',
        accentBorder: 'border-cyan-300',
        accentRing: 'focus:ring-cyan-300',
        positive: 'text-emerald-300',
        negative: 'text-rose-300',
        surface: 'bg-black/20 border-cyan-200/30 backdrop-blur-md',
        textPrimary: 'text-cyan-50',
        textSecondary: 'text-cyan-200/80',
        particleType: 'aquaFlow',
        sunColor: '#00CED1'
    },
    violetaReal: {
        name: 'Violeta Real',
        gradient: 'radial-gradient(ellipse at center, #581c87 0%, #3b0764 40%, #1e1b4b 100%)',
        accent: 'text-purple-300',
        accentBg: 'bg-purple-500',
        accentGlow: 'shadow-[0_0_25px_rgba(147,51,234,0.8)]',
        accentColor: '#A855F7',
        accentBorder: 'border-purple-300',
        accentRing: 'focus:ring-purple-300',
        positive: 'text-emerald-300',
        negative: 'text-rose-300',
        surface: 'bg-black/20 border-purple-200/30 backdrop-blur-md',
        textPrimary: 'text-purple-50',
        textSecondary: 'text-purple-200/80',
        particleType: 'royalAura',
        sunColor: '#8B5CF6'
    }
};

// 🎯 ICONOS SVG OPTIMIZADOS
const ICONS = {
    dashboard: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>`,
    income: `<circle cx="12" cy="12" r="10"/><path d="m8 12 4-4 4 4"/><path d="M12 8v8"/>`,
    expenses: `<circle cx="12" cy="12" r="10"/><path d="m8 12 4 4 4-4"/><path d="M12 8v8"/>`,
    goals: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>`,
    investments: `<path d="M3 3v18h18"/><path d="m4 14 4-4 4 4 6-6"/>`,
    debts: `<rect x="1" y="4" width="22" height="16" rx="3" ry="3"/><line x1="1" y1="10" x2="23" y2="10"/>`,
    achievements: `<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
    settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
    calendar: `<rect x="3" y="4" width="18" height="18" rx="3" ry="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 2v4M16 2v4" stroke="currentColor" stroke-width="2"/><rect x="3" y="10" width="18" height="2" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/>`,
    plus: `<path d="M12 5v14m-7-7h14" />`,
    trash: `<path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
    eye: `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
    eyeOff: `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a18.35 18.35 0 0 1-2.18 3.2M3.5 12a10.43 10.43 0 0 1 2.22-3.2"/><path d="M1 1l22 22"/>`,
    chevronLeft: `<path d="m15 18-6-6 6-6"/>`,
    chevronRight: `<path d="m9 18 6-6-6-6"/>`,
    check: `<polyline points="20 6 9 17 4 12"/>`,
    x: `<path d="M18 6 6 18M6 6l12 12"/>`
};

// 📂 CATEGORÍAS DE GASTOS
const CATEGORIES = ['Comida', 'Transporte', 'Ocio', 'Hogar', 'Salud', 'Educación', 'Regalos', 'Varios'];

// 🔧 FUNCIONES AUXILIARES OPTIMIZADAS
const formatNumberWithDots = (value) => {
    if (value == null) return '0';
    return parseFloat(value).toLocaleString('es-CO', { maximumFractionDigits: 0 });
};

const formatCurrency = (value) => value != null ? `$${formatNumberWithDots(value)}` : '$0';

const parseFormattedNumber = (value) => parseFloat(String(value).replace(/\./g, '')) || 0;

const createIcon = (path, className = "w-6 h-6") => 
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">${path}</svg>`;

// 🌐 EXPOSICIÓN GLOBAL INMEDIATA
window.THEMES = THEMES;
window.ICONS = ICONS;
window.CATEGORIES = CATEGORIES;
window.formatCurrency = formatCurrency;
window.formatNumberWithDots = formatNumberWithDots;
window.parseFormattedNumber = parseFormattedNumber;
window.createIcon = createIcon;

console.log('✅ Configuración global cargada - Optimizada para rendimiento');
