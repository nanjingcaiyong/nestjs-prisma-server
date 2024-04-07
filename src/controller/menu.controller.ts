import { Body, Controller, Get, Post } from '@nestjs/common';
import { BaseController } from './base.controller';
import { MenuService } from '@/service';
import { ResultStatus } from '@/common';
import { ApiTags } from '@nestjs/swagger';
import { MenuDto } from '@/dto';

@ApiTags('菜单模块')
@Controller('menu')
export class MenuController extends BaseController {
  constructor(private readonly menuService: MenuService) {
    super();
  }

  /**
   * @description 查询菜单列表
   * @returns
   */
  @Get('/queryList')
  async queryList() {
    // 根据id降序
    const menus = await this.menuService.prisma.menu.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    if (menus.length === 0) return this.JsonBackResult(ResultStatus.Empty);
    const firstMenu = menus.filter((t) => t.type === 0 && t.pid === 0);
    const tree = firstMenu.reduce((tree, menu) => {
      const children = menus.filter((t) => t.pid === menu.id);
      const firstMenu = menu as any;
      if (children.length) {
        firstMenu.children = children;
      }
      tree.push(firstMenu);
      return tree;
    }, []);

    if (tree.length) {
      return this.JsonBackResult(ResultStatus.Success, Object.values(tree));
    }
  }

  /**
   * @description 创建菜单
   * @param menu 菜单数据
   * @returns
   */
  @Post('/create')
  async create(@Body() menu: MenuDto) {
    const res = await this.menuService.create(menu);
    return this.JsonBackResult(ResultStatus.Success, res);
  }

  @Post('/delete')
  async delete(@Body() params: any) {
    const res = await this.menuService.deleteById(params.id);
    if (res) {
      return this.JsonBackResult(ResultStatus.Success);
    }
    return this.JsonBackResult(ResultStatus.Fail);
  }
}
