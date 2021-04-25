import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, IsNumber, IsBoolean } from 'class-validator'

@Entity({ name: 'users', orderBy: { _id: 'ASC' } })
export class User {
  @ObjectIdColumn()
  @IsString()
  _id?: string

  @Column()
  @IsString()
  idRole: string

  @Column()
  @IsNumber()
  createdAt?: number

  @Column()
  @IsString()
  createdBy: string

  @Column()
  @IsNumber()
  updatedAt?: number

  @Column()
  @IsString()
  updatedBy: string

  @Column()
  @IsString()
  email?: string

  @Column()
  @IsString()
  phonenumber?: string

  @Column()
  @IsString()
  firstname?: string

  @Column()
  @IsString()
  idRelationship?: string

  @Column()
  @IsBoolean()
  isActive?: boolean

  @Column()
  @IsBoolean()
  isVerified?: boolean

  @Column()
  @IsBoolean()
  isLocked?: boolean

  @Column()
  @IsString()
  imageUrl?: string

  @Column()
  @IsString()
  lastname?: string

  @Column()
  @IsString()
  password: string

  @Column()
  @IsString()
  account: string

  @Column()
  @IsString()
  avatar: string

  constructor(args: Partial<User>) {
    Object.assign(
      this,
      {
        createdAt: +new Date(),
        isActive: true,
        isLocked: false,
        isVerified: false
      },
      args
    )
  }
}
