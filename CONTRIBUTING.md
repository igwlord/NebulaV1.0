# Contribuir a Nebula Financial

¡Gracias por tu interés en contribuir a Nebula Financial! Este documento proporciona directrices para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Setup de Desarrollo](#setup-de-desarrollo)
- [Proceso de Contribución](#proceso-de-contribución)
- [Estándares de Código](#estándares-de-código)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)

## 📜 Código de Conducta

Este proyecto adhiere al [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Al participar, se espera que mantengas este código.

## 🤝 ¿Cómo puedo contribuir?

### Tipos de Contribuciones

1. **🐛 Reportar Bugs**: Encontrar y reportar problemas
2. **✨ Nuevas Features**: Proponer y desarrollar funcionalidades
3. **📚 Documentación**: Mejorar guías y documentación
4. **🎨 Diseño/UX**: Mejorar interfaz y experiencia de usuario
5. **🔧 Refactoring**: Mejorar código existente
6. **🧪 Testing**: Agregar o mejorar tests

### Áreas que Necesitan Ayuda

- [ ] **Dashboard Analytics**: Gráficos interactivos con Chart.js
- [ ] **Temas Adicionales**: Nuevos temas visuales y efectos
- [ ] **IA/ML**: Predicción de gastos y auto-categorización
- [ ] **Mobile App**: React Native o Flutter
- [ ] **Integraciones**: APIs bancarias y sincronización
- [ ] **Accesibilidad**: Mejoras WCAG AA
- [ ] **Tests**: Unit tests y end-to-end testing
- [ ] **Documentación**: Guías de usuario y API docs

## 🛠️ Setup de Desarrollo

### Prerrequisitos

- Git
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Node.js (opcional, para herramientas de desarrollo)

### Clonar y Configurar

```bash
# Fork del repositorio en GitHub
# Luego clonar tu fork
git clone https://github.com/TU-USUARIO/nebula-financial.git
cd nebula-financial

# Agregar upstream remote
git remote add upstream https://github.com/usuario-original/nebula-financial.git

# Verificar remotes
git remote -v
```

### Ejecutar Localmente

```bash
# Opción 1: Python (si está instalado)
python -m http.server 8080

# Opción 2: Node.js
npx http-server . -p 8080

# Opción 3: VS Code con Live Server
# Instalar extensión "Live Server"
# Click derecho en index.html -> "Open with Live Server"

# Abrir en navegador
open http://localhost:8080
```

### Estructura del Proyecto

```
nebula-financial/
├── index.html                 # App principal
├── js/
│   ├── app.js                # Core application
│   ├── utils/                # Utilidades
│   ├── components/           # Componentes reutilizables
│   └── modules/              # Módulos de funcionalidad
├── css/                      # Estilos
├── config/                   # Configuraciones
├── docs/                     # Documentación
├── README.md
├── CHANGELOG.md
├── LICENSE
└── CONTRIBUTING.md
```

## 🔄 Proceso de Contribución

### 1. Crear Issue (Opcional pero Recomendado)

Antes de trabajar en una feature grande, crea un issue para discutir:

```
Título: [FEATURE] Descripción breve
Descripción:
- ¿Qué problema resuelve?
- ¿Cómo lo implementarías?
- ¿Rompe algo existente?
```

### 2. Crear Branch

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear branch para tu feature
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/bug-específico
```

### 3. Desarrollar

- Escribe código limpio y bien comentado
- Sigue los estándares de código del proyecto
- Testea tu código en múltiples navegadores
- Actualiza documentación si es necesario

### 4. Commit

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Ejemplos de commits válidos
git commit -m "feat: agregar gráfico de ingresos vs gastos"
git commit -m "fix: corregir navegación A/D en Firefox"
git commit -m "docs: actualizar guía de instalación"
git commit -m "style: mejorar espaciado en dashboard"
git commit -m "refactor: optimizar sistema de temas"
git commit -m "test: agregar tests para calculadora financiera"
```

### 5. Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-descriptivo

# Crear Pull Request en GitHub
# Usar template de PR si existe
```

#### Template de Pull Request

```markdown
## 📝 Descripción

Descripción clara de los cambios realizados.

## 🎯 Tipo de Cambio

- [ ] 🐛 Bug fix
- [ ] ✨ Nueva feature
- [ ] 💥 Breaking change
- [ ] 📚 Documentación
- [ ] 🎨 Styling
- [ ] ♻️ Refactoring
- [ ] ⚡ Performance

## 🧪 Testing

- [ ] Probado en Chrome
- [ ] Probado en Firefox
- [ ] Probado en Safari/Edge
- [ ] Probado en móvil
- [ ] No rompe funcionalidad existente

## 📱 Screenshots (si aplica)

## 📋 Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado auto-review de mi código
- [ ] He comentado código complejo
- [ ] He actualizado documentación
- [ ] Mis cambios no generan warnings
```

## 📏 Estándares de Código

### JavaScript

```javascript
// ✅ BIEN: Usar const/let, no var
const appState = {
    activeView: 'dashboard'
};

// ✅ BIEN: Funciones descriptivas con JSDoc
/**
 * 💰 Formatea número como moneda
 * @param {number} value - Valor a formatear
 * @returns {string} Valor formateado como moneda
 */
function formatCurrency(value) {
    return `$${formatNumberWithDots(value)}`;
}

// ✅ BIEN: Manejo de errores
try {
    const data = JSON.parse(localStorage.getItem('financialData'));
    return data || {};
} catch (error) {
    console.error('Error parsing financial data:', error);
    return {};
}

// ❌ MAL: Variables globales sin namespace
var data = {};

// ❌ MAL: Funciones sin documentación
function calc(a, b) {
    return a + b;
}
```

### CSS

```css
/* ✅ BIEN: Clases descriptivas con BEM o utility-first */
.dashboard-summary-card {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
}

/* ✅ BIEN: Variables CSS para temas */
:root {
    --primary-color: #fcd34d;
    --surface-color: rgba(0, 0, 0, 0.2);
}

/* ❌ MAL: Clases genéricas */
.card {
    background: black;
}
```

### HTML

```html
<!-- ✅ BIEN: Semántica y accesibilidad -->
<button 
    id="add-transaction" 
    class="btn btn-primary"
    aria-label="Agregar nueva transacción"
    role="button">
    Agregar Transacción
</button>

<!-- ❌ MAL: Sin semántica -->
<div onclick="addTransaction()">Add</div>
```

### Convenciones de Naming

```javascript
// Variables: camelCase
const userBalance = 1000;
const isAuthenticated = true;

// Constantes: UPPER_SNAKE_CASE
const API_ENDPOINTS = {
    TRANSACTIONS: '/api/transactions'
};

// Funciones: camelCase con verbo
function calculateMonthlyTotal() {}
function renderDashboard() {}

// Clases: PascalCase
class TransactionManager {}

// Archivos: kebab-case
// income-module.js
// transaction-validator.js
```

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Busca issues existentes** para evitar duplicados
2. **Reproduce el bug** en la última versión
3. **Testea en múltiples navegadores** si es posible

### Template de Bug Report

```markdown
## 🐛 Bug Report

### Descripción
Descripción clara del bug.

### Pasos para Reproducir
1. Ir a '...'
2. Hacer click en '...'
3. Scrollear hasta '...'
4. Ver error

### Comportamiento Esperado
Qué debería pasar.

### Comportamiento Actual
Qué pasa realmente.

### Screenshots
Si aplica, agregar screenshots.

### Información del Sistema
- OS: [e.g. Windows 10, macOS Big Sur]
- Navegador: [e.g. Chrome 91, Firefox 89]
- Versión App: [e.g. 8.8.0]

### Información Adicional
Cualquier otra información relevante.
```

## ✨ Solicitar Features

### Template de Feature Request

```markdown
## 🚀 Feature Request

### ¿El feature está relacionado a un problema?
Descripción clara del problema. "Estoy siempre frustrado cuando [...]"

### Describe la solución que te gustaría
Descripción clara de lo que quieres que pase.

### Describe alternativas consideradas
Otras soluciones o features que consideraste.

### Información Adicional
Screenshots, mockups, o cualquier contexto adicional.

### Complejidad Estimada
- [ ] Baja (1-2 horas)
- [ ] Media (1-2 días)
- [ ] Alta (1+ semanas)

### ¿Estarías dispuesto a implementarlo?
- [ ] Sí, puedo hacerlo
- [ ] Sí, con mentoría
- [ ] No, solo la idea
```

## 🏷️ Labels y Prioridades

### Labels de Tipo
- `bug` - Algo no funciona
- `enhancement` - Nueva feature o mejora
- `documentation` - Mejoras en documentación
- `good first issue` - Bueno para nuevos contribuidores
- `help wanted` - Se busca ayuda externa

### Labels de Prioridad
- `priority: critical` - Rompe funcionalidad principal
- `priority: high` - Importante para próximo release
- `priority: medium` - Sería bueno tener
- `priority: low` - Wishlist

### Labels de Dificultad
- `difficulty: easy` - 1-2 horas
- `difficulty: medium` - 1-2 días
- `difficulty: hard` - 1+ semanas

## 🎉 Reconocimiento

Todos los contribuidores serán agregados al README en la sección de contribuidores. Las contribuciones significativas pueden resultar en acceso de escritura al repositorio.

### Tipos de Contribuciones Reconocidas

- 📖 Documentación
- 💻 Código
- 🎨 Diseño
- 🐛 Bug reports
- 💡 Ideas/Planning
- 🚇 Infraestructura
- 🔧 Herramientas
- 🌍 Traducción
- ⚠️ Tests
- 💬 Answering Questions

## 🤔 ¿Tienes Preguntas?

- **GitHub Discussions**: Para preguntas generales
- **GitHub Issues**: Para bugs específicos
- **Email**: contribuir@nebula-financial.com

¡Gracias por contribuir a Nebula Financial! 🌌
