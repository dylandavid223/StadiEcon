import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    // TODO (Step 6): call POST /api/auth/login
    console.log('Login payload:', form)
  }

  return (
    <div className="auth-page">
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-msg">{error}</p>}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p className="switch">
        No account? <Link to="/register">Join StadiEcon</Link>
      </p>
    </div>
  )
}

export default Login