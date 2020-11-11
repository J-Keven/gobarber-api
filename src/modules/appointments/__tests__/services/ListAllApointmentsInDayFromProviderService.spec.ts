import ListAllApointmentsInDayFromProvider from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fake/FakeCacheProvider';
import FakeAppointmentsRepository from '../../repositories/fake/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAllApointmentsInDayFromProvider: ListAllApointmentsInDayFromProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('ListAllApointmentsInDayFromProvider', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listAllApointmentsInDayFromProvider = new ListAllApointmentsInDayFromProvider(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able list all appointmens of provider in specifc day', async () => {
    const appointments1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 9, 9, 14, 0, 0),
    });

    const appointments2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 9, 9, 16, 0, 0),
    });

    const appointments = await listAllApointmentsInDayFromProvider.execute({
      provider_id: 'provider-id',
      day: 9,
      month: 10,
      year: 2020,
    });

    expect(appointments).toStrictEqual([appointments1, appointments2]);
  });
});
