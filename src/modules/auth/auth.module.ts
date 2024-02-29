import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountService } from '@/service';
import { RedisService } from '@/common';

// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { AUTH_JWT_SECRET } from '@/common';

@Global()
@Module({
  imports: [
    // PassportModule.register({ session: true }),
    // JwtModule.register({
    //   secret: AUTH_JWT_SECRET,
    //   signOptions: { expiresIn: '600s' }, // jwt 过期时间
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RedisService, AccountService],
  exports: [AuthService, RedisService],
})
export class AuthModule {}
