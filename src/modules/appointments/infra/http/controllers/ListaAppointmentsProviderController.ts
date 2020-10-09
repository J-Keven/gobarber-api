import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllApointmentsInDayFromProviderService from '@modules/appointments/services/ListAllApointmentsInDayFromProviderService';

class ListAppointmentsProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const provider_id = request.user.id;

    const listAllAppointmentsIdDayFromProvider = container.resolve(
      ListAllApointmentsInDayFromProviderService,
    );

    const appointments = await listAllAppointmentsIdDayFromProvider.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

export default ListAppointmentsProviderController;
