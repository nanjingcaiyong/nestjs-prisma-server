import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';

@Injectable()
export class StoryService extends BaseService {
  constructor() {
    super();
  }
  queryCount() {
    return this.story.count();
  }
}
