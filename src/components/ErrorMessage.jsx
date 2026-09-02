/**
 * Componente para mostrar mensajes de error
 */
const ErrorMessage = ({ mensaje, onDismiss }) => {
  if (!mensaje) return null

  return (
    <div
      style={{
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        color: '#c33',
        padding: '12px 16px',
        borderRadius: '4px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span>{mensaje}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: '#c33',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '0 4px',
          }}
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
