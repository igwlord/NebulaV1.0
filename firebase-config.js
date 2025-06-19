/**
 * 🔥 CONFIGURACIÓN DE FIREBASE - PRODUCCIÓN
 * Credenciales reales para login con Gmail
 */

// 🚀 Configuración de Firebase REAL (Producción)
const firebaseConfig = {
    apiKey: "AIzaSyCk9hfIQXFQoPplvcdWqM62dbpl5L5Hzcg",
    authDomain: "nebula-v2-94054.firebaseapp.com",
    projectId: "nebula-v2-94054",
    storageBucket: "nebula-v2-94054.firebasestorage.app",
    messagingSenderId: "1052460930493",
    appId: "1:1052460930493:web:3c7b8c8e8c9f4e5f6g7h8i"
};

// Función para obtener la configuración
export const getFirebaseConfig = () => {
    console.log('🚀 Cargando configuración de Firebase REAL para producción');
    return firebaseConfig;
};

// Exportar por defecto también
export default getFirebaseConfig;
