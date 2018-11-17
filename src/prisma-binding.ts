import { Prisma } from 'prisma-binding'
import { typeDefs } from './generated/prisma-client/prisma-schema'

export const prismaBinding = new Prisma({
  typeDefs,
  endpoint: process.env.PRISMA_ENDPOINT!,
  secret: process.env.PRISMA_SECRET!,
})
