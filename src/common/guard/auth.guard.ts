import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AUTHORIZATION_ROLE_KEY } from '../constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(
      AUTHORIZATION_ROLE_KEY,
      context.getHandler(),
    );
    // 如果接口设置了角色，通过请求头的token进行校验
    if (Array.isArray(roles) && roles.length) {
      const request = context.switchToHttp().getRequest();
      if (request.Authorization) {
        // TODO: 后期加session鉴权
      }
    }
    return true;
  }
}