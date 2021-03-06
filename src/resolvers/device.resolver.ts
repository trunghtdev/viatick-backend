import { Resolver, Args, Context, Query, Mutation } from '@nestjs/graphql'
import { UseGuards, UseInterceptors } from '@nestjs/common'

import { Logging } from '@src/utils/interceptors'
import { IContext, TokenData } from '@types'
import { IError, isStringsValid } from '@utils'
import { _appConfigs } from '@constants'
import { Public } from '@decorators'

import {
  DeleteDeviceResponse,
  DeviceCreateInput,
  DeviceUpdateInput,
  FilterDevice
} from '@typeDefs/index.schema'
import { DeviceService } from '@services'
import { UserInputError, ApolloError } from 'apollo-server-fastify'

@Resolver('Device')
@UseInterceptors(Logging)
export class DeviceResolvers {
  constructor(private readonly deviceService: DeviceService) { }
  @Query('getSensorsWithIOT')
  async getSensorsWithIOT(@Args('filter') filter: FilterDevice): Promise<any> {
    try {
      return await this.deviceService.getSensorsWithIOT(filter)
    } catch (err) {
      throw err
    }
  }

  @Mutation('createDevice')
  async createDevice(@Args('input') input: DeviceCreateInput): Promise<string> {
    try {
      return (await this.deviceService.createDevice(input))._id
    } catch (err) {
      throw err
    }
  }

  @Mutation('updateDevice')
  async updateDevice(@Args('input') input: DeviceUpdateInput): Promise<any> {
    try {
      return await this.deviceService.updateDevice(input)
    } catch (err) {
      throw err
    }
  }

  @Mutation('deleteDevices')
  async deleteDevices(
    @Args('deviceIds') deviceIds: number[],
    @Args('type') type?: string
  ): Promise<DeleteDeviceResponse> {
    try {
      return {
        rows_deleted: await this.deviceService.deleteDevices(deviceIds, type)
      }
    } catch (err) {
      throw err
    }
  }
}