import { Module } from '@nestjs/common';
import { AppController } from '@/controller/app.controller';
import { StoryController } from '@/controller/story.controller';
import { AppService } from '@/service/app.service';

@Module({
  controllers: [AppController, StoryController],
  providers: [AppService],
})
export class RouterModule {}
