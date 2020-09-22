import { join } from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  id: string;
  filename: string;
}

@injectable()
class UpdateUserAvatarService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ id, filename }: Request): Promise<Users> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(`This user doesn't exist`, 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
