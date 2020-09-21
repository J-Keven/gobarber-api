import { EntityRepository, Repository } from 'typeorm';
import Appointments from '../infra/typeorm/entities/Appointments';

@EntityRepository(Appointments)
class AppoitmentsRepository extends Repository<Appointments> {
  public async findByDate(date: Date): Promise<Appointments | null> {
    const findAppointments = await this.findOne({
      where: { date },
    });

    return findAppointments || null;
  }
}

export default AppoitmentsRepository;
