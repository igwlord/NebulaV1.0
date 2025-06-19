# 🔥 Guía de Configuración Firebase para Nebula Financial

## 📋 Pasos para Configurar Firebase

### 1. Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombra tu proyecto (ej: "nebula-financial-tuNombre")
4. Sigue los pasos del asistente

### 2. Configurar Authentication
1. En el panel izquierdo, ve a "Authentication"
2. Haz clic en "Comenzar"
3. Ve a la pestaña "Sign-in method"
4. Habilita "Google" como proveedor
5. Configura los emails autorizados si es necesario

### 3. Obtener Configuración Web
1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. En la sección "Tus apps", haz clic en "</>" (web)
3. Registra tu app con un nombre
4. Copia la configuración que aparece

### 4. Configurar Dominios Autorizados
1. En "Authentication" > "Settings"
2. Ve a "Authorized domains"
3. Agrega:
   - `localhost` (para desarrollo)
   - `127.0.0.1` (para desarrollo)
   - Tu dominio de producción cuando hagas deploy

### 5. Actualizar Configuración Local
1. Abre `firebase-config.js`
2. Reemplaza los valores en `firebaseConfig` con tu configuración real
3. Guarda el archivo

## 🚀 Configuración de Ejemplo

```javascript
export const firebaseConfig = {
    apiKey: "AIzaSyC...", // Tu API Key
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
```

## 🔍 Verificar Funcionamiento

1. Abre la aplicación en `http://localhost:8000/index-LAB.html`
2. Haz clic en "Continuar con Google"
3. Debería abrirse un popup de Google para autenticación
4. Después del login, verás tu nombre en la aplicación

## ⚠️ Problemas Comunes

### Popup Bloqueado
- Permite popups para localhost en tu navegador
- Verifica que no haya bloqueadores de popups activos

### Error de Dominio
- Asegúrate de haber agregado localhost a los dominios autorizados
- Revisa que la configuración esté correcta

### Error de Red
- Verifica tu conexión a internet
- Asegúrate de que Firebase esté accesible

## 🛠️ Modo de Desarrollo

Si no quieres configurar Firebase inmediatamente:
- La app funcionará en modo local
- Puedes usar "Continuar como Invitado"
- Los datos se guardarán localmente en tu navegador

## 📱 Para Producción

Cuando subas a un servidor:
1. Agrega tu dominio real a los dominios autorizados
2. Actualiza la configuración en `firebase-config.js`
3. Considera habilitar otros métodos de autenticación

---

¡Tu aplicación Nebula Financial estará lista con autenticación de Google! 🌌
