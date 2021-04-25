import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { MongoClient } from 'mongodb'
import { devices } from './device'
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
    // User
    try {
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
      // devices
      try {
        const devicesPromises = devices.map(device => {
          const {
            deviceId,
            application,
            name,
            model,
            serial,
            mac,
            region,
            longitude,
            latitude,
            floor,
            active,
            distance
          } = device
          return db.collection('devices').findOneAndUpdate(
            { deviceId },
            {
              $setOnInsert: {
                deviceId
              },
              $set: {
                application,
                name,
                model,
                serial,
                mac,
                region,
                longitude,
                latitude,
                floor,
                distance,
                active
              }
            },
            { upsert: true }
          )
        })
        await Promise.all(devicesPromises)
        console.log('🌱  Done for devices')
      } catch (error) {
        console.log('❌  Error on devices', error)
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
