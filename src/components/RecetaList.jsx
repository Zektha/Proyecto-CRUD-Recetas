import RecetaCard from './RecetaCard'

/**
 * Lista de recetas renderizando tarjetas individuales
 */
const RecetaList = ({
  recetas,
  usuario,
  onEdit,
  onDelete,
  onToggleFavorita,
  onVerDetalle,
}) => {
  if (!recetas || recetas.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999',
        }}
      >
        <p style={{ fontSize: '16px', margin: '0' }}>
          No se encontraron recetas. ¡Crea la primera! 🍳
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}
    >
      {recetas.map((receta) => (
        <RecetaCard
          key={receta.id}
          receta={receta}
          usuario={usuario}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorita={onToggleFavorita}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </div>
  )
}

export default RecetaList
