import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import AuthtorizationUserService from '@modules/users/services/AuthtorizationUserService';
import CreateUserService from '@modules/users/services/CreateUsersService';
import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import FakeHashPovider from '@modules/users/infra/providers/hashProviders/fake/FakeHashProviderRepository';

describe('AuthtorizationUser', () => {
  it('should be able to authenticate the user', async () => {
    const user = {
      name: 'jhonnas',
      email: 'jhonas@gmail.com',
      password: '123456',
    };

    const fakeUserRepository = new FakeUserRepository();
    const fakeHashPovider = new FakeHashPovider();
    const createUSerService = new CreateUserService(
      fakeUserRepository,
      fakeHashPovider,
    );
    await createUSerService.execute(user);

    const authtorizationUser = new AuthtorizationUserService(
      fakeUserRepository,
      fakeHashPovider,
    );

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

    const fakeUserRepository = new FakeUserRepository();
    const fakeHashPovider = new FakeHashPovider();
    const createUSerService = new CreateUserService(
      fakeUserRepository,
      fakeHashPovider,
    );
    await createUSerService.execute(user);

    const authtorizationUser = new AuthtorizationUserService(
      fakeUserRepository,
      fakeHashPovider,
    );

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
