import { injectable, inject } from 'tsyringe';
import { resolve } from 'path';
import ISendEmail from '@shared/container/providers/SendEmailProvider/model/ISendEmail';
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
    @inject('UserTokenRepository')
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

    const { token } = await this.userTokensrRepository.generate(user.id);
    const fileTemplatePath = resolve(
      __dirname,
      '..',
      'views',
      'forgotPasswordTemplate.hbs',
    );
    await this.sendEmail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Gobarber] Recuperação de senha',
      dataTemplate: {
        file: fileTemplatePath,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgoPasswordEmail;
