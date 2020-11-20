import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProvidersDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailability,
    );

    const appointments = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointments);
  }
}

export default ProvidersDayAvailabilityController;
