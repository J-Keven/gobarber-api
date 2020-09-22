import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentsServece {
  private appointmentsRepository: IAppointmentRepository;

  constructor(
    @inject('AppointmentRepository')
    appointmentsRepository: IAppointmentRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointments> {
    const appointmentDate = startOfHour(date);

    const thisDateExist = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (thisDateExist) {
      throw new AppError('This appointment is already booked');
    }

    const newAppointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointmentsServece;
