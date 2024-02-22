import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import {
  LoggerMiddleware,
  AuthGuard,
  HttpExceptionFilter,
  RouterModule,
} from '@/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [RouterModule, AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
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
