import FakeStorageProviderRepository from '@shared/container/providers/StoregeProviders/fake/FakeStorageProvider';
import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProviderRepository: FakeStorageProviderRepository;
let updateUserAvatarService: UpdateUserAvatarService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProviderRepository = new FakeStorageProviderRepository();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProviderRepository,
    );
  });
  it('should be able to update the users avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    const filename =
      '53f97d00cb3d665e-WhatsApp Image 2020-01-13 at 15.50.07.jpeg';

    const response = await updateUserAvatarService.execute({
      id: user.id,
      filename,
    });

    expect(response).toHaveProperty('avatar');
    expect(response.avatar).toBe(filename);
  });

  it('should not be able to update the users avatar with id nonexistent', async () => {
    const filename =
      '53f97d00cb3d665e-WhatsApp Image 2020-01-13 at 15.50.07.jpeg';

    expect(
      updateUserAvatarService.execute({
        id: '123123123-Jonh-Doe',
        filename,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const deletefile = jest.spyOn(fakeStorageProviderRepository, 'delete');
    await updateUserAvatarService.execute({
      id: user.id,
      filename: 'avatar.jpeg',
    });

    const response = await updateUserAvatarService.execute({
      id: user.id,
      filename: 'avatar2.jpeg',
    });

    expect(deletefile).toHaveBeenCalledWith('avatar.jpeg');
    expect(response).toHaveProperty('avatar');
    expect(response.avatar).toBe('avatar2.jpeg');
  });
});
