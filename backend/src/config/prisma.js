import { PrismaClient } from '@prisma/client'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'

const globalForPrisma = globalThis

function createPrismaClient() {
  const adapter = new PrismaTiDBCloud({
    url: process.env.DATABASE_URL,
  })

  return new PrismaClient({ adapter })
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}