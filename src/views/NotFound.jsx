import { Link } from 'react-router-dom'

const NotFound = () => (
  <main className="not-found">
    <h1>404</h1>
    <h2>Página no encontrada</h2>
    <p>La receta o ruta que buscas no existe.</p>
    <Link className="button button--primary" to="/">Volver al inicio</Link>
  </main>
)

export default NotFound
