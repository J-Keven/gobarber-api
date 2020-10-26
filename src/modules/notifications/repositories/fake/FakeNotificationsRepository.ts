import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import Notifications from '@modules/notifications/infra/typeorm/schemas/Notifications';
import { uuid } from 'uuidv4';

class NotificarionsRepository implements INotificationsRepository {
  private notifications: Notifications[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationsDTO): Promise<Notifications> {
    const notifications = new Notifications();

    Object.assign(notifications, {
      content,
      recipient_id,
      id: uuid(),
    });
    this.notifications.push(notifications);

    return notifications;
  }
}

export default NotificarionsRepository;
