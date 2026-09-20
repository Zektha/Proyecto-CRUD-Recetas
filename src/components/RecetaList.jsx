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
    return <div className="empty-state"><p>No se encontraron recetas. ¡Crea la primera! 🍳</p></div>
  }

  return (
    <div className="recipe-grid">
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
