import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import './database';

import AppError from './errors/AppError';
import logs from './middlewares/logsMiddleware';
import routes from './routes';
import uploadConfig from './config/upload';

const app = express();
app.use(cors());
app.use(express.json());
app.use(logs);
app.use('/file', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'Error',
    message: 'Intarnal server error',
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`server Started in http://localhost:${PORT}`);
});
