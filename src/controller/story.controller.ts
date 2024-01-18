import { Controller, Get } from '@nestjs/common';
import { BaseController } from '@/controller/base.controller';
import { ResultStatus } from '@/common/status';
import { StoryService } from '@/service/story.service';

@Controller('story')
export class StoryController extends BaseController {
  constructor(private readonly story: StoryService) {
    super();
  }

  @Get('count')
  async count() {
    const count = await this.story.queryCount();
    return this.JsonBackResult(ResultStatus.Success, { count });
  }
}
