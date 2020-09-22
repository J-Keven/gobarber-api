import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUsersService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUsersService = container.resolve(CreateUsersService);

    const user = await createUsersService.execute({ name, email, password });
    return response.json(user);
  }
}

export default UsersController;
