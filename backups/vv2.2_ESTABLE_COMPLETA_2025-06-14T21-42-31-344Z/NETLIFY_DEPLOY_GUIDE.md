# 🚀 GUÍA DE DEPLOY EN NETLIFY

## PASO 1: Subir Código a GitHub
1. ✅ **Completado**: Repositorio local creado y commitado
2. 🔄 **En proceso**: Crear repositorio en GitHub y hacer push
3. ⏳ **Siguiente**: Deploy en Netlify

## PASO 2: Deploy en Netlify

### Opción A: Deploy desde GitHub (Recomendado)

#### 1. Crear Cuenta en Netlify
- Ir a [netlify.com](https://netlify.com)
- Registrarse con GitHub (más fácil)

#### 2. Conectar Repositorio
1. En Netlify Dashboard, clic en **"New site from Git"**
2. Seleccionar **"GitHub"**
3. Autorizar Netlify para acceder a tus repositorios
4. Seleccionar el repositorio **"nebula-financial"**

#### 3. Configurar Build Settings
```
Build command: (dejar vacío o escribir "echo 'Static site ready'")
Publish directory: . (punto - directorio raíz)
```

#### 4. Deploy Settings Avanzados
- **Branch to deploy**: `main`
- **Build command**: (vacío)
- **Publish directory**: `.` (punto)
- **Functions directory**: (vacío)

#### 5. Hacer Deploy
- Clic en **"Deploy site"**
- ✅ Netlify automáticamente:
  - Clonará tu repositorio
  - Detectará que es un sitio estático
  - Desplegará todos los archivos
  - Generará una URL aleatoria (ej: `amazing-curie-123456.netlify.app`)

### Opción B: Deploy Manual (Drag & Drop)

#### 1. Preparar Archivos
- Comprimir toda la carpeta del proyecto en ZIP
- O arrastrar la carpeta directamente

#### 2. Deploy Manual
1. Ir a [netlify.com/drop](https://netlify.com/drop)
2. Arrastrar la carpeta del proyecto
3. ✅ Deploy inmediato

## PASO 3: Configuración Post-Deploy

### 1. Personalizar URL
1. En Netlify Dashboard → Site settings
2. Cambiar site name a: `nebula-financial` (si está disponible)
3. URL final: `nebula-financial.netlify.app`

### 2. Configurar Dominio Personalizado (Opcional)
- Si tienes dominio propio: `Settings > Domain management`
- Configurar DNS según las instrucciones

### 3. HTTPS Automático
- ✅ Netlify activa HTTPS automáticamente
- Certificado SSL gratuito

### 4. Variables de Entorno (Para Firebase)
Si tienes configuración sensible:
1. `Site settings > Environment variables`
2. Agregar variables si es necesario
3. En nuestro caso, no es necesario (config hardcodeado)

## PASO 4: Verificación

### ✅ Checkist Post-Deploy
1. **Aplicación carga**: Verificar que `index-v2.html` se abre
2. **Modo Invitado funciona**: Probar login sin Firebase
3. **Google Login funciona**: Si Firebase está configurado
4. **Responsive**: Probar en móvil
5. **Performance**: Verificar velocidad de carga
6. **HTTPS**: Confirmar que usa SSL

### 🔧 URLs de Prueba
- **Aplicación principal**: `https://tu-sitio.netlify.app/`
- **Archivo específico**: `https://tu-sitio.netlify.app/index-v2.html`

## PASO 5: Monitoreo y Mantenimiento

### Analytics (Opcional)
- Netlify Analytics (premium)
- Google Analytics (gratis)
- Firebase Analytics (si usas Firebase)

### Auto-Deploy
- ✅ **Configurado**: Cada push a `main` despliega automáticamente
- 🔄 **Build time**: ~1-2 minutos
- 📧 **Notificaciones**: Email cuando deploy completa

## 🚨 Solución de Problemas Comunes

### Deploy Falla
```bash
# Verificar archivos localmente
python -m http.server 8000
# Abrir http://localhost:8000/index-v2.html
```

### Firebase no funciona en producción
- Verificar dominios autorizados en Firebase Console
- Agregar: `tu-sitio.netlify.app`

### CSS/JS no cargan
- Verificar rutas relativas en HTML
- Confirmar estructura de carpetas

## 🎉 RESULTADO FINAL

Una vez completado:
- ✅ **URL pública**: `https://nebula-financial.netlify.app`
- ✅ **HTTPS automático**
- ✅ **Deploy automático** desde GitHub
- ✅ **Performance optimizada**
- ✅ **Aplicación 100% funcional**

---

**¡Tu aplicación estará disponible mundialmente en menos de 5 minutos!** 🌍
