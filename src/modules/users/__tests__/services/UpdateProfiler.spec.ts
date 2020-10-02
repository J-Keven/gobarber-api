import FakeHashProvider from '@modules/users/infra/providers/hashProviders/fake/FakeHashProviderRepository';
import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import UpdateProfileService from '@modules/users/services/UpdateUserProfileService';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvidder: FakeHashProvider;
let updateProfileService: UpdateProfileService;
let user: User;

describe('UpdateProfiler', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvidder = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvidder,
    );

    user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123123',
    });
  });

  it('should be able to update the user profile', async () => {
    const userSave = jest.spyOn(fakeUserRepository, 'save');

    const userUpdate = await updateProfileService.execute({
      userId: user.id,
      name: 'John Doe2',
      email: 'johndoe2@gmail.com',
    });

    expect(userSave).toBeCalled();
    expect(userUpdate.name).toBe('John Doe2');
    expect(userUpdate.email).toBe('johndoe2@gmail.com');
  });

  it('should not be able to update the user profile with no-exist user', async () => {
    expect(
      updateProfileService.execute({
        userId: 'no-existe-user',
        name: 'John Doe',
        email: 'example@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user email for an existed', async () => {
    // const userSave = jest.spyOn(fakeUserRepository, 'save');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe2@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'John Doe2',
        email: 'johndoe2@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the users password if the old password is not provided', async () => {
    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'John Doe2',
        email: 'johndoe2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user password if the old password does not match', async () => {
    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'John Doe2',
        email: 'johndoe2@gmail.com',
        oldPassword: '123122',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
