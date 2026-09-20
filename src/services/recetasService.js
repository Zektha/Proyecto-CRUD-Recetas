import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const COLLECTION_NAME = 'recetas'

/**
 * Obtiene todas las recetas de la base de datos
 * @returns {Promise<Array>} - Array de recetas con su id
 */
export const obtenerTodos = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('fechaCreacion', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error al obtener recetas:', error)
    throw error
  }
}

/**
 * Obtiene una receta por su ID
 * @param {string} id - ID de la receta
 * @returns {Promise<Object>} - Objeto con los datos de la receta
 */
export const obtenerPorId = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) {
      throw new Error('La receta no existe')
    }
    return {
      id: snapshot.id,
      ...snapshot.data(),
    }
  } catch (error) {
    console.error('Error al obtener receta:', error)
    throw error
  }
}

/**
 * Crea una nueva receta
 * @param {Object} receta - Objeto con datos de la receta
 * @returns {Promise<string>} - ID del documento creado
 */
export const crear = async (receta) => {
  try {
    if (!auth.currentUser) {
      throw new Error('Debes iniciar sesión para crear recetas')
    }

    const recetaConFecha = {
      ...receta,
      usuarioId: auth.currentUser.uid,
      creadoPor: auth.currentUser.email || 'Usuario',
      fechaCreacion: new Date(),
        favoritos: {},
    }
    const docRef = await addDoc(collection(db, COLLECTION_NAME), recetaConFecha)
    return docRef.id
  } catch (error) {
    console.error('Error al crear receta:', error)
    throw error
  }
}

/**
 * Actualiza una receta existente
 * @param {string} id - ID de la receta
 * @param {Object} receta - Objeto con datos actualizados
 * @returns {Promise<void>}
 */
export const actualizar = async (id, receta) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const recetaActualizada = {
      ...receta,
      fechaActualizacion: new Date(),
    }
    await updateDoc(docRef, recetaActualizada)
  } catch (error) {
    console.error('Error al actualizar receta:', error)
    throw error
  }
}

/**
 * Elimina una receta
 * @param {string} id - ID de la receta
 * @returns {Promise<void>}
 */
export const eliminar = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error al eliminar receta:', error)
    throw error
  }
}

/**
 * Cambia el estado favorito del usuario actual en una receta.
 * @param {string} id - ID de la receta
 * @returns {Promise<number>} - Nuevo estado: 0 o 1
 */
export const cambiarEstado = async (id) => {
  try {
    if (!auth.currentUser) {
      throw new Error('Debes iniciar sesión para marcar favoritos')
    }

    const receta = await obtenerPorId(id)
    const usuarioId = auth.currentUser.uid
    const estadoActual = receta.favoritos?.[usuarioId] === 1 ? 1 : 0
    const nuevoEstado = estadoActual === 1 ? 0 : 1
    const docRef = doc(db, COLLECTION_NAME, id)

    await updateDoc(docRef, {
      [`favoritos.${usuarioId}`]: nuevoEstado,
    })

    return nuevoEstado
  } catch (error) {
    console.error('Error al cambiar favorito:', error)
    throw error
  }
}

/**
 * Busca recetas por nombre
 * @param {string} termino - Término de búsqueda
 * @returns {Promise<Array>} - Array de recetas que coinciden
 */
export const buscarPorNombre = async (termino) => {
  try {
    const todasLasRecetas = await obtenerTodos()
    const terminoLower = termino.toLowerCase()
    return todasLasRecetas.filter((receta) =>
      receta.nombre.toLowerCase().includes(terminoLower)
    )
  } catch (error) {
    console.error('Error al buscar recetas:', error)
    throw error
  }
}
