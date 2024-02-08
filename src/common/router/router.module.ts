import { Module } from '@nestjs/common';
import { StoryController } from '@/controller';
import { StoryService } from '@/service';

@Module({
  controllers: [StoryController],
  providers: [StoryService], // providers 数组列出的服务将在该Module的上下文中创建和管理
})
export class RouterModule {}
