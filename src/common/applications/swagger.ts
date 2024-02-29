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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // JWT（JSON Web Token）
        name: 'JWT',
        description: 'enter token',
        in: 'header',
      },
      'authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    ) // 如果您使用了身份验证，可以添加身份验证头
    .addTag('Story')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.security = [{ bearerAuth: [] }];
  SwaggerModule.setup('swagger', app, document);
}
