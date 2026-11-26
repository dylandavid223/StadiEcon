import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'athlete',
  })
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setError('')
    // TODO (Step 6): call POST /api/auth/register
    console.log('Register payload:', form)
  }

  return (
    <div className="auth-page">
      <h2>Join StadiEcon</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-msg">{error}</p>}
        <label>Full name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Eliud Kipchoge"
        />
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
          placeholder="At least 6 characters"
        />
        <label>I am joining as</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="athlete">Athlete</option>
          <option value="brand">Brand / Sponsor</option>
        </select>
        <button type="submit" className="btn-primary">Create account</button>
      </form>
      <p className="switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register