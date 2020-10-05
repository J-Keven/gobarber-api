// import { startOfHour } from 'date-fns';
import ListProviderMonthAvailability from '../../services/ListProviderMonthAvailability';
import FakeAppointmentsRepository from '../../repositories/fake/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('CreateAppointmets', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailability();
    // fakeAppointmentsRepository,
  });
  it('should be able to create a new appointment', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 5, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 9, 6, 8, 0, 0),
    });

    const monthProvider = await listProviderMonthAvailability.execute({
      provider_id: 'user-id',
      month: 10,
      year: 2020,
    });

    expect(monthProvider).toStrictEqual(
      expect.arrayContaining([
        { day: 4, avilability: true },
        { day: 5, avilability: false },
        { day: 6, avilability: false },
        { day: 7, avilability: true },
      ]),
    );
  });
});
