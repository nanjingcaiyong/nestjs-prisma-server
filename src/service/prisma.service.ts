import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

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
  async queryById<T>(where: any): Promise<T> {
    return this.prisma[this.modelName].findFirst({ where });
  }

  /**
   * @description 查询多条数据
   * @param params lambda
   * @returns
   */
  async queryMulti<T>(params?: any): Promise<T[]> {
    return this.prisma[this.modelName].findMany(params);
  }

  /**
   * @description 创建单条数据
   * @param data 数据模型
   * @returns
   */
  async create<T>(data: any): Promise<T> {
    return this.prisma[this.modelName].create({ data });
  }
}
