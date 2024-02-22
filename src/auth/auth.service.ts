import { Injectable } from '@nestjs/common';
import { AccountService } from '@/service/account.service';
import { crypto } from '@/utils/crypto';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService) {}
  async validateUser(account: string, password: string): Promise<any> {
    const encyptPassword = crypto.encodePassword(password);
    return await this.accountService.query({
      name: account,
      password: encyptPassword,
    });
  }
}
