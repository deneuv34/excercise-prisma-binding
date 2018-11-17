import { GraphQLServer } from 'graphql-yoga'
import { Prisma, prisma } from './generated/prisma-client'
import { resolvers } from './resolvers'
import { prismaBinding } from './prisma-binding';

const db = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT!,
  secret: process.env.PRISMA_SECRET!,
  // debug: true,
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers as any,
  context: {
    binding: prismaBinding,
    db: prisma,
  }
} as any)

server.start(({ port }) =>
  console.log(`Server is running on http://localhost:${port}`),
)
