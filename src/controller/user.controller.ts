import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BaseController } from '@/controller/base.controller';
import { UserDto } from '@/dto';
import { ResultStatus } from '@/common';
import { Auths } from '@/common/decorators';
import { Auth } from '@/common/enums/auth.enum';
import { UserService } from '@/service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('authorization')
@ApiTags('用户模块')
@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  /**
   * @description 查询单条用户数据
   * @param id 用户id
   * @returns
   */
  @ApiOperation({
    summary: '查询单条用户数据',
  })
  @Get('/:id')
  @Auths(Auth.all)
  async queryById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.queryById(id);
    if (user) {
      return this.JsonBackResult(ResultStatus.Success, user);
    }
    return this.JsonBackResult(ResultStatus.Empty);
  }

  /**
   * @description 创建用户
   * @param user 用户数据
   * @returns
   */
  @ApiOperation({
    summary: '创建用户',
  })
  @Post('create')
  async create(@Body() user: UserDto) {
    const res = await this.userService.create(user);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success, res);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }
}
