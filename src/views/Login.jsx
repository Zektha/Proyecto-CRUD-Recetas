import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setError('Completa email y contraseña para continuar')
      return
    }

    try {
      setCargando(true)
      await onLogin(form.email.trim(), form.password)
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch {
      setError('Credenciales inválidas o el usuario no existe')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <p className="auth-card__intro">Accede para gestionar tus recetas</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="form-field">
          <label className="field-label" htmlFor="email">Email</label>
          <input className="field-input" id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="usuario@email.com" disabled={cargando} />
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="password">Contraseña</label>
          <input className="field-input" id="password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" disabled={cargando} />
        </div>
        <button className="button button--primary form-submit" type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}

export default Login
