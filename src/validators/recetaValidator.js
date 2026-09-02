/**
 * Valida los datos de una receta
 * @param {Object} receta - Objeto con datos de la receta
 * @returns {Object} - { valido: boolean, errores: array }
 */
export const validarReceta = (receta) => {
  const errores = []

  // Validar nombre
  if (!receta.nombre || receta.nombre.trim() === '') {
    errores.push('El nombre de la receta es requerido')
  } else if (receta.nombre.trim().length < 3) {
    errores.push('El nombre debe tener al menos 3 caracteres')
  }

  // Validar categoría
  if (!receta.categoría || receta.categoría.trim() === '') {
    errores.push('La categoría es requerida')
  }

  // Validar tiempo
  if (!receta.tiempo || receta.tiempo === '') {
    errores.push('El tiempo de preparación es requerido')
  } else if (isNaN(receta.tiempo) || receta.tiempo <= 0) {
    errores.push('El tiempo debe ser un número mayor a 0')
  }

  // Validar dificultad
  if (!receta.dificultad || receta.dificultad === '') {
    errores.push('La dificultad es requerida')
  } else if (!['fácil', 'medio', 'difícil'].includes(receta.dificultad)) {
    errores.push('La dificultad debe ser: fácil, medio o difícil')
  }

  // Validar rating (opcional pero si existe debe ser válido)
  if (receta.rating !== undefined && receta.rating !== null && receta.rating !== '') {
    if (isNaN(receta.rating) || receta.rating < 1 || receta.rating > 5) {
      errores.push('El rating debe estar entre 1 y 5')
    }
  }

  return {
    valido: errores.length === 0,
    errores,
  }
}
