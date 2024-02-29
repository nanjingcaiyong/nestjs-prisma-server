import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Prisma, Role } from '@prisma/client';
import { RoleDto } from '@/dto';

@Injectable()
export class RoleService extends BaseService {
  constructor() {
    super(Prisma.ModelName.Role);
  }

  /**
   * @description 创建角色
   * @param role
   * @returns
   */
  async createRole(role: RoleDto) {
    // 创建角色
    const roleModel = await this.create<Role>({
      roleName: role.roleName,
      creator: role.creator,
    });
    // 关联权限
    const roleAuthModel = await this.update({
      where: {
        id: roleModel.id,
      },
      data: {
        auths: {
          connect: role.authIds.map((id) => ({ id })),
        },
      },
    });
    return roleAuthModel;
  }
}
