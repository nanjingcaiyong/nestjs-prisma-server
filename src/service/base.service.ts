import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
@Injectable()
export class BaseService<T extends Prisma.StoryCreateInput>
  extends PrismaClient
  implements OnModuleInit
{
  entity: Prisma.StoryDelegate<DefaultArgs>;
  constructor(private name: Prisma.ModelName) {
    super({
      datasourceUrl: process.env.DATABASE_URL,
      log: ['query', 'info', 'warn', 'error'],
    });
    this.entity = this[name] as Prisma.StoryDelegate<DefaultArgs>;
  }
  async onModuleInit() {
    await this.$connect();
  }

  //#region 增
  /**
   * @description 创建单个实体
   * @param model 实体模型
   * @returns
   */
  createOne(model: T) {
    return this.entity.create({
      data: model,
    });
  }

  /**
   * @description 创建多个实体
   * @param models 实体模型数组
   * @returns
   */
  createMany(models: T[]) {
    return this.entity.createMany({
      data: models,
    });
  }
  //#endregion

  //#region 删
  //#endregion

  //#region 改
  //#endregion

  //#region 查询
  /**
   * @description 单条查询
   * @param where
   * @returns
   */
  findOne(where: Prisma.StoryWhereUniqueInput) {
    return this.entity.findUnique({
      where,
    });
  }

  queryList() {
    return this.entity.findMany();
  }

  //#endregion
}
