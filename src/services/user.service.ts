import { _appConfigs } from '@constants'
import * as Bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import {
  LoginInput,
  LoginResponse,
  User as UserGQLType
} from '@typeDefs/index.schema'
import { ResolverClass } from '@src/utils'
import { User as UserEntity } from '@src/entities'
import { AuthenticationService } from './auth.service'
import { ApolloError } from 'apollo-server-fastify'
import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService extends ResolverClass {
  constructor(private readonly auth: AuthenticationService) {
    super()
  }

  async login(args: LoginInput): Promise<LoginResponse> {
    try {
      const { token } = await this.auth.login({
        account: args.account,
        password: args.password
      })
      return { token }
    } catch (error) {
      throw error
    }
  }

  async findOneUser(userId?: string, account?: string): Promise<UserEntity> {
    try {
      const res = await this.mongoManager.findOne(UserEntity, {
        where: {
          $or: [{ _id: userId }, { email: account }, { phonenumber: account }]
        }
      })
      return res
    } catch (err) {
      throw err
    }
  }

  async findManyUser({ inputUser, context }): Promise<UserEntity[]> {
    try {
      const condQuery: object[] = [
        { isActive: true },
        { _id: { $ne: context.currentUserId } }
      ]
      if (inputUser) {
        if (inputUser.firstname) {
          condQuery.push({
            firstname: { $regex: inputUser.firstname, $options: 'si' }
          })
        }
        if (inputUser.lastname) {
          condQuery.push({
            lastname: { $regex: inputUser.lastname, $options: 'si' }
          })
        }
        if (inputUser.email) {
          condQuery.push({
            email: { $regex: inputUser.email, $options: 'si' }
          })
        }
        if (inputUser.phonenumber) {
          condQuery.push({
            phonenumber: { $regex: inputUser.phonenumber, $options: 'si' }
          })
        }
        if (inputUser.idRelationship) {
          condQuery.push({ idRelationship: inputUser.idRelationship })
        }
        if (inputUser.idRole) {
          condQuery.push({ idRole: inputUser.idRole })
        }
      }

      const res = await this.mongoManager.find(UserEntity, {
        where: { $and: condQuery }
      })
      return res
    } catch (err) {
      throw err
    }
  }

  async aggregateUser({
    idUser,
    inputUser,
    createdBy,
    context
  }): Promise<UserGQLType[]> {
    try {
      const condQuery: object[] = [
        { isActive: true },
        { _id: { $ne: context.currentUserId } }
      ]
      const condQueryUsers: object[] = [{ isActive: true }]
      const condQueryRoles: object[] = [{ isActive: true }]
      const condQueryRelations: object[] = [{ isActive: true }]
      if (inputUser) {
        if (inputUser.firstname) {
          condQuery.push({
            firstname: { $regex: inputUser.firstname, $options: 'si' }
          })
        }
        if (inputUser.lastname) {
          condQuery.push({
            lastname: { $regex: inputUser.lastname, $options: 'si' }
          })
        }
        if (inputUser.email) {
          condQuery.push({
            email: { $regex: inputUser.email, $options: 'si' }
          })
        }
        if (inputUser.phonenumber) {
          condQuery.push({
            phonenumber: { $regex: inputUser.phonenumber, $options: 'si' }
          })
        }
        if (inputUser.idRelationship) {
          condQuery.push({ idRelationship: inputUser.idRelationship })
        }
        if (inputUser.idRole) {
          condQuery.push({ idRole: inputUser.idRole })
        }
      }
      if (idUser) {
        condQuery.push({ _id: idUser })
      }
      if (createdBy) {
        condQuery.push({ createdBy })
      }
      const users = await this.mongoManager.find(UserEntity, {
        where: { $and: condQuery }
      })
      condQueryUsers.push({
        _id: users.map(p => p.createdBy).concat(users.map(l => l.updatedBy))
      })
      condQueryRelations.push({ _id: users.map(u => u.idRelationship) })
      condQueryRoles.push({ _id: users.map(u => u.idRole) })
      const [
        usersActions
        // relationships,
        // roles
      ] = await Promise.all([
        this.mongoManager.find(UserEntity, { where: { $and: condQueryUsers } })
        // this.mongoManager.find(RelationshipEntity, {
        //   where: { $and: condQueryRelations }
        // }),
        // this.mongoManager.find(RoleEntity, {
        //   where: { $and: condQueryRelations }
        // })
      ])
      return users.map(a => {
        let createdBy = null
        let updatedBy = null
        // const role = roles.find(r => r._id === a.idRole)
        // const relationship = relationships.find(l => l._id === a.idRelationship)
        usersActions.forEach(u => {
          if (u._id === a.createdBy) {
            createdBy = u
          }
          if (u._id === a.updatedBy) {
            updatedBy = u
          }
        })
        return {
          ...a,
          createdBy,
          updatedBy,
          role: null,
          relationship: null
        }
      })
    } catch (err) {
      throw this.err.Apollo(err)
    }
  }

  async createOneUser({ newUser, context }): Promise<UserEntity> {
    try {
      // if (
      //   !(await this.mongoManager.findOne(RolePermissionEntity, {
      //     where: {
      //       $and: [
      //         { isActive: true },
      //         { '_id.idRole': context.idRole },
      //         { '_id.idPermission': 'AUTHORIZATION_PERMISSION_USER' }
      //       ]
      //     }
      //   }))
      // ) {
      //   throw this.err.Apollo(
      //     'You do not have permission to do this action!',
      //     '403'
      //   )
      // }
      const condQuery: object[] = []
      if (newUser.phonenumber !== undefined) {
        condQuery.push({ phonenumber: newUser.phonenumber })
      }
      if (newUser.email !== undefined) {
        condQuery.push({ email: newUser.email })
      }

      const user = await this.mongoManager.findOne(UserEntity, {
        where: {
          $or: condQuery
        }
      })
      if (user) {
        throw this.err.Apollo('Username or email already existed!', '494')
      }
      const salt = Bcrypt.genSaltSync(10)
      const passwordHash = Bcrypt.hashSync(newUser.password, salt)
      return await this.mongoManager.save(
        new UserEntity({
          ...newUser,
          password: passwordHash,
          createdBy: context.currentUserId || '',
          _id: uuidV4()
        })
      )
    } catch (err) {
      throw err
    }
  }

  async updateOneUser({ userId, update, context }): Promise<boolean> {
    try {
      // if (
      //   !(await this.mongoManager.findOne(RolePermissionEntity, {
      //     where: {
      //       $and: [
      //         { isActive: true },
      //         { '_id.idRole': context.idRole },
      //         { '_id.idPermission': 'UPDATE_USER' }
      //       ]
      //     }
      //   }))
      // ) {
      //   throw this.err.Apollo(
      //     'You do not have permission to do this action!',
      //     '403'
      //   )
      // }
      const {
        result: { n, nModified }
      } = await this.mongoManager.updateOne(
        UserEntity,
        { _id: userId },
        {
          $set: {
            ...update,
            updatedBy: context.currentUserId,
            createdAt: +new Date()
          }
        }
      )
      if (n <= 0) {
        throw this.err.Apollo('User not found!', '493')
      }

      if (nModified <= 0) {
        throw this.err.Apollo('User did not updated!', '495')
      }
      return true
    } catch (err) {
      throw err
    }
  }

  async updateProfile({ update, context }): Promise<boolean> {
    try {
      const {
        result: { n, nModified }
      } = await this.mongoManager.updateOne(
        UserEntity,
        { _id: context.currentUserId },
        {
          $set: {
            ...update,
            updatedBy: context.currentUserId,
            createdAt: +new Date()
          }
        }
      )
      if (n <= 0) {
        throw this.err.Apollo('Profile not found!', '498')
      }

      if (nModified <= 0) {
        throw this.err.Apollo('Profile did not updated!', '499')
      }
      return true
    } catch (err) {
      throw err
    }
  }

  async deleteOneUser({ userId, context }): Promise<boolean> {
    try {
      // if (
      //   !(await this.mongoManager.findOne(RolePermissionEntity, {
      //     where: {
      //       $and: [
      //         { isActive: true },
      //         { '_id.idRole': context.idRole },
      //         { '_id.idPermission': 'DELETE_USER' }
      //       ]
      //     }
      //   }))
      // ) {
      //   throw this.err.Apollo(
      //     'You do not have permission to do this action!',
      //     '403'
      //   )
      // }
      const {
        result: { n, nModified }
      } = await this.mongoManager.updateOne(
        UserEntity,
        { _id: userId },
        {
          $set: {
            isActive: false,
            updatedBy: context.currentUserId,
            createdAt: +new Date()
          }
        }
      )
      if (n <= 0) {
        throw this.err.Apollo('User not found!', '493')
      }

      if (nModified <= 0) {
        throw this.err.Apollo('User has been deleted!', '496')
      }
      return true
    } catch (err) {
      throw err
    }
  }

  async deleteManyUser({ userIds, context }): Promise<boolean> {
    try {
      // if (
      //   !(await this.mongoManager.findOne(RolePermissionEntity, {
      //     where: {
      //       $and: [
      //         { isActive: true },
      //         { '_id.idRole': context.idRole },
      //         { '_id.idPermission': 'DELETE_USER' }
      //       ]
      //     }
      //   }))
      // ) {
      //   throw this.err.Apollo(
      //     'You do not have permission to do this action!',
      //     '403'
      //   )
      // }
      const {
        result: { n, nModified }
      } = await this.mongoManager.updateMany(
        UserEntity,
        { _id: { $in: userIds } },
        {
          $set: {
            isActive: false,
            updatedBy: context.currentUserId,
            createdAt: +new Date()
          }
        }
      )
      if (n <= 0) {
        throw this.err.Apollo('Users not found!', '493')
      }

      if (nModified <= 0) {
        throw this.err.Apollo('Users have been deleted!', '496')
      }
      return true
    } catch (err) {
      throw err
    }
  }
  async transporter(user) {
    const option = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // email
        pass: process.env.PASSWORD // password
      }
    }
    const transporter = nodemailer.createTransport(option)
    // random
    const sixDigitsRandom =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    const mail = {
      from: 'SMARTHOME', // Địa chỉ email của người gửi
      to: user.email, // Địa chỉ email của người gửi
      subject: 'RESET PASSWORD - SMARTHOME', // Tiêu đề mail
      html: `<p>Hi, <b>${user.firstname} ${user.lastname} </b> !</p>
      <p><b>${sixDigitsRandom}</b> is your code to reset password.</p>` // Nội dung mail dạng text
    }
    return new Promise((res, rej) => {
      transporter.sendMail(mail, (error, info) => {
        if (error) {
          // nếu có lỗi
          rej(error)
          throw new ApolloError(error, '400')
        } else {
          res(sixDigitsRandom)
        }
      })
    })
  }

  async sendMail(email) {
    const res = await this.mongoManager.findOne(UserEntity, { email })
    if (!res) {
      throw this.err.Apollo('Email have not registed yet', '497')
    } else {
      const code = await this.transporter(res)
      return { userId: res._id, code: code ? code.toString() : '' }
    }
  }
  async resetPassword(userId, password) {
    const res = await this.mongoManager.findOne(UserEntity, { _id: userId })
    if (!res) {
      throw this.err.Apollo('Email have not registed yet', '497')
    } else {
      const salt = Bcrypt.genSaltSync(10)
      const passwordHash = await Bcrypt.hash(password, salt)
      console.log(passwordHash, password, 'ppp')
      return await this.mongoManager.updateOne(
        UserEntity,
        { _id: userId },
        {
          $set: {
            ...res,
            password: passwordHash
          }
        }
      )
    }
  }
}
