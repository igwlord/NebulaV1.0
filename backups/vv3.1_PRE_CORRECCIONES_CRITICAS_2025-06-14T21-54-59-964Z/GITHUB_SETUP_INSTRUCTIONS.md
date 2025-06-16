# 📋 INSTRUCCIONES PARA CREAR REPOSITORIO EN GITHUB

## Opción 1: Crear Repositorio Manual (Recomendado)

### 1. Crear en GitHub.com
1. Ir a [GitHub.com](https://github.com)
2. Clic en el botón **"New"** (verde) o **"+"** → **"New repository"**
3. Llenar los datos:
   - **Repository name**: `nebula-financial`
   - **Description**: `🌌 Nebula Financial - Tu Universo Finansiero | Modern Financial Management Web App`
   - **Visibility**: `Public` (o Private si prefieres)
   - ❌ **NO** marcar "Add a README file" (ya tenemos uno)
   - ❌ **NO** marcar "Add .gitignore" (ya tenemos uno)
   - ❌ **NO** marcar "Choose a license" (podemos añadir después)
4. Clic en **"Create repository"**

### 2. Conectar Repositorio Local
Después de crear el repositorio, GitHub te mostrará comandos similares a estos:

```bash
git remote add origin https://github.com/TU_USUARIO/nebula-financial.git
git branch -M main
git push -u origin main
```

### 3. Usar el Comando Automático
Una vez que tengas la URL de tu repositorio, ejecuta:

```bash
# Reemplaza TU_USUARIO con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/nebula-financial.git
git branch -M main  
git push -u origin main
```

## Opción 2: Crear con GitHub CLI (Si tienes gh instalado)

```bash
# Instalar GitHub CLI si no lo tienes
# https://cli.github.com/

# Crear repositorio y subirlo
gh repo create nebula-financial --public --description "🌌 Nebula Financial - Modern Financial Management Web App"
git remote add origin https://github.com/TU_USUARIO/nebula-financial.git
git branch -M main
git push -u origin main
```

## 📝 Próximos Pasos Después de Subir a GitHub

1. ✅ Verificar que todos los archivos se subieron correctamente
2. 🔧 Editar README.md con la URL correcta del repositorio
3. 🚀 Proceder con el deploy en Netlify
4. 🌟 (Opcional) Añadir topics/tags al repositorio en GitHub
5. 📄 (Opcional) Añadir una licencia MIT

## 🎯 Información del Proyecto

- **Nombre**: Nebula Financial
- **Versión**: 2.0.0
- **Estado**: Estable y listo para producción
- **Archivos principales**: `index-v2.html`, carpetas `js/`, `css/`, `config/`
- **Funcionalidad**: 100% operativa en modo offline y con Google Auth

## ⚠️ IMPORTANTE

**¡Asegúrate de reemplazar `TU_USUARIO` con tu nombre de usuario real de GitHub!**

Una vez que subas el repositorio, me avisas y continuamos con el deploy en Netlify.
