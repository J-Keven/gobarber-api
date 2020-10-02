import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHasProvider from '../infra/providers/hashProviders/model/IHashProvider';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  private userRepository: IUserRepository;

  private userTokenRepository: IUserTokenRepository;

  private hashProvider: IHasProvider;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('UserTokenRepository')
    userTokenRepository: IUserTokenRepository,
    @inject('HashProvider')
    hashProvider: IHasProvider,
  ) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ password, token }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('The User token does not exist');
    }
    const user = await this.userRepository.findById(userToken.user_Id);
    if (!user) {
      throw new AppError('The User does not exist');
    }
    const createdAt = userToken.created_at;

    const customDate = addHours(createdAt, 2);

    if (isAfter(Date.now(), customDate)) {
      throw new AppError('Token inspired');
    }

    user.password = await this.hashProvider.create(password);

    await this.userRepository.save(user);
  }
}
export default ResetPasswordService;
