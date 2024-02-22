import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    session({
      secret: 'your-secret-key', // 替换为你的密钥
      resave: false,
      saveUninitialized: false,
    })(req, res, next);
  }
}
