import { Response, Request } from 'express';
import { container } from 'tsyringe';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

class UsersAvatarController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const showUserProfileService = container.resolve(ShowUserProfileService);

    const userProfile = await showUserProfileService.execute({ userId: id });
    delete userProfile.password;

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

    delete user.password;
    return response.json(user);
  }
}

export default UsersAvatarController;
