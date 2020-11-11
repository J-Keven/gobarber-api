import { RedisOptions } from 'ioredis';

interface ICache {
  driver: 'redis';
  configs: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  configs: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICache;
