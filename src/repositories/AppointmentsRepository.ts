import { isEqual } from 'date-fns';

import Appointments from '../models/Appointments';

interface AppointmentsDTO {
  provider: string;
  date: Date;
}
class AppoitmentsRepository {
  private appointments: Appointments[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointments[] {
    return this.appointments;
  }

  public findByDate(date: Date): boolean {
    const findAppointmentsInSameDate = !!this.appointments.find(
      appointment => isEqual(appointment.date, date),
    );

    return findAppointmentsInSameDate;
  }

  public create({ provider, date }: AppointmentsDTO): Appointments {
    const newAppointment = new Appointments({ provider, date });
    this.appointments.push(newAppointment);

    return newAppointment;
  }
}

export default AppoitmentsRepository;
