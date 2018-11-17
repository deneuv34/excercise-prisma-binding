// import { getUserId } from '../utils'
import { QueryResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface QueryParent {}

export const Query = {
  getUser: async (parent: any, args: any, ctx: any, info: any) => {
    return await ctx.binding.query.users({ where: {}}, info)
  },
}
