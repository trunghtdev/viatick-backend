import { _appConfigs } from '@constants'
import { Injectable } from '@nestjs/common'
import { ResolverClass } from '@src/utils'
import { MqttRequest } from '@typeDefs/index.schema'
import { MQTTPubSub } from 'graphql-mqtt-subscriptions'

const {
  BROKER = _appConfigs.BROKER,
  BROKER_USERNAME = _appConfigs.BROKER_USERNAME,
  BROKER_PASSWORD = _appConfigs.BROKER_PASSWORD
} = process.env
const mqttPubSub = new MQTTPubSub({
  client: require('mqtt').connect(BROKER, {
    reconnectPeriod: 1000,
    username: BROKER_USERNAME,
    password: BROKER_PASSWORD
  })
})

@Injectable()
export class MqttService extends ResolverClass {
  public pubsub = mqttPubSub

  async mqttPublish(request: MqttRequest): Promise<boolean> {
    try {
      return await this.pubsub.publish(request.topic, request)
    } catch (err) {
      throw err
    }
  }

  async mqttSubscribe(
    topic: string,
    callback: (payload) => Promise<void> | {} | void
  ): Promise<number> {
    try {
      return await this.pubsub.subscribe(topic, async payload => {
        await callback(payload)
      })
    } catch (err) {
      throw err
    }
  }
}
