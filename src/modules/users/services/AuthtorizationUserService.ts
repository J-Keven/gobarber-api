import jwt from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../infra/providers/hashProviders/model/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

@injectable()
class AuthtorizationUserService {
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

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect Email/Password combination', 401);
    }
    const PasswordAndHashIsEqual = await this.hashProvider.compare(
      password,
      user.password,
    );
    if (!PasswordAndHashIsEqual) {
      throw new AppError('Incorrect Email/Password combination', 401);
    }
    const { expiresIn, secretKey } = authConfig.jwt;
    const token = jwt.sign({}, secretKey, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthtorizationUserService;
