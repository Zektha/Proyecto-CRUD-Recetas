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
        const datos = await obtenerPorId(id)
        setReceta(datos)
      } catch {
        setError('No se pudo cargar la receta solicitada')
      } finally {
        setCargando(false)
      }
    }

    cargarDetalle()
  }, [id])

  if (cargando) {
    return <LoadingSpinner mensaje="Cargando detalle de la receta..." />
  }

  if (error) {
    return (
      <div style={{ padding: '32px 20px' }}>
        <ErrorMessage mensaje={error} onDismiss={() => setError('')} />
      </div>
    )
  }

  if (!receta) {
    return null
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '20px',
          padding: '8px 14px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >
        ← Volver
      </button>

      <article
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          padding: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{ margin: 0, color: '#64748b', textTransform: 'uppercase', fontSize: '12px' }}>
              {receta.categoría}
            </p>
            <h1 style={{ margin: '8px 0 0', color: '#111827' }}>{receta.nombre}</h1>
          </div>

          {usuario?.uid === receta.usuarioId && (
            <button
              onClick={() => navigate(`/recetas/${id}/editar`)}
              style={{
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#10b981',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Editar
            </button>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px' }}>
            <strong>Tiempo</strong>
            <div>{receta.tiempo} min</div>
          </div>
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px' }}>
            <strong>Dificultad</strong>
            <div>{receta.dificultad}</div>
          </div>
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px' }}>
            <strong>Rating</strong>
            <div>{receta.rating || 'Sin rating'} / 5</div>
          </div>
        </div>

        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Ingredientes</h3>
          <p style={{ whiteSpace: 'pre-line', color: '#374151', margin: 0 }}>
            {receta.ingredientes || 'No hay ingredientes cargados.'}
          </p>
        </section>

        <section>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Instrucciones</h3>
          <p style={{ whiteSpace: 'pre-line', color: '#374151', margin: 0 }}>
            {receta.instrucciones || 'No hay instrucciones cargadas.'}
          </p>
        </section>
      </article>
    </div>
  )
}

export default RecetaDetail
