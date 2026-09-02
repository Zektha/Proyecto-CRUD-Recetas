import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RecetaForm from '../components/RecetaForm'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { actualizar, obtenerPorId } from '../services/recetasService'

const EditReceta = ({ usuario }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [receta, setReceta] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarReceta = async () => {
      try {
        setCargando(true)
        const datos = await obtenerPorId(id)

        if (usuario?.uid && datos.usuarioId !== usuario.uid) {
          navigate('/', { replace: true })
          return
        }

        setReceta(datos)
      } catch {
        setError('No se pudo cargar la receta')
      } finally {
        setCargando(false)
      }
    }

    cargarReceta()
  }, [id])

  const handleSubmit = async (recetaActualizada) => {
    try {
      await actualizar(id, recetaActualizada)
      navigate(`/recetas/${id}`)
    } catch {
      setError('No se pudo actualizar la receta')
    }
  }

  if (cargando) {
    return <LoadingSpinner mensaje="Cargando receta..." />
  }

  if (error) {
    return (
      <div style={{ padding: '32px 20px' }}>
        <ErrorMessage mensaje={error} onDismiss={() => setError('')} />
      </div>
    )
  }

  return (
    <div style={{ padding: '32px 20px' }}>
      <RecetaForm
        modo="editar"
        recetaInicial={receta}
        onSubmit={handleSubmit}
        cargando={cargando}
      />
    </div>
  )
}

export default EditReceta
