import { injectable, inject } from 'tsyringe';
import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../infra/providers/hashProviders/model/IHashProvider';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUsersService {
  private userRepository: IUserRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('HashProviders')
    hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, password }: IRequestDTO): Promise<Users> {
    const userEmail = await this.userRepository.findByEmail(email);

    if (userEmail) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.create(password);
    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return newUser;
  }
}

export default CreateUsersService;
