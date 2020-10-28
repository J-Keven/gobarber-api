import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
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

    return response.json({ user: classToClass(user), token });
  }
}

export default SessionsController;
