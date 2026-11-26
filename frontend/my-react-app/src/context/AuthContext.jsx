import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('stadiecon-user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('stadiecon-token')
    if (!token) {
      setLoading(false)
      return
    }
    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.user)
        localStorage.setItem('stadiecon-user', JSON.stringify(data.user))
      })
      .catch(() => {
        localStorage.removeItem('stadiecon-token')
        localStorage.removeItem('stadiecon-user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const register = async ({ name, email, password, role }) => {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
      role,
    })
    localStorage.setItem('stadiecon-token', data.token)
    localStorage.setItem('stadiecon-user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const login = async ({ email, password }) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('stadiecon-token', data.token)
    localStorage.setItem('stadiecon-user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('stadiecon-token')
    localStorage.removeItem('stadiecon-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)