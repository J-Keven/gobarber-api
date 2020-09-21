import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentsServece from '@modules/appointments/services/CreateAppointmentsServece';
import ensureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoute = Router();
appointmentsRoute.use(ensureAtheticated);

appointmentsRoute.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  res.json(appointments);
});

appointmentsRoute.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);
  const createAppointmentsServece = new CreateAppointmentsServece();

  const appointments = await createAppointmentsServece.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointments);
});

export default appointmentsRoute;
