import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasourceUrl: process.env.DATABASE_URL,
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
