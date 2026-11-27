import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'athlete',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setSubmitting(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <h2>Join StadiEcon</h2>
      <p className="auth-sub">Create your account in under a minute.</p>

      <form onSubmit={handleSubmit}>
        {error && <p className="error-msg">{error}</p>}

        <label>I'm joining as</label>
        <div className="role-picker">
          <button
            type="button"
            className={`role-option ${form.role === 'athlete' ? 'active' : ''}`}
            onClick={() => setForm({ ...form, role: 'athlete' })}
          >
            <strong>Athlete</strong>
            <span>Showcase your talent</span>
          </button>
          <button
            type="button"
            className={`role-option ${form.role === 'brand' ? 'active' : ''}`}
            onClick={() => setForm({ ...form, role: 'brand' })}
          >
            <strong>Brand / Sponsor</strong>
            <span>Discover talent</span>
          </button>
        </div>

        <label>Full name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={form.role === 'brand' ? 'Company or contact name' : 'Your full name'}
          autoComplete="name"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register