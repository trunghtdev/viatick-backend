import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { GqlExecutionContext } from '@nestjs/graphql'
import chalk from 'chalk'

import { Console } from '@utils'

@Injectable()
export class Logging implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startAt = +new Date()
    const gqlCtx = GqlExecutionContext.create(context)

    return next.handle().pipe(
      tap(() => {
        const actionType = String(gqlCtx['args'][3].parentType)
        if (['Query', 'Mutation'].indexOf(actionType) > -1)
          Console.log(
            chalk.greenBright(`Interceptor: `) +
            `${gqlCtx['args'][3].parentType} ${gqlCtx['args'][3].fieldName ||
            ''} : finished in ${+new Date() - startAt} ms`
          )
      }),
      catchError(error => {
        Console.error(
          chalk.redBright(`Interceptor: `) +
          (error + '').replace(
            /(Error: |Authentication|UserInputError: )+/g,
            ''
          )
        )
        return throwError(error)
      })
    )
  }
}
