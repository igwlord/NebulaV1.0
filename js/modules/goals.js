// ===============================================
// 🎯 GOALS MODULE - VERSION CLEAN SIN EXPORTS
// ===============================================

const GoalsModule = {    render() {
        const goals = window.appState?.data?.goals || [];
        
        return `
            <div class="p-8 text-white">
                <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 mb-6">
                    <h2 class="text-3xl font-bold mb-4">🎯 Metas Financieras</h2>
                    <p class="text-blue-100 mb-4">Define y alcanza tus objetivos financieros</p>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors" 
                            onclick="GoalsModule.showAddForm()">
                        ➕ Nueva Meta
                    </button>
                </div>
                
                <div class="grid gap-4">
                    ${goals.length === 0 ? 
                        '<div class="text-center text-gray-400 py-8">No hay metas definidas</div>' :
                        goals.map(goal => this.renderGoalCard(goal)).join('')
                    }
                </div>
            </div>
        `;
    },
    
    renderGoalCard(goal) {
        const progress = goal.current / goal.target * 100;
        return `
            <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">${goal.name}</h3>
                    <div class="flex gap-2">
                        <button class="text-blue-400 hover:text-blue-300" onclick="GoalsModule.edit(${goal.id})">✏️</button>
                        <button class="text-red-400 hover:text-red-300" onclick="GoalsModule.delete(${goal.id})">🗑️</button>
                    </div>
                </div>
                <p class="text-gray-300 mb-4">${goal.description}</p>
                <div class="mb-4">
                    <div class="flex justify-between text-sm mb-2">
                        <span>Progreso</span>
                        <span>${progress.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(progress, 100)}%"></div>
                    </div>
                </div>
                <div class="flex justify-between text-sm text-gray-400">
                    <span>Actual: $${window.formatCurrency ? window.formatCurrency(goal.current) : goal.current}</span>
                    <span>Meta: $${window.formatCurrency ? window.formatCurrency(goal.target) : goal.target}</span>
                </div>
            </div>
        `;
    },
    
    showAddForm() {
        console.log('🎯 Mostrando formulario de nueva meta');
    },
    
    edit(goalId) {
        console.log('🎯 Editando meta:', goalId);
    },
    
    delete(goalId) {
        console.log('🎯 Eliminando meta:', goalId);
    },
    
    init() {
        console.log('🎯 GoalsModule inicializado correctamente');
    }
};

// ✅ EXPOSICIÓN GLOBAL - SIN EXPORT STATEMENTS
if (typeof window !== 'undefined') {
    window.GoalsModule = GoalsModule;
    console.log('🎯 GoalsModule expuesto globalmente');
}
