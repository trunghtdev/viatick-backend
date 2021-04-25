import { getMongoManager } from 'typeorm'
import { NestSchedule } from 'nest-schedule'

import { newError } from './apolloErrors'
import { Console } from './console'

export class ResolverClass extends NestSchedule {
  /** Extends `getMongoManager` from `typeorm`. */
  public mongoManager = getMongoManager()

  /** A collection of predefined errors. */
  public err = newError

  /** A collection of custom console.log */
  public Console = Console
}
