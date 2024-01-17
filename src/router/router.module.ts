import { Module } from '@nestjs/common';
import { AppController, StoryController } from '@/controller';
import { AppService, StoryService } from '@/service';

@Module({
  controllers: [AppController, StoryController],
  providers: [AppService, StoryService],
})
export class RouterModule {}
