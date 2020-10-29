import { container } from 'tsyringe';
import RedisCacheProvider from './implementations/RedisCacheProvider';

const provider = {
  redis: RedisCacheProvider,
};

container.registerSingleton('CacheProvider', provider.redis);
