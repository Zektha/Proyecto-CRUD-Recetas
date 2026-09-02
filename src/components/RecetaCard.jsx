/**
 * Tarjeta individual de receta
 */
const RecetaCard = ({
  receta,
  usuario,
  onEdit,
  onDelete,
  onToggleFavorita,
  onVerDetalle,
}) => {
  const esCreador = usuario?.uid === receta.usuarioId
  const esFavorita = !!receta.favoritos?.[usuario?.uid]

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#333' }}>
            {receta.nombre}
          </h3>
          <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
            {receta.categoría}
          </p>
        </div>
        {usuario && (
          <button
            onClick={() => onToggleFavorita(receta.id)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0',
            }}
            title={esFavorita ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            {esFavorita ? '❤️' : '🤍'}
          </button>
        )}
      </div>

      <div style={{ marginBottom: '12px', fontSize: '12px', color: '#64748b' }}>
        Creada por: {receta.creadoPor || 'Usuario desconocido'}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '12px',
          fontSize: '14px',
        }}
      >
        <div>
          <span style={{ color: '#666' }}>⏱️ Tiempo:</span> {receta.tiempo} min
        </div>
        <div>
          <span style={{ color: '#666' }}>📊 Dificultad:</span> {receta.dificultad}
        </div>
      </div>

      {receta.rating && (
        <div style={{ marginBottom: '12px', fontSize: '14px' }}>
          <span style={{ color: '#666' }}>⭐ Rating:</span> {receta.rating}/5
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onVerDetalle(receta.id)}
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Ver detalle
        </button>

        {esCreador && (
          <>
            <button
              onClick={() => onEdit(receta.id)}
              style={{
                flex: 1,
                padding: '8px 12px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Editar
            </button>
            <button
              onClick={() => {
                if (window.confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
                  onDelete(receta.id)
                }
              }}
              style={{
                flex: 1,
                padding: '8px 12px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default RecetaCard
