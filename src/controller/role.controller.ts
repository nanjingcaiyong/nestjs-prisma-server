import { AuthService, RoleService } from '@/service';
import { BaseController } from './base.controller';
import { isNil } from 'lodash';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ResultStatus } from '@/common';
import { RoleDto, DeleteRoleDto } from '@/dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('authorization')
@ApiTags('角色模块')
@Controller('role')
export class RoleController extends BaseController {
  constructor(
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  //#region 增
  /**
   * @description 创建角色
   * @param role
   * @returns
   */
  @ApiOperation({
    summary: '创建角色',
  })
  @Post('create')
  async create(@Body() role: RoleDto) {
    const [roleModel, authModels] = await Promise.all([
      this.roleService.query({
        where: {
          roleName: role.roleName,
        },
      }),
      this.authService.queryMulti({
        id: {
          in: role.authIds,
        },
      }),
    ]);

    // 角色已存在
    if (!isNil(roleModel)) {
      return this.JsonBackResult(ResultStatus.IsExist);
    }
    // 只要有一个权限不存在，返回错误
    if (authModels.length !== role.authIds.length) {
      return this.JsonBackResult(ResultStatus.ParamsError);
    }
    // 创建角色并关联权限
    const roleAuthModel = await this.roleService.createRole(role);

    if (roleAuthModel) {
      return this.JsonBackResult(ResultStatus.Success, roleAuthModel);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }

  //#endregion

  //#region 删
  /**
   * @description 删除角色
   * @param id 角色id
   * @returns
   */
  @ApiOperation({
    summary: '删除角色',
  })
  @Post('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const res = await this.roleService.deleteById(id);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }

  /**
   * @default 批量删除
   * @param params 角色id集合
   * @returns
   */
  @ApiOperation({
    summary: '批量删除',
  })
  @Post('delete')
  async deleteMutil(@Body() params: DeleteRoleDto) {
    const res = await this.roleService.deleteMutil(params.ids);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }
  //#endregion

  //#region 查
  @Get(':id')
  async queryById(@Param('id', ParseIntPipe) id: number) {
    const role = await this.roleService.queryById(id);
    if (role) {
      return this.JsonBackResult(ResultStatus.Success, role);
    }
    return this.JsonBackResult(ResultStatus.Empty);
  }
  //#endregion
}
