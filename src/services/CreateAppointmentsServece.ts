import { startOfHour } from 'date-fns';

import Appointments from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentsServece {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointments {
    const appointemntDate = startOfHour(date);

    const thisDateExist = this.appointmentsRepository.findByDate(
      appointemntDate,
    );

    if (thisDateExist) {
      throw Error('This appointment is already booked');
    }

    const newAppointment = this.appointmentsRepository.create({
      provider,
      date: appointemntDate,
    });
    return newAppointment;
  }
}

export default CreateAppointmentsServece;
