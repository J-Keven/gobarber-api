import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import AuthtorizationUserService from '@modules/users/services/AuthtorizationUserService';
import CreateUserService from '@modules/users/services/CreateUsersService';
import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import FakeHashPovider from '@modules/users/infra/providers/hashProviders/fake/FakeHashProviderRepository';

let fakeUserRepository: FakeUserRepository;
let fakeHashPovider: FakeHashPovider;
let createUSerService: CreateUserService;
let authtorizationUser: AuthtorizationUserService;
describe('AuthtorizationUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashPovider = new FakeHashPovider();
    createUSerService = new CreateUserService(
      fakeUserRepository,
      fakeHashPovider,
    );
    authtorizationUser = new AuthtorizationUserService(
      fakeUserRepository,
      fakeHashPovider,
    );
  });
  it('should be able to authenticate the user', async () => {
    const user = {
      name: 'jhonnas',
      email: 'jhonas@gmail.com',
      password: '123456',
    };

    await createUSerService.execute(user);
    const userAuthetecad = await authtorizationUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(userAuthetecad.user).toBeInstanceOf(User);
    expect(userAuthetecad.token.split('.')).toHaveLength(3);
  });

  it('should not be able to authenticate a user with email or password incorrect', async () => {
    const user = {
      name: 'jhonnas',
      email: 'jhonas@gmail.com',
      password: '123456',
    };
    await createUSerService.execute(user);
    expect(
      authtorizationUser.execute({
        email: 'ahsuashuashuashuashauhs',
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(
      authtorizationUser.execute({
        email: 'jhonas@gmail.com',
        password: 'ahsuashuashuashuashauhs',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
