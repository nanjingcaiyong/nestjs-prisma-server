import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BaseController } from '@/controller/base.controller';
import { ResultStatus } from '@/common/status';
import { StoryService } from '@/service/story.service';
import { StoryModel } from '@/model/story.entity';

@Controller('story')
export class StoryController extends BaseController {
  constructor(private readonly storyService: StoryService) {
    super();
  }

  @Get('/')
  async list() {
    // const list = await this.storyService.findOne({})
    // return this.JsonBackResult(ResultStatus.Success, list);
  }

  @Get('count')
  async count() {
    // const count = await this.storyService.queryCount();
    // return this.JsonBackResult(ResultStatus.Success, { count });
  }

  @Get('/:id')
  async queryById(@Param('id', ParseIntPipe) id: number) {
    const res = await this.storyService.findOne({ id });
    return this.JsonBackResult(ResultStatus.Success, res);
  }
  @Post('create')
  async create(@Body() params: StoryModel) {
    await this.storyService.createOne(params);
    return this.JsonBackResult(ResultStatus.Success);
  }
}
