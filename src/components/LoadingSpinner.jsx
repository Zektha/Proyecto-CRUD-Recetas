/**
 * Componente de loading spinner
 */
const LoadingSpinner = ({ mensaje = 'Cargando...' }) => {
  return (
    <div className="loading-state">
      <div className="spinner" />
      <p>{mensaje}</p>
    </div>
  )
}

export default LoadingSpinner
