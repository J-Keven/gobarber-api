import { Repository, getRepository } from 'typeorm';
import IAppointmentsReporitory from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointments from '../entities/Appointments';

class AppoitmentsRepository implements IAppointmentsReporitory {
  private ormRepository: Repository<Appointments>;

  constructor() {
    this.ormRepository = getRepository(Appointments);
  }

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointments = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointments> {
    const appotiments = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appotiments);

    return appotiments;
  }
}

export default AppoitmentsRepository;
