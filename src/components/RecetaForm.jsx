import { useState, useEffect, useRef } from 'react'
import { validarReceta } from '../validators/recetaValidator'
import ErrorMessage from './ErrorMessage'

/**
 * Formulario para crear o editar recetas
 */
const RecetaForm = ({ recetaInicial, onSubmit, cargando = false, modo = 'crear' }) => {
  const [receta, setReceta] = useState(
    recetaInicial || {
      nombre: '',
      categoría: '',
      tiempo: '',
      dificultad: '',
      rating: '',
      instrucciones: '',
      ingredientes: '',
    }
  )
  const [errores, setErrores] = useState([])
  const nombreInputRef = useRef(null)

  // Focus en el campo nombre cuando se monta el componente
  useEffect(() => {
    nombreInputRef.current?.focus()
  }, [])

  // Actualizar receta cuando cambia recetaInicial
  useEffect(() => {
    if (recetaInicial) {
      setReceta(recetaInicial)
    }
  }, [recetaInicial])

  const handleChange = (e) => {
    const { name, value } = e.target
    setReceta((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpiar errores cuando el usuario empieza a escribir
    if (errores.length > 0) {
      setErrores([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar
    const { valido, errores: erroresValidacion } = validarReceta(receta)
    if (!valido) {
      setErrores(erroresValidacion)
      return
    }

    try {
      await onSubmit(receta)
      // Limpiar formulario solo si es modo crear
      if (modo === 'crear') {
        setReceta({
          nombre: '',
          categoría: '',
          tiempo: '',
          dificultad: '',
          rating: '',
          instrucciones: '',
          ingredientes: '',
        })
        nombreInputRef.current?.focus()
      }
      setErrores([])
    } catch (error) {
      setErrores([error.message || 'Error al guardar la receta'])
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: '24px', color: '#333' }}>
        {modo === 'crear' ? 'Nueva Receta' : 'Editar Receta'}
      </h2>

      {errores.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          {errores.map((error, idx) => (
            <ErrorMessage
              key={idx}
              mensaje={error}
              onDismiss={() => setErrores(errores.filter((_, i) => i !== idx))}
            />
          ))}
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>
          Nombre *
        </label>
        <input
          ref={nombreInputRef}
          type="text"
          name="nombre"
          value={receta.nombre}
          onChange={handleChange}
          disabled={cargando}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
          placeholder="Ej: Pasta a la Carbonara"
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>
          Categoría *
        </label>
        <input
          type="text"
          name="categoría"
          value={receta.categoría}
          onChange={handleChange}
          disabled={cargando}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
          placeholder="Ej: Italiana, Postres, etc."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>
            Tiempo (minutos) *
          </label>
          <input
            type="number"
            name="tiempo"
            value={receta.tiempo}
            onChange={handleChange}
            disabled={cargando}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
            placeholder="30"
            min="1"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>
            Dificultad *
          </label>
          <select
            name="dificultad"
            value={receta.dificultad}
            onChange={handleChange}
            disabled={cargando}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          >
            <option value="">Seleccionar...</option>
            <option value="fácil">Fácil</option>
            <option value="medio">Medio</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>
          Rating (1-5)
        </label>
        <input
          type="number"
          name="rating"
          value={receta.rating}
          onChange={handleChange}
          disabled={cargando}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
          placeholder="4"
          min="1"
          max="5"
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>
          Ingredientes
        </label>
        <textarea
          name="ingredientes"
          value={receta.ingredientes}
          onChange={handleChange}
          disabled={cargando}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            minHeight: '100px',
            resize: 'vertical',
          }}
          placeholder="Ingresa los ingredientes (uno por línea)"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>
          Instrucciones
        </label>
        <textarea
          name="instrucciones"
          value={receta.instrucciones}
          onChange={handleChange}
          disabled={cargando}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            minHeight: '120px',
            resize: 'vertical',
          }}
          placeholder="Ingresa el paso a paso"
        />
      </div>

      <button
        type="submit"
        disabled={cargando}
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: cargando ? '#ccc' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: cargando ? 'not-allowed' : 'pointer',
        }}
      >
        {cargando ? 'Guardando...' : modo === 'crear' ? 'Crear Receta' : 'Actualizar Receta'}
      </button>
    </form>
  )
}

export default RecetaForm
