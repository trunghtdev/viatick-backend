import { Module } from '@nestjs/common'

import Modules from './modules'
import Controllers from './controllers'
import { DbService } from './dbseed'

import { MqttService } from '@services'
import { PassportModule } from '@nestjs/passport'
import { AuthGuard } from '@guards'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: Array.from(Modules).concat([
    DbService,
    PassportModule.register({ session: true })
  ]),
  providers: [
    MqttService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [...Controllers]
})
export class ApplicationModule {}
