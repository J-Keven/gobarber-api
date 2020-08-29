import { getRepository } from 'typeorm';
import { join } from 'path';
import fs from 'fs';
import Users from '../models/Users';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

interface Request {
  id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ id, filename }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(id);

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

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
