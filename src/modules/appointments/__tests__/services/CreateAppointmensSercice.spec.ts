import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import CreateAppointmentsServece from '../../services/CreateAppointmentsServece';
import FakeAppointmentsRepository from '../../repositories/fake/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentsServece: CreateAppointmentsServece;

describe('CreateAppointmets', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentsServece = new CreateAppointmentsServece(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
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
