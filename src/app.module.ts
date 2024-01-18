import { Module } from '@nestjs/common';
import { RouterModule } from '@/router/router.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exceptions/http.exception';

@Module({
  imports: [RouterModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
