import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuService extends BaseService {
  constructor() {
    super(Prisma.ModelName.Menu);
  }
}
