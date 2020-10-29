import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentsServece from '@modules/appointments/services/CreateAppointmentsServece';

class AppoitmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const createAppointmentsServece = container.resolve(
      CreateAppointmentsServece,
    );

    const appointments = await createAppointmentsServece.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointments);
  }
}

export default AppoitmentsController;
