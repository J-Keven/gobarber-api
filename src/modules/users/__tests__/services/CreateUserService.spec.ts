import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUsersService';
import UserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import FakeHashPovider from '@modules/users/infra/providers/hashProviders/fake/FakeHashProviderRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const userData = {
      name: 'jhonnas',
      email: 'jhonas@gmail.com',
      password: '123456',
    };
    const userRepository = new UserRepository();
    const fakeHashPovider = new FakeHashPovider();
    const createUserService = new CreateUserService(
      userRepository,
      fakeHashPovider,
    );

    const user = await createUserService.execute(userData);

    // expect(user).toHaveLength(6);
    expect(user).toHaveProperty('id');
    expect(user.avatar).toBeUndefined();
    expect(user.email).toBe('jhonas@gmail.com');
    expect(user.name).toBe('jhonnas');
  });

  it('should not be albe create a new user with same the email', async () => {
    const userData = {
      name: 'jhonnas',
      email: 'jhonas@gmail.com',
      password: '123456',
    };
    const userRepository = new UserRepository();
    const fakeHashPovider = new FakeHashPovider();
    const createUserService = new CreateUserService(
      userRepository,
      fakeHashPovider,
    );

    await createUserService.execute(userData);
    expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
