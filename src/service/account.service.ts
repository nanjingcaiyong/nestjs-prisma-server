import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Account, Prisma } from '@prisma/client';
import { AccountDto } from '@/dto';

@Injectable()
export class AccountService extends BaseService {
  constructor() {
    super(Prisma.ModelName.Account);
  }

  queryWithRolesByName<T>(account: string): Promise<T> {
    return this.query({
      where: {
        account,
      },
      include: {
        roles: {
          include: {
            auths: true,
          },
        },
      },
    });
  }

  async createAccount(account: AccountDto) {
    const res = await this.create<Account>({
      account: account.account,
      email: account.email,
      password: account.password,
    });

    const accountRole = await this.update({
      where: {
        id: res.id,
      },
      data: {
        roles: {
          connect: account.roleIds.map((id) => ({ id })),
        },
      },
    });

    return accountRole;
  }
}
