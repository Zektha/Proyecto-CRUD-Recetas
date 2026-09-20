import { useState } from 'react'

/**
 * Barra de búsqueda de recetas
 */
const SearchBar = ({ onSearch }) => {
  const [termino, setTermino] = useState('')

  const handleChange = (e) => {
    const valor = e.target.value
    setTermino(valor)
    onSearch(valor)
  }

  const handleClear = () => {
    setTermino('')
    onSearch('')
  }

  return (
    <div className="search-bar">
      <input
        className="field-input"
        type="text"
        placeholder="Buscar receta por nombre..."
        value={termino}
        onChange={handleChange}
      />
      {termino && (
        <button className="button button--danger" onClick={handleClear}>
          Limpiar
        </button>
      )}
    </div>
  )
}

export default SearchBar
