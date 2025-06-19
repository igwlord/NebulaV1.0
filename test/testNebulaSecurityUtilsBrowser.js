// Script para probar si NebulaSecurityUtils está disponible globalmente en el navegador

if (typeof NebulaSecurityUtils !== 'undefined') {
    console.log('✅ NebulaSecurityUtils está disponible globalmente.');

    // Probar inicialización
    try {
        NebulaSecurityUtils.init();
        console.log('✅ NebulaSecurityUtils inicializado correctamente.');
    } catch (error) {
        console.error('❌ Error al inicializar NebulaSecurityUtils:', error);
    }

    // Probar generación de clave
    try {
        NebulaSecurityUtils.generateEncryptionKey();
        if (NebulaSecurityUtils.encryptionKey) {
            console.log('✅ Clave de cifrado generada correctamente:', NebulaSecurityUtils.encryptionKey);
        } else {
            console.error('❌ Error: No se generó la clave de cifrado.');
        }
    } catch (error) {
        console.error('❌ Error al generar la clave de cifrado:', error);
    }
} else {
    console.error('❌ NebulaSecurityUtils no está disponible globalmente.');
}
