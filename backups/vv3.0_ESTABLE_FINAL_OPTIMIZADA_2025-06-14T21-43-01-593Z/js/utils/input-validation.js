/**
 * 🔒 NEBULA INPUT VALIDATION & SANITIZATION
 * Sistema avanzado de validación y sanitización de entrada
 * Protección contra inyección y manipulación de datos
 */

const NebulaInputValidator = {
    /**
     * Patrones de validación seguros
     */
    patterns: {
        // Números financieros
        amount: /^[0-9]+(\.[0-9]{1,2})?$/,
        // Texto alfanumérico con caracteres especiales seguros
        safeText: /^[a-zA-Z0-9\s\-_.,!?()]+$/,
        // Email básico
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        // Fecha YYYY-MM-DD
        date: /^\d{4}-\d{2}-\d{2}$/,
        // Categorías permitidas
        category: /^[a-zA-Z0-9\s\-_]{1,50}$/,
        // Descripción segura
        description: /^[a-zA-Z0-9\s\-_.,!?()]{1,200}$/
    },

    /**
     * Lista de palabras prohibidas para prevenir ataques
     */
    forbiddenWords: [
        'script', 'javascript', 'eval', 'function', 'alert', 'confirm', 'prompt',
        'document', 'window', 'location', 'href', 'innerHTML', 'outerHTML',
        'onload', 'onerror', 'onclick', 'onmouseover', 'onfocus', 'onblur',
        'setTimeout', 'setInterval', 'XMLHttpRequest', 'fetch', 'import',
        'require', 'module', 'exports', 'constructor', 'prototype', '__proto__'
    ],

    /**
     * Validar y sanitizar monto financiero
     * @param {string|number} amount - Monto a validar
     * @returns {object} - {isValid: boolean, value: number, error: string}
     */
    validateAmount(amount) {
        try {
            const str = String(amount).trim();
            
            // Verificar formato
            if (!this.patterns.amount.test(str)) {
                return {
                    isValid: false,
                    value: 0,
                    error: 'Formato de monto inválido. Use formato: 123.45'
                };
            }

            const numValue = parseFloat(str);
            
            // Verificar rango razonable
            if (numValue < 0) {
                return {
                    isValid: false,
                    value: 0,
                    error: 'El monto no puede ser negativo'
                };
            }

            if (numValue > 999999999.99) {
                return {
                    isValid: false,
                    value: 0,
                    error: 'El monto excede el límite máximo'
                };
            }

            return {
                isValid: true,
                value: Math.round(numValue * 100) / 100, // Redondear a 2 decimales
                error: null
            };
        } catch (error) {
            return {
                isValid: false,
                value: 0,
                error: 'Error procesando el monto'
            };
        }
    },

    /**
     * Validar y sanitizar texto libre
     * @param {string} text - Texto a validar
     * @param {number} maxLength - Longitud máxima
     * @returns {object} - {isValid: boolean, value: string, error: string}
     */
    validateText(text, maxLength = 200) {
        try {
            if (typeof text !== 'string') {
                return {
                    isValid: false,
                    value: '',
                    error: 'El texto debe ser una cadena'
                };
            }

            // Sanitizar caracteres peligrosos
            let sanitized = text
                .replace(/[<>]/g, '') // Eliminar < >
                .replace(/[&]/g, '&amp;') // Escapar &
                .replace(/['"]/g, '') // Eliminar comillas
                .trim();

            // Verificar longitud
            if (sanitized.length > maxLength) {
                return {
                    isValid: false,
                    value: sanitized.substring(0, maxLength),
                    error: `El texto excede ${maxLength} caracteres`
                };
            }

            // Verificar palabras prohibidas
            const lowerText = sanitized.toLowerCase();
            const hasForbiddenWord = this.forbiddenWords.some(word => 
                lowerText.includes(word)
            );

            if (hasForbiddenWord) {
                return {
                    isValid: false,
                    value: '',
                    error: 'El texto contiene contenido no permitido'
                };
            }

            return {
                isValid: true,
                value: sanitized,
                error: null
            };
        } catch (error) {
            return {
                isValid: false,
                value: '',
                error: 'Error procesando el texto'
            };
        }
    },

    /**
     * Validar fecha
     * @param {string} date - Fecha en formato YYYY-MM-DD
     * @returns {object} - {isValid: boolean, value: Date, error: string}
     */
    validateDate(date) {
        try {
            const str = String(date).trim();
            
            if (!this.patterns.date.test(str)) {
                return {
                    isValid: false,
                    value: null,
                    error: 'Formato de fecha inválido. Use YYYY-MM-DD'
                };
            }

            const dateObj = new Date(str);
            
            if (isNaN(dateObj.getTime())) {
                return {
                    isValid: false,
                    value: null,
                    error: 'Fecha inválida'
                };
            }

            // Verificar rango razonable (entre 1900 y 2100)
            const year = dateObj.getFullYear();
            if (year < 1900 || year > 2100) {
                return {
                    isValid: false,
                    value: null,
                    error: 'Año fuera del rango válido (1900-2100)'
                };
            }

            return {
                isValid: true,
                value: dateObj,
                error: null
            };
        } catch (error) {
            return {
                isValid: false,
                value: null,
                error: 'Error procesando la fecha'
            };
        }
    },

    /**
     * Validar categoría
     * @param {string} category - Categoría a validar
     * @returns {object} - {isValid: boolean, value: string, error: string}
     */
    validateCategory(category) {
        try {
            const str = String(category).trim();
            
            if (!this.patterns.category.test(str)) {
                return {
                    isValid: false,
                    value: '',
                    error: 'Categoría contiene caracteres no válidos'
                };
            }

            if (str.length < 1 || str.length > 50) {
                return {
                    isValid: false,
                    value: str.substring(0, 50),
                    error: 'La categoría debe tener entre 1 y 50 caracteres'
                };
            }

            return {
                isValid: true,
                value: str,
                error: null
            };
        } catch (error) {
            return {
                isValid: false,
                value: '',
                error: 'Error procesando la categoría'
            };
        }
    },

    /**
     * Validar transacción completa
     * @param {object} transaction - Objeto transacción
     * @returns {object} - {isValid: boolean, data: object, errors: array}
     */
    validateTransaction(transaction) {
        const errors = [];
        const validatedData = {};

        // Validar monto
        const amountResult = this.validateAmount(transaction.amount);
        if (!amountResult.isValid) {
            errors.push(`Monto: ${amountResult.error}`);
        } else {
            validatedData.amount = amountResult.value;
        }

        // Validar descripción
        const descResult = this.validateText(transaction.description, 200);
        if (!descResult.isValid) {
            errors.push(`Descripción: ${descResult.error}`);
        } else {
            validatedData.description = descResult.value;
        }

        // Validar categoría
        const catResult = this.validateCategory(transaction.category);
        if (!catResult.isValid) {
            errors.push(`Categoría: ${catResult.error}`);
        } else {
            validatedData.category = catResult.value;
        }

        // Validar fecha
        const dateResult = this.validateDate(transaction.date);
        if (!dateResult.isValid) {
            errors.push(`Fecha: ${dateResult.error}`);
        } else {
            validatedData.date = dateResult.value.toISOString().split('T')[0];
        }

        // Validar tipo
        if (!['income', 'expense'].includes(transaction.type)) {
            errors.push('Tipo: Debe ser "income" o "expense"');
        } else {
            validatedData.type = transaction.type;
        }

        return {
            isValid: errors.length === 0,
            data: validatedData,
            errors: errors
        };
    },

    /**
     * Generar resumen de validación
     * @param {object} result - Resultado de validación
     * @returns {string} - Mensaje de resumen
     */
    getValidationSummary(result) {
        if (result.isValid) {
            return '✅ Datos válidos y seguros';
        } else {
            return `❌ Errores encontrados:\n${result.errors.join('\n')}`;
        }
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.NebulaInputValidator = NebulaInputValidator;
}
