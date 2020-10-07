import { injectable, inject } from 'tsyringe';
import { isAfter } from 'date-fns';
import IAppontmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  avilability: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
  private appointmentsRepository: IAppontmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppontmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );
    const hourStart = 8;
    const hoursOfDay = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const curentDate = new Date(Date.now());

    const availability = hoursOfDay.map(hour => {
      const appointmentInHour = appointments.find(
        item => item.date.getHours() === hour,
      );
      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        avilability: !appointmentInHour && isAfter(compareDate, curentDate),
      };
    });
    return availability;
  }
}

export default ListProviderDayAvailability;
