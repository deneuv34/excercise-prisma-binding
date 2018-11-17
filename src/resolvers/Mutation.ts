import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { MutationResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'
import { UserParent } from './User';


export const Mutation = {
  signup: async (parent: any, args: UserParent, ctx: any, info: any) => {
    const password = await hash(args.password, 10)
    const user = await ctx.bindings.mutation.createUser({
      data: {
        ...args,
        password,
      }
    }, info)

    const token = sign({ userId: user.id }, process.env.APP_SECRET ? process.env.APP_SECRET : "secret")

    return {
      token,
      user: await ctx.bindings.query.user({ id: user.id }, info),
    }
  },

  login: async (parent: any, obj: { email: any, password: any }, ctx: any, info: any) => {
    const user = await ctx.bindings.mutation.user({
      data: {
        email: obj.email,
      }
    }, info)
    const valid = await compare(obj.password, user ? user.password : '')

    if (!valid || !user) {
      throw new Error('Invalid Credentials')
    }

    const token = sign({ userId: user.id }, process.env.APP_SECRET ? process.env.APP_SECRET : "secret")

    return {
      token,
      user: await ctx.bindings.query.user({
        where: { id: user.id }
      }, info),
    }
  },
}
