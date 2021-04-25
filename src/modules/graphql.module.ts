import { Module, UnauthorizedException } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { AuthenticationService } from '@services'
import { _appConfigs } from '@constants'
import { DeprecatedDirective } from '@configs/graphql/directives'
import { generatorConfigs } from '@configs/graphql/settings'
import { AuthenticationModule } from './auth.module'
import { AuthenticationError } from 'apollo-server-fastify'

const { GRAPHQL_PATH, PRODUCTION, TOKEN } = _appConfigs

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [AuthenticationModule],
      inject: [AuthenticationService],
      useFactory: (authen: AuthenticationService) => ({
        // NOTE: Load graphql files
        path: GRAPHQL_PATH,
        typePaths: ['src/**/*.graphql'],
        // NOTE: Subscriptions
        installSubscriptionHandlers: true,
        subscriptions: {
          path: GRAPHQL_PATH,
          onConnect: async connectionParams => {
            if (connectionParams[TOKEN]) {
              const tokenData = await authen.verifyToken({
                token: connectionParams[TOKEN]
              })
              if (tokenData._id) {
                const currentUser = await authen.validateUser({
                  account: tokenData.account,
                  password: tokenData.password
                })
                if (currentUser) {
                  return {
                    user: {
                      _id: currentUser._id,
                      account: currentUser.account,
                      firstname: currentUser.firstname,
                      lastname: currentUser.lastname,
                      password: currentUser.password
                    }
                  }
                }
              }
            }
            throw new AuthenticationError('Missing token')
          }
        },

        // NOTE: Graphql schema definitions generator
        ...((process.env.GENERATE_SCHEMA ||
          process.env.NODE_ENV === PRODUCTION) && {
          definitions: { ...generatorConfigs }
        }),

        // NOTE: Schema directives
        schemaDirectives: {
          deprecated: DeprecatedDirective
        },

        // NOTE: Graphql context
        context: async ({ req, connection }) => {
          // For websocket/subscriptions
          if (connection) {
            if (connection.context.user) {
              if (connection.variables) {
                return {
                  connection,
                  user: connection.context.user,
                  variables: connection.variables
                }
              }
              return {
                connection,
                user: connection.context.user
              }
            }
            return { connection }
          } else {
            // For queries/mutations
            if (req.headers[TOKEN]) {
              const tokenData = await authen.verifyToken({
                token: req.headers[TOKEN]
              })

              if (tokenData._id) {
                const user = await authen.validateUser({
                  password: tokenData.password,
                  account: tokenData.account
                })
                if (user) {
                  req.user = {
                    _id: user._id,
                    account: user.account,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    passport: user.password
                  }
                }
              }
            }
            return { req }
          }
        },

        // NOTE: Stop users from making high depth queries/mutations
        // validationRules: [
        //   depthLimit(GRAPHQL_DEPTH_LIMIT, {}, info => {
        //     const [[name, depth]] = Object.entries(info)
        //     const message = `Queries/Mutations depth reached level ${depth} on ${name ||
        //       '"unknown"'}`
        //     if (depth === GRAPHQL_DEPTH_LIMIT - 1) {
        //       Console.warn(message)
        //     } else if (depth === GRAPHQL_DEPTH_LIMIT) {
        //       Console.error(message)
        //     }
        //   })
        // ],

        // NOTE: Playground
        introspection: true,
        playground:
          process.env.NODE_ENV === PRODUCTION
            ? false
            : {
              settings: {
                'general.betaUpdates': false,
                'editor.cursorShape': 'line',
                'editor.fontSize': 14,
                'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Droid Sans Mono', 'Monaco', monospace`,
                'editor.theme': 'dark',
                'editor.reuseHeaders': true,
                'request.credentials': 'omit',
                'tracing.hideTracingResponse': false
              }
            },
        // formatError: ({ message, locations, path, extensions }) => {
        //   console.log(message)
        //   return {
        //     message: message
        //       .toString()
        //       .replace(/(Error: |Authentication|UserInputError: )+/g, ''),
        //     locations,
        //     path,
        //     code: extensions.code,
        //     extensions: {
        //       exception: {
        //         code: extensions.exception.code
        //       }
        //     }
        //   }
        // }
      })
    })
  ]
})
export class GraphqlModule { }
