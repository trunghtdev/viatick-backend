import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { _appConfigs } from '@constants'
import { TokenData } from '@src/types'

const { DEFAULT_SECRET_KEY, TOKEN } = _appConfigs

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(TOKEN),
      ignoreExpiration: false,
      secretOrKey: DEFAULT_SECRET_KEY
    })
  }

  async validate(payload: TokenData) {
    return payload
  }
}
