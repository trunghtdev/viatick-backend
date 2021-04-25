import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { MongoClient } from 'mongodb'
import { permissions, detailPermission } from './permissions'
import { rolePermissions } from './rolePermission'
import { cluster } from './cluster'
import { typeArea } from './typeArea'
import { deviceType } from './deviceType'
import { attributes } from './attribute'
import { v1 as uuidV1 } from 'uuid'
@Injectable()
export class DbService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    const url = process.env.MONGO_URL
      ? `mongodb://${process.env.MONGO_URL}`
      : `mongodb://localhost:${process.env.MONGO_PORT}`
    const dbName =
      process.env.DBNAME || process.env.MONGO_URL.split(/[:@/]/g).pop()
    // MONGO_PORT=10049 DBNAME=cme yarn db:seed
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await client.connect()
    const db = client.db(dbName)

    try {
      // attributes
      try {
        const _attributes = attributes.map(a => {
          const { name } = a
          const _id = uuidV1({ clockseq: parseInt("0x" + a.code, 16) })
          const code = _id.split('-')[3]
          return db.collection('attribute').findOneAndUpdate(
            { _id: code },
            {
              $setOnInsert: {
                _id: code
              },
              $set: {
                code: a.code,
                name,
                isActive: true,
                createdAt: +new Date()
              }
            },
            { upsert: true }
          )
        })
        await Promise.all(_attributes)
        console.log('🌱  Done for attributes')
      } catch (error) {
        console.log('❌  Error on attributes', error)
      }
      // type area
      try {
        const typesArea = typeArea.map(typearea => {
          const { code, name } = typearea
          return db.collection('types_area').findOneAndUpdate(
            { code },
            {
              $setOnInsert: {
                _id: code
              },
              $set: {
                code,
                name,
                isActive: true,
                createdAt: +new Date()
              }
            },
            { upsert: true }
          )
        })
        await Promise.all(typesArea)
        console.log('🌱  Done for type areas')
      } catch (error) {
        console.log('❌  Error on type areas', error)
      }

      // type device
      try {
        const typesDevice = deviceType.map(typedevice => {
          const { _id, code, name, icon } = typedevice
          return db.collection('device_type').findOneAndUpdate(
            { code },
            {
              $setOnInsert: {
                _id
              },
              $set: {
                code,
                name,
                icon,
                isActive: true,
                createdAt: +new Date()
              }
            },
            { upsert: true }
          )
        })
        await Promise.all(typesDevice)
        console.log('🌱  types device')
      } catch (error) {
        console.log('❌  Error on types device', error)
      }

      // User
      const salt = require('bcrypt').genSaltSync(10)
      const users = [
        {
          _id: 'ef0821e0-8c34-4419-9bfc-46d82c2a052f',
          username: 'superadmin',
          email: 'superadmin@gmail.com',
          idRole: 'SUPER_ADMIN',
          firstname: 'Super',
          lastname: 'Admin',
          password: await require('bcrypt').hashSync('Aa12345678', salt)
        },
        {
          _id: 'b1f18359-7ee4-4df1-bac2-c6b4f25babef',
          username: 'admin',
          email: 'admin@gmail.com',
          idRole: 'ADMIN',
          firstname: 'Admin',
          lastname: 'Smh',
          password: await require('bcrypt').hashSync('Aa12345678', salt)
        },
        {
          _id: 'db26df05-f60c-4202-837b-adb24b78c016',
          username: 'client1',
          email: 'client1@gmail.com',
          idRole: 'CLIENT',
          firstname: 'Client1',
          lastname: 'Smh',
          password: await require('bcrypt').hashSync('Aa12345678', salt)
        },
        {
          _id: 'f57b1f78-f9a1-49dd-b294-a938eebb7bdc',
          username: 'client2',
          email: 'client2@gmail.com',
          idRole: 'CLIENT',
          firstname: 'Client2',
          lastname: 'Smh',
          password: await require('bcrypt').hashSync('Aa12345678', salt)
        },
        {
          _id: 'b8424c26-ca91-4b47-a759-fcbc40e808dc',
          username: 'client3',
          email: 'client3@gmail.com',
          idRole: 'CLIENT',
          firstname: 'Client3',
          lastname: 'Smh',
          password: await require('bcrypt').hashSync('Aa12345678', salt)
        }
      ]
      try {
        const usersPromises = users.map(user => {
          const {
            _id,
            username,
            email,
            idRole,
            firstname,
            lastname,
            password
          } = user
          return db.collection('users').findOneAndUpdate(
            { username },
            {
              $setOnInsert: {
                _id
              },
              $set: {
                username,
                email,
                idRole,
                firstname,
                lastname,
                isActive: true,
                isVerified: true,
                isLocked: false,
                password,
                createdAt: +new Date()
              }
            },
            { upsert: true }
          )
        })
        await Promise.all(usersPromises)
        console.log('🌱  Done for users')
      } catch (error) {
        console.log('❌  Error on users', error)
      }

      // Roles
      const roles = [
        {
          _id: 'SUPER_ADMIN',
          code: 'SUPER_ADMIN',
          name: 'SuperAdmin'
        },
        {
          _id: 'ADMIN',
          code: 'ADMIN',
          name: 'Admin'
        },
        {
          _id: 'CLIENT',
          code: 'CLIENT',
          name: 'CLIENT'
        }
      ]
      try {
        const rolesPromises = roles.map(role => {
          const { _id, code, name } = role
          return db.collection('roles').findOneAndUpdate(
            { _id },
            {
              $setOnInsert: {
                _id
              },
              $set: {
                code,
                name,
                description: '',
                isActive: true
              }
            },
            { upsert: true }
          )
        })
        await Promise.all(rolesPromises)
        console.log('🌱  Done for roles')
      } catch (error) {
        console.log('❌  Error on roles', error)
      }

      // Permission
      try {
        const permissionsPromises = permissions.map(permission => {
          const { _id, code, name } = permission
          return db.collection('permissions').findOneAndUpdate(
            { _id },
            {
              $setOnInsert: {
                _id
              },
              $set: {
                code,
                name,
                description: '',
                isActive: true
              }
            },
            { upsert: true }
          )
        })
        const permissionsDetailsPromises = detailPermission.map(permission => {
          const { _id, code, name } = permission
          return db.collection('permissions').findOneAndUpdate(
            { _id },
            {
              $setOnInsert: {
                _id
              },
              $set: {
                code,
                name,
                description: '',
                isActive: true
              }
            },
            { upsert: true }
          )
        })
        await Promise.all(
          permissionsPromises.concat(permissionsDetailsPromises)
        )
        console.log('🌱  Done for permissions')
      } catch (error) {
        console.log('❌  Error on permissions', error)
      }

      // Role permission
      try {
        const rolePermissionPromises = []
        for (const [role, permissionOfRoles] of Object.entries(
          rolePermissions
        )) {
          let permissionCodes = []
          if (role === 'SUPER_ADMIN') {
            permissionCodes = permissions.map(per => per.code)
          } else {
            permissionCodes = permissionOfRoles
          }
          permissionCodes.forEach(permissionCode => {
            const foundRole = roles.find(rol => rol.code === role)
            const foundPermission = permissions.find(
              per => per.code === permissionCode
            )
            rolePermissionPromises.push(
              db.collection('roles_permissions').findOneAndUpdate(
                {
                  '_id.idRole': foundRole._id,
                  '_id.idPermission': foundPermission._id
                },
                {
                  // $setOnInsert: {
                  //   _id: {
                  //     roleId: foundRole._id,
                  //     permissionId: foundPermission._id
                  //   }
                  // },
                  $set: {
                    isActive: true,
                    typeValue: 'none',
                    value: ''
                  }
                },
                { upsert: true }
              )
            )
          })
        }
        await Promise.all(rolePermissionPromises)
        console.log('🌱  Done for roles_permissions')
      } catch (error) {
        console.log('❌  Error on roles_permissions', error)
      }

      // Cluster
      try {
        const clusters = cluster.map(cluster => {
          const { code, name, desc } = cluster
          return db.collection('clusters').findOneAndUpdate(
            { code },
            {
              $setOnInsert: {
                _id: code
              },
              $set: {
                code,
                name,
                desc,
                isActive: true,
                createAt: +new Date()
              }
            },
            { upsert: true }
          )
        })
        await Promise.all(clusters)
        console.log('🌱  Done for cluster')
      } catch (error) {
        console.log('❌  Error on cluster', error)
      }
      console.log('Seeding Done')
    } catch (error) {
      console.log('Seeding error: ' + error)
    } finally {
      await client.close()
      console.log('connection closed')
    }
  }
}
