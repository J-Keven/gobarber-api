import ListProviderAppointments from '../../services/ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../../repositories/fake/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderAppointments: ListProviderAppointments;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointments = new ListProviderAppointments(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list all appointments of day from a provider', async () => {
    const appoitment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 9, 5, 14, 0, 0),
    });

    const appoitment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 9, 5, 15, 0, 0),
    });

    const appointmentsProvider = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 5,
      month: 10,
      year: 2020,
    });

    expect(appointmentsProvider).toStrictEqual(
      expect.arrayContaining([appoitment1, appoitment2]),
    );
  });

  it('should not be able to list all appointments of day from a provider if provider not exist', async () => {
    const appoitment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 9, 5, 14, 0, 0),
    });

    const appoitment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 9, 5, 15, 0, 0),
    });

    const appointmentsProvider = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 5,
      month: 10,
      year: 2020,
    });

    expect(appointmentsProvider).toStrictEqual(
      expect.arrayContaining([appoitment1, appoitment2]),
    );
  });
});
