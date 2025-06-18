/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./index-v2.html", 
    "./js/**/*.js",
    "./css/**/*.css"
  ],
  theme: {
    extend: {
      // Temas personalizados de Nebula Financial
      colors: {
        'nebula-primary': '#1e40af',
        'nebula-secondary': '#7c3aed',
        'nebula-accent': '#f59e0b',
        'nebula-dark': '#0f172a',
        'nebula-light': '#f8fafc'
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-forest': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  // Optimización para producción
  corePlugins: {
    // Deshabilitar plugins no utilizados para reducir tamaño
    aspectRatio: false,
    container: false,
    columns: false,
    breakAfter: false,
    breakBefore: false,
    breakInside: false,
    boxDecorationBreak: false,
  }
}
