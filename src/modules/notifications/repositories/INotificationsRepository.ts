import ICreateNotificationsDTO from '../dtos/ICreateNotificationsDTO';
import Notifications from '../infra/typeorm/schemas/Notifications';

export default interface INotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notifications>;
}
