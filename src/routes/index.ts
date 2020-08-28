import { Router } from 'express';
import appoitmentsRoute from './appointments.Routes';
import usersRoutes from './users.Routes';
import sessionRoutes from './session.Routes';

const routes = Router();

routes.use('/appointments', appoitmentsRoute);
routes.use('/users', usersRoutes);
routes.use('/login', sessionRoutes);

export default routes;
