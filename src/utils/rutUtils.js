/**
 * Utilidades para validar y formatear RUT chileno
 */

/**
 * Valida si un RUT tiene el formato correcto
 * @param {string} rut - RUT a validar
 * @returns {boolean} - true si es válido, false si no
 */
export const validarRUT = (rut) => {
  if (!rut || typeof rut !== 'string') return false;
  
  // Limpiar el RUT (quitar puntos y espacios)
  const rutLimpio = rut.replace(/[^0-9kK-]/g, '');
  
  // Verificar formato básico: 7-8 dígitos + guión + dígito verificador
  const regex = /^[0-9]{7,8}-[0-9kK]$/;
  if (!regex.test(rutLimpio)) return false;
  
  // Separar número y dígito verificador
  const [numero, dv] = rutLimpio.split('-');
  
  // Calcular dígito verificador
  const dvCalculado = calcularDigitoVerificador(numero);
  
  // Comparar dígito verificador (case insensitive)
  return dv.toUpperCase() === dvCalculado.toUpperCase();
};

/**
 * Calcula el dígito verificador de un RUT
 * @param {string} numero - Número del RUT sin guión ni dígito verificador
 * @returns {string} - Dígito verificador calculado
 */
export const calcularDigitoVerificador = (numero) => {
  let suma = 0;
  let multiplicador = 2;
  
  // Recorrer el número de derecha a izquierda
  for (let i = numero.length - 1; i >= 0; i--) {
    suma += parseInt(numero[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  
  const resto = suma % 11;
  const dv = 11 - resto;
  
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return dv.toString();
};

/**
 * Formatea un RUT al formato estándar (12345678-9)
 * @param {string} rut - RUT a formatear
 * @returns {string} - RUT formateado o string vacío si es inválido
 */
export const formatearRUT = (rut) => {
  if (!rut || typeof rut !== 'string') return '';
  
  // Limpiar el RUT (quitar puntos, espacios, guiones)
  const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  
  // Si no tiene dígito verificador, agregarlo
  if (rutLimpio.length >= 7 && rutLimpio.length <= 8) {
    const numero = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
    return `${numero}-${dv.toUpperCase()}`;
  }
  
  // Si solo tiene el número, calcular el DV
  if (rutLimpio.length >= 7 && rutLimpio.length <= 8 && !/[kK]/.test(rutLimpio)) {
    const dv = calcularDigitoVerificador(rutLimpio);
    return `${rutLimpio}-${dv}`;
  }
  
  return '';
};

/**
 * Valida y formatea un RUT en tiempo real mientras el usuario escribe
 * @param {string} valor - Valor actual del input
 * @returns {string} - Valor formateado para mostrar
 */
export const formatearRUTEnTiempoReal = (valor) => {
  if (!valor) return '';
  
  // Solo permitir números, K y guión
  const valorLimpio = valor.replace(/[^0-9kK-]/g, '');
  
  // Si ya tiene guión, mantenerlo
  if (valorLimpio.includes('-')) {
    const [numero, dv] = valorLimpio.split('-');
    if (numero.length <= 8 && dv.length <= 1) {
      return valorLimpio;
    }
    return valorLimpio.slice(0, 10); // Limitar a 10 caracteres máximo
  }
  
  // Si no tiene guión y tiene más de 7 dígitos, agregar guión automáticamente
  if (valorLimpio.length > 7 && /^[0-9]+$/.test(valorLimpio)) {
    return `${valorLimpio.slice(0, 8)}-${valorLimpio.slice(8)}`;
  }
  
  return valorLimpio.slice(0, 9); // Limitar a 9 caracteres máximo sin guión
};

/**
 * Obtiene el mensaje de error para un RUT inválido
 * @param {string} rut - RUT a validar
 * @returns {string} - Mensaje de error o string vacío si es válido
 */
export const obtenerMensajeErrorRUT = (rut) => {
  if (!rut) return 'El RUT es obligatorio';
  
  const rutLimpio = rut.replace(/[^0-9kK-]/g, '');
  
  if (rutLimpio.length < 9) return 'El RUT debe tener al menos 7 dígitos';
  if (rutLimpio.length > 10) return 'El RUT no puede tener más de 8 dígitos';
  if (!rutLimpio.includes('-')) return 'El RUT debe incluir un guión separador';
  
  const regex = /^[0-9]{7,8}-[0-9kK]$/;
  if (!regex.test(rutLimpio)) return 'Formato de RUT inválido (ej: 12345678-9)';
  
  if (!validarRUT(rutLimpio)) return 'El RUT ingresado no es válido';
  
  return '';
};
