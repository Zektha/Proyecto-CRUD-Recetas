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
    <div style={{ padding: '32px 20px' }}>
      <RecetaForm modo="crear" onSubmit={handleSubmit} cargando={cargando} />
    </div>
  )
}

export default CreateReceta
