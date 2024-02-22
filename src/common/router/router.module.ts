import { Module } from '@nestjs/common';
import {
  StoryController,
  AccountController,
  UserController,
  RoleController,
} from '@/controller';
import {
  StoryService,
  AccountService,
  UserService,
  RoleService,
} from '@/service';

@Module({
  controllers: [
    StoryController,
    AccountController,
    UserController,
    RoleController,
  ],
  providers: [StoryService, AccountService, UserService, RoleService], // providers 数组列出的服务将在该Module的上下文中创建和管理
})
export class RouterModule {}
