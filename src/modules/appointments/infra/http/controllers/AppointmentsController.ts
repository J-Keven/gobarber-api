import { Response, Request } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentsServece from '@modules/appointments/services/CreateAppointmentsServece';

class AppoitmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointmentsServece = container.resolve(
      CreateAppointmentsServece,
    );

    const appointments = await createAppointmentsServece.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointments);
  }
}

export default AppoitmentsController;