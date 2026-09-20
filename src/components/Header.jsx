import { useNavigate } from 'react-router-dom'

const Header = ({ usuario, onLogout }) => {
  const navigate = useNavigate()

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button className="brand brand-button" onClick={() => navigate('/')}>
          Recetas-web
        </button>
        <div className="site-nav">
          {usuario ? (
            <button className="button button--quiet button--small" onClick={onLogout}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <button className="button button--quiet button--small" onClick={() => navigate('/login')}>
                Iniciar sesión
              </button>
              <button className="button button--secondary button--small" onClick={() => navigate('/registro')}>
                Registrarse
              </button>
            </>
          )}
          {usuario && (
            <button className="button button--primary button--small" onClick={() => navigate('/recetas/nueva')}>
              Crear receta
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
