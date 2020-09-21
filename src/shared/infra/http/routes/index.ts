import { Router } from 'express';
import usersRoutes from '@modules/users/infra/http/routes/users.Routes';
import appoitmentsRoute from '@modules/appointments/infra/http/routes/appointments.Routes';
import sessionRoutes from './session.Routes';

const routes = Router();

routes.use('/appointments', appoitmentsRoute);
routes.use('/users', usersRoutes);
routes.use('/login', sessionRoutes);

export default routes;
