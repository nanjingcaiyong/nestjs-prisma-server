import { Injectable } from '@nestjs/common';
import { AccountService } from '@/service/account.service';
import { crypto } from '@/utils/crypto';
import { JwtService } from '@nestjs/jwt';
import { SignDto } from '@/dto/account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(account: string, password: string): Promise<any> {
    return await this.accountService.query({
      name: account,
      password: crypto.encodePassword(password),
    });
  }

  async signIn(user: SignDto) {
    return {
      token: this.jwtService.sign(user),
    };
  }
}
