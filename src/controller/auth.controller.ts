import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from './base.controller';
import { AuthService } from '@/service';
import { AuthDto } from '@/dto/auth.dto';
import { ResultStatus } from '@/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('authorization')
@ApiTags('权限模块')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * @description 创建权限
   * @param auth 权限实体
   * @returns
   */
  @ApiOperation({
    summary: '创建权限',
  })
  @Post('create')
  async create(@Body() auth: AuthDto) {
    const res = await this.authService.create(auth);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }
}
