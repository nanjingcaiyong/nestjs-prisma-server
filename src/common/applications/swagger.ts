import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * @description 初始化swaggerui
 */
export function initSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('埋点服务服务')
    .setDescription('埋点服务api文档')
    .setVersion('0.0.1')
    .addTag('Story')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
