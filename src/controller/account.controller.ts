import {
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { BaseController } from './base.controller';
import { AccountService } from '@/service';
import { ResultStatus } from '@/common';
import { Account } from '@prisma/client';
import { AccountDto } from '@/dto';
import { crypto } from '@/utils';
@Controller('account')
export class AccountController extends BaseController {
  constructor(private readonly accountService: AccountService) {
    super();
  }

  /**
   * @description 根据id查询账号
   * @param id account id
   * @returns
   */

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const account = await this.accountService.queryById<Account>(id);
    if (account) {
      return this.JsonBackResult(ResultStatus.Success, account);
    }
    return this.JsonBackResult(ResultStatus.Empty);
  }

  /**
   * @description 创建账号
   * @param account 账号信息
   * @returns
   */
  @Post('/create')
  async create(@Body() account: AccountDto) {
    account.password = crypto.encodePassword(account.password);
    const res = await this.accountService.create<Account>(account);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success, res);
    }
    return this.JsonBackResult(ResultStatus.Fail, '创建失败');
  }
}
