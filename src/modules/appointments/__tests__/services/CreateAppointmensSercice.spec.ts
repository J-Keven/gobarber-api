import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fake/FakeNotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fake/FakeCacheProvider';
import CreateAppointmentsServece from '../../services/CreateAppointmentsServece';
import FakeAppointmentsRepository from '../../repositories/fake/FakeAppointmentsRepository';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: INotificationsRepository;
let createAppointmentsServece: CreateAppointmentsServece;

describe('CreateAppointmets', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointmentsServece = new CreateAppointmentsServece(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    const date = new Date(2020, 9, 7, 13);
    const startDate = startOfHour(date);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 7, 12).getTime();
    });
    const appointment = await createAppointmentsServece.execute({
      date,
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
    expect(appointment.date).toStrictEqual(startDate);
  });

  it('should not be able to create a new appointment at the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 7, 12).getTime();
    });
    const date = new Date(2020, 9, 7, 13);
    const userData = {
      date,
      provider_id: 'provider-id',
      user_id: 'user-id',
    };

    await createAppointmentsServece.execute(userData);
    expect(createAppointmentsServece.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to create a new appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 7, 12).getTime();
    });

    const userData = {
      date: new Date(2020, 9, 7, 11),
      provider_id: 'provider-id',
      user_id: 'user-id',
    };

    await expect(
      createAppointmentsServece.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment before 8am or after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 7, 12).getTime();
    });

    await expect(
      createAppointmentsServece.execute({
        date: new Date(2020, 9, 8, 7),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentsServece.execute({
        date: new Date(2020, 9, 8, 18),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment to yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 7, 12).getTime();
    });

    await expect(
      createAppointmentsServece.execute({
        date: new Date(2020, 9, 8, 10),
        provider_id: 'provider-id',
        user_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
