import { Link } from 'react-router-dom'

function Athletes() {
  const athletes = [] // populated once athletes register

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="hero-eyebrow">Verified Athlete Profiles</span>
          <h1 className="page-title">Discover Kenya's next champions.</h1>
          <p className="page-subtitle">
            Real performance data, verified competition history, and live
            training metrics — synced straight from their IoT wearables.
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          {athletes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="32" cy="22" r="10" />
                  <path d="M12 54c0-11 9-20 20-20s20 9 20 20" />
                </svg>
              </div>
              <h3>No athlete profiles yet</h3>
              <p>
                StadiEcon is brand new. Athlete profiles will appear here as
                soon as they register and get verified. Be among the first.
              </p>
              <Link to="/register" className="btn-primary">
                Create Your Profile
              </Link>
            </div>
          ) : (
            <div className="athletes-grid">
              {athletes.map((athlete) => (
                <Link
                  to={`/athlete/${athlete.id}`}
                  key={athlete.id}
                  className="athlete-card"
                >
                  <div className="athlete-photo">
                    <span className="athlete-initials">
                      {athlete.initials}
                    </span>
                    {athlete.verified && (
                      <span className="athlete-verified">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="athlete-body">
                    <h3 className="athlete-name">{athlete.name}</h3>
                    <p className="athlete-meta">
                      {athlete.discipline} · {athlete.location}
                    </p>
                    <div className="athlete-stats">
                      <div>
                        <div className="athlete-stat-label">
                          Personal Best
                        </div>
                        <div className="athlete-stat-value">
                          {athlete.pb}
                        </div>
                      </div>
                      <div>
                        <div className="athlete-stat-label">Last Race</div>
                        <div className="athlete-stat-value">
                          {athlete.lastRace}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Athletes