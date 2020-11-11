import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limit = new RateLimiterRedis({
  storeClient: redisClient,
  duration: 1,
  points: 5,
});

export default async function rateLimiterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limit.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too Many Requests', 429);
  }
}
