import { Controller, Get } from '@nestjs/common';
import { BaseController } from './base.controller';
import { MenuService } from '@/service';
import { ResultStatus } from '@/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('菜单模块')
@Controller('menu')
export class MenuController extends BaseController {
  constructor(private readonly menuService: MenuService) {
    super();
  }

  @Get('/queryList')
  async queryList() {
    const menus = await this.menuService.prisma.menu.findMany();
    const tree = menus.reduce((tree, menu) => {
      if (menu.pid === 0) {
        tree[menu.id] = menu;
      } else {
        tree[menu.pid].children = tree[menu.pid].children || [];
        tree[menu.pid].children.push(menu);
      }
      return tree;
    }, {});

    if (menus.length) {
      return this.JsonBackResult(ResultStatus.Success, Object.values(tree));
    }
    return this.JsonBackResult(ResultStatus.Empty);
  }
}
