import { prisma } from './prisma.js'

export async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('✓ Database connected (via Prisma)')
    return true
  } catch (err) {
    console.error('✗ Database connection failed:', err.message)
    return false
  }
}