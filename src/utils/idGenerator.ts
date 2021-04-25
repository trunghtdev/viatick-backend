import { v1 as uuidv1 } from 'uuid'
import { V1Options } from 'uuid/interfaces'

interface IDGenerator {
  mainId: (v1Options?: V1Options) => string
  subId: () => string
}

export const idGenerator: IDGenerator = {
  mainId: v1Options => uuidv1(v1Options),
  subId: () =>
    Math.random()
      .toString(36)
      .slice(2)
}
