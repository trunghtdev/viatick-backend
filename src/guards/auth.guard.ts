import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { _appConfigs } from '@constants'
import { AuthenticationError } from 'apollo-server-fastify'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '@src/decorators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()]
      )

      if (isPublic) {
        res(true)
        return
      }

      const ctx = GqlExecutionContext.create(context).getContext()
      const req = ctx.req
      const user = req ? req.user : ctx.user

      if (!user) {
        rej(new AuthenticationError('Missing token'))
      }
      return res(true)
    })
  }
}
