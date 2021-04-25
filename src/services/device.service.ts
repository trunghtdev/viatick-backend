import { _appConfigs } from '@constants'
import * as Bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import {
  LoginInput,
  LoginResponse,
  User as UserGQLType,
  FilterDevice,
  DeviceUpdateInput
} from '@typeDefs/index.schema'
import { ResolverClass } from '@src/utils'
import { User as UserEntity, EntityDevice } from '@src/entities'
import { AuthenticationService } from './auth.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeviceService extends ResolverClass {
  async getSensorsWithIOT(filter: FilterDevice): Promise<any> {
    try {
      const condQuery: object[] = []
      if (filter !== undefined) {
        for (const field of Object.keys(filter)) {
          switch (field) {
            case 'name':
              condQuery.push({ name: { $regex: filter.name, $options: 'si' } })
              break
            case 'model':
              condQuery.push({ model: { $regex: filter.model, $options: 'si' } })
              break
            case 'serial':
              condQuery.push({ serial: { $regex: filter.serial, $options: 'si' } })
              break
            case 'mac':
              condQuery.push({ mac: { $regex: filter.mac, $options: 'si' } })
              break
            case 'region':
              condQuery.push({ serial: { $regex: filter.region, $options: 'si' } })
              break
            case 'longitude':
              condQuery.push({ longitude: filter.longitude })
              break
            case 'latitude':
              condQuery.push({ latitude: filter.latitude })
              break
            case 'floor':
              condQuery.push({ floor: filter.floor })
              break
            case 'distance':
              condQuery.push({ distance: filter.distance })
              break
            case 'remark':
              condQuery.push({ remark: { $regex: filter.remark, $options: 'si' } })
              break
            case 'optional':
              condQuery.push({ optional: { $regex: filter.optional, $options: 'si' } })
              break
            case 'active':
              condQuery.push({ active: filter.active })
              break
            case 'date':
              condQuery.push({ date: filter.date })
              break
            default:
              break;
          }
        }
      } else {
        condQuery.push({
          active: true
        })
      }

      const devices = await this.mongoManager.find(
        EntityDevice, {
        where: { $and: condQuery }
      }
      )
      return devices
    } catch (err) {
      throw this.err.Apollo(err)
    }
  }
  async updateDevice(input: DeviceUpdateInput): Promise<any> {
    try {
      const updatedDevice = Object.assign({}, input)
      delete updatedDevice.deviceId

      const devcie = await this.mongoManager.findOneAndUpdate(
        EntityDevice, {
        _id: input.deviceId
      }, {
        ...updatedDevice
      })

      return devcie
    } catch (err) {
      throw this.err.Apollo(err)
    }
  }
  async deleteDevices(type: string, deviceIds: number[]): Promise<any> {
    try {
      switch (type) {
        case 'Sensor':
          const { deletedCount } = await this.mongoManager.deleteMany(
            EntityDevice, {
            _id: { $in: deviceIds }
          }
          )
          return deletedCount
        default:
          break;
      }
    } catch (err) {
      throw this.err.Apollo(err)
    }
  }
}