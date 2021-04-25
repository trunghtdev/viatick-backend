import { Module } from '@nestjs/common'
import { AuthenticationService } from '@services'
import { _appConfigs } from '@constants'
import { JwtModule } from '@nestjs/jwt'

const { DEFAULT_SECRET_KEY } = _appConfigs

@Module({
  imports: [
    JwtModule.register({
      secret: DEFAULT_SECRET_KEY
    })
  ],
  providers: [AuthenticationService],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
