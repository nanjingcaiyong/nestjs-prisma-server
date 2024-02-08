import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@/common';

/**
 * @description 初始化swaggerui
 */
function initSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('埋点服务服务')
    .setDescription('埋点服务api文档')
    .setVersion('0.0.1')
    .addTag('Story')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  if (process.env.NODE_ENV !== 'production') {
    initSwagger(app);
  }
  await app.listen(process.env.PORT);
}

bootstrap();
