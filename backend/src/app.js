import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { testConnection } from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)

app.use((_req, res) => res.status(404).json({ message: 'Not found' }))

const PORT = process.env.PORT || 5000

async function start() {
  await testConnection()
  app.listen(PORT, () => console.log(`✓ API on http://localhost:${PORT}`))
}

start()
