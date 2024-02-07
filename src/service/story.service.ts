import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { StoryModel } from '@/model';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoryService extends BaseService<StoryModel> {
  constructor() {
    super(Prisma.ModelName.Story);
  }

  queryList() {
    return this.entity.findMany();
  }
}
