import {
  Controller,
  // Get,
  // Body,
  // Post,
  // Param,
  // ParseIntPipe,
} from '@nestjs/common';
import { BaseController } from '@/controller/base.controller';
// import { ResultStatus, Roles } from '@/common';
import { StoryService } from '@/service/story.service';
// import { StoryDto } from '@/dto';

@Controller('story')
export class StoryController extends BaseController {
  constructor(private readonly storyService: StoryService) {
    super();
  }

  // @Get('/')
  // async list() {
  //   const list = await this.storyService.queryList();
  //   return this.JsonBackResult(ResultStatus.Success, list);
  // }

  // @Get('count')
  // async count() {
  //   // const count = await this.storyService.queryCount();
  //   // return this.JsonBackResult(ResultStatus.Success, { count });
  // }

  // @Roles('admin')
  // @Get('/:id')
  // async queryById(@Param('id', ParseIntPipe) id: number) {
  //   const res = await this.storyService.account.findUnique({
  //     select: { id },
  //   });
  //   return this.JsonBackResult(ResultStatus.Success, res);
  // }

  // @Post('create')
  // async create(@Body() params: StoryDto) {
  //   await this.storyService.createOne(params);
  //   return this.JsonBackResult(ResultStatus.Success);
  // }
}
