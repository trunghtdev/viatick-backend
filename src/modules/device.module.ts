import { Module } from '@nestjs/common'
import { DeviceService } from '@services'
import { DeviceResolvers } from '@resolvers'

@Module({
  providers: [DeviceResolvers, DeviceService]
})
export class DeviceModule { }
