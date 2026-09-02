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
    <div
      style={{
        marginBottom: '20px',
        display: 'flex',
        gap: '8px',
      }}
    >
      <input
        type="text"
        placeholder="Buscar receta por nombre..."
        value={termino}
        onChange={handleChange}
        style={{
          flex: 1,
          padding: '10px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
      {termino && (
        <button
          onClick={handleClear}
          style={{
            padding: '10px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Limpiar
        </button>
      )}
    </div>
  )
}

export default SearchBar
