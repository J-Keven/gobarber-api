import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Appointments from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentsServece {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointments> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const thisDateExist = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (thisDateExist) {
      throw new AppError('This appointment is already booked');
    }

    const newAppointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(newAppointment);

    return newAppointment;
  }
}

export default CreateAppointmentsServece;
