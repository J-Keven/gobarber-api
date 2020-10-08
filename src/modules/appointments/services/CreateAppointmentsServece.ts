import { startOfHour, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppontmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentsServece {
  private appointmentsRepository: IAppontmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppontmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointments> {
    const appointmentDate = startOfHour(date);

    const thisDateExist = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

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

    return newAppointment;
  }
}

export default CreateAppointmentsServece;
