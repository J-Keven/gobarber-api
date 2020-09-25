import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import CreateAppointmetsService from '../../services/CreateAppointmentsServece';
import FakeAppointmentsRepository from '../../repositories/fake/FakeAppointmentsRepository';

describe('CreateAppointmets', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentsServece = new CreateAppointmetsService(
      fakeAppointmentsRepository,
    );

    const date = new Date();
    const startDate = startOfHour(date);
    const appointment = await createAppointmentsServece.execute({
      date,
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
    expect(appointment.date).toStrictEqual(startDate);
  });

  it('should not be able to create a new appointment at the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentsServece = new CreateAppointmetsService(
      fakeAppointmentsRepository,
    );

    const date = new Date();
    const userData = {
      date,
      provider_id: '123123',
    };
    await createAppointmentsServece.execute(userData);
    expect(createAppointmentsServece.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
