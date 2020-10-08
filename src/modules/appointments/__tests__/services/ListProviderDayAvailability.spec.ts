// import { startOfHour } from 'date-fns';
import ListProviderDayAvailability from '../../services/ListProviderDayAvailabilityService';
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
  it('should be able to list all appointments availability in day', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 9, 5, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 9, 5, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 5, 11).getTime();
    });

    const monthProvider = await listProviderDayAvailability.execute({
      provider_id: 'provider-id',
      day: 5,
      month: 10,
      year: 2020,
    });

    expect(monthProvider).toStrictEqual(
      expect.arrayContaining([
        { hour: 8, avilability: false },
        { hour: 9, avilability: false },
        { hour: 10, avilability: false },
        { hour: 11, avilability: false },
        { hour: 12, avilability: true },
        { hour: 13, avilability: true },
        { hour: 14, avilability: false },
        { hour: 15, avilability: false },
      ]),
    );
  });
});
