import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from '@/auth/auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
