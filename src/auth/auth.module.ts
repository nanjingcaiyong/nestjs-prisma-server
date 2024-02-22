import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AccountService } from '@/service';

@Global()
@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AccountService, AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
