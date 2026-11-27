import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

/* ---------- CORS ---------- */
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

const corsOptions = {
  origin: (origin, callback) => {
    // No origin (server-to-server, curl, health checks)
    if (!origin) return callback(null, true)
    // Allowed origin
    if (allowedOrigins.includes(origin)) return callback(null, true)
    // Reject silently — do NOT throw, so OPTIONS still responds cleanly
    console.warn(`CORS: blocked origin ${origin}`)
    return callback(null, false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}

// Handle preflight for every route
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

app.use(express.json())

/* ---------- Health check ---------- */
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, db: 'connected', timestamp: new Date().toISOString() })
  } catch (err) {
    res.status(503).json({
      ok: false,
      db: 'error',
      message: err.message,
      timestamp: new Date().toISOString(),
    })
  }
})

/* ---------- Routes ---------- */
app.use('/api/auth', authRoutes)

/* ---------- 404 fallback ---------- */
app.use((_req, res) => res.status(404).json({ message: 'Not found' }))

/* ---------- Global error handler ---------- */
app.use((err, _req, res, _next) => {
  console.error('Server error:', err.message)
  res.status(500).json({ message: err.message || 'Server error' })
})

export default app