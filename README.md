# 🌌 Nebula Financial v1.0 - Personal Finance Universe

> **Tu universo financiero personal - La experiencia financiera más avanzada del universo**

![Nebula Financial](https://img.shields.io/badge/Nebula-Financial-gold?style=for-the-badge&logo=star)
![Version](https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Stable-green?style=for-the-badge)

## ✨ Características Principales

### 🎯 **Login Ultra Simple**
- **🌐 Ingresar con Google** - Autenticación OAuth segura
- **👤 Entrar como Invitado** - Modo exploración sin registro
- **✉️ Crear cuenta con correo** - Registro tradicional con verificación

### 💰 **Gestión Financiera Completa**
- **📊 Dashboard Inteligente** - Resumen visual de tu situación financiera
- **💸 Gastos e Ingresos** - Seguimiento detallado con categorías
- **🎯 Metas Financieras** - Define y alcanza tus objetivos
- **📈 Inversiones** - Monitoreo de tu portafolio
- **💳 Gestión de Deudas** - Control y planificación de pagos

### 🎨 **Experiencia Visual Épica**
- **🌌 Fondo Parallax Dinámico** - Partículas y efectos visuales
- **🎭 5 Temas Únicos** - Aureo Amanecer, Crisón Vespertino, Aguamarina, Violeta Real
- **📱 Responsive Design** - Optimizado para móviles y desktop
- **🔒 Modo Privado** - Oculta información sensible

## 🚀 Deploy en Netlify

### Configuración Automática
Esta aplicación está optimizada para deploy directo en Netlify:

1. **Conecta tu repositorio** a Netlify
2. **Build settings**:
   - **Build command**: `# No build required - Static files`
   - **Publish directory**: `/` (raíz del proyecto)
3. **Variables de entorno** (opcional):
   - `FIREBASE_API_KEY`: Tu API key de Firebase
   - `FIREBASE_PROJECT_ID`: Tu project ID

### 🔧 Características Netlify-Ready

- ✅ **Archivos estáticos** - No requiere build process
- ✅ **SPA Friendly** - Configurado para Single Page Application
- ✅ **PWA Ready** - Service Worker y manifest incluidos
- ✅ **CDN Optimized** - Resources cargados desde CDN
- ✅ **HTTPS by Default** - Seguridad integrada

## 📁 Estructura del Proyecto

```
nebula-financial/
├── 📄 index.html              # Punto de entrada principal
├── 📄 manifest.json           # PWA manifest
├── 📄 sw.js                   # Service Worker
├── 🎨 css/
│   ├── styles.css             # Estilos principales
│   ├── themes.css             # Temas visuales
│   └── components.css         # Componentes específicos
├── ⚡ js/
│   ├── 🔧 core/
│   │   ├── config.js          # Configuración global
│   │   └── state.js           # Gestión de estado
│   ├── 🔐 auth/
│   │   └── firebase-auth.js   # Sistema de autenticación
│   ├── 🧩 modules/
│   │   ├── dashboard.js       # Dashboard principal
│   │   ├── income.js          # Gestión de ingresos
│   │   ├── expenses.js        # Gestión de gastos
│   │   ├── goals.js           # Metas financieras
│   │   ├── investments.js     # Inversiones
│   │   └── debts.js           # Gestión de deudas
│   ├── 🎨 components/
│   │   ├── notifications.js   # Sistema de notificaciones
│   │   └── modals.js          # Componentes modales
│   └── 🛠️ utils/
│       ├── helpers.js         # Funciones auxiliares
│       ├── security.js        # Utilidades de seguridad
│       └── validation.js      # Validación de datos
├── 🖼️ images/
│   └── 🎯 dock/               # Iconos de navegación
└── 🔧 config/
    └── firebase-config.js     # Configuración Firebase
```

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind CSS (CDN)
- **Auth**: Firebase Authentication
- **Storage**: Firebase Firestore
- **PWA**: Service Worker, Web App Manifest
- **Charts**: Chart.js
- **Security**: CSP Headers, Input Sanitization

## ⚡ Instalación y Uso

### 1. **Clone el repositorio**
```bash
git clone https://github.com/igwlord/NebulaV1.0.git
cd NebulaV1.0
```

### 2. **Configurar Firebase** (Opcional)
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilita Authentication y Firestore
3. Actualiza `config/firebase-config.js` con tus credenciales

### 3. **Servidor local**
```bash
# Con Live Server (VS Code)
# O cualquier servidor estático
python -m http.server 8000
# O
npx serve .
```

### 4. **Deploy en Netlify**
1. Fork este repositorio
2. Conecta tu cuenta de Netlify con GitHub
3. Selecciona el repositorio
4. Deploy automático ✨

## 🔒 Seguridad

- **🛡️ CSP Headers** - Content Security Policy
- **🔐 Input Sanitization** - Prevención XSS
- **🔑 Secure Storage** - Datos sensibles encriptados
- **📱 HTTPS Only** - Comunicación segura
- **🚫 No Sensitive Data** - Keys no expuestas en código

## 🎯 Roadmap

- [ ] **📊 Reportes Avanzados** - Gráficos y análisis
- [ ] **🔄 Importar/Exportar** - CSV, Excel, PDF
- [ ] **🤖 IA Financiera** - Consejos personalizados
- [ ] **📲 App Mobile** - React Native / Flutter
- [ ] **🌐 Multi-idioma** - i18n integration
- [ ] **👥 Colaboración** - Finanzas familiares

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.

## 🌟 Autor

**IgwLord** - *Desarrollo completo* - [@igwlord](https://github.com/igwlord)

---

<div align="center">

**🌌 Hecho con ❤️ y mucho ☕ para revolucionar las finanzas personales**

[🌐 Demo Live](https://nebula-financial.netlify.app) | [📚 Docs](https://docs.nebula-financial.com) | [🐛 Issues](https://github.com/igwlord/NebulaV1.0/issues)

</div>
