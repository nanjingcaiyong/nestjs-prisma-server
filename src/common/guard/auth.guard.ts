import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * @description 授权保护（对调用者(token)进行身份验证，具有足够权限，特定路由才能访问）
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.Authorization) {
      // TODO: 后期加session权限验证
    }
    return true;
  }
}
