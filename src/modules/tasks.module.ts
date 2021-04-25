import { Module } from '@nestjs/common'

import { TasksService } from '@services'

@Module({
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
