const RecetaCard = ({ receta, usuario, onEdit, onDelete, onToggleFavorita, onVerDetalle }) => {
  const esCreador = usuario?.uid === receta.usuarioId
  const esFavorita = receta.favoritos?.[usuario?.uid] === 1

  return (
    <article className="recipe-card">
      <div className="recipe-card__body">
        <div className="recipe-card__heading">
          <div>
            <h3>{receta.nombre}</h3>
            <p className="recipe-card__category">{receta.categoría}</p>
          </div>
          {usuario && (
            <button
              className="favorite-button"
              onClick={() => onToggleFavorita(receta.id)}
              title={esFavorita ? 'Remover de favoritos' : 'Agregar a favoritos'}
              aria-label={esFavorita ? 'Remover de favoritos' : 'Agregar a favoritos'}
            >
              {esFavorita ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        <div className="recipe-card__creator">Creada por: {receta.creadoPor || 'Usuario desconocido'}</div>

        {receta.etiquetas?.length > 0 && (
          <div className="tag-list">
            {receta.etiquetas.map((etiqueta) => <span className="tag" key={etiqueta}>{etiqueta}</span>)}
          </div>
        )}

        <div className="recipe-card__meta">
          <span>⏱️ {receta.tiempo} min</span>
          <span>📊 {receta.dificultad}</span>
        </div>

        {receta.rating && <div className="recipe-card__rating">⭐ Rating: {receta.rating}/5</div>}

        <div className="recipe-card__actions">
          <button className="button button--primary button--small" onClick={() => onVerDetalle(receta.id)}>Ver detalle</button>
          {esCreador && (
            <>
              <button className="button button--secondary button--small" onClick={() => onEdit(receta.id)}>Editar</button>
              <button
                className="button button--danger button--small"
                onClick={() => window.confirm('¿Estás seguro de que deseas eliminar esta receta?') && onDelete(receta.id)}
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default RecetaCard
