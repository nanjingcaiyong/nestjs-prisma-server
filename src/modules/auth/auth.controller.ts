import { Controller, Post, Body } from '@nestjs/common';
import { SignDto } from '@/dto/account.dto';
import { AuthService } from './auth.service';
import { BaseController } from '@/controller/base.controller';
import { ResultStatus } from '@/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('权限模块')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }
  @ApiOperation({
    summary: '登陆授权',
  })
  @Post('login')
  async loginWithToken(@Body() acccount: SignDto) {
    const { token } = (await this.authService.signWithRedis(acccount)) || {};
    if (token) {
      return this.JsonBackResult(ResultStatus.Success, { token });
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }
}
