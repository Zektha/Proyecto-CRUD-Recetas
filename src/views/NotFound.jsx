import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <h1 style={{ fontSize: '56px', margin: '0 0 12px' }}>404</h1>
      <h2 style={{ margin: '0 0 12px' }}>Página no encontrada</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        La receta o ruta que buscas no existe.
      </p>
      <Link
        to="/"
        style={{
          padding: '10px 16px',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
        }}
      >
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
