import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware, HttpExceptionFilter, RouterModule } from '@/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/modules/auth/guards/role.guard';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [RouterModule, AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
