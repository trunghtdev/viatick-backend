import { verify } from 'jsonwebtoken'
import { _appConfigs } from '@constants'

const { SECRET_KEY = _appConfigs.DEFAULT_SECRET_KEY } = process.env

/**
 * Verify that token is valid or not. If token is valid then decode and return `_id`, return `null` if it's not
 * @param token - JsonWebToken
 */
export const extractIdFromToken = (token: string): string | null =>
  verify(token, SECRET_KEY)['userId'] || null

/**
 * Verify that strings is valid or not
 * @param argument - String
 */
export function isStringsValid(argument: Array<string>): boolean {
  return !argument.some(str => !str || str.replace(/\s+/g, '').length === 0)
}
