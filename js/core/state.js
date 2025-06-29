// 🎮 GESTOR CENTRAL DEL ESTADO - OPTIMIZADO
// Maneja toda la lógica de negocio de forma eficiente

const appState = {
    // Estado inicial optimizado
    user: null,
    data: {
        transactions: {},
        investments: [],
        goals: [],
        debts: []
    },
    
    // Configuración de vista
    activeView: 'dashboard',
    currentDate: new Date(),
    currentMonthKey: '',
    themeKey: 'aureoAmanecer',
    theme: null, // Se asigna después de cargar THEMES
    
    // Estados de UI
    isLoading: false,
    isPrivate: false,
    activeModal: null,
    calendarViewYear: new Date().getFullYear(),
    
    // 🚀 MÉTODOS OPTIMIZADOS
    init() {
        this.theme = window.THEMES[this.themeKey];
        this.currentMonthKey = this.getMonthKey();
        this.loadData();
    },
    
    getMonthKey(date = this.currentDate) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    },
    
    // Gestión de datos con localStorage
    saveData() {
        try {
            localStorage.setItem('nebulaFinancialData', JSON.stringify(this.data));
            localStorage.setItem('nebulaSettings', JSON.stringify({
                themeKey: this.themeKey,
                isPrivate: this.isPrivate
            }));
        } catch (error) {
            console.error('Error guardando datos:', error);
        }
    },
    
    loadData() {
        try {
            const data = localStorage.getItem('nebulaFinancialData');
            if (data) {
                this.data = { ...this.data, ...JSON.parse(data) };
            }
            
            const settings = localStorage.getItem('nebulaSettings');
            if (settings) {
                const parsed = JSON.parse(settings);
                this.themeKey = parsed.themeKey || this.themeKey;
                this.isPrivate = parsed.isPrivate || false;
                this.theme = window.THEMES[this.themeKey];
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    },
    
    // Navegación optimizada
    setCurrentView(view) {
        if (this.activeView !== view) {
            this.activeView = view;
            return true; // Indica que cambió
        }
        return false;
    },
    
    // Gestión de modales
    openModal(modalName) {
        this.activeModal = modalName;
    },
    
    closeModal(shouldRenderAppAfter = false) {
        this.activeModal = null;
        if (shouldRenderAppAfter && window.renderApp) {
            window.renderApp();
        }
    },
    
    // Navegación de fechas
    changeMonth(direction) {
        const newDate = new Date(this.currentDate);
        newDate.setMonth(newDate.getMonth() + direction);
        this.currentDate = newDate;
        this.currentMonthKey = this.getMonthKey();
    },
    
    // Gestión de transacciones optimizada
    addTransaction(transaction) {
        const monthKey = this.getMonthKey(new Date(transaction.date));
        if (!this.data.transactions[monthKey]) {
            this.data.transactions[monthKey] = [];
        }
        
        this.data.transactions[monthKey].push({
            ...transaction,
            id: Date.now().toString()
        });
        
        this.saveData();
    },
    
    deleteTransaction(id) {
        Object.keys(this.data.transactions).forEach(monthKey => {
            this.data.transactions[monthKey] = this.data.transactions[monthKey].filter(t => t.id !== id);
        });
        this.saveData();
    },
    
    // Gestión de inversiones
    addInvestment(investment) {
        this.data.investments.push({
            ...investment,
            id: Date.now().toString(),
            currentAmount: investment.initialAmount
        });
        this.saveData();
    },
    
    updateInvestment(id, newAmount) {
        const investment = this.data.investments.find(inv => inv.id === id);
        if (investment) {
            investment.currentAmount = parseFloat(newAmount);
            this.saveData();
        }
    },
    
    deleteInvestment(id) {
        this.data.investments = this.data.investments.filter(inv => inv.id !== id);
        this.saveData();
    },
    
    // Gestión de metas
    addGoal(goal) {
        this.data.goals.push({
            ...goal,
            id: Date.now().toString(),
            saved: 0
        });
        this.saveData();
    },
    
    deleteGoal(id) {
        this.data.goals = this.data.goals.filter(goal => goal.id !== id);
        this.saveData();
    },
    
    // Gestión de deudas
    addDebt(debt) {
        this.data.debts.push({
            ...debt,
            id: Date.now().toString()
        });
        this.saveData();
    },
    
    deleteDebt(id) {
        this.data.debts = this.data.debts.filter(debt => debt.id !== id);
        this.saveData();
    },
    
    // Cambio de tema
    setTheme(themeKey) {
        if (window.THEMES[themeKey]) {
            this.themeKey = themeKey;
            this.theme = window.THEMES[themeKey];
            this.saveData();
            return true;
        }
        return false;
    },
    
    // Toggle privacidad
    togglePrivacy() {
        this.isPrivate = !this.isPrivate;
        this.saveData();
    },
    
    // Autenticación
    login(method = 'guest') {
        this.user = { 
            name: 'Usuario Nebula', 
            method,
            loginTime: Date.now()
        };
        this.isLoading = false;
    },
    
    logout() {
        this.user = null;
        this.activeView = 'dashboard';
    }
};

// 🌐 Exposición global inmediata
window.appState = appState;

// Inicializar cuando esté disponible
if (window.THEMES) {
    appState.init();
} else {
    // Esperar a que se carguen las configuraciones
    window.addEventListener('load', () => appState.init());
}

// Exponer appState globalmente
window.appState = appState;

console.log('✅ Estado de aplicación inicializado - Optimizado');
