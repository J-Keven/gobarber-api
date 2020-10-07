import { injectable, inject } from 'tsyringe';
import { getDaysInMonth } from 'date-fns';
import IAppontmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  avilability: boolean;
}>;

@injectable()
class ListProviderMonthAvailability {
  private appointmentsRepository: IAppontmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppontmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    month,
    provider_id,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDaysOfMonth = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (_, index) => index + 1,
    );

    const availability = eachDaysOfMonth.map(day => {
      const appointmentsOfDay = appointments.filter(appointment => {
        return appointment.date.getDate() === day;
      });

      return {
        day,
        avilability: appointmentsOfDay.length < 10,
      };
    });
    return availability;
  }
}

export default ListProviderMonthAvailability;
