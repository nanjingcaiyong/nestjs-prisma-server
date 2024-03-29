import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoryService extends BaseService {
  constructor() {
    super(Prisma.ModelName.Story);
  }
}
