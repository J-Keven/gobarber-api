import { startOfHour, isBefore, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppontmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificarionsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/model/ICacheProvoder';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentsServece {
  private appointmentsRepository: IAppontmentsRepository;

  private notificationsRepository: INotificarionsRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppontmentsRepository,
    @inject('NotificationsRepository')
    notificationsRepository: INotificarionsRepository,
    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  }

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointments> {
    const appointmentDate = startOfHour(date);
    const thisDateExist = await this.appointmentsRepository.findByDate({
      date: appointmentDate,
      provider_id,
    });

    if (thisDateExist) {
      throw new AppError('This appointment is already booked');
    }

    const curentDate = Date.now();

    if (isBefore(date, curentDate)) {
      throw new AppError('you cannot create an appointment at a past date');
    }

    if (date.getHours() < 8 || date.getHours() > 17) {
      throw new AppError(
        'you can only create an appointment between 8am and 5pm',
      );
    }

    if (user_id === provider_id) {
      throw new AppError('you cannt create an appointment to yourself');
    }

    const newAppointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      content: `Um novo agendameto para o dia ${dateFormatted}`,
      recipient_id: provider_id,
    });

    await this.cacheProvider.invalidate(
      `appointments-list:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`,
    );

    return newAppointment;
  }
}

export default CreateAppointmentsServece;
