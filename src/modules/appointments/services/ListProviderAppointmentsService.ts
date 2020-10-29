import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICacheProvider from '@shared/container/providers/CacheProvider/model/ICacheProvoder';

interface IRequestDTO {
  day: number;
  month: number;
  year: number;
  provider_id: string;
}

@injectable()
class ListaProvidersAppointmentsService {
  private appointmentsRepository: IAppointmentsRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.cacheProvider = cacheProvider;
  }

  public async execute({
    day,
    month,
    year,
    provider_id,
  }: IRequestDTO): Promise<Appointments[]> {
    const appointment = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        year,
        provider_id,
      },
    );
    return appointment;
  }
}

export default ListaProvidersAppointmentsService;
