function Marketplace() {
  const devices = [] // populated once devices are listed

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="hero-eyebrow">IoT Performance Devices</span>
          <h1 className="page-title">Gear that powers your profile.</h1>
          <p className="page-subtitle">
            Every StadiEcon device pairs once to your private athlete profile —
            then streams your training and race data automatically. No cables,
            no spreadsheets, no guesswork.
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          {devices.length === 0 ? (
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
                  <path d="M32 12l20 10v20l-20 10-20-10V22z" />
                  <path d="M12 22l20 10 20-10M32 32v20" />
                </svg>
              </div>
              <h3>Devices coming soon</h3>
              <p>
                We're finalising our first batch of StadiEcon IoT wearables.
                Check back shortly — devices will appear here as soon as they
                are in stock.
              </p>
              <button type="button" className="btn-primary">
                Notify Me
              </button>
            </div>
          ) : (
            <div className="devices-grid">
              {devices.map((device) => (
                <article key={device.id} className="device-card">
                  <div className="device-visual">{device.icon}</div>
                  <div className="device-body">
                    <span className="device-badge">{device.category}</span>
                    <h3 className="device-name">{device.name}</h3>
                    <p className="device-desc">{device.description}</p>
                    <ul className="device-specs">
                      {device.specs.map((spec) => (
                        <li key={spec}>{spec}</li>
                      ))}
                    </ul>
                    <div className="device-footer">
                      <span className="device-price">{device.price}</span>
                      <button type="button" className="btn-primary device-cta">
                        Buy
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <div className="cta-band-inner">
            <h2>One profile. Every device.</h2>
            <p>
              Pair any StadiEcon device once and it will follow you across your
              private dashboard, coach reports, and sponsor conversations —
              without you lifting a finger.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Marketplace