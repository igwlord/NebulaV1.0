const NebulaSecurityUtils = require('../js/utils/security.js');

// Test básico para verificar si NebulaSecurityUtils está definido y funcional
try {
    console.log('🔍 Probando NebulaSecurityUtils...');

    // Verificar inicialización
    NebulaSecurityUtils.init();
    console.log('✅ NebulaSecurityUtils inicializado correctamente.');

    // Probar generación de clave
    NebulaSecurityUtils.generateEncryptionKey();
    if (NebulaSecurityUtils.encryptionKey) {
        console.log('✅ Clave de cifrado generada correctamente:', NebulaSecurityUtils.encryptionKey);
    } else {
        console.error('❌ Error: No se generó la clave de cifrado.');
    }

    // Probar cifrado y descifrado
    const testText = 'Texto de prueba';
    const encrypted = NebulaSecurityUtils.encrypt(testText);
    const decrypted = NebulaSecurityUtils.decrypt(encrypted);

    if (decrypted === testText) {
        console.log('✅ Cifrado y descifrado funcionan correctamente.');
    } else {
        console.error('❌ Error en cifrado/descifrado:', { encrypted, decrypted });
    }

    console.log('🔍 Pruebas completadas.');
} catch (error) {
    console.error('❌ Error durante las pruebas:', error);
}
