import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, IsNumber, IsBoolean } from 'class-validator'

@Entity({ name: 'devices', orderBy: { _id: 'ASC' } })
export class EntityDevice {
  @ObjectIdColumn()
  @IsString()
  _id?: string

  @Column()
  @IsNumber()
  deviceId: number

  @Column()
  @IsNumber()
  application: number

  @Column()
  @IsString()
  name: string

  @Column()
  @IsNumber()
  model: number

  @Column()
  @IsString()
  serial: string

  @Column()
  @IsString()
  mac: string

  @Column()
  @IsString()
  region: string

  @Column()
  @IsNumber()
  longitude: number

  @Column()
  @IsNumber()
  latitude: number

  @Column()
  @IsNumber()
  floor: number

  @Column()
  @IsNumber()
  distance: number

  @Column()
  @IsString()
  remark: string

  @Column()
  @IsNumber()
  optional: number

  @Column()
  @IsBoolean()
  active: boolean

  @Column()
  @IsNumber()
  date: number //AWSDateTime

  @Column()
  @IsNumber()
  live: number //AWSDateTime

  @Column()
  @IsNumber()
  battery: number

  @Column()
  @IsNumber()
  humidity: number

  @Column()
  @IsNumber()
  temperature: number

  @Column()
  @IsNumber()
  height: number

  @Column()
  @IsNumber()
  maxHeight: number

  @Column()
  @IsNumber()
  x: number

  @Column()
  @IsNumber()
  y: number

  @Column()
  @IsNumber()
  z: number

  @Column()
  tags: string[]

  @Column()
  @IsNumber()
  deploymentDate: number //AWSDateTime

  @Column()
  @IsString()
  compositionData: string // AWSJSON

  @Column()
  @IsString()
  unicastAddr: string

  @Column()
  @IsNumber()
  meshStatus: string //AWSJSON

  @Column()
  @IsString()
  status: string

  @Column()
  @IsString()
  error: string

  @Column()
  @IsString()
  lockStatus: string

  @Column()
  @IsString()
  network: string

  @Column()
  @IsNumber()
  frequency: number

  @Column()
  @IsString()
  server: string

  constructor(args: Partial<EntityDevice>) {
    Object.assign(
      this,
      {
        createdAt: +new Date(),
      },
      args
    )
  }
}
