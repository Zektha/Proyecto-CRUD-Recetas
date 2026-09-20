/**
 * Componente para mostrar mensajes de error
 */
const ErrorMessage = ({ mensaje, onDismiss }) => {
  if (!mensaje) return null

  return (
    <div className="error-message">
      <span>{mensaje}</span>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Cerrar mensaje">
          ✕
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
