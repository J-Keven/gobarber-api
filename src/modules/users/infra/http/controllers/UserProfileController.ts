import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

class UsersAvatarController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const showUserProfileService = container.resolve(ShowUserProfileService);

    const userProfile = await showUserProfileService.execute({ userId: id });

    return response.json(userProfile);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, oldPassword, password } = request.body;

    const updateUserProfileService = container.resolve(
      UpdateUserProfileService,
    );

    const user = await updateUserProfileService.execute({
      userId: id,
      name,
      email,
      oldPassword,
      password,
    });

    return response.json(classToClass(user));
  }
}

export default UsersAvatarController;
