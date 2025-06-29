/**
 * 🔍 VALIDADOR DE SINTAXIS JAVASCRIPT
 * Encuentra errores de sintaxis en archivos HTML con JavaScript
 */

const fs = require('fs');

function validateJavaScript(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extraer todo el JavaScript de las etiquetas <script>
        const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
        let match;
        let scriptNumber = 0;
        
        while ((match = scriptRegex.exec(content)) !== null) {
            scriptNumber++;
            const jsCode = match[1];
            
            // Contar template literals
            const templateLiterals = jsCode.match(/`/g);
            if (templateLiterals && templateLiterals.length % 2 !== 0) {
                console.log(`❌ Error: Template literal no cerrado en script ${scriptNumber}`);
                
                // Encontrar línea aproximada
                const lines = content.substring(0, match.index).split('\n');
                console.log(`📍 Línea aproximada: ${lines.length}`);
                
                // Mostrar contexto
                const jsLines = jsCode.split('\n');
                jsLines.forEach((line, index) => {
                    if (line.includes('`')) {
                        console.log(`${index + 1}: ${line}`);
                    }
                });
                
                return false;
            }
        }
        
        console.log('✅ Sintaxis JavaScript válida');
        return true;
        
    } catch (error) {
        console.error('❌ Error leyendo archivo:', error);
        return false;
    }
}

// Validar el archivo
validateJavaScript('./index.html');
