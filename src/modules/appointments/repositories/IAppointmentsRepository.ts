import ICreateAppotmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointments from '../infra/typeorm/entities/Appointments';

export default interface IAppointmentsRepository {
  create(data: ICreateAppotmentsDTO): Promise<Appointments>;
  findByDate(date: Date): Promise<Appointments | undefined>;
}

// Aplicando o princípio LSP - Liskov substitution Principle
