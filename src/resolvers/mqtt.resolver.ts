import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { UseInterceptors } from '@nestjs/common'

import { Logging } from '@src/utils/interceptors'
import { _appConfigs } from '@constants'
import { MqttRequest, MqttResponse } from '@src/typeDefs/index.schema'
import { MqttService } from '@src/services'

@Resolver('Mqtt')
@UseInterceptors(Logging)
export class MqttResolvers {
  constructor(private readonly mqttService: MqttService) { }

  @Mutation('mqttPublish')
  async mqttPublish(@Args('request') request: MqttRequest): Promise<boolean> {
    try {
      return await this.mqttService.mqttPublish(request)
    } catch (err) {
      throw err
    }
  }

  // @Subscription(returns => MqttResponse, {
  //   resolve: response => {
  //     let jsonRes = response
  //     console.log({ jsonRes })
  //     if (typeof jsonRes === 'string') {
  //       jsonRes = JSON.parse(jsonRes)
  //     }

  //     if (jsonRes?.data !== undefined) {
  //       if (
  //         typeof jsonRes?.data?.value !== undefined &&
  //         typeof jsonRes?.data?.value !== 'string'
  //       ) {
  //         jsonRes.data.value = JSON.stringify(jsonRes.data.value)
  //       }
  //     }

  //     return jsonRes
  //   },
  //   filter: (payload, variables) => {
  //     if (payload.command === 'ATTRIBUTES') {
  //       return payload.id === variables.deviceDefinition
  //     }
  //     return true
  //   }
  // })
  // async mqttDevice(
  //   @Args('macRegister') macRegister: string,
  //   @Args('deviceDefinition') deviceDefinition: string,
  //   @Args('prefix') prefix: string
  // ) {
  //   return this.mqttService.pubsub.asyncIterator(`${prefix}${macRegister}`)
  // }
}
