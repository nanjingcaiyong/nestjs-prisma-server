import { Controller, Get } from '@nestjs/common';
import { BaseController } from '@/controller/base.controller';
import { ResultStatus } from '@/common/status/result.status';

@Controller('story')
export class StoryController extends BaseController {
  @Get('all')
  findAll() {
    return this.JsonBackResult(ResultStatus.Success, { name: 'sa' });
  }
}
