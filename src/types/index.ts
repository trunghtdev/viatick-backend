/**
 * Subscriptions Context
 * @readonly `connection`: any
 * @readonly `currentUserId?`: string
 * @readonly `variables?`: any
 */
export interface SContext {
  connection: any
  currentUserId?: string
  idRole?: string
  variables?: any
}

/**
 * Queries / Mutations Context
 * @readonly `req`: any
 * @readonly `currentUserId?`: string
 */
export interface IContext {
  req: any
  currentUserId?: string
  idRole?: string
}

export interface LoginInput {
  account: string
  password: string
}

export interface LoginResult {
  token: string
}

export interface TokenData {
  _id: string
  idRole?: string
  password?: string
  firstname?: string
  lastname?: string
  account?: string
}
