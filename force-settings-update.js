// Script para forzar actualización del módulo Settings
console.log('🔧 Script de actualización de Settings ejecutándose...');

// 1. Verificar disponibilidad del módulo
if (window.NebulaSettingsModule) {
    console.log('✅ NebulaSettingsModule encontrado');
    
    // 2. Forzar actualización si estamos en la vista de settings
    const contentRoot = document.getElementById('content-root');
    if (contentRoot) {
        console.log('✅ content-root encontrado');
        
        // 3. Renderizar nuevo contenido
        contentRoot.innerHTML = window.NebulaSettingsModule.render();
        
        // 4. Reinicializar el módulo
        window.NebulaSettingsModule.init();
        
        console.log('🎉 Módulo de Settings actualizado exitosamente');
        console.log('💡 Navega a la sección "Ajustes" para ver los cambios');
        
        // 5. Mostrar notificación si la función está disponible
        if (window.NebulaSettingsModule.showNotification) {
            window.NebulaSettingsModule.showNotification('🔄 Módulo actualizado - Ve a Ajustes', 'success');
        }
    } else {
        console.log('❌ content-root no encontrado');
    }
} else {
    console.log('❌ NebulaSettingsModule no disponible');
    console.log('🔍 Módulos disponibles:', Object.keys(window).filter(key => key.includes('Module')));
}

// 6. Información de debug
console.log('🐛 Para forzar actualización manual:');
console.log('   window.SettingsModuleDebug.forceUpdate()');
console.log('🐛 Para navegar a settings:');
console.log('   showView("settings")');
