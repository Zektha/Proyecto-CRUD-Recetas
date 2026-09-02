import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import RecetaList from '../components/RecetaList'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import {
  eliminar,
  obtenerTodos,
} from '../services/recetasService'

const Home = ({ usuario, onLogout }) => {
  const navigate = useNavigate()
  const [recetas, setRecetas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarRecetas = async () => {
    if (!usuario) {
      setRecetas([])
      setCargando(false)
      return
    }

    try {
      setCargando(true)
      const datos = await obtenerTodos()
      
      // Cargar favoritos desde localStorage
      const favoritosGuardados = JSON.parse(
        localStorage.getItem(`favoritos_${usuario.uid}`) || '{}'
      )
      
      // Aplicar favoritos cargados a las recetas
      const datosConFavoritos = datos.map((receta) => ({
        ...receta,
        favoritos: {
          ...receta.favoritos,
          [usuario.uid]: favoritosGuardados[receta.id] || false,
        },
      }))
      
      setRecetas(datosConFavoritos)
      setError('')
    } catch (err) {
      setError('No se pudieron cargar las recetas')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarRecetas()
  }, [usuario])

  const recetasFiltradas = recetas.filter((receta) =>
    receta.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleDelete = async (id) => {
    try {
      await eliminar(id)
      setRecetas((prev) => prev.filter((receta) => receta.id !== id))
    } catch {
      setError('No se pudo eliminar la receta')
    }
  }

  const handleToggleFavorita = (id) => {
    setRecetas((prev) => {
      const recetasActualizadas = prev.map((receta) =>
        receta.id === id
          ? {
              ...receta,
              favoritos: {
                ...receta.favoritos,
                [usuario.uid]: !receta.favoritos?.[usuario.uid],
              },
            }
          : receta
      )
      
      // Guardar en localStorage
      const recetaActualizada = recetasActualizadas.find((r) => r.id === id)
      const favoritosGuardados = JSON.parse(
        localStorage.getItem(`favoritos_${usuario.uid}`) || '{}'
      )
      favoritosGuardados[id] = recetaActualizada.favoritos[usuario.uid]
      localStorage.setItem(
        `favoritos_${usuario.uid}`,
        JSON.stringify(favoritosGuardados)
      )
      
      return recetasActualizadas
    })
  }

  const handleEdit = (id) => {
    navigate(`/recetas/${id}/editar`)
  }

  const handleVerDetalle = (id) => {
    navigate(`/recetas/${id}`)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: '#1f2937' }}>Recetas</h1>
          {usuario && (
            <p style={{ margin: '6px 0 0', color: '#4b5563' }}>
              Hola, {usuario.nombre}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {usuario ? (
            <button
              onClick={onLogout}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              Iniciar sesión
            </button>
          )}

          <button
            onClick={() => navigate('/recetas/nueva')}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Nueva receta
          </button>
        </div>
      </header>

      <SearchBar onSearch={setBusqueda} />

      {error && <ErrorMessage mensaje={error} onDismiss={() => setError('')} />}

      {cargando ? (
        <LoadingSpinner mensaje="Cargando recetas..." />
      ) : (
        <RecetaList
          recetas={recetasFiltradas}
          usuario={usuario}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleFavorita={handleToggleFavorita}
          onVerDetalle={handleVerDetalle}
        />
      )}
    </div>
  )
}

export default Home
