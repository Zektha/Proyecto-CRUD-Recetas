import { useEffect, useRef, useState } from 'react'
import { ETIQUETAS_RECETA } from '../constants/etiquetas'
import { validarReceta } from '../validators/recetaValidator'
import ErrorMessage from './ErrorMessage'

const recetaVacia = {
  nombre: '',
  categoría: '',
  tiempo: '',
  dificultad: '',
  rating: '',
  instrucciones: '',
  ingredientes: '',
  etiquetas: [],
}

const RecetaForm = ({ recetaInicial, onSubmit, cargando = false, modo = 'crear' }) => {
  const [receta, setReceta] = useState(recetaInicial || recetaVacia)
  const [errores, setErrores] = useState([])
  const nombreInputRef = useRef(null)

  useEffect(() => {
    nombreInputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (recetaInicial) setReceta({ ...recetaInicial, etiquetas: recetaInicial.etiquetas || [] })
  }, [recetaInicial])

  const handleChange = (e) => {
    const { name, value } = e.target
    setReceta((prev) => ({ ...prev, [name]: value }))
    if (errores.length > 0) setErrores([])
  }

  const alternarEtiqueta = (etiqueta) => {
    setReceta((prev) => ({
      ...prev,
      etiquetas: prev.etiquetas?.includes(etiqueta)
        ? prev.etiquetas.filter((item) => item !== etiqueta)
        : [...(prev.etiquetas || []), etiqueta],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { valido, errores: erroresValidacion } = validarReceta(receta)
    if (!valido) {
      setErrores(erroresValidacion)
      return
    }

    try {
      await onSubmit(receta)
      if (modo === 'crear') {
        setReceta({ ...recetaVacia })
        nombreInputRef.current?.focus()
      }
      setErrores([])
    } catch (error) {
      setErrores([error.message || 'Error al guardar la receta'])
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{modo === 'crear' ? 'Nueva receta' : 'Editar receta'}</h2>

      {errores.length > 0 && (
        <div>
          {errores.map((error, idx) => (
            <ErrorMessage key={idx} mensaje={error} onDismiss={() => setErrores(errores.filter((_, i) => i !== idx))} />
          ))}
        </div>
      )}

      <div className="form-field">
        <label className="field-label" htmlFor="nombre">Nombre *</label>
        <input ref={nombreInputRef} className="field-input" id="nombre" type="text" name="nombre" value={receta.nombre} onChange={handleChange} disabled={cargando} placeholder="Ej: Pasta a la Carbonara" />
      </div>

      <div className="form-field">
        <label className="field-label" htmlFor="categoría">Categoría *</label>
        <input className="field-input" id="categoría" type="text" name="categoría" value={receta.categoría} onChange={handleChange} disabled={cargando} placeholder="Ej: Italiana, casera, etc." />
      </div>

      <fieldset className="tag-fieldset">
        <legend>Etiquetas</legend>
        <div className="tag-selector">
          {ETIQUETAS_RECETA.map((etiqueta) => {
            const seleccionada = receta.etiquetas?.includes(etiqueta)
            return (
              <label className={`tag-option ${seleccionada ? 'tag-option--selected' : ''}`} key={etiqueta}>
                <input type="checkbox" checked={seleccionada} onChange={() => alternarEtiqueta(etiqueta)} disabled={cargando} />
                {etiqueta}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="form-grid">
        <div className="form-field">
          <label className="field-label" htmlFor="tiempo">Tiempo (minutos) *</label>
          <input className="field-input" id="tiempo" type="number" name="tiempo" value={receta.tiempo} onChange={handleChange} disabled={cargando} placeholder="30" min="1" />
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="dificultad">Dificultad *</label>
          <select className="field-select" id="dificultad" name="dificultad" value={receta.dificultad} onChange={handleChange} disabled={cargando}>
            <option value="">Seleccionar...</option>
            <option value="fácil">Fácil</option>
            <option value="medio">Medio</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label className="field-label" htmlFor="rating">Rating (1-5)</label>
        <input className="field-input" id="rating" type="number" name="rating" value={receta.rating} onChange={handleChange} disabled={cargando} placeholder="4" min="1" max="5" />
      </div>

      <div className="form-field">
        <label className="field-label" htmlFor="ingredientes">Ingredientes</label>
        <textarea className="field-textarea" id="ingredientes" name="ingredientes" value={receta.ingredientes} onChange={handleChange} disabled={cargando} placeholder="Ingresa los ingredientes (uno por línea)" />
      </div>

      <div className="form-field">
        <label className="field-label" htmlFor="instrucciones">Instrucciones</label>
        <textarea className="field-textarea" id="instrucciones" name="instrucciones" value={receta.instrucciones} onChange={handleChange} disabled={cargando} placeholder="Ingresa el paso a paso" />
      </div>

      <button className="button button--primary form-submit" type="submit" disabled={cargando}>
        {cargando ? 'Guardando...' : modo === 'crear' ? 'Crear receta' : 'Actualizar receta'}
      </button>
    </form>
  )
}

export default RecetaForm
