/**
 * 🔍 DETECTOR DE PROBLEMAS DE SINTAXIS NEBULA
 * Identifica problemas comunes en template literals y código JavaScript
 */

const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, 'index.html');

function detectSyntaxIssues() {
    console.log('🔍 Analizando problemas de sintaxis...\n');
    
    try {
        const content = fs.readFileSync(HTML_FILE, 'utf8');
        const lines = content.split('\n');
        let issues = [];
        
        lines.forEach((line, index) => {
            const lineNum = index + 1;
            
            // Detectar template literals con comillas dobles problemáticas
            if (line.includes('`') && line.includes('"')) {
                const backticks = (line.match(/`/g) || []).length;
                const doubleQuotes = (line.match(/"/g) || []).length;
                
                if (backticks % 2 === 1 && doubleQuotes > 0) {
                    issues.push({
                        line: lineNum,
                        type: 'Template Literal',
                        issue: 'Template literal con comillas dobles conflictivas',
                        code: line.trim()
                    });
                }
            }
            
            // Detectar llaves desbalanceadas
            const openBraces = (line.match(/\{/g) || []).length;
            const closeBraces = (line.match(/\}/g) || []).length;
            if (openBraces !== closeBraces && line.trim().length > 0) {
                issues.push({
                    line: lineNum,
                    type: 'Llaves Desbalanceadas',
                    issue: `${openBraces} abiertas, ${closeBraces} cerradas`,
                    code: line.trim()
                });
            }
            
            // Detectar código de live-server
            if (line.includes('_cacheOverride') || 
                line.includes('LiveServer') || 
                line.includes('live reload') ||
                line.includes('WebSocket')) {
                issues.push({
                    line: lineNum,
                    type: 'Live-Server Code',
                    issue: 'Código de live-server detectado',
                    code: line.trim()
                });
            }
            
            // Detectar template literals no terminados
            if (line.includes('`') && !line.includes('`;')) {
                const backticks = (line.match(/`/g) || []).length;
                if (backticks % 2 === 1) {
                    issues.push({
                        line: lineNum,
                        type: 'Template Literal',
                        issue: 'Posible template literal no terminado',
                        code: line.trim()
                    });
                }
            }
        });
        
        // Reportar resultados
        if (issues.length === 0) {
            console.log('✅ No se detectaron problemas de sintaxis evidentes');
        } else {
            console.log(`❌ Se detectaron ${issues.length} posibles problemas:\n`);
            
            issues.forEach((issue, index) => {
                console.log(`${index + 1}. Línea ${issue.line} [${issue.type}]`);
                console.log(`   ${issue.issue}`);
                console.log(`   Código: ${issue.code}`);
                console.log('');
            });
        }
        
    } catch (error) {
        console.error('❌ Error durante el análisis:', error.message);
    }
}

// Ejecutar análisis
detectSyntaxIssues();
