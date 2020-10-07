import { injectable, inject } from 'tsyringe';
import { getDaysInMonth } from 'date-fns';
import IAppontmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  avilability: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
  private appointmentsRepository: IAppontmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppontmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    return availability;
  }
}

export default ListProviderDayAvailability;
