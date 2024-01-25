import { Module } from '@nestjs/common';
import { StoryController } from '@/controller';
import { StoryService } from '@/service';

@Module({
  controllers: [StoryController],
  providers: [StoryService],
})
export class RouterModule {}
