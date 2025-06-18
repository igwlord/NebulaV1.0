# 🌌 Nebula Financial - Tu Universo Financiero

![Nebula Financial](https://img.shields.io/badge/Version-2.0.0-blue.svg)
![Status](https://img.shields.io/badge/Status-Stable-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📖 Descripción

**Nebula Financial** es una aplicación web moderna y elegante para la gestión de finanzas personales. Diseñada con una interfaz intuitiva tipo macOS y funcionalidad completa offline.

### ✨ Características Principales

- 🎯 **Dashboard Interactivo** - Visualización clara de tu estado financiero
- 💰 **Gestión de Transacciones** - Registro y categorización inteligente
- 📊 **Gráficos Dinámicos** - Análisis visual con Chart.js
- 🎨 **Interfaz Moderna** - Diseño elegante con Tailwind CSS
- 🔐 **Autenticación Dual** - Google Login + Modo Invitado offline
- 📱 **Responsive Design** - Funciona perfectamente en móviles
- 🌙 **Temas Personalizables** - Modo claro y oscuro
- ⚡ **Performance Optimizada** - Carga rápida y fluida

## 🚀 Demo en Vivo

**🔗 [Ver Demo](https://nebula-financial.netlify.app)**

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Estilos**: Tailwind CSS
- **Gráficos**: Chart.js
- **Autenticación**: Firebase Auth
- **Base de Datos**: Firebase Firestore + localStorage
- **Deploy**: Netlify

## 📦 Instalación Local

### Opción 1: Servidor Simple
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/nebula-financial.git
cd nebula-financial

# Servir con Python
python -m http.server 8000

# O con Node.js
npx serve .
```

### Opción 2: Live Server (Recomendado)
1. Instalar extensión "Live Server" en VS Code
2. Abrir proyecto en VS Code
3. Clic derecho en `index-v2.html` → "Open with Live Server"

## 🔧 Configuración

### Firebase (Opcional)
Para habilitar Google Login, configura Firebase:

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Editar `config/firebase-config.js` con tus credenciales
3. Habilitar Authentication → Google Provider
4. Agregar dominios autorizados

### Modo Offline
La aplicación funciona completamente sin Firebase usando:
- **Almacenamiento**: localStorage
- **Persistencia**: Datos locales
- **Funcionalidad**: 100% disponible

## 📁 Estructura del Proyecto

```
nebula-financial/
├── index-v2.html          # Archivo principal
├── config/
│   └── firebase-config.js # Configuración Firebase
├── css/
│   ├── styles.css         # Estilos principales
│   ├── themes.css         # Temas y variables
│   └── components.css     # Componentes UI
├── js/
│   ├── app.js            # Controlador principal
│   ├── auth.js           # Sistema de autenticación
│   ├── components/       # Componentes modulares
│   └── utils/            # Utilidades y helpers
└── docs/                 # Documentación del proyecto
```

## 🎮 Uso

### Modo Invitado (Inmediato)
1. Abrir la aplicación
2. Clic en **"Entrar como Invitado"**
3. ✅ Acceso completo sin registro

### Google Login (Opcional)
1. Configurar Firebase
2. Clic en **"Iniciar con Google"**
3. Autorizar permisos
4. ✅ Sincronización en la nube

## 🌟 Funcionalidades

### 💰 Gestión Financiera
- ➕ Agregar ingresos y gastos
- 🏷️ Categorización automática
- 📊 Análisis de patrones de gasto
- 🎯 Metas de ahorro
- 💳 Seguimiento de deudas

### 📈 Análisis y Reportes
- 📊 Gráficos interactivos
- 📅 Análisis por períodos
- 🔍 Filtros avanzados
- 📋 Resúmenes detallados

### ⚙️ Personalización
- 🎨 Temas de color
- 🔔 Notificaciones personalizadas
- ⌨️ Atajos de teclado
- 🌐 Configuración de idioma

## 🚧 Roadmap

- [ ] Modo PWA (Progressive Web App)
- [ ] Exportar datos a PDF/Excel
- [ ] Recordatorios y notificaciones push
- [ ] Integración con bancos (Open Banking)
- [ ] Análisis con AI/ML
- [ ] Versión móvil nativa

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Nebula Team**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- Iconos de [Heroicons](https://heroicons.com/)
- Gráficos con [Chart.js](https://www.chartjs.org/)
- Estilos con [Tailwind CSS](https://tailwindcss.com/)
- Hosting en [Netlify](https://netlify.com/)

---

⭐ **¡Si te gusta el proyecto, dale una estrella!** ⭐
