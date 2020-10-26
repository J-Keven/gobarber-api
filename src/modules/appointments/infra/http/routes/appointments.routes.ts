import { Router } from 'express';
import ensureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ListaAppointmentsProviderController from '../controllers/ProviderAppointmentsController';

const appointmentsRoute = Router();
appointmentsRoute.use(ensureAtheticated);

const appointmentsController = new AppointmentsController();
const listaAppointmentsProviderController = new ListaAppointmentsProviderController();

appointmentsRoute.post('/', appointmentsController.create);
appointmentsRoute.get('/me', listaAppointmentsProviderController.index);

export default appointmentsRoute;
