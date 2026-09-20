import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { obtenerPorId } from '../services/recetasService'

const RecetaDetail = ({ usuario }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [receta, setReceta] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        setCargando(true)
        setReceta(await obtenerPorId(id))
      } catch {
        setError('No se pudo cargar la receta solicitada')
      } finally {
        setCargando(false)
      }
    }
    cargarDetalle()
  }, [id])

  if (cargando) return <LoadingSpinner mensaje="Cargando detalle de la receta..." />
  if (error) return <main className="content-shell"><ErrorMessage mensaje={error} onDismiss={() => setError('')} /></main>
  if (!receta) return null

  return (
    <main className="content-shell">
      <div className="detail-shell">
        <button className="button button--quiet" onClick={() => navigate('/')}>← Volver</button>
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <p className="detail-category">{receta.categoría}</p>
              <h1>{receta.nombre}</h1>
            </div>
            {usuario?.uid === receta.usuarioId && <button className="button button--primary" onClick={() => navigate(`/recetas/${id}/editar`)}>Editar</button>}
          </div>

          {receta.etiquetas?.length > 0 && <div className="tag-list">{receta.etiquetas.map((etiqueta) => <span className="tag" key={etiqueta}>{etiqueta}</span>)}</div>}

          <div className="detail-stats">
            <div className="detail-stat"><strong>Tiempo</strong><span>{receta.tiempo} min</span></div>
            <div className="detail-stat"><strong>Dificultad</strong><span>{receta.dificultad}</span></div>
            <div className="detail-stat"><strong>Rating</strong><span>{receta.rating || 'Sin rating'} / 5</span></div>
          </div>

          <section className="detail-section">
            <h3>Ingredientes</h3>
            <p>{receta.ingredientes || 'No hay ingredientes cargados.'}</p>
          </section>
          <section className="detail-section">
            <h3>Instrucciones</h3>
            <p>{receta.instrucciones || 'No hay instrucciones cargadas.'}</p>
          </section>
        </article>
      </div>
    </main>
  )
}

export default RecetaDetail
