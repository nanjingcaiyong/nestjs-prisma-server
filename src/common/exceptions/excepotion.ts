import { HttpStatus } from '@nestjs/common';
import { ResultStatus } from '../status';

/**
 * 例如：
 * throw new Exception(
 *   ResultStatus.Fail,
 *   ResultMessage[ResultStatus.Fail],
 *   HttpStatus.OK
 * );
 */

// 自定义异常类
export class Exception extends Error {
  constructor(
    public code: ResultStatus,
    public message: string,
    public status?: HttpStatus,
  ) {
    super(message);
  }
}
