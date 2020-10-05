import IUserRepository from '@modules/users/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/Users';

@injectable()
class ListProviders {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<User[]> {
    const provider = await this.userRepository.findAllProviders({
      exepctUSerId: userId,
    });
    return provider;
  }
}

export default ListProviders;
