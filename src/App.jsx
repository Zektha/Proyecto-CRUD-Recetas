import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import AppRouter from './router/AppRouter'
import { auth } from './firebase/config'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUsuario({
          uid: currentUser.uid,
          email: currentUser.email,
          nombre: currentUser.email?.split('@')[0] || 'Usuario',
        })
      } else {
        setUsuario(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (email, password) => {
    const credenciales = await signInWithEmailAndPassword(auth, email, password)
    return credenciales.user
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  return <AppRouter usuario={usuario} onLogin={handleLogin} onLogout={handleLogout} />
}

export default App
