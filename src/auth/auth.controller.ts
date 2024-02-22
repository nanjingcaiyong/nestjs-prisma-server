import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Request,
} from '@nestjs/common';
import { SignDto } from '@/dto/account.dto';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BaseController } from '@/controller/base.controller';
import { ResultStatus } from '@/common';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }
  /**
   * @description 用户登陆
   * @param account 账号/密码
   * @returns
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async queryById(@Body() acccount: SignDto) {
    const ACCESS_TOKEN = await this.authService.signIn(acccount);
    return this.JsonBackResult(ResultStatus.Success, ACCESS_TOKEN);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
