// import { startOfHour } from 'date-fns';
import ListProviderDayAvailability from '../../services/ListProviderDayAvailability';
import FakeAppointmentsRepository from '../../repositories/fake/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;

describe('CreateAppointmets', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 7, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 17, 0, 0),
    });

    const monthProvider = await listProviderDayAvailability.execute({
      provider_id: 'user-id',
      day: 5,
      month: 10,
      year: 2020,
    });

    expect(monthProvider).toStrictEqual(
      expect.arrayContaining([
        { haur: 8, avilability: false },
        { haur: 9, avilability: false },
        { haur: 10, avilability: false },
        { haur: 11, avilability: false },
        { haur: 12, avilability: false },
        { haur: 13, avilability: false },
      ]),
    );
  });
});
