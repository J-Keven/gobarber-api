import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ListProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute(userId);
    return res.json(classToClass(providers));
  }
}

export default ListProvidersController;
