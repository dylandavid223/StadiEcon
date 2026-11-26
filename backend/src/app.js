import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

/* ---------- CORS: supports multiple origins (comma-separated) ---------- */
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server / curl (no origin header)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  })
)

app.use(express.json())

/* ---------- Health check — pings DB ---------- */
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

/* ---------- 404 ---------- */
app.use((_req, res) => res.status(404).json({ message: 'Not found' }))

/* ---------- Global error handler (so CORS errors return JSON, not HTML) ---------- */
app.use((err, _req, res, _next) => {
  console.error('Server error:', err.message)
  res.status(500).json({ message: err.message || 'Server error' })
})

export default app