import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import { testConnection } from './config/db.js'

const PORT = process.env.PORT || 5000

async function start() {
  const ok = await testConnection()

  // In development, refuse to start without a DB. In production, let it run —
  // Vercel's health check will fail loudly instead of crashing the build.
  if (!ok && process.env.NODE_ENV !== 'production') {
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`✓ API on http://localhost:${PORT}`)
  })
}

start()