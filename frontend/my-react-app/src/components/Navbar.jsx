import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

const LOGO_URL =
  'https://res.cloudinary.com/dw0vhzpiu/image/upload/v1795695502/stadiecon_gold_cutout_qvpllj.png'

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand" aria-label="StadiEcon home">
        <img src={LOGO_URL} alt="" className="brand-logo" />
        <span className="brand-name">
          Stadi<span>Econ</span>
        </span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/athletes">Athletes</NavLink>
        <NavLink to="/marketplace">Devices</NavLink>

        {/* Dashboard only visible when logged in */}
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        {user ? (
          <>
            <span className="nav-user">
              {user.name.split(' ')[0]}
            </span>
            <button
              type="button"
              className="btn-primary"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" className="btn-primary">Join</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar