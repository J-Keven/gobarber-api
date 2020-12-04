import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, isAfter, isEqual } from 'date-fns';
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
      const datenow = new Date();
      const appointmentsOfDay = appointments.filter(appointment => {
        return appointment.date.getDate() === day;
      });
      return {
        day,
        avilability:
          (isAfter(
            new Date(year, month - 1, day),
            new Date(
              datenow.getFullYear(),
              datenow.getMonth(),
              datenow.getDate(),
            ),
          ) ||
            isEqual(
              new Date(year, month - 1, day),
              new Date(
                datenow.getFullYear(),
                datenow.getMonth(),
                datenow.getDate(),
              ),
            )) &&
          appointmentsOfDay.length < 10,
      };
    });
    return availability;
  }
}

export default ListProviderMonthAvailability;
