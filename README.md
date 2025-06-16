# 🌌 Nebula Financial - Tu Universo Financiero

[![Estado](https://img.shields.io/badge/Estado-Producción_Ready-brightgreen)](https://github.com/usuario/nebula-financial)
[![Versión](https://img.shields.io/badge/Versión-8.8_Final-blue)](https://github.com/usuario/nebula-financial/releases)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-green)](LICENSE)
[![Demo](https://img.shields.io/badge/Demo-Live-orange)](https://nebula-financial.netlify.app)

**Aplicación de finanzas personales moderna con IA, temas dinámicos y navegación por teclado.**

## ✨ Características

### 🎯 **Core Features**
- 📊 **Dashboard Intuitivo** - Visualización clara de tu situación financiera
- 💰 **Gestión de Ingresos/Gastos** - Registro y categorización de transacciones
- 🎯 **Metas Financieras** - Establecimiento y seguimiento de objetivos
- 📈 **Inversiones** - Monitoreo de portafolio de inversión
- 💳 **Control de Deudas** - Gestión de obligaciones financieras
- ⚙️ **Configuración Personalizable** - Temas visuales y preferencias

### 🔐 **Seguridad & Autenticación**
- 🔑 **Google OAuth** - Inicio de sesión seguro con tu cuenta Google
- 👥 **Modo Invitado** - Uso sin registro (datos locales)
- 🔒 **Encriptación** - Datos sensibles protegidos
- ☁️ **Sync en la Nube** - Sincronización automática entre dispositivos

### 🎨 **Experiencia de Usuario**
- 🌌 **4 Temas Visuales** - Diseños únicos con efectos de paralaje
- 📱 **Responsive Design** - Optimizado para móvil y desktop
- 🌙 **Modo Privacidad** - Ocultar información sensible
- ⚡ **Rendimiento Optimizado** - Carga rápida y fluida

## 🚀 **Instalación y Configuración**

### **Prerrequisitos**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Cuenta de Firebase (para autenticación)
- Servidor web local (Live Server, http-server, etc.)

### **Setup Rápido**

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/nebula-financial.git
cd nebula-financial
```

2. **Configurar Firebase**
```bash
# Copiar archivo de configuración
cp .env.example .env

# Editar con tus credenciales de Firebase
nano .env
```

3. **Configurar variables de entorno**
```env
FIREBASE_API_KEY=tu-api-key-aqui
FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

4. **Ejecutar servidor local**
```bash
# Con Live Server (VS Code)
# O con http-server
npx http-server -p 8080

# O con Python
python -m http.server 8080
```

5. **Abrir en navegador**
```
http://localhost:8080
```

## 📁 **Estructura del Proyecto**

```
nebula-financial/
├── 📄 index.html              # Versión actual (monolítica)
├── 📄 index-v2.html           # Versión modular con Firebase
├── 📁 css/                    # Estilos separados
│   ├── styles.css
│   ├── themes.css
│   └── components.css
├── 📁 js/                     # Scripts modulares
│   ├── app.js                 # Aplicación principal
│   ├── auth.js                # Autenticación Firebase
│   ├── 📁 components/         # Componentes de UI
│   │   ├── dashboard.js
│   │   ├── transactions.js
│   │   └── settings.js
│   └── 📁 utils/              # Utilidades
│       ├── helpers.js
│       └── api.js
├── 📁 config/                 # Configuraciones
│   └── firebase-config.js
├── 📄 .env                    # Variables de entorno
├── 📄 .gitignore              # Archivos ignorados
└── 📄 README.md               # Este archivo
```

## 🔧 **Configuración de Firebase**

### **1. Crear Proyecto Firebase**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Authentication y Firestore

### **2. Configurar Authentication**
- Habilitar proveedor de Google
- Agregar dominios autorizados
- Configurar OAuth consent screen

### **3. Configurar Firestore**
- Crear base de datos
- Configurar reglas de seguridad
- Definir estructura de colecciones

### **4. Obtener Credenciales**
- Project Settings → General → Web apps
- Copiar configuración al archivo `.env`

## 🎨 **Temas Disponibles**

| Tema | Descripción | Colores |
|------|-------------|---------|
| **Áureo Amanecer** | Tonos dorados con efectos de polvo estelar | 🟡 Dorado/Ámbar |
| **Crisón Vespertino** | Paleta carmesí con niebla misteriosa | 🔴 Rosa/Carmesí |
| **Aguamarina Celeste** | Azules oceánicos con burbujas flotantes | 🔵 Cyan/Azul |
| **Violeta Real** | Púrpuras elegantes con aura real | 🟣 Púrpura/Violeta |

## 📊 **Funcionalidades Detalladas**

### **Dashboard Central**
- Resumen de patrimonio neto
- Balance mensual
- Próximas metas
- SOL central animado con rayos

### **Gestión de Transacciones**
- Registro de ingresos y gastos
- Categorización automática
- Filtros por fecha y tipo
- Repetición automática

### **Metas Financieras**
- Definición de objetivos
- Progreso visual
- Cálculo de tiempo estimado
- Recordatorios

### **Control de Inversiones**
- Seguimiento de portafolio
- Actualización de valores
- Análisis de rendimiento
- Diversificación

## 🔒 **Seguridad y Privacidad**

- ✅ **Autenticación OAuth 2.0**
- ✅ **Encriptación de datos locales**
- ✅ **Reglas de seguridad Firestore**
- ✅ **Modo privacidad integrado**
- ✅ **Sesiones seguras**
- ✅ **Sin tracking de terceros**

## 🚧 **Roadmap**

### **v2.1 - Próximamente**
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Exportación de datos

### **v2.2 - Futuro**
- [ ] Análisis con IA
- [ ] Integración bancaria
- [ ] Reportes avanzados
- [ ] Múltiples monedas

## 🤝 **Contribuciones**

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 **Licencia**

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 📞 **Soporte**

- 📧 Email: soporte@nebula-financial.com
- 💬 Discord: [Nebula Financial Community](https://discord.gg/nebula)
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/nebula-financial/issues)

---

<div align="center">
  <strong>🌌 Desarrollado con ❤️ para tu éxito financiero</strong>
</div>
