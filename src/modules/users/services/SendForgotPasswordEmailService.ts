import { injectable, inject } from 'tsyringe';
import ISendEmail from '@shared/container/providers/SendEmail/model/ISendEmail';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequestDTO {
  email: string;
}
@injectable()
class SendForgoPasswordEmail {
  private userRepository: IUserRepository;

  private sendEmail: ISendEmail;

  private userTokensrRepository: IUserTokenRepository;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('SendEmail')
    sendEmail: ISendEmail,
    @inject('UserTokensrRepository')
    userTokensrRepository: IUserTokenRepository,
  ) {
    this.userRepository = userRepository;
    this.sendEmail = sendEmail;
    this.userTokensrRepository = userTokensrRepository;
  }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('The E-mail do not exist', 400);
    }

    await this.userTokensrRepository.generate(user.id);
    await this.sendEmail.sendEmail(email, 'Email de recuperação de senha');
  }
}

export default SendForgoPasswordEmail;
