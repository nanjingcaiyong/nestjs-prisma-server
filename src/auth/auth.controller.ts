import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LoginDto } from '@/dto/account.dto';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async queryById(@Body() user?: LoginDto) {
    console.log(user);
    return 'xxxxxxxxxxxxx';
  }
}
