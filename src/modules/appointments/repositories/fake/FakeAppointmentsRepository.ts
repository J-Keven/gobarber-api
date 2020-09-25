import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsReporitory from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';

class AppoitmentsRepository implements IAppointmentsReporitory {
  private appointmens: Appointments[] = [];

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointments = this.appointmens.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointments> {
    const appotiments = new Appointments();

    Object.assign(appotiments, { id: uuid(), provider_id, date });

    this.appointmens.push(appotiments);
    return appotiments;
  }
}

export default AppoitmentsRepository;
