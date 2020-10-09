import { injectable, inject } from 'tsyringe';
import Appointments from '../infra/typeorm/entities/Appointments';
import IAppotintmentsRepository from '../repositories/IAppointmentsRepository';

interface IResquestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}
@injectable()
class ListAllApointmentsInDayFromProviderService {
  private appointmentsRepository: IAppotintmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppotintmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IResquestDTO): Promise<Appointments[]> {
    const appoointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );
    return appoointments;
  }
}

export default ListAllApointmentsInDayFromProviderService;
