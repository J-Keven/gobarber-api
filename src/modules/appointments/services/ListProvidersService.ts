import IUserRepository from '@modules/users/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/Users';
import ICacheProvider from '@shared/container/providers/CacheProvider/model/ICacheProvoder';

@injectable()
class ListProviders {
  private userRepository: IUserRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.userRepository = userRepository;
    this.cacheProvider = cacheProvider;
  }

  public async execute(userId: string): Promise<User[]> {
    let provider = await this.cacheProvider.recover<User[]>(
      `provider-list:${userId}`,
    );

    if (!provider) {
      provider = await this.userRepository.findAllProviders({
        exepctUSerId: userId,
      });

      console.log('a query foi feita no banco');
      await this.cacheProvider.save(`provider-list:${userId}`, provider);
    }

    return provider;
  }
}

export default ListProviders;
