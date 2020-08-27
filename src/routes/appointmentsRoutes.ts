import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsServece from '../services/CreateAppointmentsServece';

const appointmentsRoute = Router();

appointmentsRoute.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  res.json(appointments);
});

appointmentsRoute.post('/', async (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = parseISO(date);

  try {
    const createAppointmentsServece = new CreateAppointmentsServece();

    const appointments = await createAppointmentsServece.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointments);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRoute;
