import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { user, loading, logout } = useAuth()

  // Still verifying the token with the backend
  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        Loading your dashboard…
      </div>
    )
  }

  // Not logged in — ProtectedRoute normally catches this, but just in case
  if (!user) {
    return null
  }

  const isAthlete = user.role === 'athlete'

  return (
    <section className="section section-cream">
      <div className="container">
        <div className="dashboard-head">
          <div>
            <span className="split-eyebrow">
              {isAthlete ? 'Athlete' : 'Brand / Sponsor'}
            </span>
            <h1
              className="page-title"
              style={{ margin: '8px 0 4px', textAlign: 'left' }}
            >
              Welcome, {user.name}
            </h1>
            <p className="page-subtitle" style={{ margin: 0 }}>
              {user.email}
            </p>
          </div>
          <button type="button" className="btn-outline" onClick={logout}>
            Log out
          </button>
        </div>

        <div className="dashboard-grid">
          {isAthlete ? (
            <>
              <article className="card">
                <div className="card-icon">01</div>
                <h3>Complete your profile</h3>
                <p>
                  Add your discipline, personal best, and bio so brands can
                  find you.
                </p>
                <Link
                  to="/dashboard"
                  className="btn-outline"
                  style={{ marginTop: 16 }}
                >
                  Continue
                </Link>
              </article>
              <article className="card">
                <div className="card-icon">02</div>
                <h3>Pair a device</h3>
                <p>
                  Link a StadiEcon IoT wearable to start syncing training and
                  race data.
                </p>
                <Link
                  to="/marketplace"
                  className="btn-outline"
                  style={{ marginTop: 16 }}
                >
                  Browse Devices
                </Link>
              </article>
              <article className="card">
                <div className="card-icon">03</div>
                <h3>Sponsorship inbox</h3>
                <p>
                  Offers from brands will land here. Nothing yet — complete
                  your profile to get discovered.
                </p>
              </article>
            </>
          ) : (
            <>
              <article className="card">
                <div className="card-icon">01</div>
                <h3>Complete your brand profile</h3>
                <p>
                  Add company details so athletes know who they're talking to.
                </p>
                <Link
                  to="/dashboard"
                  className="btn-outline"
                  style={{ marginTop: 16 }}
                >
                  Continue
                </Link>
              </article>
              <article className="card">
                <div className="card-icon">02</div>
                <h3>Browse athletes</h3>
                <p>
                  Search verified athlete profiles by discipline, location,
                  and performance data.
                </p>
                <Link
                  to="/athletes"
                  className="btn-outline"
                  style={{ marginTop: 16 }}
                >
                  View Athletes
                </Link>
              </article>
              <article className="card">
                <div className="card-icon">03</div>
                <h3>Your offers</h3>
                <p>
                  Sponsorship offers you send will be tracked here. None sent
                  yet.
                </p>
              </article>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Dashboard