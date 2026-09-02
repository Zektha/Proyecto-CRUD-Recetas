import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../views/Home'
import Login from '../views/Login'
import CreateReceta from '../views/CreateReceta'
import EditReceta from '../views/EditReceta'
import RecetaDetail from '../views/RecetaDetail'
import NotFound from '../views/NotFound'

const AppRouter = ({ usuario, onLogin, onLogout }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home usuario={usuario} onLogout={onLogout} />}
        />
        <Route
          path="/login"
          element={
            usuario ? <Navigate to="/" replace /> : <Login onLogin={onLogin} />
          }
        />
        <Route
          path="/recetas/nueva"
          element={
            <ProtectedRoute usuario={usuario}>
              <CreateReceta onLogout={onLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recetas/:id"
          element={
            <ProtectedRoute usuario={usuario}>
              <RecetaDetail usuario={usuario} onLogout={onLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recetas/:id/editar"
          element={
            <ProtectedRoute usuario={usuario}>
              <EditReceta usuario={usuario} onLogout={onLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
