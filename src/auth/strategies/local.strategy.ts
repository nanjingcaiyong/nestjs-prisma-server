import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'account' }); // passport-local策略下请求体中默认是`username`和`password`属性。
  }

  async validate(account: string, password: string) {
    const res = await this.authService.validateUser(account, password);
    if (!res) {
      throw new UnauthorizedException();
    }
    return res;
  }
}
