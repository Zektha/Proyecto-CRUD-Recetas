import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecetaForm from '../components/RecetaForm'
import { crear } from '../services/recetasService'

const CreateReceta = () => {
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (receta) => {
    setCargando(true)
    try {
      await crear(receta)
      navigate('/')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="content-shell create-page">
      <div className="create-page__toolbar">
        <button className="button button--quiet" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>
      <RecetaForm modo="crear" onSubmit={handleSubmit} cargando={cargando} />
    </main>
  )
}

export default CreateReceta
