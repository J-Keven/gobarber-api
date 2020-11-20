import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRoute = Router();
appointmentsRoute.use(ensureAtheticated);

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRoute.get('/me', providerAppointmentsController.index);

export default appointmentsRoute;
