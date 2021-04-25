import { ScheduleModule } from '@nestjs/schedule'
// Graphql
import { GraphqlModule } from './graphql.module'

// TypeORM
import { TypemORMModule } from './typeORM.module'

// Schedule/CronJob
import { NestScheduleModule } from './nestSchedule.module'
import { UserModule } from './user.module'
import { MqttModule } from './mqtt.module'
import { AuthenticationModule } from './auth.module'
import { TasksModule } from './tasks.module'
import { DeviceModule } from './device.module'

export default [
  DeviceModule,
  TasksModule,
  AuthenticationModule,
  MqttModule,
  GraphqlModule,
  NestScheduleModule,
  TypemORMModule,
  UserModule,
  ScheduleModule.forRoot(),
]
