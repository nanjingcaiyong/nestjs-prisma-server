import { Injectable } from '@nestjs/common';
import { BaseService } from '@/service/base.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService extends BaseService {
  constructor() {
    super(Prisma.ModelName.Auth);
  }
}
