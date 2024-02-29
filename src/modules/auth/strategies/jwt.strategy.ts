import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_JWT_SECRET } from '@/common';
import { SignDto } from '@/dto/account.dto';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_JWT_SECRET,
    });
  }

  /**
   * @description jwt 会自动处理token是否过期，如果过期则直接返回UnauthorizedException，不会进入该方法。进入该方法，入参已经将token解码成对象
   * @param account
   * @returns
   */
  async validate({ account, password }: SignDto) {
    const res = await this.authService.validateUser(account, password);
    // jwt虽没有过期，但数据库中可能账号被修改或禁用
    if (!res) {
      throw new UnauthorizedException();
    }
    return Object.keys(res).reduce((obj, k) => {
      if (['password', 'status'].includes(k.toLowerCase())) {
        return obj;
      }
      return Object.assign(obj, { [k]: res[k] });
    }, {});
  }
}
