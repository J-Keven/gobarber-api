import { Router } from 'express';
import usersRoutes from '@modules/users/infra/http/routes/users.Routes';
import appoitmentsRoute from '@modules/appointments/infra/http/routes/appointments.Routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.Routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appoitmentsRoute);
routes.use('/users', usersRoutes);
routes.use('/login', sessionRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);

export default routes;
