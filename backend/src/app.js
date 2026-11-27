import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { prisma } from './config/prisma.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

// CORS only needed for local dev (frontend on :5173, backend on :5000)
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())

/* ---------- Health check ---------- */
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
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