import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, IsNumber, IsBoolean } from 'class-validator'

@Entity({ name: 'counters', orderBy: { _id: 'ASC' } })
export class EntityCounters {
  @ObjectIdColumn()
  @IsString()
  _id?: string

  @Column()
  @IsNumber()
  sequence_value: number

  constructor(args: Partial<EntityCounters>) {
    Object.assign(
      this,
      {
        createdAt: +new Date()
      },
      args
    )
  }
}