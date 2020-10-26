import { MongoRepository, getMongoRepository } from 'typeorm';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import Notifications from '../schemas/Notifications';

class NotificarionsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notifications>;

  constructor() {
    this.ormRepository = getMongoRepository(Notifications, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationsDTO): Promise<Notifications> {
    const notifications = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notifications);
    return notifications;
  }
}

export default NotificarionsRepository;
