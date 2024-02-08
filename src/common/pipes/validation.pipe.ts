import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  // BadRequestException,
} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Exception, ResultStatus } from '@/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  printErrors(errors: ValidationError[]) {
    // TODO: 后期接入日志系统
    errors.forEach((err) => {
      Object.entries(err.constraints).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    });
  }

  /**
   * @description 参数校验
   * @param value Controller里方法体上声明的路由地址
   * @param meta
   * @returns
   */
  async transform(value: any, meta: ArgumentMetadata) {
    if (!meta.metatype || !this.toValidate(meta.metatype)) {
      return value;
    }
    const object = plainToInstance(meta.metatype, value);
    const errors = await validate(object);
    this.printErrors(errors);
    if (errors.length > 0) {
      throw new Exception(ResultStatus.Fail, 'Parameter validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
