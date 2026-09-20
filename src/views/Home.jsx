import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import RecetaList from '../components/RecetaList'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { ETIQUETAS_RECETA } from '../constants/etiquetas'
import { cambiarEstado, eliminar, obtenerTodos } from '../services/recetasService'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home = ({ usuario, onLogout }) => {
  const navigate = useNavigate()
  const [recetas, setRecetas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarRecetas = async () => {
    try {
      setCargando(true)
      setRecetas(await obtenerTodos())
      setError('')
    } catch {
      setError('No se pudieron cargar las recetas')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarRecetas()
  }, [usuario])

  const recetasFiltradas = recetas.filter((receta) => {
    const coincideBusqueda = receta.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEtiqueta = !etiquetaSeleccionada || receta.etiquetas?.includes(etiquetaSeleccionada)
    return coincideBusqueda && coincideEtiqueta
  })

  const handleDelete = async (id) => {
    try {
      await eliminar(id)
      setRecetas((prev) => prev.filter((receta) => receta.id !== id))
    } catch {
      setError('No se pudo eliminar la receta')
    }
  }

  const handleToggleFavorita = async (id) => {
    try {
      const nuevoEstado = await cambiarEstado(id)
      setRecetas((prev) => prev.map((receta) => receta.id === id
        ? { ...receta, favoritos: { ...receta.favoritos, [usuario.uid]: nuevoEstado } }
        : receta))
    } catch {
      setError('No se pudo cambiar el estado de favorito')
    }
  }

  return (
    <div className="page-shell">
      <Header usuario={usuario} onLogout={onLogout} />

      <main className="content-shell" id="recetas">
        <section className="hero">
          <h1>Encuentra tu próxima inspiración culinaria</h1>
          <p>Descubre recetas deliciosas compartidas por amantes de la cocina como tú. Fáciles, frescas y listas para disfrutar en casa.</p>
        </section>

        <div className="toolbar">
          <SearchBar onSearch={setBusqueda} />
          <div className="filter-control">
            <label className="field-label" htmlFor="filtro-etiqueta">Filtrar por etiqueta</label>
            <select className="field-select" id="filtro-etiqueta" value={etiquetaSeleccionada} onChange={(e) => setEtiquetaSeleccionada(e.target.value)}>
              <option value="">Todas las etiquetas</option>
              {ETIQUETAS_RECETA.map((etiqueta) => <option key={etiqueta} value={etiqueta}>{etiqueta}</option>)}
            </select>
          </div>
        </div>

        {error && <ErrorMessage mensaje={error} onDismiss={() => setError('')} />}
        {cargando ? <LoadingSpinner mensaje="Cargando recetas..." /> : (
          <RecetaList recetas={recetasFiltradas} usuario={usuario} onEdit={(id) => navigate(`/recetas/${id}/editar`)} onDelete={handleDelete} onToggleFavorita={handleToggleFavorita} onVerDetalle={(id) => navigate(`/recetas/${id}`)} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Home
