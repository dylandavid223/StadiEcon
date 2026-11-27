import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="home">
        <div className="hero-inner">
          <span className="hero-eyebrow">Kenya · Athlete Economy</span>

          <h1>
            Where Kenyan athletes
            <br />
            meet <span>opportunity.</span>
          </h1>

          <p className="tagline">
            Verified profiles. Live performance data. A transparent marketplace
            where brands discover talent — and athletes finally get paid what
            they deserve.
          </p>

          <p className="lead">
            From Iten to Eldoret to Nairobi — StadiEcon connects the next
            generation of champions with the brands ready to back them.
          </p>

          <div className="cta-row">
            <Link to="/register" className="btn-primary">
              Join as Athlete
            </Link>
            <Link to="/athletes" className="btn-outline">
              Explore Talent
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-head">
            <h2>How StadiEcon works</h2>
            <p>
              One platform that turns raw talent and real data into commercial
              opportunity.
            </p>
          </div>

          <div className="grid-3">
            <article className="card">
              <div className="card-icon">01</div>
              <h3>Build your profile</h3>
              <p>
                Create a verified athlete profile with your competition
                history, training metrics, and personal brand story.
              </p>
            </article>

            <article className="card">
              <div className="card-icon">02</div>
              <h3>Sync your performance</h3>
              <p>
                Pair a StadiEcon IoT wearable to your private profile and
                stream live training and race data — proof of progress that
                brands can trust.
              </p>
            </article>

            <article className="card">
              <div className="card-icon">03</div>
              <h3>Get discovered</h3>
              <p>
                Brands search, compare, and reach out directly. Transparent,
                data-backed deals — no middlemen.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SPLIT */}
      <section className="section section-paper">
        <div className="container">
          <div className="split-grid">
            <div className="split-col">
              <span className="split-eyebrow">For Athletes</span>
              <h2>Your talent, finally on record.</h2>
              <p>
                Stop relying on word of mouth. Publish a profile that proves
                your progress with real training data, verified results, and a
                clean personal brand page you can share anywhere.
              </p>
              <ul className="split-list">
                <li>Verified competition history</li>
                <li>Live training metrics via wearables</li>
                <li>Direct inbox from interested brands</li>
              </ul>
              <Link to="/register" className="btn-primary">
                Create Athlete Profile
              </Link>
            </div>

            <div className="split-col">
              <span className="split-eyebrow">For Brands</span>
              <h2>Find the next champion first.</h2>
              <p>
                Filter athletes by discipline, region, performance trends, and
                availability. Compare candidates with real data — not gossip
                from an agent.
              </p>
              <ul className="split-list">
                <li>Searchable talent database</li>
                <li>Consistent, comparable performance metrics</li>
                <li>Send sponsorship offers in-app</li>
              </ul>
              <Link to="/athletes" className="btn-outline">
                Browse Athletes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>Ready to enter the athlete economy?</h2>
            <p>
              Join athletes and brands building the future of Kenyan sport —
              on one transparent platform.
            </p>
            <div className="cta-row">
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
              <Link to="/athletes" className="btn-outline">
                See Talent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home