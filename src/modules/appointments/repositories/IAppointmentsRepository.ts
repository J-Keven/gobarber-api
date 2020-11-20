import ICreateAppotmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointments from '../infra/typeorm/entities/Appointments';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IFindByDateDTO from '../dtos/IFindByDateDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppotmentsDTO): Promise<Appointments>;
  findByDate(data: IFindByDateDTO): Promise<Appointments | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointments[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointments[]>;
}

// Aplicando o princípio LSP - Liskov substitution Principle
