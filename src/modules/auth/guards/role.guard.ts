import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHORIZATION_AUTH_KEY, Role } from '@/common';
import { AUTHORIZATION_ROLE_KEY } from '@/common';
import { isEmpty, isNil } from 'lodash';
import { RedisService } from '@/common';
import { ONE_DAY } from '@/common';
import { Auth } from '@/common/enums/auth.enum';
type RedisAccount = {
  name: string;
  expired: number;
  roles: Role[];
  auths: Auth[];
};

@Injectable()
export class RolesGuard implements CanActivate {
  account: RedisAccount;
  requiredRoles: Role[];
  requiredAuths: Auth[];
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
  ) {
    this.account = null;
    this.requiredRoles = [];
    this.requiredAuths = [];
  }

  /**
   * @description 刷新redis
   * @param key
   * @param value 账户信息
   * @returns
   */
  refreshRedis(key: string, value: RedisAccount) {
    const now = Date.now();
    // TODO: 存在账户数据更新和redis中不匹配的问题，例如角色或权限变更
    return this.redisService.set(
      key,
      JSON.stringify(
        Object.assign(value, {
          expired: now + ONE_DAY,
        }),
      ),
    );
  }

  /**
   * @description 从redis中查询账号
   * @param token 用户token
   * @returns
   */
  async queryAccountFromRedis(token) {
    const JSON_Account = await this.redisService.get(token);
    return JSON_Account ? JSON.parse(JSON_Account) : null;
  }

  /**
   * @description 获取接口所需的角色
   * @param key
   * @param context
   * @returns
   */
  getRequiredRoles<T>(key, context: ExecutionContext): T[] {
    return (
      this.reflector.getAllAndOverride<T[]>(key, [
        context.getHandler(),
        context.getClass(),
      ]) || []
    );
  }

  /**
   * @description 接口角色校验
   * @param context
   * @returns
   */
  validateRole() {
    // 检测接口是否配置角色，如果没配直接放
    if (isNil(this.requiredRoles)) {
      return true;
    }
    return this.requiredRoles.some((role) => this.account.roles.includes(role));
  }

  /**
   * @description 接口权限校验
   * @param context
   * @returns
   */
  validateAuth() {
    // 检测接口是否配置角色，如果没配直接放
    if (isNil(this.requiredAuths)) {
      return true;
    }
    // 权限验证
    return (
      this.account.auths.includes(Auth.all) || // 如果用户具有所有权限，则通过
      this.requiredAuths.some((auth) => this.account.auths.includes(auth))
    ); // 如果用户具有接口配置的权限，则通过
  }

  async canActivate(context: ExecutionContext) {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.substring(7) as string;
    this.requiredRoles = this.getRequiredRoles<Role>(
      AUTHORIZATION_ROLE_KEY,
      context,
    );
    this.requiredAuths = this.getRequiredRoles<Auth>(
      AUTHORIZATION_AUTH_KEY,
      context,
    );

    // 如果没有配置角色和权限，则直接通过
    if (this.requiredRoles.length === 0 && this.requiredAuths.length === 0) {
      return true;
    }

    // 如果配了角色或权限，但没有token，则拒绝
    if (isEmpty(token)) {
      return false;
    }

    this.account = await this.queryAccountFromRedis(token);

    // 如果redis中没有查询到账号，则拒绝
    if (isNil(this.account)) {
      // TODO: 后期返回自定义状态码
      return false;
    }

    // 如果token过期，直接拒绝
    if (this.account.expired < now) {
      this.redisService.del(token);
      return false;
    }

    // 如果接口配置角色，但用户没有该角色，则拒绝
    if (
      this.requiredRoles.length &&
      !this.requiredRoles.some((role) => this.account.roles.includes(role))
    ) {
      return false;
    }

    // 如果接口配置权限，但用户没有该权限，则拒绝
    if (
      this.requiredAuths.length &&
      !this.requiredAuths.some((auth) => this.account.auths.includes(auth))
    ) {
      return false;
    }

    const Role_Validate_Result = this.validateRole();
    const Auth_Validate_Result = this.validateAuth();

    if (Role_Validate_Result && Auth_Validate_Result) {
      this.refreshRedis(token, this.account);
      return true;
    }
    return false;
  }
}
