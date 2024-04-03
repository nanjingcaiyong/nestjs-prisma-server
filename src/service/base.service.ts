import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class BaseService {
  public prisma: PrismaClient;

  constructor(private modelName: Prisma.ModelName) {
    this.prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
      log: ['query', 'info', 'warn', 'error'],
    });
    this.prisma.$connect();
  }

  /**
   * @description 根据id查询单条数据
   * @param where lambda
   * @returns
   */
  queryById<T>(id: number): Promise<T> {
    return this.prisma[this.modelName].findUnique({
      where: {
        id,
        status: 1,
      },
    });
  }

  /**
   * @description 条件查询
   * @param where lambda
   * @returns
   */
  query<T>(where: any, include?: any): Promise<T> {
    return this.prisma[this.modelName].findFirst({
      where: where.where,
      include,
    });
  }

  /**
   * @description 查询多条数据
   * @param params lambda
   * @returns
   */
  queryMulti<T>(where?: any): Promise<T[]> {
    return this.prisma[this.modelName].findMany({
      where,
    });
  }

  /**
   * @description 创建单条数据
   * @param data 数据模型
   * @returns
   */
  create<T>(data: any): Promise<T> {
    return this.prisma[this.modelName].create({ data });
  }

  update(data: any) {
    return this.prisma[this.modelName].update(data);
  }

  /**
   * @description 根据id删除
   * @param id 主键
   * @returns
   */
  deleteById(id: number) {
    return this.prisma[this.modelName].delete({
      where: {
        id,
      },
    });
  }

  /**
   * @description 批量删除
   * @param ids 主键集合
   */
  deleteMutil(ids: number[]) {
    return this.prisma.role.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
