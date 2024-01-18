import {
  HttpException,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Exception } from './excepotion';

// @Catch(HttpException) // 只捕获Http异常
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    // const exceptionResponse = exception.getResponse?.();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let code = '00000';
    Logger.error(exception.message, exception.stack);
    // Http异常处理逻辑
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      code = exception.name;
    } // 自定义异常处理逻辑
    else if (exception instanceof Exception) {
      status = exception.status || HttpStatus.OK;
      message = exception.message || message;
      code = exception.code;
    }

    response.status(status).json({
      code,
      timestamp: Date.now(),
      data: null,
      message,
    });
  }
}
