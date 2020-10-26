import CreateNotificationsService from '@modules/notifications/services/CreateNotifications';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fake/FakeNotificationsRepository';

let fakeNotificationsRepository: INotificationsRepository;
let createNotificationsServoce: CreateNotificationsService;

describe('CreateNotifications', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createNotificationsServoce = new CreateNotificationsService(
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new notification', async () => {
    const notification = await createNotificationsServoce.execute({
      content: 'notification test ',
      recipient_id: 'recepient id',
    });

    expect(notification.id).not.toBeNull();
  });
});
