import { Router } from 'express';
import ensureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRoute = Router();
appointmentsRoute.use(ensureAtheticated);

const appointmentsController = new AppointmentsController();
// appointmentsRoute.get('/', async (req, res) => {
//   // const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   const appointments = await appointmentsRepository.find();

//   res.json(appointments);
// });

appointmentsRoute.post('/', appointmentsController.create);

export default appointmentsRoute;
