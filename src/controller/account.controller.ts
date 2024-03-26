import {
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { BaseController } from './base.controller';
import { AccountService, RoleService } from '@/service';
import { ResultStatus } from '@/common';
import { Account } from '@prisma/client';
import { AccountDto } from '@/dto';
import { crypto } from '@/utils';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Auths, Roles } from '@/common/decorators';
import { Role, Auth } from '@/common/enums';
import { isNil } from 'lodash';

@ApiBearerAuth('authorization')
@ApiTags('账号模块')
@Controller('account')
@Roles(Role.Admin)
export class AccountController extends BaseController {
  constructor(
    private readonly accountService: AccountService,
    private readonly roleService: RoleService,
  ) {
    super();
  }

  //#region 查
  /**
   * @description 根据id查询账号
   * @param id account id
   * @returns
   */
  @ApiOperation({
    summary: '根据id查询账号',
  })
  @Auths(Auth.visit)
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const account = await this.accountService.queryById<Account>(id);
    if (account) {
      return this.JsonBackResult(ResultStatus.Success, account);
    }
    return this.JsonBackResult(ResultStatus.Empty);
  }
  //#endregion

  //#region 增
  /**
   * @description 创建账号
   * @param account 账号信息
   * @returns
   */
  @ApiOperation({
    summary: '创建账号',
  })
  @Auths(Auth.create, Auth.visit)
  @Post('create')
  async create(@Body() account: AccountDto) {
    const [accountModel, roleModel] = await Promise.all([
      this.accountService.query({
        where: {
          OR: [{ account: account.account }, { email: account.email }],
        },
      }),
      this.roleService.query({
        where: {
          id: {
            in: account.roleIds,
          },
        },
      }),
    ]);

    if (accountModel) {
      return this.JsonBackResult(ResultStatus.IsExist);
    }

    if (isNil(roleModel)) {
      return this.JsonBackResult(ResultStatus.NoExist);
    }
    account.password = crypto.encodePassword(account.password);
    const res = await this.accountService.createAccount(account);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success, res);
    }
    return this.JsonBackResult(ResultStatus.Fail, '创建失败');
  }
  //#endregion

  //#region 删
  @ApiOperation({
    summary: '删除账号',
  })
  @Auths(Auth.delete)
  @Post('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const res = await this.accountService.deleteById(id);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }
  //#endregion
}
