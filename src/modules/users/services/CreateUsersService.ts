import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUsersService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: IRequestDTO): Promise<Users> {
    const userEmail = await this.userRepository.findByEmail(email);

    if (userEmail) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    delete newUser.password;
    return newUser;
  }
}

export default CreateUsersService;
