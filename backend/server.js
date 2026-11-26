import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import { testConnection } from './config/db.js'

const PORT = process.env.PORT || 5000

async function start() {
  const ok = await testConnection()

  if (!ok && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  Starting server without DB connection — health check will fail')
  } else if (!ok) {
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`✓ API on http://localhost:${PORT}`)
  })
}

start()