import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis.Redis;
  constructor() {
    this.redisClient = new Redis.Redis({
      port: 6379,
      host: '127.0.0.1',
    });
  }

  /**
   * @description
   * @param key
   * @param value
   */
  async set(key: Redis.RedisKey, value: string | number | Buffer) {
    await this.redisClient.set(key, value);
  }

  /**
   * @description
   * @param key
   * @returns
   */
  async get(key: Redis.RedisKey) {
    return this.redisClient.get(key);
  }

  /**
   * @description
   * @param key
   * @returns
   */
  async del(key: Redis.RedisKey) {
    return this.redisClient.del(key);
  }
}
