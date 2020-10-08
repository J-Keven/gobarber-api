import { Repository, getRepository, Raw } from 'typeorm';
import IAppointmentsReporitory from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
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

  public async findAllInMonthFromProvider({
    month,
    year,
    provider_id,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointments[]> {
    const parserMonth = month.toString().padEnd(2, '0');

    const availebleDaysOfProvider = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFildName =>
            `to_char(${dateFildName}, 'MM-YYYY') = '${parserMonth}-${year}'`,
        ),
      },
    });

    return availebleDaysOfProvider;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointments[]> {
    const parserMonth = month.toString().padStart(2, '0');
    const parserDay = day.toString().padStart(2, '0');

    const availebleHoursOfProvider = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFildName =>
            `to_char(${dateFildName}, 'DD-MM-YYYY') = '${parserDay}-${parserMonth}-${year}'`,
        ),
      },
    });
    return availebleHoursOfProvider;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointments> {
    const appotiments = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appotiments);

    return appotiments;
  }
}

export default AppoitmentsRepository;
