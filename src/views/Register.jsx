import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = ({ onRegister }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Completa todos los campos para registrarte')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      setCargando(true)
      await onRegister(form.nombre.trim(), form.email.trim(), form.password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use'
        ? 'Ese email ya está registrado'
        : 'No se pudo crear la cuenta')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>
        <p className="auth-card__intro">Regístrate para compartir y guardar tus recetas favoritas.</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="form-field">
          <label className="field-label" htmlFor="nombre">Nombre de usuario</label>
          <input className="field-input" id="nombre" type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" disabled={cargando} />
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="email">Email</label>
          <input className="field-input" id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="usuario@email.com" disabled={cargando} />
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="password">Contraseña</label>
          <input className="field-input" id="password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" disabled={cargando} />
        </div>
        <button className="button button--primary form-submit" type="submit" disabled={cargando}>
          {cargando ? 'Creando cuenta...' : 'Registrarme'}
        </button>
        <p className="auth-card__footer">¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </form>
    </main>
  )
}

export default Register
