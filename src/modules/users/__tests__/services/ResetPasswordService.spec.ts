import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '../../repositories/IUserTokenRepository';
import IUserRepository from '../../repositories/IUserRepository';
import ResetPasswordService from '../../services/ResetPasswordService';
import FakeUserRepository from '../../repositories/fake/FakeUserRepository';
import FakeUserTokenRepoitory from '../../repositories/fake/FakeUserTokenRepository';
import IHashProvider from '../../infra/providers/hashProviders/model/IHashProvider';
import FakeHashProvaider from '../../infra/providers/hashProviders/fake/FakeHashProviderRepository';

let userRepository: IUserRepository;
let userTokenRepository: IUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let hashProvider: IHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    userTokenRepository = new FakeUserTokenRepoitory();
    hashProvider = new FakeHashProvaider();
    resetPasswordService = new ResetPasswordService(
      userRepository,
      userTokenRepository,
      hashProvider,
    );
  });

  it('Shoud be able reset the password', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const userToken = await userTokenRepository.generate(user.id);
    const create = jest.spyOn(hashProvider, 'create');

    await resetPasswordService.execute({
      token: userToken.token,
      password: '123123',
    });

    const updatingUser = await userRepository.findById(user.id);

    expect(create).toHaveBeenCalledWith('123123');
    expect(updatingUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-exist token', async () => {
    expect(
      resetPasswordService.execute({
        token: 'non-exist token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-exist user', async () => {
    const { token } = await userTokenRepository.generate('non-exist-user');
    expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not e able to reset the password the 2 hrs after the link send', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    const userToken = await userTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
