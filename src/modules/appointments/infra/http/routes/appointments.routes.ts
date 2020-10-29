import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ListaAppointmentsProviderController from '../controllers/ProviderAppointmentsController';

const appointmentsRoute = Router();
appointmentsRoute.use(ensureAtheticated);

const appointmentsController = new AppointmentsController();
const listaAppointmentsProviderController = new ListaAppointmentsProviderController();

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
appointmentsRoute.get('/me', listaAppointmentsProviderController.index);

export default appointmentsRoute;
