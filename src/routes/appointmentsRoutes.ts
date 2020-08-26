import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsServece from '../services/CreateAppointmentsServece';

const appointmentsRoute = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRoute.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  res.json(appointments);
});

appointmentsRoute.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = parseISO(date);
  try {
    const createAppointmentsServece = new CreateAppointmentsServece(
      appointmentsRepository,
    );
    const appointments = createAppointmentsServece.execute({
      provider,
      date: parsedDate,
    });
    return res.json(appointments);
  } catch (err) {
    return res.status(400).json({ error: err.mesage });
  }
});

export default appointmentsRoute;
