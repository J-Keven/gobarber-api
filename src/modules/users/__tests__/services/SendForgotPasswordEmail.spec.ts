import FakeSendEmail from '@shared/container/providers/SendEmail/fake/FakeSendEmail';
import ISendEmail from '@shared/container/providers/SendEmail/model/ISendEmail';
import AppError from '@shared/errors/AppError';
import FakeUserTokenReposory from '@modules/users/repositories/fake/FakeUserTokenRepository';
import IUserRepository from '../../repositories/IUserRepository';
import IUserTokenRepository from '../../repositories/IUserTokenRepository';
import SendForgotPasswordEmailService from '../../services/SendPasswordRecoveryEmailService';
import FakeUserRepository from '../../repositories/fake/FakeUserRepository';

let fakeUserRepository: IUserRepository;
let fakeSendEmail: ISendEmail;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeUserTokenReposory: IUserTokenRepository;
describe('SendForgotPasswordEMail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeSendEmail = new FakeSendEmail();
    fakeUserTokenReposory = new FakeUserTokenReposory();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeSendEmail,
      fakeUserTokenReposory,
    );
  });

  it('Should be able recover to the password using email', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const sendEMail = jest.spyOn(fakeSendEmail, 'sendEmail');

    await sendForgotPasswordEmail.execute({ email: user.email });

    expect(sendEMail).toHaveBeenCalled();
  });

  it('Should not to able recover password if the E-mail dos not exist', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate an forgote password token', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const generate = jest.spyOn(fakeUserTokenReposory, 'generate');

    await sendForgotPasswordEmail.execute({ email: user.email });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
