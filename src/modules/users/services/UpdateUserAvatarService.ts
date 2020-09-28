import { injectable, inject } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StoregeProviders/model/IStorageProvider';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  id: string;
  filename: string;
}

@injectable()
class UpdateUserAvatarService {
  private userRepository: IUserRepository;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('StoregeProvider')
    storageProvider: IStorageProvider,
  ) {
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ id, filename }: Request): Promise<Users> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(`This user doesn't exist`, 401);
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar);
    }

    const filenameStorage = await this.storageProvider.save(filename);
    user.avatar = filenameStorage;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
