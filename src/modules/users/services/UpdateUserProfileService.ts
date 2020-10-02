import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../infra/providers/hashProviders/model/IHashProvider';
import User from '../infra/typeorm/entities/Users';

interface IUpdateProps {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  private userRepository: IUserRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    name,
    email,
    userId,
    oldPassword,
    password,
  }: IUpdateProps): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailExist = await this.userRepository.findByEmail(email);

    if (emailExist && emailExist.id !== userId) {
      throw new AppError('Email already exists');
    }

    if (password && !oldPassword) {
      throw new AppError(
        'You need inform the old passsord to set new password',
      );
    }

    user.name = name;
    user.email = email;

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compare(
        oldPassword,
        user.password,
      );
      if (!checkOldPassword) {
        throw new AppError('the old password does not match');
      }
      user.password = await this.hashProvider.create(password);
    }
    await this.userRepository.save(user);

    return user;
  }
}
export default UpdateProfileService;
