import { Module } from '@nestjs/common'
import { UserService, AuthenticationService } from '@services'
import { UserResolvers } from '@resolvers'
import { AuthenticationModule } from './auth.module'

@Module({
  imports: [AuthenticationModule],
  providers: [UserService, UserResolvers]
})
export class UserModule {}
