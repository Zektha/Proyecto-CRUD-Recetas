import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ usuario, children }) => {
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
