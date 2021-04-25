import { Module } from '@nestjs/common'
import { ScheduleModule } from 'nest-schedule'

// import { ScheduleService } from '@services'

@Module({
  imports: [ScheduleModule.register()]
  // providers: [ScheduleService]
})
export class NestScheduleModule {}
