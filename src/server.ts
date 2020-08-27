import express from 'express';
import 'reflect-metadata';

import './database';
import logs from './middlewares/logsModdleware';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(logs);
app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`server Started in http://localhost:${PORT}`);
});
