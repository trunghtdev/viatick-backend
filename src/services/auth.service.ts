import { Injectable } from '@nestjs/common'
import { getMongoManager } from 'typeorm'
import * as Bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

import { LoginResult, TokenData, LoginInput } from '@types'
import { ApolloError } from 'apollo-server-core'
import { User as UserEntity } from '@src/entities'
import { _appConfigs } from '@constants'

const { DEFAULT_SECRET_KEY } = _appConfigs

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly mongoManager = getMongoManager()

  async validateUser(loginInput: LoginInput): Promise<TokenData> {
    try {
      const { account, password } = loginInput
      const user = await this.mongoManager.findOne(UserEntity, {
        where: {
          $and: [
            { isActive: true },
            {
              $or: [{ email: account }, { phonenumber: account }]
            }
          ]
        }
      })
      // some error
      if (!user) throw new ApolloError('Incorrect account!', '400')

      // *__TODO: user is not verified
      // if (!user.isVerified)
      //   throw new ApolloError('User is not verified!', '401')

      // *__TODO: user is blocked
      if (user.isLocked) throw new ApolloError('User is blocked!', '403')
      if (!Bcrypt.compareSync(password, user.password))
        throw new ApolloError('Incorrect password!', '402')
      return {
        _id: user._id,
        account,
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        password,
        idRole: user.idRole || ''
      }
    } catch (err) {
      throw err
    }
  }

  async login(loginInput: LoginInput): Promise<LoginResult> {
    try {
      const user = await this.validateUser(loginInput)
      // dothings
      // const today = new Date()
      // const expireDay = new Date()
      // expireDay.setDate(today.getDate() + 7)
      const tokenUser = this.jwtService.sign({
        _id: user._id,
        idRole: user.idRole,
        firstname: user.firstname,
        lastname: user.lastname,
        account: user.account,
        password: user.password
      })
      // jwt.sign(
      //   {
      //     _id: user._id,
      //     firstname: user.firstname,
      //     lastname: user.lastname,
      //     username: user.username
      //   },
      //   DEFAULT_SECRET_KEY,
      //   {
      //     expiresIn: expireDay.valueOf()
      //   }
      // )
      return { token: tokenUser }
    } catch (error) {
      throw error
    }
  }

  async verifyToken({ token }): Promise<TokenData> {
    try {
      const dataToken = this.jwtService.verify(token, {
        secret: DEFAULT_SECRET_KEY
      })
      if (!dataToken) throw new ApolloError('Token failed!', '400')
      return {
        _id: dataToken['_id'],
        idRole: dataToken['idRole'],
        firstname: dataToken['firstname'],
        lastname: dataToken['lastname'],
        account: dataToken['account'],
        password: dataToken['password']
      }
    } catch (err) {
      throw err
    }
  }
}
