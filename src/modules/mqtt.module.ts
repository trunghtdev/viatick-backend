import { Module } from '@nestjs/common'
import { MqttService } from '@services'
import { MqttResolvers } from '@resolvers'

@Module({
  providers: [MqttService, MqttResolvers],
  exports: [MqttService]
})
export class MqttModule {}
