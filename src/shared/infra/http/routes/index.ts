import { Router } from 'express';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import appoitmentsRoute from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import providersRoutes from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/appointments', appoitmentsRoute);
routes.use('/users', usersRoutes);
routes.use('/login', sessionRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/providers', providersRoutes);

export default routes;
