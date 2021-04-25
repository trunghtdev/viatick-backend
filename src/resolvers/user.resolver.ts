import { Resolver, Args, Context, Query, Mutation } from '@nestjs/graphql'
import { UseGuards, UseInterceptors } from '@nestjs/common'

import { Logging } from '@src/utils/interceptors'
import { IContext, TokenData } from '@types'
import { IError, isStringsValid } from '@utils'
import { _appConfigs } from '@constants'
import { Public } from '@decorators'

import {
  LoginInput,
  LoginResponse,
  User as UserGQLType,
  NewUserInput,
  UpdateUserInput,
  TypeUser,
  ResetPasswordResponse
} from '@typeDefs/index.schema'
import { UserService } from '@services'
import { UserInputError, ApolloError } from 'apollo-server-fastify'

@Resolver('User')
@UseInterceptors(Logging)
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @Query('findAuthenUser')
  async findAuthenUser(@Context() context): Promise<TypeUser> {
    try {
      const user: TokenData = context.req.user

      const res = await this.userService.findOneUser(user._id, null)

      if (!res) {
        throw new ApolloError('User not found', '505')
      }
      return res
    } catch (err) {
      throw err
    }
  }

  @Query('findOneUser')
  async findOneUser(@Args('userId') userId: string): Promise<TypeUser> {
    try {
      const res = await this.userService.findOneUser(userId, null)

      if (!res) {
        throw new ApolloError('User not found', '505')
      }
      return res
    } catch (err) {
      throw err
    }
  }

  @Query('findManyUser')
  async findManyUser(
    @Context() context,
    @Args('inputUser') inputUser: UpdateUserInput,
    @Args('createdBy') createdBy: string
  ): Promise<TypeUser[]> {
    try {
      const user: TokenData = context.req.user

      const res = await this.userService.findManyUser({
        inputUser,
        context: {
          currentUserId: user._id
        }
      })
      return res
    } catch (err) {
      throw err
    }
  }

  @Query('aggregateUser')
  async aggregateUser(
    @Context() context,
    @Args('idUser') idUser: string,
    @Args('inputUser') inputUser: UpdateUserInput,
    @Args('createdBy') createdBy: string
  ): Promise<UserGQLType[]> {
    try {
      const user: TokenData = context.req.user

      const res = await this.userService.aggregateUser({
        idUser,
        inputUser,
        createdBy,
        context: {
          currentUserId: user._id
        }
      })
      return res
    } catch (err) {
      throw err
    }
  }

  @Mutation('login')
  @Public()
  async login(
    @Args('loginInput') args: LoginInput
  ): Promise<LoginResponse | IError> {
    try {
      if (!isStringsValid([args.account, args.password])) {
        throw new UserInputError(
          'Username and Password can not be null or contain white spaces!'
        )
      }
      return await this.userService.login(args)
    } catch (error) {
      throw error
    }
  }

  @Mutation('createOneUser')
  @Public()
  async createOneUser(
    @Context() context,
    @Args('newUser') newUser: NewUserInput
  ): Promise<string> {
    try {
      const user: TokenData = context.req.user

      const res = await this.userService.createOneUser({
        newUser,
        context: {
          currentUserId: user ? user._id : '',
          idRole: user ? user.idRole : ''
        }
      })
      return res._id
    } catch (err) {
      throw err
    }
  }

  @Mutation('updateOneUser')
  async updateOneUser(
    @Context() context,
    @Args('userId') userId: string,
    @Args('update') update: UpdateUserInput
  ): Promise<boolean> {
    try {
      const user: TokenData = context.req.user
      const res = await this.userService.updateOneUser({
        userId,
        update,
        context: {
          currentUserId: user._id,
          idRole: user.idRole
        }
      })
      return res
    } catch (err) {
      throw err
    }
  }

  @Mutation('updateProfile')
  async updateProfile(
    @Context() context,
    @Args('userId') userId: string,
    @Args('update') update: UpdateUserInput
  ): Promise<boolean> {
    try {
      const user: TokenData = context.req.user
      const res = await this.userService.updateProfile({
        update,
        context: {
          currentUserId: user._id,
          idRole: user.idRole
        }
      })
      return res
    } catch (err) {
      throw err
    }
  }

  @Mutation('deleteOneUser')
  async deleteOneUser(
    @Context() context,
    @Args('userId') userId: string
  ): Promise<boolean> {
    try {
      const user: TokenData = context.req.user
      const res = await this.userService.deleteOneUser({
        userId,
        context: {
          currentUserId: user._id,
          idRole: user.idRole
        }
      })
      return res
    } catch (err) {
      throw err
    }
  }

  @Mutation('deleteManyUser')
  async deleteManyUser(
    @Context() context: IContext,
    @Args('userIds') userIds: string[]
  ): Promise<boolean> {
    try {
      const user: TokenData = context.req.user
      const res = await this.userService.deleteManyUser({
        userIds,
        context: {
          currentUserId: user._id,
          idRole: user.idRole
        }
      })
      return res
    } catch (err) {
      throw err
    }
  }

  @Mutation()
  async sendCodeForgotPassword(
    @Args('email') email: string
  ): Promise<ResetPasswordResponse> {
    try {
      const res = await this.userService.sendMail(email)
      return res
    } catch (err) {
      throw err
    }
  }

  @Mutation()
  async resetPassword(
    @Args('userId') userId: string,
    @Args('password') password: string
  ): Promise<boolean> {
    try {
      const res = await this.userService.resetPassword(userId, password)
      return !!res
    } catch (err) {
      throw err
    }
  }
}
