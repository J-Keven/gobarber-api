import { getRepository, Not, Repository } from 'typeorm';
import ICReateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IListProvidersDTO from '@modules/users/dtos/IListProvidersDTO';
import User from '../entities/Users';

class UserRepositor implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllProviders({
    exepctUSerId,
  }: IListProvidersDTO): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(exepctUSerId),
      },
    });

    return users;
  }

  public async create(userDate: ICReateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userDate);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(userData: User): Promise<User> {
    const user = await this.ormRepository.save(userData);
    return user;
  }
}

export default UserRepositor;
