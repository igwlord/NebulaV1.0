// Script de diagnóstico global para verificar la disponibilidad de módulos y dependencias

(function () {
    console.log('🔍 Iniciando diagnóstico global...');

    // Verificar si NebulaSecurityUtils está disponible
    if (typeof NebulaSecurityUtils !== 'undefined') {
        console.log('✅ NebulaSecurityUtils está disponible globalmente.');
    } else {
        console.error('❌ NebulaSecurityUtils no está disponible globalmente.');
    }

    // Verificar si otros módulos clave están disponibles
    const modules = ['NebulaAuth', 'NebulaAuthUI', 'appState'];
    modules.forEach(module => {
        if (typeof window[module] !== 'undefined') {
            console.log(`✅ ${module} está disponible globalmente.`);
        } else {
            console.error(`❌ ${module} no está disponible globalmente.`);
        }
    });

    console.log('🔍 Diagnóstico global completado.');
})();
