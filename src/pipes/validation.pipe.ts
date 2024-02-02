import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  // BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Exception } from '@/common/exceptions/excepotion';
import { ResultStatus } from '@/common/status';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, meta: ArgumentMetadata) {
    if (!meta.metatype || !this.toValidate(meta.metatype)) {
      return value;
    }
    const object = plainToInstance(meta.metatype, value);
    const errors = await validate(object);
    errors.forEach((err) => {
      Object.entries(err.constraints).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    });
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
