import { Injectable } from '@nestjs/common';
import { AccountService } from '@/service/account.service';
import { crypto, uuid } from '@/utils';
import { SignDto } from '@/dto/account.dto';
import { RedisService } from '@/common';
import { ONE_DAY } from '@/common';
import { Account, Auth, Role } from '@prisma/client';

type AccountWithRole = Account & { roles: (Role & { auths: Auth[] })[] };

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * @description 账号校验
   * @param account 账号
   * @param password 密码
   * @returns
   */
  async validateUser(account: string, password: string): Promise<any> {
    return await this.accountService.query({
      where: {
        name: account,
        password: crypto.encodePassword(password),
      },
    });
  }

  /**
   * @description 登陆并生成token，数据存储redis
   * @param account 用户账号和密码
   * @returns
   */
  async signWithRedis(account: SignDto) {
    const res = await this.accountService.query<AccountWithRole>(
      {
        where: account,
      },
      {
        roles: {
          include: {
            auths: true,
          },
        },
      },
    );
    if (res === null) {
      return null;
    }
    const token = uuid();
    const STORY_ACCOUNT = {
      id: res.id,
      name: res.account,
      expired: Date.now() + ONE_DAY, // 缓存过期时间
      roles: res.roles.map((t) => t.roleName),
      auths: res.roles?.reduce?.(
        (auths, role) => auths.concat(role.auths.map((t) => t.type)),
        [],
      ),
    };
    this.redisService.set(token, JSON.stringify(STORY_ACCOUNT));
    return {
      token,
    };
  }
}
