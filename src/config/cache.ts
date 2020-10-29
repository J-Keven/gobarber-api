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
      host: 'localhost',
      port: 6379,
      password: undefined,
    },
  },
} as ICache;
