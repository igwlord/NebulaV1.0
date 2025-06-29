/**
 * 🔍 VALIDADOR DE SINTAXIS SIMPLE
 * Encuentra problemas de template literals y llaves desbalanceadas
 */

const fs = require('fs');

function validateFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        let templateLiteralCount = 0;
        let braceCount = 0;
        let bracketCount = 0;
        let parenCount = 0;
        
        console.log(`🔍 Validando ${filePath}...\n`);
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineNum = i + 1;
            
            // Contar template literals
            const backticks = (line.match(/`/g) || []).length;
            templateLiteralCount += backticks;
            
            // Contar llaves, corchetes y paréntesis
            braceCount += (line.match(/{/g) || []).length;
            braceCount -= (line.match(/}/g) || []).length;
            
            bracketCount += (line.match(/\[/g) || []).length;
            bracketCount -= (line.match(/\]/g) || []).length;
            
            parenCount += (line.match(/\(/g) || []).length;
            parenCount -= (line.match(/\)/g) || []).length;
            
            // Revisar líneas específicas problemáticas
            if (lineNum === 535 || lineNum === 1862) {
                console.log(`📍 Línea ${lineNum}: ${line.trim()}`);
                
                if (line.includes('}') && !line.includes('{')) {
                    console.log(`   ⚠️  Posible llave extra`);
                }
                
                if (backticks > 0) {
                    console.log(`   ⚠️  Contiene ${backticks} template literal(s)`);
                }
            }
            
            // Detectar errores comunes
            if (line.trim() === '}' && braceCount < 0) {
                console.log(`❌ Línea ${lineNum}: Llave de cierre extra`);
            }
            
            if (line.includes('`') && !line.includes('=') && backticks % 2 !== 0) {
                console.log(`❌ Línea ${lineNum}: Posible template literal mal cerrado`);
            }
        }
        
        console.log('\n📊 RESUMEN:');
        console.log(`Template literals: ${templateLiteralCount % 2 === 0 ? '✅ Balanceados' : '❌ Desbalanceados'}`);
        console.log(`Llaves {}: ${braceCount === 0 ? '✅ Balanceadas' : `❌ Desbalance: ${braceCount}`}`);
        console.log(`Corchetes []: ${bracketCount === 0 ? '✅ Balanceados' : `❌ Desbalance: ${bracketCount}`}`);
        console.log(`Paréntesis (): ${parenCount === 0 ? '✅ Balanceados' : `❌ Desbalance: ${parenCount}`}`);
        
        return templateLiteralCount % 2 === 0 && braceCount === 0;
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        return false;
    }
}

// Validar el archivo
validateFile('./index.html');
