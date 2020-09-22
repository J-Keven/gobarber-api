import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthtorizationUserService from '@modules/users/services/AuthtorizationUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authtorizationUserService = container.resolve(
      AuthtorizationUserService,
    );

    const { user, token } = await authtorizationUserService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

export default SessionsController;
