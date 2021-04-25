import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import envConfig from '@configs/typeORM'

@Module({
  imports: [TypeOrmModule.forRoot(envConfig.ormConfig as TypeOrmModuleOptions)]
})
export class TypemORMModule {}
