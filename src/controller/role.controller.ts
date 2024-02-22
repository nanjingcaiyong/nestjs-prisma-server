import { RoleService } from '@/service';
import { BaseController } from './base.controller';
import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ResultStatus } from '@/common';
import { RoleDto } from '@/dto';

@Controller('role')
export class RoleController extends BaseController {
  constructor(private readonly roleService: RoleService) {
    super();
  }

  @Get(':id')
  async queryById(@Param('id', ParseIntPipe) id: number) {
    const role = await this.roleService.queryById(id);
    if (role) {
      return this.JsonBackResult(ResultStatus.Success, role);
    }
    return this.JsonBackResult(ResultStatus.Empty);
  }

  async create(@Body() role: RoleDto) {
    const res = await this.roleService.create(role);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success, res);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }
}
