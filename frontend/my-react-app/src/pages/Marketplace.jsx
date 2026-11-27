const DEVICES = [
  {
    id: 'shoulder-strap',
    name: 'StadiEcon Shoulder Strap',
    category: 'Upper-Body Kinematics',
    image: 'https://res.cloudinary.com/dw0vhzpiu/image/upload/v1795741057/image_20261127_035334_1_ioru7s.jpg',
    description:
      'Worn across the upper trapezius to capture shoulder rotation, arm carry angle and throwing-arm load. Designed for middle-distance runners, javelin throwers and cricketers.',
    specs: [
      '9-axis IMU @ 200 Hz sampling',
      'Bluetooth 5.2 LE — 14-day battery',
      'IP67 sweat & rain rated',
      'Pairs once to athlete profile',
    ],
    tracks: [
      'Shoulder rotation range (°)',
      'Arm-car carry angle (°)',
      'Throwing-arm velocity (m/s)',
      'Upper-body fatigue index',
      'Left/right symmetry delta',
    ],
    price: 'KES 12,499',
  },
  {
    id: 'arm-strap',
    name: 'StadiEcon Arm Strap',
    category: 'Arm Swing & Cadence',
    image: 'https://res.cloudinary.com/dw0vhzpiu/image/upload/v1795741057/image_20261117_142302_1_mlxxez.jpg',
    description:
      'Bicep-mounted strap that tracks arm-swing frequency, swing amplitude and EMG-classified muscle activation. Ideal for sprinters and marathoners chasing cadence gains.',
    specs: [
      'sEMG surface electrodes',
      'Arm-swing counter (per minute)',
      '28-day standby battery',
      'Machine-washable band',
    ],
    tracks: [
      'Arm-swing cadence (spm)',
      'Bicep activation (μV RMS)',
      'Forward swing amplitude (°)',
      'L/R swing asymmetry (%)',
      'Arm-cycle count per session',
    ],
    price: 'KES 8,999',
  },
  {
    id: 'elbow-strap',
    name: 'StadiEcon Elbow Strap',
    category: 'Joint Angle & Load',
    image: 'https://res.cloudinary.com/dw0vhzpiu/image/upload/v1795741057/image_20261127_035510_fbmu1u.jpg',
    description:
      'Wraps just below the elbow joint to measure flexion/extension range, repetition count and cumulative joint load. Built for throwers, fast bowlers and tennis players.',
    specs: [
      'Flex sensor (±0.5° accuracy)',
      'Load cell up to 80 kg',
      'Repetition auto-counter',
      'On-device storage 7 days',
    ],
    tracks: [
      'Elbow flexion angle (°)',
      'Extension peak force (N)',
      'Cumulative joint load (kg·reps)',
      'Range of motion (ROM)',
      'Repetition count per drill',
    ],
    price: 'KES 9,499',
  },
  {
    id: 'wrist-watch',
    name: 'StadiEcon Wrist Watch',
    category: 'Display & Biometrics Hub',
    image: 'https://res.cloudinary.com/dw0vhzpiu/image/upload/v1795741057/image_20261127_035324_zng7w2.jpg',
    description:
      'The on-wrist display that aggregates streams from every other StadiEcon device. Built-in GPS, optical heart rate and a 1.2" AMOLED — your live cockpit during a session.',
    specs: [
      '1.2" AMOLED, 390×390',
      'Dual-band GPS (L1+L5)',
      'Optical HR + SpO2 sensor',
      'Battery: 30h GPS-on',
    ],
    tracks: [
      'Distance covered (km/m)',
      'Pace (min/km) & splits',
      'Heart rate & HR zones',
      'GPS route map',
      'Caloric burn (kcal)',
      'Steps & elevation gain',
    ],
    price: 'KES 24,999',
  },
  {
    id: 'knee-strap',
    name: 'StadiEcon Knee Strap',
    category: 'Lower-Limb Mechanics',
    image: 'https://res.cloudinary.com/dw0vhzpiu/image/upload/v1795741057/image_20261127_035511_sprxam.jpg',
    description:
      'Patellar strap that measures knee flexion, ground contact time and impact G-load on every stride. The single most important device for distance runners managing injury risk.',
    specs: [
      'Accelerometer ±16 g',
      '10 ms ground-contact resolution',
      'Patellar tracking sensor',
      'Anti-slip silicone grip',
    ],
    tracks: [
      'Knee flexion angle (°)',
      'Ground contact time (ms)',
      'Vertical impact force (G)',
      'Stride length (m)',
      'Knee stability score',
      'Patellar lateral drift (mm)',
    ],
    price: 'KES 10,999',
  },
  {
    id: 'waist-belt',
    name: 'StadiEcon Waist Belt',
    category: 'Core & Posture',
    image: 'https://res.cloudinary.com/dw0vhzpiu/image/upload/v1795741057/image_20261127_035509_dnuzfz.jpg',
    description:
      'A low-profile belt worn at the iliac crest that monitors core temperature, pelvic tilt, breathing rate and posture — the silent performance killer most athletes never measure.',
    specs: [
      'Skin-temp thermistor',
      'Respiratory inductance plethysmography',
      'Pelvic tilt gyroscope',
      '18-hour continuous battery',
    ],
    tracks: [
      'Core body temperature (°C)',
      'Pelvic tilt angle (°)',
      'Breathing rate (breaths/min)',
      'Posture alignment score',
      'Core stability index',
      'Estimated VO₂ max trend',
    ],
    price: 'KES 14,499',
  },
]

function Marketplace() {
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
          <div className="devices-grid">
            {DEVICES.map((device) => (
              <article key={device.id} className="device-card">
                <div className="device-visual">
                  <img
                    src={device.image}
                    alt={device.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div className="device-body">
                  <span className="device-badge">{device.category}</span>
                  <h3 className="device-name">{device.name}</h3>
                  <p className="device-desc">{device.description}</p>

                  <ul className="device-specs">
                    {device.specs.map((spec) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>

                  <div className="device-tracks">
                    <h4>What it tracks</h4>
                    <ul className="device-metrics">
                      {device.tracks.map((metric) => (
                        <li key={metric}>
                          <span className="metric-dot" aria-hidden="true">•</span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

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