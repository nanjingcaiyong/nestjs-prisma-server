import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';

@Injectable()
export class AppService extends BaseService {
  getHello() {
    return 'Hello World!';
  }
}
