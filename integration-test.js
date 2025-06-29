// ===============================================
// 🔧 SCRIPT DE INTEGRACIÓN COMPLETA - Settings Modernizado
// ===============================================

console.log('🚀 Iniciando integración completa del módulo Settings...');

// 1. Verificar que todo esté disponible
function verifyIntegration() {
    console.log('🔍 Verificando disponibilidad de módulos...');
    
    const checks = {
        NebulaSettingsModule: !!window.NebulaSettingsModule,
        SettingsModuleDebug: !!window.SettingsModuleDebug,
        appState: !!window.appState,
        appStateSetTheme: !!(window.appState && window.appState.setTheme),
        showView: !!window.showView,
        THEMES: !!window.THEMES,
        contentRoot: !!document.getElementById('content-root')
    };
    
    console.table(checks);
    
    const allGood = Object.values(checks).every(Boolean);
    console.log(allGood ? '✅ Todas las dependencias disponibles' : '❌ Faltan dependencias');
    
    return allGood;
}

// 2. Forzar navegación a settings y actualización
function forceSettingsUpdate() {
    console.log('🔄 Forzando actualización de settings...');
    
    // Navegar a settings
    if (window.showView) {
        window.showView('settings');
        console.log('✅ Navegado a vista de settings');
    }
    
    // Esperar un momento y forzar actualización
    setTimeout(() => {
        if (window.SettingsModuleDebug) {
            window.SettingsModuleDebug.forceUpdate();
            console.log('✅ Módulo actualizado');
        }
    }, 500);
}

// 3. Probar cambio de tema
function testThemeChange(themeId = 'esmeraldaBosque') {
    console.log(`🎨 Probando cambio de tema a: ${themeId}`);
    
    if (window.NebulaSettingsModule) {
        window.NebulaSettingsModule.changeTheme(themeId);
        console.log('✅ Tema cambiado');
        
        // Verificar que se aplicó
        setTimeout(() => {
            if (window.appState) {
                console.log('🎯 Tema actual en appState:', window.appState.themeKey);
            }
        }, 1000);
    } else {
        console.log('❌ NebulaSettingsModule no disponible');
    }
}

// 4. Script principal
async function runIntegration() {
    console.log('🎯 Ejecutando integración completa...');
    
    // Verificar dependencias
    if (!verifyIntegration()) {
        console.log('❌ No se puede continuar sin todas las dependencias');
        return;
    }
    
    // Actualizar settings
    forceSettingsUpdate();
    
    // Esperar y probar tema
    setTimeout(() => {
        console.log('🎨 Probando temas disponibles...');
        const themes = ['aureoAmanecer', 'crisonVespertino', 'aguamarinaCeleste', 'violetaReal', 'esmeraldaBosque', 'rosaAurora'];
        console.log('🎭 Temas disponibles:', themes);
        
        // Mostrar información de debugging
        console.log('🐛 Comandos útiles:');
        console.log('   - Cambiar tema: NebulaSettingsModule.changeTheme("esmeraldaBosque")');
        console.log('   - Actualizar vista: SettingsModuleDebug.forceUpdate()');
        console.log('   - Ir a settings: showView("settings")');
        console.log('   - Ver tema actual: appState.themeKey');
        
        // Probar un tema
        testThemeChange('esmeraldaBosque');
        
    }, 2000);
}

// Ejecutar
runIntegration();

// Exportar funciones útiles
window.SettingsIntegration = {
    verify: verifyIntegration,
    update: forceSettingsUpdate,
    testTheme: testThemeChange,
    run: runIntegration
};

console.log('🎉 Script de integración cargado. Usa SettingsIntegration.run() para ejecutar.');
