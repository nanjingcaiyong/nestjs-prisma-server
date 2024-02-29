import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, initSwagger } from '@/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  if (process.env.NODE_ENV !== 'production') {
    initSwagger(app);
  }
  await app.listen(process.env.PORT);
}

bootstrap();
