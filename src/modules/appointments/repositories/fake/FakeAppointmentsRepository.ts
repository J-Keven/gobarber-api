import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsReporitory from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindByDateDTO from '@modules/appointments/dtos/IFindByDateDTO';

class AppoitmentsRepository implements IAppointmentsReporitory {
  private appointmens: Appointments[] = [];

  public async findByDate({
    date,
    provider_id,
  }: IFindByDateDTO): Promise<Appointments | undefined> {
    const findAppointments = this.appointmens.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointments;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointments[]> {
    const availebleDaysOfProvider = this.appointmens.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        appointment.date.getMonth() + 1 === month &&
        appointment.date.getFullYear() === year
      );
    });
    return availebleDaysOfProvider;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointments[]> {
    const availebleDaysOfProvider = this.appointmens.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        appointment.date.getMonth() + 1 === month &&
        appointment.date.getFullYear() === year &&
        appointment.date.getDate() === day
      );
    });

    return availebleDaysOfProvider;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointments> {
    const appotiments = new Appointments();

    Object.assign(appotiments, { id: uuid(), provider_id, user_id, date });

    this.appointmens.push(appotiments);
    return appotiments;
  }
}

export default AppoitmentsRepository;
