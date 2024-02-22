import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, initSwagger } from '@/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      path: '/auth',
      secret: 'cupshe-secret',
      cookie: { maxAge: 1000, httpOnly: true }, // 以cookie存到客户端
      resave: false, // true: 每次访问都会更新session, false: 只有内容变化才会更新session
      saveUninitialized: false, // true: 不管是否设置 session，都会初始化一个空的 session 对象
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());
  app.use(passport.session());
  if (process.env.NODE_ENV !== 'production') {
    initSwagger(app);
  }
  await app.listen(process.env.PORT);
}

bootstrap();
