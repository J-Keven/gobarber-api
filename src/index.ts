import express from 'express';

import logs from './middlewares/logsModdleware';
import appoitmentsRoute from './routes/appointmentsRoutes';

import './database/index';

const app = express();
app.use(express.json());
app.use(logs);

app.use('/appointments', appoitmentsRoute);

export default app;
