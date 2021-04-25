import {
  ApolloError,
  UserInputError,
  AuthenticationError,
  ForbiddenError
} from 'apollo-server-fastify'

import { _messages } from '@constants'

interface INewError {
  /**
   * Return new Apollo Error.
   * @param error - String
   */
  Apollo: (error?: string, code?: string) => ApolloError
  /**
   * Return new User Input Error.
   * @param error - String
   */
  UserInput: (error?: string) => UserInputError
  /**
   * Return new Authentication Error.
   * @param error - String
   */
  Authentication: (error?: string) => AuthenticationError
  /**
   * Return new Forbidden Error.
   * @param error - String
   */
  Forbidden: (error?: string) => ForbiddenError
}

export const newError: INewError = {
  Apollo: (error = _messages.DEFAULT_APOLLO_ERROR, code) =>
    new ApolloError(error, code),
  UserInput: (error = _messages.INVALID_USER_INPUT) =>
    new UserInputError(error),
  Authentication: (error = _messages.AUTHENTICATION_ERROR) =>
    new AuthenticationError(error),
  Forbidden: (error = _messages.FORBIDDEN_ERROR) => new ForbiddenError(error)
}

export interface IError
  extends ApolloError,
    UserInputError,
    AuthenticationError,
    ForbiddenError {}
