import { Router } from 'express';
import appoitmentsRoute from './appointments.Routes';
import usersRoutes from './users.Routes';

const routes = Router();

routes.use('/appointments', appoitmentsRoute);
routes.use('/users', usersRoutes);

export default routes;
