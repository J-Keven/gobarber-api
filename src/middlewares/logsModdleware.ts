/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';

export default function logsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.time();

  console.log(`[method]: ${req.method} [URL]: ${req.url}`);

  next();

  console.timeEnd();
}
