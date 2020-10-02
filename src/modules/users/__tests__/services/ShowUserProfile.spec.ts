import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import ShowUserProfile from '@modules/users/services/ShowUserProfileService';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';

let fakeUserRepository: FakeUserRepository;

let showUserProfile: ShowUserProfile;
let user: User;
describe('UpdateProfiler', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    showUserProfile = new ShowUserProfile(fakeUserRepository);

    user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123123',
    });
  });

  it('should be able to show the user profile', async () => {
    const userUpdate = await showUserProfile.execute({
      userId: user.id,
    });

    expect(userUpdate.name).toBe('John Doe');
    expect(userUpdate.email).toBe('johndoe@gmail.com');
  });

  it('should not be able to show the user profile with no-exist user', async () => {
    expect(
      showUserProfile.execute({
        userId: 'no-existe-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
