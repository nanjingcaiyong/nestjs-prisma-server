import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BaseController } from './base.controller';
import { UserDto } from '@/dto';
import { ResultStatus } from '@/common';
import { UserService } from '@/service';

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
  @Get('/:id')
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
  @Post('create')
  async create(@Body() user: UserDto) {
    const res = await this.userService.create(user);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success, res);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }
}
