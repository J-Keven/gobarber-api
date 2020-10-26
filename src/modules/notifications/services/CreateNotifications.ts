import { inject, injectable } from 'tsyringe';
import INotificarionsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notifications from '@modules/notifications/infra/typeorm/schemas/Notifications';

interface IRequestDTO {
  recipient_id: string;
  content: string;
}

@injectable()
class CreateNotifications {
  private notificationsRepository: INotificarionsRepository;

  constructor(
    @inject('NotificationsRepository')
    notificationsRepository: INotificarionsRepository,
  ) {
    this.notificationsRepository = notificationsRepository;
  }

  public async execute({
    content,
    recipient_id,
  }: IRequestDTO): Promise<Notifications> {
    const notification = await this.notificationsRepository.create({
      content,
      recipient_id,
    });
    return notification;
  }
}

export default CreateNotifications;
