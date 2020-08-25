import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRoute = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRoute.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  res.json(appointments);
});

appointmentsRoute.post('/', (req, res) => {
  const { name, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const theDatesAreTheSame = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (theDatesAreTheSame) {
    return res
      .status(400)
      .json({ err: 'This appointment is already booked' });
  }

  const newAppointment = appointmentsRepository.create(
    name,
    parsedDate,
  );

  return res.json(newAppointment);
});

export default appointmentsRoute;
